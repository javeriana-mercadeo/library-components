import varLogo from '../assets/var-logo.png'
import varYear from '../assets/var-year-logo.png'

const Content = () => {
  return (
    <div className="logo-content">
      <lfr-editable id="faculty-logo" type="image" className="squere-logo">
        <img src="/var-year-logo.png" alt="Logo de la facultad" />
      </lfr-editable>
      {/* <lfr-editable id="faculty-logo" type="image" className="rectangle-logo"> 
        <img src="/var-logo.png" alt="Logo de la facultad" />
      </lfr-editable> */}
    </div>
  )
}

export default Content
