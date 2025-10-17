// ===========================================
// PROGRAMAS RELACIONADOS - SCRIPT v4.0
// Compatible con utilidades globales v3.0
// Patrón robusto con mounted y lifecycle
// ===========================================

/**
 * Ejecuta callback cuando el navegador está idle
 */
const runWhenIdle = (callback, timeout = 2000) => {
  if (typeof window === 'undefined') return

  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(callback, { timeout })
    return
  }

  TimingUtils.sleep(100)
    .then(() => callback())
    .catch(error => {
      Logger?.error?.('Related programs - error en runWhenIdle', error)
    })
}

// ==========================================
// CONFIGURACIÓN DEL CARRUSEL
// ==========================================
const CAROUSEL_CONFIG = {
  programTypes: {
    'Pregrado - Carrera': {
      enabled: true,
      priority: 1,
      label: 'Programas de Pregrado',
      description: 'Programas de pregrado ofrecidos por la universidad'
    },
    Maestría: {
      enabled: true,
      priority: 3,
      label: 'Maestrías',
      description: 'Programas de maestría disponibles'
    },
    Especialización: {
      enabled: true,
      priority: 2,
      label: 'Especializaciones',
      description: 'Programas de especialización profesional'
    },
    Licenciatura: {
      enabled: false,
      priority: 4,
      label: 'Licenciaturas',
      description: 'Programas de licenciatura disponibles'
    },
    'Bachillerato Eclesiástico': {
      enabled: false,
      priority: 5,
      label: 'Bachilleratos Eclesiásticos',
      description: 'Programas eclesiásticos disponibles'
    },
    Diplomado: {
      enabled: false,
      priority: 6,
      label: 'Diplomados',
      description: 'Diplomados y cursos de educación continua'
    },
    Curso: {
      enabled: false,
      priority: 7,
      label: 'Cursos',
      description: 'Cursos cortos y talleres'
    },
    Doctorado: {
      enabled: false,
      priority: 8,
      label: 'Doctorados',
      description: 'Programas de doctorado e investigación'
    }
  },
  filterSettings: {
    maxPrograms: 10,
    enableFacultyFilter: true,
    enableAreaFilter: true,
    enableSameFacultyPriority: true,
    enableAreaBasedFallback: true
  },
  logSettings: {
    enableLogs: false
  }
}

// ==========================================
// FUNCIONES DE NORMALIZACIÓN DE FACULTADES
// ==========================================

/**
 * Normaliza nombres de facultades con implementación local mejorada
 * Remueve prefijos "Facultad de" / "Facultad" para mejor comparación
 */
function normalizeFacultyName(facultyName) {
  if (!facultyName || typeof facultyName !== 'string') return ''

  // Normalización básica: trim, lowercase
  let normalized = facultyName.trim().toLowerCase()

  // Remover acentos
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Remover puntos, comas y otros caracteres especiales
  normalized = normalized.replace(/[.,\-()]/g, ' ')

  // Remover prefijos comunes como "Facultad de", "Facultad", etc.
  normalized = normalized.replace(/^facultad\s+de\s+/i, '')
  normalized = normalized.replace(/^facultad\s+/i, '')

  // Remover espacios múltiples
  normalized = normalized.replace(/\s+/g, ' ').trim()

  return normalized
}

// ==========================================
// SISTEMA DE DATOS DEL PROGRAMA
// ==========================================
class RelatedProgramsSystem {
  constructor() {
    this.initialized = false
    this.pendingInitialization = false
    this.destroyed = false
    this.swiper = null
    this.timeoutTaskId = null
    this.scheduler = TimingUtils.createScheduler()
    this.eventKeys = new Set()
    this.config = {
      idleTimeout: 1000,
      dataTimeout: 10000
    }
  }

