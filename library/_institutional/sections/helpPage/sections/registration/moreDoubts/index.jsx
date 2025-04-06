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
            <i className="ph ph-mailbox"></i> <p>Escríbenos a:</p> <a href="mailto:admision@javeriana.edu.co">admision@javeriana.edu.co</a>
          </div>
          <div className="items-content">
            <i className="ph ph-phone-call"></i> <p>Llámanos al:</p> <a className="phone">(+57) 601 320 8320 Ext. 2051 / 3615 / 2087</a>
          </div>
          <div className="items-content">
            <i className="ph ph-cursor-click"></i> <p>Explora más en la sección de admisiones:</p>{' '}
            <a href="https://www.javeriana.edu.co/admisiones">Estudia en la Javeriana</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index
