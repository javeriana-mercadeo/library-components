# 🎓 Expo Javeriana - Página de Pregrados

## 📋 Descripción

Landing page para el evento **Expo Javeriana de Pregrados** - presentación de programas académicos de la Universidad Javeriana.

---

## 🎨 Tema de Colores

Esta página utiliza el tema personalizado `expo-javeriana` con los siguientes colores:

| Color           | Hex       | Variable             | Uso                           |
| --------------- | --------- | -------------------- | ----------------------------- |
| Azul Javeriana  | `#2c5697` | `--primary-*`        | Color principal institucional |
| Amarillo/Dorado | `#fbb900` | `--secondary-*`      | Destacados, fondos            |
| Naranja         | `#e55110` | `--tertiary-*`       | Acentos, CTAs                 |
| Morado Oscuro   | `#170557` | `--expo-purple-dark` | Fondos especiales             |

**Documentación completa:** Ver [THEME-COLORS.md](./THEME-COLORS.md)

---

## 🏗️ Estructura de Secciones

```
expoJaverianaPrg/
├── page.tsx                    # Página principal (tema activado aquí)
├── _sections/
│   ├── 1_header/              # ✅ Header con logo e info del evento
│   ├── 2_diferencialesForm/   # ⚠️ Diferenciales + Formulario (pendiente)
│   ├── 3_datos/               # ⚠️ Datos/Estadísticas (pendiente)
│   ├── 4_blog/                # ⚠️ Blog/Noticias (pendiente)
│   └── 5_footer/              # ⚠️ Footer (pendiente)
├── THEME-COLORS.md            # Documentación del tema
└── README.md                  # Este archivo
```

---

## ✅ Estado de Implementación

### **1. Header (1_header/)** - ✅ Completado (60%)

**Implementado:**

- ✅ Estructura de 2 columnas (logo + info)
- ✅ Logo institucional desde CDN
- ✅ Caja de información con:
  - 📅 Fechas del evento (24-28 febrero)
  - 🕐 Horario (8:00 a.m. - 1:00 p.m.)
- ✅ Background image desde CDN
- ✅ Responsive design (mobile-first)
- ✅ Variables del tema integradas
- ✅ Sistema de scripts vanilla JS

**Pendiente:**

- ⚠️ Completar contenido de columna derecha (posible CTA o info adicional)
- ⚠️ Añadir más elementos de información si es necesario

**Archivos:**

- `index.jsx` - Componente React
- `styles.scss` - Estilos con tema
- `script.js` - JavaScript vanilla
- `info.json` - Metadata
- `build/` - Archivos compilados

---

### **2-5. Otras Secciones** - ⚠️ Pendientes

Estructura básica creada, pero sin contenido:

- ⚠️ **2_diferencialesForm**: Esqueleto creado
- ⚠️ **3_datos**: Esqueleto creado
- ⚠️ **4_blog**: Esqueleto creado
- ⚠️ **5_footer**: Esqueleto creado

---

## 🚀 Cómo Usar

### **Desarrollo:**

```bash
npm run dev
```

Navegar a: `http://localhost:3000/institutional/expoJaverianaPrg`

### **Ver componente en modo desarrollo:**

La página usa `ViewComponent` que permite:

- ✅ Ver el código fuente del componente
- ✅ Descargar HTML, CSS, JS compilados
- ✅ Preview en tiempo real

---

## 🎨 Variables CSS Disponibles

El tema genera automáticamente 33 variables:

```css
/* Azul Javeriana (Primary) */
--primary-100  /* Muy claro */
--primary-500  /* Base (#2c5697) */
--primary-900  /* Muy oscuro */

/* Amarillo (Secondary) */
--secondary-100  /* Muy claro */
--secondary-500  /* Base (#fbb900) */
--secondary-900  /* Muy oscuro */

/* Naranja (Tertiary) */
--tertiary-100  /* Muy claro */
--tertiary-500  /* Base (#e55110) */
--tertiary-900  /* Muy oscuro */

/* Custom */
--expo-purple-dark  /* #170557 */
```

---

## 📦 Assets

### **CDN Javeriana:**

- Banner: `recursosdb/d/info-prg/banner-1920-x-800px`
- Logo Expo: `recursosdb/d/info-prg/logo-expo-javeriana-2026`

### **Assets Locales (no usados actualmente):**

- `1_header/assets/BANNER 1920 x 800px.webp` (1.4 MB)
- `1_header/assets/Logo Expo Javeriana 2026.svg` (12 KB)

---

## 🔧 Configuración Técnica

### **Sistema de Scripts:**

Cada sección implementa el patrón **Singleton System**:

```javascript
class HeaderExpoSystem {
  constructor() {
    this.initialized = false
  }
  init() {
    /* Lógica de inicialización */
  }
  destroy() {
    /* Limpieza */
  }
}
```

**Características:**

- ✅ Previene múltiples inicializaciones
- ✅ Auto-limpieza en `beforeunload`
- ✅ Compatible con hot-reload de Next.js
- ✅ 100% vanilla JavaScript (Liferay compatible)

### **Responsive Breakpoints:**

```scss
Mobile:   < 768px
Tablet:   768px - 991px
Desktop:  ≥ 992px
Large:    ≥ 1200px
```

---

## ⚠️ Compatibilidad Liferay

**✅ Compatible:**

- JSX estático (sin hooks en componentes)
- Variables CSS estándar
- Vanilla JavaScript en `script.js`
- Event listeners nativos

**❌ No Compatible (evitar):**

- Hooks de React en componentes
- Estado local de React
- Context API

**Nota:** Actualmente el componente usa `useEffect` en la página principal para activar el tema. Esto es solo para desarrollo con Next.js.
En Liferay, el atributo `data-theme-faculty` debe añadirse directamente al HTML.

---

## 📊 Métricas

| Métrica                   | Valor   |
| ------------------------- | ------- |
| Secciones totales         | 5       |
| Secciones completadas     | 1 (20%) |
| Líneas de código (header) | ~200    |
| Tamaño compilado          | 2.7 KB  |
| Variables CSS generadas   | 34      |
| Assets locales            | 1.4 MB  |

---

## 🎯 Próximos Pasos

### **Prioridad Alta:**

1. ✅ ~~Crear tema de colores~~ (Completado)
2. ✅ ~~Implementar header básico~~ (Completado)
3. ⚠️ Completar contenido del header
4. ⚠️ Implementar sección 2: Diferenciales + Formulario
5. ⚠️ Implementar sección 3: Datos/Estadísticas

### **Prioridad Media:**

6. ⚠️ Implementar sección 4: Blog
7. ⚠️ Implementar sección 5: Footer
8. ⚠️ Optimizar assets (banner 1.4MB → ~200KB)

### **Prioridad Baja:**

9. ⚠️ Decidir estrategia assets (CDN vs local)
10. ⚠️ Añadir animaciones/transiciones
11. ⚠️ Testing en diferentes navegadores

---

## 📖 Referencias

- [Sistema de Colores del Proyecto](../../../README.md#-sistema-de-temas)
- [Documentación de Temas](./THEME-COLORS.md)
- [Guía de Compatibilidad Liferay](../../../README.md#-limitaciones-y-compatibilidad-con-liferay)

---

**Última actualización:** 02/10/2025 **Estado:** En desarrollo (20% completado)
