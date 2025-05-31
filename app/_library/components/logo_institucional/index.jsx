import PropTypes from 'prop-types'

const Logo = ({ className }) => {
  return (
    <figure className={'logo' + (className ? ` ${className}` : '')}>
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-blue" alt="Logo" className="logo-image light" />
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" alt="Logo" className="logo-image dark" />
    </figure>
  )
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
