// Función única exportada por defecto para el scroll
export default function scrollLogic() {
  console.log('Scroll Logic iniciado')

  // Función principal que maneja todo el comportamiento de scroll
  const initializeScrollBehavior = () => {
    // Solo aplicar en desktop
    if (window.innerWidth <= 768) {
      console.log('Dispositivo móvil detectado, scroll deshabilitado')
      // En móvil, asegurar que no hay propiedades de scroll forzadas
      const scrollContainer = document.querySelector('#scroll-container')
      if (scrollContainer) {
        scrollContainer.style.overflow = 'visible'
        scrollContainer.style.height = 'auto'
        scrollContainer.style.maxHeight = 'none'
      }
      return
    }

    const container = document.querySelector('#doble-titulacion-container')
    const rightColumn = document.querySelector('#right-column-scroll')
    const scrollContainer = document.querySelector('#scroll-container')

    if (!container || !rightColumn || !scrollContainer) {
      console.warn('Elementos no encontrados para scroll:', {
        container: !!container,
        rightColumn: !!rightColumn,
        scrollContainer: !!scrollContainer
      })
      return
    }

    console.log('Elementos encontrados, configurando scroll...')

    // Configurar propiedades de scroll en el contenedor
    scrollContainer.style.overflowY = 'auto'
    scrollContainer.style.overflowX = 'hidden'
    scrollContainer.style.height = '100%'
    scrollContainer.style.maxHeight = 'calc(100vh - 300px)'

    // Función de manejo del wheel
    const handleWheel = (e) => {
      const isMouseOverRightColumn = rightColumn.contains(e.target)
      const deltaY = e.deltaY

      // Si el mouse está sobre la columna derecha, permitir scroll normal
      if (isMouseOverRightColumn) {
        console.log('Mouse sobre columna derecha, permitiendo scroll normal')
        return
      }

      // Obtener información de scroll
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

      console.log('Scroll info:', {
        scrollTop,
        scrollHeight,
        clientHeight,
        isAtBottom,
        deltaY
      })

      // Si hay scroll hacia abajo y no estamos al final
      if (deltaY > 0 && !isAtBottom) {
        e.preventDefault()
        scrollContainer.scrollBy({ 
          top: deltaY * 2, // Multiplicar para scroll más rápido
          behavior: 'auto' 
        })
        console.log('Scroll interceptado y aplicado')
      }
    }

    // Función de resize
    const handleResize = () => {
      console.log('Resize detectado')
      // Remover listener anterior
      container.removeEventListener('wheel', handleWheel)
      
      // Reinicializar después de un delay
      setTimeout(() => {
        initializeScrollBehavior()
      }, 100)
    }

    // Agregar event listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)

    console.log('Event listeners agregados')

    // Función de limpieza (exponer globalmente para cleanup)
    window.cleanupScrollLogic = () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      console.log('Scroll logic limpiado')
    }

    // Verificar que el scroll container tenga contenido suficiente
    setTimeout(() => {
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      
      console.log('Verificación de contenido:', {
        scrollHeight,
        clientHeight,
        hasScroll: scrollHeight > clientHeight
      })

      if (scrollHeight <= clientHeight) {
        console.warn('El contenido no es suficiente para activar scroll')
      } else {
        console.log('✅ Scroll activado correctamente')
      }
    }, 500)
  }

  // Función para esperar a que los elementos estén disponibles
  const waitForElements = () => {
    let attempts = 0
    const maxAttempts = 20

    const check = () => {
      attempts++
      const container = document.querySelector('#doble-titulacion-container')
      const rightColumn = document.querySelector('#right-column-scroll')
      const scrollContainer = document.querySelector('#scroll-container')

      if (container && rightColumn && scrollContainer) {
        console.log(`Elementos encontrados en intento ${attempts}`)
        initializeScrollBehavior()
      } else if (attempts < maxAttempts) {
        console.log(`Intento ${attempts}/${maxAttempts} - Esperando elementos...`)
        setTimeout(check, 100)
      } else {
        console.error('No se pudieron encontrar los elementos después de', maxAttempts, 'intentos')
      }
    }

    check()
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements)
  } else {
    waitForElements()
  }

  // Exponer función de debug globalmente
  window.debugScrollLogic = () => {
    const container = document.querySelector('#doble-titulacion-container')
    const rightColumn = document.querySelector('#right-column-scroll')
    const scrollContainer = document.querySelector('#scroll-container')

    console.log('Debug Scroll Logic:', {
      container: !!container,
      rightColumn: !!rightColumn,
      scrollContainer: !!scrollContainer,
      scrollHeight: scrollContainer?.scrollHeight,
      clientHeight: scrollContainer?.clientHeight,
      overflowY: scrollContainer ? getComputedStyle(scrollContainer).overflowY : 'N/A'
    })
  }

  console.log('Scroll Logic configurado. Usa window.debugScrollLogic() para debug')
}