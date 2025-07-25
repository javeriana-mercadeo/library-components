export default () => {
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
  // SISTEMA DE LOGGING CENTRALIZADO
  // ==========================================

  // ==========================================
  // FUNCIONES DE NORMALIZACIÓN DE FACULTADES
  // ==========================================

  /**
   * Función centralizada para manejo de logs - control maestro simple
   */
  function logMessage(message, ...args) {
    if (CAROUSEL_CONFIG.logSettings.enableLogs) {
      console.log(message, ...args)
    }
  }

  // Log de inicialización
  logMessage('📍 [SCRIPT] Sistema de programas relacionados iniciado')

  /**
   * Normaliza nombres de facultades para hacer comparaciones flexibles
   * Maneja abreviaciones y variaciones comunes
   */
  function normalizeFacultyName(facultyName) {
    if (!facultyName || typeof facultyName !== 'string') return ''

    // Limpiar espacios y quitar "Facultad de" al inicio
    let clean = facultyName.replace(/^Facultad de /i, '').trim()

    // Mapeo de abreviaciones conocidas a nombres completos
    const facultyMappings = {
      'Cs.Económicas y Administrativ.': 'Ciencias Económicas y Administrativas',
      'Cs.Económicas y Administrativas': 'Ciencias Económicas y Administrativas',
      'Cs.Políticas y Relaciones Int.': 'Ciencias Políticas y Relaciones Internacionales',
      'Arquitectura y Diseño': 'Arquitectura y Diseño'
      // Agregar más mapeos según sea necesario
    }

    // Aplicar mapeo si existe
    if (facultyMappings[clean]) {
      return facultyMappings[clean]
    }

    return clean
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

      // 📋 TABLA DE INFORMACIÓN CONSULTADA
      logMessage('📋 INFORMACIÓN DEL PROGRAMA ACTUAL:')
      if (CAROUSEL_CONFIG.logSettings.enableLogs) {
        console.table({
          Código: codPrograma || 'N/A',
          Programa: programa || 'N/A',
          Facultad: Array.isArray(facultad) ? facultad.join(', ') : facultad || 'N/A',
          Áreas: Array.isArray(area) ? area.join(', ') : area || 'N/A',
          SNIES: snies || 'N/A',
          URL: url || 'N/A',
          Imagen: urlImagen || 'N/A'
        })
      }

      // Mostrar configuración actual
      logMessage('⚙️ CONFIGURACIÓN ACTUAL DEL CARRUSEL:')
      const enabledTypes = Object.entries(CAROUSEL_CONFIG.programTypes)
        .filter(([_, config]) => config.enabled)
        .map(([type, config]) => `${type} (P${config.priority})`)
      logMessage('✅ Tipos habilitados:', enabledTypes.join(', '))
      logMessage('📊 Máximo de programas:', CAROUSEL_CONFIG.filterSettings.maxPrograms)

      let automationUpdates = {}

      if (facultad) {
        DOMUpdater.updateElementsText('data-puj-faculty', DataFormatter.formatProgramName(facultad))
        automationUpdates.faculty = true
      }

      if (allPrograms && Array.isArray(allPrograms) && allPrograms.length > 0) {
        this.generateRelatedCarousel(dataProgram, allPrograms)
      }
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

      // Logs de resultados
      logMessage('🎯 [CAROUSEL] Programas encontrados:', compiledPrograms.length)
      if (compiledPrograms.length > 0) {
        logMessage('🎯 [CAROUSEL] Lista de programas filtrados:')
        compiledPrograms.forEach((prog, index) => {
          logMessage(`  ${index + 1}. ${prog.nombre || prog.programa} (Código: ${prog.codigo})`)
        })
      } else {
        logMessage('❌ [CAROUSEL] No se encontraron programas relacionados')
      }

      const relatedPrograms = document.getElementById('relatedPrograms')

      if (!relatedPrograms) {
        logMessage("❌ Error: Contenedor 'relatedPrograms' no se encuentra en el DOM.")
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

      logMessage('✅ [CAROUSEL] Cards creadas y agregadas al DOM')

      // Inicializar Swiper después de crear las cards - igual que la versión anterior
      setTimeout(() => {
        logMessage('⚡ Inicializando Swiper...')
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
        logMessage('⏳ Swiper no disponible, reintentando...')
        setTimeout(() => this.initializeSwiper(), 300)
        return
      }

      // Buscar el wrapper con un solo fallback - igual que la versión anterior
      const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')

      if (!element) {
        logMessage('❌ Elemento swiper no encontrado')
        return
      }

      // Contar slides disponibles - igual que la versión anterior
      const totalSlides = element.querySelectorAll('.swiper-slide').length

      logMessage('🎯 [SWIPER] Inicializando con', totalSlides, 'slides')

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

      logMessage('✅ [SWIPER] Inicializado correctamente')
    }
  }

  // Inicializar el sistema (patrón exacto de 1_datos)
  RelatedProgramsSystem.init()
}
