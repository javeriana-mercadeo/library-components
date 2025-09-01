// ===========================================
// MODAL INVESTIGACIONES - SISTEMA COMPLETAMENTE NUEVO
// ===========================================

const ModalInvestigacion = {
  isInitialized: false,
  modalHTML: null,
  modalSwiper: null, // Instancia de Swiper para desktop
  modalSwiperMobile: null, // Instancia de Swiper para mobile

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
    console.log('[MODAL-INVESTIGACION] Modal HTML creado dinámicamente')
  },

  init() {
    try {
      if (this.isInitialized) {
        console.log('[MODAL-INVESTIGACION] Ya está inicializado')
        return true
      }

      // Crear el modal dinámicamente
      this.createModal()

      // Configurar event listeners
      this.setupEventListeners()

      this.isInitialized = true
      console.log('[MODAL-INVESTIGACION] Sistema inicializado correctamente')
      return true
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error al inicializar:', error)
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

    console.log('[MODAL-INVESTIGACION] Event listeners configurados')
  },

  handleCardClick(card) {
    try {
      // Obtener el ID de la card desde el data-attribute
      const cardId = card.getAttribute('data-id')

      if (!cardId) {
        console.warn('[MODAL-INVESTIGACION] Card sin data-id, usando fallback')
        return this.handleCardClickFallback(card)
      }

      // Buscar los datos completos desde window (React)
      const fullData = this.getInvestigacionData(parseInt(cardId))

      if (!fullData) {
        console.warn('[MODAL-INVESTIGACION] No se encontraron datos para ID:', cardId)
        return this.handleCardClickFallback(card)
      }

      console.log('[MODAL-INVESTIGACION] Card clickeada:', {
        id: fullData.id,
        title: fullData.title,
        year: fullData.year,
        descriptionLength: fullData.description?.length
      })

      this.open(fullData)
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error al manejar click de card:', error)
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
    if (!window.investigacionesData) {
      console.warn('[MODAL-INVESTIGACION] Datos no disponibles en window')
      return null
    }

    return window.investigacionesData.find(item => item.id === id)
  },

  // NUEVO MÉTODO DE APERTURA - COPIADO EXACTO DEL HEADER
  open(data) {
    try {
      const modalOverlay = document.querySelector('.investigations-modal-overlay')
      const modal = document.querySelector('.investigations-modal')

      if (!modalOverlay || !modal) {
        console.warn('[MODAL-INVESTIGACION] Modal no encontrado, recreando...')
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

      console.log('[MODAL-INVESTIGACION] Modal abierto:', data.title)
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error al abrir modal:', error)
    }
  },

  // NUEVO MÉTODO DE CIERRE - COPIADO EXACTO DEL HEADER
  close() {
    try {
      const modalOverlay = document.querySelector('.investigations-modal-overlay')
      const modal = document.querySelector('.investigations-modal')

      if (modalOverlay && modal) {
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

        console.log('[MODAL-INVESTIGACION] Modal cerrado')
      }
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error al cerrar modal:', error)
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

  generateImageGallery(container, data) {
    // Limpiar contenedor
    container.innerHTML = ''

    // Imagen principal
    const mainImageWrapper = document.createElement('div')
    mainImageWrapper.className = 'investigations-modal__image-wrapper'

    const mainImage = document.createElement('img')
    mainImage.src = data.image || 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1'
    mainImage.alt = data.alt || data.title
    mainImage.className = 'investigations-modal__image'

    mainImageWrapper.appendChild(mainImage)
    container.appendChild(mainImageWrapper)

    // Generar imágenes adicionales (simuladas basándose en la principal)
    const additionalImages = this.generateAdditionalImages(data.image, data.title)

    additionalImages.forEach((imgSrc, index) => {
      const imageWrapper = document.createElement('div')
      imageWrapper.className = 'investigations-modal__image-wrapper'

      const image = document.createElement('img')
      image.src = imgSrc
      image.alt = `${data.title} - Imagen ${index + 2}`
      image.className = 'investigations-modal__image'

      imageWrapper.appendChild(image)
      container.appendChild(imageWrapper)
    })

    console.log('[MODAL-INVESTIGACION] Galería generada con', additionalImages.length + 1, 'imágenes')
  },

  generateAdditionalImages(baseImage, title) {
    // Generar 3 imágenes adicionales basándose en la imagen base
    const additionalImages = []

    if (baseImage) {
      // Crear variaciones de la imagen base agregando sufijos
      additionalImages.push(`${baseImage}-2`)
      additionalImages.push(`${baseImage}-3`)
      additionalImages.push(`${baseImage}-4`)
    } else {
      // Imágenes por defecto si no hay imagen base
      additionalImages.push('https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-2')
      additionalImages.push('https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-3')
      additionalImages.push('https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-4')
    }

    return additionalImages
  },

  // ==========================================
  // NUEVA FUNCIÓN: Generar galería para Swiper (Desktop)
  // ==========================================
  generateSwiperGallery(swiperWrapper, data) {
    // Limpiar wrapper
    swiperWrapper.innerHTML = ''

    // Generar todas las imágenes como slides
    const allImages = [
      { src: data.image || 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1', alt: data.alt || data.title },
      ...this.generateAdditionalImages(data.image, data.title).map((src, index) => ({
        src,
        alt: `${data.title} - Imagen ${index + 2}`
      }))
    ]

    allImages.forEach((img, index) => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide investigations-modal__slide'

      const imageWrapper = document.createElement('div')
      imageWrapper.className = 'investigations-modal__image-wrapper'

      const image = document.createElement('img')
      image.src = img.src
      image.alt = img.alt
      image.className = 'investigations-modal__image'
      image.loading = index === 0 ? 'eager' : 'lazy' // Optimización de carga

      imageWrapper.appendChild(image)
      slide.appendChild(imageWrapper)
      swiperWrapper.appendChild(slide)
    })

    console.log('[MODAL-INVESTIGACION] Swiper gallery generada con', allImages.length, 'slides')
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
      console.warn('[MODAL-INVESTIGACION] Swiper no disponible, usando fallback')
      return
    }

    // Solo inicializar en desktop
    if (window.innerWidth < 1024) {
      return
    }

    const swiperContainer = document.querySelector('.investigations-modal__swiper-container')
    if (!swiperContainer) {
      console.warn('[MODAL-INVESTIGACION] Container de Swiper no encontrado')
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
            console.log('[MODAL-INVESTIGACION] Swiper modal inicializado con', swiper.slides.length, 'slides')
            // Configurar eventos para botones personalizados
            ModalInvestigacion.setupCustomNavigation(swiper)
          },
          slideChange: function (swiper) {
            console.log('[MODAL-INVESTIGACION] Slide cambiado a:', swiper.activeIndex + 1)
          }
        }
      })

      console.log('[MODAL-INVESTIGACION] Swiper vertical inicializado correctamente')
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error inicializando Swiper:', error)
    }
  },

  // ==========================================
  // NUEVA FUNCIÓN: Generar galería para Swiper Mobile (Horizontal)
  // ==========================================
  generateSwiperGalleryMobile(swiperWrapper, data) {
    // Limpiar wrapper
    swiperWrapper.innerHTML = ''

    // Generar todas las imágenes como slides
    const allImages = [
      { src: data.image || 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1', alt: data.alt || data.title },
      ...this.generateAdditionalImages(data.image, data.title).map((src, index) => ({
        src,
        alt: `${data.title} - Imagen ${index + 2}`
      }))
    ]

    allImages.forEach((img, index) => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide investigations-modal__slide-mobile'
      
      const imageWrapper = document.createElement('div')
      imageWrapper.className = 'investigations-modal__image-wrapper-mobile'
      
      const image = document.createElement('img')
      image.src = img.src
      image.alt = img.alt
      image.className = 'investigations-modal__image-mobile'
      image.loading = index === 0 ? 'eager' : 'lazy'
      
      imageWrapper.appendChild(image)
      slide.appendChild(imageWrapper)
      swiperWrapper.appendChild(slide)
    })

    console.log('[MODAL-INVESTIGACION] Mobile Swiper gallery generada con', allImages.length, 'slides')
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
      console.warn('[MODAL-INVESTIGACION] Swiper no disponible para móvil, usando fallback')
      return
    }

    // Solo inicializar en móviles
    if (window.innerWidth >= 1024) {
      return
    }

    const swiperContainer = document.querySelector('.investigations-modal__swiper-container-mobile')
    if (!swiperContainer) {
      console.warn('[MODAL-INVESTIGACION] Container de Swiper móvil no encontrado')
      return
    }

    try {
      this.modalSwiperMobile = new window.Swiper('.investigations-modal__swiper-container-mobile', {
        direction: 'horizontal',
        slidesPerView: 1.2,
        spaceBetween: 15,
        centeredSlides: false,
        grabCursor: true,
        watchOverflow: true,
        
        pagination: {
          el: '.investigations-modal__pagination-mobile',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
          renderBullet: function (index, className) {
            return `<span class="${className}" aria-label="Ir a imagen ${index + 1}"></span>`
          }
        },

        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 12
          },
          480: {
            slidesPerView: 1.2,
            spaceBetween: 15
          }
        },
        
        on: {
          init: function(swiper) {
            console.log('[MODAL-INVESTIGACION] Mobile Swiper inicializado con', swiper.slides.length, 'slides')
          },
          slideChange: function(swiper) {
            console.log('[MODAL-INVESTIGACION] Mobile slide cambiado a:', swiper.activeIndex + 1)
          }
        }
      })

      console.log('[MODAL-INVESTIGACION] Mobile Swiper horizontal inicializado correctamente')
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error inicializando Mobile Swiper:', error)
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

      console.log('[MODAL-INVESTIGACION] Navegación personalizada configurada')
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
      console.error('[MODAL-INVESTIGACION] Error en cleanup:', error)
    }
  }
}

export { ModalInvestigacion }
