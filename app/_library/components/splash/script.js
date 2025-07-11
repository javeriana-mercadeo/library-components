export default () => {
  const splash = document.getElementById('splash')

  if (splash) {
    let isHidden = false

    const hideSplash = () => {
      if (isHidden) return
      isHidden = true
      splash.classList.add('hidden')

      setTimeout(() => {
        splash.style.display = 'none'
      }, 500)
    }

    // Escuchar el evento de datos cargados
    document.addEventListener(
      'data_load-program',
      () => {
        hideSplash()
      },
      { once: true }
    )

    setTimeout(() => {
      hideSplash()
    }, 3000)
  } else {
    console.warn('🚫 Elemento splash no encontrado')
  }
}
