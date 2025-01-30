import CardBlog from './components/CardBlog.jsx'
import dataBlogs from './data.json'

import './blogArticles.scss'
import App from './components/App.jsx'

const BlogArticles = () => {
  return (
    <main className="blog">
      {/* <section className="blog_container">
        <div className="blogs">
          <div className="separator" />

          <h2 className="title">Entérate de los últimos artículos de nuestra universidad</h2>
        </div>

        {dataBlogs.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </section> */}

      <App />
    </main>
  )
}

export default BlogArticles
