// ===========================================
// SCRIPT EXPERIENCIA - OPTIMIZADO PARA LIFERAY
// ===========================================

// ███████████████████████████████████████████████████████████████████████████████
// █                        MANUAL DE USO DEL SISTEMA DE DEBUG                 █
// ███████████████████████████████████████████████████████████████████████████████
//
// ESTADO POR DEFECTO:
// - Debug está DESACTIVADO (DEBUG_CONFIG.enabled = false)
// - Solo se muestran logs esenciales de funcionamiento
// - Los logs de debug están ocultos para mantener la consola limpia
//
// ACTIVAR/DESACTIVAR DEBUG:
// - Para activar debug: toggleDebug(true)
// - Para desactivar debug: toggleDebug(false)
// - Para cambiar estado actual: toggleDebug()
//
// CONFIGURAR TIPOS ESPECÍFICOS DE LOGS:
// - Solo logs de video: configureDebug({enabled: true, showVideo: true, showControls: false, showSwiper: false, showDebug: false})
// - Solo logs de controles: configureDebug({enabled: true, showVideo: false, showControls: true, showSwiper: false, showDebug: false})
// - Todo excepto logs detallados: configureDebug({enabled: true, showDebug: false})
// - Activar todo: configureDebug({enabled: true, showInit: true, showVideo: true, showControls: true, showSwiper: true, showVisibility: true, showDebug: true})
//
// TIPOS DE LOGS DISPONIBLES:
// - init: Inicialización del sistema
// - video: Creación y manejo de videos
// - controls: Controles de play/pause/volumen
// - swiper: Carrusel y navegación
// - visibility: Gestión de visibilidad
// - debug: Logs detallados de desarrollo
//
// LOGS SIEMPRE VISIBLES (críticos):
// - 🚀 [GLOBAL] Archivo script.js ejecutándose...
// - 🔧 [SCRIPT] Script de experiencia cargado - INICIO INMEDIATO
// - 🔧 [DEBUG] Debug está DESACTIVADO/ACTIVADO
// - 🔧 [DEBUG] Para activar/desactivar debug ejecuta: toggleDebug()
// - Errores (console.error) - siempre visibles
// - Warnings (console.warn) - siempre visibles
//
// EJEMPLO DE USO EN LIFERAY:
// 1. Cargar página (debug desactivado, consola limpia)
// 2. Si necesitas debug: ExperienceCarousel.toggleDebug(true) en consola
// 3. Ver logs detallados del sistema
// 4. Para debug móvil: ExperienceCarousel.debugMobile()
// 5. Desactivar cuando termines: ExperienceCarousel.toggleDebug(false)
//
// ███████████████████████████████████████████████████████████████████████████████
// █                     SISTEMA DE DEBUG CONFIGURABLE                          █
// ███████████████████████████████████████████████████████████████████████████████

