const script = () => {
  console.log('Script de Proyectos inicializado')
  
  // Estado del carousel
  const state = {
    activeIndex: 0,
    showModal: false,
    selectedSlideIndex: null,
    isMobile: window.innerWidth < 768,
    touchStartX: 0,
    touchEndX: 0,
    touchStartY: 0,
    touchEndY: 0
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
      image: 'https://www.lapizdeacero.org/wp-content/uploads/2023/08/Interior-image_01.jpg',
      title: 'Comunidad Estudiantil',
      description: 'Forma parte de nuestra comunidad diversa y vibrante',
      slideData: { id: 4, type: 'comunidad' }
    },
    {
      image: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
      title: 'Oportunidades Internacionales',
      description: 'Descubre programas de intercambio y colaboraciones globales',
      slideData: { id: 5, type: 'internacional' }
    }
  ]

  // Función para actualizar las clases CSS directamente en el DOM
  const updateSlideClasses = () => {
    const slideElements = document.querySelectorAll('.carousel-slide')
    const indicators = document.querySelectorAll('.indicator')
    
    slideElements.forEach((slide, index) => {
      // Limpiar clases anteriores
      slide.className = 'carousel-slide'
      
      // Aplicar nuevas clases según posición
      if (state.isMobile) {
        if (index === state.activeIndex) {
          slide.classList.add('active')
        }
      } else {
        if (index === state.activeIndex) {
          slide.classList.add('active', 'left')
        } else if (index === (state.activeIndex + 1) % slides.length) {
          slide.classList.add('active', 'center')
        } else if (index === (state.activeIndex + 2) % slides.length) {
          slide.classList.add('active', 'right')
        }
      }
    })

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === state.activeIndex)
    })
  }

  // Función para actualizar el modal
  const updateModal = () => {
    const modalBackdrop = document.getElementById('modal-backdrop')
    if (modalBackdrop) {
      modalBackdrop.style.display = state.showModal ? 'flex' : 'none'
    }
  }

  // Manejo de redimensionamiento
  const handleResize = () => {
    state.isMobile = window.innerWidth < 768
    updateSlideClasses()
  }

  // Navegación del carousel
  const nextSlide = () => {
    const nextIndex = (state.activeIndex + 1) % slides.length
    state.activeIndex = nextIndex
    state.selectedSlideIndex = nextIndex
    updateSlideClasses()
  }

  const prevSlide = () => {
    const prevIndex = (state.activeIndex - 1 + slides.length) % slides.length
    state.activeIndex = prevIndex
    state.selectedSlideIndex = prevIndex
    updateSlideClasses()
  }

  const setActiveSlide = (index) => {
    state.activeIndex = index
    updateSlideClasses()
  }

  // Manejo del modal
  const openModal = (index) => {
    state.showModal = true
    state.selectedSlideIndex = index
    updateModal()
  }

  const closeModal = () => {
    state.showModal = false
    state.selectedSlideIndex = null
    updateModal()
  }

  // Manejo de touch events
  const handleTouchStart = (e) => {
    state.touchStartX = e.targetTouches[0].clientX
    state.touchStartY = e.targetTouches[0].clientY
  }

  const handleTouchMove = (e) => {
    state.touchEndX = e.targetTouches[0].clientX
    state.touchEndY = e.targetTouches[0].clientY
  }

  const handleTouchEnd = () => {
    const deltaX = state.touchStartX - state.touchEndX
    const deltaY = Math.abs(state.touchStartY - state.touchEndY)

    if (deltaY < 50 && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const handleSwipeInModal = (direction) => {
    if (direction === 'up') {
      nextSlide()
    } else if (direction === 'down') {
      prevSlide()
    }
  }

  // Inicialización cuando el DOM esté listo
  const init = () => {
    // Esperar a que el DOM esté disponible
    const checkDOM = () => {
      if (document.getElementById('carousel-container')) {
        handleResize()
        window.addEventListener('resize', handleResize)
        updateSlideClasses()
      } else {
        setTimeout(checkDOM, 100)
      }
    }
    checkDOM()
  }

  // Inicializar inmediatamente o cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    setTimeout(init, 0)
  }

  // Cleanup cuando sea necesario
  const cleanup = () => {
    window.removeEventListener('resize', handleResize)
  }

  // Retornar objeto con toda la funcionalidad y estado
  return {
    // Estado (getters para acceso directo)
    get activeIndex() { return state.activeIndex },
    get showModal() { return state.showModal },
    get selectedSlideIndex() { return state.selectedSlideIndex },
    get selectedSlide() { 
      return state.selectedSlideIndex !== null ? slides[state.selectedSlideIndex] : null 
    },
    get isMobile() { return state.isMobile },
    get slides() { return slides },
    
    // Métodos
    nextSlide,
    prevSlide,
    setActiveSlide,
    openModal,
    closeModal,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleSwipeInModal,
    cleanup,
    init
  }
}

export default script