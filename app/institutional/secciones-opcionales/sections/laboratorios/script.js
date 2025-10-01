/**
 * Lab Slider - Vanilla JavaScript
 * Slider de laboratorios para uso local sin dependencias de Liferay
 */

;(function () {
  'use strict'

  if (typeof window === 'undefined') {
    return
  }

  // Datos por defecto del slider
  const defaultSlides = [
    {
      id: 1,
      title: 'Laboratorio de Investigación Biomédica',
      description:
        'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular.',
      imageSrc: 'https://picsum.photos/400/300?random=1',
      label: 'Lab. Biomédica'
    },
    {
      id: 2,
      title: 'Laboratorio de Ingeniería de Materiales',
      description: 'Especializado en el desarrollo y caracterización de nuevos materiales. Contamos con equipos avanzados.',
      imageSrc: 'https://picsum.photos/400/300?random=2',
      label: 'Lab. Materiales'
    },
    {
      id: 3,
      title: 'Laboratorio de Química Analítica',
      description: 'Equipado con tecnología de vanguardia para análisis químicos y estudios de composición molecular.',
      imageSrc: 'https://picsum.photos/400/300?random=3',
      label: 'Lab. Química'
    }
  ]

  function createLabSlider(config = {}) {
    let slides = []
    let currentSlide = 0
    let isInitialized = false
    let isAnimating = false

    const settings = {
      containerSelector: config.containerSelector || '.lab-slider',
      animationDuration: config.animationDuration || 400,
      autoPlay: config.autoPlay || false,
      autoPlayInterval: config.autoPlayInterval || 5000,
      ...config
    }

    let autoPlayTimer = null

    // Inicializa las slides desde configuración o datos externos
    function initializeSlides() {
      if (config.slides && Array.isArray(config.slides) && config.slides.length > 0) {
        slides = [...config.slides]
      } else if (window.labSlides && Array.isArray(window.labSlides) && window.labSlides.length > 0) {
        slides = [...window.labSlides]
      } else {
        slides = [...defaultSlides]
      }
    }

    // Actualiza las slides dinámicamente
    function updateSlideData(newSlides) {
      if (Array.isArray(newSlides) && newSlides.length > 0) {
        slides = [...newSlides]
        currentSlide = 0

        if (isInitialized) {
          updateContentWithAnimation()
        }
        return true
      }
      return false
    }

    // Espera a que un elemento esté disponible en el DOM
    function waitForElement(selector, maxAttempts = 10, interval = 100) {
      return new Promise((resolve, reject) => {
        let attempts = 0

        function check() {
          attempts++
          const element = document.querySelector(selector)

          if (element) {
            resolve(element)
          } else if (attempts >= maxAttempts) {
            reject(new Error(`Element not found: ${selector}`))
          } else {
            setTimeout(check, interval)
          }
        }

        check()
      })
    }

    function nextSlide() {
      if (!isInitialized || slides.length === 0 || isAnimating) {
        return
      }

      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      updateContentWithAnimation()
      resetAutoPlay()
    }

    function prevSlide() {
      if (!isInitialized || slides.length === 0 || isAnimating) {
        return
      }

      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      updateContentWithAnimation()
      resetAutoPlay()
    }

    function goToSlide(index) {
      if (!isInitialized || slides.length === 0 || isAnimating) {
        return
      }

      if (index >= 0 && index < slides.length) {
        currentSlide = index
        updateContentWithAnimation()
        resetAutoPlay()
      }
    }

    function getCurrentSlide() {
      return slides.length > 0 ? slides[currentSlide] : null
    }

    function getCurrentImages() {
      if (slides.length === 0) return { firstImage: null, secondImage: null }

      const firstImageIndex = currentSlide
      const secondImageIndex = (currentSlide + 1) % slides.length

      return {
        firstImage: slides[firstImageIndex],
        secondImage: slides[secondImageIndex]
      }
    }

    function updateContentWithAnimation() {
      if (isAnimating) return

      try {
        isAnimating = true

        const sliderContent = document.querySelector(`${settings.containerSelector} .lab-slider-content`)
        const sliderText = document.querySelector(`${settings.containerSelector} .lab-slider-text`)
        const sliderImages = document.querySelector(`${settings.containerSelector} .lab-slider-images`)

        if (!sliderContent) {
          updateContent()
          isAnimating = false
          return
        }

        const elementsToAnimate = [sliderContent]
        if (sliderText) elementsToAnimate.push(sliderText)
        if (sliderImages) elementsToAnimate.push(sliderImages)

        elementsToAnimate.forEach(element => {
          element.classList.remove('lab-slider-transition')
        })

        void sliderContent.offsetWidth

        elementsToAnimate.forEach(element => {
          element.classList.add('lab-slider-transition')
        })

        updateContent()

        setTimeout(() => {
          elementsToAnimate.forEach(element => {
            element.classList.remove('lab-slider-transition')
          })
          isAnimating = false
        }, settings.animationDuration + 50)
      } catch (error) {
        console.error('Error updating content with animation:', error)
        isAnimating = false
      }
    }

    function updateContent() {
      try {
        updateText()
        updateImages()
        updateIndicators()
      } catch (error) {
        console.error('Error updating content:', error)
      }
    }

    function updateText() {
      const currentSlideData = getCurrentSlide()
      if (!currentSlideData) return

      const titleSelectors = [
        `${settings.containerSelector} [data-slide-title]`,
        `${settings.containerSelector} .slide-title`,
        `${settings.containerSelector} .subtitle-lab`
      ]

      const descriptionSelectors = [
        `${settings.containerSelector} [data-slide-description]`,
        `${settings.containerSelector} .slide-description`,
        `${settings.containerSelector} .paragraph-lab`
      ]

      let titleElement = null
      for (const selector of titleSelectors) {
        titleElement = document.querySelector(selector)
        if (titleElement) break
      }

      if (titleElement) {
        titleElement.textContent = currentSlideData.title
      }

      let paragraphElement = null
      for (const selector of descriptionSelectors) {
        paragraphElement = document.querySelector(selector)
        if (paragraphElement) break
      }

      if (paragraphElement) {
        paragraphElement.textContent = currentSlideData.description
      }
    }

    function updateImages() {
      const images = getCurrentImages()
      if (!images.firstImage) return

      const imageContainers = document.querySelectorAll(`${settings.containerSelector} .lab-image`)
      const imageLabels = document.querySelectorAll(`${settings.containerSelector} .image-label`)

      if (imageContainers[0] && images.firstImage.imageSrc) {
        imageContainers[0].src = images.firstImage.imageSrc
        imageContainers[0].alt = images.firstImage.label || 'Laboratorio'
      }
      if (imageLabels[0]) {
        imageLabels[0].textContent = images.firstImage.label || 'Lab'
      }

      if (imageContainers[1] && images.secondImage?.imageSrc) {
        imageContainers[1].src = images.secondImage.imageSrc
        imageContainers[1].alt = images.secondImage.label || 'Laboratorio'
      }
      if (imageLabels[1] && images.secondImage) {
        imageLabels[1].textContent = images.secondImage.label || 'Lab'
      }
    }

    function updateIndicators() {
      const indicators = document.querySelectorAll(`${settings.containerSelector} .slider-indicator`)

      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active')
        } else {
          indicator.classList.remove('active')
        }
      })
    }

    function createIndicators() {
      const container = document.querySelector(`${settings.containerSelector} .slider-indicators`)

      if (!container || slides.length === 0) return

      container.innerHTML = ''

      slides.forEach((_, index) => {
        const indicator = document.createElement('button')
        indicator.className = 'slider-indicator'
        indicator.setAttribute('aria-label', `Ir a slide ${index + 1}`)

        if (index === currentSlide) {
          indicator.classList.add('active')
        }

        indicator.addEventListener('click', () => goToSlide(index))
        container.appendChild(indicator)
      })
    }

    function initializeButtons() {
      const buttons = document.querySelectorAll(`${settings.containerSelector} .nav-button`)

      buttons.forEach(button => {
        button.style.border = 'none'
        button.style.borderRadius = '50%'
        button.style.cursor = 'pointer'
        button.style.transition = 'all 0.3s ease'
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'

        if (window.innerWidth <= 768) {
          button.style.width = '32px'
          button.style.height = '32px'
          button.style.fontSize = '18px'
        } else {
          button.style.width = '40px'
          button.style.height = '40px'
          button.style.fontSize = '20px'
        }
      })
    }

    function bindEvents() {
      const prevButton = document.querySelector(`${settings.containerSelector} .nav-button.prev`)
      const nextButton = document.querySelector(`${settings.containerSelector} .nav-button.next`)

      if (prevButton) {
        prevButton.onclick = null
        prevButton.addEventListener('click', e => {
          e.preventDefault()
          e.stopImmediatePropagation()
          prevSlide()
        })
      }

      if (nextButton) {
        nextButton.onclick = null
        nextButton.addEventListener('click', e => {
          e.preventDefault()
          e.stopImmediatePropagation()
          nextSlide()
        })
      }

      // Soporte para teclado
      document.addEventListener('keydown', handleKeyboard)
    }

    function handleKeyboard(e) {
      if (!isInitialized) return

      const container = document.querySelector(settings.containerSelector)
      if (!container || !container.matches(':hover')) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      }
    }

    function handleResize() {
      if (isInitialized) {
        initializeButtons()
      }
    }

    function startAutoPlay() {
      if (!settings.autoPlay) return

      stopAutoPlay()
      autoPlayTimer = setInterval(() => {
        nextSlide()
      }, settings.autoPlayInterval)
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
      }
    }

    function resetAutoPlay() {
      if (settings.autoPlay) {
        startAutoPlay()
      }
    }

    async function initialize() {
      try {
        initializeSlides()

        await waitForElement(settings.containerSelector, 10, 200)

        initializeButtons()
        createIndicators()
        updateContent()
        bindEvents()

        window.removeEventListener('resize', handleResize)
        window.addEventListener('resize', handleResize)

        if (settings.autoPlay) {
          startAutoPlay()
        }

        isInitialized = true
        return true
      } catch (error) {
        console.error('Error initializing slider:', error)
        return false
      }
    }

    function cleanup() {
      try {
        isInitialized = false
        isAnimating = false
        stopAutoPlay()
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('keydown', handleKeyboard)
      } catch (error) {
        console.error('Error cleaning up:', error)
      }
    }

    return {
      nextSlide,
      prevSlide,
      goToSlide,
      getCurrentSlide,
      getCurrentImages,
      initialize,
      cleanup,
      updateSlideData,
      startAutoPlay,
      stopAutoPlay,
      isInitialized: () => isInitialized,
      getSlides: () => [...slides],
      getCurrentIndex: () => currentSlide,
      getSlidesCount: () => slides.length
    }
  }

  // Auto-inicialización si existe el contenedor
  function autoInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.lab-slider')
        if (container && !window.labSliderInstance) {
          window.labSliderInstance = createLabSlider()
          window.labSliderInstance.initialize()
        }
      })
    } else {
      const container = document.querySelector('.lab-slider')
      if (container && !window.labSliderInstance) {
        window.labSliderInstance = createLabSlider()
        window.labSliderInstance.initialize()
      }
    }
  }

  autoInit()

  // API pública
  const LabSliderAPI = {
    create: createLabSlider,
    init: config => {
      const instance = createLabSlider(config)
      instance.initialize()
      return instance
    }
  }

  // Exports
  if (typeof window !== 'undefined') {
    window.LabSlider = LabSliderAPI
    window.createLabSlider = createLabSlider
  }

  return LabSliderAPI
})()

export default LabSliderAPI
export { createLabSlider }
