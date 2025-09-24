const fs = require('fs')
const path = require('path')

// Script to automatically update imports for tree-shaking optimization
const files = [
  'app/institutional/secciones-opcionales/sections/estudiantes/index.jsx',
  'app/institutional/secciones-opcionales/sections/laboratorios/index.jsx',
  'app/institutional/secciones-opcionales/sections/multimedia/index.jsx',
  'app/institutional/secciones-opcionales/sections/multimediaRedes/index.jsx',
  'app/institutional/secciones-opcionales/sections/proyectos/index.jsx',
  'app/landing/pregrado/sections/0_encabezado/components/modalForm/index.jsx',
  'app/landing/pregrado/sections/0_encabezado/index.jsx',
  'app/landing/pregrado/sections/10_relacionados/index.jsx',
  'app/landing/pregrado/sections/11_footer/index.jsx',
  'app/landing/pregrado/sections/2_planEstudio/index.jsx',
  'app/landing/pregrado/sections/3_perfiles/index.jsx',
  'app/landing/pregrado/sections/4_diferenciales/index.jsx',
  'app/landing/pregrado/sections/5_insignias/index.jsx',
  'app/landing/pregrado/sections/6_docentes/index.jsx',
  'app/landing/pregrado/sections/7_experiencia/index.jsx',
  'app/landing/pregrado/sections/8_cita/index.jsx',
  'app/landing/pregrado/sections/9_preguntasFrecuentes/index.jsx',
  'app/_components/configurationSection/index.jsx',
  'app/_components/globalAssetsSection/index.jsx',
  'app/_library/components/liferay_dev_banner/index.jsx'
]

function optimizeImports() {
  files.forEach(file => {
    const filePath = path.join(process.cwd(), file)
<<<<<<< HEAD
    
=======

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file}`)
      return
    }
<<<<<<< HEAD
    
    let content = fs.readFileSync(filePath, 'utf8')
    
=======

    let content = fs.readFileSync(filePath, 'utf8')

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    // Replace old imports with optimized imports
    const oldImports = [
      /import\s+Container\s+from\s+['"]@library\/components\/container['"]/g,
      /import\s+Title\s+from\s+['"]@library\/components\/contain\/title['"]/g,
      /import\s+Paragraph\s+from\s+['"]@library\/components\/contain\/paragraph['"]/g,
      /import\s+Btn\s+from\s+['"]@library\/components\/contain\/btn['"]/g,
      /import\s+Button\s+from\s+['"]@library\/components\/contain\/btn['"]/g,
      /import\s+Icon\s+from\s+['"]@library\/components\/contain\/icon['"]/g,
      /import\s+Image\s+from\s+['"]@library\/components\/contain\/image['"]/g,
      /import\s+ImageBackground\s+from\s+['"]@library\/components\/contain\/imageBackground['"]/g,
      /import\s+Caption\s+from\s+['"]@library\/components\/contain\/caption['"]/g
    ]
<<<<<<< HEAD
    
    let hasChanges = false
    
=======

    let hasChanges = false

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
    // Remove old imports
    oldImports.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, '')
        hasChanges = true
      }
    })
<<<<<<< HEAD
    
    if (hasChanges) {
      // Add optimized import at the top
      const importLine = "import { UniversalComponent as UC, Container } from '@library/components'\n"
      
      // Find the first import or 'use client' directive
      const lines = content.split('\n')
      let insertIndex = 0
      
=======

    if (hasChanges) {
      // Add optimized import at the top
      const importLine = "import { UniversalComponent as UC, Container } from '@library/components'\n"

      // Find the first import or 'use client' directive
      const lines = content.split('\n')
      let insertIndex = 0

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("'use client'") || lines[i].includes('"use client"')) {
          insertIndex = i + 1
          break
        } else if (lines[i].includes('import ') && !lines[i].includes('@library/components')) {
          insertIndex = i
          break
        }
      }
<<<<<<< HEAD
      
      lines.splice(insertIndex, 0, importLine)
      content = lines.join('\n')
      
      // Clean up empty lines
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
      
=======

      lines.splice(insertIndex, 0, importLine)
      content = lines.join('\n')

      // Clean up empty lines
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n')

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ Optimized imports in: ${file}`)
    } else {
      console.log(`⏭️  No changes needed in: ${file}`)
    }
  })
}

optimizeImports()
<<<<<<< HEAD
console.log('🎉 Import optimization completed!')
=======
console.log('🎉 Import optimization completed!')
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
