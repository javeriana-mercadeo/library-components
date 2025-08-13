// Script completo con Swiper.js - Sin espacios entre cards y navegación funcional
const createCarouselManager = () => {
  // Verificar si estamos en el cliente
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

  console.log('🎠 Script de Proyectos con Swiper inicializado')
  
  const state = {
    activeIndex: 0,
    showModal: false,
    selectedSlideIndex: null,
    swiper: null,
    isInitialized: false,
    initAttempts: 0,
    maxAttempts: 10
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

  // Función para asegurar que las cards sean visibles antes de init
  const ensureCardsVisible = () => {
    const container = document.querySelector('.carousel-container')
    const slides = document.querySelectorAll('.carousel-slide')
    
    if (!container || !slides.length) return false

    console.log('🔍 Verificando visibilidad de cards...')
    console.log(`📊 Total de slides encontrados: ${slides.length}`)
    console.log(`📐 Ancho de ventana: ${window.innerWidth}px`)
    
    // Determinar cuántas cards deberían ser visibles según el breakpoint
    let expectedVisible = 1
    if (window.innerWidth >= 1200) {
      expectedVisible = 4
      console.log('🖥️ Desktop grande detectado - esperando 4 cards')
    } else if (window.innerWidth >= 1024) {
      expectedVisible = 3
      console.log('💻 Desktop detectado - esperando 3 cards')
    } else if (window.innerWidth >= 768) {
      expectedVisible = 2
      console.log('📟 Tablet detectado - esperando 2 cards')
    } else {
      expectedVisible = 1
      console.log('📱 Mobile detectado - esperando 1 card')
    }
    
    // Asegurar que al menos el primer slide sea visible
    slides.forEach((slide, index) => {
      if (index === 0) {
        slide.style.display = 'flex'
        slide.style.opacity = '1'
        slide.style.visibility = 'visible'
        console.log(`✅ Slide ${index} visible`)
      }
    })

    return true
  }

  const waitForSwiper = () => {
    return new Promise((resolve, reject) => {
      const checkSwiper = () => {
        if (window.Swiper) {
          console.log('✅ Swiper encontrado')
          resolve()
        } else if (state.initAttempts < state.maxAttempts) {
          state.initAttempts++
          console.log(`⏳ Esperando Swiper... intento ${state.initAttempts}/${state.maxAttempts}`)
          setTimeout(checkSwiper, 200)
        } else {
          console.error('❌ Swiper no pudo cargarse después de múltiples intentos')
          reject(new Error('Swiper no disponible'))
        }
      }
      checkSwiper()
    })
  }

  // Nueva función para forzar layout cuadrado sin espacios
  const forceSquareLayout = () => {
    console.log('🔲 Forzando layout cuadrado sin espacios...')
    
    const slides = document.querySelectorAll('.swiper-slide')
    const container = document.querySelector('.carousel-container')
    
    if (!container || !slides.length) return
    
    const containerRect = container.getBoundingClientRect()
    const isDesktop = window.innerWidth >= 1200
    
    slides.forEach((slide, index) => {
      const slideImage = slide.querySelector('.slide-image')
      if (!slideImage) return
      
      if (isDesktop) {
        // En desktop: forzar que cada slide sea exactamente 1/4 del contenedor
        const targetWidth = containerRect.width / 4
        
        // Forzar tamaños exactos
        slide.style.width = `${targetWidth}px`
        slide.style.minWidth = `${targetWidth}px`
        slide.style.maxWidth = `${targetWidth}px`
        slide.style.flex = `0 0 ${targetWidth}px`
        slide.style.margin = '0'
        slide.style.padding = '0'
        
        // Hacer la imagen perfectamente cuadrada
        slideImage.style.width = '100%'
        slideImage.style.height = '0'
        slideImage.style.paddingBottom = '100%'
        slideImage.style.margin = '0'
        slideImage.style.border = 'none'
        slideImage.style.borderRadius = '0'
        
        console.log(`🔲 Slide ${index}: ${targetWidth}px x ${targetWidth}px`)
      }
    })
    
    // Verificar resultado
    setTimeout(() => {
      console.log('🔍 Verificando resultado del force layout...')
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect()
        const imageRect = slide.querySelector('.slide-image')?.getBoundingClientRect()
        
        if (imageRect) {
          const isSquare = Math.abs(imageRect.width - imageRect.height) < 2
          console.log(`📦 Slide ${index}: ${imageRect.width.toFixed(1)}x${imageRect.height.toFixed(1)} - Cuadrado: ${isSquare ? '✅' : '❌'}`)
        }
      })
    }, 100)
  }

  // Función para verificar que las cards sean cuadradas y sin espacios
  const verifyDesktopLayout = () => {
    if (window.innerWidth >= 1200 && state.swiper) {
      console.log('🖥️ Verificando layout de 4 cards cuadradas sin espacios...')
      
      const slides = state.swiper.slides
      const visibleSlides = state.swiper.slidesPerViewDynamic()
      const containerWidth = state.swiper.width
      
      console.log(`📊 Slides totales: ${slides.length}`)
      console.log(`👁️ Slides visibles: ${visibleSlides}`)
      console.log(`📏 Ancho contenedor: ${containerWidth}px`)
      console.log(`🔄 Loop: ${state.swiper.params.loop}`)
      console.log(`🎯 Slide activo: ${state.swiper.activeIndex}`)
      
      // Verificar cada slide visible
      if (slides.length >= 4) {
        for (let i = 0; i < Math.min(4, slides.length); i++) {
          const slide = slides[i]
          const slideRect = slide.getBoundingClientRect()
          const slideImage = slide.querySelector('.slide-image')
          const imageRect = slideImage ? slideImage.getBoundingClientRect() : null
          
          console.log(`📦 Slide ${i}:`)
          console.log(`  - Ancho: ${slideRect.width}px`)
          console.log(`  - Alto: ${slideRect.height}px`)
          console.log(`  - Es cuadrado: ${Math.abs(slideRect.width - slideRect.height) < 5 ? '✅' : '❌'}`)
          
          if (imageRect) {
            console.log(`  - Imagen ancho: ${imageRect.width}px`)
            console.log(`  - Imagen alto: ${imageRect.height}px`)
            console.log(`  - Imagen cuadrada: ${Math.abs(imageRect.width - imageRect.height) < 5 ? '✅' : '❌'}`)
          }
          
          if (i > 0) {
            const prevSlide = slides[i - 1]
            const prevRect = prevSlide.getBoundingClientRect()
            const gap = slideRect.left - (prevRect.left + prevRect.width)
            console.log(`  - Espacio con anterior: ${gap}px ${gap === 0 ? '✅' : '❌'}`)
          }
        }
      }
      
      // Verificar proporción total
      const expectedWidth = containerWidth / 4
      console.log(`📐 Ancho esperado por slide: ${expectedWidth}px`)
      
      if (visibleSlides < 4) {
        console.log('⚠️ No se están mostrando 4 cards, forzando actualización...')
        
        // Forzar configuración exacta
        state.swiper.params.slidesPerView = 4
        state.swiper.params.spaceBetween = 0
        state.swiper.params.centeredSlides = false
        state.swiper.update()
        
        console.log('🔄 Swiper actualizado para mostrar 4 cards sin espacios')
        
        // Verificar nuevamente después de 500ms
        setTimeout(() => {
          console.log('🔄 Re-verificando después de actualización...')
          verifyDesktopLayout()
        }, 500)
      } else {
        console.log('✅ Layout de 4 cards confirmado')
        
        // Verificar que no hay espacios CSS
        const wrapper = document.querySelector('.swiper-wrapper')
        if (wrapper) {
          const wrapperStyle = getComputedStyle(wrapper)
          console.log(`📏 Wrapper gap: ${wrapperStyle.gap}`)
          console.log(`📏 Wrapper margin: ${wrapperStyle.margin}`)
          console.log(`📏 Wrapper padding: ${wrapperStyle.padding}`)
        }
      }
    }
  }

  const initSwiper = async () => {
    try {
      console.log('🚀 Iniciando Swiper...')
      
      // Asegurar que las cards sean visibles
      if (!ensureCardsVisible()) {
        throw new Error('No se encontraron cards para mostrar')
      }

      // Esperar a que Swiper esté disponible
      await waitForSwiper()

      // Destruir instancia existente si existe
      if (state.swiper) {
        console.log('🗑️ Destruyendo instancia anterior de Swiper')
        state.swiper.destroy(true, true)
      }

      const container = document.querySelector('.carousel-container')
      if (!container) {
        throw new Error('Contenedor del carrusel no encontrado')
      }

      console.log('⚙️ Configurando Swiper...')
      
      state.swiper = new window.Swiper('.carousel-container', {
        // Configuración básica - CERO ESPACIOS entre cards
        slidesPerView: 1,
        spaceBetween: 0, // CERO espacios
        loop: true,
        grabCursor: true,
        centeredSlides: false,
        allowTouchMove: true,
        
        // Efectos y transiciones
        effect: 'slide',
        speed: 600,
        
        // Configuración responsive - PERFECTAMENTE SIN ESPACIOS
        breakpoints: {
          // Tablet - 2 cards EXACTAS sin espacios
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
            centeredSlides: false
          },
          // Desktop pequeño - 3 cards EXACTAS sin espacios
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
            centeredSlides: false
          },
          // Desktop grande - 4 cards PERFECTAS sin espacios
          1200: {
            slidesPerView: 4,
            spaceBetween: 0,
            centeredSlides: false,
            slidesPerGroup: 1 // Mover de uno en uno
          }
        },

        // Navegación - IDs específicos para evitar conflictos
        navigation: {
          nextEl: '#carousel-next',
          prevEl: '#carousel-prev',
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden'
        },

        // Paginación
        pagination: {
          el: '#carousel-indicators',
          clickable: true,
          bulletClass: 'indicator',
          bulletActiveClass: 'active',
          renderBullet: function (index, className) {
            return `<button class="${className}" data-indicator-index="${index}"></button>`
          }
        },

        // Eventos
        on: {
          init: function() {
            console.log('✅ Swiper inicializado correctamente')
            console.log(`📱 Slides visibles: ${this.slidesPerViewDynamic()}`)
            console.log(`📏 Ancho del contenedor: ${this.width}px`)
            console.log(`🔄 Loop: ${this.params.loop}`)
            console.log(`🎯 Slide inicial: ${this.activeIndex}`)
            
            state.activeIndex = this.realIndex
            updateModalContent()
            
            // Asegurar que las cards sean visibles después de init
            setTimeout(() => {
              ensureCardsVisible()
              this.update() // Forzar actualización de Swiper
              verifyDesktopLayout() // Verificar layout de desktop
              
              // Test navegación
              setTimeout(() => {
                console.log('🧪 Testing navegación...')
                console.log(`🔘 Botón siguiente disponible: ${this.navigation.nextEl ? 'Sí' : 'No'}`)
                console.log(`🔘 Botón anterior disponible: ${this.navigation.prevEl ? 'Sí' : 'No'}`)
              }, 500)
            }, 100)
          },
          
          slideChange: function() {
            console.log(`📱 Slide cambiado de ${state.activeIndex} a ${this.realIndex}`)
            state.activeIndex = this.realIndex
            updateModalContent()
          },
          
          slideChangeTransitionStart: function() {
            console.log('🔄 Transición iniciada')
          },
          
          slideChangeTransitionEnd: function() {
            console.log('✅ Transición completada')
          },
          
          breakpoint: function(swiper, breakpointParams) {
            console.log('📏 Breakpoint cambiado:', breakpointParams)
            console.log(`📱 Nuevos slides visibles: ${breakpointParams.slidesPerView}`)
          },
          
          resize: function() {
            console.log('📐 Swiper redimensionado')
            this.update()
            
            // Verificar y forzar layout después de resize
            setTimeout(() => {
              verifyDesktopLayout()
              forceSquareLayout()
            }, 100)
            
            // Segunda verificación 
            setTimeout(() => {
              forceSquareLayout()
            }, 300)
          },
          
          click: function(swiper, event) {
            const clickedSlide = event.target.closest('.carousel-slide')
            if (clickedSlide) {
              const slideIndex = parseInt(clickedSlide.dataset.slideIndex)
              console.log(`👆 Click en slide: ${slideIndex}`)
              openModal(slideIndex)
            }
          },

          beforeDestroy: function() {
            console.log('🗑️ Swiper será destruido')
          }
        }
      })

      // Test manual de navegación después de la inicialización
      setTimeout(() => {
        console.log('🧪 Probando navegación manual...')
        const nextBtn = document.querySelector('#carousel-next')
        const prevBtn = document.querySelector('#carousel-prev')
        
        if (nextBtn && prevBtn) {
          console.log('✅ Botones de navegación encontrados')
          
          // Agregar eventos click manuales como respaldo
          nextBtn.addEventListener('click', () => {
            console.log('🔘 Click manual en botón siguiente')
            if (state.swiper) {
              state.swiper.slideNext()
            }
          })
          
          prevBtn.addEventListener('click', () => {
            console.log('🔘 Click manual en botón anterior')
            if (state.swiper) {
              state.swiper.slidePrev()
            }
          })
        } else {
          console.error('❌ Botones de navegación no encontrados')
        }
      }, 1000)

      console.log('🎉 Swiper configurado exitosamente')
      return true

    } catch (error) {
      console.error('❌ Error inicializando Swiper:', error)
      
      // Fallback: asegurar que al menos las cards sean visibles
      ensureCardsVisible()
      return false
    }
  }

  const loadSwiper = () => {
    return new Promise((resolve, reject) => {
      if (window.Swiper) {
        resolve()
        return
      }

      console.log('📦 Cargando Swiper desde CDN...')

      // Cargar CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      document.head.appendChild(link)

      // Cargar JS
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
      const nextIndex = state.swiper.realIndex
      state.selectedSlideIndex = nextIndex
      renderModalContent()
    } else if (direction === 'down') {
      console.log('⬇️ Swipe down en modal - slide anterior')
      state.swiper.slidePrev()
      const prevIndex = state.swiper.realIndex
      state.selectedSlideIndex = prevIndex
      renderModalContent()
    }
  }

  // Funciones del modal (mantener del script original)
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
  }

  const init = async () => {
    if (state.isInitialized) {
      console.log('⚠️ Ya inicializado, saltando...')
      return
    }
    
    console.log('🔄 Iniciando carrusel...')
    
    const checkDOM = async () => {
      const container = document.querySelector('.carousel-container')
      const slides = document.querySelectorAll('.carousel-slide')
      
      if (container && slides.length > 0) {
        console.log(`✅ DOM listo - encontrados ${slides.length} slides`)
        
        // Asegurar visibilidad inicial
        ensureCardsVisible()
        
        // Vincular eventos básicos
        bindEvents()
        
        try {
          // Cargar e inicializar Swiper
          if (!window.Swiper) {
            await loadSwiper()
          }
          
          const success = await initSwiper()
          if (success) {
            state.isInitialized = true
            console.log('🎉 Carrusel inicializado exitosamente')
          } else {
            console.log('⚠️ Swiper falló, pero cards están visibles')
          }
          
        } catch (error) {
          console.error('❌ Error en inicialización:', error)
          // Asegurar que las cards sean visibles como fallback
          ensureCardsVisible()
        }
        
      } else {
        console.log('⏳ Esperando DOM...')
        setTimeout(checkDOM, 100)
      }
    }
    
    await checkDOM()
  }

  const cleanup = () => {
    console.log('🧹 Limpiando carrusel...')
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
    init
  }
}

export default createCarouselManager