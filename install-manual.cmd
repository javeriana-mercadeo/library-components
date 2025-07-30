@echo off
echo Paso 1: Instalando HeroUI y framer-motion...
npm install @heroui/react framer-motion@11.11.17 --save
if %errorlevel% neq 0 (
    echo ERROR en paso 1
    pause
    exit /b 1
)

echo Paso 2: Instalando TailwindCSS v4...
npm install tailwindcss@4.1.11 --save-dev
if %errorlevel% neq 0 (
    echo ERROR en paso 2
    pause
    exit /b 1
)

echo Paso 3: Instalando react-syntax-highlighter...
npm install react-syntax-highlighter@15.6.1 --save
if %errorlevel% neq 0 (
    echo ERROR en paso 3
    pause
    exit /b 1
)

echo Paso 4: Instalando resto de dependencias...
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ERROR en paso 4
    pause
    exit /b 1
)

echo ¡Instalación completada con éxito!
pause