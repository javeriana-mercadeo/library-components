/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  // Configuración para Sass
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'app'),
      path.join(__dirname, 'app/_library'),
      path.join(__dirname, 'app/common'),
      path.join(__dirname, 'app/components')
    ],
  },

  // Configuración básica para Turbopack
  turbopack: {
    resolveAlias: {
      '@library': './app/_library',
      '@styles': './styles',
      '@common': './app/common',
      '@components': './app/components'
    }
  },

  // Configuración para Webpack (fallback)
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@common': './app/common/index',
      '@common/*': './app/common/*',
      '@components': './app/components/index',
      '@components/*': './app/components/*',
      '@library': './app/_library',
      '@styles': './app/styles',
      '@hooks': './hooks'
    }

    // Excluir archivos problemáticos de esbuild
    config.module.rules.push({
      test: /\.(exe|md)$/,
      type: 'asset/resource',
      generator: {
        emit: false
      }
    })

    // Solo aplicar externals en el servidor para evitar conflictos de configuración
    if (isServer) {
      config.externals = config.externals || []

      if (Array.isArray(config.externals)) {
        config.externals.push('esbuild')
      } else if (typeof config.externals === 'object') {
        config.externals = {
          ...config.externals,
          esbuild: 'esbuild'
        }
      }
    }

    return config
  },

  // Configuración para evitar problemas con esbuild
  serverExternalPackages: ['esbuild']
}

export default nextConfig
