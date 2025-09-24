import Caption from '@library/components/contain/caption'

// Ejemplos de uso del componente Caption

const CaptionExamples = () => {
  return (
<<<<<<< HEAD
    <div className="caption-examples">
      {/* Tamaños */}
      <div className="example-section">
        <h3>Tamaños</h3>
        <Caption size="xs" id="caption-xs">
          Caption extra pequeño
        </Caption>
        <Caption size="sm" id="caption-sm">
          Caption pequeño
        </Caption>
        <Caption size="md" id="caption-md">
          Caption mediano (por defecto)
        </Caption>
        <Caption size="lg" id="caption-lg">
          Caption grande
        </Caption>
        <Caption size="xl" id="caption-xl">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Caption extra grande
        </Caption>
      </div>

      {/* Colores y variantes */}
<<<<<<< HEAD
      <div className="example-section">
        <h3>Colores con variante solid</h3>
        <Caption color="primary" variant="solid" id="caption-primary">
          Caption primario
        </Caption>
        <Caption color="secondary" variant="solid" id="caption-secondary">
          Caption secundario
        </Caption>
        <Caption color="success" variant="solid" id="caption-success">
          Caption de éxito
        </Caption>
        <Caption color="warning" variant="solid" id="caption-warning">
          Caption de advertencia
        </Caption>
        <Caption color="danger" variant="solid" id="caption-danger">
          Caption de peligro
        </Caption>
        <Caption color="neutral" variant="solid" id="caption-neutral">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Caption neutral
        </Caption>
      </div>

      {/* Variantes de diseño */}
<<<<<<< HEAD
      <div className="example-section">
        <h3>Variantes de diseño (color primary)</h3>
        <Caption color="primary" variant="solid" id="caption-solid">
          Variante sólida
        </Caption>
        <Caption color="primary" variant="outline" id="caption-outline">
          Variante con borde
        </Caption>
        <Caption color="primary" variant="subtle" id="caption-subtle">
          Variante sutil
        </Caption>
        <Caption color="primary" variant="accent" id="caption-accent">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Variante con acento
        </Caption>
      </div>

      {/* Alineaciones */}
<<<<<<< HEAD
      <div className="example-section">
        <h3>Alineaciones</h3>
        <Caption align="left" id="caption-left">
          Caption alineado a la izquierda
        </Caption>
        <Caption align="center" id="caption-center">
          Caption centrado
        </Caption>
        <Caption align="right" id="caption-right">
=======
      <div className='example-section'>
        <h3>Alineaciones</h3>
        <Caption align='left' id='caption-left'>
          Caption alineado a la izquierda
        </Caption>
        <Caption align='center' id='caption-center'>
          Caption centrado
        </Caption>
        <Caption align='right' id='caption-right'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Caption alineado a la derecha
        </Caption>
      </div>

      {/* Modificadores de texto */}
<<<<<<< HEAD
      <div className="example-section">
        <h3>Modificadores de texto</h3>
        <Caption uppercase id="caption-uppercase">
          Caption en mayúsculas
        </Caption>
        <Caption italic id="caption-italic">
          Caption en cursiva
        </Caption>
        <Caption bold id="caption-bold">
          Caption en negrita
        </Caption>
        <Caption bold uppercase color="primary" variant="accent" id="caption-combined">
=======
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
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Caption combinado: negrita + mayúsculas + primario + acento
        </Caption>
      </div>

      {/* Casos de uso prácticos */}
<<<<<<< HEAD
      <div className="example-section">
        <h3>Casos de uso prácticos</h3>

        {/* Subtítulo de sección */}
        <Caption color="primary" variant="accent" size="lg" bold uppercase id="section-subtitle">
=======
      <div className='example-section'>
        <h3>Casos de uso prácticos</h3>

        {/* Subtítulo de sección */}
        <Caption bold uppercase color='primary' id='section-subtitle' size='lg' variant='accent'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Subtítulo de sección
        </Caption>

        {/* Etiqueta informativa */}
<<<<<<< HEAD
        <Caption color="neutral" variant="solid" size="sm" id="info-label">
=======
        <Caption color='neutral' id='info-label' size='sm' variant='solid'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Información adicional
        </Caption>

        {/* Estado o badge */}
<<<<<<< HEAD
        <Caption color="success" variant="outline" size="xs" bold uppercase id="status-badge">
=======
        <Caption bold uppercase color='success' id='status-badge' size='xs' variant='outline'>
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
          Activo
        </Caption>

        {/* Caption con contenido rico */}
<<<<<<< HEAD
        <Caption color="secondary" variant="subtle" size="md" id="rich-caption">
          Este caption tiene <strong>texto en negrita</strong> y <em>texto en cursiva</em>, además de un <a href="#">enlace</a>.
=======
        <Caption color='secondary' id='rich-caption' size='md' variant='subtle'>
          Este caption tiene <strong>texto en negrita</strong> y <em>texto en cursiva</em>, además de un <a href='#'>enlace</a>.
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
        </Caption>
      </div>
    </div>
  )
}

export default CaptionExamples
