export default function initializeSocialEmbeds() {
  // Función para cargar el script de Instagram
  const loadInstagramScript = () => {
    return new Promise((resolve) => {
      if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://www.instagram.com/embed.js'
        script.async = true
        
        script.onload = () => {
          console.log('Instagram script cargado')
          resolve()
        }
        
        script.onerror = () => {
          console.warn('Error cargando Instagram script')
          resolve()
        }
        
        document.body.appendChild(script)
      } else {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process()
        }
        resolve()
      }
    })
  }

  // Función para cargar el script de TikTok
  const loadTikTokScript = () => {
    return new Promise((resolve) => {
      if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://www.tiktok.com/embed.js'
        script.async = true
        
        script.onload = () => {
          console.log('TikTok script cargado')
          resolve()
        }
        
        script.onerror = () => {
          console.warn('Error cargando TikTok script')
          resolve()
        }
        
        document.body.appendChild(script)
      } else {
        if (window.tiktokEmbed) {
          window.tiktokEmbed.loadAll()
        }
        resolve()
      }
    })
  }

  // Función para procesar todos los embeds después de cargar los scripts
  const processEmbeds = () => {
    // Procesar embeds de Instagram
    if (window.instgrm && window.instgrm.Embeds) {
      setTimeout(() => {
        window.instgrm.Embeds.process()
      }, 100)
    }

    // Procesar embeds de TikTok
    if (window.tiktokEmbed) {
      setTimeout(() => {
        window.tiktokEmbed.loadAll()
      }, 100)
    }
  }

  // Función para reinicializar cuando se actualice el carrusel
  const reinitializeOnSlideChange = () => {
    const observer = new MutationObserver((mutations) => {
      let shouldReinitialize = false
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.querySelector && 
                  (node.querySelector('.instagram-media') || 
                   node.querySelector('.tiktok-embed'))) {
                shouldReinitialize = true
              }
            }
          })
        }
      })
      
      if (shouldReinitialize) {
        setTimeout(processEmbeds, 100)
      }
    })

    const carouselContainer = document.querySelector('.subjects-swiper')
    if (carouselContainer) {
      observer.observe(carouselContainer, {
        childList: true,
        subtree: true
      })
    }

    return observer
  }

  // Función principal que orquesta todo
  const initializeAll = async () => {
    try {
      // Cargar scripts en paralelo
      await Promise.all([
        loadInstagramScript(),
        loadTikTokScript()
      ])

      // Procesar embeds después de un pequeño delay
      setTimeout(processEmbeds, 200)

      // Configurar observer para cambios dinámicos
      reinitializeOnSlideChange()

      console.log('Social embeds nativos inicializados correctamente')
    } catch (error) {
      console.error('Error inicializando social embeds:', error)
    }
  }

  // Función para limpiar cuando sea necesario
  const cleanup = () => {
    const instagramScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]')
    const tiktokScripts = document.querySelectorAll('script[src*="tiktok.com/embed.js"]')
    
    instagramScripts.forEach(script => script.remove())
    tiktokScripts.forEach(script => script.remove())
  }

  // Función para forzar actualización de embeds
  const forceUpdate = () => {
    processEmbeds()
  }

  // Exponer funciones útiles globalmente
  if (typeof window !== 'undefined') {
    window.socialEmbeds = window.socialEmbeds || {
      forceUpdate,
      cleanup,
      reinitialize: initializeAll
    }
  }

  // Inicializar todo
  if (typeof window !== 'undefined') {
    setTimeout(initializeAll, 100)
  }

  return {
    forceUpdate,
    cleanup,
    reinitialize: initializeAll
  }
}