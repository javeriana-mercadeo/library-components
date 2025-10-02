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
      {/* Contenido del blog aquí */}
    </div>
  )
}

export default BlogExpo
