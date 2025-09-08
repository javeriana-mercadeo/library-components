// Importar módulos separados
import { ModalInvestigacion } from './components/modalInvestigacion.js'

export default () => {
  // ==========================================
  // INICIALIZAR SWIPER
  // ==========================================
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.investigationsSwiper) {
      window.investigationsSwiper.destroy(true, true)
      window.investigationsSwiper = null
    }

    // Buscar el elemento con selector primario y fallback
    const element = document.querySelector('.investigations_wrapper.investigations-swiper')
    if (!element) {
      console.warn('Elemento .investigations_wrapper.investigations-swiper no encontrado')
      const fallbackElement = document.querySelector('.investigations-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
    }

    // Contar slides
    const slides = document.querySelectorAll('.investigations_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar el selector correcto
    const swiperSelector = element ? '.investigations_wrapper.investigations-swiper' : '.investigations-swiper'

    try {
      window.investigationsSwiper = new window.Swiper(swiperSelector, {
        // ==========================================
        // CONFIGURACION BASICA - PATRÓN RELACIONADOS
        // ==========================================
        loop: false,
        spaceBetween: 25,
        grabCursor: true,
        allowTouchMove: true,
        slidesPerView: 'auto',
        watchOverflow: true,

        // ==========================================
        // NAVEGACION
        // ==========================================
        navigation: {
          nextEl: '.investigations_next',
          prevEl: '.investigations_prev',
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden'
        },

        // ==========================================
        // BREAKPOINTS RESPONSIVOS - PATRÓN RELACIONADOS NATIVO
        // ==========================================
        breakpoints: {
          0: {
            spaceBetween: 20,
            slidesPerView: Math.min(1, totalSlides),
            centeredSlides: true
          },
          576: {
            spaceBetween: 20,
            centeredSlides: false,
            slidesPerView: Math.min(1, totalSlides)
          },
          768: {
            spaceBetween: 25,
            centeredSlides: false,
            slidesPerView: Math.min(2, totalSlides)
          },
          1024: {
            spaceBetween: 25,
            centeredSlides: false,
            slidesPerView: Math.min(2, totalSlides)
          }
        },

        // ==========================================
        // EVENTOS
        // ==========================================
        on: {
          init: function (swiper) {
            log('Swiper inicializado con', totalSlides, 'slides')
            updateNavigationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
            
            // Sincronizar alturas después de inicialización
            setTimeout(() => {
              syncCardHeights()
            }, 100)
          },

          update: function (swiper) {
            updateNavigationVisibility(swiper, totalSlides)
            updateButtonStates(swiper)
          },

          resize: function (swiper) {
            setTimeout(() => {
              updateNavigationVisibility(swiper, totalSlides)
              updateButtonStates(swiper)
              syncCardHeights()
            }, 100)
          },

          slideChange: function (swiper) {
            updateButtonStates(swiper)
          }
        }
      })

      // Configurar resize handler
      window.addEventListener('resize', handleResize)
      
    } catch (error) {
      error('Error inicializando Swiper:', error)
    }
  }

  // ==========================================
  // FUNCIONES DE CONTROL DE NAVEGACION
  // ==========================================
  const updateNavigationVisibility = (swiper, totalSlides) => {
    const nextBtn = document.querySelector('.investigations_next')
    const prevBtn = document.querySelector('.investigations_prev')

    if (!nextBtn || !prevBtn) {
      warn('Botones de navegacion no encontrados')
      return
    }

    // Mostrar navegacion si hay mas de 1 slide
    const needsNavigation = totalSlides > 1

    if (needsNavigation) {
      nextBtn.style.display = 'flex'
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')

      prevBtn.style.display = 'flex'
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')

      updateButtonStates(swiper)
    } else {
      nextBtn.style.display = 'none'
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')

      prevBtn.style.display = 'none'
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
    }
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.investigations_next')
    const prevBtn = document.querySelector('.investigations_prev')

    if (!nextBtn || !prevBtn) return

    // Estados del swiper
    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd

    // Boton anterior
    if (isBeginning) {
      prevBtn.classList.add('swiper-button-disabled')
      prevBtn.style.opacity = '0.3'
      prevBtn.style.pointerEvents = 'none'
      prevBtn.setAttribute('aria-disabled', 'true')
    } else {
      prevBtn.classList.remove('swiper-button-disabled')
      prevBtn.style.opacity = '1'
      prevBtn.style.pointerEvents = 'auto'
      prevBtn.setAttribute('aria-disabled', 'false')
    }

    // Boton siguiente
    if (isEnd) {
      nextBtn.classList.add('swiper-button-disabled')
      nextBtn.style.opacity = '0.3'
      nextBtn.style.pointerEvents = 'none'
      nextBtn.setAttribute('aria-disabled', 'true')
    } else {
      nextBtn.classList.remove('swiper-button-disabled')
      nextBtn.style.opacity = '1'
      nextBtn.style.pointerEvents = 'auto'
      nextBtn.setAttribute('aria-disabled', 'false')
    }
  }

  // ==========================================
  // SINCRONIZAR ALTURAS DE CARDS
  // ==========================================
  const syncCardHeights = () => {
    const mainCard = document.querySelector('.investigations_card--main')
    const secondaryCards = document.querySelectorAll('.investigations_card--secondary')

    if (mainCard && secondaryCards.length > 0) {
      // Resetear alturas para obtener altura natural
      mainCard.style.height = 'auto'
      secondaryCards.forEach(card => (card.style.height = 'auto'))

      // Obtener todas las alturas
      const allCards = [mainCard, ...Array.from(secondaryCards)]
      const heights = allCards.map(card => card.offsetHeight)
      const maxHeight = Math.max(...heights)

      // Aplicar la altura máxima a todas las cards
      allCards.forEach(card => {
        card.style.height = `${maxHeight}px`
      })

      log('Alturas sincronizadas:', maxHeight + 'px')
    }
  }

  // ==========================================
  // MANEJO DE RESIZE
  // ==========================================
  const handleResize = () => {
    setTimeout(() => {
      syncCardHeights()
      if (window.investigationsSwiper && typeof window.investigationsSwiper.update === 'function') {
        window.investigationsSwiper.update()
      }
    }, 250)
  }

  // ==========================================
  // OBTENER DATOS DESDE DOM
  // ==========================================
  const getInvestigacionesData = () => {
    console.log('[INVESTIGATIONS] 🔍 Buscando contenedor #investigaciones...')
    const container = document.querySelector('#investigaciones')
    console.log('[INVESTIGATIONS] 🔍 Contenedor encontrado:', !!container)
    
    if (container) {
      console.log('[INVESTIGATIONS] 🔍 Buscando atributo data-investigations-data...')
      console.log('[INVESTIGATIONS] 🔍 Todos los atributos del contenedor:', Array.from(container.attributes).map(attr => attr.name))
      console.log('[INVESTIGATIONS] 🔍 HTML del contenedor:', container.outerHTML.substring(0, 200) + '...')
      try {
        const dataAttr = container.getAttribute('data-investigations-data')
        console.log('[INVESTIGATIONS] 🔍 Atributo encontrado:', !!dataAttr, 'longitud:', dataAttr?.length)
        if (dataAttr) {
          const data = JSON.parse(dataAttr)
          window.investigacionesData = data
          console.log('[INVESTIGATIONS] ✅ Datos cargados:', data.length, 'investigaciones')
          
          // AGREGAR DATOS COMPLETOS CON CONFIGURACIÓN DE VIDEO PARA EL MODAL
          // Los datos en el atributo están filtrados, pero el modal necesita la config completa
          window.investigacionesDataComplete = data.map(investigacion => {
            // Restaurar configuración de video para investigaciones específicas
            if (investigacion.id === 1) {
              return {
                ...investigacion,
                video: {
                  enabled: true,
                  url: 'https://youtu.be/Y2KdypoCAYg',
                  embedId: 'Y2KdypoCAYg',
                  position: 'first'
                }
              }
            } else if (investigacion.id === 3) {
              return {
                ...investigacion,
                video: {
                  enabled: true,
                  url: 'https://youtu.be/pBbK6Tf5reE',
                  embedId: 'pBbK6Tf5reE',
                  position: 'first'
                }
              }
            }
            return investigacion
          })
          
          console.log('[INVESTIGATIONS] ✅ Datos completos generados:', window.investigacionesDataComplete.length)
          console.log('[INVESTIGATIONS] ✅ Datos ID 1:', window.investigacionesDataComplete.find(i => i.id === 1))
          console.log('[INVESTIGATIONS] ✅ Datos ID 3:', window.investigacionesDataComplete.find(i => i.id === 3))
          
          return data
        }
      } catch (error) {
        console.error('[INVESTIGATIONS] Error al parsear datos:', error)
      }
    } else {
      console.error('[INVESTIGATIONS] ❌ NO se encontró contenedor #investigaciones')
      console.log('[INVESTIGATIONS] 🔍 Elementos disponibles con id:', Array.from(document.querySelectorAll('[id]')).map(el => el.id))
    }
    return []
  }

  // ==========================================
  // INICIALIZAR MODAL
  // ==========================================
  const initModal = () => {
    try {
      console.log('[INVESTIGATIONS] 🔧 Iniciando modal - obteniendo datos...')
      // Obtener datos para el modal
      const datosObtenidos = getInvestigacionesData()
      console.log('[INVESTIGATIONS] 🔧 Datos obtenidos:', datosObtenidos.length, 'investigaciones')
      
      // Exponer ModalInvestigacion globalmente
      window.ModalInvestigacion = ModalInvestigacion
      
      // Inicializar el modal
      setTimeout(() => {
        const success = ModalInvestigacion.init()
        if (success) {
          info('Modal system inicializado correctamente')
        }
      }, 300)
    } catch (error) {
      error('Error al inicializar modal:', error)
    }
  }

  // ==========================================
  // SISTEMA DE LOGS CONTROLABLE
  // ==========================================
  const DEBUG = false // Cambiar a true para habilitar logs detallados
  
  const log = (message, ...args) => {
    if (DEBUG) {
      console.log(`[INVESTIGATIONS] ${message}`, ...args)
    }
  }
  
  const warn = (message, ...args) => {
    console.warn(`[INVESTIGATIONS] ${message}`, ...args)
  }
  
  const error = (message, ...args) => {
    console.error(`[INVESTIGATIONS] ${message}`, ...args)
  }
  
  const info = (message, ...args) => {
    console.log(`[INVESTIGATIONS] ✓ ${message}`, ...args)
  }

  // ==========================================
  // PATRÓN EXACTO DE EXPERIENCIA
  // ==========================================
  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
      initModal()
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()
}