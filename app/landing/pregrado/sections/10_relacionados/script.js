export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
    }

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Buscar el wrapper - intentar con ambas clases
    const element =
      document.querySelector('.related-programs-swiper') ||
      document.querySelector('.related-programs__wrapper') ||
      document.querySelector('.card-wrapper')

    if (!element) {
      console.error('No se encontró el contenedor del swiper')
      return
    }

    console.log('🎯 Inicializando Swiper de Programas Relacionados')

    window.relatedProgramsSwiper = new window.Swiper(element, {
      loop: false,
      spaceBetween: 20,
      grabCursor: true,
      allowTouchMove: true,

      // Paginación - SIEMPRE VISIBLE
      pagination: {
        el: '.related-programs-pagination, .related-programs__pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir al programa ${index + 1}"></span>`
        }
      },

      // Navegación - SIEMPRE VISIBLE
      navigation: {
        nextEl: '.related-programs-next, .related-programs__next',
        prevEl: '.related-programs-prev, .related-programs__prev'
      },

      // Breakpoints
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25,
          centeredSlides: false
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
          centeredSlides: false
        }
      },

      on: {
        init: function () {
          console.log('✅ Swiper de Programas Relacionados inicializado')
        }
      }
    })
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
    } else {
      console.log('⏳ Esperando que Swiper esté disponible...')
      setTimeout(checkAndInit, 300)
    }
  }

  // Inicialización
  checkAndInit()

  // Cleanup cuando se destruya el componente
  return () => {
    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
      window.relatedProgramsSwiper = null
    }
  }
}
