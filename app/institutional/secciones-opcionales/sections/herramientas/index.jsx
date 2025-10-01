// index.jsx
import React, { useEffect } from 'react'
import './styles.scss'

const toolsData = {
  title: 'Herramientas',
  subtitle: 'Lorem ipsum dolor sit amet',
  description:
    'Lorem ipsum dolor sit amet consectetur. Eget id cursus eget at congue turpis. Volutpat odio nisi dictum in congue. Suspendisse diam pellentesque volutpat donec consequat tempor et quis sed. Leo sit donec scelerisque vitae risus senectus dignissim.',
  logos: [
    { id: 1, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/cad', alt: 'AutoCAD', title: 'AutoCAD' },
    { id: 2, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/lt', alt: 'Logo 2', title: 'Logo 2' },
    { id: 3, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/mundo', alt: 'Logo 3', title: 'Logo 3' },
    { id: 4, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/c3d', alt: 'Logo 4', title: 'Logo 4' },
    { id: 5, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/cast', alt: 'Logo 5', title: 'Logo 5' },
    { id: 6, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/oracle', alt: 'Oracle', title: 'Oracle' },
    { id: 7, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/sap', alt: 'SAP', title: 'SAP' },
    { id: 8, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/sap200', alt: 'SAP 200', title: 'SAP 200' },
    { id: 9, src: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/man', alt: 'Logo 9', title: 'Logo 9' }
  ]
}

const hexagonalPatterns = {
  1: { columns: [[0]], offsets: [false] },
  2: { columns: [[0], [1]], offsets: [false, false] },
  3: { columns: [[0], [1], [2]], offsets: [false, true, false] },
  4: {
    columns: [
      [0, 3],
      [1, 2]
    ],
    offsets: [false, true]
  },
  5: { columns: [[0, 3], [1], [2, 4]], offsets: [false, false, false] },
  6: {
    columns: [
      [0, 3],
      [1, 4],
      [2, 5]
    ],
    offsets: [false, true, false]
  },
  7: {
    columns: [
      [0, 4],
      [1, 3, 6],
      [2, 5]
    ],
    offsets: [false, false, false]
  },
  8: {
    columns: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5]
    ],
    offsets: [false, true, false]
  },
  9: {
    columns: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ],
    offsets: [false, true, false]
  }
}

const reorganizeToHexagonal = () => {
  const gridContainer = document.querySelector('.tools-logos-grid')
  if (!gridContainer) {
    console.warn('No se encontró .tools-logos-grid')
    return
  }

  const allLogoItems = Array.from(gridContainer.querySelectorAll('.logo-item'))
  if (allLogoItems.length === 0) {
    console.warn('No se encontraron .logo-item')
    return
  }

  const totalItems = allLogoItems.length
  const pattern = hexagonalPatterns[totalItems] || hexagonalPatterns[9]
  const { columns: columnConfig, offsets } = pattern

  const originalElements = allLogoItems.map(item => item.cloneNode(true))

  gridContainer.setAttribute('data-reorganized', 'true')
  gridContainer.setAttribute('data-original-count', totalItems)
  gridContainer.innerHTML = ''

  columnConfig.forEach((elementIndexes, columnIndex) => {
    const columna = document.createElement('div')
    columna.className = 'columna-logos'

    if (totalItems !== 5 && offsets[columnIndex]) {
      columna.classList.add('offset')
    }

    if (totalItems === 5) {
      columna.classList.add(columnIndex === 1 ? 'columna-central-5' : 'columna-lateral-5')
    }

    if (totalItems === 7) {
      columna.classList.add(columnIndex === 1 ? 'columna-central-7' : 'columna-lateral-7')
    }

    elementIndexes.forEach(elementIndex => {
      if (originalElements[elementIndex]) {
        columna.appendChild(originalElements[elementIndex])
      }
    })

    gridContainer.appendChild(columna)
  })

  gridContainer.setAttribute('data-total-items', totalItems)
  gridContainer.setAttribute('data-pattern', columnConfig.map(col => col.length).join('-'))

  applyHexagonalStyles(gridContainer, totalItems)
}

const applyHexagonalStyles = (gridContainer, totalItems) => {
  const columnas = gridContainer.querySelectorAll('.columna-logos')

  columnas.forEach((columna, index) => {
    columna.style.display = 'flex'
    columna.style.flexDirection = 'column'
    columna.style.gap = '25px'
    columna.style.rowGap = '25px'
    columna.style.alignItems = 'center'
    columna.style.position = 'relative'

    if (totalItems === 5) {
      columna.style.justifyContent = 'center'
      columna.style.minHeight = '200px'
      columna.style.marginTop = '0px'
      columna.style.paddingTop = '0px'

      const logoItems = columna.querySelectorAll('.logo-item')
      logoItems.forEach(item => {
        item.style.alignSelf = 'center'
        item.style.margin = '0 auto'
      })
    } else if (totalItems === 7) {
      columna.style.justifyContent = 'center'
      columna.style.minHeight = '300px'
      columna.style.marginTop = '0px'

      if (index !== 1) {
        columna.style.paddingTop = '50px'
      } else {
        columna.style.paddingTop = '0px'
      }
    } else {
      columna.style.justifyContent = 'flex-start'
    }
  })

  gridContainer.style.display = 'flex'
  gridContainer.style.justifyContent = 'center'
  gridContainer.style.gap = '20px'
  gridContainer.style.flexWrap = 'nowrap'
  gridContainer.style.alignItems = totalItems === 5 || totalItems === 7 ? 'center' : 'flex-start'
  gridContainer.style.width = 'fit-content'
  gridContainer.style.maxWidth = '100%'
  gridContainer.style.margin = '0 auto'
}

const ToolsSection = () => {
  useEffect(() => {
    // Precargar imágenes
    toolsData.logos.forEach(logo => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = logo.src
      document.head.appendChild(link)
    })

    // Ejecutar reorganización después del renderizado
    const timer = setTimeout(() => {
      reorganizeToHexagonal()
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className='container' id='herramientas'>
      <div className='tools-container'>
        <h2 className='title title-neutral title-2xl title-center title-bold tools-titulo'>{toolsData.title}</h2>
        <div className='tools-content'>
          <div className='tools-texto'>
            <h2 className='title title-lg'>{toolsData.subtitle}</h2>
            <p className='paragraph paragraph-neutral paragraph-md'>{toolsData.description}</p>
          </div>

          <div className='tools-logos-grid'>
            {toolsData.logos.map(logo => (
              <div key={logo.id} className='logo-item' title={logo.title}>
                <img className='image' alt={logo.alt} src={logo.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToolsSection
