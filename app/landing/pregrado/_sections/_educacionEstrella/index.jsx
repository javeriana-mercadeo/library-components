import { useScript } from '@hooks'
import { Container, Title, Button, Image } from '@/app/components'

import info from './info.json'
import './styles.scss'

const EducacionEstrella = () => {
  const elementName = info.id || 'educacion-estrella'
  const staticMode = false // Cambiar a true para modo estático (evitar la carga del script en desarrollo [local])
  useScript(() => import('./script.js'), { staticMode })

  // CONTENIDO ENRIQUECIDO PARA EDUCACIÓN ESTRELLA
  const richContent = {
    title: 'Financia tu matrícula desde tasa 0 y a largo plazo',
    subtitle: `
      <p>Con <strong>Educación Estrella®</strong> y la Javeriana, accede a <em>'Línea Estrella Cero'</em> o <em>'Línea Estrella Plus'</em> para financiar tu pregrado.</p>
    `,
    benefits: `
      <h3>Beneficios Destacados</h3>
      <ul>
        <li><strong>Puedes cubrir hasta el 100%</strong> de tu matrícula</li>
        <li><strong>Con tasas desde 0%</strong> de interés</li>
        <li><strong>Cuotas fijas mensuales</strong> sin sorpresas</li>
        <li><strong>Largo plazo</strong> para mayor comodidad</li>
      </ul>

      <div class="overflow-auto portlet-msg-info">
        El proceso es 100% digital, tarda menos de 10 minutos y está disponible para estudiantes nuevos.
      </div>

      <h4>Líneas de Financiamiento Disponibles</h4>
      <table border="1" style="width: 100%">
        <caption>Opciones de Financiamiento Educación Estrella®</caption>
        <tbody>
          <tr>
            <td><strong>Línea</strong></td>
            <td><strong>Tasa de Interés</strong></td>
            <td><strong>Cobertura</strong></td>
          </tr>
          <tr>
            <td>Línea Estrella Cero</td>
            <td>0% E.A.</td>
            <td>Hasta 100% matrícula</td>
          </tr>
          <tr>
            <td>Línea Estrella Plus</td>
            <td>Desde 8.5% E.A.</td>
            <td>Hasta 100% matrícula + gastos</td>
          </tr>
        </tbody>
      </table>

      <h4>Requisitos Generales</h4>
      <ol>
        <li><em>Estudiante nuevo admitido</em> en pregrado</li>
        <li><em>Documentación académica</em> completa</li>
        <li><em>Evaluación crediticia</em> aprobada</li>
        <li><em>Firma digital</em> del contrato</li>
      </ol>

      <div class="overflow-auto portlet-msg-alert">
        El cupo es limitado y está sujeto a evaluación crediticia. Aplica solo para estudiantes de primer ingreso.
      </div>

      <p>Para más información sobre el proceso de aplicación, visita el <a href="https://www.educacionestrella.com">portal oficial de Educación Estrella</a> o contáctanos al <code>(+57) 1 320 8320 ext. 5050</code></p>

      <cite>*Educación Estrella® es una marca registrada. Consulta términos y condiciones específicos.</cite>
    `,
    buttonText: 'Solicitar financiamiento',
    buttonLink: 'https://www.educacionestrella.com/javeriana'
  }

  return (
    <section className='educacion-estrella' data-section={elementName}>
      <Container className='educacion-estrella__container'>
        {/* Título principal centrado */}
        <Title level='h2' size='2xl' weight='semibold' align='center' className='educacion-estrella__main-title'>
          {richContent.title}
        </Title>

        <div className='educacion-estrella__content-wrapper'>
          {/* Text Container con contenido enriquecido */}
          <div className='educacion-estrella__text-container'>
            {/* Subtítulo con texto enriquecido */}
            <div
              className='educacion-estrella__subtitle educacion-estrella-rich-content'
              data-raw-content={richContent.subtitle}
              dangerouslySetInnerHTML={{ __html: richContent.subtitle }}
            />

            {/* Beneficios y contenido enriquecido principal */}
            <div
              className='educacion-estrella__benefits educacion-estrella-rich-content'
              data-raw-content={richContent.benefits}
              dangerouslySetInnerHTML={{ __html: richContent.benefits }}
            />

            {/* CTA Button */}
            <div className='educacion-estrella__cta'>
              <Button
                variant='solid'
                className='educacion-estrella__cta-button'
                href={richContent.buttonLink}
                target='_blank'
                rel='noopener noreferrer'>
                {richContent.buttonText}
              </Button>
            </div>
          </div>

          {/* Media Container - Logo */}
          <div className='educacion-estrella__media-container'>
            <div className='educacion-estrella__logo-container'>
              <Image
                src='https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-ee-r'
                alt='Educación Estrella - Financiamiento estudiantil'
                className='educacion-estrella__logo'
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default EducacionEstrella
