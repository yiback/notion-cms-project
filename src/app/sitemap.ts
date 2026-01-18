/**
 * 동적 사이트맵 생성
 * Notion API를 통해 Published TIL 목록을 조회하여 사이트맵 생성
 */

import type { MetadataRoute } from 'next'
import { getTILList } from '@/lib/notion'
import { CATEGORIES } from '@/types'

/**
 * 사이트 기본 URL
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // 카테고리 페이지
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(category => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // TIL 페이지 (Notion API에서 조회)
  let tilPages: MetadataRoute.Sitemap = []
  try {
    const { items } = await getTILList({ pageSize: 100 })
    tilPages = items.map(til => ({
      url: `${baseUrl}/til/${til.slug}`,
      lastModified: new Date(til.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('sitemap: TIL 목록 조회 실패', error)
  }

  return [...staticPages, ...categoryPages, ...tilPages]
}
