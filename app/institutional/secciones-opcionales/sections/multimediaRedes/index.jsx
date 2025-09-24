'use client'
import { UniversalComponent as UC, Container } from '@library/components'

import { useEffect } from 'react'

import Post from './components/post'

import script from './script.js'
import './styles.scss'

const Multimedia = () => {
  useEffect(() => {
    script()
  }, [])

  return (
<<<<<<< HEAD
    <Container className="section-dos">
      <div id="section-two">
        <div className="container subjects-carousel">
          <h2 className="text-align-movil subjects-carousel__title">Multimedia</h2>
          <p className="text-align-movil"></p>

          <div className="container swiper">
            <div className="card-wrapper subjects-swiper">
              {/* Card slides container */}
              <div className="card-list swiper-wrapper" role="list">
                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
=======
    <Container className='section-dos'>
      <div id='section-two'>
        <div className='container subjects-carousel'>
          <h2 className='text-align-movil subjects-carousel__title'>Multimedia</h2>
          <p className='text-align-movil'></p>

          <div className='container swiper'>
            <div className='card-wrapper subjects-swiper'>
              {/* Card slides container */}
              <div className='card-list swiper-wrapper' role='list'>
                <div className='card-item swiper-slide' role='listitem'>
                  <div className='card-link'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                    <Post />
                  </div>
                </div>

<<<<<<< HEAD
                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
=======
                <div className='card-item swiper-slide' role='listitem'>
                  <div className='card-link'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                    <Post />
                  </div>
                </div>

<<<<<<< HEAD
                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
=======
                <div className='card-item swiper-slide' role='listitem'>
                  <div className='card-link'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                    <Post />
                  </div>
                </div>

<<<<<<< HEAD
                <div className="card-item swiper-slide" role="listitem">
                  <div className="card-link">
=======
                <div className='card-item swiper-slide' role='listitem'>
                  <div className='card-link'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                    <Post />
                  </div>
                </div>
              </div>

              {/* Paginación */}
<<<<<<< HEAD
              <div className="swiper-pagination subjects-pagination" role="tablist" aria-label="Control de páginas del carrusel"></div>

              {/* Botones de navegación */}
              <button className="swiper-slide-button subjects-prev" aria-label="Ir al slide anterior" type="button">
                <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button className="swiper-slide-button subjects-next" aria-label="Ir al siguiente slide" type="button">
                <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
=======
              <div className='swiper-pagination subjects-pagination' role='tablist' aria-label='Control de páginas del carrusel'></div>

              {/* Botones de navegación */}
              <button className='swiper-slide-button subjects-prev' aria-label='Ir al slide anterior' type='button'>
                <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
              </button>
              <button className='swiper-slide-button subjects-next' aria-label='Ir al siguiente slide' type='button'>
                <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default Multimedia
