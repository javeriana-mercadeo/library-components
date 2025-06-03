import Caption from '@library/components/contain/caption'
import Btn from '@library/components/contain/btn'

import './styles.scss'
import info from './info.json'

const Cita = () => {
  return (
    <div className="meeting">
      <div className="meeting-container">
        <Caption id={info.key}>Resuelve tus dudas con el director del programa</Caption>
        <Btn href="#" variant="outline" color="neutral" id={info.key}>
          Agenda tu reunión ahora
        </Btn>
      </div>
    </div>
  )
}

export default Cita
