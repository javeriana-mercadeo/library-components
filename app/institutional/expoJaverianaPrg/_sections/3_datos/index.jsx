'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const DatosExpo = () => {
  const elementName = info.id || 'datos-expo'
  const baseClass = 'datos-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Contenido de datos/estadísticas aquí */}
    </div>
  )
}

export default DatosExpo
