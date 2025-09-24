// @ts-check
const nextConfig = {
  // Configuración para Turbopack
  turbopack: {
    resolveAlias: {
      '@library': './app/_library',
      '@styles': './styles'
    }
  },

  // Configuración para Webpack (fallback)
  /**
   * @typedef {import('webpack').Configuration} WebpackConfig
   * @typedef {import('webpack').Compiler} WebpackCompiler
   * @typedef {import('next').NextConfig} NextConfig
   * @typedef {Object} WebpackOptions
   * @property {boolean} isServer
   */

  /**
   * @param {WebpackConfig} config
   * @param {WebpackOptions} options
   * @returns {WebpackConfig}
   */
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@library': './app/_library',
      '@styles': './styles'
    }

    if (Array.isArray(config.externals)) {
      config.externals.push('esbuild')
    } else if (typeof config.externals === 'object') {
      config.externals = {
        ...config.externals,
        esbuild: 'esbuild'
      }
    }

    return config
  },

  // Configuración para evitar problemas con esbuild
  serverExternalPackages: ['esbuild']
}

export default nextConfig
