'use client'
import { UniversalComponent as UC, Container } from '@library/components'

import React, { Component } from 'react'

import Title from '@library/components/contain/title/index.jsx'

import { ImageSliderLogic } from './script.js'
import './styles.scss'

class ImageSlider extends Component {
  constructor(props) {
    super(props)

    // Inicializar la lógica del slider
    this.sliderLogic = new ImageSliderLogic(this)

    // Estado inicial
    this.state = {
      currentIndex: 0,
      slidesPerView: this.sliderLogic.getSlidesPerView(),
      slideWidth: 0,
      slideGap: 15
    }

    // Referencias
    this.sliderWrapperRef = React.createRef()
    this.scrollTimeout = null
  }

  componentDidMount() {
    this.sliderLogic.componentDidMount()
  }

  componentWillUnmount() {
    this.sliderLogic.componentWillUnmount()
  }

  componentDidUpdate(prevProps, prevState) {
    this.sliderLogic.componentDidUpdate(prevProps, prevState)
  }

  render() {
    const { currentIndex, slidesPerView } = this.state
    const maxIndex = this.sliderLogic.slides.length - slidesPerView

    return (
<<<<<<< HEAD
      <div className="slider-section">
        <div>
          <Title className="carousel-title">
=======
      <div className='slider-section'>
        <div>
          <Title className='carousel-title'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
            {' '}
            <h1>Multimedia</h1>{' '}
          </Title>
        </div>
<<<<<<< HEAD
        <Container className="image-slider-container">
          <div>
            <div>
              <Title className="title-gallery">
=======
        <Container className='image-slider-container'>
          <div>
            <div>
              <Title className='title-gallery'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                {' '}
                <h1>Lorem ipsum dolor sit amet consectetur.</h1>
              </Title>
            </div>

<<<<<<< HEAD
            <div className="image-slider">
=======
            <div className='image-slider'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              <button
                className={`nav-button prev-button ${currentIndex <= 0 ? 'disabled' : ''}`}
                onClick={() => this.sliderLogic.goToSlide(currentIndex - 1)}
                disabled={currentIndex <= 0}>
<<<<<<< HEAD
                <span className="arrow-icon">&#10094;</span>
=======
                <span className='arrow-icon'>&#10094;</span>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              </button>

              <button
                className={`nav-button next-button ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                onClick={() => this.sliderLogic.goToSlide(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}>
<<<<<<< HEAD
                <span className="arrow-icon">&#10095;</span>
              </button>

              <div className="slider-wrapper" ref={this.sliderWrapperRef} onScroll={() => this.sliderLogic.handleScroll()}>
                {this.sliderLogic.slides.map(slide => (
                  <div className="slide" key={slide.id}>
                    <a href={slide.link || '#'} className="slide-link" onClick={e => (slide.link ? null : e.preventDefault())}>
                      {slide.type === 'image' && (
                        <div className="slide-image" style={{ backgroundImage: `url(${slide.image})` }}>
                          <div className="slide-content">
                            <button className="content-button" aria-label={`Ver más de ${slide.title}`}></button>
=======
                <span className='arrow-icon'>&#10095;</span>
              </button>

              <div className='slider-wrapper' ref={this.sliderWrapperRef} onScroll={() => this.sliderLogic.handleScroll()}>
                {this.sliderLogic.slides.map(slide => (
                  <div className='slide' key={slide.id}>
                    <a href={slide.link || '#'} className='slide-link' onClick={e => (slide.link ? null : e.preventDefault())}>
                      {slide.type === 'image' && (
                        <div className='slide-image' style={{ backgroundImage: `url(${slide.image})` }}>
                          <div className='slide-content'>
                            <button className='content-button' aria-label={`Ver más de ${slide.title}`}></button>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                          </div>
                        </div>
                      )}

                      {slide.type === 'video' && (
<<<<<<< HEAD
                        <div className="slide-video">
                          <video
                            src={slide.videoUrl}
                            controls
                            preload="metadata"
=======
                        <div className='slide-video'>
                          <video
                            src={slide.videoUrl}
                            controls
                            preload='metadata'
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'rem(10px)' }}
                          />
                        </div>
                      )}

                      {slide.type === 'youtube' && (
<<<<<<< HEAD
                        <div className="slide-video">
                          <iframe
                            src={this.sliderLogic.getYouTubeEmbedUrl(slide.youtubeUrl)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
=======
                        <div className='slide-video'>
                          <iframe
                            src={this.sliderLogic.getYouTubeEmbedUrl(slide.youtubeUrl)}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                            allowFullScreen
                            title={slide.title}
                            style={{ width: '100%', height: '100%', borderRadius: 'rem(10px)' }}
                          />
                        </div>
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default ImageSlider
