import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="documentation-section">
      <h2 className="inscription-title">Becas y Financiación</h2>


      <div className="documentation-header">
        <h2>¿La Javeriana ofrece descuentos en la matrícula?</h2>
      </div>

      <p className="note">Sí, la universidad tiene descuentos para ciertos estudiantes:</p>


      <div className="note">
        <h3>Financiación directa con la universidad</h3>
      </div>
      <div className="options-item">
        <ul>
          <li>
            <strong>15% de descuento</strong> para el hermano más antiguo si dos hermanos estudian en pregrado simultáneamente.
          </li>
          <li>
            <strong>50% de descuento</strong> para el hermano más antiguo si tres hermanos estudian en pregrado al mismo tiempo.
          </li>
          <li>
            <strong>10% de descuento</strong> para egresados que estudien un posgrado en la Javeriana.
          </li>
          <li>
            <strong>5%-15% de descuento</strong> en posgrado para familias javerianas (según la relación familiar).
          </li>
          <li>
            <strong>Descuento del 10%</strong> para estudiantes de comunidades NARP (afrocolombianas, raizales y palenqueras).
          </li>
        </ul>
      </div>

      <p className="note">
        <em>
          <strong>Nota:</strong> Los descuentos no son acumulables con otros apoyos financieros.
        </em>
      </p>

      <p className="note">
        Consulta todas las opciones aquí:{' '}
        <a href="https://www.javeriana.edu.co/financiacion" target="_blank" rel="noopener noreferrer">
          Opciones de financiación ↗
        </a>
      </p>
    </section>
  )
}

export default Index
