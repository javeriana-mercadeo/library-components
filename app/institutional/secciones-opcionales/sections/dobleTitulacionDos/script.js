function scrollLogic() {
  const initializeScrollBehavior = () => {
    if (window.innerWidth <= 768) {
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
      return
    }

    scrollContainer.style.overflowY = 'auto'
    scrollContainer.style.overflowX = 'hidden'
    scrollContainer.style.height = '100%'
    scrollContainer.style.maxHeight = 'calc(100vh - 300px)'

    const handleWheel = e => {
      const isMouseOverRightColumn = rightColumn.contains(e.target)
      const deltaY = e.deltaY

      if (isMouseOverRightColumn) {
        return
      }

      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

      if (deltaY > 0 && !isAtBottom) {
        e.preventDefault()
        scrollContainer.scrollBy({
          top: deltaY * 2,
          behavior: 'auto'
        })
      }
    }

    const handleResize = () => {
      container.removeEventListener('wheel', handleWheel)
      setTimeout(() => {
        initializeScrollBehavior()
      }, 100)
    }

    if (window.scrollCleanup) {
      window.scrollCleanup()
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)

    window.scrollCleanup = () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
    }
  }

  const waitForElements = () => {
    let attempts = 0
    const maxAttempts = 20

    const checkElements = () => {
      attempts++
      const container = document.querySelector('#doble-titulacion-container')
      const rightColumn = document.querySelector('#right-column-scroll')
      const scrollContainer = document.querySelector('#scroll-container')

      if (container && rightColumn && scrollContainer) {
        initializeScrollBehavior()
      } else if (attempts < maxAttempts) {
        setTimeout(checkElements, 100)
      }
    }

    checkElements()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements)
  } else {
    waitForElements()
  }
}

export default scrollLogic
