import { Button as Btn } from '@library/components'

const ModalTrigger = ({
  modalId,
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <>
      <Btn
        type="button"
        data-popup={`#${modalId}`}
        className={`popup-open__btn ${className}`}
        color={color}
        variant={variant}
        size={size}
        aria-label="Open Modal"
        {...props}>
        {children || 'Abrir Modal'}
      </Btn>
    </>
  )
}

export default ModalTrigger