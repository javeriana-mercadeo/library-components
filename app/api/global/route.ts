import { promises as fs } from 'fs'
import path from 'path'

import { NextResponse } from 'next/server'
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
  ''
  //'https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js'
  //'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js',
  //'https://www.javeriana.edu.co/planestudio/pages/libraries/simple_datatables/simple-datatables.js'
]

async function fetchExternalLibrary(url: string): Promise<string> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
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

    return content
  } catch (error) {
    clearTimeout(timeoutId)
    console.warn(`❌ Error al cargar la librería ${url}:`, error)

    return ''
  }
}

// 📌 ALMACÉN GLOBAL PARA EVITAR DUPLICADOS
interface ImportedModule {
  content: string
  exports: string[]
  path: string
}

const globalModuleCache = new Map<string, ImportedModule>()
const globalExports = new Set<string>()

// 📌 FUNCIÓN PARA EXTRAER EXPORTS DE UN ARCHIVO
function extractExports(content: string): string[] {
  const exports: string[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()

    // export const/let/var NAME
    const constMatch = trimmed.match(/^export\s+(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)

    if (constMatch) {
      exports.push(constMatch[2])
      continue
    }

    // export function NAME
    const funcMatch = trimmed.match(/^export\s+function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)

    if (funcMatch) {
      exports.push(funcMatch[1])
      continue
    }

    // export class NAME
    const classMatch = trimmed.match(/^export\s+class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)

    if (classMatch) {
      exports.push(classMatch[1])
      continue
    }

    // export { name1, name2 }
    const namedMatch = trimmed.match(/^export\s*\{\s*([^}]+)\s*\}/)

    if (namedMatch) {
      const names = namedMatch[1].split(',').map(n => n.trim().split(' as ')[0].trim())

      exports.push(...names)
      continue
    }
  }

  return exports
}

