import './styles.scss'

const ProjectModal = () => (
  <div className='modal-backdrop project-modal' id='modal-backdrop-carousel' style={{ display: 'none' }}>
    <div aria-modal='true' className='project-modal__dialog modal-content' role='dialog'>
      <button aria-label='Cerrar modal' className='btn btn-primary btn-light btn-icon-only modal-close project-modal__close' type='button'>
        <span className='btn-icon btn-icon-only'>
          <i className='ph ph-x'></i>
        </span>
      </button>

      <div className='modal-body project-modal__body'>
        <div className='project-modal__details'>
          <div className='project-modal__layout'>
            <div className='project-modal__info project-info'>
              <h2 className='project-title' id='modal-project-title'>
                Título del Proyecto
              </h2>

              <div className='info-row'>
                <strong>Fecha</strong>
                <span id='modal-project-date'>2024</span>
              </div>

              <div className='info-row'>
                <strong>Responsable</strong>
                <span id='modal-project-responsible'>Equipo Universitario</span>
              </div>

              <div className='info-row'>
                <strong>Descripción</strong>
                <div className='project-description' id='modal-project-description'>
                  Descripción del proyecto
                </div>
              </div>
            </div>

            <div className='project-modal__gallery project-gallery' id='modal-project-gallery'>
              <div className='videos-container' id='modal-project-videos'></div>
              <div className='gallery-items' id='modal-project-gallery-items'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectModal
