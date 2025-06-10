import Caption from '@library/components/contain/caption'

// Ejemplos de uso del componente Caption

const CaptionExamples = () => {
  return (
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
          Caption extra grande
        </Caption>
      </div>

      {/* Colores y variantes */}
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
          Caption neutral
        </Caption>
      </div>

      {/* Variantes de diseño */}
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
          Variante con acento
        </Caption>
      </div>

      {/* Alineaciones */}
      <div className="example-section">
        <h3>Alineaciones</h3>
        <Caption align="left" id="caption-left">
          Caption alineado a la izquierda
        </Caption>
        <Caption align="center" id="caption-center">
          Caption centrado
        </Caption>
        <Caption align="right" id="caption-right">
          Caption alineado a la derecha
        </Caption>
      </div>

      {/* Modificadores de texto */}
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
          Caption combinado: negrita + mayúsculas + primario + acento
        </Caption>
      </div>

      {/* Casos de uso prácticos */}
      <div className="example-section">
        <h3>Casos de uso prácticos</h3>

        {/* Subtítulo de sección */}
        <Caption color="primary" variant="accent" size="lg" bold uppercase id="section-subtitle">
          Subtítulo de sección
        </Caption>

        {/* Etiqueta informativa */}
        <Caption color="neutral" variant="solid" size="sm" id="info-label">
          Información adicional
        </Caption>

        {/* Estado o badge */}
        <Caption color="success" variant="outline" size="xs" bold uppercase id="status-badge">
          Activo
        </Caption>

        {/* Caption con contenido rico */}
        <Caption color="secondary" variant="subtle" size="md" id="rich-caption">
          Este caption tiene <strong>texto en negrita</strong> y <em>texto en cursiva</em>, además de un <a href="#">enlace</a>.
        </Caption>
      </div>
    </div>
  )
}

export default CaptionExamples
