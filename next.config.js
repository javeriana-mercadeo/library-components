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

  // Disable source maps in development to improve performance
  productionBrowserSourceMaps: false,

  logging: {
    fetches: {
      fullUrl: false
    }
  }
}

export default nextConfig
