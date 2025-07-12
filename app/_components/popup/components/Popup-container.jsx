import './popup-container.scss'

const Popup = ({ id, children, onClose }) => {
  return (
    <>
      <div id={id} className="popup-overlay">
        <div className="popup-content">
          <button className="popup-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Popup


