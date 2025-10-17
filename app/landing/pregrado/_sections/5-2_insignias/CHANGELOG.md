# Changelog - Carrusel de Insignias Swiper

Todos los cambios notables de este componente serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [3.3.0] - 2025-10-16

### 🎯 MEJORA CRÍTICA: Responsive Breakpoints

Esta versión implementa **breakpoints responsive nativos de Swiper** para controlar la cantidad de slides visibles en cada dispositivo.

#### ✅ Problema Resuelto

**Antes (v3.2.0)**:
- Móviles mostraban ~2 slides visibles (180px cada uno)
- No había control granular por tamaño de pantalla
- Width de slides controlado por CSS (conflicto con Swiper)
- `slidesPerView: 'auto'` causaba comportamiento inconsistente

**Ahora (v3.3.0)**:
- ✅ **Móvil pequeño (<428px)**: 1 slide centrado
- ✅ **Móvil grande (≥428px)**: 1.5 slides con peek
- ✅ **Tablet pequeña (≥576px)**: 2 slides
- ✅ **Tablet (≥768px)**: 3 slides
- ✅ **Desktop (≥992px)**: 4 slides

---

### 🔧 Cambios Técnicos

#### 1. Configuración Swiper con Breakpoints

```javascript
// script.js - Nueva configuración responsive
window.insigniasSwiper = new window.Swiper('.insignias-swiper', {
  loop: true,

  // Mobile-First: configuración base para móviles
  slidesPerView: 1,
  spaceBetween: 16,
  centeredSlides: true,

  // Breakpoints progresivos
  breakpoints: {
    428: {  // Móvil grande
      slidesPerView: 1.5,
      spaceBetween: 20,
      centeredSlides: true
    },
    576: {  // Tablet pequeña
      slidesPerView: 2,
      spaceBetween: 24,
      centeredSlides: false
    },
    768: {  // Tablet
      slidesPerView: 3,
      spaceBetween: 30
    },
    992: {  // Desktop
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
})
```

#### 2. Simplificación de SCSS

**Removido**:
```scss
// ❌ Ya no necesario
$slide-width-desktop: rem(270px);
$slide-width-tablet: rem(220px);
$slide-width-mobile: rem(180px);

.swiper-slide {
  width: $slide-width-desktop;
  @media (max-width: ...) { ... }
}
```

**Nuevo**:
```scss
// ✅ Swiper controla el width automáticamente
.swiper-slide {
  flex-shrink: 0;
  // Width calculado por Swiper según breakpoints
}
```

#### 3. Espaciado Adaptativo

| Breakpoint | spaceBetween | Razón |
|------------|--------------|-------|
| <428px | 16px | Menos espacio en móviles pequeños |
| ≥428px | 20px | Transición suave |
| ≥576px | 24px | Más espacio en tablets |
| ≥768px | 30px | Espaciado completo desktop |

#### 4. Centrado Inteligente

- **Móviles (<576px)**: `centeredSlides: true` para mejor UX con 1-1.5 slides
- **Tablet/Desktop (≥576px)**: `centeredSlides: false` para alineación izquierda

---

### 📊 Comparación Visual

```
📱 Móvil (<428px)
┌─────────────────────────────────┐
│         [  SLIDE 1  ]           │
│  [partial]         [partial]    │
└─────────────────────────────────┘
    ↑ 1 slide centrado

📱 Móvil Grande (≥428px)
┌─────────────────────────────────┐
│     [  SLIDE 1  ] [SLI...       │
│  [partial]              partial]│
└─────────────────────────────────┘
    ↑ 1.5 slides con peek

💻 Tablet (≥768px)
┌─────────────────────────────────┐
│ [SLIDE 1] [SLIDE 2] [SLIDE 3]  │
└─────────────────────────────────┘
    ↑ 3 slides completos

🖥️ Desktop (≥992px)
┌──────────────────────────────────────────┐
│ [SLIDE 1] [SLIDE 2] [SLIDE 3] [SLIDE 4] │
└──────────────────────────────────────────┘
    ↑ 4 slides completos
```

---

### 📈 Métricas v3.3.0

| Métrica | v3.2.0 | v3.3.0 | Cambio |
|---------|--------|--------|--------|
| **Líneas script.js** | 93 | 108 | +15 (breakpoints) |
| **Líneas styles.scss** | 360 | 340 | -20 (menos CSS) |
| **Código SCSS simplificado** | - | ✅ | Mejor mantenibilidad |
| **Control responsive** | ⚠️ CSS | ✅ JS | Más preciso |
| **Slides móvil** | ~2 | 1 | ✅ Correcto |

---

### 🎨 Beneficios UX

1. **Móvil mejorado**: 1 slide grande y legible vs 2 pequeños
2. **Peek effect**: En móvil grande se ve un "preview" del siguiente slide
3. **Transición suave**: Cada breakpoint adapta cantidad de slides progresivamente
4. **Centrado inteligente**: Solo en móvil para mejor enfoque
5. **Espaciado adaptativo**: Más compacto en móvil, amplio en desktop

