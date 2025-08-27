import { Container, Title, Caption, Button, Image, Icon } from '@library/components'

import info from './info.json'
import './styles.scss'

const EducacionEstrella = () => {
  const elementName = info.id || 'educacion-estrella'

  return (
    <section className="educacion-estrella" data-section={elementName}>
      <Container className="educacion-estrella__container">
        {/* Título principal centrado */}
        <Title 
          level="h2"
          size="2xl"
          weight="semibold"
          align="center"
          className="educacion-estrella__main-title"
        >
          Financia tu matrícula desde tasa 0 y a largo plazo
        </Title>

        <div className="educacion-estrella__content-wrapper">
          
          {/* Text Container */}
          <div className="educacion-estrella__text-container">
            <div className="educacion-estrella__header">
              <Caption className="educacion-estrella__subtitle">
                Con Educación Estrella® y la Javeriana, accede a 'Línea Estrella Cero' o 'Línea Estrella Plus' para financiar tu pregrado.
              </Caption>
            </div>

            <div className="educacion-estrella__benefits">
              <ul className="educacion-estrella__benefits-list">
                <li>
                  <strong>Puedes cubrir hasta el 100% de tu matrícula.</strong>
                </li>
                <li>
                  <strong>Con tasas desde 0% de interés.</strong>
                </li>
                <li>
                  <strong>Cuotas fijas mensuales.</strong>
                </li>
                <li>
                  <strong>Largo plazo.</strong>
                </li>
              </ul>
              
              <Caption className="educacion-estrella__process-info">
                El proceso es 100% digital, tarda menos de 10 minutos y está disponible para estudiantes nuevos.
              </Caption>
            </div>

            <div className="educacion-estrella__cta">
              <Button 
                variant="solid" 
                className="educacion-estrella__cta-button"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="arrow-square-out" />
                Conoce más aquí
              </Button>
            </div>
          </div>

          {/* Media Container - Logo */}
          <div className="educacion-estrella__media-container">
            <div className="educacion-estrella__logo-container">
              <Image 
                src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-ee-r"
                alt="Educación Estrella"
                className="educacion-estrella__logo"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default EducacionEstrella