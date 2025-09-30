# 🚀 Guía de Migración - Reestructuración PUJ Ecosystem

## 📋 Resumen de la Migración

Esta guía te ayudará a reestructurar el proyecto actual en 3 workspaces independientes con responsabilidades claras.

---

## 📁 Nueva Estructura Objetivo

```
puj-ecosystem/
├── 📦 dev-studio/              # Next.js + HeroUI (desarrollo/demos)
├── 📦 liferay-library/         # React + Vanilla (producción Liferay)
├── 📦 landing-factory/         # Generador de landing pages
├── 📦 shared-resources/        # Recursos compartidos
└── package.json               # Workspace root
```

---

## 🎯 Paso a Paso - Reestructuración

### **1️⃣ Crear Nueva Estructura**

```bash
# 1. Crear carpeta principal del ecosistema
mkdir puj-ecosystem
cd puj-ecosystem

# 2. Crear workspaces
mkdir dev-studio liferay-library landing-factory shared-resources

# 3. Configurar workspace root
npm init -y
```

### **2️⃣ Configurar Workspace Root**

Crear `puj-ecosystem/package.json`:

```json
{
  "name": "@puj/ecosystem",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["dev-studio", "liferay-library", "landing-factory", "shared-resources"],
  "scripts": {
    "dev": "npm run dev --workspace=dev-studio",
    "dev:liferay": "npm run build:watch --workspace=liferay-library",
    "build:all": "npm run build --workspaces --if-present",
    "create:landing": "npm run create --workspace=landing-factory",
    "deploy:liferay": "npm run deploy --workspace=liferay-library",
    "lint": "npm run lint --workspaces --if-present",
    "clean": "npm run clean --workspaces --if-present"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### **3️⃣ Configurar DEV-STUDIO (Next.js)**

```bash
cd dev-studio
npm init -y
```

Crear `dev-studio/package.json`:

```json
{
  "name": "@puj/dev-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --fix",
    "clean": "rm -rf .next out"
  },
  "dependencies": {
    "@heroui/react": "^2.8.4",
    "@heroui/button": "2.2.26",
    "@heroui/code": "2.2.20",
    "@heroui/input": "2.4.27",
    "@heroui/navbar": "2.2.24",
    "@heroui/system": "2.4.22",
    "@heroui/theme": "2.4.22",
    "next": "15.5.4",
    "next-themes": "0.4.6",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "11.18.2",
    "tailwindcss": "4.1.13"
  },
  "devDependencies": {
    "@types/react": "18.3.24",
    "@types/react-dom": "18.3.7",
    "typescript": "5.9.2",
    "eslint": "9.36.0",
    "eslint-config-next": "15.5.4"
  }
}
```

Crear `dev-studio/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración específica para dev-studio
  experimental: {
    turboMode: true
  },
  // Alias para importar desde otros workspaces
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@puj/shared': '../shared-resources',
      '@puj/liferay': '../liferay-library'
    }
    return config
  },
  // Transpile workspaces
  transpilePackages: ['@puj/shared-resources', '@puj/liferay-library']
}

module.exports = nextConfig
```

Crear `dev-studio/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*", "./*"],
      "@puj/shared/*": ["../shared-resources/*"],
      "@puj/liferay/*": ["../liferay-library/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### **4️⃣ Configurar LIFERAY-LIBRARY**

```bash
cd ../liferay-library
npm init -y
```

Crear `liferay-library/package.json`:

```json
{
  "name": "@puj/liferay-library",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "rollup -c",
    "build:watch": "rollup -c --watch",
    "bundle": "npm run build && npm run optimize",
    "optimize": "terser dist/bundle.js -o dist/bundle.min.js",
    "deploy": "node scripts/deploy-to-liferay.js",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@rollup/plugin-alias": "^5.1.1",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^11.1.6",
    "rollup": "^4.52.2",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-sass": "^1.15.3",
    "sass": "^1.93.2",
    "terser": "^5.27.0",
    "typescript": "^5.9.2"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

Crear `liferay-library/rollup.config.js`:

```javascript
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import sass from 'rollup-plugin-sass'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: !isProduction
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: !isProduction
    },
    {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'PUJLibrary',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: !isProduction
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    alias({
      entries: [{ find: '@puj/shared', replacement: path.resolve('../shared-resources') }]
    }),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    sass({
      output: 'dist/styles.css',
      options: {
        outputStyle: isProduction ? 'compressed' : 'expanded'
      }
    }),
    postcss({
      extract: true,
      minimize: isProduction,
      sourceMap: !isProduction
    }),
    ...(isProduction ? [terser()] : [])
  ]
}
```

### **5️⃣ Configurar LANDING-FACTORY**

```bash
cd ../landing-factory
npm init -y
```

Crear `landing-factory/package.json`:

```json
{
  "name": "@puj/landing-factory",
  "version": "1.0.0",
  "bin": {
    "create-landing": "./bin/create-landing.js"
  },
  "scripts": {
    "create": "node bin/create-landing.js",
    "build:all": "node scripts/build-all-landings.js",
    "build": "node scripts/build-landing.js",
    "deploy": "node scripts/deploy-landings.js",
    "clean": "rm -rf output/*"
  },
  "dependencies": {
    "handlebars": "^4.7.8",
    "fs-extra": "^11.2.0",
    "inquirer": "^9.2.12",
    "chalk": "^5.3.0",
    "glob": "^10.3.10"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### **6️⃣ Configurar SHARED-RESOURCES**

```bash
cd ../shared-resources
npm init -y
```

Crear `shared-resources/package.json`:

```json
{
  "name": "@puj/shared-resources",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./design-tokens": {
      "import": "./design-tokens/index.js"
    },
    "./types": {
      "import": "./types/index.ts"
    }
  },
  "scripts": {
    "build": "tsc && tsc -p tsconfig.esm.json",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "typescript": "^5.9.2"
  }
}
```

---

## 🔄 Proceso de Migración de Archivos

### **Migrar desde `library-components/` actual:**

```bash
# Estructura actual -> Nueva estructura

# DESARROLLO (Next.js stuff)
library-components/app/docs/           -> dev-studio/app/docs/
library-components/app/demos/          -> dev-studio/app/demos/
library-components/app/fragments/      -> dev-studio/app/playground/
library-components/components/ui/      -> dev-studio/components/ui/
library-components/components/Header.tsx -> dev-studio/components/

# PRODUCCIÓN LIFERAY
library-components/app/_library/components/ -> liferay-library/components/
library-components/app/_library/_configurations/ -> liferay-library/configurations/
library-components/utils/              -> liferay-library/utils/

# LANDING PAGES
library-components/app/landing/        -> landing-factory/templates/
library-components/app/institutional/  -> landing-factory/templates/

# COMPARTIDO
library-components/types/              -> shared-resources/types/
library-components/config/             -> shared-resources/configs/
library-components/styles/             -> shared-resources/styles/
library-components/assets/             -> shared-resources/assets/
```

---

## ⚙️ Configuraciones Importantes para Next.js

### **Hacer que Next.js tome otra carpeta como root:**

#### **Opción 1: Mover next.config.js**

```bash
# Mover configuración de Next.js al nuevo workspace
mv library-components/next.config.js dev-studio/
mv library-components/package.json dev-studio/
```

#### **Opción 2: Cambiar directorio de trabajo**

```bash
# Desde el root del ecosystem
cd dev-studio && npm run dev

# O desde el root con workspace
npm run dev --workspace=dev-studio
```

#### **Opción 3: Configurar path base en next.config.js**

```javascript
// dev-studio/next.config.js
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Especificar directorio de páginas
  dir: '.',

  // Configurar paths para importar desde otros workspaces
  webpack: (config, { dev, isServer }) => {
    // Alias para workspaces
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@puj/shared': path.resolve(__dirname, '../shared-resources'),
      '@puj/liferay': path.resolve(__dirname, '../liferay-library')
    }

    return config
  }
}

module.exports = nextConfig
```

---

## 📄 Archivos de Configuración Adicionales

### **Root .gitignore**

```gitignore
# Dependencies
node_modules/
*/node_modules/

