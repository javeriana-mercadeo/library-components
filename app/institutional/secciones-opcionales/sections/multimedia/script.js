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
    // FUNCIÓN PARA REPRODUCIR VIDEO
    // ==========================================
    window.playVideo = index => {
      const item = mediaContent[index]
      if (item && item.type === 'youtube') {
        const slide = document.querySelector('.multimedia-slider_main-swiper .swiper-slide-active')
        if (!slide) return

        const overlay = slide.querySelector('.multimedia-slider_video-overlay')
        const img = slide.querySelector('img')

        if (overlay && img) {
          // Ocultar overlay
          overlay.style.display = 'none'

          // Crear iframe de YouTube
          const iframe = document.createElement('iframe')
          iframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          iframe.allowFullscreen = true
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          iframe.style.border = 'none'

          // Reemplazar imagen con iframe
          slide.replaceChild(iframe, img)
        }
      }
    }

    // ==========================================
    // FUNCIÓN PARA RESTAURAR VIDEOS
    // ==========================================
    const restoreVideoSlides = () => {
      const slides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')
      slides.forEach((slide, index) => {
        const realIndex = index % mediaContent.length
        const item = mediaContent[realIndex]

        if (item && item.type === 'youtube') {
          const overlay = slide.querySelector('.multimedia-slider_video-overlay')
          const iframe = slide.querySelector('iframe')

          if (iframe && overlay) {
            // Mostrar overlay nuevamente
            overlay.style.display = 'flex'

            // Recrear imagen
            const img = document.createElement('img')
            img.src = item.thumbnail
            img.alt = item.title

            slide.replaceChild(img, iframe)
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
          // Pausar todos los videos cuando se cambie de slide
          const iframes = document.querySelectorAll('.multimedia-slider_main-swiper iframe')
          iframes.forEach(iframe => {
            const src = iframe.src
            if (src.includes('autoplay=1')) {
              iframe.src = src.replace('autoplay=1', 'autoplay=0')
            }
          })

          // Restaurar overlays en slides de video
          setTimeout(() => {
            restoreVideoSlides()
          }, 100)
        },
        init: function () {
          updateNavigationVisibility()
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
