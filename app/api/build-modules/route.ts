import { promises as fs } from 'fs'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'
import { build } from 'esbuild'
import * as sass from 'sass'

// 📌 CONFIGURACIÓN
const COMPONENT_PATH = 'build'
const SCSS_FILE = 'styles.scss'
const JS_FILE = 'script.js'
const TIMEOUT_MS = 25000

// 📌 NOMBRES DE ARCHIVOS COMPILADOS
const COMPILED_CSS_FILE = 'compiled-styles.css'
const COMPILED_JS_FILE = 'compiled-scripts.js'
const COMPILATION_INFO_FILE = 'compilation-info.json'

// 📌 FUNCIÓN HELPER PARA RESOLVER ARCHIVOS SCSS
function resolveScssFile(basePath: string): URL | null {
  const extensions = ['', '.scss', '.sass', '.css']

  for (const ext of extensions) {
    const fullPath = basePath + ext

    try {
      require('fs').accessSync(fullPath)

      return new URL(`file://${fullPath.replace(/\\/g, '/')}`)
    } catch {
      continue
    }
  }

  return null
}

// 📌 PLUGIN PARA RESOLVER IMPORTS LOCALES
const localImportsPlugin = {
  name: 'local-imports',
  setup(build: any) {
    // Resolver imports que empiecen con '../utils'
    build.onResolve({ filter: /^\.\.\/utils/ }, (args: any) => {
      const resolvedPath = path.resolve(args.resolveDir, args.path)

      return { path: resolvedPath }
    })

    // Resolver otros imports relativos
    build.onResolve({ filter: /^\./ }, (args: any) => {
      let resolvedPath = path.resolve(args.resolveDir, args.path)

      // Probar diferentes extensiones
      const extensions = ['.js', '.ts', '.mjs']

      for (const ext of extensions) {
        const testPath = resolvedPath.endsWith('.js') || resolvedPath.endsWith('.ts') ? resolvedPath : resolvedPath + ext

        try {
          require('fs').accessSync(testPath)

          return { path: testPath }
        } catch {
          continue
        }
      }

      return { path: resolvedPath + '.js' } // fallback
    })
  }
}

// 📌 PLUGIN PARA VERIFICACIÓN DE UTILIDADES GLOBALES
const globalUtilsPlugin = {
  name: 'global-utils',
  setup(build: any) {
    build.onLoad({ filter: /.*/ }, async (args: any) => {
      // Intentar leer el archivo, probando diferentes extensiones si es necesario
      let contents: string = ''
      let actualPath = args.path

      try {
        contents = await fs.readFile(actualPath, 'utf8')
      } catch (error) {
        // Si no existe, probar con extensiones
        const extensions = ['.js', '.ts', '.mjs']
        let found = false

        for (const ext of extensions) {
          try {
            const testPath = actualPath + ext

            contents = await fs.readFile(testPath, 'utf8')

            actualPath = testPath
            found = true
            break
          } catch {
            continue
          }
        }

        if (!found) {
          throw error
        }
      }

      // Si es el archivo principal, agregar solo verificación mínima
      if (args.path.includes('build/script.js') || args.path.includes('build\\script.js')) {
        const verificationHelper = `
          // ===== VERIFICACIÓN DE UTILIDADES GLOBALES =====

          // Verificar que las utilidades se hayan inicializado correctamente
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              const expectedUtils = ['Logger', 'DOMUtils', 'HTTPClient', 'LogLevel', 'TimingUtils',
                                    'EventManager', 'ValidatorUtils', 'FormManager', 'DataUtils', 'StringUtils', 'StorageUtils'];

              const loadedUtils = expectedUtils.filter(util => typeof window[util] !== 'undefined');

              if (loadedUtils.length > 0) {
                console.log('✅ Utilidades globales cargadas:', loadedUtils);
              } else {
                console.warn('⚠️ No se detectaron utilidades globales');
              }

              // Verificar HTTPClient específicamente
              if (typeof window.HTTPClient === 'function') {
                try {
                  const testClient = new window.HTTPClient();
                  if (testClient.get && typeof testClient.get === 'function') {
                    console.log('✅ HTTPClient funciona correctamente');
                  }
                } catch (error) {
                  console.warn('⚠️ Error con HTTPClient:', error.message);
                }
              }
            }, 100);
          }

          ${contents}
          `

        return { contents: verificationHelper }
      }

      return { contents }
    })
  }
}

