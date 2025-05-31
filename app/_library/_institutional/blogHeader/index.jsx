'use client'

import Title from '@/app/library/components/contain/title'
import Paragraph from '@/app/library/components/contain/paragraph'
import ImgBackground from '@/app/library/components/contain/imgBackground'
import Container from '@/app/library/components/container/Container'

import './styles.scss'
import info from './info.json'

function BlogHeader() {
  return (
    <article className="blog-header">
      <ImgBackground id={info.name} img="https://www.javeriana.edu.co/recursosdb/d/info-prg/background-1" />

      <Container className="blog-header-container">
        <div className="blog-header-content">
          <i className="ph ph-file-image"></i>
          <div className="divider" />
          <Title id={info.name}>Soy un título de la página principal de blogs</Title>
          <div className="divider" />
          <Paragraph id={info.name}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias nulla corporis sint exercitationem expedita quod eum cumque
            blanditiis quia, culpa laboriosam porro fugiat nam rem nostrum in, accusantium a quaerat.
          </Paragraph>
        </div>
      </Container>
    </article>
  )
}

export default BlogHeader
