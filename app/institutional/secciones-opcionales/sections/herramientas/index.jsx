'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'
import Image from '@library/components/contain/image'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const Herramientas = () => {
  const elementName = info.id || 'herramientas'
  const baseClass = 'tools'

  // Función para organizar logos en columnas
  const organizarLogos = logos => {
    if (!logos || logos.length === 0) return []

    const totalLogos = logos.length
    let columnasTotal

    if (totalLogos <= 3) {
      columnasTotal = totalLogos
    } else if (totalLogos <= 6) {
      columnasTotal = 3
    } else if (totalLogos <= 9) {
      columnasTotal = 3
    } else {
      columnasTotal = 4
    }

    const columnas = Array(columnasTotal)
      .fill()
      .map(() => [])

    logos.forEach((logo, index) => {
      const columnaIndex = index % columnasTotal
      columnas[columnaIndex].push(logo)
    })

    return columnas
  }

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

  const logosOrganizados = organizarLogos(logosHerramientas)

  useEffect(() => {
    script()
  }, [])

  return (
    <section id={elementName}>
      <Container className="tools-container">
        <Title
          className="tools-titulo"
          id={`${elementName}-title`}
          size="2xl"
          weight="bold"
          align="center"
          color="neutral">
          Herramientas
        </Title>

        <div className="tools-content">
          <div className="tools-texto">
            <h2>Lorem ipsum dolor sit amet</h2>
            
            <Paragraph id={`${elementName}-paragraph`}>
              Lorem ipsum dolor sit amet consectetur. Eget id cursus eget at congue turpis. Volutpat odio nisi dictum in congue. Suspendisse
              diam pellentesque volutpat donec consequat tempor et quis sed. Leo sit donec scelerisque vitae risus senectus dignissim.
            </Paragraph>
          </div>

          <div className="tools-logos-grid">
            {logosOrganizados.map((columna, columnaIndex) => (
              <div key={`columna-${columnaIndex}`} className={`columna-logos ${columnaIndex % 2 === 1 ? 'offset' : ''}`}>
                {columna.map((logo, logoIndex) => (
                  <div key={`logo-${columnaIndex}-${logoIndex}`} className="logo-item">
                    <Image
                      id={`${elementName}-logo-${columnaIndex}-${logoIndex}`}
                      src={logo.imagen}
                      alt={logo.nombre}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Herramientas