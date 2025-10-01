// CarouselManager.js - Módulo para JSX con múltiples videos

class CarouselManager {
  constructor() {
    console.log('🎠 Inicializando Carousel Touch Manual v5.0 con Múltiples Videos...')

    // Variables de estado
    this.currentSlideIndex = 0
    this.totalSlides = 0
    this.slidesPerView = 1
    this.isTransitioning = false
    this.isInitialized = false

    // Variables para carrusel infinito
    this.originalSlides = []
    this.isInfiniteEnabled = false
    this.duplicatedSlides = 0

    // Variables para touch
    this.touchStartX = 0
    this.touchStartY = 0
    this.touchCurrentX = 0
    this.touchCurrentY = 0
    this.isDragging = false
    this.startTime = 0
    this.startTranslateX = 0

    this.CONFIG = {
      INIT_TIMEOUT: 100,
      RETRY_TIMEOUT: 2000,
      MAX_RETRIES: 5,
      MODAL_ANIMATION_DURATION: 300,
      SLIDE_TRANSITION_DURATION: 400,
      TOUCH_THRESHOLD: 50,
      VELOCITY_THRESHOLD: 0.5,
      RESPONSIVE_BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 900,
        DESKTOP: 1200
      }
    }

    this.initRetries = 0

    // Bind methods
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.carouselPrevSlide = this.carouselPrevSlide.bind(this)
    this.carouselNextSlide = this.carouselNextSlide.bind(this)
  }

  // Utilidades para detectar DOM listo
  waitForReady() {
    return new Promise(resolve => {
      const checkReady = () => {
        const hasRequiredElements =
          document.getElementById('modal-backdrop-carousel') &&
          document.getElementById('modal-project-gallery-items') &&
          document.getElementById('modal-project-videos') &&
          document.getElementById('carousel-container') &&
          document.getElementById('slides-wrapper')

        if (document.readyState === 'complete' && hasRequiredElements) {
          console.log('✅ DOM completamente listo')
          resolve()
        } else if (this.initRetries < this.CONFIG.MAX_RETRIES) {
          this.initRetries++
          console.log(`⏳ Esperando DOM... Intento ${this.initRetries}/${this.CONFIG.MAX_RETRIES}`)
          setTimeout(checkReady, this.CONFIG.INIT_TIMEOUT)
        } else {
          console.warn('⚠️ Timeout esperando DOM, continuando...')
          resolve()
        }
      }
      checkReady()
    })
  }

  // Campos editables
  getEditableContent(id) {
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

  getEditableHTML(id) {
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

  // Función para obtener múltiples videos
  getMultipleVideoUrls(slideIndex) {
    const videoUrls = []
    let videoIndex = 0
    let hasMoreVideos = true

    while (hasMoreVideos) {
      const videoUrl = this.getEditableContent(`project-video-${slideIndex}-${videoIndex}`)

      if (videoUrl && videoUrl.trim() !== '') {
        videoUrls.push(videoUrl.trim())
        videoIndex++
      } else {
        hasMoreVideos = false
      }
    }

    console.log(`📹 Videos encontrados para slide ${slideIndex}:`, videoUrls)
    return videoUrls
  }

  getProjectDataFromHTML(slideIndex) {
    const title = this.getEditableContent(`project-title-${slideIndex}`)
    const date = this.getEditableContent(`project-date-${slideIndex}`)
    const responsible = this.getEditableContent(`project-responsible-${slideIndex}`)
    const description = this.getEditableHTML(`project-description-${slideIndex}`)

    const videoUrls = this.getMultipleVideoUrls(slideIndex)

    const galleryText = this.getEditableContent(`project-gallery-${slideIndex}`)
    const gallery = galleryText
      ? galleryText
          .split(',')
          .map(url => url.trim())
          .filter(url => url.length > 0)
      : []

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
        gallery: ['https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2']
      },
      2: {
        title: 'Campus Innovador',
        date: '2024',
        responsible: 'Departamento de Infraestructura',
        description: 'Instalaciones modernas y entorno de aprendizaje de vanguardia.',
        videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
        gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
      },
      3: {
        title: 'Oportunidades Internacionales',
        date: '2023-2024',
        responsible: 'Oficina Internacional',
        description: 'Programas de intercambio y colaboraciones globales.',
        videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
        gallery: ['https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png']
      }
    }

    return (
      fallbackData[slideIndex] || {
        title: `Proyecto ${slideIndex + 1}`,
        date: '2024',
        responsible: 'Equipo Universitario',
        description: 'Información disponible próximamente.',
        videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
        gallery: []
      }
    )
  }

  // Carrusel infinito
  createInfiniteCarousel() {
    const wrapper = document.getElementById('slides-wrapper')
    const container = document.getElementById('carousel-container')

    if (!wrapper || !container) {
      console.error('❌ Elementos no encontrados para carrusel infinito')
      return false
    }

    const slides = wrapper.querySelectorAll('.carousel-slide')
    this.originalSlides = Array.from(slides)
    const totalOriginalSlides = this.originalSlides.length

    const needsInfinite = totalOriginalSlides < 8

    if (!needsInfinite) {
      console.log('📋 Suficientes tarjetas, carrusel infinito deshabilitado')
      this.isInfiniteEnabled = false
      return true
    }

    console.log('🔄 Creando carrusel infinito...')

    const minSlidesNeeded = this.slidesPerView * 3
    let slidesToDuplicate = Math.ceil((minSlidesNeeded - totalOriginalSlides) / totalOriginalSlides)
    slidesToDuplicate = Math.max(2, slidesToDuplicate)

    for (let i = 0; i < slidesToDuplicate; i++) {
      this.originalSlides.forEach((slide, index) => {
        const clonedSlide = slide.cloneNode(true)

        const originalIndex = parseInt(slide.getAttribute('data-slide-index')) || index
        clonedSlide.setAttribute('data-slide-index', `${originalIndex}-clone-${i}`)
        clonedSlide.setAttribute('data-clone-of', originalIndex)
        clonedSlide.classList.add('cloned-slide')

        clonedSlide.onclick = () => {
          this.openCarouselModal(originalIndex)
        }

        wrapper.appendChild(clonedSlide)
        this.duplicatedSlides++
      })
    }

    this.totalSlides = wrapper.querySelectorAll('.carousel-slide').length
    this.isInfiniteEnabled = true

    console.log(
      `✅ Carrusel infinito creado: ${this.originalSlides.length} originales, ${this.duplicatedSlides} duplicadas, ${this.totalSlides} total`
    )
    return true
  }

  handleInfiniteLoop() {
    if (!this.isInfiniteEnabled || this.originalSlides.length === 0) return

    const originalSlidesCount = this.originalSlides.length
    const wrapper = document.getElementById('slides-wrapper')

    const nearEnd = this.currentSlideIndex >= this.totalSlides - originalSlidesCount * 1.5
    const nearStart = this.currentSlideIndex <= originalSlidesCount * 0.5

    if (nearEnd) {
      setTimeout(() => {
        wrapper.classList.add('no-transition')
        this.currentSlideIndex = this.currentSlideIndex - originalSlidesCount

        const slidePercentage = 100 / this.slidesPerView
        const translateX = this.currentSlideIndex * slidePercentage
        wrapper.style.transform = `translateX(-${translateX}%)`

        setTimeout(() => {
          wrapper.classList.remove('no-transition')
        }, 50)
      }, this.CONFIG.SLIDE_TRANSITION_DURATION)
    }

    if (nearStart && this.currentSlideIndex < 0) {
      setTimeout(() => {
        wrapper.classList.add('no-transition')
        this.currentSlideIndex = originalSlidesCount + this.currentSlideIndex

        const slidePercentage = 100 / this.slidesPerView
        const translateX = this.currentSlideIndex * slidePercentage
        wrapper.style.transform = `translateX(-${translateX}%)`

        setTimeout(() => {
          wrapper.classList.remove('no-transition')
        }, 50)
      }, this.CONFIG.SLIDE_TRANSITION_DURATION)
    }
  }

  // Funciones del slider
  calculateSlidesPerView() {
    const containerWidth = window.innerWidth

    if (containerWidth >= this.CONFIG.RESPONSIVE_BREAKPOINTS.DESKTOP) {
      return 4
    } else if (containerWidth >= this.CONFIG.RESPONSIVE_BREAKPOINTS.TABLET) {
      return 3
    } else if (containerWidth >= this.CONFIG.RESPONSIVE_BREAKPOINTS.MOBILE) {
      return 2
    } else {
      return 1
    }
  }

  updateSliderDimensions() {
    const wrapper = document.getElementById('slides-wrapper')
    const container = document.getElementById('carousel-container')

    if (!wrapper || !container) {
      console.error('❌ Elementos del slider no encontrados')
      return false
    }

    const slides = wrapper.querySelectorAll('.carousel-slide')
    this.totalSlides = slides.length
    this.slidesPerView = this.calculateSlidesPerView()

    if (this.totalSlides === 0) {
      console.warn('⚠️ No se encontraron slides')
      return false
    }

    console.log(`📐 Dimensiones: ${this.slidesPerView} slides por vista de ${this.totalSlides} totales`)

    if (this.totalSlides <= this.slidesPerView) {
      wrapper.style.justifyContent = 'center'
      wrapper.classList.add('centered-slides')
    } else {
      wrapper.style.justifyContent = 'flex-start'
      wrapper.classList.remove('centered-slides')
    }

    return true
  }

  updateSliderPosition(animated = true, customTranslateX = null) {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    if (this.isInfiniteEnabled) {
      this.handleInfiniteLoop()
    }

    const maxPosition = Math.max(0, this.totalSlides - this.slidesPerView)

    if (this.currentSlideIndex > maxPosition) {
      this.currentSlideIndex = maxPosition
    }

    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = 0
    }

    let translateX
    if (customTranslateX !== null) {
      translateX = customTranslateX
    } else {
      const slidePercentage = 100 / this.slidesPerView
      translateX = this.currentSlideIndex * slidePercentage
    }

    wrapper.style.transition = animated ? `transform ${this.CONFIG.SLIDE_TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none'

    wrapper.style.transform = `translateX(-${translateX}%)`

    console.log(`🎯 Posición actualizada: slide ${this.currentSlideIndex} (${translateX}%)`)
  }

  updateIndicators() {
    const indicators = document.querySelectorAll('#carousel-indicators .indicator')

    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index

      if (indicatorIndex < this.originalSlides.length) {
        indicator.style.display = 'block'

        let isActive = false

        if (this.isInfiniteEnabled) {
          const currentOriginalSlide = this.currentSlideIndex % this.originalSlides.length
          isActive = indicatorIndex === currentOriginalSlide
        } else {
          const slideStart = this.currentSlideIndex
          const slideEnd = this.currentSlideIndex + this.slidesPerView - 1
          isActive = indicatorIndex >= slideStart && indicatorIndex <= slideEnd
        }

        if (isActive) {
          indicator.classList.add('active')
        } else {
          indicator.classList.remove('active')
        }
      } else {
        indicator.style.display = 'none'
      }
    })
  }

  updateNavigationButtons() {
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    if (!prevBtn || !nextBtn) return

    if (this.isInfiniteEnabled) {
      prevBtn.style.display = 'flex'
      nextBtn.style.display = 'flex'
      prevBtn.disabled = false
      nextBtn.disabled = false
      prevBtn.style.opacity = '1'
      nextBtn.style.opacity = '1'
      prevBtn.style.cursor = 'pointer'
      nextBtn.style.cursor = 'pointer'
    } else {
      const maxPosition = Math.max(0, this.totalSlides - this.slidesPerView)

      if (this.totalSlides <= this.slidesPerView) {
        prevBtn.style.display = 'none'
        nextBtn.style.display = 'none'
      } else {
        prevBtn.style.display = 'flex'
        nextBtn.style.display = 'flex'

        const isPrevDisabled = this.currentSlideIndex <= 0
        const isNextDisabled = this.currentSlideIndex >= maxPosition

        prevBtn.disabled = isPrevDisabled
        nextBtn.disabled = isNextDisabled

        prevBtn.style.opacity = isPrevDisabled ? '0.3' : '1'
        nextBtn.style.opacity = isNextDisabled ? '0.3' : '1'

        prevBtn.style.cursor = isPrevDisabled ? 'not-allowed' : 'pointer'
        nextBtn.style.cursor = isNextDisabled ? 'not-allowed' : 'pointer'
      }
    }
  }

  updateSliderLayout() {
    if (!this.updateSliderDimensions()) return

    this.updateSliderPosition(false)
    this.updateIndicators()
    this.updateNavigationButtons()

    console.log('🎨 Layout actualizado completamente')
  }

  goToSlide(targetIndex, animated = true) {
    if (this.isTransitioning) {
      console.log('⏳ Transición en progreso')
      return
    }

    let maxPosition, clampedIndex

    if (this.isInfiniteEnabled) {
      clampedIndex = targetIndex
    } else {
      maxPosition = Math.max(0, this.totalSlides - this.slidesPerView)
      clampedIndex = Math.max(0, Math.min(targetIndex, maxPosition))
    }

    if (clampedIndex === this.currentSlideIndex && !this.isInfiniteEnabled) {
      console.log('🎯 Ya en el slide objetivo')
      return
    }

    console.log(`🚀 Navegando de slide ${this.currentSlideIndex} a ${clampedIndex}`)

    if (animated) {
      this.isTransitioning = true
      setTimeout(() => {
        this.isTransitioning = false
      }, this.CONFIG.SLIDE_TRANSITION_DURATION)
    }

    this.currentSlideIndex = clampedIndex

    this.updateSliderPosition(animated)
    this.updateIndicators()
    this.updateNavigationButtons()
  }

  // Funciones touch
  getTouchX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
  }

  getTouchY(event) {
    return event.type.includes('mouse') ? event.clientY : event.touches[0].clientY
  }

  onTouchStart(event) {
    if (this.isTransitioning) return

    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    this.touchStartX = this.getTouchX(event)
    this.touchStartY = this.getTouchY(event)
    this.touchCurrentX = this.touchStartX
    this.touchCurrentY = this.touchStartY
    this.startTime = Date.now()
    this.isDragging = false

    const currentTransform = wrapper.style.transform || 'translateX(0%)'
    const match = currentTransform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/)
    this.startTranslateX = match ? parseFloat(match[1]) : 0

    wrapper.classList.add('no-transition')

    console.log('👆 Touch iniciado')
  }

  onTouchMove(event) {
    if (!this.touchStartX) return

    this.touchCurrentX = this.getTouchX(event)
    this.touchCurrentY = this.getTouchY(event)

    const diffX = this.touchCurrentX - this.touchStartX
    const diffY = this.touchCurrentY - this.touchStartY

    if (!this.isDragging && Math.abs(diffX) > 10) {
      if (Math.abs(diffY) > Math.abs(diffX)) {
        return
      }
      this.isDragging = true
      console.log('👆 Iniciando arrastre horizontal')
    }

    if (!this.isDragging) return

    event.preventDefault()

    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    const slidePercentage = 100 / this.slidesPerView
    const movePercentage = (diffX / wrapper.offsetWidth) * 100
    let newTranslateX = this.startTranslateX - movePercentage

    if (!this.isInfiniteEnabled) {
      const maxTranslate = (this.totalSlides - this.slidesPerView) * slidePercentage
      newTranslateX = Math.max(-maxTranslate, Math.min(0, newTranslateX))
    }

    wrapper.style.transform = `translateX(${newTranslateX}%)`
    wrapper.classList.add('dragging')

    console.log(`👆 Arrastrando: ${newTranslateX}%`)
  }

  onTouchEnd(event) {
    if (!this.touchStartX || !this.isDragging) {
      this.touchStartX = 0
      this.isDragging = false
      return
    }

    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    const diffX = this.touchCurrentX - this.touchStartX
    const diffTime = Date.now() - this.startTime
    const velocity = Math.abs(diffX) / diffTime

    wrapper.classList.remove('no-transition')
    wrapper.classList.remove('dragging')

    console.log(`👆 Touch terminado: diffX=${diffX}, velocity=${velocity}`)

    let shouldChangeSlide = false
    let direction = 0

    if (Math.abs(diffX) > this.CONFIG.TOUCH_THRESHOLD || velocity > this.CONFIG.VELOCITY_THRESHOLD) {
      shouldChangeSlide = true
      direction = diffX > 0 ? -1 : 1
    }

    if (shouldChangeSlide) {
      const newIndex = this.currentSlideIndex + direction
      this.goToSlide(newIndex, true)
    } else {
      this.updateSliderPosition(true)
    }

    this.touchStartX = 0
    this.touchCurrentX = 0
    this.touchCurrentY = 0
    this.isDragging = false
  }

  carouselPrevSlide() {
    console.log('⬅️ Navegación anterior')

    if (this.isInfiniteEnabled) {
      this.goToSlide(this.currentSlideIndex - 1)
    } else {
      if (this.currentSlideIndex > 0) {
        this.goToSlide(this.currentSlideIndex - 1)
      }
    }
  }

  carouselNextSlide() {
    console.log('➡️ Navegación siguiente')

    if (this.isInfiniteEnabled) {
      this.goToSlide(this.currentSlideIndex + 1)
    } else {
      const maxPosition = Math.max(0, this.totalSlides - this.slidesPerView)
      if (this.currentSlideIndex < maxPosition) {
        this.goToSlide(this.currentSlideIndex + 1)
      }
    }
  }
}

export default CarouselManager

// ========================================
// CÓDIGO LEGACY/IIFE (posiblemente para compatibilidad)
// ========================================

;(function () {
  'use strict'

  // ========================================
  // CONFIGURACIÓN Y DATOS
  // ========================================

  const projectsConfig = [
    {
      id: 0,
      title: 'Universidad Destacada',
      date: '2024',
      responsible: 'Equipo Académico',
      description: 'Descubre nuestros programas académicos de alta calidad.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'],
      thumbnail: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
    },
    {
      id: 1,
      title: 'Investigación de Clase Mundial',
      date: '2023-2024',
      responsible: 'Centro de Investigación',
      description: 'Proyectos innovadores y logros académicos destacados.',
      videoUrls: ['https://www.youtube.com/watch?v=h3GuFxrk8aI'],
      gallery: ['https://via.placeholder.com/800x600'],
      thumbnail: 'https://via.placeholder.com/400x400'
    },
    {
      id: 2,
      title: 'Campus Innovador',
      date: '2024',
      responsible: 'Departamento de Infraestructura',
      description: 'Instalaciones modernas y entorno de aprendizaje de vanguardia.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'],
      thumbnail: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
    },
    {
      id: 3,
      title: 'Oportunidades Internacionales',
      date: '2023-2024',
      responsible: 'Oficina Internacional',
      description: 'Programas de intercambio y colaboraciones globales.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'],
      thumbnail: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'
    }
  ]

  const CONFIG = {
    SLIDE_TRANSITION_DURATION: 400,
    MIN_SWIPE_DISTANCE: 50,
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 900,
    DESKTOP_BREAKPOINT: 1200
  }

  // Variables globales
  let currentSlide = 0
  let totalSlides = 0
  let isTransitioning = false
  let touchStartX = 0
  let touchEndX = 0
  let isTouching = false
  let currentProjects = projectsConfig
  let youtubePlayersRegistry = new Map()
  let isYouTubeAPIReady = false

  // ========================================
  // UTILIDADES
  // ========================================

  function isMobile() {
    return window.innerWidth < CONFIG.MOBILE_BREAKPOINT
  }

  function getProjectDataFromHTML(slideIndex) {
    // Intentar obtener datos del config
    const project = projectsConfig.find(p => p.id === slideIndex)
    if (project) {
      return project
    }

    // Fallback
    return {
      title: `Proyecto ${slideIndex + 1}`,
      date: '2024',
      responsible: 'Equipo Universitario',
      description: 'Descripción del proyecto disponible próximamente.',
      videoUrls: [],
      gallery: []
    }
  }

  function isTablet() {
    return window.innerWidth >= CONFIG.MOBILE_BREAKPOINT && window.innerWidth < CONFIG.TABLET_BREAKPOINT
  }

  function isMobileTablet() {
    return window.innerWidth < CONFIG.TABLET_BREAKPOINT
  }

  function extractYouTubeId(url) {
    const patterns = [/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/, /(?:youtube\.com\/embed\/)([^&\n?#]+)/, /(?:youtu\.be\/)([^&\n?#]+)/]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }
    return null
  }

  function getTimeParam(url) {
    const timeMatch = url.match(/[&?]t=(\d+)/)
    return timeMatch ? parseInt(timeMatch[1]) : 0
  }

  // ========================================
  // GENERACIÓN DE HTML
  // ========================================

  function generateCarouselHTML(projects) {
    return `
      <section class="container hero-carousel" id="carousel-section" data-slides-count="${projects.length}">
        <div>
          <h2 class="title title-lg carousel-title">
            Proyectos Destacados
          </h2>
        </div>

        <div class="main-container">
          <div class="carousel-container" id="carousel-container">
            <div class="swiper-wrapper" id="slides-wrapper">
              ${projects
                .map(
                  (project, index) => `
                <div class="swiper-slide" data-slide-index="${index}">
                  <div class="carousel-slide" data-project-id="${project.id}">
                    <div class="slide-image" style="background-image: url('${project.thumbnail || project.gallery[0]}')"></div>
                    <div class="slide-content">
                      <h3 class="slide-title">${project.title}</h3>
                      <p class="description">${project.description}</p>
                    </div>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="carousel-controls">
            <button class="carousel-control" id="carousel-prev" aria-label="Anterior">
              <i class="ph ph-caret-left"></i>
            </button>
            <button class="carousel-control" id="carousel-next" aria-label="Siguiente">
              <i class="ph ph-caret-right"></i>
            </button>
          </div>
        </div>

        <div class="carousel-indicators" id="carousel-indicators">
          ${projects
            .map(
              (_, index) => `
            <div class="indicator ${index === 0 ? 'active' : ''}" data-indicator-index="${index}"></div>
          `
            )
            .join('')}
        </div>
      </section>

      <div class="modal-backdrop" id="modal-backdrop-carousel">
        <div class="modal-content">
          <button class="btn modal-close" aria-label="Cerrar modal">
            <i class="ph ph-x"></i>
          </button>

          <div class="modal-body">
            <div class="project-details">
              <div class="project-layout">
                <div class="project-info">
                  <h2 class="project-title" id="modal-project-title"></h2>

                  <div class="info-row">
                    <strong>Fecha</strong>
                    <span id="modal-project-date"></span>
                  </div>

                  <div class="info-row">
                    <strong>Responsable</strong>
                    <span id="modal-project-responsible"></span>
                  </div>

                  <div class="info-row">
                    <strong>Descripción</strong>
                    <p id="modal-project-description"></p>
                  </div>
                </div>

                <div class="project-gallery">
                  <div class="video-container" id="modal-project-videos"></div>
                  <div class="gallery-items" id="modal-project-gallery-items"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  // ========================================
  // YOUTUBE API
  // ========================================

  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      isYouTubeAPIReady = true
      return Promise.resolve()
    }

    return new Promise(resolve => {
      const existingCallback = window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = function () {
        isYouTubeAPIReady = true
        console.log('YouTube API lista')

        if (existingCallback && typeof existingCallback === 'function') {
          existingCallback()
        }

        resolve()
      }

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
    })
  }

  function pauseAllVideos() {
    youtubePlayersRegistry.forEach(player => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          const playerState = player.getPlayerState()
          if (playerState === 1) {
            player.pauseVideo()
          }
        } catch (error) {
          console.warn('Error pausando video:', error)
        }
      }
    })
  }

  function clearVideoRegistry() {
    youtubePlayersRegistry.forEach(player => {
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy()
        } catch (error) {
          console.warn('Error destruyendo player:', error)
        }
      }
    })
    youtubePlayersRegistry.clear()
  }

  // ========================================
  // INSERTAR VIDEOS Y GALERÍA
  // ========================================

  function insertVideos(container, videoUrls, title) {
    if (!container || !videoUrls || videoUrls.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No hay videos disponibles</div>'
      return
    }

    container.innerHTML = ''

    loadYouTubeAPI()
      .then(() => {
        videoUrls.forEach((videoUrl, index) => {
          const videoId = extractYouTubeId(videoUrl)
          if (!videoId) return

          const uniquePlayerId = `youtube-player-${Date.now()}-${index}`
          const startSeconds = getTimeParam(videoUrl)

          const videoWrapper = document.createElement('div')
          videoWrapper.style.marginBottom = '1.5rem'
          videoWrapper.style.position = 'relative'

          const playerContainer = document.createElement('div')
          playerContainer.id = uniquePlayerId
          playerContainer.style.cssText = `
          width: 100%;
          height: ${isMobile() ? '350px' : '400px'};
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        `

          videoWrapper.appendChild(playerContainer)
          container.appendChild(videoWrapper)

          if (isYouTubeAPIReady && window.YT && window.YT.Player) {
            setTimeout(() => {
              try {
                const player = new window.YT.Player(uniquePlayerId, {
                  height: isMobile() ? '350' : '400',
                  width: '100%',
                  videoId: videoId,
                  playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    start: startSeconds,
                    enablejsapi: 1,
                    origin: window.location.origin
                  },
                  events: {
                    onReady: event => {
                      youtubePlayersRegistry.set(uniquePlayerId, event.target)
                    },
                    onStateChange: event => {
                      if (event.data === 1) {
                        youtubePlayersRegistry.forEach((p, id) => {
                          if (id !== uniquePlayerId && p.getPlayerState() === 1) {
                            p.pauseVideo()
                          }
                        })
                      }
                    }
                  }
                })
              } catch (error) {
                console.error('Error creando player:', error)
                insertFallbackVideo(playerContainer, videoId, title, index, startSeconds)
              }
            }, 100)
          } else {
            insertFallbackVideo(playerContainer, videoId, title, index, startSeconds)
          }
        })
      })
      .catch(() => {
        videoUrls.forEach((videoUrl, index) => {
          const videoId = extractYouTubeId(videoUrl)
          if (!videoId) return

          const wrapper = document.createElement('div')
          wrapper.style.marginBottom = '1.5rem'
          insertFallbackVideo(wrapper, videoId, title, index, getTimeParam(videoUrl))
          container.appendChild(wrapper)
        })
      })
  }

  function insertFallbackVideo(container, videoId, title, index, startSeconds) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${startSeconds ? `&start=${startSeconds}` : ''}`

    container.innerHTML = `
      <iframe
        src="${embedUrl}"
        title="${title} - Video ${index + 1}"
        width="100%"
        height="${isMobile() ? '350' : '400'}"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style="border: none; border-radius: 8px; display: block; background: #000;">
      </iframe>
    `
  }

  function insertGallery(container, gallery, title) {
    if (!container) return

    container.innerHTML = ''

    if (!gallery || gallery.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No hay imágenes disponibles</div>'
      return
    }

    gallery.forEach((imageUrl, index) => {
      if (!imageUrl || !imageUrl.trim()) return

      const img = document.createElement('img')
      img.src = imageUrl.trim()
      img.alt = `${title} - Imagen ${index + 1}`
      img.loading = 'lazy'
      img.style.cssText = `
        width: 100%;
        height: ${isMobile() ? '250px' : '400px'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        display: block;
        object-fit: cover;
        margin-bottom: 1.5rem;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      `

      img.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)'
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
      })

      img.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)'
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
      })

      container.appendChild(img)
    })
  }

  // ========================================
  // MODAL
  // ========================================

  function openCarouselModal(projectId) {
    const project = currentProjects.find(p => p.id === projectId)
    if (!project) return

    const modal = document.getElementById('modal-backdrop-carousel')
    const modalTitle = document.getElementById('modal-project-title')
    const modalDate = document.getElementById('modal-project-date')
    const modalResponsible = document.getElementById('modal-project-responsible')
    const modalDescription = document.getElementById('modal-project-description')
    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')

    if (modalTitle) modalTitle.textContent = project.title
    if (modalDate) modalDate.textContent = project.date
    if (modalResponsible) modalResponsible.textContent = project.responsible
    if (modalDescription) modalDescription.innerHTML = project.description

    modal.classList.add('show')
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      insertVideos(videosContainer, project.videoUrls, project.title)
      insertGallery(galleryContainer, project.gallery, project.title)
    }, 100)
  }

  function closeCarouselModal() {
    const modal = document.getElementById('modal-backdrop-carousel')
    if (!modal) return

    pauseAllVideos()
    clearVideoRegistry()

    modal.classList.remove('show')
    document.body.style.overflow = ''

    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')
    if (videosContainer) videosContainer.innerHTML = ''
    if (galleryContainer) galleryContainer.innerHTML = ''
  }

  // ========================================
  // NAVEGACIÓN DEL CAROUSEL
  // ========================================

  function updatePosition() {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    const slideWidth = isMobileTablet() ? 260 : 280
    const gap = isMobileTablet() ? 8 : 10
    const translateX = currentSlide * (slideWidth + gap)

    wrapper.style.transform = `translateX(-${translateX}px)`
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator')
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active')
      } else {
        indicator.classList.remove('active')
      }
    })
  }

  // Funciones de video
  function extractYouTubeId(url) {
    if (!url) return null

    const patterns = [/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/, /(?:youtube\.com\/embed\/)([^&\n?#]+)/, /(?:youtu\.be\/)([^&\n?#]+)/]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }

    return null
  }

  function getTimeParam(url) {
    const timeMatch = url.match(/[&?]t=(\d+)/)
    return timeMatch ? `&start=${timeMatch[1]}` : ''
  }

  function createVideoIframe(videoUrl, title, videoIndex = 0) {
    const videoId = extractYouTubeId(videoUrl)
    if (!videoId) return null

    const timeParam = getTimeParam(videoUrl)
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${timeParam}`

    const iframe = document.createElement('iframe')
    iframe.src = embedUrl
    iframe.title = `${title} - Video ${videoIndex + 1}`
    iframe.width = '100%'
    iframe.frameBorder = '0'
    iframe.allowFullscreen = true
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')

    const isMobile = window.innerWidth <= 768
    const videoHeight = isMobile ? '350px' : '400px'

    iframe.style.cssText = `
        width: 100% !important;
        height: ${videoHeight} !important;
        border: none !important;
        border-radius: 8px !important;
        display: block !important;
        background: #000 !important;
        margin-bottom: 1.5rem !important;
    `

    return iframe
  }

  function insertMultipleVideos(container, videoUrls, title) {
    if (!container) return

    container.innerHTML = ''

    if (!videoUrls || !videoUrls.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No hay videos disponibles</div>'
      return
    }

    console.log(`📹 Insertando ${videoUrls.length} videos para: ${title}`)

    videoUrls.forEach((videoUrl, index) => {
      if (!videoUrl || !videoUrl.trim()) return

      const iframe = createVideoIframe(videoUrl.trim(), title, index)

      if (iframe) {
        const videoWrapper = document.createElement('div')
        videoWrapper.style.cssText = `
          position: relative;
          width: 100%;
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        `

        if (videoUrls.length > 1) {
          const videoTitle = document.createElement('div')
          videoTitle.style.cssText = `
            padding: 0.75rem 1rem;
            background: rgba(0, 0, 0, 0.05);
            font-size: 14px;
            font-weight: 600;
            color: #333;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          `
          videoTitle.textContent = `Video ${index + 1}`
          videoWrapper.appendChild(videoTitle)
        }

        const loadingIndicator = document.createElement('div')
        loadingIndicator.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #666;
          font-size: 14px;
        `
        loadingIndicator.textContent = 'Cargando video...'

        iframe.onload = () => {
          loadingIndicator.style.display = 'none'
        }

        videoWrapper.appendChild(loadingIndicator)
        videoWrapper.appendChild(iframe)
        container.appendChild(videoWrapper)
      }
    })
  }

  function insertGallery(container, gallery, title) {
    if (!container) return

    container.innerHTML = ''

    if (!gallery || !gallery.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No hay imágenes disponibles</div>'
      return
    }

    gallery.forEach((imageUrl, index) => {
      if (!imageUrl || !imageUrl.trim()) return

      const imageUrl_clean = imageUrl.trim()

      const imageWrapper = document.createElement('div')
      imageWrapper.style.cssText = `
        width: 100%;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      `

      const image = document.createElement('img')
      image.src = imageUrl_clean
      image.alt = `${title} - Imagen ${index + 1}`
      image.loading = 'lazy'

      const isMobile = window.innerWidth <= 768
      const imageHeight = isMobile ? '250px' : '400px'

      image.style.cssText = `
        width: 100%;
        height: ${imageHeight};
        display: block;
        object-fit: cover;
        border-radius: inherit;
      `

      imageWrapper.onmouseenter = function () {
        this.style.transform = 'translateY(-2px)'
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
      }

      imageWrapper.onmouseleave = function () {
        this.style.transform = 'translateY(0)'
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
      }

      imageWrapper.appendChild(image)
      container.appendChild(imageWrapper)
    })
  }

  // Modal
  function openCarouselModal(slideIndex) {
    console.log(`🎪 Abriendo modal para slide ${slideIndex}`)

    const projectData = getProjectDataFromHTML(slideIndex)

    if (!projectData.title && projectData.videoUrls.length === 0) {
      console.error(`❌ Datos insuficientes para slide ${slideIndex}`)
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
        console.error('❌ Elementos del modal no encontrados')
        return
      }

      if (modalTitle) modalTitle.innerHTML = projectData.title
      if (modalDate) modalDate.textContent = projectData.date
      if (modalResponsible) modalResponsible.textContent = projectData.responsible
      if (modalDescription) modalDescription.innerHTML = projectData.description

      modalBackdrop.classList.add('show')
      modalBackdrop.style.display = 'flex'
      document.body.style.overflow = 'hidden'

      // Insertar videos y galería
      setTimeout(() => {
        insertMultipleVideos(videosContainer, projectData.videoUrls, projectData.title)
        insertGallery(galleryContainer, projectData.gallery, projectData.title)
      }, 100)

      console.log(`✅ Modal abierto para: ${projectData.title}`)
    } catch (error) {
      console.error('💥 Error abriendo modal:', error)
    }
  }

  function updateControls() {
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    if (prevBtn) {
      prevBtn.disabled = currentSlide <= 0
      prevBtn.style.opacity = currentSlide <= 0 ? '0.3' : '1'
    }

    if (nextBtn) {
      nextBtn.disabled = currentSlide >= totalSlides - 1
      nextBtn.style.opacity = currentSlide >= totalSlides - 1 ? '0.3' : '1'
    }
  }

  function nextSlide() {
    if (isTransitioning || currentSlide >= totalSlides - 1) return

    isTransitioning = true
    currentSlide++
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  function prevSlide() {
    if (isTransitioning || currentSlide <= 0) return

    isTransitioning = true
    currentSlide--
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  function goToSlide(index) {
    if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) return

    isTransitioning = true
    currentSlide = index
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  function closeCarouselModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
      return
    }

    const modalBackdrop = document.getElementById('modal-backdrop-carousel')
    if (!modalBackdrop) return

    modalBackdrop.classList.remove('show')
    modalBackdrop.style.display = 'none'

    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')

    if (videosContainer) videosContainer.innerHTML = ''
    if (galleryContainer) galleryContainer.innerHTML = ''

    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }

  // Event listeners
  function setupSliderEventListeners() {
    console.log('🎛️ Configurando event listeners...')

    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  // ========================================
  // EVENTOS
  // ========================================

  function setupEvents() {
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')
    const indicators = document.querySelectorAll('.indicator')
    const slides = document.querySelectorAll('.carousel-slide')

    // Botones de navegación
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide)
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide)
    }

    // Indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index))
    })

    // Clicks en slides
    slides.forEach((slide, index) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide-index')) || index
      slide.addEventListener('click', () => {
        openCarouselModal(slideIndex)
      })
    })

    // Teclado
    document.addEventListener('keydown', e => {
      const modalOpen = document.getElementById('modal-backdrop-carousel')?.classList.contains('show')

      if (!modalOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextSlide()
        }
      }
    })

    console.log('✅ Event listeners configurados')
  }

  function setupModalEventListeners() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const modalBackdrop = document.getElementById('modal-backdrop-carousel')
        if (modalBackdrop && modalBackdrop.classList.contains('show')) {
          closeCarouselModal()
        }
      }
    })

    const closeBtn = document.querySelector('#modal-backdrop-carousel .modal-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCarouselModal)
    }
  }

  function setupResponsiveEventListeners() {
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        console.log('📐 Redimensionando...')
        // Re-calcular posiciones si es necesario
        updatePosition()
        updateIndicators()
        updateControls()
      }, 250)
    })
  }

  // Inicialización
  function initializeSlider() {
    console.log('🎠 Inicializando slider...')

    const carousel = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')

    if (!carousel || !wrapper) {
      console.error('❌ Elementos básicos no encontrados')
      return false
    }

    this.updateSliderDimensions()
    this.createInfiniteCarousel()
    this.updateSliderLayout()
    this.setupSliderEventListeners()
    this.setupResponsiveEventListeners()

    console.log('✅ Slider inicializado')
    return true
  }

  function initializeModal() {
    console.log('🎪 Inicializando modal...')

    const modalElements = ['modal-backdrop-carousel', 'modal-project-title', 'modal-project-videos', 'modal-project-gallery-items']

    let allFound = true
    modalElements.forEach(id => {
      if (!document.getElementById(id)) {
        console.error(`❌ ${id} no encontrado`)
        allFound = false
      }
    })

    if (!allFound) {
      console.warn('⚠️ Algunos elementos del modal no encontrados')
      return false
    }

    this.setupModalEventListeners()
    console.log('✅ Modal inicializado')
    return true
  }

  // Función de debug
  function debugCarousel() {
    console.log('🔍 Debug del carousel (IIFE version)')
    // Esta función necesita variables locales del IIFE, no usa this
  }

  // Setup de eventos del modal y teclado
  function setupModalInteractions() {
    const closeBtn = document.querySelector('#modal-backdrop-carousel .modal-close')
    const modalBackdrop = document.getElementById('modal-backdrop-carousel')

    if (closeBtn) {
      closeBtn.addEventListener('click', closeCarouselModal)
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) {
          closeCarouselModal()
        }
      })
    }

    // Teclado
    document.addEventListener('keydown', e => {
      const modalOpen = modalBackdrop?.classList.contains('show')

      if (modalOpen && e.key === 'Escape') {
        closeCarouselModal()
      } else if (!modalOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextSlide()
        }
      }
    })

    // Responsive
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updatePosition()
        updateControls()
      }, 250)
    })
  }

  // Inicialización principal
  async function initialize() {
    console.log('🚀 Inicializando carousel completo...')

    try {
      const sliderOK = initializeSlider()
      const modalOK = initializeModal()

      if (sliderOK && modalOK) {
        console.log('🎉 Inicialización completada exitosamente')
        return true
      } else {
        console.error('❌ Error en inicialización')
        return false
      }
    } catch (error) {
      console.error('💥 Error crítico:', error)
      return false
    }
  }

  // Cleanup para componentes React
  function cleanup() {
    console.log('🧹 Limpiando carousel...')

    // Cerrar modal si está abierto
    closeCarouselModal()

    console.log('✅ Carousel limpiado')
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  function initializeCarousel(targetElement, projects = projectsConfig) {
    if (!targetElement) {
      console.error('Elemento objetivo no encontrado')
      return
    }

    currentProjects = projects
    totalSlides = projects.length
    currentSlide = 0

    targetElement.innerHTML = generateCarouselHTML(projects)

    const wrapper = document.getElementById('slides-wrapper')
    if (wrapper) {
      wrapper.style.display = 'flex'
      wrapper.style.transition = `transform ${CONFIG.SLIDE_TRANSITION_DURATION}ms ease`
      wrapper.style.willChange = 'transform'
    }

    setupEvents()
    updateIndicators()
    updateControls()

    console.log(`Carousel inicializado con ${totalSlides} proyectos`)
  }

  // ========================================
  // API PÚBLICA
  // ========================================

  if (typeof window !== 'undefined') {
    window.CarouselModule = {
      initialize: initializeCarousel,
      openModal: openCarouselModal,
      closeModal: closeCarouselModal,
      next: nextSlide,
      prev: prevSlide,
      goTo: goToSlide,
      getCurrentSlide: () => currentSlide,
      getTotalSlides: () => totalSlides
    }

    // Inicialización automática
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const targetElement = document.getElementById('carousel-root')
        if (targetElement) {
          initializeCarousel(targetElement)
        }
      })
    } else {
      const targetElement = document.getElementById('carousel-root')
      if (targetElement) {
        initializeCarousel(targetElement)
      }
    }
  }
})()

// ========================================
// EXPORTS Y HOOKS PARA REACT
// ========================================

// Hook personalizado para React
export const useCarousel = () => {
  const carouselRef = React.useRef(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    const initCarousel = async () => {
      if (!carouselRef.current) {
        carouselRef.current = new CarouselManager()
      }

      const success = await carouselRef.current.initialize()
      setIsReady(success)

      // Exponer funciones al window para compatibilidad
      if (success) {
        window.openCarouselModal = carouselRef.current.openCarouselModal
        window.closeCarouselModal = carouselRef.current.closeCarouselModal
        window.carouselPrevSlide = carouselRef.current.carouselPrevSlide
        window.carouselNextSlide = carouselRef.current.carouselNextSlide
        window.goToSlide = carouselRef.current.goToSlide
        window.updateSliderLayout = carouselRef.current.updateSliderLayout
        window.debugCarousel = carouselRef.current.debugCarousel
      }
    }

    initCarousel()

    return () => {
      if (carouselRef.current) {
        carouselRef.current.cleanup()
      }
    }
  }, [])

  return {
    isReady,
    carousel: carouselRef.current,
    openModal: slideIndex => carouselRef.current?.openCarouselModal(slideIndex),
    closeModal: () => carouselRef.current?.closeCarouselModal(),
    prevSlide: () => carouselRef.current?.carouselPrevSlide(),
    nextSlide: () => carouselRef.current?.carouselNextSlide(),
    goToSlide: index => carouselRef.current?.goToSlide(index),
    updateLayout: () => carouselRef.current?.updateSliderLayout(),
    debug: () => carouselRef.current?.debugCarousel()
  }
}
