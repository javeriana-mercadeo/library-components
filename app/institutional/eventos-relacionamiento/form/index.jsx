'use client'

import { useEffect } from 'react'
import { Container, Logo, Title, Btn, Paragraph } from '@/app/components/index.js'
import initEventosForm from './script.js'
import './styles.scss'

export default function EventosForm() {
  useEffect(() => {
    // Inicializar el formulario de eventos
    initEventosForm()
  }, [])

  return (
    <section className='eventos-page'>
      <Container className='eventos-page__container'>
        <div className='eventos-page__content'>
          {/* Sección Izquierda */}
          <div className='eventos-page__left'>
            <Logo className='eventos-page__logo' />
            <Title hierarchy='h1' className='eventos-page__title' isEditable={false}>
              Formamos
              <br />a los mejores
              <br />
              del mundo.
            </Title>
          </div>

          {/* Sección Derecha - Formulario */}
          <div className='eventos-page__right'>
            <form id='form_SF' className='form-modules' noValidate aria-label='Formulario de contacto'>
              {/* HEADER: Solo título fijo */}
              <div className='form-header'>
                <Title hierarchy='h2' id='title-form'>
                  Regístrate aquí
                </Title>
                <Paragraph id='title-form'>Déjanos tus datos y te contactaremos para brindarte toda la información.</Paragraph>
              </div>

              {/* CONTENT: Descripción + campos + autorización con scroll */}
              <div className='form-content'>
                {/* Nombres y apellidos */}
                <div className='field-group'>
                  <div className='field'>
                    <input type='text' placeholder='*Nombre(s)' name='first_name' />
                  </div>
                  <div className='field'>
                    <input type='text' placeholder='*Apellidos' name='last_name' />
                  </div>
                </div>

                {/* Tipo de documento y número */}
                <div className='field-group'>
                  <div className='field'>
                    <select name='type_doc'>
                      <option value=''>*Tipo de documento</option>
                      <option value='CC'>Cédula Ciudadanía</option>
                      <option value='CE'>Cédula Extranjería</option>
                      <option value='PA'>Pasaporte</option>
                      <option value='TI'>Tarjeta Identidad</option>
                    </select>
                  </div>

                  <div className='field'>
                    <input type='text' name='document' placeholder='*Número de documento' />
                  </div>
                </div>

                {/* Email */}
                <div className='field'>
                  <input type='email' placeholder='*Email' name='email' />
                </div>

                {/* Teléfono */}
                <div className='field-group'>
                  <div className='field'>
                    <select name='phone_code'>
                      <option value=''>(+) Indicativo</option>
                    </select>
                  </div>
                  <div className='field'>
                    <input type='text' placeholder='*Teléfono celular' name='mobile' />
                  </div>
                </div>

                {/* Ubicación */}
                <div className='field'>
                  <select name='country'>
                    <option value=''>*País de residencia</option>
                  </select>
                </div>

                <div className='field'>
                  <select name='department' style={{ display: 'none' }}>
                    <option value=''>*Selecciona el departamento</option>
                  </select>
                </div>

                <div className='field'>
                  <select name='city' style={{ display: 'none' }}>
                    <option value=''>*Selecciona la Ciudad</option>
                  </select>
                </div>

                {/* Tipo de asistente */}
                <div className='field'>
                  <select name='type_attendee'>
                    <option value=''>*Tipo de asistente</option>
                  </select>
                </div>

                {/* Nivel académico */}
                <div className='field'>
                  <select name='academic_level' style={{ display: 'none' }}>
                    <option value=''>*Nivel académico</option>
                  </select>
                </div>

                {/* Facultad */}
                <div className='field'>
                  <select name='faculty' style={{ display: 'none' }}>
                    <option value=''>*Facultad de interés</option>
                  </select>
                </div>

                {/* Programa */}
                <div className='field'>
                  <select name='program' style={{ display: 'none' }}>
                    <option value=''>*Programa de interés</option>
                  </select>
                </div>

                {/* Período de ingreso */}
                <div className='field'>
                  <select name='admission_period' style={{ display: 'none' }}>
                    <option value=''>*Periodo esperado de Ingreso de interés</option>
                  </select>
                </div>

                {/* Autorización de datos dentro del scroll */}
                <div className='authorization-section'>
                  <p>¿Autorizas el tratamiento de tus datos personales?</p>
                  <div className='radio-group'>
                    <div className='radio-option'>
                      <input type='radio' id='auth_si_1' name='authorization_data' value='1' />
                      <label htmlFor='auth_si_1'>Sí</label>
                    </div>
                    <div className='radio-option'>
                      <input type='radio' id='auth_no_1' name='authorization_data' value='0' />
                      <label htmlFor='auth_no_1'>No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER: Solo botón fijo */}
              <div className='form-footer'>
                <Btn type='submit' variant='solid' isEditable={false} size='lg' fullWidth>
                  Enviar ahora
                </Btn>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
