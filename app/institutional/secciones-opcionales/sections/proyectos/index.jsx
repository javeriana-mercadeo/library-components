import './styles.scss'
import './script.js'
import DetalleProyecto from './components/detalleProyecto'

// Datos de ejemplo - reemplazar con tu API o JSON
const SLIDES_DATA = [
  {
    id: 0,
    imagenPrincipal:
      'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
    titulo: 'Universidad Destacada',
    descripcionCorta: 'Descubre nuestros programas académicos de alta calidad.'
  },
  {
    id: 1,
    imagenPrincipal: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    titulo: 'Investigación de Clase Mundial',
    descripcionCorta: 'Proyectos innovadores y logros académicos destacados.'
  },
  {
    id: 2,
    imagenPrincipal: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
    titulo: 'Campus Innovador',
    descripcionCorta: 'Instalaciones modernas y entorno de aprendizaje de vanguardia.'
  },
  {
    id: 3,
    imagenPrincipal: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3',
    titulo: 'Oportunidades Internacionales',
    descripcionCorta: 'Programas de intercambio y colaboraciones globales.'
  },
  {
    id: 4,
    imagenPrincipal: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj4',
    titulo: 'Excelencia Académica',
    descripcionCorta: 'Reconocimiento nacional e internacional en educación superior.'
  }
]

export default function Proyectos() {
  return (
    <section className='container hero-carousel' id='carousel-section'>
      <div>
        <h2 className='title title-lg carousel-title'>Proyectos Destacados</h2>
      </div>

      <div className='container main-container' id='proyectos-container'>
        <div>
          <div className='carousel-container swiper' id='carousel-container' data-slides-count={SLIDES_DATA.length} data-max-cards='4'>
            <div className='swiper-wrapper' id='slides-wrapper'>
              {SLIDES_DATA.map((slide, index) => (
                <div key={slide.id} className='carousel-slide swiper-slide' data-slide-index={index}>
                  <div className='slide-image' style={{ backgroundImage: `url('${slide.imagenPrincipal}')` }}>
                    <img src={slide.imagenPrincipal} alt={slide.titulo} style={{ display: 'none' }} />
                  </div>
                  <div className='slide-content'>
                    <h3 className='slide-title'>{slide.titulo}</h3>
                    <p className='paragraph paragraph-neutral paragraph-md description'>{slide.descripcionCorta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='carousel-controls' id='carousel-controls'>
              <button className='carousel-control prev' id='carousel-prev' type='button' aria-label='Slide anterior'>
                <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
              </button>
              <button className='carousel-control next' id='carousel-next' type='button' aria-label='Slide siguiente'>
                <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
              </button>
            </div>

            <div className='carousel-indicators' id='carousel-indicators'>
              {SLIDES_DATA.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === 0 ? 'active' : ''}`}
                  data-indicator-index={index}
                  type='button'
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <DetalleProyecto />
    </section>
  )
}
