import { Container, Paragraph } from '@library/components'
import info from './info.json'
import './styles.scss'

const SNIES = () => {
  const elementName = info.id || 'snies'
  const baseClass = 'snies'

  return (
    <Container className={baseClass} data-component-id={elementName}>
      <Paragraph id={`${elementName}-enrollment-code`} data-puj-snies='true' className={`${baseClass}_enrollment-note`} size='sm'>
        Cargando...
      </Paragraph>
      <Paragraph id={`${elementName}-enrollment-legal`} className={`${baseClass}_enrollment-note`} size='sm'>
        {' '}
        | Resolución de Registro Calificado: 9406 del 27 de mayo de 2022, vigente hasta el 27 de mayo de 2030. | Resolución de Acreditación
        de Alta Calidad: 9406 del 27 de mayo del 2022, vigente por 8 años, hasta el 27 de mayo de 2030.
      </Paragraph>
    </Container>
  )
}

export default SNIES
