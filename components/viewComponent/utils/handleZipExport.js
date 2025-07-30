import html2canvas from 'html2canvas'
import JSZip from 'jszip'

const handleZipExport = async (info, htmlFormat, cssFormat, jsFormat, configFormat, previewRef) => {
  const zip = new JSZip()

  // Capturar la imagen de previsualización usando html2canvas directamente
  const canvas = await html2canvas(previewRef.current)

  // Convertir canvas a blob usando Promise
  const blob = await new Promise(resolve => {
    canvas.toBlob(resolve)
  })

  // Crear una carpeta dentro del ZIP
  const assetsFolder = zip.folder(info.name)

  // Agregar archivos solo si tienen contenido
  assetsFolder.file('thumbnail.png', blob)
  
  if (htmlFormat && htmlFormat.trim()) {
    assetsFolder.file('index.html', htmlFormat)
  }
  
  if (cssFormat && cssFormat.trim()) {
    assetsFolder.file('index.css', cssFormat)
  }
  
  if (jsFormat && jsFormat.trim()) {
    assetsFolder.file('index.js', jsFormat)
  }

  // Usar configuration.json si existe, sino crear uno vacío
  const configContent = configFormat && configFormat.trim() 
    ? configFormat 
    : JSON.stringify({ fieldSets: [] }, null, 2)
  
  assetsFolder.file('configuration.json', configContent)
  
  // Crear fragment.json con las rutas correctas
  const fragmentConfig = {
    name: info.name,
    type: info.type,
    configurationPath: 'configuration.json',
    thumbnailPath: 'thumbnail.png'
  }

  // Solo agregar rutas si los archivos existen
  if (htmlFormat && htmlFormat.trim()) {
    fragmentConfig.htmlPath = 'index.html'
  }
  
  if (cssFormat && cssFormat.trim()) {
    fragmentConfig.cssPath = 'index.css'
  }
  
  if (jsFormat && jsFormat.trim()) {
    fragmentConfig.jsPath = 'index.js'
  }

  assetsFolder.file('fragment.json', JSON.stringify(fragmentConfig, null, 2))

  // Generar y descargar el ZIP
  const content = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(content)
  link.download = `frontend-${info.name}-${info.type}.zip`
  link.click()
}

export default handleZipExport
