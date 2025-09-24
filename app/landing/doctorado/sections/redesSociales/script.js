/**
 * Social Media Detection System - Compatible con Liferay
 * Detecta automáticamente el tipo de red social basándose en la URL
 * y asigna el ícono y color correspondiente - VANILLA JAVASCRIPT
 */

export default () => {
  // SVG Íconos inline como fallback para Liferay (compatibilidad total)
  const ICON_SVG = {
    'ph-facebook-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>',

    'ph-instagram-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>',

    'ph-youtube-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69.44,216.11,124,216,128,216s58.56.11,91.84-13.11a24,24,0,0,0,14.49-16.41C236.92,176.5,240,158.26,240,128S236.92,79.5,234.33,69.52Zm-16.17,113.81C153.84,199.54,128,200,128,200s-25.84-.46-90.16-16.67a8,8,0,0,1-4.83-5.47C30.84,169.5,32,131.61,32,128s-1.16-41.5,1-49.86a8,8,0,0,1,4.83-5.47C102.16,56.46,128,56,128,56s25.84.46,90.16,16.67a8,8,0,0,1,4.83,5.47C225.16,86.5,224,124.39,224,128s1.16,41.5-1,49.86A8,8,0,0,1,218.16,183.33Z"></path></svg>',

    'ph-twitter-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg>',

    'ph-linkedin-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>',

    'ph-tiktok-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,1,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,1,1-24-48V91.87A36,36,0,1,1,176,44V32h24A32,32,0,0,0,216,111.64Z"></path></svg>',

    'ph-whatsapp-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path></svg>',

    'ph-telegram-logo':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19ZM175.53,208,92.85,135.16l119-85.22Z"></path></svg>',

    'ph-link':
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L58.33,118.4a8,8,0,1,1,11.3,11.32L59.69,139.72a40,40,0,0,0,56.53,56.53l9.94-9.95A8,8,0,0,1,137.54,186.36Zm70.08-138a56,56,0,0,0-79.22,0l-9.94,9.95a8,8,0,0,0,11.32,11.31l9.94-10a40,40,0,0,1,56.53,56.53L186.36,137.54a8,8,0,0,0,11.31,11.32l10-9.94A56,56,0,0,0,207.62,48.38ZM162.34,82.75a8,8,0,0,0-11.31,11.32l12.56,12.56a8,8,0,1,0,11.31-11.32Z"></path></svg>'
  }

  // Configuración de redes sociales con íconos SVG y Phosphor como fallback
  const SOCIAL_NETWORKS = {
    facebook: {
      domains: ['facebook.com', 'fb.com', 'fb.me'],
      icon: 'ph-facebook-logo',
      cssClass: 'facebook',
      name: 'Facebook'
    },
    instagram: {
      domains: ['instagram.com', 'instagr.am'],
      icon: 'ph-instagram-logo',
      cssClass: 'instagram',
      name: 'Instagram'
    },
    youtube: {
      domains: ['youtube.com', 'youtu.be', 'm.youtube.com'],
      icon: 'ph-youtube-logo',
      cssClass: 'youtube',
      name: 'YouTube'
    },
    twitter: {
      domains: ['twitter.com', 'x.com', 't.co'],
      icon: 'ph-twitter-logo',
      cssClass: 'twitter',
      name: 'Twitter/X'
    },
    linkedin: {
      domains: ['linkedin.com', 'lnkd.in'],
      icon: 'ph-linkedin-logo',
      cssClass: 'linkedin',
      name: 'LinkedIn'
    },
    tiktok: {
      domains: ['tiktok.com', 'vm.tiktok.com'],
      icon: 'ph-tiktok-logo',
      cssClass: 'tiktok',
      name: 'TikTok'
    },
    whatsapp: {
      domains: ['whatsapp.com', 'wa.me', 'chat.whatsapp.com'],
      icon: 'ph-whatsapp-logo',
      cssClass: 'whatsapp',
      name: 'WhatsApp'
    },
    telegram: {
      domains: ['telegram.org', 't.me'],
      icon: 'ph-telegram-logo',
      cssClass: 'telegram',
      name: 'Telegram'
    }
  }

  /**
   * Detecta la red social basándose en la URL
   * @param {string} url - URL a analizar
   * @returns {object} Configuración de la red social detectada
   */
  function detectSocialNetwork(url) {
    // Normalizar URL para análisis
    const normalizedUrl = url
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')

    // Buscar coincidencias en dominios conocidos
    for (const [networkKey, config] of Object.entries(SOCIAL_NETWORKS)) {
      const isMatch = config.domains.some(domain => normalizedUrl.includes(domain.toLowerCase()))

      if (isMatch) {
        return {
          network: networkKey,
          ...config,
          detected: true
        }
      }
    }

    // Red social no reconocida - usar configuración genérica
    return {
      network: 'generic',
      icon: 'ph-link',
      cssClass: 'generic',
      name: 'Enlace',
      detected: false
    }
  }

  /**
   * Configura un elemento de enlace social con detección automática
   * @param {HTMLElement} linkElement - Elemento <a> del enlace social
   */
  function configureSocialLink(linkElement) {
    const url = linkElement.getAttribute('href')

    // Skip si no hay URL válida
    if (!url || url === '#' || url === '') {
      console.warn('Social link without valid URL found:', linkElement)
      return
    }

    // Detectar red social
    const socialConfig = detectSocialNetwork(url)

    // Obtener elementos del DOM
    const iconElement = linkElement.querySelector('[data-social-icon]')
    const listItem = linkElement.closest('li')

    if (!iconElement) {
      console.error('Icon element not found in social link:', linkElement)
      return
    }

    // Estrategia híbrida: Intentar Phosphor, fallback a SVG
    // 1. Intentar con clases de Phosphor (si está disponible)
    iconElement.className = `ph-fill ${socialConfig.icon}`

    // 2. Verificar si Phosphor se cargó correctamente después de un delay
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(iconElement, ':before')
      const hasPhosphorContent = computedStyle.content && computedStyle.content !== 'none' && computedStyle.content !== '""'

      // 3. Si Phosphor no cargó, usar SVG inline como fallback
      if (!hasPhosphorContent && ICON_SVG[socialConfig.icon]) {
        iconElement.innerHTML = ICON_SVG[socialConfig.icon]
        iconElement.className = `social-icon-svg social-icon-${socialConfig.cssClass}`
        console.log(`Using SVG fallback for ${socialConfig.name}`)
      } else {
        console.log(`Phosphor icon loaded for ${socialConfig.name}`)
      }
    }, 100)

    // Agregar clase CSS para estilos específicos
    linkElement.classList.add(`socialMedia_link--${socialConfig.cssClass}`)

    // Agregar clase al <li> para estilos adicionales si es necesario
    if (listItem) {
      listItem.classList.add(`socialMedia_item--${socialConfig.cssClass}`)
    }

    // Mejorar accesibilidad
    if (!linkElement.getAttribute('aria-label')) {
      linkElement.setAttribute('aria-label', `Visitar ${socialConfig.name}`)
    }

    // Agregar atributo de datos para identificación
    linkElement.setAttribute('data-social-network', socialConfig.network)

    // Log para debugging
    console.log(`Social network detected: ${socialConfig.name} (${socialConfig.network})`, {
      url: url,
      detected: socialConfig.detected,
      icon: socialConfig.icon
    })
  }

  /**
   * Inicializa el sistema de detección de redes sociales
   */
  function initializeSocialMediaDetection() {
    // Buscar todos los enlaces sociales en la sección
    const socialLinks = document.querySelectorAll('[data-social-link]')

    if (socialLinks.length === 0) {
      console.warn('No social media links found with data-social-link attribute')
      return
    }

    // Configurar cada enlace social
    socialLinks.forEach((link, index) => {
      try {
        configureSocialLink(link)
      } catch (error) {
        console.error(`Error configuring social link ${index + 1}:`, error, link)
      }
    })

    console.log(`Social Media Detection initialized: ${socialLinks.length} links configured`)
  }

  // ===========================================
  // INICIALIZACIÓN
  // ===========================================

  // Inicializar el sistema de detección de redes sociales
  initializeSocialMediaDetection()

  // Para compatibilidad con Liferay - exponer funciones globales
  if (typeof window !== 'undefined') {
    window.configureSocialLink = configureSocialLink
    window.detectSocialNetwork = detectSocialNetwork
    window.initializeSocialMediaDetection = initializeSocialMediaDetection
  }
}
