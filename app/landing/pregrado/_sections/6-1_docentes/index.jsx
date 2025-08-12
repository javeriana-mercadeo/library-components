'use client'
import { Container, Title, Paragraph, Button as Btn, Image } from '@library/components'

import { useEffect, useState } from 'react'

import script from './script.js'
import info from './info.json'
import './styles.scss'

const DocentesAPI = () => {
  const elementName = info.id || 'docentes-api'
  const baseClass = 'expert-carousel-api'
  const [docentes, setDocentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [programCode, setProgramCode] = useState(null)

  // Escuchar el evento de carga del programa
  useEffect(() => {
    const handleDataLoad = (event) => {
      if (event.detail && event.detail.program && event.detail.program.codigo) {
        setProgramCode(event.detail.program.codigo)
      }
    }

    // Escuchar el evento personalizado
    window.addEventListener('data_load-program', handleDataLoad)

    return () => {
      window.removeEventListener('data_load-program', handleDataLoad)
    }
  }, [])

  // Cargar datos de docentes cuando tengamos el código del programa
  useEffect(() => {
    if (!programCode) return

    const fetchDocentes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(
          `https://dti-pru.javeriana.edu.co/api-portal/investigadores?idProgramaAcademico=${programCode}`
        )
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.investigadores && Array.isArray(data.investigadores)) {
          setDocentes(data.investigadores)
        } else {
          setDocentes([])
        }
      } catch (err) {
        console.error('Error fetching docentes:', err)
        setError(err.message)
        setDocentes([])
      } finally {
        setLoading(false)
      }
    }

    fetchDocentes()
  }, [programCode])

  useEffect(() => {
    if (!loading && docentes.length > 0) {
      script()
    }
  }, [loading, docentes])

  // Función para obtener el cargo principal en español
  const getPrimaryCargo = (investigador) => {
    if (!investigador.asociacionesOrganizacionales || investigador.asociacionesOrganizacionales.length === 0) {
      return 'Docente'
    }

    const cargo = investigador.asociacionesOrganizacionales[0].cargo
    if (!cargo.descripcion) return 'Docente'

    // Buscar descripción en español
    const cargoES = cargo.descripcion.find(desc => desc.idioma === 'es_CO')
    return cargoES ? cargoES.valor : cargo.descripcion[0].valor || 'Docente'
  }

  // Función para renderizar una tarjeta de docente
  const renderDocenteCard = (investigador, index) => {
    const nombreCompleto = `${investigador.nombresApellidos.nombres} ${investigador.nombresApellidos.apellidos}`
    const cargo = getPrimaryCargo(investigador)
    const imagen = investigador.foto && investigador.foto.length > 0 ? investigador.foto[0].url : null
    const profileUrl = investigador.informacionAdicional?.portalUrl || '#'

    return (
      <div key={investigador.uuid || index} className={`${baseClass}_slide swiper-slide`} role='listitem'>
        <div className={`${baseClass}_card`}>
          <div className={`${baseClass}_card-header`}>
            {imagen ? (
              <Image
                id={`${elementName}-image-${index + 1}`}
                src={imagen}
                alt={nombreCompleto}
                className={`${baseClass}_card-image`}
                isEditable={false}
              />
            ) : (
              <div className={`${baseClass}_card-image-placeholder`}>
                <i className="ph ph-user-circle" aria-hidden="true"></i>
              </div>
            )}
          </div>

          <div className={`${baseClass}_card-content`}>
            <Title
              hierarchy='h2'
              size='md'
              weight='bold'
              className={`${baseClass}_card-name`}
              id={`${elementName}-name-${index + 1}`}
              color='neutral'
              isEditable={false}>
              {nombreCompleto}
            </Title>

            <Paragraph
              size='sm'
              className={`${baseClass}_card-title`}
              id={`${elementName}-title-${index + 1}`}
              color='neutral'
              isEditable={false}>
              {cargo}
            </Paragraph>

            {profileUrl !== '#' && (
              <Btn
                href={profileUrl}
                target='_blank'
                variant='link'
                size='md'
                className={`${baseClass}_card-link`}
                id={`${elementName}-link-${index + 1}`}
                color='neutral'
                isEditable={false}>
                Ver Perfil
              </Btn>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Estados de carga y error
  if (loading) {
    return (
      <section id='section-six-api'>
        <div className='color-container'>
          <Container id={elementName} className={baseClass}>
            <Title
              hierarchy='h2'
              size='2xl'
              weight='bold'
              align='center'
              className={`${baseClass}__title`}
              id={`${elementName}-title`}
              color='neutral'>
              Docentes Expertos
            </Title>
            <div className={`${baseClass}__loading`}>
              <Paragraph align='center' color='neutral'>
                Cargando información de docentes...
              </Paragraph>
            </div>
          </Container>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id='section-six-api'>
        <div className='color-container'>
          <Container id={elementName} className={baseClass}>
            <Title
              hierarchy='h2'
              size='2xl'
              weight='bold'
              align='center'
              className={`${baseClass}__title`}
              id={`${elementName}-title`}
              color='neutral'>
              Docentes Expertos
            </Title>
            <div className={`${baseClass}__error`}>
              <Paragraph align='center' color='neutral'>
                No se pudo cargar la información de docentes.
              </Paragraph>
            </div>
          </Container>
        </div>
      </section>
    )
  }

  if (docentes.length === 0) {
    return (
      <section id='section-six-api'>
        <div className='color-container'>
          <Container id={elementName} className={baseClass}>
            <Title
              hierarchy='h2'
              size='2xl'
              weight='bold'
              align='center'
              className={`${baseClass}__title`}
              id={`${elementName}-title`}
              color='neutral'>
              Docentes Expertos
            </Title>
            <div className={`${baseClass}__empty`}>
              <Paragraph align='center' color='neutral'>
                No hay información de docentes disponible para este programa.
              </Paragraph>
            </div>
          </Container>
        </div>
      </section>
    )
  }

  return (
    <section id='section-six-api'>
      <div className='color-container'>
        <Container id={elementName} className={baseClass}>
          <Title
            hierarchy='h2'
            size='2xl'
            weight='bold'
            align='center'
            className={`${baseClass}__title`}
            id={`${elementName}-title`}
            color='neutral'>
            Docentes Expertos
          </Title>

          <Paragraph align='center' className={`${baseClass}__description`} id={`${elementName}-description`} color='neutral'>
            Docentes expertos con experiencia práctica y académica, comprometidos con la excelencia e innovación en el programa.
          </Paragraph>

          <div className={`${baseClass}_carousel swiper`}>
            <div className={`${baseClass}_wrapper expert-api-swiper`}>
              <div className={`${baseClass}_slides swiper-wrapper`} role='list'>
                {docentes.map((investigador, index) => renderDocenteCard(investigador, index))}
              </div>

              {/* Botones de navegación */}
              <button className={`swiper-slide-button ${baseClass}_prev`} aria-label='Ir al slide anterior' type='button'>
                <i className='ph ph-arrow-circle-left' aria-hidden='true'></i>
              </button>
              <button className={`swiper-slide-button ${baseClass}_next`} aria-label='Ir al siguiente slide' type='button'>
                <i className='ph ph-arrow-circle-right' aria-hidden='true'></i>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default DocentesAPI