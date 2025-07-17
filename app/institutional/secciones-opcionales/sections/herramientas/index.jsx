import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Image from '@library/components/contain/image'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Herramientas = () => {
  const elementName = info.id || 'herramientas'

  // Datos de los logos
  const logosHerramientas = [
    { nombre: 'AutoCAD', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/cad' },
    { nombre: 'LT', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/lt' },
    { nombre: 'BIM', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/mundo' },
    { nombre: 'C3D', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/c3d' },
    { nombre: 'Cad-A', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/cast' },
    { nombre: 'Oracle', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/oracle' },
    { nombre: 'ProjectW', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/sap' },
    { nombre: 'SAP', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/sap200' },
    { nombre: 'MAN', imagen: 'https://WWW.javeriana.edu.co/recursosdb/d/info-prg/man' }
  ]

  // Ejecutar script al cargar (Liferay manejará el ciclo de vida)
  script()

  return (
    <section id={elementName}>
      <Container className="tools-container">
        <Title className="tools-titulo" id={`${elementName}-title`} size="2xl" weight="bold" align="center" color="neutral">
          Herramientas
        </Title>

        <div className="tools-content">
          <div className="tools-texto">
            <Title id={`${elementName}-sub-titleH`}> Lorem ipsum dolor sit amet</Title>

            <Paragraph id={`${elementName}-paragraph`}>
              Lorem ipsum dolor sit amet consectetur. Eget id cursus eget at congue turpis. Volutpat odio nisi dictum in congue. Suspendisse
              diam pellentesque volutpat donec consequat tempor et quis sed. Leo sit donec scelerisque vitae risus senectus dignissim.
            </Paragraph>
          </div>

          {/* Grid que será reorganizado automáticamente en hexágono */}
          <div className="tools-logos-grid">
            {logosHerramientas.map((logo, index) => (
              <div key={`logo-${index}`} className="logo-item" title={logo.nombre}>
                <Image id={`${elementName}-logo-${index}`} src={logo.imagen} alt={logo.nombre} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Herramientas
