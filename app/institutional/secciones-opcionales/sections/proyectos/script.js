// Script optimizado para Liferay - Carousel Manager
const createCarouselManager = () => {
  if (typeof window === 'undefined') {
    return {
      activeIndex: 0,
      showModal: false,
      selectedSlideIndex: null,
      openModal: () => {},
      closeModal: () => {},
      init: () => {}
    }
  }

  console.log('🎠 Carousel Manager para Liferay inicializado')

  const state = {
    activeIndex: 0,
    showModal: false,
    selectedSlideIndex: null,
    swiper: null,
    isInitialized: false,
    maxCardsToShow: 4
  }

  const slides = [
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 1, type: 'universidad' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 2, type: 'investigacion' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
      title: 'Campus Innovador',
      description: 'Explora nuestras instalaciones modernas y entorno de aprendizaje',
      slideData: { id: 3, type: 'campus' }
    },
    {
      image:
        'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
      title: 'Oportunidades Internacionales',
      description: 'Descubre programas de intercambio y colaboraciones globales',
      slideData: { id: 4, type: 'internacional' }
    },
    {
      image:
        'https://revistaaxxis.com.co/wp-content/uploads/2024/05/Edifiico_Sapiencia_3-1024x683.png',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 5, type: 'universidad' }
    },
    {
      image:
        'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0009_Javeriana-Sostenible.jpg',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 6, type: 'investigacion' }
    },
    {
      image:
        'https://www.javeriana.edu.co/recursosdb/664630/725325/compromisosocial2.png/2b84da22-005b-de8f-208a-7b90a466cba1?t=1603222055696',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 7, type: 'universidad' }
    },
    {
      image: 'https://i.ytimg.com/vi/mGd4pvXwQOo/maxresdefault.jpg',
      title: 'Campus Innovador',
      description: 'Explora nuestras instalaciones modernas y entorno de aprendizaje',
      slideData: { id: 8, type: 'campus' }
    }
  ]

  // ==========================================
  // CONFIGURACIÓN RESPONSIVE
  // ==========================================

  const getScreenConfig = () => {
    const width = window.innerWidth

    if (width >= 1200) {
      return { slidesPerView: Math.min(4, slides.length), spaceBetween: 2 }
    } else if (width >= 900) {
      return { slidesPerView: Math.min(3, slides.length), spaceBetween: 2 }
    } else if (width >= 768) {
      return { slidesPerView: Math.min(2, slides.length), spaceBetween: 2 }
    } else {
      return { slidesPerView: 1, spaceBetween: 2 }
    }
  }

  // ==========================================
  // GESTIÓN DEL MODAL - VERSIÓN LIFERAY
  // ==========================================

  const openModal = index => {
    console.log('🔍 Abriendo modal - Índice:', index)

    if (index < 0 || index >= slides.length) {
      console.error('❌ Índice inválido:', index)
      return
    }

    state.showModal = true
    state.selectedSlideIndex = index

    // ✅ BUSCAR MODAL DE MÚLTIPLES FORMAS (Compatible con Liferay)
    const modal =
      document.getElementById('modal-backdrop') ||
      document.querySelector('.modal-backdrop') ||
      document.querySelector('[data-modal="backdrop"]')

    if (modal) {
      modal.style.display = 'flex'
      modal.style.visibility = 'visible'
      modal.style.opacity = '1'
      modal.setAttribute('aria-hidden', 'false')

      // Agregar clase activa para CSS
      modal.classList.add('modal-active')

      console.log('✅ Modal mostrado exitosamente')

      // ✅ TRIGGER CUSTOM EVENT para comunicación con React/Liferay
      const modalEvent = new CustomEvent('carouselModalOpen', {
        detail: {
          slideIndex: index,
          slideData: slides[index]
        }
      })
      document.dispatchEvent(modalEvent)
    } else {
      console.error('❌ No se encontró el modal en el DOM')
    }
  }

  const closeModal = () => {
    console.log('❌ Cerrando modal')

    state.showModal = false
    state.selectedSlideIndex = null

    const modal =
      document.getElementById('modal-backdrop') ||
      document.querySelector('.modal-backdrop') ||
      document.querySelector('[data-modal="backdrop"]')

    if (modal) {
      modal.style.display = 'none'
      modal.style.visibility = 'hidden'
      modal.style.opacity = '0'
      modal.setAttribute('aria-hidden', 'true')
      modal.classList.remove('modal-active')

      console.log('✅ Modal cerrado exitosamente')

      // ✅ TRIGGER CUSTOM EVENT
      const modalEvent = new CustomEvent('carouselModalClose')
      document.dispatchEvent(modalEvent)
    }
  }

  // ==========================================
  // NAVEGACIÓN DE SWIPER - VERSIÓN LIFERAY
  // ==========================================

  const updateNavigationButtons = () => {
    if (!state.swiper) return

    const config = getScreenConfig()
    const currentIndex = state.swiper.activeIndex
    const maxIndex = Math.max(0, slides.length - config.slidesPerView)

    const nextBtn = document.getElementById('carousel-next')
    const prevBtn = document.getElementById('carousel-prev')

    if (nextBtn && prevBtn) {
      // Botón anterior
      if (currentIndex <= 0) {
        prevBtn.disabled = true
        prevBtn.classList.add('swiper-button-disabled')
        prevBtn.setAttribute('aria-disabled', 'true')
      } else {
        prevBtn.disabled = false
        prevBtn.classList.remove('swiper-button-disabled')
        prevBtn.setAttribute('aria-disabled', 'false')
      }

      // Botón siguiente
      if (currentIndex >= maxIndex) {
        nextBtn.disabled = true
        nextBtn.classList.add('swiper-button-disabled')
        nextBtn.setAttribute('aria-disabled', 'true')
      } else {
        nextBtn.disabled = false
        nextBtn.classList.remove('swiper-button-disabled')
        nextBtn.setAttribute('aria-disabled', 'false')
      }
    }
  }

  // ==========================================
  // INICIALIZACIÓN DE SWIPER
  // ==========================================

  const initSwiper = () => {
    return new Promise(resolve => {
      // ✅ CARGAR SWIPER DINÁMICAMENTE (Compatible con Liferay)
      const loadSwiper = () => {
        if (window.Swiper) {
          console.log('✅ Swiper ya disponible')
          initSwiperInstance()
          return
        }

        console.log('📦 Cargando Swiper...')

        // CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
        document.head.appendChild(link)

        // JS
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
        script.onload = () => {
          console.log('✅ Swiper cargado exitosamente')
          initSwiperInstance()
        }
        script.onerror = () => {
          console.error('❌ Error cargando Swiper')
          resolve(false)
        }
        document.head.appendChild(script)
      }

      const initSwiperInstance = () => {
        try {
          const config = getScreenConfig()

          state.swiper = new window.Swiper('.carousel-container', {
            slidesPerView: config.slidesPerView,
            spaceBetween: config.spaceBetween,
            loop: false,
            grabCursor: true,
            centeredSlides: slides.length < config.slidesPerView,
            allowTouchMove: true,

            effect: 'slide',
            speed: 400,

            // ✅ BREAKPOINTS SIMPLIFICADOS
            breakpoints: {
              768: {
                slidesPerView: Math.min(2, slides.length),
                spaceBetween: 2,
                centeredSlides: slides.length < 2
              },
              900: {
                slidesPerView: Math.min(3, slides.length),
                spaceBetween: 2,
                centeredSlides: slides.length < 3
              },
              1200: {
                slidesPerView: Math.min(4, slides.length),
                spaceBetween: 2,
                centeredSlides: slides.length < 4
              }
            },

            // ✅ EVENTOS SIMPLIFICADOS
            on: {
              init: function () {
                console.log('🎉 Swiper inicializado para Liferay')
                state.activeIndex = this.activeIndex
                updateNavigationButtons()

                setTimeout(() => {
                  const container = document.querySelector('.carousel-container')
                  if (container) {
                    const shouldCenter = slides.length < config.slidesPerView
                    container.setAttribute('data-centered', shouldCenter ? 'true' : 'false')
                  }
                }, 100)
              },

              slideChange: function () {
                state.activeIndex = this.activeIndex
                updateNavigationButtons()
              },

              reachEnd: function () {
                updateNavigationButtons()
              },

              reachBeginning: function () {
                updateNavigationButtons()
              }
            }
          })

          console.log('✅ Swiper configurado exitosamente')
          resolve(true)
        } catch (error) {
          console.error('❌ Error inicializando Swiper:', error)
          resolve(false)
        }
      }

      loadSwiper()
    })
  }

  // ==========================================
  // EVENTOS DELEGADOS - COMPATIBLE CON LIFERAY
  // ==========================================

  const setupEventDelegation = () => {
    console.log('🔧 Configurando eventos delegados para Liferay...')

    // ✅ USAR DELEGACIÓN DE EVENTOS (funciona incluso si React recrea elementos)
    document.addEventListener('click', function (e) {
      // Click en botón siguiente
      if (e.target.closest('#carousel-next')) {
        e.preventDefault()
        console.log('👆 Click en botón siguiente')
        if (state.swiper && !e.target.closest('#carousel-next').disabled) {
          state.swiper.slideNext()
        }
        return
      }

      // Click en botón anterior
      if (e.target.closest('#carousel-prev')) {
        e.preventDefault()
        console.log('👆 Click en botón anterior')
        if (state.swiper && !e.target.closest('#carousel-prev').disabled) {
          state.swiper.slidePrev()
        }
        return
      }

      // Click en slide para abrir modal
      const slide = e.target.closest('.carousel-slide')
      if (slide) {
        e.preventDefault()
        const slideIndex = parseInt(slide.getAttribute('data-slide-index'))
        if (!isNaN(slideIndex)) {
          console.log('👆 Click en slide:', slideIndex)
          openModal(slideIndex)
        }
        return
      }

      // Click en cerrar modal
      if (e.target.closest('#modal-close-btn') || e.target.closest('.modal-close')) {
        e.preventDefault()
        console.log('❌ Click en cerrar modal')
        closeModal()
        return
      }

      // Click fuera del modal para cerrar
      if (e.target.closest('#modal-backdrop') && !e.target.closest('.modal-content')) {
        console.log('❌ Click fuera del modal')
        closeModal()
        return
      }
    })

    // ✅ RESIZE HANDLER
    let resizeTimeout
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (state.swiper) {
          console.log('📐 Resize - actualizando Swiper')
          const config = getScreenConfig()
          state.swiper.params.slidesPerView = config.slidesPerView
          state.swiper.params.spaceBetween = config.spaceBetween
          state.swiper.update()
          updateNavigationButtons()
        }
      }, 250)
    })

    console.log('✅ Eventos delegados configurados')
  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================

  const init = () => {
    if (state.isInitialized) {
      console.log('⚠️ Ya inicializado')
      return Promise.resolve()
    }

    console.log('🚀 Iniciando Carousel Manager para Liferay...')

    return new Promise(resolve => {
      const checkAndInit = () => {
        const container = document.querySelector('.carousel-container')
        const slides = document.querySelectorAll('.carousel-slide')

        console.log(`🔍 Verificando DOM: Container=${!!container}, Slides=${slides.length}`)

        if (container && slides.length > 0) {
          console.log('✅ DOM listo para inicialización')

          // ✅ CONFIGURAR EVENTOS PRIMERO
          setupEventDelegation()

          // ✅ LUEGO INICIALIZAR SWIPER
          initSwiper().then(() => {
            state.isInitialized = true
            console.log('🎉 Carousel completamente inicializado para Liferay')
            resolve()
          })
        } else {
          console.log('⏳ Esperando DOM...')
          setTimeout(checkAndInit, 500)
        }
      }

      checkAndInit()
    })
  }

  // ==========================================
  // EXPOSICIÓN PÚBLICA PARA LIFERAY
  // ==========================================

  const publicAPI = {
    // Getters para estado
    get activeIndex() {
      return state.activeIndex
    },
    get showModal() {
      return state.showModal
    },
    get selectedSlideIndex() {
      return state.selectedSlideIndex
    },
    get isInitialized() {
      return state.isInitialized
    },
    get slides() {
      return slides
    },
    get swiper() {
      return state.swiper
    },

    // Métodos públicos
    openModal: openModal,
    closeModal: closeModal,
    init: init,

    // ✅ MÉTODOS PARA TESTING EN LIFERAY
    test: {
      openFirstSlide: () => openModal(0),
      closeModal: closeModal,
      nextSlide: () => state.swiper && state.swiper.slideNext(),
      prevSlide: () => state.swiper && state.swiper.slidePrev(),
      checkElements: () => {
        console.log('🔍 Estado de elementos:')
        console.log('- Container:', document.querySelector('.carousel-container'))
        console.log('- Slides:', document.querySelectorAll('.carousel-slide').length)
        console.log('- Modal:', document.querySelector('#modal-backdrop'))
        console.log('- Botones:', {
          next: document.querySelector('#carousel-next'),
          prev: document.querySelector('#carousel-prev')
        })
        console.log('- Swiper:', state.swiper)
      }
    }
  }

  // ✅ EXPOSICIÓN GLOBAL PARA LIFERAY/DEBUGGING
  if (typeof window !== 'undefined') {
    window.CarouselManager = publicAPI
    console.log('🌍 CarouselManager disponible globalmente')
  }

  // ✅ AUTO-INICIALIZACIÓN DIFERIDA (Compatible con Liferay)
  setTimeout(() => {
    init().catch(error => {
      console.error('❌ Error en inicialización:', error)
    })
  }, 1000) // Dar tiempo a React/Liferay

  return publicAPI
}
export default createCarouselManager;