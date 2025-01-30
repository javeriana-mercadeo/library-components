import CardBlog from './components/CardBlog.jsx'
import dataBlogs from './data.json'

import './blogArticles.scss'

const BlogArticles = () => {
  return (
    <main className="blog">
      <section className="blog_container">
        {dataBlogs.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </section>
    </main>
  )
}

export default BlogArticles
