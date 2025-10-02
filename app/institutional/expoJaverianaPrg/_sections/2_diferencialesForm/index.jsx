'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const DiferencialesForm = () => {
  const elementName = info.id || 'diferenciales-form'
  const baseClass = 'diferenciales-form'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Contenido de diferenciales y formulario aquí */}
    </div>
  )
}

export default DiferencialesForm