  init() {
    if (this.initialized || this.pendingInitialization) return

    this.destroyed = false
    this.pendingInitialization = true

    runWhenIdle(() => {
      this.pendingInitialization = false

      if (this.destroyed) return

      this.showSkeletonLoader()
      this.setupDataListener()
      this.setupTimeoutHandler()

      this.initialized = true

      if (typeof window !== 'undefined') {
        window.relatedProgramsSystemInitialized = true
      }
    }, this.config.idleTimeout)
  }

  /**
   * Mostrar skeleton loader mientras se cargan los datos
   */
  showSkeletonLoader() {
    if (typeof document === 'undefined') return

    const relatedPrograms = document.getElementById('relatedPrograms')
    if (!relatedPrograms) return

    const skeletonHTML = `
      <div class="swiper-slide">
        <div class="related-programs__program-card related-programs__skeleton">
          <div class="related-programs__image-container">
            <div class="related-programs__skeleton-image"></div>
            <div class="related-programs__skeleton-overlay"></div>
            <div class="related-programs__content">
              <div class="related-programs__skeleton-title"></div>
              <div class="related-programs__skeleton-subtitle"></div>
              <div class="related-programs__skeleton-link"></div>
            </div>
          </div>
        </div>
      </div>
    `.repeat(4)

    relatedPrograms.innerHTML = skeletonHTML
    this.setButtonsDisabled(true)
  }

  /**
   * Habilitar/deshabilitar botones de navegación
   */
  setButtonsDisabled(disabled) {
    const prevButton = document.querySelector('.related-programs-prev')
    const nextButton = document.querySelector('.related-programs-next')

    if (prevButton) prevButton.disabled = disabled
    if (nextButton) nextButton.disabled = disabled
  }

  /**
   * Timeout de seguridad: si después de 10 segundos no hay datos, ocultar sección
   */
  setupTimeoutHandler() {
    this.clearTimeoutHandler()

    if (!this.scheduler) return

    this.timeoutTaskId = this.scheduler.schedule(() => {
      Logger?.error?.('Related programs - timeout sin datos recibidos')
      this.hideSection('Timeout al cargar datos')
    }, this.config.dataTimeout)
  }

  /**
   * Cancelar el timeout si los datos se cargan antes
   */
  clearTimeoutHandler() {
    if (this.timeoutTaskId && this.scheduler) {
      this.scheduler.cancel(this.timeoutTaskId)
      this.timeoutTaskId = null
    }
  }

  /**
   * Ocultar toda la sección en caso de error
   */
  hideSection(errorMessage) {
    const section = document.getElementById('section-ten')
    if (section) {
      section.style.display = 'none'
    }

    this.clearTimeoutHandler()
  }

  setupDataListener() {
    let currentProgramData = null
    let allProgramsData = null

    if (typeof document === 'undefined') return

    const validateAndProcess = () => {
      if (!currentProgramData || !allProgramsData || !Array.isArray(allProgramsData) || allProgramsData.length === 0) {
        return
      }

      this.generateRelatedCarousel(currentProgramData, allProgramsData)
    }

    const allProgramsHandler = event => {
      allProgramsData = event.detail?.allPrograms || null

      if (!currentProgramData) {
        if (event.detail?.currentProgramData) {
          currentProgramData = event.detail.currentProgramData
        } else if (event.detail?.currentProgramCode && allProgramsData) {
          const foundProgram = allProgramsData.find(prog => prog.codigo === event.detail.currentProgramCode)
          if (foundProgram) {
            currentProgramData = foundProgram
          }
        }
      }

      validateAndProcess()
    }

    document.addEventListener('data_load-program-all', allProgramsHandler)
    this.allProgramsHandler = allProgramsHandler
  }

  /**
   * Formatear nombre de programa usando utilidades globales v3.0
   */
  formatProgramName(programName) {
    if (!programName || typeof programName !== 'string') {
      return programName || ''
    }

    try {
      const trimmed = StringUtils.trim(programName)
      const capitalized = StringUtils.capitalizeWords(trimmed)
      return this.clearUpperUnions(capitalized)
    } catch (error) {
      Logger?.warning?.('Related programs - error formateando nombre de programa', error)
      return programName
    }
  }

