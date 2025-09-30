import React from 'react'
import './style.scss'

class DoctoradoSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
      showButton: true
    }
    this.contentRef = React.createRef()
    this.wrapperRef = React.createRef()
  }

  componentDidMount() {
    this.checkContentLength()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.checkContentLength()
    }
  }

  countWords = element => {
    if (!element) return 0
    const text = element.textContent || element.innerText || ''
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length
  }

  checkContentLength = () => {
    const contentElement = this.contentRef.current
    if (!contentElement) return

    const wordCount = this.countWords(contentElement)

    if (wordCount <= 95) {
      this.setState({
        showButton: false,
        isExpanded: true
      })
    } else {
      this.setState({
        showButton: true,
        isExpanded: false
      })
    }
  }

  handleToggleClick = event => {
    event.preventDefault()
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  render() {
    const { isExpanded, showButton } = this.state
    const {
      title = '¿Qué aprenderás en el Doctorado en Ciencias Sociales y Humanas?',
      imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmv36c8jSv-3h7C7qV5RRZMrlUGi_0etVxLQ&s',
      imageAlt = 'Foto del docente',
      content = `El Doctorado en Ciencias Sociales y Humanas, contribuye a la apropiación, aplicación, generación y transferencia de conocimiento pertinente para la comprensión y explicación de los complejos problemas sociales y humanos en un contexto globalizado, a través de una estrategia integradora de conocimientos. Forma investigadoras e investigadores de alto nivel capaces de contribuir al desarrollo de las ciencias sociales y humanas, y al fortalecimiento de la sociedad civil.`
    } = this.props

    return (
      <section id='section-six'>
        <div className='color-containerA'>
          <div className='container expert-carousel' id='docentes'>
            <h2 className='title title-neutral title-2xl title-center title-bold expert-carousel__titleA'>{title}</h2>
            <div className='contentGeneralA'>
              <img src={imageUrl} className='imgDoctoradoA' alt={imageAlt} />

              <div className='doctoradoGridA'>
                <div className={`text-container-expandible ${!showButton ? 'short-content' : ''}`} ref={this.wrapperRef}>
                  <div
                    className={`descriptionDoctoradoA ${isExpanded ? 'expanded' : ''}`}
                    ref={this.contentRef}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />

                  {showButton && (
                    <button
                      className='read-more-toggle'
                      onClick={this.handleToggleClick}
                      aria-label={isExpanded ? 'Mostrar menos texto' : 'Mostrar más texto'}>
                      {isExpanded ? 'Leer menos' : 'Leer más'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DoctoradoSection
