# 5-2 Insignias SWIPER - Carrusel con Swiper.js (Versión 3.2.0)

## 🎯 Descripción

Carrusel infinito de reconocimientos académicos implementado con **Swiper.js**, la librería más robusta y completa para carruseles. **100% compatible con Liferay DXP** y con todas las funcionalidades que necesitas out-of-the-box.

## ✨ Características Principales

- ✅ **Swiper.js Integration** - Librería probada y mantenida (v11.x)
- ✅ **Loop Infinito Bidireccional** - Funciona perfectamente en ambas direcciones
- ✅ **Drag-to-Scroll Robusto** - Funciona perfectamente desde el inicio
- ✅ **Autoplay Funcional** - Movimiento automático con pausa en hover
- ✅ **Paginación Clickeable** - Bullets interactivos con animaciones
- ✅ **Gradientes Laterales** - Ocultan overflow correctamente
- ✅ **Touch Gestures** - Optimizado para móvil
- ✅ **Sin React Hooks** - JSX puro compatible con Liferay
- ✅ **Fallback de Imágenes** - Manejo de errores integrado (WebP optimizado)
- ✅ **Accesibilidad Completa** - a11y module incluido
- ✅ **Prefers-reduced-motion** - Respeta preferencias del usuario
- ✅ **100% Responsive** - Adaptativo con slidesPerView: 'auto'

## 📁 Estructura de Archivos

```
5-2_insignias/
├── index.jsx          # Componente React (sin hooks)
├── script.js          # Inicialización Swiper (vanilla JS, 93 líneas)
├── styles.scss        # Estilos personalizados
├── info.json          # Metadatos del componente (v3.2.0)
├── CHANGELOG.md       # Historial de versiones
├── README.md          # Esta documentación
├── template/          # Templates para Liferay
│   ├── template.ftl   # Template FTL principal
│   ├── fragment.ftl   # Fragment wrapper
│   └── LIFERAY-SETUP.md  # Guía de configuración Liferay
└── assets/            # Imágenes fallback (solo Next.js)
    ├── alta-calidad.webp
    ├── impact-rankings.webp
    ├── merco.webp
    ├── obet.webp
    ├── qs-ranking.webp
    └── The-acreditada.webp
```

## 🔧 Instalación y Uso

### 1. Asegurar Swiper.js está instalado

```bash
# Ya está instalado en package.json
npm install swiper
```

### 2. Importar en la página

```jsx
import InsigniasSwiper from './_sections/5-2_insignias'
;<InsigniasSwiper />
```

### 3. Con ViewComponent

```jsx
import ViewComponent from '@/components/utils/ViewComponent/viewComponent'
import InsigniasSwiper from './_sections/5-2_insignias'
;<ViewComponent path='/landing/pregrado/_sections/5-2_insignias'>
  <InsigniasSwiper />
</ViewComponent>
```

## 🎨 Configuración de Swiper (v3.2.0)

### Configuración Actual (Simplificada y Funcional)

```javascript
new window.Swiper('.insignias-swiper', {
  // 🔄 Loop infinito bidireccional
  loop: true,

  // 📏 Slides con ancho automático (controlado por CSS)
  slidesPerView: 'auto',  // Swiper calcula automáticamente
  spaceBetween: 30,
  centeredSlides: false,

  // ⚡ Autoplay funcional
  autoplay: {
    delay: 3000,  // 3 segundos entre transiciones
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },

  // 🎯 Transiciones suaves
  speed: 800,
  grabCursor: true,

  // 📍 Paginación clickeable
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // ♿ Accesibilidad
  a11y: { enabled: true }
})
```

### Modificar Velocidad del Autoplay

