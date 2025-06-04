'use client'
import { useEffect } from 'react'
import script from './script.js'

/**
 * Componente de botón/enlace reutilizable con estilos configurables
 * El efecto de onda se aplica a través de un script externo
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del elemento
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un botón'] - Contenido del elemento
 * @param {string} [props.href] - URL de destino (convierte el elemento en <a>)
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML (solo para buttons)
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger')} [props.color='primary'] - Color del elemento
 * @param {('solid'|'outline'|'ghost'|'link')} [props.variant='solid'] - Variante de estilo del elemento
 * @param {React.ReactNode} [props.startIcon] - Icono que aparece al inicio del elemento
 * @param {React.ReactNode} [props.endIcon] - Icono que aparece al final del elemento
 * @param {boolean} [props.fullWidth=false] - Si el elemento debe ocupar todo el ancho disponible
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Tamaño del elemento
 * @param {boolean} [props.disabled=false] - Si el elemento está deshabilitado
 * @param {boolean} [props.isEditable=true] - Si el elemento es editable en Liferay
 * @param {string} [props.target] - Target del enlace (_blank, _self, etc.)
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic
 * @returns {JSX.Element} Botón o enlace renderizado con los estilos aplicados
 */
export default function Btn({
  id,
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
  ...otherProps
}) {
  // Constante para el nombre base del elemento (facilita cambios futuros)
  const ELEMENT_NAME = 'btn'

  // Determinar si es un enlace o un botón
  const isLink = !!href

  // Construcción de clases CSS usando un objeto para mejor legibilidad
  const classes = {
    base: ELEMENT_NAME,
    color: color ? `${ELEMENT_NAME}-${color}` : '',
    variant: variant ? `${ELEMENT_NAME}-${variant}` : '',
    size: size ? `${ELEMENT_NAME}-${size}` : '',
    fullWidth: fullWidth ? `${ELEMENT_NAME}-full-width` : '',
    custom: className
  }

  // Filtrado y unión de clases, eliminando valores vacíos
  const finalClassName = Object.values(classes).filter(Boolean).join(' ')

  // Manejar el evento onClick
  const handleClick = event => {
    if (onClick && !disabled) {
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
    className: finalClassName,
    onClick: handleClick
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
  } else {
    // Propiedades específicas para botones
    baseProps.type = type
    baseProps.disabled = disabled
  }

  // Agregar propiedades según si es editable o no
  if (isEditable) {
    // Modo editable para Liferay
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = isLink ? 'link' : 'text'
  } else {
    // Modo no editable - usar id HTML normal
    if (id) {
      baseProps.id = id
    }
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
