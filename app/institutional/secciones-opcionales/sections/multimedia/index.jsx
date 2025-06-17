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
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      overlayText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi morbi tempus iaculis urna. Mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus.'
    },
    {
      type: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      title: 'Video Musical',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      overlayText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Arquitectura Moderna',
      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      overlayText:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse.'
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
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      overlayText:
        'Donec rutrum congue leo eget malesuada. Vivamus magna justo lacinia eget consectetur sed convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.'
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

          {/* Overlay con texto para imágenes */}
          <div className={`${baseClass}_content-text-overlay`}>
            <div className={`${baseClass}_overlay-content`}>
              <h3 className={`${baseClass}_overlay-title`}>{item.title}</h3>
              <p className={`${baseClass}_overlay-text`}>{item.overlayText}</p>
            </div>
          </div>

          <div className={`${baseClass}_slide-title`}>{item.title}</div>
        </div>
      )
    } else if (item.type === 'youtube') {
      return (
        <div key={index} className={`${baseClass}_main-slide swiper-slide`}>
          <img src={item.thumbnail} alt={item.title} />

          {/* Overlay con texto para videos */}
          <div className={`${baseClass}_content-text-overlay`}>
            <div className={`${baseClass}_overlay-content`}>
              <h3 className={`${baseClass}_overlay-title`}>{item.title}</h3>
              <p className={`${baseClass}_overlay-text`}>{item.overlayText}</p>
            </div>
          </div>

          <div className={`${baseClass}_slide-title`}>{item.title}</div>
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
