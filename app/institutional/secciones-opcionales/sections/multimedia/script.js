export default () => {
  const initializeMultimediaSlider = () => {
    // Destruir instancias existentes si existen
    if (window.multimediaMainSwiper) {
      window.multimediaMainSwiper.destroy(true, true)
    }
    if (window.multimediaThumbsSwiper) {
      window.multimediaThumbsSwiper.destroy(true, true)
    }

    // Verificar que Swiper esté disponible
    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Buscar elementos
    const mainElement = document.querySelector('.multimedia-slider_main-swiper')
    const thumbsElement = document.querySelector('.multimedia-slider_thumbs-swiper')

    if (!mainElement || !thumbsElement) {
      console.warn('Elementos del slider multimedia no encontrados')
      return
    }

    // Obtener datos del contenido multimedia
    let mediaContent = []
    try {
      const dataScript = document.getElementById('multimedia-data')
      if (dataScript) {
        mediaContent = JSON.parse(dataScript.textContent)
      }
    } catch (error) {
      console.error('Error al parsear datos multimedia:', error)
      return
    }

    // ==========================================
    // FUNCIÓN PARA CREAR IFRAME AUTOMÁTICO
    // ==========================================
    const createAutoplayIframe = videoId => {
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&showinfo=0&modestbranding=1&disablekb=1`
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      iframe.allowFullscreen = false
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.pointerEvents = 'none' // Evita interacción directa
      return iframe
    }

    // ==========================================
    // FUNCIÓN PARA PAUSAR VIDEO
    // ==========================================
    const pauseVideo = iframe => {
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        } catch (e) {
          console.warn('No se pudo pausar el video:', e)
        }
      }
    }

    // ==========================================
    // FUNCIÓN PARA REPRODUCIR VIDEO
    // ==========================================
    const playVideo = iframe => {
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
        } catch (e) {
          console.warn('No se pudo reproducir el video:', e)
        }
      }
    }

    // ==========================================
    // FUNCIÓN PARA MANEJAR VIDEOS EN SLIDES
    // ==========================================
    const handleVideoSlides = () => {
      const activeSlide = document.querySelector('.multimedia-slider_main-swiper .swiper-slide-active')
      const allSlides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')

      allSlides.forEach((slide, index) => {
        const slideIndex = parseInt(slide.dataset.slideIndex) || index
        const realIndex = slideIndex % mediaContent.length
        const item = mediaContent[realIndex]

        if (item && item.type === 'youtube') {
          const iframe = slide.querySelector('iframe')

          if (slide === activeSlide) {
            // Slide activo - reproducir
            if (!iframe) {
              // Crear iframe si no existe
              const img = slide.querySelector('img')
              if (img) {
                const newIframe = createAutoplayIframe(item.videoId)
                slide.replaceChild(newIframe, img)
              }
            } else {
              playVideo(iframe)
            }
          } else {
            // Slide inactivo - pausar
            if (iframe) {
              pauseVideo(iframe)
            }
          }
        }
      })
    }

    // ==========================================
    // INICIALIZAR SLIDER DE MINIATURAS
    // ==========================================
    window.multimediaThumbsSwiper = new window.Swiper('.multimedia-slider_thumbs-swiper', {
      spaceBetween: 10,
      slidesPerView: 6,
      freeMode: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.multimedia-slider_thumbs-next',
        prevEl: '.multimedia-slider_thumbs-prev'
      },
      breakpoints: {
        320: {
          slidesPerView: 3
        },
        480: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 5
        },
        1024: {
          slidesPerView: 6
        }
      }
    })

    // ==========================================
    // INICIALIZAR SLIDER PRINCIPAL
    // ==========================================
    window.multimediaMainSwiper = new window.Swiper('.multimedia-slider_main-swiper', {
      spaceBetween: 10,
      loop: true,
      thumbs: {
        swiper: window.multimediaThumbsSwiper
      },
      on: {
        slideChange: function () {
          // Manejar videos en el cambio de slide
          setTimeout(() => {
            handleVideoSlides()
          }, 100)
        },
        init: function () {
          // Agregar índices a los slides para tracking
          const slides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')
          slides.forEach((slide, index) => {
            slide.dataset.slideIndex = index
          })

          updateNavigationVisibility()
          // Manejar videos en la inicialización
          setTimeout(() => {
            handleVideoSlides()
          }, 200)
        },
        update: function () {
          updateNavigationVisibility()
        }
      }
    })

    // ==========================================
    // FUNCIÓN PARA ACTUALIZAR VISIBILIDAD DE NAVEGACIÓN
    // ==========================================
    const updateNavigationVisibility = () => {
      const totalSlides = mediaContent.length
      const nextBtn = document.querySelector('.multimedia-slider_thumbs-next')
      const prevBtn = document.querySelector('.multimedia-slider_thumbs-prev')

      if (!nextBtn || !prevBtn) return

      // Mostrar botones solo si hay más slides que los visibles
      const slidesPerView = window.multimediaThumbsSwiper.params.slidesPerView
      const needsNavigation = totalSlides > slidesPerView

      if (needsNavigation) {
        nextBtn.style.display = 'flex'
        prevBtn.style.display = 'flex'
        nextBtn.style.opacity = '1'
        prevBtn.style.opacity = '1'
      } else {
        nextBtn.style.display = 'none'
        prevBtn.style.display = 'none'
      }
    }
  }

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================
  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      // Esperar un poco para asegurar que el DOM esté listo
      setTimeout(initializeMultimediaSlider, 100)
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()

  // ==========================================
  // MANEJAR RESIZE
  // ==========================================
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.multimediaMainSwiper) {
        window.multimediaMainSwiper.update()
      }
      if (window.multimediaThumbsSwiper) {
        window.multimediaThumbsSwiper.update()
      }
    }, 250)
  })
}
