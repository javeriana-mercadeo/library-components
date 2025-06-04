import Container from '@library/components/container/Container'
import ProgramDetails from '../../components/ProgramDetails'

import image from './assets/program-image.png'
import './styles.scss'

const Index = () => {
  const programDetailList = [
    {
      icon: <i className="ph ph-graduation-cap"></i>,
      title: 'Título',
      detail: 'Ingeniería Civil'
    },
    {
      icon: <i className="ph ph-student"></i>,
      title: 'Nivel Académico',
      detail: 'Pregrado'
    },
    {
      icon: <i className="ph ph-calendar-dots"></i>,
      title: 'Duración',
      detail: 'Ocho (8) semestres.'
    },
    {
      icon: <i className="ph ph-sun"></i>,
      title: 'Modalidad',
      detail: 'Presencial / Diurna'
    },
    {
      icon: <i className="ph ph-piggy-bank"></i>,
      title: 'Inversión Semestre',
      detail: '$18,059,000 Semestral*'
    },
    {
      icon: <i className="ph ph-sun"></i>,
      title: 'Costo Inscripción',
      detail: '$150.000'
    }
  ]

  return (
    <Container>
      <section id="section-one">
        <div className="container program-info">
          {/* <!-- Información del programa --> */}
          <div className="program-info-facultad">
            <p className="program-info__title_facultad">Facultad de Ingeniería</p>
            <h2 className="program-info__title">
              Estudia <span className="highlight">Ingeniería Civil</span> y Crea Soluciones que impactan el Futuro.
            </h2>
            <p className="program-info__snies">SNIES 959</p>
            <p className="program-info__description">
              Nuestra carrera de Ingeniería Civil forma <strong>líderes en construcción sostenible</strong>. Nuestros estudiantes se
              especializan en áreas como edificación, infraestructura vial e hidrotecnia, desarrollando proyectos que transforman la
              sociedad con responsabilidad y conciencia ambiental.
            </p>
          </div>

          {/* <!-- Detalles del programa --> */}
          <section className="program-details">
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-graduation-cap"></i>
              </div>
              <div>
                <span className="program-details__label">Título</span>
                <p className="program-details__value">
                  <strong>Ingeniería Civil</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-student"></i>
              </div>
              <div>
                <span className="program-details__label">Nivel Académico</span>
                <p className="program-details__value">
                  <strong>Pregrado</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-calendar-dots"></i>
              </div>
              <div>
                <span className="program-details__label">Duración</span>
                <p className="program-details__value">
                  <strong>Ocho (8) semestres.</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-sun"></i>
              </div>
              <div>
                <span className="program-details__label">Modalidad</span>
                <p className="program-details__value">
                  <strong>Presencial / Diurna</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-piggy-bank"></i>
              </div>
              <div>
                <span className="program-details__label">Inversión Semestre</span>
                <p className="program-details__value">
                  <strong>$18,059,000 Semestral*</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-sun"></i>
              </div>
              <div>
                <span className="program-details__label">Costo Inscripción</span>
                <p className="program-details__value">
                  <strong>$150.000</strong>
                </p>
              </div>
            </div>
            <div className="program-details__item">
              <div className="program-details__icon_container">
                <i className="ph ph-money"></i>
              </div>
              <div className="program-details-fechas">
                <span className="program-details__label">Fechas de cierre de inscripciones</span>
                <br />
                <strong>Segundo semestre 2025:</strong> 30 de enero de 2025
                <br />
                <strong>Primer semestre 2026:</strong> 30 de junio de 2025
                <br />
                <strong>Segundo semestre 2026:</strong> 30 de enero de 2026
                <br />
              </div>
            </div>
          </section>

          {/* <!-- Información de inscripción --> */}
          <section className="program-details-row">
            <div className="inscripcion-container">
              <strong className="inscripcion">Conoce el proceso de inscripción </strong>
            </div>
            <div className="program-details__note">
              <p>
                *<strong>Aspirantes 2025:</strong> Precio especial hasta el 08 de noviembre de 2024. Después aplicará el costo 2025.
              </p>
            </div>
          </section>

          <div className="program-info__image">
            <iframe
              width="560"
              height="515"
              src="https://www.youtube.com/embed/Yb6XUiG2ZWc?autoplay=1&mute=1&loop=1&playlist=Yb6XUiG2ZWc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&end=&start="
              frameBorder="0"
              allow="autoplay; encrypted-media"
              style={{ PointerEvent: 'none' }}></iframe>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Index
