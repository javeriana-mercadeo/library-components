// ===========================================
// INICIALIZACIÓN SWIPER - VERSIÓN SIMPLIFICADA
// 100% nativa, dejando que Swiper maneje todo
// ===========================================

function initInsigniasSwiper() {
  // Verificar que Swiper esté disponible
  if (typeof window === 'undefined' || !window.Swiper) {
    console.warn('⚠️ Swiper no disponible aún, reintentando...')
    setTimeout(initInsigniasSwiper, 500)
    return
  }

  // Verificar que el elemento exista
  const element = document.querySelector('.insignias-swiper')
  if (!element) {
    console.warn('⚠️ Elemento .insignias-swiper no encontrado, reintentando...')
    setTimeout(initInsigniasSwiper, 500)
    return
  }

  // Destruir instancia existente
  if (window.insigniasSwiper) {
    window.insigniasSwiper.destroy(true, true)
  }

  console.log('🚀 Inicializando Swiper de insignias...')

  // 🎯 Configuración RESPONSIVE de Swiper
  window.insigniasSwiper = new window.Swiper('.insignias-swiper', {
    // Loop infinito - Swiper maneja todo
    loop: true,

    // 📱 CONFIGURACIÓN RESPONSIVE (Mobile-First)
    // Por defecto: móviles pequeños
    slidesPerView: 1,
    spaceBetween: 16,
    centeredSlides: true,

    // 🎚️ Breakpoints para diferentes tamaños de pantalla
    breakpoints: {
      // Móvil pequeño (≥428px)
      428: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true
      },
      // Móvil grande / Tablet pequeña (≥576px)
      576: {
        slidesPerView: 2,
        spaceBetween: 24,
        centeredSlides: false
      },
      // Tablet (≥768px)
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false
      },
      // Desktop (≥992px)
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false
      }
    },

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    // Velocidad de transición
    speed: 800,

    // Interacción
    grabCursor: true,

    // Paginación
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },

    // Navegación (opcional)
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    // Accesibilidad
    a11y: {
      enabled: true
    },

    // Eventos
    on: {
      init: function () {
        console.log('✅ Swiper inicializado correctamente')
        console.log(`📊 Total slides: ${this.slides.length}`)
        console.log(`📱 Slides visibles: ${this.params.slidesPerView}`)
        console.log(`🎬 Autoplay: ${this.autoplay.running ? 'Running ✓' : 'Stopped ✗'}`)
      }
    }
  })
}

// Auto-inicialización cuando el DOM está listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInsigniasSwiper)
  } else {
    initInsigniasSwiper()
  }
}

export default initInsigniasSwiper
