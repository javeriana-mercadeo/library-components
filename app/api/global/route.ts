import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import * as sass from 'sass'

// 📌 CONFIGURACIÓN
const COMPONENT_PATH = 'build'
const SCSS_FILE = 'style.scss'
const JS_FILE = 'script.js'

// 📌 NOMBRES DE ARCHIVOS COMPILADOS
const COMPILED_CSS_FILE = 'compiled-styles.css'
const COMPILED_JS_FILE = 'compiled-scripts.js'
const COMPILATION_INFO_FILE = 'compilation-info.json'

const TIMEOUT_MS = 25000

// URLs de las librerías externas
const EXTERNAL_LIBRARIES = [
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js'
  //'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js',
  //'https://www.javeriana.edu.co/planestudio/pages/libraries/simple_datatables/simple-datatables.js'
]

async function fetchExternalLibrary(url: string): Promise<string> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    console.log(`📥 Descargando: ${url}`)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LibraryFetcher/1.0)'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`⚠️ No se pudo cargar la librería (${response.status}): ${url}`)
      return ''
    }

    const content = await response.text()
    console.log(`✅ Descargado (${content.length} chars): ${url}`)
    return content
  } catch (error) {
    clearTimeout(timeoutId)
    console.warn(`❌ Error al cargar la librería ${url}:`, error)
    return ''
  }
}

// 📌 FUNCIÓN PARA RESOLVER IMPORTS DE JAVASCRIPT
async function resolveJavaScriptImports(jsContent: string, basePath: string, visited = new Set<string>()): Promise<string> {
  if (!jsContent) {
    console.log('⚠️ No hay contenido JS para resolver')
    return ''
  }

  console.log(`🔍 Resolviendo imports en: ${basePath}`)
  console.log(`📄 Contenido a procesar (${jsContent.length} chars):`)
  console.log(jsContent.substring(0, 200) + '...')

  // Buscar todas las líneas de import con regex más específico
  const importLines = jsContent.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed.startsWith('import ') && trimmed.includes('from ')
  })

  console.log(`📦 Líneas de import encontradas: ${importLines.length}`)
  importLines.forEach((line, i) => console.log(`  ${i + 1}. ${line.trim()}`))

  if (importLines.length === 0) {
    console.log(`✅ No hay imports que resolver, devolviendo contenido original`)
    return jsContent
  }

  // Resolver cada import
  let resolvedContent = jsContent
  const importedContents: string[] = []

  for (const importLine of importLines) {
    try {
      console.log(`🔗 Procesando línea: ${importLine.trim()}`)

      // Extraer la ruta del import usando regex más robusto
      const importMatch = importLine.match(/from\s+['"`]([^'"`]+)['"`]/)
      if (!importMatch) {
        console.warn(`⚠️ No se pudo extraer ruta de: ${importLine}`)
        continue
      }

      const importPath = importMatch[1]
      console.log(`📁 Ruta extraída: ${importPath}`)

      // Construir la ruta absoluta
      let fullPath: string
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // Ruta relativa
        fullPath = path.resolve(path.dirname(basePath), importPath)
        console.log(`📍 Ruta relativa resuelta: ${fullPath}`)
      } else {
        // Ruta absoluta o módulo (asumir relativa al proyecto)
        fullPath = path.resolve(process.cwd(), importPath)
        console.log(`📍 Ruta absoluta: ${fullPath}`)
      }

      // Probar diferentes extensiones
      const extensions = ['.js', '.ts', '.mjs', '']
      let resolvedPath: string | null = null

      for (const ext of extensions) {
        const testPath = fullPath.endsWith('.js') || fullPath.endsWith('.ts') ? fullPath : fullPath + ext
        try {
          await fs.access(testPath)
          resolvedPath = testPath
          console.log(`✅ Archivo encontrado: ${testPath}`)
          break
        } catch {
          console.log(`❌ No encontrado: ${testPath}`)
          continue
        }
      }

      if (!resolvedPath) {
        console.warn(`⚠️ No se pudo encontrar archivo para: ${importPath}`)
        importedContents.push(`// ❌ Error: no se encontró el archivo ${importPath}`)
        continue
      }

      // Evitar imports circulares
      const normalizedPath = path.normalize(resolvedPath)
      if (visited.has(normalizedPath)) {
        console.log(`🔄 Import circular detectado, saltando: ${normalizedPath}`)
        continue
      }

      visited.add(normalizedPath)

      // Leer el archivo importado
      const importedContent = await fs.readFile(resolvedPath, 'utf8')
      console.log(`📖 Archivo leído: ${resolvedPath} (${importedContent.length} chars)`)

      // Recursivamente resolver imports del archivo importado
      const resolvedImported = await resolveJavaScriptImports(importedContent, resolvedPath, new Set(visited))

      // Limpiar exports del contenido importado
      const cleanedContent = cleanJavaScriptExports(resolvedImported)

      importedContents.push(`\n// ===== IMPORTADO DE: ${importPath} =====`)
      importedContents.push(`// Archivo: ${resolvedPath}`)
      importedContents.push(cleanedContent)

      visited.delete(normalizedPath)
    } catch (error) {
      console.error(`❌ Error procesando import "${importLine}":`, error)
      importedContents.push(`// ❌ Error importando: ${importLine} - ${error}`)
    }
  }

  // Limpiar imports del contenido principal
  const mainContent = cleanJavaScriptImports(resolvedContent)

  // Combinar todo
  const combined = [...importedContents, '\n// ===== CÓDIGO PRINCIPAL =====', mainContent].join('\n')

  console.log(`✅ JavaScript resuelto: ${combined.length} caracteres`)
  console.log(`📄 Resultado (primeras líneas):`)
  console.log(combined.split('\n').slice(0, 10).join('\n'))

  return combined
}

