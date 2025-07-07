import { Caption, Paragraph, Button as Btn } from '@library/components'
import PropTypes from 'prop-types'

/**
 * Función para generar atributos dinámicos basados en el ID
 */
const generateDynamicAttributes = id => {
  if (!id) return {}

  if (id.startsWith('data-puj-') || id.startsWith('puj-')) {
    return { [id]: 'true' }
  }

  let attributeName = id
    .replace(/^(data-puj-|puj-data-|puj-)/i, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')

  return { [`data-puj-${attributeName}`]: 'true' }
}

/**
 * Componente genérico para mostrar detalles del programa
 * Soporta diferentes tipos: normal, modal
 */
const ProgramDetail = ({ id, icon, label, value, type = 'normal', modalContent = null, className = '' }) => {
  const itemClass = ['program-detail', type !== 'normal' ? `program-detail--${type}` : '', className].filter(Boolean).join(' ')

  const modalId = `modal-${id}-${Math.random().toString(36).substr(2, 9)}`
  const dynamicAttributes = generateDynamicAttributes(id)

  return (
    <>
      <div className={itemClass}>
        <div className="program-detail_icon">
          <i className={`ph ${icon}`}></i>
        </div>

        <div className="program-detail_content">
          <Caption className="program-detail_label" color="neutral" size="md" isEditable={false}>
            {label}
          </Caption>

          {/* Tipo normal */}
          {type === 'normal' && (
            <Paragraph className="program-detail_value" color="neutral" size="md" bold={true} isEditable={false} {...dynamicAttributes}>
              {value}
            </Paragraph>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
            <div className="program-detail_content--clickable">
              <Paragraph className="program-detail_value" color="neutral" size="md" bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>

              <Btn
                variant="faded"
                size="sm"
                className="program-detail_value--clickable"
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                isEditable={false}
                endIcon={<i className="ph ph-info"></i>}>
                Ver detalles
              </Btn>
            </div>
          )}
        </div>
      </div>

      {/* Modal pequeño */}
      {type === 'modal' && (
        <div id={modalId} className="program-detail-modal">
          <div className="program-detail-modal__content">
            <div className="program-detail-modal__header">
              <h3 className="program-detail-modal__title">{label}</h3>
              <button className="program-detail-modal__close" aria-label="Cerrar modal">
                <i className="ph ph-x"></i>
              </button>
            </div>
            <div className="program-detail-modal__body">{modalContent}</div>
          </div>
        </div>
      )}
    </>
  )
}

// PropTypes
ProgramDetail.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'modal']),
  modalContent: PropTypes.node,
  className: PropTypes.string
}

export default ProgramDetail
