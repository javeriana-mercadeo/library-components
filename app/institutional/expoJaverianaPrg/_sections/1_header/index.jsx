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
      <div className={`${baseClass}__container`}>
        {/* Columna Izquierda - Logo */}
        <div className={`${baseClass}__left`}>
          <img
            src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-expo-javeriana-2026"
            alt="Logo Expo Javeriana 2026"
            className={`${baseClass}__logo`}
          />
        </div>

        {/* Columna Derecha */}
        <div className={`${baseClass}__right`}>
          {/* Contenido derecho aqui */}
        </div>
      </div>
    </div>
  )
}

export default HeaderExpo
