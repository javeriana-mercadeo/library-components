export default () => {
  console.log('📍 [SCRIPT] Script relacionados cargado y ejecutándose')
  // Función de llamada a la API
  async function callApi(API) {
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: '', visibilidad: 'yes', tipoPrograma: '', areas: '', facultad: '' })
      })
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  // Función para buscar un programa específico
  function findProgramByCode(data, code) {
    return data.find(item => item.codigo === code)
  }

  // Función para compilar programas en un Set sin duplicados
  function compilePrograms(...programLists) {
    const programSet = new Set()
    programLists.flat().forEach(program => programSet.add(JSON.stringify(program)))
    return Array.from(programSet).map(program => JSON.parse(program))
  }

  // Log inicial antes del evento
  console.log('📋 [SCRIPT] Configurando evento DOMContentLoaded')
  console.log('📋 [SCRIPT] Estado del documento:', document.readyState)
  
  // Función principal para cargar programas
  const loadRelatedPrograms = async () => {
    console.log('🚀 [MAIN] Iniciando carga de programas relacionados')
    
    console.log('🔍 [MAIN] Verificando variable codPrograma...')
    console.log('🔍 [MAIN] typeof codPrograma:', typeof codPrograma)
    console.log('🔍 [MAIN] window.codPrograma:', typeof window.codPrograma)
    
    const COD_PROGRAM = typeof codPrograma !== 'undefined' ? codPrograma : 
                       typeof window.codPrograma !== 'undefined' ? window.codPrograma : 'ARQUI'
    console.log('📋 [MAIN] Código del programa final:', COD_PROGRAM)
    
    const API_PROGRAMS = 'https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program'
    console.log('🌐 Llamando API:', API_PROGRAMS)
    
    const dataPrograms = await callApi(API_PROGRAMS)
    console.log('📊 Datos recibidos:', dataPrograms ? dataPrograms.length + ' programas' : 'Sin datos')

    if (!dataPrograms || !Array.isArray(dataPrograms)) {
      console.error('No se obtuvieron datos válidos de la API.')
      return
    }

    // Buscar programa por código
    let program = findProgramByCode(dataPrograms, COD_PROGRAM)
    console.log('🔍 Programa encontrado:', program ? program.nombre : 'No encontrado')

    if (program) {
      const { areas, facultad, tipoPrograma } = program
      let faculty = Array.isArray(facultad) ? facultad[0] : facultad

      const programsByLevel = dataPrograms.filter(program => program.tipoPrograma === tipoPrograma)

      // Función mejorada para compilar programas con múltiples prioridades
      function compileOrderedPrograms(currentProgram, allPrograms) {
        const { facultad, areas, tipoPrograma, codigo } = currentProgram
        const faculty = Array.isArray(facultad) ? facultad[0] : facultad
        
        const priorities = {
          // 1. PRIORIDAD MÁXIMA: Pregrados de la misma facultad (excepto el actual)
          sameFacultyUndergrad: [],
          
          // 2A. PRIORIDAD ALTA: Programas que inician con "Maestría" de la misma facultad
          sameFacultyMaestrias: [],
          
          // 2B. PRIORIDAD ALTA-MEDIA: Otros posgrados de la misma facultad (orden alfabético)
          sameFacultyOtherPostgrad: [],
          
          // 3. PRIORIDAD MEDIA: Programas por área (cualquier facultad, mismo tipo)
          sameAreaSameType: [],
          
          // 4. PRIORIDAD BAJA: Programas por área (cualquier facultad, diferente tipo)
          sameAreaDiffType: []
        }
        
        console.log('🔄 Iniciando compilación con múltiples prioridades...')
        console.log('📋 Programa actual:', currentProgram.nombre, `(${tipoPrograma}, ${faculty})`)
        
        allPrograms.forEach(prog => {
          if (prog.codigo === codigo) return // Excluir programa actual
          
          const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
          const isSameFaculty = progFaculty === faculty
          const isSameType = prog.tipoPrograma === tipoPrograma
          const hasCommonArea = prog.areas?.some(area => areas.includes(area))
          
          if (isSameFaculty) {
            if (prog.tipoPrograma === 'PREGRADO') {
              priorities.sameFacultyUndergrad.push(prog)
              console.log(`  ⭐ Prioridad 1: ${prog.nombre} (Pregrado, ${progFaculty})`)
            } else {
              // Verificar si el nombre del programa inicia con "Maestría"
              if (prog.nombre && prog.nombre.toLowerCase().startsWith('maestría')) {
                priorities.sameFacultyMaestrias.push(prog)
                console.log(`  🎓 Prioridad 2A: ${prog.nombre} (Maestría por nombre, ${progFaculty})`)
              } else {
                priorities.sameFacultyOtherPostgrad.push(prog)
                console.log(`  📚 Prioridad 2B: ${prog.nombre} (${prog.tipoPrograma}, ${progFaculty})`)
              }
            }
          } else if (hasCommonArea) {
            if (isSameType) {
              priorities.sameAreaSameType.push(prog)
              console.log(`  📚 Prioridad 3: ${prog.nombre} (${prog.tipoPrograma}, ${progFaculty}) - Área común`)
            } else {
              priorities.sameAreaDiffType.push(prog)
              console.log(`  📖 Prioridad 4: ${prog.nombre} (${prog.tipoPrograma}, ${progFaculty}) - Área común, tipo diferente`)
            }
          }
        })
        
        // Ordenar alfabéticamente los posgrados que no son maestrías
        priorities.sameFacultyOtherPostgrad.sort((a, b) => a.nombre.localeCompare(b.nombre))
        
        // Mostrar estadísticas por prioridad
        console.log('📊 Estadísticas por prioridad:')
        console.log(`  Prioridad 1 (Pregrados misma facultad): ${priorities.sameFacultyUndergrad.length}`)
        console.log(`  Prioridad 2A (Maestrías misma facultad): ${priorities.sameFacultyMaestrias.length}`)
        console.log(`  Prioridad 2B (Otros posgrados misma facultad - alfabético): ${priorities.sameFacultyOtherPostgrad.length}`)
        console.log(`  Prioridad 3 (Área común, mismo tipo): ${priorities.sameAreaSameType.length}`)
        console.log(`  Prioridad 4 (Área común, tipo diferente): ${priorities.sameAreaDiffType.length}`)
        
        // Compilar en orden de prioridad
        const compiledPrograms = [
          ...priorities.sameFacultyUndergrad,
          ...priorities.sameFacultyMaestrias,
          ...priorities.sameFacultyOtherPostgrad,
          ...priorities.sameAreaSameType,
          ...priorities.sameAreaDiffType
        ].slice(0, 6)
        
        console.log('✅ Compilación completada, total:', compiledPrograms.length)
        return compiledPrograms
      }

      let compiledPrograms = compileOrderedPrograms(program, dataPrograms)

      // Log detallado del orden final
      console.log('📋 ORDEN FINAL DE PROGRAMAS:')
      compiledPrograms.forEach((prog, index) => {
        const progFaculty = Array.isArray(prog.facultad) ? prog.facultad[0] : prog.facultad
        const isFromSameFaculty = progFaculty === faculty
        
        let priorityLabel = '📖 P4'
        if (isFromSameFaculty) {
          if (prog.tipoPrograma === 'PREGRADO') {
            priorityLabel = '⭐ P1'
          } else if (prog.nombre && prog.nombre.toLowerCase().startsWith('maestría')) {
            priorityLabel = '🎓 P2A'
          } else {
            priorityLabel = '📚 P2B'
          }
        } else if (prog.tipoPrograma === tipoPrograma) {
          priorityLabel = '📚 P3'
        }
        
        console.log(`${index + 1}. ${prog.nombre} - ${progFaculty} ${priorityLabel}`)
      })

      console.log('✅ Programas compilados:', compiledPrograms.length, 'programas')

      const relatedPrograms = document.getElementById('relatedPrograms')

      if (!relatedPrograms) {
        console.error("❌ Error: Contenedor 'relatedPrograms' no se encuentra en el DOM.")
        return
      }

      console.log('📦 Contenedor encontrado correctamente')

      if (compiledPrograms.length === 0) {
        const title = document.querySelector('#related-programs-title')
        const contain = document.querySelector('#related-programs-contain')

        if (title) title.style.display = 'none'
        if (contain) contain.style.display = 'none'
      }

      compiledPrograms.forEach(program => {
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
              <img src="${urlImage}" alt="${program.nombre}" class="related-programs__image" loading="lazy">
              <div class="related-programs__overlay"></div>
              <div class="related-programs__content">
                <h3 class="related-programs__name">${program.nombre}</h3>
                <p class="paragraph paragraph-neutral paragraph-md related-programs__faculty">${Array.isArray(program.facultad) ? program.facultad[0] : program.facultad}</p>
                <a href="${program.urlPrograma}" class="related-programs__link" data-senna-off aria-label="Ver detalles del programa: ${program.nombre}">
                  Ver Programa <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>
        `

        relatedPrograms.appendChild(card)
      })

      console.log('🎯 Cards creadas exitosamente:', compiledPrograms.length)

      // Inicializar Swiper después de crear las cards
      setTimeout(() => {
        console.log('⚡ Inicializando Swiper...')
        initializeSwiper()
      }, 100)

    } else {
      const title = document.querySelector('#related-programs-title')
      const contain = document.querySelector('#related-programs-contain')

      if (title) title.style.display = 'none'
      if (contain) contain.style.display = 'none'

      console.log('Programa no encontrado en los datos. Con el código:', COD_PROGRAM)
    }
  }

  // Ejecutar según el estado del documento
  if (document.readyState === 'loading') {
    console.log('📋 [SCRIPT] DOM aún cargando, esperando DOMContentLoaded')
    document.addEventListener('DOMContentLoaded', loadRelatedPrograms)
  } else {
    console.log('📋 [SCRIPT] DOM ya está listo, ejecutando inmediatamente')
    loadRelatedPrograms()
  }

  // Función para actualizar estados de botones
  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.related-programs__next') || document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs__prev') || document.querySelector('.related-programs-prev')

    if (!nextBtn || !prevBtn) return
  }

  // Función para actualizar visibilidad de navegación
  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.related-programs__next') || document.querySelector('.related-programs-next')
    const prevBtn = document.querySelector('.related-programs__prev') || document.querySelector('.related-programs-prev')
  }

  // Función para actualizar visibilidad de paginación
  const updatePaginationVisibility = (swiper, totalSlides) => {
    const pagination = document.querySelector('.related-programs__pagination') || document.querySelector('.related-programs-pagination')

    if (!pagination) {
      console.warn('Paginación no encontrada')
      return
    }

    // Mostrar paginación si hay más de 1 slide
    const needsPagination = totalSlides > 1

    if (needsPagination) {
      pagination.style.display = 'flex'
      pagination.classList.remove('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'false')

      const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
      bullets.forEach((bullet, index) => {
        bullet.setAttribute('aria-label', `Ir al programa ${index + 1}`)
        bullet.style.display = 'block'
      })
    } else {
      pagination.style.display = 'none'
      pagination.classList.add('swiper-pagination-hidden')
      pagination.setAttribute('aria-hidden', 'true')
    }
  }

  // Función para contar slides dinámicamente
  const countSlides = element => {
    const slides = element.querySelectorAll('.swiper-slide')
    return slides.length
  }

  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.relatedProgramsSwiper) {
      window.relatedProgramsSwiper.destroy(true, true)
      window.relatedProgramsSwiper = null
    }

    if (!window.Swiper) {
      return
    }

    // Buscar el wrapper con un solo fallback
    const element = document.querySelector('.related-programs-swiper') || document.querySelector('.related-programs__carousel')

    // Contar slides disponibles
    const totalSlides = countSlides(element)

    window.relatedProgramsSwiper = new window.Swiper(element, {
      loop: false,
      spaceBetween: 20,
      grabCursor: true,
      allowTouchMove: true,
      slidesPerView: 'auto',

      // Paginación - SIEMPRE VISIBLE
      pagination: {
        el: '.related-programs-pagination, .related-programs__pagination',
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir al programa ${index + 1}"></span>`
        }
      },

      // Navegación - SIEMPRE VISIBLE
      navigation: {
        nextEl: '.related-programs-next, .related-programs__next',
        prevEl: '.related-programs-prev, .related-programs__prev'
      },

      // Breakpoints con cálculos como planEstudio
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
      },

      on: {
        init: function (swiper) {
          updateNavigationVisibility(swiper, totalSlides)
          updatePaginationVisibility(swiper, totalSlides)
          updateButtonStates(swiper)
        },

        update: function (swiper) {
          const currentSlides = countSlides(element)
          updateNavigationVisibility(swiper, currentSlides)
          updatePaginationVisibility(swiper, currentSlides)
          updateButtonStates(swiper)
        },

        resize: function (swiper) {
          setTimeout(() => {
            updateNavigationVisibility(swiper, totalSlides)
            updatePaginationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          }, 100)
        },

        breakpoint: function (swiper, breakpointParams) {
          setTimeout(() => {
            updateNavigationVisibility(swiper, totalSlides)
            updatePaginationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          }, 150)
        },

        slideChange: function (swiper) {
          updateButtonStates(swiper)
        },

        reachBeginning: function (swiper) {
          updateButtonStates(swiper)
        },

        reachEnd: function (swiper) {
          updateButtonStates(swiper)
        }
      }
    })
  }

  // Función de inicialización con retry como planEstudio
  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()
}
