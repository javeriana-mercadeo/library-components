import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './paragraph.scss'

const Paragraph = ({ children, className }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" class={className ? `paragraph ${className}` : 'paragraph'}>
      {children}
    </lfr-editable>
  )
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Paragraph
