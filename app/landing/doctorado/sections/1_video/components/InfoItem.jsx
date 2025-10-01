import PropTypes from 'prop-types'
import { Button } from '@library/components'

const InfoItem = ({ id, icon, label, value, code, type = 'normal', modalContent = null, modalId = null, animationOrder = 1 }) => {
  const itemClass = `info-item ${type !== 'normal' ? `info-item--${type}` : ''} info-item--order-${animationOrder}`

  return (
    <>
      <div className={itemClass}>
        <div className='info-item__icon'>
          <i className={`ph ${icon}`}></i>
        </div>

        <div className='info-item__content'>
          <span className='info-item__label'>{typeof label === 'string' ? label : label}</span>

          {/* Tipo normal */}
          {type === 'normal' && (
            <>
              <span className='info-item__value' {...(id ? { [id]: 'true' } : {})}>
                {value}
              </span>
              {code && (
                <span className='info-item__code' data-puj-snies>
                  {code}
                </span>
              )}
            </>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
            <div className='info-item__content--clickable'>
              <Button
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                variant='shadow'
                size='sm'
                endIcon={<i className='ph ph-info'></i>}>
                Ver detalles
              </Button>
            </div>
          )}

          {/* Tipo link */}
          {type === 'link' && (
            <>
              <span className='info-item__value' {...(id ? { [id]: 'true' } : {})}>
                {value}
              </span>
              {code && (
                <span className='info-item__value'>
                  <a href={code.url} data-puj-cta-link>
                    {code.text}
                  </a>
                </span>
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
              <h3 className='program-detail-modal__title'>{label}</h3>
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
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.oneOf(['normal', 'modal', 'link']),
  modalContent: PropTypes.node,
  modalId: PropTypes.string,
  animationOrder: PropTypes.number
}

export default InfoItem
