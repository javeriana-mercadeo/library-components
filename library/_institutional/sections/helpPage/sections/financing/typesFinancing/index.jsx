import React from 'react'
import './styles.scss'
import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
        <Title className="inscription-title">Becas y Financiación</Title>

        <div className="documentation-header">
          <h2>¿Qué tipos de becas ofrece la Universidad Javeriana?</h2>
        </div>

        <Paragraph>
          {' '}
          <p className="noteIntro ">
            La Javeriana ofrece becas en diferentes categorías para apoyar a sus estudiantes. Algunas de las principales son:
          </p>
        </Paragraph>

        <div className="documentation-links">
          {/* Becas por Excelencia Académica */}
          <div className="documentation-p">
            <h3>Becas por Excelencia Académica:</h3>
          </div>
          <div className="documentation-item">
            <ul>
              <li>
                <strong>Beca Bachiller Destacado:</strong> 80% del valor de la matrícula para los mejores estudiantes admitidos en pregrado.
              </li>
              <li>
                <strong>Beca Bachiller Destacado Colegios ACODESI:</strong> 80% de la matrícula para egresados de colegios jesuitas.
              </li>
              <li>
                <strong>Beca Bachiller Destacado Fe y Alegría:</strong> 80% de la matrícula para estudiantes de colegios de Fe y Alegría
                Bogotá.
              </li>
              <li>
                <strong>Beca Semestral por Excelencia Académica:</strong> 80% de la matrícula al estudiante con el mejor promedio ponderado
                de cada carrera.
              </li>
            </ul>
          </div>

          {/* Becas por Necesidad Económica */}
          <div className="documentation-p">
            <h3>Becas por Necesidad Económica:</h3>
          </div>
          <div className="documentation-item">
            <ul>
              <li>
                <strong>Beca INGRESA:</strong> Hasta 50% del valor de la matrícula para aspirantes admitidos con dificultades económicas.
              </li>
              <li>
                <strong>Becas Fondo Rectoral:</strong> Apoyo financiero para estudiantes con dificultades económicas que impidan continuar
                sus estudios.
              </li>
            </ul>
          </div>

          {/* Becas por Talento Especial */}
          <div className="documentation-p">
            <h3>Becas por Talento Especial:</h3>
          </div>
          <div className="documentation-item">
            <ul>
              <li>
                <strong>Beca Plan Especial Banda y Orquesta:</strong> 50% de la matrícula para estudiantes de Estudios Musicales con énfasis
                en interpretación de cuerdas, vientos y percusión.
              </li>
            </ul>
          </div>

          {/* Becas y Apoyos por Movilidad */}
          <div className="documentation-p">
            <h3>Becas y Apoyos por Movilidad:</h3>
          </div>
          <div className="documentation-item">
            <ul>
              <li>
                <strong>Beca Movilidad Nacional:</strong> 20% de descuento en la matrícula para intercambio nacional fuera de Bogotá.
              </li>
              <li>
                <strong>Beca Práctica Internacional:</strong> Reembolso del 50% de la matrícula para estudiantes que realicen prácticas en
                el exterior.
              </li>
              <li>
                <strong>Beca Intercambio Internacional:</strong> 50% de descuento en la matrícula para estudiantes en intercambio
                internacional, prioridad para universidades jesuitas o no hispanohablantes.
              </li>
              <li>
                <strong>Beca Georgetown Law:</strong> 50% de la matrícula para un estudiante de Derecho destacado que curse un semestre en
                la Universidad de Georgetown, Londres.
              </li>
              <li>
                <strong>Beca AUSJAL:</strong> Intercambio en universidades jesuitas de América Latina con exención de matrícula y apoyo
                económico.
              </li>
              <li>
                <strong>Beca PUMA:</strong> Intercambio en América Latina con tiquetes aéreos y estipendio mensual.
              </li>
              <li>
                <strong>Beca en Curso de Lengua para la Movilidad (CLM):</strong> Curso intensivo de francés, italiano o alemán con
                cobertura de libros y examen oficial.
              </li>
            </ul>
          </div>

          {/* Becas para Posgrado */}
          <div className="documentation-p">
            <h3>Becas para Posgrado:</h3>
          </div>
          <div className="documentation-item">
            <ul>
              <li>
                <strong>Beca Orden al Mérito Académico Javeriano:</strong> Para estudiantes de pregrado que obtienen distinción y desean
                estudiar un posgrado en la Javeriana.
              </li>
              <li>
                <strong>Apoyo a Estudiante Javeriano en el Exterior (Posgrado):</strong> 25% de descuento en la matrícula para una maestría
                internacional o en posgrado.
              </li>
            </ul>
          </div>
        </div>

        <Paragraph className="note">
          Consulta todas las becas disponibles aquí:
          <a href="https://www.javeriana.edu.co/becas" target="_blank" rel="noopener noreferrer">
            Portal de Becas Javeriana ↗
          </a>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
