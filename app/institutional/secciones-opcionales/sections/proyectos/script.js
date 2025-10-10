/**
 * Proyectos Destacados - Sistema integral inspirado en VideoDoctorado
 * Controla carrusel, modales y videos con inicialización segura para Liferay.
 */

import { CarouselSystem } from './modules/carousel-system.js'
import { VideoSystem } from './modules/video-system.js'
import { ModalSystem } from './components/project-modal/system.js'

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
    this.videoSystem = new VideoSystem()
    this.modalSystem = new ModalSystem(this.videoSystem)

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

  initializeModal() {
    try {
      this.modalSystem.init()
      return true
    } catch (error) {
      window.Logger?.error?.('[Proyectos] Error inicializando ModalSystem:', error)
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
      this.initializeModal()

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

    try {
      this.modalSystem?.destroy?.()
    } catch (error) {
      window.Logger?.warning?.('[Proyectos] Error al destruir ModalSystem:', error)
    }

    try {
      this.videoSystem?.destroy?.()
    } catch (error) {
      window.Logger?.warning?.('[Proyectos] Error al destruir VideoSystem:', error)
    }

    this.initialized = false

    if (typeof window !== 'undefined') {
      window.proyectosSystemInitialized = false
    }
  }

  ensureModalReady() {
    if (!this.modalSystem?.isInitialized) {
      this.initializeModal()
    }
  }

  openModal(slideIndex) {
    if (!this.initialized && !this.pendingInitialization) {
      this.init()
    }

    this.ensureModalReady()
    this.modalSystem?.openModal?.(slideIndex)
  }

  closeModal(event) {
    this.modalSystem?.closeModal?.(event)
  }

  getStatus() {
    return {
      initialized: this.initialized,
      carousel: {
        initialized: Boolean(this.carouselSystem?.swiper),
        currentSlide: this.carouselSystem?.swiper?.activeIndex || 0,
        totalSlides: this.carouselSystem?.swiper?.slides?.length || 0
      },
      modal: {
        initialized: this.modalSystem?.isInitialized || false
      },
      video: {
        apiReady: this.videoSystem?.isYouTubeAPIReady || false,
        loadedPlayers: this.videoSystem?.youtubePlayersRegistry?.size || 0
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
    window.openCarouselModal = slideIndex => proyectosSystem.openModal(slideIndex)
    window.closeCarouselModal = event => proyectosSystem.closeModal(event)
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
