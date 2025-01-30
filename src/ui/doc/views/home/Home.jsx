import ViewCodeCard from '@documentation/partials/ViewCode/ViewCode.jsx'

import BlogArticles from '../../../library/_global/views/blog-articles/BlogArticles.jsx'
import BlogArticlesStyles from '../../../library/_global/views/blog-articles/blogArticles.scss'
import BlogArticlesScripts from '../../../library/_global/views/blog-articles/BlogArticles.js'

const Home = () => {
  return (
    <>
      <ViewCodeCard css={BlogArticlesStyles} js={BlogArticlesScripts}>
        <BlogArticles />
      </ViewCodeCard>

      <BlogArticles />
    </>
  )
}

export default Home
