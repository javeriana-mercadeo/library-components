import PropTypes from 'prop-types'

const ImgBackground = ({ img, alt = 'imagen de fondo', className, id }) => {
  return (
    <lfr-editable id={`image-background-${id}`} className={className ? `image-background ${className}` : 'image-background'} type='image'>
      <img src={img} alt={alt} />
    </lfr-editable>
  )
}

ImgBackground.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string
}

export default ImgBackground
