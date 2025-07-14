'use client'
import React from 'react'
import './styles.scss'

import RegistrationSteps from '../../../../../../../app/institutional/centroDeAyuda/questions/registrationSteps/page'
import RequirementsHelp from '../../../../../../../app/institutional/centroDeAyuda/questions/requirementsHelp/page'
import DataHelp from '../../../../../../../app/institutional/centroDeAyuda/questions/dataHelp/page'
import NecessaryDocumentation from '../../../../../../../app/institutional/centroDeAyuda/questions/necessaryDocumentation/page'
import WhentHelp from '../../../../../../../app/institutional/centroDeAyuda/questions/whenHelp/page'
import UploadDocuments from '../../../../../../../app/institutional/centroDeAyuda/questions/uploadDocuments/page'
import InterviewProcess from '../../../../../../../app/institutional/centroDeAyuda/questions/interviewProcess/page'

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
      { title: '¿Cuáles son los pasos para inscribirme en la universidad?', content: <RegistrationSteps /> },
      { title: '¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?', content: <RequirementsHelp /> },
      { title: '¿Dónde puedo consultar las fechas clave del proceso de admisión?', content: <DataHelp /> },
      { title: '¿Qué documentos necesito para completar mi inscripción?', content: <NecessaryDocumentation /> },
      { title: '¿Cuándo y cómo recibiré los resultados de admisión?', content: <WhentHelp /> },
      { title: '¿Cómo subo mis documentos a la plataforma?', content: <UploadDocuments /> },
      { title: '¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?', content: <InterviewProcess /> }
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
      process.textContent = 'Proceso de Inscripción'
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
        {/* No mostramos breadcrumb en la UI aquí, se maneja vía DOM */}

        {isMobile ? (
          // Versión móvil: Acordeón con todas las preguntas agrupadas al principio
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
      </section>
    )
  }
}

export default Accordion
