'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const HeaderExpo = () => {
  const elementName = info.id || 'header-expo'
  const baseClass = 'header-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Contenido del header aqui */}
    </div>
  )
}

export default HeaderExpo