// 📌 FUNCIÓN PARA VERIFICAR SI NECESITA RECOMPILACIÓN
async function needsRecompilation(componentPath: string): Promise<boolean> {
  try {
    const buildPath = path.join(componentPath, 'build')
    const compilationInfoPath = path.join(buildPath, COMPILATION_INFO_FILE)
    const scssPath = path.join(componentPath, SCSS_FILE)
    const jsPath = path.join(componentPath, JS_FILE)

    // Verificar si existe el archivo de información
    const compilationInfo = await fs
      .readFile(compilationInfoPath, 'utf8')
      .then(content => JSON.parse(content))
      .catch(() => null)

    if (!compilationInfo) {
      return true
    }

    // Verificar fechas de modificación
    const [scssStat, jsStat] = await Promise.all([fs.stat(scssPath).catch(() => null), fs.stat(jsPath).catch(() => null)])

    const lastCompilation = new Date(compilationInfo.timestamp)
    const scssModified = scssStat ? scssStat.mtime > lastCompilation : false
    const jsModified = jsStat ? jsStat.mtime > lastCompilation : false

    if (scssModified || jsModified) {
      return true
    }

    return false
  } catch {
    return true // Si hay error, mejor recompilar
  }
}

// 📌 FUNCIÓN PARA CARGAR ARCHIVOS COMPILADOS EXISTENTES DESDE CARPETA BUILD
async function loadCompiledFiles(componentPath: string): Promise<{ css: string; js: string } | null> {
  try {
    const buildPath = path.join(componentPath, 'build')
    const cssPath = path.join(buildPath, COMPILED_CSS_FILE)
    const jsPath = path.join(buildPath, COMPILED_JS_FILE)

    const [css, js] = await Promise.all([fs.readFile(cssPath, 'utf8').catch(() => ''), fs.readFile(jsPath, 'utf8').catch(() => '')])

    if (css || js) {
      return { css, js }
    }

    return null
  } catch {
    return null
  }
}

// 📌 FUNCIÓN PARA GUARDAR ARCHIVOS COMPILADOS (CON LIMPIEZA PREVIA)
async function saveCompiledFiles(componentPath: string, css: string, js: string): Promise<void> {
  try {
    // Verificar si hay contenido para guardar
    const hasCSS = css && css.trim().length > 0 && !css.includes('No se encontró archivo SCSS')
    const hasJS = js && js.trim().length > 0 && !js.includes('No se encontró archivo JavaScript')

    if (!hasCSS && !hasJS) {
      return
    }

    const buildPath = path.join(componentPath, 'build')

    // LIMPIAR carpeta build si existe para evitar archivos obsoletos
    try {
      await fs.rm(buildPath, { recursive: true, force: true })
    } catch (cleanError) {
      // Carpeta no existe o no se pudo limpiar
    }

    // Crear carpeta limpia
    await fs.mkdir(buildPath, { recursive: true })

    const cssPath = path.join(buildPath, COMPILED_CSS_FILE)
    const jsPath = path.join(buildPath, COMPILED_JS_FILE)
    const infoPath = path.join(buildPath, COMPILATION_INFO_FILE)

    // Información de compilación
    const compilationInfo = {
      timestamp: new Date().toISOString(),
      cssSize: hasCSS ? css.length : 0,
      jsSize: hasJS ? js.length : 0,
      version: '1.0.0',
      method: 'esbuild',
      files: {
        css: hasCSS,
        js: hasJS
      }
    }

    // Preparar array de promesas solo para archivos con contenido
    const writePromises = []

    if (hasCSS) {
      writePromises.push(fs.writeFile(cssPath, css, 'utf8'))
    }

    if (hasJS) {
      writePromises.push(fs.writeFile(jsPath, js, 'utf8'))
    }

    // Siempre guardar info si hay al menos un archivo
    writePromises.push(fs.writeFile(infoPath, JSON.stringify(compilationInfo, null, 2), 'utf8'))

    // Guardar archivos en paralelo
    await Promise.all(writePromises)
  } catch (error) {
    console.error(`Error guardando archivos:`, error)
    // No lanzar error, continuar con la respuesta
  }
}

