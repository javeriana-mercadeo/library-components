import PropTypes from 'prop-types'

const Logo = ({ className, orientation = 'horizontal' }) => {
  // URLs por orientación
  const logoUrls = {
    horizontal: {
      light: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-blue',
      dark: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white'
    },
    vertical: {
      light: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-v-blue',
      dark: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-v-white'
    }
  }

  // Obtener URLs según orientación
  const currentUrls = logoUrls[orientation] || logoUrls.horizontal

  // Construir clases CSS
  const logoClasses = ['logo', `logo--${orientation}`, className].filter(Boolean).join(' ')

  return (
    <figure className={logoClasses}>
<<<<<<< HEAD
      <img src={currentUrls.light} alt={`Logo Javeriana ${orientation}`} className="logo-image light" />
      <img src={currentUrls.dark} alt={`Logo Javeriana ${orientation}`} className="logo-image dark" />
=======
      <img src={currentUrls.light} alt={`Logo Javeriana ${orientation}`} className='logo-image light' />
      <img src={currentUrls.dark} alt={`Logo Javeriana ${orientation}`} className='logo-image dark' />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    </figure>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
}

export default Logo
