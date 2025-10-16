import React from 'react'
import './styles.scss'

class AccesosDirectos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobile: false,
      isMenuExpanded: false,
      showShareModal: false,
      currentTheme: 'light',
      scaleLevel: 0,
      isGrayscaleActive: false
    }

    this.config = {
      breakpoints: { mobile: 768 },
      scaleSteps: [1, 1.1, 1.2],
      whatsappGeneral: '+573133912876'
    }

    this.notificationTimeout = null
  }

  componentDidMount() {
    this.loadPhosphorIcons()
    this.updateMobileState()
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleKeyPress)
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout)
    }
  }

  loadPhosphorIcons = () => {
    if (document.querySelector('link[href*="phosphor-icons"]')) {
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css'
    document.head.appendChild(link)
  }

  updateMobileState = () => {
    const isMobile = window.innerWidth <= this.config.breakpoints.mobile
    this.setState({
      isMobile: isMobile,
      isMenuExpanded: !isMobile
    })
  }

  handleResize = () => {
    this.updateMobileState()
  }

  handleKeyPress = e => {
    if (e.key === 'Escape' && this.state.showShareModal) {
      this.closeShareModal()
    }
  }

  showNotification = message => {
    const notification = document.createElement('div')
    notification.textContent = message
    notification.className = 'floating-menu-notification'
    notification.style.cssText =
      'position: fixed; top: 20px; right: 20px; background: #0066cc; color: white; ' +
      'padding: 12px 24px; border-radius: 8px; z-index: 10000; font-size: 14px; ' +
      'box-shadow: 0 4px 12px rgba(0,0,0,0.2); opacity: 0; transform: translateX(100%); ' +
      'transition: all 0.3s ease;'

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = '1'
      notification.style.transform = 'translateX(0)'
    }, 10)

    this.notificationTimeout = setTimeout(() => {
      notification.style.opacity = '0'
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  increaseFontSize = () => {
    const maxLevel = this.config.scaleSteps.length - 1

    if (this.state.scaleLevel < maxLevel) {
      const newLevel = this.state.scaleLevel + 1
      const newSize = 16 * this.config.scaleSteps[newLevel]
      document.documentElement.style.fontSize = newSize + 'px'

      this.setState({ scaleLevel: newLevel })
      this.showNotification('Fuente: ' + Math.round(this.config.scaleSteps[newLevel] * 100) + '%')
    } else {
      this.showNotification('Fuente en tamaño máximo')
    }
  }

  decreaseFontSize = () => {
    if (this.state.scaleLevel > 0) {
      const newLevel = this.state.scaleLevel - 1
      const newSize = 16 * this.config.scaleSteps[newLevel]
      document.documentElement.style.fontSize = newSize + 'px'

      this.setState({ scaleLevel: newLevel })
      this.showNotification('Fuente: ' + Math.round(this.config.scaleSteps[newLevel] * 100) + '%')
    } else {
      this.showNotification('Fuente en tamaño mínimo')
    }
  }

  toggleTheme = () => {
    const newTheme = this.state.currentTheme === 'light' ? 'dark' : 'light'
    document.body.classList.toggle('dark-theme', newTheme === 'dark')

    this.setState({ currentTheme: newTheme })
    this.showNotification('Tema: ' + (newTheme === 'dark' ? 'Oscuro' : 'Claro'))
  }

  toggleGrayscale = () => {
    const newGrayscale = !this.state.isGrayscaleActive
    document.documentElement.classList.toggle('grayscale', newGrayscale)

    this.setState({ isGrayscaleActive: newGrayscale })
    this.showNotification(newGrayscale ? 'Escala de grises activada' : 'Escala de grises desactivada')
  }

  openShareModal = () => {
    this.setState({ showShareModal: true })
    document.body.style.overflow = 'hidden'
  }

  closeShareModal = () => {
    this.setState({ showShareModal: false })
    document.body.style.overflow = ''
  }

  toggleMobileMenu = () => {
    if (!this.state.isMobile) return
    this.setState({ isMenuExpanded: !this.state.isMenuExpanded })
  }

  handleShare = type => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(document.title)

    switch (type) {
      case 'whatsapp':
        window.open('https://wa.me/?text=' + text + '%20' + url, '_blank')
        break
      case 'facebook':
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank')
        break
      case 'x':
        window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank')
        break
      case 'linkedin':
        window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank')
        break
      case 'email':
        const subject = encodeURIComponent('Interesante: ' + document.title)
        const body = encodeURIComponent('Te comparto este enlace: ' + window.location.href)
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body
        break
      case 'copy':
        this.copyToClipboard()
        break
      default:
        break
    }

    this.closeShareModal()
  }

  copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => this.showNotification('Enlace copiado'))
        .catch(() => this.fallbackCopyToClipboard())
    } else {
      this.fallbackCopyToClipboard()
    }
  }

  fallbackCopyToClipboard = () => {
    const textArea = document.createElement('textarea')
    textArea.value = window.location.href
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      this.showNotification('Enlace copiado')
    } catch (err) {
      this.showNotification('No se pudo copiar')
    }

    document.body.removeChild(textArea)
  }

  handleWhatsApp = e => {
    e.preventDefault()

    const message = encodeURIComponent(
      '¡Hola! Me interesa información.\n\n' + 'Página: ' + document.title + '\n' + 'Enlace: ' + window.location.href
    )
    const whatsappUrl = 'https://wa.me/' + this.config.whatsappGeneral.replace('+', '') + '?text=' + message

    window.open(whatsappUrl, '_blank')
  }

  getMenuClassName = () => {
    const { isMobile, isMenuExpanded } = this.state

    if (isMobile && isMenuExpanded) {
      return 'floating-menu mobile-expanded'
    } else if (isMobile && !isMenuExpanded) {
      return 'floating-menu collapsed'
    } else {
      return 'floating-menu'
    }
  }

  shouldShowElement = element => {
    const { isMobile, isMenuExpanded } = this.state

    if (!isMobile) return true
    return isMenuExpanded
  }

  render() {
    const { isMobile, isMenuExpanded, showShareModal, currentTheme } = this.state

    return (
      <div id='floating-menu-container' className='floating-menu-container'>
        <div id='floating-menu-main' className={this.getMenuClassName()}>
          {isMobile && !isMenuExpanded && (
            <div
              className='menu-toggle-button menu-item'
              onClick={this.toggleMobileMenu}
              title='Abrir menú de accesibilidad'
              tabIndex='0'
              role='button'
              aria-label='Abrir menú de accesibilidad'>
              <i className='ph ph-person'></i>
            </div>
          )}

          {isMobile && isMenuExpanded && (
            <div
              className='menu-close-button menu-item'
              onClick={this.toggleMobileMenu}
              title='Cerrar menú de accesibilidad'
              tabIndex='0'
              role='button'
              aria-label='Cerrar menú de accesibilidad'>
              <i className='ph ph-x'></i>
            </div>
          )}

          {this.shouldShowElement('increase') && (
            <div
              className='menu-item'
              onClick={this.increaseFontSize}
              title='Aumentar tamaño de fuente'
              aria-label='Aumentar tamaño de fuente'
              tabIndex='0'
              role='button'>
              <i className='ph ph-plus-circle'></i>
            </div>
          )}

          {this.shouldShowElement('decrease') && (
            <div
              className='menu-item'
              onClick={this.decreaseFontSize}
              title='Disminuir tamaño de fuente'
              aria-label='Disminuir tamaño de fuente'
              tabIndex='0'
              role='button'>
              <i className='ph ph-minus-circle'></i>
            </div>
          )}

          {this.shouldShowElement('theme') && (
            <div
              className='menu-item'
              onClick={this.toggleTheme}
              title='Cambiar tema'
              aria-label='Cambiar tema de color'
              tabIndex='0'
              role='button'>
              <i className={currentTheme === 'dark' ? 'ph ph-moon' : 'ph ph-sun'}></i>
            </div>
          )}

          {this.shouldShowElement('grayscale') && (
            <div
              className='menu-item'
              onClick={this.toggleGrayscale}
              title='Escala de grises'
              aria-label='Activar escala de grises'
              tabIndex='0'
              role='button'>
              <i className='ph ph-circle-half'></i>
            </div>
          )}

          {this.shouldShowElement('share') && (
            <div
              className='menu-item'
              onClick={this.openShareModal}
              title='Compartir página'
              aria-label='Abrir opciones para compartir'
              tabIndex='0'
              role='button'>
              <i className='ph ph-share-fat'></i>
            </div>
          )}
        </div>

        <div id='whatsapp-floating-button' className='whatsapp-floating-button'>
          <a
            href='#'
            className='menu-item whatsapp-button'
            onClick={this.handleWhatsApp}
            title='Contactar por WhatsApp'
            aria-label='Contactar por WhatsApp'
            tabIndex='0'
            role='button'>
            <i className='ph ph-whatsapp-logo'></i>
          </a>
        </div>

        {showShareModal && (
          <div
            id='share-modal-overlay'
            role='dialog'
            aria-modal='true'
            aria-labelledby='share-modal-title'
            className='share-modal-overlay share-modal-visible'>
            <div className='share-modal'>
              <div className='share-modal-header'>
                <p id='share-modal-title'>Compartir</p>
                <button className='share-modal-close' onClick={this.closeShareModal} aria-label='Cerrar modal de compartir' type='button'>
                  <i className='ph ph-x'></i>
                </button>
              </div>
              <div className='share-options'>
                <div className='share-option' onClick={() => this.handleShare('whatsapp')} tabIndex='0' role='button'>
                  <i className='ph ph-whatsapp-logo'></i>
                  <span>WhatsApp</span>
                </div>
                <div className='share-option' onClick={() => this.handleShare('facebook')} tabIndex='0' role='button'>
                  <i className='ph ph-facebook-logo'></i>
                  <span>Facebook</span>
                </div>
                <div className='share-option' onClick={() => this.handleShare('x')} tabIndex='0' role='button'>
                  <i className='ph ph-x-logo'></i>
                  <span>X</span>
                </div>
                <div className='share-option' onClick={() => this.handleShare('linkedin')} tabIndex='0' role='button'>
                  <i className='ph ph-linkedin-logo'></i>
                  <span>LinkedIn</span>
                </div>
                <div className='share-option' onClick={() => this.handleShare('email')} tabIndex='0' role='button'>
                  <i className='ph ph-paper-plane-tilt'></i>
                  <span>Correo</span>
                </div>
                <div className='share-option' onClick={() => this.handleShare('copy')} tabIndex='0' role='button'>
                  <i className='ph ph-copy'></i>
                  <span>Copiar Link</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div id='floating-menu-notifications' className='floating-menu-notifications'></div>
      </div>
    )
  }
}

export default AccesosDirectos
