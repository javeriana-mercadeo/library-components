import PropTypes from 'prop-types'

const LogoBlanco = ({ className }) => {
  return (
    <figure className={'logo' + (className ? ` ${className}` : '')}>
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" alt="LogoBlanco" className="logo-image light" />
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" alt="LogoBlanco" className="logo-image dark" />
    </figure>
  )
}

LogoBlanco.propTypes = {
  className: PropTypes.string
}

export default LogoBlanco
