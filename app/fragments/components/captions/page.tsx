import Caption from '@library/components/contain/caption'

// Ejemplos de uso del componente Caption

const CaptionExamples = () => {
  return (
    <div className='caption-examples'>
      {/* Tamaños */}
      <div className='example-section'>
        <h3>Tamaños</h3>
        <Caption id='caption-xs' size='xs'>
          Caption extra pequeño
        </Caption>
        <Caption id='caption-sm' size='sm'>
          Caption pequeño
        </Caption>
        <Caption id='caption-md' size='md'>
          Caption mediano (por defecto)
        </Caption>
        <Caption id='caption-lg' size='lg'>
          Caption grande
        </Caption>
        <Caption id='caption-xl' size='xl'>
          Caption extra grande
        </Caption>
      </div>

      {/* Colores y variantes */}
      <div className='example-section'>
        <h3>Colores con variante solid</h3>
        <Caption color='primary' id='caption-primary' variant='solid'>
          Caption primario
        </Caption>
        <Caption color='secondary' id='caption-secondary' variant='solid'>
          Caption secundario
        </Caption>
        <Caption color='success' id='caption-success' variant='solid'>
          Caption de éxito
        </Caption>
        <Caption color='warning' id='caption-warning' variant='solid'>
          Caption de advertencia
        </Caption>
        <Caption color='danger' id='caption-danger' variant='solid'>
          Caption de peligro
        </Caption>
        <Caption color='neutral' id='caption-neutral' variant='solid'>
          Caption neutral
        </Caption>
      </div>

      {/* Variantes de diseño */}
      <div className='example-section'>
        <h3>Variantes de diseño (color primary)</h3>
        <Caption color='primary' id='caption-solid' variant='solid'>
          Variante sólida
        </Caption>
        <Caption color='primary' id='caption-outline' variant='outline'>
          Variante con borde
        </Caption>
        <Caption color='primary' id='caption-subtle' variant='subtle'>
          Variante sutil
        </Caption>
        <Caption color='primary' id='caption-accent' variant='accent'>
          Variante con acento
        </Caption>
      </div>

      {/* Alineaciones */}
      <div className='example-section'>
        <h3>Alineaciones</h3>
        <Caption align='left' id='caption-left'>
          Caption alineado a la izquierda
        </Caption>
        <Caption align='center' id='caption-center'>
          Caption centrado
        </Caption>
        <Caption align='right' id='caption-right'>
          Caption alineado a la derecha
        </Caption>
      </div>

      {/* Modificadores de texto */}
      <div className='example-section'>
        <h3>Modificadores de texto</h3>
        <Caption uppercase id='caption-uppercase'>
          Caption en mayúsculas
        </Caption>
        <Caption italic id='caption-italic'>
          Caption en cursiva
        </Caption>
        <Caption bold id='caption-bold'>
          Caption en negrita
        </Caption>
        <Caption bold uppercase color='primary' id='caption-combined' variant='accent'>
          Caption combinado: negrita + mayúsculas + primario + acento
        </Caption>
      </div>

      {/* Casos de uso prácticos */}
      <div className='example-section'>
        <h3>Casos de uso prácticos</h3>

        {/* Subtítulo de sección */}
        <Caption bold uppercase color='primary' id='section-subtitle' size='lg' variant='accent'>
          Subtítulo de sección
        </Caption>

        {/* Etiqueta informativa */}
        <Caption color='neutral' id='info-label' size='sm' variant='solid'>
          Información adicional
        </Caption>

        {/* Estado o badge */}
        <Caption bold uppercase color='success' id='status-badge' size='xs' variant='outline'>
          Activo
        </Caption>

        {/* Caption con contenido rico */}
        <Caption color='secondary' id='rich-caption' size='md' variant='subtle'>
          Este caption tiene <strong>texto en negrita</strong> y <em>texto en cursiva</em>, además de un{' '}
          <button className='text-blue-600 underline bg-transparent border-none p-0 cursor-pointer' type='button'>
            enlace
          </button>
          .
        </Caption>
      </div>
    </div>
  )
}

export default CaptionExamples
