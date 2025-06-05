// ===========================================
// SISTEMA DE VIDEO SIMPLIFICADO
// ===========================================

const SimpleVideoSystem = {
  init() {
    Logger.debug('Inicializando sistema de video simplificado...')

    // Buscar todos los videos en la página
    const videoContainers = document.querySelectorAll('.program-video[data-video-id]')

    if (videoContainers.length === 0) {
      Logger.debug('No se encontraron videos para cargar')
      return false
    }

    // Inicializar cada video inmediatamente
    videoContainers.forEach(container => {
      this.initializeVideo(container)
    })

    Logger.success(`Videos cargados: ${videoContainers.length}`)
    return true
  },

  initializeVideo(container) {
    const videoId = container.dataset.videoId
    if (!videoId) {
      Logger.warning('Video sin ID encontrado')
      return
    }

    const iframe = container.querySelector('.video-iframe')
    if (!iframe) {
      Logger.error(`Video ${videoId}: iframe no encontrado`)
      return
    }

    // Parámetros optimizados para reproducción automática sin controles
    const videoParams = new URLSearchParams({
      autoplay: '1', // Reproducción automática
      mute: '1', // Sin sonido
      loop: '1', // Bucle infinito
      playlist: videoId, // Playlist para que funcione el loop
      controls: '0', // Sin controles
      showinfo: '0', // Sin información del video
      rel: '0', // Sin videos relacionados
      modestbranding: '1', // Ocultar logo de YouTube
      playsinline: '1', // Reproducción inline en móvil
      iv_load_policy: '3', // Sin anotaciones
      disablekb: '1', // Deshabilitar teclado
      fs: '0', // Sin pantalla completa
      cc_load_policy: '0', // Sin subtítulos
      start: '0', // Empezar desde el inicio
      end: '', // Sin fin específico para que haga loop
      enablejsapi: '0', // Sin API de JavaScript (más simple)
      origin: window.location.origin,
      // Parámetros adicionales para ocultar más elementos
      hl: 'es', // Idioma español
      cc_lang_pref: 'es', // Preferencia de subtítulos en español
      widget_referrer: window.location.href
    })

    const videoSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    // Configurar el iframe inmediatamente
    iframe.src = videoSrc

    // Event listeners para debugging
    EventManager.add(iframe, 'load', () => {
      Logger.success(`Video ${videoId} cargado correctamente`)
      // Asegurar que el video se reproduzca
      this.ensureVideoPlayback(iframe)
    })

    EventManager.add(iframe, 'error', () => {
      Logger.error(`Error al cargar video ${videoId}`)
    })

    Logger.debug(`Video ${videoId} configurado para carga automática`)
  },

  ensureVideoPlayback(iframe) {
    // Pequeño delay para asegurar que el video se cargue completamente
    TimingUtils.delay(() => {
      try {
        // Intentar enviar comando de play si el iframe tiene acceso
        if (iframe.contentWindow) {
          // No podemos acceder al contentWindow por CORS, pero el autoplay debería funcionar
          Logger.debug('Video debería estar reproduciéndose automáticamente')
        }
      } catch (error) {
        // Esto es esperado debido a CORS, no es un error real
        Logger.debug('CORS esperado - el video debería funcionar normalmente')
      }
    }, 1000)
  },

  // Utilidad para actualizar parámetros de video si es necesario
  updateVideoParams(container, newParams = {}) {
    const videoId = container.dataset.videoId
    const iframe = container.querySelector('.video-iframe')

    if (!videoId || !iframe) return

    const defaultParams = {
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId,
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
      start: '0',
      enablejsapi: '0',
      origin: window.location.origin
    }

    const mergedParams = { ...defaultParams, ...newParams }
    const videoParams = new URLSearchParams(mergedParams)
    const newSrc = `https://www.youtube.com/embed/${videoId}?${videoParams.toString()}`

    iframe.src = newSrc
    Logger.debug(`Video ${videoId} actualizado con nuevos parámetros`)
  },

  // Función para pausar todos los videos (si es necesario)
  pauseAllVideos() {
    const videoContainers = document.querySelectorAll('.program-video[data-video-id]')
    videoContainers.forEach(container => {
      const iframe = container.querySelector('.video-iframe')
      if (iframe) {
        // Pausar removiendo y volviendo a cargar sin autoplay
        this.updateVideoParams(container, { autoplay: '0' })
      }
    })
    Logger.debug('Todos los videos pausados')
  },

  // Función para reanudar todos los videos
  resumeAllVideos() {
    const videoContainers = document.querySelectorAll('.program-video[data-video-id]')
    videoContainers.forEach(container => {
      const iframe = container.querySelector('.video-iframe')
      if (iframe) {
        // Reanudar con autoplay
        this.updateVideoParams(container, { autoplay: '1' })
      }
    })
    Logger.debug('Todos los videos reanudados')
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  DOMHelpers.isReady(() => {
    SimpleVideoSystem.init()

    // Cleanup opcional al cambiar página
    window.addEventListener('beforeunload', () => {
      Logger.debug('🧹 Limpiando sistema de videos...')
    })

    // Opcional: Pausar videos cuando la pestaña no está visible (ahorro de batería)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        SimpleVideoSystem.pauseAllVideos()
      } else {
        SimpleVideoSystem.resumeAllVideos()
      }
    })
  })
}