---

### 🔄 Migración de v3.2.0 a v3.3.0

**Sin breaking changes** - Actualización automática:

1. El componente funciona inmediatamente sin cambios en JSX
2. Los estilos se actualizan automáticamente
3. Swiper ahora controla el responsive completamente

**Mejoras visibles**:
- Móviles verán 1 slide en lugar de 2
- Desktop mantiene 4 slides (sin cambios)
- Tablets tienen transición progresiva (2→3 slides)

---

## [3.2.0] - 2025-10-16

### 🔴 BUGFIXES CRÍTICOS

Esta versión corrige **4 bugs críticos de usabilidad** identificados después de testing:

#### ✅ Fix 1: Drag se atasca al deslizar a la derecha
- **Problema**: Al arrastrar hacia la derecha, el carrusel se detenía en el punto de loop infinito
- **Causa**: `freeMode: true` + `loop: true` son **incompatibles** en Swiper.js
- **Solución**: Removido `freeMode` completamente
- **Resultado**: Drag funciona perfectamente en ambas direcciones

#### ✅ Fix 2: Drag a la izquierda no muestra imágenes
- **Problema**: Al arrastrar hacia la izquierda, no aparecían imágenes
- **Causa**: `loopAdditionalSlides: 6` era insuficiente para 6 slides totales
- **Solución**: Cambiado a `loopAdditionalSlides: totalSlides` (dinámico)
- **Resultado**: Loop infinito funciona correctamente en ambas direcciones

#### ✅ Fix 3: Paginación no responde a clicks
- **Problema**: Los bullets de paginación no eran visibles ni clickeables
- **Causa**: **Faltaban estilos CSS** para `.swiper-pagination-bullet`
- **Solución**: Agregados 48 líneas de estilos completos con hover y active states
- **Resultado**: Bullets visibles, clickeables y con animaciones

#### ✅ Fix 4: Gradientes no ocultan overflow
- **Problema**: Las imágenes se desbordaban por los lados, gradientes no funcionaban
- **Causa**: `z-index: 2` era demasiado bajo, Swiper lo sobrescribía
- **Solución**:
  - Aumentado a `z-index: 10` en gradientes
  - Agregado `z-index: 1` en `.swiper-wrapper`
  - Forzado `overflow: hidden !important`
- **Resultado**: Gradientes laterales funcionan correctamente

---

### 🔧 Mejoras Técnicas

#### Configuración de Swiper Optimizada
```javascript
// ❌ REMOVIDO (causaba conflicto con loop)
freeMode: { enabled: true }

// ✅ AGREGADO
speed: 600,  // Transiciones más suaves
loopAdditionalSlides: totalSlides,  // Dinámico
loopFillGroupWithBlank: false
```

#### Estilos de Paginación Completos
- Bullets con tamaño 10px × 10px
- Hover effect con scale(1.15)
- Active state con forma alargada (24px ancho)
- Colores adaptativos para dark mode
- Transiciones suaves de 0.3s
- Gap de 8px entre bullets

#### Z-index Mejorado
```scss
.insignias-swiper {
  overflow: hidden !important;  // Forzado

  &::before, &::after {
    z-index: 10;  // Antes: 2
  }
}

.swiper-wrapper {
  z-index: 1;  // Nuevo
}
```

---

### 📊 Impacto del Fix

| Problema | Antes | Después | Estado |
|----------|-------|---------|--------|
| Drag derecha | ❌ Se atasca | ✅ Fluido | **RESUELTO** |
| Drag izquierda | ❌ No muestra | ✅ Funcional | **RESUELTO** |
| Paginación | ❌ No responde | ✅ Clickeable | **RESUELTO** |
| Gradientes | ❌ No ocultan | ✅ Funcionan | **RESUELTO** |

---

### 🎯 Testing Realizado

- ✅ Drag horizontal en ambas direcciones
- ✅ Loop infinito sin interrupciones
- ✅ Clicks en bullets de paginación
- ✅ Gradientes laterales ocultan overflow
- ✅ Hover effects en imágenes y bullets
- ✅ Autoplay funcional
- ✅ Responsive en todos los breakpoints

---

### 📝 Notas de Migración

#### De v3.1.0 a v3.2.0

**Sin breaking changes** - Actualización transparente:
- Si usabas `freeMode`, ahora está deshabilitado pero el drag sigue funcionando
- La paginación ahora es visible (antes era invisible)
- Los gradientes ahora funcionan correctamente

**Beneficios inmediatos**:
- Mejor UX en drag/swipe
- Navegación con bullets funcional
- Estética mejorada con gradientes

---

## [3.1.0] - 2025-10-16

### 🎉 Cambios Mayores

#### ✅ Compatibilidad Liferay 100%
- **REMOVIDO**: `useEffect` de React
- **AGREGADO**: Auto-inicialización vanilla JS en `script.js`
- **RESULTADO**: Ahora el componente es completamente compatible con Liferay DXP sin modificaciones

