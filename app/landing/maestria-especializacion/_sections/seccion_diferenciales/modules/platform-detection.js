// ===========================================
// PLATFORM DETECTION MODULE
// ===========================================

/**
 * Módulo para detección de plataforma, dispositivo y conexión
 * Proporciona configuración específica por plataforma
 */

// Configuraciones específicas por plataforma
const PLATFORM_CONFIGS = {
  // iOS Safari específico
  ios: {
    maxRetries: 2,
    playbackAttempts: 1,
    intersectionThreshold: 0.3,
    loadingTimeout: 6000,
    preload: 'metadata', // Cambiar a metadata para mejor experiencia
    useIntersectionObserver: true // Habilitar para mejor performance
  },
  // Android específico
  android: {
    maxRetries: 3,
    playbackAttempts: 2,
    intersectionThreshold: 0.3,
    loadingTimeout: 6000,
    preload: 'metadata',
    useIntersectionObserver: true
  },
  // Desktop fallback
  desktop: {
    maxRetries: 3,
    playbackAttempts: 3,
    intersectionThreshold: 0.3,
    loadingTimeout: 5000,
    preload: 'metadata',
    useIntersectionObserver: true
  }
}

// Configuración general
const GENERAL_CONFIG = {
  aggressivePlaybackDelay: 300,
  lazyLoadMargin: '100px',
  resourcePriority: {
    critical: 0, // Imágenes de fallback
    high: 1, // Videos desktop
    normal: 2, // Videos mobile
    low: 3 // Assets secundarios
  }
}

/**
 * Detectar velocidad de conexión
 */
function getConnectionSpeed() {
  if ('connection' in navigator) {
    const connection = navigator.connection
    if (connection.effectiveType) {
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'slow'
        case '3g':
          return 'medium'
        case '4g':
          return 'fast'
        default:
          return 'unknown'
      }
    }
  }
  return 'unknown'
}

/**
 * Detectar plataforma específica con precisión
 */
function detectPlatform() {
  const ua = navigator.userAgent
  const platform = {
    isIOS: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
    isAndroid: /Android/.test(ua),
    isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
    isChrome: /Chrome/.test(ua),
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
    connectionSpeed: getConnectionSpeed(),
    hasLowMemory: navigator.deviceMemory && navigator.deviceMemory < 4
  }

  // Determinar configuración específica
  let config
  if (platform.isIOS) {
    config = PLATFORM_CONFIGS.ios
    platform.name = 'ios'
  } else if (platform.isAndroid) {
    config = PLATFORM_CONFIGS.android
    platform.name = 'android'
  } else {
    config = PLATFORM_CONFIGS.desktop
    platform.name = 'desktop'
  }

  return {
    ...platform,
    config: { ...config, ...GENERAL_CONFIG }
  }
}

/**
 * Verificar si el dispositivo tiene limitaciones de rendimiento
 */
function hasPerformanceLimitations() {
  const platform = detectPlatform()
  return platform.hasLowMemory || platform.connectionSpeed === 'slow' || (platform.isIOS && platform.isSafari)
}

/**
 * Obtener estrategia recomendada basada en plataforma
 */
function getRecommendedStrategy() {
  const platform = detectPlatform()

  if (platform.isIOS) {
    return 'fallback-first' // Mostrar imagen primero, video bajo demanda
  } else if (platform.isAndroid) {
    return 'progressive' // Carga progresiva
  } else {
    return 'standard' // Carga estándar
  }
}

export { detectPlatform, getConnectionSpeed, hasPerformanceLimitations, getRecommendedStrategy, PLATFORM_CONFIGS, GENERAL_CONFIG }
