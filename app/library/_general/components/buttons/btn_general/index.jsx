'use client'
import { useEffect } from 'react'
import script from './script.js'

/**
 * Componente de botón reutilizable con estilos configurables
 * El efecto de onda se aplica a través de un script externo
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Identificador único del botón para Liferay
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {React.ReactNode} [props.children='Soy un botón'] - Contenido del botón
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML
 * @param {('primary'|'secondary'|'tertiary'|'success'|'warning'|'danger')} [props.color='primary'] - Color del botón
 * @param {('solid'|'outline'|'ghost'|'link')} [props.variant='solid'] - Variante de estilo del botón
 * @param {React.ReactNode} [props.startIcon] - Icono que aparece al inicio del botón
 * @param {React.ReactNode} [props.endIcon] - Icono que aparece al final del botón
 * @param {boolean} [props.fullWidth=false] - Si el botón debe ocupar todo el ancho disponible
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic
 * @returns {JSX.Element} Botón renderizado con los estilos aplicados
 */
export default function Btn({
  id,
  className = '',
  children = 'Soy un botón',
  type = 'button',
  color = 'primary',
  variant = 'solid',
  startIcon,
  endIcon,
  fullWidth = false,
  size = 'md',
  disabled = false,
  onClick,
  ...otherProps
}) {
  // Constante para el nombre base del elemento (facilita cambios futuros)
  const ELEMENT_NAME = 'btn'

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

  // Construcción del ID para la edición en Liferay
  const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME

  // Manejar el evento onClick
  const handleClick = event => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  useEffect(() => {
    script()
  }, [])

  return (
    <button
      {...otherProps}
      data-dmpa-element-id="btn"
      className={finalClassName}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      data-lfr-editable-id={editableId}
      data-lfr-editable-type="text">
      {startIcon && <span className="btn-icon btn-icon-start">{startIcon}</span>}
      <span className="btn-text">{children}</span>
      {endIcon && <span className="btn-icon btn-icon-end">{endIcon}</span>}
    </button>
  )
}
