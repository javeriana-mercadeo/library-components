export const buttonColor = '#596773'

export const labImages = [
  {
    id: 1,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 2,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 3,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 4,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
    label: 'Nombre del Laboratorio'
  }
]

// Función helper para oscurecer un color
export const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt
  return '#' + (0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B)).toString(16).slice(1)
}

// Funciones de navegación
export const getNextSlide = (currentSlide, totalSlides) => {
  return currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
}

export const getPrevSlide = (currentSlide, totalSlides) => {
  return currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
}

// Función para obtener las imágenes actuales
export const getCurrentImages = (currentSlide, images) => {
  const firstImageIndex = currentSlide
  const secondImageIndex = (currentSlide + 1) % images.length

  return {
    firstImage: images[firstImageIndex],
    secondImage: images[secondImageIndex]
  }
}

// Estilos inline para los botones
export const getButtonStyle = color => ({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  margin: '0 0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  fontSize: '1.25rem'
})

export const navContainerStyle = {
  display: 'flex',
  marginTop: '1.5rem',
  position: 'relative',
  zIndex: 10
}