// 📌 FUNCIÓN PARA LIMPIAR IMPORTS
function cleanJavaScriptImports(content: string): string {
  console.log(`🧹 Limpiando imports de contenido (${content.length} chars)`)

  const lines = content.split('\n')
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim()
    const isImport = trimmed.startsWith('import ') && trimmed.includes('from ')

    if (isImport) {
      console.log(`🗑️ Removiendo import: ${trimmed}`)
    }

    return !isImport
  })

  const result = cleanedLines.join('\n')
  console.log(`✅ Imports limpiados: ${lines.length} → ${cleanedLines.length} líneas`)

  return result
}

// 📌 FUNCIÓN PARA LIMPIAR EXPORTS
function cleanJavaScriptExports(content: string): string {
  console.log(`🧹 Limpiando exports de contenido (${content.length} chars)`)

  const lines = content.split('\n')
  const cleanedLines = lines.map(line => {
    const trimmed = line.trim()

    // Convertir export function a function normal
    if (trimmed.startsWith('export function ')) {
      const cleaned = line.replace('export function ', 'function ')
      console.log(`🔄 Export function: ${trimmed} → ${cleaned.trim()}`)
      return cleaned
    }

    // Convertir export const a const normal
    if (trimmed.startsWith('export const ')) {
      const cleaned = line.replace('export const ', 'const ')
      console.log(`🔄 Export const: ${trimmed} → ${cleaned.trim()}`)
      return cleaned
    }

    // Convertir export let a let normal
    if (trimmed.startsWith('export let ')) {
      const cleaned = line.replace('export let ', 'let ')
      console.log(`🔄 Export let: ${trimmed} → ${cleaned.trim()}`)
      return cleaned
    }

    // Convertir export var a var normal
    if (trimmed.startsWith('export var ')) {
      const cleaned = line.replace('export var ', 'var ')
      console.log(`🔄 Export var: ${trimmed} → ${cleaned.trim()}`)
      return cleaned
    }

    // Eliminar export default (mantener solo la declaración)
    if (trimmed.startsWith('export default ')) {
      const cleaned = line.replace('export default ', '')
      console.log(`🔄 Export default: ${trimmed} → ${cleaned.trim()}`)
      return cleaned
    }

    // Eliminar líneas de export { ... }
    if (
      trimmed.match(/^export\s*\{.*\}/) ||
      (trimmed.startsWith('export ') &&
        !trimmed.includes('function') &&
        !trimmed.includes('const') &&
        !trimmed.includes('let') &&
        !trimmed.includes('var'))
    ) {
      console.log(`🗑️ Removiendo export: ${trimmed}`)
      return '// ' + line // Comentar la línea en lugar de eliminarla
    }

    return line
  })

  const result = cleanedLines.join('\n')
  console.log(`✅ Exports limpiados`)

  return result
}

