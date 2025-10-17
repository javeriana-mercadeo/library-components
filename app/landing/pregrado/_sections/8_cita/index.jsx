'use client'
import { useScript } from '@hooks'
import { Caption, Button, Container } from '@components'

import './styles.scss'
import info from './info.json'

const Cita = () => {
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  return (
    <div className='meeting'>
      <Container className='meeting-container'>
        <Caption id={`${info.key}-caption`} size='lg'>
          Resuelve tus dudas con el director del programa
        </Caption>
        <Button href='#' target='_blank' variant='bordered' id={`${info.key}-btn`} className='meeting-btn'>
          Agenda tu reunión ahora
        </Button>
      </Container>
    </div>
  )
}

export default Cita
