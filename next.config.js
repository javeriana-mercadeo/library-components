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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@library': './app/_library',
      '@styles': './styles'
    }
    return config
  }
}

export default nextConfig
