// Doc
import ViewCodeCard from '@documentation/components/ViewCode/ViewCode.jsx'
// Library
import BlogArticles from '@library/_institutional/views/blog-articles/Blog.component.jsx'
import blogStyles from '@library-institutional/views/blog-articles/blog.style..scss?raw'
import blogScript from '@library/_institutional/views/blog-articles/blog.scripts.js'
import info from '@library-institutional/views/blog-articles/info.component.json'

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
