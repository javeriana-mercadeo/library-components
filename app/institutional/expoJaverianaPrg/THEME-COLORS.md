# 🎨 Tema de Colores - Expo Javeriana

## 📋 Colores del Tema

El tema `expo-javeriana` incluye 4 colores principales:

### **Colores Integrados al Sistema de Temas:**

| Color | Hex | Uso | Variable Base |
|-------|-----|-----|---------------|
| **Azul Javeriana** | `#2c5697` | Color principal institucional | `--primary-*` |
| **Amarillo/Dorado** | `#fbb900` | Color secundario, destacados | `--secondary-*` |
| **Naranja** | `#e55110` | Acentos, llamadas a la acción | `--tertiary-*` |

### **Color Custom (No integrado):**

| Color | Hex | Uso | Variable |
|-------|-----|-----|----------|
| **Morado Oscuro** | `#170557` | Fondos especiales, contraste | `--expo-purple-dark` |

---

## 🔧 Activación del Tema

### **Opción 1: A nivel de página (Recomendado)**

Para activar el tema en toda la página de Expo Javeriana, añade el atributo `data-theme-faculty` al HTML:

```html
<html data-theme-base="light" data-theme-faculty="expo-javeriana">
```

O en el componente de layout:

```jsx
// app/institutional/expoJaverianaPrg/layout.tsx
export default function ExpoJaverianaLayout({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme-faculty', 'expo-javeriana')

    return () => {
      document.documentElement.removeAttribute('data-theme-faculty')
    }
  }, [])

  return <>{children}</>
}
```

### **Opción 2: A nivel de sección**

Si solo quieres aplicar el tema a una sección específica:

```jsx
<div data-theme-faculty="expo-javeriana">
  <HeaderExpo />
  <DiferencialesForm />
</div>
```

---

## 📚 Variables CSS Generadas

Al activar el tema `expo-javeriana`, se generan automáticamente **33 variables CSS**:

### **Primary (Azul Javeriana - #2c5697)**
```css
--primary-100  /* Muy claro (98% lightness) */
--primary-200  /* Claro (95%) */
--primary-300  /* Claro (85%) */
--primary-400  /* Medio-claro (75%) */
--primary-500  /* Base (65%) - #2c5697 */
--primary-600  /* Medio-oscuro (55%) */
--primary-700  /* Oscuro (45%) */
--primary-800  /* Muy oscuro (35%) */
--primary-900  /* Muy oscuro (25%) */
--primary-1000 /* Casi negro (15%) */
--primary-1100 /* Negro (10%) */
```

### **Secondary (Amarillo - #fbb900)**
```css
--secondary-100 a --secondary-1100  /* 11 escalas */
```

### **Tertiary (Naranja - #e55110)**
```css
--tertiary-100 a --tertiary-1100  /* 11 escalas */
```

### **Custom (Morado Oscuro)**
```css
--expo-purple-dark  /* #170557 - Solo disponible dentro de .header-expo */
```

---

## 💡 Uso en Componentes

### **En SCSS:**

```scss
.mi-seccion-expo {
  // Colores principales
  background-color: var(--primary-500);      // Azul base
  border-color: var(--secondary-500);        // Amarillo base

  &__accent {
    background-color: var(--tertiary-500);   // Naranja base
  }

  // Variantes claras (para fondos)
  &__background {
    background-color: var(--primary-100);    // Azul muy claro
  }

  // Variantes oscuras (para textos)
  &__text {
    color: var(--primary-900);               // Azul muy oscuro
  }

  // Color custom
  &__special {
    background-color: var(--expo-purple-dark); // Morado oscuro
  }
}
```

### **En JSX/Inline:**

```jsx
<div
  style={{
    backgroundColor: 'var(--primary-500)',
    borderColor: 'var(--secondary-500)'
  }}
>
  <h2 style={{ color: 'var(--tertiary-700)' }}>
    Título con naranja oscuro
  </h2>

  <button style={{
    backgroundColor: 'var(--secondary-500)',
    color: 'var(--primary-900)'
  }}>
    Botón
  </button>
</div>
```

---

## 🎨 Ejemplos de Combinaciones

### **Combinación 1: Fondo claro con acento**
```scss
.seccion {
  background-color: var(--primary-100);      // Azul muy claro
  border-left: 4px solid var(--tertiary-500); // Naranja
  color: var(--primary-900);                 // Azul oscuro (texto)
}
```

### **Combinación 2: Botón llamativo**
```scss
.boton-cta {
  background-color: var(--secondary-500);    // Amarillo
  color: var(--primary-900);                 // Azul oscuro
  border: 2px solid var(--tertiary-500);     // Naranja

  &:hover {
    background-color: var(--tertiary-500);   // Naranja
    color: var(--neutral-1100);              // Blanco
  }
}
```

### **Combinación 3: Card informativa**
```scss
.info-card {
  background-color: var(--neutral-1100);     // Blanco
  border-top: 3px solid var(--primary-500);  // Azul

  &__icon {
    color: var(--tertiary-500);              // Naranja
  }

  &__title {
    color: var(--primary-700);               // Azul oscuro
  }
}
```

---

## 🌓 Modo Oscuro

El tema también funciona en modo oscuro automáticamente:

```html
<html data-theme-base="dark" data-theme-faculty="expo-javeriana">
```

En modo oscuro, **las escalas se invierten automáticamente**:
- `--primary-100` se vuelve oscuro
- `--primary-900` se vuelve claro

No necesitas escribir CSS adicional para dark mode.

---

## ⚠️ Notas Importantes

1. **Color personalizado limitado**: `--expo-purple-dark` solo está disponible dentro del componente `.header-expo`. Si necesitas usarlo en otras secciones, debes definirlo también allí.

2. **Preferir escalas**: Usa siempre las escalas (`-100` a `-1100`) en lugar del color base sin número.

3. **Colores neutrales**: Los colores neutral (`--neutral-100` a `--neutral-1100`) siguen disponibles y no cambian con el tema de facultad.

4. **Compatibilidad**: Este tema es compatible con Liferay DXP ya que usa solo variables CSS estándar.

---

## 📖 Referencias

- Sistema de colores: `styles/abstracts/_colors.scss` (línea 171-175)
- Sistema de temas: `styles/base/_themes.scss`
- Documentación principal: `README.md`
