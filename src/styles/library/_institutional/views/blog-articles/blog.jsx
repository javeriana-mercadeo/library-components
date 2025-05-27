'use client'

import { useEffect, useState } from 'react'
import Title from '@library/_institutional/components/contain/title'
import Paragraph from '@library/_institutional/components/contain/paragraph'
import ImgBackground from '@library/_institutional/components/contain/imgBackground'
import CardArticleHorizontal from '@library/_institutional/components/cards/cardArticleHorizontal.jsx'

import CardBlog from './components/CardBlog.jsx'
import blogArticlesScript from './blog.scripts.js'
import background from './assets/background.png'
import newImg from './assets/blog3.webp'
import newImg2 from './assets/blog4.webp'
import './blog.style.scss'

const BlogArticles = () => {
  const name = 'BlogArticles'
  const [data, setData] = useState([])

  useEffect(() => {
    blogArticlesScript()

    fetch('/data/blogs.json')
      .then(response => response.json())
      .then(json => setData(json))
  }, [])

  return (
    <section className="blog">
      <article className="blog-header">
        <ImgBackground id={name} img={background} />
        <div className="blog-header-container">
          <div className="blog-header-content">
            <i className="ph ph-file-image"></i>
            <div className="divider" />
            <Title id={name}>Soy un título de la página principal de blogs</Title>
            <div className="divider" />
            <Paragraph id={name}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias nulla corporis sint exercitationem expedita quod eum cumque
              blanditiis quia, culpa laboriosam porro fugiat nam rem nostrum in, accusantium a quaerat.
            </Paragraph>
          </div>
        </div>
      </article>

      <article className="blog-important">
        <div className="blog-important-container">
          <div className="blog-slider">
            <div className="blog-slider__wrp swiper-wrapper">
              <CardArticleHorizontal
                data={{
                  img: newImg,
                  altImg: '',
                  date: '01/08/2024',
                  title: 'Tecnología Revolucionaria de Energía Limpia',
                  author: 'John Hernández',
                  profession: 'Ingeniero de Energía'
                }}>
                Un equipo de ingenieros ha desarrollado una nueva tecnología que permite la generación de energía limpia a partir del
                movimiento de las olas del mar. Esta innovación promete cambiar el panorama energético global.
              </CardArticleHorizontal>

              <CardArticleHorizontal
                data={{
                  img: newImg2,
                  altImg: '',
                  date: '15/02/2025',
                  title: 'Avances en Inteligencia Artificial Médica',
                  author: 'Laura Martínez',
                  profession: 'Especialista en IA y Salud'
                }}>
                Investigadores han desarrollado un nuevo algoritmo de inteligencia artificial capaz de diagnosticar enfermedades raras con
                una precisión sin precedentes, reduciendo los tiempos de detección y mejorando los tratamientos.
              </CardArticleHorizontal>
            </div>
            <div className="blog-slider__pagination"></div>
          </div>
        </div>
      </article>

      <div className="blog_container">
        {data.map(data => (
          <CardBlog key={data.id} data={data} />
        ))}
      </div>
    </section>
  )
}

export default BlogArticles
