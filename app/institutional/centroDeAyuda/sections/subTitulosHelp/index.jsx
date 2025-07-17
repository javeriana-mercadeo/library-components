import React from 'react'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
import './styles.scss'

const TitleSection = () => {
  return (
    <Container className="subTitulosHelp">
    <div >
      <Title level="h3" className="subTitleHelp">
        Hola soy un titulo
      </Title>
    </div></Container>
  )
}

export default TitleSection
