import React from 'react'
import './styles.scss'

import Container from '@library/components/container'
import Title from '@library/components/contain/title'

const Index = () => {
  return (
    <section className="btn-return">
      <Container>
        <a href="/institutional/helpPage/help" className="back-button">
          <i className="ph ph-arrow-bend-up-left"></i>
          <Title className="title-return"> Volver al programa</Title>
        </a>
      </Container>
    </section>
  )
}
export default Index