// 📌 FUNCIÓN PARA LIMPIAR Y NORMALIZAR PATH
function cleanPath(inputPath: string): string {
  // Decodificar URL primero
  const decoded = decodeURIComponent(inputPath)

  return decoded
    .replace(/\/+/g, '/') // Reemplazar múltiples barras por una sola
    .replace(/^\//, '') // Remover barra inicial
    .replace(/\/$/, '') // Remover barra final
}

// 📌 ENDPOINT PRINCIPAL DE COMPILACIÓN CON ESBUILD
export async function GET(req: NextRequest) {
  const startTime = Date.now()

  const url = new URL(req.url)
  const forceRecompile = url.searchParams.get('force') === 'true'
  const specificPath = url.searchParams.get('path') // Para componentes individuales

  // Si se especifica un path, limpiar y usar ese; si no, usar el path global
  const componentPath = specificPath ? path.join(process.cwd(), 'app', cleanPath(specificPath)) : path.join(process.cwd(), COMPONENT_PATH)

  try {
    // 📌 TEMPORAL: Deshabilitar cache para debuggear problema de archivos obsoletos
    // TODO: Volver a habilitar cuando se confirme que funciona correctamente
    const DISABLE_CACHE = true

    // 📌 Verificar si necesita recompilación (a menos que se fuerce o esté deshabilitado el cache)
    if (!forceRecompile && !DISABLE_CACHE && !(await needsRecompilation(componentPath))) {
      const existingFiles = await loadCompiledFiles(componentPath)

      if (existingFiles) {
        // Usando cache

        // Cargar información adicional si es un componente específico (para caché también)
        let info = null
        let configuration = null

        if (specificPath) {
          try {
            const infoPath = path.join(componentPath, 'info.json')
            const infoContent = await fs.readFile(infoPath, 'utf8')

            info = JSON.parse(infoContent)
          } catch {
            // No hay info.json, continuar
          }

          try {
            const configPath = path.join(componentPath, 'configuration.json')
            const configContent = await fs.readFile(configPath, 'utf8')

            configuration = JSON.parse(configContent)
          } catch {
            // No hay configuration.json, continuar
          }
        }

        return NextResponse.json({
          ...existingFiles,
          info,
          configuration,
          cached: true,
          compilationTime: Date.now() - startTime,
          method: 'esbuild'
        })
      }
    }

    // Compilación en progreso

    // Timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: compilación tardó más de 25 segundos')), TIMEOUT_MS)
    })

    // Proceso principal de compilación
    const compilationPromise = async () => {
      const scssPath = path.join(componentPath, SCSS_FILE)
      const jsPath = path.join(componentPath, JS_FILE)

      // Preparar fecha y hora colombiana para todos los archivos
      const colombianTime = new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })

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

      // Compilar SCSS (igual que antes)
      let compiledCSS = ''

      if (scssExists) {
        try {
          const scssContent = await fs.readFile(scssPath, 'utf8')

          const sassResult = sass.compileString(scssContent, {
            loadPaths: [componentPath, path.join(process.cwd(), 'styles'), path.join(process.cwd(), 'app'), process.cwd()],
            importers: [
              {
                findFileUrl(url: string): URL | null {
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

          compiledCSS = [
            '/* ===== ESTILOS COMPILADOS CON ESBUILD ===== */',
            `/* Compilado el: ${colombianTime} (COT) */`,
            `/* Archivo fuente: ${SCSS_FILE} */`,
            '',
            sassResult.css
          ].join('\n')
        } catch (sassError) {
          compiledCSS = `/* Error compilando SCSS: ${sassError} */`
        }
      } else {
        compiledCSS = '/* No se encontró archivo SCSS */'
      }

      // Compilar JavaScript con esbuild
      let compiledJS = ''

      if (jsExists) {
        try {
          const result = await build({
            entryPoints: [jsPath],
            bundle: true,
            write: false,
            format: 'iife', // Cambiado de vuelta a 'iife' para ejecución inmediata
            target: 'esnext', // Cambio de 'es2022' a 'esnext' para preservar const/let
            platform: 'browser',
            minify: false, // Para debugging en desarrollo
            sourcemap: false,
            plugins: [localImportsPlugin, globalUtilsPlugin],
            define: {
              'process.env.NODE_ENV': '"production"'
            },
            banner: {
              js: `// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====\n// Compilado el: ${colombianTime} (COT)\n`
            }
          })

          if (result.outputFiles && result.outputFiles.length > 0) {
            compiledJS = result.outputFiles[0].text
          } else {
            throw new Error('No se generaron archivos de salida')
          }
        } catch (esbuildError) {
          // Verificar si es un error de binario faltante
          const errorMessage = String(esbuildError)

          if (errorMessage.includes('@esbuild') || errorMessage.includes('could not be found')) {
            compiledJS = `// ❌ Error: esbuild requiere binarios específicos del sistema\n// Instala: npm install @esbuild/win32-x64 --save-optional\n// Error: ${errorMessage}\nconsole.error('Error de esbuild - binario faltante:', ${JSON.stringify(errorMessage)});`
          } else {
            compiledJS = `// Error compilando JavaScript con esbuild: ${esbuildError}\nconsole.error('Error de compilación:', ${JSON.stringify(String(esbuildError))});`
          }
        }
      } else {
        compiledJS = '// No se encontró archivo JavaScript'
      }

      // 📌 Cargar información adicional si es un componente específico
      let info = null
      let configuration = null

      if (specificPath) {
        // Intentar cargar info.json
        try {
          const infoPath = path.join(componentPath, 'info.json')
          const infoContent = await fs.readFile(infoPath, 'utf8')

          info = JSON.parse(infoContent)
        } catch {
          // No hay info.json, continuar
        }

        // Intentar cargar configuration.json
        try {
          const configPath = path.join(componentPath, 'configuration.json')
          const configContent = await fs.readFile(configPath, 'utf8')

          configuration = JSON.parse(configContent)
        } catch {
          // No hay configuration.json, continuar
        }
      }

      // 📌 Guardar archivos compilados
      await saveCompiledFiles(componentPath, compiledCSS, compiledJS)

      return {
        css: compiledCSS,
        js: compiledJS,
        info,
        configuration
      }
    }

    // Ejecutar con timeout
    const result = await Promise.race([compilationPromise(), timeoutPromise])

    const endTime = Date.now()

    return NextResponse.json({
      ...(typeof result === 'object' && result !== null ? result : {}),
      cached: false,
      compilationTime: endTime - startTime,
      method: 'esbuild',
      savedFiles: {
        css: COMPILED_CSS_FILE,
        js: COMPILED_JS_FILE,
        info: COMPILATION_INFO_FILE
      }
    })
  } catch (error) {
    const endTime = Date.now()

    return NextResponse.json(
      {
        error: 'Error al compilar assets con esbuild',
        details: error instanceof Error ? error.message : String(error),
        css: '/* Error de compilación - ver logs del servidor */',
        js: '// Error de compilación - ver logs del servidor',
        compilationTime: endTime - startTime,
        method: 'esbuild'
      },
      { status: 500 }
    )
  }
}
