'use client'

import { useEffect, useRef, useState } from 'react'
import Container from '@/app/components/container'
import Title from '@/app/components/title'

import info from './info.json'
import './styles.scss'

const MultimediaSlider = () => {
  const elementName = info.id || 'multimediaSlider'
  const baseClass = 'multimedia-slider'

  // Refs para los Swipers
  const mainSwiperRef = useRef(null)
  const thumbsSwiperRef = useRef(null)

  // Estado para el índice del slide principal activo
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Referencias para los iframes de video (para controlarlos)
  const videoRefs = useRef({})

  // ==========================================
  // DATOS DINÁMICOS DEL CONTENIDO MULTIMEDIA
  // ==========================================
  const mediaContent = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Paisaje Natural',
      thumbnail:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      overlayText: ''
    },
    {
      type: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      title: 'Video Musical',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      overlayText: ''
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Arquitectura Moderna',
      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      overlayText: ''
    },
    {
      type: 'youtube',
      videoId: 'jNQXAC9IVRw',
      title: 'Video Educativo',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg',
      overlayText: ''
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      title: 'Bosque Encantado',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      overlayText: ''
    },
    {
      type: 'youtube',
      videoId: 'M7lc1UVf-VE',
      title: 'Video Tecnológico',
      thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
      overlayText: ''
    }
  ]

  // ==========================================
  // FUNCIÓN PARA CONTROLAR VISIBILIDAD DE VIDEOS
  // ==========================================
  // OPTIMIZACIÓN: Usar solo CSS para control de visibilidad en lugar de postMessage API
  // Esto evita problemas de autoplay en Liferay y mejora la compatibilidad
  const controlVideoVisibility = indexToPlay => {
    mediaContent.forEach((item, index) => {
      if (item.type === 'youtube' && videoRefs.current[item.videoId]) {
        const iframe = videoRefs.current[item.videoId]
        if (index === indexToPlay) {
          // Mostrar video activo
          iframe.style.display = 'block'
          // Ocultar la imagen si existe
          const img = iframe.previousElementSibling
          if (img && img.tagName === 'IMG') {
            img.style.opacity = '0'
          }
        } else {
          // Ocultar videos inactivos
          iframe.style.display = 'none'
          // Mostrar la imagen si existe
          const img = iframe.previousElementSibling
          if (img && img.tagName === 'IMG') {
            img.style.opacity = '1'
          }
        }
      }
    })
  }

  // ==========================================
  // EFECTO PARA INICIALIZAR SWIPERS
  // ==========================================
  useEffect(() => {
    const initializeSwipers = () => {
      // Destruir instancias existentes si existen
      if (mainSwiperRef.current?.swiper) {
        mainSwiperRef.current.swiper.destroy(true, true)
      }
      if (thumbsSwiperRef.current?.swiper) {
        thumbsSwiperRef.current.swiper.destroy(true, true)
      }

      // Verificar que Swiper esté disponible
      if (!window.Swiper) {
        console.error('Swiper no está disponible')
        return
      }

      // Inicializar Swiper de miniaturas
      const thumbsSwiper = new window.Swiper(thumbsSwiperRef.current, {
        spaceBetween: 10,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: `.${baseClass}_thumbs-next`,
          prevEl: `.${baseClass}_thumbs-prev`
        },
        breakpoints: {
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 }
        }
      })

      // Inicializar Swiper principal
      const mainSwiper = new window.Swiper(mainSwiperRef.current, {
        spaceBetween: 10,
        loop: true,
        thumbs: {
          swiper: thumbsSwiper
        },
        on: {
          init: function () {
            setCurrentSlideIndex(this.realIndex)
            // Controlar visibilidad del primer video
            controlVideoVisibility(this.realIndex)
          },
          slideChange: function () {
            setCurrentSlideIndex(this.realIndex)
            controlVideoVisibility(this.realIndex)
          }
          // Manejar clicks en el slide principal para videos si fuera necesario (opcional)
          // click: function(swiper, event) {
          //   const activeSlide = swiper.slides[swiper.activeIndex];
          //   const mediaType = activeSlide.dataset.mediaType;
          //   if (mediaType === 'youtube' && videoRefs.current[mediaType]?.contentWindow) {
          //     // Implementar lógica de play/pause al click si no es autoplay
          //   }
          // }
        }
      })

      // Asignar instancias de Swiper a los refs para acceso futuro
      mainSwiperRef.current.swiper = mainSwiper
      thumbsSwiperRef.current.swiper = thumbsSwiper

      // Listener para redimensionamiento para actualizar Swipers
      let resizeTimeout
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          mainSwiper.update()
          thumbsSwiper.update()
        }, 250)
      }

      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        if (mainSwiperRef.current?.swiper) {
          mainSwiperRef.current.swiper.destroy(true, true)
        }
        if (thumbsSwiperRef.current?.swiper) {
          thumbsSwiperRef.current.swiper.destroy(true, true)
        }
      }
    }

    // Esperar a que Swiper esté cargado (si no está ya disponible globalmente)
    const checkSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        initializeSwipers()
      } else {
        setTimeout(checkSwiper, 100)
      }
    }
    checkSwiper()
  }, []) // Solo se ejecuta una vez al montar el componente

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
        </div>
      )
    } else if (item.type === 'youtube') {
      return (
        <div key={index} className={`${baseClass}_main-slide swiper-slide`}>
          {/* La miniatura debe ir primero para que el iframe la pueda ocultar */}
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ zIndex: 1, position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <iframe
            ref={el => (videoRefs.current[item.videoId] = el)}
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=0`}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            loading='lazy'
            title={item.title}
            style={{ display: index === currentSlideIndex ? 'block' : 'none', zIndex: 2 }}></iframe>
          {/* Overlay con texto para videos */}
          <div className={`${baseClass}_content-text-overlay`}>
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
    const isActive = index === currentSlideIndex // Determinar si la miniatura está activa
    return (
      <div
        key={index}
        className={`${baseClass}_thumb-slide swiper-slide ${isActive ? 'swiper-slide-thumb-active' : ''}`}
        onClick={() => mainSwiperRef.current?.swiper.slideToLoop(index)} // Cambiar slide al hacer click
      >
        <img src={item.thumbnail} alt={item.title} />
        {item.type === 'youtube' && <div className={`${baseClass}_video-indicator`}>VIDEO</div>}
      </div>
    )
  }

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        <Title className='multimedia-titulo' weight='semibold' size='2xl' align='center' id={`${elementName}-title`}>
          Multimedia
        </Title>

        <div className={`${baseClass}_slider-container`}>
          {/* Slider principal */}
          <div className={`${baseClass}_main-swiper swiper`} ref={mainSwiperRef}>
            <div className={`${baseClass}_main-wrapper swiper-wrapper`} role='list'>
              {mediaContent.map((item, index) => renderMainSlide(item, index))}
            </div>
          </div>

          {/* Slider de miniaturas */}
          <div className={`${baseClass}_thumbs-swiper swiper`} ref={thumbsSwiperRef}>
            <div className={`${baseClass}_thumbs-wrapper swiper-wrapper`} role='list'>
              {mediaContent.map((item, index) => renderThumbnail(item, index))}
            </div>

            {/* Botones de navegación para thumbnails */}
            <button className={`swiper-slide-button ${baseClass}_thumbs-prev`} aria-label='Ir al slide anterior' type='button'>
              <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
            </button>

            <button className={`swiper-slide-button ${baseClass}_thumbs-next`} aria-label='Ir al siguiente slide' type='button'>
              <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MultimediaSlider
