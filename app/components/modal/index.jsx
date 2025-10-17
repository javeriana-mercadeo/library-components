'use client'
import { useEffect } from 'react'
import script from './script.js'
import { Button } from '@/app/components/index.js'

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
export function Modal({
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
  staticMode = false, // Nueva prop para modo estático (ViewComponent)
  ...otherProps
}) {
  const modalId = `modal-${id}`
  const overlayId = `${modalId}-overlay`

  useEffect(() => {
    // Solo ejecutar el script si NO estamos en modo estático
    if (!staticMode) {
      script()
    }
  }, [staticMode])

  const overlayClasses = ['puj-modal-overlay', !centered && 'puj-modal-overlay-top', className].filter(Boolean).join(' ')

  const contentClasses = ['puj-modal-content', size !== 'md' && `puj-modal-content-${size}`, contentClassName].filter(Boolean).join(' ')

  const handleTriggerClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId: overlayId } }))
    }
  }

  return (
    <>
      {trigger && (
        <div data-puj-modal-trigger={overlayId} onClick={handleTriggerClick}>
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
            <Button
              variant='flat'
              iconOnly={true}
              className='puj-modal-close-btn'
              aria-label='Cerrar modal'
              data-puj-modal-close={overlayId}
              isEditable={false}
              startIcon={<i className='ph ph-x' aria-hidden='true'></i>}></Button>
          )}
          <div className='puj-modal-body'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Modal
