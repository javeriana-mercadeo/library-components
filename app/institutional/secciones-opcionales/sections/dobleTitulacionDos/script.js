export default function scrollLogic() {
  console.log('Scroll Logic iniciado - Mobile First')

  const initializeScrollBehavior = () => {
    // Solo aplicar scroll personalizado en desktop
    if (window.innerWidth <= 768) {
      console.log('Dispositivo móvil - scroll nativo habilitado')
      
      // Asegurar que no hay propiedades de scroll forzadas en móvil
      const scrollContainer = document.querySelector('#scroll-container')
      if (scrollContainer) {
        scrollContainer.style.overflow = 'visible'
        scrollContainer.style.height = 'auto'
        scrollContainer.style.maxHeight = 'none'
      }
      return
    }

    console.log('Dispositivo desktop - configurando scroll personalizado')

    const container = document.querySelector('#doble-titulacion-container')
    const rightColumn = document.querySelector('#right-column-scroll')
    const scrollContainer = document.querySelector('#scroll-container')

    if (!container || !rightColumn || !scrollContainer) {
      console.warn('Elementos requeridos no encontrados:', {
        container: !!container,
        rightColumn: !!rightColumn,
        scrollContainer: !!scrollContainer
      })
      return
    }

    // Configurar propiedades de scroll para desktop
    scrollContainer.style.overflowY = 'auto'
    scrollContainer.style.overflowX = 'hidden'
    scrollContainer.style.height = '100%'
    scrollContainer.style.maxHeight = 'calc(100vh - 300px)'

    const handleWheel = (e) => {
      const isMouseOverRightColumn = rightColumn.contains(e.target)
      const deltaY = e.deltaY

      // Si el mouse está sobre la columna derecha, permitir scroll normal
      if (isMouseOverRightColumn) {
        console.log('Mouse sobre columna derecha, scroll normal')
        return
      }

      // Información de scroll
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

      console.log('Scroll interceptado:', {
        scrollTop,
        scrollHeight,
        clientHeight,
        isAtBottom,
        deltaY
      })

      // Interceptar scroll hacia abajo si no estamos al final
      if (deltaY > 0 && !isAtBottom) {
        e.preventDefault()
        scrollContainer.scrollBy({ 
          top: deltaY * 2,
          behavior: 'auto' 
        })
        console.log('Scroll aplicado a columna derecha')
      }
    }

    // Función de resize para reconfigurar
    const handleResize = () => {
      console.log('Resize detectado')
      // Limpiar listener anterior
      container.removeEventListener('wheel', handleWheel)
      
      // Reinicializar después de un delay
      setTimeout(() => {
        initializeScrollBehavior()
      }, 100)
    }

    // Limpiar listeners anteriores si existen
    if (window.scrollCleanup) {
      window.scrollCleanup()
    }

    // Agregar event listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)

    console.log('Event listeners agregados correctamente')

    // Función de limpieza
    window.scrollCleanup = () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      console.log('Scroll logic limpiado')
    }

    // Verificar contenido scrolleable
    setTimeout(() => {
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      
      console.log('Verificación de scroll:', {
        scrollHeight,
        clientHeight,
        hasScroll: scrollHeight > clientHeight
      })

      if (scrollHeight <= clientHeight) {
        console.warn('El contenido no es suficiente para activar scroll')
      } else {
        console.log('✅ Scroll configurado correctamente')
      }
    }, 500)
  }

  // Esperar a que los elementos estén disponibles
  const waitForElements = () => {
    let attempts = 0
    const maxAttempts = 20

    const checkElements = () => {
      attempts++
      const container = document.querySelector('#doble-titulacion-container')
      const rightColumn = document.querySelector('#right-column-scroll')
      const scrollContainer = document.querySelector('#scroll-container')

      if (container && rightColumn && scrollContainer) {
        console.log(`Elementos encontrados en intento ${attempts}`)
        initializeScrollBehavior()
      } else if (attempts < maxAttempts) {
        console.log(`Intento ${attempts}/${maxAttempts} - Esperando elementos...`)
        setTimeout(checkElements, 100)
      } else {
        console.error('No se pudieron encontrar los elementos después de', maxAttempts, 'intentos')
      }
    }

    checkElements()
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements)
  } else {
    waitForElements()
  }

  // Función de debug
  window.debugScrollLogic = () => {
    const container = document.querySelector('#doble-titulacion-container')
    const rightColumn = document.querySelector('#right-column-scroll')
    const scrollContainer = document.querySelector('#scroll-container')

    console.log('Debug Scroll Logic:', {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth <= 768,
      container: !!container,
      rightColumn: !!rightColumn,
      scrollContainer: !!scrollContainer,
      scrollHeight: scrollContainer?.scrollHeight,
      clientHeight: scrollContainer?.clientHeight,
      canScroll: scrollContainer ? scrollContainer.scrollHeight > scrollContainer.clientHeight : false,
      overflowY: scrollContainer ? getComputedStyle(scrollContainer).overflowY : 'N/A'
    })
  }

  console.log('Scroll Logic configurado. Debug: window.debugScrollLogic()')
}