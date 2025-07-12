

import { Caption, Button as Btn, Container } from '@library/components'

import './styles.scss'
import info from './info.json'

const Cita = () => {
  return (
    <div className="meeting">
      <Container className="meeting-container">
        <Caption id={`${info.key}-caption`} size="lg">
          Resuelve tus dudas con el director del programa
        </Caption>
        <Btn href="#" target="_blank" variant="bordered" id={`${info.key}-btn`} className="meeting-btn">
          Agenda tu reunión ahora
        </Btn>
      </Container>
    </div>
  )
}

export default Cita
