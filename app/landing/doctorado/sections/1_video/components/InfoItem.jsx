import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Caption, Paragraph, Button } from '@library/components'

// Cache para atributos generados
const attributeCache = new Map()

const generateDynamicAttributes = id => {
  if (!id) return {}

  // Usar cache para evitar recalcular
  if (attributeCache.has(id)) {
    return attributeCache.get(id)
  }

  let result
  if (id.startsWith('data-puj-') || id.startsWith('puj-')) {
    result = { [id]: 'true' }
  } else {
    const attributeName = id
      .replace(/^(data-puj-|puj-data-|puj-)/i, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')
    result = { [`data-puj-${attributeName}`]: 'true' }
  }

  attributeCache.set(id, result)
  return result
}

const InfoItem = ({ id, icon, label, value, code, type = 'normal', modalContent = null, modalId = null, animationOrder = 1 }) => {
  // Memoizar cálculos costosos
  const itemClass = useMemo(
    () => `info-item ${type !== 'normal' ? `info-item--${type}` : ''} info-item--order-${animationOrder}`,
    [type, animationOrder]
  )

  const dynamicAttributes = useMemo(() => generateDynamicAttributes(id), [id])

  return (
    <>
      <div className={itemClass}>
        <div className='info-item__icon'>
          <i className={`ph ${icon}`}></i>
        </div>

        <div className='info-item__content'>
          <Caption className='info-item__label' color='neutral' size='md' isEditable={false}>
            {typeof label === 'string' ? label : label}
          </Caption>

          {/* Tipo normal */}
          {type === 'normal' && (
            <>
              <Paragraph className='info-item__value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>
              {code && (
                <Paragraph className='info-item__code' color='neutral' size='sm' isEditable={false} data-puj-snies='true'>
                  {code}
                </Paragraph>
              )}
            </>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
            <div className='info-item__content--clickable'>
              <Paragraph className='info-item__value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>

              <Button
                variant='shadow'
                size='sm'
                className='info-item__action-button'
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                isEditable={false}
                endIcon={<i className='ph ph-info'></i>}>
                Ver detalles
              </Button>
            </div>
          )}

          {/* Tipo link */}
          {type === 'link' && (
            <>
              <Paragraph className='info-item__value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>
              {code && (
                <Paragraph className='info-item__link' size='md' isEditable={false}>
                  <a href={code.url} data-puj-cta-link='true'>
                    {code.text}
                  </a>
                </Paragraph>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal pequeño */}
      {type === 'modal' && modalContent && (
        <div id={modalId} className='program-detail-modal'>
          <div className='program-detail-modal__content'>
            <div className='program-detail-modal__header'>
              <Caption as='h3' className='program-detail-modal__title' size='lg' bold={true}>
                {label}
              </Caption>
              <button className='program-detail-modal__close' aria-label='Cerrar modal'>
                <i className='ph ph-x'></i>
              </button>
            </div>
            <div className='program-detail-modal__body'>{modalContent}</div>
          </div>
        </div>
      )}
    </>
  )
}

InfoItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.string,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.oneOf(['normal', 'modal', 'link']),
  modalContent: PropTypes.node,
  modalId: PropTypes.string,
  animationOrder: PropTypes.number
}

export default InfoItem
