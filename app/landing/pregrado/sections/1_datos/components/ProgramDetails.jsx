'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import './programDetails.scss'

/**
 * Componente genérico para mostrar detalles del programa
 * Soporta diferentes tipos: normal, fechas, modal
 */
const ProgramDetail = ({ icon, label, value, type = 'normal', dates = [], modalContent = null, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Clase base con modificadores
  const itemClass = ['program-detail', type !== 'normal' ? `program-detail--${type}` : '', className].filter(Boolean).join(' ')

  return (
    <>
      <div className={itemClass}>
        <div className="program-detail__icon">
          <i className={`ph ${icon}`}></i>
        </div>

        <div className="program-detail__content">
          <span className="program-detail__label">{label}</span>

          {/* Tipo normal */}
          {type === 'normal' && <p className="program-detail__value">{value}</p>}

          {/* Tipo fechas - Lista expandible */}
          {type === 'dates' && (
            <div className="program-detail__dates">
              {dates.map((date, index) => (
                <div key={index} className="program-detail__date-item">
                  <span className="program-detail__date-period">{date.period}:</span>
                  <span className="program-detail__date-value">{date.date}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tipo modal - Clickeable */}
          {type === 'modal' && (
            <button
              className="program-detail__value program-detail__value--clickable"
              onClick={openModal}
              aria-label={`Ver más detalles sobre ${label}`}>
              {value}
              <i className="ph ph-info program-detail__info-icon"></i>
            </button>
          )}
        </div>
      </div>

      {/* Modal pequeño */}
      {type === 'modal' && isModalOpen && (
        <div className="program-detail-modal" onClick={closeModal}>
          <div className="program-detail-modal__content" onClick={e => e.stopPropagation()}>
            <div className="program-detail-modal__header">
              <h3 className="program-detail-modal__title">{label}</h3>
              <button className="program-detail-modal__close" onClick={closeModal} aria-label="Cerrar modal">
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

/**
 * Contenedor principal para todos los detalles del programa
 */
const ProgramDetails = ({ details = [], className = '' }) => {
  return (
    <div className={`program-details ${className}`}>
      {details.map((detail, index) => (
        <ProgramDetail key={index} {...detail} />
      ))}
    </div>
  )
}

// PropTypes
ProgramDetail.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'dates', 'modal']),
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ),
  modalContent: PropTypes.node,
  className: PropTypes.string
}

ProgramDetails.propTypes = {
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
}

export default ProgramDetails
export { ProgramDetail }