En [script.js](script.js#L27):

```javascript
autoplay: {
  delay: 3000,  // Cambiar a 5000 para 5 segundos
  disableOnInteraction: false,
  pauseOnMouseEnter: true
}
```

### Ajustar Cantidad de Slides Visibles

En [styles.scss](styles.scss#L8-L20) - Modificar ancho de slides:

```scss
$slide-width-desktop: rem(270px);  // Muestra ~4.2 slides en 1200px
$slide-width-tablet: rem(220px);   // Muestra ~3.2 slides en 768px
$slide-width-mobile: rem(180px);   // Muestra ~2 slides en móvil

.swiper-slide {
  width: $slide-width-desktop;  // Ajustar aquí
}
```

### Cambiar Espaciado

En [script.js](script.js#L24):

```javascript
spaceBetween: 30  // Cambiar a 40 para más separación
```

## 🎯 Ventajas vs Versiones Anteriores

| Aspecto            | v1.0 (5_insignias) | v2.0 (5-1_insignias) | v3.2.0 (5-2_insignias) ✅ |
| ------------------ | ------------------ | -------------------- | ------------------------- |
| **Drag-to-scroll** | ❌ No              | ⚠️ Custom buggy      | ✅ Nativo Swiper funcional |
| **Loop infinito**  | ⚠️ 3 grupos JSX    | ⚠️ 3 grupos JSX      | ✅ Bidireccional (nativo)  |
| **Paginación**     | ❌ No              | ❌ No                | ✅ Clickeable con estilos  |
| **Código script**  | ~150 líneas        | ~400 líneas          | ✅ 93 líneas (-57%)        |
| **Mantenibilidad** | Media              | Baja                 | ✅ Alta                    |
| **Bugs conocidos** | -                  | Fades, drag          | ✅ Ninguno (v3.2.0)        |
| **Touch gestures** | ❌ No              | ⚠️ Custom            | ✅ Optimizado              |
| **Autoplay**       | ⚠️ CSS only        | ⚠️ Buggy             | ✅ Funcional 100%          |
| **Assets**         | PNG (79KB)         | PNG (79KB)           | ✅ WebP (30KB, -62%)       |
| **Compatibilidad** | ❌ usa hooks       | ✅ Liferay           | ✅ Liferay 100%            |

## 🚀 Funcionalidades Implementadas (v3.2.0)

### 1. ✅ Autoplay Funcional

Movimiento automático con configuración robusta:

```javascript
autoplay: {
  delay: 3000,  // 3 segundos entre slides
  disableOnInteraction: false,
  pauseOnMouseEnter: true  // Pausa al hacer hover
}
```

### 2. ✅ Drag-to-Scroll Bidireccional

- Click y arrastrar con mouse (ambas direcciones)
- Swipe táctil en móvil
- Cursor cambia a `grab`/`grabbing`
- Loop infinito funciona correctamente izquierda/derecha

### 3. ✅ Paginación Interactiva

Bullets clickeables con estilos completos:

- 48 líneas de CSS para bullets
- Hover effects con scale(1.15)
- Active state con forma alargada
- DynamicBullets de Swiper

### 4. ✅ Gradientes Laterales Funcionales

```scss
.insignias-swiper {
  overflow: hidden !important;

  &::before, &::after {
    z-index: 10;  // Por encima del contenido
  }
}
```

### 5. ✅ Accesibilidad

- ARIA labels configurados
- Soporte `prefers-reduced-motion`
- Navegación por teclado
- a11y module de Swiper activado

### 6. ✅ Responsive Nativo

`slidesPerView: 'auto'` + CSS width-based:
- Desktop (1200px): ~4.2 slides visibles (270px/slide)
- Tablet (768px): ~3.2 slides visibles (220px/slide)
- Mobile (375px): ~2 slides visibles (180px/slide)

## 🎨 Personalización de Estilos

### Cambiar Ancho de Slides

En [styles.scss](styles.scss#L8-L10):

```scss
$slide-width-desktop: rem(270px);  // Ajustar para más/menos slides visibles
$slide-width-tablet: rem(220px);
$slide-width-mobile: rem(180px);
```

### Modificar Efectos de Hover

En [styles.scss](styles.scss#L200-L203):

```scss
.swiper-slide:hover .slide-content__image {
  filter: grayscale(0%) brightness(1.1);
  transform: scale(1.05); // Ajustar zoom
}
```

### Ajustar Gradientes Laterales

En [styles.scss](styles.scss#L6):

```scss
$fade-width: rem(150px);  // Ancho del degradado
```

## 🔍 Comparación de Arquitectura

### Versión 2.0 (5-1 Custom) - OBSOLETA

```
- carousel-wrapper (fijo con fades)
  - carousel-scroll-container (scroll)
    - carousel-track (animación CSS)
      - 3 grupos duplicados
        - 6 items × 3 = 18 elementos
```

**Problemas identificados:**
- Transform vs scroll conflict
- Fades se movían con scroll
- Sincronización compleja
- 400+ líneas de código custom
- Bugs en drag y autoplay

### Versión 3.2.0 (5-2 Swiper) - ACTUAL ✅

```
- insignias-swiper (fijo con fades)
  - swiper-wrapper (Swiper control)
    - 6 swiper-slide (loop nativo)
  - swiper-pagination (bullets clickeables)
```

**Mejoras clave:**
- Loop bidireccional nativo (sin duplicar elementos)
- Drag robusto integrado (funciona en ambas direcciones)
- Paginación interactiva (clickeable)
- Gradientes fijos con z-index correcto
- Solo 93 líneas de código (-57% vs versión anterior)
- `slidesPerView: 'auto'` para responsive nativo
- Sin bugs conocidos

## 📊 Métricas v3.2.0

| Métrica                | Valor                    |
| ---------------------- | ------------------------ |
| **Versión**            | 3.2.0                    |
| **Librería**           | Swiper.js 11.x           |
| **Líneas script.js**   | 93 (-57% vs v3.1.0)      |
| **Líneas styles.scss** | ~280                     |
| **Líneas index.jsx**   | ~104                     |
| **Assets WebP**        | 6 archivos (30KB total)  |
| **Assets PNG**         | Eliminados (liberó 78KB) |
| **Items renderizados** | 6 (no duplicados)        |
| **Código reducido**    | -57% vs v3.1.0           |
| **Compatible Liferay** | ✅ 100% (sin hooks)      |
| **Bugs conocidos**     | ✅ 0 (todos resueltos)   |

## ♿ Accesibilidad

### ARIA Labels

En [index.jsx](index.jsx#L76):

```jsx
<div className='swiper' role='region' aria-label='Carrusel de reconocimientos académicos'>
```

### Swiper a11y Module

En [script.js](script.js#L43):

```javascript
a11y: { enabled: true }
```

### Navegación por Teclado

- Tab para navegar entre bullets
- Enter/Space para activar bullets
- Flechas izquierda/derecha para navegar slides (nativo Swiper)

## 🐛 Troubleshooting

### Swiper no se inicializa

**Síntoma**: Mensaje en consola "⚠️ Swiper no disponible aún, reintentando..."

**Solución**:
- Verificar que Swiper.js esté cargado: `console.log(window.Swiper)`
- En Next.js: verificar CDN en [app/layout.tsx](../../layout.tsx)
- En Liferay: verificar que Swiper.js esté incluido en el tema

### Las imágenes no cargan

**En Next.js**:
- URLs externas intentan cargar primero
- Si fallan, usa fallback WebP en `assets/`

**En Liferay**:
- Las imágenes se cargan desde Documents and Media
- No usa los assets locales
- Verificar que las URLs en el Web Content sean correctas

### El drag no funciona en una dirección

**Causa**: Puede ser que `loop: true` no tenga suficientes slides

**Solución**: Mantener `slidesPerView: 'auto'` (configuración actual v3.2.0)

### Los bullets no aparecen

**Causa**: Falta CSS de paginación

**Solución**: Verificar que styles.scss incluya las 48 líneas de `.swiper-pagination` (agregadas en v3.2.0)

## 📝 Notas de Desarrollo

### 🎉 Changelog v3.2.0 (Actual)

- ✅ **Fix crítico**: Drag bidireccional funcional (removido freeMode)
- ✅ **Fix crítico**: Paginación clickeable (48 líneas CSS agregadas)
- ✅ **Fix crítico**: Gradientes funcionan (z-index: 10)
- ✅ **Simplificación**: 214 → 93 líneas (-57%)
- ✅ **Optimización**: `slidesPerView: 'auto'` para responsive nativo
- ✅ **Limpieza**: PNG eliminados (liberó 78KB)

### 🔄 Changelog v3.1.0

- ✅ Compatibilidad Liferay 100% (removido useEffect)
- ✅ Assets convertidos a WebP (-62%)
- ✅ Sistema de reintentos con límite (max 20)
- ✅ Cleanup de event listeners

### 🚀 Changelog v3.0.0

- ✅ Integración inicial con Swiper.js
- ✅ Loop nativo sin duplicar elementos
- ✅ Templates para Liferay (FTL)

### Compatibilidad

- **Next.js**: 15.5.4+
- **React**: 18.3.1+
- **Swiper**: 11.x
- **Liferay DXP**: ✅ 100% Compatible (sin hooks)
- **Navegadores**: Modernos (últimas 2 versiones)

### Gestión de Imágenes

**En Next.js (Desarrollo)**:
- Imágenes principales: URLs externas de javeriana.edu.co
- Fallback: WebP locales en `/assets/insignias/` (30KB total)

**En Liferay (Producción)**:
- Imágenes gestionadas desde **Documents and Media**
- Configuradas via **Web Content**
- **Importante**: El administrador debe cargar imágenes ya optimizadas (idealmente WebP)

## 👥 Créditos

**Desarrollado por**: Pontificia Universidad Javeriana
**Librería**: [Swiper.js](https://swiperjs.com/)
**Versión**: 3.2.0
**Última actualización**: Octubre 2025

---

## 📚 Referencias

- [Swiper.js Documentation](https://swiperjs.com/swiper-api)
- [Swiper Autoplay Demo](https://swiperjs.com/demos#autoplay)
- [Swiper Free Mode](https://swiperjs.com/swiper-api#free-mode)
- [Documentación del Proyecto](../../../../../README.md)
- [Guía de Compatibilidad Liferay](../../../../../README.md#limitaciones-y-compatibilidad-con-liferay)

---

**¿Por qué Swiper?**

- 🏆 Más de 39k ⭐ en GitHub
- 📦 250M+ descargas en NPM
- 🔧 Mantenido activamente
- 📱 Mobile-first design
- ♿ Accesibilidad integrada
- 🎯 API completa y documentada
