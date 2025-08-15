// Script con tamaño fijo de cards y navegación controlada
const createCarouselManager = () => {
  if (typeof window === 'undefined') {
    return {
      activeIndex: 0,
      showModal: false,
      selectedSlideIndex: null,
      swiper: null,
      openModal: () => {},
      closeModal: () => {},
      handleSwipeInModal: () => {},
      cleanup: () => {},
      init: () => {}
    }
  }

  console.log('🎠 Carousel Manager con navegación controlada inicializado')
  
  const state = {
    activeIndex: 0,
    showModal: false,
    selectedSlideIndex: null,
    swiper: null,
    isInitialized: false,
    initAttempts: 0,
    maxAttempts: 15,
    debugMode: true,
    cardSize: 280,
    minCardSize: 200,
    cardSpacing: 4
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
      image: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png',
      title: 'Oportunidades Internacionales',
      description: 'Descubre programas de intercambio y colaboraciones globales',
      slideData: { id: 4, type: 'internacional' }
    },
    {
      image: 'https://revistaaxxis.com.co/wp-content/uploads/2024/05/Edifiico_Sapiencia_3-1024x683.png',
      title: 'Universidad Destacada',
      description: 'Descubre nuestros programas académicos y la experiencia universitaria',
      slideData: { id: 5, type: 'universidad' }
    },
    {
      image: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0009_Javeriana-Sostenible.jpg',
      title: 'Investigación de Clase Mundial',
      description: 'Conoce nuestros proyectos de investigación y logros académicos',
      slideData: { id: 6, type: 'investigacion' }
    },
    {
      image: 'https://www.javeriana.edu.co/recursosdb/664630/725325/compromisosocial2.png/2b84da22-005b-de8f-208a-7b90a466cba1?t=1603222055696',
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
  // CÁLCULO DINÁMICO DE CARDS VISIBLES
  // ==========================================

  const calculateOptimalConfiguration = () => {
    const container = document.querySelector('.carousel-container')
    if (!container) {
      console.warn('⚠️ Container no encontrado para cálculos')
      return { slidesPerView: 1, cardSize: state.minCardSize }
    }

    const containerWidth = container.getBoundingClientRect().width
    const screenWidth = window.innerWidth
    
    // Determinar tamaño de card según pantalla
    let currentCardSize = state.cardSize
    
    if (screenWidth <= 360) {
      currentCardSize = 220
    } else if (screenWidth <= 480) {
      currentCardSize = 250
    } else {
      currentCardSize = state.cardSize
    }

    // Calcular cuántas cards caben
    const availableWidth = containerWidth - (state.cardSpacing * 2)
    const cardsToFit = Math.floor(availableWidth / (currentCardSize + state.cardSpacing))
    const minCards = 1
    
    // IMPORTANTE: No mostrar más cards de las que tenemos
    const maxCards = slides.length
    
    const optimalCards = Math.max(minCards, Math.min(cardsToFit, maxCards))
    
    // Si solo cabe 1 card pero el container es grande, ajustar el tamaño
    let finalCardSize = currentCardSize
    if (optimalCards === 1 && availableWidth > currentCardSize * 1.5) {
      finalCardSize = Math.min(availableWidth - state.cardSpacing * 2, currentCardSize * 1.3)
    }

    console.log(`📐 Cálculo de configuración óptima:`)
    console.log(`  - Ancho pantalla: ${screenWidth}px`)
    console.log(`  - Ancho container: ${containerWidth}px`)
    console.log(`  - Total slides: ${slides.length}`)
    console.log(`  - Cards que caben: ${cardsToFit}`)
    console.log(`  - Cards a mostrar: ${optimalCards}`)
    console.log(`  - Tamaño card final: ${finalCardSize}px`)

    return {
      slidesPerView: optimalCards,
      cardSize: finalCardSize,
      containerWidth: containerWidth,
      screenWidth: screenWidth,
      totalSlides: slides.length
    }
  }

  // ==========================================
  // CONTROL DE NAVEGACIÓN
  // ==========================================

  const updateNavigationButtons = () => {
    if (!state.swiper) return

    const nextBtn = document.querySelector('#carousel-next')
    const prevBtn = document.querySelector('#carousel-prev')
    
    if (!nextBtn || !prevBtn) return

    const currentIndex = state.swiper.activeIndex
    const config = calculateOptimalConfiguration()
    const maxIndex = slides.length - config.slidesPerView

    console.log(`🎯 Actualizando botones - Índice: ${currentIndex}, Máximo: ${maxIndex}`)

    // Botón anterior - deshabilitar si estamos al inicio
    if (currentIndex <= 0) {
      prevBtn.classList.add('swiper-button-disabled')
      prevBtn.disabled = true
      console.log('🚫 Botón anterior deshabilitado')
    } else {
      prevBtn.classList.remove('swiper-button-disabled')
      prevBtn.disabled = false
      console.log('✅ Botón anterior habilitado')
    }

    // Botón siguiente - deshabilitar si estamos al final
    if (currentIndex >= maxIndex) {
      nextBtn.classList.add('swiper-button-disabled')
      nextBtn.disabled = true
      console.log('🚫 Botón siguiente deshabilitado')
    } else {
      nextBtn.classList.remove('swiper-button-disabled')
      nextBtn.disabled = false
      console.log('✅ Botón siguiente habilitado')
    }
  }

  const applyCardSizing = (config) => {
    const slides = document.querySelectorAll('.carousel-slide')
    
    slides.forEach((slide, index) => {
      const slideImage = slide.querySelector('.slide-image')
      
      slide.style.width = `${config.cardSize}px`
      slide.style.minWidth = `${config.cardSize}px`
      slide.style.maxWidth = `${config.cardSize}px`
      slide.style.flex = `0 0 ${config.cardSize}px`
      
      if (slideImage) {
        slideImage.style.width = '100%'
        slideImage.style.aspectRatio = '1 / 1'
        slideImage.style.height = 'auto'
        
        if (!CSS.supports('aspect-ratio', '1 / 1')) {
          slideImage.style.height = '0'
          slideImage.style.paddingBottom = '100%'
        }
        
        console.log(`🔲 Card ${index} - aplicado tamaño: ${config.cardSize}px`)
      }
    })
  }

  const ensureCardsVisibility = () => {
    const container = document.querySelector('.carousel-container')
    const wrapper = document.querySelector('.swiper-wrapper')
    const slides = document.querySelectorAll('.carousel-slide')
    
    if (!container || !slides.length) {
      console.warn('⚠️ No se encontraron elementos del carousel')
      return false
    }

    const config = calculateOptimalConfiguration()
    
    console.log(`📱 Configurando ${config.slidesPerView} cards visibles de ${config.cardSize}px cada una`)

    slides.forEach((slide, index) => {
      const slideImage = slide.querySelector('.slide-image')
      
      slide.style.display = 'flex'
      slide.style.opacity = '1'
      slide.style.visibility = 'visible'
      slide.style.position = 'relative'
      slide.style.height = '100%'
      
      if (slideImage) {
        slideImage.style.display = 'block'
        slideImage.style.opacity = '1'
        slideImage.style.visibility = 'visible'
      }
      
      console.log(`✅ Card ${index} - visibilidad asegurada`)
    })

    applyCardSizing(config)

    if (wrapper) {
      wrapper.style.display = 'flex'
      wrapper.style.height = '100%'
      wrapper.style.alignItems = 'stretch'
    }

    return config
  }

  // ==========================================
  // FUNCIONES DE SWIPER MEJORADAS
  // ==========================================

  const waitForSwiper = () => {
    return new Promise((resolve, reject) => {
      const checkSwiper = () => {
        if (window.Swiper) {
          console.log('✅ Swiper library encontrada')
          resolve()
        } else if (state.initAttempts < state.maxAttempts) {
          state.initAttempts++
          console.log(`⏳ Esperando Swiper... intento ${state.initAttempts}/${state.maxAttempts}`)
          setTimeout(checkSwiper, 150)
        } else {
          console.error('❌ Timeout: Swiper no disponible')
          reject(new Error('Swiper timeout'))
        }
      }
      checkSwiper()
    })
  }

  const initSwiper = async () => {
    try {
      console.log('🚀 Iniciando configuración de Swiper con navegación controlada...')
      
      const config = ensureCardsVisibility()
      if (!config) {
        throw new Error('No se pudo calcular configuración óptima')
      }

      await waitForSwiper()

      if (state.swiper) {
        console.log('🗑️ Destruyendo instancia anterior')
        state.swiper.destroy(true, true)
        state.swiper = null
      }

      const container = document.querySelector('.carousel-container')
      if (!container) {
        throw new Error('Container no encontrado')
      }

      console.log('⚙️ Configurando Swiper con navegación controlada...')
      console.log(`📊 Slides por vista: ${config.slidesPerView}`)
      console.log(`📏 Total slides: ${config.totalSlides}`)
      
      state.swiper = new window.Swiper('.carousel-container', {
        slidesPerView: config.slidesPerView,
        spaceBetween: state.cardSpacing,
        loop: false, // ✅ CAMBIO PRINCIPAL: No infinito
        grabCursor: true,
        centeredSlides: false,
        allowTouchMove: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        
        effect: 'slide',
        speed: 500,
        
        // Prevenir slide más allá del último
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        resistanceRatio: 0.85,

        navigation: {
          nextEl: '#carousel-next',
          prevEl: '#carousel-prev',
          disabledClass: 'swiper-button-disabled'
        },

        pagination: {
          el: '#carousel-indicators',
          clickable: true,
          bulletClass: 'indicator',
          bulletActiveClass: 'active',
          renderBullet: function (index, className) {
            return `<button class="${className}" data-indicator-index="${index}"></button>`
          }
        },

        on: {
          init: function() {
            console.log('🎉 Swiper inicializado con navegación controlada')
            
            state.activeIndex = this.activeIndex
            updateModalContent()
            updateNavigationButtons()
            
            console.log(`📊 Estado inicial:`)
            console.log(`  - Slides por vista: ${config.slidesPerView}`)
            console.log(`  - Índice activo: ${this.activeIndex}`)
            console.log(`  - Total slides: ${this.slides.length}`)
            console.log(`  - Máximo índice permitido: ${this.slides.length - config.slidesPerView}`)
          },
          
          slideChange: function() {
            const oldIndex = state.activeIndex
            const newIndex = this.activeIndex
            console.log(`🔄 Slide cambió: ${oldIndex} → ${newIndex}`)
            
            state.activeIndex = newIndex
            updateModalContent()
            updateNavigationButtons()
          },
          
          reachEnd: function() {
            console.log('🛑 Llegamos al final del carousel')
            updateNavigationButtons()
          },
          
          reachBeginning: function() {
            console.log('🛑 Llegamos al inicio del carousel')
            updateNavigationButtons()
          },
          
          resize: function() {
            console.log('📐 Resize detectado - recalculando configuración...')
            
            const newConfig = calculateOptimalConfiguration()
            
            if (Math.abs(newConfig.slidesPerView - config.slidesPerView) >= 1) {
              console.log(`🔄 Actualizando configuración: ${config.slidesPerView} → ${newConfig.slidesPerView} slides`)
              
              applyCardSizing(newConfig)
              
              this.params.slidesPerView = newConfig.slidesPerView
              this.params.spaceBetween = state.cardSpacing
              this.update()
              
              // Asegurar que no estemos más allá del nuevo límite
              const maxIndex = slides.length - newConfig.slidesPerView
              if (this.activeIndex > maxIndex) {
                this.slideTo(Math.max(0, maxIndex))
              }
              
              updateNavigationButtons()
            } else {
              this.update()
              updateNavigationButtons()
            }
          },
          
          click: function(swiper, event) {
            const clickedSlide = event.target.closest('.carousel-slide')
            if (clickedSlide) {
              const slideIndex = parseInt(clickedSlide.dataset.slideIndex)
              console.log(`👆 Click en slide: ${slideIndex}`)
              openModal(slideIndex)
            }
          }
        }
      })

      console.log('✅ Swiper configurado exitosamente con navegación controlada')
      
      // Actualizar botones después de la inicialización
      setTimeout(() => {
        updateNavigationButtons()
      }, 500)

      return true

    } catch (error) {
      console.error('❌ Error inicializando Swiper:', error)
      ensureCardsVisibility()
      return false
    }
  }

  const setupManualNavigation = () => {
    console.log('🔧 Configurando navegación manual como fallback...')
    
    // Solo configurar eventos manuales si Swiper no se inicializó correctamente
    if (!state.swiper) {
      const nextBtn = document.querySelector('#carousel-next')
      const prevBtn = document.querySelector('#carousel-prev')
      
      if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault()
          console.log('👆 Click manual fallback - Siguiente')
          // Implementar scroll manual como fallback
          const container = document.querySelector('.carousel-container')
          if (container) {
            container.scrollLeft += 300
          }
        })
        
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault()
          console.log('👆 Click manual fallback - Anterior')
          // Implementar scroll manual como fallback
          const container = document.querySelector('.carousel-container')
          if (container) {
            container.scrollLeft -= 300
          }
        })
        
        console.log('✅ Navegación manual fallback configurada')
      }
    } else {
      console.log('✅ Usando navegación nativa de Swiper')
    }
  }

  const loadSwiper = () => {
    return new Promise((resolve, reject) => {
      if (window.Swiper) {
        resolve()
        return
      }

      console.log('📦 Cargando Swiper desde CDN...')

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
      script.onload = () => {
        console.log('✅ Swiper cargado desde CDN')
        resolve()
      }
      script.onerror = () => {
        console.error('❌ Error cargando Swiper desde CDN')
        reject(new Error('Error cargando Swiper'))
      }
      document.head.appendChild(script)
    })
  }

  // ==========================================
  // FUNCIONES DEL MODAL (mantener originales)
  // ==========================================

  const updateModalContent = () => {
    if (state.selectedSlideIndex !== null) {
      renderModalContent()
    }
  }

  const openModal = (index) => {
    console.log(`🔍 Abriendo modal para slide: ${index}`)
    state.showModal = true
    state.selectedSlideIndex = index
    updateModal()
    renderModalContent()
  }

  const closeModal = () => {
    console.log('❌ Cerrando modal')
    state.showModal = false
    state.selectedSlideIndex = null
    updateModal()
  }

  const updateModal = () => {
    const modalBackdrop = document.getElementById('modal-backdrop')
    if (modalBackdrop) {
      modalBackdrop.style.display = state.showModal ? 'flex' : 'none'
    }
  }

  const handleSwipeInModal = (direction) => {
    if (!state.swiper) return

    if (direction === 'up') {
      console.log('⬆️ Swipe up en modal - siguiente slide')
      state.swiper.slideNext()
      const nextIndex = state.swiper.activeIndex
      state.selectedSlideIndex = nextIndex
      renderModalContent()
    } else if (direction === 'down') {
      console.log('⬇️ Swipe down en modal - slide anterior')
      state.swiper.slidePrev()
      const prevIndex = state.swiper.activeIndex
      state.selectedSlideIndex = prevIndex
      renderModalContent()
    }
  }

  const renderModalContent = () => {
    const modalBody = document.querySelector('.modal-body')
    if (!modalBody || state.selectedSlideIndex === null) return

    const selectedSlide = slides[state.selectedSlideIndex]
    if (!selectedSlide) return

    modalBody.innerHTML = createProjectDetailsHTML(selectedSlide)
    
    const projectDetails = modalBody.querySelector('.project-details')
    if (projectDetails) {
      addTouchEventsToModal(projectDetails)
    }
  }

  const createProjectDetailsHTML = (slide) => {
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
            ${projectData.imagenes.map((src, index) => `
              <img 
                src="${src}" 
                alt="${projectData.titulo} - Imagen ${index + 1}"
                style="width: 100%; margin-bottom: 1rem; object-fit: cover; pointer-events: none;"
              />
            `).join('')}
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
          descripcion: 'Descubre nuestros programas académicos de alta calidad y la experiencia universitaria integral que ofrecemos.',
          imagenes: [image, 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
        }
      
      case 'investigacion':
        return {
          titulo: 'Investigación de Clase Mundial',
          fecha: '2023-2024',
          estudiante: 'Centro de Investigación',
          descripcion: 'Conoce nuestros proyectos de investigación innovadores y logros académicos que contribuyen al avance del conocimiento.',
          imagenes: [image, 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2']
        }
      
      case 'campus':
        return {
          titulo: 'Campus Innovador - Instalaciones Modernas',
          fecha: '2024',
          estudiante: 'Departamento de Infraestructura',
          descripcion: 'Explora nuestras instalaciones modernas y entorno de aprendizaje diseñado para potenciar el desarrollo académico.',
          imagenes: [image, 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
        }
      
      case 'internacional':
        return {
          titulo: 'Oportunidades Internacionales',
          fecha: '2023-2024',
          estudiante: 'Oficina de Relaciones Internacionales',
          descripcion: 'Descubre programas de intercambio y colaboraciones globales que amplían tu perspectiva académica y cultural.',
          imagenes: [image, 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png']
        }
      
      default:
        return {
          titulo: title || 'Proyecto Universitario',
          fecha: '2024',
          estudiante: 'Equipo de Desarrollo',
          descripcion: description || 'Información detallada sobre este proyecto universitario.',
          imagenes: [image]
        }
    }
  }

  const addTouchEventsToModal = (element) => {
    let startY = 0
    let currentY = 0
    let isDragging = false

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY
      isDragging = true
      element.style.transition = 'none'
    }

    const handleTouchMove = (e) => {
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
    const closeButton = document.querySelector('.modal-close')
    if (closeButton) {
      closeButton.addEventListener('click', closeModal)
      console.log('✅ Evento de cerrar modal vinculado')
    }

    window.addEventListener('resize', () => {
      setTimeout(() => {
        console.log('📐 Resize detectado - verificando configuración...')
        const newConfig = calculateOptimalConfiguration()
        applyCardSizing(newConfig)
        updateNavigationButtons()
      }, 300)
    })
  }

  const init = async () => {
    if (state.isInitialized) {
      console.log('⚠️ Ya inicializado, saltando...')
      return
    }
    
    console.log('🔄 Iniciando carousel manager con navegación controlada...')
    
    const checkDOM = async () => {
      const container = document.querySelector('.carousel-container')
      const slides = document.querySelectorAll('.carousel-slide')
      
      if (container && slides.length > 0) {
        console.log(`✅ DOM listo - ${slides.length} slides encontrados`)
        
        const config = ensureCardsVisibility()
        console.log(`🎯 Configuración inicial: ${config.slidesPerView} cards de ${config.cardSize}px`)
        
        bindEvents()
        
        try {
          if (!window.Swiper) {
            await loadSwiper()
          }
          
          const success = await initSwiper()
          if (success) {
            state.isInitialized = true
            console.log('🎉 Carousel inicializado exitosamente con navegación controlada')
          } else {
            console.log('⚠️ Swiper falló, pero cards están visibles como fallback')
          }
          
        } catch (error) {
          console.error('❌ Error en inicialización:', error)
          ensureCardsVisibility()
        }
        
      } else {
        console.log('⏳ Esperando DOM...')
        setTimeout(checkDOM, 100)
      }
    }
    
    await checkDOM()
  }

  const cleanup = () => {
    console.log('🧹 Limpiando carousel...')
    if (state.swiper) {
      state.swiper.destroy(true, true)
      state.swiper = null
    }
    state.isInitialized = false
  }

  // Auto-inicialización
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    setTimeout(init, 0)
  }

  return {
    get activeIndex() { return state.activeIndex },
    get showModal() { return state.showModal },
    get selectedSlideIndex() { return state.selectedSlideIndex },
    get selectedSlide() { 
      return state.selectedSlideIndex !== null ? slides[state.selectedSlideIndex] : null 
    },
    get swiper() { return state.swiper },
    get slides() { return slides },
    openModal,
    closeModal,
    handleSwipeInModal,
    cleanup,
    init,
    calculateOptimalConfiguration,
    applyCardSizing,
    ensureCardsVisibility,
    updateNavigationButtons
  }
}

export default createCarouselManager