async function compileJavaScript(jsContent: string, jsPath: string): Promise<string> {
  try {
    console.log('🔄 === INICIANDO PROCESAMIENTO DE JAVASCRIPT ===')
    console.log(`📁 Archivo base: ${jsPath}`)
    console.log(`📄 Contenido inicial: ${jsContent ? jsContent.length : 0} caracteres`)

    // Obtener librerías externas
    console.log('📥 Descargando librerías externas...')
    const externalLibraries = await Promise.all(EXTERNAL_LIBRARIES.map(url => fetchExternalLibrary(url)))

    // Resolver imports del código personalizado
    console.log('🔗 Resolviendo imports del código personalizado...')
    const resolvedCustomCode = jsContent ? await resolveJavaScriptImports(jsContent, jsPath) : ''

    console.log(`📊 Resultado de resolución:`)
    console.log(`  - Código original: ${jsContent?.length || 0} caracteres`)
    console.log(`  - Código resuelto: ${resolvedCustomCode.length} caracteres`)

    const combinedJS = [
      '// ===== LIBRERÍAS EXTERNAS =====',
      '// Compilado automáticamente el: ' + new Date().toISOString(),
      '',
      ...externalLibraries.filter(lib => lib.length > 0),
      '',
      '// ===== CÓDIGO PERSONALIZADO =====',
      resolvedCustomCode || '// No hay código JavaScript personalizado'
    ].join('\n')

    console.log(`✅ JavaScript procesado correctamente: ${combinedJS.length} caracteres`)
    return combinedJS
  } catch (error) {
    console.error('❌ Error procesando JavaScript:', error)
    return jsContent || '// Error procesando JavaScript'
  }
}

// 📌 FUNCIÓN PARA VERIFICAR SI NECESITA RECOMPILACIÓN
async function needsRecompilation(componentPath: string): Promise<boolean> {
  try {
    const compilationInfoPath = path.join(componentPath, COMPILATION_INFO_FILE)
    const scssPath = path.join(componentPath, SCSS_FILE)
    const jsPath = path.join(componentPath, JS_FILE)

    // Verificar si existe el archivo de información
    const compilationInfo = await fs
      .readFile(compilationInfoPath, 'utf8')
      .then(content => JSON.parse(content))
      .catch(() => null)

    if (!compilationInfo) {
      console.log('📝 No hay información de compilación previa - necesita compilar')
      return true
    }

    // Verificar fechas de modificación
    const [scssStat, jsStat] = await Promise.all([fs.stat(scssPath).catch(() => null), fs.stat(jsPath).catch(() => null)])

    const lastCompilation = new Date(compilationInfo.timestamp)
    const scssModified = scssStat ? scssStat.mtime > lastCompilation : false
    const jsModified = jsStat ? jsStat.mtime > lastCompilation : false

    if (scssModified || jsModified) {
      console.log('🔄 Archivos fuente modificados - necesita recompilar')
      return true
    }

    console.log('✅ Archivos compilados están actualizados')
    return false
  } catch (error) {
    console.log('⚠️ Error verificando recompilación:', error)
    return true // Si hay error, mejor recompilar
  }
}

// 📌 FUNCIÓN PARA CARGAR ARCHIVOS COMPILADOS EXISTENTES
async function loadCompiledFiles(componentPath: string): Promise<{ css: string; js: string } | null> {
  try {
    const cssPath = path.join(componentPath, COMPILED_CSS_FILE)
    const jsPath = path.join(componentPath, COMPILED_JS_FILE)

    const [css, js] = await Promise.all([fs.readFile(cssPath, 'utf8').catch(() => ''), fs.readFile(jsPath, 'utf8').catch(() => '')])

    if (css || js) {
      console.log(`📁 Cargados archivos compilados existentes: CSS(${css.length}), JS(${js.length})`)
      return { css, js }
    }

    return null
  } catch (error) {
    console.log('⚠️ No se pudieron cargar archivos compilados existentes')
    return null
  }
}

