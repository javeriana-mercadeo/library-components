import React from 'react'
import './styles.scss'

const Index = () => {
  return (
    <section className="form-container">
      <h2 className="form-title">¿Tienes dudas?</h2>
      <p className="form-description">Déjanos tus datos y te contactaremos para brindarte toda la información del programa.</p>

      <form className="form">
        <label className="form-label">Nombres</label>
        <input type="text" className="form-input" placeholder="Escribe tu(s) nombre(s)" />

        <label className="form-label">Apellidos</label>
        <input type="text" className="form-input" placeholder="Escribe tu(s) apellido(s)" />

        <label className="form-label">Número de documento</label>
        <input type="text" className="form-input" placeholder="Ingresa tu número de documento" />

        <label className="form-label">Celular</label>
        <input type="text" className="form-input" placeholder="Ingresa tu número de celular" />

        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-input" placeholder="Ingresa tu correo electrónico" />

        <button type="submit" className="form-button">
          Enviar Ahora
        </button>
      </form>

      <p className="form-footer">
        Al enviar el formulario, aceptas nuestra <a href="#">política de privacidad</a> y tratamiento de datos. Déjanos tus datos y te
        contactaremos para brindarte toda la información del programa.
      </p>
    </section>
  )
}

export default Index
