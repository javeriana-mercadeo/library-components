// ===========================================
// SISTEMA DE ACORDEÓN FAQ - PREGUNTAS FRECUENTES
// ===========================================

const FAQAccordionSystem = {
  config: {
    itemSelector: '.faq__item',
    questionSelector: '.faq__question',
    answerSelector: '.faq__answer',
    iconSelector: '.faq__icon',
    subQuestionSelector: '.faq__sub-question',
    richContentSelector: '.faq-rich-content',
    activeClass: 'active',
    hiddenClass: 'hidden',
    animationDuration: 300
  },

  init() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    if (faqItems.length === 0) {
      return false
    }

    this.processRichContent()
    this.setupInitialState()
    this.attachEventListeners()
    this.setupSubQuestions()

    return true
  },

  // Procesar contenido enriquecido desde el CMS
  processRichContent() {
    const richContentElements = document.querySelectorAll(this.config.richContentSelector)

    if (richContentElements.length === 0) return

    richContentElements.forEach(element => {
      let content = element.getAttribute('data-raw-content')

      if (content) {
        content = this.decodeHtmlEntities(content)

        if (!content.includes('<') && !content.includes('&lt;')) {
          content = content.replace(/\n\n/g, '</p><p>')
          content = content.replace(/\n/g, '<br>')
          content = '<p>' + content + '</p>'
        }

        element.innerHTML = content
      }
    })
  },

  // Decodificar entidades HTML
  decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea')
    let decoded = text
    let previousDecoded = ''

    // Hasta 3 intentos de decodificación
    for (let i = 0; i < 3 && decoded !== previousDecoded; i++) {
      previousDecoded = decoded
      textarea.innerHTML = decoded
      decoded = textarea.value
    }

    return decoded
  },

  // Configurar estado inicial del acordeón
  setupInitialState() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    faqItems.forEach(item => {
      const answer = item.querySelector(this.config.answerSelector)

      if (!item.classList.contains(this.config.activeClass)) {
        answer.classList.add(this.config.hiddenClass)
        answer.style.display = 'none'
      } else {
        answer.classList.remove(this.config.hiddenClass)
        answer.style.display = 'block'
      }
    })
  },

  // Abrir item del acordeón con animación
  openAccordionItem(item, answer, icon) {
    // Preparar elementos para animación
    answer.style.display = 'block'
    answer.style.height = 'auto'
    answer.style.maxHeight = 'none'
    answer.style.opacity = '0'
    answer.style.overflow = 'hidden'
    const targetHeight = answer.scrollHeight

    // Estado inicial de animación
    answer.style.height = '0px'
    answer.style.maxHeight = '0px'
    answer.style.transform = 'translateY(-10px)'
    answer.style.paddingTop = '0px'
    answer.style.paddingBottom = '0px'
    answer.classList.remove(this.config.hiddenClass)

    // Actualizar estado visual
    item.classList.add(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-up"></i>'

    // Forzar reflow
    answer.offsetHeight

    // Aplicar transición suave
    answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `

    // Animar hacia estado final
    requestAnimationFrame(() => {
      answer.style.height = `${targetHeight}px`
      answer.style.maxHeight = `${targetHeight + 20}px`
      answer.style.opacity = '1'
      answer.style.transform = 'translateY(0)'
      answer.style.paddingTop = ''
      answer.style.paddingBottom = ''
    })

    // Limpiar estilos después de la animación
    setTimeout(() => {
      answer.style.transition = ''
      answer.style.height = 'auto'
      answer.style.maxHeight = 'none'
      answer.style.transform = ''
      answer.style.opacity = ''
      answer.style.overflow = 'visible'
      answer.style.paddingTop = ''
      answer.style.paddingBottom = ''
    }, this.config.animationDuration + 50)
  },

  // Cerrar item del acordeón con animación
  closeAccordionItem(item, answer, icon) {
    // Actualizar estado visual
    item.classList.remove(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-down"></i>'

    // Preparar animación de cierre
    const currentHeight = answer.scrollHeight
    answer.style.height = `${currentHeight}px`
    answer.style.maxHeight = `${currentHeight}px`
    answer.style.overflow = 'hidden'
    answer.style.opacity = '1'
    answer.style.transform = 'translateY(0)'

    // Forzar reflow
    answer.offsetHeight

    // Aplicar transición suave
    answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `

    // Animar hacia estado cerrado
    requestAnimationFrame(() => {
      answer.style.height = '0px'
      answer.style.maxHeight = '0px'
      answer.style.opacity = '0'
      answer.style.transform = 'translateY(-10px)'
      answer.style.paddingTop = '0px'
      answer.style.paddingBottom = '0px'
    })

    // Ocultar completamente después de la animación
    setTimeout(() => {
      answer.style.display = 'none'
      answer.classList.add(this.config.hiddenClass)

      // Limpiar estilos
      answer.style.transition = ''
      answer.style.height = ''
      answer.style.maxHeight = ''
      answer.style.opacity = ''
      answer.style.transform = ''
      answer.style.overflow = ''
      answer.style.paddingTop = ''
      answer.style.paddingBottom = ''
    }, this.config.animationDuration + 50)
  },

  // Toggle del acordeón (solo una pregunta abierta a la vez)
  toggleAccordion(clickedItem) {
    const faqItems = document.querySelectorAll(this.config.itemSelector)
    const isCurrentlyActive = clickedItem.classList.contains(this.config.activeClass)
    const activeItems = []

    // Identificar items activos que se van a cerrar
    faqItems.forEach(item => {
      if (item.classList.contains(this.config.activeClass)) {
        const answer = item.querySelector(this.config.answerSelector)
        const icon = item.querySelector(this.config.iconSelector)
        activeItems.push({ item, answer, icon })
      }
    })

    // Cerrar todos los items activos
    activeItems.forEach(({ item, answer, icon }) => {
      this.closeAccordionItem(item, answer, icon)
    })

    // Si el item clickeado no estaba activo, abrirlo después del cierre
    if (!isCurrentlyActive) {
      const answer = clickedItem.querySelector(this.config.answerSelector)
      const icon = clickedItem.querySelector(this.config.iconSelector)

      setTimeout(
        () => {
          this.openAccordionItem(clickedItem, answer, icon)
        },
        activeItems.length > 0 ? this.config.animationDuration + 100 : 0
      )
    }
  },

  // Configurar event listeners
  attachEventListeners() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    faqItems.forEach((item, index) => {
      const question = item.querySelector(this.config.questionSelector)

      if (!question) {
        return
      }

      // Limpiar eventos previos
      const newQuestion = question.cloneNode(true)
      question.parentNode.replaceChild(newQuestion, question)

      // Evento de click
      newQuestion.addEventListener('click', e => {
        e.preventDefault()
        this.toggleAccordion(item)
      })

      // Soporte de teclado para accesibilidad
      newQuestion.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.toggleAccordion(item)
        }
      })
    })
  },

  // Configurar sub-preguntas
  setupSubQuestions() {
    const subQuestions = document.querySelectorAll(this.config.subQuestionSelector)

    subQuestions.forEach(subQuestion => {
      subQuestion.addEventListener('click', function (e) {
        e.stopPropagation() // Evitar que se active el acordeón padre
        // Aquí se puede agregar funcionalidad adicional
      })
    })
  }
}

