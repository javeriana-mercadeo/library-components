// ===========================================
// CAROUSEL SYSTEM - GESTIÓN DEL CARRUSEL
// ===========================================

import { detectDevice, Logger } from './utils.js'

export class CarouselSystem {
  constructor() {
    this.state = {
      currentSlide: 0,
      totalSlides: 0,
      isTransitioning: false,
      isInitialized: false,
      touchStartX: 0,
      touchEndX: 0,
      isTouching: false
    }

    this.config = {
      SLIDE_TRANSITION_DURATION: 400,
      MIN_SWIPE_DISTANCE: 50
    }

    this.preventiveMonitorInterval = null
  }

  /**
   * Inicializar el sistema de carousel
   */
  init() {
    const wrapper = document.getElementById('slides-wrapper')
    const container = document.getElementById('carousel-container')

    if (!wrapper || !container) {
      Logger.warning('Elementos del carousel no encontrados, reintentando...')
      setTimeout(() => this.init(), 500)
      return false
    }

    const slides = wrapper.querySelectorAll('.carousel-slide')
    this.state.totalSlides = slides.length

    if (this.state.totalSlides === 0) {
      Logger.warning('No hay slides, reintentando...')
      setTimeout(() => this.init(), 500)
      return false
    }

    Logger.info(`Carousel inicializado: ${this.state.totalSlides} slides`)

    this.state.currentSlide = 0

    this.setupBasicStyles()
    this.setupEvents()
    this.updatePosition()
    this.updateIndicators()

    setTimeout(() => {
      this.applyCenteringLogic()
      this.setupPreventiveBlocking()
      this.preventiveBlock()

      const device = detectDevice()
      if (device.isMobileTablet) {
        this.forceMobileTabletFix()
      }
    }, 100)

    this.state.isInitialized = true
    return true
  }

  /**
   * Configurar estilos básicos
   */
  setupBasicStyles() {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    wrapper.style.display = 'flex'
    wrapper.style.transition = `transform ${this.config.SLIDE_TRANSITION_DURATION}ms ease`
    wrapper.style.willChange = 'transform'
  }

