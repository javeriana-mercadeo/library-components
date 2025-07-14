'use client'
import './styles.scss'

import React from 'react'

import TypesFinancing from '@/app/institutional/centroDeAyuda/financing/financingQuestions/typesFinancing/page'

import ApplicationFinancing from '@/app/institutional/centroDeAyuda/financing/financingQuestions/applicationFinancing/page'
import FinancingJaveriana from '@/app/institutional/centroDeAyuda/financing/financingQuestions/financingJaveriana/page'
import FinancingOptions from '@/app/institutional/centroDeAyuda/financing/financingQuestions/financingOptions/page'
import FinancingRequirements from '@/app/institutional/centroDeAyuda/financing/financingQuestions/financingRequirements/page'


import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      isCollapsed: true,
      isMobile: false,
      currentTitle: ''
    }
  }

  componentDidMount() {
    const isMobileView = window.innerWidth < 1200

    this.setState(
      {
        isCollapsed: isMobileView,
        isMobile: isMobileView,
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

  handleResize = () => {
    const isMobileView = window.innerWidth < 1200
    const wasDesktop = !this.state.isMobile
    const nowMobile = isMobileView

    this.setState(
      {
        isCollapsed: isMobileView,
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
      { title: '¿Qué tipos de becas ofrece la Universidad Javeriana?', content: <TypesFinancing /> },
      { title: '¿Cómo puedo aplicar a una beca en la Javeriana?', content: <ApplicationFinancing /> },
      { title: '¿Cuáles son los requisitos para mantener una beca?', content: <FinancingRequirements /> },
      { title: '¿Cuáles son las opciones de financiación para pagar la matrícula?', content: <FinancingOptions /> },
      { title: '¿La Javeriana ofrece descuentos en la matrícula?', content: <FinancingJaveriana /> }
    ]
  }

  // Ocultar el breadcrumb cuando estamos en móvil
  hideBreadcrumb = () => {
    const breadcrumb = document.querySelector('.breadcrumb')
    if (breadcrumb) {
      breadcrumb.style.display = 'none'
    }
  }

  // Mostrar el breadcrumb cuando estamos en desktop
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
    this.setState(
      prevState => {
        const newIsCollapsed = !prevState.isCollapsed
        const newActiveIndex = newIsCollapsed ? null : prevState.activeIndex || 0
        const newTitle = newActiveIndex !== null ? this.getAccordionData()[newActiveIndex].title : ''

        return {
          isCollapsed: newIsCollapsed,
          activeIndex: newActiveIndex,
          currentTitle: newTitle
        }
      },
      () => {
        if (!this.state.isCollapsed && this.state.activeIndex !== null && !this.state.isMobile) {
          this.updateBreadcrumb(this.state.currentTitle)
        }
      }
    )
  }

  updateBreadcrumb = title => {
    if (this.state.isMobile) {
      return
    }

    let breadcrumb = document.querySelector('.breadcrumb')

    if (!breadcrumb) {
      breadcrumb = document.createElement('div')
      breadcrumb.className = 'breadcrumb'

      const helpCenter = document.createElement('a')
      helpCenter.href = '/institutional/helpPage/help'
      helpCenter.innerHTML = '<i class="ph ph-arrow-bend-up-left iconCenter"></i> Centro de Ayuda'
      breadcrumb.appendChild(helpCenter)

      breadcrumb.appendChild(document.createTextNode(' / '))

      const process = document.createElement('span')
      process.textContent = 'Becas y Financiación'
      breadcrumb.appendChild(process)

      breadcrumb.appendChild(document.createTextNode(' / '))

      const currentPage = document.createElement('span')
      currentPage.className = 'current-page'
      currentPage.textContent = title
      breadcrumb.appendChild(currentPage)

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
      let currentPage = breadcrumb.querySelector('.current-page')
      if (currentPage) {
        currentPage.textContent = title
      } else {
        if (breadcrumb.lastChild.nodeType !== Node.TEXT_NODE || !breadcrumb.lastChild.textContent.trim().endsWith('/')) {
          breadcrumb.appendChild(document.createTextNode(' / '))
        }

        currentPage = document.createElement('span')
        currentPage.className = 'current-page'
        currentPage.textContent = title
        breadcrumb.appendChild(currentPage)
      }

      this.showBreadcrumb()
    }

    document.title = `${title} - Centro de Ayuda`
  }

  render() {
    const accordionData = this.getAccordionData()
    const { activeIndex, isCollapsed, isMobile } = this.state

    return (
      <section className="accordion-container">
        <Container>
          {isMobile ? (
            <>
              <div className="accordion-header">
                <button className="accordion-toggle" onClick={this.toggleAllAccordions}>
                  Ver más preguntas frecuentes
                  <i className={`ph ${isCollapsed ? 'ph-caret-down' : 'ph-caret-up'}`}></i>
                </button>
              </div>

              {!isCollapsed && (
                <div className="accordion-items">
                  {/* CAMBIO: Primero mostramos todas las preguntas juntas con sus iconos visibles */}
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

                  {/* CAMBIO: Luego mostramos el contenido de la pregunta activa */}
                  {activeIndex !== null && (
                    <div className="accordion-content mobile-content">
                      {typeof accordionData[activeIndex].content === 'string' ? (
                        <p>{accordionData[activeIndex].content}</p>
                      ) : (
                        accordionData[activeIndex].content
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="accordion-header">
                <button className="accordion-toggle" onClick={this.toggleAllAccordions}>
                  Ver más preguntas frecuentes
                  <i className={`ph ${isCollapsed ? 'ph-caret-down' : 'ph-caret-up'}`}></i>
                </button>
              </div>

              {!isCollapsed && (
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

                  <div className="accordion-answer">
                    {activeIndex !== null &&
                      accordionData[activeIndex] &&
                      (typeof accordionData[activeIndex].content === 'string' ? (
                        <p>{accordionData[activeIndex].content}</p>
                      ) : (
                        accordionData[activeIndex].content
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    )
  }
}

export default Accordion
