<<<<<<< HEAD


=======
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
import { Caption, Button as Btn, Container } from '@library/components'

import './styles.scss'
import info from './info.json'

const Cita = () => {
  return (
<<<<<<< HEAD
    <div className="meeting">
      <Container className="meeting-container">
        <Caption id={`${info.key}-caption`} size="lg">
          Resuelve tus dudas con el director del programa
        </Caption>
        <Btn href="#" target="_blank" variant="bordered" id={`${info.key}-btn`} className="meeting-btn">
=======
    <div className='meeting'>
      <Container className='meeting-container'>
        <Caption id={`${info.key}-caption`} size='lg'>
          Resuelve tus dudas con el director del programa
        </Caption>
        <Btn href='#' target='_blank' variant='bordered' id={`${info.key}-btn`} className='meeting-btn'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Agenda tu reunión ahora
        </Btn>
      </Container>
    </div>
  )
}

export default Cita
