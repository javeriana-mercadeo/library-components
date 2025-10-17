/**
 * Proyectos Destacados - Sistema de inicialización del carousel
 * Los modales se manejan automáticamente con el Modal component de @library
 */

import { CarouselSystem } from './modules/carousel-system.js'

const runWhenIdle = (callback, timeout = 2000) => {
  if (typeof window === 'undefined') return

  if (window.TimingUtils?.runWhenIdle) {
    window.TimingUtils.runWhenIdle(callback, timeout)
    return
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(callback, { timeout })
    return
  }

  setTimeout(callback, timeout)
}

class ProyectosSystem {
  constructor() {
    this.carouselSystem = new CarouselSystem()
    this.config = {
      idleTimeout: 1000
    }
    this.initialized = false
    this.pendingInitialization = false
    this.destroyed = false
  }

  initializeCarousel() {
    try {
      const initialized = this.carouselSystem.init()
      if (!initialized) {
        window.Logger?.warning?.('[Proyectos] El carrusel aún no está listo, se reintentará desde el módulo.')
      }
      return initialized
    } catch (error) {
      window.Logger?.error?.('[Proyectos] Error inicializando CarouselSystem:', error)
      return false
    }
  }

  init() {
    if (this.initialized || this.pendingInitialization) {
      return
    }

    this.destroyed = false
    this.pendingInitialization = true

    runWhenIdle(() => {
      this.pendingInitialization = false

      if (this.destroyed) {
        window.Logger?.warning?.('[Proyectos] Inicialización cancelada antes de completarse.')
        return
      }

      this.initializeCarousel()

      this.initialized = true

      if (typeof window !== 'undefined') {
        window.proyectosSystemInitialized = true
      }
    }, this.config.idleTimeout)
  }

  destroy() {
    this.destroyed = true
    this.pendingInitialization = false

    try {
      this.carouselSystem?.destroy?.()
    } catch (error) {
      window.Logger?.warning?.('[Proyectos] Error al destruir CarouselSystem:', error)
    }

    this.initialized = false

    if (typeof window !== 'undefined') {
      window.proyectosSystemInitialized = false
    }
  }

  getStatus() {
    return {
      initialized: this.initialized,
      carousel: {
        initialized: Boolean(this.carouselSystem?.swiper),
        currentSlide: this.carouselSystem?.swiper?.activeIndex || 0,
        totalSlides: this.carouselSystem?.swiper?.slides?.length || 0
      }
    }
  }
}

function initProyectosModule() {
  const proyectosSystem = new ProyectosSystem()

  const initialize = () => {
    try {
      proyectosSystem.init()
    } catch (error) {
      window.Logger?.error?.('[Proyectos] Error durante la inicialización:', error)
    }
  }

  const destroy = () => {
    try {
      proyectosSystem.destroy()
    } catch (error) {
      window.Logger?.error?.('[Proyectos] Error durante la destrucción:', error)
    }
  }

  const getStatus = () => proyectosSystem.getStatus()

  if (typeof window !== 'undefined') {
    window.initializeProyectosSection = initialize
    window.destroyProyectosSection = destroy
    window.getProyectosSystemStatus = getStatus
    window.ProyectosSystem = ProyectosSystem

    window.addEventListener('beforeunload', destroy, { once: true })
  }

  initialize()
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProyectosModule)
  } else {
    initProyectosModule()
  }
}

export { ProyectosSystem, initProyectosModule as default }
