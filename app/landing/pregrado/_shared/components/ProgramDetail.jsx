import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Caption, Paragraph, Button, Modal } from '@components'

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

/**
 * ProgramDetail - Componente compartido para mostrar detalles de programas
 * Soporta 4 tipos: normal, modal, editable, doble
 *
 * @param {string} id - ID único del detalle
 * @param {string} icon - Clase del ícono (ej: 'ph-clock')
 * @param {string} label - Etiqueta del detalle
 * @param {string} value - Valor principal
 * @param {string} value2 - Valor secundario (solo para tipo 'doble')
 * @param {string} prefix - Prefijo para el primer valor (solo para tipo 'doble')
 * @param {string} prefix2 - Prefijo para el segundo valor (solo para tipo 'doble')
 * @param {('normal'|'modal'|'editable'|'doble')} type - Tipo de detalle
 * @param {React.ReactNode} modalContent - Contenido del modal (solo para tipo 'modal')
 * @param {string} className - Clases CSS adicionales
 */
const ProgramDetail = ({ id, icon, label, value, value2, prefix, prefix2, type = 'normal', modalContent = null, className = '' }) => {
  // Memoizar cálculos costosos
  const itemClass = useMemo(
    () => ['program-detail', type !== 'normal' ? `program-detail--${type}` : '', className].filter(Boolean).join(' '),
    [type, className]
  )

  const modalId = useMemo(() => `modal-${id}`, [id])

  const dynamicAttributes = useMemo(() => generateDynamicAttributes(id), [id])

  return (
    <>
      <div className={itemClass}>
        <div className='program-detail_icon'>
          <i className={`ph ${icon}`}></i>
        </div>

        <div className='program-detail_content'>
          <Caption className='program-detail_label' color='neutral' size='md' isEditable={false}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </Caption>

          {/* Tipo normal */}
          {type === 'normal' && (
            <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
              {value}
            </Paragraph>
          )}

          {/* Tipo modal - Clickeable con Modal reutilizable */}
          {type === 'modal' && (
            <div className='program-detail_content--clickable'>
              <Paragraph className='program-detail_value' color='neutral' size='md' bold={true} isEditable={false} {...dynamicAttributes}>
                {value}
              </Paragraph>

              <Modal
                id={modalId}
                size='sm'
                trigger={
                  <Button
                    variant='faded'
                    size='sm'
                    className='program-detail_value--clickable'
                    aria-label={`Ver más detalles sobre ${label}`}
                    isEditable={false}
                    endIcon={<i className='ph ph-info'></i>}>
                    Ver detalles
                  </Button>
                }>
                <Caption color='primary' size='lg'>
                  {label}
                </Caption>
                {modalContent}
              </Modal>
            </div>
          )}

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

          {/* Tipo doble - Dos valores con prefijos */}
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
        </div>
      </div>
    </>
  )
}

ProgramDetail.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  value2: PropTypes.string,
  prefix: PropTypes.string,
  prefix2: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'modal', 'editable', 'doble']),
  modalContent: PropTypes.node,
  className: PropTypes.string
}

export default ProgramDetail
