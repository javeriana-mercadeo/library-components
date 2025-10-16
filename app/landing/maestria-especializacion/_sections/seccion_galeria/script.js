export default () => {
  window.maestriaGallerySwipers = window.maestriaGallerySwipers || {}

  const initializeTabs = () => {
    const tabsContainer = document.querySelector('.maestria-gallery__tabs-container')
    if (!tabsContainer) {
      return
    }

    const tabButtons = tabsContainer.querySelectorAll('.maestria-gallery__tab-button')
    const tabPanels = tabsContainer.querySelectorAll('.maestria-gallery__tab-panel')

    if (!tabButtons.length || !tabPanels.length) {
      return
    }

    tabButtons.forEach(button => {
      if (button.hasAttribute('data-tabs-initialized')) return
      button.setAttribute('data-tabs-initialized', 'true')
    })

    tabButtons.forEach((button, buttonIndex) => {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        handleTabClick(tabsContainer, buttonIndex)
      })

      button.addEventListener('keydown', function (event) {
        handleTabKeydown(event, tabsContainer, buttonIndex)
      })
    })
  }

  const handleTabClick = (container, clickedIndex) => {
    const tabButtons = container.querySelectorAll('.maestria-gallery__tab-button')
    const clickedButton = tabButtons[clickedIndex]

    if (!clickedButton.classList.contains('active')) {
      setActiveTab(container, clickedIndex)

      setTimeout(() => {
        const activePanel = document.querySelector('.maestria-gallery__tab-panel:not(.hidden)')
        if (activePanel) {
          const swiperContainer = activePanel.querySelector('.gallery-swiper')
          if (swiperContainer) {
            const categoriaId = activePanel.getAttribute('data-categoria-id')

            if (!window.maestriaGallerySwipers[categoriaId]) {
              initializeSwiper(categoriaId, swiperContainer)
            } else {
              window.maestriaGallerySwipers[categoriaId].update()
            }
          }
        }
      }, 100)
    }
  }

  const handleTabKeydown = (event, container, currentIndex) => {
    const tabButtons = container.querySelectorAll('.maestria-gallery__tab-button')
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        break
      case 'End':
        event.preventDefault()
        newIndex = tabButtons.length - 1
        break
      default:
        return
    }

    tabButtons[newIndex].focus()
    setActiveTab(container, newIndex)
    setTimeout(() => {
      const activePanel = document.querySelector('.maestria-gallery__tab-panel:not(.hidden)')
      if (activePanel) {
        const swiperContainer = activePanel.querySelector('.gallery-swiper')
        if (swiperContainer) {
          const categoriaId = activePanel.getAttribute('data-categoria-id')

          if (!window.maestriaGallerySwipers[categoriaId]) {
            initializeSwiper(categoriaId, swiperContainer)
          } else {
            window.maestriaGallerySwipers[categoriaId].update()
          }
        }
      }
    }, 100)
  }

  const setActiveTab = (container, activeIndex) => {
    const tabButtons = container.querySelectorAll('.maestria-gallery__tab-button')
    const tabPanels = container.querySelectorAll('.maestria-gallery__tab-panel')

    tabButtons.forEach((button, index) => {
      const isActive = index === activeIndex
      button.classList.toggle('active', isActive)
      button.setAttribute('aria-selected', isActive.toString())
      button.setAttribute('tabindex', isActive ? '0' : '-1')
    })

    tabPanels.forEach((panel, index) => {
      const isActive = index === activeIndex
      panel.classList.toggle('hidden', !isActive)
      panel.setAttribute('aria-hidden', (!isActive).toString())
    })
  }

  const initializeSwiperForActiveTab = () => {
    const activePanel = document.querySelector('.maestria-gallery__tab-panel:not(.hidden)')
    if (!activePanel) {
      return
    }

    const swiperContainer = activePanel.querySelector('.gallery-swiper')
    if (!swiperContainer) {
      return
    }

    const categoriaId = activePanel.getAttribute('data-categoria-id')

    if (window.maestriaGallerySwipers[categoriaId] && typeof window.maestriaGallerySwipers[categoriaId].destroy === 'function') {
      window.maestriaGallerySwipers[categoriaId].destroy(true, true)
      delete window.maestriaGallerySwipers[categoriaId]
    }

    initializeSwiper(categoriaId, swiperContainer)
  }

  const initializeSwiper = (categoriaId, container) => {
    const slides = container.querySelectorAll('.maestria-gallery__slide')
    const totalSlides = slides.length

    if (!window.Swiper) {
      return
    }

    if (totalSlides === 0) {
      return
    }

    const swiperConfig = {
      loop: false,
      spaceBetween: 20,
      watchOverflow: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: totalSlides > 1,

      pagination: {
        el: container.querySelector('.maestria-gallery__pagination'),
        clickable: true,
        dynamicBullets: false,
        renderBullet: function (index, className) {
          return `<span class="${className}" aria-label="Ir a slide ${index + 1}"></span>`
        }
      },

      navigation: {
        nextEl: container.querySelector('.maestria-gallery__next'),
        prevEl: container.querySelector('.maestria-gallery__prev'),
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        576: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 20
        },
        768: {
          slidesPerView: Math.min(2, totalSlides),
          spaceBetween: 20
        },
        1024: {
          slidesPerView: Math.min(3, totalSlides),
          spaceBetween: 25
        },
        1280: {
          slidesPerView: Math.min(4, totalSlides),
          spaceBetween: 25
        }
      },

      on: {
        init: function () {
          updateNavigationVisibility(this, totalSlides, container)
          updatePaginationVisibility(this, totalSlides, container)
          updateButtonStates(this, container)
        },
        update: function () {
          updateNavigationVisibility(this, totalSlides, container)
          updatePaginationVisibility(this, totalSlides, container)
          updateButtonStates(this, container)
        },
        resize: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides, container)
            updatePaginationVisibility(this, totalSlides, container)
            updateButtonStates(this, container)
          }, 100)
        },
        breakpoint: function () {
          setTimeout(() => {
            updateNavigationVisibility(this, totalSlides, container)
            updatePaginationVisibility(this, totalSlides, container)
            updateButtonStates(this, container)
          }, 150)
        },
        slideChange: function () {
          updateButtonStates(this, container)
        },
        reachBeginning: function () {
          updateButtonStates(this, container)
        },
        reachEnd: function () {
          updateButtonStates(this, container)
        }
      }
    }

    try {
      window.maestriaGallerySwipers[categoriaId] = new window.Swiper(container, swiperConfig)
    } catch (error) {
      console.error('Error creando swiper:', error)
    }
  }

  const updateNavigationVisibility = (swiper, totalSlides, container) => {
    const nextBtn = container.querySelector('.maestria-gallery__next')
    const prevBtn = container.querySelector('.maestria-gallery__prev')

    if (!nextBtn || !prevBtn) return

    const needsNavigation = totalSlides > 1

    if (needsNavigation) {
      nextBtn.classList.add('show-navigation')
      nextBtn.classList.remove('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'false')
      nextBtn.style.display = 'flex'
      nextBtn.style.visibility = 'visible'

      prevBtn.classList.add('show-navigation')
      prevBtn.classList.remove('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'false')
      prevBtn.style.display = 'flex'
      prevBtn.style.visibility = 'visible'

      updateButtonStates(swiper, container)
    } else {
      nextBtn.classList.remove('show-navigation')
      nextBtn.classList.add('swiper-button-hidden')
      nextBtn.setAttribute('aria-hidden', 'true')
      nextBtn.style.display = 'none'

      prevBtn.classList.remove('show-navigation')
      prevBtn.classList.add('swiper-button-hidden')
      prevBtn.setAttribute('aria-hidden', 'true')
      prevBtn.style.display = 'none'
    }
  }

  const updateButtonStates = (swiper, container) => {
    const nextBtn = container.querySelector('.maestria-gallery__next')
    const prevBtn = container.querySelector('.maestria-gallery__prev')

    if (!nextBtn || !prevBtn) return

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

    if (nextBtn.classList.contains('show-navigation')) {
      nextBtn.style.visibility = 'visible'
      nextBtn.style.display = 'flex'
    }
    if (prevBtn.classList.contains('show-navigation')) {
      prevBtn.style.visibility = 'visible'
      prevBtn.style.display = 'flex'
    }
  }

  const updatePaginationVisibility = (swiper, totalSlides, container) => {
    const pagination = container.querySelector('.maestria-gallery__pagination')
    if (!pagination) return

    if (totalSlides > 1) {
      pagination.style.display = 'flex'
    } else {
      pagination.style.display = 'none'
    }
  }

  const initializeAllSwipers = () => {
    const swiperContainers = document.querySelectorAll('.gallery-swiper')

    swiperContainers.forEach(container => {
      const panel = container.closest('.maestria-gallery__tab-panel')
      if (!panel) return

      const categoriaId = panel.getAttribute('data-categoria-id')

      if (!window.maestriaGallerySwipers[categoriaId]) {
        initializeSwiper(categoriaId, container)
      }
    })
  }

  const checkAndInit = () => {
    if (typeof window !== 'undefined') {
      initializeTabs()

      if (window.Swiper) {
        setTimeout(() => {
          initializeAllSwipers()
        }, 200)
      } else {
        setTimeout(checkAndInit, 300)
      }
    } else {
      setTimeout(checkAndInit, 300)
    }
  }

  let resizeTimeout
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      Object.keys(window.maestriaGallerySwipers).forEach(categoriaId => {
        const swiper = window.maestriaGallerySwipers[categoriaId]
        if (swiper && typeof swiper.update === 'function') {
          swiper.update()
        }
      })
    }, 250)
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInit)
  } else {
    checkAndInit()
  }
}
