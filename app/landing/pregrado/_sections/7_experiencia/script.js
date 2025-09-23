// ===== EXPERIENCIA JAVERIANA - CARRUSEL =====
// Script vanilla JavaScript compatible con Liferay DXP y Next.js
// NO usar 'use strict' para máxima compatibilidad

function initExperienceCarousel() {
  // Variables globales del componente
  var experienceSwiper = null
  var videoStates = new Map() // Rastrear estado de cada video

  // Función helper para oscurecer colores
  function darkenColor(color, factor) {
    // Convertir hex a RGB
    var hex = color.replace('#', '')
    var r = parseInt(hex.substr(0, 2), 16)
    var g = parseInt(hex.substr(2, 2), 16)
    var b = parseInt(hex.substr(4, 2), 16)

    // Aplicar factor de oscurecimiento
    r = Math.round(r * (1 - factor))
    g = Math.round(g * (1 - factor))
    b = Math.round(b * (1 - factor))

    // Convertir de vuelta a hex
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')
  }

  // Función helper para convertir cualquier color a rgba (no utilizada actualmente)
  function colorToRgba(color, alpha) {
    // Si ya es rgba, extraer los valores
    if (color.startsWith('rgba(')) {
      var values = color.match(/rgba\(([^)]+)\)/)[1].split(',')
      return 'rgba(' + values[0].trim() + ', ' + values[1].trim() + ', ' + values[2].trim() + ', ' + alpha + ')'
    }

    // Si es rgb, convertir a rgba
    if (color.startsWith('rgb(')) {
      var values = color.match(/rgb\(([^)]+)\)/)[1].split(',')
      return 'rgba(' + values[0].trim() + ', ' + values[1].trim() + ', ' + values[2].trim() + ', ' + alpha + ')'
    }

    // Si es hex
    if (color.startsWith('#')) {
      var hex = color.replace('#', '')
      var r = parseInt(hex.substr(0, 2), 16)
      var g = parseInt(hex.substr(2, 2), 16)
      var b = parseInt(hex.substr(4, 2), 16)
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    }

    // Fallback: crear elemento temporal para obtener color computado
    var tempEl = document.createElement('div')
    tempEl.style.color = color
    document.body.appendChild(tempEl)
    var computedColor = getComputedStyle(tempEl).color
    document.body.removeChild(tempEl)

    if (computedColor.startsWith('rgb(')) {
      var values = computedColor.match(/rgb\(([^)]+)\)/)[1].split(',')
      return 'rgba(' + values[0].trim() + ', ' + values[1].trim() + ', ' + values[2].trim() + ', ' + alpha + ')'
    }

    // Si todo falla, usar color sólido
    return color
  }

  // Función para calcular cuántos slides caben visualmente en el viewport
  function getSlidesVisibleInViewport(windowWidth, slideWidth, gap) {
    var containerPadding = windowWidth < 768 ? 30 : 60
    var availableWidth = windowWidth - containerPadding
    var slideWithGap = slideWidth + gap
    var slidesVisible = Math.floor((availableWidth + gap) / slideWithGap)
    return Math.max(1, slidesVisible)
  }

  // Función para determinar configuración según viewport real y slides totales
  function getDisplayConfig(windowWidth, totalSlides) {
    var slidesPerView, slideWidth, useGrid
    var gap = 25

    if (windowWidth < 576) {
      slidesPerView = 1
      slideWidth = 320
      useGrid = totalSlides <= 1 // Solo 1 slide = grid, 2+ = swiper
    } else if (windowWidth < 768) {
      slidesPerView = 2
      slideWidth = 280
      useGrid = totalSlides <= 2 // 1-2 slides = grid, 3+ = swiper
    } else if (windowWidth < 1024) {
      slidesPerView = 3
      slideWidth = 300
      useGrid = totalSlides <= 3 // 1-3 slides = grid, 4+ = swiper
    } else {
      slidesPerView = 4
      slideWidth = 320
      useGrid = totalSlides <= 3 // 1-3 slides = grid, 4+ = swiper
    }

    return {
      slidesPerView: slidesPerView,
      useGrid: useGrid,
      slideWidth: slideWidth,
      gap: gap
    }
  }

  // Función para activar modo Grid
  function activateGridMode() {
    var slidesContainer = document.querySelector('.experience-carousel__slides')
    var paginationEl = document.querySelector('.experience-carousel__pagination')
    var prevButton = document.querySelector('.experience-carousel__prev')
    var nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.add('use-grid')
      slidesContainer.classList.remove('swiper-wrapper')
    }

    if (paginationEl) paginationEl.style.display = 'none'
    if (prevButton) prevButton.style.display = 'none'
    if (nextButton) nextButton.style.display = 'none'

    // ✅ Usar callback para garantizar que todos los videos estén listos
    loadVideos(function () {
      setupVideoClickDetection()
    })
  }

  // Función para activar modo Swiper
  function activateSwiperMode() {
    var slidesContainer = document.querySelector('.experience-carousel__slides')
    var paginationEl = document.querySelector('.experience-carousel__pagination')
    var prevButton = document.querySelector('.experience-carousel__prev')
    var nextButton = document.querySelector('.experience-carousel__next')

    if (slidesContainer) {
      slidesContainer.classList.remove('use-grid')
      slidesContainer.classList.add('swiper-wrapper')
    }

    if (paginationEl) paginationEl.style.display = 'flex'
    if (prevButton) prevButton.style.display = 'flex'
    if (nextButton) nextButton.style.display = 'flex'

    initializeSwiper()
  }

  // Función para inicializar Swiper
  function initializeSwiper() {
    // Destruir instancia existente si existe
    if (experienceSwiper) {
      experienceSwiper.destroy(true, true)
      experienceSwiper = null
    }

    var element = document.querySelector('.experience-carousel__wrapper.experience-swiper')
    if (!element) {
      var fallbackElement = document.querySelector('.experience-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    var swiperSelector = element ? '.experience-carousel__wrapper.experience-swiper' : '.experience-swiper'

    try {
      experienceSwiper = new window.Swiper(swiperSelector, {
        loop: false,
        spaceBetween: 25,
        watchOverflow: true,
        centeredSlides: false,
        grabCursor: true,
        allowTouchMove: true,
        slidesPerView: 1,

        pagination: {
          el: '.experience-carousel__pagination',
          clickable: true,
          dynamicBullets: false,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" aria-label="Ir a slide ' + (index + 1) + '"></span>'
          }
        },

        navigation: {
          nextEl: '.experience-carousel__next',
          prevEl: '.experience-carousel__prev'
        },

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 25
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 25
          }
        },

        on: {
          init: function (swiper) {
            // ✅ Usar callback para garantizar que todos los videos estén listos
            loadVideos(function () {
              setupVideoClickDetection()
            })
          },
          slideChange: function (swiper) {
            pauseAllVideos()
          }
        }
      })
    } catch (error) {
      console.error('[EXPERIENCE] Error inicializando Swiper:', error)
    }
  }

  // Sistema de carga de videos con callback
  function loadVideos(callback) {
    var videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')
    var totalVideos = videoContainers.length
    var loadedVideos = 0

    // Si no hay videos, ejecutar callback inmediatamente
    if (totalVideos === 0) {
      if (typeof callback === 'function') {
        setTimeout(callback, 0)
      }
      return
    }

    // Función para verificar si todos los videos están listos
    function checkAllLoaded() {
      loadedVideos++
      console.log('[VIDEO] Cargado', loadedVideos, 'de', totalVideos)

      if (loadedVideos >= totalVideos) {
        console.log('[VIDEO] Todos los videos cargados, ejecutando callback')
        if (typeof callback === 'function') {
          setTimeout(callback, 50) // Pequeño delay para asegurar DOM updates
        }
      }
    }

    for (var i = 0; i < videoContainers.length; i++) {
      var container = videoContainers[i]
      var videoId = container.getAttribute('data-video-id')
      var orientation = container.getAttribute('data-video-orientation') || 'vertical'

      if (!videoId) {
        // Video sin ID, contar como "cargado" para no bloquear
        checkAllLoaded()
        continue
      }

      var iframe = document.createElement('iframe')
      var params = new URLSearchParams({
        autoplay: '0',
        mute: '0',
        loop: '0',
        controls: '1',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '1',
        rel: '0'
      })

      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?' + params.toString()
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = 'none'
      iframe.style.opacity = '0'
      iframe.style.transition = 'opacity 0.5s ease'
      iframe.allow = 'autoplay; encrypted-media; fullscreen'
      iframe.allowFullscreen = true
      iframe.loading = 'lazy'

      iframe.addEventListener('load', function () {
        this.style.opacity = '1'
        this.classList.add('loaded')
        this.parentNode.classList.add('video-loaded')
        checkAllLoaded() // ✅ Verificar si todos están listos
      })

      iframe.addEventListener('error', function () {
        console.warn('[VIDEO] Error cargando iframe:', this.src)
        checkAllLoaded() // ✅ Contar errores como "cargados" para no bloquear
      })

      container.innerHTML = ''
      container.appendChild(iframe)

      createMuteButton(container, iframe, videoId)
    }
  }

  // Función para crear botón de mute personalizado
  function createMuteButton(container, iframe, videoId) {
    if (window.innerWidth < 1024) return

    var muteButton = document.createElement('button')
    muteButton.className = 'video-mute-button'
    muteButton.setAttribute('aria-label', 'Silenciar/Activar audio del video')
    muteButton.setAttribute('data-video-id', videoId)

    var isMuted = false
    updateMuteButtonIcon(muteButton, isMuted)

    muteButton.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()

      try {
        if (isMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
          isMuted = false
          muteButton.classList.remove('muted')
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
          isMuted = true
          muteButton.classList.add('muted')
        }

        updateMuteButtonIcon(muteButton, isMuted)
      } catch (error) {
        console.error('[VIDEO] Error controlando audio: ' + videoId, error)
      }
    })

    container.appendChild(muteButton)
  }

  // Función para actualizar el ícono del botón de mute
  function updateMuteButtonIcon(button, isMuted) {
    var iconClass = isMuted ? 'ph-speaker-slash' : 'ph-speaker-high'
    button.innerHTML = '<i class="ph ' + iconClass + '"></i>'
  }

  // Función para obtener ID único del video
  function getVideoId(iframe) {
    var videoId = iframe.getAttribute('data-iframe-id')
    if (!videoId) {
      // Extraer del src si no hay data-iframe-id
      var match = iframe.src.match(/embed\/([^?]+)/)
      videoId = match ? match[1] : 'video-' + Math.random().toString(36).substr(2, 9)
      iframe.setAttribute('data-iframe-id', videoId)
    }
    return videoId
  }

  // Función para alternar estado de un video específico
  function toggleVideo(iframe) {
    var videoId = getVideoId(iframe)
    var isPlaying = videoStates.get(videoId) || false

    try {
      if (isPlaying) {
        // Video se está reproduciendo -> Pausar
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        videoStates.set(videoId, false)
        console.log('[VIDEO] Pausado:', videoId)
      } else {
        // Video está pausado -> Reproducir
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
        videoStates.set(videoId, true)
        console.log('[VIDEO] Reproduciendo:', videoId)
      }
    } catch (error) {
      console.warn('[VIDEO] Error controlando video:', videoId, error)
    }
  }

  // Función para pausar videos (con excepción opcional)
  function pauseAllVideos(exceptIframe) {
    var videos = document.querySelectorAll('.experience-carousel__video-container iframe')
    for (var i = 0; i < videos.length; i++) {
      var iframe = videos[i]

      // Saltar el iframe que se está reproduciendo
      if (exceptIframe && iframe === exceptIframe) {
        continue
      }

      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')

        // ✅ Ya no hay botón que mostrar - solo actualizar estados
        var videoId = getVideoId(iframe)
        videoStates.set(videoId, false) // Marcar como pausado
      } catch (e) {
        // Silenciar errores cross-origin
      }
    }
  }

  // Función para manejar resize y mostrar/ocultar botones de mute
  function handleResize() {
    var muteButtons = document.querySelectorAll('.video-mute-button')
    var isDesktop = window.innerWidth >= 1024

    for (var i = 0; i < muteButtons.length; i++) {
      muteButtons[i].style.display = isDesktop ? 'flex' : 'none'
    }
  }

  // Función principal para decidir qué modo usar
  function initializeCarousel() {
    var slides = document.querySelectorAll('.experience-carousel__slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    var config = getDisplayConfig(windowWidth, totalSlides)

    console.log(
      '[INIT] Ventana: ' +
        windowWidth +
        'px, Slides: ' +
        totalSlides +
        ', Visibles: ' +
        config.slidesPerView +
        ', Usar Grid: ' +
        config.useGrid
    )

    if (config.useGrid) {
      console.log('[INIT] Activando modo Grid')
      activateGridMode()
    } else {
      console.log('[INIT] Activando modo Swiper')
      activateSwiperMode()
    }
  }

  // Función para detectar clics en videos y pausar otros
  function setupVideoClickDetection() {
    var videoContainers = document.querySelectorAll('.experience-carousel__video-container')

    for (var i = 0; i < videoContainers.length; i++) {
      var container = videoContainers[i]
      var iframe = container.querySelector('iframe')

      if (!iframe || container.querySelector('.video-click-detector')) {
        continue // Saltar si no hay iframe o ya tiene detector
      }

      // Crear overlay para detectar clics
      var overlay = document.createElement('div')
      overlay.className = 'video-click-detector'
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.zIndex = '5'
      overlay.style.cursor = 'pointer'
      overlay.style.backgroundColor = 'rgba(0,0,0,0.05)' // Más sutil
      overlay.style.pointerEvents = 'auto'
      overlay.style.display = 'flex'
      overlay.style.alignItems = 'center'
      overlay.style.justifyContent = 'center'
      overlay.style.opacity = '1' // Visible por defecto
      overlay.style.transition = 'background-color 0.3s ease'

      // ✅ Ya no creamos botón de play visual - solo overlay interactivo

      // Agregar data attribute para identificar el iframe
      overlay.setAttribute('data-iframe-id', 'iframe-' + i)
      iframe.setAttribute('data-iframe-id', 'iframe-' + i)

      // ✅ Ya no hay event listeners para botón - solo overlay

      // Event listener para el overlay - toggle play/pause
      overlay.addEventListener(
        'click',
        (function (currentContainer, currentIframe) {
          return function (e) {
            console.log('[VIDEO] Overlay clickeado para iframe:', currentIframe.src)

            // Alternar entre play y pause
            toggleVideo(currentIframe)

            // Pausar todos los otros videos si este se está reproduciendo
            var videoId = getVideoId(currentIframe)
            var isPlaying = videoStates.get(videoId) || false

            if (isPlaying) {
              // Este video se está reproduciendo - pausar los otros
              pauseAllVideos(currentIframe)
            }
          }
        })(container, iframe)
      )

      // ✅ Ya no agregamos botón - solo overlay limpio

      container.style.position = 'relative'
      container.appendChild(overlay)
    }
  }

  // Función para manejar resize y recalcular modo
  function handleCarouselResize() {
    var slides = document.querySelectorAll('.experience-carousel__slide')
    var totalSlides = slides.length
    var windowWidth = window.innerWidth

    var config = getDisplayConfig(windowWidth, totalSlides)
    var currentlyUsingGrid = document.querySelector('.experience-carousel__slides.use-grid')

    console.log(
      '[RESIZE] Ventana: ' +
        windowWidth +
        'px, Slides: ' +
        totalSlides +
        ', Visibles: ' +
        config.slidesPerView +
        ', Usar Grid: ' +
        config.useGrid
    )

    if (config.useGrid && !currentlyUsingGrid) {
      console.log('[RESIZE] Cambiando a modo Grid')
      if (experienceSwiper) {
        experienceSwiper.destroy(true, true)
        experienceSwiper = null
      }
      activateGridMode()
    } else if (!config.useGrid && currentlyUsingGrid) {
      console.log('[RESIZE] Cambiando a modo Swiper')
      activateSwiperMode()
    }

    handleResize()
  }

  // Inicialización principal
  function checkAndInit() {
    if (typeof window !== 'undefined') {
      initializeCarousel()
      window.addEventListener('resize', handleCarouselResize)
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  // Inicialización automática cuando el DOM esté listo
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndInit)
    } else {
      checkAndInit()
    }
  }

  // Inicialización automática para Liferay
  checkAndInit()
}

// Export para Next.js - ES modules
export default initExperienceCarousel

// Export para entornos CommonJS también
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initExperienceCarousel
}

// Auto-inicialización para Liferay cuando se carga el script
if (typeof window !== 'undefined' && !window.initExperienceCarousel) {
  window.initExperienceCarousel = initExperienceCarousel

  // Si el DOM ya está listo, inicializar automáticamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperienceCarousel)
  } else {
    initExperienceCarousel()
  }
}
