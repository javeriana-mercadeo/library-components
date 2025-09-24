/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack']
      }
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

<<<<<<< HEAD
  // Disable source maps in development to improve performance
  productionBrowserSourceMaps: false,

  logging: {
    fetches: {
      fullUrl: false
    }
  }
=======
  // Configuración para evitar problemas con esbuild
  serverExternalPackages: ['esbuild']
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
}

export default nextConfig
