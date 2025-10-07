export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.insigniasSwiper && typeof window.insigniasSwiper.destroy === 'function') {
      window.insigniasSwiper.destroy(true, true)
    }

    // Buscar el elemento Swiper
    const element = document.querySelector('.insignias-swiper')
    if (!element) {
      console.warn('⚠️ Elemento .insignias-swiper no encontrado')
      return
    }

    // Verificar que Swiper esté disponible
    if (!window.Swiper) {
      console.error('❌ Swiper no está disponible en window.Swiper')
      return
    }

    // Contar slides
    const slides = document.querySelectorAll('.insignias-swiper .swiper-slide')
    const totalSlides = slides.length

    console.log(`🔍 Encontrados ${totalSlides} slides de insignias`)

    // 🎯 Detectar preferencia de animación reducida
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 🚀 Inicializar Swiper (basado en demo de Swiper Autoplay)
    window.insigniasSwiper = new window.Swiper('.insignias-swiper', {
      // Configuración base
      slidesPerView: 5,
      spaceBetween: 30,
      freeMode: {
        enabled: true
      },
      loop: true,
      loopAdditionalSlides: 6, // Duplica suficientes slides para loop suave
      grabCursor: true,

      // Autoplay
      autoplay: prefersReducedMotion
        ? false
        : {
            delay: 2500,
            disableOnInteraction: false
          },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      // 📱 Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: Math.min(1, totalSlides),
          spaceBetween: 20
        },
        576: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 20
        },
        768: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 30
        },
        992: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 30
        },
        1200: {
          slidesPerView: Math.min(5, totalSlides),
          spaceBetween: 30
        }
      },

      // ♿ Accesibilidad
      a11y: {
        enabled: true,
        prevSlideMessage: 'Reconocimiento anterior',
        nextSlideMessage: 'Siguiente reconocimiento',
        firstSlideMessage: 'Primer reconocimiento',
        lastSlideMessage: 'Último reconocimiento'
      },

      // 🔊 Eventos
      on: {
        init: function () {
          console.log('✅ Swiper de insignias inicializado correctamente')
        },
        slideChange: function () {
          // console.log('Slide actual:', this.activeIndex)
        }
      }
    })

    // 🎨 Escuchar cambios en preferencia de movimiento
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionQuery.addEventListener('change', e => {
      if (e.matches && window.insigniasSwiper.autoplay) {
        window.insigniasSwiper.autoplay.stop()
        console.log('⏸️ Autoplay detenido (prefers-reduced-motion activado)')
      } else if (window.insigniasSwiper.autoplay) {
        window.insigniasSwiper.autoplay.start()
        console.log('▶️ Autoplay iniciado')
      }
    })
  }

  const checkAndInit = () => {
    // Verificar que Swiper esté disponible Y que el DOM esté listo
    if (typeof window !== 'undefined' && window.Swiper && document.readyState === 'complete') {
      // Verificar que el elemento exista antes de inicializar
      const element = document.querySelector('.insignias-swiper')
      if (element) {
        initializeSwiper()
      } else {
        // Si no existe el elemento, intentar de nuevo en 500ms
        setTimeout(checkAndInit, 500)
      }
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInit)
  } else {
    checkAndInit()
  }

  // Resize handler
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.insigniasSwiper && typeof window.insigniasSwiper.update === 'function') {
        window.insigniasSwiper.update()
      }
    }, 250)
  })
}
