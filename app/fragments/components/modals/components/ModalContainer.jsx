import { Button as Btn } from '@library/components'

const ModalContainer = ({ id, children, onClose }) => {
  return (
    <>
      <div id={id} className="popup-overlay">
        <div className="popup-content">
          <Btn
            variant="light"
            className="popup-close close"
            aria-label="Close Modal"
            type="button"
            startIcon={<i className="ph ph-x"></i>}
            iconOnly
            onClick={onClose}>
            Cerrar
          </Btn>
          {children}
        </div>
      </div>
    </>
  )
}

export default ModalContainer