import React from 'react'
import './style.scss'

class VideoDoctorado extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeModal: null,
      videoType: 'none', // 'youtube', 'html5', 'none'
      loading: false
    }
    this.youtubeContainerRef = React.createRef()
    this.html5ContainerRef = React.createRef()
    this.bgImageRef = React.createRef()
  }

  componentDidMount() {
    this.updateVideoBackground()
    this.setupResizeListener()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoDesktop !== this.props.videoDesktop || prevProps.videoMobile !== this.props.videoMobile) {
      this.updateVideoBackground()
    }
  }

  setupResizeListener = () => {
    this.resizeTimeout = null
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.updateVideoBackground, 300)
    })
  }

  componentWillUnmount() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }
    window.removeEventListener('resize', this.updateVideoBackground)
  }

  // Utilidades de video
  extractYouTubeId = url => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  isYouTubeUrl = text => {
    return !!text && (text.includes('youtube.com') || text.includes('youtu.be'))
  }

  isDirectVideoUrl = text => {
    if (!text) return false
    return (
      /\.(mp4|webm|ogg|mov|avi)(\?|$)/i.test(text) ||
      text.includes('cloudfront') ||
      text.includes('amazonaws') ||
      text.includes('.mp4') ||
      text.includes('.webm')
    )
  }

  getConfiguredUrl = () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const desktop = this.props.videoDesktop || ''
    const mobile = this.props.videoMobile || ''
    return isMobile && mobile ? mobile : desktop
  }

  clearContainers = () => {
    this.setState({ videoType: 'none' })
  }

  updateVideoBackground = () => {
    this.clearContainers()
    const url = this.getConfiguredUrl()

    if (!url) {
      return
    }

    if (this.isYouTubeUrl(url)) {
      const id = this.extractYouTubeId(url)
      if (id) {
        this.setState({ videoType: 'youtube' })
      }
    } else if (this.isDirectVideoUrl(url)) {
      this.setState({ videoType: 'html5', loading: true })
    }
  }

  // Sistema de modales
  openModal = modalId => {
    this.setState({ activeModal: modalId })
    document.body.style.overflow = 'hidden'
  }

  closeModal = () => {
    this.setState({ activeModal: null })
    document.body.style.overflow = ''
  }

  handleModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.closeModal()
    }
  }

  handleEscapeKey = e => {
    if (e.key === 'Escape' && this.state.activeModal) {
      this.closeModal()
    }
  }

  componentDidMount() {
    this.updateVideoBackground()
    this.setupResizeListener()
    document.addEventListener('keydown', this.handleEscapeKey)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey)
    document.body.style.overflow = ''
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }
    window.removeEventListener('resize', this.updateVideoBackground)
  }

  renderVideoContent = () => {
    const url = this.getConfiguredUrl()
    const { videoType, loading } = this.state

    if (videoType === 'youtube') {
      const videoId = this.extractYouTubeId(url)
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      )
    }

    if (videoType === 'html5') {
      return (
        <>
          {loading && (
            <div className='video-loading'>
              <div style={{ textAlign: 'center' }}>
                <div className='video-loading-spinner'></div>
                <p>Cargando video...</p>
              </div>
            </div>
          )}
          <video
            src={url}
            muted
            loop
            autoPlay
            playsInline
            onLoadedData={() => this.setState({ loading: false })}
            onError={() => this.setState({ videoType: 'none', loading: false })}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </>
      )
    }

    return null
  }

  render() {
    const {
      title = 'Doctorado en Ciencias Sociales y Humanas',
      description = 'Comprende, analiza y explica los complejos problemas sociales y humanos en un contexto globalizado.',
      backgroundImage = 'https://cloudfront-us-east-1.images.arcpublishing.com/semana/BFV7EVLSUNEGJBWIRE4XO64FXM.gif',
      programInfo = {
        titleLabel: 'Título que otorga',
        titleValue: 'Nombre del programa',
        sniesCode: 'Código SNIES',
        levelLabel: 'Nivel Académico',
        levelValue: 'Posgrado',
        durationLabel: 'Duración',
        durationValue: 'Cuatro (4) semestres.',
        scheduleLabel: 'Horarios',
        modalityLabel: 'Modalidad',
        modalityValue: 'Disponibilidad de tiempo completo.',
        investmentLabel: 'Inversión Semestre',
        investmentValue: 'Cargando...',
        ctaLink: '/inscripciones',
        ctaText: 'Descubre cómo inscribirte'
      },
      legalInfo = '| Resolución de Registro Calificado: 9406 del 27 de mayo de 2022, vigente hasta el 27 de mayo de 2030. | Resolución de Acreditación de Alta Calidad: 9406 del 27 de mayo del 2022, vigente por 8 años, hasta el 27 de mayo de 2030.',
      modalContent = {
        title: 'Horarios',
        content: `
          <p><strong>Jornada de atención:</strong></p>
          <ul>
            <li><strong>Lunes a viernes:</strong> 7:00 a.m. a 11:00 a.m.</li>
            <li><strong>Sábados:</strong> 8:00 a.m. a 12:00 p.m. (solo con cita previa)</li>
          </ul>
          <p>Si necesitas atención en un horario diferente, por favor comunícate con nosotros con antelación para agendar una cita personalizada.</p>
        `
      }
    } = this.props

    const { activeModal, videoType } = this.state

    return (
      <>
        <section className='video-doctorado'>
          {/* Background con video/imagen */}
          <div className='video-doctorado__background'>
            {/* Imagen de fondo */}
            <div className='video-doctorado__background-container'>
              <img
                ref={this.bgImageRef}
                src={backgroundImage}
                alt='Fondo Doctorado'
                className='video-doctorado__background-image'
                style={{ display: videoType === 'none' ? 'block' : 'none' }}
              />
            </div>

            {/* Contenedores para videos */}
            <div ref={this.youtubeContainerRef} className={`video-doctorado__video-container ${videoType === 'youtube' ? 'active' : ''}`}>
              {videoType === 'youtube' && this.renderVideoContent()}
            </div>

            <div ref={this.html5ContainerRef} className={`video-doctorado__video-container ${videoType === 'html5' ? 'active' : ''}`}>
              {videoType === 'html5' && this.renderVideoContent()}
            </div>

            <div className='video-doctorado__overlay'></div>
          </div>

          {/* Contenido principal */}
          <div className='video-doctorado__container'>
            <div className='video-doctorado__content'>
              <div className='container'>
                <div className='video-doctorado__header'>
                  <h1 className='video-doctorado__title'>{title}</h1>

                  <p className='video-doctorado__description'>{description}</p>
                </div>
              </div>

              {/* Información del programa */}
              <div className='video-doctorado__info'>
                <div className='video-doctorado__info-grid'>
                  {/* Título que otorga */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-graduation-cap'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.titleLabel}</span>
                      <span className='info-item__value'>{programInfo.titleValue}</span>
                      <span className='info-item__code'>{programInfo.sniesCode}</span>
                    </div>
                  </div>

                  {/* Nivel Académico */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-student'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.levelLabel}</span>
                      <span className='info-item__value'>{programInfo.levelValue}</span>
                    </div>
                  </div>

                  {/* Duración */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-calendar-dots'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.durationLabel}</span>
                      <span className='info-item__value'>{programInfo.durationValue}</span>
                    </div>
                  </div>

                  {/* Horario con Modal */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-graduation-cap'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.scheduleLabel}</span>
                      <div className='program-detail_content--clickable'>
                        <button
                          onClick={() => this.openModal('modal-horarios-doctorado')}
                          className='btn-close btn btn-primary btn-sm program-detail_value--clickable'
                          type='button'>
                          <span className='btn-text'>Ver detalles</span>
                          <span className='btn-icon btn-icon-end'>
                            <i className='ph ph-info'></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Modalidad */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-clock'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.modalityLabel}</span>
                      <span className='info-item__value'>{programInfo.modalityValue}</span>
                    </div>
                  </div>

                  {/* Inversión */}
                  <div className='info-item'>
                    <div className='info-item__icon'>
                      <i className='ph ph-piggy-bank'></i>
                    </div>
                    <div className='info-item__content'>
                      <span className='info-item__label'>{programInfo.investmentLabel}</span>
                      <span className='info-item__value'>{programInfo.investmentValue}</span>
                      <span className='info-item__value'>
                        <a href={programInfo.ctaLink}>{programInfo.ctaText}</a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información legal */}
                <div className='program-data_enrollment-note-container'>
                  <p className='program-data_enrollment-note' dangerouslySetInnerHTML={{ __html: legalInfo }} />
                </div>
              </div>
            </div>
          </div>

          {/* Modal de Horarios */}
          {activeModal === 'modal-horarios-doctorado' && (
            <div className='program-detail-modal program-detail-modal--active' onClick={this.handleModalBackdrop}>
              <div className='program-detail-modal__content'>
                <div className='program-detail-modal__header'>
                  <h3 className='program-detail-modal__title'>{modalContent.title}</h3>
                  <button className='program-detail-modal__close' onClick={this.closeModal} aria-label='Cerrar modal'>
                    <i className='ph ph-x'></i>
                  </button>
                </div>
                <div className='program-detail-modal__body'>
                  <div className='program-data__modal-content' dangerouslySetInnerHTML={{ __html: modalContent.content }} />
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    )
  }
}

export default VideoDoctorado