  /**
   * Limpiar conectores que deben ir en minúsculas (excepto al inicio)
   */
  clearUpperUnions(title) {
    if (!title || typeof title !== 'string') return title || ''

    // Conectores que deben ir en minúsculas (excepto al inicio)
    const connectors = [
      // Artículos
      'el',
      'la',
      'los',
      'las',
      'un',
      'una',
      'unos',
      'unas',
      // Preposiciones
      'de',
      'del',
      'al',
      'en',
      'con',
      'por',
      'para',
      'sin',
      'sobre',
      'bajo',
      'entre',
      'hacia',
      'hasta',
      'desde',
      'durante',
      'mediante',
      'ante',
      'tras',
      'según',
      'como',
      'a',
      // Conjunciones
      'y',
      'e',
      'o',
      'u',
      'pero',
      'mas',
      'sino',
      'aunque',
      // Otros conectores
      'que',
      'cual',
      'donde',
      'cuando'
    ]

    let result = title

    // Aplicar minúsculas a conectores que no estén al inicio
    connectors.forEach(connector => {
      const regex = new RegExp(`\\b${connector}\\b`, 'gi')
      result = result.replace(regex, (match, offset) => {
        // No cambiar si está al inicio de la cadena
        return offset === 0 ? match : connector
      })
    })

    return result
  }

