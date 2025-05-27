# Biblioteca de Componentes - Pontificia Universidad Javeriana

Sistema de diseño modular para la creación de landing pages y sitios institucionales con soporte completo para múltiples temas por facultad.
**Totalmente compatible con Liferay DXP**.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Construcción
npm run build
```

## 🔗 Enlaces y Recursos

- **Figma Design System**:
  [Visual WebOnePage](https://www.figma.com/design/ZU91ri7LBUL90ovSxX4efe/Javeriana-WebOnePage-Visual?node-id=1999-15993&t=tCZYXhdv5uhlRT44-1)
- **Repositorio GitHub**: [Library Components](https://github.com/javeriana-mercadeo/Library-components)
- **Intranet Javeriana**: [Portal Principal](https://intranet.javeriana.edu.co/inicio)
- **Liferay Javeriana**: [Sitio info-prg](https://intranet.javeriana.edu.co/web/info-prg)
- **Documentación Liferay**: [Help Center](https://help.liferay.com/hc/es)

### 📚 Librerías y Herramientas

- **Íconos**: [Phosphor Icons](https://phosphoricons.com/)
- **Componentes**: [Flowbite](https://flowbite.com/)
- **Sliders**: [Swiper.js](https://swiperjs.com/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Biblioteca UI**: [HyperUI Components](https://www.hyperui.dev/components/marketing)

## 📁 Estructura del Proyecto

```
project/
├── app/                              # Aplicación Next.js
│   ├── _components/                  # Componentes globales de la app
│   │   ├── header/                   # Header principal
│   │   ├── footer/                   # Footer global
│   │   ├── themeSwitch/             # Selector de temas
│   │   └── viewComponent/           # Visualizador de componentes
│   ├── _library/                     # Biblioteca de componentes
│   │   ├── _general/                # Componentes generales
│   │   │   ├── components/          # Botones, contenedores, etc.
│   │   │   └── sections/           # Secciones reutilizables
│   │   ├── _institutional/          # Componentes institucionales
│   │   │   ├── components/          # Cards, acordeones, etc.
│   │   │   ├── sections/           # Headers, footers específicos
│   │   │   └── views/              # Vistas completas (blog, etc.)
│   │   └── components/             # Componentes base
│   ├── landing/                     # Landing pages por programa
│   │   ├── pregrado/               # Landing de pregrado
│   │   ├── doctorado/              # Landing de doctorado
│   │   └── mba/                    # Landing MBA
│   ├── institutional/              # Páginas institucionales
│   └── fragments/                  # Páginas de prueba y fragmentos
├── styles/                         # Sistema de estilos
│   ├── abstracts/                  # Variables, funciones, mixins
│   ├── base/                       # Reset, tipografía, utilidades
│   ├── themes/                     # Sistema de temas
│   └── vendors/                    # Estilos de terceros
├── assets/                         # Recursos estáticos
└── config/                         # Configuraciones
```

## 🎨 Responsive Design y Temas

## 🎨 Sistema de Temas

### Temas Disponibles

El sistema incluye **42 temas** diferentes:

#### Tema Base

- `light` - Institucional claro
- `dark` - Institucional oscuro

#### Facultades (Modo Claro y Oscuro)

- `arquitectura-diseno` / `arquitectura-diseno-dark`
- `artes` / `artes-dark`
- `ciencias` / `ciencias-dark`
- `ciencias-economicas-administrativas` / `ciencias-economicas-administrativas-dark`
- `ciencias-juridicas` / `ciencias-juridicas-dark`
- `ciencias-politicas-relaciones-internacionales` / `ciencias-politicas-relaciones-internacionales-dark`
- `ciencias-sociales` / `ciencias-sociales-dark`
- `comunicacion-lenguaje` / `comunicacion-lenguaje-dark`
- `derecho-canonico` / `derecho-canonico-dark`
- `educacion` / `educacion-dark`
- `enfermeria` / `enfermeria-dark`
- `estudios-ambientales-rurales` / `estudios-ambientales-rurales-dark`
- `filosofia` / `filosofia-dark`
- `ingenieria` / `ingenieria-dark`
- `instituto-pensar` / `instituto-pensar-dark`
- `instituto-salud-publica` / `instituto-salud-publica-dark`
- `medicina` / `medicina-dark`
- `odontologia` / `odontologia-dark`
- `psicologia` / `psicologia-dark`
- `teologia` / `teologia-dark`

### Uso de Temas

```scss
// En componentes Sass
.mi-componente {
  background-color: var(--primary-600);
  color: var(--neutral-100);

  @include dark-theme {
    background-color: var(--primary-300);
  }
}
```

```jsx
// En componentes React
const MiComponente = () => <div className="bg-[var(--primary-600)] text-[var(--neutral-100)]">Contenido</div>
```

## 🧩 Creación de Componentes

### ⚠️ Importante: Compatibilidad con Liferay

**NO se pueden usar hooks de React** (useState, useEffect, etc.) en los componentes. Todo el JavaScript debe ser **vanilla JS** para
garantizar compatibilidad total con Liferay DXP.

### Estructura de un Componente

```
mi-componente/
├── index.jsx           # Componente React (sin hooks)
├── styles.scss         # Estilos específicos
├── script.js           # JavaScript vanilla
├── info.json           # Metadatos del componente
└── assets/             # Recursos del componente
```

### Ejemplo de Componente Compatible con Liferay

```jsx
// index.jsx - SOLO JSX, SIN HOOKS
import './styles.scss'
import info from './info.json'

