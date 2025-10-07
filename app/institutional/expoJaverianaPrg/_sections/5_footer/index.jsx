'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const FooterExpo = () => {
  const elementName = info.id || 'footer-expo'
  const baseClass = 'footer-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Contenido del footer aquí */}
    </div>
  )
}

export default FooterExpo
