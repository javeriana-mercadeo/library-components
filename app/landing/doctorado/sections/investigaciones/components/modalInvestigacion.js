// ===========================================
// MODAL INVESTIGACIONES - SISTEMA COMPLETAMENTE NUEVO
// ===========================================

const ModalInvestigacion = {
  isInitialized: false,
  modalHTML: null,

  // Función helper para generar HTML del botón iconOnly siguiendo el patrón del sistema Btn
  generateIconOnlyButton({ variant = 'light', color = 'secondary', size = 'md', icon = 'ph ph-x', ariaLabel = 'Cerrar modal', className = '' }) {
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
    const hoverStyles = variant === 'ghost' ? `
      style="transition: all 0.2s ease-in-out;"
      onmouseenter="this.style.background='rgba(var(--primary-rgb, 59, 130, 246), 0.18)'"
      onmouseleave="this.style.background='transparent'"
    ` : ''

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
            <div class="investigations-modal__images-container" id="modal-images-container">
              <!-- Las imágenes se generarán dinámicamente aquí -->
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
              <span class="investigations-modal__badge" id="modal-year">2024</span>
              <h2 class="investigations-modal__title" id="modal-title">Título de la Investigación</h2>

              <!-- Metadatos -->
              <div class="investigations-modal__metadata">
                <div class="investigations-modal__metadata-item">
                  <span class="investigations-modal__label">Fecha:</span>
                  <span class="investigations-modal__value">Enero 2024</span>
                </div>
                <div class="investigations-modal__metadata-item">
                  <span class="investigations-modal__label">Estudiante:</span>
                  <span class="investigations-modal__value">María González</span>
                </div>
              </div>

              <!-- Descripción -->
              <div class="investigations-modal__description">
                <p id="modal-description">Descripción de la investigación...</p>
                <p>Esta investigación aborda los complejos desafíos que enfrentan las sociedades latinoamericanas en el siglo XXI, analizando desde una perspectiva interdisciplinaria los factores económicos, políticos y culturales que configuran la región.</p>
                <p>El estudio incluye un análisis comparativo entre diferentes países de la región, identificando patrones comunes y particularidades específicas que contribuyen a una mejor comprensión de la dinámica social contemporánea.</p>
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
    document.addEventListener('click', (event) => {
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
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen()) {
        this.close()
      }
    })

    console.log('[MODAL-INVESTIGACION] Event listeners configurados')
  },

  handleCardClick(card) {
    try {
      // Extraer datos de la card usando las clases CSS correctas del proyecto
      const titleElement = card.querySelector('.title') || card.querySelector('h3') || card.querySelector('[class*="title"]')
      const badgeElement = card.querySelector('.investigations_badge') || card.querySelector('[class*="badge"]')
      const descriptionElement = card.querySelector('.paragraph') || card.querySelector('p') || card.querySelector('[class*="description"]')
      const imageElement = card.querySelector('img')

      const title = titleElement ? titleElement.textContent.trim() : 'Investigación'
      const year = badgeElement ? badgeElement.textContent.trim() : '2024'
      const description = descriptionElement ? descriptionElement.textContent.trim() : 'Descripción no disponible'
      const imageSrc = imageElement ? imageElement.src : 'https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1'
      const imageAlt = imageElement ? imageElement.alt : title

      console.log('[MODAL-INVESTIGACION] Card clickeada:', { title, year, description, imageSrc })
      
      this.open({
        title,
        year,
        description,
        image: imageSrc,
        alt: imageAlt
      })
    } catch (error) {
      console.error('[MODAL-INVESTIGACION] Error al manejar click de card:', error)
    }
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
    const modalYear = document.getElementById('modal-year')
    const modalDescription = document.getElementById('modal-description')
    const imagesContainer = document.getElementById('modal-images-container')

    if (modalTitle && data.title) {
      modalTitle.textContent = data.title
    }
    if (modalYear && data.year) {
      modalYear.textContent = data.year
    }
    if (modalDescription && data.description) {
      modalDescription.textContent = data.description
    }

    // Generar galería de imágenes dinámicamente
    if (imagesContainer) {
      this.generateImageGallery(imagesContainer, data)
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