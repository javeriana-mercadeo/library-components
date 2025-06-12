/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}
  },

  logging: {
    fetches: {
      fullUrl: false
    }
  }
}

export default nextConfig
