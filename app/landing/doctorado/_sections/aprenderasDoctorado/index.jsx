import React from 'react'
import './styles.scss'

const Aprender = () => {
  // Texto completo
  const fullText = `El Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanos en un contexto globalizado, a través de una estrategia integradora de conocimientos. Forma investigadoras e investigadores de alto nivel capaces de contribuir al desarrollo de las ciencias sociales y humanas, y al fortalecimiento de la sociedad civil. El Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanos en un contexto globalizado, a través de una estrategia integradora de conocimientos. Forma investigadoras e investigadores de alto nivel capaces de contribuir al desarrollo de las ciencias sociales y humanas, y al fortalecimiento de la sociedad civil. El Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanas, y al fortalecimiento de la sociedad civil.`

  // Función para obtener texto truncado
  const getTruncatedText = (text, wordLimit) => {
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ')
  }

  // Función para manejar el toggle del texto
  const handleToggleText = () => {
    const descriptionElement = document.getElementById('description-text')
    const buttonElement = document.getElementById('read-more-button')

    const isCurrentlyExpanded = descriptionElement.getAttribute('data-expanded') === 'true'

    if (isCurrentlyExpanded) {
      // Contraer texto
      const truncatedText = getTruncatedText(fullText, 86)
      descriptionElement.textContent = truncatedText + '...'
      descriptionElement.setAttribute('data-expanded', 'false')
      buttonElement.textContent = 'Leer más'
      buttonElement.setAttribute('aria-label', 'Mostrar más texto')
    } else {
      // Expandir texto
      descriptionElement.textContent = fullText
      descriptionElement.setAttribute('data-expanded', 'true')
      buttonElement.textContent = 'Mostrar menos'
      buttonElement.setAttribute('aria-label', 'Mostrar menos texto')
    }
  }

  // Configuración inicial
  const truncatedText = getTruncatedText(fullText, 86)
  const shouldShowReadMore = fullText.split(' ').length > 86

  return (
    <section id='section-six'>
      <div className='color-containerA'>
        <div className='container expert-carousel' id='docentes'>
          <h2
            className='title title-neutral title-2xl title-center title-bold expert-carousel__titleA'
            data-lfr-editable-id='title-docentes-title-1'
            data-lfr-editable-type='text'>
            ¿Qué aprenderás en el Doctorado en Ciencias Sociales y Humanas?
          </h2>
          <div className='contentGeneralA'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmv36c8jSv-3h7C7qV5RRZMrlUGi_0etVxLQ&s'
              className='imgDoctoradoA'
              alt='Foto del docente'
              data-lfr-editable-id='image-1'
              data-lfr-editable-type='image'
            />

            <div className='doctoradoGrid'>
              <div className='text-container-expandible' id='content-wrapper-unique'>
                <div
                  className='descriptionDoctoradoA'
                  data-lfr-editable-id='docente-description-1'
                  data-lfr-editable-type='rich-text'
                  id='section-content-unique'>
                  El Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de
                  conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanos en un contexto
                  globalizado, a través de una estrategia integradora de conocimientos. Forma investigadoras e investigadores de alto nivel
                  capaces de contribuir al desarrollo de las ciencias sociales y humanas, y al fortalecimiento de la sociedad civil. El
                  Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de
                  conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanos en un contexto
                  globalizado, a través de una estrategia integradora de conocimientos. Forma investigadoras e investigadores de alto nivel
                  capaces de contribuir al desarrollo de las ciencias sociales y humanas, y al fortalecimiento de la sociedad civil.
                </div>

                <button className='read-more-toggle' data-action='toggle-read-more' aria-label='Mostrar más texto'>
                  Leer más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aprender
