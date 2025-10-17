import { Container, Title, Image, Paragraph, Button } from '@components'

import './styles.scss'
import info from './info.json'

export default function ThankYouPage() {
  const elementName = info.id || 'thank-you-page'
  const baseClass = 'thanks'

  return (
    <Container id={elementName} className={`${baseClass}__main`}>
      <div className={`${baseClass}__pic`}>
        <Image
          id={`${elementName}-image`}
          src='https://www.javeriana.edu.co/recursosdb/d/info-prg/2-eventos_pregrado?imagePreview=1'
          alt='Estudiantes de la Universidad Javeriana'
          className={`${baseClass}__image`}
        />
      </div>
      <div className={`${baseClass}__content`}>
        <Button
          href='#'
          target='_blank'
          variant='link'
          className={`${baseClass}__card-link`}
          id={`${elementName}-back-to-program`}
          isEditable={false}>
          <i className='ph ph-arrow-bend-up-left'></i>
          Volver al evento
        </Button>

        <Title hierarchy='h1' data-puj-name='true' className={`${baseClass}_title`} id={`${elementName}-main-title`}>
          ¡Gracias por tu interés en ser parte de la Universidad Javeriana!
        </Title>

        <Paragraph id={`${elementName}-enrollment-note`} className={`${baseClass}_enrollment-note`}>
          Tu solicitud ha sido recibida, y <strong>muy pronto uno de nuestros asesores se pondrá en contacto contigo</strong> para brindarte
          toda la información que necesitas.
        </Paragraph>

        <div className={`${baseClass}__card-info-main`}>
          {/* CARD 1 - Tour Virtual */}
          <div className={`${baseClass}__card-info`}>
            <div className={`${baseClass}__card-info-icon`}>
              <i className='ph ph-panorama'></i>
            </div>
            <Title hierarchy='h3' data-puj-name='true' className={`${baseClass}_title`} id={`${elementName}-subtitle-explore`}>
              Explora nuestro tour virtual y conoce la universidad.
            </Title>
            <Paragraph id={`${elementName}-tour-description`} className={`${baseClass}_enrollment-note`}>
              Recorre cada espacio de nuestra universidad sin moverte de casa. Conoce los lugares donde vivirás experiencias inolvidables.
            </Paragraph>
            <Button
              href='#'
              target='_blank'
              variant='link'
              size='md'
              className={`${baseClass}_card-link`}
              id={`${elementName}-tour-btn`}
              isEditable={false}>
              Ver tour
              <i className='ph ph-arrow-up-right'></i>
            </Button>
          </div>

          {/* CARD 2 - Eventos */}
          <div className={`${baseClass}__card-info`}>
            <div className={`${baseClass}__card-info-icon`}>
              <i className='ph ph-calendar-dots'></i>
            </div>
            <Title hierarchy='h3' data-puj-name='true' className={`${baseClass}_title`} id={`${elementName}-subtitle-events`}>
              Eventos, actividades y apoyo para tu futuro académico.
            </Title>
            <Paragraph id={`${elementName}-events-description`} className={`${baseClass}_enrollment-note`}>
              Charlas, talleres y ferias académicas diseñadas para ti. Descubre becas, financiación y mucho más.
            </Paragraph>
            <Button
              href='https://www.javeriana.edu.co/relacionamiento/'
              target='_blank'
              variant='link'
              size='md'
              className={`${baseClass}_card-link`}
              id={`${elementName}-events-btn`}>
              Conoce más
              <i className='ph ph-arrow-up-right'></i>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
