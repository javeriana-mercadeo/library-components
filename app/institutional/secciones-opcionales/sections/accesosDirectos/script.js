// Funciones centralizadas para el menú flotante - Compatible con Liferay
// TEMA OSCURO MEJORADO - Sin desaparecer el menú

;(function () {
  'use strict'

  // Función principal para crear las funciones del menú
  function createFloatingMenuFunctions() {
    // Verificar que estamos en el cliente (navegador)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('createFloatingMenuFunctions: No está en el navegador')
      return {
        actions: {},
        config: [],
        utils: {
          loadPhosphorIcons: function () {},
          getThemeIconData: function () {
            return { icon: 'ph-sun', color: '#F6E05E', hoverColor: '#2D3748' }
          },
          getUpdatedMenuConfig: function () {
            return []
          },
          getState: function () {
            return { isDarkTheme: false }
          },
          executeAction: function () {
            return false
          },
          socialShare: {}
        },
        socialShare: {},
        getMenuItems: function () {
          return []
        },
        executeAction: function () {
          return false
        },
        getThemeIcon: function () {
          return { icon: 'ph-sun', color: '#F6E05E', hoverColor: '#2D3748' }
        }
      }
    }

    // Variables globales
    var currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
    var message = encodeURIComponent(
      'Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.'
    )
    var isDarkTheme = false

    // Configuración de elementos del menú
    var menuConfig = [
      {
        id: 'btnOpen',
        icon: 'ph-magnifying-glass-plus',
        color: '#4866D1',
        hoverColor: '#4866D1',
        action: 'toggle',
        title: 'Abrir/Cerrar menú'
      },
      {
        id: 'btnZoomOut',
        icon: 'ph-magnifying-glass-minus',
        color: '#FF6B6B',
        hoverColor: '#FF6B6B',
        action: 'zoomOut',
        title: 'Zoom Out'
      },
      {
        id: 'btnThemeToggle',
        icon: 'ph-sun',
        color: '#F6E05E',
        hoverColor: '#F6E05E',
        action: 'themeToggle',
        title: 'Cambiar tema',
        dynamicIcon: true
      },
      {
        id: 'btnShare',
        icon: 'ph-share-fat',
        color: '#4CAF50',
        hoverColor: '#4CAF50',
        action: 'share',
        title: 'Compartir página'
      },
      {
        id: 'btnWhatsapp',
        icon: 'ph-whatsapp-logo',
        color: '#25D366',
        hoverColor: '#25D366',
        action: 'whatsapp',
        title: 'Compartir en WhatsApp',
        url:
          typeof window !== 'undefined'
            ? 'https://api.whatsapp.com/send?text=' + message + '%20' + currentUrl
            : ''
      }
    ]

    // Funciones específicas para compartir en redes sociales
    var socialShareFunctions = {
      shareToWhatsApp: function () {
        if (typeof window === 'undefined') return false
        var shareMessage = encodeURIComponent(
          'Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.'
        )
        var url = encodeURIComponent(window.location.href)
        var whatsappUrl = 'https://api.whatsapp.com/send?text=' + shareMessage + '%20' + url
        window.open(whatsappUrl, '_blank')
        console.log('Compartido en WhatsApp')
        return true
      },

      shareToFacebook: function () {
        if (typeof window === 'undefined') return false
        var url = encodeURIComponent(window.location.href)
        var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url
        window.open(facebookUrl, '_blank', 'width=600,height=400')
        console.log('Compartido en Facebook')
        return true
      },

      shareToInstagram: function () {
        if (typeof window === 'undefined') return false
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(window.location.href)
            .then(function () {
              alert('Link copiado. Puedes pegarlo en tu historia de Instagram')
              console.log('Link copiado para Instagram')
            })
            .catch(function (error) {
              console.error('Error al copiar link:', error)
              prompt('Copia este link para Instagram:', window.location.href)
            })
        } else {
          prompt('Copia este link para Instagram:', window.location.href)
        }
        return true
      },

      shareToLinkedIn: function () {
        if (typeof window === 'undefined') return false
        var url = encodeURIComponent(window.location.href)
        var title = encodeURIComponent('Pontificia Universidad Javeriana')
        var linkedinUrl =
          'https://www.linkedin.com/sharing/share-offsite/?url=' + url + '&title=' + title
        window.open(linkedinUrl, '_blank', 'width=600,height=400')
        console.log('Compartido en LinkedIn')
        return true
      },

      shareByEmail: function () {
        if (typeof window === 'undefined') return false
        var subject = encodeURIComponent('Te invito a visitar este sitio web')
        var body = encodeURIComponent(
          'Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ' +
            window.location.href
        )
        var mailtoUrl = 'mailto:?subject=' + subject + '&body=' + body
        window.open(mailtoUrl)
        console.log('Correo de compartir abierto')
        return true
      },

      copyLink: function () {
        if (typeof window === 'undefined') return false

        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(window.location.href)
            .then(function () {
              alert('Link copiado al portapapeles')
              console.log('Link copiado al portapapeles')
            })
            .catch(function (error) {
              console.error('Error al copiar al portapapeles:', error)
              fallbackCopyLink()
            })
        } else {
          fallbackCopyLink()
        }

        function fallbackCopyLink() {
          var textArea = document.createElement('textarea')
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          try {
            document.execCommand('copy')
            alert('Link copiado al portapapeles')
          } catch (fallbackError) {
            console.error('Error en fallback:', fallbackError)
            prompt('Copia este link:', window.location.href)
          } finally {
            document.body.removeChild(textArea)
          }
        }

        return true
      }
    }

    // Función para aplicar tema oscuro mejorado
    function applyDarkTheme() {
      try {
        // Crear estilos CSS para tema oscuro
        var darkThemeId = 'javeriana-dark-theme-styles'
        var existingStyles = document.getElementById(darkThemeId)
        
        if (!existingStyles) {
          var styleSheet = document.createElement('style')
          styleSheet.id = darkThemeId
          styleSheet.type = 'text/css'
          
          // CSS para tema oscuro que NO afecta el menú flotante
          styleSheet.innerHTML = `
            /* Tema oscuro - Excluyendo menú flotante */
            body.dark-theme {
              background-color: #1a1a1a !important;
              color: #e0e0e0 !important;
            }
            
            body.dark-theme *:not(.floating-menu):not(.floating-menu *):not(.whatsapp-floating-button):not(.whatsapp-floating-button *):not(.share-modal-overlay):not(.share-modal-overlay *) {
              background-color: #2d2d2d !important;
              color: #e0e0e0 !important;
              border-color: #404040 !important;
            }
            
            /* Elementos específicos que deben mantenerse oscuros */
            body.dark-theme h1, 
            body.dark-theme h2, 
            body.dark-theme h3, 
            body.dark-theme h4, 
            body.dark-theme h5, 
            body.dark-theme h6 {
              color: #ffffff !important;
            }
            
            body.dark-theme p, 
            body.dark-theme div, 
            body.dark-theme span {
              color: #e0e0e0 !important;
            }
            
            /* Inputs y formularios */
            body.dark-theme input, 
            body.dark-theme textarea, 
            body.dark-theme select {
              background-color: #3a3a3a !important;
              color: #e0e0e0 !important;
              border-color: #555555 !important;
            }
            
            /* Links */
            body.dark-theme a {
              color: #66b3ff !important;
            }
            
            body.dark-theme a:hover {
              color: #99ccff !important;
            }
            
            /* Asegurar que el menú flotante NO se vea afectado */
            .floating-menu,
            .floating-menu *,
            .whatsapp-floating-button,
            .whatsapp-floating-button *,
            .share-modal-overlay,
            .share-modal-overlay * {
              filter: none !important;
            }
          `
          
          document.head.appendChild(styleSheet)
          console.log('Estilos de tema oscuro aplicados')
        }
        
        // Aplicar clase de tema oscuro al body
        document.body.classList.add('dark-theme')
        console.log('Clase dark-theme agregada al body')
        
      } catch (error) {
        console.error('Error al aplicar tema oscuro:', error)
        // Fallback al método anterior si algo falla
        document.body.style.filter = 'invert(1)'
        
        // Excluir el menú del filtro invertido
        var floatingMenu = document.querySelector('.floating-menu')
        var whatsappButton = document.querySelector('.whatsapp-floating-button')
        var shareModal = document.querySelector('.share-modal-overlay')
        
        if (floatingMenu) {
          floatingMenu.style.filter = 'invert(1)'
        }
        if (whatsappButton) {
          whatsappButton.style.filter = 'invert(1)'
        }
        if (shareModal) {
          shareModal.style.filter = 'invert(1)'
        }
      }
    }

    // Función para remover tema oscuro
    function removeDarkTheme() {
      try {
        // Remover clase de tema oscuro
        document.body.classList.remove('dark-theme')
        console.log('Clase dark-theme removida del body')
        
        // Limpiar filtros fallback si existen
        document.body.style.filter = ''
        
        var floatingMenu = document.querySelector('.floating-menu')
        var whatsappButton = document.querySelector('.whatsapp-floating-button')
        var shareModal = document.querySelector('.share-modal-overlay')
        
        if (floatingMenu) {
          floatingMenu.style.filter = ''
        }
        if (whatsappButton) {
          whatsappButton.style.filter = ''
        }
        if (shareModal) {
          shareModal.style.filter = ''
        }
        
      } catch (error) {
        console.error('Error al remover tema oscuro:', error)
        // Fallback
        document.body.style.filter = ''
      }
    }

    // Funciones de acciones principales
    var menuActions = {
      toggle: function () {
        console.log('El menú permanece siempre abierto')
        return true
      },

      zoomOut: function () {
        if (typeof window !== 'undefined') {
          alert('Función de zoom out activada')
        }
        console.log('Zoom out ejecutado')
        return true
      },

      themeToggle: function () {
        if (typeof document === 'undefined') return false
        
        isDarkTheme = !isDarkTheme

        if (isDarkTheme) {
          applyDarkTheme()
          console.log('Tema oscuro activado')
        } else {
          removeDarkTheme()
          console.log('Tema claro activado')
        }

        return isDarkTheme
      },

      share: function () {
        console.log('Solicitud de abrir modal de compartir')
        return 'modal'
      },

      shareNative: function () {
        if (typeof navigator === 'undefined' || !navigator.share) {
          return socialShareFunctions.copyLink()
        }

        navigator
          .share({
            title: 'Mi Página Web',
            text: '¡Mira esta increíble página!',
            url: window.location.href
          })
          .then(function () {
            console.log('Contenido compartido exitosamente')
          })
          .catch(function (error) {
            console.error('Error al compartir:', error)
            return socialShareFunctions.copyLink()
          })

        return true
      },

      whatsapp: function () {
        return socialShareFunctions.shareToWhatsApp()
      }
    }

    // Utilidades del menú
    var utils = {
      loadPhosphorIcons: function () {
        if (typeof document === 'undefined') return
        if (!document.querySelector('link[href*="phosphor-icons"]')) {
          var link = document.createElement('link')
          link.rel = 'stylesheet'
          link.type = 'text/css'
          link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css'
          document.head.appendChild(link)
          console.log('Iconos Phosphor cargados')
        }
      },

      getThemeIconData: function (isHovered) {
        isHovered = isHovered || false

        if (!isHovered) {
          return {
            icon: isDarkTheme ? 'ph-moon' : 'ph-sun',
            color: isDarkTheme ? '#2D3748' : '#F6E05E',
            hoverColor: isDarkTheme ? '#F6E05E' : '#2D3748'
          }
        }

        return {
          icon: isDarkTheme ? 'ph-sun' : 'ph-moon',
          color: isDarkTheme ? '#F6E05E' : '#2D3748',
          hoverColor: isDarkTheme ? '#F6E05E' : '#2D3748'
        }
      },

      getUpdatedMenuConfig: function () {
        return menuConfig.map(function (item) {
          if (item.id === 'btnThemeToggle') {
            var themeData = utils.getThemeIconData(false)
            return {
              id: item.id,
              icon: themeData.icon,
              color: themeData.color,
              hoverColor: themeData.hoverColor,
              action: item.action,
              title: item.title,
              dynamicIcon: item.dynamicIcon
            }
          }
          return item
        })
      },

      getState: function () {
        return {
          isDarkTheme: isDarkTheme,
          currentUrl: currentUrl,
          message: message
        }
      },

      getCurrentUrl: function () {
        return currentUrl
      },
      getMessage: function () {
        return message
      },
      isDarkTheme: function () {
        return isDarkTheme
      },

      executeAction: function (actionName, url) {
        url = url || null

        if (actionName === 'whatsapp' && url && typeof window !== 'undefined') {
          window.open(url, '_blank')
          return true
        }

        if (menuActions[actionName]) {
          return menuActions[actionName]()
        }

        console.warn('Acción "' + actionName + '" no encontrada')
        return false
      },

      socialShare: socialShareFunctions
    }

    // Retornar objeto público con todas las funcionalidades
    return {
      actions: menuActions,
      config: menuConfig,
      utils: utils,
      socialShare: socialShareFunctions,

      // Métodos de conveniencia
      getMenuItems: utils.getUpdatedMenuConfig,
      executeAction: utils.executeAction,
      getThemeIcon: utils.getThemeIconData
    }
  }

  // Función deshabilitada para evitar menús duplicados
  function initFloatingMenu() {
    console.warn('initFloatingMenu() está deshabilitada para evitar menús duplicados.')
    console.log('Usa createFloatingMenuFunctions() para acceder a las funcionalidades.')
    return null
  }

  // Hacer las funciones disponibles globalmente para Liferay
  if (typeof window !== 'undefined') {
    // Función principal disponible globalmente
    window.createFloatingMenuFunctions = createFloatingMenuFunctions
    window.initFloatingMenu = initFloatingMenu

    // Funciones de compartir globales para uso directo
    window.shareToWhatsApp = function () {
      var functions = createFloatingMenuFunctions()
      return (
        (functions && functions.socialShare && functions.socialShare.shareToWhatsApp()) || false
      )
    }

    window.shareToFacebook = function () {
      var functions = createFloatingMenuFunctions()
      return (
        (functions && functions.socialShare && functions.socialShare.shareToFacebook()) || false
      )
    }

    window.shareToInstagram = function () {
      var functions = createFloatingMenuFunctions()
      return (
        (functions && functions.socialShare && functions.socialShare.shareToInstagram()) || false
      )
    }

    window.shareToLinkedIn = function () {
      var functions = createFloatingMenuFunctions()
      return (
        (functions && functions.socialShare && functions.socialShare.shareToLinkedIn()) || false
      )
    }

    window.shareByEmail = function () {
      var functions = createFloatingMenuFunctions()
      return (functions && functions.socialShare && functions.socialShare.shareByEmail()) || false
    }

    window.copyLink = function () {
      var functions = createFloatingMenuFunctions()
      return (functions && functions.socialShare && functions.socialShare.copyLink()) || false
    }

    // Hacer disponible globalmente el objeto completo
    window.FloatingMenuFunctions = createFloatingMenuFunctions

    console.log('Funciones del menú flotante cargadas globalmente para Liferay')
  }
})()