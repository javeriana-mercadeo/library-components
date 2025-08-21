/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Turbopack
  turbopack: {
    resolveAlias: {
      '@library': './app/_library',
      '@styles': './styles'
    }
  },

  // Configuración para Webpack (fallback)
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@library': './app/_library',
      '@styles': './styles'
    }

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
