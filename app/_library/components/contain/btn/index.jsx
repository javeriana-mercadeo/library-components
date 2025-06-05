'use client'
import { useEffect } from 'react'
import script from './script.js'

/**
 * Componente de botón/enlace reutilizable con estilos configurables
 * Compatible con todas las variantes de HeroUI
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento (para Liferay)
 * @param {string} [props.elementId] - ID específico para interacciones JavaScript
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un botón'] - Contenido del elemento
 * @param {string} [props.href] - URL de destino (convierte el elemento en <a>)
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML (solo para buttons)
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger')} [props.color='primary'] - Color del elemento
 * @param {('solid'|'faded'|'bordered'|'light'|'flat'|'ghost'|'shadow')} [props.variant='solid'] - Variante de estilo del elemento
 * @param {React.ReactNode} [props.startIcon] - Icono que aparece al inicio del elemento
 * @param {React.ReactNode} [props.endIcon] - Icono que aparece al final del elemento
 * @param {boolean} [props.fullWidth=false] - Si el elemento debe ocupar todo el ancho disponible
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Tamaño del elemento
 * @param {boolean} [props.disabled=false] - Si el elemento está deshabilitado
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {string} [props.target] - Target del enlace (_blank, _self, etc.)
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic
 * @param {number} [props.radius] - Radio de borde personalizado
 * @returns {JSX.Element} Botón o enlace renderizado con los estilos aplicados
 */
export default function Btn({
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
  ...otherProps
}) {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'btn'

  // Validar variantes disponibles (HeroUI compatible)
  const validVariants = ['solid', 'faded', 'bordered', 'light', 'flat', 'ghost', 'shadow']
  const finalVariant = validVariants.includes(variant) ? variant : 'solid'

  // Determinar si es un enlace o un botón
  const isLink = !!href

  // Construcción de clases CSS usando template más limpio
  const classNames = [
    ELEMENT_NAME,
    `${ELEMENT_NAME}-${color}`,
    `${ELEMENT_NAME}-${finalVariant}`,
    size !== 'md' ? `${ELEMENT_NAME}-${size}` : null,
    fullWidth ? `${ELEMENT_NAME}-full-width` : null,
    disabled ? `${ELEMENT_NAME}-disabled` : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  // Manejar el evento onClick
  const handleClick = event => {
    if (disabled) {
      event.preventDefault()
      return
    }
    if (onClick) {
      onClick(event)
    }
  }

  useEffect(() => {
    script()
  }, [])

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    'data-dmpa-element-id': 'btn',
    className: classNames,
    onClick: handleClick,
    'aria-disabled': disabled,
    ...(radius && { style: { '--btn-radius': `${radius}px`, ...otherProps.style } })
  }

  // Propiedades específicas para enlaces
  if (isLink) {
    baseProps.href = href
    baseProps['data-senna-off'] = 'true' // Desactivar SPA de Liferay

    if (target) {
      baseProps.target = target
    }

    // Para enlaces externos, agregar rel por seguridad
    if (target === '_blank') {
      baseProps.rel = 'noopener noreferrer'
    }

    // Para enlaces deshabilitados
    if (disabled) {
      baseProps.href = undefined
      baseProps.tabIndex = -1
    }
  } else {
    // Propiedades específicas para botones
    baseProps.type = type
    baseProps.disabled = disabled
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
    baseProps['data-lfr-editable-type'] = isLink ? 'link' : 'text'
  }

  // Renderizar contenido interno
  const renderContent = () => (
    <>
      {startIcon && <span className="btn-icon btn-icon-start">{startIcon}</span>}
      <span className="btn-text">{children}</span>
      {endIcon && <span className="btn-icon btn-icon-end">{endIcon}</span>}
    </>
  )

  // Renderizar como enlace o botón según corresponda
  if (isLink) {
    return <a {...baseProps}>{renderContent()}</a>
  }

  return <button {...baseProps}>{renderContent()}</button>
}
