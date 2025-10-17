function initInsigniasSwiper() {
  var insigniasSwiper = null

  function getDisplayConfig(windowWidth, totalSlides) {
    var slidesPerView, useGrid
    var gap = 30

    if (windowWidth < 428) {
      slidesPerView = 1
      useGrid = totalSlides <= 1
    } else if (windowWidth < 576) {
      slidesPerView = 1.5
      useGrid = totalSlides <= 1
    } else if (windowWidth < 768) {
      slidesPerView = 2
      useGrid = totalSlides <= 2
    } else if (windowWidth < 992) {
      slidesPerView = 3
      useGrid = totalSlides <= 3
    } else {
      slidesPerView = 4
      useGrid = totalSlides <= 4
    }

    return {
      slidesPerView: slidesPerView,
      useGrid: useGrid,
      gap: gap
    }
  }

  function activateGridMode() {
    var slidesContainer = document.querySelector('.insignias-swiper .swiper-wrapper')

    if (slidesContainer) {
      slidesContainer.classList.add('use-grid')
    }
  }

  function activateSwiperMode() {
    var slidesContainer = document.querySelector('.insignias-swiper .swiper-wrapper')

    if (slidesContainer) {
      slidesContainer.classList.remove('use-grid')
    }

    initializeSwiper()
  }

  function initializeSwiper() {
    if (insigniasSwiper) {
      insigniasSwiper.destroy(true, true)
      insigniasSwiper = null
    }

    var element = document.querySelector('.insignias-swiper')
    if (!element) {
      console.error('Elemento .insignias-swiper no encontrado')
      return
    }

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    try {
      insigniasSwiper = new window.Swiper('.insignias-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        centeredSlides: true,
        grabCursor: true,
        watchOverflow: true,

        breakpoints: {
          428: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 24,
            centeredSlides: false
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: false
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false
          }
        },

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },

        speed: 800,

        a11y: {
          enabled: true
        },

        on: {
          init: function () {
            console.log('✅ Swiper inicializado')
            console.log('📊 Total slides: ' + this.slides.length)
          }
        }
      })

      window.insigniasSwiper = insigniasSwiper
    } catch (error) {
      console.error('Error inicializando Swiper:', error)
    }
  }

  function initializeCarousel() {
    var slides = document.querySelectorAll('.insignias-swiper .swiper-slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    var config = getDisplayConfig(windowWidth, totalSlides)

    if (config.useGrid) {
      activateGridMode()
    } else {
      activateSwiperMode()
    }
  }

  function handleCarouselResize() {
    var slides = document.querySelectorAll('.insignias-swiper .swiper-slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    var config = getDisplayConfig(windowWidth, totalSlides)
    var currentlyUsingGrid = document.querySelector('.insignias-swiper .use-grid')

    if (config.useGrid && !currentlyUsingGrid) {
      if (insigniasSwiper) {
        insigniasSwiper.destroy(true, true)
        insigniasSwiper = null
      }
      activateGridMode()
    } else if (!config.useGrid && currentlyUsingGrid) {
      activateSwiperMode()
    }
  }

  function checkAndInit() {
    if (typeof window === 'undefined') {
      setTimeout(checkAndInit, 300)
      return
    }

    if (!window.Swiper) {
      console.warn('⚠️ Swiper no disponible aún, reintentando...')
      setTimeout(checkAndInit, 500)
      return
    }

    var element = document.querySelector('.insignias-swiper')
    if (!element) {
      console.warn('⚠️ Elemento .insignias-swiper no encontrado, reintentando...')
      setTimeout(checkAndInit, 500)
      return
    }

    initializeCarousel()
    window.addEventListener('resize', handleCarouselResize)
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndInit)
    } else {
      checkAndInit()
    }
  }

  checkAndInit()
}

export default initInsigniasSwiper

if (typeof module !== 'undefined' && module.exports) {
  module.exports = initInsigniasSwiper
}

if (typeof window !== 'undefined' && !window.initInsigniasSwiper) {
  window.initInsigniasSwiper = initInsigniasSwiper

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInsigniasSwiper)
  } else {
    initInsigniasSwiper()
  }
}
