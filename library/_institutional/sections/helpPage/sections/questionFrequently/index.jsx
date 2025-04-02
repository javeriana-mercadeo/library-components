'use client'
import React from 'react'
import './styles.scss'

import RegistrationSteps from '@library/_institutional/sections/helpPage/sections/registrationSteps'
import RequirementsHelp from '@library/_institutional/sections/helpPage/sections/requirementsHelp'
import DataHelp from '@library/_institutional/sections/helpPage/sections/dataHelp'
import NecessaryDocumentation from '@library/_institutional/sections/helpPage/sections/necessaryDocumentation'
import WhentHelp from '@library/_institutional/sections/helpPage/sections/whenHelp'
import UploadDocuments from '@library/_institutional/sections/helpPage/sections/uploadDocuments'
import InterviewProcess from '@library/_institutional/sections/helpPage/sections/interviewProcess'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/moreDoubts'
class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      isCollapsed: true // Inicialmente colapsado para evitar error en SSR
    }
  }

  componentDidMount() {
    // Aquí ya tenemos acceso a `window`
    if (window.innerWidth >= 1200) {
      this.setState({ isCollapsed: false }) // En desktop, siempre expandido
    }

    // Añadir listener para detectar cambios de tamaño de pantalla
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    if (window.innerWidth >= 1200) {
      this.setState({ isCollapsed: false })
    } else {
      this.setState({ isCollapsed: true })
    }
  }

  toggleAccordion = index => {
    this.setState(prevState => ({
      activeIndex: prevState.activeIndex === index ? null : index
    }))
  }

  toggleAllAccordions = () => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
      activeIndex: prevState.isCollapsed ? 0 : null
    }))
  }

  render() {
    const accordionData = [
      { title: '¿Cuáles son los pasos para inscribirme en la universidad?', content: <RegistrationSteps /> },
      { title: '¿Cuáles son los requisitos para aplicar a un programa de pregrado o posgrado?', content: <RequirementsHelp /> },
      { title: '¿Dónde puedo consultar las fechas clave del proceso de admisión?', content: <DataHelp /> },
      { title: '¿Qué documentos necesito para completar mi inscripción?', content: <NecessaryDocumentation /> },
      { title: '¿Cuándo y cómo recibiré los resultados de admisión?', content: <WhentHelp /> },
      { title: '¿Cómo subo mis documentos a la plataforma?', content: <UploadDocuments /> },
      { title: '¿Cómo funciona la entrevista o prueba de admisión, si mi programa la requiere?', content: <InterviewProcess /> }
    ]

    const { activeIndex, isCollapsed } = this.state

    return (
      <section className="accordion-container">
        {/* Botón de toggle (se oculta en desktop con CSS) */}
        <div className="accordion-header">
          <button className="accordion-toggle" onClick={this.toggleAllAccordions}>
            Ver más preguntas frecuentes
            <i className={`ph ${isCollapsed ? 'ph-caret-down' : 'ph-caret-up'}`}></i>
          </button>
        </div>

        {/* Contenedor de preguntas y respuestas */}
        {!isCollapsed && (
          <div className="accordion-items">
            {/* Preguntas (lado izquierdo en desktop) */}
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

            {/* Respuesta (lado derecho en desktop) */}
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
        <div className="more-doubts-container doubts-questions">
          <MoreDoubts />
        </div>
      </section>
    )
  }
}

export default Accordion