  generateRelatedCarousel(currentProgram, allPrograms) {
    try {
      // Cancelar timeout ya que estamos procesando datos
      this.clearTimeoutHandler()

      const { area, facultad, codPrograma } = currentProgram
      let faculty = Array.isArray(facultad) ? facultad[0] : facultad

      // Función para compilar programas con múltiples prioridades
      const compileOrderedPrograms = (currentProgram, allPrograms) => {
        const { facultad, area, codPrograma } = currentProgram
        const faculty = Array.isArray(facultad) ? facultad[0] : facultad

        const priorities = {
          sameFaculty: [],
          areaRelated: []
        }

        allPrograms.forEach(prog => {
          // Excluir programa actual
          if (prog.codigo === codPrograma) return

          // Filtrar por tipo de programa habilitado
          const programTypeConfig = CAROUSEL_CONFIG.programTypes[prog.tipoPrograma]
          if (!programTypeConfig || !programTypeConfig.enabled) return

          // Validar facultad del programa
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          if (!progFaculty || typeof progFaculty !== 'string') return

          // Comparación de facultades con normalización
          const normalizedCurrentFaculty = normalizeFacultyName(faculty)
          const normalizedProgFaculty = normalizeFacultyName(progFaculty)
          const isSameFaculty = normalizedCurrentFaculty === normalizedProgFaculty

          // Comparación de áreas
          let hasCommonArea = false
          if (prog.areas && Array.isArray(prog.areas) && area) {
            if (Array.isArray(area)) {
              hasCommonArea = prog.areas.some(progArea => area.includes(progArea))
            } else {
              const currentProgramAreas = Array.isArray(area) ? area : [area]
              hasCommonArea = prog.areas.some(progArea => currentProgramAreas.includes(progArea))
            }
          }

          // Clasificar programa según criterios
          if (isSameFaculty) {
            priorities.sameFaculty.push(prog)
          } else if (hasCommonArea) {
            priorities.areaRelated.push(prog)
          }
        })

        const sortByPriority = (a, b) => {
          const priorityA = CAROUSEL_CONFIG.programTypes[a.tipoPrograma]?.priority || 999
          const priorityB = CAROUSEL_CONFIG.programTypes[b.tipoPrograma]?.priority || 999
          return priorityA - priorityB
        }

        priorities.sameFaculty.sort(sortByPriority)
        priorities.areaRelated.sort(sortByPriority)

        const compiledPrograms = [...priorities.sameFaculty, ...priorities.areaRelated].slice(0, CAROUSEL_CONFIG.filterSettings.maxPrograms)
        return compiledPrograms
      }

      let compiledPrograms = compileOrderedPrograms(currentProgram, allPrograms)

      if (typeof document === 'undefined') {
        return
      }

      const relatedPrograms = document.getElementById('relatedPrograms')

      if (!relatedPrograms) {
        Logger?.error?.('Related programs - contenedor #relatedPrograms no encontrado')
        this.hideSection('No se encontró el contenedor de programas relacionados')
        return
      }

      if (compiledPrograms.length === 0) {
        this.hideSection('No se encontraron programas relacionados')
        return
      }

      // Limpiar contenedor (remover skeleton)
      relatedPrograms.innerHTML = ''

      compiledPrograms.forEach((program, index) => {
        // Mapear campos EXACTAMENTE como la versión anterior que funcionaba
        const programName = program.nombre
        const programFaculty = Array.isArray(program.facultad) ? program.facultad[0] : program.facultad
        const programUrl = program.urlPrograma

        // Manejar imagen del programa - IGUAL que la versión anterior
        const newStart = 'https://www.javeriana.edu.co/recursosdb/'
        let urlImage = program.urlImagenPrograma

        if (typeof urlImage === 'string' && urlImage.includes('documents')) {
          const cleanUrl = urlImage.trim()
          urlImage = cleanUrl.replace(/\/?documents\//, newStart)
        }

        const card = document.createElement('div')
        card.classList.add('swiper-slide')

        card.innerHTML = `
            <div class="related-programs__program-card">
              <div class="related-programs__image-container">
                <img src="${urlImage}" alt="${programName}" class="related-programs__image" loading="lazy">
                <div class="related-programs__overlay"></div>
                <div class="related-programs__content">
                  <h3 class="related-programs__name">${programName}</h3>
                  <p class="paragraph paragraph-neutral paragraph-md related-programs__faculty">${programFaculty}</p>
                  <a href="${programUrl}" class="related-programs__link" data-senna-off aria-label="Ver detalles del programa: ${programName}">
                    Ver Programa <i class="ph ph-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
          `

        relatedPrograms.appendChild(card)
      })

      // Inicializar Swiper después de crear las cards
      if (!this.scheduler) {
        this.initializeSwiper()
        this.setButtonsDisabled(false)
      } else {
        this.scheduler.schedule(() => {
          if (this.destroyed) return

          this.initializeSwiper()
          this.setButtonsDisabled(false)
        }, 100)
      }
    } catch (error) {
      Logger?.error?.('Related programs - error generando carrusel', error)
      this.hideSection(error.message || 'Error desconocido al generar carousel')
    }
  }

  initializeSwiper() {
    if (typeof window === 'undefined') return

    // Destruir instancia existente si existe
    if (this.swiper) {
      this.swiper.destroy(true, true)
      this.swiper = null
    }

    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
      window.relatedProgramsSwiper = null
    }

    if (!window.Swiper) {
      if (this.scheduler) {
        this.scheduler.schedule(() => {
          if (!this.destroyed) {
            this.initializeSwiper()
          }
        }, 300)
      } else {
        TimingUtils.sleep(300)
          .then(() => {
            if (!this.destroyed) {
              this.initializeSwiper()
            }
          })
          .catch(error => {
            Logger?.error?.('Related programs - error reintentando inicialización de Swiper', error)
          })
      }
      return
    }

    // Buscar el wrapper con un solo fallback
    const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')

    if (!element) {
      return
    }

    // Contar slides disponibles
    const totalSlides = element.querySelectorAll('.swiper-slide').length

    this.swiper = new window.Swiper(element, {
      loop: false,
      spaceBetween: 20,
      grabCursor: true,
      allowTouchMove: true,
      slidesPerView: 'auto',

      pagination: {
        el: '.related-programs-pagination, .related-programs__pagination',
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir al programa ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: '.related-programs-next, .related-programs__next',
        prevEl: '.related-programs-prev, .related-programs__prev'
      },

      breakpoints: {
        0: {
          spaceBetween: 20,
          slidesPerView: Math.min(1, totalSlides),
          centeredSlides: true
        },
        576: {
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: Math.min(1, totalSlides)
        },
        768: {
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: Math.min(2, totalSlides)
        },
        1024: {
          spaceBetween: 25,
          centeredSlides: false,
          slidesPerView: Math.min(3, totalSlides)
        },
        1380: {
          spaceBetween: 30,
          centeredSlides: false,
          slidesPerView: Math.min(4, totalSlides)
        }
      }
    })

    // También mantener referencia global para compatibilidad
    window.relatedProgramsSwiper = this.swiper
  }

