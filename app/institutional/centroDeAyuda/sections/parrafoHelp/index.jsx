import React from 'react'
import Paragraph from '@library/components/contain/paragraph'
import Container from '@library/components/container'
import './styles.scss'
const ParagraphSection = () => {
  return (
    <Container>
      <Paragraph className="note">Hola soy un parrafo de ejemplo</Paragraph>
    </Container>
  )
}

export default ParagraphSection
