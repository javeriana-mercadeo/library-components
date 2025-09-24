import PropTypes from 'prop-types'

const ImgBackground = ({ img, alt = 'imagen de fondo', className, id }) => {
  return (
<<<<<<< HEAD
    <lfr-editable id={`image-background-${id}`} className={className ? `image-background ${className}` : 'image-background'} type="image">
=======
    <lfr-editable id={`image-background-${id}`} className={className ? `image-background ${className}` : 'image-background'} type='image'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
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
