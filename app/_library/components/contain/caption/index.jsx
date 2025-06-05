import PropTypes from 'prop-types'
import './styles.scss'

/**
 * Componente Caption reutilizable con estilos configurables
 * Similar al sistema de botones pero para texto de subtítulos/captions
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Caption text'] - Contenido del caption
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger'|'neutral')} [props.color='neutral'] - Color del caption
 * @param {('default'|'solid'|'outline'|'subtle'|'accent')} [props.variant='default'] - Variante de estilo del caption
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} [props.size='md'] - Tamaño del caption
 * @param {('left'|'center'|'right')} [props.align='left'] - Alineación del texto
 * @param {boolean} [props.uppercase=false] - Si el texto debe estar en mayúsculas
 * @param {boolean} [props.italic=false] - Si el texto debe estar en cursiva
 * @param {boolean} [props.bold=false] - Si el texto debe estar en negrita
 * @param {boolean} [props.truncate=false] - Si el texto debe truncarse con ellipsis
 * @param {number} [props.lineClamp] - Número de líneas máximas (requiere truncate=true)
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic (opcional)
 * @returns {JSX.Element} Caption renderizado con los estilos aplicados
 */
const Caption = ({
  id,
  elementId,
  className = '',
  children = 'Caption text',
  color = 'neutral',
  variant = 'default',
  size = 'md',
  align = 'left',
  uppercase = false,
  italic = false,
  bold = false,
  truncate = false,
  lineClamp,
  isEditable = true,
  onClick,
  ...otherProps
}) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'caption'

  // Construcción de clases CSS
  const classes = {
    base: ELEMENT_NAME,
    color: color ? `${ELEMENT_NAME}-${color}` : '',
    variant: variant ? `${ELEMENT_NAME}-${variant}` : '',
    size: size ? `${ELEMENT_NAME}-${size}` : '',
    align: align !== 'left' ? `${ELEMENT_NAME}-${align}` : '',
    uppercase: uppercase ? `${ELEMENT_NAME}-uppercase` : '',
    italic: italic ? `${ELEMENT_NAME}-italic` : '',
    bold: bold ? `${ELEMENT_NAME}-bold` : '',
    truncate: truncate ? `${ELEMENT_NAME}-truncate` : '',
    lineClamp: lineClamp && truncate ? `${ELEMENT_NAME}-clamp-${lineClamp}` : '',
    clickable: onClick ? `${ELEMENT_NAME}-clickable` : '',
    custom: className
  }

  // Filtrado y unión de clases, eliminando valores vacíos
  const finalClassName = Object.values(classes).filter(Boolean).join(' ')

  // Manejar el evento onClick
  const handleClick = event => {
    if (onClick) {
      onClick(event)
    }
  }

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    className: finalClassName,
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

  // 2. ID de Liferay (separado del ID de elemento)
  if (isEditable) {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = 'text'
  }

  return <span {...baseProps}>{children}</span>
}

Caption.propTypes = {
  id: PropTypes.string,
  elementId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral']),
  variant: PropTypes.oneOf(['default', 'solid', 'outline', 'subtle', 'accent']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  truncate: PropTypes.bool,
  lineClamp: PropTypes.number,
  isEditable: PropTypes.bool,
  onClick: PropTypes.func
}

export default Caption
