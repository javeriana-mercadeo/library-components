export default function Btn({ id, className = '', children = 'Soy un botón', type = 'button', color = 'primary', variant = 'solid' }) {
  const element = 'btn'

  const classNameBase = element
  const classNameVariant = variant ? `${classNameBase}-${variant}` : ''
  const classNameColor = color ? `btn-${color}` : ''

  const finalClassName = [classNameBase, classNameColor, classNameVariant, className].filter(Boolean).join(' ')

  return (
    <button className={finalClassName} type={type} data-lfr-editable-id={id ? `${element}-${id}` : element} data-lfr-editable-type="text">
      {children}
    </button>
  )
}
