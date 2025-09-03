// ===== EXPERIENCIA JAVERIANA - CARRUSEL =====
// Script VANILLA JavaScript - SOLO para Liferay DXP
// SIN exports, SIN modules, SIN use strict

// Verificar que no estamos en un contexto de módulo
if (typeof module === 'undefined' && typeof exports === 'undefined') {
  // Variables globales del componente
  var experienceSwiper = null
  var videoStates = new Map() // Rastrear estado de cada video

  // Función para calcular cuántos slides caben visualmente en el viewport
  function getSlidesVisibleInViewport(windowWidth, slideWidth, gap) {
    var containerPadding = windowWidth < 768 ? 30 : 60
    var availableWidth = windowWidth - containerPadding
    var slideWithGap = slideWidth + gap
    var slidesVisible = Math.floor((availableWidth + gap) / slideWithGap)
    return Math.max(1, slidesVisible)
  }

  // Función para determinar configuración según viewport real y slides totales
  function getDisplayConfig(windowWidth, totalSlides) {
    var slidesPerView, slideWidth
    var gap = 25

    if (windowWidth < 576) {
      slidesPerView = 1
      slideWidth = 320
    } else if (windowWidth < 768) {
      slidesPerView = 2
      slideWidth = 280
    } else if (windowWidth < 1024) {
      slidesPerView = 3
      slideWidth = 300
    } else {
      slidesPerView = 4
      slideWidth = 320
    }

    return {
      slidesPerView: slidesPerView,
      useGrid: totalSlides <= slidesPerView,
      slideWidth: slideWidth,
      gap: gap
    }
  }

  // Función para activar modo Grid
  function activateGridMode() {
    var slidesContainer = document.querySelector('.experience-carousel__slides')
    var paginationEl = document.querySelector('.experience-carousel__pagination')
    var prevButton = document.querySelector('.experience-carousel__prev')
    var nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.add('use-grid')
      slidesContainer.classList.remove('swiper-wrapper')
    }

    if (paginationEl) paginationEl.style.display = 'none'
    if (prevButton) prevButton.style.display = 'none'
    if (nextButton) nextButton.style.display = 'none'

    setTimeout(function() {
      loadVideos();
      setupVideoClickDetection();
    }, 100);
  }

  // Función para activar modo Swiper
  function activateSwiperMode() {
    var slidesContainer = document.querySelector('.experience-carousel__slides')
    var paginationEl = document.querySelector('.experience-carousel__pagination')
    var prevButton = document.querySelector('.experience-carousel__prev')
    var nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.remove('use-grid')
      slidesContainer.classList.add('swiper-wrapper')
    }

    if (paginationEl) paginationEl.style.display = 'flex'
    if (prevButton) prevButton.style.display = 'flex'
    if (nextButton) nextButton.style.display = 'flex'

    initializeSwiper()
  }

  // Función para inicializar Swiper
  function initializeSwiper() {
    // Destruir instancia existente si existe
    if (experienceSwiper) {
      experienceSwiper.destroy(true, true)
      experienceSwiper = null
    }

    var element = document.querySelector('.experience-carousel__wrapper.experience-swiper')
    if (!element) {
      var fallbackElement = document.querySelector('.experience-swiper')
      if (!fallbackElement) {
        console.error('[EXPERIENCE] Ningún elemento swiper encontrado')
        return
      }
    }

    if (!window.Swiper) {
      console.error('[EXPERIENCE] Swiper no está disponible')
      return
    }

    var swiperSelector = element ? '.experience-carousel__wrapper.experience-swiper' : '.experience-swiper'

    try {
      experienceSwiper = new window.Swiper(swiperSelector, {
        loop: false,
        spaceBetween: 25,
        watchOverflow: true,
        centeredSlides: false,
        grabCursor: true,
        allowTouchMove: true,
        slidesPerView: 1,

        pagination: {
          el: '.experience-carousel__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" aria-label="Ir a slide ' + (index + 1) + '"></span>'
          }
        },

        navigation: {
          nextEl: '.experience-carousel__next',
          prevEl: '.experience-carousel__prev'
        },

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 25
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 25
          }
        },

        on: {
          init: function(swiper) {
            setTimeout(function() {
              loadVideos();
              setupVideoClickDetection();
            }, 100);
          },
          slideChange: function (swiper) {
            pauseAllVideos()
          }
        }
      })

      console.log('[EXPERIENCE] Swiper inicializado correctamente')
    } catch (error) {
      console.error('[EXPERIENCE] Error inicializando Swiper:', error)
    }
  }

  // Sistema de carga de videos
  function loadVideos() {
    var videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')
    console.log('[EXPERIENCE] Cargando ' + videoContainers.length + ' videos')

    for (var i = 0; i < videoContainers.length; i++) {
      var container = videoContainers[i]
      var videoId = container.getAttribute('data-video-id')
      var orientation = container.getAttribute('data-video-orientation') || 'vertical'

      if (!videoId) continue

      var iframe = document.createElement('iframe');
      var params = 'autoplay=0&mute=0&loop=0&controls=1&modestbranding=1&playsinline=1&enablejsapi=1&rel=0';

      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?' + params
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.opacity = '0'
      iframe.style.transition = 'opacity 0.5s ease'
      iframe.allow = 'autoplay; encrypted-media; fullscreen'
      iframe.allowFullscreen = true
      iframe.loading = 'lazy'

      iframe.addEventListener('load', function () {
        this.style.opacity = '1'
        this.classList.add('loaded')
        this.parentNode.classList.add('video-loaded')
      })

      iframe.addEventListener('error', function () {})

      container.innerHTML = ''
      container.appendChild(iframe)

      createMuteButton(container, iframe, videoId)
    }
  }

  // Función para crear botón de mute personalizado
  function createMuteButton(container, iframe, videoId) {
    if (window.innerWidth < 1024) return

    var muteButton = document.createElement('button')
    muteButton.className = 'video-mute-button'
    muteButton.setAttribute('aria-label', 'Silenciar/Activar audio del video')
    muteButton.setAttribute('data-video-id', videoId)

    var isMuted = false;
    updateMuteButtonIcon(muteButton, isMuted);

    muteButton.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (isMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
          isMuted = false
          muteButton.classList.remove('muted')
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
          isMuted = true
          muteButton.classList.add('muted')
        }

        updateMuteButtonIcon(muteButton, isMuted)
      } catch (error) {
        console.error('[VIDEO] Error controlando audio: ' + videoId, error)
      }
    })

    container.appendChild(muteButton)
  }

  // Función para actualizar el ícono del botón de mute
  function updateMuteButtonIcon(button, isMuted) {
    var iconClass = isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'
    button.innerHTML = '<i class="ph ' + iconClass + '"></i>'
  }

  // Función para obtener ID único del video
  function getVideoId(iframe) {
    var videoId = iframe.getAttribute('data-iframe-id');
    if (!videoId) {
      // Extraer del src si no hay data-iframe-id
      var match = iframe.src.match(/embed\/([^?]+)/);
      videoId = match ? match[1] : 'video-' + Math.random().toString(36).substr(2, 9);
      iframe.setAttribute('data-iframe-id', videoId);
    }
    return videoId;
  }

  // Función para alternar estado de un video específico
  function toggleVideo(iframe) {
    var videoId = getVideoId(iframe);
    var isPlaying = videoStates.get(videoId) || false;
    
    try {
      if (isPlaying) {
        // Video se está reproduciendo -> Pausar
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        videoStates.set(videoId, false);
        console.log('[EXPERIENCE] Video pausado:', videoId);
      } else {
        // Video está pausado -> Reproducir
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        videoStates.set(videoId, true);
        console.log('[EXPERIENCE] Video reproduciendo:', videoId);
      }
    } catch (error) {
      console.warn('[EXPERIENCE] Error controlando video:', videoId, error);
    }
  }

  // Función para pausar videos (con excepción opcional)
  function pauseAllVideos(exceptIframe) {
    var videos = document.querySelectorAll('.experience-carousel__video-container iframe');
    console.log('[EXPERIENCE] Pausando videos, total encontrados:', videos.length);
    
    for (var i = 0; i < videos.length; i++) {
      var iframe = videos[i];

      // Saltar el iframe que se está reproduciendo
      if (exceptIframe && iframe === exceptIframe) {
        continue;
      }

      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        
        // Mostrar overlay de este video (está pausado)
        var container = iframe.parentNode;
        var overlay = container.querySelector('.video-click-detector');
        if (overlay) {
          overlay.style.display = 'flex';
          overlay.style.opacity = '1';
          overlay.style.pointerEvents = 'auto';
          console.log('[EXPERIENCE] Overlay mostrado para video pausado');
        }
      } catch (e) {
        // Silenciar errores cross-origin
        console.warn('[EXPERIENCE] Error pausando video:', e);
      }
    }
  }

  // Función para manejar resize y mostrar/ocultar botones de mute
  function handleResize() {
    var muteButtons = document.querySelectorAll('.video-mute-button')
    var isDesktop = window.innerWidth >= 1024

    for (var i = 0; i < muteButtons.length; i++) {
      muteButtons[i].style.display = isDesktop ? 'flex' : 'none'
    }
  }

  // Función para detectar clics en videos y pausar otros
  function setupVideoClickDetection() {
    var videoContainers = document.querySelectorAll('.experience-carousel__video-container');
    console.log('[EXPERIENCE] Configurando detección de clics en videos:', videoContainers.length);

    for (var i = 0; i < videoContainers.length; i++) {
      var container = videoContainers[i];
      var iframe = container.querySelector('iframe');

      if (!iframe || container.querySelector('.video-click-detector')) {
        continue; // Saltar si no hay iframe o ya tiene detector
      }

      // Crear overlay para detectar clics
      var overlay = document.createElement('div');
      overlay.className = 'video-click-detector';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.zIndex = '5';
      overlay.style.cursor = 'pointer';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.1)';
      overlay.style.pointerEvents = 'auto';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';

      // Crear botón de play invisible
      var playButton = document.createElement('button');
      playButton.className = 'video-play-button';
      playButton.style.position = 'absolute';
      playButton.style.top = '50%';
      playButton.style.left = '50%';
      playButton.style.transform = 'translate(-50%, -50%)';
      playButton.style.width = '80px';
      playButton.style.height = '80px';
      playButton.style.borderRadius = '50%';
      playButton.style.border = 'none';
      playButton.style.backgroundColor = 'rgba(255,255,255,0.9)';
      playButton.style.cursor = 'pointer';
      playButton.style.display = 'flex';
      playButton.style.alignItems = 'center';
      playButton.style.justifyContent = 'center';
      playButton.style.fontSize = '32px';
      playButton.style.color = '#2c5697'; // Primary color directo
      playButton.style.zIndex = '10';
      playButton.style.transition = 'all 0.3s ease';
      playButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      playButton.innerHTML = '<i class="ph ph-play-fill"></i>';
      playButton.setAttribute('aria-label', 'Reproducir video');

      console.log('[EXPERIENCE] Botón de play creado para video');

      // Estado inicial: mostrar botón de play
      overlay.style.opacity = '1';
      playButton.style.display = 'flex';

      // Agregar data attribute para identificar el iframe
      overlay.setAttribute('data-iframe-id', 'iframe-' + i);
      iframe.setAttribute('data-iframe-id', 'iframe-' + i);

      // Event listener para el botón de play
      playButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var currentIframe = container.querySelector('iframe');
        var overlay = container.querySelector('.video-click-detector');
        var playButton = this;

        console.log('[EXPERIENCE] Botón play clickeado - reproduciendo video');

        // Pausar todos los otros videos
        pauseAllVideos(currentIframe);

        // Reproducir este video
        try {
          currentIframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}', 
            '*'
          );
          console.log('[EXPERIENCE] Comando de reproducción enviado desde botón');
        } catch (error) {
          console.warn('[EXPERIENCE] Error al reproducir desde botón:', error);
        }

        // Ocultar overlay y botón de play
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        // Después de la transición, ocultar completamente
        setTimeout(function() {
          if (overlay.style.opacity === '0') {
            overlay.style.display = 'none';
            console.log('[EXPERIENCE] Overlay ocultado - video reproduciéndose');
          }
        }, 300);
      });

      // Hover effects para el botón de play
      playButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.style.backgroundColor = 'rgba(255,255,255,1)';
      });

      playButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1)';
        this.style.backgroundColor = 'rgba(255,255,255,0.9)';
      });

      // Event listener para el overlay (cuando video se está reproduciendo)
      overlay.addEventListener('click', function(e) {
        // Solo actuar si el overlay está visible (video pausado)
        if (this.style.opacity !== '0' && e.target === this) {
          console.log('[EXPERIENCE] Overlay clickeado - activando botón');
          // Activar el botón de play
          playButton.click();
        }
      });

      // Agregar botón al overlay
      overlay.appendChild(playButton);

      container.style.position = 'relative';
      container.appendChild(overlay);
    }
  }

  // Función principal para decidir qué modo usar
  function initializeCarousel() {
    var slides = document.querySelectorAll('.experience-carousel__slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    console.log('[EXPERIENCE] Inicializando carrusel - Slides encontrados: ' + totalSlides)

    if (totalSlides === 0) {
      console.warn('[EXPERIENCE] No se encontraron slides para inicializar')
      return
    }

    var config = getDisplayConfig(windowWidth, totalSlides)

    console.log(
      '[EXPERIENCE] Ventana: ' +
        windowWidth +
        'px, Slides: ' +
        totalSlides +
        ', Visibles: ' +
        config.slidesPerView +
        ', Usar Grid: ' +
        config.useGrid
    )

    if (config.useGrid) {
      console.log('[EXPERIENCE] Activando modo Grid')
      activateGridMode()
    } else {
      console.log('[EXPERIENCE] Activando modo Swiper')
      activateSwiperMode()
    }
  }

  // Función para manejar resize y recalcular modo
  function handleCarouselResize() {
    var slides = document.querySelectorAll('.experience-carousel__slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    var config = getDisplayConfig(windowWidth, totalSlides)
    var currentlyUsingGrid = document.querySelector('.experience-carousel__slides.use-grid')

    if (config.useGrid && !currentlyUsingGrid) {
      console.log('[EXPERIENCE] Cambiando a modo Grid')
      if (experienceSwiper) {
        experienceSwiper.destroy(true, true)
        experienceSwiper = null
      }
      activateGridMode()
    } else if (!config.useGrid && currentlyUsingGrid) {
      console.log('[EXPERIENCE] Cambiando a modo Swiper')
      activateSwiperMode()
    }

    handleResize()
  }

  // Función principal de inicialización
  function checkAndInit() {
    console.log('[EXPERIENCE] Verificando condiciones para inicializar...')

    // Verificar que existe el contenedor
    var container = document.querySelector('.experience-carousel')
    if (!container) {
      console.warn('[EXPERIENCE] Contenedor .experience-carousel no encontrado')
      return
    }

    // Inicializar carrusel
    initializeCarousel()

    // Agregar listener para resize
    window.addEventListener('resize', handleCarouselResize)

    console.log('[EXPERIENCE] Inicialización completada')
  }

  // INICIALIZACIÓN AUTOMÁTICA PARA LIFERAY
  // Múltiples estrategias para asegurar que se ejecute

  console.log('[EXPERIENCE] Script cargado - Estado del DOM:', document.readyState)

  if (document.readyState === 'loading') {
    console.log('[EXPERIENCE] DOM aún cargando, esperando DOMContentLoaded...')
    document.addEventListener('DOMContentLoaded', function () {
      console.log('[EXPERIENCE] DOMContentLoaded disparado')
      setTimeout(checkAndInit, 100)
    })
  } else {
    console.log('[EXPERIENCE] DOM ya listo, inicializando inmediatamente...')
    setTimeout(checkAndInit, 100)
  }

  // Backup: verificar también cuando window esté completamente cargado
  window.addEventListener('load', function () {
    console.log('[EXPERIENCE] Window load disparado')
    // Solo inicializar si no se ha hecho antes
    if (!document.querySelector('.experience-carousel__slides.use-grid') && !experienceSwiper) {
      setTimeout(checkAndInit, 200)
    }
  })

  // Exponer función globalmente para Liferay
  window.initExperienceCarousel = checkAndInit
} else {
  console.log('[EXPERIENCE] Detectado contexto de módulo, no ejecutando auto-inicialización')
}
