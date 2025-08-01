export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true)
      window.experienceSwiper = null
    }

    // Buscar el elemento con selector primario y fallback
    const element = document.querySelector('.experience-carousel__wrapper.experience-swiper')
    if (!element) {
      console.warn('Elemento .experience-carousel__wrapper.experience-swiper no encontrado')
      const fallbackElement = document.querySelector('.experience-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    // Contar slides
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar el selector correcto
    const swiperSelector = element ? '.experience-carousel__wrapper.experience-swiper' : '.experience-swiper'

    try {
      window.experienceSwiper = new window.Swiper(swiperSelector, {
        loop: false,
        spaceBetween: 20,
        watchOverflow: true,
        centeredSlides: false,
        grabCursor: true,
        allowTouchMove: totalSlides > 1,

        pagination: {
          el: '.experience-carousel__pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
          }
        },

        navigation: {
          nextEl: '.experience-carousel__next',
          prevEl: '.experience-carousel__prev'
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true
          },
          576: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: false
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: false
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
            centeredSlides: false
          }
        },

        on: {
          init: function (swiper) {
            setTimeout(() => {
              loadVideos()
            }, 100)
          },
          slideChange: function (swiper) {
            pauseAllVideos()
          }
        }
      })
    } catch (error) {
      console.error('❌ [EXPERIENCE] Error inicializando Swiper:', error)
    }
  }

  // Sistema de carga de videos
  const loadVideos = () => {
    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    videoContainers.forEach((container, index) => {
      const videoId = container.getAttribute('data-video-id')
      const orientation = container.getAttribute('data-video-orientation') || 'vertical'

      if (!videoId) return

      const iframe = document.createElement('iframe')
      const params = new URLSearchParams({
        autoplay: '0',
        mute: '1',
        loop: '0',
        controls: '1',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '1',
        rel: '0'
      })

      iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.opacity = '0'
      iframe.style.transition = 'opacity 0.5s ease'
      iframe.allow = 'autoplay; encrypted-media; fullscreen'
      iframe.allowFullscreen = true
      iframe.loading = 'lazy'

      // Marcar como cargado cuando el iframe esté listo
      iframe.addEventListener('load', () => {
        iframe.style.opacity = '1'
        iframe.classList.add('loaded')
        container.classList.add('video-loaded')
      })

      iframe.addEventListener('error', () => {})

      container.innerHTML = ''
      container.appendChild(iframe)

      // Agregar botón de mute solo en desktop
      createMuteButton(container, iframe, videoId)
    })
  }

  // Función para crear botón de mute personalizado
  const createMuteButton = (container, iframe, videoId) => {
    // Solo crear en desktop (verificar ancho de pantalla)
    if (window.innerWidth < 1024) return // breakpoint-lg

    const muteButton = document.createElement('button')
    muteButton.className = 'video-mute-button'
    muteButton.setAttribute('aria-label', 'Silenciar/Activar audio del video')
    muteButton.setAttribute('data-video-id', videoId)

    // Estado inicial: sin silenciar (mute está en 1 por defecto en el iframe)
    let isMuted = true // Los videos inician silenciados
    updateMuteButtonIcon(muteButton, isMuted)

    // Event listener para toggle mute
    muteButton.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (isMuted) {
          // Activar sonido
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
          isMuted = false
          muteButton.classList.remove('muted')
        } else {
          // Silenciar
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
          isMuted = true
          muteButton.classList.add('muted')
          console.log(`🔇 [VIDEO] Audio silenciado: ${videoId}`)
        }

        updateMuteButtonIcon(muteButton, isMuted)
      } catch (error) {
        console.error(`❌ [VIDEO] Error controlando audio: ${videoId}`, error)
      }
    })

    container.appendChild(muteButton)
  }

  // Función para actualizar el ícono del botón de mute
  const updateMuteButtonIcon = (button, isMuted) => {
    const iconClass = isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'
    button.innerHTML = `<i class="ph ${iconClass}"></i>`
  }

  // Función para pausar videos
  const pauseAllVideos = () => {
    const videos = document.querySelectorAll('.experience-carousel__video-container iframe')
    videos.forEach(iframe => {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } catch (e) {
        // Silenciar errores cross-origin
      }
    })
  }

  // Función para manejar resize y mostrar/ocultar botones de mute
  const handleResize = () => {
    const muteButtons = document.querySelectorAll('.video-mute-button')
    const isDesktop = window.innerWidth >= 1024

    muteButtons.forEach(button => {
      button.style.display = isDesktop ? 'flex' : 'none'
    })
  }

  // Patrón exacto de planEstudio - inicialización directa
  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()

      // Agregar listener para resize
      window.addEventListener('resize', handleResize)
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()
}
