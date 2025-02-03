import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './title.scss'

const Title = ({ children }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" className="title">
      {children}
    </lfr-editable>
  )
}

Title.propTypes = {
  children: PropTypes.node
}

export default Title