  /**
   * Configurar eventos
   */
  setupEvents() {
    const container = document.getElementById('carousel-container')
    if (!container) return

    // Touch events
    container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true })
    container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
    container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true })

    // Indicadores
    const indicators = document.querySelectorAll('#carousel-indicators .indicator')
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index
      indicator.addEventListener('click', e => {
        e.preventDefault()
        this.goToSlide(indicatorIndex)
      })
    })

    // Clicks en slides
    const slides = document.querySelectorAll('.carousel-slide')
    slides.forEach((slide, index) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide-index')) || index
      if (!slide.getAttribute('onclick')) {
        slide.addEventListener('click', e => {
          if (!this.state.isTouching) {
            e.preventDefault()
            this.onSlideClick(slideIndex)
          }
        })
      }
    })

    // Teclado
    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    // Responsive
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.updatePosition()
        this.applyCenteringLogic()

        const device = detectDevice()
        if (device.isMobileTablet) {
          setTimeout(() => this.forceMobileTabletFix(), 100)
        }

        this.preventiveBlock()
      }, 250)
    })

    Logger.info('Eventos configurados')
  }

  /**
   * Manejadores de eventos touch
   */
  handleTouchStart(e) {
    if (e.touches.length !== 1 || this.state.isTransitioning) return
    this.state.touchStartX = e.touches[0].clientX
    this.state.isTouching = true
  }

  handleTouchMove(e) {
    if (!this.state.isTouching) return
    const currentTouch = e.touches[0].clientX
    const diff = Math.abs(currentTouch - this.state.touchStartX)

    if (diff > 15) {
      e.preventDefault()
    }
  }

  handleTouchEnd(e) {
    if (!this.state.isTouching) return

    this.state.touchEndX = e.changedTouches[0].clientX
    const distance = this.state.touchStartX - this.state.touchEndX

    if (Math.abs(distance) > this.config.MIN_SWIPE_DISTANCE) {
      const state = this.preventiveBlock()

      if (distance > 0 && !state.shouldBlockNext) {
        this.nextSlide()
      } else if (distance < 0 && !state.shouldBlockPrev) {
        this.prevSlide()
      }
    }

    this.state.isTouching = false
  }

  /**
   * Manejador de teclado
   */
  handleKeyDown(e) {
    const modalOpen = document.getElementById('modal-backdrop-carousel')?.classList.contains('show')

    if (!modalOpen) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          const statePrev = this.preventiveBlock()
          if (!statePrev.shouldBlockPrev) this.prevSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          const stateNext = this.preventiveBlock()
          if (!stateNext.shouldBlockNext) this.nextSlide()
          break
      }
    }
  }

  /**
   * Navegación
   */
  nextSlide() {
    if (this.state.isTransitioning) return

    const realSlide = this.syncCarouselState()
    const limit = this.calculateRealLimit()

    if (realSlide >= limit) {
      this.preventiveBlock()
      return
    }

    this.state.currentSlide++
    this.updatePositionWithAnimation()
    this.updateIndicators()

    setTimeout(() => this.preventiveBlock(), this.config.SLIDE_TRANSITION_DURATION + 50)
  }

  prevSlide() {
    if (this.state.isTransitioning) return

    const realSlide = this.syncCarouselState()

    if (realSlide <= 0) {
      this.preventiveBlock()
      return
    }

    this.state.currentSlide--
    this.updatePositionWithAnimation()
    this.updateIndicators()

    setTimeout(() => this.preventiveBlock(), this.config.SLIDE_TRANSITION_DURATION + 50)
  }

  goToSlide(targetSlide) {
    if (this.state.isTransitioning || targetSlide === this.state.currentSlide) return

    const limit = this.calculateRealLimit()

    if (targetSlide >= 0 && targetSlide <= limit) {
      this.state.currentSlide = targetSlide
      this.updatePositionWithAnimation()
      this.updateIndicators()

      setTimeout(() => this.preventiveBlock(), this.config.SLIDE_TRANSITION_DURATION + 50)
    }
  }

  /**
   * Actualizar posición
   */
  updatePosition() {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    const container = document.getElementById('carousel-container')
    const device = detectDevice()

    if (
      container &&
      (container.classList.contains('force-center') ||
        container.classList.contains('auto-center') ||
        wrapper.classList.contains('force-center'))
    ) {
      wrapper.style.transform = 'none'
      return
    }

    if (device.isMobileTablet) {
      const slideWidth = 260
      const gap = 8
      let translateX = this.state.currentSlide * (slideWidth + gap)

      if (this.state.currentSlide === 0 && container.offsetWidth > slideWidth + gap) {
        const availableSpace = container.offsetWidth - slideWidth
        const centering = Math.max(0, availableSpace * 0.1)
        translateX = Math.max(0, translateX - centering)
      }

      wrapper.style.transform = `translateX(-${translateX}px)`
    } else {
      const slideWidth = 280
      const gap = 10
      const translateX = this.state.currentSlide * (slideWidth + gap)
      wrapper.style.transform = `translateX(-${translateX}px)`
    }
  }

  updatePositionWithAnimation() {
    if (this.state.isTransitioning) return

    this.state.isTransitioning = true
    this.updatePosition()

    setTimeout(() => {
      this.state.isTransitioning = false
    }, this.config.SLIDE_TRANSITION_DURATION)
  }

  /**
   * Actualizar indicadores
   */
  updateIndicators() {
    const indicators = document.querySelectorAll('#carousel-indicators .indicator')
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index

      if (indicatorIndex === this.state.currentSlide) {
        indicator.classList.add('active')
      } else {
        indicator.classList.remove('active')
      }
    })
  }

  /**
   * Sincronizar estado del carousel
   */
  syncCarouselState() {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return null

    const transform = wrapper.style.transform
    const translateMatch = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/)

    if (!translateMatch) return this.state.currentSlide

    const device = detectDevice()
    const currentTranslateX = Math.abs(parseFloat(translateMatch[1]))
    const slideWidth = device.isMobileTablet ? 260 : 280
    const gap = device.isMobileTablet ? 8 : 10

    const realSlidePosition = Math.round(currentTranslateX / (slideWidth + gap))

    const oldSlide = this.state.currentSlide
    this.state.currentSlide = realSlidePosition

    return realSlidePosition
  }

  /**
   * Calcular límite real
   */
  calculateRealLimit() {
    const device = detectDevice()

    if (device.isMobileTablet) {
      return this.calculateRealLimitMobileTablet()
    }

    const container = document.getElementById('carousel-container')
    if (!container || this.state.totalSlides === 0) return 0

    if (this.shouldCenterContent()) return 0

    const containerWidth = container.offsetWidth
    const slideWidth = 280
    const gap = 10
    const contentWidth = this.state.totalSlides * slideWidth + (this.state.totalSlides - 1) * gap

    if (contentWidth <= containerWidth) return 0

    const maxDisplacement = contentWidth - containerWidth
    const lastValidPosition = Math.floor(maxDisplacement / (slideWidth + gap))

    return Math.min(lastValidPosition, this.state.totalSlides - 1)
  }

  calculateRealLimitMobileTablet() {
    const container = document.getElementById('carousel-container')
    if (!container || this.state.totalSlides === 0) return 0

    if (this.shouldCenterContent()) return 0

    const containerWidth = container.offsetWidth
    const slideWidth = 260
    const gap = 8
    const contentWidth = this.state.totalSlides * slideWidth + (this.state.totalSlides - 1) * gap

    if (contentWidth <= containerWidth) return 0

    const slidesCompletelyVisible = Math.floor(containerWidth / (slideWidth + gap))
    const lastValidPosition = Math.max(0, this.state.totalSlides - slidesCompletelyVisible)

    return Math.min(lastValidPosition, this.state.totalSlides - 1)
  }

  /**
   * Verificar si debe centrar contenido
   */
  shouldCenterContent() {
    const container = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')

    if (!container || !wrapper) return false

    const slides = wrapper.querySelectorAll('.carousel-slide')
    const slideCount = slides.length
    const device = detectDevice()

    const slideWidth = device.isMobileTablet ? 260 : 280
    const gap = device.isMobileTablet ? 8 : 10
    const containerWidth = container.offsetWidth
    const totalContentWidth = slideCount * slideWidth + (slideCount - 1) * gap

    if (totalContentWidth <= containerWidth) return true
    if (slideCount <= 2) return true

    if (device.isMobileTablet) {
      return totalContentWidth <= containerWidth - 40
    }

    if (slideCount === 3 && device.width >= 900) return true
    if (slideCount === 4 && device.width >= 1200) return true

    return false
  }

  /**
   * Aplicar lógica de centrado
   */
  applyCenteringLogic() {
    const carouselSection = document.getElementById('carousel-section')
    const container = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')

    if (!carouselSection || !container || !wrapper) return

    const slides = wrapper.querySelectorAll('.carousel-slide')
    const slideCount = slides.length

    carouselSection.setAttribute('data-slides-count', slideCount)
    this.applyMobileTabletFix()
  }

  /**
   * Aplicar fix para mobile/tablet
   */
  applyMobileTabletFix() {
    const carouselSection = document.getElementById('carousel-section')
    const container = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')

    if (!carouselSection || !container || !wrapper) return

    const slides = wrapper.querySelectorAll('.carousel-slide')
    const slideCount = slides.length
    const device = detectDevice()

    if (device.isMobileTablet) {
      carouselSection.classList.remove(
        'content-fits',
        'no-navigation',
        'has-navigation',
        'mobile-last-card-fix',
        'mobile-needs-scroll',
        'force-center-mobile',
        'force-navigation-mobile'
      )
      container.classList.remove('auto-center', 'force-center')
      wrapper.classList.remove('force-center')

      const slideWidth = 260
      const gap = 8
      const containerWidth = container.offsetWidth
      const totalContentWidth = slideCount * slideWidth + (slideCount - 1) * gap

      const shouldCenter = this.shouldCenterContent()

      if (shouldCenter) {
        carouselSection.classList.add('content-fits', 'no-navigation', 'force-center-mobile')
        container.classList.add('auto-center', 'force-center')
        wrapper.classList.add('force-center')

        wrapper.style.paddingRight = ''
        wrapper.style.width = ''
        wrapper.style.marginRight = ''
        wrapper.style.transform = 'none'

        this.state.currentSlide = 0
        this.hideNavigationButtons()
      } else {
        carouselSection.classList.add('mobile-needs-scroll', 'has-navigation', 'force-navigation-mobile')

        const extraSpace = device.isMobile ? 80 : 60

        wrapper.style.paddingRight = `${extraSpace}px`
        wrapper.style.width = `calc(100% + ${extraSpace}px)`
        wrapper.style.marginRight = `-${extraSpace}px`

        this.hideNavigationButtons()
      }
    } else {
      carouselSection.classList.remove('mobile-last-card-fix', 'mobile-needs-scroll', 'force-center-mobile', 'force-navigation-mobile')

      wrapper.style.paddingRight = ''
      wrapper.style.width = ''
      wrapper.style.marginRight = ''

      const slideWidth = 280
      const gap = 10
      const containerWidth = container.offsetWidth
      const totalContentWidth = slideCount * slideWidth + (slideCount - 1) * gap

      if (totalContentWidth <= containerWidth) {
        carouselSection.classList.add('content-fits', 'no-navigation')
        this.hideNavigationButtons()
      } else {
        carouselSection.classList.add('has-navigation')
        this.showNavigationButtons()
      }
    }
  }

  forceMobileTabletFix() {
    const device = detectDevice()
    if (!device.isMobileTablet) return

    this.applyMobileTabletFix()

    if (this.state.currentSlide > 0) {
      const newLimit = this.calculateRealLimitMobileTablet()
      if (this.state.currentSlide > newLimit) {
        this.state.currentSlide = newLimit
      }
      this.updatePosition()
    }

    this.preventiveBlock()
    this.updateIndicators()
  }

  /**
   * Mostrar/ocultar botones de navegación
   */
  hideNavigationButtons() {
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    if (prevBtn) prevBtn.style.display = 'none'
    if (nextBtn) nextBtn.style.display = 'none'
  }

  showNavigationButtons() {
    const device = detectDevice()
    if (device.width < 900) {
      this.hideNavigationButtons()
      return
    }

    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    if (prevBtn) prevBtn.style.display = 'flex'
    if (nextBtn) nextBtn.style.display = 'flex'
  }

  /**
   * Bloqueo preventivo de botones
   */
  setupPreventiveBlocking() {
    const nextBtn = document.getElementById('carousel-next')
    const prevBtn = document.getElementById('carousel-prev')

    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true)
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn)

      newNextBtn.addEventListener(
        'click',
        e => {
          e.preventDefault()
          e.stopImmediatePropagation()

          const state = this.preventiveBlock()
          if (state.shouldBlockNext) return false

          this.nextSlide()
          return false
        },
        { capture: true, passive: false }
      )
    }

    if (prevBtn) {
      const newPrevBtn = prevBtn.cloneNode(true)
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn)

      newPrevBtn.addEventListener(
        'click',
        e => {
          e.preventDefault()
          e.stopImmediatePropagation()

          const state = this.preventiveBlock()
          if (state.shouldBlockPrev) return false

          this.prevSlide()
          return false
        },
        { capture: true, passive: false }
      )
    }

    if (this.preventiveMonitorInterval) {
      clearInterval(this.preventiveMonitorInterval)
    }

    this.preventiveMonitorInterval = setInterval(() => {
      this.preventiveBlock()
    }, 200)
  }

  preventiveBlock() {
    const realSlide = this.syncCarouselState()
    const limit = this.calculateRealLimit()

    const shouldBlockNext = realSlide >= limit
    const shouldBlockPrev = realSlide <= 0

    const nextBtn = document.getElementById('carousel-next')
    const prevBtn = document.getElementById('carousel-prev')

    if (nextBtn) {
      nextBtn.disabled = shouldBlockNext
      nextBtn.style.opacity = shouldBlockNext ? '0.3' : '1'
      nextBtn.style.cursor = shouldBlockNext ? 'not-allowed' : 'pointer'
      nextBtn.style.pointerEvents = shouldBlockNext ? 'none' : 'auto'
    }

    if (prevBtn) {
      prevBtn.disabled = shouldBlockPrev
      prevBtn.style.opacity = shouldBlockPrev ? '0.3' : '1'
      prevBtn.style.cursor = shouldBlockPrev ? 'not-allowed' : 'pointer'
      prevBtn.style.pointerEvents = shouldBlockPrev ? 'none' : 'auto'
    }

    return { shouldBlockNext, shouldBlockPrev, realSlide, limit }
  }

  /**
   * Callback cuando se hace click en un slide
   */
  onSlideClick(slideIndex) {
    // Será manejado externamente
    if (typeof window !== 'undefined' && window.openCarouselModal) {
      window.openCarouselModal(slideIndex)
    }
  }

  /**
   * Destruir el sistema
   */
  destroy() {
    if (this.preventiveMonitorInterval) {
      clearInterval(this.preventiveMonitorInterval)
      this.preventiveMonitorInterval = null
    }

    this.state.isInitialized = false
    Logger.info('Carousel system destruido')
  }
}

export default CarouselSystem
