// ===========================================
// CAROUSEL SYSTEM - IMPLEMENTACIÓN CON SWIPER
// ===========================================

export class CarouselSystem {
  constructor() {
    this.swiper = null
    this.container = null
  }

  init() {
    if (typeof document === 'undefined') {
      return false
    }

    this.container = document.getElementById('carousel-container')
    const wrapper = document.getElementById('slides-wrapper')

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

    // Insertar iconos en los botones de navegación
    this.setupNavigationIcons()

    this.swiper = new window.Swiper(this.container, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: false,
      speed: 400,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      }
    })

    return true
  }

  setupNavigationIcons() {
    const prevBtn = this.container?.querySelector('.swiper-button-prev')
    const nextBtn = this.container?.querySelector('.swiper-button-next')

    if (prevBtn && !prevBtn.querySelector('i')) {
      const iconPrev = document.createElement('i')
      iconPrev.className = 'ph ph-arrow-circle-left'
      iconPrev.setAttribute('aria-hidden', 'true')
      prevBtn.appendChild(iconPrev)
    }

    if (nextBtn && !nextBtn.querySelector('i')) {
      const iconNext = document.createElement('i')
      iconNext.className = 'ph ph-arrow-circle-right'
      iconNext.setAttribute('aria-hidden', 'true')
      nextBtn.appendChild(iconNext)
    }
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true)
      this.swiper = null
    }
  }
}

export default CarouselSystem
