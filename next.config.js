/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.ignoreWarnings = [/Hydration failed/, /server rendered HTML didn't match/]
    }
    return config
  }
}

export default nextConfig
