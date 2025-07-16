'use client'
import Paragraph from '@/app/_library/components/contain/paragraph'
import Caption from '@/app/_library/components/contain/caption'
import Title from '@/app/_library/components/contain/title'
import './content.scss'
// import { setupPopupEvent } from "../script";

const Content = ({ id = 'popup', imageSrc, isEditable, onClose }) => {
  const imgSource = imageSrc || 'https://cdn.forbes.co/2020/09/Javeriana-1280x720-1.jpg'

  return (
    <>
      <div className="content">
        <lfr-editable id="image-popup" className="content__image" type="image">
          <img src={imgSource} alt="Muestra del contenido" className="image" />
        </lfr-editable>
        <Title id={`${id}-title`} hierarchy="h2" size="xl" isEditable={isEditable} className="content__title">
          ¡Tu futuro en la Javeriana es posible!
        </Title>
        <div className="content-data">
          <Paragraph id={`${id}-text`} className="content__text" isEditable={isEditable}>
            Sabemos que el talento y la dedicación merecen oportunidades. Accede a nuestras becas y construye tu camino en una universidad
            de excelencia, conoce las diferentes opciones de becas como:
          </Paragraph>
          <lfr-editable id={`${id}-text`} type="rich-text" className="list">
            <Caption className=" list__title" color="neutral-100" size="md" bold={true} isEditable={false}>
              Beca ingresa
            </Caption>
            <Caption className=" list__text" color="neutral-100" size="md" isEditable={false}>
              Hasta un 50% para aspirantes con alto potencial académico.
            </Caption>

            <Caption className=" list__title" color="neutral-100" size="md" bold={true} isEditable={false}>
              Beca Bachiller Destacado 
            </Caption>
            <Caption className=" list__text" color="neutral-100" size="md" isEditable={false}>
              80% de descuento para los mejores estudiantes.
            </Caption>
          </lfr-editable>
          <Paragraph id={`${id}-text`} className="content__text" isEditable={isEditable}>
            ¡No dejes que nada detenga tus sueños!
          </Paragraph>
          {/* <button className="content__button">Continuar</button> */}
          <button
            data-dmpa-element-id="btn"
            className="btn btn-primary btn-solid btn-lg btn-full-width content-btn"
            aria-disabled="false"
            type="submit"
            data-lfr-editable-id="btn"
            data-lfr-editable-type="text"
            onClick={onClose}>
            <span className="btn-text">Continuar</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Content