const MiComponente = ({ children, className }) => {
  return (
    <div className={`mi-componente ${className || ''}`} data-component-id={info.name}>
      {children}
    </div>
  )
}

export default MiComponente
```

```javascript
// script.js - VANILLA JAVASCRIPT PURO
document.addEventListener('DOMContentLoaded', function () {
  // Toda la lógica en vanilla JS
  const componentes = document.querySelectorAll('[data-component-id="Mi Componente"]')

  componentes.forEach(componente => {
    // Agregar eventos
    componente.addEventListener('click', function (e) {
      console.log('Componente clickeado')
    })

    // Agregar funcionalidad
    const botones = componente.querySelectorAll('button')
    botones.forEach(boton => {
      boton.addEventListener('click', handleClick)
    })
  })
})

function handleClick(event) {
  // Lógica del evento
  event.preventDefault()
  // Sin hooks, solo vanilla JS
}
```

```scss
// styles.scss - 100% RESPONSIVE
@use '@styles/autoload' as *;

.mi-componente {
  background-color: var(--background-100);
  padding: var(--spacing-md);
  border-radius: rem(8px);

  // Responsive con mixin (breakpoint 768px por defecto)
  @include responsive {
    padding: var(--spacing-lg);
  }

  // Responsive con breakpoint personalizado
  @include responsive($breakpoint-lg) {
    padding: var(--spacing-xl);
  }

  // Soporte para tema oscuro
  @include dark-theme {
    background-color: var(--background-300);
  }

  // Transición simple
  @include hover-transition;
}
```

```json
// info.json
{
  "name": "Mi Componente",
  "type": "component",
  "description": "Descripción del componente"
}
```

## 🎯 Sistema de Botones

### Variantes Disponibles

```jsx
// Estilos
<Btn color="primary">Sólido</Btn>
<Btn color="primary" variant="outline">Contorno</Btn>
<Btn color="primary" variant="ghost">Fantasma</Btn>
<Btn color="primary" variant="link">Enlace</Btn>

// Tamaños
<Btn size="sm">Pequeño</Btn>
<Btn size="md">Mediano</Btn>
<Btn size="lg">Grande</Btn>

// Con íconos
<Btn startIcon={<i className="ph ph-plus" />}>Con ícono inicial</Btn>
<Btn endIcon={<i className="ph ph-arrow-right" />}>Con ícono final</Btn>

// Estados
<Btn disabled>Deshabilitado</Btn>
<Btn fullWidth>Ancho completo</Btn>
```

### Colores Disponibles

- `primary`, `secondary`, `tertiary`
- `success`, `warning`, `danger`

## 🛠️ Herramientas de Desarrollo

### ViewComponent

Envuelve componentes para mostrar código y permitir descarga:

```jsx
import ViewComponent from '@/app/_components/viewComponent/viewComponent'

;<ViewComponent path="ruta/al/componente">
  <MiComponente />
</ViewComponent>
```

### ThemeSwitch

Selector de temas disponible globalmente. Se puede usar desde cualquier parte de la aplicación.

## 📝 Variables de Diseño

### Espaciado

```scss
--spacing-sm: 8px --spacing-md: 16px --spacing-lg: 24px --spacing-xl: 38px;
```

### Tipografía

```scss
--font-size-principal-title: 36px --font-size-title: 28px --font-size-subtitle: 22px --font-size-caption: 18px --font-size-paragraph: 14px
  --font-size-small: 10px;
