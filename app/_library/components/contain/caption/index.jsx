import PropTypes from 'prop-types'
import './styles.scss'

/**
 * Componente Caption reutilizable con estilos configurables
 * Similar al sistema de botones pero para texto de subtítulos/captions
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Caption text'] - Contenido del caption
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger'|'neutral')} [props.color='neutral'] - Color del caption
 * @param {('default'|'solid'|'outline'|'subtle'|'accent')} [props.variant='default'] - Variante de estilo del caption
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} [props.size='md'] - Tamaño del caption
 * @param {('left'|'center'|'right')} [props.align='left'] - Alineación del texto
 * @param {boolean} [props.uppercase=false] - Si el texto debe estar en mayúsculas
 * @param {boolean} [props.italic=false] - Si el texto debe estar en cursiva
 * @param {boolean} [props.bold=false] - Si el texto debe estar en negrita
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @returns {JSX.Element} Caption renderizado con los estilos aplicados
 */
const Caption = ({
  id,
  className = '',
  children = 'Caption text',
  color = 'neutral',
  variant = 'default',
  size = 'md',
  align = 'left',
  uppercase = false,
  italic = false,
  bold = false,
  isEditable = true,
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
    align: align ? `${ELEMENT_NAME}-${align}` : '',
    uppercase: uppercase ? `${ELEMENT_NAME}-uppercase` : '',
    italic: italic ? `${ELEMENT_NAME}-italic` : '',
    bold: bold ? `${ELEMENT_NAME}-bold` : '',
    custom: className
  }

  // Filtrado y unión de clases, eliminando valores vacíos
  const finalClassName = Object.values(classes).filter(Boolean).join(' ')

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    className: finalClassName
  }

  // Agregar propiedades según si es editable o no
  if (isEditable) {
    // Modo editable para Liferay
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = 'rich-text'
  } else {
    // Modo no editable - usar id HTML normal
    if (id) {
      baseProps.id = id
    }
  }

  // Renderizar como lfr-editable si es editable, div si no
  if (isEditable) {
    return <lfr-editable {...baseProps}>{children}</lfr-editable>
  }

  return <div {...baseProps}>{children}</div>
}

Caption.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral']),
  variant: PropTypes.oneOf(['default', 'solid', 'outline', 'subtle', 'accent']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  isEditable: PropTypes.bool
}

export default Caption
