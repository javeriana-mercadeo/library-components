'use client'

import { useEffect } from 'react'
import { Container, Title } from '@library/components'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const RequisitosPregrado = () => {
  const elementName = info.id || 'requisitos-pregrado'
  const baseClass = 'admission-requirements'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    console.log('[React Component] Mounting...')
    const container = document.getElementById('admission-requirements_dynamic-content')
    console.log('[React Component] Container exists on mount:', container)

    script()

    console.log('[React Component] Script initialized')
  }, [])

  return (
    <div className={baseClass} data-component-id={elementName}>
      <Container id={elementName} className={`${baseClass}_container`}>
        {/* === HEADER === */}
        <div className={`${baseClass}_header`}>
          <Title hierarchy='h2' size='2xl' weight='bold' className={`${baseClass}_title`} color='neutral'>
            Requisitos de Admisión
          </Title>
        </div>

        {/* === DYNAMIC CONTENT (Rendered by script.js) === */}
        <div id='admission-requirements_dynamic-content' className={`${baseClass}_dynamic-content`}>
          {/* Loading state - será reemplazado por script.js */}
          <div className={`${baseClass}_loading-state`}>
            <div className={`${baseClass}_loading-spinner`}>
              <i className='ph ph-circle-notch'></i>
            </div>
            <p className={`${baseClass}_loading-text`}>Cargando requisitos...</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RequisitosPregrado
