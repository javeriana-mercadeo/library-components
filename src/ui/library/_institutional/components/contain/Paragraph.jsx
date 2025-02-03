import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './paragraph.scss'

const Paragraph = ({ children }) => {
  return (
    <lfr-editable id={uuid4()} type="rich-text" className="paragraph">
      {children}
    </lfr-editable>
  )
}

Paragraph.propTypes = {
  children: PropTypes.node
}

export default Paragraph
