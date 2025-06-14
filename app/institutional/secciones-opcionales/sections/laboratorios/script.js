const labSliderLogic = () => {
  // Configuración y datos
  const buttonColor = "#596773"
  const labSlides = [
    {
      id: 1,
      title: 'Laboratorio de Investigación Biomédica',
      description: 'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular. Desarrollamos investigaciones en genética, biología molecular y medicina regenerativa.',
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
      label: 'Lab. Biomédica'
    },
    {
      id: 2,
      title: 'Laboratorio de Ingeniería de Materiales',
      description: 'Especializado en el desarrollo y caracterización de nuevos materiales. Contamos con microscopios electrónicos, equipos de análisis térmico y sistemas de pruebas mecánicas avanzadas.',
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
      label: 'Lab. Materiales'
    },
    {
      id: 3,
      title: 'Laboratorio de Química Analítica',
      description: 'Enfocado en análisis cualitativos y cuantitativos de muestras complejas. Utilizamos cromatografía, espectrometría de masas y técnicas espectroscópicas avanzadas.',
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
      label: 'Lab. Química'
    },
    {
      id: 4,
      title: 'Laboratorio de Biotecnología',
      description: 'Dedicado al desarrollo de procesos biotecnológicos innovadores. Trabajamos en fermentación, cultivos celulares y producción de biomoléculas con aplicaciones industriales.',
      imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
      label: 'Lab. Biotecnología'
    }
  ]

  let currentSlide = 0

  // Función para oscurecer color
  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) - amt
    const G = (num >> 8 & 0x00FF) - amt
    const B = (num & 0x0000FF) - amt
    return "#" + (
      0x1000000 + 
      (R < 0 ? 0 : R) * 0x10000 + 
      (G < 0 ? 0 : G) * 0x100 + 
      (B < 0 ? 0 : B)
    ).toString(16).slice(1)
  }

  // Navegación del slider
  const nextSlide = () => {
    currentSlide = currentSlide === labSlides.length - 1 ? 0 : currentSlide + 1
    updateContent()
  }

  const prevSlide = () => {
    currentSlide = currentSlide === 0 ? labSlides.length - 1 : currentSlide - 1
    updateContent()
  }

  // Obtener slide actual
  const getCurrentSlide = () => {
    return labSlides[currentSlide]
  }

  // Obtener imágenes actuales basadas en el slide
  const getCurrentImages = () => {
    const firstImageIndex = currentSlide
    const secondImageIndex = (currentSlide + 1) % labSlides.length
    
    return {
      firstImage: labSlides[firstImageIndex],
      secondImage: labSlides[secondImageIndex]
    }
  }

  // Manejar efectos hover de los botones
  const handleButtonHover = (event, isHover) => {
    if (isHover) {
      event.currentTarget.style.backgroundColor = darkenColor(buttonColor, 20)
      event.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)'
    } else {
      event.currentTarget.style.backgroundColor = buttonColor
      event.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  }

  // Actualizar todo el contenido cuando cambie el slide
  const updateContent = () => {
    updateText()
    updateImages()
  }

  // Actualizar el texto del slide actual
  const updateText = () => {
    const currentSlideData = getCurrentSlide()
    const titleElement = document.querySelector('.lab-slider-text h3')
    const paragraphElement = document.querySelector('.lab-slider-text p')
    
    if (titleElement) {
      titleElement.textContent = currentSlideData.title
    }
    if (paragraphElement) {
      paragraphElement.textContent = currentSlideData.description
    }
  }

  // Actualizar las imágenes en el DOM cuando cambie el slide
  const updateImages = () => {
    const images = getCurrentImages()
    const imageContainers = document.querySelectorAll('.lab-slider-images .lab-image')
    const imageLabels = document.querySelectorAll('.lab-slider-images .image-label')
    
    if (imageContainers[0]) {
      imageContainers[0].src = images.firstImage.imageSrc
      imageContainers[0].alt = images.firstImage.label
    }
    if (imageLabels[0]) {
      imageLabels[0].textContent = images.firstImage.label
    }
    
    // Segunda imagen (solo en desktop)
    if (imageContainers[1]) {
      imageContainers[1].src = images.secondImage.imageSrc
      imageContainers[1].alt = images.secondImage.label
    }
    if (imageLabels[1]) {
      imageLabels[1].textContent = images.secondImage.label
    }
  }

  // Aplicar estilos iniciales a los botones
  const initializeButtons = () => {
    const buttons = document.querySelectorAll('.lab-slider-navigation .nav-button')
    buttons.forEach(button => {
      button.style.backgroundColor = buttonColor
      button.style.color = 'white'
      button.style.border = 'none'
      button.style.borderRadius = '50%'
      button.style.cursor = 'pointer'
      button.style.transition = 'all 0.3s ease'
      button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
      
      // Estilos responsivos
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

  // Manejar resize de ventana para estilos responsivos
  const handleResize = () => {
    initializeButtons()
  }

  // Inicialización cuando el DOM esté listo
  const initialize = () => {
    if (typeof document !== 'undefined') {
      initializeButtons()
      updateContent() // Actualizar tanto texto como imágenes
      
      // Agregar listener para resize
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize)
      }
    }
  }

  // Auto-inicializar si el DOM ya está listo
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize)
    } else {
      initialize()
    }
  }

  // API pública
  return {
    nextSlide,
    prevSlide,
    getCurrentSlide,
    getCurrentImages,
    handleButtonHover,
    initialize
  }
}

export default labSliderLogic