export default () => {
  // Control de instancia global
  if (window.studentSliderInstance) {
    window.studentSliderInstance.cleanup()
    window.studentSliderInstance = null
  }

  let sliderState = {
    currentSlide: 0,
    autoSlideInterval: null,
    studentsCount: 0,
    isManualNavigation: false,
    manualNavigationTimeout: null,
    isInitialized: false
  }

  const initializeSlider = () => {
    console.log('🚀 Iniciando Student Slider...')
    
    const sliderContainer = document.querySelector('#student-slider')
    if (!sliderContainer) {
      console.warn('Elemento #student-slider no encontrado')
      return
    }

    const cards = document.querySelectorAll('.student-card')
    sliderState.studentsCount = cards.length

    if (sliderState.studentsCount === 0) {
      console.error('No se encontraron tarjetas de estudiantes')
      return
    }

    console.log(`✅ Slider encontrado con ${sliderState.studentsCount} estudiantes`)

    // Funciones del slider
    const getNextSlide = (current, total) => (current + 1) % total
    const getPrevSlide = (current, total) => current === 0 ? total - 1 : current - 1

    const getSlideClass = (index, current, total) => {
      if (index === current) return 'active'
      
      const nextIndex = (current + 1) % total
      const prevIndex = (current - 1 + total) % total
      const nextNextIndex = (current + 2) % total
      const prevPrevIndex = (current - 2 + total) % total

      if (index === nextIndex) return 'next'
      if (index === prevIndex) return 'prev'
      if (index === nextNextIndex) return 'next-next'
      if (index === prevPrevIndex) return 'prev-prev'
      
      return ''
    }

    const updateSlideClasses = () => {
      if (!sliderState.isInitialized) return
      
      try {
        const cards = document.querySelectorAll('.student-card')
        const dots = document.querySelectorAll('.slider-dots .dot')

        cards.forEach((card, index) => {
          card.classList.remove('active', 'next', 'prev', 'next-next', 'prev-prev')
          const slideClass = getSlideClass(index, sliderState.currentSlide, sliderState.studentsCount)
          if (slideClass) {
            card.classList.add(slideClass)
          }
          void card.offsetHeight // Forzar reflow
        })

        dots.forEach((dot, index) => {
          if (dot) {
            dot.classList.toggle('active', index === sliderState.currentSlide)
          }
        })
        
        console.log(`🔄 Slide actualizado: ${sliderState.currentSlide + 1}/${sliderState.studentsCount}`)
      } catch (error) {
        console.error('Error actualizando slides:', error)
      }
    }

    const handleManualNavigation = () => {
      sliderState.isManualNavigation = true
      stopAutoSlide()
      
      if (sliderState.manualNavigationTimeout) {
        clearTimeout(sliderState.manualNavigationTimeout)
      }
      
      sliderState.manualNavigationTimeout = setTimeout(() => {
        sliderState.isManualNavigation = false
        startAutoSlide()
      }, 5000)
    }

    const nextSlide = (isManual = false) => {
      if (!sliderState.isInitialized) return
      
      if (isManual) {
        handleManualNavigation()
      } else if (sliderState.isManualNavigation) {
        return
      }
      
      sliderState.currentSlide = getNextSlide(sliderState.currentSlide, sliderState.studentsCount)
      updateSlideClasses()
    }

    const prevSlide = (isManual = false) => {
      if (!sliderState.isInitialized) return
      
      if (isManual) {
        handleManualNavigation()
      } else if (sliderState.isManualNavigation) {
        return
      }
      
      sliderState.currentSlide = getPrevSlide(sliderState.currentSlide, sliderState.studentsCount)
      updateSlideClasses()
    }

    const goToSlide = (index, isManual = false) => {
      if (!sliderState.isInitialized || index === sliderState.currentSlide) return
      
      if (isManual) {
        handleManualNavigation()
      } else if (sliderState.isManualNavigation) {
        return
      }
      
      sliderState.currentSlide = index
      updateSlideClasses()
    }

    const startAutoSlide = () => {
      if (sliderState.isManualNavigation || !sliderState.isInitialized) return
      
      stopAutoSlide()
      sliderState.autoSlideInterval = setInterval(() => {
        nextSlide(false)
      }, 5000)
      
      console.log('▶️ Auto-slide iniciado')
    }

    const stopAutoSlide = () => {
      if (sliderState.autoSlideInterval) {
        clearInterval(sliderState.autoSlideInterval)
        sliderState.autoSlideInterval = null
      }
    }

    // Configurar controles
    const setupControls = () => {
      const prevButton = document.querySelector('#student-slider-prev')
      const nextButton = document.querySelector('#student-slider-next')
      
      if (prevButton && nextButton) {
        // Limpiar listeners anteriores
        prevButton.onclick = null
        nextButton.onclick = null
        
        prevButton.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          prevSlide(true)
        })

        nextButton.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          nextSlide(true)
        })
        
        console.log('✅ Controles configurados')
      }

      // Configurar dots
      const dots = document.querySelectorAll('.slider-dots .dot')
      dots.forEach((dot, index) => {
        dot.onclick = null
        dot.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          goToSlide(index, true)
        })
      })
      
      if (dots.length > 0) {
        console.log(`✅ ${dots.length} dots configurados`)
      }
    }

    // Configurar eventos globales
    const setupGlobalEvents = () => {
      const sliderContent = document.querySelector('#student-slider-content')
      if (sliderContent) {
        sliderContent.addEventListener('mouseenter', stopAutoSlide)
        sliderContent.addEventListener('mouseleave', () => {
          if (!sliderState.isManualNavigation && sliderState.isInitialized) {
            startAutoSlide()
          }
        })
      }

      // Navegación por teclado
      const handleKeydown = (e) => {
        const sliderRect = sliderContainer.getBoundingClientRect()
        const isVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0
        
        if (!isVisible) return
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevSlide(true)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextSlide(true)
        }
      }

      document.addEventListener('keydown', handleKeydown)
      sliderState.keydownHandler = handleKeydown

      // Visibilidad de la página
      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopAutoSlide()
          if (sliderState.manualNavigationTimeout) {
            clearTimeout(sliderState.manualNavigationTimeout)
          }
        } else if (!sliderState.isManualNavigation && sliderState.isInitialized) {
          startAutoSlide()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      sliderState.visibilityHandler = handleVisibilityChange
    }

    // Ejecutar configuración
    setupControls()
    setupGlobalEvents()

    // Marcar como inicializado
    sliderState.isInitialized = true

    // Inicializar estado visual
    updateSlideClasses()

    // Iniciar auto-slide después de un delay
    setTimeout(() => {
      if (sliderState.isInitialized) {
        startAutoSlide()
      }
    }, 1000)

    console.log('🎉 Student Slider inicializado correctamente')

    // Función de limpieza
    const cleanup = () => {
      try {
        console.log('🧹 Limpiando slider...')
        
        sliderState.isInitialized = false
        stopAutoSlide()
        
        if (sliderState.manualNavigationTimeout) {
          clearTimeout(sliderState.manualNavigationTimeout)
        }

        if (sliderState.keydownHandler) {
          document.removeEventListener('keydown', sliderState.keydownHandler)
        }

        if (sliderState.visibilityHandler) {
          document.removeEventListener('visibilitychange', sliderState.visibilityHandler)
        }

        console.log('✅ Limpieza completada')
      } catch (error) {
        console.error('Error en limpieza:', error)
      }
    }

    // Guardar instancia global
    window.studentSliderInstance = { cleanup, sliderState }

    return cleanup
  }

  // Función de verificación e inicialización (igual al ejemplo)
  const checkAndInit = () => {
    if (typeof window !== 'undefined') {
      // Verificar que el DOM esté listo
      const slider = document.querySelector('#student-slider')
      const cards = document.querySelectorAll('.student-card')
      
      if (slider && cards.length > 0) {
        initializeSlider()
      } else {
        console.log('🔍 Esperando elementos del slider...')
        setTimeout(checkAndInit, 300)
      }
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  // Inicializar usando el mismo patrón del ejemplo
  checkAndInit()

  // Manejo de resize igual al ejemplo
  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.studentSliderInstance && window.studentSliderInstance.sliderState.isInitialized) {
        // Re-calcular posiciones si es necesario
        const cards = document.querySelectorAll('.student-card')
        if (cards.length > 0) {
          console.log('🔄 Actualizando slider después de resize')
        }
      }
    }, 250)
  })
}