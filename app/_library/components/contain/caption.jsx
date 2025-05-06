import './caption.scss'
import PropTypes from 'prop-types'

const Caption = ({ children, className, id }) => {
  return (
    <lfr-editable id={`caption-${id || ''}`} type="rich-text" className={`caption ${className || ''}`}>
      {children}
    </lfr-editable>
  )
}
Caption.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default Caption
