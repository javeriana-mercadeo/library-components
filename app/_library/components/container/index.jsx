import PropTypes from 'prop-types'

const Container = ({ children, className, id }) => {
  // Construcción de clases CSS
  const classes = {
    base: 'container',
    custom: className
  }

  // Filtrado y unión de clases, eliminando valores vacíos
  const finalClassName = Object.values(classes).filter(Boolean).join(' ')

  // Configurar propiedades base
  const baseProps = {
    className: finalClassName
  }

  // Agregar id si se proporciona
  if (id) {
    baseProps.id = id
  }

  return <div {...baseProps}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string
}

export default Container
