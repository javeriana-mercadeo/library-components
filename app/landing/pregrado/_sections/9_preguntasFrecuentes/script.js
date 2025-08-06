// ===========================================
// SISTEMA DE ACORDEÓN CON ANIMACIONES - FAQ
// ===========================================

const FAQAccordionSystem = {
  config: {
    itemSelector: '.faq__item',
    questionSelector: '.faq__question',
    answerSelector: '.faq__answer',
    iconSelector: '.faq__icon',
    subQuestionSelector: '.faq__sub-question',
    activeClass: 'active',
    hiddenClass: 'hidden',
    animationDuration: 300
  },

  init() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    if (faqItems.length === 0) {
      console.warn('❌ [FAQ] No se encontraron elementos del acordeón')
      return false
    }

    // Configurar comportamiento inicial
    this.setupInitialState()

    // Configurar eventos
    this.attachEventListeners()

    // Configurar sub-preguntas
    this.setupSubQuestions()

    return true
  },

  setupInitialState() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    faqItems.forEach(item => {
      const answer = item.querySelector(this.config.answerSelector)

      if (!item.classList.contains(this.config.activeClass)) {
        // Ocultar respuestas que no están activas
        answer.classList.add(this.config.hiddenClass)
        answer.style.display = 'none'
      } else {
        // Asegurar que la activa esté visible
        answer.classList.remove(this.config.hiddenClass)
        answer.style.display = 'block'
      }
    })
  },

  openAccordionItem(item, answer, icon) {

    // Preparar animación de entrada con más efectos
    answer.style.opacity = '0'
    answer.style.transform = 'translateY(-20px) scale(0.95)'
    answer.style.maxHeight = '0'
    answer.style.overflow = 'hidden'
    answer.style.display = 'block'
    answer.classList.remove(this.config.hiddenClass)

    // Actualizar estado visual
    item.classList.add(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-up"></i>'

    // Animar entrada con múltiples propiedades
    setTimeout(() => {
      answer.style.transition = `
        opacity ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
        transform ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
        max-height ${this.config.animationDuration + 100}ms cubic-bezier(0.4, 0, 0.2, 1)
      `
      answer.style.opacity = '1'
      answer.style.transform = 'translateY(0) scale(1)'
      answer.style.maxHeight = '500px' // Altura suficiente para el contenido
    }, 10)

    // Limpiar estilos después de la animación
    setTimeout(() => {
      answer.style.transition = ''
      answer.style.transform = ''
      answer.style.opacity = ''
      answer.style.maxHeight = ''
      answer.style.overflow = ''
    }, this.config.animationDuration + 150)
  },

  closeAccordionItem(item, answer, icon) {

    // Actualizar estado visual
    item.classList.remove(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-down"></i>'

    // Obtener la altura actual del contenido para animación suave
    const currentHeight = answer.scrollHeight
    answer.style.maxHeight = currentHeight + 'px'
    answer.style.overflow = 'hidden'

    // Forzar un reflow para que el navegador registre la altura inicial
    answer.offsetHeight

    // Aplicar animación de cierre con padding para evitar saltos
    answer.style.transition = `
      opacity ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
      transform ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
      max-height ${this.config.animationDuration + 200}ms cubic-bezier(0.4, 0, 0.2, 1),
      padding ${this.config.animationDuration + 100}ms cubic-bezier(0.4, 0, 0.2, 1)
    `

    // Animar hacia estado cerrado con padding gradual
    setTimeout(() => {
      answer.style.opacity = '0'
      answer.style.transform = 'translateY(-20px) scale(0.95)'
      answer.style.maxHeight = '0'
      answer.style.paddingBottom = '0' // Animar padding también
    }, 10)

    // Ocultar después de una animación más larga para evitar saltos
    setTimeout(() => {
      // Transición final más suave
      answer.style.transition = 'all 100ms ease-out'
      answer.style.minHeight = '0'

      // Ocultar completamente después de un delay adicional
      setTimeout(() => {
        answer.style.display = 'none'
        answer.classList.add(this.config.hiddenClass)
        answer.style.transition = ''
        answer.style.transform = ''
        answer.style.opacity = ''
        answer.style.maxHeight = ''
        answer.style.minHeight = ''
        answer.style.overflow = ''
        answer.style.paddingBottom = ''
      }, 100)
    }, this.config.animationDuration + 200)
  },

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

    // Cerrar todos los items activos con animación completa
    activeItems.forEach(({ item, answer, icon }) => {
      this.closeAccordionItemWithAnimation(item, answer, icon)
    })

    // Si el item clickeado no estaba activo, abrirlo después del cierre
    if (!isCurrentlyActive) {
      const answer = clickedItem.querySelector(this.config.answerSelector)
      const icon = clickedItem.querySelector(this.config.iconSelector)

      // Delay para permitir que se complete la animación de cierre más suavizada
      setTimeout(
        () => {
          this.openAccordionItem(clickedItem, answer, icon)
        },
        activeItems.length > 0 ? this.config.animationDuration + 250 : 0
      )
    }
  },

  closeAccordionItemWithAnimation(item, answer, icon) {

    // Actualizar estado visual inmediatamente
    item.classList.remove(this.config.activeClass)
    icon.innerHTML = '<i class="ph ph-caret-down"></i>'

    // Obtener la altura actual del contenido para animación suave
    const currentHeight = answer.scrollHeight
    answer.style.maxHeight = currentHeight + 'px'
    answer.style.overflow = 'hidden'

    // Forzar un reflow para que el navegador registre la altura inicial
    answer.offsetHeight

    // Aplicar animación de cierre con padding para evitar saltos
    answer.style.transition = `
      opacity ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
      transform ${this.config.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
      max-height ${this.config.animationDuration + 200}ms cubic-bezier(0.4, 0, 0.2, 1),
      padding ${this.config.animationDuration + 100}ms cubic-bezier(0.4, 0, 0.2, 1)
    `

    // Animar hacia estado cerrado con padding gradual
    setTimeout(() => {
      answer.style.opacity = '0'
      answer.style.transform = 'translateY(-20px) scale(0.95)'
      answer.style.maxHeight = '0'
      answer.style.paddingBottom = '0' // Animar padding también
    }, 10)

    // Ocultar después de una animación más larga para evitar saltos
    setTimeout(() => {
      // Transición final más suave
      answer.style.transition = 'all 100ms ease-out'
      answer.style.minHeight = '0'

      // Ocultar completamente después de un delay adicional
      setTimeout(() => {
        answer.style.display = 'none'
        answer.classList.add(this.config.hiddenClass)

        // Limpiar estilos de animación
        answer.style.transition = ''
        answer.style.transform = ''
        answer.style.opacity = ''
        answer.style.maxHeight = ''
        answer.style.minHeight = ''
        answer.style.overflow = ''
        answer.style.paddingBottom = ''
      }, 100)
    }, this.config.animationDuration + 200)
  },

  attachEventListeners() {
    const faqItems = document.querySelectorAll(this.config.itemSelector)

    faqItems.forEach(item => {
      const question = item.querySelector(this.config.questionSelector)

      if (!question) {
        console.warn('❌ [FAQ] Pregunta no encontrada en item:', item)
        return
      }

      // Limpiar eventos previos clonando el elemento
      const newQuestion = question.cloneNode(true)
      question.parentNode.replaceChild(newQuestion, question)

      // Agregar evento de click
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

  setupSubQuestions() {
    const subQuestions = document.querySelectorAll(this.config.subQuestionSelector)

    subQuestions.forEach(subQuestion => {
      subQuestion.addEventListener('click', function (e) {
        e.stopPropagation() // Evitar que se active el acordeón padre

        // Aquí se puede agregar funcionalidad adicional
        // Por ejemplo, abrir un modal o expandir contenido adicional
      })
    })
  }
}

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================
const FAQSystem = {
  init() {
    const systems = {
      accordion: FAQAccordionSystem.init()
    }

    const activeSystems = Object.entries(systems)
      .filter(([_, isActive]) => isActive)
      .map(([name]) => name)

    return systems
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  // Verificar que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      FAQSystem.init()
    })
  } else {
    FAQSystem.init()
  }

  // Exponer para debugging
  if (typeof window !== 'undefined') {
    window.FAQAccordionSystem = FAQAccordionSystem
    window.FAQSystem = FAQSystem
  }
}
