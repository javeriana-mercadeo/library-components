'use client'
import React, { Component, createRef } from 'react'
import './styles.scss'
import Title from '../../../../_library/components/contain/title'
import Paragraph from '../../../../_library/components/contain/paragraph'
import Container from '@library/components/container' 



class DobleTitulacion2 extends Component {
  constructor(props) {
    super(props)
    this.containerRef = createRef()
    this.rightColumnRef = createRef()
  }

  componentDidMount() {
    if (window.innerWidth > 768) {
      const container = this.containerRef.current
      const rightColumn = this.rightColumnRef.current

      this.handleWheel = e => {
        const isMouseOverRightColumn = rightColumn.contains(e.target)
        const deltaY = e.deltaY

        if (isMouseOverRightColumn) return

        const scrollTop = rightColumn.scrollTop
        const scrollHeight = rightColumn.scrollHeight
        const clientHeight = rightColumn.clientHeight
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2

        if (deltaY > 0 && !isAtBottom) {
          e.preventDefault()
          rightColumn.scrollBy({ top: deltaY, behavior: 'auto' })
        }
      }

      container.addEventListener('wheel', this.handleWheel, { passive: false })

      this.handleResize = () => {}

      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    if (this.containerRef.current && this.handleWheel) {
      this.containerRef.current.removeEventListener('wheel', this.handleWheel)
    }

    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  render() {
    return (
      <div className="doble-titulacion-container" ref={this.containerRef}>
        <Container className="content-wrapper">
          <div>
            <Title className="main-title">Doble Titulación 2</Title>

            <div className="two-column-layout">
              <div className="left-column">
                <div className="university-building">
                  <div className="overlay-content">
                    <h2 className="overlay-title">Internacionaliza tu MBA y amplía tu visión global</h2>

                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres"
                      alt="Universidad Pompeu Fabra - Edificio"
                      className="university-image mobile-only"
                    />

                    <Paragraph className="overlay-description">
                      Vive experiencias académicas en el extranjero que potencian tu perfil profesional y amplían tus oportunidades
                      laborales.
                    </Paragraph>
                  </div>

                  <img
                    src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-tres"
                    alt="Universidad Pompeu Fabra - Edificio"
                    className="university-image desktop-only"
                  />
                </div>
              </div>

              <div className="right-column" ref={this.rightColumnRef}>
                <div className="header-section">
                  <div className="title-section">
                    <h2 className="section-title">Esquema de Doble Titulación</h2>
                    <Paragraph className="university-info">
                      con la Universidad Pompeu Fabra - Barcelona School of Management (BSM)
                    </Paragraph>
                  </div>

                  <div className="logo-container">
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logobarcelona"
                      alt="Barcelona School of Management"
                      className="university-logo"
                    />
                    <img
                      src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logoUPF"
                      alt="Universidad Pompeu Fabra"
                      className="university-logo"
                    />
                  </div>
                </div>

                <div className="scroll-container">
                  <div className="program-items">
                    <div className="program-item">
                      <img
                        src="https://www.javeriana.edu.co/recursosdb/d/info-prg/tutulacion-uno"
                        alt="Campus Universitario"
                        className="program-image"
                      />
                      <div className="program-info">
                        <h3 className="program-title">Misiones Internacionales:</h3>
                        <Paragraph className="program-description">
                          Dos experiencias académicas en innovación, estrategia y emprendimiento, incluidas en la matrícula.
                        </Paragraph>
                      </div>
                    </div>

                    <div className="program-item">
                      <img
                        src="https://www.javeriana.edu.co/recursosdb/d/info-prg/titulacion-dos"
                        alt="Aula de clases"
                        className="program-image"
                      />
                      <div className="program-info">
                        <h3 className="program-title">Summer Business School:</h3>
                        <Paragraph className="program-description">
                          Programa intersemestral con docentes internacionales para complementar tu formación.
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default DobleTitulacion2
