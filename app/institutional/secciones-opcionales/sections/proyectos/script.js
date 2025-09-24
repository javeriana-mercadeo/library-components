// Script principal del carousel - Compatible con SSR y Liferay
const createCarouselManager = () => {
  // Verificar si estamos en el cliente
  if (typeof window === 'undefined') {
    return {
      activeIndex: 0,
      showModal: false,
      selectedSlideIndex: null,
      isMobile: false,
      nextSlide: () => {},
      prevSlide: () => {},
      setActiveSlide: () => {},
      openModal: () => {},
      closeModal: () => {},
      handleTouchStart: () => {},
      handleTouchMove: () => {},
      handleTouchEnd: () => {},
      handleSwipeInModal: () => {},
      cleanup: () => {},
      init: () => {}
    }
  }
  console.log('Script de Proyectos inicializado')

  const state = {
    activeIndex: 0,
    showModal: false,
    selectedSlideIndex: null,
    isMobile: false,
    touchStartX: 0,
    touchEndX: 0,
    touchStartY: 0,
    touchEndY: 0,
    isInitialized: false
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

  const checkMobile = () => {
    return window.innerWidth < 768
  }

  const updateSlideClasses = () => {
    const slideElements = document.querySelectorAll('.carousel-slide')
    const indicators = document.querySelectorAll('.indicator')

    slideElements.forEach((slide, index) => {
      slide.className = 'carousel-slide'

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

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === state.activeIndex)
    })
  }

  const updateModal = () => {
    const modalBackdrop = document.getElementById('modal-backdrop')
    if (modalBackdrop) {
      modalBackdrop.style.display = state.showModal ? 'flex' : 'none'
    }
  }

  const handleResize = () => {
    state.isMobile = checkMobile()
    updateSlideClasses()
  }

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

  const setActiveSlide = index => {
    state.activeIndex = index
    updateSlideClasses()
  }

  const openModal = index => {
    state.showModal = true
    state.selectedSlideIndex = index
    updateModal()

    // Renderizar contenido del modal
    renderModalContent()
  }

  const closeModal = () => {
    state.showModal = false
    state.selectedSlideIndex = null
    updateModal()
  }

  const handleTouchStart = e => {
    state.touchStartX = e.targetTouches[0].clientX
    state.touchStartY = e.targetTouches[0].clientY
  }

  const handleTouchMove = e => {
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

  const handleSwipeInModal = direction => {
    if (direction === 'up') {
      nextSlide()
      renderModalContent()
    } else if (direction === 'down') {
      prevSlide()
      renderModalContent()
    }
  }

  // Función para renderizar el contenido del modal
  const renderModalContent = () => {
    const modalBody = document.querySelector('.modal-body')
    if (!modalBody || state.selectedSlideIndex === null) return

    const selectedSlide = slides[state.selectedSlideIndex]
    if (!selectedSlide) return

    // Crear el contenido del modal con JavaScript vanilla
    modalBody.innerHTML = createProjectDetailsHTML(selectedSlide)

    // Agregar eventos touch al contenido del modal
    const projectDetails = modalBody.querySelector('.project-details')
    if (projectDetails) {
      addTouchEventsToModal(projectDetails)
    }
  }

  const createProjectDetailsHTML = slide => {
    const projectData = getProjectData(slide.slideData, slide.title, slide.description, slide.image)

    return `
      <div class="project-details" style="touch-action: pan-y; user-select: none;">
        <div class="project-layout">
          <div class="project-info">
            <h2>${projectData.titulo}</h2>
            <div class="info-row">
              <strong>Fecha</strong>
              <span>${projectData.fecha}</span>
            </div>
            <div class="info-row">
              <strong>Responsable</strong>
              <span>${projectData.estudiante}</span>
            </div>
            <div class="info-row">
              <strong>Descripción</strong>
              <p>${projectData.descripcion}</p>
            </div>
          </div>
          <div class="project-gallery">
            ${projectData.imagenes
              .map(
                (src, index) => `
              <img 
                src="${src}" 
                alt="${projectData.titulo} - Imagen ${index + 1}"
                style="width: 100%; margin-bottom: 1rem; object-fit: cover; pointer-events: none;"
              />
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `
  }

  const getProjectData = (slideData, title, description, image) => {
    switch (slideData?.type) {
      case 'universidad':
        return {
          titulo: 'Universidad Destacada - Programas Académicos',
          fecha: '2024',
          estudiante: 'Equipo Académico',
          descripcion:
            'Descubre nuestros programas académicos de alta calidad y la experiencia universitaria integral que ofrecemos. Contamos con acreditaciones internacionales y un cuerpo docente altamente calificado que garantiza una formación de excelencia.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2'
          ]
        }

      case 'investigacion':
        return {
          titulo: 'Investigación de Clase Mundial',
          fecha: '2023-2024',
          estudiante: 'Centro de Investigación',
          descripcion:
            'Conoce nuestros proyectos de investigación innovadores y logros académicos que contribuyen al avance del conocimiento. Nuestros centros especializados desarrollan investigación de alto impacto con colaboraciones internacionales.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
          ]
        }

      case 'campus':
        return {
          titulo: 'Campus Innovador - Instalaciones Modernas',
          fecha: '2024',
          estudiante: 'Departamento de Infraestructura',
          descripcion:
            'Explora nuestras instalaciones modernas y entorno de aprendizaje diseñado para potenciar el desarrollo académico. Contamos con laboratorios de última tecnología, bibliotecas digitales y espacios colaborativos.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1'
          ]
        }

      case 'comunidad':
        return {
          titulo: 'Comunidad Estudiantil Diversa',
          fecha: '2024',
          estudiante: 'Bienestar Universitario',
          descripcion:
            'Forma parte de nuestra comunidad diversa y vibrante donde cada estudiante encuentra su lugar. Ofrecemos múltiples organizaciones estudiantiles, eventos culturales y programas de liderazgo que enriquecen la experiencia universitaria.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
            'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'
          ]
        }

      case 'internacional':
        return {
          titulo: 'Oportunidades Internacionales',
          fecha: '2023-2024',
          estudiante: 'Oficina de Relaciones Internacionales',
          descripcion:
            'Descubre programas de intercambio y colaboraciones globales que amplían tu perspectiva académica y cultural. Ofrecemos intercambios académicos, doble titulación y programas de inmersión en universidades de prestigio mundial.',
          imagenes: [
            image,
            'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1'
          ]
        }

      default:
        return {
          titulo: title || 'Proyecto Universitario',
          fecha: '2024',
          estudiante: 'Equipo de Desarrollo',
          descripcion: description || 'Información detallada sobre este proyecto universitario y sus características principales.',
          imagenes: [
            image,
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
            'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2'
          ]
        }
    }
  }

  const addTouchEventsToModal = element => {
    let startY = 0
    let currentY = 0
    let isDragging = false

    const handleTouchStart = e => {
      startY = e.touches[0].clientY
      isDragging = true
      element.style.transition = 'none'
    }

    const handleTouchMove = e => {
      if (!isDragging) return

      e.preventDefault()
      currentY = e.touches[0].clientY
      const deltaY = currentY - startY

      const resistance = Math.max(0.1, 1 - Math.abs(deltaY) / (window.innerHeight * 0.3))
      element.style.transform = `translateY(${deltaY * resistance}px)`
    }

    const handleTouchEnd = () => {
      if (!isDragging) return

      isDragging = false
      const deltaY = currentY - startY

      element.style.transition = 'transform 0.3s ease-out'

      const threshold = 50

      if (Math.abs(deltaY) > threshold) {
        handleSwipeInModal(deltaY > 0 ? 'down' : 'up')
      }

      element.style.transform = 'translateY(0px)'
      startY = 0
      currentY = 0
    }

    if (window.innerWidth <= 768) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false })
      element.addEventListener('touchmove', handleTouchMove, { passive: false })
      element.addEventListener('touchend', handleTouchEnd, { passive: false })
    }
  }

  const bindEvents = () => {
    // Eventos de controles
    const prevButton = document.querySelector('.carousel-control.prev')
    const nextButton = document.querySelector('.carousel-control.next')
    const closeButton = document.querySelector('.modal-close')

    if (prevButton) prevButton.addEventListener('click', prevSlide)
    if (nextButton) nextButton.addEventListener('click', nextSlide)
    if (closeButton) closeButton.addEventListener('click', closeModal)

    // Eventos de slides
    const slideElements = document.querySelectorAll('.carousel-slide')
    slideElements.forEach((slide, index) => {
      slide.addEventListener('click', () => openModal(index))
    })

    // Eventos de indicadores
    const indicators = document.querySelectorAll('.indicator')
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => setActiveSlide(index))
    })

    // Eventos touch del carousel
    const carouselContainer = document.getElementById('carousel-container')
    if (carouselContainer) {
      carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: false })
      carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: false })
      carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: false })
    }

    // Evento de resize
    window.addEventListener('resize', handleResize)
  }

  const init = () => {
    if (state.isInitialized) return

    const checkDOM = () => {
      if (document.getElementById('carousel-container')) {
        state.isMobile = checkMobile()
        bindEvents()
        updateSlideClasses()
        state.isInitialized = true
      } else {
        setTimeout(checkDOM, 100)
      }
    }
    checkDOM()
  }

  const cleanup = () => {
    window.removeEventListener('resize', handleResize)
  }

  // Auto-inicialización cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    setTimeout(init, 0)
  }

  return {
    get activeIndex() {
      return state.activeIndex
    },
    get showModal() {
      return state.showModal
    },
    get selectedSlideIndex() {
      return state.selectedSlideIndex
    },
    get selectedSlide() {
      return state.selectedSlideIndex !== null ? slides[state.selectedSlideIndex] : null
    },
    get isMobile() {
      return state.isMobile
    },
    get slides() {
      return slides
    },
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

export default createCarouselManager
