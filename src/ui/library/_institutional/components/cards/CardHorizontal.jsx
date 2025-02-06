import PropTypes from 'prop-types'

import BtnLink from '../buttons/BtnLink'

import './cardHorizontal.scss'

const CardHorizontal = ({ data, children }) => {
  const { img, altImg, date, title, author, profession } = data
  return (
    <div className="blog-slider__item swiper-slide">
      <div className="blog-slider__img">
        <img src={img} alt={altImg} />
      </div>
      <div className="blog-slider__content">
        <span className="blog-slider__code">
          <span className="slider__code-date">{date}</span>
        </span>
        <div className="blog-slider__title">{title}</div>
        <span className="blog-slider__code">{author}</span>
        <div className="blog-slider__text">{children}</div>
        <BtnLink link="#" className="blog-slider__button">
          Ver más
        </BtnLink>
      </div>
    </div>
  )
}

CardHorizontal.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string,
    altImg: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    profession: PropTypes.string
  }),
  children: PropTypes.node
}

export default CardHorizontal
