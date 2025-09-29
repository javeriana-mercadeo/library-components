# 🔄 Refactorización de Componentes - Mejores Prácticas

## 📋 Análisis Actual

**Problemas identificados:**
- ❌ Nombres inconsistentes (kebab-case, camelCase, PascalCase mezclados)
- ❌ Archivos duplicados (`.tsx` y carpetas con `index.jsx`)
- ❌ Estructura inconsistente (algunos en carpetas, otros sueltos)
- ❌ Mixing de archivos JSX y TSX
- ❌ Nombres no descriptivos

**Total de componentes:** 33 archivos

---

## 🎯 Nueva Estructura Propuesta

### **📁 Organización por Categorías**

```
components/
├── 📁 common/              # Componentes comunes reutilizables
│   ├── Button/
│   │   ├── index.ts        # Re-export
│   │   ├── Button.tsx      # Componente principal
│   │   └── Button.types.ts # Tipos (si es complejo)
│   ├── Card/
│   │   ├── index.ts
│   │   ├── Card.tsx
│   │   └── variants/       # Variantes del componente
│   │       ├── InfoCard.tsx
│   │       ├── DemoCard.tsx
│   │       └── ResourceCard.tsx
│   └── LoadingBar/
│       ├── index.ts
│       └── LoadingBar.tsx
│
├── 📁 layout/              # Componentes de layout/estructura
│   ├── Header/
│   │   ├── index.ts
│   │   └── Header.tsx
│   ├── Footer/
│   │   ├── index.ts
│   │   └── Footer.tsx
│   └── Navigation/
│       ├── index.ts
│       ├── NavigationLoader.tsx
│       └── BtnReturn.tsx
│
├── 📁 ui/                  # Componentes específicos de UI
│   ├── CodeBlock/
│   │   ├── index.ts
│   │   └── CodeBlock.tsx
│   ├── ThemeSwitch/
│   │   ├── index.ts
│   │   └── ThemeSwitch.tsx
│   └── Alerts/
│       ├── index.ts
│       ├── WarningAlert.tsx
│       └── InfoAlert.tsx
│
├── 📁 features/            # Componentes específicos de características
│   ├── ComponentCatalog/
│   │   ├── index.ts
│   │   ├── ComponentCatalog.tsx
│   │   └── ConfigurationSection.tsx
│   ├── GlobalAssets/
│   │   ├── index.ts
│   │   ├── GlobalAssetsSection.tsx
│   │   └── GlobalAssetsViewer.tsx
│   └── TeamShowcase/
│       ├── index.ts
│       ├── TeamCard.tsx
│       └── PhaseCard.tsx
│
├── 📁 utils/               # Componentes de utilidad
│   ├── ClientSideUtils/
│   │   ├── index.ts
│   │   └── ClientSideUtils.tsx
│   └── ViewComponent/
│       ├── index.ts
│       ├── ViewComponent.tsx
│       └── utils/
│           └── helpers.ts
│
└── 📁 providers/           # Context providers
    └── ThemeProvider/
        ├── index.ts
        └── ThemeProvider.tsx
```

---

## 🔄 Plan de Renombrado Detallado

### **1️⃣ COMMON COMPONENTS**

```bash
# Crear estructura base
mkdir -p components/common/{Button,Card,LoadingBar}

# Mover y renombrar Card components
mv components/card/card.tsx → components/common/Card/Card.tsx
mv components/card/componentCard.tsx → components/common/Card/variants/ComponentCard.tsx
mv components/ui/DemoCard.tsx → components/common/Card/variants/DemoCard.tsx
mv components/ui/InfoCard.tsx → components/common/Card/variants/InfoCard.tsx
mv components/ui/ResourceCard.tsx → components/common/Card/variants/ResourceCard.tsx
mv components/ui/SectionCard.tsx → components/common/Card/variants/SectionCard.tsx

# Mover LoadingBar
mv components/loading/LoadingBar.tsx → components/common/LoadingBar/LoadingBar.tsx

# Mover Button variants
mv components/variantsButtons/variant-buttons.tsx → components/common/Button/VariantButtons.tsx
```

