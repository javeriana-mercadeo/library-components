import { useEffect } from 'react'
import Title from '@library/_institutional/components/contain/Title.jsx'
import Paragraph from '@library/_institutional/components/contain/Paragraph.jsx'
import Caption from '@library/_institutional/components/contain/Caption.jsx'

import CardBlog from './components/CardBlog.jsx'
import blogArticlesScript from './blog.scripts.js'
import data from './data.component.json'
import './blog.style..scss'

const BlogArticles = () => {
  useEffect(() => {
    blogArticlesScript()
  }, [])

  return (
    <section className="blog">
      <article className="blog_header">
        <Title>Soy un titulo de blog</Title>
        <Caption>Soy un subtítulo de blog</Caption>
        <Paragraph>Soy un párrafo de blog</Paragraph>
      </article>

      <div className="blog_container">
        {data.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default BlogArticles
