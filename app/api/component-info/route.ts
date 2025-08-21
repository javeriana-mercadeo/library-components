import { promises as fs } from 'fs'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'

// 📌 FUNCIÓN PARA LIMPIAR Y NORMALIZAR PATH
function cleanPath(inputPath: string): string {
  // Decodificar URL primero
  const decoded = decodeURIComponent(inputPath)

  return decoded
    .replace(/\/+/g, '/') // Reemplazar múltiples barras por una sola
    .replace(/^\//, '') // Remover barra inicial
    .replace(/\/$/, '') // Remover barra final
}

// 📌 ENDPOINT PARA OBTENER SOLO INFO BÁSICA DEL COMPONENTE
export async function GET(req: NextRequest) {
  const startTime = Date.now()

  const url = new URL(req.url)
  const specificPath = url.searchParams.get('path')

  if (!specificPath) {
    return NextResponse.json(
      {
        error: 'Path del componente es requerido',
        details: 'Debe proporcionar el parámetro "path" en la URL'
      },
      { status: 400 }
    )
  }

  // Limpiar y usar el path especificado
  const componentPath = path.join(process.cwd(), 'app', cleanPath(specificPath))

  try {
    // Cargar SOLO información básica del JSON
    let info = null

    // Intentar cargar info.json
    try {
      const infoPath = path.join(componentPath, 'info.json')
      const infoContentString = await fs.readFile(infoPath, 'utf8')

      info = JSON.parse(infoContentString)
    } catch {
      // No hay info.json, usar información por defecto
      info = {
        name: 'Componente',
        description: 'Sin descripción disponible'
      }
    }

    const endTime = Date.now()

    return NextResponse.json({
      info,
      cached: false,
      loadTime: endTime - startTime,
      method: 'basic-info-load'
    })
  } catch (error) {
    const endTime = Date.now()

    return NextResponse.json(
      {
        error: 'Error al cargar información básica del componente',
        details: error instanceof Error ? error.message : String(error),
        info: {
          name: 'Componente',
          description: 'Error al cargar'
        },
        loadTime: endTime - startTime,
        method: 'basic-info-load'
      },
      { status: 500 }
    )
  }
}
