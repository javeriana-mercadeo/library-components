import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './caption.scss'

const Caption = ({ children, className }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" class={className ? `caption ${className}` : 'caption'}>
      {children}
    </lfr-editable>
  )
}

Caption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Caption
