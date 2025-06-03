import PropTypes from 'prop-types'

import './style.scss'

const Paragraph = ({ children, className, id }) => {
  return (
    <lfr-editable id={`paragraph-${id}`} type="rich-text" className={className ? `paragraph ${className}` : 'paragraph'}>
      {children}
    </lfr-editable>
  )
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default Paragraph
