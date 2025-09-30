function initSplash() {
  const splash = document.getElementById('splash')

  if (splash) {
    let isHidden = false
    const codProgram = (typeof configuration !== 'undefined' && configuration?.['codeProgram']) || null // Tomada de liferay

    const hideSplash = () => {
      if (isHidden) return
      isHidden = true
      splash.classList.add('hidden')

      setTimeout(() => {
        splash.style.display = 'none'
      }, 300)
    }

    if (!codProgram) {
      setTimeout(() => {
        hideSplash()
      }, 1000)
    } else {
      // Escuchar el evento de datos cargados
      document.addEventListener('data_load-program', hideSplash, { once: true })

      // Si tiene código de programa pero no responde el evento en 3 segundos
      setTimeout(() => {
        hideSplash()
      }, 3000)
    }
  } else {
    console.warn('🚫 Elemento splash no encontrado')
  }
}

// Auto-ejecutar si no es un módulo Y está en el cliente
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash)
  } else {
    initSplash()
  }
}

// Exponer globalmente
if (typeof window !== 'undefined') {
  window.initSplash = initSplash
}

export default initSplash
