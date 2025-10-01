// Modal de proyecto - HTML estático
// La lógica está manejada por script.js
export default function ModalProyecto() {
  return (
    <div className='modal-backdrop' id='modal-backdrop-carousel' style={{ display: 'none' }}>
      <div className='modal-content'>
        {/* Botón cerrar */}
        <button aria-label='Cerrar modal' className='btn btn-primary btn-light btn-icon-only modal-close' type='button'>
          <span className='btn-icon btn-icon-only'>
            <i className='ph ph-x'></i>
          </span>
        </button>

        {/* Cuerpo del modal */}
        <div className='modal-body'>
          <div className='project-details'>
            <div className='project-layout'>
              {/* Información del proyecto */}
              <div className='project-info'>
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

              {/* Galería multimedia */}
              <div className='project-gallery' id='modal-project-gallery'>
                {/* Videos de YouTube - Se insertan dinámicamente desde script.js */}
                <div id='modal-project-videos' className='videos-container'></div>

                {/* Galería de imágenes - Se insertan dinámicamente desde script.js */}
                <div id='modal-project-gallery-items' className='gallery-items'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
