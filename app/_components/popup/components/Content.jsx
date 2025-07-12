'use client'
import Paragraph from '@/app/_library/components/contain/paragraph'
import Image from '@/app/_library/components/contain/image'
import Title from '@/app/_library/components/contain/title'
import './content.scss'
// import { setupPopupEvent } from "../script";

const Content = (id, imageSrc, isEditable) => {
  const imgSource = imageSrc || 'https://cdn.forbes.co/2020/09/Javeriana-1280x720-1.jpg'
  return (
    <>
      <div className="content">
        <Image id={`${id}-image`} src={imgSource} alt="Muestra del contenido" className="content__image" isEditable={isEditable} />
        <Title id={`${id}-title`} hierarchy="h2" size="xl" isEditable={isEditable} className="content__title">
          ¡Tu futuro en la Javeriana es posible!
        </Title>
        <div className="content-data">
          <Paragraph id={`${id}-text`} className="content__text" isEditable={isEditable}>
            Sabemos que el talento y la dedicación merecen oportunidades. Accede a nuestras becas y construye tu camino en una universidad
            de excelencia, conoce las diferentes opciones de becas como:
            <div className="list">
              <lfr-editable id="unique-id" type="rich-text" className="list__title">
                Beca ingresa
              </lfr-editable>
              <lfr-editable id="unique-id" type="rich-text" className="list__text">
                Hasta un 50% para aspirantes con alto potencial académico.
              </lfr-editable>
              <lfr-editable id="unique-id" type="rich-text" className="list__title">
                Beca Bachiller Destacado
              </lfr-editable>
              <lfr-editable id="unique-id" type="rich-text" className="list__text">
                80% de descuento para los mejores estudiantes.
              </lfr-editable>
            </div>
            ¡No dejes que nada detenga tus sueños!
          </Paragraph>
          <button className="content__button">Continuar</button>
        </div>
      </div>
    </>
  )
}

export default Content
