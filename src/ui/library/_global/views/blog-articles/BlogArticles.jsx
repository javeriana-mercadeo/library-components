import { useEffect } from 'react'

import CardBlog from './components/CardBlog.jsx'
import blogArticlesScript from './BlogArticlesScript.js'
import { data } from './data.json'
import './blogArticlesStyle.scss'

const BlogArticles = () => {
  useEffect(() => {
    blogArticlesScript()
  }, [])

  return (
    <section className="blog">
      <div className="blog_container">
        {data.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </div>
    </section>
  )
}

export default BlogArticles
