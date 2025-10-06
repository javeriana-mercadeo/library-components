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
    reducedMotionClass: 'reduced-motion',
    hoverSpeedClass: 'hover-slower'
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
