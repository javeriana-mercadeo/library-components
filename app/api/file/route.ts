import { promises as fs } from 'fs'
import path from 'path'

import { NextResponse } from 'next/server'
import * as sass from 'sass'

// Función para resolver imports de JavaScript recursivamente
async function resolveJavaScriptImports(
  filePath: string,
  basePath: string,
  visited = new Set<string>(),
  isMainFile = true
): Promise<string> {
  // Evitar imports circulares
  const normalizedPath = path.normalize(filePath)

  if (visited.has(normalizedPath)) {
    return `/* Circular import detected: ${normalizedPath} */\n`
  }
  visited.add(normalizedPath)

  try {
    const content = await fs.readFile(filePath, 'utf8')

    // Buscar todas las declaraciones de import (tanto default como named)
    const importRegex = /import\s+(?:(?:\{[^}]*\}|[^,\s]+)(?:\s*,\s*(?:\{[^}]*\}|[^,\s]+))*\s+from\s+)?['"`](.+?)['"`]/g
    const imports: string[] = []
    let match

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1])
    }

    // Resolver cada import
    let resolvedContent = ''
    const processedImports = new Set<string>()

    for (const importPath of imports) {
      if (processedImports.has(importPath)) continue
      processedImports.add(importPath)

      // Resolver la ruta del import
      let resolvedPath = ''

      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // Import relativo
        resolvedPath = path.resolve(path.dirname(filePath), importPath)

        // Agregar extensión .js si no la tiene
        if (!path.extname(resolvedPath)) {
          resolvedPath += '.js'
        }
      } else {
        // Import absoluto o alias - por ahora skip
        resolvedContent += `/* Skipped import: ${importPath} */\n`
        continue
      }

      // Verificar que el archivo existe y está dentro del basePath
      if (resolvedPath.startsWith(basePath)) {
        try {
          await fs.access(resolvedPath)
          const importedContent = await resolveJavaScriptImports(resolvedPath, basePath, new Set(visited), false)
          const relativePath = path.relative(basePath, resolvedPath)

          resolvedContent += `\n// ==================================================================================\n`
          resolvedContent += `// INICIO DE: ${relativePath}\n`
          resolvedContent += `// ==================================================================================\n`
          resolvedContent += importedContent
          resolvedContent += `// ==================================================================================\n`
          resolvedContent += `// FINAL DE: ${relativePath}\n`
          resolvedContent += `// ==================================================================================\n\n`
        } catch {
          resolvedContent += `/* Failed to import: ${importPath} (${resolvedPath}) */\n`
        }
      } else {
        resolvedContent += `/* Import outside basePath: ${importPath} */\n`
      }
    }

    // Remover las declaraciones de import del contenido original
    let contentWithoutImports = content.replace(
      /import\s+(?:(?:\{[^}]*\}|[^,\s]+)(?:\s*,\s*(?:\{[^}]*\}|[^,\s]+))*\s+from\s+)?['"`].+?['"`][;\s]*\n?/g,
      ''
    )

    // Si no es el archivo principal, comentar las exportaciones para evitar conflictos
    if (!isMainFile) {
      // Comentar exports para archivos importados
      contentWithoutImports = contentWithoutImports.replace(/^(\s*export\s+)/gm, '// $1')
      contentWithoutImports = contentWithoutImports.replace(/^(\s*export\s*{[^}]*}\s*)/gm, '// $1')
    }

    return resolvedContent + contentWithoutImports
  } catch (error) {
    return `/* Error reading file ${filePath}: ${error} */\n`
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const requestedPath = searchParams.get('path')

  if (!requestedPath) {
    return new NextResponse("Falta el parámetro 'path'", { status: 400 })
  }

  // Normalizar la ruta para evitar accesos no autorizados
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.(\/|\\|$))+/, '')
  const basePath = path.join(process.cwd(), 'app')
  const componentPath = path.join(basePath, safePath)

  console.log(componentPath)

  if (!componentPath.startsWith(basePath)) {
    return new NextResponse('Acceso denegado', { status: 403 })
  }

  try {
    // 📌 Definir rutas de archivos
    const infoPath = path.join(componentPath, 'info.json')
    const configPath = path.join(componentPath, 'configuration.json')
    const scssPath = path.join(componentPath, 'styles.scss')
    const jsPath = path.join(componentPath, 'script.js')

    // 📌 Leer archivos de forma asíncrona
    const [infoContent, configContent, scssContent] = await Promise.all([
      fs.readFile(infoPath, 'utf8').catch(() => null),
      fs.readFile(configPath, 'utf8').catch(() => null),
      fs.readFile(scssPath, 'utf8').catch(() => null)
    ])

    // 📌 Resolver JavaScript con imports
    let jsContent = ''

    try {
      await fs.access(jsPath)
      jsContent = await resolveJavaScriptImports(jsPath, basePath)
    } catch {
      jsContent = '' // Archivo no existe
    }

    let compiledCSS = ''

    if (scssContent) {
      try {
        compiledCSS = sass.compileString(scssContent, {
          loadPaths: [componentPath, path.join(process.cwd(), 'styles'), path.join(process.cwd(), 'app'), process.cwd()],
          importers: [
            {
              findFileUrl(url: string): URL | null {
                // Manejar alias @styles
                if (url.startsWith('@styles/')) {
                  const fileName = url.substring(8) // Remover '@styles/'
                  const fullPath = path.join(process.cwd(), 'styles', fileName)

                  // Intentar diferentes extensiones
                  const extensions = ['', '.scss', '.sass', '.css']

                  for (const ext of extensions) {
                    const filePathWithExt = fullPath + ext

                    try {
                      // Verificar si el archivo existe de forma síncrona
                      require('fs').accessSync(filePathWithExt)

                      return new URL(`file://${filePathWithExt.replace(/\\/g, '/')}`)
                    } catch {
                      continue
                    }
                  }

                  console.warn(`No se encontró el archivo: ${fullPath}`)

                  return null
                }

                return null // Dejar que Sass maneje otras importaciones
              }
            }
          ]
        }).css
      } catch (sassError) {
        console.error('Error compilando SCSS:', sassError)
        compiledCSS = ''
      }
    }

    // Verificar si el JS tiene imports
    const hasImports = jsContent.includes('// IMPORTED FROM:')

    return NextResponse.json({
      info: infoContent ? JSON.parse(infoContent) : {},
      configuration: configContent ? JSON.parse(configContent) : null,
      css: compiledCSS,
      js: jsContent || '',
      jsCompiled: hasImports // Indicar si se compilaron imports
    })
  } catch (error) {
    console.error('Error al cargar el componente:', error)

    return new NextResponse('Error al cargar el componente', { status: 500 })
  }
}
