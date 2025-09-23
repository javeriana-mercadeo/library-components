import { Container, Title, Caption, Button, Icon, Image } from '@library/components'

import info from './info.json'
import './styles.scss'

// Importar el script para que se ejecute
import './script.js'

const Becas = () => {
  const elementName = info.id || 'becas'
  const baseClass = 'scholarships'

  // Array con la información de las tabs - AHORA CON TEXTO ENRIQUECIDO
  const scholarshipTabs = [
    {
      id: 'becas',
      label: 'Nuestras Becas',
      icon: 'ph-graduation-cap',
      image:
        'https://www.javeriana.edu.co/recursosdb/20125/12256677/apoyo-financiero-y-descuentos.JPG/25b2a8f4-71f3-da2e-2728-b8af1111a992',
      imageAlt: 'Apoyo financiero y descuentos - Becas Universidad Javeriana',
      title: 'Becas disponibles',
      content: `
        <p>Contamos con un <strong>área de apoyo financiero</strong> que ofrece diferentes becas para que inicies tus estudios de pregrado.</p>
        
        <h3>Tipos de Becas Disponibles</h3>
        <p>La Universidad ofrece opciones de becas* para aspirantes admitidos a pregrado con <em>excelente desempeño académico</em> y/o con dificultades económicas. Explora los requisitos para aplicar a:</p>
        
        <ul>
          <li><strong>Beca Ingresa a la Javeriana</strong> - Hasta 50% de descuento en matrícula</li>
          <li><strong>Beca Bachiller Destacado</strong> - Para estudiantes con promedio superior a 4.5</li>
          <li><strong>Beca Bachiller Destacado ACODESI</strong> - Convenio especial con colegios ACODESI</li>
        </ul>
        
        <div class="overflow-auto portlet-msg-info">
          Es importante presentar todos los documentos en las fechas establecidas para garantizar tu participación en el proceso.
        </div>
        
        <h4>Proceso de Aplicación</h4>
        <ol>
          <li>Completar formulario de solicitud en línea</li>
          <li>Cargar documentos requeridos (certificados, notas)</li>
          <li>Entrevista personal (si aplica)</li>
          <li>Notificación de resultados por correo electrónico</li>
        </ol>
        
        <table border="1" style="width: 100%">
          <caption>Cronograma de Becas 2024</caption>
          <tbody>
            <tr>
              <td><strong>Convocatoria</strong></td>
              <td><strong>Fecha Límite</strong></td>
              <td><strong>Resultados</strong></td>
            </tr>
            <tr>
              <td>Primera convocatoria</td>
              <td>Marzo 15, 2024</td>
              <td>Abril 30, 2024</td>
            </tr>
            <tr>
              <td>Segunda convocatoria</td>
              <td>Junio 30, 2024</td>
              <td>Agosto 15, 2024</td>
            </tr>
          </tbody>
        </table>
        
        <div class="overflow-auto portlet-msg-alert">
          Los cupos son limitados. Se recomienda aplicar en la primera convocatoria para tener mayores oportunidades.
        </div>
        
        <p>Para más información consulta nuestro <a href="https://www.javeriana.edu.co/becas">portal oficial de becas</a> o contáctanos al correo <code>becas@javeriana.edu.co</code></p>
        
        <cite>*Aplican términos y condiciones. Consulta el reglamento completo en el portal web.</cite>
      `,
      buttonText: 'Más información',
      buttonLink: 'https://www.javeriana.edu.co/becas'
    },
    {
      id: 'financiacion',
      label: 'Programa de Financiación',
      icon: 'ph-credit-card',
      image:
        'https://www.javerianacali.edu.co/sites/default/files/styles/image_1100x700/public/2020-02/programas-academicos-1100x700.jpg.webp?itok=MglNGFBd',
      imageAlt: 'Programas académicos - Opciones de financiación Universidad Javeriana',
      title: 'Opciones de financiación',
      content: `
        <p>También contamos con <strong>diversas opciones de financiación</strong> para facilitar el acceso a la educación superior de calidad.</p>
        
        <h3>Modalidades de Financiamiento</h3>
        <ul>
          <li><strong>A corto plazo</strong> - Directamente con la Universidad, tasa de interés preferencial del <u>8% anual</u></li>
          <li><strong>A mediano plazo</strong> - Convenios con entidades bancarias, hasta 24 meses</li>
          <li><strong>A largo plazo</strong> - Con entidades aliadas que ofrecen bajas tasas de interés, hasta 60 meses</li>
          <li>Conoce también nuestros <strong>descuentos y convenios</strong> con entidades públicas y privadas</li>
        </ul>
        
        <div class="overflow-auto portlet-msg-info">
          Puedes combinar becas y financiamiento para maximizar los beneficios económicos disponibles.
        </div>
        
        <h4>Entidades Financieras Aliadas</h4>
        <table border="1" style="width: 100%">
          <caption>Opciones de Financiamiento Externo</caption>
          <tbody>
            <tr>
              <td><strong>Entidad</strong></td>
              <td><strong>Tasa de Interés</strong></td>
              <td><strong>Plazo Máximo</strong></td>
            </tr>
            <tr>
              <td>ICETEX</td>
              <td>Desde 0% - 12%</td>
              <td>Hasta graduación + 2 años</td>
            </tr>
            <tr>
              <td>Bancolombia</td>
              <td>Desde 10.5%</td>
              <td>60 meses</td>
            </tr>
            <tr>
              <td>Banco de Bogotá</td>
              <td>Desde 11.2%</td>
              <td>48 meses</td>
            </tr>
          </tbody>
        </table>
        
        <h4>Descuentos Especiales</h4>
        <ol>
          <li><em>Convenio con empresas</em> - Hasta 15% de descuento para hijos de empleados</li>
          <li><em>Egresados PUJ</em> - 10% de descuento para hijos de exalumnos</li>
          <li><em>Hermanos</em> - 5% de descuento adicional por cada hermano matriculado</li>
          <li><em>Pronto pago</em> - 3% de descuento pagando matrícula antes del 15 de enero</li>
        </ol>
        
        <div class="overflow-auto portlet-msg-alert">
          Las tasas de interés pueden variar según las condiciones del mercado y están sujetas a aprobación crediticia.
        </div>
        
        <p>Agenda tu cita con nuestros asesores financieros llamando al <code>(+57) 1 320 8320 ext. 4040</code> o visítanos en el <a href="https://www.javeriana.edu.co/financiacion">portal de financiación</a></p>
        
        <cite>Los descuentos no son acumulables salvo indicación contraria. Consulta términos y condiciones específicos.</cite>
      `,
      buttonText: 'Más información',
      buttonLink: 'https://www.javeriana.edu.co/financiacion'
    }
  ]

  return (
    <section className={`${baseClass}_container`}>
      <Container id={elementName} className={baseClass}>
        {/* Título principal de la sección */}
        <Title
          id={`title-${elementName}-main-title`}
          className={`${baseClass}__main-title`}
          hierarchy='h2'
          weight='semibold'
          size='2xl'
          align='center'>
          Becas y Financiación
        </Title>

        <div className={`${baseClass}__tabs-container`}>
          {/* Navegación de tabs */}
          <div className={`${baseClass}__tabs-nav`} role='tablist' aria-label='Opciones de becas y financiación'>
            <div className={`${baseClass}__tabs-wrapper`}>
              {scholarshipTabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`${baseClass}__tab-button ${index === 0 ? 'active' : ''}`}
                  id={`${tab.id}-tab`}
                  data-tabs-target={`#${tab.id}-panel`}
                  type='button'
                  role='tab'
                  aria-controls={`${tab.id}-panel`}
                  aria-selected={index === 0 ? 'true' : 'false'}
                  tabIndex={index === 0 ? 0 : -1}>
                  <Icon icon={tab.icon} size='sm' className={`${baseClass}__tab-icon`} />
                  <span id={`span-${elementName}-tab-${tab.id}`}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de las tabs */}
          <div className={`${baseClass}__tabs-content`}>
            {scholarshipTabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`${baseClass}__tab-panel ${index !== 0 ? 'hidden' : ''}`}
                id={`${tab.id}-panel`}
                role='tabpanel'
                aria-labelledby={`${tab.id}-tab`}
                aria-hidden={index !== 0 ? 'true' : 'false'}>
                <div className={`${baseClass}__content-wrapper`}>
                  <div className={`${baseClass}__media-container`}>
                    {tab.image ? (
                      <Image
                        id={`image-${elementName}-${tab.id}`}
                        src={tab.image}
                        alt={tab.imageAlt}
                        className={`${baseClass}__content-image`}
                      />
                    ) : (
                      <Icon icon={tab.icon} size='lg' className={`${baseClass}__content-icon`} />
                    )}
                  </div>
                  <div className={`${baseClass}__text-container`}>
                    <Caption
                      id={`caption-${elementName}-${tab.id}-title`}
                      className={`${baseClass}__content-title`}
                      size='xl'
                      weight='semibold'
                      color='neutral'>
                      {tab.title}
                    </Caption>
                    <div
                      id={`div-${elementName}-${tab.id}-content`}
                      className={`${baseClass}__content-text ${baseClass}-rich-content`}
                      data-raw-content={tab.content}
                      dangerouslySetInnerHTML={{ __html: tab.content }}></div>
                    <Button
                      id={`button-${elementName}-${tab.id}`}
                      className={`${baseClass}__cta-button`}
                      variant='bordered'
                      color='secondary'
                      size='md'
                      href={tab.buttonLink}>
                      {tab.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Becas
