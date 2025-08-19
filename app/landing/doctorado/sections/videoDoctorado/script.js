// pages/doctorado.js o components/pages/DoctoradoPage.js
import VideoDoctorado from '../components/VideoDoctorado'

const DoctoradoPage = () => {
  // Configuración básica (usa valores por defecto)
  const basicConfig = {
    backgroundMedia: {
      backgroundUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/semana/BFV7EVLSUNEGJBWIRE4XO64FXM.gif',
      mediaType: 'image'
    }
  }

  // Configuración con video de fondo
  const videoConfig = {
    backgroundMedia: {
      backgroundUrl: 'https://example.com/video-background.mp4',
      mediaType: 'video'
    },
    title: 'Doctorado en Ciencias Sociales y Humanas',
    description: 'Comprende, analiza y explica los complejos problemas sociales y humanos.',
    showAnimations: true
  }

  // Configuración completa personalizada
  const customConfig = {
    backgroundMedia: {
      backgroundUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
      mediaType: 'image'
    },
    title: 'Doctorado Personalizado',
    description: 'Descripción personalizada del programa de doctorado.',
    degree: 'Doctor en Ciencias Personalizadas',
    sniesCode: 'SNIES 12345',
    academicLevel: 'Posgrado Avanzado',
    duration: 'Seis (6) semestres',
    modality: 'Virtual / Nocturna',
    timeAvailability: 'Modalidad flexible',
    semesterInvestment: '$25.000.000',
    inscription: 'Inscríbete ahora',
    ctaLink: 'https://universidad.edu.co/inscripciones',
    footnote: '*Programa con modalidad híbrida disponible',
    showAnimations: true,
    isEditMode: false
  }

  return (
    <div>
      {/* Uso básico */}
      <VideoDoctorado {...basicConfig} />
      
      {/* O con configuración personalizada */}
      {/* <VideoDoctorado {...customConfig} /> */}
      
      {/* O con props individuales */}
      {/*
      <VideoDoctorado 
        backgroundMedia={{
          backgroundUrl: 'https://example.com/background.jpg',
          mediaType: 'image'
        }}
        title="Mi Doctorado"
        description="Descripción del programa"
        semesterInvestment="$20.000.000"
        ctaLink="/inscripciones"
        showAnimations={true}
      />
      */}
    </div>
  )
}

export default DoctoradoPage

// Ejemplo para simular modo edición (desarrollo/testing)
export const DoctoradoEditMode = () => {
  return (
    <VideoDoctorado 
      isEditMode={true}
      backgroundMedia={{
        backgroundUrl: 'https://example.com/editable-background.jpg',
        mediaType: 'image'
      }}
      showAnimations={false}
    />
  )
}

// Ejemplo con gestión de estado global (si usas Context o Redux)
export const DoctoradoWithGlobalState = () => {
  // Simular datos que vienen de un CMS o API
  const programData = {
    id: 'doctorado-ciencias-sociales',
    backgroundMedia: {
      backgroundUrl: process.env.NEXT_PUBLIC_CDN_URL + '/backgrounds/doctorado-bg.jpg',
      mediaType: 'image'
    },
    content: {
      title: 'Doctorado en Ciencias Sociales y Humanas',
      description: 'Programa de excelencia académica...',
      degree: 'Doctor en Ciencias Sociales y Humanas',
      sniesCode: 'SNIES 54104',
      academicLevel: 'Posgrado',
      duration: 'Cuatro (4) semestres',
      modality: 'Presencial / Diurna',
      timeAvailability: 'Disponibilidad de tiempo completo',
      semesterInvestment: '$19.871.000',
      inscription: 'Descubre cómo inscribirte',
      ctaLink: '/inscripciones',
      footnote: '*Opción de clase remota y sincrónica disponible'
    },
    settings: {
      showAnimations: true,
      isEditMode: false
    }
  }

  return (
    <VideoDoctorado 
      {...programData.backgroundMedia}
      {...programData.content}
      {...programData.settings}
      backgroundMedia={programData.backgroundMedia}
    />
  )
}