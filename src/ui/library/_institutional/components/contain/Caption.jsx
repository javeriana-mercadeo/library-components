import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './caption.scss'

const Caption = ({ children }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" className="caption">
      {children}
    </lfr-editable>
  )
}

Caption.propTypes = {
  children: PropTypes.node
}

export default Caption