// ===========================================
// SISTEMA DE REQUISITOS API
// ===========================================
const RequirementsSystem = {
  config: {
    apiBaseUrl: 'https://www.javeriana.edu.co/JaveMovil/ValoresMatricula-1/rs/psujsfvaportals/getrequisitos',
    containerSelector: '[puj-data-requirements]'
  },

  async fetchRequirements(programCode) {
    if (!programCode) {
      throw new Error('Program code is required')
    }

    const url = `${this.config.apiBaseUrl}?codprograma=${programCode}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  },

  processRequirementsData(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return { categories: [], programInfo: null }
    }

    const programInfo = {
      code: data[0].acadProg,
      name: data[0].ujDescProg,
      admissionType: data[0].admitType,
      activityDescription: data[0].activityDescr
    }

    // Agrupar por categoría
    const categoriesMap = new Map()

    data.forEach(item => {
      const category = item.ujDescr100
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, {
          name: category,
          weight: item.descr,
          criteria: []
        })
      }

      categoriesMap.get(category).criteria.push({
        name: item.ujGrupoCriterios,
        weight: item.descr,
        maxScore: item.descr1
      })
    })

    const categories = Array.from(categoriesMap.values())

    return { categories, programInfo }
  },

  generateRequirementsHTML(processedData) {
    const { categories, programInfo } = processedData

    if (!programInfo) {
      return '<p>No se pudieron cargar los requisitos del programa.</p>'
    }

    let html = `
        <table border='1' cellPadding='1' cellSpacing='1' style='width: 100%'>
          <caption>Criterios de Evaluación - ${programInfo.name}</caption>
          <tbody>
            <tr>
              <td><strong>Categoría</strong></td>
              <td><strong>Criterio</strong></td>
              <td><strong>Peso (%)</strong></td>
              <td><strong>Puntaje Max</strong></td>
            </tr>`

    categories.forEach(category => {
      const criteriaCount = category.criteria.length

      category.criteria.forEach((criterion, index) => {
        html += `
            <tr>
              ${index === 0 ? `<td rowSpan="${criteriaCount}"><strong>${category.name} (${category.weight}%)</strong></td>` : ''}
              <td>${criterion.name}</td>
              <td>${criterion.weight}</td>
              <td>${criterion.maxScore}</td>
            </tr>`
      })
    })

    html += `
          </tbody>
        </table>

        <div class='overflow-auto portlet-msg-info'>
          <strong>Tipo de admisión:</strong> ${programInfo.admissionType} | <strong>Modalidad:</strong> ${programInfo.activityDescription}
        </div>`

    return html
  },

  async renderRequirements(programCode) {
    const container = document.querySelector(this.config.containerSelector)

    if (!container) {
      return false
    }

    if (!programCode) {
      return false
    }

    // Mostrar loading
    container.innerHTML = '<p>Cargando criterios de evaluación...</p>'

    try {
      // Obtener datos
      const data = await this.fetchRequirements(programCode)

      // Procesar datos
      const processedData = this.processRequirementsData(data)

      // Generar HTML
      const html = this.generateRequirementsHTML(processedData)

      // Renderizar
      container.innerHTML = html

      return true
    } catch (error) {
      container.innerHTML =
        '<div class="overflow-auto portlet-msg-error">No se pudieron cargar los criterios de evaluación para este programa. Verifique su conexión e intente nuevamente.</div>'
      return false
    }
  },

  setupEventListeners() {
    // Escuchar el evento personalizado data_load-program
    document.addEventListener('data_load-program', event => {
      const programData = event.detail?.dataProgram
      const programCode = programData?.codPrograma || programData?.codigo

      if (programCode) {
        this.renderRequirements(programCode)
      }
    })

    // También escuchar cambios dinámicos en el DOM por si el contenedor se agrega después
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const container =
              node.querySelector?.(this.config.containerSelector) || (node.matches?.(this.config.containerSelector) ? node : null)

            if (container && !container.hasAttribute('data-requirements-initialized')) {
              container.setAttribute('data-requirements-initialized', 'true')
            }
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    this.mutationObserver = observer
  },

  init() {
    // Configurar listeners de eventos
    this.setupEventListeners()

    return true
  },

  // Método para limpiar recursos cuando sea necesario
  destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }

    document.removeEventListener('data_load-program', this.handleProgramEvent)
  }
}

// ===========================================
// SISTEMA PRINCIPAL FAQ
// ===========================================
const FAQSystem = {
  init() {
    const systems = {
      accordion: FAQAccordionSystem.init(),
      requirements: RequirementsSystem.init()
    }

    return systems
  }
}

// ===========================================
// INICIALIZACIÓN
// ===========================================
const initializeFAQ = () => {
  // Exponer para debugging en desarrollo
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.FAQAccordionSystem = FAQAccordionSystem
    window.FAQSystem = FAQSystem
  }

  // Inicializar FAQ
  FAQSystem.init()
}

export default initializeFAQ

// También ejecutar inmediatamente en caso de compilación IIFE
if (typeof window !== 'undefined') {
  initializeFAQ()
}
