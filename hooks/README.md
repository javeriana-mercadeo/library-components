# Hooks Personalizados

## `useClientScript`

Hook personalizado para cargar scripts solo en el cliente, evitando problemas de SSR (Server-Side Rendering).

### 📦 Instalación

```jsx
import { useClientScript } from '@/hooks/useClientScript'
```

### 🎯 Casos de uso

Este hook es perfecto para:

- ✅ Componentes que usan scripts de Liferay
- ✅ Librerías que requieren acceso al DOM (Swiper, charts, etc.)
- ✅ Código que solo debe ejecutarse en el cliente
- ✅ Evitar errores de hidratación en Next.js

### 🚀 Uso básico

#### Opción 1: Importación dinámica (recomendada)

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'

const MyComponent = () => {
  // El script se carga dinámicamente solo en el cliente
  const mounted = useClientScript(() => import('./script.js'))

  if (!mounted) return null

  return <div>Mi componente</div>
}
```

#### Opción 2: Con importación estática

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'
import script from './script.js'

const MyComponent = () => {
  // El script se ejecuta solo después del montaje
  const mounted = useClientScript(script)

  if (!mounted) return null

  return <div>Mi componente</div>
}
```

#### Opción 3: Sin script (solo mounted)

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'

const MyComponent = () => {
  // Solo verifica que el componente esté montado
  const mounted = useClientScript()

  if (!mounted) return null

  return <div>Mi componente</div>
}
```

### 📝 Ejemplos reales

#### Componente con Swiper

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'
import { Container } from '@library/components'

const Carousel = () => {
  const mounted = useClientScript(() => import('./swiper-init.js'))

  if (!mounted) return null

  return (
    <div className='swiper'>
      <div className='swiper-wrapper'>{/* slides */}</div>
    </div>
  )
}
```

#### Componente que actualiza el DOM

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'

const DynamicData = () => {
  const mounted = useClientScript(() => import('./load-data.js'))

  if (!mounted) return null

  return (
    <div>
      <span data-puj-name>Cargando...</span>
      <span data-puj-faculty>Cargando...</span>
    </div>
  )
}
```

### ⚠️ Importante

1. **Siempre usa `'use client'`** en la parte superior del archivo
2. **Retorna `null` si no está montado**: `if (!mounted) return null`
3. **Prefiere importación dinámica** para mejor performance: `() => import('./script.js')`
4. **El script debe exportar una función por defecto** o ser una función directamente

### 🔧 Estructura del script

Tu script debe tener esta estructura:

```javascript
// script.js
export default function initComponent() {
  // Tu código aquí
  console.log('Script ejecutado en el cliente')

  // Puedes acceder al DOM de forma segura
  const element = document.getElementById('mi-elemento')
  // ...
}
```

O simplemente:

```javascript
// script.js
export default () => {
  console.log('Script ejecutado')
}
```

### 🎨 Comparación: Antes vs Después

#### ❌ Antes (código repetitivo)

```jsx
'use client'

import { useEffect, useState } from 'react'
import script from './script.js'

const MyComponent = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (typeof script === 'function') {
      script()
    }
  }, [mounted])

  if (!mounted) return null

  return <div>Componente</div>
}
```

#### ✅ Después (simple y limpio)

```jsx
'use client'

import { useClientScript } from '@/hooks/useClientScript'

const MyComponent = () => {
  const mounted = useClientScript(() => import('./script.js'))

  if (!mounted) return null

  return <div>Componente</div>
}
```

### 💡 Tips

- **Performance**: Usa importación dinámica para dividir el código y mejorar el tiempo de carga
- **Debugging**: Los errores se muestran en la consola con el prefijo `[useClientScript]`
- **TypeScript**: El hook está tipado automáticamente
- **Testing**: Puedes mockear el hook fácilmente en tus tests

### 🐛 Troubleshooting

**Problema**: El script no se ejecuta

```jsx
// ❌ Incorrecto - falta el return null
const mounted = useClientScript(() => import('./script.js'))
return <div>...</div>

// ✅ Correcto
const mounted = useClientScript(() => import('./script.js'))
if (!mounted) return null
return <div>...</div>
```

**Problema**: Error "document is not defined"

```jsx
// ❌ Incorrecto - ejecutando código fuera del hook
const element = document.getElementById('test') // Error en SSR
const mounted = useClientScript(() => import('./script.js'))

// ✅ Correcto - todo el código del cliente está en el script
const mounted = useClientScript(() => import('./script.js'))
if (!mounted) return null
```

---

## Ver también

- [withClientScript HOC](../hocs/README.md) - Alternativa usando Higher-Order Components
- [Documentación de Next.js sobre SSR](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