### **2️⃣ LAYOUT COMPONENTS**

```bash
# Crear estructura de layout
mkdir -p components/layout/{Header,Footer,Navigation}

# Mover Header components
mv components/Header.tsx → components/layout/Header/Header.tsx
rm -rf components/header/  # Eliminar duplicado

# Mover Footer
mv components/footer/footer.tsx → components/layout/Footer/Footer.tsx

# Mover Navigation components
mv components/NavigationLoader.tsx → components/layout/Navigation/NavigationLoader.tsx
mv components/BtnReturn.tsx → components/layout/Navigation/BtnReturn.tsx
```

### **3️⃣ UI COMPONENTS**

```bash
# Crear estructura UI
mkdir -p components/ui/{CodeBlock,ThemeSwitch,Alerts,Cards}

# Mover UI específicos
mv components/ui/CodeBlock.tsx → components/ui/CodeBlock/CodeBlock.tsx
mv components/themeSwitch/theme-switch.tsx → components/ui/ThemeSwitch/ThemeSwitch.tsx
mv components/ui/WarningAlert.tsx → components/ui/Alerts/WarningAlert.tsx

# Mover cards específicas de UI
mv components/ui/APIEndpointCard.tsx → components/ui/Cards/APIEndpointCard.tsx
mv components/ui/EnvironmentCard.tsx → components/ui/Cards/EnvironmentCard.tsx
mv components/ui/TechStackCard.tsx → components/ui/Cards/TechStackCard.tsx
```

### **4️⃣ FEATURE COMPONENTS**

```bash
# Crear estructura de features
mkdir -p components/features/{ComponentCatalog,GlobalAssets,TeamShowcase}

# Mover Component Catalog
mv components/componentCatalog.tsx → components/features/ComponentCatalog/ComponentCatalog.tsx
mv components/configurationSection.tsx → components/features/ComponentCatalog/ConfigurationSection.tsx
rm -rf components/componentCatalog/  # Eliminar duplicado
rm -rf components/configurationSection/  # Eliminar duplicado

# Mover Global Assets
mv components/globalAssetsSection.tsx → components/features/GlobalAssets/GlobalAssetsSection.tsx
mv components/globalAssetsViewe/globalAssetsViewer.tsx → components/features/GlobalAssets/GlobalAssetsViewer.tsx
rm -rf components/globalAssetsSection/  # Eliminar duplicado
rm -rf components/globalAssetsViewe/  # Eliminar duplicado

# Mover Team components
mv components/ui/TeamCard.tsx → components/features/TeamShowcase/TeamCard.tsx
mv components/ui/PhaseCard.tsx → components/features/TeamShowcase/PhaseCard.tsx
```

### **5️⃣ UTILS & PROVIDERS**

```bash
# Crear estructura utils
mkdir -p components/utils/{ClientSideUtils,ViewComponent/utils}

# Mover utils
mv components/ClientSideUtils.tsx → components/utils/ClientSideUtils/ClientSideUtils.tsx
mv components/viewComponent/ → components/utils/ViewComponent/
rm -rf components/clientSideUtils/  # Eliminar duplicado si existe

# Mover load component (probablemente sea util)
mv components/load/load.jsx → components/utils/Load/Load.tsx  # Convertir a TSX
```

---

## 📄 Plantillas de Archivos Index

### **Template para index.ts (Re-export)**

```typescript
// components/common/Card/index.ts
export { default } from './Card'
export * from './Card.types'
export { default as InfoCard } from './variants/InfoCard'
export { default as DemoCard } from './variants/DemoCard'
export { default as ResourceCard } from './variants/ResourceCard'
```

### **Template para componente base**

