import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './title.scss'

const Title = ({ children, className }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" class={className ? `title ${className}` : 'title'}>
      {children}
    </lfr-editable>
  )
}

Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Title
