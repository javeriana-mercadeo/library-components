import { Caption, Paragraph, Button as Btn } from '@library/components'
import PropTypes from 'prop-types'
<<<<<<< HEAD

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
=======
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

const ProgramDetail = ({ id, icon, label, value, type = 'normal', modalContent = null, className = '' }) => {
  // Memoizar cálculos costosos
  const itemClass = useMemo(
    () => ['program-detail', type !== 'normal' ? `program-detail--${type}` : '', className].filter(Boolean).join(' '),
    [type, className]
  )

  const modalId = useMemo(() => `modal-${id}`, [id])

  const dynamicAttributes = useMemo(() => generateDynamicAttributes(id), [id])
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3

  return (
    <>
      <div className={itemClass}>
<<<<<<< HEAD
        <div className="program-detail_icon">
          <i className={`ph ${icon}`}></i>
        </div>

        <div className="program-detail_content">
          <Caption className="program-detail_label" color="neutral" size="md" isEditable={false}>
            {label}
=======
        <div className='program-detail_icon'>
          <i className={`ph ${icon}`}></i>
        </div>

        <div className='program-detail_content'>
          <Caption className='program-detail_label' color='neutral' size='md' isEditable={false}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          </Caption>

          {/* Tipo normal */}
          {type === 'normal' && (
<<<<<<< HEAD
            <Paragraph className="program-detail_value" color="neutral" size="md" bold={true} isEditable={false} {...dynamicAttributes}>
=======
            <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
              {value}
            </Paragraph>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
<<<<<<< HEAD
            <div className="program-detail_content--clickable">
              <Paragraph className="program-detail_value" color="neutral" size="md" bold={true} isEditable={false} {...dynamicAttributes}>
=======
            <div className='program-detail_content--clickable'>
              <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                {value}
              </Paragraph>

              <Btn
<<<<<<< HEAD
                variant="faded"
                size="sm"
                className="program-detail_value--clickable"
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                isEditable={false}
                endIcon={<i className="ph ph-info"></i>}>
=======
                variant='faded'
                size='sm'
                className='program-detail_value--clickable'
                data-modal-target={modalId}
                aria-label={`Ver más detalles sobre ${label}`}
                isEditable={false}
                endIcon={<i className='ph ph-info'></i>}>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
                Ver detalles
              </Btn>
            </div>
          )}
<<<<<<< HEAD
=======

          {/* Tipo editable */}
          {type === 'editable' && (
            <Paragraph
              className={`program-detail_value`}
              color='neutral'
              size='md'
              bold={true}
              id={`editable-${id}`}
              {...dynamicAttributes}>
              <span className='lead'>{value}</span>
            </Paragraph>
          )}
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
        </div>
      </div>

      {/* Modal pequeño */}
      {type === 'modal' && (
<<<<<<< HEAD
        <div id={modalId} className="program-detail-modal">
          <div className="program-detail-modal__content">
            <div className="program-detail-modal__header">
              <h3 className="program-detail-modal__title">{label}</h3>
              <button className="program-detail-modal__close" aria-label="Cerrar modal">
                <i className="ph ph-x"></i>
              </button>
            </div>
            <div className="program-detail-modal__body">{modalContent}</div>
=======
        <div id={modalId} className='program-detail-modal'>
          <div className='program-detail-modal__content'>
            <div className='program-detail-modal__header'>
              <h3 className='program-detail-modal__title'>{label}</h3>
              <button className='program-detail-modal__close' aria-label='Cerrar modal'>
                <i className='ph ph-x'></i>
              </button>
            </div>
            <div className='program-detail-modal__body'>{modalContent}</div>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          </div>
        </div>
      )}
    </>
  )
}

<<<<<<< HEAD
// PropTypes
=======
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
ProgramDetail.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
<<<<<<< HEAD
  type: PropTypes.oneOf(['normal', 'modal']),
=======
  type: PropTypes.oneOf(['normal', 'modal', 'editable']),
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
  modalContent: PropTypes.node,
  className: PropTypes.string
}

export default ProgramDetail
