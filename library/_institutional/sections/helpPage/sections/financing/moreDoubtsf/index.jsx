import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="doubts-section">
      <div className='container-doubts'>
        <div className="title">
          <h2>¿Tienes más dudas?</h2>
        </div>
        <div className="doubts-header">
          <div className="items-content">
            <i className="ph ph-mailbox"></i> <p>Escríbenos a:</p> <a href="mailto:admision@javeriana.edu.co">becas@javeriana.edu.co</a>
          </div>
          <div className="items-content">
            <i className="ph ph-phone-call"></i> <p>Llámanos al:</p> <a className="phone">(+57) 000 000 0000 Ext. 0000 / 0000 / 0000</a>
          </div>
          <div className="items-content">
            <i className="ph ph-cursor-click"></i> <p>Explora más en la sección de Becas:</p>{' '}
            <a href="https://www.javeriana.edu.co/admisiones">Becas - Apoyos Económicos</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index
