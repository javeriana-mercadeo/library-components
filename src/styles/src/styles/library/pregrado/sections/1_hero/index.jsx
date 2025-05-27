import Container from '@/library/_general/components/container/Container'
import ProgramDetails from '@/library/pregrado/components/ProgramDetails'

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
      <section className="container program-info">
        <div className="program-info-facultad">
          <p className="program-info__title_facultad">Facultad de Ingeniería</p>
          <h2 className="program-info__title">
            Estudia <br />
            <span className="highlight">
              Ingeniería Civil <br />
            </span>
            y Crea Soluciones que impactan el Futuro.
          </h2>
          <p className="program-info__snies">SNIES 959</p>
          <p className="program-info__description">
            Nuestra carrera de Ingeniería Civil forma <strong>líderes en construcción sostenible</strong>. Nuestros estudiantes se
            especializan en áreas como edificación, infraestructura vial e hidrotecnia, desarrollando proyectos que transforman la sociedad
            con responsabilidad y conciencia ambiental.
          </p>
        </div>
        <section className="program-details">
          {programDetailList.map((detail, index) => (
            <ProgramDetails key={index} icon={detail.icon} title={detail.title} detail={detail.detail} />
          ))}

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
          <img src={image.src} alt="Ingeniería Civil" />
        </div>
      </section>
    </Container>
  )
}

export default Index
