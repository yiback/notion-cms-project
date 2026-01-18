/**
 * robots.txt 생성
 * 검색 엔진 크롤러를 위한 지침 제공
 */

import type { MetadataRoute } from 'next'

/**
 * 사이트 기본 URL
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
