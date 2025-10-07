// fragmento js de liferay, funcionalidad del slider y del modal 

(function() {
  'use strict';

  console.log('Inicializando Carousel Completo con Control de Videos v8.0...');

  // Variables globales del carousel
  let currentSlide = 0;
  let totalSlides = 0;
  let isTransitioning = false;
  let isInitialized = false;

  // Touch variables
  let touchStartX = 0;
  let touchEndX = 0;
  let isTouching = false;

  // Variables globales para control de videos
  let youtubePlayersRegistry = new Map();
  let isYouTubeAPIReady = false;

  const CONFIG = {
    INIT_TIMEOUT: 100,
    MAX_RETRIES: 5,
    SLIDE_TRANSITION_DURATION: 400,
    MIN_SWIPE_DISTANCE: 50,
    RESPONSIVE_BREAKPOINTS: {
      MOBILE: 768,
      TABLET: 900,
      DESKTOP: 1200
    }
  };

  let initRetries = 0;
  let preventiveMonitorInterval = null;

  // FUNCIONES ESPECÍFICAS PARA BREAKPOINTS CORREGIDOS
  function isMobileTablet() {
    // Incluir todas las pantallas con touch hasta 900px
    return window.innerWidth < 900;
  }

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function isTabletSmall() {
    return window.innerWidth >= 768 && window.innerWidth <= 899;
  }

  function shouldShowNavigationButtons() {
    // Solo mostrar botones en desktop >= 900px
    return window.innerWidth >= 900;
  }

  // APLICAR FIX CORREGIDO PARA TODAS LAS PANTALLAS TOUCH
  function applyMobileTabletFix() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!carouselSection || !container || !wrapper) {
      console.log('Elementos no encontrados para mobile fix');
      return;
    }
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    
    console.log(`=== APLICANDO FIX BREAKPOINTS CORREGIDO ===`);
    console.log(`Pantalla: ${window.innerWidth}px`);
    console.log(`Es mobile: ${isMobile()}`);
    console.log(`Es tablet pequeño: ${isTabletSmall()}`);
    console.log(`Debe mostrar botones: ${shouldShowNavigationButtons()}`);
    console.log(`Total slides: ${slideCount}`);
    
    if (isMobileTablet()) {
      // Limpiar todas las clases primero
      carouselSection.classList.remove('content-fits', 'no-navigation', 'has-navigation', 'mobile-last-card-fix', 'mobile-needs-scroll', 'force-center-mobile', 'force-navigation-mobile');
      container.classList.remove('auto-center', 'force-center');
      wrapper.classList.remove('force-center');
      
      const slideWidth = 260;
      const gap = 8;
      const containerWidth = container.offsetWidth;
      const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);
      
      console.log(`Container: ${containerWidth}px, Contenido: ${totalContentWidth}px`);
      
      // VERIFICAR SI DEBE CENTRAR BASADO EN CONTENIDO
      const shouldCenter = shouldCenterContent();
      
      if (shouldCenter) {
        console.log('APLICANDO CENTRADO - Contenido cabe o debe centrarse');
        
        carouselSection.classList.add('content-fits', 'no-navigation', 'force-center-mobile');
        container.classList.add('auto-center', 'force-center');
        wrapper.classList.add('force-center');
        
        // Limpiar estilos de padding extra
        wrapper.style.paddingRight = '';
        wrapper.style.width = '';
        wrapper.style.marginRight = '';
        wrapper.style.transform = 'none';
        
        currentSlide = 0;
        hideNavigationButtons();
        
      } else {
        console.log('APLICANDO NAVEGACIÓN TOUCH - Contenido no cabe');
        
        carouselSection.classList.add('mobile-needs-scroll', 'has-navigation', 'force-navigation-mobile');
        
        // CÁLCULO MÁS CONSERVADOR para asegurar visibilidad de última card
        let extraSpace = 0;
        
        if (isMobile()) {
          // Mobile: más conservador
          extraSpace = 80; // Reducido de 120-200px a 80px
        } else if (isTabletSmall()) {
          // Tablet touch: muy conservador
          extraSpace = 60; // Reducido de 100-150px a 60px
        }
        
        console.log(`Espacio extra CONSERVADOR aplicado: ${extraSpace}px`);
        
        // Aplicar padding conservador
        wrapper.style.paddingRight = `${extraSpace}px`;
        wrapper.style.width = `calc(100% + ${extraSpace}px)`;
        wrapper.style.marginRight = `-${extraSpace}px`;
        
        // NUNCA mostrar botones en pantallas touch (< 900px)
        hideNavigationButtons();
      }
    } else {
      // Desktop >= 900px - RESPETAR REGLAS CSS EXISTENTES
      console.log('DESKTOP >= 900px - respetando reglas CSS existentes');
      
      carouselSection.classList.remove('mobile-last-card-fix', 'mobile-needs-scroll', 'force-center-mobile', 'force-navigation-mobile');
      
      // Limpiar estilos inline para que CSS tome control
      wrapper.style.paddingRight = '';
      wrapper.style.width = '';
      wrapper.style.marginRight = '';
      
      // DEJAR QUE CSS MANEJE EL CENTRADO EN DESKTOP
      const slides = wrapper.querySelectorAll('.carousel-slide');
      const slideCount = slides.length;
      const containerWidth = container.offsetWidth;
      const slideWidth = 280;
      const gap = 10;
      const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);
      
      if (totalContentWidth <= containerWidth) {
        console.log('DESKTOP - Contenido cabe, CSS maneja centrado');
        carouselSection.classList.add('content-fits', 'no-navigation');
        hideNavigationButtons();
      } else {
        console.log('DESKTOP - Contenido no cabe, aplicando navegación');
        carouselSection.classList.add('has-navigation');
        showNavigationButtons();
      }
    }
    
    console.log(`Clases finales carousel: ${carouselSection.classList.toString()}`);
    console.log('==========================================');
  }

  // FUNCIONES DE SINCRONIZACIÓN Y BLOQUEO PREVENTIVO
  function syncCarouselState() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return null;
    
    const transform = wrapper.style.transform;
    const translateMatch = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    
    if (!translateMatch) return currentSlide;
    
    const currentTranslateX = Math.abs(parseFloat(translateMatch[1]));
    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    
    const realSlidePosition = Math.round(currentTranslateX / (slideWidth + gap));
    
    console.log(`Sincronizando: Transform=${currentTranslateX}px → Slide real=${realSlidePosition}`);
    
    // Actualizar variable global
    const oldSlide = currentSlide;
    currentSlide = realSlidePosition;
    
    if (oldSlide !== realSlidePosition) {
      console.log(`Variable actualizada: ${oldSlide} → ${realSlidePosition}`);
    }
    
    return realSlidePosition;
  }

  // FUNCIÓN DE CENTRADO CORREGIDA
  function shouldCenterContent() {
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!container || !wrapper) return false;
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    
    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    const containerWidth = container.offsetWidth;
    const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);
    
    // Si todo cabe perfectamente, siempre centrar
    if (totalContentWidth <= containerWidth) {
      console.log('Centrado: Todo cabe perfectamente');
      return true;
    }
    
    // Reglas por cantidad de slides
    if (slideCount <= 2) {
      console.log('Centrado: 2 slides o menos');
      return true;
    }
    
    // Para mobile/tablet: ser más estricto
    if (isMobileTablet()) {
      // Solo centrar si realmente todo cabe con un margen pequeño
      const fitsWithMargin = totalContentWidth <= (containerWidth - 40);
      console.log(`Mobile/Tablet: ¿Cabe con margen 40px? ${fitsWithMargin}`);
      return fitsWithMargin;
    }
    
    // Para desktop, reglas más generosas (respetando CSS)
    if (slideCount === 3 && window.innerWidth >= 900) return true;
    if (slideCount === 4 && window.innerWidth >= 1200) return true;
    
    return false;
  }

  // CÁLCULO CONSERVADOR DEL LÍMITE EN MOBILE/TABLET
  function calculateRealLimitMobileTablet() {
    const container = document.getElementById('carousel-container');
    if (!container || totalSlides === 0) return 0;
    
    if (shouldCenterContent()) {
      console.log('Modo centrado - sin límites de navegación');
      return 0;
    }
    
    const containerWidth = container.offsetWidth;
    const slideWidth = 260;
    const gap = 8;
    
    const contentWidth = (totalSlides * slideWidth) + ((totalSlides - 1) * gap);
    
    if (contentWidth <= containerWidth) return 0;
    
    // CÁLCULO MÁS CONSERVADOR para asegurar que la última card sea completamente visible
    const slidesCompletelyVisible = Math.floor(containerWidth / (slideWidth + gap));
    
    // Asegurar que al menos una card completa sea visible al final
    const lastValidPosition = Math.max(0, totalSlides - slidesCompletelyVisible);
    
    console.log(`Límite conservador: ${lastValidPosition}`);
    console.log(`- Container: ${containerWidth}px`);
    console.log(`- Slides completamente visibles: ${slidesCompletelyVisible}`);
    console.log(`- Total slides: ${totalSlides}`);
    
    return Math.min(lastValidPosition, totalSlides - 1);
  }

  function calculateRealLimit() {
    if (isMobileTablet()) {
      return calculateRealLimitMobileTablet();
    } else {
      // Lógica original para desktop
      const container = document.getElementById('carousel-container');
      if (!container || totalSlides === 0) return 0;
      
      if (shouldCenterContent()) {
        console.log('Modo centrado - sin límites de navegación');
        return 0;
      }
      
      const containerWidth = container.offsetWidth;
      const slideWidth = 280;
      const gap = 10;
      
      const contentWidth = (totalSlides * slideWidth) + ((totalSlides - 1) * gap);
      
      if (contentWidth <= containerWidth) return 0;
      
      const maxDisplacement = contentWidth - containerWidth;
      const lastValidPosition = Math.floor(maxDisplacement / (slideWidth + gap));
      
      console.log(`Límite desktop: ${lastValidPosition} (maxDisp: ${maxDisplacement}px)`);
      return Math.min(lastValidPosition, totalSlides - 1);
    }
  }

  function hideNavigationButtons() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) {
      prevBtn.style.display = 'none';
    }
    if (nextBtn) {
      nextBtn.style.display = 'none';
    }
    
    console.log('Botones de navegación ocultos');
  }

  function showNavigationButtons() {
    // Solo mostrar si es desktop >= 900px
    if (window.innerWidth < 900) {
      hideNavigationButtons();
      return;
    }
    
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) {
      prevBtn.style.display = 'flex';
    }
    if (nextBtn) {
      nextBtn.style.display = 'flex';
    }
    
    console.log('Botones de navegación mostrados (desktop >= 900px)');
  }

  function preventiveBlock() {
    const realSlide = syncCarouselState();
    const limit = calculateRealLimit();
    
    const shouldBlockNext = realSlide >= limit;
    const shouldBlockPrev = realSlide <= 0;
    
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    
    if (nextBtn) {
      if (shouldBlockNext) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.3';
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.style.pointerEvents = 'none';
      } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.pointerEvents = 'auto';
      }
    }
    
    if (prevBtn) {
      if (shouldBlockPrev) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.3';
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.pointerEvents = 'auto';
      }
    }
    
    return { shouldBlockNext, shouldBlockPrev, realSlide, limit };
  }

  // Utilidades para Liferay
  function waitForLiferayReady() {
    return new Promise((resolve) => {
      const checkReady = () => {
        const hasRequiredElements = 
          document.getElementById('carousel-container') &&
          document.getElementById('slides-wrapper');
        
        if (document.readyState === 'complete' && hasRequiredElements) {
          console.log('Liferay DOM listo');
          resolve();
        } else if (initRetries < CONFIG.MAX_RETRIES) {
          initRetries++;
          console.log(`Esperando DOM... Intento ${initRetries}/${CONFIG.MAX_RETRIES}`);
          setTimeout(checkReady, CONFIG.INIT_TIMEOUT);
        } else {
          console.warn('Timeout esperando DOM, continuando...');
          resolve();
        }
      };
      checkReady();
    });
  }

  // Campos editables Liferay
  function getEditableContent(id) {
    const selectors = [
      `[data-lfr-editable-id="${id}"]`,
      `#${id}`,
      `[id="${id}"]`
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent ? element.textContent.trim() : '';
        if (text) return text;
      }
    }
    return '';
  }

  function getEditableHTML(id) {
    const selectors = [
      `[data-lfr-editable-id="${id}"]`,
      `#${id}`,
      `[id="${id}"]`
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const html = element.innerHTML ? element.innerHTML.trim() : '';
        if (html) return html;
      }
    }
    return '';
  }

  function getMultipleVideoUrls(slideIndex) {
    const videoUrls = [];
    let videoIndex = 0;
    let hasMoreVideos = true;
    
    while (hasMoreVideos) {
      const videoUrl = getEditableContent(`project-video-${slideIndex}-${videoIndex}`);
      
      if (videoUrl && videoUrl.trim() !== '') {
        videoUrls.push(videoUrl.trim());
        videoIndex++;
      } else {
        hasMoreVideos = false;
      }
    }
    
    return videoUrls;
  }

  function getProjectDataFromHTML(slideIndex) {
    const title = getEditableContent(`project-title-${slideIndex}`);
    const date = getEditableContent(`project-date-${slideIndex}`);
    const responsible = getEditableContent(`project-responsible-${slideIndex}`);
    const description = getEditableHTML(`project-description-${slideIndex}`);
    
    const videoUrls = getMultipleVideoUrls(slideIndex);
    
    const galleryText = getEditableContent(`project-gallery-${slideIndex}`);
    const gallery = galleryText 
      ? galleryText.split(',').map(url => url.trim()).filter(url => url.length > 0)
      : [];

    if (!title && videoUrls.length === 0) {
      return getFallbackData(slideIndex);
    }

    return {
      title: title || `Proyecto ${slideIndex + 1}`,
      date: date || '2024',
      responsible: responsible || 'Equipo Universitario',
      description: description || 'Descripción del proyecto disponible próximamente.',
      videoUrls: videoUrls,
      gallery: gallery
    };
  }

  function getFallbackData(slideIndex) {
    const fallbackData = {
      0: {
        title: "Universidad Destacada",
        date: "2024",
        responsible: "Equipo Académico",
        description: "Descubre nuestros programas académicos de alta calidad.",
        videoUrls: ["https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s"],
        gallery: ["https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg"]
      },
      1: {
        title: "Investigación de Clase Mundial",
        date: "2023-2024",
        responsible: "Centro de Investigación",
        description: "Proyectos innovadores y logros académicos destacados.",
        videoUrls: ["https://www.youtube.com/watch?v=h3GuFxrk8aI"],
        gallery: ["https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2"]
      },
      2: {
        title: "Campus Innovador",
        date: "2024",
        responsible: "Departamento de Infraestructura",
        description: "Instalaciones modernas y entorno de aprendizaje de vanguardia.",
        videoUrls: ["https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s"],
        gallery: ["https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg"]
      },
      3: {
        title: "Oportunidades Internacionales",
        date: "2023-2024",
        responsible: "Oficina Internacional",
        description: "Programas de intercambio y colaboraciones globales.",
        videoUrls: ["https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s"],
        gallery: ["https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png"]
      }
    };

    return fallbackData[slideIndex] || {
      title: `Proyecto ${slideIndex + 1}`,
      date: "2024",
      responsible: "Equipo Universitario",
      description: "Información disponible próximamente.",
      videoUrls: ["https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s"],
      gallery: []
    };
  }

  // FUNCIONES DE CENTRADO DINÁMICO CON FIX INTEGRADO
  function applyCenteringLogic() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!carouselSection || !container || !wrapper) {
      console.log('Elementos de centrado no encontrados');
      return;
    }

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    
    console.log(`Aplicando lógica de centrado corregida para ${slideCount} slides en ${window.innerWidth}px`);
    
    // Aplicar atributo data para CSS
    carouselSection.setAttribute('data-slides-count', slideCount);
    
    // USAR LA FUNCIÓN CORREGIDA PARA TODAS LAS PANTALLAS
    applyMobileTabletFix();
  }

  // ==============================
  // SISTEMA DE CONTROL DE VIDEOS
  // ==============================

  // Función para cargar la API de YouTube si no está cargada
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      isYouTubeAPIReady = true;
      return Promise.resolve();
    }
    
    return new Promise((resolve) => {
      // Si ya existe una función onYouTubeIframeAPIReady, la guardamos
      const existingCallback = window.onYouTubeIframeAPIReady;
      
      window.onYouTubeIframeAPIReady = function() {
        isYouTubeAPIReady = true;
        console.log('YouTube API cargada y lista');
        
        // Ejecutar callback existente si había uno
        if (existingCallback && typeof existingCallback === 'function') {
          existingCallback();
        }
        
        resolve();
      };
      
      // Solo cargar el script si no existe
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        console.log('Cargando YouTube API...');
      }
    });
  }

  // Función para pausar todos los videos excepto el activo
  function pauseAllVideosExcept(activePlayerId) {
    console.log(`Pausando todos los videos excepto: ${activePlayerId}`);
    
    youtubePlayersRegistry.forEach((player, playerId) => {
      if (playerId !== activePlayerId && player && typeof player.pauseVideo === 'function') {
        try {
          // Verificar si el video está reproduciéndose antes de pausar
          const playerState = player.getPlayerState();
          if (playerState === 1) { // 1 = playing
            player.pauseVideo();
            console.log(`Video pausado: ${playerId}`);
          }
        } catch (error) {
          console.warn(`Error pausando video ${playerId}:`, error);
        }
      }
    });
  }

  // Función para limpiar el registro de players
  function clearVideoRegistry() {
    console.log('Limpiando registro de videos');
    youtubePlayersRegistry.clear();
  }

  // Función para extraer ID de YouTube
  function extractYouTubeId(url) {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    
    return null;
  }

  function getTimeParam(url) {
    const timeMatch = url.match(/[&?]t=(\d+)/);
    return timeMatch ? `&start=${timeMatch[1]}` : '';
  }

  // Función mejorada para crear iframe con control de reproducción
  function createVideoIframe(videoUrl, title, videoIndex = 0) {
    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) return null;

    const timeParam = getTimeParam(videoUrl);
    const uniquePlayerId = `youtube-player-${Date.now()}-${videoIndex}`;
    
    // Crear contenedor para el player
    const playerContainer = document.createElement('div');
    playerContainer.id = uniquePlayerId;
    playerContainer.style.cssText = `
      width: 100% !important;
      height: 400px !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      background: #000 !important;
    `;

    const isMobile = window.innerWidth <= 768;
    const videoHeight = isMobile ? '350px' : '400px';
    playerContainer.style.height = `${videoHeight} !important`;

    // Función para inicializar el player de YouTube
    const initializePlayer = () => {
      if (!isYouTubeAPIReady || !window.YT || !window.YT.Player) {
        console.warn('YouTube API no está lista, usando iframe tradicional');
        return createFallbackIframe();
      }

      try {
        const startSeconds = timeParam ? parseInt(timeParam.replace('&start=', '')) : 0;
        
        const player = new window.YT.Player(uniquePlayerId, {
          height: videoHeight.replace('px', ''),
          width: '100%',
          videoId: videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            start: startSeconds,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              console.log(`Player listo: ${uniquePlayerId}`);
              // Registrar el player
              youtubePlayersRegistry.set(uniquePlayerId, event.target);
            },
            onStateChange: (event) => {
              // Cuando el video comienza a reproducirse (estado 1)
              if (event.data === 1) {
                console.log(`Video iniciado: ${uniquePlayerId}`);
                // Pausar todos los otros videos
                pauseAllVideosExcept(uniquePlayerId);
              }
            },
            onError: (event) => {
              console.error(`Error en video ${uniquePlayerId}:`, event.data);
            }
          }
        });

        console.log(`Player de YouTube creado: ${uniquePlayerId}`);
        return playerContainer;

      } catch (error) {
        console.error('Error creando player de YouTube:', error);
        return createFallbackIframe();
      }
    };

    // Iframe de respaldo si falla la API
    const createFallbackIframe = () => {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${timeParam}`;
      
      playerContainer.innerHTML = `
        <iframe
          src="${embedUrl}"
          title="${title} - Video ${videoIndex + 1}"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style="border: none; border-radius: 8px; display: block; background: #000;">
        </iframe>
      `;
      
      console.log(`Iframe de respaldo creado: ${uniquePlayerId}`);
      return playerContainer;
    };

    // Si la API está lista, inicializar inmediatamente; si no, usar fallback
    if (isYouTubeAPIReady) {
      setTimeout(initializePlayer, 100);
    } else {
      createFallbackIframe();
    }

    return playerContainer;
  }

  // Función mejorada para insertar múltiples videos con control
  function insertMultipleVideos(container, videoUrls, title) {
    if (!container) return;

    // Limpiar el registro anterior
    clearVideoRegistry();
    
    container.innerHTML = '';

    if (!videoUrls || !videoUrls.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No hay videos disponibles</div>';
      return;
    }

    console.log(`Insertando ${videoUrls.length} videos con control de reproducción para: ${title}`);

    // Cargar la API de YouTube si es necesario
    loadYouTubeAPI().then(() => {
      // Procesar cada video
      videoUrls.forEach((videoUrl, index) => {
        if (!videoUrl || !videoUrl.trim()) return;

        const videoContainer = createVideoIframe(videoUrl.trim(), title, index);
        
        if (videoContainer) {
          const videoWrapper = document.createElement('div');
          videoWrapper.style.cssText = `
            position: relative;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1.5rem;
          `;

          // Título del video si hay múltiples
          if (videoUrls.length > 1) {
            const videoTitle = document.createElement('div');
            videoTitle.style.cssText = `
              display: none;
            `;
            videoTitle.innerHTML = `
              <i class="ph ph-play-circle" style="font-size: 16px;"></i>
              Video ${index + 1}
            `;
            videoWrapper.appendChild(videoTitle);
          }

          // Indicador de carga
          const loadingIndicator = document.createElement('div');
          loadingIndicator.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #666;
            font-size: 14px;
            z-index: 5;
            background: rgba(255, 255, 255, 0.9);
            padding: 0.5rem 1rem;
            border-radius: 4px;
          `;
          loadingIndicator.textContent = 'Cargando video...';
          videoWrapper.appendChild(loadingIndicator);

          // Ocultar indicador después de un tiempo
          setTimeout(() => {
            if (loadingIndicator.parentNode) {
              loadingIndicator.style.display = 'none';
            }
          }, 3000);

          videoWrapper.appendChild(videoContainer);
          container.appendChild(videoWrapper);
        }
      });
    }).catch((error) => {
      console.error('Error cargando API de YouTube:', error);
      // Insertar videos con iframe tradicional como fallback
      insertFallbackVideos(container, videoUrls, title);
    });
  }

  // Función de respaldo para insertar videos sin la API
  function insertFallbackVideos(container, videoUrls, title) {
    console.log('Usando método de respaldo para videos');
    
    videoUrls.forEach((videoUrl, index) => {
      if (!videoUrl || !videoUrl.trim()) return;

      const videoId = extractYouTubeId(videoUrl);
      if (!videoId) return;

      const timeParam = getTimeParam(videoUrl);
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${timeParam}`;

      const videoWrapper = document.createElement('div');
      videoWrapper.style.cssText = `
        position: relative;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 1.5rem;
      `;

      if (videoUrls.length > 1) {
        const videoTitle = document.createElement('div');
        videoTitle.style.cssText = `
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.05);
          font-size: 14px;
          font-weight: 600;
          color: #333;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        `;
        videoTitle.textContent = `Video ${index + 1}`;
        videoWrapper.appendChild(videoTitle);
      }

      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = `${title} - Video ${index + 1}`;
      iframe.width = '100%';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');

      const isMobile = window.innerWidth <= 768;
      const videoHeight = isMobile ? '350px' : '400px';
      
      iframe.style.cssText = `
        width: 100% !important;
        height: ${videoHeight} !important;
        border: none !important;
        border-radius: 8px !important;
        display: block !important;
        background: #000 !important;
      `;

      videoWrapper.appendChild(iframe);
      container.appendChild(videoWrapper);
    });
  }

  // Función para limpiar videos al cerrar modal
  function cleanupModalVideos() {
    console.log('Limpiando videos del modal');
    
    // Pausar y limpiar todos los players
    youtubePlayersRegistry.forEach((player, playerId) => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo();
          player.destroy();
        } catch (error) {
          console.warn(`Error limpiando player ${playerId}:`, error);
        }
      }
    });
    
    clearVideoRegistry();
  }

  // ==============================
  // FUNCIONES DE GALERÍA
  // ==============================

  function insertGallery(container, gallery, title) {
    if (!container) return;

    container.innerHTML = '';

    if (!gallery || !gallery.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No hay imágenes disponibles</div>';
      return;
    }

    gallery.forEach((imageUrl, index) => {
      if (!imageUrl || !imageUrl.trim()) return;

      const imageUrl_clean = imageUrl.trim();

      const imageWrapper = document.createElement('div');
      imageWrapper.style.cssText = `
        width: 100%;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      `;

      const image = document.createElement('img');
      image.src = imageUrl_clean;
      image.alt = `${title} - Imagen ${index + 1}`;
      image.loading = 'lazy';
      
      const isMobile = window.innerWidth <= 768;
      const imageHeight = isMobile ? '250px' : '400px';
      
      image.style.cssText = `
        width: 100%;
        height: ${imageHeight};
        display: block;
        object-fit: cover;
        border-radius: inherit;
      `;

      imageWrapper.onmouseenter = function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
      };

      imageWrapper.onmouseleave = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      };

      imageWrapper.appendChild(image);
      container.appendChild(imageWrapper);
    });
  }

  // ==============================
  // FUNCIONES PRINCIPALES DEL CAROUSEL
  // ==============================

  function initCarousel() {
    const wrapper = document.getElementById('slides-wrapper');
    const container = document.getElementById('carousel-container');
    
    if (!wrapper || !container) {
      console.log('Elementos no encontrados, reintentando...');
      setTimeout(initCarousel, 500);
      return false;
    }

    const slides = wrapper.querySelectorAll('.carousel-slide');
    totalSlides = slides.length;
    
    if (totalSlides === 0) {
      console.log('No hay slides, reintentando...');
      setTimeout(initCarousel, 500);
      return false;
    }

    console.log(`Carousel completo inicializado: ${totalSlides} slides`);
    
    currentSlide = 0;
    
    setupBasicStyles();
    setupEvents();
    updatePosition();
    updateIndicators();
    
    // APLICAR CENTRADO Y FIX INMEDIATAMENTE
    setTimeout(() => {
      console.log('=== APLICANDO CENTRADO Y FIX CORREGIDO ===');
      applyCenteringLogic();
      setupPreventiveBlocking();
      preventiveBlock();
      
      // FORZAR APLICACIÓN INMEDIATA EN MOBILE/TABLET
      if (isMobileTablet()) {
        forceMobile200pxFix();
      }
    }, 100);
    
    isInitialized = true;
    return true;
  }

  function setupBasicStyles() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return;

    wrapper.style.display = 'flex';
    wrapper.style.transition = `transform ${CONFIG.SLIDE_TRANSITION_DURATION}ms ease`;
    wrapper.style.willChange = 'transform';
  }

  function setupPreventiveBlocking() {
    // Interceptar botones con validación preventiva
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    
    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      
      newNextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        console.log('Click SIGUIENTE interceptado');
        
        const state = preventiveBlock();
        if (state.shouldBlockNext) {
          console.log('CLICK BLOQUEADO: Ya en última posición válida');
          return false;
        }
        
        console.log('Click permitido - navegando siguiente');
        nextSlide();
        return false;
      }, { capture: true, passive: false });
    }
    
    if (prevBtn) {
      const newPrevBtn = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
      
      newPrevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        console.log('Click ANTERIOR interceptado');
        
        const state = preventiveBlock();
        if (state.shouldBlockPrev) {
          console.log('CLICK BLOQUEADO: Ya en primera posición');
          return false;
        }
        
        console.log('Click permitido - navegando anterior');
        prevSlide();
        return false;
      }, { capture: true, passive: false });
    }
    
    // Iniciar monitor preventivo continuo
    if (preventiveMonitorInterval) {
      clearInterval(preventiveMonitorInterval);
    }
    
    preventiveMonitorInterval = setInterval(() => {
      preventiveBlock();
    }, 200);
    
    console.log('Bloqueo preventivo configurado');
  }

  function setupEvents() {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    // TOUCH EVENTS CON BLOQUEO PREVENTIVO
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1 || isTransitioning) return;
      touchStartX = e.touches[0].clientX;
      isTouching = true;
      console.log('Touch start:', touchStartX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      const currentTouch = e.touches[0].clientX;
      const diff = Math.abs(currentTouch - touchStartX);
      
      if (diff > 15) {
        e.preventDefault();
      }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      if (!isTouching) return;
      
      touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX - touchEndX;
      
      console.log('Touch end:', touchEndX, 'Distance:', distance);
      
      if (Math.abs(distance) > CONFIG.MIN_SWIPE_DISTANCE) {
        const state = preventiveBlock();
        
        if (distance > 0) {
          console.log('Swipe izquierda -> SIGUIENTE');
          if (!state.shouldBlockNext) {
            nextSlide();
          } else {
            console.log('TOUCH BLOQUEADO: Ya en última posición válida');
          }
        } else {
          console.log('Swipe derecha -> ANTERIOR');
          if (!state.shouldBlockPrev) {
            prevSlide();
          } else {
            console.log('TOUCH BLOQUEADO: Ya en primera posición');
          }
        }
      }
      
      isTouching = false;
    }, { passive: true });

    // Indicadores
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index;
      
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(indicatorIndex);
      });
    });

    // Clicks en slides
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide-index')) || index;
      
      if (!slide.getAttribute('onclick')) {
        slide.addEventListener('click', (e) => {
          if (!isTouching) {
            e.preventDefault();
            openCarouselModal(slideIndex);
          }
        });
      }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
      const modalOpen = document.getElementById('modal-backdrop-carousel')?.classList.contains('show');
      
      if (!modalOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            const statePrev = preventiveBlock();
            if (!statePrev.shouldBlockPrev) {
              prevSlide();
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            const stateNext = preventiveBlock();
            if (!stateNext.shouldBlockNext) {
              nextSlide();
            }
            break;
        }
      }
    });

    // Responsive con centrado y bloqueo - REAPLICAR FIX EN RESIZE
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        console.log('RESIZE DETECTADO - Reaplicando fix corregido');
        updatePosition();
        applyCenteringLogic();
        
        // Forzar fix después de resize
        if (isMobileTablet()) {
          setTimeout(() => {
            forceMobile200pxFix();
          }, 100);
        }
        
        preventiveBlock();
      }, 250);
    });

    console.log('Eventos configurados con bloqueo preventivo y fix corregido');
  }

  // NAVEGACIÓN CON VALIDACIÓN PREVENTIVA
  function nextSlide() {
    if (isTransitioning) return;
    
    // Validación preventiva interna adicional
    const realSlide = syncCarouselState();
    const limit = calculateRealLimit();
    
    if (realSlide >= limit) {
      console.log('NAVEGACIÓN BLOQUEADA: Ya en última posición válida');
      preventiveBlock(); // Forzar estado visual
      return;
    }
    
    const oldSlide = currentSlide;
    currentSlide = currentSlide + 1;
    
    console.log(`-> Slide ${oldSlide} a ${currentSlide}`);
    updatePositionWithAnimation();
    updateIndicators();
    
    // Aplicar bloqueo después de navegación
    setTimeout(() => {
      preventiveBlock();
    }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
  }

  function prevSlide() {
    if (isTransitioning) return;
    
    // Validación preventiva interna adicional
    const realSlide = syncCarouselState();
    
    if (realSlide <= 0) {
      console.log('NAVEGACIÓN BLOQUEADA: Ya en primera posición');
      preventiveBlock(); // Forzar estado visual
      return;
    }
    
    const oldSlide = currentSlide;
    currentSlide = currentSlide - 1;
    
    console.log(`<- Slide ${oldSlide} a ${currentSlide}`);
    updatePositionWithAnimation();
    updateIndicators();
    
    // Aplicar bloqueo después de navegación
    setTimeout(() => {
      preventiveBlock();
    }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
  }

  function goToSlide(targetSlide) {
    if (isTransitioning || targetSlide === currentSlide) return;
    
    const limit = calculateRealLimit();
    
    if (targetSlide >= 0 && targetSlide <= limit) {
      currentSlide = targetSlide;
      console.log(`Ir a slide ${currentSlide} (última válida: ${limit})`);
      updatePositionWithAnimation();
      updateIndicators();
      
      setTimeout(() => {
        preventiveBlock();
      }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
    } else {
      console.log(`Slide ${targetSlide} fuera de límites navegables (0-${limit})`);
    }
  }

  // POSICIONAMIENTO MEJORADO
  function updatePositionWithAnimation() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    updatePosition();
    
    setTimeout(() => {
      isTransitioning = false;
    }, CONFIG.SLIDE_TRANSITION_DURATION);
  }

  function updatePosition() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return;
    
    const container = document.getElementById('carousel-container');
    
    // Si está en modo centrado, no aplicar transform
    if (container && (
      container.classList.contains('force-center') || 
      container.classList.contains('auto-center') ||
      wrapper.classList.contains('force-center')
    )) {
      console.log('Modo centrado activo - no aplicar transform');
      wrapper.style.transform = 'none';
      return;
    }
    
    // Aplicar transform específico para mobile/tablet vs desktop
    if (isMobileTablet()) {
      const slideWidth = 260;
      const gap = 8;
      const containerWidth = container.offsetWidth;
      
      // NUEVO: Considerar el centrado de la primera card en mobile
      let translateX = currentSlide * (slideWidth + gap);
      
      // Si es la primera card y cabe más de una card, centrar mejor
      if (currentSlide === 0 && containerWidth > slideWidth + gap) {
        const availableSpace = containerWidth - slideWidth;
        const centering = Math.max(0, availableSpace * 0.1); // Pequeño ajuste de centrado
        translateX = Math.max(0, translateX - centering);
      }
      
      wrapper.style.transform = `translateX(-${translateX}px)`;
      console.log(`Mobile/Tablet navegación: slide ${currentSlide}, translateX=${translateX}px`);
    } else {
      const slideWidth = 280;
      const gap = 10;
      const translateX = currentSlide * (slideWidth + gap);
      wrapper.style.transform = `translateX(-${translateX}px)`;
      console.log(`Desktop navegación: slide ${currentSlide}, translateX=${translateX}px`);
    }
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index;
      
      if (indicatorIndex === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // FUNCIÓN PARA FORZAR APLICACIÓN
  function forceMobile200pxFix() {
    if (!isMobileTablet()) {
      console.log('No es mobile/tablet - saltando fix');
      return;
    }
    
    console.log('=== APLICANDO FIX CORREGIDO ===');
    
    // Ejecutar la lógica principal de fix
    applyMobileTabletFix();
    
    // Asegurar que la posición esté correcta
    if (currentSlide > 0) {
      const newLimit = calculateRealLimitMobileTablet();
      if (currentSlide > newLimit) {
        currentSlide = newLimit;
      }
      updatePosition();
    }
    
    preventiveBlock();
    updateIndicators();
    
    console.log('Fix corregido aplicado');
    console.log('======================');
  }

  // FUNCIONES DE CENTRADO MANUAL
  function forceCenterCarousel() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!carouselSection || !container || !wrapper) {
      console.log('No se pueden centrar - elementos no encontrados');
      return;
    }
    
    console.log('Forzando centrado manual...');
    
    // Limpiar clases de navegación y mobile
    carouselSection.classList.remove('has-navigation', 'mobile-needs-scroll', 'mobile-last-card-fix', 'force-navigation-mobile');
    carouselSection.classList.add('content-fits', 'no-navigation', 'force-center-mobile');
    
    // Aplicar clases de centrado
    container.classList.add('auto-center', 'force-center');
    wrapper.classList.add('force-center');
    
    // Limpiar estilos de mobile fix
    wrapper.style.paddingRight = '';
    wrapper.style.width = '';
    wrapper.style.marginRight = '';
    wrapper.style.transform = 'none';
    
    currentSlide = 0;
    hideNavigationButtons();
    updateIndicators();
    
    console.log('Centrado manual aplicado');
  }

  function forceNavigationMode() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!carouselSection || !container || !wrapper) {
      console.log('No se puede activar navegación - elementos no encontrados');
      return;
    }
    
    console.log('Forzando modo navegación manual...');
    
    // Limpiar clases de centrado
    carouselSection.classList.remove('content-fits', 'no-navigation', 'force-center-mobile');
    carouselSection.classList.add('has-navigation', 'force-navigation-mobile');
    
    // Quitar clases de centrado
    container.classList.remove('auto-center', 'force-center');
    wrapper.classList.remove('force-center');
    
    // Reset a primera posición
    currentSlide = 0;
    updatePosition();
    
    // Aplicar fix si es necesario
    if (isMobileTablet()) {
      forceMobile200pxFix();
    } else {
      showNavigationButtons();
    }
    
    preventiveBlock();
    updateIndicators();
    
    console.log('Modo navegación manual aplicado');
  }

  // ==============================
  // FUNCIONES DE MODAL
  // ==============================

  function openCarouselModal(slideIndex) {
    console.log(`Abriendo modal para slide ${slideIndex}`);
    
    const projectData = getProjectDataFromHTML(slideIndex);
    
    if (!projectData.title && projectData.videoUrls.length === 0) {
      console.error(`Datos insuficientes para slide ${slideIndex}`);
      return;
    }

    try {
      const modalBackdrop = document.getElementById('modal-backdrop-carousel');
      const modalTitle = document.getElementById('modal-project-title');
      const modalDate = document.getElementById('modal-project-date');
      const modalResponsible = document.getElementById('modal-project-responsible');
      const modalDescription = document.getElementById('modal-project-description');
      const videosContainer = document.getElementById('modal-project-videos');
      const galleryContainer = document.getElementById('modal-project-gallery-items');

      if (!modalBackdrop || !videosContainer || !galleryContainer) {
        console.error('Elementos del modal no encontrados');
        return;
      }

      if (modalTitle) modalTitle.innerHTML = projectData.title;
      if (modalDate) modalDate.textContent = projectData.date;
      if (modalResponsible) modalResponsible.textContent = projectData.responsible;
      if (modalDescription) modalDescription.innerHTML = projectData.description;

      modalBackdrop.classList.add('show');
      modalBackdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (projectData.videoUrls && projectData.videoUrls.length > 0) {
          insertMultipleVideos(videosContainer, projectData.videoUrls, projectData.title);
        }
      }, 100);

      setTimeout(() => {
        if (projectData.gallery && projectData.gallery.length > 0) {
          insertGallery(galleryContainer, projectData.gallery, projectData.title);
        }
      }, 200);

    } catch (error) {
      console.error('Error abriendo modal:', error);
    }
  }

  // FUNCIÓN ACTUALIZADA closeCarouselModal CON LIMPIEZA DE VIDEOS
  function closeCarouselModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
      return;
    }

    const modalBackdrop = document.getElementById('modal-backdrop-carousel');
    if (!modalBackdrop) return;

    // Limpiar videos antes de cerrar
    cleanupModalVideos();

    modalBackdrop.classList.remove('show');
    modalBackdrop.style.display = 'none';

    const videosContainer = document.getElementById('modal-project-videos');
    const galleryContainer = document.getElementById('modal-project-gallery-items');

    if (videosContainer) videosContainer.innerHTML = '';
    if (galleryContainer) galleryContainer.innerHTML = '';

    document.body.style.overflow = '';
  }

  function setupModalEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modalBackdrop = document.getElementById('modal-backdrop-carousel');
        if (modalBackdrop && modalBackdrop.classList.contains('show')) {
          closeCarouselModal();
        }
      }
    });

    const closeBtn = document.querySelector('#modal-backdrop-carousel .modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCarouselModal);
    }
  }

  // SETUP OBSERVER PARA CAMBIOS EN SLIDES
  function setupSlideObserver() {
    if ('MutationObserver' in window) {
      const wrapper = document.getElementById('slides-wrapper');
      if (wrapper) {
        const slideObserver = new MutationObserver((mutations) => {
          let slidesChanged = false;
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              slidesChanged = true;
            }
          });
          
          if (slidesChanged) {
            console.log('Slides modificados, reaplicando centrado y fix corregido');
            setTimeout(() => {
              applyCenteringLogic();
              if (isMobileTablet()) {
                forceMobile200pxFix();
              }
              preventiveBlock();
            }, 100);
          }
        });
        
        slideObserver.observe(wrapper, {
          childList: true,
          subtree: true
        });
        
        console.log('Observer de slides configurado');
      }
    }
  }

  // ==============================
  // FUNCIONES DE DEBUG
  // ==============================

  function debugMobileTablet() {
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!wrapper) {
      console.log('Wrapper no encontrado');
      return;
    }
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    const containerWidth = container ? container.offsetWidth : 0;
    const slideWidth = 260;
    const gap = 8;
    const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);
    
    // Calcular espacio extra aplicado
    let extraSpace = 0;
    if (isMobile()) {
      extraSpace = 80;
    } else if (isTabletSmall()) {
      extraSpace = 60;
    }
    
    const carouselSection = document.getElementById('carousel-section');
    
    console.log('=== DEBUG MOBILE/TABLET CORREGIDO ===');
    console.log(`Ancho ventana: ${window.innerWidth}px`);
    console.log(`Es mobile: ${isMobile()}`);
    console.log(`Es tablet pequeño: ${isTabletSmall()}`);
    console.log(`Debe mostrar botones: ${shouldShowNavigationButtons()}`);
    console.log(`Slides: ${slideCount}`);
    console.log(`Container: ${containerWidth}px`);
    console.log(`Espacio extra conservador: ${extraSpace}px`);
    console.log(`Contenido total: ${totalContentWidth}px`);
    console.log(`¿Necesita scroll?: ${totalContentWidth > containerWidth}`);
    console.log(`¿Debería centrar?: ${shouldCenterContent()}`);
    console.log(`Límite calculado: ${calculateRealLimitMobileTablet()}`);
    console.log(`Slide actual: ${currentSlide}`);
    console.log(`Transform: ${wrapper.style.transform}`);
    console.log(`Clases carousel:`, carouselSection?.classList.toString());
    console.log(`Clases container:`, container?.classList.toString());
    console.log(`Clases wrapper:`, wrapper?.classList.toString());
    console.log(`Estilos wrapper:`, wrapper.style.cssText);
    console.log('===================================');
  }

  function checkLastCardVisibility() {
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    if (!container || !wrapper) return false;
    
    const slides = wrapper.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return true;
    
    const lastSlide = slides[slides.length - 1];
    const containerRect = container.getBoundingClientRect();
    const lastSlideRect = lastSlide.getBoundingClientRect();
    
    // Verificar si la última card está completamente visible
    const isFullyVisible = lastSlideRect.right <= containerRect.right;
    
    console.log('=== VISIBILIDAD ÚLTIMA CARD ===');
    console.log(`Container right: ${containerRect.right}`);
    console.log(`Última card right: ${lastSlideRect.right}`);
    console.log(`¿Última card visible?: ${isFullyVisible}`);
    console.log(`Diferencia: ${lastSlideRect.right - containerRect.right}px`);
    console.log('==============================');
    
    return isFullyVisible;
  }

  // ==============================
  // FUNCIONES GLOBALES Y EXPORTS
  // ==============================

  window.openCarouselModal = openCarouselModal;
  window.closeCarouselModal = closeCarouselModal;
  window.carouselPrevSlide = prevSlide;
  window.carouselNextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.applyCenteringLogic = applyCenteringLogic;
  window.preventiveBlock = preventiveBlock;
  window.syncCarouselState = syncCarouselState;
  window.forceCenterCarousel = forceCenterCarousel;
  window.forceNavigationMode = forceNavigationMode;
  window.shouldCenterContent = shouldCenterContent;
  window.isMobileTablet = isMobileTablet;
  window.isMobile = isMobile;
  window.isTabletSmall = isTabletSmall;
  window.shouldShowNavigationButtons = shouldShowNavigationButtons;
  window.applyMobileTabletFix = applyMobileTabletFix;
  window.forceMobile200pxFix = forceMobile200pxFix;
  window.checkLastCardVisibility = checkLastCardVisibility;
  window.insertMultipleVideos = insertMultipleVideos;
  window.cleanupModalVideos = cleanupModalVideos;

  // DEBUG FUNCTIONS
  window.debugCarousel = function() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');
    
    console.log('=== DEBUG CAROUSEL COMPLETO v8.0 ===');
    console.log(`  - Slide actual: ${currentSlide}/${totalSlides-1}`);
    console.log(`  - Es mobile: ${isMobile()}`);
    console.log(`  - Es tablet pequeño: ${isTabletSmall()}`);
    console.log(`  - Es mobile/tablet: ${isMobileTablet()}`);
    console.log(`  - Debe mostrar botones: ${shouldShowNavigationButtons()}`);
    
    if (totalSlides > 0) {
      const limit = calculateRealLimit();
      const realSlide = syncCarouselState();
      console.log(`  - Slide real (calculado): ${realSlide}`);
      console.log(`  - Última posición válida: ${limit}`);
      console.log(`  - En primera posición: ${realSlide <= 0}`);
      console.log(`  - En última posición: ${realSlide >= limit}`);
      console.log(`  - ¿Debería centrar?: ${shouldCenterContent()}`);
    }
    
    console.log(`  - Touch activo: ${isTouching}`);
    console.log(`  - Transición: ${isTransitioning}`);
    
    if (wrapper) {
      console.log(`  - Transform: ${wrapper.style.transform}`);
    }
    
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn && nextBtn) {
      console.log(`  - Prev habilitado: ${!prevBtn.disabled}`);
      console.log(`  - Next habilitado: ${!nextBtn.disabled}`);
    }
    
    if (wrapper && container) {
      const slides = wrapper.querySelectorAll('.carousel-slide');
      const slideCount = slides.length;
      const slideWidth = isMobileTablet() ? 260 : 280;
      const gap = isMobileTablet() ? 8 : 10;
      const containerWidth = container.offsetWidth;
      const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);
      
      console.log(`  - Container: ${containerWidth}px`);
      console.log(`  - Contenido total: ${totalContentWidth}px`);
      console.log(`  - Data attribute: ${carouselSection?.getAttribute('data-slides-count')}`);
      console.log(`  - Clases carousel:`, carouselSection?.classList.toString());
      console.log(`  - Clases container:`, container?.classList.toString());
      console.log(`  - Clases wrapper:`, wrapper?.classList.toString());
    }
    console.log('====================================');
  };

  window.debugMobileTablet = debugMobileTablet;

  window.debugBreakpoints = function() {
    console.log('=== DEBUG BREAKPOINTS ===');
    console.log(`Ancho ventana: ${window.innerWidth}px`);
    console.log(`Es mobile: ${isMobile()}`);
    console.log(`Es tablet pequeño: ${isTabletSmall()}`);
    console.log(`Es mobile/tablet: ${isMobileTablet()}`);
    console.log(`Debe mostrar botones: ${shouldShowNavigationButtons()}`);
    console.log(`Debe centrar: ${shouldCenterContent()}`);
    
    const limit = calculateRealLimit();
    console.log(`Límite calculado: ${limit}`);
    console.log(`Slide actual: ${currentSlide}`);
    
    const lastCardVisible = checkLastCardVisibility();
    console.log(`¿Última card visible?: ${lastCardVisible}`);
    console.log('========================');
  };

  // FUNCIONES DE DEBUG PARA VIDEOS
  window.debugVideoPlayers = function() {
    console.log('=== DEBUG VIDEO PLAYERS ===');
    console.log(`YouTube API lista: ${isYouTubeAPIReady}`);
    console.log(`Players registrados: ${youtubePlayersRegistry.size}`);
    
    youtubePlayersRegistry.forEach((player, playerId) => {
      try {
        const state = player.getPlayerState();
        const stateNames = {
          '-1': 'no iniciado',
          '0': 'terminado',
          '1': 'reproduciendo',
          '2': 'pausado',
          '3': 'cargando',
          '5': 'en cola'
        };
        console.log(`- ${playerId}: ${stateNames[state] || 'desconocido'} (${state})`);
      } catch (error) {
        console.log(`- ${playerId}: error obteniendo estado`);
      }
    });
    console.log('==========================');
  };

  window.pauseAllVideos = function() {
    console.log('Pausando todos los videos manualmente');
    pauseAllVideosExcept(null);
  };

  window.forceValidateAndBlock = function() {
    console.log('Forzando validación y bloqueo...');
    const state = preventiveBlock();
    console.log('Estado de bloqueo:', state);
  };

  // ==============================
  // INICIALIZACIÓN COMPLETA
  // ==============================

  async function initializeComplete() {
    console.log('Inicializando carousel completo con control de videos v8.0...');

    try {
      await waitForLiferayReady();
      
      const carouselOK = initCarousel();
      setupModalEvents();
      setupSlideObserver();
      
      if (carouselOK) {
        console.log('Inicialización completada - Carousel con control de videos funcionando');
        console.log('Funciones disponibles: debugCarousel(), debugMobileTablet(), debugBreakpoints(), debugVideoPlayers(), checkLastCardVisibility()');
      } else {
        console.error('Error en inicialización');
      }

    } catch (error) {
      console.error('Error crítico:', error);
    }
  }

  // Limpiar monitor previo si existe
  function cleanup() {
    if (preventiveMonitorInterval) {
      clearInterval(preventiveMonitorInterval);
      preventiveMonitorInterval = null;
    }
    
    // Limpiar videos también
    cleanupModalVideos();
  }

  // Múltiples puntos de inicialización
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComplete);
  } else {
    initializeComplete();
  }

  if (typeof Liferay !== 'undefined' && Liferay.on) {
    Liferay.on('allPortletsReady', initializeComplete);
  }

  setTimeout(initializeComplete, 1000);

  // Cleanup al salir
  window.addEventListener('beforeunload', cleanup);

  console.log('Carousel Completo con Control de Videos v8.0 cargado');

})();