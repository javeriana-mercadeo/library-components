# 5-1 Insignias ALT - Carrusel Infinito (Versión 2.0)

## 🎯 Descripción

Versión alternativa del carrusel de reconocimientos académicos, **100% compatible con Liferay DXP**. Construido desde cero para eliminar dependencias de React hooks y maximizar la compatibilidad con sistemas externos.

## ✨ Características Principales

- ✅ **Sin React Hooks** - JSX puro compatible con Liferay
- ✅ **Animación CSS Pura** - No requiere JavaScript para funcionar
- ✅ **Auto-inicialización** - Script se ejecuta automáticamente
- ✅ **Fallback de Imágenes** - Manejo de errores integrado
- ✅ **Accesibilidad Completa** - Soporte `prefers-reduced-motion`
- ✅ **Pausa Automática** - En hover sin necesidad de JS
- ✅ **100% Responsive** - Adaptado a todos los dispositivos
- ✅ **Performance Optimizado** - Uso de `will-change` y GPU acceleration

## 📁 Estructura de Archivos

```
5-1_insignias/
├── index.jsx          # Componente React (sin hooks)
├── script.js          # JavaScript vanilla (opcional)
├── styles.scss        # Estilos y animaciones
├── info.json          # Metadatos del componente
├── README.md          # Esta documentación
└── assets/            # Imágenes locales (fallback)
    ├── alta-calidad.png
    ├── impact-rankings.png
    ├── merco.png
    ├── obet.png
    ├── qs-ranking.png
    └── The-acreditada.png
```

## 🔧 Uso

### Importar en la página

```jsx
import InsigniasAlt from './_sections/5-1_insignias'

<InsigniasAlt />
```

### Con ViewComponent

```jsx
import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import InsigniasAlt from './_sections/5-1_insignias'

<ViewComponent path="/landing/pregrado/_sections/5-1_insignias">
  <InsigniasAlt />
</ViewComponent>
```

## 🎨 Personalización

### Cambiar velocidad de animación

En `styles.scss`:

```scss
$carousel-animation-duration: 40s; // Por defecto 40 segundos
$carousel-animation-duration-slow: 60s; // Velocidad lenta en hover
```

### Modificar datos de reconocimientos

En `index.jsx`, editar el array `reconocimientos`:

```jsx
const reconocimientos = [
  {
    id: 'unique-id',
    src: 'https://url-principal.com/imagen.png',
    srcFallback: '/assets/insignias/imagen-local.png',
    alt: 'Descripción alternativa',
    description: 'Texto visible debajo del logo'
  }
  // ... más items
]
```

### Ajustar espaciado

En `styles.scss`:

```scss
$carousel-gap-desktop: rem(30px);
$carousel-gap-mobile: rem(20px);
```

## 🎯 Diferencias con la Versión Original (5_insignias)

| Aspecto | Versión Original (5) | Versión Nueva (5-1) |
|---------|---------------------|---------------------|
| **React Hooks** | ❌ Usa `useEffect` | ✅ Sin hooks |
| **Duplicación** | JS en runtime | JSX en render time |
| **Compatibilidad Liferay** | ⚠️ Parcial | ✅ Total |
| **Grupos renderizados** | 1 + 4 duplicados JS | 3 grupos en JSX |
| **Animación** | CSS con -20% | CSS con -33.333% |
| **Fallback imágenes** | ❌ No | ✅ Sí |
| **Accesibilidad** | ⚠️ Básica | ✅ Completa |
| **Performance** | Buena | Excelente |

## 🚀 Ventajas Técnicas

### 1. Compatible con Liferay
```jsx
// ✅ Sin hooks - Compatible
const InsigniasAlt = () => {
  return <section>...</section>
}

// ❌ Con hooks - No compatible
const Insignias = () => {
  useEffect(() => { ... }) // ← Problema
  return <section>...</section>
}
```

### 2. Animación CSS Pura
```scss
// El carrusel funciona sin JavaScript
.carousel-track {
  animation: scroll-infinite 40s linear infinite;

  // Pausa automática en hover
  &:hover {
    animation-play-state: paused;
  }
}
```

### 3. Duplicación en Render Time
```jsx
// 3 grupos idénticos = loop perfecto
{[0, 1, 2].map(groupIndex => (
  <div key={`group-${groupIndex}`}>
    {reconocimientos.map(...)}
  </div>
))}
```

## ♿ Accesibilidad

### Soporte `prefers-reduced-motion`

El componente respeta las preferencias del usuario:

```scss
.reduced-motion & {
  animation: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
```

### Controles de teclado

- **Espacio** o **Escape**: Pausar/reanudar carrusel
- **Tab**: Navegar entre items
- **Focus**: Pausa automática al enfocar un item

### ARIA Labels

```jsx
<div
  className='carousel-wrapper'
  role='region'
  aria-label='Carrusel de reconocimientos académicos'
>
```

## 📊 Performance

### Optimizaciones aplicadas

```scss
.carousel-track {
  will-change: transform;
  backface-visibility: hidden;
  perspective: rem(1000px);
}
```

### Lazy Loading

```jsx
<img
  loading='lazy'
  src={item.src}
  alt={item.alt}
/>
```

## 🐛 Troubleshooting

### Las imágenes no cargan

**Problema**: URLs externas no disponibles

**Solución**: El componente usa fallback automático a imágenes locales en `/assets/`

### El carrusel no se mueve

**Problema**: Usuario tiene `prefers-reduced-motion` activado

**Solución**: Esto es intencional. El carrusel se vuelve scrolleable horizontalmente.

### El script no se ejecuta

**Problema**: El import del script no está funcionando

**Solución**: Verificar que `import './script.js'` esté en `index.jsx`

## 📝 Notas de Desarrollo

### Agregado en versión 2.0

- ✅ Eliminación completa de `useEffect`
- ✅ Duplicación directa en JSX
- ✅ Script auto-ejecutable con IIFE
- ✅ Fallback de imágenes con `onError`
- ✅ Soporte completo de `prefers-reduced-motion`
- ✅ Controles de teclado
- ✅ Mejor documentación

### Compatibilidad

- **Next.js**: 15.4.5+
- **React**: 18.3.1+
- **Liferay DXP**: ✅ Compatible
- **Navegadores**: Modernos (últimas 2 versiones)

## 👥 Créditos

**Desarrollado por**: Pontificia Universidad Javeriana
**Fecha**: Enero 2025
**Versión**: 2.0.0

---

## 📚 Referencias

- [Documentación del Proyecto](../../../../../README.md)
- [Versión Original (5_insignias)](../5_insignias/)
- [Guía de Compatibilidad Liferay](../../../../../README.md#limitaciones-y-compatibilidad-con-liferay)
