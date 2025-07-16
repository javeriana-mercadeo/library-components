import { Button as Btn, Paragraph, Title } from '@library/components'

const ModalForm = () => {
  return (
    <div className="modal-overlay" id="modal-overlay">
      <div
        className="contact-modal justify-center items-center"
        id="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title">
        {/* Imagen lateral - Solo visible en desktop */}
        <div
          className="modal-image"
          style={{
            backgroundImage: 'url("https://bienalsca.co/wp-content/uploads/2022/11/APR2085.jpg")'
          }}
        />

        {/* Contenedor del formulario */}
        <div className="modal-form-container form-container">
          <div className="form-card">
            {/* Header del Modal */}
            <div className="modal-header">
              <Title id="title-form" hierarchy="h3" size="2xl" weight="bold" isEditable={false} id="modal-title">
                ¿Tienes dudas?
              </Title>

              <Btn
                variant="light"
                id="modal-close"
                aria-label="Cerrar modal"
                type="button"
                isEditable={false}
                startIcon={<i className="ph ph-x"></i>}
                iconOnly>
                botón de cerrar
              </Btn>
            </div>

            {/* Contenido del Modal */}
            <div className="modal-content">
              <form id="formProgram" noValidate aria-label="Inscripción Open Day">
                <div className="form-content">
                  <Paragraph id="title-form">Déjanos tus datos y te contactaremos para brindarte toda la información.</Paragraph>

                  <div className="field-group">
                    <div className="field">
                      <input type="text" placeholder="*Nombre(s)" name="first_name" />
                    </div>
                    <div className="field">
                      <input type="text" placeholder="*Apellidos" name="last_name" />
                    </div>
                  </div>

                  <div className="field">
                    <input type="email" placeholder="*Email" name="email" />
                  </div>

                  <div className="field-group">
                    <div className="field field-prefix">
                      <select name="phone_code">
                        <option value="">(+) Indicativo</option>
                      </select>
                    </div>
                    <div className="field field-main">
                      <input type="text" placeholder="*Teléfono celular" name="mobile" />
                    </div>
                  </div>

                  <div className="field">
                    <select name="country">
                      <option value="">*País de residencia</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="department" style={{ display: 'none' }}>
                      <option value="">*Selecciona el departamento</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="city" style={{ display: 'none' }}>
                      <option value="">*Selecciona la Ciudad</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="type_attendee">
                      <option value="">*Tipo de asistente</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="academic_level" style={{ display: 'none' }}>
                      <option value="">*Nivel académico</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="faculty" style={{ display: 'none' }}>
                      <option value="">*Facultad de interés</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="program" style={{ display: 'none' }}>
                      <option value="">*Programa de interés</option>
                    </select>
                  </div>

                  <div className="field">
                    <select name="admission_period" style={{ display: 'none' }}>
                      <option value="">*Periodo esperado de Ingreso de interés</option>
                    </select>
                  </div>

                  <div className="authorization-section">
                    <p>¿Autorizas el tratamiento de tus datos personales?</p>
                    <div className="radio-group">
                      <div className="radio-option">
                        <input type="radio" id="auth_si_1" name="authorization_data" value="1" />
                        <label htmlFor="auth_si_1">Sí</label>
                      </div>
                      <div className="radio-option">
                        <input type="radio" id="auth_no_1" name="authorization_data" value="0" />
                        <label htmlFor="auth_no_1">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <Btn type="submit" color="primary" size="lg" fullWidth isEditable={false}>
                    Enviar
                  </Btn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
