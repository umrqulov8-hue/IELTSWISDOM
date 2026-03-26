import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/', '/auth/callback'],
    },
    sitemap: 'https://ieltswisdom.com/sitemap.xml',
  }
}
