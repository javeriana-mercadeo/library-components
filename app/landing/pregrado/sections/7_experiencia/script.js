export default function swiperExperience (){
  // Función para cargar Swiper dinámicamente
  const loadSwiper = async () => {
    // Verificar si Swiper ya está cargado globalmente
    if (typeof window !== 'undefined' && !window.Swiper) {
      // Verificar si ya existe el script
      const existingScript = document.querySelector('#swiper-js');
      const existingCSS = document.querySelector('#swiper-css');
      
      if (!existingScript) {
        // Cargar CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'swiper-css';
        document.head.appendChild(link);

        // Cargar JS
        const script = document.createElement('script');
        script.async = true;
        script.id = 'swiper-js';
        
        return new Promise((resolve) => {
          script.onload = () => {
            initializeSwiper();
            resolve();
          };
          document.head.appendChild(script);
        });
      } else {
        // Si el script existe pero Swiper no está listo, esperar
        return new Promise((resolve) => {
          const checkSwiper = () => {
            if (window.Swiper) {
              initializeSwiper();
              resolve();
            } else {
              setTimeout(checkSwiper, 100);
            }
          };
          checkSwiper();
        });
      }
    } else if (window.Swiper) {
      // Si Swiper ya está cargado, inicializar directamente
      initializeSwiper();
    }
  };

  // Función para inicializar Swiper específico para experience
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true);
    }

    // Verificar que el elemento existe
    const element = document.querySelector('.experience-swiper');
    if (!element) {
      console.warn('Elemento .experience-swiper no encontrado');
      return;
    }

    if (window.Swiper) {
      window.experienceSwiper = new window.Swiper('.experience-swiper', {
        loop: true,
        spaceBetween: 20,
        // Pagination bullets
        pagination: {
          el: '.experience-pagination',
          clickable: true,
          dynamicBullets: true
        },
        // Navigation arrows
        navigation: {
          nextEl: '.experience-next',
          prevEl: '.experience-prev',
        },
        // Responsive breakpoints
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1280: { 
            slidesPerView: 4,
            spaceBetween: 20,
          }
        }
      });
    }
  };

// ███████████████████████████████████████████████████████████████████████████████
// █                       SISTEMA DE VIDEO RESPONSIVO                           █
// ███████████████████████████████████████████████████████████████████████████████

const ResponsiveVideoSystem = {
  config: {
    defaultBreakpoint: 768,
    // Parámetros optimizados para YouTube
    videoParams: {
      autoplay: '1',
      mute: '1',
      loop: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      end: '',
      enablejsapi: '0',
      hl: 'es',
      cc_lang_pref: 'es'
    }
  },

  init() {
    Logger.debug('🎬 Inicializando sistema de video responsivo...')

    // Buscar contenedores de video responsivo
    const videoContainers = document.querySelectorAll('.program-data_media[data-video-mobile][data-video-desktop]')

    if (videoContainers.length === 0) {
      Logger.debug('No se encontraron videos responsivos para cargar')
      return false
    }

    // Inicializar cada contenedor
    videoContainers.forEach(container => {
      this.initializeResponsiveVideo(container)
    })

    // Setup responsive listener
    this.setupResponsiveListener()

    Logger.success(`Videos responsivos cargados: ${videoContainers.length}`)
    return true
  },

  initializeResponsiveVideo(container) {
    const mobileVideoId = container.dataset.videoMobile
    const desktopVideoId = container.dataset.videoDesktop
    const breakpoint = parseInt(container.dataset.breakpoint) || this.config.defaultBreakpoint

    if (!mobileVideoId || !desktopVideoId) {
      Logger.warning('Videos mobile/desktop no configurados', { mobileVideoId, desktopVideoId })
      return
    }

    // Limpiar contenedor
    container.innerHTML = ''

    // Crear ambos iframes
    const mobileIframe = this.createVideoIframe(mobileVideoId, 'mobile')
    const desktopIframe = this.createVideoIframe(desktopVideoId, 'desktop')

    // Agregar al DOM
    container.appendChild(mobileIframe)
    container.appendChild(desktopIframe)

    // Configurar visibilidad inicial
    this.updateVideoVisibility(container, breakpoint)

    // Marcar como listo
    container.classList.add('responsive-video-ready')
    container.setAttribute('data-breakpoint', breakpoint)

    Logger.debug(`Videos configurados - Mobile: ${mobileVideoId}, Desktop: ${desktopVideoId}`)
  },

  createVideoIframe(videoId, type) {
    const iframe = document.createElement('iframe')

    // Parámetros con playlist para loop
    const params = { ...this.config.videoParams, playlist: videoId }
    const videoParams = new URLSearchParams(params)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    // Configurar iframe
    iframe.src = videoSrc
    iframe.title = `Video ${type} - ${videoId}`
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.className = `program-data__iframe program-data__iframe--${type}`
    iframe.setAttribute('data-video-id', videoId)
    iframe.setAttribute('data-video-type', type)

    // Event listeners
    EventManager.add(iframe, 'load', () => {
      Logger.success(`Video ${type} (${videoId}) cargado correctamente`)
      iframe.style.opacity = '1'
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video ${type} (${videoId})`)
    })

    return iframe
  },

  updateVideoVisibility(container, breakpoint) {
    const isMobile = window.innerWidth < breakpoint
    const mobileIframe = container.querySelector('.program-data__iframe--mobile')
    const desktopIframe = container.querySelector('.program-data__iframe--desktop')

    if (!mobileIframe || !desktopIframe) return

    if (isMobile) {
      mobileIframe.style.display = 'block'
      desktopIframe.style.display = 'none'
      container.setAttribute('data-current-video', 'mobile')
      Logger.debug('Video mobile activado')
    } else {
      mobileIframe.style.display = 'none'
      desktopIframe.style.display = 'block'
      container.setAttribute('data-current-video', 'desktop')
      Logger.debug('Video desktop activado')
    }
  },

  setupResponsiveListener() {
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = TimingUtils.delay(() => {
        const containers = document.querySelectorAll('.program-data_media.responsive-video-ready')

        containers.forEach(container => {
          const breakpoint = parseInt(container.getAttribute('data-breakpoint')) || this.config.defaultBreakpoint
          this.updateVideoVisibility(container, breakpoint)
        })
      }, 150)
    }

    EventManager.add(window, 'resize', handleResize)
  },

  // Función para pausar videos (optimización de batería)
  pauseAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=1')) {
        // Cambiar autoplay a 0 temporalmente
        iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0')
      }
    })
    Logger.debug('Videos pausados para ahorro de batería')
  },

  // Función para reanudar videos
  resumeAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=0')) {
        // Restaurar autoplay a 1
        iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1')
      }
    })
    Logger.debug('Videos reanudados')
  }
}

  // Ejecutar la carga de Swiper
  loadSwiper();

  // Retornar función de cleanup
  return () => {
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true);
      window.experienceSwiper = null;
      window.ResponsiveVideoSystem = ResponsiveVideoSystem;
    }
  };
}