'use client'
import './styles.scss'

import React from 'react'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      isCollapsed: false, // CAMBIO: Siempre desplegado
      isMobile: false,
      currentTitle: '',
      currentSection: 'Centro de Ayuda' // Valor por defecto
    }
  }

  componentDidMount() {
    const isMobileView = window.innerWidth < 1200
    
    // Detectar sección automáticamente
    const detectedSection = this.detectCurrentSection()
    
    this.setState(
      {
        isCollapsed: false, // CAMBIO: Siempre desplegado
        isMobile: isMobileView,
        currentSection: detectedSection,
        currentTitle: this.getAccordionData()[0].title
      },
      () => {
        if (!this.state.isMobile) {
          this.updateBreadcrumb(this.state.currentTitle)
        }
      }
    )

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  // Detectar sección automáticamente - SIN nombres hardcodeados
  detectCurrentSection = () => {
    // 1. Props pasadas al componente (prioridad máxima)
    if (this.props.sectionName) {
      return this.props.sectionName
    }

    // 2. SessionStorage (navegación previa)
    if (typeof window !== 'undefined') {
      const storedSection = sessionStorage.getItem('currentSection')
      if (storedSection) {
        return storedSection
      }
    }

    // 3. Parámetros de URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const sectionParam = urlParams.get('section')
      if (sectionParam) {
        return decodeURIComponent(sectionParam)
      }
    }

    // 4. Elemento en el DOM con data-section
    if (typeof document !== 'undefined') {
      const sectionElement = document.querySelector('[data-current-section]')
      if (sectionElement) {
        return sectionElement.getAttribute('data-current-section') || sectionElement.textContent.trim()
      }
    }

    // 5. Meta tag en el head
    if (typeof document !== 'undefined') {
      const metaSection = document.querySelector('meta[name="section"]')
      if (metaSection) {
        return metaSection.getAttribute('content')
      }
    }

    // 6. Título de la página (extraer sección si sigue un patrón)
    if (typeof document !== 'undefined') {
      const pageTitle = document.title
      // Buscar patrones como "Becas - Centro de Ayuda" o "Admisiones | Universidad"
      const patterns = [
        /^([^-|]+)\s*[-|]\s*Centro de Ayuda/i,
        /^([^-|]+)\s*[-|]\s*Universidad/i,
        /^([^-|]+)\s*[-|]/i
      ]
      
      for (const pattern of patterns) {
        const match = pageTitle.match(pattern)
        if (match && match[1]) {
          return match[1].trim()
        }
      }
    }

    // 7. Valor por defecto
    return 'Centro de Ayuda'
  }

  handleResize = () => {
    const isMobileView = window.innerWidth < 1200
    const wasDesktop = !this.state.isMobile
    const nowMobile = isMobileView

    this.setState(
      {
        isCollapsed: false, // CAMBIO: Siempre desplegado
        isMobile: isMobileView
      },
      () => {
        if (wasDesktop && nowMobile) {
          this.hideBreadcrumb()
        } else if (!wasDesktop && !nowMobile) {
          this.updateBreadcrumb(this.state.currentTitle)
        }
      }
    )
  }

  getAccordionData = () => {
    return [
      { 
        id: 'types-financing',
        title: '¿Qué tipos de becas ofrece la Universidad Javeriana?', 
        content: <lfr-drop-zone data-lfr-drop-zone-id="types-financing"></lfr-drop-zone> 
      },
      { 
        id: 'application-financing',
        title: '¿Cómo puedo aplicar a una beca en la Javeriana?', 
        content: <lfr-drop-zone data-lfr-drop-zone-id="application-financing"></lfr-drop-zone> 
      },
      { 
        id: 'financing-requirements',
        title: '¿Cuáles son los requisitos para mantener una beca?', 
        content: <lfr-drop-zone data-lfr-drop-zone-id="financing-requirements"></lfr-drop-zone> 
      },
      { 
        id: 'financing-options',
        title: '¿Cuáles son las opciones de financiación para pagar la matrícula?', 
        content: <lfr-drop-zone data-lfr-drop-zone-id="financing-options"></lfr-drop-zone> 
      },
      { 
        id: 'financing-javeriana',
        title: '¿La Javeriana ofrece descuentos en la matrícula?', 
        content: <lfr-drop-zone data-lfr-drop-zone-id="financing-javeriana"></lfr-drop-zone> 
      }
    ]
  }

  hideBreadcrumb = () => {
    const breadcrumb = document.querySelector('.breadcrumb')
    if (breadcrumb) {
      breadcrumb.style.display = 'none'
    }
  }

  showBreadcrumb = () => {
    const breadcrumb = document.querySelector('.breadcrumb')
    if (breadcrumb) {
      breadcrumb.style.display = ''
    }
  }

  toggleAccordion = index => {
    const selectedTitle = this.getAccordionData()[index].title

    this.setState(
      prevState => {
        const isSameIndex = prevState.activeIndex === index
        const shouldCollapse = prevState.isMobile && isSameIndex

        return {
          activeIndex: shouldCollapse ? null : index,
          currentTitle: shouldCollapse ? '' : selectedTitle
        }
      },
      () => {
        if (!this.state.isMobile && this.state.activeIndex !== null) {
          this.updateBreadcrumb(this.state.currentTitle)
        }
      }
    )
  }

  toggleAllAccordions = () => {
    // DESHABILITADO: No permitir colapsar en ningún dispositivo
    return;
  }

  // Migas de pan automáticas - SIN nombres hardcodeados
  updateBreadcrumb = title => {
    if (this.state.isMobile) {
      return
    }

    let breadcrumb = document.querySelector('.breadcrumb')

    if (!breadcrumb) {
      breadcrumb = document.createElement('div')
      breadcrumb.className = 'breadcrumb'

      // Centro de Ayuda (enlace principal)
      const helpCenter = document.createElement('a')
      helpCenter.href = '/institutional/helpPage/help'
      helpCenter.innerHTML = '<i class="ph ph-arrow-bend-up-left iconCenter"></i> Centro de Ayuda'
      helpCenter.onclick = () => {
        // Limpiar navegación y volver al inicio
        sessionStorage.removeItem('currentSection')
      }
      breadcrumb.appendChild(helpCenter)

      breadcrumb.appendChild(document.createTextNode(' / '))

      // Sección actual (automática)
      const sectionElement = document.createElement('span')
      sectionElement.textContent = this.state.currentSection
      sectionElement.className = 'section-name'
      breadcrumb.appendChild(sectionElement)

      // Solo mostrar separador y pregunta si hay una pregunta específica
      if (title && title.trim()) {
        breadcrumb.appendChild(document.createTextNode(' / '))
        
        const currentPage = document.createElement('span')
        currentPage.className = 'current-page'
        currentPage.textContent = title
        breadcrumb.appendChild(currentPage)
      }

      // Insertar en el DOM
      const accordionContainer = document.querySelector('.accordion-container')
      if (accordionContainer) {
        accordionContainer.parentNode.insertBefore(breadcrumb, accordionContainer)
      } else {
        const mainContainer = document.querySelector('main')
        if (mainContainer) {
          mainContainer.insertBefore(breadcrumb, mainContainer.firstChild)
        } else {
          document.body.insertBefore(breadcrumb, document.body.firstChild)
        }
      }
    } else {
      // Actualizar breadcrumb existente
      const sectionElement = breadcrumb.querySelector('.section-name')
      if (sectionElement) {
        sectionElement.textContent = this.state.currentSection
      }

      // Actualizar o crear la pregunta actual
      let currentPage = breadcrumb.querySelector('.current-page')
      
      if (title && title.trim()) {
        if (currentPage) {
          currentPage.textContent = title
        } else {
          // Agregar separador y pregunta si no existen
          const separator = document.createTextNode(' / ')
          breadcrumb.appendChild(separator)
          
          currentPage = document.createElement('span')
          currentPage.className = 'current-page'
          currentPage.textContent = title
          breadcrumb.appendChild(currentPage)
        }
      } else {
        // Remover pregunta actual si no hay título
        if (currentPage) {
          const previousSibling = currentPage.previousSibling
          if (previousSibling && previousSibling.nodeType === Node.TEXT_NODE) {
            breadcrumb.removeChild(previousSibling) // Remover separador
          }
          breadcrumb.removeChild(currentPage)
        }
      }

      this.showBreadcrumb()
    }

    // Actualizar título de la página dinámicamente
    let pageTitle = 'Centro de Ayuda'
    if (this.state.currentSection && this.state.currentSection !== 'Centro de Ayuda') {
      pageTitle = `${this.state.currentSection} - Centro de Ayuda`
    }
    if (title && title.trim()) {
      pageTitle = `${title} - ${pageTitle}`
    }
    document.title = pageTitle
  }

  renderRightColumn = () => {
    const { activeIndex, isMobile } = this.state
    const accordionData = this.getAccordionData()

    if (isMobile) {
      return null
    }

    if (activeIndex === null) {
      return (
        <div className="accordion-answer drop-zone-container">
          <lfr-drop-zone data-lfr-drop-zone-id="default-content"></lfr-drop-zone>
        </div>
      )
    }

    return (
      <div className="accordion-answer drop-zone-container">
        {accordionData[activeIndex] && accordionData[activeIndex].content}
      </div>
    )
  }

  render() {
    const accordionData = this.getAccordionData()
    const { activeIndex, isCollapsed, isMobile } = this.state

    return (
      <section className="accordion-container">
        <Container>
          {isMobile ? (
            <>
              {/* MÓVIL: Header visible pero SIN funcionalidad */}
              <div className="accordion-header">
                <button className="accordion-toggle" onClick={this.toggleAllAccordions}>
                  Ver más preguntas frecuentes
                  <i className="ph ph-caret-up"></i>
                </button>
              </div>

              {/* MÓVIL: Contenido SIEMPRE visible - sin condicional isCollapsed */}
              <div className="accordion-items">
                <div className="accordion-questions mobile-questions">
                  {accordionData.map((item, index) => (
                    <button
                      key={index}
                      className={`question-button ${activeIndex === index ? 'active' : ''} mobile-question`}
                      onClick={() => this.toggleAccordion(index)}>
                      <span>{item.title}</span>
                      <i className={`ph ${activeIndex === index ? '' : ''}`}></i>
                    </button>
                  ))}
                </div>

                {activeIndex !== null && (
                  <div className="accordion-content mobile-content">
                    <div className="mobile-drop-zone-content">
                      {accordionData[activeIndex] && accordionData[activeIndex].content}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* DESKTOP: Sin header - siempre desplegado */}
              <div className="accordion-items">
                <div className="accordion-questions">
                  {accordionData.map((item, index) => (
                    <button
                      key={index}
                      className={`question-button ${activeIndex === index ? 'active' : ''}`}
                      onClick={() => this.toggleAccordion(index)}>
                      <span>{item.title}</span>
                      <i className={`ph ${activeIndex === index ? 'ph-caret-up' : 'ph-caret-down'}`}></i>
                    </button>
                  ))}
                </div>

                {this.renderRightColumn()}
              </div>
            </>
          )}
        </Container>
      </section>
    )
  }
}

export default Accordion