// ===========================================
// PROGRAMAS RELACIONADOS - SCRIPT v3.0
// Compatible con utilidades globales v3.0
// ===========================================

const RelatedProgramsScript = () => {
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
      enableLogs: false // Control maestro - cambiar a false desactiva TODOS los logs
    }
  }

  // ==========================================
  // FUNCIONES DE NORMALIZACIÓN DE FACULTADES
  // ==========================================

  /**
   * Normaliza nombres de facultades usando el sistema global FacultyNormalizer
   * Maneja abreviaciones y variaciones comunes
   */
  function normalizeFacultyName(facultyName) {
    if (!facultyName || typeof facultyName !== 'string') return ''

    try {
      // Intentar usar FacultyNormalizer global si está disponible
      if (typeof window !== 'undefined' && window.FacultyNormalizer && window.FacultyNormalizer.normalize) {
        return window.FacultyNormalizer.normalize(facultyName)
      }

      // Fallback local si no está disponible el sistema global
      let clean = facultyName.replace(/^Facultad de /i, '').trim()

      // Mapeo de abreviaciones conocidas a nombres completos
      const facultyMappings = {
        'Cs.Económicas y Administrativ.': 'Ciencias Económicas y Administrativas',
        'Cs.Económicas y Administrativas': 'Ciencias Económicas y Administrativas',
        'Cs.Políticas y Relaciones Int.': 'Ciencias Políticas y Relaciones Internacionales',
        'Arquitectura y Diseño': 'Arquitectura y Diseño'
      }

      return facultyMappings[clean] || clean
    } catch (error) {
      // Usar Logger si está disponible, sino console
      if (typeof Logger !== 'undefined' && Logger.warning) {
        Logger.warning('Error normalizando nombre de facultad:', error)
      } else {
        console.warn('Error normalizando nombre de facultad:', error)
      }
      return facultyName
    }
  }

  // ==========================================
  // SISTEMA DE DATOS DEL PROGRAMA
  // ==========================================
  const RelatedProgramsSystem = {
    init() {
      this.setupDataListener()
      return true
    },

    setupDataListener() {
      document.addEventListener('data_load-program', event => {
        this.processData(event.detail.dataProgram, event.detail.allPrograms)
      })
    },

    processData(dataProgram, allPrograms) {
      // Extraer campos
      const { facultad, programa, snies, codPrograma, urlImagen, area, url } = dataProgram

      let automationUpdates = {}

      // Actualizar elementos si hay facultad disponible
      if (facultad) {
        const facultyElements = document.querySelectorAll('[data-puj-faculty]')
        const formattedFaculty = this.formatProgramName(facultad)
        facultyElements.forEach(el => {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = formattedFaculty
          } else {
            el.textContent = formattedFaculty
          }
        })
        automationUpdates.faculty = true
      }

      if (allPrograms && Array.isArray(allPrograms) && allPrograms.length > 0) {
        this.generateRelatedCarousel(dataProgram, allPrograms)
      }
    },

    /**
     * Formatear nombre de programa usando utilidades globales v3.0
     */
    formatProgramName(programName) {
      if (!programName || typeof programName !== 'string') {
        return programName || ''
      }

      try {
        // Usar StringUtils.trim si está disponible, sino trim nativo
        const trimmed = typeof StringUtils !== 'undefined' && StringUtils.trim 
          ? StringUtils.trim(programName) 
          : programName.trim()

        // Usar StringUtils.capitalizeWords si está disponible
        if (typeof StringUtils !== 'undefined' && StringUtils.capitalizeWords) {
          const capitalized = StringUtils.capitalizeWords(trimmed)
          return this.clearUpperUnions(capitalized)
        }

        // Fallback con soporte para acentos españoles
        const capitalized = trimmed.toLowerCase().replace(/(?:^|\s)([a-záéíóúüñ])/g, (match, letter) => {
          return match.replace(letter, letter.toUpperCase())
        })
        return this.clearUpperUnions(capitalized)
      } catch (error) {
        // Usar Logger si está disponible, sino console
        if (typeof Logger !== 'undefined' && Logger.warning) {
          Logger.warning('Error formateando nombre de programa:', error)
        } else {
          console.warn('Error formateando nombre de programa:', error)
        }
        return programName
      }
    },

    /**
     * Limpiar conectores que deben ir en minúsculas (excepto al inicio)
     */
    clearUpperUnions(title) {
      if (!title || typeof title !== 'string') return title || ''

      // Conectores que deben ir en minúsculas (excepto al inicio)
      const connectors = [
        // Artículos
        'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
        // Preposiciones
        'de', 'del', 'al', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'bajo', 
        'entre', 'hacia', 'hasta', 'desde', 'durante', 'mediante', 'ante', 'tras', 
        'según', 'como', 'a',
        // Conjunciones
        'y', 'e', 'o', 'u', 'pero', 'mas', 'sino', 'aunque',
        // Otros conectores
        'que', 'cual', 'donde', 'cuando'
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
    },

    generateRelatedCarousel(currentProgram, allPrograms) {
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

        let debugCount = 0
        let excludedCurrent = 0
        let excludedType = 0
        let addedFaculty = 0
        let addedArea = 0
        let noCriteria = 0

        allPrograms.forEach(prog => {
          debugCount++

          // Excluir programa actual (prog.codigo vs codPrograma)
          if (prog.codigo === codPrograma) {
            excludedCurrent++
            return
          }

          const programTypeConfig = CAROUSEL_CONFIG.programTypes[prog.tipoPrograma]
          if (!programTypeConfig || !programTypeConfig.enabled) {
            excludedType++
            return
          }

          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad

          // Validar que progFaculty no sea undefined/null antes de usar replace
          if (!progFaculty || typeof progFaculty !== 'string') {
            noCriteria++
            return // Saltar este programa si no tiene facultad válida
          }

          // Comparación flexible de facultades - usar normalización
          const normalizedCurrentFaculty = normalizeFacultyName(faculty)
          const normalizedProgFaculty = normalizeFacultyName(progFaculty)
          const isSameFaculty = normalizedCurrentFaculty === normalizedProgFaculty

          // Comparar areas - IGUAL que la versión anterior que funcionaba
          let hasCommonArea = false
          if (prog.areas && Array.isArray(prog.areas) && area) {
            if (Array.isArray(area)) {
              hasCommonArea = prog.areas.some(progArea => area.includes(progArea))
            } else {
              // Cambio clave: usar areas del programa actual como array para la comparación
              const currentProgramAreas = Array.isArray(area) ? area : [area]
              hasCommonArea = prog.areas.some(progArea => currentProgramAreas.includes(progArea))
            }
          }

          if (isSameFaculty) {
            priorities.sameFaculty.push(prog)
            addedFaculty++
          } else if (hasCommonArea) {
            priorities.areaRelated.push(prog)
            addedArea++
          } else {
            noCriteria++
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

      const relatedPrograms = document.getElementById('relatedPrograms')

      if (!relatedPrograms) {
        return
      }

      if (compiledPrograms.length === 0) {
        const title = document.querySelector('#related-programs-title')
        const contain = document.querySelector('#related-programs-contain')
        if (title) title.style.display = 'none'
        if (contain) contain.style.display = 'none'
        return
      }

      // Limpiar contenedor
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
      setTimeout(() => {
        this.initializeSwiper()
      }, 100)
    },

    initializeSwiper() {
      // Destruir instancia existente si existe
      if (window.relatedProgramsSwiper) {
        window.relatedProgramsSwiper.destroy(true, true)
        window.relatedProgramsSwiper = null
      }

      if (!window.Swiper) {
        if (typeof Logger !== 'undefined' && Logger.warning) {
          Logger.warning('🔗 [RELATED] Swiper no disponible, reintentando...')
        }
        setTimeout(() => this.initializeSwiper(), 300)
        return
      }

      // Buscar el wrapper con un solo fallback
      const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')

      if (!element) {
        if (typeof Logger !== 'undefined' && Logger.warning) {
          Logger.warning('🔗 [RELATED] No se encontró contenedor del carrusel')
        }
        return
      }

      // Contar slides disponibles
      const totalSlides = element.querySelectorAll('.swiper-slide').length

      window.relatedProgramsSwiper = new window.Swiper(element, {
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

      if (typeof Logger !== 'undefined' && Logger.success) {
        Logger.success(`🔗 [RELATED] Swiper inicializado con ${totalSlides} programas`)
      }
    }
  }

  // Inicializar el sistema
  try {
    if (typeof Logger !== 'undefined' && Logger.debug) {
      Logger.debug('🔗 [RELATED] Inicializando sistema de programas relacionados...')
    }
    
    RelatedProgramsSystem.init()
    
    if (typeof Logger !== 'undefined' && Logger.success) {
      Logger.success('🔗 [RELATED] Sistema inicializado correctamente')
    }
  } catch (error) {
    if (typeof Logger !== 'undefined' && Logger.error) {
      Logger.error('🔗 [RELATED] Error:', error)
    } else {
      console.error('🔗 [RELATED] Error:', error)
    }
  }
}

// Inicialización compatible con compilación IIFE y módulos
const initRelatedPrograms = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      RelatedProgramsScript()
    })
  } else {
    RelatedProgramsScript()
  }
}

// Exportar función e inicializar inmediatamente
export default initRelatedPrograms

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initRelatedPrograms()
}
