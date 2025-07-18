import React from 'react'
import Title from '@library/components/contain/title'

import './styles.scss'

const TitleSection = () => {
  return (
    <div className="documentation-header">
      <Title level="h2" className="titleHelp">
        Hola soy un titulo
      </Title>
    </div>
  )
}

export default TitleSection
