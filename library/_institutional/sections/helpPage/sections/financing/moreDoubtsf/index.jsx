import React from 'react'
import './styles.scss'
import Paragraph from '@library/components/contain/paragraph'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
const Index = () => {
  return (
    <section className="doubts-section">
      <Container>
        <div className="container-doubts">
          <div className="title">
          <Title> ¿Tienes más dudas?</Title>
          </div>
          <div className="doubts-header">
            <div className="items-content">
              <i className="ph ph-mailbox"></i> <p>Escríbenos a:</p> <a href="mailto:admision@javeriana.edu.co">becas@javeriana.edu.co</a>
            </div>
            <div className="items-content">
              <i className="ph ph-phone-call"></i>
              <p>Llámanos al:</p>  <Paragraph><a className="phone">(+57) 000 000 0000 Ext. 0000 / 0000 / 0000</a></Paragraph>
            </div>
            <div className="items-content">
              <i className="ph ph-cursor-click"></i> <p>Explora más en la sección de Becas:</p>
              <a href="https://www.javeriana.edu.co/admisiones">Becas - Apoyos Económicos</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Index