  /**
   * Destruir el sistema y limpiar recursos
   */
  destroy() {
    this.destroyed = true
    this.pendingInitialization = false

    try {
      this.clearTimeoutHandler()

      // Destruir Swiper
      if (this.swiper) {
        this.swiper.destroy(true, true)
        this.swiper = null
      }

      if (window.relatedProgramsSwiper) {
        window.relatedProgramsSwiper.destroy(true, true)
        window.relatedProgramsSwiper = null
      }

      if (this.scheduler) {
        this.scheduler.cancelAll()
      }

      this.timeoutTaskId = null

      // Limpiar event listener nativo
      if (this.allProgramsHandler) {
        document.removeEventListener('data_load-program-all', this.allProgramsHandler)
        this.allProgramsHandler = null
      }

      // Limpiar eventKeys si hay algún listener de EventManager residual
      this.eventKeys.forEach(key => EventManager.remove(key))
      this.eventKeys.clear()
    } catch (error) {
      Logger?.warning?.('Related programs - error al destruir sistema', error)
    }

    this.initialized = false

    if (typeof window !== 'undefined') {
      window.relatedProgramsSystemInitialized = false
    }
  }

  /**
   * Obtener estado actual del sistema
   */
  getStatus() {
    return {
      initialized: this.initialized,
      destroyed: this.destroyed,
      pendingInitialization: this.pendingInitialization,
      carousel: {
        initialized: Boolean(this.swiper),
        currentSlide: this.swiper?.activeIndex || 0,
        totalSlides: this.swiper?.slides?.length || 0
      }
    }
  }
}

/**
 * Función de inicialización del módulo
 */
function initRelatedProgramsModule() {
  const relatedProgramsSystem = new RelatedProgramsSystem()

  const initialize = () => {
    try {
      relatedProgramsSystem.init()
    } catch (error) {
      Logger?.error?.('Related programs - error durante la inicialización', error)
    }
  }

  const destroy = () => {
    try {
      relatedProgramsSystem.destroy()
    } catch (error) {
      Logger?.error?.('Related programs - error durante la destrucción', error)
    }
  }

  const getStatus = () => relatedProgramsSystem.getStatus()

  // Exponer funciones globales
  if (typeof window !== 'undefined') {
    window.initializeRelatedProgramsSection = initialize
    window.destroyRelatedProgramsSection = destroy
    window.getRelatedProgramsSystemStatus = getStatus
    window.RelatedProgramsSystem = RelatedProgramsSystem

    // Limpiar al descargar la página
    EventManager.once(window, 'beforeunload', destroy)
  }

  // Inicializar inmediatamente
  initialize()
}

// Inicialización según estado del documento
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    EventManager.once(document, 'DOMContentLoaded', initRelatedProgramsModule)
  } else {
    initRelatedProgramsModule()
  }
}

// Exportar para uso en módulos
export { RelatedProgramsSystem, initRelatedProgramsModule as default }
