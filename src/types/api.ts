/**
 * API 응답 타입 정의
 * Notion API 및 내부 API 응답 구조
 */

import type { TIL, TILDetail, TILCategory } from './til'

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  /** 다음 페이지 존재 여부 */
  hasMore: boolean
  /** 다음 페이지 커서 (Notion cursor 기반) */
  nextCursor: string | null
  /** 전체 아이템 수 (선택적, Notion API는 제공하지 않음) */
  totalCount?: number
}

/**
 * TIL 목록 조회 파라미터
 */
export interface GetTILListParams {
  /** 카테고리 필터 (선택) */
  category?: TILCategory
  /** 페이지네이션 커서 (선택) */
  cursor?: string
  /** 페이지 크기 (기본값: 10) */
  pageSize?: number
}

/**
 * TIL 목록 응답
 */
export interface TILListResponse {
  /** TIL 목록 */
  items: TIL[]
  /** 페이지네이션 정보 */
  pagination: PaginationInfo
}

/**
 * TIL 상세 조회 파라미터
 */
export interface GetTILDetailParams {
  /** URL 슬러그 */
  slug: string
}

/**
 * TIL 상세 응답
 */
export interface TILDetailResponse {
  /** TIL 상세 데이터 */
  data: TILDetail
}

/**
 * API 에러 응답
 */
export interface APIErrorResponse {
  /** 에러 코드 */
  code: string
  /** 에러 메시지 */
  message: string
  /** 상세 정보 (선택) */
  details?: Record<string, unknown>
}

/**
 * API 에러 코드
 */
export type APIErrorCode =
  | 'NOT_FOUND'
  | 'NOTION_API_ERROR'
  | 'INVALID_REQUEST'
  | 'INTERNAL_ERROR'
  | 'RATE_LIMITED'

/**
 * API 결과 타입 (성공 또는 실패)
 */
export type APIResult<T> =
  | { success: true; data: T }
  | { success: false; error: APIErrorResponse }

/**
 * Notion API 응답 래퍼
 * @notionhq/client 응답 타입 추상화
 */
export interface NotionQueryResponse<T> {
  results: T[]
  next_cursor: string | null
  has_more: boolean
}

/**
 * Notion 페이지 속성 (데이터베이스 아이템)
 * Notion 데이터베이스 필드명 그대로 사용 (Slag 오타 포함)
 */
export interface NotionTILPageProperties {
  Title: {
    title: Array<{ plain_text: string }>
  }
  등록일: {
    date: { start: string } | null
  }
  Category: {
    select: { name: string } | null
  }
  Tag: {
    multi_select: Array<{ name: string }>
  }
  Reference: {
    url: string | null
  }
  Status: {
    select: { name: string } | null
  }
  /** 주의: Notion 필드명 오타 (Slug → Slag) */
  Slag: {
    rich_text: Array<{ plain_text: string }>
  }
}

/**
 * Notion 페이지 객체
 */
export interface NotionTILPage {
  id: string
  created_time: string
  last_edited_time: string
  properties: NotionTILPageProperties
}
