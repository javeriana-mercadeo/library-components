// script.js
export default () => {
  const faqItems = document.querySelectorAll('.faq__item')

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question')
    const icon = item.querySelector('.faq__icon')

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active')

      // Cerrar todos los elementos antes de abrir uno nuevo
      faqItems.forEach(el => {
        el.classList.remove('active')
        const elIcon = el.querySelector('.faq__icon')
        elIcon.innerHTML = '<i class="ph ph-caret-down"></i>'
      })

      // Si no estaba activo, activarlo
      if (!isActive) {
        item.classList.add('active')
        icon.innerHTML = '<i class="ph ph-caret-up"></i>'
      }
    })
  })

  // Funcionalidad opcional para las sub-preguntas
  const subQuestions = document.querySelectorAll('.faq__sub-question')
  subQuestions.forEach(subQuestion => {
    subQuestion.addEventListener('click', function () {
      // Aquí puedes agregar funcionalidad adicional para las sub-preguntas
      console.log('Sub-pregunta clickeada:', this.textContent)
    })
  })
}
