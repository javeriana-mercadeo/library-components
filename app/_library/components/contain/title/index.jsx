import PropTypes from 'prop-types'

const Title = ({ children, className, id }) => {
  return (
    <lfr-editable id={`title-${id}`} type="rich-text" className={className ? `title ${className}` : 'title'}>
      {children}
    </lfr-editable>
  )
}
Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default Title
