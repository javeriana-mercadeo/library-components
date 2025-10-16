'use client'
import { useEffect } from 'react'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const MaestriaGallery = () => {
  const elementName = info.id || 'MaestriaGallery'
  const baseClass = 'maestria-gallery'

  useEffect(() => {
    script()
  }, [])

  const imagenes = [
    'https://www.javeriana.edu.co/recursosdb/659410/668610/deparatamentos-e-institutos.jpg',
    'https://www.javeriana.edu.co/recursosdb/923889/5844303/Inducciones%202%20(1).jpg/fa9c6109-9852-854a-147c-116cc657b2e5',
    'https://www.javeriana.edu.co/recursosdb/20125/3664582/estudiantes-extranjeros.JPG/a532f776-6f0b-7c52-bd07-729329986345',
    'https://www.javeriana.edu.co/repositorio-hoy-en-la-javeriana/wp-content/uploads/2021/12/211027-Rector-ViceAca-Estudiantes-24.jpg'
  ]

  const categoriasData = {
    laboratorios: {
      title: 'Laboratorios',
      items: [
        {
          title: 'Contenido 1',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[0]
        },
        {
          title: 'Contenido 2',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[1]
        },
        {
          title: 'Contenido 3',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[2]
        },
        {
          title: 'Contenido 4',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[3]
        }
      ]
    },
    recursos: {
      title: 'Recursos',
      items: [
        {
          title: 'Contenido 1',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[0]
        },
        {
          title: 'Contenido 2',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[1]
        },
        {
          title: 'Contenido 3',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[2]
        },
        {
          title: 'Contenido 4',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[3]
        }
      ]
    },
    salidas: {
      title: 'Salidas de Campo',
      items: [
        {
          title: 'Contenido 1',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[0]
        },
        {
          title: 'Contenido 2',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[1]
        },
        {
          title: 'Contenido 3',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[2]
        },
        {
          title: 'Contenido 4',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[3]
        }
      ]
    },
    biblioteca: {
      title: 'Biblioteca',
      items: [
        {
          title: 'Contenido 1',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[0]
        },
        {
          title: 'Contenido 2',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[1]
        },
        {
          title: 'Contenido 3',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[2]
        },
        {
          title: 'Contenido 4',
          description: 'Lorem ipsum dolor sit amet consectetur. Enim nec arcu gravida clas mi tincidunt. Curabitur vitae urna quis sed metus lacinia aenean non interdum',
          image: imagenes[3]
        }
      ]
    }
  }

  const categoriaTabs = [
    { id: 'laboratorios', label: 'Laboratorios', data: categoriasData.laboratorios },
    { id: 'recursos', label: 'Recursos', data: categoriasData.recursos },
    { id: 'salidas', label: 'Salidas de Campo', data: categoriasData.salidas },
    { id: 'biblioteca', label: 'Biblioteca', data: categoriasData.biblioteca }
  ]

  const renderItemCard = (itemData, index, categoriaId) => {
    const { title, description, image } = itemData

    return (
      <div key={`${categoriaId}-${index}`} className={`${baseClass}__slide swiper-slide`} role='listitem'>
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__image-container`}>
            <img src={image} alt={title} className={`${baseClass}__image`} loading="lazy" />
          </div>
          
          <div className={`${baseClass}__content`}>
            <h3 className={`${baseClass}__card-title`}>{title}</h3>
            <p className={`${baseClass}__card-description`}>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderCarousel = (categoriaData, categoriaId) => {
    return (
      <div className={`${baseClass}__category-content`}>
        <div className={`${baseClass}__carousel swiper`}>
          <div className={`${baseClass}__wrapper gallery-swiper`}>
            <div className={`${baseClass}__slides swiper-wrapper`} role='list'>
              {categoriaData.items.map((itemData, index) => renderItemCard(itemData, index, categoriaId))}
            </div>

            <div className={`swiper-pagination ${baseClass}__pagination`} role='tablist' aria-label='Control de páginas del carrusel'></div>

            <button className={`swiper-slide-button ${baseClass}__prev`} aria-label='Ir al slide anterior' type='button'>
              <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
            </button>
            <button className={`swiper-slide-button ${baseClass}__next`} aria-label='Ir al siguiente slide' type='button'>
              <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`${baseClass}__container`}>
      <div id={elementName} className={baseClass}>
        <div className={`${baseClass}__tabs-container`}>
          <div className={`${baseClass}__tabs-nav`} role='tablist' aria-label='Categorías'>
            <div className={`${baseClass}__tabs-wrapper`}>
              {categoriaTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`${baseClass}__tab-button ${index === 0 ? 'active' : ''}`}
                  id={`${tab.id}-tab`}
                  data-tabs-target={`#${tab.id}-panel`}
                  type='button'
                  role='tab'
                  aria-controls={`${tab.id}-panel`}
                  aria-selected={index === 0 ? 'true' : 'false'}
                  tabIndex={index === 0 ? 0 : -1}>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${baseClass}__tabs-content`}>
            {categoriaTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                data-categoria-id={tab.id}
                role='tabpanel'
                aria-labelledby={`${tab.id}-tab`}
                aria-hidden={index !== 0 ? 'true' : 'false'}>
                {renderCarousel(tab.data, tab.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MaestriaGallery