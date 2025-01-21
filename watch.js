const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const { exec } = require('child_process')

const componentsDir = path.join(__dirname, 'components')
const distDir = path.join(__dirname, 'dist')

// Crear la carpeta "dist" si no existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir)
}

// Compilar archivos SCSS a CSS
const compileSCSS = filePath => {
  const outputDir = path.join(distDir, path.basename(path.dirname(filePath)))
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  const outputFile = path.join(outputDir, 'index.css')
  exec(`sass ${filePath} ${outputFile}`, err => {
    if (err) {
      console.error(`Error compilando SCSS: ${err.message}`)
    } else {
      console.log(`Compilado SCSS -> ${outputFile}`)
    }
  })
}

// Copiar archivos HTML y JS al directorio "dist"
const copyFile = filePath => {
  const outputDir = path.join(distDir, path.basename(path.dirname(filePath)))
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  const outputFile = path.join(outputDir, path.basename(filePath))
  fs.copyFile(filePath, outputFile, err => {
    if (err) {
      console.error(`Error copiando archivo: ${err.message}`)
    } else {
      console.log(`Archivo copiado -> ${outputFile}`)
    }
  })
}

// Configurar watcher
chokidar.watch(componentsDir).on('all', (event, filePath) => {
  if (event === 'change' || event === 'add') {
    if (filePath.endsWith('.scss')) {
      compileSCSS(filePath)
    } else if (filePath.endsWith('.html') || filePath.endsWith('.js')) {
      copyFile(filePath)
    }
  }
})
