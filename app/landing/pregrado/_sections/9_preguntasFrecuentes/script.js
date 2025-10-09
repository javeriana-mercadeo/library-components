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
    answer.style.display = 'block'
    answer.style.height = 'auto'
    answer.style.maxHeight = 'none'
    answer.style.opacity = '0'
    answer.style.overflow = 'hidden'
    const targetHeight = answer.scrollHeight

    answer.style.height = '0px'
    answer.style.maxHeight = '0px'
    answer.style.transform = 'translateY(-10px)'
    answer.style.paddingTop = '0px'
    answer.style.paddingBottom = '0px'
    answer.classList.remove(this.config.hiddenClass)

    item.classList.add(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-up"></i>'

    answer.offsetHeight

    answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `

    requestAnimationFrame(() => {
      answer.style.height = `${targetHeight}px`
      answer.style.maxHeight = `${targetHeight + 20}px`
      answer.style.opacity = '1'
      answer.style.transform = 'translateY(0)'
      answer.style.paddingTop = ''
      answer.style.paddingBottom = ''
    })

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
    item.classList.remove(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-down"></i>'

    const currentHeight = answer.scrollHeight
    answer.style.height = `${currentHeight}px`
    answer.style.maxHeight = `${currentHeight}px`
    answer.style.overflow = 'hidden'
    answer.style.opacity = '1'
    answer.style.transform = 'translateY(0)'

    answer.offsetHeight

    answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `

    requestAnimationFrame(() => {
      answer.style.height = '0px'
      answer.style.maxHeight = '0px'
      answer.style.opacity = '0'
      answer.style.transform = 'translateY(-10px)'
      answer.style.paddingTop = '0px'
      answer.style.paddingBottom = '0px'
    })

    setTimeout(() => {
      answer.style.display = 'none'
      answer.classList.add(this.config.hiddenClass)

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

    faqItems.forEach(item => {
      if (item.classList.contains(this.config.activeClass)) {
        const answer = item.querySelector(this.config.answerSelector)
        const icon = item.querySelector(this.config.iconSelector)
        activeItems.push({ item, answer, icon })
      }
    })

    activeItems.forEach(({ item, answer, icon }) => {
      this.closeAccordionItem(item, answer, icon)
    })

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

      const newQuestion = question.cloneNode(true)
      question.parentNode.replaceChild(newQuestion, question)

      newQuestion.addEventListener('click', e => {
        e.preventDefault()
        this.toggleAccordion(item)
      })

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
        e.stopPropagation()
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
    console.log('🔍 DEBUG: processRequirementsData - data recibida:', data)

    if (!Array.isArray(data) || data.length === 0) {
      return { categories: [], programInfo: null }
    }

    const programInfo = {
      code: data[0].acadProg,
      name: data[0].ujDescProg,
      admissionType: data[0].admitType,
      activityDescription: data[0].activityDescr
    }

    console.log('🔍 DEBUG: programInfo:', programInfo)

    // Agrupar datos por categoría
    const categoriesMap = new Map()

    data.forEach(item => {
      console.log('🔍 DEBUG: procesando item:', {
        criterio: item.ujGrupoCriterios,
        activityDescr: item.activityDescr
      })

      const category = item.ujDescr100
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, {
          name: category,
          weight: item.descr,
          criteria: []
        })
      }

      const criterionObj = {
        name: item.ujGrupoCriterios,
        weight: item.descr,
        maxScore: item.descr1,
        activityDescription: item.activityDescr
      }

      console.log('🔍 DEBUG: criterio agregado:', criterionObj)

      categoriesMap.get(category).criteria.push(criterionObj)
    })

    const categories = Array.from(categoriesMap.values())

    console.log('🔍 DEBUG: categories procesadas:', categories)

    return { categories, programInfo }
  },

  generateRequirementsHTML(processedData) {
    console.log('🔍 DEBUG: generateRequirementsHTML - processedData:', processedData)

    const { categories, programInfo } = processedData

    if (!programInfo) {
      return '<p>No se pudieron cargar los requisitos del programa.</p>'
    }

    let html = `
        <div class="requirements-table-wrapper">
          <table>
            <caption>Criterios de Evaluación - ${programInfo.name}</caption>
            <thead>
              <tr>
                <th>Criterio general</th>
                <th>Criterio interno</th>
                <th style="display: none;">Puntaje</th>
                <!-- <th>Puntaje total</th> -->
                <th>Porcentaje (%)</th>
              </tr>
            </thead>
            <tbody>`

    categories.forEach(category => {
      const criteriaCount = category.criteria.length
      const categoryWeight = category.criteria[0].weight
      const totalMaxScore = category.criteria.reduce((sum, criterion) => sum + criterion.maxScore, 0)

      category.criteria.forEach((criterion, index) => {
        console.log('🔍 DEBUG: generando HTML para criterio:', {
          name: criterion.name,
          activityDescription: criterion.activityDescription,
          hasProperty: criterion.hasOwnProperty('activityDescription')
        })

        html += `
            <tr>
              ${index === 0 ? `<td rowSpan="${criteriaCount}"><strong>${category.name}</strong></td>` : ''}
              <td>
                <div class="requirements-table__criterio-interno">
                  <strong>${criterion.name}</strong>
                  <small>${criterion.activityDescription}</small>
                </div>
              </td>
              <td class="requirements-table__cell-center" style="display: none;">${criterion.maxScore}</td>
              <!-- ${index === 0 ? `<td rowSpan="${criteriaCount}" class="requirements-table__cell-center">${totalMaxScore}</td>` : ''} -->
              ${index === 0 ? `<td rowSpan="${criteriaCount}" class="requirements-table__cell-center">${categoryWeight}%</td>` : ''}
            </tr>`
      })
    })

    html += `
            </tbody>
          </table>
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

    container.innerHTML = '<p>Cargando criterios de evaluación...</p>'

    try {
      const data = await this.fetchRequirements(programCode)

      const processedData = this.processRequirementsData(data)

      const html = this.generateRequirementsHTML(processedData)

      container.innerHTML = html

      return true
    } catch (error) {
      container.innerHTML =
        '<div class="overflow-auto portlet-msg-error">No se pudieron cargar los criterios de evaluación para este programa. Verifique su conexión e intente nuevamente.</div>'
      return false
    }
  },

  setupEventListeners() {
    // Escuchar evento de carga de programa
    document.addEventListener('data_load-program', event => {
      const programData = event.detail?.dataProgram
      const programCode = programData?.codPrograma || programData?.codigo

      if (programCode) {
        this.renderRequirements(programCode)
      }
    })

    // Observar cambios dinámicos en el DOM
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

  destroy() {
    // Limpiar recursos
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
  FAQSystem.init()
}

export default initializeFAQ

if (typeof window !== 'undefined') {
  initializeFAQ()
}
