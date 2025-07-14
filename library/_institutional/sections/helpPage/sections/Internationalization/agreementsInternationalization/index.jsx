import React from 'react'
import './styles.scss'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
const Index = () => {
  return (
    <section className="documentation-section">
      <Container>
        <h2 className="inscription-title">Internacionalización y Movilidad</h2>
        <div className="documentation-header">
          <h2>¿Cómo funcionan los convenios de doble titulación?</h2>
        </div>
        <Paragraph className="note">
          Los programas de doble titulación permiten obtener dos títulos en un mismo plan de estudios: uno de la Javeriana y otro de una
          universidad en convenio.:
        </Paragraph>
        <div className="note">
          <h3>Facultades con convenios de doble titulación:</h3>
        </div>
        <div className="options-item">
          <ul>
            <li>Filosofía</li>
            <li>Ciencias Jurídicas</li>
            <li>Arquitectura y Diseño</li>
            <li>Ciencias Económicas y Administrativas</li>
            <li>Ingeniería</li>
            <li>CienciasI</li>
          </ul>
        </div>
        <Paragraph className="note">
          <em>
            <strong>Nota:</strong> Cada convenio tiene requisitos específicos, por lo que debes revisar la información de tu facultad y
            agendar una asesoría para conocer los detalles del proceso.
          </em>
       </Paragraph>
        <Paragraph className="note">
          Contacto:
          <a href="dobletitulacion@javeriana.edu.co" target="_blank" rel="noopener noreferrer">
            dobletitulacion@javeriana.edu.co
          </a>
        </Paragraph>
      </Container>
    </section>
  )
}

export default Index
