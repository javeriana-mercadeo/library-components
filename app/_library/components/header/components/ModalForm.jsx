import { Button as Btn, Paragraph, Image, Caption } from '@library/components'

const ModalForm = () => {
  return (
    <div className='modal-overlay' id='modal-overlay'>
      <div
        className='contact-modal justify-center items-center'
        id='contact-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'>
        {/* Imagen lateral - Solo visible en desktop */}

        <Image
          id='modal-image'
          src='https://www.javeriana.edu.co/recursosdb/d/info-prg/img_7769-1-'
          alt='Imagen decorativa del modal'
          className='modal-image'
        />

        {/* Contenedor del formulario */}
        <div className='modal-form-container'>
          {/* Header del Modal */}
          <div className='modal-header'>
            <Caption id='title-form' className='title title-2xl title-bold' size='2xl' isEditable={false}>
              ¿Tienes dudas?
            </Caption>

            <Btn
              variant='light'
              id='modal-close'
              aria-label='Cerrar modal'
              type='button'
              isEditable={false}
              startIcon={<i className='ph ph-x'></i>}
              iconOnly>
              botón de cerrar
            </Btn>
          </div>

          {/* Contenido del Modal */}
          <div className='modal-content'>
            <div id='formProgram'>
              {/* HEADER: Solo título fijo */}
              <div>
                <Paragraph id='title-form' isEditable={false}>
                  Déjanos tus datos y te contactaremos para brindarte toda la información.
                </Paragraph>
              </div>

              {/* CONTENT: Descripción + campos + autorización con scroll */}
              <div className='form-content'>
                <lfr-drop-zone id='drop-zone'></lfr-drop-zone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
