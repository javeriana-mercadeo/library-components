import { Container, Icon, Caption } from '@library/components'

import info from './info.json'
import './styles.scss'

const Maestria = () => {
  const elementName = info.id || 'maestria'
  const baseClass = 'mastership-banner'

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <div className={`${baseClass}__content-wrapper`}>
          {/* Columna izquierda - Información principal */}
          <div className={`${baseClass}__main-content`}>
            <p className={`${baseClass}__faculty`}>Facultad de Psicología</p>

            <h1 className={`${baseClass}__title`}>Maestría en Psicología Clínica</h1>

            <p className={`${baseClass}__description`}>
              Fortalece el desarrollo del área de la psicología con tus competencias clínicas e investigativas.
            </p>

             {/* === SNIES === */}
                    <Caption
                      data-puj-snies='true'
                      className={`${baseClass}_snies`}
                      id={`${elementName}-snies`}
                      color='neutral'
                      size='md'
                      isEditable={false}>
                      Cargando SNIES...
                    </Caption>
          </div>

          {/* Columna derecha - Detalles del programa */}
          <div className={`${baseClass}__details-content`}>
            <div className={`${baseClass}__details-grid`}>
              {/* Título */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-graduation-cap' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Título</p>
                  <p className={`${baseClass}__detail-value`}>Magister en psicología clínica</p>
                </div>
              </div>

              {/* Nivel Académico */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-student' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Nivel Académico</p>
                  <p className={`${baseClass}__detail-value`}>Posgrado</p>
                </div>
              </div>

              {/* Doble Titulación */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-certificate' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Doble Titulación</p>
                  <p className={`${baseClass}__detail-value`}>[Nombre del segundo titulo]</p>
                  <a href='#' className={`${baseClass}__detail-link`}>
                    Conoce Más
                  </a>
                </div>
              </div>

              {/* Duración & Modalidad */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-calendar-dots' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Duración & Modalidad</p>
                  <p className={`${baseClass}__detail-value`}>
                    Cuatro (4) semestres.
                    <br />
                    Presencial / Diurna
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-clock' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Horarios:</p>
                  <p className={`${baseClass}__detail-value`}>
                    Viernes 8:00 a.m. a 1:00 p.m.
                    <br />
                    Sábados 2:00 a.m. a 8:00 p.m.
                  </p>
                </div>
              </div>

              {/* Inversión Semestre */}
              <div className={`${baseClass}__detail-item`}>
                <Icon icon='ph-piggy-bank' size='md' className={`${baseClass}__detail-icon`} />
                <div className={`${baseClass}__detail-text`}>
                  <p className={`${baseClass}__detail-label`}>Inversión Semestre</p>
                  <p className={`${baseClass}__detail-value`}>$17,519,000 / Semestral.*</p>
                  <a href='#' className={`${baseClass}__detail-link`}>
                    Descubre cómo inscribirte
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Maestria