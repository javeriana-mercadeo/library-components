// ===========================================
// PERIODICITY OBSERVER MODULE
// ===========================================

/**
 * Módulo para observar y mantener elementos con data-puj-periodicity="true" en minúscula
 * Usa MutationObserver y verificación periódica para asegurar que el primer carácter sea minúscula
 */

class PeriodicityObserver {
  constructor() {
    this.state = {
      periodicityObserver: null,
      intervalId: null
    }

    this.scheduler = TimingUtils.createScheduler()
    this.logger = Logger

    // Selector para elementos que deben mantener la primera letra en minúscula
    this.targetSelector = '[data-puj-periodicity="true"]'
  }

  /**
   * Inicializar el observador de periodicidad
   */
  init() {
    // Limpiar observador previo si existe
    this.cleanup()

    // Aplicar lowercase inicial a todos los elementos existentes
    this.applyLowercaseToAll()

    // Configurar MutationObserver para cambios en el DOM
    this.setupMutationObserver()

    // Configurar verificación periódica como respaldo
    this.setupPeriodicCheck()
  }

  /**
   * Aplicar lowercase a todos los elementos existentes
   */
  applyLowercaseToAll() {
    const elements = document.querySelectorAll(this.targetSelector)

    elements.forEach(element => this.ensureLowercase(element))
  }

  /**
   * Configurar MutationObserver para detectar cambios en el DOM
   */
  setupMutationObserver() {
    // Usar debounce para evitar procesamiento excesivo
    const debouncedHandler = TimingUtils.debounce(mutations => {
      this.handleMutations(mutations)
    }, 100)

    this.state.periodicityObserver = new MutationObserver(debouncedHandler)

    // Configurar observación de cambios en el DOM
    this.state.periodicityObserver.observe(document.body, {
      childList: true, // Observar adición/eliminación de nodos
      subtree: true, // Observar todo el subárbol
      characterData: true // Observar cambios en el contenido de texto
    })
  }

  /**
   * Manejar mutaciones del DOM
   */
  handleMutations(mutations) {
    let hasRelevantChanges = false

    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        hasRelevantChanges = true
      }
    })

    if (hasRelevantChanges) {
      this.applyLowercaseToAll()
    }
  }

  /**
   * Configurar verificación periódica como respaldo
   */
  setupPeriodicCheck() {
    // Verificación cada 5 segundos como respaldo
    const intervalFn = () => {
      this.applyLowercaseToAll()
      this.state.intervalId = this.scheduler.schedule(intervalFn, 5000)
    }
    this.state.intervalId = this.scheduler.schedule(intervalFn, 5000)
  }

  /**
   * Asegurar que el primer carácter del elemento esté en minúscula
   */
  ensureLowercase(element) {
    if (!element || !element.textContent) return

    const currentText = element.textContent
    if (currentText.length === 0) return

    const firstChar = currentText.charAt(0)
    const firstCharLower = firstChar.toLowerCase()

    // Solo modificar si es necesario
    if (firstChar !== firstCharLower) {
      const newText = firstCharLower + currentText.slice(1)
      element.textContent = newText
    }
  }

  /**
   * Procesar elemento específico si tiene el atributo correcto
   */
  processElement(element) {
    if (element.hasAttribute && element.hasAttribute('data-puj-periodicity')) {
      const value = element.getAttribute('data-puj-periodicity')
      if (value === 'true') {
        this.ensureLowercase(element)
      }
    }

    // También procesar elementos hijos
    const childElements = element.querySelectorAll && element.querySelectorAll(this.targetSelector)
    if (childElements) {
      childElements.forEach(child => this.ensureLowercase(child))
    }
  }

  /**
   * Añadir elemento para observación
   */
  addElement(element) {
    if (!element) return

    // Si el elemento ya tiene el atributo, aplicar lowercase
    if (element.matches && element.matches(this.targetSelector)) {
      this.ensureLowercase(element)
    }

    // Procesar elementos hijos que puedan tener el atributo
    this.processElement(element)
  }

  /**
   * Pausar observación
   */
  pause() {
    if (this.state.periodicityObserver) {
      this.state.periodicityObserver.disconnect()
    }

    if (this.state.intervalId) {
      this.scheduler.cancel(this.state.intervalId)
      this.state.intervalId = null
    }
  }

  /**
   * Reanudar observación
   */
  resume() {
    if (!this.state.periodicityObserver) {
      this.setupMutationObserver()
    }

    if (!this.state.intervalId) {
      this.setupPeriodicCheck()
    }

    // Aplicar lowercase inmediatamente al reanudar
    this.applyLowercaseToAll()
  }

  /**
   * Verificar si el observador está activo
   */
  isActive() {
    return this.state.periodicityObserver !== null && this.state.intervalId !== null
  }

  /**
   * Obtener estadísticas del observador
   */
  getStats() {
    const elements = document.querySelectorAll(this.targetSelector)

    return {
      isActive: this.isActive(),
      elementCount: elements.length,
      hasPeriodicCheck: this.state.intervalId !== null,
      hasMutationObserver: this.state.periodicityObserver !== null
    }
  }

  /**
   * Limpiar recursos
   */
  cleanup() {
    if (this.state.periodicityObserver) {
      this.state.periodicityObserver.disconnect()
      this.state.periodicityObserver = null
    }

    if (this.state.intervalId) {
      this.scheduler.cancel(this.state.intervalId)
      this.state.intervalId = null
    }
  }

  /**
   * Destruir completamente el observador
   */
  destroy() {
    this.cleanup()
    this.scheduler.cancelAll()
  }
}

export { PeriodicityObserver }
