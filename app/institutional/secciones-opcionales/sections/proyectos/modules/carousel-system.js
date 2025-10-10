// ===========================================
// CAROUSEL SYSTEM - IMPLEMENTACIÓN CON SWIPER
// ===========================================

export class CarouselSystem {
  constructor() {
    this.swiper = null
    this.container = null
    this.indicatorsContainer = null
    this.slideEventHandlers = []
  }

  init() {
    if (typeof document === 'undefined') {
      return false
    }

    this.container = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')
    this.indicatorsContainer = document.getElementById('carousel-indicators')

    if (!this.container || !wrapper) {
      window.Logger?.warning?.('[CarouselSystem] Contenedores no encontrados.')
      return false
    }

    const slides = wrapper.querySelectorAll('.swiper-slide')

    if (!slides.length) {
      window.Logger?.warning?.('[CarouselSystem] No hay slides disponibles.')
      return false
    }

    if (typeof window === 'undefined' || !window.Swiper) {
      window.Logger?.warning?.('[CarouselSystem] Swiper no está disponible en window.')
      return false
    }

    this.destroy()

    const totalSlides = slides.length

    this.swiper = new window.Swiper(this.container, {
      loop: false,
      speed: 400,
      watchOverflow: true,
      allowTouchMove: totalSlides > 1,
      centeredSlides: false,
      spaceBetween: 16,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        nextEl: '#carousel-next',
        prevEl: '#carousel-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },
      breakpoints: {
        0: {
          slidesPerView: Math.min(1.15, totalSlides),
          spaceBetween: 12
        },
        480: {
          slidesPerView: Math.min(1.5, totalSlides),
          spaceBetween: 14
        },
        768: {
          slidesPerView: Math.min(2.25, totalSlides),
          spaceBetween: 16
        },
        1024: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 18
        },
        1280: {
          slidesPerView: Math.min(3.5, totalSlides),
          spaceBetween: 20
        },
        1440: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 24
        }
      },
      on: {
        init: () => {
          this.attachSlideEvents(slides)
          this.buildPageIndicators()
          this.attachIndicatorEvents()
          this.updateIndicators()
          this.updateNavigationState()
        },
        slideChange: () => {
          this.updateIndicators()
          this.updateNavigationState()
        },
        resize: () => {
          requestAnimationFrame(() => {
            this.buildPageIndicators()
            this.updateIndicators()
            this.updateNavigationState()
          })
        }
      }
    })

    return true
  }

  attachSlideEvents(slides) {
    this.detachSlideEvents()

    slides.forEach((slide, index) => {
      if (slide.dataset.carouselHandlerAttached === 'true') {
        return
      }

      const openModal = event => {
        if (event?.defaultPrevented) return
        if (typeof window !== 'undefined' && typeof window.openCarouselModal === 'function') {
          window.openCarouselModal(index)
        }
      }

      const clickHandler = event => {
        if (event?.defaultPrevented) return
        event.preventDefault()
        openModal(event)
      }

      const keydownHandler = event => {
        if (event?.defaultPrevented) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openModal(event)
        }
      }

      slide.addEventListener('click', clickHandler)
      slide.addEventListener('keydown', keydownHandler)
      slide.dataset.carouselHandlerAttached = 'true'

      this.slideEventHandlers.push({ slide, handlers: { click: clickHandler, keydown: keydownHandler } })
    })
  }

  detachSlideEvents() {
    this.slideEventHandlers.forEach(({ slide, handlers }) => {
      slide.removeEventListener('click', handlers.click)
      slide.removeEventListener('keydown', handlers.keydown)
      delete slide.dataset.carouselHandlerAttached
    })

    this.slideEventHandlers = []
  }

  attachIndicatorEvents() {
    if (!this.indicatorsContainer || !this.swiper) return

    const indicators = Array.from(this.indicatorsContainer.querySelectorAll('.indicator'))

    indicators.forEach(indicator => {
      if (indicator.__projectCarouselHandler) {
        indicator.removeEventListener('click', indicator.__projectCarouselHandler)
      }

      const handler = event => this.handleIndicatorClick(event)
      indicator.addEventListener('click', handler)
      indicator.__projectCarouselHandler = handler
    })
  }

  handleIndicatorClick(event) {
    event.preventDefault()

    if (!this.swiper) return

    const button = event.currentTarget
    const pageIndex = parseInt(button.dataset.pageIndex, 10)

    if (Number.isNaN(pageIndex)) return

    const slidesPerView = this.getSlidesPerView()
    const targetSlide = Math.min(pageIndex * slidesPerView, this.swiper.slides.length - 1)

    this.swiper.slideTo(targetSlide)
  }

  updateIndicators() {
    if (!this.indicatorsContainer || !this.swiper) {
      return
    }

    const indicators = Array.from(this.indicatorsContainer.querySelectorAll('.indicator'))
    if (!indicators.length) return

    const slidesPerView = this.getSlidesPerView()
    const totalSlides = this.swiper.slides.length
    const totalPages = Math.max(1, Math.ceil(totalSlides / slidesPerView))
    const currentPage = Math.min(totalPages - 1, Math.floor(this.swiper.activeIndex / slidesPerView))
    const hasOverflow = totalPages > 1

    indicators.forEach((indicator, index) => {
      indicator.dataset.pageIndex = index
      indicator.setAttribute('aria-label', `Ir a la página ${index + 1}`)

      if (index === currentPage) {
        indicator.classList.add('active')
        indicator.setAttribute('aria-current', 'true')
      } else {
        indicator.classList.remove('active')
        indicator.removeAttribute('aria-current')
      }
    })

    this.indicatorsContainer.classList.toggle('is-single', !hasOverflow)
    this.indicatorsContainer.setAttribute('aria-hidden', hasOverflow ? 'false' : 'true')

    const viewport = this.container?.parentElement
    if (viewport && viewport.classList.contains('hero-carousel__viewport')) {
      viewport.classList.toggle('hero-carousel__viewport--overflow', hasOverflow)
    }
  }

  updateNavigationState() {
    if (!this.swiper) return

    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    const disablePrev = this.swiper.isBeginning || !this.swiper.allowSlidePrev
    const disableNext = this.swiper.isEnd || !this.swiper.allowSlideNext

    if (prevBtn) {
      prevBtn.disabled = disablePrev
      prevBtn.style.opacity = disablePrev ? '0.3' : '1'
      prevBtn.style.pointerEvents = disablePrev ? 'none' : 'auto'
      prevBtn.setAttribute('aria-disabled', disablePrev ? 'true' : 'false')
    }

    if (nextBtn) {
      nextBtn.disabled = disableNext
      nextBtn.style.opacity = disableNext ? '0.3' : '1'
      nextBtn.style.pointerEvents = disableNext ? 'none' : 'auto'
      nextBtn.setAttribute('aria-disabled', disableNext ? 'true' : 'false')
    }
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true)
      this.swiper = null
    }

    this.detachSlideEvents()

    if (this.indicatorsContainer) {
      Array.from(this.indicatorsContainer.querySelectorAll('.indicator')).forEach(indicator => {
        if (indicator.__projectCarouselHandler) {
          indicator.removeEventListener('click', indicator.__projectCarouselHandler)
          delete indicator.__projectCarouselHandler
        }
      })

      this.indicatorsContainer.classList.remove('is-single')
      this.indicatorsContainer.removeAttribute('aria-hidden')
      this.indicatorsContainer.innerHTML = ''
    }

    const viewport = this.container?.parentElement
    if (viewport && viewport.classList.contains('hero-carousel__viewport')) {
      viewport.classList.remove('hero-carousel__viewport--overflow')
    }
  }

  buildPageIndicators() {
    if (!this.indicatorsContainer || !this.swiper) return

    const totalPages = this.calculateTotalPages()

    this.indicatorsContainer.innerHTML = ''

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const indicator = document.createElement('button')
      indicator.type = 'button'
      indicator.className = 'indicator'
      indicator.dataset.pageIndex = String(pageIndex)
      indicator.setAttribute('aria-label', `Ir a la página ${pageIndex + 1}`)

      this.indicatorsContainer.appendChild(indicator)
    }

    this.attachIndicatorEvents()
    this.updateIndicators()
  }

  calculateTotalPages() {
    if (!this.swiper) return 1

    const totalSlides = this.swiper.slides?.length || 0
    const perView = this.getSlidesPerView()

    return Math.max(1, Math.ceil(totalSlides / perView))
  }

  getSlidesPerView() {
    if (!this.swiper) return 1

    const { params, currentBreakpoint, originalParams } = this.swiper

    const resolveSlidesPerView = value => {
      if (typeof value === 'number' && !Number.isNaN(value)) {
        return Math.max(1, Math.floor(value))
      }
      return null
    }

    let slidesPerView = resolveSlidesPerView(params?.slidesPerView)

    if (!slidesPerView && currentBreakpoint && params?.breakpoints) {
      const breakpointConfig = params.breakpoints[currentBreakpoint]
      slidesPerView = resolveSlidesPerView(breakpointConfig?.slidesPerView)
    }

    if (!slidesPerView && originalParams) {
      slidesPerView = resolveSlidesPerView(originalParams.slidesPerView)
    }

    if (!slidesPerView && typeof this.swiper.slidesPerViewDynamic === 'function') {
      slidesPerView = resolveSlidesPerView(this.swiper.slidesPerViewDynamic())
    }

    return slidesPerView || 1
  }
}

export default CarouselSystem
