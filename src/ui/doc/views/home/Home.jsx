// Doc
import ViewCodeCard from '@documentation/components/ViewCode/ViewCode.jsx'
// Library
import BlogArticles from '@library_institutional/views/blog-articles/Blog.component.jsx'
import blogStyles from '@library_institutional/views/blog-articles/blog.style.scss?raw'
import blogScript from '@library_institutional/views/blog-articles/blog.scripts.js'
import info from '@library_institutional/views/blog-articles/info.component.json'

const Home = () => {
  return (
    <>
      <ViewCodeCard sass={blogStyles} jsFn={blogScript} info={info}>
        <BlogArticles />
      </ViewCodeCard>
    </>
  )
}

export default Home
