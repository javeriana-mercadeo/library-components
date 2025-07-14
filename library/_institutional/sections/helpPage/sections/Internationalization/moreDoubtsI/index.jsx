import React from 'react'
import './styles.scss'

import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="doubts-section">
      <Container className="container-doubts">
      <div >
   
          <Title className="title-doubts"> ¿Tienes más dudas?</Title>
        
        <div className="doubts-header">
          <div className="items-content">
            <i className="ph ph-mailbox"></i> <p>Escríbenos a:</p> <a href="mailto:admision@javeriana.edu.co">correo@javeriana.edu.co</a>
          </div>
          <div className="items-content">
            <i className="ph ph-phone-call"></i> <p>Llámanos al:</p> <a className="phone">(+57) 000 000 0000 Ext. 0000 / 0000 / 0000</a>
          </div>
          <div className="items-content">
            <i className="ph ph-cursor-click"></i> <p>Explora más en la sección de Becas:</p>{' '}
            <a href="https://www.javeriana.edu.co/admisiones">Internacionalización - Movilidad</a>
          </div>
        </div>
      </div></Container>
    </section>
  )
}

export default Index
