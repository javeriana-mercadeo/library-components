import './popup-container.scss'

const Popup = ({ id, children, onClose }) => {
  return (
    <>
      <div id={id} className="popup-overlay" >
        <div className="popup-content">
          <button className="popup-close close btn-primary btn-lg" type="button" data-dismiss="modal" aria-label="Close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Popup
