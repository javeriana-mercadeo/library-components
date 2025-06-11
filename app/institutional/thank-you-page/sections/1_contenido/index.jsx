import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Image from '@library/components/contain/image'
import Paragraph from '@library/components/contain/paragraph'
import Btn from '@library/components/contain/btn'

import thanksImg from './assets/53593052f5a8a0826aa368dad23a6c16182a1c37.jpg'

import info from './info.json'
import './styles.scss'

export default function ThankYouPage() {
  const elementName = info.id || 'thank-you-page'
  const baseClass = 'thanks'

  const renderInfoCard = info

  return (
    <Container className={`${baseClass}__main`}>
      <div className={`${baseClass}__pic`}>
        <Image
          id={`${elementName}-image`}
          src={`${thanksImg.src}`}
          alt="Estudiantes de la Universidad Javeriana"
          className={`${baseClass}__image`}
        />
      </div>
      <div className={`${baseClass}__content`}>
        <Btn href="#" target="_blank" variant="link" className={`${baseClass}__card-link`} id={`$elementName`} isEditable={false}>
          <i className="ph ph-arrow-bend-up-left"></i>
          Volver al programa
        </Btn>
        <Title hierarchy="h1" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}`}>
          ¡Gracias por tu interés en ser parte de la Universidad Javeriana!
        </Title>
        <Paragraph id={`${elementName}-enrollment-note`} className={`${baseClass}_enrollment-note`}>
          Tu solicitud ha sido recibida, y <strong>muy pronto uno de nuestros asesores se pondrá en contacto contigo</strong> para brindarte
          toda la información que necesitas.
        </Paragraph>
        <div className={`${baseClass}__card-info-main`}>
          <div className={`${baseClass}__card-info`}>
            <div className={`${baseClass}__card-info-icon`}>
              <i className="ph ph-panorama"></i>
            </div>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Explora nuestro tour virtual y conoce la universidad.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`}>
              Recorre cada espacio de nuestra universidad sin moverte de casa. Conoce los lugares donde vivirás experiencias inolvidables.
            </Paragraph>
            <Btn
              href="#"
              target="_blank"
              variant="link"
              size="md"
              className={`${baseClass}_card-link`}
              id={`$elementName`}
              isEditable={false}>
              Ver tour
              <i className="ph ph-arrow-up-right"></i>
            </Btn>
          </div>
          <div className={`${baseClass}__card-info`}>
            <div className={`${baseClass}__card-info-icon`}>
              <i className="ph ph-calendar-dots"></i>
            </div>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Eventos, actividades y apoyo para tu futuro académico.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`}>
              Charlas, talleres y ferias académicas diseñadas para ti. Descubre becas, financiación y mucho más.
            </Paragraph>
            <Btn
              href="#"
              target="_blank"
              variant="link"
              size="md"
              className={`${baseClass}_card-link`}
              id={`$elementName`}
              isEditable={false}>
              Conoce más
              <i className="ph ph-arrow-up-right"></i>
            </Btn>
          </div>
          <div className={`${baseClass}__card-info`}>
            <div className={`${baseClass}__card-info-icon`}>
              <i className="ph ph-telegram-logo"></i>
            </div>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Estamos aquí para responder todas tus preguntas.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`}>
              Contáctanos por correo o teléfono para recibir información sobre becas, financiación y admisiones.
            </Paragraph>
            <Btn
              href="#"
              target="_blank"
              variant="link"
              size="md"
              className={`${baseClass}_card-link`}
              id={`$elementName`}
              isEditable={false}>
              Escríbenos
              <i className="ph ph-arrow-up-right"></i>
            </Btn>
          </div>
        </div>
        <div className={`${baseClass}__btn-main`}>
          <Btn id="registration-btn" isEditable={false}>
            Ver más programas
          </Btn>
        </div>
      </div>
    </Container>
  )
}
