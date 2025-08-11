import { Button as Btn, Paragraph, Title, Image } from '@library/components'

const ModalForm = () => {
  return (
    <div className='modal-overlay' id='modal-overlay'>
      <div
        className='contact-modal justify-center items-center'
        id='contact-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'>
        {/* Imagen lateral - Solo visible en desktop */}

        <Image
          id='modal-image'
          src='https://www.javeriana.edu.co/recursosdb/d/info-prg/img_7769-1-'
          alt='Imagen decorativa del modal'
          className='modal-image'
        />

        {/* Contenedor del formulario */}
        <div className='modal-form-container'>
          {/* Header del Modal */}
          <div className='modal-header'>
            <Title id='title-form' hierarchy='h3' size='2xl' weight='bold' isEditable={false}>
              ¿Tienes dudas?
            </Title>

            <Btn
              variant='light'
              id='modal-close'
              aria-label='Cerrar modal'
              type='button'
              isEditable={false}
              startIcon={<i className='ph ph-x'></i>}
              iconOnly>
              botón de cerrar
            </Btn>
          </div>

          {/* Contenido del Modal */}
          <div className='modal-content'>
            <form id='formProgram' className='form-modules' aria-label='Prueba 1: Configuración Base' noValidate>
              {/* HEADER: Solo título fijo */}
              <div className='form-header'>
                <Paragraph id='title-form' isEditable={false}>
                  Déjanos tus datos y te contactaremos para brindarte toda la información.
                </Paragraph>
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
                  <p>
                    ¿Autorizas el tratamiento de tus datos personales de acuerdo con la
                    <a href='https://cloud.cx.javeriana.edu.co/tratamiento_Datos_Javeriana_Eventos.html' target='_blank'>
                      Política de Protección de Datos Personales
                    </a>
                    ?
                  </p>
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
      </div>
    </div>
  )
}

export default ModalForm
