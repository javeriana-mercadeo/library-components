import React from 'react'
import Title from '@library/components/contain/title'
import Container from '@library/components/container'
import './styles.scss'

const TitleSection = () => {
  return (
    <Container className="tituloIndicadorContainer">
    <div >
      <Title level="h3" className="tituloIhelp">
        Hola soy un titulo
      </Title>
    </div></Container>
  )
}

export default TitleSection
