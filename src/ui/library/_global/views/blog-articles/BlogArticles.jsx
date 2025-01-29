import CardBlog from './components/CardBlog.jsx'
import dataBlogs from './data.json'

import './blogArticles.scss'

const BlogArticles = () => {
  return (
    <main className="blog">
      <section id="initialblog" className="blog_background">
        <h1>BLOG</h1>
      </section>

      <section className="blog_container">
        <div className="blogs">
          <div className="separator" />

          <h2 className="title">Entérate de los últimos artículos de nuestra universidad</h2>
        </div>

        {dataBlogs.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </section>

      <div className="p-10">
        <div className="max-w-sm overflow-hidden rounded shadow-lg">
          <img className="w-full" src="https://source.unsplash.com/random/?Mountain/" alt="Mountain" />
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">Mountain</div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #photography
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">#travel</span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
          </div>
          <div className="px-6 py-4">
            <button className="mr-4 mb-2 hover:bg-red-300 border-red-300 w-1/3 border border-solid rounded-full bg-white py-2 hover:text-white lg:w-full">
              Read More
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
                href="#"
                tabindex="-1"
                aria-disabled="true">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#">
                1
              </a>
            </li>
            <li className="page-item active">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                href="#">
                2 <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default BlogArticles
