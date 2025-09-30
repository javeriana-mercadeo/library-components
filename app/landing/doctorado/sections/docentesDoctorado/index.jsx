import React from 'react'
import './style.scss'

class DocentesDoctorado extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperInstance: null,
      isInitialized: false
    }
    this.swiperRef = React.createRef()
  }

  componentDidMount() {
    // Cargar Swiper de manera asíncrona
    this.loadSwiperAndInit()
    // Configurar listener de resize
    this.setupResizeListener()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expertsData !== this.props.expertsData) {
      this.reinitializeSwiper()
    }
  }

  componentWillUnmount() {
    if (this.state.swiperInstance) {
      this.state.swiperInstance.destroy(true, true)
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }
    window.removeEventListener('resize', this.handleResize)
  }

  loadSwiperAndInit = async () => {
    // Verificar si Swiper ya está disponible
    if (window.Swiper) {
      this.initializeSwiper()
      return
    }

    // Cargar Swiper dinámicamente
    try {
      const { default: Swiper } = await import('swiper')
      window.Swiper = Swiper
      this.initializeSwiper()
    } catch (error) {
      console.error('Error cargando Swiper:', error)
      // Fallback: intentar de nuevo después de un delay
      setTimeout(this.checkAndInit, 300)
    }
  }

  checkAndInit = () => {
    if (window.Swiper) {
      this.initializeSwiper()
    } else {
      setTimeout(this.checkAndInit, 300)
    }
  }

  initializeSwiper = () => {
    if (!this.swiperRef.current || this.state.isInitialized) return

    const { expertsData = [] } = this.props
    const totalSlides = expertsData.length

    if (totalSlides === 0) return

    const swiperInstance = new window.Swiper(this.swiperRef.current, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      navigation: {
        nextEl: '.expert-carousel_next',
        prevEl: '.expert-carousel_prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        428: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 10
        },
        576: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 10
        },
        768: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 15
        },
        1024: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 20
        },
        1200: {
          slidesPerView: Math.min(5, totalSlides),
          spaceBetween: 20
        },
        1440: {
          slidesPerView: Math.min(6, totalSlides),
          spaceBetween: 20
        }
      },

      on: {
        init: () => {
          this.equalizeHeights()
          this.updateNavigationVisibility(swiperInstance, totalSlides)
          this.updateButtonStates(swiperInstance)
        },
        update: () => {
          this.equalizeHeights()
          this.updateNavigationVisibility(swiperInstance, totalSlides)
          this.updateButtonStates(swiperInstance)
        },
        resize: () => {
          setTimeout(() => {
            this.equalizeHeights()
            this.updateNavigationVisibility(swiperInstance, totalSlides)
            this.updateButtonStates(swiperInstance)
          }, 100)
        },
        breakpoint: () => {
          setTimeout(() => {
            this.updateNavigationVisibility(swiperInstance, totalSlides)
            this.updateButtonStates(swiperInstance)
          }, 150)
        },
        slideChange: () => {
          this.equalizeHeights()
          this.updateButtonStates(swiperInstance)
        }
      }
    })

    this.setState({
      swiperInstance,
      isInitialized: true
    })
  }

  reinitializeSwiper = () => {
    if (this.state.swiperInstance) {
      this.state.swiperInstance.destroy(true, true)
    }
    this.setState({ isInitialized: false }, () => {
      setTimeout(this.initializeSwiper, 100)
    })
  }

  equalizeHeights = () => {
    const cards = document.querySelectorAll('.expert-carousel_card')
    let maxHeight = 0

    // Reset heights
    cards.forEach(card => {
      card.style.height = 'auto'
      const height = card.offsetHeight
      if (height > maxHeight) {
        maxHeight = height
      }
    })

    // Apply max height
    cards.forEach(card => {
      card.style.height = maxHeight + 'px'
    })
  }

  updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.expert-carousel_next')
    const prevBtn = document.querySelector('.expert-carousel_prev')

    if (!nextBtn || !prevBtn) return

    const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : swiper.params.slidesPerView

    const needsNavigation = totalSlides > slidesPerView

    if (needsNavigation) {
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      this.updateButtonStates(swiper)
    } else {
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
    }
  }

  updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.expert-carousel_next')
    const prevBtn = document.querySelector('.expert-carousel_prev')

    if (!nextBtn || !prevBtn) return

    // Botón anterior
    if (swiper.isBeginning) {
      prevBtn.classList.add('swiper-button-disabled')
      prevBtn.style.opacity = '0.3'
      prevBtn.style.pointerEvents = 'none'
    } else {
      prevBtn.classList.remove('swiper-button-disabled')
      prevBtn.style.opacity = '1'
      prevBtn.style.pointerEvents = 'auto'
    }

    // Botón siguiente
    if (swiper.isEnd) {
      nextBtn.classList.add('swiper-button-disabled')
      nextBtn.style.opacity = '0.3'
      nextBtn.style.pointerEvents = 'none'
    } else {
      nextBtn.classList.remove('swiper-button-disabled')
      nextBtn.style.opacity = '1'
      nextBtn.style.pointerEvents = 'auto'
    }
  }

  setupResizeListener = () => {
    this.handleResize = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout)
      }
      this.resizeTimeout = setTimeout(() => {
        this.equalizeHeights()
        if (this.state.swiperInstance) {
          this.state.swiperInstance.update()
        }
      }, 250)
    }

    window.addEventListener('resize', this.handleResize)
  }

  renderExpertCard = (expert, index) => {
    return (
      <div key={expert.id || index} className='expert-carousel_slide swiper-slide'>
        <div className='expert-carousel_card'>
          <div className='expert-carousel_card-header'>
            <img src={expert.image} alt={expert.name} className='expert-carousel_card-image' loading='lazy' />
          </div>
          <div className='expert-carousel_card-content'>
            <h3 className='expert-carousel_card-name'>{expert.name}</h3>
            <p className='expert-carousel_card-title'>{expert.title}</p>
            {expert.link && (
              <a href={expert.link} className='expert-carousel_card-link' target='_blank' rel='noopener noreferrer'>
                Ver perfil
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      title = 'Docentes expertos',
      description = 'Docentes expertos con experiencia práctica y académica, comprometidos con la excelencia e innovación.',
      featuredTeacher = {
        name: 'Juana María Marín Leoz',
        title: 'Decana de Facultad',
        image:
          'https://static.vecteezy.com/system/resources/previews/003/428/270/non_2x/businessman-explain-pose-character-design-free-vector.jpg',
        description:
          'Lorem ipsum dolor sit amet consectetur. Eu ullamcorper mauris cursus lacus ac a sit eget sit. Pellentesque ornare mattis eleifend pulvinar bibendum. Vitae vestibulum quam viverra consequat malesuada.'
      },
      expertsData = []
    } = this.props

    return (
      <section id='section-six'>
        <div className='color-container'>
          <div className='container expert-carousel' id='docentes'>
            <h2 className='title title-neutral title-2xl title-center title-bold expert-carousel__title'>{title}</h2>

            <div
              className='paragraph paragraph-neutral paragraph-md paragraph-center expert-carousel__description'
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Sección del docente destacado */}
            <div className='contentGeneralD'>
              <img src={featuredTeacher.image} className='imgDoctorado' alt={`Foto de ${featuredTeacher.name}`} />
              <div className='doctoradoGrid'>
                <h2 className='NombreDoctorado'>{featuredTeacher.name}</h2>
                <p className='titleDoctorado'>{featuredTeacher.title}</p>
                <p className='descriptionDoctorado'>{featuredTeacher.description}</p>
              </div>
            </div>

            {/* Carrusel de expertos */}
            {expertsData.length > 0 && (
              <div className='expert-carousel_carousel'>
                <div className='expert-carousel_wrapper'>
                  <div ref={this.swiperRef} className='swiper expert-carousel_slides'>
                    <div className='swiper-wrapper'>{expertsData.map(this.renderExpertCard)}</div>
                  </div>

                  {/* Botones de navegación */}
                  <div className='expert-carousel_prev'>
                    <i className='ph ph-caret-left'></i>
                  </div>
                  <div className='expert-carousel_next'>
                    <i className='ph ph-caret-right'></i>
                  </div>

                  {/* Paginación para móviles */}
                  <div className='expert-carousel_pagination swiper-pagination'></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default DocentesDoctorado
