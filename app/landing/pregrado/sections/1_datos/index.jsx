'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@/app/_library/components/contain/title'
import Caption from '@/app/_library/components/contain/caption'
import Paragraph from '@/app/_library/components/contain/paragraph'
import ProgramDetails from './components/ProgramDetails'
import script from './script.js'
import info from './info.json'
import './styles.scss'

const Datos = () => {
  const elementName = info.id
  const baseClass = 'program-data'

  // Inicializar script del video
  useEffect(() => {
    script()
  }, [])

  // Configuración de todos los detalles del programa
  const programDetails = [
    {
      icon: 'ph-graduation-cap',
      label: 'Título',
      value: 'Ingeniero Civil',
      type: 'normal'
    },
    {
      icon: 'ph-student',
      label: 'Nivel Académico',
      value: 'Pregrado',
      type: 'normal'
    },
    {
      icon: 'ph-calendar-dots',
      label: 'Duración',
      value: 'Ocho (8) semestres',
      type: 'normal'
    },
    {
      icon: 'ph-sun',
      label: 'Modalidad',
      value: 'Presencial / Diurna',
      type: 'normal'
    },
    {
      icon: 'ph-piggy-bank',
      label: 'Inversión Semestre',
      value: '$18,059,000 Semestral*',
      type: 'modal',
      modalContent: (
        <div>
          <p>
            <strong>Detalles de la inversión semestral:</strong>
          </p>
          <ul>
            <li>
              Matrícula: <span className="highlight">$16,059,000</span>
            </li>
            <li>
              Seguro estudiantil: <span className="highlight">$150,000</span>
            </li>
            <li>
              Carné universitario: <span className="highlight">$50,000</span>
            </li>
            <li>
              Bienestar universitario: <span className="highlight">$1,800,000</span>
            </li>
          </ul>
          <p>
            <strong>Descuentos disponibles:</strong>
          </p>
          <ul>
            <li>Hermanos estudiando: 10% de descuento</li>
            <li>Excelencia académica: Hasta 20% de descuento</li>
            <li>Situación socioeconómica: Evaluación individual</li>
          </ul>
          <p>*Los valores pueden variar según política institucional vigente.</p>
        </div>
      )
    },
    {
      icon: 'ph-money',
      label: 'Costo Inscripción',
      value: '$150,000',
      type: 'modal',
      modalContent: (
        <div>
          <p>
            <strong>Información del proceso de inscripción:</strong>
          </p>
          <p>El costo de inscripción incluye:</p>
          <ul>
            <li>Procesamiento de documentos</li>
            <li>Evaluación de admisión</li>
            <li>Entrevista personal (si aplica)</li>
            <li>Certificado de admisión</li>
          </ul>
          <p>
            <strong>Importante:</strong> Este valor <span className="highlight">NO es reembolsable</span> y debe pagarse antes de la fecha
            límite de inscripción.
          </p>
          <p>Métodos de pago disponibles: PSE, tarjeta de crédito, consignación bancaria.</p>
        </div>
      )
    },
    {
      icon: 'ph-calendar-check',
      label: 'Fechas de cierre de inscripciones',
      type: 'dates',
      dates: [
        {
          period: 'Segundo semestre 2025',
          date: '30 de enero de 2025'
        },
        {
          period: 'Primer semestre 2026',
          date: '30 de junio de 2025'
        },
        {
          period: 'Segundo semestre 2026',
          date: '30 de enero de 2026'
        }
      ]
    }
  ]

  return (
    <Container id={elementName} className={baseClass}>
      {/* === FACULTAD === */}
      <Caption
        elementId={`${baseClass}-faculty`}
        className={`${baseClass}_faculty`}
        color="primary"
        size="md"
        bold={true}
        isEditable={false}>
        Facultad de Ingeniería
      </Caption>

      {/* === TÍTULO === */}
      <Title elementId="programName" className={`${baseClass}_title`} id={`${elementName}-title`} size="3xl">
        <span className="lead">Ingeniería Civil:</span> Construyendo el Futuro Sostenible de Colombia
      </Title>

      {/* === SNIES === */}
      <Caption elementId={`${baseClass}-snies`} className={`${baseClass}_snies`} color="neutral" size="md" isEditable={false}>
        SNIES 959
      </Caption>

      {/* === DESCRIPCIÓN === */}
      <Paragraph className={`${baseClass}_description`} id={`${elementName}-description`}>
        Diseña y gestiona proyectos de infraestructura civil con un <strong>enfoque sostenible y responsable con el medio ambiente</strong>.
        Aprende a optimizar recursos considerando aspectos técnicos, económicos y éticos. En nuestra carrera de Ingeniería Civil, elige
        entre distintos énfasis según tu interés y accede a laboratorios y tecnología de vanguardia para potenciar tu aprendizaje.
      </Paragraph>

      {/* === VIDEOS RESPONSIVOS === */}
      <div className={`${baseClass}__media`} data-video-mobile="HxlTZ8DQAaY" data-video-desktop="IWZvfiu3gX4" data-breakpoint="768">
        {/* Placeholder para videos que se cargarán via JavaScript */}
      </div>

      {/* === DETALLES DEL PROGRAMA === */}
      <ProgramDetails details={programDetails} />

      {/* === INFORMACIÓN DE INSCRIPCIÓN === */}
      <div className={`${baseClass}__enrollment`}>
        <a href="#" className={`${baseClass}__enrollment-link`}>
          Conoce el proceso de inscripción
        </a>
        <p className={`${baseClass}__enrollment-note`}>
          *Aspirantes 2025: El valor de matrícula corresponde al costo fijado para el año 2025.
        </p>
      </div>
    </Container>
  )
}

export default Datos