```typescript
// components/common/Card/Card.tsx
'use client'

import { FC } from 'react'
import { CardProps } from './Card.types'

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`card-base ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
```

### **Template para tipos (si es necesario)**

```typescript
// components/common/Card/Card.types.ts
import { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'info' | 'demo' | 'resource'
  size?: 'sm' | 'md' | 'lg'
}
```

---

## 🔧 Scripts de Automatización

### **Script de migración bash:**

```bash
#!/bin/bash
# migrate-components.sh

echo "🚀 Iniciando refactorización de componentes..."

# Crear nuevas carpetas
mkdir -p components/{common,layout,ui,features,utils,providers}
mkdir -p components/common/{Button,Card,LoadingBar}
mkdir -p components/layout/{Header,Footer,Navigation}
mkdir -p components/ui/{CodeBlock,ThemeSwitch,Alerts,Cards}
mkdir -p components/features/{ComponentCatalog,GlobalAssets,TeamShowcase}
mkdir -p components/utils/{ClientSideUtils,ViewComponent,Load}

# Función para mover y crear index
move_with_index() {
    local source=$1
    local dest_dir=$2
    local component_name=$3

    mv "$source" "$dest_dir/$component_name.tsx"
    echo "export { default } from './$component_name'" > "$dest_dir/index.ts"
}

# Ejecutar migraciones
echo "📦 Migrando componentes comunes..."
move_with_index "components/loading/LoadingBar.tsx" "components/common/LoadingBar" "LoadingBar"

echo "🎨 Migrando componentes de layout..."
move_with_index "components/Header.tsx" "components/layout/Header" "Header"
move_with_index "components/NavigationLoader.tsx" "components/layout/Navigation" "NavigationLoader"

echo "✨ Migrando componentes UI..."
move_with_index "components/ui/CodeBlock.tsx" "components/ui/CodeBlock" "CodeBlock"

echo "🔧 Migrando utilidades..."
move_with_index "components/ClientSideUtils.tsx" "components/utils/ClientSideUtils" "ClientSideUtils"

# Limpiar carpetas vacías
echo "🧹 Limpiando carpetas vacías..."
find components/ -type d -empty -delete

echo "✅ Refactorización completada!"
```

---

## 🎯 Convenciones Finales

### **📛 Nomenclatura:**
- **Carpetas:** PascalCase (`ComponentCatalog/`)
- **Archivos:** PascalCase (`ComponentCatalog.tsx`)
- **Exports:** Named exports con default export
- **Index files:** Solo re-exports

### **📱 Extensiones:**
- **Componentes React:** `.tsx`
- **Utilidades:** `.ts`
- **Tipos:** `.types.ts`
- **Constantes:** `.constants.ts`

### **📂 Organización:**
- Un componente por archivo
- Un archivo por funcionalidad
- Index files para re-exports limpios
- Subcarpetas para variantes/relacionados

### **🔗 Imports después de refactor:**

```typescript
// Antes
import Header from '../components/Header'
import DemoCard from '../components/ui/DemoCard'
import LoadingBar from '../components/loading/LoadingBar'

// Después
import { Header } from '@/components/layout'
import { DemoCard } from '@/components/common'
import { LoadingBar } from '@/components/common'
```

---

## ✅ Checklist de Migración

- [ ] 📁 Crear nueva estructura de carpetas
- [ ] 🔄 Mover archivos según el plan
- [ ] 📄 Crear archivos index.ts para re-exports
- [ ] 🔧 Actualizar imports en toda la aplicación
- [ ] 🧹 Eliminar carpetas y archivos obsoletos
- [ ] ✨ Convertir archivos .jsx restantes a .tsx
- [ ] 🔍 Verificar que no hay imports rotos
- [ ] ✅ Probar que la aplicación funciona correctamente

---

**¡Con esta refactorización tendrás una estructura de componentes profesional, escalable y fácil de mantener!** 🎉