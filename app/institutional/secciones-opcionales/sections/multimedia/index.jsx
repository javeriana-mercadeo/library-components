// ==========================================
// COMPONENTE REACT SLIDER MULTIMEDIA
// ==========================================
'use client'

import { useEffect } from 'react'
import Container from '@library/components/container'
import Title from '@library/components/contain/title'
import Paragraph from '@library/components/contain/paragraph'

import info from './info.json'
import script from './script.js'
import './styles.scss'

const MultimediaSlider = () => {
  const elementName = info.id || 'multimediaSlider'
  const baseClass = 'multimedia-slider'

  useEffect(() => {
    script()
  }, [])

  // ==========================================
  // DATOS DINÁMICOS DEL CONTENIDO MULTIMEDIA
  // ==========================================
  const mediaContent = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Paisaje Natural',
      thumbnail:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'xV8jjDRgSyM&t',
      title: 'Video Musical',
      thumbnail:
        'data:image/jpeg;base64,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',
      overlayText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Arquitectura Moderna',
      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'jNQXAC9IVRw',
      title: 'Video Educativo',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
      overlayText:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra veniam sit amet lacus cursus. Pellentesque habitant morbi tristique senectus.'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      title: 'Bosque Encantado',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      type: 'youtube',
      videoId: 'M7lc1UVf-VE',
      title: 'Video Tecnológico',
      thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/mqdefault.jpg',
      overlayText:
        'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum.'
    }
  ]

  // ==========================================
  // FUNCIÓN PARA RENDERIZAR SLIDE PRINCIPAL
  // ==========================================
  const renderMainSlide = (item, index) => {
    if (item.type === 'image') {
      return (
        <div key={index} className={`${baseClass}_main-slide swiper-slide`}>
          <img src={item.src} alt={item.title} />
        </div>
      )
    } else if (item.type === 'youtube') {
      return (
        <div key={index} className={`${baseClass}_main-slide swiper-slide`}>
          <img src={item.thumbnail} alt={item.title} />

          {/* Overlay con texto para videos */}
          <div className={`${baseClass}_video-text-overlay`}>
            <div className={`${baseClass}_overlay-content`}>
              <h3 className={`${baseClass}_overlay-title`}>{item.title}</h3>
              <p className={`${baseClass}_overlay-text`}>{item.overlayText}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  // ==========================================
  // FUNCIÓN PARA RENDERIZAR MINIATURA
  // ==========================================
  const renderThumbnail = (item, index) => {
    return (
      <div key={index} className={`${baseClass}_thumb-slide swiper-slide`}>
        <img src={item.thumbnail} alt={item.title} />
        {item.type === 'youtube' && <div className={`${baseClass}_video-indicator`}>VIDEO</div>}
      </div>
    )
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <Title weight="semibold" size="2xl" align="center" id={`${elementName}-title`}>
          Galería Multimedia
        </Title>

        <Paragraph id={`${elementName}-description`} align="center">
          Explora nuestra colección de imágenes y videos destacados
        </Paragraph>

        <div className={`${baseClass}_slider-container`}>
          {/* Slider principal */}
          <div className={`${baseClass}_main-swiper swiper`}>
            <div className={`${baseClass}_main-wrapper swiper-wrapper`} role="list">
              {mediaContent.map((item, index) => renderMainSlide(item, index))}
            </div>
          </div>

          {/* Slider de miniaturas */}
          <div className={`${baseClass}_thumbs-swiper swiper`}>
            <div className={`${baseClass}_thumbs-wrapper swiper-wrapper`} role="list">
              {mediaContent.map((item, index) => renderThumbnail(item, index))}
            </div>

            {/* Botones de navegación para thumbnails */}
            <button className={`swiper-slide-button ${baseClass}_thumbs-prev`} aria-label="Ir al slide anterior" type="button">
              <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
            </button>

            <button className={`swiper-slide-button ${baseClass}_thumbs-next`} aria-label="Ir al siguiente slide" type="button">
              <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Datos para el script */}
        <script
          type="application/json"
          id="multimedia-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(mediaContent)
          }}
        />
      </Container>
    </section>
  )
}

export default MultimediaSlider
