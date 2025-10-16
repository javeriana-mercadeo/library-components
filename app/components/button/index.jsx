import { useScript } from '@hooks'

/**
 * Componente de botón/enlace reutilizable con estilos configurables
 * Compatible con todas las variantes de HeroUI + nueva variante 'link'
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un botón'] - Contenido del elemento
 * @param {string} [props.href] - URL de destino (convierte el elemento en <a>)
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML (solo para buttons)
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger')} [props.color='primary'] - Color del elemento
 * @param {('solid'|'faded'|'bordered'|'light'|'flat'|'ghost'|'shadow'|'link')} [props.variant='solid'] - Variante de estilo del elemento
 * @param {React.ReactNode} [props.startIcon] - Icono que aparece al inicio del elemento
 * @param {React.ReactNode} [props.endIcon] - Icono que aparece al final del elemento
 * @param {boolean} [props.fullWidth=false] - Si el elemento debe ocupar todo el ancho disponible
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Tamaño del elemento
 * @param {boolean} [props.disabled=false] - Si el elemento está deshabilitado
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {string} [props.target] - Target del enlace (_blank, _self, etc.)
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic
 * @param {number} [props.radius] - Radio de borde personalizado
 * @param {boolean} [props.iconOnly=false] - Si el botón debe mostrar solo el icono (proporciones cuadradas)
 * @returns {JSX.Element} Botón o enlace renderizado con los estilos aplicados
 */
export default function Button({
  id,
  elementId,
  className = '',
  children = 'Soy un botón',
  href,
  type = 'button',
  color = 'primary',
  variant = 'solid',
  startIcon,
  endIcon,
  fullWidth = false,
  size = 'md',
  disabled = false,
  onClick,
  isEditable = true,
  target,
  radius,
  iconOnly = false,
  ...otherProps
}) {
  const ELEMENT_NAME = 'btn'

  const validVariants = ['solid', 'faded', 'bordered', 'light', 'flat', 'ghost', 'shadow', 'link']
  const finalVariant = validVariants.includes(variant) ? variant : 'solid'

  const isLink = !!href
  const shouldApplyRipple = finalVariant !== 'link'

  // Construcción de clases CSS
  const classNames = [
    ELEMENT_NAME,
    `${ELEMENT_NAME}-${color}`,
    `${ELEMENT_NAME}-${finalVariant}`,
    // Para variante 'link', no aplicar clases de tamaño ni fullWidth
    finalVariant !== 'link' && size !== 'md' ? `${ELEMENT_NAME}-${size}` : null,
    finalVariant !== 'link' && fullWidth ? `${ELEMENT_NAME}-full-width` : null,
    // Agregar clase para botón solo icono
    iconOnly ? `${ELEMENT_NAME}-icon-only` : null,
    disabled ? `${ELEMENT_NAME}-disabled` : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = event => {
    if (disabled) {
      event.preventDefault()
      return
    }
    if (onClick) {
      onClick(event)
    }
  }

  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    ...(shouldApplyRipple && { 'data-dmpa-element-id': 'btn' }),
    className: classNames,
    onClick: handleClick,
    'aria-disabled': disabled,
    ...(finalVariant !== 'link' && radius && { style: { '--btn-radius': `${radius}px`, ...otherProps.style } })
  }

  // Propiedades específicas para enlaces
  if (isLink) {
    baseProps.href = href
    baseProps['data-senna-off'] = 'true'

    if (target) {
      baseProps.target = target
    }

    if (target === '_blank') {
      baseProps.rel = 'noopener noreferrer'
    }

    if (disabled) {
      baseProps.href = undefined
      baseProps.tabIndex = -1
    }
  } else {
    baseProps.type = type
    baseProps.disabled = disabled
  }

  // Configuración de IDs
  if (elementId) {
    baseProps.id = elementId
  }

  if (isEditable) {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = isLink ? 'link' : 'text'
  }

  // Renderizar contenido interno
  const renderContent = () => {
    // Si es botón solo icono, mostrar solo el icono principal
    if (iconOnly) {
      const iconToShow = startIcon || endIcon
      if (!iconToShow) {
        console.warn('Button: iconOnly está habilitado pero no se proporcionó startIcon ni endIcon')
        return <span className='btn-text'>{children}</span>
      }
      return <span className='btn-icon btn-icon-only'>{iconToShow}</span>
    }

    // Renderizado normal con iconos y texto
    return (
      <>
        {startIcon && <span className='btn-icon btn-icon-start'>{startIcon}</span>}
        <span className='btn-text'>{children}</span>
        {endIcon && <span className='btn-icon btn-icon-end'>{endIcon}</span>}
      </>
    )
  }

  if (isLink) {
    return <a {...baseProps}>{renderContent()}</a>
  }

  return <button {...baseProps}>{renderContent()}</button>
}
