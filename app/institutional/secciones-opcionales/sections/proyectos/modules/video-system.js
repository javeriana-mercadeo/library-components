// ===========================================
// VIDEO SYSTEM - GESTIÓN DE VIDEOS YOUTUBE
// ===========================================

import { Logger } from './utils.js'

export class VideoSystem {
  constructor() {
    this.youtubePlayersRegistry = new Map()
    this.isYouTubeAPIReady = false
  }

  /**
   * Cargar API de YouTube
   */
  loadYouTubeAPI() {
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
      this.isYouTubeAPIReady = true
      return Promise.resolve()
    }

    return new Promise(resolve => {
      if (typeof window === 'undefined') {
        resolve()
        return
      }

      const existingCallback = window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = () => {
        this.isYouTubeAPIReady = true
        Logger.info('YouTube API cargada')

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

  /**
   * Pausar todos los videos excepto uno
   */
  pauseAllVideosExcept(activePlayerId) {
    this.youtubePlayersRegistry.forEach((player, playerId) => {
      if (playerId !== activePlayerId && player && typeof player.pauseVideo === 'function') {
        try {
          const playerState = player.getPlayerState()
          if (playerState === 1) {
            player.pauseVideo()
          }
        } catch (error) {
          Logger.warning(`Error pausando video ${playerId}:`, error)
        }
      }
    })
  }

  /**
   * Limpiar registro de videos
   */
  clearVideoRegistry() {
    this.youtubePlayersRegistry.clear()
  }

  /**
   * Extraer ID de YouTube
   */
  extractYouTubeId(url) {
    if (!url) return null

    const patterns = [/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/, /(?:youtube\.com\/embed\/)([^&\n?#]+)/, /(?:youtu\.be\/)([^&\n?#]+)/]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }

    return null
  }

  /**
   * Obtener parámetro de tiempo
   */
  getTimeParam(url) {
    const timeMatch = url.match(/[&?]t=(\d+)/)
    return timeMatch ? `&start=${timeMatch[1]}` : ''
  }

  /**
   * Crear iframe de video
   */
  createVideoIframe(videoUrl, title, videoIndex = 0) {
    const videoId = this.extractYouTubeId(videoUrl)
    if (!videoId) return null

    const timeParam = this.getTimeParam(videoUrl)
    const uniquePlayerId = `youtube-player-${Date.now()}-${videoIndex}`

    const playerContainer = document.createElement('div')
    playerContainer.id = uniquePlayerId
    playerContainer.style.cssText = 'width: 100%; height: 400px; border-radius: 8px; overflow: hidden; background: #000;'

    const createFallbackIframe = () => {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${timeParam}`

      playerContainer.innerHTML = `
        <iframe
          src="${embedUrl}"
          title="${title} - Video ${videoIndex + 1}"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style="border: none; border-radius: 8px; display: block; background: #000;">
        </iframe>
      `

      return playerContainer
    }

    if (this.isYouTubeAPIReady && typeof window !== 'undefined' && window.YT && window.YT.Player) {
      try {
        const startSeconds = timeParam ? parseInt(timeParam.replace('&start=', '')) : 0

        setTimeout(() => {
          new window.YT.Player(uniquePlayerId, {
            height: '400',
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
                this.youtubePlayersRegistry.set(uniquePlayerId, event.target)
              },
              onStateChange: event => {
                if (event.data === 1) {
                  this.pauseAllVideosExcept(uniquePlayerId)
                }
              }
            }
          })
        }, 100)
      } catch (error) {
        Logger.error('Error creando player de YouTube:', error)
        return createFallbackIframe()
      }
    } else {
      return createFallbackIframe()
    }

    return playerContainer
  }

  /**
   * Insertar múltiples videos
   */
  insertMultipleVideos(container, videoUrls, title) {
    if (!container) return

    this.clearVideoRegistry()
    container.innerHTML = ''

    if (!videoUrls || !videoUrls.length) {
      container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No hay videos disponibles</div>'
      return
    }

    this.loadYouTubeAPI()
      .then(() => {
        videoUrls.forEach((videoUrl, index) => {
          if (!videoUrl || !videoUrl.trim()) return

          const videoContainer = this.createVideoIframe(videoUrl.trim(), title, index)

          if (videoContainer) {
            const videoWrapper = document.createElement('div')
            videoWrapper.style.cssText = 'position: relative; width: 100%; margin-bottom: 1.5rem;'
            videoWrapper.appendChild(videoContainer)
            container.appendChild(videoWrapper)
          }
        })
      })
      .catch(error => {
        Logger.error('Error cargando API de YouTube:', error)
      })
  }

  /**
   * Limpiar videos del modal
   */
  cleanupModalVideos() {
    this.youtubePlayersRegistry.forEach((player, playerId) => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo()
          player.destroy()
        } catch (error) {
          Logger.warning(`Error limpiando player ${playerId}:`, error)
        }
      }
    })

    this.clearVideoRegistry()
  }

  destroy() {
    this.cleanupModalVideos()
    Logger.info('Video system destruido')
  }
}

export default VideoSystem
