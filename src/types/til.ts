/**
 * TIL (Today I Learned) 데이터 타입 정의
 * Notion 데이터베이스 구조 기반
 */

import type { NotionBlock } from './notion'

/**
 * TIL 상태 (Notion Status 속성)
 */
export type TILStatus = 'Draft' | 'Published'

/**
 * TIL 카테고리 (Notion Category 속성)
 * PRD에 정의된 6개 카테고리
 */
export type TILCategory =
  | 'AWS'
  | 'DataBase'
  | 'DevOps'
  | 'AI'
  | 'Frontend'
  | 'Backend'

/**
 * TIL 카테고리 URL용 소문자 버전
 */
export type TILCategorySlug =
  | 'aws'
  | 'database'
  | 'devops'
  | 'ai'
  | 'frontend'
  | 'backend'

/**
 * TIL 기본 정보 (목록용)
 * Notion 데이터베이스 속성 매핑:
 * - Title → title
 * - 등록일 → date
 * - Category → category
 * - Tag → tags
 * - Reference → reference
 * - Status → status
 * - Slag → slug (Notion 필드명 오타 주의)
 */
export interface TIL {
  /** Notion 페이지 고유 ID */
  id: string
  /** TIL 제목 */
  title: string
  /** 작성일 (ISO 8601 형식) */
  date: string
  /** 카테고리 */
  category: TILCategory
  /** 태그 배열 */
  tags: string[]
  /** 참고 링크 URL (선택) */
  reference: string | null
  /** URL 슬러그 */
  slug: string
  /** 공개 상태 */
  status: TILStatus
}

/**
 * TIL 상세 정보 (상세 페이지용)
 * 기본 정보 + Notion 블록 본문
 */
export interface TILDetail extends TIL {
  /** Notion 블록으로 구성된 본문 */
  blocks: NotionBlock[]
}

/**
 * TIL 카드 표시용 데이터 (UI 컴포넌트용)
 * 목록에서 표시할 최소 정보
 */
export interface TILCardData {
  id: string
  title: string
  date: string
  category: TILCategory
  tags: string[]
  slug: string
}

/**
 * TIL을 TILCardData로 변환
 */
export function toTILCardData(til: TIL): TILCardData {
  return {
    id: til.id,
    title: til.title,
    date: til.date,
    category: til.category,
    tags: til.tags,
    slug: til.slug,
  }
}
