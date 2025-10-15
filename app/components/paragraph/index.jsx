import PropTypes from 'prop-types'
import './styles.scss'

/**
 * Componente de párrafo reutilizable con estilos configurables
 * Compatible con el sistema de temas dinámicos y Liferay
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (requerido para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un párrafo'] - Contenido del párrafo
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} [props.size='md'] - Tamaño visual del párrafo
 * @param {('primary'|'secondary'|'tertiary'|'neutral'|'success'|'warning'|'danger')} [props.color='neutral'] - Color del párrafo
 * @param {('left'|'center'|'right'|'justify')} [props.align='left'] - Alineación del texto
 * @param {('light'|'regular'|'medium'|'semibold'|'bold'|'extrabold')} [props.weight='regular'] - Peso de la fuente
 * @param {boolean} [props.uppercase=false] - Si el texto debe estar en mayúsculas
 * @param {boolean} [props.italic=false] - Si el texto debe estar en cursiva
 * @param {boolean} [props.bold=false] - Si el texto debe estar en negrita
 * @param {boolean} [props.truncate=false] - Si el texto debe truncarse con ellipsis
 * @param {number} [props.lineClamp] - Número de líneas máximas (requiere truncate=true)
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic (opcional)
 * @param {string} [props.as='p'] - Etiqueta HTML a usar (p, span, div, etc.)
 * @returns {JSX.Element} Párrafo renderizado con los estilos aplicados
 */
const Paragraph = ({
  id,
  elementId,
  className = '',
  children = 'Soy un párrafo',
  size = 'md',
  color = 'neutral',
  align = 'left',
  weight = 'regular',
  uppercase = false,
  italic = false,
  bold = false,
  truncate = false,
  lineClamp,
  isEditable = true,
  onClick,
  as = 'p',
  ...otherProps
}) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'paragraph'

  // Validar tamaños disponibles
  const validSizes = ['xs', 'sm', 'md', 'lg', 'xl']
  const finalSize = validSizes.includes(size) ? size : 'md'

  // Validar pesos disponibles
  const validWeights = ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']
  const finalWeight = validWeights.includes(weight) ? weight : 'regular'

  // Construcción de clases CSS usando template más limpio
  const classNames = [
    ELEMENT_NAME,
    `${ELEMENT_NAME}-${color}`,
    `${ELEMENT_NAME}-${finalSize}`,
    align !== 'left' ? `${ELEMENT_NAME}-${align}` : null,
    weight !== 'regular' ? `${ELEMENT_NAME}-${finalWeight}` : null,
    uppercase ? `${ELEMENT_NAME}-uppercase` : null,
    italic ? `${ELEMENT_NAME}-italic` : null,
    bold ? `${ELEMENT_NAME}-bold` : null,
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
    ...(onClick && {
      onClick: handleClick,
      role: 'button',
      tabIndex: 0,
      onKeyDown: e => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault()
          onClick(e)
        }
      }
    }),
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

  // 1. ID de elemento para JavaScript (prioritario si existe)
  if (elementId) {
    baseProps.id = elementId
  }

  // 2. Para modo no editable
  if (isEditable && as === 'p') {
    baseProps.id = id
  }

  // 3. ID de Liferay (cuando se usa etiqueta personalizada)
  if (isEditable && as !== 'p') {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = 'text'
  }

  // ==========================================
  // RENDERIZADO CONDICIONAL
  // ==========================================

  if (isEditable && as === 'p') {
    // Modo editable con lfr-editable (solo cuando es <p>)
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME

    return (
      <lfr-editable id={editableId} type='rich-text' {...baseProps}>
        {children}
      </lfr-editable>
    )
  } else {
    // Modo no editable o con etiqueta personalizada
    const Tag = as
    return <Tag {...baseProps}>{children}</Tag>
  }
}

Paragraph.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  elementId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  truncate: PropTypes.bool,
  lineClamp: PropTypes.number,
  isEditable: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.string
}

export default Paragraph
