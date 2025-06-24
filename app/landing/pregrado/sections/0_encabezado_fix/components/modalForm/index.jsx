import Btn from '@library/components/contain/btn'
import Title from '@library/components/contain/title'

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
        <div className="modal-form-container">
          {/* Header del Modal */}
          <div className="modal-header">
            <button className="modal-header__close btn" id="modal-close" aria-label="Cerrar modal" type="button"></button>
          </div>

          {/* Contenido del Modal */}
          <div className="modal-content">
            {/* Título y descripción del formulario */}
            <div className="form-intro">
              <Title hierarchy="h3" size="2xl" weight="bold" isEditable={false} color="primary" id="modal-title">
                ¿Tienes dudas?
              </Title>
              <p className="form-intro__subtitle">Déjanos tus datos y te contactaremos para brindarte toda la información.</p>
            </div>

            <form
              className="contact-form"
              id="contact-form"
              action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
              method="POST"
              noValidate>
              {/* Campos ocultos para Salesforce*/}
              <input type="hidden" name="oid" value="00Df4000003l8Bf" />
              <input type="hidden" name="retURL" id="retURL" value="" />
              <input type="hidden" name="00NJw000001J3Hl" value="Web to Lead" />
              <input type="hidden" name="00N5G00000WmhvT" value="Landing Programas" />
              <input type="hidden" name="lead_source" value="Landing Pages" />
              <input type="hidden" name="company" value="NA" />
              <input type="hidden" name="debug" value="1" />​
              <input type="hidden" name="debugEmail" value="gesalas@javeriana.edu.co" />
              {/* Campos UTM para tracking*/}
              <input type="hidden" name="00N7j000002BKgW" id="utm-source" value="" />
              <input type="hidden" name="00N7j000002BKgb" id="utm-subsource" value="" />
              <input type="hidden" name="00N040000001izt" id="utm-medium" value="" />
              <input type="hidden" name="00N7j000002BfkF" id="utm-campaign" value="" />
              {/* Nombres */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombres" className="form-label required">
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-input"
                    placeholder="Ingresa tu nombre"
                    required
                    autoComplete="given-name"
                  />
                </div>
              </div>
              {/* Apellidos */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="apellidos" className="form-label required">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-input"
                    placeholder="Ingresa tus apellidos"
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>
              {/* Tipo de documento y Número de documento */}
              <div className="form-row">
                <div className="form-group form-group-half">
                  <label htmlFor="tipoDocumento" className="form-label required">
                    Tipo de documento
                  </label>
                  <div className="select-wrapper">
                    <select id="00N7j000002Bl3X" name="00N7j000002Bl3X" className="form-select" required>
                      <option value="">Selecciona tipo</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="TI">Tarjeta de Identidad</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="PP">Pasaporte</option>
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="numeroDocumento" className="form-label required">
                    Número de documento
                  </label>
                  <input
                    type="text"
                    id="00N7j000002Bl3V"
                    name="00N7j000002Bl3V"
                    className="form-input"
                    placeholder="Número de documento"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label required">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="ejemplo@correo.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              {/* Teléfono con prefijo */}
              <div className="form-row">
                <div className="form-group form-group-prefix">
                  <label htmlFor="prefijo" className="form-label required">
                    Indicativo
                  </label>
                  <div className="select-wrapper select-prefijo">
                    <select id="00NO4000002lUPh" name="00NO4000002lUPh" className="form-select select-prefijo-input" required>
                      <option value="">Cargando indicativos...</option>
                      {/* Las opciones serán cargadas dinámicamente desde la API por el script.js */}
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-phone">
                  <label htmlFor="telefono" className="form-label required">
                    Teléfono celular
                  </label>
                  <input
                    type="tel"
                    id="00NO4000002lUPh"
                    name="mobile"
                    className="form-input"
                    placeholder="3001234567"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
              {/* País de residencia */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="paisResidencia" className="form-label required">
                    País de residencia
                  </label>
                  <div className="select-wrapper">
                    <select id="00N7j000002BY1c" name="00N7j000002BY1c" className="form-select" required>
                      <option value="">Cargando países...</option>
                      {/* Las opciones serán cargadas dinámicamente desde la API por el script.js */}
                    </select>
                  </div>
                </div>
              </div>
              {/* Departamento y Ciudad - Dinámicos */}
              <div className="form-row location-row" id="location-row" style={{ display: 'none' }}>
                <div className="form-group form-group-half">
                  <label htmlFor="departamento" className="form-label required">
                    Departamento
                  </label>
                  <div className="select-wrapper">
                    <select id="d00N7j000002BY1h" name="d00N7j000002BY1h" className="form-select" required disabled>
                      <option value="">Selecciona departamento</option>
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="ciudad" className="form-label required">
                    Ciudad
                  </label>
                  <div className="select-wrapper">
                    <select id="00N7j000002BY1i" name="00N7j000002BY1i" className="form-select" required disabled>
                      <option value="">Selecciona ciudad</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Período de ingreso */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="periodoIngreso" className="form-label required">
                    Período de Ingreso
                  </label>
                  <div className="select-wrapper">
                    <select id="00N7j000002BY2L" name="00N7j000002BY2L" className="form-select" required>
                      <option value="">Selecciona período</option>
                      <option value="Primer semestre 2025">Primer semestre 2025</option>
                      <option value="Segundo semestre 2025">Segundo semestre 2025</option>
                      <option value="Primer semestre 2026">Primer semestre 2026</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Checkbox de términos y condiciones */}
              <div className="terms-group" id="terms-group">
                <input type="checkbox" id="terms" name="terms" className="terms-checkbox" required />
                <label htmlFor="terms" className="terms-label">
                  ¿Autoriza usted el tratamiento de sus datos personales de acuerdo con la{' '}
                  <a href="#" className="terms-link">
                    autorización de privacidad
                  </a>
                  ?
                </label>
                <div className="radio-options">
                  <label className="radio-label">
                    <input type="radio" name="autorizacion" value="si" required />
                    <span className="radio-custom"></span>
                    Sí
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="autorizacion" value="no" required />
                    <span className="radio-custom"></span>
                    No
                  </label>
                </div>
              </div>
              {/* Botón de envío */}
              <div className="form-submit">
                <Btn type="submit" color="primary" size="lg" fullWidth>
                  Enviar
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
