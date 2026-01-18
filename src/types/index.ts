/**
 * 타입 정의 통합 내보내기
 */

// TIL 관련 타입
export type {
  TIL,
  TILDetail,
  TILCardData,
  TILStatus,
  TILCategory,
  TILCategorySlug,
} from './til'
export { toTILCardData } from './til'

// Notion 블록 타입
export type {
  NotionBlock,
  NotionBlockType,
  NotionBlockBase,
  NotionRichText,
  NotionAnnotations,
  NotionColor,
  NotionCodeLanguage,
  ParagraphBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  BulletedListItemBlock,
  NumberedListItemBlock,
  ToDoBlock,
  ToggleBlock,
  CodeBlock,
  QuoteBlock,
  CalloutBlock,
  DividerBlock,
  ImageBlock,
  VideoBlock,
  BookmarkBlock,
  EmbedBlock,
  UnsupportedBlock,
} from './notion'
export { getPlainTextFromRichText, isTextBlock } from './notion'

// API 타입
export type {
  PaginationInfo,
  GetTILListParams,
  TILListResponse,
  GetTILDetailParams,
  TILDetailResponse,
  APIErrorResponse,
  APIErrorCode,
  APIResult,
  NotionQueryResponse,
  NotionTILPageProperties,
  NotionTILPage,
} from './api'

// 카테고리 상수 및 유틸리티
export type { CategoryInfo } from './category'
export {
  CATEGORIES,
  VALID_CATEGORY_SLUGS,
  VALID_CATEGORY_IDS,
  CATEGORY_BY_SLUG,
  CATEGORY_BY_ID,
  isValidCategorySlug,
  isValidCategoryId,
  getCategoryBySlug,
  getCategoryById,
  slugToCategoryId,
  categoryIdToSlug,
} from './category'
