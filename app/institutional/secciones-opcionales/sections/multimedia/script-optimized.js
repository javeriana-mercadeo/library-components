// ==========================================
// SISTEMA DE LOGS CONFIGURABLE
// ==========================================
const MultimediaLogger = {
  // Configuración de logs (cambiar a false para producción)
  enabled: true, // Activado para debugging móvil

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
    slide.setAttribute('data-swiper-slide-index', index) // ✅ Importante para Swiper

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

  // ==========================================
  // CONTROL DE VIDEOS OPTIMIZADO
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
        const img = slide.querySelector('img')

        if (slide === activeSlide) {
          // Mostrar video activo
          if (iframe) {
            iframe.style.display = 'block'
            if (img) img.style.opacity = '0'
          }
        } else {
          // Ocultar videos inactivos
          if (iframe) {
            iframe.style.display = 'none'
            if (img) img.style.opacity = '1'
          }
        }
      }
    })
  }

  // ==========================================
  // SISTEMA GRID/SWIPER PARA THUMBNAILS OPTIMIZADO
  // ==========================================
  
  // Configuración mobile first para breakpoints
  const getBreakpointConfig = () => ({
    320: { slidesPerView: 3, spaceBetween: 8 },
    480: { slidesPerView: 4, spaceBetween: 10 },
    768: { slidesPerView: 5, spaceBetween: 10 },
    1024: { slidesPerView: 6, spaceBetween: 10 }
  })
  
  // Calcular cuántos slides son visibles según el ancho actual
  const calculateVisibleSlides = () => {
    const width = window.innerWidth
    if (width >= 1024) return 6
    if (width >= 768) return 5  
    if (width >= 480) return 4
    return 3
  }
  
  // Determinar si usar modo Grid (centrado) o Swiper (slider)
  const shouldUseGridMode = () => {
    const totalSlides = mediaContent.length
    const visibleSlides = calculateVisibleSlides()
    return totalSlides <= visibleSlides
  }

  // ✅ FUNCIÓN UNIVERSAL PARA ACTUALIZAR ESTADO ACTIVO
  const updateThumbnailActiveState = (activeIndex) => {
    const thumbSlides = document.querySelectorAll('.multimedia-slider_thumbs-wrapper .swiper-slide')
    
    thumbSlides.forEach((thumb, index) => {
      if (index === activeIndex) {
        thumb.classList.add('swiper-slide-thumb-active')
      } else {
        thumb.classList.remove('swiper-slide-thumb-active')
      }
    })
    
    const thumbsContainer = document.querySelector('.multimedia-slider_thumbs-swiper')
    const mode = thumbsContainer?.classList.contains('multimedia-slider_grid-mode') ? 'Grid' : 'Swiper'
    MultimediaLogger.log(`Thumbnail activo sincronizado (${mode}): ${activeIndex}`)
  }

  // ✅ ACTIVAR MODO GRID CON HANDLERS NATIVOS
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
    
    // ✅ SETUP CLICKS NATIVOS PARA MODO GRID
    const thumbSlides = document.querySelectorAll('.multimedia-slider_thumbs-wrapper .swiper-slide')
    thumbSlides.forEach((thumb, index) => {
      // Aplicar estilos de cursor
      thumb.style.cursor = 'pointer'
      
      // ✅ EVENTO NATIVO DE CLICK SIN CONFLICTOS
      thumb.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        MultimediaLogger.log(`Grid thumbnail click nativo - Slide ${index}`)
        
        // Navegar al slide correspondiente
        if (window.multimediaMainSwiper && !window.multimediaMainSwiper.destroyed) {
          window.multimediaMainSwiper.slideTo(index, 300)
          updateThumbnailActiveState(index)
        }
      }, { passive: false })
      
      // ✅ EVENTO NATIVO TOUCH PARA MÓVILES
      let touchStartTime = 0
      let touchStartPos = null
      
      thumb.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now()
        touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      }, { passive: false })
      
      thumb.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime
        const touch = e.changedTouches[0]
        const distance = Math.sqrt(
          Math.pow(touch.clientX - touchStartPos.x, 2) + 
          Math.pow(touch.clientY - touchStartPos.y, 2)
        )
        
        // Validar que es un tap genuino (no drag/scroll)
        if (touchDuration < 500 && distance < 30) {
          e.preventDefault()
          e.stopPropagation()
          
          MultimediaLogger.log(`Grid thumbnail touch nativo - Slide ${index}`)
          
          if (window.multimediaMainSwiper && !window.multimediaMainSwiper.destroyed) {
            window.multimediaMainSwiper.slideTo(index, 300)
            updateThumbnailActiveState(index)
          }
        }
      }, { passive: false })
    })
    
    // Ocultar botones de navegación
    if (nextBtn) nextBtn.style.display = 'none'
    if (prevBtn) prevBtn.style.display = 'none'
    
    // Marcar el primer thumbnail como activo
    updateThumbnailActiveState(0)
  }
  
  // ✅ ACTIVAR MODO SWIPER CON CONFIGURACIÓN MÓVIL OPTIMIZADA
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
    
    // ✅ CREAR SWIPER CON CONFIGURACIÓN MÓVIL OPTIMIZADA
    if (!window.multimediaThumbsSwiper) {
      window.multimediaThumbsSwiper = new window.Swiper('.multimedia-slider_thumbs-swiper', {
        spaceBetween: 8,
        slidesPerView: 3,
        
        // ✅ OPTIMIZACIONES MÓVILES CLAVE
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        preventInteractionOnTransition: true,
        
        // ✅ NAVEGACIÓN
        navigation: {
          nextEl: '.multimedia-slider_thumbs-next',
          prevEl: '.multimedia-slider_thumbs-prev'
        },
        
        // ✅ EVENTOS NATIVOS DE SWIPER PARA THUMBNAILS
        on: {
          click: function(swiper, event) {
            const clickedSlide = event.target.closest('.swiper-slide')
            if (!clickedSlide) return
            
            const slideIndex = Array.from(clickedSlide.parentNode.children).indexOf(clickedSlide)
            MultimediaLogger.log(`Thumbnail Swiper click nativo - Slide ${slideIndex}`)
            
            // Navegar usando la instancia principal
            if (window.multimediaMainSwiper && !window.multimediaMainSwiper.destroyed) {
              window.multimediaMainSwiper.slideTo(slideIndex, 300)
              updateThumbnailActiveState(slideIndex)
            }
          },
          
          // ✅ TOUCH END OPTIMIZADO PARA MÓVILES
          touchEnd: function(swiper, event) {
            // Solo procesar si es un tap corto (no drag)
            const touchDiff = swiper.touches && swiper.touches.diff ? Math.abs(swiper.touches.diff) : 0
            if (touchDiff < 20) {
              const targetSlide = event.target.closest('.swiper-slide')
              if (targetSlide) {
                const slideIndex = Array.from(targetSlide.parentNode.children).indexOf(targetSlide)
                MultimediaLogger.log(`Thumbnail Swiper touch nativo - Slide ${slideIndex}`)
                
                if (window.multimediaMainSwiper && !window.multimediaMainSwiper.destroyed) {
                  window.multimediaMainSwiper.slideTo(slideIndex, 300)
                  updateThumbnailActiveState(slideIndex)
                }
              }
            }
          }
        },
        
        breakpoints: getBreakpointConfig()
      })
    }
    
    // Mostrar botones de navegación
    if (nextBtn) nextBtn.style.cssText = 'display: flex; opacity: 1;'
    if (prevBtn) prevBtn.style.cssText = 'display: flex; opacity: 1;'
  }
  
  // Función principal para decidir y aplicar el modo correcto
  const updateThumbnailsMode = () => {
    if (shouldUseGridMode()) {
      activateGridMode()
    } else {
      activateSwiperMode()
    }
  }

  // Aplicar modo correcto (Grid o Swiper) según cantidad de slides
  updateThumbnailsMode()

  // ✅ INICIALIZAR SLIDER PRINCIPAL CON CONFIGURACIÓN MÓVIL OPTIMIZADA
  window.multimediaMainSwiper = new window.Swiper('.multimedia-slider_main-swiper', {
    spaceBetween: 10,
    loop: true,
    
    // ✅ OPTIMIZACIONES MÓVILES CLAVE
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    preventInteractionOnTransition: true, // Evita clicks durante transiciones
    
    // ✅ Conectar con thumbnails de manera robusta
    thumbs: {
      swiper: window.multimediaThumbsSwiper || null,
      slideThumbActiveClass: 'swiper-slide-thumb-active'
    },
    
    // ✅ EVENTOS OPTIMIZADOS
    on: {
      init: function () {
        // Agregar índices a slides para tracking
        const slides = document.querySelectorAll('.multimedia-slider_main-swiper .swiper-slide')
        slides.forEach((slide, index) => {
          slide.dataset.slideIndex = index
        })

        // Conectar thumbnails de forma robusta
        if (window.multimediaThumbsSwiper && !window.multimediaThumbsSwiper.destroyed) {
          this.thumbs.swiper = window.multimediaThumbsSwiper
        }
        
        // Sincronizar estado inicial
        updateThumbnailActiveState(this.realIndex || 0)

        // ✅ Control de videos con timing mejorado
        const initVideoTimeout = setTimeout(() => {
          handleVideoSlides()
          clearTimeout(initVideoTimeout)
        }, 300) // Más tiempo para móviles lentos
        
        MultimediaLogger.log(`Slider principal inicializado - Index inicial: ${this.realIndex || 0}`)
      },
      
      slideChange: function () {
        const currentIndex = this.realIndex || 0
        MultimediaLogger.log(`Slide change detectado: ${currentIndex}`)
        
        // ✅ Sincronización mejorada
        updateThumbnailActiveState(currentIndex)
        
        // ✅ Control de videos con debounce
        if (this.videoTimeout) clearTimeout(this.videoTimeout)
        this.videoTimeout = setTimeout(() => {
          handleVideoSlides()
        }, 150)
      },
      
      // ✅ Evento específico para touch end (móviles)
      touchEnd: function() {
        const currentIndex = this.realIndex || 0
        MultimediaLogger.log(`Touch end - Índice final: ${currentIndex}`)
        updateThumbnailActiveState(currentIndex)
      },
      
      update: function () {
        updateThumbnailsMode()
      }
    }
  })

  // ✅ CONEXIÓN BIDIRECCIONAL OPTIMIZADA entre sliders
  if (window.multimediaMainSwiper && window.multimediaThumbsSwiper) {
    // Sincronización bidireccional con eventos nativos
    window.multimediaMainSwiper.on('slideChange', function() {
      const currentIndex = this.realIndex || 0
      updateThumbnailActiveState(currentIndex)
      
      // Sincronizar posición de thumbnails si es Swiper
      if (window.multimediaThumbsSwiper && !window.multimediaThumbsSwiper.destroyed) {
        window.multimediaThumbsSwiper.slideTo(currentIndex)
      }
    })
    
    MultimediaLogger.log('Conexión bidireccional optimizada establecida')
  }

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
      if (window.multimediaMainSwiper && !window.multimediaMainSwiper.destroyed) {
        window.multimediaMainSwiper.update()
      }
      if (window.multimediaThumbsSwiper && !window.multimediaThumbsSwiper.destroyed) {
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

// ✅ INICIALIZACIÓN ROBUSTA CON DETECCIÓN DE ESTADO
const checkAndInit = () => {
  if (typeof window === 'undefined') {
    setTimeout(checkAndInit, 100)
    return
  }
  
  if (!window.Swiper) {
    MultimediaLogger.warn('Swiper no disponible, reintentando...')
    setTimeout(checkAndInit, 200)
    return
  }
  
  // ✅ Verificar que el DOM esté listo
  const requiredElements = [
    '.multimedia-slider_main-swiper',
    '.multimedia-slider_thumbs-swiper'
  ]
  
  const allElementsReady = requiredElements.every(selector => {
    const element = document.querySelector(selector)
    return element && element.offsetHeight > 0 // Verificar que sea visible
  })
  
  if (!allElementsReady) {
    MultimediaLogger.warn('Elementos del slider no están listos, reintentando...')
    setTimeout(checkAndInit, 200)
    return
  }
  
  MultimediaLogger.log('Todas las condiciones cumplidas, inicializando slider...')
  
  // ✅ Delay adicional para móviles lentos (especialmente en Liferay)
  const isMobile = window.innerWidth <= 768
  const delay = isMobile ? 300 : 100
  
  setTimeout(() => {
    try {
      initializeMultimediaSlider()
      MultimediaLogger.log('✅ Slider multimedia inicializado exitosamente')
    } catch (error) {
      MultimediaLogger.error('Error al inicializar slider:', error)
      // Reintentar una vez más en caso de error
      setTimeout(initializeMultimediaSlider, 500)
    }
  }, delay)
}

// Iniciar el proceso
checkAndInit()

// ==========================================
// CONTROL GLOBAL PARA DEBUGGING
// ==========================================
if (typeof window !== 'undefined') {
  window.MultimediaGridControl = {
    forceGridMode: () => {
      const container = document.querySelector('.multimedia-slider_thumbs-swiper')
      if (container) {
        container.classList.add('multimedia-slider_grid-mode')
        MultimediaLogger.log('Modo Grid forzado desde consola')
      }
    },
    
    forceSwiperMode: () => {
      const container = document.querySelector('.multimedia-slider_thumbs-swiper')
      if (container) {
        container.classList.remove('multimedia-slider_grid-mode')
        MultimediaLogger.log('Modo Swiper forzado desde consola')
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
        windowWidth: window.innerWidth,
        mainSwiper: window.multimediaMainSwiper ? 'Activo' : 'Inactivo',
        thumbsSwiper: window.multimediaThumbsSwiper ? 'Activo' : 'Inactivo'
      }
    },
    
    testThumbnailClick: (index = 0) => {
      MultimediaLogger.log(`Probando click en thumbnail ${index}...`)
      if (window.multimediaMainSwiper) {
        window.multimediaMainSwiper.slideTo(index, 300)
        MultimediaLogger.log(`✅ Navegación exitosa al slide ${index}`)
      } else {
        MultimediaLogger.error('❌ Main swiper no está disponible')
      }
    }
  }
}