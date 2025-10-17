'use client'

import { useState } from 'react'
import { LiferayDevBanner } from '@common'

import './styles.scss'

export default function () {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleCompileStyles = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/build-styles')
      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.details || 'Error desconocido')
      }
    } catch (err) {
      setError(err.message || 'Error al compilar estilos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='global-assets-container'>
      <LiferayDevBanner icon='ph ph-info' variant='info'>
        <span>Assets globales - Compilación de estilos</span>
      </LiferayDevBanner>

      <div className='p-4'>
        <button
          onClick={handleCompileStyles}
          disabled={loading}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
          {loading ? 'Compilando...' : 'Compilar Estilos (SCSS + Tailwind)'}
        </button>

        {loading && (
          <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded'>
            <p className='text-blue-700'>⏳ Compilando estilos, por favor espera...</p>
          </div>
        )}

        {result && (
          <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded'>
            <h3 className='text-green-800 font-bold mb-2'>✅ Compilación exitosa</h3>
            <ul className='text-sm text-green-700 space-y-1'>
              <li>
                <strong>Archivo:</strong> {result.output.file}
              </li>
              <li>
                <strong>Ruta:</strong> {result.output.path}
              </li>
              <li>
                <strong>Tamaño:</strong> {result.output.sizeKB} KB
              </li>
              <li>
                <strong>Tiempo:</strong> {result.compilation.time}
              </li>
              <li>
                <strong>SCSS:</strong> {result.compilation.scss ? '✓' : '✗'}
              </li>
              <li>
                <strong>Tailwind:</strong> {result.compilation.tailwind ? '✓' : '✗'}
              </li>
            </ul>
          </div>
        )}

        {error && (
          <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded'>
            <h3 className='text-red-800 font-bold mb-2'>❌ Error en la compilación</h3>
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
