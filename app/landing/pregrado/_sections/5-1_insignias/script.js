// ===========================================
// CARRUSEL INFINITO - SCRIPT COMPLEMENTARIO
// ===========================================
// Este script es 100% opcional y solo agrega funcionalidades extra
// El carrusel funciona completamente con CSS puro sin necesidad de JavaScript

;(function () {
  'use strict'

  // ===========================================
  // CONFIGURACIÓN
  // ===========================================
  const CONFIG = {
    componentSelector: '[data-component="insignias-carousel"]',
    trackSelector: '.carousel-track',
    wrapperSelector: '.carousel-wrapper',
    scrollContainerSelector: '.carousel-scroll-container',
    reducedMotionClass: 'reduced-motion',
    hoverSpeedClass: 'hover-slower',
    draggingClass: 'is-dragging',
    dragGrabbingClass: 'is-grabbing'
  }

  // ===========================================
  // INICIALIZACIÓN
  // ===========================================
  const init = () => {
    const carousel = document.querySelector(CONFIG.componentSelector)
    if (!carousel) return

    // 🎯 Detectar preferencia de animación reducida
    handleReducedMotion(carousel)

    // 🎨 Agregar funcionalidades opcionales
    addAccessibilityFeatures(carousel)

    // 🖱️ Agregar drag-to-scroll
    initDragToScroll(carousel)

    // 📊 Optional: Analytics tracking (descomentarear si se necesita)
    // trackCarouselInteraction(carousel)

    console.log('✅ Carrusel de insignias inicializado correctamente')
  }

  // ===========================================
  // MANEJO DE ANIMACIÓN REDUCIDA
  // ===========================================
  const handleReducedMotion = carousel => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const applyReducedMotion = () => {
      if (prefersReducedMotion.matches) {
        carousel.classList.add(CONFIG.reducedMotionClass)
        console.log('⏸️ Animación reducida aplicada por preferencia del usuario')
      } else {
        carousel.classList.remove(CONFIG.reducedMotionClass)
      }
    }

    // Aplicar al cargar
    applyReducedMotion()

    // Escuchar cambios en preferencias
    prefersReducedMotion.addEventListener('change', applyReducedMotion)
  }

  // ===========================================
  // CARACTERÍSTICAS DE ACCESIBILIDAD
  // ===========================================
  const addAccessibilityFeatures = carousel => {
    const track = carousel.querySelector(CONFIG.trackSelector)
    if (!track) return

    // 🎹 Permitir pausar con teclado (Espacio o Escape)
    document.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Escape') {
        if (document.activeElement && document.activeElement.closest(CONFIG.componentSelector)) {
          e.preventDefault()
          track.classList.toggle('paused')

          // Feedback visual y de accesibilidad
          const isPaused = track.classList.contains('paused')
          console.log(isPaused ? '⏸️ Carrusel pausado' : '▶️ Carrusel reanudado')

          // Actualizar aria-live para lectores de pantalla
          carousel.setAttribute('aria-live', isPaused ? 'polite' : 'off')
        }
      }
    })

    // 🖱️ Pausar al hacer foco en cualquier elemento del carrusel
    const carouselItems = carousel.querySelectorAll('.carousel-item')
    carouselItems.forEach(item => {
      item.addEventListener('focus', () => {
        track.classList.add('paused')
      })

      item.addEventListener('blur', () => {
        track.classList.remove('paused')
      })
    })
  }

  // ===========================================
  // DRAG-TO-SCROLL FUNCIONALIDAD
  // ===========================================
  const initDragToScroll = carousel => {
    const scrollContainer = carousel.querySelector(CONFIG.scrollContainerSelector)
    const track = carousel.querySelector(CONFIG.trackSelector)
    if (!scrollContainer || !track) return

    let isDragging = false
    let startX = 0
    let currentTranslate = 0
    let previousTranslate = 0
    let velocity = 0
    let lastX = 0
    let lastTime = Date.now()
    let animationFrame = null

    // 🎯 Obtener la posición actual del transform
    const getCurrentTransform = () => {
      const style = window.getComputedStyle(track)
      const matrix = new DOMMatrix(style.transform)
      return matrix.m41 // translateX value
    }

    // 🖱️ Inicio del arrastre (mousedown)
    const handleMouseDown = e => {
      // Prevenir drag en modo reduced-motion
      if (carousel.classList.contains(CONFIG.reducedMotionClass)) return

      isDragging = true
      startX = e.pageX

      // Capturar la posición actual de la animación
      previousTranslate = getCurrentTransform()
      currentTranslate = previousTranslate

      lastX = e.pageX
      lastTime = Date.now()
      velocity = 0

      // Cambiar cursor y pausar animación
      scrollContainer.classList.add(CONFIG.dragGrabbingClass)
      track.classList.add('paused')

      // Fijar la posición actual
      track.style.transform = `translateX(${currentTranslate}px)`

      // Prevenir selección de texto
      e.preventDefault()
    }

    // 🖱️ Movimiento del arrastre (mousemove)
    const handleMouseMove = e => {
      if (!isDragging) return

      e.preventDefault()

      const x = e.pageX
      const walk = x - startX
      currentTranslate = previousTranslate + walk

      // Aplicar transform directamente
      track.style.transform = `translateX(${currentTranslate}px)`

      // Calcular velocidad para momentum
      const now = Date.now()
      const dt = now - lastTime
      if (dt > 0) {
        velocity = (x - lastX) / dt
      }
      lastX = x
      lastTime = now
    }

    // 🖱️ Fin del arrastre (mouseup)
    const handleMouseUp = () => {
      if (!isDragging) return

      isDragging = false
      scrollContainer.classList.remove(CONFIG.dragGrabbingClass)

      // Aplicar momentum (inercia)
      applyMomentum()
    }

    // 🚀 Aplicar inercia al soltar
    const applyMomentum = () => {
      const friction = 0.95
      const minVelocity = 0.5

      const step = () => {
        if (Math.abs(velocity) > minVelocity) {
          currentTranslate += velocity * 16 // ~60fps
          track.style.transform = `translateX(${currentTranslate}px)`
          velocity *= friction
          animationFrame = requestAnimationFrame(step)
        } else {
          // Terminar momentum y reanudar animación automática
          if (animationFrame) {
            cancelAnimationFrame(animationFrame)
          }
          // Remover transform manual para que CSS animation tome control
          track.style.transform = ''
          track.classList.remove('paused')
        }
      }

      if (Math.abs(velocity) > minVelocity) {
        step()
      } else {
        // Remover transform manual para que CSS animation tome control
        track.style.transform = ''
        track.classList.remove('paused')
      }
    }

    // 🖱️ Cancelar arrastre si el cursor sale del área
    const handleMouseLeave = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }

    // 🎯 Prevenir clicks accidentales después de arrastrar
    const handleClick = e => {
      if (Math.abs(velocity) > 1) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // 📱 Soporte táctil (touch events)
    const handleTouchStart = e => {
      if (carousel.classList.contains(CONFIG.reducedMotionClass)) return

      isDragging = true
      startX = e.touches[0].pageX

      // Capturar la posición actual de la animación
      previousTranslate = getCurrentTransform()
      currentTranslate = previousTranslate

      lastX = e.touches[0].pageX
      lastTime = Date.now()
      velocity = 0

      track.classList.add('paused')
      track.style.transform = `translateX(${currentTranslate}px)`
    }

    const handleTouchMove = e => {
      if (!isDragging) return

      const x = e.touches[0].pageX
      const walk = x - startX
      currentTranslate = previousTranslate + walk

      // Aplicar transform directamente
      track.style.transform = `translateX(${currentTranslate}px)`

      const now = Date.now()
      const dt = now - lastTime
      if (dt > 0) {
        velocity = (x - lastX) / dt
      }
      lastX = x
      lastTime = now
    }

    const handleTouchEnd = () => {
      if (!isDragging) return

      isDragging = false
      applyMomentum()
    }

    // 🎨 Agregar clase de cursor grab al scroll container
    scrollContainer.classList.add('draggable')

    // 🔗 Vincular eventos
    scrollContainer.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)
    scrollContainer.addEventListener('click', handleClick, true)

    // Touch events
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true })
    scrollContainer.addEventListener('touchend', handleTouchEnd)

    console.log('🖱️ Drag-to-scroll habilitado')
  }

  // ===========================================
  // ANALYTICS (OPCIONAL)
  // ===========================================
  const trackCarouselInteraction = carousel => {
    // Descomenta si usas Google Analytics, Mixpanel, etc.
    /*
    const items = carousel.querySelectorAll('.carousel-item')

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Ejemplo con Google Analytics 4
        if (typeof gtag !== 'undefined') {
          gtag('event', 'carousel_click', {
            item_name: item.querySelector('img')?.alt || 'unknown',
            item_position: index + 1
          })
        }

        console.log(`📊 Click en item: ${index + 1}`)
      })
    })
    */
  }

  // ===========================================
  // AUTO-INICIALIZACIÓN
  // ===========================================
  // Se ejecuta automáticamente cuando el DOM está listo
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init)
    } else {
      // DOM ya está listo
      init()
    }
  }
})()

// ===========================================
// EXPORTAR PARA USO EN MÓDULOS ES6
// ===========================================
export default () => {
  // Este export es solo para compatibilidad con el import en index.jsx
  // El script se auto-ejecuta mediante la IIFE de arriba
  console.log('📦 Script de carrusel cargado como módulo')
}
