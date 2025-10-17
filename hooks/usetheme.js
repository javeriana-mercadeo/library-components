'use client'

// hooks/useTheme.js
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEYS = {
  BASE: 'theme-base',
  FACULTY: 'theme-faculty'
}

const DEFAULT_THEMES = {
  BASE: 'light',
  FACULTY: 'default'
}

const FACULTY_LIST = [
  'default',
  'arquitectura-diseno',
  'artes',
  'ciencias',
  'ciencias-economicas-administrativas',
  'ciencias-juridicas',
  'ciencias-politicas-relaciones-internacionales',
  'ciencias-sociales',
  'comunicacion-lenguaje',
  'derecho-canonico',
  'educacion',
  'enfermeria',
  'estudios-ambientales-rurales',
  'filosofia',
  'ingenieria',
  'instituto-pensar',
  'instituto-salud-publica',
  'medicina',
  'odontologia',
  'psicologia',
  'teologia'
]

export const useTheme = () => {
  const [themeBase, setThemeBase] = useState(DEFAULT_THEMES.BASE)
  const [themeFaculty, setThemeFaculty] = useState(DEFAULT_THEMES.FACULTY)
  const [isLoading, setIsLoading] = useState(true)

  // Aplicar tema al DOM
  const applyThemeToDOM = useCallback((base, faculty) => {
    if (typeof window === 'undefined') return

    const html = document.documentElement

    // Aplicar tema base
    html.setAttribute('data-theme-base', base)

    // Aplicar tema de facultad
    if (faculty === 'default' || !faculty) {
      html.removeAttribute('data-theme-faculty')
    } else {
      html.setAttribute('data-theme-faculty', faculty)
    }

    // Tema aplicado silenciosamente
  }, [])

  // Cambiar tema base
  const setBaseTheme = useCallback(
    newBase => {
      if (typeof window === 'undefined') return

      setThemeBase(newBase)
      localStorage.setItem(STORAGE_KEYS.BASE, newBase)
      applyThemeToDOM(newBase, themeFaculty)
    },
    [themeFaculty, applyThemeToDOM]
  )

  // Cambiar tema de facultad
  const setFacultyTheme = useCallback(
    newFaculty => {
      if (typeof window === 'undefined') return

      setThemeFaculty(newFaculty)
      localStorage.setItem(STORAGE_KEYS.FACULTY, newFaculty)
      applyThemeToDOM(themeBase, newFaculty)
    },
    [themeBase, applyThemeToDOM]
  )

  // Cambiar ambos temas
  const setTheme = useCallback(
    (base, faculty) => {
      if (typeof window === 'undefined') return

      setThemeBase(base)
      setThemeFaculty(faculty)
      localStorage.setItem(STORAGE_KEYS.BASE, base)
      localStorage.setItem(STORAGE_KEYS.FACULTY, faculty)
      applyThemeToDOM(base, faculty)
    },
    [applyThemeToDOM]
  )

  // Toggle tema base (light/dark)
  const toggleBaseTheme = useCallback(() => {
    const newBase = themeBase === 'light' ? 'dark' : 'light'
    setBaseTheme(newBase)
  }, [themeBase, setBaseTheme])

  // Resetear a temas por defecto
  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEMES.BASE, DEFAULT_THEMES.FACULTY)
  }, [setTheme])

  // Obtener tema desde API (como en Liferay)
  const loadThemeFromAPI = useCallback(
    async configuration => {
      setIsLoading(true)

      try {
        // Simular la lógica de Liferay
        const rawTheme = configuration?.dataTheme
        let theme,
          faculty = 'default'

        if (rawTheme) {
          if (rawTheme.startsWith('{')) {
            const parsed = JSON.parse(rawTheme)
            theme = parsed.dataTheme
            faculty = parsed.faculty || 'default'
          } else {
            theme = rawTheme
          }
        }

        // Si es "default", obtener desde API
        if (theme === 'default') {
          const apiTheme = await getDefaultThemeFromAPI()
          theme = apiTheme.base
          faculty = apiTheme.faculty || faculty
        }

        // Aplicar tema
        setTheme(theme || DEFAULT_THEMES.BASE, faculty)
      } catch (error) {
        console.error('Error cargando tema:', error)
        resetTheme()
      } finally {
        setIsLoading(false)
      }
    },
    [setTheme, resetTheme]
  )

  // Simular API call (reemplazar con API real)
  const getDefaultThemeFromAPI = async () => {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simular respuesta de API
      return {
        base: 'light',
        faculty: 'ingenieria'
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        base: DEFAULT_THEMES.BASE,
        faculty: DEFAULT_THEMES.FACULTY
      }
    }
  }

  // Inicialización al cargar
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Leer desde localStorage
    const savedBase = localStorage.getItem(STORAGE_KEYS.BASE) || DEFAULT_THEMES.BASE
    const savedFaculty = localStorage.getItem(STORAGE_KEYS.FACULTY) || DEFAULT_THEMES.FACULTY

    setThemeBase(savedBase)
    setThemeFaculty(savedFaculty)
    applyThemeToDOM(savedBase, savedFaculty)
    setIsLoading(false)
  }, [applyThemeToDOM])

  // Detectar preferencia del sistema
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light'

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Usar tema del sistema
  const useSystemTheme = useCallback(() => {
    const systemTheme = getSystemTheme()
    setBaseTheme(systemTheme)
  }, [getSystemTheme, setBaseTheme])

  return {
    // Estado actual
    themeBase,
    themeFaculty,
    isLoading,

    // Acciones
    setBaseTheme,
    setFacultyTheme,
    setTheme,
    toggleBaseTheme,
    resetTheme,
    loadThemeFromAPI,
    useSystemTheme,

    // Utilidades
    getSystemTheme,
    isValidFaculty: faculty => FACULTY_LIST.includes(faculty),

    // Constantes
    FACULTY_LIST,
    DEFAULT_THEMES
  }
}

export default useTheme
