import varLogo from '../assets/var-logo.png'
import varYear from '../assets/var-year-logo.png'

const Content = () => {
  return (
    <>
      <lfr-editable id="faculty-logo" type="image">
        <img
          // src={varLogo}
          src="/var-year-logo.png"
          alt="Logo de la facultad"
        />
      </lfr-editable>
    </>
  )
}

export default Content
