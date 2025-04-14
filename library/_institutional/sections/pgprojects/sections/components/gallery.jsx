'use client'
import React, { Component } from 'react'
import '../styles/gallery.scss'

class ImageSlider extends Component {
  constructor(props) {
    super(props)

    // Estado inicial
    this.state = {
      currentIndex: 0,
      slidesPerView: this.getSlidesPerView(),
      slideWidth: 0,
      slideGap: 15
    }

    // Referencias
    this.sliderWrapperRef = React.createRef()
    this.scrollTimeout = null

    // Bindings de métodos
    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
  }

  // Datos para las slides
  slides = [
    {
      id: 1,
      type: 'video',
      videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp41',
      title: 'Video 1'
    },
    {
      id: 2,
      type: 'video',
      videoUrl: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/multimedia-mp44',
      title: 'Video 2'
    },
    {
      id: 3,
      type: 'youtube',
      youtubeUrl: 'https://www.youtube.com/watch?v=xV8jjDRgSyM',
      title: 'YouTube Video'
    },
    {
      id: 4,
      type: 'image',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Imagen 1'
    },
    {
      id: 5,
      type: 'image',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Imagen 2'
    },
    {
      id: 6,
      type: 'image',
      image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      title: 'Imagen 3'
    }
  ]
  getYouTubeEmbedUrl(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('keydown', this.handleKeyDown)

    this.calculateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleKeyDown)

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slidesPerView !== this.state.slidesPerView) {
      const maxIndex = this.slides.length - this.state.slidesPerView
      if (this.state.currentIndex > maxIndex) {
        this.setState({ currentIndex: maxIndex })
      }
    }
  }

  getSlidesPerView() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 992) {
        return 3
      } else if (window.innerWidth >= 576) {
        return
      } else {
        return 1
      }
    }
    return 3
  }

  calculateDimensions() {
    if (this.sliderWrapperRef.current) {
      const slideElements = this.sliderWrapperRef.current.querySelectorAll('.slide')
      if (slideElements.length > 0) {
        const slideWidth = slideElements[0].offsetWidth
        const computedStyle = window.getComputedStyle(this.sliderWrapperRef.current)
        const slideGap = parseInt(computedStyle.gap) || 15

        this.setState({ slideWidth, slideGap })
      }
    }
  }

  handleResize() {
    const slidesPerView = this.getSlidesPerView()
    this.setState({ slidesPerView }, () => {
      this.calculateDimensions()
    })
  }

  handleScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout)
    }

    this.scrollTimeout = setTimeout(() => {
      if (this.sliderWrapperRef.current) {
        const { slideWidth, slideGap } = this.state
        const totalSlideWidth = slideWidth + slideGap
        const scrollPosition = this.sliderWrapperRef.current.scrollLeft

        const newIndex = Math.round(scrollPosition / totalSlideWidth)
        this.setState({ currentIndex: newIndex })
      }
    }, 150)
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.goToSlide(this.state.currentIndex - 1)
    } else if (e.key === 'ArrowRight') {
      this.goToSlide(this.state.currentIndex + 1)
    }
  }

  goToSlide(index) {
    const maxIndex = this.slides.length - this.state.slidesPerView
    const newIndex = Math.max(0, Math.min(index, maxIndex))

    this.setState({ currentIndex: newIndex })

    if (this.sliderWrapperRef.current) {
      const { slideWidth, slideGap } = this.state
      const scrollPosition = newIndex * (slideWidth + slideGap)

      this.sliderWrapperRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  render() {
    const { currentIndex, slidesPerView } = this.state
    const maxIndex = this.slides.length - slidesPerView

    return (
      <div className="slider-section">
        <div className="carousel-title">
          <h1>Multimedia</h1>
        </div>

        <div className="image-slider-container">
          <div className="title-gallery">
            <h1>Lorem ipsum dolor sit amet consectetur.</h1>
          </div>

          <div className="image-slider">
            <button
              className={`nav-button prev-button ${currentIndex <= 0 ? 'disabled' : ''}`}
              onClick={() => this.goToSlide(currentIndex - 1)}
              disabled={currentIndex <= 0}>
              <span className="arrow-icon">&#10094;</span>
            </button>

            <button
              className={`nav-button next-button ${currentIndex >= maxIndex ? 'disabled' : ''}`}
              onClick={() => this.goToSlide(currentIndex + 1)}
              disabled={currentIndex >= maxIndex}>
              <span className="arrow-icon">&#10095;</span>
            </button>

            <div className="slider-wrapper" ref={this.sliderWrapperRef} onScroll={this.handleScroll}>
              {this.slides.map(slide => (
                <div className="slide" key={slide.id}>
                  <a href={slide.link || '#'} className="slide-link" onClick={e => (slide.link ? null : e.preventDefault())}>
                    {slide.type === 'image' && (
                      <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                        <div className="slide-content">
                          <button className="content-button" aria-label={`Ver más de ${slide.title}`}></button>
                        </div>
                      </div>
                    )}

                    {slide.type === 'video' && (
                      <div className="slide-video">
                        <video
                          src={slide.videoUrl}
                          controls
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        />
                      </div>
                    )}

                    {slide.type === 'youtube' && (
                      <div className="slide-video">
                        <iframe
                          src={this.getYouTubeEmbedUrl(slide.youtubeUrl)}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={slide.title}
                          style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                        />
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageSlider
