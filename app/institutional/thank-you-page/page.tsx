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
        <Btn href="#" target="_blank" variant="link" size="md" className={`${baseClass}__card-link`} id={`$elementName`} isEditable={false}>
          Volver al programa
        </Btn>
        <Title hierarchy="h1" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}`}>
          ¡Gracias por tu interés en ser parte de la Universidad Javeriana!
        </Title>
        <Paragraph id={`${elementName}-enrollment-note`} className={`${baseClass}_enrollment-note`} size="sm">
          Tu solicitud ha sido recibida, y muy pronto uno de nuestros asesores se pondrá en contacto contigo para brindarte toda la
          información que necesitas.
        </Paragraph>
        <div className={`${baseClass}__card-info-main`}>
          <div className={`${baseClass}__card-info`}>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Explora nuestro tour virtual y conoce la universidad.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`} size="sm">
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
              Ver Perfil
            </Btn>
          </div>
          <div className={`${baseClass}__card-info`}>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Explora nuestro tour virtual y conoce la universidad.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`} size="sm">
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
              Ver Perfil
            </Btn>
          </div>
          <div className={`${baseClass}__card-info`}>
            <Title hierarchy="h3" data-puj-name="true" className={`${baseClass}_title`} id={`${elementName}-`}>
              Explora nuestro tour virtual y conoce la universidad.
            </Title>
            <Paragraph id={`${elementName}-tour-info`} className={`${baseClass}_enrollment-note`} size="sm">
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
              Ver Perfil
            </Btn>
          </div>
        </div>
        <div>
          <Btn id="registration-btn" isEditable={false}>
            ¡Inscríbete Ahora!
          </Btn>
        </div>
      </div>
    </Container>
  )
}
