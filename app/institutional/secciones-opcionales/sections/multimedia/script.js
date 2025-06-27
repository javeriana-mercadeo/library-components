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

  // Datos del contenido multimedia (hardcoded para demo)
  const mediaContent = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Paisaje Natural',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      title: 'Video Musical',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Arquitectura Moderna',
      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'jNQXAC9IVRw',
      title: 'Video Educativo',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      title: 'Bosque Encantado',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'M7lc1UVf-VE',
      title: 'Video Tecnológico',
      thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg'
    }
  ]

  // Crear iframe para video con autoplay
  const createAutoplayIframe = videoId => {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&showinfo=0&modestbranding=1&disablekb=1`
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    iframe.allowFullscreen = false
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; pointer-events: none;'
    return iframe
  }

  // Controlar reproducción de videos
  const controlVideoPlayback = iframe => {
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      } catch (e) {
        console.warn('Error controlando video:', e)
      }
    }
  }

  // Pausar video
  const pauseVideo = iframe => {
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } catch (e) {
        console.warn('Error pausando video:', e)
      }
    }
  }

  // Manejar videos en slides activos/inactivos
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
          if (!iframe) {
            const img = slide.querySelector('img')
            if (img) {
              const newIframe = createAutoplayIframe(item.videoId)
              slide.replaceChild(newIframe, img)
            }
          } else {
            controlVideoPlayback(iframe)
          }
        } else {
          if (iframe) {
            pauseVideo(iframe)
          }
        }
      }
    })
  }

  // Actualizar visibilidad de navegación basado en mobile first
  const updateNavigationVisibility = () => {
    const nextBtn = document.querySelector('.multimedia-slider_thumbs-next')
    const prevBtn = document.querySelector('.multimedia-slider_thumbs-prev')
    
    if (!nextBtn || !prevBtn) return

    const totalSlides = mediaContent.length
    const currentSlidesPerView = window.multimediaThumbsSwiper?.params?.slidesPerView || 3
    const needsNavigation = totalSlides > currentSlidesPerView

    if (needsNavigation) {
      nextBtn.style.cssText = 'display: flex; opacity: 1;'
      prevBtn.style.cssText = 'display: flex; opacity: 1;'
    } else {
      nextBtn.style.display = 'none'
      prevBtn.style.display = 'none'
    }
  }

  // Configuración mobile first para breakpoints
  const getBreakpointConfig = () => ({
    // Mobile first - empezar desde el más pequeño
    320: { slidesPerView: 3, spaceBetween: 8 },
    480: { slidesPerView: 4, spaceBetween: 10 },
    768: { slidesPerView: 5, spaceBetween: 10 },
    1024: { slidesPerView: 6, spaceBetween: 10 }
  })

  // Inicializar slider de miniaturas con mobile first
  window.multimediaThumbsSwiper = new window.Swiper('.multimedia-slider_thumbs-swiper', {
    // Configuración base para móvil
    spaceBetween: 8,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    // Navegación
    navigation: {
      nextEl: '.multimedia-slider_thumbs-next',
      prevEl: '.multimedia-slider_thumbs-prev'
    },
    // Breakpoints mobile first
    breakpoints: getBreakpointConfig()
  })

  // Inicializar slider principal
  window.multimediaMainSwiper = new window.Swiper('.multimedia-slider_main-swiper', {
    spaceBetween: 10,
    loop: true,
    // Conectar con thumbnails
    thumbs: {
      swiper: window.multimediaThumbsSwiper
    },
    // Eventos del slider
    on: {
      init: function () {
        // Agregar índices a slides para tracking
        const slides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')
        slides.forEach((slide, index) => {
          slide.dataset.slideIndex = index
        })
        
        updateNavigationVisibility()
        
        // Controlar videos después de inicialización
        setTimeout(() => {
          handleVideoSlides()
        }, 200)
      },
      slideChange: function () {
        // Manejar videos en cambio de slide
        setTimeout(() => {
          handleVideoSlides()
        }, 100)
      },
      update: function () {
        updateNavigationVisibility()
      }
    }
  })

  // Manejar resize de ventana con debounce
  let resizeTimeout
  const handleResize = () => {
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
      updateNavigationVisibility()
    }, 250)
  }

  window.addEventListener('resize', handleResize)

  // Cleanup para remover listeners (opcional para uso futuro)
  return () => {
    window.removeEventListener('resize', handleResize)
    if (window.multimediaMainSwiper) {
      window.multimediaMainSwiper.destroy(true, true)
    }
    if (window.multimediaThumbsSwiper) {
      window.multimediaThumbsSwiper.destroy(true, true)
    }
  }
}

// Verificar y ejecutar cuando Swiper esté disponible
const checkAndInit = () => {
  if (typeof window !== 'undefined' && window.Swiper) {
    setTimeout(initializeMultimediaSlider, 100)
  } else {
    setTimeout(checkAndInit, 300)
  }
}

// Iniciar el proceso
checkAndInit()