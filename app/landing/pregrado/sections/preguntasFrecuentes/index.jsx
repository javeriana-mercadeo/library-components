'use client'

import { useEffect } from 'react'
import Container from '@library/components/container/Container'

import script from './script.js'

import './styles.scss'

const PreguntasFrecuentes = () => {
  {
    /*Ejecutar el script cuando el componente se monta*/
  }
  useEffect(() => {
    script()
  }, [])

  return (
<h1></h1>
  )
}
export default PreguntasFrecuentes