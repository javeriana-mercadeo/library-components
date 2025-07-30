import html2canvas from 'html2canvas'
import JSZip from 'jszip'

const handleZipExport = async (info, htmlFormat, cssFormat, jsFormat, configFormat, previewRef) => {
  console.log('🔍 Debug ZIP Export:', { 
    info, 
    htmlLength: htmlFormat?.length || 0, 
    cssLength: cssFormat?.length || 0, 
    jsLength: jsFormat?.length || 0, 
    configLength: configFormat?.length || 0 
  })

  const zip = new JSZip()

  try {
    // Capturar la imagen de previsualización usando html2canvas directamente
    const canvas = await html2canvas(previewRef.current)

    // Convertir canvas a blob usando Promise
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png')
    })

    console.log('📸 Canvas blob created:', blob?.size || 0, 'bytes')

    // Crear una carpeta dentro del ZIP
    const folderName = info.name || 'component'
    const assetsFolder = zip.folder(folderName)

    // Agregar archivos solo si tienen contenido
    assetsFolder.file('thumbnail.png', blob)
    console.log('✅ Added thumbnail.png')
    
    if (htmlFormat && htmlFormat.trim()) {
      assetsFolder.file('index.html', htmlFormat)
      console.log('✅ Added index.html:', htmlFormat.length, 'characters')
    } else {
      console.log('❌ No HTML content to add')
    }
    
    if (cssFormat && cssFormat.trim()) {
      assetsFolder.file('index.css', cssFormat)
      console.log('✅ Added index.css:', cssFormat.length, 'characters')
    } else {
      console.log('❌ No CSS content to add')
    }
    
    if (jsFormat && jsFormat.trim()) {
      assetsFolder.file('index.js', jsFormat)
      console.log('✅ Added index.js:', jsFormat.length, 'characters')
    } else {
      console.log('❌ No JS content to add')
    }

    // Usar configuration.json si existe, sino crear uno vacío
    const configContent = configFormat && configFormat.trim() 
      ? configFormat 
      : JSON.stringify({ fieldSets: [] }, null, 2)
    
    assetsFolder.file('configuration.json', configContent)
    console.log('✅ Added configuration.json:', configContent.length, 'characters')
    
    // Crear fragment.json con las rutas correctas
    const fragmentConfig = {
      name: info.name || 'component',
      type: info.type || 'fragment',
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

    const fragmentJsonContent = JSON.stringify(fragmentConfig, null, 2)
    assetsFolder.file('fragment.json', fragmentJsonContent)
    console.log('✅ Added fragment.json:', fragmentJsonContent.length, 'characters')

    // Generar y descargar el ZIP
    console.log('📦 Generating ZIP...')
    const content = await zip.generateAsync({ type: 'blob' })
    console.log('📦 ZIP generated:', content.size, 'bytes')

    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = `frontend-${info.name || 'component'}-${info.type || 'fragment'}.zip`
    console.log('⬇️ Downloading:', link.download)
    link.click()
  } catch (error) {
    console.error('❌ Error in ZIP export:', error)
  }
}

export default handleZipExport