# Build outputs
*/dist/
*/build/
*/.next/
*/out/

# Environment
.env*
!.env.example

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
```

### **Root .nvmrc (si usas nvm)**

```
18.17.0
```

### **Root .eslintrc.js**

```javascript
module.exports = {
  root: true,
  extends: ['@puj/eslint-config'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.next/']
}
```

---

## 🚀 Comandos de Migración Rápida

### **Script de migración automática:**

Crear `migrate.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando migración a PUJ Ecosystem..."

# 1. Crear nueva estructura
mkdir -p puj-ecosystem/{dev-studio,liferay-library,landing-factory,shared-resources}
cd puj-ecosystem

# 2. Configurar workspace root
cat > package.json << 'EOF'
{
  "name": "@puj/ecosystem",
  "workspaces": ["dev-studio", "liferay-library", "landing-factory", "shared-resources"],
  "scripts": {
    "dev": "npm run dev --workspace=dev-studio",
    "build:all": "npm run build --workspaces --if-present"
  }
}
EOF

# 3. Migrar archivos de desarrollo
echo "📦 Migrando dev-studio..."
cp -r ../library-components/app/docs dev-studio/app/
cp -r ../library-components/app/demos dev-studio/app/
cp -r ../library-components/components/ui dev-studio/components/

# 4. Migrar archivos de producción
echo "🏭 Migrando liferay-library..."
cp -r ../library-components/app/_library/components liferay-library/
cp -r ../library-components/utils liferay-library/

# 5. Migrar landing pages
echo "🎯 Migrando landing-factory..."
cp -r ../library-components/app/landing landing-factory/templates/

# 6. Migrar recursos compartidos
echo "🔧 Migrando shared-resources..."
cp -r ../library-components/types shared-resources/
cp -r ../library-components/styles shared-resources/

echo "✅ Migración base completada!"
echo "🔄 Ahora ejecuta: npm install && npm run dev"
```

---

## 📝 Lista de Verificación Post-Migración

- [ ] ✅ Workspace root configurado
- [ ] ✅ Dev-studio con Next.js funcionando
- [ ] ✅ Liferay-library compilando correctamente
- [ ] ✅ Landing-factory generando páginas
- [ ] ✅ Shared-resources exportando correctamente
- [ ] ✅ Imports actualizados en todos los archivos
- [ ] ✅ Scripts de build funcionando
- [ ] ✅ Linting configurado
- [ ] ✅ TypeScript sin errores

---

## 🆘 Resolución de Problemas Comunes

### **Error: Cannot resolve module**

```bash
# Verificar que los workspaces estén instalados
npm install

# Verificar configuración de TypeScript paths
# Revisar tsconfig.json en cada workspace
```

### **Next.js no encuentra páginas**

```bash
# Verificar que estás ejecutando desde el directorio correcto
cd dev-studio && npm run dev

# O desde root
npm run dev --workspace=dev-studio
```

### **Build errors en liferay-library**

```bash
# Verificar dependencias
cd liferay-library
npm install

# Build manual
npm run build
```

---

¡Con esta guía tendrás un ecosistema completamente organizado con responsabilidades claras! 🎉
