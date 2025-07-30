import { UniversalComponent as UC, Container } from '@library/components'

import PropTypes from 'prop-types'

import './styles.scss'

/**
 * Componente LiferayDevBanner - Solo visible en modo desarrollo de Liferay
 * Muestra una franja informativa que ocupa el ancho del contenedor
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido a mostrar en la franja
 * @param {string} [props.icon] - Icono opcional (clase de Phosphor Icons, ej: 'ph-info')
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {('info'|'warning'|'error'|'success')} [props.variant='info'] - Variante visual
 * @param {string} [props.id] - ID único del elemento
 * @returns {JSX.Element} Franja de desarrollo renderizada
 */
const LiferayDevBanner = ({ children, icon, className = '', variant = 'info', id, ...otherProps }) => {
  // Constante para el nombre base del elemento
  const ELEMENT_NAME = 'dev-banner'

  // Validar variantes disponibles
  const validVariants = ['info', 'warning', 'error', 'success']
  const finalVariant = validVariants.includes(variant) ? variant : 'info'

  // Construcción de clases CSS
  const classNames = [ELEMENT_NAME, `${ELEMENT_NAME}--${finalVariant}`, className].filter(Boolean).join(' ')

  // Configurar propiedades base
  const baseProps = {
    ...otherProps,
    className: classNames,
    ...(id && { id })
  }

  return (
    <div {...baseProps}>
      <Container className={`${ELEMENT_NAME}__container`}>
        {icon && (
          <div className={`${ELEMENT_NAME}__icon`}>
            <i className={icon} aria-hidden='true'></i>
          </div>
        )}

        <div className={`${ELEMENT_NAME}__content`}>{children}</div>
      </Container>
    </div>
  )
}

LiferayDevBanner.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
  id: PropTypes.string
}

export default LiferayDevBanner
