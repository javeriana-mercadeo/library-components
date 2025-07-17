// Accordion JS completo con mejoras para modo edición en Liferay + Migas de pan
(function () {
  'use strict'

  let currentState = {
    activeIndex: null,
    isCollapsed: false,
    isMobile: false,
    currentTitle: '',
    currentSection: 'Centro de Ayuda',
    isEditMode: false
  }

  const breadcrumb = {
    update(title) {
      if (currentState.isMobile) return

      let breadcrumb = document.querySelector('.breadcrumH')

      if (!breadcrumb) {
        breadcrumb = document.createElement('div')
        breadcrumb.className = 'breadcrumH container'

        const helpCenter = document.createElement('a')
        helpCenter.href = '/institutional/helpPage/help'
        helpCenter.innerHTML = '<i class="ph ph-arrow-bend-up-left iconCenter"></i> Centro de Ayuda'
        helpCenter.onclick = function () {
          sessionStorage.removeItem('currentSection')
        }
        breadcrumb.appendChild(helpCenter)

        breadcrumb.appendChild(document.createTextNode(' / '))

        const sectionElement = document.createElement('span')
        sectionElement.textContent = currentState.currentSection
        sectionElement.className = 'section-name'
        breadcrumb.appendChild(sectionElement)

        if (title && title.trim()) {
          breadcrumb.appendChild(document.createTextNode(' / '))
          const currentPage = document.createElement('span')
          currentPage.className = 'current-page'
          currentPage.textContent = title
          breadcrumb.appendChild(currentPage)
        }

        const container = document.querySelector('.accordion-container') || document.body
        container.parentNode.insertBefore(breadcrumb, container)
      } else {
        const sectionElement = breadcrumb.querySelector('.section-name')
        if (sectionElement) {
          sectionElement.textContent = currentState.currentSection
        }

        let currentPage = breadcrumb.querySelector('.current-page')
        if (title && title.trim()) {
          if (currentPage) {
            currentPage.textContent = title
          } else {
            breadcrumb.appendChild(document.createTextNode(' / '))
            currentPage = document.createElement('span')
            currentPage.className = 'current-page'
            currentPage.textContent = title
            breadcrumb.appendChild(currentPage)
          }
        } else if (currentPage) {
          const prev = currentPage.previousSibling
          if (prev && prev.nodeType === Node.TEXT_NODE) breadcrumb.removeChild(prev)
          breadcrumb.removeChild(currentPage)
        }
      }

      document.title = title ? `${title} - ${currentState.currentSection} - Centro de Ayuda` : `${currentState.currentSection} - Centro de Ayuda`
    },

    hide() {
      const bc = document.querySelector('.breadcrumH')
      if (bc) bc.style.display = 'none'
    },

    show() {
      const bc = document.querySelector('.breadcrumH')
      if (bc) bc.style.display = ''
    }
  }

  function detectEditMode() {
    return !!(
      window.location.href.includes('p_l_mode=edit') ||
      document.querySelector('.portlet-layout .portlet-column .portlet-dropzone') ||
      (window.Liferay && window.Liferay.Session && window.Liferay.Session.get('state') === 'EDIT') ||
      document.body.classList.contains('layout-mode-edit')
    )
  }

  function updateDropZone(targetId) {
    const allPanels = document.querySelectorAll('.accordion-panel')
    const targetPanel = document.querySelector(`[data-panel="${targetId}"]`)
    if (!targetPanel) return false

    if (currentState.isEditMode) {
      allPanels.forEach(panel => {
        panel.style.display = panel === targetPanel ? 'block' : 'none'
        panel.style.visibility = panel === targetPanel ? 'visible' : 'hidden'

        const dropZone = panel.querySelector('lfr-drop-zone')
        if (dropZone) {
          dropZone.style.display = 'block'
          dropZone.style.visibility = 'visible'
        }
      })
      return true
    }

    allPanels.forEach(panel => {
      panel.classList.remove('active')
      panel.style.display = 'none'
    })

    targetPanel.classList.add('active')
    targetPanel.style.display = 'block'
    return true
  }

  function toggleAccordion(element) {
    const targetId = element.getAttribute('data-target')
    const questionTitle = element.textContent.trim()
    if (!targetId) return

    if (currentState.isEditMode) {
      updateDropZone(targetId)
      return
    }

    const allButtons = document.querySelectorAll('.question-button')
    allButtons.forEach(btn => {
      btn.classList.remove('active')
      const icon = btn.querySelector('i')
      if (icon) icon.className = 'ph ph-caret-down'
    })

    element.classList.add('active')
    const icon = element.querySelector('i')
    if (icon) icon.className = 'ph ph-caret-up'

    currentState.currentTitle = questionTitle
    currentState.activeIndex = Array.from(allButtons).indexOf(element)

    updateDropZone(targetId)
    breadcrumb.update(questionTitle)
  }

  function handleEditMode() {
    const questionButtons = document.querySelectorAll('.question-button')
    const allPanels = document.querySelectorAll('.accordion-panel')

    if (currentState.isEditMode) {
      questionButtons.forEach(button => {
        button.style.pointerEvents = 'auto'
        button.style.cursor = 'pointer'
      })

      allPanels.forEach(panel => {
        panel.style.display = 'none'
        panel.classList.add('edit-mode-visible')

        const dropZone = panel.querySelector('lfr-drop-zone')
        if (dropZone) {
          dropZone.style.display = 'block'
          dropZone.style.visibility = 'visible'
        }
      })
    } else {
      questionButtons.forEach(button => {
        button.style.pointerEvents = 'auto'
        button.style.cursor = 'pointer'
      })

      allPanels.forEach(panel => {
        panel.classList.remove('edit-mode-visible')
        panel.style.display = 'none'
      })

      const firstPanel = allPanels[0]
      if (firstPanel) {
        firstPanel.classList.add('active')
        firstPanel.style.display = 'block'
        currentState.activeIndex = 0
      }
    }
  }

  function setupEventListeners() {
    const questionButtons = document.querySelectorAll('.question-button')
    questionButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault()
        toggleAccordion(this)
      })
    })
  }

  function initializeAccordion() {
    currentState.isEditMode = detectEditMode()
    currentState.isMobile = window.innerWidth <= 767
    setupEventListeners()
    handleEditMode()
    if (!currentState.isMobile) breadcrumb.update('')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccordion)
  } else {
    initializeAccordion()
  }

  window.initAccordion = initializeAccordion
})()