// 📌 FUNCIÓN PARA GUARDAR ARCHIVOS COMPILADOS
async function saveCompiledFiles(componentPath: string, css: string, js: string): Promise<void> {
  try {
    const cssPath = path.join(componentPath, COMPILED_CSS_FILE)
    const jsPath = path.join(componentPath, COMPILED_JS_FILE)
    const infoPath = path.join(componentPath, COMPILATION_INFO_FILE)

    // Información de compilación
    const compilationInfo = {
      timestamp: new Date().toISOString(),
      cssSize: css.length,
      jsSize: js.length,
      version: '1.0.0'
    }

    // Guardar archivos en paralelo
    await Promise.all([
      fs.writeFile(cssPath, css, 'utf8'),
      fs.writeFile(jsPath, js, 'utf8'),
      fs.writeFile(infoPath, JSON.stringify(compilationInfo, null, 2), 'utf8')
    ])

    console.log(`💾 Archivos guardados:`)
    console.log(`  - ${COMPILED_CSS_FILE} (${css.length} chars)`)
    console.log(`  - ${COMPILED_JS_FILE} (${js.length} chars)`)
    console.log(`  - ${COMPILATION_INFO_FILE}`)
  } catch (error) {
    console.error('❌ Error guardando archivos compilados:', error)
    // No lanzar error, continuar con la respuesta
  }
}

// Función auxiliar para optimizar CSS
function optimizeCSSThemes(css) {
  const themes = new Map()

  // Encontrar y agrupar bloques :root
  const rootBlockRegex = /:root(\[data-theme='([^']+)'\])?\s*\{([^}]+)\}/g
  let match

  while ((match = rootBlockRegex.exec(css)) !== null) {
    const [fullMatch, themeSelector, themeName, content] = match
    const themeKey = themeName || 'default'

    if (!themes.has(themeKey)) {
      themes.set(themeKey, {
        selector: themeName ? `:root[data-theme='${themeName}']` : ':root',
        variables: []
      })
    }

    // Extraer variables
    const variableRegex = /--([^:]+):\s*([^;]+);/g
    let varMatch
    while ((varMatch = variableRegex.exec(content)) !== null) {
      const [, name, value] = varMatch
      themes.get(themeKey).variables.push(`  --${name.trim()}: ${value.trim()};`)
    }
  }

  // Remover bloques originales y regenerar optimizados
  let optimizedCSS = css.replace(rootBlockRegex, '')

  const optimizedBlocks: string[] = []
  themes.forEach(theme => {
    // Eliminar duplicados y ordenar
    const uniqueVars = [...new Set(theme.variables)].sort()
    optimizedBlocks.push(`${theme.selector} {\n${uniqueVars.join('\n')}\n}`)
  })

  return optimizedBlocks.join('\n\n') + '\n\n' + optimizedCSS
}

