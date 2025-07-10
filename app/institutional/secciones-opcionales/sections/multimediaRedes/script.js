export default () => {
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.socialCarouselSwiper) {
      window.socialCarouselSwiper.destroy(true, true)
    }

    // Buscar el elemento con la nueva clase
    const element = document.querySelector('.social-carousel_wrapper')
    if (!element) {
      console.warn('Elemento .social-carousel_wrapper no encontrado')
      const fallbackElement = document.querySelector('.social-swiper')
      if (!fallbackElement) {
        console.error('Ningún elemento swiper encontrado')
        return
      }
      console.log('📦 Usando elemento fallback: .social-swiper')
    }

    // Contar slides con la nueva clase
    const slides = document.querySelectorAll('.social-carousel_slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      console.error('Swiper no está disponible')
      return
    }

    // Usar la nueva clase como selector
    const swiperSelector = element ? '.social-carousel_wrapper' : '.social-swiper'

    window.socialCarouselSwiper = new window.Swiper(swiperSelector, {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      // Configuración para altura dinámica
      autoHeight: true, // Permitir altura automática
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      // Forzar que siempre permita navegación si hay más de 1 slide
      allowTouchMove: totalSlides > 1,

      pagination: {
        el: '.social-carousel_pagination, .social-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: '.social-carousel_next, .social-next',
        prevEl: '.social-carousel_prev, .social-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      // Breakpoints optimizados para contenido social
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
          autoHeight: true
        },
        576: {
          slidesPerView: Math.min(1, totalSlides),
          spaceBetween: 20,
          autoHeight: true
        },
        768: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 25,
          autoHeight: false // En múltiples columnas, mejor altura fija
        },
        1024: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 30,
          autoHeight: false
        },
        1280: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 30,
          autoHeight: false
        }
      },

      on: {
        init: function () {
          updateNavigationDisplay(this, totalSlides)
          updateButtonStates(this)
          // Procesar embeds y ajustar alturas
          setTimeout(() => {
            processInstagramEmbeds()
            adjustCardHeights()
          }, 100)
        },
        update: function () {
          updateNavigationDisplay(this, totalSlides)
          updateButtonStates(this)
          adjustCardHeights()
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationDisplay(this, totalSlides)
            updateButtonStates(this)
            adjustCardHeights()
            this.updateAutoHeight(200) // Actualizar altura automática
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationDisplay(this, totalSlides)
            updateButtonStates(this)
            adjustCardHeights()
          }, 150)
        },
        slideChange: function () {
          updateButtonStates(this)
          // Procesar embeds y ajustar altura al cambiar de slide
          setTimeout(() => {
            processInstagramEmbeds()
            adjustCardHeights()
            this.updateAutoHeight(200)
          }, 100)
        },
        transitionEnd: function () {
          // Ajustar altura después de la transición
          setTimeout(() => {
            adjustCardHeights()
            this.updateAutoHeight(200)
          }, 50)
        },
        reachBeginning: function () {
          updateButtonStates(this)
        },
        reachEnd: function () {
          updateButtonStates(this)
        }
      }
    })
  }

  // Función para procesar embeds de Instagram
  const processInstagramEmbeds = () => {
    if (typeof window !== 'undefined' && window.instgrm) {
      try {
        // Aplicar clase para altura dinámica antes de procesar
        const instagramEmbeds = document.querySelectorAll('.instagram-media')
        instagramEmbeds.forEach(embed => {
          embed.classList.add('dynamic-height')
          // Remover cualquier estilo inline que restrinja altura
          embed.style.height = 'auto'
          embed.style.minHeight = 'auto'
          embed.style.maxHeight = 'none'
          
          // Aplicar a elementos hijos también
          const childElements = embed.querySelectorAll('*')
          childElements.forEach(child => {
            child.style.height = 'auto'
            child.style.minHeight = 'auto'
            child.style.maxHeight = 'none'
            child.style.overflow = 'visible'
          })
        })
        
        window.instgrm.Embeds.process()
      } catch (error) {
        console.warn('Error procesando embeds de Instagram:', error)
      }
    }
  }

  // Nueva función para ajustar alturas de las tarjetas
  const adjustCardHeights = () => {
    const cards = document.querySelectorAll('.social-carousel_card')
    const slides = document.querySelectorAll('.social-carousel_slide')
    
    cards.forEach(card => {
      // Asegurar que la tarjeta tenga altura dinámica
      card.style.height = 'auto'
      card.style.minHeight = 'auto'
      card.style.maxHeight = 'none'
      
      // Aplicar altura dinámica al contenido del post
      const postContent = card.querySelector('.social-carousel_post-content')
      if (postContent) {
        postContent.style.height = 'auto'
        postContent.style.minHeight = 'auto'
        postContent.style.maxHeight = 'none'
        
        // Buscar embeds dentro del contenido
        const instagramEmbeds = postContent.querySelectorAll('.instagram-media')
        instagramEmbeds.forEach(embed => {
          embed.style.height = 'auto'
          embed.style.minHeight = 'auto'
          embed.style.maxHeight = 'none'
          embed.style.overflow = 'visible'
          
          // Aplicar a iframes dentro del embed
          const iframes = embed.querySelectorAll('iframe')
          iframes.forEach(iframe => {
            iframe.style.height = 'auto'
            iframe.style.minHeight = 'auto'
            iframe.style.maxHeight = 'none'
          })
        })
      }
    })
    
    // Ajustar slides también
    slides.forEach(slide => {
      slide.style.height = 'auto'
      slide.style.minHeight = 'auto'
      slide.style.maxHeight = 'none'
    })
  }

  // Función para observar cambios en los embeds
  const observeEmbedChanges = () => {
    if (typeof window !== 'undefined' && window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const target = mutation.target
            if (target.classList && (
              target.classList.contains('instagram-media') ||
              target.closest('.instagram-media') ||
              target.querySelector('.instagram-media')
            )) {
              shouldUpdate = true
            }
          }
        })
        
        if (shouldUpdate) {
          setTimeout(() => {
            adjustCardHeights()
            if (window.socialCarouselSwiper) {
              window.socialCarouselSwiper.updateAutoHeight(200)
            }
          }, 100)
        }
      })
      
      // Observar cambios en el contenedor del carrusel
      const container = document.querySelector('.social-carousel_wrapper')
      if (container) {
        observer.observe(container, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        })
      }
    }
  }

  // Resto de funciones existentes...
  const updateNavigationDisplay = (swiper, totalSlides) => {
    const carousel = document.querySelector('.social-carousel')
    const nextBtn = document.querySelector('.social-carousel_next') || document.querySelector('.social-next')
    const prevBtn = document.querySelector('.social-carousel_prev') || document.querySelector('.social-prev')
    const pagination = document.querySelector('.social-carousel_pagination') || document.querySelector('.social-pagination')

    if (!nextBtn || !prevBtn || !pagination) {
      console.warn('Elementos de navegación no encontrados')
      return
    }

    if (totalSlides === 1) {
      showPaginationOnly(carousel, nextBtn, prevBtn, pagination)
      console.log('🔘 Solo paginación - 1 slide')
    } else if (totalSlides > 1) {
      showButtonsOnly(carousel, nextBtn, prevBtn, pagination)
      console.log('⬅️➡️ Solo botones - slides:', totalSlides)
    } else {
      hideAllNavigation(carousel, nextBtn, prevBtn, pagination)
      console.log('❌ Sin navegación - no hay slides')
    }
  }

  const hideAllNavigation = (carousel, nextBtn, prevBtn, pagination) => {
    carousel?.classList.remove('show-pagination-only', 'show-buttons-only')
    
    pagination.style.display = 'none'
    pagination.style.opacity = '0'
    pagination.style.visibility = 'hidden'
    pagination.classList.add('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'true')
    
    nextBtn.style.display = 'none'
    nextBtn.style.opacity = '0'
    nextBtn.style.visibility = 'hidden'
    nextBtn.classList.remove('show-navigation')
    nextBtn.classList.add('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'true')
    
    prevBtn.style.display = 'none'
    prevBtn.style.opacity = '0'
    prevBtn.style.visibility = 'hidden'
    prevBtn.classList.remove('show-navigation')
    prevBtn.classList.add('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'true')
  }

  const showPaginationOnly = (carousel, nextBtn, prevBtn, pagination) => {
    carousel?.classList.add('show-pagination-only')
    carousel?.classList.remove('show-buttons-only')
    
    pagination.style.display = 'flex'
    pagination.style.opacity = '1'
    pagination.style.visibility = 'visible'
    pagination.classList.remove('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'false')
    
    const bullets = pagination.querySelectorAll('.swiper-pagination-bullet')
    bullets.forEach((bullet, index) => {
      bullet.setAttribute('aria-label', `Ir a slide ${index + 1}`)
      bullet.style.display = 'block'
    })
    
    nextBtn.style.display = 'none'
    nextBtn.style.opacity = '0'
    nextBtn.style.visibility = 'hidden'
    nextBtn.classList.remove('show-navigation')
    nextBtn.classList.add('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'true')
    
    prevBtn.style.display = 'none'
    prevBtn.style.opacity = '0'
    prevBtn.style.visibility = 'hidden'
    prevBtn.classList.remove('show-navigation')
    prevBtn.classList.add('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'true')
  }

  const showButtonsOnly = (carousel, nextBtn, prevBtn, pagination) => {
    carousel?.classList.add('show-buttons-only')
    carousel?.classList.remove('show-pagination-only')
    
    pagination.style.display = 'none'
    pagination.style.opacity = '0'
    pagination.style.visibility = 'hidden'
    pagination.classList.add('swiper-pagination-hidden')
    pagination.setAttribute('aria-hidden', 'true')
    
    nextBtn.style.display = 'flex'
    nextBtn.style.opacity = '1'
    nextBtn.style.visibility = 'visible'
    nextBtn.classList.add('show-navigation')
    nextBtn.classList.remove('swiper-button-hidden')
    nextBtn.setAttribute('aria-hidden', 'false')
    
    prevBtn.style.display = 'flex'
    prevBtn.style.opacity = '1'
    prevBtn.style.visibility = 'visible'
    prevBtn.classList.add('show-navigation')
    prevBtn.classList.remove('swiper-button-hidden')
    prevBtn.setAttribute('aria-hidden', 'false')
  }

  const updateButtonStates = swiper => {
    const nextBtn = document.querySelector('.social-carousel_next') || document.querySelector('.social-next')
    const prevBtn = document.querySelector('.social-carousel_prev') || document.querySelector('.social-prev')

    if (!nextBtn || !prevBtn) return

    const buttonsVisible = nextBtn.classList.contains('show-navigation')
    if (!buttonsVisible) return

    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd
    const allowSlideNext = swiper.allowSlideNext
    const allowSlidePrev = swiper.allowSlidePrev

    if (isBeginning || !allowSlidePrev) {
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

    if (isEnd || !allowSlideNext) {
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

  const checkAndInit = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      initializeSwiper()
      observeEmbedChanges()
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()

  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      if (window.socialCarouselSwiper) {
        adjustCardHeights()
        window.socialCarouselSwiper.updateAutoHeight(200)
        window.socialCarouselSwiper.update()
      }
    }, 250)
  })
}