### 🚀 Optimizaciones

#### Imágenes WebP
- **Convertidas** todas las imágenes PNG a WebP
- **Reducción total**: 79KB → 30KB (-62%)
- **Detalle por archivo**:
  - `The-acreditada.png`: 48.67KB → 15.40KB (-68.3%)
  - `obet.png`: 8.38KB → 4.03KB (-51.9%)
  - `qs-ranking.png`: 7.07KB → 3.51KB (-50.4%)
  - `alta-calidad.png`: 5.85KB → 3.01KB (-48.5%)
  - `impact-rankings.png`: 4.79KB → 2.09KB (-56.4%)
  - `merco.png`: 3.69KB → 1.85KB (-49.9%)

### 🔧 Mejoras Técnicas

#### Sistema de Reintentos
- **AGREGADO**: Límite de 20 intentos (antes era infinito)
- **AGREGADO**: Backoff exponencial: [100, 200, 300, 500, 1000, 2000, 3000, 5000]ms
- **PREVIENE**: Memory leaks por timeouts infinitos
- **AGREGADO**: Mensaje de error claro si falla después de todos los intentos

#### Cleanup de Event Listeners
- **AGREGADO**: Función `destroyInsigniasSwiper()` para cleanup
- **AGREGADO**: Referencia a resize handler en `window.insigniasSwiper._resizeHandler`
- **PREVIENE**: Acumulación de listeners en múltiples instancias
- **EXPORTADO**: Función pública para uso manual

#### Estilos Simplificados
- **SIMPLIFICADO**: Efectos de hover (eliminada regla conflictiva)
- **CORREGIDO**: Fades laterales usando `transparent` en lugar de `rgba()` hardcodeado
- **MEJORADO**: Orden de reglas CSS para mayor claridad

### 📝 Documentación

#### Nuevos Archivos
- **AGREGADO**: `CHANGELOG.md` (este archivo)
- **AGREGADO**: Script de conversión `assets/convert-to-webp.js`

#### Actualizaciones
- **ACTUALIZADO**: `info.json` con versión 3.1.0 y mejoras detalladas
- **ACTUALIZADO**: Comentarios en `script.js` con headers descriptivos

### 🐛 Fixes

- **CORREGIDO**: Componente usaba `useEffect` (no compatible Liferay)
- **CORREGIDO**: Timeouts infinitos sin límite
- **CORREGIDO**: Fades con colores hardcodeados
- **CORREGIDO**: Reglas de hover que podían conflictuar
- **CORREGIDO**: Referencias de imágenes fallback apuntando a PNG

---

## [3.0.0] - 2025-01-07

### Lanzamiento Inicial

- Implementación con Swiper.js 11.x
- Loop infinito nativo
- Autoplay continuo
- Drag-to-scroll robusto
- Free mode con momentum
- Responsive con 5 breakpoints
- Accesibilidad completa (a11y)
- Soporte `prefers-reduced-motion`
- Fallback de imágenes
- Templates para Liferay (FTL)
- Documentación completa

---

## Comparación con Versiones Anteriores

### vs v2.0 (5-1_insignias)
- ✅ Código -60% más simple (428 → 294 líneas SCSS)
- ✅ Sin bugs de drag custom
- ✅ Loop infinito sin triplicar elementos
- ✅ Librería mantenida profesionalmente

### vs v1.0 (5_insignias)
- ✅ Compatible con Liferay (v1 usa hooks)
- ✅ Drag funcional (v1 no tiene)
- ✅ Momentum/inercia (v1 no tiene)
- ✅ Mejor rendimiento general

---

## Roadmap Futuro

### v3.2.0 (Planeado)
- [ ] Responsive images con `srcset`
- [ ] Lazy loading mejorado
- [ ] Prefetch de imágenes
- [ ] Analytics tracking opcional

### v3.3.0 (Considerando)
- [ ] Tema dark mode mejorado
- [ ] Animaciones personalizables
- [ ] Más opciones de configuración expuestas

---

## Notas de Migración

### De v3.0.0 a v3.1.0

**Sin breaking changes** - La migración es automática si:
- Usas el componente via React (Next.js): funciona igual
- Usas en Liferay: ahora funciona correctamente (antes técnicamente no)

**Opcional**:
- Puedes eliminar los PNG antiguos si ya no los necesitas
- Puedes usar `destroyInsigniasSwiper()` si necesitas cleanup manual

### De v2.0 (5-1_insignias) a v3.1.0

1. Reemplazar componente completo
2. Asegurar que Swiper.js esté cargado
3. Actualizar referencias a assets (de PNG a WebP si usas fallbacks locales)
4. Eliminar script custom de v2.0

### De v1.0 (5_insignias) a v3.1.0

1. Reemplazar componente completo
2. Instalar/cargar Swiper.js
3. Actualizar estructura de datos (agregar `id` y `srcFallback`)
4. No se necesita `useEffect` - auto-inicialización

---

**Mantenido por**: Pontificia Universidad Javeriana
**Última actualización**: 2025-10-16
