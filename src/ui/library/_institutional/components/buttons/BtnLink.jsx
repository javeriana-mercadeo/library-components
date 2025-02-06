import { v4 as uuid4 } from 'uuid'
import PropTypes from 'prop-types'

import './btnLink.scss'

const BtnLink = ({ children = 'Ver más', className, link = '#' }) => {
  return (
    <div className={`btn btn-link ${className}`}>
      <lfr-editable id={uuid4()} type="rich-text">
        <a href={link}>{children}</a>
      </lfr-editable>
    </div>
  )
}

BtnLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.string
}

export default BtnLink
