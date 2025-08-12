// ==========================================
// SISTEMA DE LOGS CONFIGURABLE
// ==========================================
const MultimediaLogger = {
  // Configuración de logs (cambiar a false para producción)
  enabled: false, // Cambiar a false para desactivar todos los logs

  log: function (message, data = null) {
    if (!this.enabled) return
    if (data) {
      console.log(`📱 [Multimedia] ${message}`, data)
    } else {
      console.log(`📱 [Multimedia] ${message}`)
    }
  },

  warn: function (message, data = null) {
    if (!this.enabled) return
    if (data) {
      console.warn(`⚠️ [Multimedia] ${message}`, data)
    } else {
      console.warn(`⚠️ [Multimedia] ${message}`)
    }
  },

  error: function (message, data = null) {
    if (!this.enabled) return
    if (data) {
      console.error(`❌ [Multimedia] ${message}`, data)
    } else {
      console.error(`❌ [Multimedia] ${message}`)
    }
  },

  info: function (message, data = null) {
    if (!this.enabled) return
    if (data) {
      console.info(`ℹ️ [Multimedia] ${message}`, data)
    } else {
      console.info(`ℹ️ [Multimedia] ${message}`)
    }
  },

  // Método para activar/desactivar logs en tiempo real
  toggle: function (enable = null) {
    if (enable !== null) {
      this.enabled = enable
    } else {
      this.enabled = !this.enabled
    }
    this.log(`Logs ${this.enabled ? 'activados' : 'desactivados'}`)
    return this.enabled
  }
}

