'use client'
import { useScript } from '@hooks'
import { Container, Title } from '@components'
import ProjectCard from './components/ProjectCard'
import './styles.scss'

const projects = [
  {
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    title: 'Universidad Destacada',
    description: 'Descubre nuestros programas académicos y la experiencia universitaria.',
    type: 'universidad',
    modal: {
      title: 'Universidad Destacada',
      date: '2024',
      responsible: 'Vicerrectoría Académica',
      description:
        '<p>Conoce cómo nuestros programas y comunidades de aprendizaje potencian el talento de los estudiantes con acompañamiento permanente.</p>',
      videos: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
    }
  },
  {
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
    title: 'Investigación de Clase Mundial',
    description: 'Conoce nuestros proyectos de investigación y logros académicos.',
    type: 'investigacion',
    modal: {
      title: 'Investigación de Clase Mundial',
      date: '2023-2024',
      responsible: 'Dirección de Investigación',
      description:
        '<p>Proyectos interdisciplinarios que resuelven retos globales mediante laboratorios de alto impacto y alianzas estratégicas.</p>',
      videos: ['https://www.youtube.com/watch?v=h3GuFxrk8aI'],
      gallery: ['https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2']
    }
  },
  {
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
    title: 'Innovación Social',
    description: 'Iniciativas que transforman comunidades y promueven sostenibilidad.',
    type: 'innovacion',
    modal: {
      title: 'Innovación Social',
      date: '2024',
      responsible: 'Centro de Innovación Social',
      description:
        '<p>Trabajamos con comunidades locales para co-crear soluciones sostenibles que mejoran la calidad de vida y fortalecen el tejido social.</p>',
      videos: [],
      gallery: ['https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3', 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj4']
    }
  },
  {
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj4',
    title: 'Impacto Global',
    description: 'Experiencias internacionales que conectan talentos y conocimiento.',
    type: 'internacional',
    modal: {
      title: 'Impacto Global',
      date: '2022-2024',
      responsible: 'Oficina de Relaciones Internacionales',
      description:
        '<p>Programas de intercambio y cooperación que fortalecen redes académicas con universidades aliadas en cinco continentes.</p>',
      videos: ['https://www.youtube.com/watch?v=3GwjfUFyY6M'],
      gallery: ['https://www.javeriana.edu.co/recursosdb/d/info-prg/proj4']
    }
  },
  {
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj5',
    title: 'Emprendimiento y Liderazgo',
    description: 'Fomentamos el espíritu emprendedor y el desarrollo de líderes innovadores.',
    type: 'emprendimiento',
    modal: {
      title: 'Emprendimiento y Liderazgo',
      date: '2023',
      responsible: 'Centro de Emprendimiento',
      description:
        '<p>Programas y talleres que impulsan ideas innovadoras, desarrollan habilidades de liderazgo y conectan con ecosistemas emprendedores.</p>',
      videos: ['https://www.youtube.com/watch?v=Zi_XLOBDo_Y'],
      gallery: ['https://www.javeriana.edu.co/recursosdb/d/info-prg/proj5']
    }
  }
]

const Proyectos = () => {
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  return (
    <section className='hero-carousel' id='carousel-section'>
      <Container className='hero-carousel__header'>
        <Title
          id='carousel-main-title'
          elementId='carousel-main-title'
          hierarchy='h2'
          size='2xl'
          align='center'
          weight='bold'
          className='carousel-title'>
          Proyectos Destacados
        </Title>
      </Container>

      <Container className='main-container' id='proyectos-container'>
        <div className='hero-carousel__viewport'>
          <div className='carousel-container swiper' id='carousel-container' data-slides-count={projects.length} data-max-cards='4'>
            <div className='swiper-wrapper' id='slides-wrapper'>
              {projects.map((project, index) => (
                <ProjectCard key={project.title} index={index} project={project} />
              ))}
            </div>

            {/* Botones de navegación de Swiper */}
            <div className='swiper-button-prev' id='carousel-prev'></div>
            <div className='swiper-button-next' id='carousel-next'></div>

            {/* Paginación de Swiper */}
            <div className='swiper-pagination'></div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Proyectos
