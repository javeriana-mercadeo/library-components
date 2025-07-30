/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': ['@svgr/webpack']
    }
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920]
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  webpack: config => {
    // Optimize SVG handling for smaller files only
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })

    return config
  },

  // Disable source maps in development to improve performance
  productionBrowserSourceMaps: false,

  // Optimize for WSL/Windows performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['@heroui/react', 'framer-motion'],
  },

  // Optimize build output
  distDir: '.next',
  
  logging: {
    fetches: {
      fullUrl: false
    }
  },

  // Performance optimizations for Windows/WSL
  onDemandEntries: {
    // Keep pages in memory for longer in development
    maxInactiveAge: 60 * 1000 * 60, // 60 minutes
    pagesBufferLength: 5,
  }
}

export default nextConfig
