import ViewCodeCard from '@documentation/partials/ViewCode/ViewCode.jsx'
import BlogArticles from '@library-global/views/blog-articles/BlogArticles.jsx'
import BlogArticlesStyles from '@library-global/views/blog-articles/blogArticlesStyle.scss?raw'
import BlogArticlesScripts from '@library-global/views/blog-articles/BlogArticlesScript.js'
import { info } from '@library-global/views/blog-articles/data.json'

const Home = () => {
  return (
    <>
      <ViewCodeCard sass={BlogArticlesStyles} jsFn={BlogArticlesScripts} info={info}>
        <BlogArticles />
      </ViewCodeCard>
    </>
  )
}

export default Home
