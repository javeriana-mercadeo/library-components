export default function initAccordion() {
  // Sistema simple de logging
  const Logger = {
    debug: (msg, data = null) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔍 ${msg}`, data || '')
      }
    },
    success: msg => console.log(`✅ ${msg}`),
    warning: msg => console.warn(`⚠️ ${msg}`),
    error: msg => console.error(`❌ ${msg}`)
  }

  // Delay para asegurar que el DOM esté listo después del montaje
  setTimeout(() => {
    Logger.debug('Inicializando acordeón...')

    const buttons = document.querySelectorAll('.program-profile__accordion-button')
    const contents = document.querySelectorAll('.program-profile__content-item')

    if (buttons.length === 0 || contents.length === 0) {
      Logger.warning('No se encontraron botones o contenido del acordeón')
      return
    }

    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const contentId = this.getAttribute('data-content')
        const targetContent = document.getElementById(contentId)

        if (!targetContent) {
          Logger.error(`No se encontró el contenido con ID: ${contentId}`)
          return
        }

        // Ocultar todos los contenidos y desactivar botones
        contents.forEach(content => content.classList.add('hidden'))
        buttons.forEach(btn => btn.classList.remove('active'))

        // Mostrar el contenido seleccionado y activar el botón
        targetContent.classList.remove('hidden')
        this.classList.add('active')
      })
    })

    Logger.success('Acordeón inicializado correctamente')
  }, 100)
}
