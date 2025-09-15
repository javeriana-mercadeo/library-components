import { Button as Btn } from '@library/components'

const ModalContent = ({ id = 'modal', title, children, buttonText = 'Entendido', onClose }) => {
  return (
    <>
      <div className="content">
        <div className="content__header">
          <h2 className="content__title">
            <lfr-editable id={`${id}-title`} type="rich-text">
              {title || '¡Información Importante!'}
            </lfr-editable>
          </h2>
        </div>

        <div className="content__body">
          {children ? (
            children
          ) : (
            <lfr-editable id={`${id}-content`} type="rich-text">
              <p>
                Este es un modal básico diseñado para mostrar información importante de manera clara y directa.
                Perfecto para notificaciones, anuncios o contenido informativo que requiere la atención del usuario.
              </p>
              <p>
                El modal incluye un botón de cerrar y puede personalizarse completamente mediante el sistema de temas.
              </p>
            </lfr-editable>
          )}
        </div>

        <div className="content__footer">
          <Btn
            className="content-btn"
            color="primary"
            variant="solid"
            type="button"
            onClick={onClose}>
            <lfr-editable id={`${id}-button`} type="text">
              {buttonText}
            </lfr-editable>
          </Btn>
        </div>
      </div>
    </>
  )
}

export default ModalContent