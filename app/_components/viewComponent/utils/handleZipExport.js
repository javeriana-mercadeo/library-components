import html2canvas from 'html2canvas'
import JSZip from 'jszip'

const handleZipExport = async (info, htmlFormat, cssFormat, jsFormat, previewRef) => {
  const zip = new JSZip()

  // Capturar la imagen de previsualización usando html2canvas directamente
  const canvas = await html2canvas(previewRef.current)

  canvas.toBlob(blob => {
    // Crear una carpeta dentro del ZIP, por ejemplo 'assets'
    const assetsFolder = zip.folder(info.name)

    assetsFolder.file('thumbnail.png', blob)
    assetsFolder.file('index.html', htmlFormat)
    assetsFolder.file('index.css', cssFormat)
    assetsFolder.file('index.js', jsFormat)
    assetsFolder.file(
      'index.json',
      JSON.stringify(
        {
          fieldSets: []
        },
        null,
        2
      )
    )
    assetsFolder.file(
      'fragment.json',
      JSON.stringify(
        {
          name: info.name,
          type: info.type,
          configurationPath: 'index.json',
          jsPath: 'index.js',
          htmlPath: 'index.html',
          cssPath: 'index.css',
          thumbnailPath: 'thumbnail.png'
        },
        null,
        2
      )
    )

    // Descargar el ZIP
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = `frontend-${info.name}-${info.type}.zip`
      link.click()
    })
  })
}

export default handleZipExport
