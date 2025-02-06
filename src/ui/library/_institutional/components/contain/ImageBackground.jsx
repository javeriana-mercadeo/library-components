import PropTypes from 'prop-types'
import { v4 as uuid4 } from 'uuid'
import './imageBackground.scss'

const ImageBackground = ({ img, alt = 'imagen de fondo', className }) => {
  return (
    <lfr-editable id={uuid4()} class={className ? `image-background ${className}` : 'image-background'} type="image">
      <img src={img} alt={alt} />
    </lfr-editable>
  )
}

ImageBackground.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string
}

export default ImageBackground
