import { useEffect } from 'react'
import ModalContainer from './ModalContainer'
import ModalContent from './ModalContent'
import ModalTrigger from './ModalTrigger'
import script from './basicModal.js'

const BasicModal = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <>
      <ModalTrigger modalId="basicModal" color="primary" variant="solid">
        Abrir Modal Básico
      </ModalTrigger>

      <ModalContainer id="basicModal">
        <ModalContent
          id="basic-modal"
          title="¡Información Importante!"
          buttonText="Entendido">
          <lfr-editable id="basic-modal-content" type="rich-text">
            <p>
              Este es un modal básico diseñado para mostrar información importante de manera clara y directa.
              Perfecto para notificaciones, anuncios o contenido informativo que requiere la atención del usuario.
            </p>
            <p>
              El modal incluye un botón de cerrar y puede personalizarse completamente mediante el sistema de temas.
            </p>
          </lfr-editable>
        </ModalContent>
      </ModalContainer>
    </>
  )
}

export default BasicModal