// Exponer logger globalmente para control desde consola
if (typeof window !== 'undefined') {
  window.MultimediaLogger = MultimediaLogger
}

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
    MultimediaLogger.error('Swiper no está disponible')
    return
  }

  // Buscar elementos
  const mainElement = document.querySelector('.multimedia-slider_main-swiper')
  const thumbsElement = document.querySelector('.multimedia-slider_thumbs-swiper')

  if (!mainElement || !thumbsElement) {
    MultimediaLogger.warn('Elementos del slider multimedia no encontrados')
    return
  }

  // ==========================================
  // FUNCIÓN PARA EXTRAER DATOS DEL DOM Y INTERCALAR
  // ==========================================
  const extractAndIntercalateContent = () => {
    // Extraer imágenes del DOM
    const imageSlides = Array.from(document.querySelectorAll('.multimedia-slider_main-slide img[data-lfr-editable-id*="main-image"]')).map(
      (img, index) => {
        const slide = img.closest('.multimedia-slider_main-slide')
        const titleElement = slide.querySelector('[data-lfr-editable-id*="image-title"]')
        const paragraphElement = slide.querySelector('[data-lfr-editable-id*="image-overlay-text"]')

        return {
          type: 'image',
          src: img.src,
          title: titleElement ? titleElement.textContent.trim() : '',
          paragraph: paragraphElement ? paragraphElement.textContent.trim() : '',
          thumbnail: img.src, // Usar la misma imagen como thumbnail
          originalIndex: index
        }
      }
    )

    // Extraer videos del DOM
    const videoSlides = Array.from(document.querySelectorAll('.multimedia-slider_main-slide iframe[data-lfr-editable-id*="video-id"]')).map(
      (iframe, index) => {
        const slide = iframe.closest('.multimedia-slider_main-slide')
        const titleElement = slide.querySelector('[data-lfr-editable-id*="video-title"]')
        const paragraphElement = slide.querySelector('[data-lfr-editable-id*="video-overlay-text"]')

        // Extraer videoId de la URL del iframe
        const srcUrl = iframe.src
        const videoIdMatch = srcUrl.match(/embed\/([a-zA-Z0-9_-]+)/)
        const videoId = videoIdMatch ? videoIdMatch[1] : ''

        return {
          type: 'youtube',
          videoId: videoId,
          title: titleElement ? titleElement.textContent.trim() : '',
          paragraph: paragraphElement ? paragraphElement.textContent.trim() : '',
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          originalIndex: index
        }
      }
    )

    // INTERCALACIÓN AUTOMÁTICA: Alternar imagen-video-imagen-video...
    const intercalatedContent = []
    const maxLength = Math.max(imageSlides.length, videoSlides.length)

    for (let i = 0; i < maxLength; i++) {
      // Agregar imagen si existe
      if (i < imageSlides.length) {
        intercalatedContent.push(imageSlides[i])
      }

      // Agregar video si existe
      if (i < videoSlides.length) {
        intercalatedContent.push(videoSlides[i])
      }
    }

    MultimediaLogger.info(
      `Contenido intercalado: ${imageSlides.length} imágenes + ${videoSlides.length} videos = ${intercalatedContent.length} slides totales`
    )

    return intercalatedContent
  }

  // Obtener contenido intercalado del DOM
  const mediaContent = extractAndIntercalateContent()

  // ==========================================
  // FUNCIÓN PARA RECONSTRUIR SLIDES CON CONTENIDO INTERCALADO
  // ==========================================
  const rebuildSlidesWithIntercalation = content => {
    const mainWrapper = document.querySelector('.multimedia-slider_main-wrapper')
    const thumbsWrapper = document.querySelector('.multimedia-slider_thumbs-wrapper')

    if (!mainWrapper || !thumbsWrapper) {
      MultimediaLogger.warn('Wrappers del slider no encontrados')
      return
    }

    // Limpiar contenido existente
    mainWrapper.innerHTML = ''
    thumbsWrapper.innerHTML = ''

    // Crear slides intercalados
    content.forEach((item, index) => {
      // Crear slide principal
      const mainSlide = createMainSlide(item, index)
      mainWrapper.appendChild(mainSlide)

      // Crear thumbnail
      const thumbSlide = createThumbSlide(item, index)
      thumbsWrapper.appendChild(thumbSlide)
    })

    MultimediaLogger.log(`Slider reconstruido con ${content.length} slides intercalados`)
  }

  // ==========================================
  // FUNCIÓN PARA CREAR SLIDE PRINCIPAL
  // ==========================================
  const createMainSlide = (item, index) => {
    const slide = document.createElement('div')
    slide.className = 'multimedia-slider_main-slide swiper-slide'
    slide.setAttribute('role', 'listitem')
    slide.setAttribute('data-slide-index', index)

    if (item.type === 'image') {
      slide.innerHTML = `
        <img 
          src="${item.src}" 
          alt="${item.title || ''}"
          data-lfr-editable-id="multimedia-main-image-${index}"
          data-lfr-editable-type="image"
        />
        <div class="multimedia-slider_content-text-overlay">
          <div class="multimedia-slider_overlay-content">
            ${
              item.title
                ? `
              <h3 class="multimedia-slider_overlay-title"
                  data-lfr-editable-id="multimedia-image-title-${index}"
                  data-lfr-editable-type="text">
                ${item.title}
              </h3>
            `
                : ''
            }
            ${
              item.paragraph
                ? `
              <p class="multimedia-slider_overlay-text"
                 data-lfr-editable-id="multimedia-image-overlay-text-${index}"
                 data-lfr-editable-type="rich-text">
                ${item.paragraph}
              </p>
            `
                : ''
            }
          </div>
        </div>
      `
    } else if (item.type === 'youtube') {
      slide.innerHTML = `
        <img
          src="${item.thumbnail}"
          alt="${item.title || ''}"
          style="z-index: 1; position: absolute; width: 100%; height: 100%; object-fit: cover;"
        />
        <iframe
          src="https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=0"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          loading="lazy"
          title="${item.title || ''}"
          style="display: none; z-index: 2;"
          data-lfr-editable-id="multimedia-video-id-${index}"
          data-lfr-editable-type="text"
        ></iframe>
        <div class="multimedia-slider_content-text-overlay">
          <div class="multimedia-slider_overlay-content">
            ${
              item.title
                ? `
              <h3 class="multimedia-slider_overlay-title"
                  data-lfr-editable-id="multimedia-video-title-${index}"
                  data-lfr-editable-type="text">
                ${item.title}
              </h3>
            `
                : ''
            }
            ${
              item.paragraph
                ? `
              <p class="multimedia-slider_overlay-text"
                 data-lfr-editable-id="multimedia-video-overlay-text-${index}"
                 data-lfr-editable-type="rich-text">
                ${item.paragraph}
              </p>
            `
                : ''
            }
          </div>
        </div>
      `
    }

    return slide
  }

  // ==========================================
  // FUNCIÓN PARA CREAR THUMBNAIL
  // ==========================================
  const createThumbSlide = (item, index) => {
    const slide = document.createElement('div')
    slide.className = 'multimedia-slider_thumb-slide swiper-slide'
    slide.setAttribute('role', 'listitem')

    if (item.type === 'image') {
      slide.innerHTML = `
        <img 
          src="${item.thumbnail}" 
          alt="${item.title || ''}"
          data-lfr-editable-id="multimedia-thumb-image-${index}"
          data-lfr-editable-type="image"
        />
      `
    } else if (item.type === 'youtube') {
      slide.innerHTML = `
        <img 
          src="${item.thumbnail}" 
          alt="${item.title || ''}"
        />
        <div class="multimedia-slider_video-indicator">VIDEO</div>
      `
    }

    return slide
  }

  // Aplicar intercalación si hay contenido
  if (mediaContent && mediaContent.length > 0) {
    rebuildSlidesWithIntercalation(mediaContent)
  }

  // Crear iframe optimizado para autoplay sin JS API
  const createAutoplayIframe = videoId => {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=0`
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.style.cssText = 'width: 100%; height: 100%; border: none;'
    return iframe
  }

  // Controlar visibilidad de videos (sin postMessage)
  const showVideo = iframe => {
    if (iframe) {
      iframe.style.display = 'block'
    }
  }

  // Ocultar video
  const hideVideo = iframe => {
    if (iframe) {
      iframe.style.display = 'none'
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
              slide.appendChild(newIframe)
              img.style.opacity = '0'
            }
          } else {
            showVideo(iframe)
          }
        } else {
          if (iframe) {
            hideVideo(iframe)
            const img = slide.querySelector('img')
            if (img) {
              img.style.opacity = '1'
            }
          }
        }
      }
    })
  }

  // ==========================================
  // SISTEMA DE ALTERNANCIA GRID/SWIPER PARA THUMBNAILS
  // ==========================================
  
  // Calcular cuántos slides son visibles según el ancho actual
  const calculateVisibleSlides = () => {
    const width = window.innerWidth
    const breakpoints = getBreakpointConfig()
    
    if (width >= 1024) return breakpoints[1024].slidesPerView
    if (width >= 768) return breakpoints[768].slidesPerView  
    if (width >= 480) return breakpoints[480].slidesPerView
    return breakpoints[320].slidesPerView
  }
  
  // Determinar si usar modo Grid (centrado) o Swiper (slider)
  const shouldUseGridMode = () => {
    const totalSlides = mediaContent.length
    const visibleSlides = calculateVisibleSlides()
    return totalSlides <= visibleSlides
  }
  
  // Activar modo Grid (thumbnails centradas)
  const activateGridMode = () => {
    const thumbsContainer = document.querySelector('.multimedia-slider_thumbs-swiper')
    const thumbsWrapper = document.querySelector('.multimedia-slider_thumbs-wrapper')
    const nextBtn = document.querySelector('.multimedia-slider_thumbs-next')
    const prevBtn = document.querySelector('.multimedia-slider_thumbs-prev')
    
    if (!thumbsContainer || !thumbsWrapper) return
    
    MultimediaLogger.log('Activando modo Grid (centrado) para thumbnails')
    
    // Destruir Swiper si existe
    if (window.multimediaThumbsSwiper) {
      window.multimediaThumbsSwiper.destroy(true, false)
      window.multimediaThumbsSwiper = null
    }
    
    // Aplicar estilos Grid
    thumbsContainer.classList.add('multimedia-slider_grid-mode')
    thumbsWrapper.style.cssText = `
      display: grid !important;
      grid-auto-flow: column !important;
      justify-content: center !important;
      gap: 10px !important;
      width: 100% !important;
      transform: none !important;
    `
    
    // Agregar funcionalidad de click manual para thumbnails en modo Grid
    setupGridModeClickHandlers()
    
    // Ocultar botones de navegación
    if (nextBtn) nextBtn.style.display = 'none'
    if (prevBtn) prevBtn.style.display = 'none'
  }
  
  // Configurar manejo de clicks en modo Grid
  const setupGridModeClickHandlers = () => {
    const thumbSlides = document.querySelectorAll('.multimedia-slider_thumbs-wrapper .swiper-slide')
    
    thumbSlides.forEach((thumb, index) => {
      // Remover listeners anteriores si existen
      thumb.removeEventListener('click', thumb._gridClickHandler)
      
      // Crear nuevo handler
      thumb._gridClickHandler = () => {
        // Ir al slide correspondiente en el slider principal
        if (window.multimediaMainSwiper) {
          window.multimediaMainSwiper.slideTo(index)
        }
        
        // Actualizar estado activo de thumbnails
        thumbSlides.forEach(t => t.classList.remove('swiper-slide-thumb-active'))
        thumb.classList.add('swiper-slide-thumb-active')
        
        MultimediaLogger.log(`Click en thumbnail Grid - Slide ${index}`)
      }
      
      // Agregar listener
      thumb.addEventListener('click', thumb._gridClickHandler)
      
      // Aplicar estilos de cursor
      thumb.style.cursor = 'pointer'
    })
    
    // Marcar el primer thumbnail como activo
    if (thumbSlides.length > 0) {
      thumbSlides.forEach(t => t.classList.remove('swiper-slide-thumb-active'))
      thumbSlides[0].classList.add('swiper-slide-thumb-active')
    }
  }
  
  // Sincronizar thumbnail activo en modo Grid cuando cambie el slider principal
  const syncGridModeActiveThumb = (activeIndex) => {
    const thumbsContainer = document.querySelector('.multimedia-slider_thumbs-swiper')
    
    // Solo funciona en modo Grid
    if (!thumbsContainer.classList.contains('multimedia-slider_grid-mode')) return
    
    const thumbSlides = document.querySelectorAll('.multimedia-slider_thumbs-wrapper .swiper-slide')
    
    thumbSlides.forEach((thumb, index) => {
      if (index === activeIndex) {
        thumb.classList.add('swiper-slide-thumb-active')
      } else {
        thumb.classList.remove('swiper-slide-thumb-active')
      }
    })
    
    MultimediaLogger.log(`Sincronizado thumbnail Grid activo: ${activeIndex}`)
  }
  
  // Activar modo Swiper (slider normal)
  const activateSwiperMode = () => {
    const thumbsContainer = document.querySelector('.multimedia-slider_thumbs-swiper')
    const thumbsWrapper = document.querySelector('.multimedia-slider_thumbs-wrapper')
    const nextBtn = document.querySelector('.multimedia-slider_thumbs-next')
    const prevBtn = document.querySelector('.multimedia-slider_thumbs-prev')
    
    if (!thumbsContainer || !thumbsWrapper) return
    
    MultimediaLogger.log('Activando modo Swiper (slider) para thumbnails')
    
    // Remover estilos Grid
    thumbsContainer.classList.remove('multimedia-slider_grid-mode')
    thumbsWrapper.style.cssText = ''
    
    // Recrear Swiper solo si no existe
    if (!window.multimediaThumbsSwiper) {
      window.multimediaThumbsSwiper = new window.Swiper('.multimedia-slider_thumbs-swiper', {
        spaceBetween: 8,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.multimedia-slider_thumbs-next',
          prevEl: '.multimedia-slider_thumbs-prev'
        },
        breakpoints: getBreakpointConfig()
      })
    }
    
    // Mostrar botones de navegación
    if (nextBtn) nextBtn.style.cssText = 'display: flex; opacity: 1;'
    if (prevBtn) prevBtn.style.cssText = 'display: flex; opacity: 1;'
    
    // Conectar con slider principal si existe
    if (window.multimediaMainSwiper && window.multimediaThumbsSwiper) {
      window.multimediaMainSwiper.controller.control = window.multimediaThumbsSwiper
      window.multimediaThumbsSwiper.controller.control = window.multimediaMainSwiper
    }
  }
  
  // Función principal para decidir y aplicar el modo correcto
  const updateThumbnailsMode = () => {
    if (shouldUseGridMode()) {
      activateGridMode()
    } else {
      activateSwiperMode()
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

  // Aplicar modo correcto (Grid o Swiper) según cantidad de slides
  updateThumbnailsMode()

  // Inicializar slider principal
  window.multimediaMainSwiper = new window.Swiper('.multimedia-slider_main-swiper', {
    spaceBetween: 10,
    loop: true,
    // Conectar con thumbnails solo si existe Swiper de thumbnails
    thumbs: {
      swiper: window.multimediaThumbsSwiper || null
    },
    // Eventos del slider
    on: {
      init: function () {
        // Agregar índices a slides para tracking
        const slides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')
        slides.forEach((slide, index) => {
          slide.dataset.slideIndex = index
        })

        // Conectar thumbnails si están en modo Swiper
        if (window.multimediaThumbsSwiper) {
          this.thumbs.swiper = window.multimediaThumbsSwiper
        }

        // Controlar videos después de inicialización
        setTimeout(() => {
          handleVideoSlides()
        }, 200)
      },
      slideChange: function () {
        // Sincronizar thumbnail activo en modo Grid
        syncGridModeActiveThumb(this.realIndex)
        
        // Manejar videos en cambio de slide
        setTimeout(() => {
          handleVideoSlides()
        }, 100)
      },
      update: function () {
        updateThumbnailsMode()
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
      // Recalcular modo según nuevo tamaño de pantalla
      updateThumbnailsMode()
      
      // Actualizar sliders si están activos
      if (window.multimediaMainSwiper) {
        window.multimediaMainSwiper.update()
      }
      if (window.multimediaThumbsSwiper) {
        window.multimediaThumbsSwiper.update()
      }
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

// ==========================================
// INSTRUCCIONES DE USO DEL SISTEMA DE LOGS
// ==========================================
/* 
CONTROL DE LOGS:

1. PARA PRODUCCIÓN:
   - Cambiar la línea 6: enabled: false

2. CONTROL DESDE CONSOLA DEL NAVEGADOR:
   - Desactivar logs: MultimediaLogger.toggle(false)
   - Activar logs: MultimediaLogger.toggle(true)
   - Alternar estado: MultimediaLogger.toggle()
   - Ver estado actual: MultimediaLogger.enabled

3. TIPOS DE LOGS DISPONIBLES:
   - MultimediaLogger.log() - Información general
   - MultimediaLogger.info() - Información detallada 
   - MultimediaLogger.warn() - Advertencias
   - MultimediaLogger.error() - Errores

EJEMPLO DE USO EN PRODUCCIÓN:
- En desarrollo: enabled: true (línea 6)
- En producción: enabled: false (línea 6)
- Para debugging en vivo: MultimediaLogger.toggle(true) en consola

CONTROL DEL SISTEMA GRID/SWIPER DESDE CONSOLA:
- Forzar modo Grid: window.MultimediaGridControl.forceGridMode()
- Forzar modo Swiper: window.MultimediaGridControl.forceSwiperMode()
- Modo automático: window.MultimediaGridControl.autoMode()
- Ver estado actual: window.MultimediaGridControl.getStatus()
*/

// ==========================================
// CONTROL GLOBAL PARA DEBUGGING
// ==========================================
if (typeof window !== 'undefined') {
  window.MultimediaGridControl = {
    forceGridMode: () => {
      if (typeof activateGridMode === 'function') {
        activateGridMode()
        MultimediaLogger.log('Modo Grid forzado desde consola')
      }
    },
    
    forceSwiperMode: () => {
      if (typeof activateSwiperMode === 'function') {
        activateSwiperMode()
        MultimediaLogger.log('Modo Swiper forzado desde consola')
      }
    },
    
    autoMode: () => {
      if (typeof updateThumbnailsMode === 'function') {
        updateThumbnailsMode()
        MultimediaLogger.log('Modo automático activado desde consola')
      }
    },
    
    getStatus: () => {
      const container = document.querySelector('.multimedia-slider_thumbs-swiper')
      const isGridMode = container?.classList.contains('multimedia-slider_grid-mode')
      const totalSlides = document.querySelectorAll('.multimedia-slider_thumbs-wrapper .swiper-slide').length
      const visibleSlides = window.innerWidth >= 1024 ? 6 : 
                           window.innerWidth >= 768 ? 5 :
                           window.innerWidth >= 480 ? 4 : 3
      
      return {
        currentMode: isGridMode ? 'Grid (Centrado)' : 'Swiper (Slider)',
        totalSlides,
        visibleSlides,
        shouldUseGrid: totalSlides <= visibleSlides,
        windowWidth: window.innerWidth
      }
    }
  }
}