export async function GET(req: Request) {
  const startTime = Date.now()
  console.log('🚀 === INICIANDO COMPILACIÓN DE ASSETS ===')

  // Verificar si forzar recompilación
  const url = new URL(req.url)
  const forceRecompile = url.searchParams.get('force') === 'true'

  const componentPath = path.join(process.cwd(), COMPONENT_PATH)
  console.log('📁 Directorio de trabajo:', componentPath)

  try {
    // 📌 Verificar si necesita recompilación (a menos que se fuerce)
    if (!forceRecompile && !(await needsRecompilation(componentPath))) {
      const existingFiles = await loadCompiledFiles(componentPath)
      if (existingFiles) {
        console.log(`⚡ Usando archivos compilados existentes (${Date.now() - startTime}ms)`)
        return NextResponse.json({
          ...existingFiles,
          cached: true,
          compilationTime: Date.now() - startTime
        })
      }
    }

    console.log('🔄 Procediendo con nueva compilación...')

    // 📌 Timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: compilación tardó más de 25 segundos')), TIMEOUT_MS)
    })

    // 📌 Proceso principal de compilación
    const compilationPromise = async () => {
      const scssPath = path.join(componentPath, SCSS_FILE)
      const jsPath = path.join(componentPath, JS_FILE)

      console.log('📄 Buscando archivos fuente:')
      console.log(`  - SCSS: ${scssPath}`)
      console.log(`  - JS: ${jsPath}`)

      // Verificar que los archivos existen
      const [scssExists, jsExists] = await Promise.all([
        fs
          .access(scssPath)
          .then(() => true)
          .catch(() => false),
        fs
          .access(jsPath)
          .then(() => true)
          .catch(() => false)
      ])

      console.log(`📋 Estado de archivos: SCSS=${scssExists}, JS=${jsExists}`)

      // Leer archivos solo si existen
      const [scssContent, jsContent] = await Promise.all([
        scssExists ? fs.readFile(scssPath, 'utf8') : Promise.resolve(null),
        jsExists ? fs.readFile(jsPath, 'utf8') : Promise.resolve(null)
      ])

      console.log('📄 Contenido de archivos leídos:')
      console.log(`  - SCSS: ${scssContent ? `${scssContent.length} caracteres` : 'No encontrado'}`)
      console.log(`  - JS: ${jsContent ? `${jsContent.length} caracteres` : 'No encontrado'}`)
      if (jsContent) {
        console.log('📋 Primeras líneas del JS:')
        console.log(jsContent.split('\n').slice(0, 5).join('\n'))
      }

      // 📌 Compilar SCSS
      let compiledCSS = ''
      if (scssContent) {
        console.log('🎨 Compilando SCSS...')
        try {
          const sassResult = sass.compileString(scssContent, {
            loadPaths: [componentPath, path.join(process.cwd(), 'styles'), path.join(process.cwd(), 'app'), process.cwd()],
            importers: [
              {
                findFileUrl(url: string): URL | null {
                  console.log(`🔍 Resolviendo import: ${url}`)

                  // Manejar @styles
                  if (url.startsWith('@styles/')) {
                    const fileName = url.substring(8)
                    const fullPath = path.join(process.cwd(), 'styles', fileName)
                    return resolveScssFile(fullPath)
                  }

                  // Manejar @library
                  if (url.startsWith('@library/')) {
                    const fileName = url.substring(9)
                    const fullPath = path.join(process.cwd(), 'app/_library', fileName)
                    return resolveScssFile(fullPath)
                  }

                  return null
                }
              }
            ]
          })

          // NUEVO: Optimizar CSS compilado
          const optimizedCSS = optimizeCSSThemes(sassResult.css)

          // Agregar header al CSS compilado
          compiledCSS = [
            '/* ===== ESTILOS COMPILADOS AUTOMÁTICAMENTE ===== */',
            `/* Compilado el: ${new Date().toISOString()} */`,
            `/* Archivo fuente: ${SCSS_FILE} */`,
            '',
            sassResult.css
          ].join('\n')

          console.log(`✅ SCSS compilado: ${compiledCSS.length} caracteres`)
        } catch (sassError) {
          console.error('❌ Error compilando SCSS:', sassError)
          compiledCSS = `/* Error compilando SCSS: ${sassError} */\n\n/* Contenido original SCSS: */\n/*\n${scssContent}\n*/`
        }
      } else {
        console.log('⚠️ No se encontró archivo SCSS')
        compiledCSS = '/* No se encontró archivo SCSS */'
      }

      // 📌 Procesar JavaScript
      console.log('⚙️ Procesando JavaScript...')
      const combinedJS = await compileJavaScript(jsContent ?? '', jsPath)

      // 📌 Guardar archivos compilados
      console.log('💾 Guardando archivos compilados...')
      await saveCompiledFiles(componentPath, compiledCSS, combinedJS)

      return { css: compiledCSS, js: combinedJS }
    }

    // Ejecutar con timeout
    const result = await Promise.race([compilationPromise(), timeoutPromise])

    const endTime = Date.now()
    console.log(`🎉 Compilación completada en ${endTime - startTime}ms`)

    return NextResponse.json({
      ...(typeof result === 'object' && result !== null ? result : {}),
      cached: false,
      compilationTime: endTime - startTime,
      savedFiles: {
        css: COMPILED_CSS_FILE,
        js: COMPILED_JS_FILE,
        info: COMPILATION_INFO_FILE
      }
    })
  } catch (error) {
    const endTime = Date.now()
    console.error(`❌ Error después de ${endTime - startTime}ms:`, error)

    return NextResponse.json(
      {
        error: 'Error al compilar assets',
        details: error instanceof Error ? error.message : String(error),
        css: '/* Error de compilación - ver logs del servidor */',
        js: '// Error de compilación - ver logs del servidor',
        compilationTime: endTime - startTime
      },
      { status: 500 }
    )
  }
}

// Función helper para resolver archivos SCSS
function resolveScssFile(basePath: string): URL | null {
  const extensions = ['', '.scss', '.sass', '.css']

  for (const ext of extensions) {
    const fullPath = basePath + ext
    try {
      require('fs').accessSync(fullPath)
      console.log(`✅ Archivo encontrado: ${fullPath}`)
      return new URL(`file://${fullPath.replace(/\\/g, '/')}`)
    } catch {
      continue
    }
  }

  console.warn(`⚠️ No se encontró: ${basePath}`)
  return null
}