```

### Colores por Tema

Cada tema genera automáticamente una escala de colores:

```scss
--primary-100   # Muy claro
--primary-300   # Claro
--primary-500   # Base
--primary-700   # Oscuro
--primary-900   # Muy oscuro
```

## 🔧 Personalización de Estilos

### Modificar Colores Base

Edita `styles/abstracts/_colors.scss`:

```scss
$color-base: (
  'primary': #tu-color-primario,
  'secondary': #tu-color-secundario,
  // ...
);
```

### Agregar Nuevo Tema

En `styles/abstracts/_colors.scss`:

```scss
$colors-theme: (
  'mi-nuevo-tema': (
    'primary': generate-color-scale(#mi-color),
    'secondary': generate-color-scale(#otro-color),
    // ...
  ),
  // ...
);
```

### Personalizar Breakpoints

En `styles/abstracts/_variables.scss`:

```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

## 📚 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run format       # Formatear código con Prettier
npm run lint         # Linter con ESLint
```

## 🔌 APIs y Servicios

### API de Archivos

- `GET /api/file?path=ruta` - Obtiene código de componentes
- Retorna HTML, CSS y JS formateados

### API de Datos

- `GET /api/data` - Datos internos de ejemplo

## 📱 Páginas Principales

- `/` - Biblioteca de componentes
- `/landing/pregrado` - Landing de pregrado
- `/landing/doctorado` - Landing de doctorado
- `/institutional/articles` - Página de artículos
- `/fragments/components/buttons` - Pruebas de botones

## 🚨 Limitaciones y Compatibilidad con Liferay

### ❌ NO Permitido en Componentes

- **Hooks de React** (useState, useEffect, useContext, etc.)
- **Imports dinámicos** de React
- **Context API** de React
- **Estado local de React**

### ✅ SÍ Permitido y Recomendado

- **JSX estático** sin estado
- **Vanilla JavaScript** en archivos `.js`
- **Event listeners** con `addEventListener`
- **DOM manipulation** puro
- **Funciones JavaScript** estándar
- **Librerías externas** como Swiper.js

### 🔧 Patrón Recomendado

```jsx
// ✅ CORRECTO - Solo JSX estático
const MiComponente = ({ datos }) => (
  <div className="mi-componente" data-component="mi-componente">
    <h2>{datos.titulo}</h2>
    <button className="mi-boton">Click me</button>
  </div>
)

// ❌ INCORRECTO - NO usar hooks
const MiComponenteMalo = () => {
  const [estado, setEstado] = useState(false) // ❌ NO HACER ESTO

  useEffect(() => {
    // ❌ NO HACER ESTO
    // lógica
  }, [])

  return <div>...</div>
}
```

```javascript
// ✅ CORRECTO - Vanilla JS en script.js
document.addEventListener('DOMContentLoaded', function () {
  const componentes = document.querySelectorAll('[data-component="mi-componente"]')

  componentes.forEach(comp => {
    const boton = comp.querySelector('.mi-boton')
    boton.addEventListener('click', handleClick)
  })
})

function handleClick(event) {
  // Toda la lógica aquí
  const elemento = event.target
  elemento.classList.toggle('activo')
}
```

## 🤝 Contribución

Para agregar nuevos componentes **compatibles con Liferay**:

1. **Crear estructura** en `app/_library/`
2. **Implementar JSX estático** (sin hooks)
3. **Escribir JavaScript vanilla** en `script.js`
4. **Hacer 100% responsive** con mixins de Sass
5. **Probar con todos los temas** (claros y oscuros)
6. **Agregar metadatos** en `info.json`
7. **Documentar el uso**

### Checklist de Compatibilidad

- [ ] ✅ JSX sin hooks de React
- [ ] ✅ JavaScript vanilla en archivos `.js`
- [ ] ✅ 100% responsive (mobile-first)
- [ ] ✅ Funciona en temas claros y oscuros
- [ ] ✅ Usa variables CSS del sistema de temas
- [ ] ✅ Implementa mixins de Sass disponibles
- [ ] ✅ Probado en diferentes breakpoints
- [ ] ✅ Compatible con Liferay DXP

## 📖 Referencias

- [Next.js 15](https://nextjs.org/)
- [Sass](https://sass-lang.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroUI](https://heroui.com/)
- [Phosphor Icons](https://phosphoricons.com/)

---

**Desarrollado para la Pontificia Universidad Javeriana** Sistema de componentes para landing pages y sitios institucionales.
