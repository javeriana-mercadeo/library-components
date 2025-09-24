import PropTypes from 'prop-types'

const LogoBlanco = ({ className }) => {
  return (
    <figure className={'logo' + (className ? ` ${className}` : '')}>
<<<<<<< HEAD
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" alt="LogoBlanco" className="logo-image light" />
      <img src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" alt="LogoBlanco" className="logo-image dark" />
=======
      <img src='https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white' alt='LogoBlanco' className='logo-image light' />
      <img src='https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white' alt='LogoBlanco' className='logo-image dark' />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    </figure>
  )
}

LogoBlanco.propTypes = {
  className: PropTypes.string
}

export default LogoBlanco
