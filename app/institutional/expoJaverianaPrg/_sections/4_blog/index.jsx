'use client'

import { useEffect } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const BlogExpo = () => {
  const elementName = info.id || 'blog-expo'
  const baseClass = 'blog-expo'

  // Inicializar script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <div className={baseClass} id={elementName}>
      {/* Drop Zone para fragmento de blog de Liferay */}
      <div className={`${baseClass}__content`}>
        <lfr-drop-zone id='blog-drop-zone'></lfr-drop-zone>
      </div>
    </div>
  )
}

export default BlogExpo
