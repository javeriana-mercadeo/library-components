import { useScript } from '@hooks'
import { Container, Title, Paragraph, Button } from '@/app/components'

import info from './info.json'
import './styles.scss'

const DoblePlanEstudio = () => {
  const elementName = info.id || 'DoblePlanEstudio'
  const baseClass = 'plan-estudio'
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  // ==========================================
  // DATOS DINÁMICOS DE LOS SEMESTRES POR JORNADA
  // ==========================================
  const planEstudios = {
    diurna: {
      title: 'Jornada Diurna',
      downloadUrl: '#diurna',
      semesters: [
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
        }
      ]
    },
    nocturna: {
      title: 'Jornada Nocturna',
      downloadUrl: '#nocturna',
      semesters: [
        {
          year: 'Año 1',
          semester: 'Semestre 1',
          credits: 15,
          subjects: [
            'Matemáticas Básicas',
            'Introducción a la Ingeniería',
            'Física Aplicada',
            'Comunicación Profesional',
            'Fundamentos de Programación'
          ]
        },
        {
          year: 'Año 1',
          semester: 'Semestre 2',
          credits: 16,
          subjects: ['Matemáticas Avanzadas', 'Física Moderna', 'Estructuras de Datos', 'Química Industrial', 'Expresión Gráfica Digital']
        },
        {
          year: 'Año 2',
          semester: 'Semestre 3',
          credits: 17,
          subjects: ['Cálculo Diferencial', 'Programación Avanzada', 'Análisis de Sistemas', 'Estadística Aplicada', 'Sistemas Digitales']
        },
        {
          year: 'Año 2',
          semester: 'Semestre 4',
          credits: 18,
          subjects: [
            'Cálculo Integral',
            'Bases de Datos Avanzadas',
            'Arquitectura de Software',
            'Gestión de Proyectos',
            'Electiva Técnica I'
          ]
        },
        {
          year: 'Año 3',
          semester: 'Semestre 5',
          credits: 18,
          subjects: [
            'Matemáticas Discretas',
            'Desarrollo de Aplicaciones',
            'Sistemas Distribuidos',
            'Ingeniería de Software',
            'Electiva Técnica II'
          ]
        }
      ]
    }
  }

  // Array con la información de las tabs de jornadas
  const jornadaTabs = [
    {
      id: 'diurna',
      label: 'Jornada Diurna',
      data: planEstudios.diurna
    },
    {
      id: 'nocturna',
      label: 'Jornada Nocturna',
      data: planEstudios.nocturna
    }
  ]

  // ==========================================
  // FUNCIÓN PARA RENDERIZAR UNA CARD
  // ==========================================
  const renderSemesterCard = (semesterData, index, jornadaId) => {
    const { year, semester, credits, subjects } = semesterData

    return (
      <div key={`${jornadaId}-${index}`} className={`${baseClass}_slide swiper-slide`} role='listitem'>
        <div className={`${baseClass}_card`}>
          <div className={`${baseClass}_card-header`}>
            <span className={`${baseClass}_badge ${baseClass}_badge`}>{year}</span>
          </div>

          <Title hierarchy='span' className={`${baseClass}_semester-title`} size='lg' weight='bold' isEditable={false}>
            {semester}
          </Title>

          <ul className={`${baseClass}_subjects`}>
            {subjects.map((subject, subjectIndex) => (
              <li key={`${jornadaId}-${index}-subject-${subjectIndex}`}>
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

  // ==========================================
  // FUNCIÓN PARA RENDERIZAR UN CARRUSEL POR JORNADA
  // ==========================================
  const renderCarousel = (jornadaData, jornadaId) => {
    return (
      <div className={`${baseClass}_jornada-content`}>
        <Button
          href={jornadaData.downloadUrl}
          target='_blank'
          variant='bordered'
          className={`${baseClass}_download-btn`}
          endIcon={<i className='ph ph-download' aria-hidden='true'></i>}>
          Descargar Plan de estudios - {jornadaData.title}
        </Button>

        <div className={`${baseClass}_carousel swiper`}>
          <div className={`${baseClass}_wrapper subjects-swiper`}>
            <div className={`${baseClass}_slides swiper-wrapper`} role='list'>
              {jornadaData.semesters.map((semesterData, index) => renderSemesterCard(semesterData, index, jornadaId))}
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
      </div>
    )
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <div className={`${baseClass}_header`}>
          <Title weight='semibold' size='2xl' align='center' id={`${elementName}-title`}>
            Plan de Estudios por Modalidad
          </Title>

          <Paragraph id={`${elementName}-description`} align='center' className={`${baseClass}_subtitle`}>
            Conoce el plan de estudios según la modalidad de tu preferencia: diurna o nocturna.
          </Paragraph>
        </div>

        {/* Sistema de pestañas para jornadas */}
        <div className={`${baseClass}__tabs-container`}>
          {/* Navegación de tabs */}
          <div className={`${baseClass}__tabs-nav`} role='tablist' aria-label='Modalidades del programa'>
            <div className={`${baseClass}__tabs-wrapper`}>
              {jornadaTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`${baseClass}__tab-button ${index === 0 ? 'active' : ''}`}
                  id={`${tab.id}-tab`}
                  data-tabs-target={`#${tab.id}-panel`}
                  type='button'
                  role='tab'
                  aria-controls={`${tab.id}-panel`}
                  aria-selected={index === 0 ? 'true' : 'false'}
                  tabIndex={index === 0 ? 0 : -1}>
                  <i className={`ph ${index === 0 ? 'ph-sun' : 'ph-moon'}`} aria-hidden='true'></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de las tabs */}
          <div className={`${baseClass}__tabs-content`}>
            {jornadaTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                role='tabpanel'
                aria-labelledby={`${tab.id}-tab`}
                aria-hidden={index !== 0 ? 'true' : 'false'}>
                {renderCarousel(tab.data, tab.id)}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DoblePlanEstudio
