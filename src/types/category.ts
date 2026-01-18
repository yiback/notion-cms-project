/**
 * 카테고리 상수 및 유틸리티
 * PRD에 정의된 6개 카테고리 기반
 */

import type { TILCategory, TILCategorySlug } from './til'

/**
 * 카테고리 정보
 */
export interface CategoryInfo {
  /** 카테고리 ID (Notion Select 값) */
  id: TILCategory
  /** URL용 슬러그 (소문자) */
  slug: TILCategorySlug
  /** 표시 이름 */
  label: string
  /** 설명 */
  description: string
}

/**
 * 카테고리 목록 (PRD 기준)
 */
export const CATEGORIES: readonly CategoryInfo[] = [
  {
    id: 'AWS',
    slug: 'aws',
    label: 'AWS',
    description: '클라우드 서비스 및 인프라',
  },
  {
    id: 'DataBase',
    slug: 'database',
    label: 'Database',
    description: '데이터베이스 설계 및 최적화',
  },
  {
    id: 'DevOps',
    slug: 'devops',
    label: 'DevOps',
    description: 'CI/CD, 배포, 모니터링',
  },
  {
    id: 'AI',
    slug: 'ai',
    label: 'AI',
    description: '인공지능, 머신러닝',
  },
  {
    id: 'Frontend',
    slug: 'frontend',
    label: 'Frontend',
    description: '프론트엔드 개발',
  },
  {
    id: 'Backend',
    slug: 'backend',
    label: 'Backend',
    description: '백엔드 개발',
  },
] as const

/**
 * 유효한 카테고리 슬러그 목록
 */
export const VALID_CATEGORY_SLUGS: readonly TILCategorySlug[] = CATEGORIES.map(
  c => c.slug
)

/**
 * 유효한 카테고리 ID 목록
 */
export const VALID_CATEGORY_IDS: readonly TILCategory[] = CATEGORIES.map(
  c => c.id
)

/**
 * 슬러그 → 카테고리 정보 매핑
 */
export const CATEGORY_BY_SLUG: Record<TILCategorySlug, CategoryInfo> =
  Object.fromEntries(CATEGORIES.map(c => [c.slug, c])) as Record<
    TILCategorySlug,
    CategoryInfo
  >

/**
 * ID → 카테고리 정보 매핑
 */
export const CATEGORY_BY_ID: Record<TILCategory, CategoryInfo> =
  Object.fromEntries(CATEGORIES.map(c => [c.id, c])) as Record<
    TILCategory,
    CategoryInfo
  >

/**
 * 슬러그가 유효한 카테고리인지 확인
 */
export function isValidCategorySlug(slug: string): slug is TILCategorySlug {
  return VALID_CATEGORY_SLUGS.includes(slug as TILCategorySlug)
}

/**
 * ID가 유효한 카테고리인지 확인
 */
export function isValidCategoryId(id: string): id is TILCategory {
  return VALID_CATEGORY_IDS.includes(id as TILCategory)
}

/**
 * 슬러그로 카테고리 정보 조회
 */
export function getCategoryBySlug(slug: string): CategoryInfo | null {
  if (!isValidCategorySlug(slug)) return null
  return CATEGORY_BY_SLUG[slug]
}

/**
 * ID로 카테고리 정보 조회
 */
export function getCategoryById(id: string): CategoryInfo | null {
  if (!isValidCategoryId(id)) return null
  return CATEGORY_BY_ID[id]
}

/**
 * 슬러그를 카테고리 ID로 변환
 */
export function slugToCategoryId(slug: TILCategorySlug): TILCategory {
  return CATEGORY_BY_SLUG[slug].id
}

/**
 * 카테고리 ID를 슬러그로 변환
 */
export function categoryIdToSlug(id: TILCategory): TILCategorySlug {
  return CATEGORY_BY_ID[id].slug
}
