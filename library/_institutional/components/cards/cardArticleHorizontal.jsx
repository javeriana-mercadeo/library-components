import BtnLink from '@library/_institutional/components/buttons/btnLink'
import Image from 'next/image'
import PropTypes from 'prop-types'

import './cardArticleHorizontal.scss'

const cardArticleHorizontal = ({ data, children }) => {
  const { img, altImg, date, title, author } = data
  return (
    <div className="blog-slider__item swiper-slide">
      <div className="blog-slider__img">
        <Image src={img} alt={altImg} />
      </div>
      <div className="blog-slider__content">
        <span className="blog-slider__code">
          <span className="slider__code-date">{date}</span>
        </span>
        <div className="blog-slider__title">{title}</div>
        <span className="blog-slider__code">{author}</span>
        <div className="blog-slider__text">{children}</div>
        <BtnLink id={author} link="#" className="blog-slider__button">
          Ver más
        </BtnLink>
      </div>
    </div>
  )
}

cardArticleHorizontal.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    altImg: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    profession: PropTypes.string
  }).isRequired,
  children: PropTypes.node
}

export default cardArticleHorizontal
