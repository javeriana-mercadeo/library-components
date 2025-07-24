export default () => {
  console.log('📍 [SCRIPT] Script relacionados cargado y ejecutándose - TEST BÁSICO')
  console.log('📍 [TEST] El script SÍ se está ejecutando')

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
    displaySettings: {
      showProgramType: true,
      showFaculty: true,
      enableDebugLogs: true,
      showStatistics: true,
      enableAllLogs: true
    }
  }

  // ==========================================
  // FUNCIONES DE NORMALIZACIÓN DE FACULTADES
  // ==========================================

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
      'Arquitectura y Diseño': 'Arquitectura y Diseño',
      'Cs.Económicas y Administrativas': 'Ciencias Económicas y Administrativas'
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
      console.log('📋 INFORMACIÓN DEL PROGRAMA ACTUAL:')
      console.table({
        Código: codPrograma || 'N/A',
        Programa: programa || 'N/A',
        Facultad: Array.isArray(facultad) ? facultad.join(', ') : facultad || 'N/A',
        Áreas: Array.isArray(area) ? area.join(', ') : area || 'N/A',
        SNIES: snies || 'N/A',
        URL: url || 'N/A',
        Imagen: urlImagen || 'N/A'
      })

      console.log('📊 RESUMEN DE TODOS LOS PROGRAMAS:')
      const programSummary = allPrograms.reduce((acc, prog) => {
        const type = prog.tipoPrograma || 'Sin tipo'
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})
      console.table(programSummary)

      // DEBUG: Ver estructura de datos
      if (allPrograms.length > 0) {
        console.log('🔍 [DEBUG] Primer programa de allPrograms:', allPrograms[0])
        console.log('🔍 [DEBUG] Campos clave del primer programa:')
        const firstProg = allPrograms[0]
        console.log('  - nombre:', firstProg.nombre)
        console.log('  - urlPrograma:', firstProg.urlPrograma)
        console.log('  - urlImagenPrograma:', firstProg.urlImagenPrograma)
        console.log('  - facultad:', firstProg.facultad)
        console.log('  - areas:', firstProg.areas)
        console.log('  - tipoPrograma:', firstProg.tipoPrograma)
      }

      // DEBUG: Ver estadísticas por tipo como la versión anterior
      if (CAROUSEL_CONFIG.displaySettings.enableAllLogs && CAROUSEL_CONFIG.displaySettings.showStatistics) {
        console.log(`📊 ESTADÍSTICAS DE TODOS LOS ${allPrograms.length} PROGRAMAS:`)
        const statsByType = allPrograms.reduce((acc, prog) => {
          acc[prog.tipoPrograma] = (acc[prog.tipoPrograma] || 0) + 1
          return acc
        }, {})
        console.table(statsByType)

        // Mostrar configuración actual
        console.log('⚙️ CONFIGURACIÓN ACTUAL DEL CARRUSEL:')
        const enabledTypes = Object.entries(CAROUSEL_CONFIG.programTypes)
          .filter(([_, config]) => config.enabled)
          .map(([type, config]) => `${type} (P${config.priority})`)
        console.log('✅ Tipos habilitados:', enabledTypes.join(', '))
        console.log('📊 Máximo de programas:', CAROUSEL_CONFIG.filterSettings.maxPrograms)
      }

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

        console.log(`🔄 [DEBUG] Iniciando evaluación de ${allPrograms.length} programas...`)

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
            if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
              console.log(`  🚫 Excluido programa actual: ${prog.nombre} (${prog.codigo})`)
            }
            return
          }

          const programTypeConfig = CAROUSEL_CONFIG.programTypes[prog.tipoPrograma]
          if (!programTypeConfig || !programTypeConfig.enabled) {
            excludedType++
            if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
              console.log(`  ❌ Tipo no habilitado: ${prog.nombre} (${prog.tipoPrograma})`)
            }
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

          // DEBUG detallado para los primeros 10 programas
          if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
            console.log(`  🔍 Evaluando: ${prog.nombre}`)
            console.log(`    - Facultad prog: "${progFaculty}" → normalizada: "${normalizedProgFaculty}"`)
            console.log(`    - Facultad actual: "${faculty}" → normalizada: "${normalizedCurrentFaculty}" = ${isSameFaculty}`)
            console.log(`    - Areas prog: [${prog.areas?.join(', ')}] vs actual: "${area}" = ${hasCommonArea}`)
          }

          if (isSameFaculty) {
            priorities.sameFaculty.push(prog)
            addedFaculty++
            if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
              console.log(`    ✅ Agregado a sameFaculty`)
            }
          } else if (hasCommonArea) {
            priorities.areaRelated.push(prog)
            addedArea++
            if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
              console.log(`    ✅ Agregado a areaRelated`)
            }
          } else {
            noCriteria++
            if (debugCount <= 10 && CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
              console.log(`    ❌ No cumple criterios`)
            }
          }
        })

        // Mostrar estadísticas completas de la evaluación
        console.log(`📊 [EVALUACIÓN COMPLETA] Estadísticas de ${allPrograms.length} programas:`)
        console.log(`  🚫 Excluidos por ser programa actual: ${excludedCurrent}`)
        console.log(`  ❌ Excluidos por tipo no habilitado: ${excludedType}`)
        console.log(`  ⭐ Agregados por misma facultad: ${addedFaculty}`)
        console.log(`  📚 Agregados por área común: ${addedArea}`)
        console.log(`  ❌ No cumplen criterios: ${noCriteria}`)
        console.log(`  ✅ Total candidatos: ${addedFaculty + addedArea}`)

        // DEBUG: TABLA DE TODAS LAS FACULTADES
        console.log(`🏛️ [DEBUG FACULTADES] Análisis de todas las facultades en la API:`)

        // Extraer todas las facultades únicas de todos los programas
        const todasLasFacultades = new Set()
        allPrograms.forEach(prog => {
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          if (progFaculty && typeof progFaculty === 'string') {
            todasLasFacultades.add(progFaculty.trim())
          }
        })

        // Convertir a array y ordenar alfabéticamente
        const facultadesArray = Array.from(todasLasFacultades).sort()

        console.log(`📊 TABLA DE FACULTADES (${facultadesArray.length} facultades únicas):`)
        console.table(
          facultadesArray.map((facultad, index) => ({
            'No.': index + 1,
            'Nombre Completo': facultad,
            'Nombre Limpio': facultad.replace(/^Facultad de /i, '').trim(),
            Longitud: facultad.length
          }))
        )

        // Buscar facultades que contengan "Económicas" o "Administrativas"
        const facultadesEconomicas = facultadesArray.filter(
          fac =>
            fac.toLowerCase().includes('económicas') ||
            fac.toLowerCase().includes('economicas') ||
            fac.toLowerCase().includes('administrativas')
        )

        if (facultadesEconomicas.length > 0) {
          console.log(`💼 Facultades relacionadas con Económicas/Administrativas encontradas:`)
          facultadesEconomicas.forEach(fac => {
            console.log(`  - "${fac}"`)
          })
        } else {
          console.log(`❌ No se encontraron facultades con "Económicas" o "Administrativas"`)
        }

        // DEBUG ESPECÍFICO: Todos los programas de "Facultad de Ciencias Económicas y Administrativas"
        console.log(`💼 [DEBUG] Programas de "Facultad de Ciencias Económicas y Administrativas":`)

        const programasEconomicas = allPrograms.filter(prog => {
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          return progFaculty && progFaculty.includes('Facultad de Ciencias Económicas y Administrativas')
        })

        console.log(`📊 TABLA DE PROGRAMAS DE CS.ECONÓMICAS (${programasEconomicas.length} programas):`)
        console.table(
          programasEconomicas.map((prog, index) => ({
            'No.': index + 1,
            Nombre: prog.nombre,
            Código: prog.codigo,
            Tipo: prog.tipoPrograma,
            'Facultad Completa': Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad,
            Areas: prog.areas ? prog.areas.join(', ') : 'Sin áreas'
          }))
        )

        // Contar por tipo de programa
        const tiposPorEconomicas = programasEconomicas.reduce((acc, prog) => {
          acc[prog.tipoPrograma] = (acc[prog.tipoPrograma] || 0) + 1
          return acc
        }, {})

        console.log(`📈 Distribución por tipo de programa en Cs.Económicas:`)
        console.table(tiposPorEconomicas)

        // DEBUG ADICIONAL: Búsqueda flexible de cualquier facultad con "Económicas" y "Administrativas"
        console.log(`🔍 [DEBUG] Búsqueda flexible - cualquier facultad con "Económicas" Y "Administrativas":`)

        const programasFlexible = allPrograms.filter(prog => {
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          if (!progFaculty) return false
          const facultyLower = progFaculty.toLowerCase()
          return facultyLower.includes('económicas') && facultyLower.includes('administrativas')
        })

        console.log(`📊 BÚSQUEDA FLEXIBLE (${programasFlexible.length} programas encontrados):`)
        if (programasFlexible.length > 0) {
          console.table(
            programasFlexible.slice(0, 5).map((prog, index) => ({
              'No.': index + 1,
              Nombre: prog.nombre,
              Código: prog.codigo,
              Tipo: prog.tipoPrograma,
              'Facultad Exacta': Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
            }))
          )
        } else {
          console.log(`❌ No se encontraron programas con facultad que contenga "Económicas" Y "Administrativas"`)
        }

        // DEBUG: Mostrar algunos programas de pregrado que SÍ pasaron el filtro
        const pregradoPrograms = allPrograms.filter(prog => prog.tipoPrograma === 'Pregrado - Carrera' && prog.codigo !== codPrograma)
        console.log(`🎓 [DEBUG] TODOS los ${pregradoPrograms.length} programas de Pregrado - Carrera (excluyendo actual):`)
        pregradoPrograms.forEach((prog, i) => {
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          console.log(`  ${i + 1}. ${prog.nombre} - Facultad: "${progFaculty}" - Areas: [${prog.areas?.join(', ')}]`)
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

      console.log('🎯 [CAROUSEL] Programas encontrados:', compiledPrograms.length)
      if (compiledPrograms.length > 0) {
        console.log('🎯 [CAROUSEL] Lista de programas filtrados:')
        compiledPrograms.forEach((prog, index) => {
          console.log(`  ${index + 1}. ${prog.nombre || prog.programa} (Código: ${prog.codigo})`)
        })
      } else {
        console.log('❌ [CAROUSEL] No se encontraron programas relacionados')
        console.log('🔍 [DEBUG] Datos del programa actual para debug:')
        console.log('  - Código:', codPrograma)
        console.log('  - Facultad ACTUAL:', faculty)
        console.log('  - Área:', area)

        // DEBUG ESPECÍFICO: Comparar nombres de facultad para Económicas
        if (faculty && faculty.toLowerCase().includes('económicas')) {
          console.log('💼 [DEBUG FACULTAD ECONÓMICAS] Análisis de coincidencia de nombres:')
          console.log(`  - Facultad del programa actual: "${faculty}"`)
          console.log(`  - Facultad normalizada programa actual: "${normalizeFacultyName(faculty)}"`)

          // Buscar programas que contengan "Económicas" para comparar nombres
          const ejemplosEconomicas = allPrograms
            .filter(prog => {
              const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
              return progFaculty && progFaculty.toLowerCase().includes('económicas')
            })
            .slice(0, 3)

          if (ejemplosEconomicas.length > 0) {
            console.log(`  - Ejemplos de facultad en allPrograms:`)
            ejemplosEconomicas.forEach((prog, i) => {
              const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
              const normalizedProgFaculty = normalizeFacultyName(progFaculty)
              const match = normalizeFacultyName(faculty) === normalizedProgFaculty
              console.log(`    ${i + 1}. "${progFaculty}" → normalizada: "${normalizedProgFaculty}" → Match: ${match}`)
            })
          }
        }
        console.log('🔍 [DEBUG] Verificar primeros 5 programas de allPrograms:')
        allPrograms.slice(0, 5).forEach((prog, i) => {
          console.log(`  Programa ${i + 1}:`, {
            nombre: prog.nombre,
            codigo: prog.codigo,
            facultad: prog.facultad,
            tipoPrograma: prog.tipoPrograma,
            areas: prog.areas
          })
        })

        // DEBUG ESPECÍFICO: Ver programas de la misma facultad
        console.log('🔍 [DEBUG] Buscando programas de la facultad "Arquitectura y Diseño":')
        const sameF = allPrograms.filter(prog => {
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          return progFaculty === 'Arquitectura y Diseño'
        })
        console.log(`  Encontrados ${sameF.length} programas en la misma facultad:`)
        sameF.slice(0, 3).forEach(prog => {
          console.log(`    - ${prog.nombre} (${prog.tipoPrograma})`)
        })

        // DEBUG ESPECÍFICO: Ver programas con área similar
        console.log('🔍 [DEBUG] Buscando programas con área "Arquitectura, Diseño y Urbanismo":')
        const sameArea = allPrograms.filter(prog => {
          return prog.areas?.includes('Arquitectura, Diseño y Urbanismo')
        })
        console.log(`  Encontrados ${sameArea.length} programas con área similar:`)
        sameArea.slice(0, 3).forEach(prog => {
          console.log(`    - ${prog.nombre} (${prog.tipoPrograma}) Areas: ${prog.areas?.join(', ')}`)
        })
      }

      const relatedPrograms = document.getElementById('relatedPrograms')

      if (!relatedPrograms) {
        console.error("❌ Error: Contenedor 'relatedPrograms' no se encuentra en el DOM.")
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

        // DEBUG: Ver datos que se van a usar en la card
        console.log(`🎯 [CARD ${index + 1}] Datos para ${programName}:`, {
          nombre: programName,
          facultad: programFaculty,
          url: programUrl,
          imagen: urlImage,
          programa_completo: program
        })

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

      if (CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
        console.log('🎯 Cards creadas exitosamente:', compiledPrograms.length)
        console.log('✅ [CAROUSEL] Cards creadas y agregadas al DOM')
        console.log('🎯 [DEBUG] Contenedor final:', relatedPrograms)
        console.log('🎯 [DEBUG] Slides en contenedor:', relatedPrograms.children.length)
      }

      // Inicializar Swiper después de crear las cards - igual que la versión anterior
      setTimeout(() => {
        if (CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
          console.log('⚡ Inicializando Swiper...')
        }
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
        if (CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
          console.log('⏳ Swiper no disponible, reintentando...')
        }
        setTimeout(() => this.initializeSwiper(), 300)
        return
      }

      // Buscar el wrapper con un solo fallback - igual que la versión anterior
      const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')

      if (!element) {
        console.error('❌ Elemento swiper no encontrado')
        return
      }

      // Contar slides disponibles - igual que la versión anterior
      const totalSlides = element.querySelectorAll('.swiper-slide').length

      if (CAROUSEL_CONFIG.displaySettings.enableAllLogs) {
        console.log('🎯 [SWIPER] Inicializando con', totalSlides, 'slides')
      }

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

      console.log('✅ [SWIPER] Inicializado correctamente')
    }
  }

  // Inicializar el sistema (patrón exacto de 1_datos)
  RelatedProgramsSystem.init()
}
