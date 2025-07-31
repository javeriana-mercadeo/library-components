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
    
    // Excluir esbuild del bundling para evitar conflictos
    config.externals = {
      ...config.externals,
      'esbuild': 'esbuild'
    }
    
    return config
  },
  
  // Configuración para evitar problemas con esbuild
  serverExternalPackages: ['esbuild']
}

export default nextConfig
