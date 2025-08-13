const StudentSliderModule = (function () {
  'use strict'

  if (typeof window === 'undefined') {
    return function () {}
  }

  const SLIDER_CONFIG = {
    sliderId: 'student-slider',
    autoSlideInterval: 5000,
    manualNavigationDelay: 5000,
    touchSensitivity: 30,
    touchMaxVerticalMovement: 100,
    touchDebounce: 300
  }

  let sliderState = {
    currentSlide: 0,
    autoSlideInterval: null,
    studentsCount: 0,
    isManualNavigation: false,
    manualNavigationTimeout: null,
    isInitialized: false,
    lastTouchTime: 0
  }

<<<<<<< HEAD
  function getNextSlide(current, total) {
    return (current + 1) % total
  }

  function getPrevSlide(current, total) {
    return current === 0 ? total - 1 : current - 1
  }

  function getSlideClass(index, current, total) {
    if (index === current) return 'active'

    const nextIndex = (current + 1) % total
    const prevIndex = (current - 1 + total) % total
    const nextNextIndex = (current + 2) % total
    const prevPrevIndex = (current - 2 + total) % total

    if (index === nextIndex) return 'next'
    if (index === prevIndex) return 'prev'
    if (index === nextNextIndex) return 'next-next'
    if (index === prevPrevIndex) return 'prev-prev'

    return ''
  }

  function generateDots() {
    const dotsContainer = document.querySelector('.slider-dots')
    if (!dotsContainer) return

    dotsContainer.innerHTML = ''

    for (let i = 0; i < sliderState.studentsCount; i++) {
      const dot = document.createElement('div')
      dot.className = 'dot'
      if (i === sliderState.currentSlide) {
        dot.classList.add('active')
      }

      dot.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        goToSlide(i, true)
      }

      dotsContainer.appendChild(dot)
    }
  }

  function updateSlideClasses() {
    if (!sliderState.isInitialized) return

    try {
      const cards = document.querySelectorAll('.student-card')
      const dots = document.querySelectorAll('.slider-dots .dot')

      cards.forEach(function (card, index) {
        card.classList.remove('active', 'next', 'prev', 'next-next', 'prev-prev')
        const slideClass = getSlideClass(index, sliderState.currentSlide, sliderState.studentsCount)
        if (slideClass) {
          card.classList.add(slideClass)
        }
        void card.offsetHeight
      })

      dots.forEach(function (dot, index) {
        if (dot) {
          dot.classList.toggle('active', index === sliderState.currentSlide)
        }
      })
    } catch (error) {
      // Error silencioso
    }
  }

  function stopAutoSlide() {
    if (sliderState.autoSlideInterval) {
      clearInterval(sliderState.autoSlideInterval)
      sliderState.autoSlideInterval = null
    }
  }

  function startAutoSlide() {
    if (sliderState.isManualNavigation || !sliderState.isInitialized) return

    stopAutoSlide()
    sliderState.autoSlideInterval = setInterval(function () {
      nextSlide(false)
    }, SLIDER_CONFIG.autoSlideInterval)
  }

  function handleManualNavigation() {
    sliderState.isManualNavigation = true
    stopAutoSlide()

    if (sliderState.manualNavigationTimeout) {
      clearTimeout(sliderState.manualNavigationTimeout)
    }

    sliderState.manualNavigationTimeout = setTimeout(function () {
      sliderState.isManualNavigation = false
      startAutoSlide()
    }, SLIDER_CONFIG.manualNavigationDelay)
  }

  function nextSlide(isManual) {
    if (!sliderState.isInitialized) return

    if (isManual) {
      handleManualNavigation()
    } else if (sliderState.isManualNavigation) {
      return
    }

    sliderState.currentSlide = getNextSlide(sliderState.currentSlide, sliderState.studentsCount)
    updateSlideClasses()
  }

  function prevSlide(isManual) {
    if (!sliderState.isInitialized) return

    if (isManual) {
      handleManualNavigation()
    } else if (sliderState.isManualNavigation) {
      return
    }

    sliderState.currentSlide = getPrevSlide(sliderState.currentSlide, sliderState.studentsCount)
    updateSlideClasses()
  }

  function goToSlide(index, isManual) {
    if (!sliderState.isInitialized || index === sliderState.currentSlide) return

    if (isManual) {
      handleManualNavigation()
    } else if (sliderState.isManualNavigation) {
      return
    }

    sliderState.currentSlide = index
    updateSlideClasses()
  }

  function initStudentSlider() {
    const sliderContainer = document.getElementById(SLIDER_CONFIG.sliderId)
    if (!sliderContainer) {
      return false
    }

    const cards = document.querySelectorAll('.student-card')
    sliderState.studentsCount = cards.length

    if (sliderState.studentsCount === 0) {
      return false
    }

    generateDots()

    const prevButton = document.getElementById(SLIDER_CONFIG.sliderId + '-prev')
    const nextButton = document.getElementById(SLIDER_CONFIG.sliderId + '-next')

    if (prevButton && nextButton) {
      prevButton.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        prevSlide(true)
      }

      nextButton.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        nextSlide(true)
      }
    }

    const sliderContent = document.getElementById(SLIDER_CONFIG.sliderId + '-content') || sliderContainer
    if (sliderContent) {
      sliderContent.onmouseenter = stopAutoSlide
      sliderContent.onmouseleave = function () {
        if (!sliderState.isManualNavigation && sliderState.isInitialized) {
          startAutoSlide()
        }
      }
    }

    setupTouchEvents(sliderContent || sliderContainer)

    document.addEventListener('keydown', function (e) {
      const sliderRect = sliderContainer.getBoundingClientRect()
      const isVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0

      if (!isVisible) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide(true)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide(true)
      }
    })

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopAutoSlide()
        if (sliderState.manualNavigationTimeout) {
          clearTimeout(sliderState.manualNavigationTimeout)
        }
      } else if (!sliderState.isManualNavigation && sliderState.isInitialized) {
        startAutoSlide()
      }
    })

    sliderState.isInitialized = true
    updateSlideClasses()

    setTimeout(function () {
      if (sliderState.isInitialized) {
        startAutoSlide()
      }
    }, 1000)

    return true
  }

  function setupTouchEvents(touchArea) {
    if (!touchArea) return

    let touchData = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startTime: 0,
      isTouching: false,
      hasMoved: false
    }

    touchArea.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length !== 1) return

        const touch = e.touches[0]
        touchData = {
          startX: touch.clientX,
          startY: touch.clientY,
          currentX: touch.clientX,
          currentY: touch.clientY,
          startTime: Date.now(),
          isTouching: true,
          hasMoved: false
        }

        stopAutoSlide()
      },
      { passive: true }
    )

    touchArea.addEventListener(
      'touchmove',
      function (e) {
        if (!touchData.isTouching || e.touches.length !== 1) return

        const touch = e.touches[0]
        touchData.currentX = touch.clientX
        touchData.currentY = touch.clientY

        const deltaX = Math.abs(touchData.currentX - touchData.startX)
        const deltaY = Math.abs(touchData.currentY - touchData.startY)

        if (deltaX > 5 || deltaY > 5) {
          touchData.hasMoved = true
        }

        if (deltaX > deltaY && deltaX > SLIDER_CONFIG.touchSensitivity / 2) {
          e.preventDefault()
        }
      },
      { passive: false }
    )

    touchArea.addEventListener(
      'touchend',
      function (e) {
        if (!touchData.isTouching) return

        const touchEndTime = Date.now()
        const touchDuration = touchEndTime - touchData.startTime

        if (touchEndTime - sliderState.lastTouchTime < SLIDER_CONFIG.touchDebounce) {
          touchData.isTouching = false
          return
        }

        const deltaX = touchData.currentX - touchData.startX
        const deltaY = touchData.currentY - touchData.startY
        const absDeltaX = Math.abs(deltaX)
        const absDeltaY = Math.abs(deltaY)

        const isValidSwipe =
          touchData.hasMoved &&
          absDeltaX > SLIDER_CONFIG.touchSensitivity &&
          absDeltaX > absDeltaY &&
          absDeltaY < SLIDER_CONFIG.touchMaxVerticalMovement &&
          touchDuration < 1000

        if (isValidSwipe) {
          sliderState.lastTouchTime = touchEndTime

          if (deltaX > 0) {
            prevSlide(true)
          } else {
            nextSlide(true)
          }
        } else {
          setTimeout(function () {
            if (!sliderState.isManualNavigation && sliderState.isInitialized) {
              startAutoSlide()
            }
          }, 500)
        }

        touchData.isTouching = false
      },
      { passive: true }
    )

    touchArea.addEventListener(
      'touchcancel',
      function () {
        touchData.isTouching = false
        setTimeout(function () {
          if (!sliderState.isManualNavigation && sliderState.isInitialized) {
            startAutoSlide()
          }
        }, 500)
      },
      { passive: true }
    )
  }

  function tryInit() {
    if (sliderState.isInitialized) return

    const success = initStudentSlider()
    if (!success) {
      setTimeout(tryInit, 500)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit)
  } else {
    setTimeout(tryInit, 100)
  }

  if (typeof window.Liferay !== 'undefined' && window.Liferay.on) {
    window.Liferay.on('allPortletsReady', function () {
      setTimeout(tryInit, 200)
    })
  }

  if ('MutationObserver' in window) {
    const observer = new MutationObserver(function (mutations) {
      const sliderAdded = mutations.some(function (mutation) {
        return Array.from(mutation.addedNodes).some(function (node) {
          return (
            node.nodeType === 1 &&
            (node.id === SLIDER_CONFIG.sliderId || (node.querySelector && node.querySelector('#' + SLIDER_CONFIG.sliderId)))
          )
        })
      })

      if (sliderAdded && !sliderState.isInitialized) {
        observer.disconnect()
        setTimeout(tryInit, 300)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    setTimeout(function () {
      observer.disconnect()
    }, 10000)
  }

  // API pública
  const StudentSliderAPI = {
    init: initStudentSlider,
    next: function () {
      nextSlide(true)
    },
    prev: function () {
      prevSlide(true)
    },
    goTo: function (index) {
      goToSlide(index, true)
    },
    stop: stopAutoSlide,
    start: startAutoSlide,
    regenerateDots: generateDots
  }

  // Asignar a window para compatibilidad con Liferay
  if (typeof window !== 'undefined') {
    window.StudentSlider = StudentSliderAPI
  }

  // Función ejecutable que inicializa automáticamente
  const executeScript = function () {
    tryInit()
    return StudentSliderAPI
  }

  // Export para módulos ES6 y CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = executeScript
    module.exports.default = executeScript
    module.exports.StudentSlider = StudentSliderAPI
  }

  return executeScript
})()

// Export default para ES6 modules
export default StudentSliderModule
=======
  return ''
}
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
