'use client'

import { useEffect } from 'react'
import Container from '@library/components/container/Container'

import script from './script.js'
import './styles.scss'

const PorqueLaJaveriana = () => {
  // Ejecutar el script cuando el componente se monta
  useEffect(() => {
    script()
  }, [])

  return (
    <h1>Hola mundo</h1>
  )
}
export default PorqueLaJaveriana