import { useEffect } from 'react';

export default function ModalProyecto({ project, onClose }) {
  
  // Extraer ID de video de YouTube
  const extractYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  // Obtener parámetro de tiempo del video
  const getTimeParam = (url) => {
    const timeMatch = url.match(/[&?]t=(\d+)/);
    return timeMatch ? `&start=${timeMatch[1]}` : '';
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Manejar click en backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop show"
      id="modal-backdrop-carousel"
      onClick={handleBackdropClick}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="btn btn-primary btn-light btn-icon-only"
          type="button"
        >
          <span className="btn-icon btn-icon-only">
            <i className="ph ph-x"></i>
          </span>
        </button>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          <div className="project-details">
            <div className="project-layout">
              
              {/* Información del proyecto */}
              <div className="project-info">
                <h2 className="project-title">{project.tituloModal}</h2>
                
                <div className="info-row">
                  <strong>Fecha</strong>
                  <span>{project.fecha}</span>
                </div>

                <div className="info-row">
                  <strong>Responsable</strong>
                  <span>{project.responsable}</span>
                </div>

                <div className="info-row">
                  <strong>Descripción</strong>
                  <p className="project-description">
                    {project.descripcionCompleta}
                  </p>
                </div>
              </div>

              {/* Galería multimedia */}
              <div className="project-gallery" id="modal-project-gallery">
                
                {/* Videos de YouTube */}
                {project.videosYoutube && project.videosYoutube.length > 0 && (
                  <div id="modal-project-videos" className="videos-container">
                    {project.videosYoutube.map((videoUrl, index) => {
                      const videoId = extractYouTubeId(videoUrl);
                      if (!videoId) return null;

                      const timeParam = getTimeParam(videoUrl);
                      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${timeParam}`;

                      return (
                        <div 
                          key={index} 
                          className="video-container"
                          style={{ 
                            position: 'relative', 
                            width: '100%', 
                            marginBottom: '1.5rem' 
                          }}
                        >
                          {project.videosYoutube.length > 1 && (
                            <div style={{
                              padding: '0.75rem 1rem',
                              background: 'rgba(0, 0, 0, 0.05)',
                              fontSize: '14px',
                              fontWeight: 600,
                              color: '#333',
                              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                              display: 'none'
                            }}>
                              Video {index + 1}
                            </div>
                          )}
                          
                          <iframe
                            src={embedUrl}
                            title={`${project.titulo} - Video ${index + 1}`}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{
                              border: 'none',
                              borderRadius: '8px',
                              display: 'block',
                              background: '#000'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Galería de imágenes */}
                {project.galeriaImagenes && project.galeriaImagenes.length > 0 && (
                  <div id="modal-project-gallery-items" className="gallery-items">
                    {project.galeriaImagenes.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`${project.titulo} - Imagen ${index + 1}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '400px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          display: 'block',
                          objectFit: 'cover',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}