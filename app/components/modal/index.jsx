'use client'
import { useScript } from '@hooks'
import { Button, Caption } from '@/app/components/index.js'

/**
 * Modal - Componente reutilizable estilo Bootstrap para múltiples instancias
 *
 * @description
 * Para escuchar eventos del modal, usa los eventos personalizados del DOM:
 * - 'modal:opened' - Se dispara cuando el modal se abre
 * - 'modal:closed' - Se dispara cuando el modal se cierra
 * - 'modal:footer-action' - Se dispara cuando se hace click en el botón del footer
 *
 * @example
 * // Escuchar eventos del modal
 * window.addEventListener('modal:opened', (e) => {
 *   if (e.detail.modalId === 'modal-mi-modal-overlay') {
 *     console.log('Modal abierto')
 *   }
 * })
 *
 * @param {string} id - ID único del modal
 * @param {string} className - Clases adicionales para el overlay
 * @param {React.ReactNode} children - Contenido del modal
 * @param {React.ReactNode} trigger - Elemento que abre el modal
 * @param {boolean} autoOpen - Abrir automáticamente
 * @param {boolean} closeOnOverlayClick - Cerrar al click fuera del contenido
 * @param {boolean} closeOnEsc - Cerrar con tecla Escape
 * @param {('sm'|'md'|'lg'|'xl'|'full')} size - Tamaño del modal
 * @param {string} contentClassName - Clases para el contenido
 * @param {boolean} centered - Centrado verticalmente
 * @param {string} title - Título del modal (obligatorio)
 * @param {Object} titleProps - Props adicionales para el componente Caption del título
 * @param {React.ReactNode|boolean} footerButton - Botón del footer (por defecto muestra "Continuar", false para ocultarlo, o componente personalizado)
 * @param {string} footerButtonText - Texto del botón por defecto del footer
 */
export function Modal({
  id = 'modal',
  className = '',
  children,
  trigger,
  autoOpen = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = 'md',
  contentClassName = '',
  centered = true,
  title = 'Título del Modal',
  titleProps = {},
  footerButton = true,
  footerButtonText = 'Continuar',
  ...otherProps
}) {
  const modalId = `modal-${id}`
  const overlayId = `${modalId}-overlay`
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  const overlayClasses = ['puj-modal-overlay', !centered && 'puj-modal-overlay-top', className].filter(Boolean).join(' ')

  const contentClasses = ['puj-modal-content', size !== 'md' && `puj-modal-content-${size}`, contentClassName].filter(Boolean).join(' ')

  // Renderizar el botón del footer
  const renderFooterButton = () => {
    if (footerButton === false) return null

    // Si se pasa un componente personalizado
    if (footerButton !== true && typeof footerButton !== 'boolean') {
      return footerButton
    }

    // Botón por defecto con data-attribute para que el script lo maneje
    return (
      <Button
        variant='solid'
        color='primary'
        isEditable={false}
        className='puj-modal-footer-btn'
        data-puj-modal-footer-btn={overlayId}>
        {footerButtonText}
      </Button>
    )
  }

  return (
    <>
      {trigger && (
        <div data-puj-modal-trigger={overlayId}>
          {trigger}
        </div>
      )}

      <div
        id={overlayId}
        className={overlayClasses}
        data-modal-id={overlayId}
        data-modal-auto-open={autoOpen}
        data-modal-close-on-overlay={closeOnOverlayClick}
        data-modal-close-on-esc={closeOnEsc}
        {...otherProps}>
        <div className={contentClasses}>
          {/* Header del modal con título y botón de cerrar */}
          <div className='puj-modal-header'>
            <Caption className='puj-modal-title' size='lg' bold={true} color='primary' isEditable={false} {...titleProps}>
              {title}
            </Caption>
            <Button
              variant='flat'
              iconOnly={true}
              className='puj-modal-close-btn'
              aria-label='Cerrar modal'
              data-puj-modal-close={overlayId}
              isEditable={false}
              startIcon={<i className='ph ph-x' aria-hidden='true'></i>}></Button>
          </div>

          {/* Cuerpo del modal */}
          <div className='puj-modal-body'>{children}</div>

          {/* Footer del modal con botón */}
          {footerButton !== false && <div className='puj-modal-footer'>{renderFooterButton()}</div>}
        </div>
      </div>
    </>
  )
}

export default Modal
