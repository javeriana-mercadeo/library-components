import { useScript } from '@hooks'
import { Container, Title, Paragraph, Button as Btn } from '@/app/components'

import info from './info.json'
import './styles.scss'

const PlanEstudio = () => {
  const elementName = info.id || 'planEstudio'
  const baseClass = 'plan-estudio'
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  // ==========================================
  // DATOS DINÁMICOS DE LOS SEMESTRES
  // ==========================================
  const semesters = [
    {
      year: 'Año 1',
      semester: 'Semestre 1',
      credits: 18,
      subjects: [
        'Matemáticas I',
        'Introducción a la Ingeniería',
        'Física I',
        'Química General',
        'Comunicación Escrita',
        'Fundamentos de Programación'
      ]
    },
    {
      year: 'Año 1',
      semester: 'Semestre 2',
      credits: 18,
      subjects: [
        'Matemáticas II',
        'Física II',
        'Algoritmos y Estructuras de Datos',
        'Química Orgánica',
        'Historia de la Tecnología',
        'Expresión Gráfica'
      ]
    },
    {
      year: 'Año 2',
      semester: 'Semestre 3',
      credits: 19,
      subjects: [
        'Cálculo Multivariable',
        'Programación Orientada a Objetos',
        'Física Moderna',
        'Probabilidad y Estadística',
        'Ingeniería de Software I',
        'Sistemas Digitales'
      ]
    },
    {
      year: 'Año 2',
      semester: 'Semestre 4',
      credits: 20,
      subjects: [
        'Ecuaciones Diferenciales',
        'Bases de Datos',
        'Arquitectura de Computadores',
        'Ingeniería de Software II',
        'Ética Profesional',
        'Electiva I'
      ]
    },
    {
      year: 'Año 3',
      semester: 'Semestre 5',
      credits: 20,
      subjects: [
        'Análisis Numérico',
        'Redes de Computadores',
        'Desarrollo Web',
        'Sistemas Operativos',
        'Gestión de Proyectos',
        'Electiva II'
      ]
    },
    {
      year: 'Año 3',
      semester: 'Semestre 6',
      credits: 20,
      subjects: [
        'Simulación de Sistemas',
        'Inteligencia Artificial',
        'Seguridad Informática',
        'Diseño de Interfaces',
        'Optativa Humanística',
        'Electiva III'
      ]
    },
    {
      year: 'Año 4',
      semester: 'Semestre 7',
      credits: 18,
      subjects: [
        'Arquitectura de Software',
        'Ingeniería Económica',
        'Big Data y Analítica',
        'Pruebas de Software',
        'Electiva IV',
        'Proyecto Integrador I'
      ]
    },
    {
      year: 'Año 4',
      semester: 'Semestre 8',
      credits: 18,
      subjects: [
        'Ingeniería de Requisitos',
        'Cloud Computing',
        'Computación Gráfica',
        'Legislación Informática',
        'Electiva V',
        'Proyecto Integrador II'
      ]
    },
    {
      year: 'Año 5',
      semester: 'Semestre 9',
      credits: 16,
      subjects: ['Práctica Profesional', 'Gestión de la Innovación', 'Electiva VI', 'Seminario de Investigación', 'Trabajo de Grado I']
    },
    {
      year: 'Año 5',
      semester: 'Semestre 10',
      credits: 16,
      subjects: [
        'Electiva VII',
        'Auditoría de Sistemas',
        'Taller de Portafolio',
        'Trabajo de Grado II',
        'Seminario de Actualización Tecnológica'
      ]
    }
  ]

  // ==========================================
  // FUNCIÓN PARA RENDERIZAR UNA CARD
  // ==========================================
  const renderSemesterCard = (semesterData, index) => {
    const { year, semester, credits, subjects } = semesterData

    return (
      <div key={index} className={`${baseClass}_slide swiper-slide`} role='listitem'>
        <div className={`${baseClass}_card`}>
          <div className={`${baseClass}_card-header`}>
            <span className={`${baseClass}_badge ${baseClass}_badge`}>{year}</span>
          </div>

          <Title hierarchy='span' className={`${baseClass}_semester-title`} size='lg' weight='bold' isEditable={false}>
            {semester}
          </Title>

          <ul className={`${baseClass}_subjects`}>
            {subjects.map((subject, subjectIndex) => (
              <li key={`${index}-subject-${subjectIndex}`}>
                <i className='ph ph-check' aria-hidden='true'></i>
                {subject}
              </li>
            ))}
          </ul>

          <div className={`${baseClass}_credits`}>
            <strong>{credits}</strong> Crédito{credits !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <Title weight='semibold' size='2xl' align='center' id={`${elementName}-title`}>
          Materias por Semestre
        </Title>

        <Paragraph id={`${elementName}-description`} align='center'>
          El plan de estudios profundiza en asignaturas en las áreas de: edificaciones, infraestructura vial e hidrotecnia.
        </Paragraph>

        <Btn
          id={`${elementName}-btn`}
          href='#'
          target='_blank'
          variant='bordered'
          endIcon={<i className='ph ph-download' aria-hidden='true'></i>}>
          Descargar Plan de estudios
        </Btn>

        <div className={`${baseClass}_carousel swiper`}>
          <div className={`${baseClass}_wrapper subjects-swiper`}>
            <div className={`${baseClass}_slides swiper-wrapper`} role='list'>
              {/* ✅ GENERAR CARDS DINÁMICAMENTE */}
              {semesters.map((semesterData, index) => renderSemesterCard(semesterData, index))}
            </div>

            {/* Paginación */}
            <div className={`swiper-pagination ${baseClass}_pagination`} role='tablist' aria-label='Control de páginas del carrusel'></div>

            {/* Botones de navegación */}
            <button className={`swiper-slide-button ${baseClass}_prev`} aria-label='Ir al slide anterior' type='button'>
              <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
            </button>
            <button className={`swiper-slide-button ${baseClass}_next`} aria-label='Ir al siguiente slide' type='button'>
              <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PlanEstudio
