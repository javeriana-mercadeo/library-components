import PropTypes from 'prop-types'

/**
 * Componente de título reutilizable con jerarquía semántica y estilos configurables
 * Compatible con el sistema de temas dinámicos y Liferay
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (requerido para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript (independiente de Liferay)
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un título'] - Contenido del título
 * @param {('h1'|'h2'|'h3'|'h4'|'h5'|'h6')} [props.hierarchy='h2'] - Jerarquía semántica del título
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl')} [props.size='lg'] - Tamaño visual del título
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger')} [props.color='neutral'] - Color del título
 * @param {('left'|'center'|'right')} [props.align='left'] - Alineación del texto
 * @param {('light'|'regular'|'medium'|'semibold'|'bold'|'extrabold')} [props.weight='medium'] - Peso de la fuente
 * @param {boolean} [props.uppercase=false] - Si el texto debe estar en mayúsculas
 * @param {boolean} [props.truncate=false] - Si el texto debe truncarse con ellipsis
 * @param {number} [props.lineClamp] - Número de líneas máximas (requiere truncate=true)
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic (opcional)
 * @returns {JSX.Element} Título renderizado con la jerarquía y estilos aplicados
 */
const Title = ({
  id,
  elementId,
  className = '',
  children = 'Soy un título',
  hierarchy = 'h2',
  size = 'lg',
  color = '',
  align = 'left',
  weight = 'medium',
  uppercase = false,
  truncate = false,
  lineClamp,
  isEditable = true,
  onClick,
  ...otherProps
}) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'title'

  // Validar tamaños disponibles
  const validSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  const finalSize = validSizes.includes(size) ? size : 'lg'

  // Validar pesos disponibles
  const validWeights = ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']
  const finalWeight = validWeights.includes(weight) ? weight : 'medium'

  // Validar jerarquías disponibles
  const validHierarchies = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const finalHierarchy = validHierarchies.includes(hierarchy) ? hierarchy : 'h2'

  // Construcción de clases CSS usando template más limpio
  const classNames = [
    ELEMENT_NAME,
    color ? `${ELEMENT_NAME}-${color}` : null,
    `${ELEMENT_NAME}-${finalSize}`,
    align !== 'left' ? `${ELEMENT_NAME}-${align}` : null,
    weight !== 'medium' ? `${ELEMENT_NAME}-${finalWeight}` : null,
    uppercase ? `${ELEMENT_NAME}-uppercase` : null,
    truncate ? `${ELEMENT_NAME}-truncate` : null,
    lineClamp && truncate ? `${ELEMENT_NAME}-clamp-${lineClamp}` : null,
    onClick ? `${ELEMENT_NAME}-clickable` : null,
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
    className: classNames,
    ...(onClick && { onClick: handleClick, role: 'button', tabIndex: 0 }),
    ...(lineClamp &&
      truncate && {
        style: {
          '--line-clamp': lineClamp,
          ...otherProps.style
        }
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
    baseProps['data-lfr-editable-type'] = 'text'
  }

  // Configurar elemento HTML según jerarquía
  const TitleTag = finalHierarchy

  return <TitleTag {...baseProps}>{children}</TitleTag>
}

Title.propTypes = {
  id: PropTypes.string,
  elementId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hierarchy: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  uppercase: PropTypes.bool,
  truncate: PropTypes.bool,
  lineClamp: PropTypes.number,
  isEditable: PropTypes.bool,
  onClick: PropTypes.func
}

export default Title
