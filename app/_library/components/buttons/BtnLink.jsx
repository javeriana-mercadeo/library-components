import './btnLink.scss'

const BtnLink = ({ children = 'Ver más', className, link = '#', id }) => {
  return (
    <a
      className={`btn btn-link ${className || ''}`}
      href={link}
      data-lfr-editable-id={`button-link-${id || ''}`}
      data-lfr-editable-type="link">
      {children}
    </a>
  )
}

export default BtnLink
