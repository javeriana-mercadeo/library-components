import Caption from '@library/components/contain/caption'
import Btn from '@library/components/contain/btn'

import './styles.scss'
import info from './info.json'
import Container from '@/app/_library/components/container'

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
