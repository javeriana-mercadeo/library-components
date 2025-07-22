export default () => {
  console.log('Footer script loaded')

  const updateCopyrightYear = () => {
    const copyrightElement = document.querySelector('#footer .footer__bottom p:not(.footer__info)')
    
    if (copyrightElement) {
      const currentYear = new Date().getFullYear()
      const copyrightText = `Copyright (c) ${currentYear} Pontificia Universidad Javeriana`
      
      if (copyrightElement.textContent !== copyrightText) {
        copyrightElement.textContent = copyrightText
        console.log(`Year updated to: ${currentYear}`)
      }
    } else {
      console.warn('Copyright element not found')
    }
  }

  const initializeFooter = () => {
    console.log('Initializing footer')
    updateCopyrightYear()
    setInterval(updateCopyrightYear, 60000)
  }

  if (document.readyState === 'loading') {
    console.log('DOM loading, waiting for DOMContentLoaded')
    document.addEventListener('DOMContentLoaded', initializeFooter)
  } else {
    console.log('DOM ready, executing immediately')
    initializeFooter()
  }
}