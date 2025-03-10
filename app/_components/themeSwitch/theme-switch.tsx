'use client'

import { Select, SelectItem } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const themes = [
    { key: 'default', label: 'Automático' },
    { key: '', label: 'Institucional' },
    { key: 'dark', label: '(Oscuro) Institucional' },
    { key: 'arquitectura-diseno', label: 'Arquitectura y Diseño' },
    { key: 'arquitectura-diseno-dark', label: '(Oscuro) Arquitectura y Diseño' },
    { key: 'artes', label: 'Artes' },
    { key: 'artes-dark', label: '(Oscuro) Artes' },
    { key: 'ciencias', label: 'Ciencias' },
    { key: 'ciencias-dark', label: '(Oscuro) Ciencias' },
    { key: 'ciencias-economicas-administrativas', label: 'Ciencias económicas y administrativas' },
    { key: 'ciencias-economicas-administrativas-dark', label: '(Oscuro) Ciencias económicas y administrativas' },
    { key: 'ciencias-juridicas', label: 'Ciencias jurídicas' },
    { key: 'ciencias-juridicas-dark', label: '(Oscuro) Ciencias jurídicas' },
    { key: 'ciencias-politicas-relaciones-internacionales', label: 'Ciencias políticas relaciones internacionales' },
    { key: 'ciencias-politicas-relaciones-internacionales-dark', label: '(Oscuro) Ciencias políticas relaciones internacionales' },
    { key: 'ciencias-sociales', label: 'Ciencias sociales' },
    { key: 'ciencias-sociales-dark', label: '(Oscuro) Ciencias sociales' },
    { key: 'comunicacion-lenguaje', label: 'Comunicación y lenguaje' },
    { key: 'comunicacion-lenguaje-dark', label: '(Oscuro) Comunicación y lenguaje' },
    { key: 'derecho-canonico', label: 'Derecho canónico' },
    { key: 'derecho-canonico-dark', label: '(Oscuro) Derecho canónico' },
    { key: 'educacion', label: 'Educación' },
    { key: 'educacion-dark', label: '(Oscuro) Educación' },
    { key: 'enfermeria', label: 'Enfermería' },
    { key: 'enfermeria-dark', label: '(Oscuro) Enfermería' },
    { key: 'estudios-ambientales-rurales', label: 'Estudios ambientales rurales' },
    { key: 'estudios-ambientales-rurales-dark', label: '(Oscuro) Estudios ambientales rurales' },
    { key: 'filosofia', label: 'Filosofía' },
    { key: 'filosofia-dark', label: '(Oscuro) Filosofía' },
    { key: 'ingenieria', label: 'Ingeniería' },
    { key: 'ingenieria-dark', label: '(Oscuro) Ingeniería' },
    { key: 'instituto-pensar', label: 'Instituto Pensar' },
    { key: 'instituto-pensar-dark', label: '(Oscuro) Instituto Pensar' },
    { key: 'instituto-salud-publica', label: 'Instituto Salud Pública' },
    { key: 'instituto-salud-publica-dark', label: '(Oscuro) Instituto Salud Pública' },
    { key: 'medicina', label: 'Medicina' },
    { key: 'medicina-dark', label: '(Oscuro) Medicina' },
    { key: 'odontologia', label: 'Odontología' },
    { key: 'odontologia-dark', label: '(Oscuro) Odontología' },
    { key: 'psicologia', label: 'Psicología' },
    { key: 'psicologia-dark', label: '(Oscuro) Psicología' },
    { key: 'teologia', label: 'Teología' },
    { key: 'teologia-dark', label: '(Oscuro) Teología' }
  ]

  const handleSelectionChange = (keys: any) => {
    const key = keys.currentKey
    setTheme(String(key))
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        selectedKeys={isSSR ? 'light' : theme}
        onSelectionChange={handleSelectionChange}
        className="w-[200px] max-w-xs m-0! p-0"
        label="Selecciona un tema"
        labelPlacement="outside"
        placeholder="Elige un tema"
        selectorIcon={<i className="ph ph-check-circle"></i>}>
        {themes.map(theme => (
          <SelectItem key={theme.key}>{theme.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
