import PropTypes from 'prop-types'

/**
 * Componente de imagen reutilizable compatible con Liferay
 * Simple y enfocado solo en la gestión de editabilidad
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (requerido para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript (independiente de Liferay)
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {string} props.src - URL de la imagen (requerido)
 * @param {string} props.alt - Texto alternativo para accesibilidad (requerido)
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {boolean} [props.enableZoom=false] - Si se habilita el efecto zoom en hover
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic (opcional)
 * @returns {JSX.Element} Imagen renderizada con configuración de Liferay
 */
const Image = ({ id, elementId, className = '', src, alt, isEditable = true, enableZoom = false, onClick, ...otherProps }) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'image'

  // Construcción de clases CSS
  const classNames = [
    ELEMENT_NAME,
    onClick ? `${ELEMENT_NAME}-clickable` : null,
    !enableZoom ? `${ELEMENT_NAME}--no-zoom` : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  // Manejar el evento onClick
  const handleClick = event => {
    if (onClick) {
      onClick(event)
    }
  }

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    src,
    alt,
    className: classNames,
    ...(onClick && {
      onClick: handleClick,
      role: 'button',
      tabIndex: 0,
      style: { cursor: 'pointer', ...otherProps.style }
    })
  }

  // ==========================================
  // CONFIGURACIÓN DE IDs
  // ==========================================

  if (elementId) {
    baseProps.id = elementId
  }

  if (isEditable) {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = 'image'
  }

  return <img {...baseProps} />
}

Image.propTypes = {
  id: PropTypes.string,
  elementId: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  enableZoom: PropTypes.bool,
  onClick: PropTypes.func
}

export default Image
