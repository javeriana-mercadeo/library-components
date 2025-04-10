import Caption from '@library/_general/components/contain/caption'
import BtnLink from '@library/_general/components/buttons/BtnLink'

import './styles.scss'
import info from './info.json'

const MeetingDirector = () => {
  return (
    <div className="meeting">
      <div className="meeting-container">
        <Caption id={info.key}>Resuelve tus dudas con el director del programa</Caption>
        <BtnLink id={info.key}>Agenda tu reunión ahora</BtnLink>
      </div>
    </div>
  )
}

export default MeetingDirector
