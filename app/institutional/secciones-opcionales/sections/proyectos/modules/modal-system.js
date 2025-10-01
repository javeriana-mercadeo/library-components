// ===========================================
// MODAL SYSTEM - GESTIÓN DE MODALES
// ===========================================

import { Logger } from './utils.js'

export class ModalSystem {
  constructor(videoSystem) {
    this.videoSystem = videoSystem
    this.isInitialized = false
  }

  /**
   * Inicializar el sistema de modales
   */
  init() {
    this.setupModalEvents()
    this.isInitialized = true
    Logger.info('Modal system inicializado')
  }

  /**
   * Configurar eventos del modal
   */
  setupModalEvents() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const modalBackdrop = document.getElementById('modal-backdrop-carousel')
        if (modalBackdrop && modalBackdrop.classList.contains('show')) {
          this.closeModal()
        }
      }
    })

    const closeBtn = document.querySelector('#modal-backdrop-carousel .modal-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal())
    }
  }

  /**
   * Obtener datos del proyecto desde Liferay
   */
  getProjectDataFromHTML(slideIndex) {
    const getEditableContent = id => {
      const selectors = [`[data-lfr-editable-id="${id}"]`, `#${id}`, `[id="${id}"]`]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          const text = element.textContent ? element.textContent.trim() : ''
          if (text) return text
        }
      }
      return ''
    }

    const getEditableHTML = id => {
      const selectors = [`[data-lfr-editable-id="${id}"]`, `#${id}`, `[id="${id}"]`]

      for (const selector of selectors) {
        const element = document.querySelector(selector)
        if (element) {
          const html = element.innerHTML ? element.innerHTML.trim() : ''
          if (html) return html
        }
      }
      return ''
    }

    const getMultipleVideoUrls = slideIdx => {
      const videoUrls = []
      let videoIndex = 0
      let hasMoreVideos = true

      while (hasMoreVideos) {
        const videoUrl = getEditableContent(`project-video-${slideIdx}-${videoIndex}`)

        if (videoUrl && videoUrl.trim() !== '') {
          videoUrls.push(videoUrl.trim())
          videoIndex++
        } else {
          hasMoreVideos = false
        }
      }

      return videoUrls
    }

    const title = getEditableContent(`project-title-${slideIndex}`)
    const date = getEditableContent(`project-date-${slideIndex}`)
    const responsible = getEditableContent(`project-responsible-${slideIndex}`)
    const description = getEditableHTML(`project-description-${slideIndex}`)

    const videoUrls = getMultipleVideoUrls(slideIndex)

    const galleryText = getEditableContent(`project-gallery-${slideIndex}`)
    const gallery = galleryText
      ? galleryText
          .split(',')
          .map(url => url.trim())
          .filter(url => url.length > 0)
      : []

    // Datos fallback si no hay datos de Liferay
    if (!title && videoUrls.length === 0) {
      return this.getFallbackData(slideIndex)
    }

    return {
      title: title || `Proyecto ${slideIndex + 1}`,
      date: date || '2024',
      responsible: responsible || 'Equipo Universitario',
      description: description || 'Descripción del proyecto disponible próximamente.',
      videoUrls: videoUrls,
      gallery: gallery
    }
  }

  /**
   * Datos fallback
   */
  getFallbackData(slideIndex) {
    const fallbackData = {
      0: {
        title: 'Universidad Destacada',
        date: '2024',
        responsible: 'Equipo Académico',
        description: 'Descubre nuestros programas académicos de alta calidad.',
        videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
        gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
      },
      1: {
        title: 'Investigación de Clase Mundial',
        date: '2023-2024',
        responsible: 'Centro de Investigación',
        description: 'Proyectos innovadores y logros académicos destacados.',
        videoUrls: ['https://www.youtube.com/watch?v=h3GuFxrk8aI'],
        gallery: []
      }
    }

    return (
      fallbackData[slideIndex] || {
        title: `Proyecto ${slideIndex + 1}`,
        date: '2024',
        responsible: 'Equipo Universitario',
        description: 'Información disponible próximamente.',
        videoUrls: [],
        gallery: []
      }
    )
  }

  /**
   * Insertar galería de imágenes
   */
  insertGallery(container, gallery, title) {
    if (!container) return

    container.innerHTML = ''

    if (!gallery || !gallery.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No hay imágenes disponibles</div>'
      return
    }

    gallery.forEach((imageUrl, index) => {
      if (!imageUrl || !imageUrl.trim()) return

      const imageWrapper = document.createElement('div')
      imageWrapper.style.cssText =
        'width: 100%; margin-bottom: 1.5rem; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);'

      const image = document.createElement('img')
      image.src = imageUrl.trim()
      image.alt = `${title} - Imagen ${index + 1}`
      image.loading = 'lazy'
      image.style.cssText = 'width: 100%; height: 400px; display: block; object-fit: cover;'

      imageWrapper.appendChild(image)
      container.appendChild(imageWrapper)
    })
  }

  /**
   * Abrir modal
   */
  openModal(slideIndex) {
    Logger.info(`Abriendo modal para slide ${slideIndex}`)

    const projectData = this.getProjectDataFromHTML(slideIndex)

    if (!projectData.title && projectData.videoUrls.length === 0) {
      Logger.error(`Datos insuficientes para slide ${slideIndex}`)
      return
    }

    try {
      const modalBackdrop = document.getElementById('modal-backdrop-carousel')
      const modalTitle = document.getElementById('modal-project-title')
      const modalDate = document.getElementById('modal-project-date')
      const modalResponsible = document.getElementById('modal-project-responsible')
      const modalDescription = document.getElementById('modal-project-description')
      const videosContainer = document.getElementById('modal-project-videos')
      const galleryContainer = document.getElementById('modal-project-gallery-items')

      if (!modalBackdrop || !videosContainer || !galleryContainer) {
        Logger.error('Elementos del modal no encontrados')
        return
      }

      if (modalTitle) modalTitle.innerHTML = projectData.title
      if (modalDate) modalDate.textContent = projectData.date
      if (modalResponsible) modalResponsible.textContent = projectData.responsible
      if (modalDescription) modalDescription.innerHTML = projectData.description

      modalBackdrop.classList.add('show')
      modalBackdrop.style.display = 'flex'
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }

      setTimeout(() => {
        if (projectData.videoUrls && projectData.videoUrls.length > 0) {
          this.videoSystem.insertMultipleVideos(videosContainer, projectData.videoUrls, projectData.title)
        }
      }, 100)

      setTimeout(() => {
        if (projectData.gallery && projectData.gallery.length > 0) {
          this.insertGallery(galleryContainer, projectData.gallery, projectData.title)
        }
      }, 200)
    } catch (error) {
      Logger.error('Error abriendo modal:', error)
    }
  }

  /**
   * Cerrar modal
   */
  closeModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
      return
    }

    const modalBackdrop = document.getElementById('modal-backdrop-carousel')
    if (!modalBackdrop) return

    this.videoSystem.cleanupModalVideos()

    modalBackdrop.classList.remove('show')
    modalBackdrop.style.display = 'none'

    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')

    if (videosContainer) videosContainer.innerHTML = ''
    if (galleryContainer) galleryContainer.innerHTML = ''

    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  /**
   * Destruir el sistema
   */
  destroy() {
    this.isInitialized = false
    Logger.info('Modal system destruido')
  }
}

export default ModalSystem
