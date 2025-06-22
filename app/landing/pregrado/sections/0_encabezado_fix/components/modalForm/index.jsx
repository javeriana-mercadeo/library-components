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
            <button className="modal-header__close btn" id="modal-close" aria-label="Cerrar modal" type="button">
              
            </button>
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

            <form className="contact-form" id="contact-form">
              {/* Nombres */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombres" className="form-label required">
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
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
                    id="apellidos"
                    name="apellidos"
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
                    <select id="tipoDocumento" name="tipoDocumento" className="form-select" required>
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
                    id="numeroDocumento"
                    name="numeroDocumento"
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
                    <select id="prefijo" name="prefijo" className="form-select select-prefijo-input" required>
                      <option value="+57" data-flag="🇨🇴">
                        🇨🇴 +57
                      </option>
                      <option value="+1" data-flag="🇺🇸">
                        🇺🇸 +1
                      </option>
                      <option value="+52" data-flag="🇲🇽">
                        🇲🇽 +52
                      </option>
                      <option value="+54" data-flag="🇦🇷">
                        🇦🇷 +54
                      </option>
                      <option value="+34" data-flag="🇪🇸">
                        🇪🇸 +34
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-phone">
                  <label htmlFor="telefono" className="form-label required">
                    Teléfono celular
                  </label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono" 
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
                    <select id="paisResidencia" name="paisResidencia" className="form-select" required>
                      <option value="">Selecciona tu país</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="México">México</option>
                      <option value="Argentina">Argentina</option>
                      <option value="España">España</option>
                      <option value="Chile">Chile</option>
                      <option value="Perú">Perú</option>
                      <option value="Ecuador">Ecuador</option>
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
                    <select id="departamento" name="departamento" className="form-select" required disabled>
                      <option value="">Selecciona departamento</option>
                    </select>
                  </div>
                </div>

                <div className="form-group form-group-half">
                  <label htmlFor="ciudad" className="form-label required">
                    Ciudad
                  </label>
                  <div className="select-wrapper">
                    <select id="ciudad" name="ciudad" className="form-select" required disabled>
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
                    <select id="periodoIngreso" name="periodoIngreso" className="form-select" required>
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