// ===========================================
// MODAL INVESTIGACIONES - SISTEMA COMPLETAMENTE NUEVO
// ===========================================

const ModalInvestigacion = {
  isInitialized: false,
  modalHTML: null,
  modalSwiper: null, // Instancia de Swiper para desktop
  modalSwiperMobile: null, // Instancia de Swiper para mobile
  
  // ==========================================
  // SISTEMA DE LOGS CONTROLABLE
  // ==========================================
  DEBUG: true, // Cambiar a true para habilitar logs detallados - ACTIVADO PARA TESTING
  
  log(message, ...args) {
    if (this.DEBUG) {
      console.log(`[MODAL-INVESTIGACION] ${message}`, ...args)
    }
  },
  
  warn(message, ...args) {
    console.warn(`[MODAL-INVESTIGACION] ${message}`, ...args)
  },
  
  error(message, ...args) {
    console.error(`[MODAL-INVESTIGACION] ${message}`, ...args)
  },
  
  info(message, ...args) {
    // Logs importantes siempre se muestran
    console.log(`[MODAL-INVESTIGACION] ✓ ${message}`, ...args)
  },

  // Función helper para generar HTML del botón iconOnly siguiendo el patrón del sistema Btn
  generateIconOnlyButton({
    variant = 'light',
    color = 'secondary',
    size = 'md',
    icon = 'ph ph-x',
    ariaLabel = 'Cerrar modal',
    className = ''
  }) {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg'
    }

    const baseClasses = `
      inline-flex items-center justify-center
      rounded-lg border-0 cursor-pointer
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      ${sizeClasses[size]}
    `

    const variantColorClasses = {
      light: {
        primary: 'bg-primary-50 hover:bg-primary-100 text-primary-600 hover:text-primary-700 focus:ring-primary-500',
        secondary: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600 hover:text-neutral-800 focus:ring-neutral-500',
        danger: 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 focus:ring-red-500'
      },
      solid: {
        primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500',
        secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 focus:ring-neutral-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      },
      bordered: {
        primary: 'border border-primary-300 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        secondary: 'border border-neutral-300 text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-500',
        danger: 'border border-red-300 text-red-600 hover:bg-red-50 focus:ring-red-500'
      },
      ghost: {
        primary: 'bg-transparent text-primary hover:text-primary-600 focus:ring-primary-500',
        secondary: 'bg-transparent text-neutral-600 hover:text-neutral-700 focus:ring-neutral-500',
        danger: 'bg-transparent text-red-600 hover:text-red-700 focus:ring-red-500'
      }
    }

    const colorClasses = variantColorClasses[variant]?.[color] || variantColorClasses.light.secondary

    // Estilo hover personalizado para ghost con fondo translúcido
    const hoverStyles =
      variant === 'ghost'
        ? `
      style="transition: all 0.2s ease-in-out;"
      onmouseenter="this.style.background='rgba(var(--primary-rgb, 59, 130, 246), 0.18)'"
      onmouseleave="this.style.background='transparent'"
    `
        : ''

    return `
      <button class="${baseClasses} ${colorClasses} ${className} investigations-modal__close" 
              aria-label="${ariaLabel}" 
              type="button"
              ${hoverStyles}>
        <i class="${icon}" aria-hidden="true" style="font-size: 20px; font-weight: 500;"></i>
      </button>
    `
  },

  // Crear el modal dinámicamente en el DOM
  createModal() {
    if (document.querySelector('.investigations-modal-overlay')) {
      return // Modal ya existe
    }

    const modalHTML = `
      <div class="investigations-modal-overlay" id="investigations-modal-overlay">
        <div class="investigations-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <!-- Galería de imágenes -->
          <div class="investigations-modal__gallery">
            <!-- DESKTOP: Swiper vertical -->
            <div class="investigations-modal__images-swiper-desktop">
              <div class="investigations-modal__swiper-container swiper">
                <div class="swiper-wrapper" id="modal-swiper-wrapper">
                  <!-- Las imágenes se generarán dinámicamente como slides -->
                </div>
                <div class="swiper-pagination"></div>
                
                <!-- Navegación vertical -->
                <div class="investigations-modal__nav-prev" 
                     role="button" 
                     tabindex="0"
                     aria-label="Ir a imagen anterior">
                  <i class="ph ph-arrow-up" aria-hidden="true"></i>
                </div>
                <div class="investigations-modal__nav-next" 
                     role="button" 
                     tabindex="0"
                     aria-label="Ir a siguiente imagen">
                  <i class="ph ph-arrow-down" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            
            <!-- MOBILE: Swiper horizontal -->
            <div class="investigations-modal__images-swiper-mobile">
              <div class="investigations-modal__swiper-container-mobile swiper">
                <div class="swiper-wrapper" id="modal-swiper-wrapper-mobile">
                  <!-- Las imágenes se generarán dinámicamente como slides -->
                </div>
                <div class="swiper-pagination investigations-modal__pagination-mobile"></div>
                
                <!-- Navegación horizontal -->
                <div class="investigations-modal__nav-prev-mobile" 
                     role="button" 
                     tabindex="0"
                     aria-label="Ir a imagen anterior">
                  <i class="ph ph-arrow-left" aria-hidden="true"></i>
                </div>
                <div class="investigations-modal__nav-next-mobile" 
                     role="button" 
                     tabindex="0"
                     aria-label="Ir a siguiente imagen">
                  <i class="ph ph-arrow-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido -->
          <div class="investigations-modal__content">
            <!-- Header con botón cerrar -->
            <div class="investigations-modal__header">
              ${this.generateIconOnlyButton({
                variant: 'ghost',
                color: 'primary',
                size: 'md',
                icon: 'ph ph-x',
                ariaLabel: 'Cerrar modal'
              })}
            </div>

            <!-- Información -->
            <div class="investigations-modal__info">
              <h2 class="investigations-modal__title" id="modal-title">Título de la Investigación</h2>

              <!-- Metadatos -->
              <div class="investigations-modal__metadata">
                <div class="investigations-modal__metadata-item">
                  <span class="investigations-modal__label">Fecha:</span>
                  <span class="investigations-modal__value" id="modal-date">Enero 2024</span>
                </div>
                <div class="investigations-modal__metadata-item">
                  <span class="investigations-modal__label">Estudiante:</span>
                  <span class="investigations-modal__value" id="modal-student">María González</span>
                </div>
              </div>

              <!-- Descripción -->
              <div class="investigations-modal__metadata-item">
                <span class="investigations-modal__label">Descripción:</span>
                <div class="investigations-modal__description" id="modal-description">
                  <!-- El contenido completo se genera dinámicamente -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    // Insertar modal al final del body
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    this.log('Modal HTML creado dinámicamente')
  },

  init() {
    try {
      if (this.isInitialized) {
        this.log('Ya está inicializado')
        return true
      }

      // Crear el modal dinámicamente
      this.createModal()

      // Configurar event listeners
      this.setupEventListeners()

      this.isInitialized = true
      this.info('Sistema inicializado correctamente')
      return true
    } catch (error) {
      this.error('Error al inicializar:', error)
      return false
    }
  },

  setupEventListeners() {
    // Event delegation para cards (funciona incluso si las cards se crean después)
    document.addEventListener('click', event => {
      // Buscar si el click fue en una card o dentro de una card
      const card = event.target.closest('.investigations_card')

      if (card) {
        event.preventDefault()
        this.handleCardClick(card)
        return
      }

      // Cerrar modal si click en overlay (patrón exacto del header)
      if (event.target.classList.contains('investigations-modal-overlay')) {
        event.preventDefault()
        this.close()
        return
      }

      // Cerrar modal si click en botón cerrar o su icono
      const closeButton = event.target.closest('.investigations-modal__close')
      if (closeButton) {
        event.preventDefault()
        this.close()
        return
      }
    })

    // Cerrar con tecla Escape
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && this.isOpen()) {
        this.close()
      }
    })

    this.log('Event listeners configurados')
  },

  handleCardClick(card) {
    try {
      // Obtener el ID de la card desde el data-attribute
      const cardId = card.getAttribute('data-id')
      console.log('[MODAL-INVESTIGACION] 🔍 Card clickeada, data-id encontrado:', cardId)

      if (!cardId) {
        console.warn('[MODAL-INVESTIGACION] ❌ Card sin data-id, usando fallback')
        return this.handleCardClickFallback(card)
      }

      // Debug de datos disponibles
      console.log('[MODAL-INVESTIGACION] 🔍 window.investigacionesData:', window.investigacionesData ? window.investigacionesData.length : 'NO EXISTE')
      console.log('[MODAL-INVESTIGACION] 🔍 window.investigacionesDataComplete:', window.investigacionesDataComplete ? window.investigacionesDataComplete.length : 'NO EXISTE')

      // Buscar los datos completos desde window (React)
      const fullData = this.getInvestigacionData(parseInt(cardId))

      if (!fullData) {
        this.warn('❌ No se encontraron datos para ID:', cardId)
        console.log('[MODAL-INVESTIGACION] 🔍 IDs disponibles en datos completos:', window.investigacionesDataComplete ? window.investigacionesDataComplete.map(i => i.id) : 'NINGUNO')
        return this.handleCardClickFallback(card)
      }

      this.log('Card clickeada:', {
        id: fullData.id,
        title: fullData.title,
        year: fullData.year,
        descriptionLength: fullData.description?.length
      })

      this.open(fullData)
    } catch (error) {
      this.error('Error al manejar click de card:', error)
    }
  },

  // Fallback para casos donde no hay data-id
  handleCardClickFallback(card) {
    const titleElement = card.querySelector('.title') || card.querySelector('h3') || card.querySelector('[class*="title"]')
    const badgeElement = card.querySelector('.investigations_badge') || card.querySelector('[class*="badge"]')
    const imageElement = card.querySelector('img')

    const title = titleElement ? titleElement.textContent.trim() : 'Investigación'
    const year = badgeElement ? badgeElement.textContent.trim() : '2024'
    const imageSrc = imageElement ? imageElement.src : 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1'
    const imageAlt = imageElement ? imageElement.alt : title

    this.open({
      title,
      year,
      description: 'Descripción no disponible desde fallback.',
      image: imageSrc,
      alt: imageAlt
    })
  },

  // Función para obtener los datos originales completos desde window
  getInvestigacionData(id) {
    // INTENTAR PRIMERO LOS DATOS COMPLETOS (CON VIDEO)
    if (window.investigacionesDataComplete) {
      const completeData = window.investigacionesDataComplete.find(item => item.id === id)
      if (completeData) {
        this.log('Usando datos completos con video para ID:', id)
        return completeData
      }
    }
    
    // FALLBACK A DATOS FILTRADOS
    if (!window.investigacionesData) {
      this.warn('Datos no disponibles en window')
      return null
    }

    this.log('Usando datos filtrados (sin video) para ID:', id)
    return window.investigacionesData.find(item => item.id === id)
  },

  // NUEVO MÉTODO DE APERTURA - COPIADO EXACTO DEL HEADER
  open(data) {
    try {
      const modalOverlay = document.querySelector('.investigations-modal-overlay')
      const modal = document.querySelector('.investigations-modal')

      if (!modalOverlay || !modal) {
        this.warn('Modal no encontrado, recreando...')
        this.createModal()
        return this.open(data)
      }

      // Actualizar contenido del modal
      this.updateModalContent(data)

      // PATRÓN EXACTO DEL HEADER: aplicar 'show' inmediatamente
      modal.classList.add('show')
      modalOverlay.classList.add('active')
      document.body.classList.add('modal-open')

      // PATRÓN EXACTO DEL HEADER: aplicar 'active' con delay de 10ms para animación
      setTimeout(() => {
        modal.classList.add('active')
      }, 10)

      this.info('Modal abierto:', data.title)
    } catch (error) {
      this.error('Error al abrir modal:', error)
    }
  },

  // NUEVO MÉTODO DE CIERRE - COPIADO EXACTO DEL HEADER
  close() {
    try {
      const modalOverlay = document.querySelector('.investigations-modal-overlay')
      const modal = document.querySelector('.investigations-modal')

      if (modalOverlay && modal) {
        // PAUSAR TODOS LOS VIDEOS ANTES DE CERRAR EL MODAL
        this.info('🚪 CERRANDO MODAL - pausando videos...')
        this.pauseAllVideos()
        
        // PATRÓN EXACTO DEL HEADER: quitar 'active' inmediatamente para comenzar animación de salida
        modal.classList.remove('active')

        // PATRÓN EXACTO DEL HEADER: quitar 'show' y limpiar completamente con delay de 200ms
        setTimeout(() => {
          modal.classList.remove('show')
          modalOverlay.classList.remove('active')
          document.body.classList.remove('modal-open')

          // Limpiar estilos del body completamente
          document.body.style.overflow = ''
          document.body.style.position = ''
          document.body.style.width = ''
          document.body.style.height = ''

          // Reset completo del modal - forzar estado inicial
          modal.style.transform = ''
          modal.style.opacity = ''
          modal.style.visibility = ''
          modal.style.pointerEvents = ''
          modalOverlay.style.opacity = ''
          modalOverlay.style.visibility = ''
          modalOverlay.style.pointerEvents = ''

          // Forzar reflow para asegurar que los cambios se apliquen
          modalOverlay.offsetHeight
        }, 200)

        this.log('Modal cerrado y videos pausados')
      }
    } catch (error) {
      this.error('Error al cerrar modal:', error)
    }
  },

  // Método para verificar si el modal está abierto
  isOpen() {
    const modal = document.querySelector('.investigations-modal')
    return modal && modal.classList.contains('show')
  },

  updateModalContent(data) {
    const modalTitle = document.getElementById('modal-title')
    const modalDate = document.getElementById('modal-date')
    const modalStudent = document.getElementById('modal-student')
    const modalDescription = document.getElementById('modal-description')

    // Containers para desktop y mobile
    const swiperWrapper = document.getElementById('modal-swiper-wrapper')
    const swiperWrapperMobile = document.getElementById('modal-swiper-wrapper-mobile')

    if (modalTitle && data.title) {
      modalTitle.textContent = data.title
    }
    if (modalDate && data.year) {
      modalDate.textContent = this.formatDate(data.year)
    }
    if (modalStudent) {
      modalStudent.textContent = this.generateStudentName(data.title)
    }
    if (modalDescription && data.description) {
      modalDescription.innerHTML = this.formatDescription(data.description)
    }

    // Generar galería según el dispositivo
    const isDesktop = window.innerWidth >= 1024

    if (isDesktop && swiperWrapper) {
      this.generateSwiperGallery(swiperWrapper, data)
      this.initializeModalSwiper()
    }

    if (!isDesktop && swiperWrapperMobile) {
      this.generateSwiperGalleryMobile(swiperWrapperMobile, data)
      this.initializeModalSwiperMobile()
    }
  },

  // ==========================================
  // FUNCIÓN LEGACY: Mantener para compatibilidad
  // ==========================================
  generateImageGallery(container, data) {
    // Limpiar contenedor
    container.innerHTML = ''

    // Generar todos los elementos multimedia
    const allMediaItems = this.generateAdditionalMedia(data.image, data.title, data)
    
    allMediaItems.forEach((mediaItem, index) => {
      const mediaElement = this.generateMediaElement(mediaItem, index, true) // true = desktop por defecto
      container.appendChild(mediaElement)
    })

    this.log('Galería generada con', allMediaItems.length, 'elementos multimedia')
  },

  // ==========================================
  // CONFIGURACIONES DE VIDEO HARDCODEADAS (CONTROLADAS POR DESARROLLADOR)
  // ==========================================
  getVideoConfigs() {
    return {
      1: { 
        enabled: true,
        position: 'first'
        // embedId se obtiene del template
      },
      3: {
        enabled: true,
        position: 'first'
        // embedId se obtiene del template (pBbK6Tf5reE)
      }
      // Agregar más configuraciones aquí según sea necesario
    }
  },

  // ==========================================
  // OBTENER CONFIGURACIÓN DE VIDEO PARA UNA INVESTIGACIÓN
  // ==========================================
  getVideoConfig(investigacionId) {
    const videoConfigs = this.getVideoConfigs()
    const baseConfig = videoConfigs[investigacionId]
    
    if (!baseConfig) {
      return null
    }
    
    // Obtener embedId desde atributo del elemento
    const card = document.querySelector(`[data-id="${investigacionId}"]`)
    const embedId = card?.getAttribute('data-video-embed-id')
    
    if (!embedId) {
      this.log(`No embedId encontrado para investigación ${investigacionId}`)
      return null
    }
    
    return {
      ...baseConfig,
      embedId,
      url: `https://youtu.be/${embedId}`
    }
  },

  generateAdditionalMedia(baseImage, title, investigationData = null) {
    const mediaItems = []
    
    // ==========================================
    // CONFIGURACIÓN HÍBRIDA DE VIDEO
    // ==========================================
    
    // Obtener configuración de video usando el nuevo sistema híbrido
    const investigacionId = investigationData?.id
    const videoConfig = investigacionId ? this.getVideoConfig(investigacionId) : null
    const hasVideo = videoConfig !== null
    
    if (hasVideo) {
      const videoItem = {
        type: 'video',
        src: videoConfig.url,
        embedId: videoConfig.embedId,
        alt: `${title} - Video presentación`,
        thumbnail: baseImage || `https://img.youtube.com/vi/${videoConfig.embedId}/maxresdefault.jpg`
      }
      
      // Insertar video según la posición configurada
      if (videoConfig.position === 'first' || !videoConfig.position) {
        // Video como primer slide (por defecto)
        mediaItems.push(videoItem)
      }
      // Nota: 'last' y posiciones numéricas se pueden agregar después si se necesitan
    }
    
    // ==========================================
    // USAR SOLO IMÁGENES REALES DEL CMS
    // ==========================================
    
    // Agregar imagen principal (siempre debe existir)
    if (baseImage) {
      mediaItems.push({
        type: 'image', 
        src: baseImage, 
        alt: title
      })
    } else {
      // Fallback solo si no hay imagen principal
      mediaItems.push({
        type: 'image', 
        src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1', 
        alt: title
      })
    }
    
    // ==========================================
    // IMÁGENES ADICIONALES DEL CMS (FUTURO)
    // ==========================================
    // Nota: Aquí se pueden agregar imágenes adicionales reales cuando el CMS
    // tenga múltiples imágenes por investigación en grad_investigationImg
    // Ejemplo:
    // if (investigationData?.additionalImages?.length > 0) {
    //   investigationData.additionalImages.forEach((imgData, index) => {
    //     mediaItems.push({
    //       type: 'image',
    //       src: imgData.url,
    //       alt: imgData.alt || `${title} - Imagen ${index + 2}`
    //     })
    //   })
    // }
    
    this.log('Media generada (solo imágenes reales):', { 
      hasVideo: !!hasVideo, 
      totalItems: mediaItems.length, 
      videoPosition: hasVideo ? videoConfig.position : 'none',
      investigationId: investigationData ? investigationData.id : 'unknown'
    })

    return mediaItems
  },

  // ==========================================
  // NUEVA FUNCIÓN: Generar elemento multimedia (imagen o video)
  // ==========================================
  generateMediaElement(mediaItem, index, isDesktop = false) {
    if (mediaItem.type === 'video') {
      return this.generateVideoElement(mediaItem, index, isDesktop)
    } else {
      return this.generateImageElement(mediaItem, index, isDesktop)
    }
  },

  generateVideoElement(videoItem, index, isDesktop) {
    const containerClass = isDesktop ? 'investigations-modal__video-wrapper' : 'investigations-modal__video-wrapper-mobile'
    const videoClass = isDesktop ? 'investigations-modal__video' : 'investigations-modal__video-mobile'
    
    // YouTube embed iframe con parámetros correctos para API
    const iframe = document.createElement('iframe')
    const params = new URLSearchParams({
      autoplay: '0',
      mute: '0', // ✅ AUDIO ACTIVADO por defecto (copiado de pregrado)
      loop: '0',
      controls: '1',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1', // ¡CRÍTICO! Habilita YouTube API
      rel: '0'
    })
    
    iframe.src = `https://www.youtube.com/embed/${videoItem.embedId}?${params.toString()}`
    iframe.className = videoClass
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', 'true')
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    iframe.loading = index === 0 ? 'eager' : 'lazy'
    iframe.title = videoItem.alt
    
    // ✅ SISTEMA DE CARGA COMO PREGRADO
    iframe.style.opacity = '0'
    iframe.style.transition = 'opacity 0.5s ease'
    
    // Marcar como cargado cuando el iframe esté listo
    iframe.addEventListener('load', () => {
      iframe.style.opacity = '1'
      iframe.classList.add('loaded')
      wrapper.classList.add('video-loaded')
    })
    
    iframe.addEventListener('error', () => {
      this.warn('Error cargando video:', videoItem.embedId)
    })
    
    // Log para debug
    this.log(`🎬 Video iframe creado: ${videoItem.embedId}`, {
      src: iframe.src,
      class: videoClass,
      container: containerClass
    })
    
    const wrapper = document.createElement('div')
    wrapper.className = containerClass
    wrapper.appendChild(iframe)
    
    return wrapper
  },

  generateImageElement(imageItem, index, isDesktop) {
    const containerClass = isDesktop ? 'investigations-modal__image-wrapper' : 'investigations-modal__image-wrapper-mobile'
    const imageClass = isDesktop ? 'investigations-modal__image' : 'investigations-modal__image-mobile'
    
    const image = document.createElement('img')
    image.src = imageItem.src
    image.alt = imageItem.alt
    image.className = imageClass
    image.loading = index === 0 ? 'eager' : 'lazy'
    
    const wrapper = document.createElement('div')
    wrapper.className = containerClass
    wrapper.appendChild(image)
    
    return wrapper
  },

  // ==========================================
  // NUEVA FUNCIÓN: Generar galería para Swiper (Desktop)
  // ==========================================
  generateSwiperGallery(swiperWrapper, data) {
    // Limpiar wrapper
    swiperWrapper.innerHTML = ''

    // Generar todos los elementos multimedia como slides
    const allMediaItems = this.generateAdditionalMedia(data.image, data.title, data)

    allMediaItems.forEach((mediaItem, index) => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide investigations-modal__slide'

      // Generar elemento multimedia (imagen o video)
      const mediaElement = this.generateMediaElement(mediaItem, index, true) // true = desktop
      slide.appendChild(mediaElement)
      swiperWrapper.appendChild(slide)
    })

    this.log('Swiper gallery generada con', allMediaItems.length, 'slides multimedia')
  },

  // ==========================================
  // NUEVA FUNCIÓN: Inicializar Swiper del modal (Desktop)
  // ==========================================
  initializeModalSwiper() {
    // Destruir instancia existente
    if (this.modalSwiper) {
      this.modalSwiper.destroy(true, true)
      this.modalSwiper = null
    }

    // Verificar que Swiper esté disponible
    if (!window.Swiper) {
      this.warn('Swiper no disponible, usando fallback')
      return
    }

    // Solo inicializar en desktop
    if (window.innerWidth < 1024) {
      return
    }

    const swiperContainer = document.querySelector('.investigations-modal__swiper-container')
    if (!swiperContainer) {
      this.warn('Container de Swiper no encontrado')
      return
    }

    try {
      this.modalSwiper = new window.Swiper('.investigations-modal__swiper-container', {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 30,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true
        },
        freeMode: {
          enabled: true,
          sticky: false,
          momentumBounce: false,
          momentumRatio: 0.5,
          minimumVelocity: 0.1
        },
        navigation: {
          nextEl: '.investigations-modal__nav-next',
          prevEl: '.investigations-modal__nav-prev',
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return `<span class="${className}" aria-label="Ir a imagen ${index + 1}"></span>`
          }
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        grabCursor: true,
        watchOverflow: true,

        on: {
          init: function (swiper) {
            ModalInvestigacion.log('Swiper modal inicializado con', swiper.slides.length, 'slides')
            // Configurar eventos para botones personalizados
            ModalInvestigacion.setupCustomNavigation(swiper)
          },
          slideChange: function (swiper) {
            ModalInvestigacion.info('🖥️ DESKTOP slide cambiado a:', swiper.activeIndex + 1)
            // PAUSAR TODOS LOS VIDEOS AL CAMBIAR DE SLIDE
            ModalInvestigacion.pauseAllVideos()
          }
        }
      })

      this.info('Swiper vertical inicializado correctamente')
    } catch (error) {
      this.error('Error inicializando Swiper:', error)
    }
  },

  // ==========================================
  // NUEVA FUNCIÓN: Generar galería para Swiper Mobile (Horizontal)
  // ==========================================
  generateSwiperGalleryMobile(swiperWrapper, data) {
    // Limpiar wrapper
    swiperWrapper.innerHTML = ''

    // Generar todos los elementos multimedia como slides
    const allMediaItems = this.generateAdditionalMedia(data.image, data.title, data)

    allMediaItems.forEach((mediaItem, index) => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide investigations-modal__slide-mobile'
      
      // Generar elemento multimedia (imagen o video)
      const mediaElement = this.generateMediaElement(mediaItem, index, false) // false = mobile
      slide.appendChild(mediaElement)
      swiperWrapper.appendChild(slide)
    })

    // Guardar total de slides para configuración
    this.totalMobileSlides = allMediaItems.length
    this.log('Mobile Swiper gallery generada con', allMediaItems.length, 'slides multimedia')
  },

  // ==========================================
  // NUEVA FUNCIÓN: Inicializar Swiper móvil (Horizontal)
  // ==========================================
  initializeModalSwiperMobile() {
    // Destruir instancia existente
    if (this.modalSwiperMobile) {
      this.modalSwiperMobile.destroy(true, true)
      this.modalSwiperMobile = null
    }

    // Verificar que Swiper esté disponible
    if (!window.Swiper) {
      this.warn('Swiper no disponible para móvil, usando fallback')
      return
    }

    // Solo inicializar en móviles
    if (window.innerWidth >= 1024) {
      return
    }

    const swiperContainer = document.querySelector('.investigations-modal__swiper-container-mobile')
    if (!swiperContainer) {
      this.warn('Container de Swiper móvil no encontrado')
      return
    }

    try {
      this.modalSwiperMobile = new window.Swiper('.investigations-modal__swiper-container-mobile', {
        // ==========================================
        // CONFIGURACIÓN COPIADA DE PREGRADO (FUNCIONA)
        // ==========================================
        loop: false,
        spaceBetween: 20,
        grabCursor: true,
        allowTouchMove: true,
        slidesPerView: 1, // ✅ CLAVE: Iniciar con 1, NO 'auto'
        watchOverflow: true,
        centeredSlides: false,
        
        pagination: {
          el: '.investigations-modal__pagination-mobile',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return `<span class="${className}" aria-label="Ir a imagen ${index + 1}"></span>`
          }
        },

        // ==========================================
        // BREAKPOINTS PROGRESIVOS COMO PREGRADO
        // ==========================================
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true // Solo móviles pequeños
          },
          576: {
            slidesPerView: 1.2, // ✅ Progresivo como pregrado
            spaceBetween: 20,
            centeredSlides: false
          },
          768: {
            slidesPerView: 'auto', // ✅ Auto solo en tablets+
            spaceBetween: 25,
            centeredSlides: false
          }
        },
        
        on: {
          init: function(swiper) {
            ModalInvestigacion.log('Mobile Swiper inicializado con', swiper.slides.length, 'slides')
            // Configurar eventos para botones personalizados móviles
            ModalInvestigacion.setupCustomNavigationMobile(swiper)
            // ✅ CONFIGURAR SISTEMA VIDEO-CLICK-DETECTOR
            ModalInvestigacion.setupVideoClickDetection()
          },
          slideChange: function(swiper) {
            ModalInvestigacion.info('📱 MOBILE slide cambiado a:', swiper.activeIndex + 1)
            // PAUSAR TODOS LOS VIDEOS AL CAMBIAR DE SLIDE EN MÓVIL
            ModalInvestigacion.pauseAllVideos()
          }
        }
      })

      this.info('Mobile Swiper horizontal inicializado correctamente')
    } catch (error) {
      this.error('Error inicializando Mobile Swiper:', error)
    }
  },

  // ==========================================
  // CONFIGURAR NAVEGACIÓN PERSONALIZADA MÓVIL (PHOSPHOR)
  // ==========================================
  setupCustomNavigationMobile(swiper) {
    const prevButton = document.querySelector('.investigations-modal__nav-prev-mobile')
    const nextButton = document.querySelector('.investigations-modal__nav-next-mobile')

    if (prevButton && nextButton) {
      // Event listeners para los botones
      prevButton.addEventListener('click', () => {
        swiper.slidePrev()
      })

      nextButton.addEventListener('click', () => {
        swiper.slideNext()
      })

      // Soporte de teclado
      prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          swiper.slidePrev()
        }
      })

      nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          swiper.slideNext()
        }
      })

      // Actualizar estados iniciales
      this.updateCustomNavigationMobile(swiper)
      
      // Escuchar cambios de slide para actualizar estados
      swiper.on('slideChange', () => {
        this.updateCustomNavigationMobile(swiper)
      })

      this.log('Navegación personalizada móvil configurada')
    }
  },

  // ==========================================
  // ACTUALIZAR ESTADOS DE NAVEGACIÓN PERSONALIZADA MÓVIL
  // ==========================================
  updateCustomNavigationMobile(swiper) {
    const prevButton = document.querySelector('.investigations-modal__nav-prev-mobile')
    const nextButton = document.querySelector('.investigations-modal__nav-next-mobile')

    if (prevButton && nextButton) {
      // Actualizar estado del botón anterior
      if (swiper.isBeginning) {
        prevButton.classList.add('swiper-button-disabled')
        prevButton.style.opacity = '0.3'
        prevButton.style.pointerEvents = 'none'
      } else {
        prevButton.classList.remove('swiper-button-disabled')
        prevButton.style.opacity = '1'
        prevButton.style.pointerEvents = 'auto'
      }

      // Actualizar estado del botón siguiente
      if (swiper.isEnd) {
        nextButton.classList.add('swiper-button-disabled')
        nextButton.style.opacity = '0.3'
        nextButton.style.pointerEvents = 'none'
      } else {
        nextButton.classList.remove('swiper-button-disabled')
        nextButton.style.opacity = '1'
        nextButton.style.pointerEvents = 'auto'
      }
    }
  },

  // ==========================================
  // CONFIGURAR NAVEGACIÓN PERSONALIZADA (PHOSPHOR)
  // ==========================================
  setupCustomNavigation(swiper) {
    const prevButton = document.querySelector('.investigations-modal__nav-prev')
    const nextButton = document.querySelector('.investigations-modal__nav-next')

    if (prevButton && nextButton) {
      // Event listeners para los botones
      prevButton.addEventListener('click', () => {
        swiper.slidePrev()
      })

      nextButton.addEventListener('click', () => {
        swiper.slideNext()
      })

      // Soporte de teclado
      prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          swiper.slidePrev()
        }
      })

      nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          swiper.slideNext()
        }
      })

      // Actualizar estados iniciales
      this.updateCustomNavigation(swiper)
      
      // Escuchar cambios de slide para actualizar estados
      swiper.on('slideChange', () => {
        this.updateCustomNavigation(swiper)
      })

      this.log('Navegación personalizada configurada')
    }
  },

  // ==========================================
  // ACTUALIZAR ESTADOS DE NAVEGACIÓN PERSONALIZADA
  // ==========================================
  updateCustomNavigation(swiper) {
    const prevButton = document.querySelector('.investigations-modal__nav-prev')
    const nextButton = document.querySelector('.investigations-modal__nav-next')

    if (prevButton && nextButton) {
      // Actualizar estado del botón anterior
      if (swiper.isBeginning) {
        prevButton.classList.add('swiper-button-disabled')
        prevButton.style.opacity = '0.3'
        prevButton.style.pointerEvents = 'none'
      } else {
        prevButton.classList.remove('swiper-button-disabled')
        prevButton.style.opacity = '1'
        prevButton.style.pointerEvents = 'auto'
      }

      // Actualizar estado del botón siguiente
      if (swiper.isEnd) {
        nextButton.classList.add('swiper-button-disabled')
        nextButton.style.opacity = '0.3'
        nextButton.style.pointerEvents = 'none'
      } else {
        nextButton.classList.remove('swiper-button-disabled')
        nextButton.style.opacity = '1'
        nextButton.style.pointerEvents = 'auto'
      }
    }
  },

  // Helper para formatear fecha basándose en el año
  formatDate(year) {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]
    const randomMonth = months[Math.floor(Math.random() * months.length)]
    return `${randomMonth} ${year}`
  },

  // Helper para generar nombres de estudiantes basándose en el título
  generateStudentName(title) {
    const studentNames = [
      'Ana María Rodríguez',
      'Carlos Eduardo Gómez',
      'Patricia Alejandra Silva',
      'Miguel Ángel Torres',
      'Sofía Isabel Vargas',
      'Andrés Felipe Moreno',
      'Gabriela Cristina López',
      'Juan Sebastian Herrera'
    ]

    // Usar el hash del título para asegurar consistencia
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convertir a 32bit integer
    }

    const index = Math.abs(hash) % studentNames.length
    return studentNames[index]
  },

  // Helper para formatear la descripción en párrafos
  formatDescription(description) {
    if (!description) return '<p>Descripción no disponible.</p>'

    // Dividir el texto en párrafos basándose en puntos seguidos y longitud
    const sentences = description.split('. ')
    const paragraphs = []
    let currentParagraph = ''

    sentences.forEach((sentence, index) => {
      // Añadir el punto de vuelta excepto en la última oración
      const fullSentence = index < sentences.length - 1 ? sentence + '.' : sentence

      // Si el párrafo actual + nueva oración es muy largo, crear nuevo párrafo
      if (currentParagraph.length + fullSentence.length > 400 && currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.trim())
        currentParagraph = fullSentence
      } else {
        currentParagraph += (currentParagraph ? ' ' : '') + fullSentence
      }
    })

    // Añadir el último párrafo si existe
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim())
    }

    // Convertir párrafos en HTML
    return paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')
  },

  // ==========================================
  // SISTEMA VIDEO-CLICK-DETECTOR (COPIADO DE PREGRADO)
  // ==========================================
  
  setupVideoClickDetection() {
    // Solo configurar en móviles
    if (window.innerWidth >= 1024) return
    
    const videoContainers = document.querySelectorAll('.investigations-modal__video-wrapper-mobile')
    
    videoContainers.forEach((container, i) => {
      const iframe = container.querySelector('iframe')
      
      if (!iframe || container.querySelector('.video-click-detector')) {
        return // Saltar si no hay iframe o ya tiene detector
      }
      
      // Crear overlay invisible para detectar clics (PATRÓN EXACTO DE PREGRADO)
      const overlay = document.createElement('div')
      overlay.className = 'video-click-detector'
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.zIndex = '5'
      overlay.style.cursor = 'pointer'
      overlay.style.backgroundColor = 'transparent'
      overlay.style.pointerEvents = 'auto'
      
      // Agregar data attribute para identificar el iframe
      overlay.setAttribute('data-iframe-id', 'iframe-' + i)
      iframe.setAttribute('data-iframe-id', 'iframe-' + i)
      
      overlay.addEventListener('click', function(e) {
        const currentIframe = this.parentNode.querySelector('iframe')
        
        // Pausar todos los otros videos excepto este
        ModalInvestigacion.pauseAllVideos(currentIframe)
        
        // Remover el overlay temporalmente para permitir interacción (CLAVE DE PREGRADO)
        this.style.pointerEvents = 'none'
        this.style.display = 'none'
        
        // Volver a activar el overlay después de un tiempo
        const self = this
        setTimeout(function() {
          self.style.pointerEvents = 'auto'
          self.style.display = 'block'
        }, 2000) // 2 segundos para que el usuario pueda interactuar
      })
      
      container.style.position = 'relative'
      container.appendChild(overlay)
    })
    
    this.log('Sistema video-click-detector configurado (patrón pregrado)')
  },
  
  // ==========================================
  // SISTEMA DE CONTROL DE VIDEOS
  // ==========================================
  
  // Función para pausar todos los videos del modal (adaptada de experiencia)
  pauseAllVideos(exceptIframe = null) {
    this.info('🎵 INICIANDO pauseAllVideos...')
    
    // Buscar todos los iframes de video en el modal
    const videoSelectors = [
      '.investigations-modal__video-wrapper iframe',
      '.investigations-modal__video-wrapper-mobile iframe',
      '.investigations-modal__video iframe',
      '.investigations-modal__video-mobile iframe'
    ]
    
    let totalVideosFound = 0
    let totalVideosPaused = 0
    
    videoSelectors.forEach((selector, index) => {
      const videos = document.querySelectorAll(selector)
      this.log(`Selector ${index + 1}: "${selector}" - Encontrados: ${videos.length}`)
      
      videos.forEach((iframe, videoIndex) => {
        totalVideosFound++
        
        // Saltar el iframe que se está reproduciendo (si se especifica)
        if (exceptIframe && iframe === exceptIframe) {
          this.log(`Video ${videoIndex + 1} omitido (es la excepción)`)
          return
        }
        
        try {
          // Usar YouTube API para pausar el video
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
          totalVideosPaused++
          this.log(`✅ Video ${videoIndex + 1} pausado:`, iframe.src.substring(0, 50) + '...')
        } catch (error) {
          this.error(`❌ Error pausando video ${videoIndex + 1}:`, error.message)
        }
      })
    })
    
    this.info(`🎵 RESUMEN: ${totalVideosFound} videos encontrados, ${totalVideosPaused} pausados`)
    
    if (totalVideosFound === 0) {
      this.warn('⚠️ NO se encontraron videos en el modal!')
    }
  },

  cleanup() {
    try {
      this.close()
      const modal = document.querySelector('.investigations-modal-overlay')
      if (modal) {
        modal.remove()
      }
      this.isInitialized = false
      console.log('[MODAL-INVESTIGACION] Cleanup completado')
    } catch (error) {
      this.error('Error en cleanup:', error)
    }
  }
}

export { ModalInvestigacion }
