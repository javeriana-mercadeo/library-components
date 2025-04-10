import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import * as sass from 'sass'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const requestedPath = searchParams.get('path')

  if (!requestedPath) {
    return new NextResponse("Falta el parámetro 'path'", { status: 400 })
  }

  // Normalizar la ruta para evitar accesos no autorizados
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.(\/|\\|$))+/, '')
  const basePath = path.join(process.cwd(), 'app', 'library')
  const componentPath = path.join(basePath, safePath)

  console.log(componentPath)

  if (!componentPath.startsWith(basePath)) {
    return new NextResponse('Acceso denegado', { status: 403 })
  }

  try {
    // 📌 Definir rutas de archivos
    const infoPath = path.join(componentPath, 'info.json')
    const scssPath = path.join(componentPath, 'styles.scss')
    const jsPath = path.join(componentPath, 'script.js')

    // 📌 Leer archivos de forma asíncrona
    const [infoContent, scssContent, jsContent] = await Promise.all([
      fs.readFile(infoPath, 'utf8').catch(() => null),
      fs.readFile(scssPath, 'utf8').catch(() => null),
      fs.readFile(jsPath, 'utf8').catch(() => null)
    ])

    let compiledCSS = ''
    if (scssContent) {
      try {
        compiledCSS = sass.compileString(scssContent, {
          // 📌 Añadir el directorio base para `@use`
          loadPaths: [
            componentPath,
            path.join(process.cwd(), 'styles'), // Ruta correcta a la carpeta styles
            path.join(process.cwd()) // Ruta raíz para resolver rutas relativas
          ],
          importers: [
            {
              // Configurar un importador personalizado para manejar alias
              findFileUrl(url) {
                if (url.startsWith('@/styles/')) {
                  // Reemplazar el alias @/styles con la ruta real
                  return new URL('file://' + path.join(process.cwd(), 'styles', url.substring(9)))
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

    return NextResponse.json({
      info: infoContent ? JSON.parse(infoContent) : {},
      css: compiledCSS,
      js: jsContent || ''
    })
  } catch (error) {
    console.error('Error al cargar el componente:', error)
    return new NextResponse('Error al cargar el componente', { status: 500 })
  }
}