const DEBUG_CONFIG = {
  // Cambiar a false para desactivar logs de debug
  enabled: false,

  // Configurar qué tipos de logs mostrar
  showInit: false,
  showVideo: false,
  showControls: false,
  showSwiper: false,
  showVisibility: false,
  showDebug: false,

  // Función para logs condicionales
  log: function (type, message, ...args) {
    if (!this.enabled) return

    const typeConfig = {
      init: this.showInit,
      video: this.showVideo,
      controls: this.showControls,
      swiper: this.showSwiper,
      visibility: this.showVisibility,
      debug: this.showDebug
    }

    if (typeConfig[type]) {
      console.log(message, ...args)
    }
  },

  // Función para errores (siempre se muestran)
  error: function (message, ...args) {
    console.error(message, ...args)
  },

  // Función para warnings importantes
  warn: function (message, ...args) {
    console.warn(message, ...args)
  },

  // Función para toggle desde consola
  toggle: function (enabled = null) {
    if (enabled === null) {
      this.enabled = !this.enabled
    } else {
      this.enabled = enabled
    }
    console.log(`🔧 [DEBUG] Debug ${this.enabled ? 'ACTIVADO' : 'DESACTIVADO'}`)
    return this.enabled
  },

  // Función para configurar tipos específicos
  configure: function (options) {
    Object.assign(this, options)
    console.log('🔧 [DEBUG] Configuración actualizada:', this)
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                   SISTEMA DE VIDEO YOUTUBE CON CONTROLES PERSONALIZADOS    █
// ███████████████████████████████████████████████████████████████████████████████

const VideoYouTubeSystem = {
  players: new Map(), // Almacenar referencias a los players de YouTube

  // Detectar dispositivo móvil (ULTRA agresivo para dispositivos reales)
  isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    
    // Detección ULTRA agresiva para móviles reales
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|FxiOS|Windows Phone|Android|Mobile Safari/i
    const isUserAgentMobile = mobileRegex.test(userAgent)
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    
    // Detección específica para móviles reales (ULTRA específica)
    const isRealMobile = (
      // Android de cualquier tipo
      /Android/i.test(userAgent) ||
      // iOS de cualquier tipo
      /iPhone|iPad|iPod/i.test(userAgent) ||
      // Mobile Safari
      /Mobile Safari/i.test(userAgent) ||
      // Chrome móvil
      /CriOS|Chrome.*Mobile/i.test(userAgent) ||
      // Firefox móvil
      /FxiOS|Firefox.*Mobile/i.test(userAgent) ||
      // Windows Phone
      /Windows Phone/i.test(userAgent) ||
      // Opera móvil
      /Opera Mini|Opera.*Mobile/i.test(userAgent) ||
      // Cualquier cosa que diga Mobile
      /Mobile/i.test(userAgent) ||
      // Samsung Internet
      /SamsungBrowser/i.test(userAgent)
    )
    
    // Detección por características de hardware
    const hasOrientation = typeof window.orientation !== 'undefined'
    const hasAccelerometer = typeof window.DeviceMotionEvent !== 'undefined'
    const hasVibration = typeof navigator.vibrate !== 'undefined'
    
    // Combinación ULTRA agresiva
    const isMobile = isRealMobile || 
                     (isUserAgentMobile && hasTouchScreen) || 
                     (hasTouchScreen && isSmallScreen) ||
                     (hasOrientation && hasTouchScreen) ||
                     (hasAccelerometer && hasTouchScreen) ||
                     (hasVibration && hasTouchScreen)
    
    // Log detallado SIEMPRE en móviles para debugging
    if (isMobile || DEBUG_CONFIG.enabled || !this._loggedMobileDetection) {
      console.log('🔍 [MOBILE-ULTRA] Detección ULTRA agresiva:')
      console.log('- User Agent:', userAgent)
      console.log('- User Agent Mobile:', isUserAgentMobile)
      console.log('- Real Mobile Device:', isRealMobile)
      console.log('- Touch Screen:', hasTouchScreen)
      console.log('- Small Screen:', isSmallScreen)
      console.log('- Screen Width:', window.innerWidth)
      console.log('- Touch Points:', navigator.maxTouchPoints || 0)
      console.log('- Has Orientation:', hasOrientation)
      console.log('- Has Accelerometer:', hasAccelerometer)
      console.log('- Has Vibration:', hasVibration)
      console.log('🔍 [MOBILE-ULTRA] Resultado final:', isMobile)
      
      // Marcar que ya se logueó una vez
      this._loggedMobileDetection = true
    }
    
    return isMobile
  },

  init() {
    console.log('🎬 [VIDEO] Inicializando sistema de videos YouTube con controles personalizados...')

    const videoContainers = document.querySelectorAll('.experience-carousel__video-container[data-video-id]')

    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Contenedores de video encontrados: ${videoContainers.length}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Selector utilizado: .experience-carousel__video-container[data-video-id]`)

    // Verificar si hay elementos con la clase base
    const baseContainers = document.querySelectorAll('.experience-carousel__video-container')
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Contenedores base encontrados: ${baseContainers.length}`)

    // Verificar elementos con data-video-id
    const elementsWithVideoId = document.querySelectorAll('[data-video-id]')
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Elementos con data-video-id encontrados: ${elementsWithVideoId.length}`)

    if (videoContainers.length === 0) {
      DEBUG_CONFIG.warn('🎬 [VIDEO] No se encontraron contenedores de video')
      DEBUG_CONFIG.log('debug', '🎬 [DEBUG] Verificando si hay estructura HTML del carrusel...')

      // Verificar estructura del carrusel
      const carouselContainer = document.querySelector('.experience-carousel')
      const swiperContainer = document.querySelector('.experience-swiper')
      const slides = document.querySelectorAll('.experience-carousel__slide')

      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Carousel container: ${carouselContainer ? 'OK' : 'MISSING'}`)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Swiper container: ${swiperContainer ? 'OK' : 'MISSING'}`)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Slides encontrados: ${slides.length}`)

      return false
    }

    // Log de cada contenedor encontrado
    videoContainers.forEach((container, index) => {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Contenedor ${index}:`, container)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - VideoId: ${container.dataset.videoId}`)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Orientation: ${container.dataset.videoOrientation}`)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Classes: ${container.className}`)
    })

    // Cargar API de YouTube si no está disponible
    this.loadYouTubeAPI(() => {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] YouTube API cargada, procesando ${videoContainers.length} contenedores`)

      // Cargar todos los videos con configuración simple
      videoContainers.forEach((container, index) => {
        DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Procesando contenedor ${index} de ${videoContainers.length}`)
        this.createVideoWithCustomControls(container, index === 0)
      })

      console.log(`🎬 [VIDEO] ${videoContainers.length} videos cargados con controles personalizados`)
    })

    return true
  },

  loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
      callback()
      return
    }

    // Cargar API de YouTube
    window.onYouTubeIframeAPIReady = callback

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  },

  createVideoWithCustomControls(container, isFirstVideo = false) {
    const videoId = container.dataset.videoId
    const orientation = container.dataset.videoOrientation || 'horizontal'

    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Iniciando createVideoWithCustomControls para contenedor:`, container)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] VideoId encontrado: ${videoId}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Orientation: ${orientation}`)

    if (!videoId) {
      DEBUG_CONFIG.error('🎬 [VIDEO] Video ID no encontrado:', container)
      return
    }

    DEBUG_CONFIG.log('video', `🎬 [VIDEO] Creando video con controles personalizados: ${videoId}`)

    // Crear estructura HTML para video + controles
    const videoWrapper = document.createElement('div')
    videoWrapper.className = 'video-wrapper'
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] VideoWrapper creado:`, videoWrapper)

    // Crear div para el player de YouTube
    const playerDiv = document.createElement('div')
    playerDiv.id = `youtube-player-${videoId}-${Date.now()}`
    playerDiv.className = `experience-carousel__video-iframe experience-carousel__video-iframe--${orientation}`
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] PlayerDiv creado con ID: ${playerDiv.id}`)

    // Crear controles personalizados
    const controlsDiv = document.createElement('div')
    controlsDiv.className = 'custom-video-controls'
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] ControlsDiv creado, agregando innerHTML...`)

    controlsDiv.innerHTML = `
      <button class="play-pause-btn" data-video-id="${videoId}" title="Reproducir/Pausar video">
        <i class="ph ph-play play-icon"></i>
        <i class="ph ph-pause pause-icon" style="display: none;"></i>
      </button>
      <button class="volume-btn muted" data-video-id="${videoId}" title="Activar/Desactivar audio">
        <i class="ph ph-speaker-x volume-icon-muted"></i>
        <i class="ph ph-speaker-high volume-icon-unmuted" style="display: none;"></i>
      </button>
      <div class="volume-slider-container" style="display: none;">
        <input type="range" class="volume-slider" min="0" max="100" value="50" data-video-id="${videoId}">
      </div>
    `

    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] ControlsDiv innerHTML asignado. Contenido:`, controlsDiv.innerHTML)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Botones creados - PlayPause: ${controlsDiv.querySelector('.play-pause-btn') ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Botones creados - Volume: ${controlsDiv.querySelector('.volume-btn') ? 'OK' : 'ERROR'}`)

    // Crear overlay de play para móviles (ULTRA SIMPLE)
    const playOverlay = document.createElement('div')
    playOverlay.className = 'mobile-play-overlay'
    
    // Crear botón de play con estilos inline para asegurar visibilidad
    const playBtn = document.createElement('button')
    playBtn.className = 'mobile-play-btn'
    playBtn.setAttribute('data-video-id', videoId)
    playBtn.setAttribute('title', 'Reproducir video')
    playBtn.innerHTML = '<i class="ph ph-play"></i>'
    
    // Estilos inline ULTRA agresivos para móviles
    playOverlay.style.cssText = `
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: rgba(0, 0, 0, 0.5) !important;
      z-index: 999 !important;
      pointer-events: auto !important;
      touch-action: manipulation !important;
      cursor: pointer !important;
    `
    
    playBtn.style.cssText = `
      background: #ff0000 !important;
      border: 3px solid white !important;
      border-radius: 50% !important;
      width: 80px !important;
      height: 80px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      z-index: 1000 !important;
      pointer-events: auto !important;
      touch-action: manipulation !important;
      font-size: 24px !important;
      color: white !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
    `
    
    playOverlay.appendChild(playBtn)
    
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] PlayOverlay ULTRA-SIMPLE creado para dispositivo móvil: ${this.isMobile()}`)

    // Ensamblar estructura
    videoWrapper.appendChild(playerDiv)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] PlayerDiv agregado a videoWrapper`)

    videoWrapper.appendChild(controlsDiv)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] ControlsDiv agregado a videoWrapper`)

    // Agregar overlay de play solo en móviles
    const isMobileDevice = this.isMobile()
    console.log(`🔍 [MOBILE OVERLAY] Evaluando overlay para video: ${videoId}`)
    console.log(`🔍 [MOBILE OVERLAY] - Es dispositivo móvil: ${isMobileDevice}`)
    
    if (isMobileDevice) {
      videoWrapper.appendChild(playOverlay)
      
      // Verificar que se agregó correctamente al DOM
      const overlayInDOM = videoWrapper.querySelector('.mobile-play-overlay')
      const playBtnInDOM = overlayInDOM ? overlayInDOM.querySelector('.mobile-play-btn') : null
      
      console.log(`🔍 [MOBILE OVERLAY] - Overlay agregado al DOM: ${overlayInDOM ? 'SÍ' : 'NO'}`)
      console.log(`🔍 [MOBILE OVERLAY] - Play button en overlay: ${playBtnInDOM ? 'SÍ' : 'NO'}`)
      
      if (overlayInDOM) {
        console.log(`🔍 [MOBILE OVERLAY] - Overlay display:`, window.getComputedStyle(overlayInDOM).display)
        console.log(`🔍 [MOBILE OVERLAY] - Overlay visibility:`, window.getComputedStyle(overlayInDOM).visibility)
        console.log(`🔍 [MOBILE OVERLAY] - Overlay pointer-events:`, window.getComputedStyle(overlayInDOM).pointerEvents)
      }
      
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] PlayOverlay agregado a videoWrapper (dispositivo móvil)`)
    } else {
      console.log(`🔍 [MOBILE OVERLAY] - Overlay NO agregado (no es dispositivo móvil)`)
    }

    // Insertar en contenedor
    container.innerHTML = ''
    container.appendChild(videoWrapper)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] VideoWrapper insertado en contenedor`)

    // Verificar que los elementos se insertaron correctamente
    const insertedControls = container.querySelector('.custom-video-controls')
    const insertedPlayBtn = container.querySelector('.play-pause-btn')
    const insertedVolumeBtn = container.querySelector('.volume-btn')
    const insertedMobileOverlay = container.querySelector('.mobile-play-overlay')
    const insertedMobilePlayBtn = insertedMobileOverlay ? insertedMobileOverlay.querySelector('.mobile-play-btn') : null

    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Verificación post-inserción:`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Controls div encontrado: ${insertedControls ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Play button encontrado: ${insertedPlayBtn ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Volume button encontrado: ${insertedVolumeBtn ? 'OK' : 'ERROR'}`)

    // Verificación específica para móviles
    console.log(`🔍 [MOBILE OVERLAY] Verificación post-inserción final:`)
    console.log(`🔍 [MOBILE OVERLAY] - Mobile overlay encontrado: ${insertedMobileOverlay ? 'SÍ' : 'NO'}`)
    console.log(`🔍 [MOBILE OVERLAY] - Mobile play button encontrado: ${insertedMobilePlayBtn ? 'SÍ' : 'NO'}`)
    
    if (insertedMobileOverlay && isMobileDevice) {
      console.log(`🔍 [MOBILE OVERLAY] - Overlay final display:`, window.getComputedStyle(insertedMobileOverlay).display)
      console.log(`🔍 [MOBILE OVERLAY] - Overlay final visibility:`, window.getComputedStyle(insertedMobileOverlay).visibility)
      console.log(`🔍 [MOBILE OVERLAY] - Overlay final z-index:`, window.getComputedStyle(insertedMobileOverlay).zIndex)
      console.log(`🔍 [MOBILE OVERLAY] - Overlay final position:`, window.getComputedStyle(insertedMobileOverlay).position)
    }

    if (insertedControls) {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Controls div classes:`, insertedControls.className)
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - Controls div style:`, insertedControls.style.cssText)
    }

    // Crear player de YouTube usando API
    const player = new window.YT.Player(playerDiv.id, {
      videoId: videoId,
      playerVars: {
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: isFirstVideo ? 1 : 0,
        mute: 1, // Muteado por defecto para permitir autoplay en móviles
        playsinline: 1,
        // ✅ Configuración específica para móviles
        fs: 1,              // Permitir pantalla completa
        cc_load_policy: 0,  // No cargar subtítulos por defecto
        iv_load_policy: 3,  // Ocultar anotaciones
        origin: window.location.origin,  // Especificar origen para móviles
        widget_referrer: window.location.href,  // Referrer para móviles
        enablejsapi: 1,     // Habilitar API JavaScript
        // ✅ Configuración para asegurar touch en móviles
        disablekb: 0,       // Permitir controles de teclado
        start: 0,           // Empezar desde el inicio
        end: 0              // Sin tiempo límite
      },
      events: {
        onReady: event => {
          console.log(`🎬 [VIDEO] Player listo: ${videoId}`)
          this.setupCustomControls(event.target, videoId, controlsDiv, playOverlay)
          
          // ✅ Configuración específica para móviles después de que el player esté listo
          if (this.isMobile()) {
            DEBUG_CONFIG.log('debug', `🎬 [MOBILE] Configurando player para móviles: ${videoId}`)
            
            // Asegurar que el iframe sea completamente accesible
            const iframe = playerDiv.querySelector('iframe')
            if (iframe) {
              iframe.style.pointerEvents = 'auto'
              iframe.style.touchAction = 'auto'
              iframe.style.userSelect = 'auto'
              iframe.setAttribute('touch-action', 'auto')
              
              DEBUG_CONFIG.log('debug', `🎬 [MOBILE] Iframe configurado para touch: ${videoId}`)
            }
          }
        },
        onStateChange: event => {
          console.log(`🎬 [VIDEO] Estado cambiado: ${videoId}`, event.data)
          
          // ✅ Debug para mobile cuando cambia el estado
          if (this.isMobile()) {
            DEBUG_CONFIG.log('debug', `🎬 [MOBILE] Estado cambiado en móvil: ${videoId} - Estado: ${event.data}`)
          }
        }
      }
    })

    // Almacenar referencia al player
    this.players.set(videoId, player)

    // Marcar primer video si es necesario
    if (isFirstVideo) {
      playerDiv.setAttribute('data-first-video', 'true')
      container.setAttribute('data-is-first-video', 'true')
    }

    // ✅ Configuración específica para móviles en el contenedor
    if (this.isMobile()) {
      DEBUG_CONFIG.log('debug', `🎬 [MOBILE] Configurando contenedor para móviles: ${videoId}`)
      
      // Asegurar que el contenedor no bloquee touch
      container.style.touchAction = 'auto'
      videoWrapper.style.touchAction = 'auto'
      playerDiv.style.touchAction = 'auto'
      
      // Configurar slide para permitir interacción con videos
      const slide = container.closest('.swiper-slide')
      if (slide) {
        slide.style.touchAction = 'auto'  // Permitir todas las interacciones
        DEBUG_CONFIG.log('debug', `🎬 [MOBILE] Slide configurado para touch: ${videoId}`)
      }
    }

    console.log(`🎬 [VIDEO] Video con controles personalizados creado: ${videoId} (${orientation})`)

    return player
  },

  setupCustomControls(player, videoId, controlsDiv, playOverlay) {
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Iniciando setupCustomControls para video: ${videoId}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] ControlsDiv recibido:`, controlsDiv)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] PlayOverlay recibido:`, playOverlay)

    const playPauseBtn = controlsDiv.querySelector('.play-pause-btn')
    const playIcon = controlsDiv.querySelector('.play-icon')
    const pauseIcon = controlsDiv.querySelector('.pause-icon')
    const volumeBtn = controlsDiv.querySelector('.volume-btn')
    const volumeSlider = controlsDiv.querySelector('.volume-slider')
    const volumeSliderContainer = controlsDiv.querySelector('.volume-slider-container')
    const mutedIcon = controlsDiv.querySelector('.volume-icon-muted')
    const unmutedIcon = controlsDiv.querySelector('.volume-icon-unmuted')
    const mobilePlayBtn = playOverlay ? playOverlay.querySelector('.mobile-play-btn') : null

    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Elementos encontrados en setupCustomControls:`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - playPauseBtn: ${playPauseBtn ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - playIcon: ${playIcon ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - pauseIcon: ${pauseIcon ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - volumeBtn: ${volumeBtn ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - volumeSlider: ${volumeSlider ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - volumeSliderContainer: ${volumeSliderContainer ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - mutedIcon: ${mutedIcon ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - unmutedIcon: ${unmutedIcon ? 'OK' : 'ERROR'}`)
    DEBUG_CONFIG.log('debug', `🎬 [DEBUG] - mobilePlayBtn: ${mobilePlayBtn ? 'OK' : 'NULL'}`)

    let isMuted = true
    let currentVolume = 50
    let isPlaying = false

    // Función para actualizar iconos de volumen
    const updateVolumeIcon = muted => {
      if (muted) {
        mutedIcon.style.display = 'block'
        unmutedIcon.style.display = 'none'
        volumeBtn.classList.add('muted')
      } else {
        mutedIcon.style.display = 'none'
        unmutedIcon.style.display = 'block'
        volumeBtn.classList.remove('muted')
      }
    }

    // Función para actualizar iconos de play/pause
    const updatePlayPauseIcon = playing => {
      if (playing) {
        playIcon.style.display = 'none'
        pauseIcon.style.display = 'block'
        if (playOverlay) playOverlay.style.display = 'none'
      } else {
        playIcon.style.display = 'block'
        pauseIcon.style.display = 'none'
        if (playOverlay && this.isMobile()) playOverlay.style.display = 'flex'
      }
    }

    // Función para manejar play/pause con prevención de doble ejecución
    let isHandlingPlayPause = false
    const handlePlayPause = (event) => {
      if (isHandlingPlayPause) {
        DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Previniendo doble ejecución: ${videoId}`)
        return
      }
      
      isHandlingPlayPause = true
      
      // Prevenir propagación para evitar conflictos
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      const playerState = player.getPlayerState()
      if (playerState === window.YT.PlayerState.PLAYING) {
        player.pauseVideo()
        isPlaying = false
        DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Video pausado: ${videoId}`)
      } else {
        player.playVideo()
        isPlaying = true
        DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Video reproducido: ${videoId}`)
      }
      updatePlayPauseIcon(isPlaying)
      
      // Resetear flag después de un breve delay
      setTimeout(() => {
        isHandlingPlayPause = false
      }, 300)
    }

    // Event listeners optimizados para play/pause
    if (playPauseBtn) {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Agregando event listeners a playPauseBtn`)
      
      if (this.isMobile()) {
        // En móviles, usar solo touchstart para mejor respuesta
        playPauseBtn.addEventListener('touchstart', handlePlayPause, { passive: false })
        DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Mobile: touchstart listener agregado a playPauseBtn`)
      } else {
        // En desktop, usar click
        playPauseBtn.addEventListener('click', handlePlayPause)
        DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Desktop: click listener agregado a playPauseBtn`)
      }
    } else {
      DEBUG_CONFIG.error(`🎬 [DEBUG] playPauseBtn no encontrado - no se pueden agregar event listeners`)
    }

    if (mobilePlayBtn) {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Agregando event listeners a mobilePlayBtn`)
      
      // Para el botón móvil, usar ambos eventos pero con mejor manejo
      mobilePlayBtn.addEventListener('touchstart', handlePlayPause, { passive: false })
      mobilePlayBtn.addEventListener('click', handlePlayPause)
      
      // Agregar feedback visual en móviles
      mobilePlayBtn.addEventListener('touchstart', () => {
        mobilePlayBtn.style.transform = 'scale(0.95)'
      }, { passive: true })
      
      mobilePlayBtn.addEventListener('touchend', () => {
        setTimeout(() => {
          mobilePlayBtn.style.transform = 'scale(1)'
        }, 150)
      }, { passive: true })
      
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Event listeners agregados a mobilePlayBtn - OK`)
    } else {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] mobilePlayBtn no encontrado (normal si no es móvil)`)
    }

    // Event listeners optimizados para botón de volumen
    if (volumeBtn) {
      DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Agregando event listener a volumeBtn`)
      
      const handleVolumeToggle = (event) => {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
        
        DEBUG_CONFIG.log('controls', `🎬 [DEBUG] Volume button activated - estado actual muted: ${isMuted}`)
        if (isMuted) {
          player.unMute()
          player.setVolume(currentVolume)
          isMuted = false
          DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Audio activado para ${videoId}`)
        } else {
          player.mute()
          isMuted = true
          DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Audio desactivado para ${videoId}`)
        }
        updateVolumeIcon(isMuted)
      }
      
      if (this.isMobile()) {
        volumeBtn.addEventListener('touchstart', handleVolumeToggle, { passive: false })
        DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Mobile: touchstart listener agregado a volumeBtn`)
      } else {
        volumeBtn.addEventListener('click', handleVolumeToggle)
        DEBUG_CONFIG.log('debug', `🎬 [DEBUG] Desktop: click listener agregado a volumeBtn`)
      }
    } else {
      DEBUG_CONFIG.error(`🎬 [DEBUG] volumeBtn no encontrado - no se puede agregar event listener`)
    }

    // Hover para mostrar slider
    volumeBtn.addEventListener('mouseenter', () => {
      volumeSliderContainer.style.display = 'block'
    })

    volumeBtn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!volumeSliderContainer.matches(':hover')) {
          volumeSliderContainer.style.display = 'none'
        }
      }, 200)
    })

    volumeSliderContainer.addEventListener('mouseleave', () => {
      volumeSliderContainer.style.display = 'none'
    })

    // Cambio en slider de volumen
    volumeSlider.addEventListener('input', e => {
      currentVolume = parseInt(e.target.value)
      player.setVolume(currentVolume)

      if (currentVolume === 0) {
        player.mute()
        isMuted = true
      } else if (isMuted) {
        player.unMute()
        isMuted = false
      }

      updateVolumeIcon(isMuted)
      DEBUG_CONFIG.log('controls', `🎬 [CONTROLS] Volumen cambiado a ${currentVolume}% para ${videoId}`)
    })

    // Monitorear cambios de estado del video
    const intervalId = setInterval(() => {
      if (player && player.getPlayerState) {
        const playerState = player.getPlayerState()
        const newIsPlaying = playerState === window.YT.PlayerState.PLAYING

        if (newIsPlaying !== isPlaying) {
          isPlaying = newIsPlaying
          updatePlayPauseIcon(isPlaying)
        }
      }
    }, 500)

    // Inicializar estado
    updateVolumeIcon(isMuted)
    updatePlayPauseIcon(isPlaying)
    volumeSlider.value = currentVolume

    DEBUG_CONFIG.log('debug', `🎬 [CONTROLS] Controles personalizados configurados para ${videoId}`)
  },

  // Función simple para pausar todos los videos
  pauseAllVideos() {
    this.players.forEach((player, videoId) => {
      try {
        if (player && player.pauseVideo) {
          player.pauseVideo()
          console.log(`🎬 [VIDEO] Video pausado: ${videoId}`)
        }
      } catch (e) {
        console.debug('No se pudo pausar video:', videoId, e)
      }
    })
    console.log('🎬 [VIDEO] Todos los videos pausados')
  },

  // Función para reproducir un video específico
  playVideo(videoIdOrPlayer) {
    try {
      if (typeof videoIdOrPlayer === 'string') {
        const player = this.players.get(videoIdOrPlayer)
        if (player && player.playVideo) {
          player.playVideo()
          console.log(`🎬 [VIDEO] Video reproducido: ${videoIdOrPlayer}`)
        }
      } else if (videoIdOrPlayer && videoIdOrPlayer.playVideo) {
        videoIdOrPlayer.playVideo()
        console.log('🎬 [VIDEO] Video reproducido')
      }
    } catch (e) {
      console.debug('No se pudo reproducir video:', e)
    }
  },

  // Función para pausar un video específico
  pauseVideo(videoIdOrPlayer) {
    try {
      if (typeof videoIdOrPlayer === 'string') {
        const player = this.players.get(videoIdOrPlayer)
        if (player && player.pauseVideo) {
          player.pauseVideo()
          console.log(`🎬 [VIDEO] Video pausado: ${videoIdOrPlayer}`)
        }
      } else if (videoIdOrPlayer && videoIdOrPlayer.pauseVideo) {
        videoIdOrPlayer.pauseVideo()
        console.log('🎬 [VIDEO] Video pausado')
      }
    } catch (e) {
      console.debug('No se pudo pausar video:', e)
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      SISTEMA DE SWIPER EXPERIENCIA OPTIMIZADO              █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienceSwiperSystem = {
  init() {
    Logger.debug('🎠 Inicializando Swiper para experiencia...')

    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true)
    }

    // Buscar el elemento
    const element = document.querySelector('.experience-swiper')
    if (!element) {
      Logger.warning('Elemento .experience-swiper no encontrado')
      return false
    }

    // Contar slides y verificar orientaciones
    const slides = document.querySelectorAll('.experience-carousel__slide')
    const totalSlides = slides.length
    const hasVerticalVideos = document.querySelectorAll('.experience-carousel__video-card--vertical').length > 0
    const hasHorizontalVideos = document.querySelectorAll('.experience-carousel__video-card--horizontal').length > 0

    if (!window.Swiper) {
      Logger.error('Swiper no está disponible')
      return false
    }

    // Marcar slides con videos horizontales para doble ancho
    if (hasHorizontalVideos) {
      this.markDoubleWidthSlides()
    }

    // Configuración dinámica según contenido
    const swiperConfig = this.buildSwiperConfig(totalSlides, hasVerticalVideos, hasHorizontalVideos)

    // Inicializar Swiper
    window.experienceSwiper = new window.Swiper('.experience-swiper', swiperConfig)

    Logger.success(`Swiper experiencia inicializado con ${totalSlides} slides`)
    return true
  },

  markDoubleWidthSlides() {
    const slides = document.querySelectorAll('.experience-carousel__slide')
    slides.forEach(slide => {
      const horizontalVideo = slide.querySelector('.experience-carousel__video-card--horizontal')
      if (horizontalVideo) {
        slide.classList.add('swiper-slide-double-width')
      }
    })
  },

  buildSwiperConfig(totalSlides, hasVerticalVideos, hasHorizontalVideos) {
    return {
      loop: false, // Desactivar loop cuando hay slides de doble ancho
      spaceBetween: 20, // Espaciado consistente
      slidesPerView: 'auto',
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerGroup: 1, // Avanzar de uno en uno

      // Paginación - IGUAL A RELACIONADOS
      pagination: {
        el: '.experience-carousel__pagination',
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      // Navegación
      navigation: {
        nextEl: '.experience-carousel__next',
        prevEl: '.experience-carousel__prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints responsivos ajustados
      breakpoints: this.getResponsiveBreakpoints(totalSlides, hasVerticalVideos, hasHorizontalVideos),

      // Eventos
      on: {
        init: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
          handleDoubleWidthSlides(this)
        },
        update: function () {
          updateNavigationVisibility(this, totalSlides)
          updatePaginationVisibility(this, totalSlides)
          updateButtonStates(this)
          handleDoubleWidthSlides(this)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides)
            updatePaginationVisibility(this, totalSlides)
            updateButtonStates(this)
            handleDoubleWidthSlides(this)
          }, 100)
        },
        slideChange: function () {
          updateButtonStates(this)
          handleVideoSlideChange(this)
        },
        reachBeginning: function () {
          updateButtonStates(this)
        },
        reachEnd: function () {
          updateButtonStates(this)
        }
      }
    }
  },

  getResponsiveBreakpoints(totalSlides, hasVerticalVideos, hasHorizontalVideos) {
    return {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      576: {
        slidesPerView: Math.min(1.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: Math.min(2.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      1024: {
        slidesPerView: Math.min(3.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      },
      1280: {
        slidesPerView: Math.min(4.5, totalSlides),
        spaceBetween: 20,
        slidesPerGroup: 1
      }
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                      FUNCIONES DE UTILIDAD SWIPER                          █
// ███████████████████████████████████████████████████████████████████████████████

const updateNavigationVisibility = (swiper, totalSlides) => {
  // Validar que swiper esté disponible
  if (!swiper) return

  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

  if (!nextBtn || !prevBtn) return

  const needsNavigation = totalSlides > 1

  if (needsNavigation) {
    nextBtn.classList.remove('swiper-button-hidden')
    prevBtn.classList.remove('swiper-button-hidden')
    updateButtonStates(swiper)
  } else {
    nextBtn.classList.add('swiper-button-hidden')
    prevBtn.classList.add('swiper-button-hidden')
  }
}

const updateButtonStates = swiper => {
  // Validar que swiper esté disponible
  if (!swiper) return

  const nextBtn = document.querySelector('.experience-carousel__next')
  const prevBtn = document.querySelector('.experience-carousel__prev')

  if (!nextBtn || !prevBtn) return

  const isBeginning = swiper.isBeginning
  const isEnd = swiper.isEnd

  // Botón anterior
  if (isBeginning) {
    prevBtn.classList.add('swiper-button-disabled')
    prevBtn.setAttribute('aria-disabled', 'true')
  } else {
    prevBtn.classList.remove('swiper-button-disabled')
    prevBtn.setAttribute('aria-disabled', 'false')
  }

  // Botón siguiente
  if (isEnd) {
    nextBtn.classList.add('swiper-button-disabled')
    nextBtn.setAttribute('aria-disabled', 'true')
  } else {
    nextBtn.classList.remove('swiper-button-disabled')
    nextBtn.setAttribute('aria-disabled', 'false')
  }
}

const updatePaginationVisibility = (swiper, totalSlides) => {
  const pagination = document.querySelector('.experience-carousel__pagination')

  if (!pagination) {
    console.warn('Paginación no encontrada')
    return
  }

  // Mostrar paginación si hay más de 1 slide
  const needsPagination = totalSlides > 1

  if (needsPagination) {
    pagination.style.display = 'flex'
    pagination.classList.remove('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'false')

    const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
    bullets.forEach((bullet, index) => {
      bullet.setAttribute('aria-label', `Ir a slide ${index + 1}`)
      bullet.style.display = 'block'
    })
  } else {
    pagination.style.display = 'none'
    pagination.classList.add('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'true')
  }
}

const handleVideoSlideChange = swiper => {
  if (!swiper?.el) return

  // Pausar todos los videos cuando se cambia de slide
  VideoYouTubeSystem.pauseAllVideos()

  console.log('🎠 [SWIPER] Slide cambiado - videos pausados')
}

// Nueva función para manejar slides de doble ancho
const handleDoubleWidthSlides = swiper => {
  const doubleWidthSlides = swiper.el.querySelectorAll('.swiper-slide-double-width')

  doubleWidthSlides.forEach(slide => {
    const slideIndex = Array.from(swiper.slides).indexOf(slide)

    // Aplicar estilos especiales según el breakpoint actual
    if (window.innerWidth >= 768) {
      slide.style.gridColumn = 'span 2'
      slide.style.width = 'calc(200% + var(--swiper-spacing, 20px))'
    } else {
      slide.style.gridColumn = 'span 1'
      slide.style.width = '100%'
    }
  })
}

// ███████████████████████████████████████████████████████████████████████████████
// █                     SISTEMA DE GESTIÓN DE VISIBILIDAD                      █
// ███████████████████████████████████████████████████████████████████████████████

const VisibilityManagement = {
  init() {
    console.log('👁️ [VISIBILITY] Configurando gestión de visibilidad...')

    // Pausar videos cuando se cambia de pestaña
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        VideoYouTubeSystem.pauseAllVideos()
        console.log('👁️ [VISIBILITY] Pestaña oculta - videos pausados')
      }
    })

    // Configurar autoplay para el primer video cuando sea visible
    this.setupFirstVideoAutoplay()

    return true
  },

  setupFirstVideoAutoplay() {
    if (!window.IntersectionObserver) return

    const firstVideoContainer = document.querySelector('.experience-carousel__video-container[data-is-first-video="true"]')

    if (!firstVideoContainer) {
      console.log('👁️ [VISIBILITY] No se encontró primer video')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const iframe = entry.target.querySelector('iframe[data-first-video="true"]')

          if (iframe) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Primer video visible al 50%, iniciar reproducción
              VideoYouTubeSystem.playVideo(iframe)
              console.log('👁️ [VISIBILITY] Primer video visible - reproduciendo')
            } else {
              // Primer video no visible, pausar
              VideoYouTubeSystem.pauseVideo(iframe)
              console.log('👁️ [VISIBILITY] Primer video no visible - pausando')
            }
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '0px'
      }
    )

    observer.observe(firstVideoContainer)
    console.log('👁️ [VISIBILITY] Observador configurado para primer video')
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN PRINCIPAL                            █
// ███████████████████████████████████████████████████████████████████████████████

const ExperienciaSystem = {
  async init() {
    console.log('🚀 [EXPERIENCIA] Inicializando sistema de experiencia...')

    try {
      const checkAndInit = () => {
        if (typeof window !== 'undefined' && window.Swiper) {
          // Inicializar sistemas en orden
          const systems = {
            videoYouTube: VideoYouTubeSystem.init(),
            swiper: ExperienceSwiperSystem.init(),
            visibility: VisibilityManagement.init()
          }

          const activeSystems = Object.entries(systems)
            .filter(([_, isActive]) => isActive)
            .map(([name]) => name)

          console.log(`✅ [EXPERIENCIA] Sistema iniciado - ${activeSystems.length} sistemas activos:`, activeSystems)
          return systems
        } else {
          console.log('⏳ [EXPERIENCIA] Esperando Swiper...')
          setTimeout(checkAndInit, 300)
        }
      }

      return checkAndInit()
    } catch (error) {
      console.error('❌ [EXPERIENCIA] Error al inicializar:', error)
      return false
    }
  },

  setupCleanup() {
    window.addEventListener('beforeunload', () => {
      if (window.experienceSwiper) {
        window.experienceSwiper.destroy(true, true)
        window.experienceSwiper = null
      }
      console.log('🧹 [EXPERIENCIA] Cleanup completado')
    })
  }
}

// ===========================================
// INICIALIZACIÓN OPTIMIZADA PARA LIFERAY
// ===========================================

// Wrapper IIFE para evitar contaminación del scope global
;(function() {
  'use strict'
  
  console.log('🚀 [LIFERAY] Fragmento de experiencia cargándose...')
  
  // Función principal de inicialización
  const initializeExperienceSystem = function() {
    console.log('🔧 [LIFERAY] Iniciando sistema de experiencia para Liferay')
    DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Document readyState:', document.readyState)
    DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Navegador:', navigator.userAgent)
    
    // Verificar disponibilidad de sistemas
    if (typeof ExperienciaSystem === 'undefined') {
      console.error('🔧 [LIFERAY] ExperienciaSystem no está definido')
      return
    }
    
    // Inicializar sistema principal
    const initSystem = async function() {
      try {
        DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Iniciando ExperienciaSystem...')
        await ExperienciaSystem.init()
        ExperienciaSystem.setupCleanup()
        DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Sistema inicializado correctamente')
      } catch (error) {
        console.error('🔧 [LIFERAY] Error al inicializar sistema:', error)
      }
    }
    
    // Usar solo DOM events nativos (compatible con Liferay)
    if (document.readyState === 'loading') {
      DEBUG_CONFIG.log('init', '🔧 [LIFERAY] DOM cargando, esperando DOMContentLoaded')
      document.addEventListener('DOMContentLoaded', initSystem)
    } else {
      DEBUG_CONFIG.log('init', '🔧 [LIFERAY] DOM ya cargado, iniciando inmediatamente')
      // Usar setTimeout para asegurar que todo esté listo
      setTimeout(initSystem, 100)
    }
    
    // Exponer sistemas para debugging (solo en desarrollo)
    if (typeof window !== 'undefined') {
      // Crear namespace para evitar conflictos
      window.ExperienceCarousel = window.ExperienceCarousel || {}
      
      // Exponer sistemas bajo namespace
      window.ExperienceCarousel.VideoSystem = VideoYouTubeSystem
      window.ExperienceCarousel.SwiperSystem = ExperienceSwiperSystem
      window.ExperienceCarousel.VisibilitySystem = VisibilityManagement
      window.ExperienceCarousel.MainSystem = ExperienciaSystem
      window.ExperienceCarousel.DebugConfig = DEBUG_CONFIG
      
      // Funciones de debug específicas para Liferay
      window.ExperienceCarousel.toggleDebug = function(enabled) {
        DEBUG_CONFIG.toggle(enabled)
      }
      
      window.ExperienceCarousel.debugMobile = function() {
        console.log('🔍 [MOBILE-DEBUG] =========================')
        console.log('🔍 [MOBILE-DEBUG] INFORMACIÓN DEL DISPOSITIVO')
        console.log('🔍 [MOBILE-DEBUG] =========================')
        console.log('- User Agent:', navigator.userAgent)
        console.log('- Touch Points:', navigator.maxTouchPoints)
        console.log('- Screen Size:', window.innerWidth + 'x' + window.innerHeight)
        console.log('- Es móvil según script:', VideoYouTubeSystem.isMobile())
        console.log('- Swiper disponible:', typeof window.Swiper !== 'undefined')
        console.log('- YouTube API disponible:', typeof window.YT !== 'undefined')
        
        console.log('\n🔍 [MOBILE-DEBUG] =========================')
        console.log('🔍 [MOBILE-DEBUG] VERIFICACIÓN DE ELEMENTOS')
        console.log('🔍 [MOBILE-DEBUG] =========================')
        
        // Verificar elementos de video
        const videoContainers = document.querySelectorAll('.experience-carousel__video-container')
        console.log('- Video containers encontrados:', videoContainers.length)
        
        videoContainers.forEach(function(container, index) {
          console.log('\n--- Video ' + index + ' ---')
          console.log('- Container:', container)
          console.log('- Video ID:', container.dataset.videoId)
          console.log('- Orientación:', container.dataset.videoOrientation)
          
          const overlay = container.querySelector('.mobile-play-overlay')
          const playBtn = container.querySelector('.mobile-play-btn')
          const videoWrapper = container.querySelector('.video-wrapper')
          const youtubePlayer = container.querySelector('[id*="youtube-player"]')
          
          console.log('- Tiene overlay:', !!overlay)
          console.log('- Tiene play button:', !!playBtn)
          console.log('- Tiene video wrapper:', !!videoWrapper)
          console.log('- Tiene YouTube player:', !!youtubePlayer)
          
          if (overlay) {
            const overlayStyles = getComputedStyle(overlay)
            console.log('- Overlay display:', overlayStyles.display)
            console.log('- Overlay visibility:', overlayStyles.visibility)
            console.log('- Overlay pointer-events:', overlayStyles.pointerEvents)
            console.log('- Overlay z-index:', overlayStyles.zIndex)
            console.log('- Overlay position:', overlayStyles.position)
          }
          
          if (playBtn) {
            const btnStyles = getComputedStyle(playBtn)
            console.log('- Button display:', btnStyles.display)
            console.log('- Button pointer-events:', btnStyles.pointerEvents)
            console.log('- Button z-index:', btnStyles.zIndex)
            
            // Verificar event listeners
            console.log('- Button click listeners:', playBtn.onclick ? 'Tiene onclick' : 'Sin onclick')
            
            // Intentar hacer click programático
            console.log('- Intentando click programático...')
            try {
              playBtn.click()
              console.log('- Click programático exitoso')
            } catch (error) {
              console.log('- Error en click programático:', error.message)
            }
          }
        })
        
        console.log('\n🔍 [MOBILE-DEBUG] =========================')
        console.log('🔍 [MOBILE-DEBUG] SISTEMA DE PLAYERS')
        console.log('🔍 [MOBILE-DEBUG] =========================')
        
        if (VideoYouTubeSystem.players) {
          console.log('- Players Map size:', VideoYouTubeSystem.players.size)
          VideoYouTubeSystem.players.forEach(function(player, videoId) {
            console.log('- Player ' + videoId + ':', {
              exists: !!player,
              hasGetPlayerState: typeof player.getPlayerState === 'function',
              hasPlayVideo: typeof player.playVideo === 'function'
            })
            
            if (player && typeof player.getPlayerState === 'function') {
              try {
                const state = player.getPlayerState()
                console.log('- Player ' + videoId + ' state:', state)
              } catch (error) {
                console.log('- Error getting player state:', error.message)
              }
            }
          })
        }
      }
      
      window.ExperienceCarousel.reinitialize = function() {
        console.log('🔧 [LIFERAY] Reinicializando sistema...')
        initSystem()
      }
      
      // Función para forzar la creación de event listeners en móviles
      window.ExperienceCarousel.forceMobileListeners = function() {
        console.log('🔧 [MOBILE-FIX] Forzando creación de event listeners móviles...')
        
        const videoContainers = document.querySelectorAll('.experience-carousel__video-container')
        console.log('🔧 [MOBILE-FIX] Contenedores encontrados:', videoContainers.length)
        
        videoContainers.forEach(function(container, index) {
          console.log('🔧 [MOBILE-FIX] Procesando video ' + index)
          
          const overlay = container.querySelector('.mobile-play-overlay')
          const playBtn = container.querySelector('.mobile-play-btn')
          const videoId = container.dataset.videoId
          
          if (overlay && playBtn && videoId) {
            console.log('🔧 [MOBILE-FIX] Elementos encontrados para video ' + videoId)
            
            // Remover event listeners existentes
            const newPlayBtn = playBtn.cloneNode(true)
            playBtn.parentNode.replaceChild(newPlayBtn, playBtn)
            
            // Agregar event listeners directamente
            const handlePlay = function(event) {
              console.log('🔧 [MOBILE-FIX] Click detectado en video ' + videoId)
              event.preventDefault()
              event.stopPropagation()
              
              // Buscar el player
              const player = VideoYouTubeSystem.players.get(videoId)
              if (player && typeof player.playVideo === 'function') {
                console.log('🔧 [MOBILE-FIX] Reproduciendo video ' + videoId)
                player.playVideo()
                overlay.style.display = 'none'
              } else {
                console.log('🔧 [MOBILE-FIX] Player no encontrado para ' + videoId)
              }
            }
            
            // Agregar múltiples tipos de events
            newPlayBtn.addEventListener('click', handlePlay)
            newPlayBtn.addEventListener('touchstart', handlePlay)
            newPlayBtn.addEventListener('touchend', handlePlay)
            overlay.addEventListener('click', handlePlay)
            overlay.addEventListener('touchstart', handlePlay)
            
            // Hacer el overlay más visible
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            overlay.style.border = '2px solid red'
            overlay.style.zIndex = '999'
            newPlayBtn.style.backgroundColor = 'red'
            newPlayBtn.style.border = '3px solid white'
            
            console.log('🔧 [MOBILE-FIX] Event listeners agregados para video ' + videoId)
          } else {
            console.log('🔧 [MOBILE-FIX] Elementos faltantes para video ' + index, {
              hasOverlay: !!overlay,
              hasPlayBtn: !!playBtn,
              hasVideoId: !!videoId
            })
          }
        })
      }
      
      DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Sistemas expuestos bajo window.ExperienceCarousel')
    }
    
    // Configurar resize listener optimizado para Liferay
    let resizeTimeout
    const handleResize = function() {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      
      resizeTimeout = setTimeout(function() {
        if (window.experienceSwiper && typeof window.experienceSwiper.update === 'function') {
          window.experienceSwiper.update()
          if (typeof handleDoubleWidthSlides === 'function') {
            handleDoubleWidthSlides(window.experienceSwiper)
          }
        }
      }, 250)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup al salir de la página (importante para Liferay)
    window.addEventListener('beforeunload', function() {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      window.removeEventListener('resize', handleResize)
    })
    
    DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Configuración completada')
  }
  
  // Detectar si estamos en Liferay
  const isLiferay = function() {
    return (typeof Liferay !== 'undefined' || 
            typeof window.Liferay !== 'undefined' || 
            document.querySelector('body.liferay-portal') !== null)
  }
  
  // Inicialización específica para Liferay
  if (isLiferay()) {
    console.log('🔧 [LIFERAY] Entorno Liferay detectado')
    
    // Esperar a que Liferay esté completamente cargado
    if (typeof Liferay !== 'undefined' && Liferay.on) {
      DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Usando Liferay.on para inicialización')
      Liferay.on('allPortletsReady', function() {
        setTimeout(initializeExperienceSystem, 200)
      })
    } else {
      DEBUG_CONFIG.log('init', '🔧 [LIFERAY] Liferay.on no disponible, usando fallback')
      // Fallback para versiones de Liferay sin Liferay.on
      setTimeout(initializeExperienceSystem, 500)
    }
  } else {
    console.log('🔧 [LIFERAY] Entorno no-Liferay detectado, iniciando inmediatamente')
    initializeExperienceSystem()
  }
  
  console.log('🔧 [LIFERAY] Debug está ' + (DEBUG_CONFIG.enabled ? 'ACTIVADO' : 'DESACTIVADO'))
  console.log('🔧 [LIFERAY] Para debug ejecuta: ExperienceCarousel.toggleDebug(true)')
  
  // Retornar función para Next.js
  return initializeExperienceSystem
  
})() // Fin del IIFE

// ===========================================
// EXPORTS PARA NEXT.JS
// ===========================================

// Función wrapper para Next.js
const nextjsWrapper = function() {
  console.log('🔧 [NEXT.JS] Script ejecutado desde Next.js')
  
  // En Next.js, el script se ejecuta automáticamente via useEffect
  // No necesitamos inicialización automática aquí
  return function() {
    console.log('🔧 [NEXT.JS] Inicializando sistema desde useEffect')
    
    // Verificar si ya se inicializó (para evitar duplicados)
    if (typeof window !== 'undefined' && window.ExperienceCarousel) {
      console.log('🔧 [NEXT.JS] Sistema ya inicializado, reinicializando...')
      if (window.ExperienceCarousel.reinitialize) {
        window.ExperienceCarousel.reinitialize()
      }
    } else {
      console.log('🔧 [NEXT.JS] Sistema no inicializado, esto es normal en Next.js')
    }
  }
}

// Export default para Next.js
export default nextjsWrapper
