import { Caption, Paragraph, Button as Btn } from '@library/components'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

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

const ProgramDetail = ({ id, icon, label, value, value2, prefix, prefix2, editableValue, isUserEdited = false, allowOverride = false, type = 'normal', modalContent = null, className = '' }) => {
  // Memoizar cálculos costosos
  const itemClass = useMemo(
    () => ['program-detail', type !== 'normal' ? `program-detail--${type}` : '', className].filter(Boolean).join(' '),
    [type, className]
  )

  const modalId = useMemo(() => `modal-${id}`, [id])
  
  // Generar IDs únicos estables para Liferay
  const liferayEditableId = useMemo(() => {
    const pageId = typeof window !== 'undefined' ? window.location.pathname.replace(/\//g, '-') : 'default'
    return `editable-${pageId}-${id}-field`
  }, [id])
  
  const liferayContainerId = useMemo(() => {
    const pageId = typeof window !== 'undefined' ? window.location.pathname.replace(/\//g, '-') : 'default'
    return `editable-container-${pageId}-${id}`
  }, [id])

  const dynamicAttributes = useMemo(() => generateDynamicAttributes(id), [id])

  return (
    <>
      <div className={itemClass}>
        <div className='program-detail_icon'>
          <i className={`ph ${icon}`}></i>
        </div>

        <div className='program-detail_content'>
          <Caption className='program-detail_label' color='neutral' size='md' isEditable={false}>
            {label}
          </Caption>

          {/* Tipo normal */}
          {type === 'normal' && (
            <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
              {value}
            </Paragraph>
          )}

          {/* Tipo doble - Primer elemento desde API, segundo editable */}
          {type === 'doble' && (
            <div className='program-detail_content--doble'>
              {/* Primer valor desde API con estructura separada - todo en una línea */}
              <Paragraph
                className='program-detail_value program-detail_value--primary'
                color='neutral'
                size='md'
                bold={true}
                isEditable={false}>
                <Caption id={`${modalId}-prefix1`}>{prefix || 'Diurna'}: </Caption>

                <Caption size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                  {value}
                </Caption>
              </Paragraph>

              {/* Segundo valor editable con estructura separada - todo en una línea */}
              <Paragraph
                className='program-detail_value program-detail_value--primary'
                color='neutral'
                size='md'
                bold={true}
                isEditable={false}>
                <Caption id={`${modalId}-prefix2`}>{prefix2 || 'Nocturna'}: </Caption>
                <Caption id={`${modalId}-value2`}>{value2}</Caption>
              </Paragraph>
            </div>
          )}

          {/* Tipo editable - Prioritario sobre API */}
          {type === 'editable' && (
            <div 
              className='program-detail_content--editable'
              data-lfr-editable-id={liferayContainerId}
              data-lfr-editable-type='text'>
              <Paragraph 
                className='program-detail_value program-detail_value--editable'
                color='neutral'
                size='md'
                bold={true}
                contentEditable={true}
                suppressContentEditableWarning={true}
                data-editable='true'
                data-field-id={id}
                data-user-edited={isUserEdited}
                data-allow-override={allowOverride}
                data-lfr-editable-id={liferayEditableId}
                data-lfr-editable-type='text'
                {...dynamicAttributes}>
                {editableValue || value}
              </Paragraph>
              
              {isUserEdited && (
                <div className='edit-indicator'>
                  <i className='ph ph-pencil-simple' title='Campo editado manualmente'></i>
                </div>
              )}
            </div>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
            <div className='program-detail_content--clickable'>
              <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>

              <Btn
                variant='faded'
                size='sm'
                className='program-detail_value--clickable'
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                isEditable={false}
                endIcon={<i className='ph ph-info'></i>}>
                Ver detalles
              </Btn>
            </div>
          )}
        </div>
      </div>

      {/* Modal pequeño */}
      {type === 'modal' && (
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

ProgramDetail.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'modal', 'doble', 'editable']),
  value2: PropTypes.string,
  prefix: PropTypes.string,
  prefix2: PropTypes.string,
  editableValue: PropTypes.string,
  isUserEdited: PropTypes.bool,
  allowOverride: PropTypes.bool,
  modalContent: PropTypes.node,
  className: PropTypes.string
}

export default ProgramDetail
