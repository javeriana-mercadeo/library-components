import { Link } from '@heroui/react'
import PropTypes from 'prop-types'

const CardBlog = ({ data }) => {
  const { id, title, description, image } = data
  const img = image ? new URL(`../assets/${image}`, import.meta.url).href : ''

  return (
    <article className="card_blog">
      <figure style={{ backgroundImage: `url(${img})` }}>
        <Link to={`/blog/${id}`}>Ver más</Link>
      </figure>

      <div>
        <h2>
          <Link to={`/blog/${id}`}>{title}</Link>
        </h2>
        <p>{description}</p>
      </div>
    </article>
  )
}

CardBlog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
}

export default CardBlog