// 📌 FUNCIÓN PARA RESOLVER IMPORTS DE JAVASCRIPT CON DEDUPLICACIÓN
async function resolveJavaScriptImports(jsContent: string, basePath: string, visited = new Set<string>()): Promise<string> {
  if (!jsContent) {
    return ''
  }

  // Resolving imports

  // Buscar todas las líneas de import con regex más específico
  const importLines = jsContent.split('\n').filter(line => {
    const trimmed = line.trim()

    return trimmed.startsWith('import ') && trimmed.includes('from ')
  })

  // Found import lines

  if (importLines.length === 0) {
    return jsContent
  }

  // Resolver cada import
  const importedContents: string[] = []

  for (const importLine of importLines) {
    try {
      // Processing import line

      // Extraer la ruta del import usando regex más robusto
      const importMatch = importLine.match(/from\s+['"`]([^'"`]+)['"`]/)

      if (!importMatch) {
        console.warn(`Could not extract path from: ${importLine}`)
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

      // Verificar si ya hemos procesado este módulo
      if (globalModuleCache.has(normalizedPath)) {
        console.log(`♻️ Módulo ya procesado, reutilizando: ${normalizedPath}`)
        const cached = globalModuleCache.get(normalizedPath)!

        // Solo agregar referencia, no duplicar contenido
        importedContents.push(`\n// ===== REFERENCIA A: ${importPath} =====`)
        importedContents.push(`// Ya procesado: ${cached.exports.join(', ')}`)
        continue
      }

      visited.add(normalizedPath)

      // Leer el archivo importado
      const importedContent = await fs.readFile(resolvedPath, 'utf8')

      console.log(`📖 Archivo leído: ${resolvedPath} (${importedContent.length} chars)`)

      // Recursivamente resolver imports del archivo importado
      const resolvedImported = await resolveJavaScriptImports(importedContent, resolvedPath, visited)

      // Extraer exports antes de limpiar
      const moduleExports = extractExports(resolvedImported)

      console.log(`📤 Exports encontrados en ${importPath}: ${moduleExports.join(', ')}`)

      // Verificar conflictos de nombres
      const conflicts = moduleExports.filter(exp => globalExports.has(exp))
      let processedContent = resolvedImported

      if (conflicts.length > 0) {
        console.warn(`⚠️ Conflictos de nombres detectados: ${conflicts.join(', ')} en ${importPath}`)
        // Renombrar conflictos agregando sufijo
        processedContent = conflicts.reduce((content, conflict) => {
          const newName = `${conflict}_${path.basename(importPath, path.extname(importPath))}`

          console.log(`🔄 Renombrando ${conflict} -> ${newName}`)

          return content.replace(new RegExp(`\\b${conflict}\\b`, 'g'), newName)
        }, processedContent)

        // Actualizar exports
        const updatedExports = moduleExports.map(exp =>
          conflicts.includes(exp) ? `${exp}_${path.basename(importPath, path.extname(importPath))}` : exp
        )

        moduleExports.splice(0, moduleExports.length, ...updatedExports)
      }

      // Limpiar exports del contenido importado
      const cleanedContent = cleanJavaScriptExports(processedContent)

      // Guardar en cache
      globalModuleCache.set(normalizedPath, {
        content: cleanedContent,
        exports: moduleExports,
        path: resolvedPath
      })

      // Agregar exports al conjunto global
      moduleExports.forEach(exp => globalExports.add(exp))

      importedContents.push(`\n// ===== IMPORTADO DE: ${importPath} =====`)
      importedContents.push(`// Archivo: ${resolvedPath}`)
      importedContents.push(`// Exports: ${moduleExports.join(', ')}`)
      importedContents.push(cleanedContent)

      // NO eliminar de visited para mantener la deduplicación global
      // visited.delete(normalizedPath)
    } catch (error) {
      console.error(`❌ Error procesando import "${importLine}":`, error)
      importedContents.push(`// ❌ Error importando: ${importLine} - ${error}`)
    }
  }

  // Limpiar imports del contenido principal
  const mainContent = cleanJavaScriptImports(jsContent)

  // Combinar todo SIN el helper duplicado
  const combined = [...importedContents, '\n// ===== CÓDIGO PRINCIPAL =====', mainContent].join('\n')

  console.log(`✅ JavaScript resuelto con deduplicación: ${combined.length} caracteres`)
  console.log(`📊 Módulos únicos procesados: ${globalModuleCache.size}`)
  console.log(`📤 Exports globales: ${Array.from(globalExports).join(', ')}`)

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

  // Primero manejar exports multi-línea con llaves
  let cleanedContent = content.replace(/export\s*\{[\s\S]*?\}/g, match => {
    console.log(`🗑️ Removiendo export multi-línea: ${match.replace(/\n/g, '\\n')}`)

    return '// ' + match.replace(/\n/g, '\n// ')
  })

  const lines = cleanedContent.split('\n')
  const cleanedLines = lines.map(line => {
    const trimmed = line.trim()

    // Si ya está comentado, dejarlo como está
    if (trimmed.startsWith('//')) {
      return line
    }

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

    // Convertir export class a class normal
    if (trimmed.startsWith('export class ')) {
      const cleaned = line.replace('export class ', 'class ')

      console.log(`🔄 Export class: ${trimmed} → ${cleaned.trim()}`)

      return cleaned
    }

    // Eliminar export default (mantener solo la declaración)
    if (trimmed.startsWith('export default ')) {
      const cleaned = line.replace('export default ', '')

      console.log(`🔄 Export default: ${trimmed} → ${cleaned.trim()}`)

      return cleaned
    }

    // Eliminar líneas de export restantes (que no tengan function, const, let, var, class)
    if (
      trimmed.startsWith('export ') &&
      !trimmed.includes('function') &&
      !trimmed.includes('const') &&
      !trimmed.includes('let') &&
      !trimmed.includes('var') &&
      !trimmed.includes('class')
    ) {
      console.log(`🗑️ Removiendo export simple: ${trimmed}`)

      return '// ' + line
    }

    return line
  })

  const result = cleanedLines.join('\n')

  console.log(`✅ Exports limpiados`)

  return result
}

// 📌 FUNCIÓN PARA LIMPIAR CACHE GLOBAL
function clearGlobalCache() {
  globalModuleCache.clear()
  globalExports.clear()
  console.log('🧹 Cache global limpiado')
}

async function compileJavaScript(jsContent: string, jsPath: string): Promise<string> {
  try {
    console.log('🔄 === INICIANDO PROCESAMIENTO DE JAVASCRIPT ===')
    console.log(`📁 Archivo base: ${jsPath}`)
    console.log(`📄 Contenido inicial: ${jsContent ? jsContent.length : 0} caracteres`)

    // Limpiar cache al inicio de cada compilación
    clearGlobalCache()

    // Obtener librerías externas
    console.log('📥 Descargando librerías externas...')
    const externalLibraries = await Promise.all(EXTERNAL_LIBRARIES.map(url => fetchExternalLibrary(url)))

    // Resolver imports del código personalizado
    console.log('🔗 Resolviendo imports del código personalizado...')
    const resolvedCustomCode = jsContent ? await resolveJavaScriptImports(jsContent, jsPath) : ''

    console.log(`📊 Resultado de resolución:`)
    console.log(`  - Código original: ${jsContent?.length || 0} caracteres`)
    console.log(`  - Código resuelto: ${resolvedCustomCode.length} caracteres`)
    console.log(`  - Módulos únicos: ${globalModuleCache.size}`)
    console.log(`  - Exports únicos: ${globalExports.size}`)

    // Crear globals helper una sola vez
    const globalsHelper = `
// ===== SISTEMA DE UTILIDADES GLOBALES =====
// Auto-generado para evitar conflictos y mejorar compatibilidad

function getGlobalUtils() {
  // Asegurar que las utilidades estén disponibles globalmente
  if (typeof window !== 'undefined') {
    // Configurar alias para compatibilidad
    if (typeof DOMUtils !== 'undefined' && !window.DOMHelpers) {
      window.DOMHelpers = DOMUtils;
    }

    // HTTPClient como constructor disponible globalmente
    if (typeof HTTPClient !== 'undefined') {
      window.HTTPClient = HTTPClient;
    }

    // LogLevel global
    if (typeof LogLevel !== 'undefined') {
      window.LogLevel = LogLevel;
    }

    // Logger global
    if (typeof Logger !== 'undefined') {
      window.Logger = Logger;
    }

    // Retornar objeto con todas las utilidades
    return {
      LogLevel: window.LogLevel || {},
      Logger: window.Logger || console,
      DOMHelpers: window.DOMHelpers || window.DOMUtils || {},
      DOMUtils: window.DOMUtils || window.DOMHelpers || {},
      HTTPClient: window.HTTPClient || function() { console.warn('HTTPClient no disponible'); },
      TimingUtils: window.TimingUtils || {},
      EventManager: window.EventManager || {},
      ValidatorUtils: window.ValidatorUtils || {},
      FormManager: window.FormManager || {},
      DataUtils: window.DataUtils || {},
      StringUtils: window.StringUtils || {},
      StorageUtils: window.StorageUtils || {}
    };
  }

  return {};
}

// Ejecutar inicialización de utilidades globales
if (typeof window !== 'undefined') {
  window.getGlobalUtils = getGlobalUtils;

  // Auto-ejecutar después de que se carguen todos los módulos
  setTimeout(() => {
    const utils = getGlobalUtils();

    // Hacer disponibles globalmente
    Object.assign(window, utils);

    console.log('✨ Utilidades globales inicializadas:', Object.keys(utils));
  }, 100);
}
`

    const combinedJS = [
      '// ===== LIBRERÍAS EXTERNAS =====',
      '// Compilado automáticamente el: ' + new Date().toISOString(),
      '',
      ...externalLibraries.filter(lib => lib.length > 0),
      '',
      '// ===== CÓDIGO PERSONALIZADO =====',
      globalsHelper,
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
interface ThemeBlock {
  selector: string
  variables: string[]
}

function optimizeCSSThemes(css: string): string {
  const themes = new Map<string, ThemeBlock>()

  // Encontrar y agrupar bloques :root
  const rootBlockRegex = /:root(\[data-theme='([^']+)'\])?\s*\{([^}]+)\}/g
  let match: RegExpExecArray | null

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
    let varMatch: RegExpExecArray | null

    while ((varMatch = variableRegex.exec(content)) !== null) {
      const [, name, value] = varMatch

      themes.get(themeKey)!.variables.push(`  --${name.trim()}: ${value.trim()};`)
    }
  }

  // Remover bloques originales y regenerar optimizados
  let optimizedCSS: string = css.replace(rootBlockRegex, '')

  const optimizedBlocks: string[] = []

  themes.forEach((theme: ThemeBlock) => {
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
          console.error('Error compiling SCSS:', sassError)
          compiledCSS = `/* Error compiling SCSS: ${sassError} */\n\n/* Original SCSS content: */\n/*\n${scssContent}\n*/`
        }
      } else {
        // SCSS file not found
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
