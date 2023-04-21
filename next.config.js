/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  font-src 'self' cdn.jsdelivr.net fonts.gstatic.com;
  img-src 'self' blob: data:;
  style-src 'self' 'unsafe-inline' cdn.jsdelivr.net fonts.googleapis.com;
  connect-src 'self' api.notion.com/v1/;
`

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin'
  },
  {
    key: 'X-Frame-Options',
    value: 'sameorigin',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      }
    ]
  }
}

module.exports = nextConfig
