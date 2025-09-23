// Datos de estudiantes
export const studentsData = [
  {
    name: 'Elena Ramírez',
    position: 'Chief Innovation Officer',
    company: 'Tesla',
    logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
  },
  {
    name: 'Ricardo Fernández',
    position: 'Vicepresidente de Estrategia Global',
    company: 'Google',
    logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-dos'
  },
  {
    name: 'Elena Ramírez',
    position: 'Chief Innovation Officer',
    company: 'Tesla',
    logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/tesla',
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-uno'
  },
  {
    name: 'Ricardo Fernández',
    position: 'Vicepresidente de Estrategia Global',
    company: 'Google',
    logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/google',
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj3'
  },
  {
    name: 'Valeria López',
    position: 'Directora de Desarrollo de Negocios',
    company: 'Microsoft',
    logo: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/microsoft',
    image: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/estudiante-tres'
  }
]

// Funciones para el manejo del slider
export const getNextSlide = (currentSlide, totalSlides) => {
  return (currentSlide + 1) % totalSlides
}

export const getPrevSlide = (currentSlide, totalSlides) => {
  return currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
}

export const getSlideClass = (index, currentSlide, totalSlides) => {
  if (index === currentSlide) {
    return 'active'
  }

  const nextIndex = (currentSlide + 1) % totalSlides
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
  const nextNextIndex = (currentSlide + 2) % totalSlides
  const prevPrevIndex = (currentSlide - 2 + totalSlides) % totalSlides

  if (index === nextIndex) return 'next'
  if (index === prevIndex) return 'prev'
  if (index === nextNextIndex) return 'next-next'
  if (index === prevPrevIndex) return 'prev-prev'

  return ''
}
