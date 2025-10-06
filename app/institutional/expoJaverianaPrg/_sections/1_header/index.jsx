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
          <div className={`${baseClass}__info-box`}>
            <ul className={`${baseClass}__info-list`}>
              <li className={`${baseClass}__info-item`}>
                <i className="ph ph-calendar-dots"></i>
                <span data-lfr-editable-id="header-expo-date" data-lfr-editable-type="text">
                  Del 24 al 28 de febrero
                </span>
              </li>
              <li className={`${baseClass}__info-item`}>
                <i className="ph ph-clock"></i>
                <span data-lfr-editable-id="header-expo-time" data-lfr-editable-type="text">
                  8:00 a.m. a 1:00 p.m.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderExpo
