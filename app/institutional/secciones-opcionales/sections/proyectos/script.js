;(function () {
  'use strict'

  // ========================================
  // CONFIGURACIÓN Y DATOS
  // ========================================

  const projectsConfig = [
    {
      id: 0,
      title: 'Universidad Destacada',
      date: '2024',
      responsible: 'Equipo Académico',
      description: 'Descubre nuestros programas académicos de alta calidad.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'],
      thumbnail: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
    },
    {
      id: 1,
      title: 'Investigación de Clase Mundial',
      date: '2023-2024',
      responsible: 'Centro de Investigación',
      description: 'Proyectos innovadores y logros académicos destacados.',
      videoUrls: ['https://www.youtube.com/watch?v=h3GuFxrk8aI'],
      gallery: ['https://via.placeholder.com/800x600'],
      thumbnail: 'https://via.placeholder.com/400x400'
    },
    {
      id: 2,
      title: 'Campus Innovador',
      date: '2024',
      responsible: 'Departamento de Infraestructura',
      description: 'Instalaciones modernas y entorno de aprendizaje de vanguardia.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'],
      thumbnail: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg'
    },
    {
      id: 3,
      title: 'Oportunidades Internacionales',
      date: '2023-2024',
      responsible: 'Oficina Internacional',
      description: 'Programas de intercambio y colaboraciones globales.',
      videoUrls: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
      gallery: ['https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'],
      thumbnail: 'https://marionoriegaasociados.com/wp-content/uploads/2021/02/pweb_pm_javeriana-proyectos_01.png'
    }
  ]

  const CONFIG = {
    SLIDE_TRANSITION_DURATION: 400,
    MIN_SWIPE_DISTANCE: 50,
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 900,
    DESKTOP_BREAKPOINT: 1200
  }

  // Variables globales
  let currentSlide = 0
  let totalSlides = 0
  let isTransitioning = false
  let touchStartX = 0
  let touchEndX = 0
  let isTouching = false
  let currentProjects = projectsConfig
  let youtubePlayersRegistry = new Map()
  let isYouTubeAPIReady = false

  // ========================================
  // UTILIDADES
  // ========================================

  function isMobile() {
    return window.innerWidth < CONFIG.MOBILE_BREAKPOINT
  }

  function isTablet() {
    return window.innerWidth >= CONFIG.MOBILE_BREAKPOINT && window.innerWidth < CONFIG.TABLET_BREAKPOINT
  }

  function isMobileTablet() {
    return window.innerWidth < CONFIG.TABLET_BREAKPOINT
  }

  function extractYouTubeId(url) {
    const patterns = [/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/, /(?:youtube\.com\/embed\/)([^&\n?#]+)/, /(?:youtu\.be\/)([^&\n?#]+)/]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }
    return null
  }

  function getTimeParam(url) {
    const timeMatch = url.match(/[&?]t=(\d+)/)
    return timeMatch ? parseInt(timeMatch[1]) : 0
  }

  // ========================================
  // GENERACIÓN DE HTML
  // ========================================

  function generateCarouselHTML(projects) {
    return `
      <section class="container hero-carousel" id="carousel-section" data-slides-count="${projects.length}">
        <div>
          <h2 class="title title-lg carousel-title">
            Proyectos Destacados
          </h2>
        </div>

        <div class="main-container">
          <div class="carousel-container" id="carousel-container">
            <div class="swiper-wrapper" id="slides-wrapper">
              ${projects
                .map(
                  (project, index) => `
                <div class="swiper-slide" data-slide-index="${index}">
                  <div class="carousel-slide" data-project-id="${project.id}">
                    <div class="slide-image" style="background-image: url('${project.thumbnail || project.gallery[0]}')"></div>
                    <div class="slide-content">
                      <h3 class="slide-title">${project.title}</h3>
                      <p class="description">${project.description}</p>
                    </div>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="carousel-controls">
            <button class="carousel-control" id="carousel-prev" aria-label="Anterior">
              <i class="ph ph-caret-left"></i>
            </button>
            <button class="carousel-control" id="carousel-next" aria-label="Siguiente">
              <i class="ph ph-caret-right"></i>
            </button>
          </div>
        </div>

        <div class="carousel-indicators" id="carousel-indicators">
          ${projects
            .map(
              (_, index) => `
            <div class="indicator ${index === 0 ? 'active' : ''}" data-indicator-index="${index}"></div>
          `
            )
            .join('')}
        </div>
      </section>

      <div class="modal-backdrop" id="modal-backdrop-carousel">
        <div class="modal-content">
          <button class="btn modal-close" aria-label="Cerrar modal">
            <i class="ph ph-x"></i>
          </button>

          <div class="modal-body">
            <div class="project-details">
              <div class="project-layout">
                <div class="project-info">
                  <h2 class="project-title" id="modal-project-title"></h2>
                  
                  <div class="info-row">
                    <strong>Fecha</strong>
                    <span id="modal-project-date"></span>
                  </div>
                  
                  <div class="info-row">
                    <strong>Responsable</strong>
                    <span id="modal-project-responsible"></span>
                  </div>
                  
                  <div class="info-row">
                    <strong>Descripción</strong>
                    <p id="modal-project-description"></p>
                  </div>
                </div>

                <div class="project-gallery">
                  <div class="video-container" id="modal-project-videos"></div>
                  <div class="gallery-items" id="modal-project-gallery-items"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  // ========================================
  // YOUTUBE API
  // ========================================

  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      isYouTubeAPIReady = true
      return Promise.resolve()
    }

    return new Promise(resolve => {
      const existingCallback = window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = function () {
        isYouTubeAPIReady = true
        console.log('YouTube API lista')

        if (existingCallback && typeof existingCallback === 'function') {
          existingCallback()
        }

        resolve()
      }

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
    })
  }

  function pauseAllVideos() {
    youtubePlayersRegistry.forEach(player => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          const playerState = player.getPlayerState()
          if (playerState === 1) {
            player.pauseVideo()
          }
        } catch (error) {
          console.warn('Error pausando video:', error)
        }
      }
    })
  }

  function clearVideoRegistry() {
    youtubePlayersRegistry.forEach(player => {
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy()
        } catch (error) {
          console.warn('Error destruyendo player:', error)
        }
      }
    })
    youtubePlayersRegistry.clear()
  }

  // ========================================
  // INSERTAR VIDEOS Y GALERÍA
  // ========================================

  function insertVideos(container, videoUrls, title) {
    if (!container || !videoUrls || videoUrls.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No hay videos disponibles</div>'
      return
    }

    container.innerHTML = ''

    loadYouTubeAPI()
      .then(() => {
        videoUrls.forEach((videoUrl, index) => {
          const videoId = extractYouTubeId(videoUrl)
          if (!videoId) return

          const uniquePlayerId = `youtube-player-${Date.now()}-${index}`
          const startSeconds = getTimeParam(videoUrl)

          const videoWrapper = document.createElement('div')
          videoWrapper.style.marginBottom = '1.5rem'
          videoWrapper.style.position = 'relative'

          const playerContainer = document.createElement('div')
          playerContainer.id = uniquePlayerId
          playerContainer.style.cssText = `
          width: 100%;
          height: ${isMobile() ? '350px' : '400px'};
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        `

          videoWrapper.appendChild(playerContainer)
          container.appendChild(videoWrapper)

          if (isYouTubeAPIReady && window.YT && window.YT.Player) {
            setTimeout(() => {
              try {
                const player = new window.YT.Player(uniquePlayerId, {
                  height: isMobile() ? '350' : '400',
                  width: '100%',
                  videoId: videoId,
                  playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    start: startSeconds,
                    enablejsapi: 1,
                    origin: window.location.origin
                  },
                  events: {
                    onReady: event => {
                      youtubePlayersRegistry.set(uniquePlayerId, event.target)
                    },
                    onStateChange: event => {
                      if (event.data === 1) {
                        youtubePlayersRegistry.forEach((p, id) => {
                          if (id !== uniquePlayerId && p.getPlayerState() === 1) {
                            p.pauseVideo()
                          }
                        })
                      }
                    }
                  }
                })
              } catch (error) {
                console.error('Error creando player:', error)
                insertFallbackVideo(playerContainer, videoId, title, index, startSeconds)
              }
            }, 100)
          } else {
            insertFallbackVideo(playerContainer, videoId, title, index, startSeconds)
          }
        })
      })
      .catch(() => {
        videoUrls.forEach((videoUrl, index) => {
          const videoId = extractYouTubeId(videoUrl)
          if (!videoId) return

          const wrapper = document.createElement('div')
          wrapper.style.marginBottom = '1.5rem'
          insertFallbackVideo(wrapper, videoId, title, index, getTimeParam(videoUrl))
          container.appendChild(wrapper)
        })
      })
  }

  function insertFallbackVideo(container, videoId, title, index, startSeconds) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${startSeconds ? `&start=${startSeconds}` : ''}`

    container.innerHTML = `
      <iframe
        src="${embedUrl}"
        title="${title} - Video ${index + 1}"
        width="100%"
        height="${isMobile() ? '350' : '400'}"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style="border: none; border-radius: 8px; display: block; background: #000;">
      </iframe>
    `
  }

  function insertGallery(container, gallery, title) {
    if (!container) return

    container.innerHTML = ''

    if (!gallery || gallery.length === 0) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No hay imágenes disponibles</div>'
      return
    }

    gallery.forEach((imageUrl, index) => {
      if (!imageUrl || !imageUrl.trim()) return

      const img = document.createElement('img')
      img.src = imageUrl.trim()
      img.alt = `${title} - Imagen ${index + 1}`
      img.loading = 'lazy'
      img.style.cssText = `
        width: 100%;
        height: ${isMobile() ? '250px' : '400px'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        display: block;
        object-fit: cover;
        margin-bottom: 1.5rem;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      `

      img.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)'
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
      })

      img.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)'
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
      })

      container.appendChild(img)
    })
  }

  // ========================================
  // MODAL
  // ========================================

  function openCarouselModal(projectId) {
    const project = currentProjects.find(p => p.id === projectId)
    if (!project) return

    const modal = document.getElementById('modal-backdrop-carousel')
    const modalTitle = document.getElementById('modal-project-title')
    const modalDate = document.getElementById('modal-project-date')
    const modalResponsible = document.getElementById('modal-project-responsible')
    const modalDescription = document.getElementById('modal-project-description')
    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')

    if (modalTitle) modalTitle.textContent = project.title
    if (modalDate) modalDate.textContent = project.date
    if (modalResponsible) modalResponsible.textContent = project.responsible
    if (modalDescription) modalDescription.innerHTML = project.description

    modal.classList.add('show')
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      insertVideos(videosContainer, project.videoUrls, project.title)
      insertGallery(galleryContainer, project.gallery, project.title)
    }, 100)
  }

  function closeCarouselModal() {
    const modal = document.getElementById('modal-backdrop-carousel')
    if (!modal) return

    pauseAllVideos()
    clearVideoRegistry()

    modal.classList.remove('show')
    document.body.style.overflow = ''

    const videosContainer = document.getElementById('modal-project-videos')
    const galleryContainer = document.getElementById('modal-project-gallery-items')
    if (videosContainer) videosContainer.innerHTML = ''
    if (galleryContainer) galleryContainer.innerHTML = ''
  }

  // ========================================
  // NAVEGACIÓN DEL CAROUSEL
  // ========================================

  function updatePosition() {
    const wrapper = document.getElementById('slides-wrapper')
    if (!wrapper) return

    const slideWidth = isMobileTablet() ? 260 : 280
    const gap = isMobileTablet() ? 8 : 10
    const translateX = currentSlide * (slideWidth + gap)

    wrapper.style.transform = `translateX(-${translateX}px)`
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator')
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active')
      } else {
        indicator.classList.remove('active')
      }
    })
  }

  function updateControls() {
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')

    if (prevBtn) {
      prevBtn.disabled = currentSlide <= 0
      prevBtn.style.opacity = currentSlide <= 0 ? '0.3' : '1'
    }

    if (nextBtn) {
      nextBtn.disabled = currentSlide >= totalSlides - 1
      nextBtn.style.opacity = currentSlide >= totalSlides - 1 ? '0.3' : '1'
    }
  }

  function nextSlide() {
    if (isTransitioning || currentSlide >= totalSlides - 1) return

    isTransitioning = true
    currentSlide++
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  function prevSlide() {
    if (isTransitioning || currentSlide <= 0) return

    isTransitioning = true
    currentSlide--
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  function goToSlide(index) {
    if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) return

    isTransitioning = true
    currentSlide = index
    updatePosition()
    updateIndicators()
    updateControls()

    setTimeout(() => {
      isTransitioning = false
    }, CONFIG.SLIDE_TRANSITION_DURATION)
  }

  // ========================================
  // EVENTOS
  // ========================================

  function setupEvents() {
    const container = document.getElementById('carousel-container')
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')
    const indicators = document.querySelectorAll('.indicator')
    const slides = document.querySelectorAll('.carousel-slide')
    const closeBtn = document.querySelector('.modal-close')
    const modalBackdrop = document.getElementById('modal-backdrop-carousel')

    // Botones de navegación
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide)
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide)
    }

    // Indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index))
    })

    // Clicks en slides
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const projectId = parseInt(slide.getAttribute('data-project-id'))
        openCarouselModal(projectId)
      })
    })

    // Touch events
    if (container) {
      container.addEventListener(
        'touchstart',
        e => {
          if (e.touches.length !== 1 || isTransitioning) return
          touchStartX = e.touches[0].clientX
          isTouching = true
        },
        { passive: true }
      )

      container.addEventListener(
        'touchmove',
        e => {
          if (!isTouching) return
          const currentTouch = e.touches[0].clientX
          const diff = Math.abs(currentTouch - touchStartX)

          if (diff > 15) {
            e.preventDefault()
          }
        },
        { passive: false }
      )

      container.addEventListener(
        'touchend',
        e => {
          if (!isTouching) return

          touchEndX = e.changedTouches[0].clientX
          const distance = touchStartX - touchEndX

          if (Math.abs(distance) > CONFIG.MIN_SWIPE_DISTANCE) {
            if (distance > 0) {
              nextSlide()
            } else {
              prevSlide()
            }
          }

          isTouching = false
        },
        { passive: true }
      )
    }

    // Modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCarouselModal)
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) {
          closeCarouselModal()
        }
      })
    }

    // Teclado
    document.addEventListener('keydown', e => {
      const modalOpen = modalBackdrop?.classList.contains('show')

      if (modalOpen && e.key === 'Escape') {
        closeCarouselModal()
      } else if (!modalOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextSlide()
        }
      }
    })

    // Responsive
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updatePosition()
        updateControls()
      }, 250)
    })
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  function initializeCarousel(targetElement, projects = projectsConfig) {
    if (!targetElement) {
      console.error('Elemento objetivo no encontrado')
      return
    }

    currentProjects = projects
    totalSlides = projects.length
    currentSlide = 0

    targetElement.innerHTML = generateCarouselHTML(projects)

    const wrapper = document.getElementById('slides-wrapper')
    if (wrapper) {
      wrapper.style.display = 'flex'
      wrapper.style.transition = `transform ${CONFIG.SLIDE_TRANSITION_DURATION}ms ease`
      wrapper.style.willChange = 'transform'
    }

    setupEvents()
    updateIndicators()
    updateControls()

    console.log(`Carousel inicializado con ${totalSlides} proyectos`)
  }

  // ========================================
  // API PÚBLICA
  // ========================================

  window.CarouselModule = {
    initialize: initializeCarousel,
    openModal: openCarouselModal,
    closeModal: closeCarouselModal,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides
  }

  // Inicialización automática
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const targetElement = document.getElementById('carousel-root')
      if (targetElement) {
        initializeCarousel(targetElement)
      }
    })
  } else {
    const targetElement = document.getElementById('carousel-root')
    if (targetElement) {
      initializeCarousel(targetElement)
    }
  }
})()
