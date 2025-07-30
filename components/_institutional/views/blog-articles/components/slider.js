const slider = () => {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('🟠 Egresados] Cargando...')

    document.querySelectorAll('.slider__code-date').forEach(element => {
      const dateStr = element.textContent.trim()
      const [year, month, day] = dateStr.split('-').map(Number)

      const date = new Date(year, month - 1, day)

      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = date.toLocaleDateString('es-ES', options)

      element.textContent = formattedDate
    })

    console.log('🟢 Egresados] Cargado con éxito')
  })

  var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true
    }
  })
}

export default slider
