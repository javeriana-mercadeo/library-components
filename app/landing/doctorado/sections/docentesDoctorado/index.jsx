import React from 'react'
import './styles.scss'

const DocentesDoctorado = () => {
  return (
<section id="section-six">
  <div className="color-container">
    <div className="container expert-carousel" id="docentes">
      <h2
        className="title title-neutral title-2xl title-center title-bold expert-carousel__title"
        data-lfr-editable-id="title-docentes-title-1"
        data-lfr-editable-type="text">
        Docentes expertos
      </h2>
      <lfr-editable
        id="docentes-description"
        type="rich-text"
        className="paragraph paragraph-neutral paragraph-md paragraph-center expert-carousel__description">
        Docentes expertos con experiencia práctica y académica, comprometidos con la excelencia e
        innovación en Ingeniería Civil.
      </lfr-editable>
      <div className="contentGeneralD">
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/428/270/non_2x/businessman-explain-pose-character-design-free-vector.jpg"
          className="imgDoctorado"
          alt="Foto del docente"
          data-lfr-editable-id="docente-image-1"
          data-lfr-editable-type="image" />
        <div className="doctoradoGrid">
          <h2 
            className="NombreDoctorado"
            data-lfr-editable-id="docente-name-1"
            data-lfr-editable-type="text">
            Juana María Marín Leoz
          </h2>
          <p 
            className="titleDoctorado"
            data-lfr-editable-id="docente-title-1"
            data-lfr-editable-type="text">
            Decana de Facultad
          </p>
          <p 
            className="descriptionDoctorado"
            data-lfr-editable-id="docente-description-1"
            data-lfr-editable-type="rich-text">
            Lorem ipsum dolor sit amet consectetur. Eu ullamcorper mauris cursus lacus ac a sit eget
            sit. Pellentesque ornare mattis eleifend pulvinar bibendum. Vitae vestibulum quam
            viverra consequat malesuada. Mollis arcu leo in morbi gravida amet dignissim. Malesuada
            turpis magna ultrices accumsan augue egestas ut cursus. Velit quis vestibulum habitant
            massa scelerisque. Adipiscing pharetra pellentesque adipiscing eros. Eget convallis nunc
            tortor nec orci faucibus sed. Sed viverra sodales ultrices nibh. Dictumst egestas ut
            risus enim tristique enim cursus. Massa etiam.
          </p>
        </div>
      </div>
      <lfr-widget-web-content id="widget1"></lfr-widget-web-content>
    </div>
  </div>
</section>
  )
}

export default DocentesDoctorado