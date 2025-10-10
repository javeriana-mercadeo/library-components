import PropTypes from 'prop-types'
import { Paragraph, Title } from '@library/components'

const hiddenEditableStyles = { display: 'none' }

const ProjectCard = ({ index, project }) => {
  const modalData = project.modal || {}
  const galleryItems = modalData.gallery || []
  const videoItems = modalData.videos || []

  return (
    <div
      className='carousel-slide swiper-slide'
      data-slide-index={index}
      data-slide-type={project.type || 'default'}
      aria-label={`Abrir detalles del proyecto ${project.title}`}
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

      <span
        id={`project-title-${index}`}
        data-lfr-editable-id={`project-title-${index}`}
        data-lfr-editable-type='rich-text'
        style={hiddenEditableStyles}
        aria-hidden='true'>
        {modalData.title || project.title}
      </span>

      <span
        id={`project-date-${index}`}
        data-lfr-editable-id={`project-date-${index}`}
        data-lfr-editable-type='text'
        style={hiddenEditableStyles}
        aria-hidden='true'>
        {modalData.date || ''}
      </span>

      <span
        id={`project-responsible-${index}`}
        data-lfr-editable-id={`project-responsible-${index}`}
        data-lfr-editable-type='text'
        style={hiddenEditableStyles}
        aria-hidden='true'>
        {modalData.responsible || ''}
      </span>

      <div
        id={`project-description-modal-${index}`}
        data-lfr-editable-id={`project-description-${index}`}
        data-lfr-editable-type='rich-text'
        style={hiddenEditableStyles}
        aria-hidden='true'
        dangerouslySetInnerHTML={{ __html: modalData.description || '' }}
      />

      <span
        id={`project-gallery-${index}`}
        data-lfr-editable-id={`project-gallery-${index}`}
        data-lfr-editable-type='text'
        style={hiddenEditableStyles}
        aria-hidden='true'>
        {galleryItems.join(', ')}
      </span>

      {videoItems.map((videoUrl, videoIndex) => (
        <span
          key={`${project.title}-video-${videoIndex}`}
          id={`project-video-${index}-${videoIndex}`}
          data-lfr-editable-id={`project-video-${index}-${videoIndex}`}
          data-lfr-editable-type='text'
          style={hiddenEditableStyles}
          aria-hidden='true'>
          {videoUrl}
        </span>
      ))}
    </div>
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
