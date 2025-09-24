// ===========================================
<<<<<<< HEAD
// DATOS PROGRAMA VIDEO - SCRIPT PRINCIPAL
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                       SISTEMA DE VIDEO RESPONSIVO                          █
// ███████████████████████████████████████████████████████████████████████████████

const ResponsiveVideoSystem = {
  config: {
    defaultBreakpoint: 768,
    // Parámetros optimizados para YouTube
    videoParams: {
      autoplay: '1',
      mute: '1',
      loop: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      end: '',
      enablejsapi: '0',
      hl: 'es',
      cc_lang_pref: 'es'
    }
  },

  init() {
    try {
      const dataVideoDesktop = configuration['codeVideoDesktop'] // Tomada de liferay
      const dataVideoMobile = configuration['codeVideoMobile'] // Tomada de liferay

      // Buscar contenedores de video responsivo
      const videoContainers = document.querySelectorAll('.program-data_media[data-video-mobile][data-video-desktop]')

      if (!dataVideoDesktop && !dataVideoMobile) {
        Logger.warning('no se encontraron videos configurados')
      }

      if (videoContainers.length === 0) {
        Logger.warning('No se encontraron videos para cargar')
        return false
      }

      // Inicializar cada contenedor
      videoContainers.forEach(container => {
        this.initializeResponsiveVideo(container, dataVideoMobile, dataVideoDesktop)
      })

      // Setup responsive listener
      this.setupResponsiveListener()
      return true
    } catch (error) {
      console.warn(error.message)
    }
  },

  initializeResponsiveVideo(container, dataVideoMobile, dataVideoDesktop) {
    const mobileVideoId = dataVideoMobile || container.dataset.videoMobile
    const desktopVideoId = dataVideoDesktop || container.dataset.videoDesktop
    const breakpoint = parseInt(container.dataset.breakpoint) || this.config.defaultBreakpoint

    if (!mobileVideoId || !desktopVideoId) {
      Logger.warning('Videos mobile/desktop no configurados', { mobileVideoId, desktopVideoId })
      return
    }

    // Limpiar contenedor
    container.innerHTML = ''

    // Crear ambos iframes
    const mobileIframe = this.createVideoIframe(mobileVideoId, 'mobile')
    const desktopIframe = this.createVideoIframe(desktopVideoId, 'desktop')

    // Agregar al DOM
    container.appendChild(mobileIframe)
    container.appendChild(desktopIframe)

    // Configurar visibilidad inicial
    this.updateVideoVisibility(container, breakpoint)

    // Marcar como listo
    container.classList.add('responsive-video-ready')
    container.setAttribute('data-breakpoint', breakpoint)
  },

  createVideoIframe(videoId, type) {
    const iframe = document.createElement('iframe')

    // Parámetros con playlist para loop
    const params = { ...this.config.videoParams, playlist: videoId }
    const videoParams = new URLSearchParams(params)
    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    // Configurar iframe
    iframe.src = videoSrc
    iframe.title = `Video ${type} - ${videoId}`
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    iframe.loading = 'lazy'
    iframe.frameBorder = '0'
    iframe.className = `program-data__iframe program-data__iframe--${type}`
    iframe.setAttribute('data-video-id', videoId)
    iframe.setAttribute('data-video-type', type)

    // Event listeners
    EventManager.add(iframe, 'load', () => {
      iframe.style.opacity = '1'
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video ${type} (${videoId})`)
    })

    return iframe
  },

  updateVideoVisibility(container, breakpoint) {
    const isMobile = window.innerWidth < breakpoint
    const mobileIframe = container.querySelector('.program-data__iframe--mobile')
    const desktopIframe = container.querySelector('.program-data__iframe--desktop')

    if (!mobileIframe || !desktopIframe) return

    if (isMobile) {
      mobileIframe.style.display = 'block'
      desktopIframe.style.display = 'none'
      container.setAttribute('data-current-video', 'mobile')
    } else {
      mobileIframe.style.display = 'none'
      desktopIframe.style.display = 'block'
      container.setAttribute('data-current-video', 'desktop')
    }
  },

  setupResponsiveListener() {
    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = TimingUtils.delay(() => {
        const containers = document.querySelectorAll('.program-data_media.responsive-video-ready')

        containers.forEach(container => {
          const breakpoint = parseInt(container.getAttribute('data-breakpoint')) || this.config.defaultBreakpoint
          this.updateVideoVisibility(container, breakpoint)
        })
      }, 150)
    }

    EventManager.add(window, 'resize', handleResize)
  },

  // Función para pausar videos (optimización de batería)
  pauseAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=1')) {
        // Cambiar autoplay a 0 temporalmente
        iframe.src = currentSrc.replace('autoplay=1', 'autoplay=0')
      }
    })
  },

  // Función para reanudar videos
  resumeAllVideos() {
    const iframes = document.querySelectorAll('.program-data__iframe')
    iframes.forEach(iframe => {
      const currentSrc = iframe.src
      if (currentSrc && currentSrc.includes('autoplay=0')) {
        // Restaurar autoplay a 1
        iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1')
      }
    })
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                    SISTEMA DE FORMATEO DE DATOS                            █
// ███████████████████████████████████████████████████████████████████████████████

const DataFormatter = {
  /**
   * Capitaliza la primera letra de una cadena
   */
  capitalizeFirst(str) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  /**
   * Limpia el punto final de una fecha si existe
   */
  cleanDate(dateStr) {
    if (!dateStr) return dateStr
    return dateStr.replace(/\.$/, '') // Remover punto final
  },

  /**
   * Convierte números a palabras en español
   */
  numberToWords(number) {
    const units = [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve'
    ]

    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']

    const hundreds = [
      '',
      'ciento',
      'doscientos',
      'trescientos',
      'cuatrocientos',
      'quinientos',
      'seiscientos',
      'setecientos',
      'ochocientos',
      'novecientos'
    ]

    if (number === 0) return 'cero'
    if (number === 100) return 'cien'
    if (number === 1000) return 'mil'

    let result = ''

    // Manejo de miles
    if (number >= 1000) {
      const thousands = Math.floor(number / 1000)
      if (thousands === 1) {
        result += 'mil '
      } else {
        result += this.numberToWords(thousands) + ' mil '
      }
      number %= 1000
    }

    // Manejo de centenas
    if (number >= 100) {
      const hundredsDigit = Math.floor(number / 100)
      result += hundreds[hundredsDigit] + ' '
      number %= 100
    }

    // Manejo de unidades y decenas
    if (number >= 20) {
      const tensDigit = Math.floor(number / 10)
      const unitsDigit = number % 10
      result += tens[tensDigit]
      if (unitsDigit > 0) {
        result += ' y ' + units[unitsDigit]
      }
    } else if (number > 0) {
      result += units[number]
    }

    return result.trim()
  },

  /**
   * Convierte unidad a minúsculas y ajusta la forma según el número
   */
  formatUnit(unit, number) {
    if (!unit) return ''

    const unitLower = unit.toLowerCase()

    // Reglas de pluralización en español
    if (number === 1) {
      // Singular
      if (unitLower.endsWith('s')) {
        return unitLower.slice(0, -1) // "semestres" → "semestre"
      }
      return unitLower
    } else {
      // Plural
      if (!unitLower.endsWith('s')) {
        return unitLower + 's' // "semestre" → "semestres"
      }
      return unitLower
    }
  },

  /**
   * Formatea la duración en el formato requerido: "Ocho (8) semestres."
   */
  formatDuration(duracion, unidadDuracion) {
    if (!duracion || !unidadDuracion) {
      Logger.warning('formatDuration: Se requieren tanto duración como unidad')
      return ''
    }

    try {
      const number = typeof duracion === 'string' ? parseInt(duracion, 10) : duracion

      if (isNaN(number) || number <= 0) {
        Logger.warning('formatDuration: Duración debe ser un número positivo')
        return `${duracion} ${unidadDuracion}`.trim()
      }

      const numberInWords = this.capitalizeFirst(this.numberToWords(number))
      const formattedUnit = this.formatUnit(unidadDuracion, number)

      return `${numberInWords} (${number}) ${formattedUnit}.`
    } catch (error) {
      Logger.error('Error al formatear duración:', error)
      return `${duracion} ${unidadDuracion}`.trim()
    }
  },

  /**
   * Convierte a minúsculas todas las palabras excepto los conectores comunes
   */
  clearUpperUnions(title) {
    const connectorsMap = {
      En: 'en',
      La: 'la',
      Los: 'los',
      Las: 'las',
      El: 'el',
      Y: 'y',
      E: 'e',
      O: 'o',
      Para: 'para',
      De: 'de',
      Del: 'del',
      Al: 'al',
      Desde: 'desde',
      Como: 'como',
      Con: 'con',
      Sin: 'sin',
      Por: 'por',
      Sobre: 'sobre',
      Bajo: 'bajo',
      Entre: 'entre',
      Hacia: 'hacia',
      Hasta: 'hasta',
      Según: 'según',
      Durante: 'durante',
      Mediante: 'mediante',
      Ante: 'ante',
      Tras: 'tras',
      Él: 'el',
      UN: 'un',
      UNA: 'una',
      UNOS: 'unos',
      UNAS: 'unas'
    }

    let result = title

    for (const [upperCase, lowerCase] of Object.entries(connectorsMap)) {
      const regex = new RegExp(` ${upperCase} `, 'g')
      result = result.replace(regex, ` ${lowerCase} `)
    }

    return result
  },

  /**
   * Capitaliza la primera letra de cada palabra
   */
  capitalizeWords(str) {
    const words = str.split(' ')

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
      }
    }

    return words.join(' ')
  },

  /**
   * Formatea el nombre del programa según las reglas especificadas
   */
  formatProgramName(programName) {
    if (!programName || typeof programName !== 'string') {
      Logger.warning('formatProgramName: Se esperaba un string válido')
      return programName || ''
    }

    try {
      const capitalized = this.capitalizeWords(programName.trim())
      const formatted = this.clearUpperUnions(capitalized)
      return formatted
    } catch (error) {
      Logger.error('Error al formatear nombre del programa:', error)
      return programName
    }
  },

  /**
   * Formateador de moneda COP
   */
  formatCurrencyCOP(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount)
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA DE ACTUALIZACIÓN DOM                          █
// ███████████████████████████████████████████████████████████████████████████████

const DOMUpdater = {
  /**
   * Actualiza elementos del DOM de manera segura
   */
  updateElementsText(elementId, value) {
    try {
      const elements = document.querySelectorAll(`[${elementId}='true']`)

      if (elements.length > 0) {
        elements.forEach(element => {
          // Buscar .lead dentro de cada elemento
          const leadElements = element.querySelectorAll('.lead')

          if (leadElements.length > 0) {
            // Si tiene .lead, actualizar solo esos
            leadElements.forEach(lead => {
              lead.innerText = value
            })
          } else {
            // Si no tiene .lead, actualizar todo el elemento
            element.innerText = value
          }
        })
      } else {
        // Fallback: buscar por ID
        const element = document.getElementById(elementId)
        if (!element) {
          Logger.warning(`Elemento con ID ${elementId} no encontrado`)
          return
        }

        const leadElements = element.querySelectorAll('.lead')
        if (leadElements.length > 0) {
          leadElements.forEach(lead => {
            lead.innerText = value
          })
        } else {
          element.innerText = value
        }
      }
    } catch (error) {
      Logger.error(`Error al actualizar ${elementId}:`, error)
    }
  },

  /**
   * Actualiza las fechas de inscripción dinámicamente
   */
  updateRegistrationDates(fechasData) {
    try {
      const container = document.querySelector('[data-puj-registration-dates="true"]')

      if (!container) {
        Logger.warning('Contenedor [data-puj-registration-dates] no encontrado')
        return false
      }

      // Generar HTML para cada fecha
      const html = fechasData
        .map(
          fecha => `
          <div class="program-dates_date-item">
            <p class="paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period" data-component="paragraph">
              ${DataFormatter.capitalizeFirst(fecha.descCiclo)}:
            </p>
            <p class="paragraph paragraph-neutral paragraph-md program-dates_date-value" data-component="paragraph">
              ${DataFormatter.cleanDate(fecha.fFinCierreLetra)}
            </p>
          </div>
        `
        )
        .join('')

      // Insertar directamente en el contenedor
      container.innerHTML = html
      return true
    } catch (error) {
      Logger.error('Error al procesar fechas de inscripción:', error)
      return false
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        SISTEMA DE MODALES                                  █
// ███████████████████████████████████████████████████████████████████████████████

const ModalSystem = {
  init() {
    // Buscar todos los elementos que pueden activar modales
    const modalTriggers = document.querySelectorAll('[data-modal-target]')

    if (modalTriggers.length === 0) {
      Logger.debug('No se encontraron triggers de modal')
      return false
    }

    modalTriggers.forEach(trigger => {
      this.setupModalTrigger(trigger)
    })

    return true
  },

  setupModalTrigger(trigger) {
    const modalId = trigger.getAttribute('data-modal-target')
    const modal = document.getElementById(modalId)

    if (!modal) {
      Logger.warning(`Modal ${modalId} no encontrado`)
      return
    }

    // Excluir el modal de contacto que es manejado por ContactModal
    if (modalId === 'contact-modal') {
      Logger.debug(`Modal ${modalId} excluido - manejado por ContactModal`)
      return
    }

    const closeBtn = modal.querySelector('.program-detail-modal__close')

    // Eventos para abrir modal
    EventManager.add(trigger, 'click', e => {
      e.preventDefault()
      this.openModal(modal)
    })

    // Eventos para cerrar modal
    if (closeBtn) {
      EventManager.add(closeBtn, 'click', e => {
        e.preventDefault()
        this.closeModal(modal)
      })
    }

    // Cerrar con ESC
    EventManager.add(document, 'keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('program-detail-modal--active')) {
        this.closeModal(modal)
      }
    })

    // Cerrar clickeando fuera
    EventManager.add(modal, 'click', e => {
      if (e.target === modal) {
        this.closeModal(modal)
      }
    })
  },

  openModal(modal) {
    modal.classList.add('program-detail-modal--active')
    document.body.style.overflow = 'hidden'
    Logger.debug('Modal abierto')
  },

  closeModal(modal) {
    modal.classList.remove('program-detail-modal--active')
    document.body.style.overflow = ''
    Logger.debug('Modal cerrado')
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                    SISTEMA DE DATOS DEL PROGRAMA                           █
// ███████████████████████████████████████████████████████████████████████████████

const ProgramDataSystem = {
  init() {
    this.setupDataListener()
    return true
  },

  setupDataListener() {
    document.addEventListener('data_load-program', event => {
      this.processData(event.detail.dataProgram)
    })
  },

  processData(dataProgram) {
    const {
      facultad,
      programa,
      costo,
      jornada,
      snies,
      tituloOtorgado,
      grado,
      duracion,
      unidadDuracion,
      modalidad,
      datosFechaCierreInscripcion,
      ciudad
    } = dataProgram

    let automationUpdates = {}

    if (facultad) {
      DOMUpdater.updateElementsText('data-puj-faculty', DataFormatter.formatProgramName(facultad))
      automationUpdates.faculty = true
    }

    if (programa) {
      DOMUpdater.updateElementsText('data-puj-name', `${DataFormatter.formatProgramName(programa)}:`)
      automationUpdates.program = true
    }

    if (snies) {
      DOMUpdater.updateElementsText('data-puj-snies', `SNIES ${snies}`)
      automationUpdates.snies = true
    }

    if (tituloOtorgado) {
      DOMUpdater.updateElementsText('data-puj-title-graduation', DataFormatter.formatProgramName(tituloOtorgado))
      automationUpdates.degree = true
    }

    if (grado) {
      DOMUpdater.updateElementsText('data-puj-academic-level', DataFormatter.formatProgramName(grado))
      automationUpdates.level = true
    }

    if (duracion && unidadDuracion) {
      const duracionFormatted = DataFormatter.formatDuration(duracion, unidadDuracion)
      DOMUpdater.updateElementsText('data-puj-duration', duracionFormatted)
      automationUpdates.duration = true
    }

    if (modalidad) {
      DOMUpdater.updateElementsText('data-puj-modality', DataFormatter.formatProgramName(modalidad))
      automationUpdates.modality = true
    }

    if (costo) {
      DOMUpdater.updateElementsText('data-puj-price', `*${DataFormatter.formatCurrencyCOP(costo)}`)
      automationUpdates.price = true
    }

    if (jornada) {
      DOMUpdater.updateElementsText('data-puj-clock', DataFormatter.formatProgramName(jornada))
      automationUpdates.schedule = true
    }

    if (datosFechaCierreInscripcion && Array.isArray(datosFechaCierreInscripcion)) {
      DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion)
      automationUpdates.deadline = true
    }

    if (ciudad) {
      DOMUpdater.updateElementsText('data-puj-location', DataFormatter.formatProgramName(ciudad))
      automationUpdates.city = true
    }

    // Actualizar statusPage solo si hay cambios
    if (Object.keys(automationUpdates).length && typeof window !== 'undefined' && window.statusPage) {
      window.statusPage = {
        ...window.statusPage,
        automation: { ...window.statusPage.automation, ...automationUpdates }
      }
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN PRINCIPAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const DatosProgramaVideoSystem = {
  async init() {
    try {
      // Inicializar sistemas
      const systems = {
        responsiveVideo: ResponsiveVideoSystem.init(),
        modal: ModalSystem.init(),
        programData: ProgramDataSystem.init()
      }

      // Configurar gestión de visibilidad para ahorro de batería
      this.setupBatteryOptimization()

      // Configurar cleanup
      this.setupCleanup()

      const activeSystems = Object.entries(systems)
        .filter(([_, isActive]) => isActive)
        .map(([name]) => name)
      return systems
    } catch (error) {
      Logger.error('Error al inicializar Datos Programa Video:', error)
      return false
    }
  },

  setupBatteryOptimization() {
    // Gestión de visibilidad para ahorro de batería
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        ResponsiveVideoSystem.pauseAllVideos()
      } else {
        TimingUtils.delay(() => {
          ResponsiveVideoSystem.resumeAllVideos()
        }, 500)
      }
    })
  },

  setupCleanup() {
    // Cleanup al cambiar página
    window.addEventListener('beforeunload', () => {
      // Restaurar overflow del body
      document.body.style.overflow = ''

      // Limpiar eventos
      EventManager.cleanup()
    })
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  DOMHelpers.isReady(async () => {
    await DatosProgramaVideoSystem.init()
  })

  // Exponer para debugging y editores
  if (typeof window !== 'undefined') {
    window.ResponsiveVideoSystem = ResponsiveVideoSystem
    window.DataFormatter = DataFormatter
    window.DOMUpdater = DOMUpdater
    window.ModalSystem = ModalSystem
    window.ProgramDataSystem = ProgramDataSystem
  }
}
=======
// SCRIPT PRINCIPAL - DATOS PROGRAMA
// ===========================================

/**
 * Script principal que orquesta todos los módulos del sistema
 * Sistema modular optimizado para producción
 */

import { detectPlatform } from './modules/platform-detection.js'
import { onDOMReady, runWhenIdle, isElementVisible } from './modules/utils.js'
import { VideoSystem } from './modules/video-system.js'
import { ModalSystem } from './modules/modal-system.js'
import { PeriodicityObserver } from './modules/periodicity-observer.js'
import { programFormatter } from './modules/program-formatter.js'

class ProgramDataSystem {
  constructor() {
    this.platform = null

    // Instanciar subsistemas
    this.videoSystem = new VideoSystem()
    this.modalSystem = new ModalSystem()
    this.periodicityObserver = new PeriodicityObserver()
    this.programFormatter = programFormatter

    this.initialized = false
  }

  /**
   * Inicializar el sistema completo
   */
  init() {
    if (this.initialized) {
      return
    }

    try {
      Logger.info('[ProgramDataSystem] Iniciando inicialización del sistema')

      // Detectar plataforma
      this.platform = detectPlatform()

      // Configurar event listeners para datos del programa
      this.setupDataEventListeners()

      // Inicializar subsistemas uno por uno
      try {
        this.modalSystem.init()
        Logger.info('[ProgramDataSystem] ModalSystem inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando ModalSystem:', error)
      }

      try {
        this.periodicityObserver.init()
        Logger.info('[ProgramDataSystem] PeriodicityObserver inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando PeriodicityObserver:', error)
      }

      try {
        this.videoSystem.init()
        Logger.info('[ProgramDataSystem] VideoSystem inicializado')
      } catch (error) {
        Logger.error('[ProgramDataSystem] Error inicializando VideoSystem:', error)
        // VideoSystem es crítico, pero no debe romper todo el sistema
      }

      // ProgramFormatter no necesita inicialización explícita ya que se auto-inicializa
      Logger.info('[ProgramDataSystem] ProgramFormatter inicializado')

      this.initialized = true
      Logger.info('[ProgramDataSystem] Sistema inicializado exitosamente')
    } catch (error) {
      Logger.error('[ProgramDataSystem] Error crítico durante inicialización:', error)
      // NO marcar como initialized si hay error crítico
      this.initialized = false
    }
  }

  /**
   * Configurar event listeners para datos del programa
   */
  setupDataEventListeners() {
    document.addEventListener('data_load-program', this.handleDataLoad.bind(this))
  }

  /**
   * Manejar carga de datos del programa
   */
  handleDataLoad() {
    // Reconfigurar contenedores de video si el sistema ya está inicializado
    if (this.videoSystem.state.initialized) {
      this.videoSystem.setupLazyVideoContainers()
    }
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    // Destruir subsistemas
    if (this.videoSystem) {
      this.videoSystem.destroy()
    }

    if (this.modalSystem) {
      this.modalSystem.destroy()
    }

    if (this.periodicityObserver) {
      this.periodicityObserver.destroy()
    }

    if (this.programFormatter) {
      this.programFormatter.destroy()
    }

    this.initialized = false
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      initialized: this.initialized,
      platform: this.platform?.name || 'unknown',
      videoSystem: {
        initialized: this.videoSystem?.state.initialized || false,
        loadedVideos: this.videoSystem?.state.loadedVideos.size || 0
      },
      modalSystem: {
        hasActiveModal: this.modalSystem?.hasOpenModal() || false,
        activeModal: this.modalSystem?.getActiveModal()?.id || null
      },
      periodicityObserver: {
        isActive: this.periodicityObserver?.isActive() || false,
        ...this.periodicityObserver?.getStats()
      }
    }
  }
}

// Sistema global para compatibilidad
let globalProgramDataSystem = null

/**
 * Configurar manejador de interacción del usuario para videos
 * Necesario para reproductores automáticos en móviles
 */
function setupUserInteractionHandler() {
  let interactionTriggered = false
  const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown']

  const handleUserInteraction = () => {
    if (interactionTriggered) return
    interactionTriggered = true

    // Intentar reproducir videos visibles
    const containers = document.querySelectorAll('[data-component="video-player"].video-loaded')
    containers.forEach(container => {
      if (isElementVisible(container)) {
        const videos = container.querySelectorAll('video')
        videos.forEach(video => {
          if (video.paused) {
            globalProgramDataSystem.videoSystem.playVideoSafely(video, 1, true)
          }
        })
      }
    })

    // Limpiar event listeners
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }

  // Configurar event listeners
  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, handleUserInteraction, {
      passive: true,
      capture: true,
      once: true
    })
  })

  // Auto-cleanup después de 30 segundos
  setTimeout(() => {
    interactionEvents.forEach(eventType => {
      document.removeEventListener(eventType, handleUserInteraction, true)
    })
  }, 30000)
}

/**
 * Función principal de inicialización
 */
function initProgramDataVideo() {
  try {
    if (!globalProgramDataSystem) {
      Logger.error('[ProgramDataSystem] Sistema no inicializado')
      return
    }

    // Inicializar sistema principal
    globalProgramDataSystem.init()

    // Configurar manejo de interacciones de usuario
    setupUserInteractionHandler()
  } catch (error) {
    Logger.error('[ProgramDataSystem] Error durante inicialización:', error)
  }
}

/**
 * Función de inicialización del sistema completo
 */
function initSystem() {
  if (typeof window !== 'undefined' && window.programDataVideoInitialized) {
    return
  }

  // Crear instancia del sistema principal
  globalProgramDataSystem = new ProgramDataSystem()

  // Marcar como inicializado globalmente
  if (typeof window !== 'undefined') {
    window.programDataVideoInitialized = true

    // Configurar cleanup automático antes de cerrar la página
    window.addEventListener('beforeunload', () => {
      if (globalProgramDataSystem) {
        globalProgramDataSystem.destroy()
      }
    })
  }

  // Inicializar cuando el DOM esté listo
  onDOMReady(() => {
    // Usar requestIdleCallback si está disponible para no bloquear recursos críticos
    runWhenIdle(initProgramDataVideo, 2000)
  })
}

// Exponer funciones para compatibilidad con código existente
if (typeof window !== 'undefined') {
  window.ProgramDataSystem = ProgramDataSystem
  window.getProgramDataSystemStatus = () => {
    return globalProgramDataSystem?.getStatus() || { initialized: false }
  }
}

// Auto-inicialización
initSystem()

export { ProgramDataSystem, initSystem as default }
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
