import PropTypes from 'prop-types'
import { Paragraph, Title, Modal } from '@library/components'

const ProjectCard = ({ index, project }) => {
  const modalData = project.modal || {}
  const galleryItems = modalData.gallery || []
  const videoItems = modalData.videos || []
  const modalId = `project-${index}`

  return (
    <>
      {/* Card del proyecto como trigger usando data-puj-modal-trigger */}
      <div
        className='carousel-slide swiper-slide'
        data-slide-index={index}
        data-slide-type={project.type || 'default'}
        data-puj-modal-trigger={`modal-${modalId}-overlay`}
        role='button'
        tabIndex={0}>
        <div className='slide-image' style={{ backgroundImage: `url(${project.image})` }}>
          <div className='slide-overlay'>
            <Title
              id={`slide-title-${index}`}
              elementId={`slide-title-${index}`}
              hierarchy='h3'
              size='lg'
              weight='bold'
              className='slide-title'>
              {project.title}
            </Title>

            <Paragraph
              id={`slide-description-${index}`}
              elementId={`slide-description-${index}`}
              size='sm'
              className='slide-description'
              color='neutral'>
              {project.description}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Modal sin trigger prop - se abre con data-puj-modal-trigger */}
      <Modal id={modalId} size='lg' className='project-modal'>
        {/* Galería Izquierda */}
        {(videoItems.length > 0 || galleryItems.length > 0) && (
          <Paragraph id={`project-gallery-${index}`} elementId={`project-gallery-${index}`} className='project-modal__gallery'>
            {videoItems.map((videoUrl, videoIndex) => (
              <div key={`video-${index}-${videoIndex}`} className='media-item media-item--video'>
                <iframe
                  src={videoUrl.replace('watch?v=', 'embed/')}
                  title={`Video ${videoIndex + 1} - ${project.title}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            ))}

            {galleryItems.map((imageUrl, imageIndex) => (
              <div key={`image-${index}-${imageIndex}`} className='media-item media-item--image'>
                <img src={imageUrl} alt={`Imagen ${imageIndex + 1} - ${project.title}`} loading='lazy' />
              </div>
            ))}
          </Paragraph>
        )}

        {/* Información Derecha */}
        <Paragraph className='project-modal__info'>
          <Title
            id={`project-title-modal-${index}`}
            elementId={`project-title-modal-${index}`}
            hierarchy='h2'
            size='xl'
            weight='bold'
            className='project-modal__title'>
            {modalData.title || project.title}
          </Title>

          {(modalData.date || modalData.responsible) && (
            <div className='project-modal__meta'>
              {modalData.date && (
                <Paragraph id={`project-date-${index}`} elementId={`project-date-${index}`} className='meta-item' size='sm'>
                  <strong>Fecha:</strong> {modalData.date}
                </Paragraph>
              )}

              {modalData.responsible && (
                <Paragraph id={`project-responsible-${index}`} elementId={`project-responsible-${index}`} className='meta-item' size='sm'>
                  <strong>Estudiante:</strong> {modalData.responsible}
                </Paragraph>
              )}
            </div>
          )}

          {modalData.description && (
            <div
              id={`project-description-modal-${index}`}
              data-lfr-editable-id={`project-description-modal-${index}`}
              data-lfr-editable-type='rich-text'
              className='project-modal__description'
              dangerouslySetInnerHTML={{ __html: modalData.description }}
            />
          )}
        </Paragraph>
      </Modal>
    </>
  )
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
    modal: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      responsible: PropTypes.string,
      description: PropTypes.string,
      videos: PropTypes.arrayOf(PropTypes.string),
      gallery: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
}

export default ProjectCard
