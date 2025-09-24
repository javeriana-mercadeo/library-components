import PropTypes from 'prop-types'
import './styles.scss'

/**
 * Componente de ícono reutilizable con estilos configurables
 * Compatible con el sistema de temas dinámicos y Liferay
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (requerido para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {string} [props.icon='ph-star'] - Clase del ícono (ej: 'ph-heart', 'fa-home')
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl')} [props.size='md'] - Tamaño del ícono
 * @param {('primary'|'secondary'|'tertiary'|'neutral'|'success'|'warning'|'danger')} [props.color='neutral'] - Color del ícono
 * @param {('left'|'center'|'right')} [props.align='left'] - Alineación del ícono
 * @param {('normal'|'thin'|'light'|'regular'|'bold'|'fill')} [props.weight='regular'] - Peso del ícono (para Phosphor)
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic (opcional)
 * @returns {JSX.Element} Ícono renderizado con los estilos aplicados
 */
const Icon = ({
  id,
  elementId,
  className = '',
  icon = 'ph-star',
  size = 'md',
  color = 'neutral',
  align = 'left',
  weight = 'regular',
  isEditable = true,
  onClick,
  ...otherProps
}) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'icon'

  // Validar tamaños disponibles
  const validSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  const finalSize = validSizes.includes(size) ? size : 'md'

  // Validar pesos disponibles (para Phosphor Icons)
  const validWeights = ['normal', 'thin', 'light', 'regular', 'bold', 'fill']
  const finalWeight = validWeights.includes(weight) ? weight : 'regular'

  // Determinar el prefijo del ícono
  let iconClasses = 'ph'
  if (icon.startsWith('fa-') || icon.startsWith('fas-') || icon.startsWith('far-')) {
    iconClasses = icon.startsWith('fa-') ? 'fa' : icon.split('-')[0]
  } else if (icon.startsWith('ph-')) {
    iconClasses = 'ph'
  }

  // Construcción de clases CSS
  const containerClasses = [
    ELEMENT_NAME,
    `${ELEMENT_NAME}--${color}`,
    `${ELEMENT_NAME}--${finalSize}`,
    align !== 'left' ? `${ELEMENT_NAME}__container--${align}` : null,
    finalWeight !== 'regular' ? `${ELEMENT_NAME}--${finalWeight}` : null,
    onClick ? `${ELEMENT_NAME}__container--clickable` : null,
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

  // Configurar propiedades del contenedor
  const containerProps = {
    ...otherProps,
    className: containerClasses,
    ...(onClick && {
      onClick: handleClick,
      role: 'button',
      tabIndex: 0,
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }
    })
  }

  // Configuración de IDs
  if (elementId) {
    containerProps.id = elementId
  }

  if (isEditable) {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    containerProps['data-lfr-editable-id'] = editableId
    containerProps['data-lfr-editable-type'] = 'html'
  }

  return (
    <span {...containerProps}>
<<<<<<< HEAD
      <i className={`${iconClasses} ${icon}`} aria-hidden="true"></i>
=======
      <i className={`${iconClasses} ${icon}`} aria-hidden='true'></i>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    </span>
  )
}

Icon.propTypes = {
  id: PropTypes.string,
  elementId: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  weight: PropTypes.oneOf(['normal', 'thin', 'light', 'regular', 'bold', 'fill']),
  isEditable: PropTypes.bool,
  onClick: PropTypes.func
}

export default Icon
