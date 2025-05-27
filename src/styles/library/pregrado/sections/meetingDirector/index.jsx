import Caption from '@library/_general/components/contain/caption'
import BtnLink from '@/library/_general/components/buttons/btnLink'

import './styles.scss'

const MeetingDirector = () => {
  return (
    <div className="meeting">
      <div className="meeting-container">
        <Caption>Resuelve tus dudas con el director del programa</Caption>
        <BtnLink>Agenda tu reunión ahora</BtnLink>
      </div>
    </div>
  )
}

export default MeetingDirector
