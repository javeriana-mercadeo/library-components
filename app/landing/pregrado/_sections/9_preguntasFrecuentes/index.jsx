'use client'
import { Title, Container, Caption, Button } from '@library/components'

import { useEffect } from 'react'

import script from './script.js'
import './styles.scss'

const PreguntasFrecuentes = () => {
  useEffect(() => {
    script()
  }, [])

  return (
    <Container id='section-eleven' className='container faq'>
      <div>
        <Title className='faq__title' hierarchy='h2' isEditable={false}>
          <Caption id='faq-title'>Preguntas Frecuentes de la </Caption>
          <Caption data-puj-type isEditable={false}>
            Cargando tipo...
          </Caption>
          <Caption id='faq-title-2'> de </Caption>
          <Caption data-puj-name isEditable={false}>
            Cargando nombre...
          </Caption>
        </Title>
        <div className='faq__container'>
          {/* Primera pregunta expandida por defecto */}
          <div className='faq__item active'>
            <Button variant='light' fullWidth isEditable={false} className='faq__question'>
              <h3>¿Cuál es el perfil de ingreso al programa?</h3>
              <span className='faq__icon'>
                <i className='ph ph-caret-down'></i>
              </span>
            </Button>
            <div className='faq__answer'>
              <div className='faq__sub-questions'>
                <h1>Perfil de Ingreso Completo</h1>

                <p>
                  El programa busca estudiantes con <strong>excelencia académica</strong> y <em>pasión por el aprendizaje</em>. Los
                  aspirantes deben demostrar:
                </p>

                <h2>Requisitos Académicos</h2>
                <ul>
                  <li>Título de bachiller académico</li>
                  <li>
                    Promedio mínimo de <strong>4.0</strong> en los últimos dos años
                  </li>
                  <li>Resultados satisfactorios en pruebas de Estado</li>
                </ul>

                <h3>Documentación Requerida</h3>
                <ol>
                  <li>Certificado de notas oficiales</li>
                  <li>Diploma de bachiller</li>
                  <li>Documento de identidad</li>
                  <li>Fotografías recientes</li>
                </ol>

                <div className='overflow-auto portlet-msg-info'>
                  Es importante presentar todos los documentos en las fechas establecidas para garantizar su participación en el proceso.
                </div>

                <h4>Proceso de Selección</h4>
                <p>El proceso incluye las siguientes etapas:</p>

                <table border='1' cellPadding='1' cellSpacing='1' style={{ width: '100%' }}>
                  <caption>Cronograma de Admisiones 2024</caption>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Etapa</strong>
                      </td>
                      <td>
                        <strong>Fecha</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Inscripciones</td>
                      <td>Enero 15 - Febrero 28</td>
                    </tr>
                    <tr>
                      <td>Entrevistas</td>
                      <td>Marzo 10 - Marzo 20</td>
                    </tr>
                  </tbody>
                </table>

                <div className='overflow-auto portlet-msg-alert'>
                  Las entrevistas son obligatorias y no se pueden reprogramar una vez asignadas.
                </div>

                <pre>
                  Código de ejemplo para consulta de resultados: GET /api/admissions/results Headers: {'{'}
                  "Authorization": "Bearer YOUR_TOKEN", "Content-Type": "application/json"
                  {'}'}
                </pre>

                <p>
                  Para más información, consulte el <a href='https://www.universidad.edu.co/admisiones'>portal oficial de admisiones</a> o
                  contáctenos.
                </p>

                <div className='overflow-auto portlet-msg-error'>Atención: Los cupos son limitados. Se recomienda aplicar temprano.</div>

                <p>
                  <cite>Según el estudio de seguimiento de graduados 2023</cite>, el 95% de nuestros egresados encuentra empleo en menos de
                  6 meses.
                </p>

                <p>
                  El programa también utiliza tecnologías avanzadas como <code>React.js</code> y <code>Python</code> para el desarrollo de
                  proyectos.
                </p>

                <p>
                  <u>Importante</u>: Todos los aspirantes deben tener conocimientos básicos en matemáticas y ciencias.
                </p>

                <p>
                  <img alt='Campus universitario' height='266' src='/documents/d/info-prg/campus-img.jpg' />
                </p>

                <p className='faq__sub-question'>¿Cuáles son los pasos específicos para inscribirme?</p>
                <p className='faq__sub-question'>¿Qué documentos adicionales pueden solicitar?</p>
                <p className='faq__sub-question'>¿Cómo funciona el proceso de entrevista?</p>
              </div>
            </div>
          </div>

          {/* Preguntas colapsadas */}
          <div className='faq__item'>
            <Button variant='light' fullWidth isEditable={false} className='faq__question'>
              <h3>¿Qué debo tener en cuenta al momento de realizar la inscripción?</h3>
              <span className='faq__icon'>
                <i className='ph ph-caret-up'></i>
              </span>
            </Button>
            <div className='faq__answer'>
              <div className='faq__sub-questions'>
                <h2>Consideraciones Importantes para la Inscripción</h2>

                <div className='overflow-auto portlet-msg-info'>
                  Revise cuidadosamente toda la información antes de enviar su solicitud.
                </div>

                <h3>Lista de Verificación</h3>
                <ul>
                  <li>
                    Documentos <strong>digitalizados</strong> en formato PDF
                  </li>
                  <li>
                    Información personal <em>actualizada y correcta</em>
                  </li>
                  <li>Pago de derechos de inscripción</li>
                </ul>

                <p>
                  Para consultas técnicas, use el comando: <code>help --inscription</code>
                </p>

                <p className='faq__sub-question'>¿Cuáles son los pasos específicos del proceso?</p>
                <p className='faq__sub-question'>¿Qué hago si tengo problemas técnicos?</p>
              </div>
            </div>
          </div>

          <div className='faq__item'>
            <Button variant='light' fullWidth isEditable={false} className='faq__question'>
              <h3>¿Qué oportunidades tendré para desarrollarme profesionalmente?</h3>
              <span className='faq__icon'>
                <i className='ph ph-caret-down'></i>
              </span>
            </Button>
            <div className='faq__answer'>
              <div className='faq__sub-questions'>
                <h1>Oportunidades de Desarrollo Profesional</h1>

                <p>
                  Nuestro programa ofrece múltiples caminos para tu <strong>crecimiento profesional</strong>:
                </p>

                <h2>Modalidades de Práctica</h2>
                <ol>
                  <li>
                    <u>Práctica empresarial</u> - 6 meses en empresas líderes
                  </li>
                  <li>
                    <em>Proyecto de grado</em> - Desarrollo de solución innovadora
                  </li>
                  <li>Intercambio internacional</li>
                </ol>

                <div className='overflow-auto portlet-msg-alert'>Las prácticas profesionales son obligatorias para obtener el título.</div>

                <h3>Red de Contactos</h3>
                <p>
                  Construirás una <strong>red profesional</strong> sólida a través de:
                </p>

                <table border='1' cellPadding='1' cellSpacing='1' style={{ width: '100%' }}>
                  <caption>Eventos de Networking 2024</caption>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Evento</strong>
                      </td>
                      <td>
                        <strong>Participantes</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Feria Empresarial</td>
                      <td>150+ empresas</td>
                    </tr>
                    <tr>
                      <td>Tech Talks</td>
                      <td>50+ speakers</td>
                    </tr>
                  </tbody>
                </table>

                <p>
                  <cite>Estudio de empleabilidad 2023</cite> muestra que el 92% de nuestros graduados consigue empleo antes de graduarse.
                </p>

                <p className='faq__sub-question'>¿Cómo accedo a las bolsas de empleo?</p>
                <p className='faq__sub-question'>¿Qué certificaciones puedo obtener?</p>
              </div>
            </div>
          </div>

          <div className='faq__item'>
            <Button variant='light' fullWidth isEditable={false} className='faq__question'>
              <h3>Estoy interesado en la investigación, ¿Qué oferta tiene el programa?</h3>
              <span className='faq__icon'>
                <i className='ph ph-caret-down'></i>
              </span>
            </Button>
            <div className='faq__answer'>
              <div className='faq__sub-questions'>
                <h2>Oportunidades de Investigación</h2>

                <p>
                  El programa cuenta con <strong>5 líneas de investigación</strong> activas y más de <em>20 proyectos</em> en desarrollo.
                </p>

                <h3>Grupos de Investigación</h3>
                <ul>
                  <li>Inteligencia Artificial y Machine Learning</li>
                  <li>Desarrollo de Software y Sistemas Web</li>
                  <li>Ciberseguridad y Redes</li>
                  <li>Internet de las Cosas (IoT)</li>
                </ul>

                <div className='overflow-auto portlet-msg-info'>Los estudiantes pueden participar en proyectos desde segundo semestre.</div>

                <h4>Herramientas y Tecnologías</h4>
                <p>Trabajarás con tecnologías de vanguardia:</p>

                <pre>
                  # Ejemplo de stack tecnológico - Frontend: React, Vue.js, Angular - Backend: Node.js, Python, Java - Databases: MongoDB,
                  PostgreSQL - Cloud: AWS, Azure, GCP - ML/AI: TensorFlow, PyTorch
                </pre>

                <div className='overflow-auto portlet-msg-error'>
                  Los cupos para auxiliares de investigación son limitados y se asignan por méritos académicos.
                </div>

                <p>
                  Para más información sobre convocatorias, visite:{' '}
                  <a href='https://investigacion.universidad.edu.co/convocatorias'>Portal de Investigación</a>
                </p>

                <p>
                  <img alt='Laboratorio de investigación' height='200' src='/documents/d/info-prg/lab-research.jpg' />
                </p>

                <p className='faq__sub-question'>¿Cómo puedo postularme como auxiliar de investigación?</p>
                <p className='faq__sub-question'>¿Qué requisitos debo cumplir?</p>
                <p className='faq__sub-question'>¿Hay oportunidades de publicación?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default PreguntasFrecuentes
