import React from 'react'
import './styles.scss'
import Container from '@library/components/container'
const ListNSection = () => {
  return (
    <Container>
      <ol className="custom-numbered-list">
        <li>Acta de grado o diploma de bachillerato.</li>
        <li>Documento de identidad.</li>
        <li>Resultado de la prueba SABER 11 o examen equivalente.</li>
        <li>Certificado de EPS (solo para programas de salud).</li>
      </ol>
    </Container>
  )
}

export default ListNSection
