/**
 * Componente de botón reutilizable con estilos configurables
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
  endIcon
}) {
  // Constante para el nombre base del elemento (facilita cambios futuros)
  const ELEMENT_NAME = 'btn'

  // Construcción de clases CSS usando un objeto para mejor legibilidad
  const classes = {
    base: ELEMENT_NAME,
    color: color ? `${ELEMENT_NAME}-${color}` : '',
    variant: variant ? `${ELEMENT_NAME}-${variant}` : '',
    custom: className
  }

  // Filtrado y unión de clases, eliminando valores vacíos
  const finalClassName = Object.values(classes).filter(Boolean).join(' ')

  // Construcción del ID para la edición en Liferay
  const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME

  return (
    <button className={finalClassName} type={type} data-lfr-editable-id={editableId} data-lfr-editable-type="text">
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  )
}
