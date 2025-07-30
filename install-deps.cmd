@echo off
echo ========================================
echo   INSTALACIÓN HEROUI + TailwindCSS v4
echo ========================================

echo 1. Limpiando instalación anterior...
if exist node_modules (
    echo    - Eliminando node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo    - Eliminando package-lock.json...
    del package-lock.json
)

echo 2. Limpiando cache de npm...
npm cache clean --force

echo 3. Instalando HeroUI y dependencias core...
npm install @heroui/react framer-motion@^11.11.17 --save

echo 4. Instalando TailwindCSS v4...
npm install tailwindcss@^4.1.11 --save-dev

echo 5. Instalando otras dependencias...
npm install react-syntax-highlighter@^15.6.1 --save
npm install --legacy-peer-deps

echo 6. Verificando instalación crítica...
echo Verificando @heroui/react:
npm ls @heroui/react
echo Verificando tailwindcss:
npm ls tailwindcss
echo Verificando framer-motion:
npm ls framer-motion
echo Verificando react-syntax-highlighter:
npm ls react-syntax-highlighter

echo.
echo ========================================
echo ¡HeroUI con TailwindCSS v4 instalado!
echo Configuración actualizada según docs oficiales
echo Ejecuta: npm run dev
echo ========================================
pause