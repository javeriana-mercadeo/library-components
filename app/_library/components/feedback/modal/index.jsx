'use client'
import { useEffect } from 'react'
import script from './script.js'

/**
 * Modal - Componente reutilizable estilo Bootstrap para múltiples instancias
 *
 * @param {string} id - ID único del modal
 * @param {string} className - Clases adicionales para el overlay
 * @param {React.ReactNode} children - Contenido del modal
 * @param {React.ReactNode} trigger - Elemento que abre el modal
 * @param {boolean} autoOpen - Abrir automáticamente
 * @param {boolean} closeOnOverlayClick - Cerrar al click fuera del contenido
 * @param {boolean} closeOnEsc - Cerrar con tecla Escape
 * @param {boolean} showCloseButton - Mostrar botón X de cerrar
 * @param {Function} onOpen - Callback al abrir
 * @param {Function} onClose - Callback al cerrar
 * @param {('sm'|'md'|'lg'|'xl'|'full')} size - Tamaño del modal
 * @param {string} contentClassName - Clases para el contenido
 * @param {boolean} centered - Centrado verticalmente
 */
export default function Modal({
  id = 'modal',
  className = '',
  children,
  trigger,
  autoOpen = false,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  onOpen,
  onClose,
  size = 'md',
  contentClassName = '',
  centered = true,
  ...otherProps
}) {
  const modalId = `modal-${id}`
  const overlayId = `${modalId}-overlay`

  useEffect(() => {
    script()
  }, [])

  const overlayClasses = ['modal-overlay', !centered && 'modal-overlay-top', className].filter(Boolean).join(' ')

  const contentClasses = ['modal-content', size !== 'md' && `modal-content-${size}`, contentClassName].filter(Boolean).join(' ')

  const handleTriggerClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: overlayId } }))
    }
  }

  return (
    <>
      {trigger && (
        <div data-modal-trigger={overlayId} onClick={handleTriggerClick}>
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
        data-modal-on-open={onOpen ? 'callback' : undefined}
        data-modal-on-close={onClose ? 'callback' : undefined}
        {...otherProps}>
        <div className={contentClasses} onClick={e => e.stopPropagation()}>
          {showCloseButton && (
            <button type='button' className='modal-close-btn' aria-label='Cerrar modal' data-modal-close={overlayId}>
              <i className='ph ph-x' aria-hidden='true'></i>
            </button>
          )}
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </>
  )
}
