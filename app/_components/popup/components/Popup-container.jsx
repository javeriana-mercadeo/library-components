import { Button as Btn } from '@library/components'
import './popup-container.scss'

const Popup = ({ id, children, onClose }) => {
  return (
    <>
      <div id={id} className="popup-overlay">
        <div className="popup-content">
          {/* <button className="popup-close close btn-primary btn-lg" type="button" data-dismiss="modal" aria-label="Close" onClick={onClose}>
            &times;
          </button> */}

          <Btn
            variant="light"
            id="modal-close"
            className="popup-close close"
            aria-label="Close Popup"
            type="button"
            isEditable={false}
            startIcon={<i className="ph ph-x"></i>}
            iconOnly
            onClick={onClose}>
            &times;
          </Btn>
          {children}
        </div>
      </div>
    </>
  )
}

export default Popup
