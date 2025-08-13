<<<<<<< HEAD
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
=======
export class ImageSliderLogic {
  constructor(component) {
    this.component = component

    // Datos para las slides
    this.slides = [
      {
        id: 1,
        type: 'video',
        videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp41',
        title: 'Video 1'
      },
      {
        id: 2,
        type: 'video',
        videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp44',
        title: 'Video 2'
      },
      {
        id: 3,
        type: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=xV8jjDRgSyM',
        title: 'YouTube Video'
      },
      {
        id: 4,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 1'
      },
      {
        id: 5,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 2'
      },
      {
        id: 6,
        type: 'image',
        image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        title: 'Imagen 3'
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
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
<<<<<<< HEAD

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
*/
=======
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
