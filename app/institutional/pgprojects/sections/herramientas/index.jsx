import React from 'react'
import './styles.scss';


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

const Herramientas = ({ logos = [] }) => {
  const logosOrganizados = organizarLogos(logos)

  return (
    <section className="tools-container">
      <h1 className="tools-titulo">Herramientas</h1>
      <div className="tools-content">
        <div className="tools-texto">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eget id cursus eget at congue turpis. Volutpat odio nisi dictum in congue. Suspendisse
            diam pellentesque volutpat donec consequat tempor et quis sed. Leo sit donec scelerisque vitae risus senectus dignissim.
          </p>
        </div>

        <div className="tools-logos-grid">
          {logosOrganizados.map((columna, columnaIndex) => (
            <div key={`columna-${columnaIndex}`} className={`columna-logos ${columnaIndex % 2 === 1 ? 'offset' : ''}`}>
              {columna.map((logo, logoIndex) => (
                <div key={`logo-${columnaIndex}-${logoIndex}`} className="logo-item">
                  <img src={logo.imagen} alt={logo.nombre} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const App = () => {
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

  return (
    <div className="app">
      <Herramientas logos={logosHerramientas} />
    </div>
  )
}

export default App
