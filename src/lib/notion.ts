/**
 * Notion API 클라이언트 및 유틸리티
 * @description Notion CMS 연동을 위한 클라이언트 초기화 및 데이터 조회
 */

import { Client } from '@notionhq/client'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionEnv } from './env'
import type {
  APIErrorResponse,
  APIErrorCode,
  GetTILListParams,
  TILListResponse,
} from '@/types/api'
import type { TIL, TILCategory, TILDetail } from '@/types/til'
import type {
  NotionBlock,
  NotionRichText,
  NotionCodeLanguage,
} from '@/types/notion'

/**
 * Notion API 클라이언트 인스턴스
 * 서버 컴포넌트에서만 사용 가능
 */
export const notion = new Client({
  auth: notionEnv.NOTION_API_KEY,
})

/**
 * Notion 데이터베이스 ID
 */
export const databaseId = notionEnv.NOTION_DATABASE_ID

/**
 * Notion API 에러 타입 가드
 */
interface NotionAPIError {
  code: string
  message: string
  status?: number
}

function isNotionAPIError(error: unknown): error is NotionAPIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  )
}

/**
 * Notion API 에러를 표준 APIErrorResponse로 변환
 * @param error - Notion API에서 발생한 에러
 * @returns 표준화된 에러 응답 객체
 */
export function handleNotionError(error: unknown): APIErrorResponse {
  // Notion API 에러인 경우
  if (isNotionAPIError(error)) {
    const errorCode = mapNotionErrorCode(error.code)

    return {
      code: errorCode,
      message: getErrorMessage(errorCode, error.message),
      details: {
        originalCode: error.code,
        originalMessage: error.message,
      },
    }
  }

  // 일반 Error 객체인 경우
  if (error instanceof Error) {
    return {
      code: 'INTERNAL_ERROR',
      message: error.message || '알 수 없는 오류가 발생했습니다',
    }
  }

  // 알 수 없는 에러 형식
  return {
    code: 'INTERNAL_ERROR',
    message: '예상치 못한 오류가 발생했습니다',
  }
}

/**
 * Notion 에러 코드를 API 에러 코드로 매핑
 */
function mapNotionErrorCode(notionCode: string): APIErrorCode {
  const codeMap: Record<string, APIErrorCode> = {
    unauthorized: 'NOTION_API_ERROR',
    restricted_resource: 'NOTION_API_ERROR',
    object_not_found: 'NOT_FOUND',
    rate_limited: 'RATE_LIMITED',
    invalid_json: 'INVALID_REQUEST',
    invalid_request: 'INVALID_REQUEST',
    invalid_request_url: 'INVALID_REQUEST',
    validation_error: 'INVALID_REQUEST',
    missing_version: 'INVALID_REQUEST',
    conflict_error: 'INTERNAL_ERROR',
    internal_server_error: 'INTERNAL_ERROR',
    service_unavailable: 'INTERNAL_ERROR',
    database_connection_unavailable: 'INTERNAL_ERROR',
  }

  return codeMap[notionCode] || 'INTERNAL_ERROR'
}

/**
 * 에러 코드에 따른 사용자 친화적 메시지 반환
 */
function getErrorMessage(code: APIErrorCode, originalMessage: string): string {
  const messages: Record<APIErrorCode, string> = {
    NOT_FOUND: '요청한 데이터를 찾을 수 없습니다',
    NOTION_API_ERROR: 'Notion API 연결에 문제가 발생했습니다',
    INVALID_REQUEST: '잘못된 요청입니다',
    INTERNAL_ERROR: '서버 오류가 발생했습니다',
    RATE_LIMITED: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요',
  }

  // 개발 환경에서는 원본 메시지도 포함
  if (process.env.NODE_ENV === 'development') {
    return `${messages[code]} (${originalMessage})`
  }

  return messages[code]
}

/**
 * Notion API 호출 래퍼
 * 에러 핸들링과 타입 안전성을 보장
 * @param apiCall - Notion API 호출 함수
 * @returns API 결과 또는 에러
 */
export async function safeNotionCall<T>(
  apiCall: () => Promise<T>
): Promise<
  { success: true; data: T } | { success: false; error: APIErrorResponse }
> {
  try {
    const data = await apiCall()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: handleNotionError(error) }
  }
}

/**
 * Notion 페이지를 TIL 타입으로 변환
 * @param page - Notion 페이지 객체
 * @returns TIL 데이터 또는 null (변환 실패 시)
 */
export function transformNotionPageToTIL(page: unknown): TIL | null {
  try {
    const typedPage = page as {
      id: string
      properties: {
        Title?: { title: Array<{ plain_text: string }> }
        등록일?: { date: { start: string } | null }
        Category?: { select: { name: string } | null }
        Tag?: { multi_select: Array<{ name: string }> }
        Reference?: { url: string | null }
        Status?: { select: { name: string } | null }
        Slag?: { rich_text: Array<{ plain_text: string }> }
      }
    }

    const props = typedPage.properties

    // 필수 필드 검증
    const title = props.Title?.title?.[0]?.plain_text
    if (!title) return null

    const slug = props.Slag?.rich_text?.[0]?.plain_text
    if (!slug) return null

    const status = props.Status?.select?.name
    if (!status || (status !== 'Draft' && status !== 'Published')) return null

    // 카테고리 검증 및 변환
    const categoryName = props.Category?.select?.name
    const validCategories: TILCategory[] = [
      'AWS',
      'DataBase',
      'DevOps',
      'AI',
      'Frontend',
      'Backend',
    ]
    const category = validCategories.includes(categoryName as TILCategory)
      ? (categoryName as TILCategory)
      : 'Backend' // 기본값

    return {
      id: typedPage.id,
      title,
      date: props.등록일?.date?.start || new Date().toISOString().split('T')[0],
      category,
      tags: props.Tag?.multi_select?.map(tag => tag.name) || [],
      reference: props.Reference?.url || null,
      slug,
      status: status as 'Draft' | 'Published',
    }
  } catch {
    console.error('Failed to transform Notion page to TIL')
    return null
  }
}

/**
 * TIL 목록 조회
 * Published 상태의 TIL만 조회하며, 최신순으로 정렬
 * @param params - 조회 파라미터 (카테고리, 페이지네이션)
 * @returns TIL 목록 및 페이지네이션 정보
 */
export async function getTILList(
  params: GetTILListParams = {}
): Promise<TILListResponse> {
  const { category, cursor, pageSize = 10 } = params

  // 필터 조건 생성: Status = Published
  const filter: QueryDatabaseParameters['filter'] = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      // 카테고리 필터 (선택적)
      ...(category
        ? [
            {
              property: 'Category',
              select: {
                equals: category,
              },
            },
          ]
        : []),
    ],
  }

  // 정렬 조건: 등록일 내림차순
  const sorts: QueryDatabaseParameters['sorts'] = [
    {
      property: '등록일',
      direction: 'descending',
    },
  ]

  const response = await notion.databases.query({
    database_id: databaseId,
    filter,
    sorts,
    page_size: pageSize,
    ...(cursor ? { start_cursor: cursor } : {}),
  })

  // 결과 변환
  const items = response.results
    .map(transformNotionPageToTIL)
    .filter((item): item is TIL => item !== null)

  return {
    items,
    pagination: {
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    },
  }
}

/**
 * Notion API 블록을 NotionBlock 타입으로 변환
 * @param block - Notion API 블록 객체
 * @returns NotionBlock 타입 또는 null
 */
function transformBlock(block: unknown): NotionBlock | null {
  try {
    const b = block as {
      id: string
      type: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
      [key: string]: unknown
    }

    const baseBlock = {
      id: b.id,
      created_time: b.created_time,
      last_edited_time: b.last_edited_time,
      has_children: b.has_children,
      archived: b.archived,
    }

    switch (b.type) {
      case 'paragraph': {
        const content = b.paragraph as {
          rich_text: NotionRichText[]
          color: string
        }
        return {
          ...baseBlock,
          type: 'paragraph',
          paragraph: {
            rich_text: content.rich_text || [],
            color:
              (content.color as NotionBlock['type'] extends 'paragraph'
                ? never
                : 'default') || 'default',
          },
        } as NotionBlock
      }

      case 'heading_1': {
        const content = b.heading_1 as {
          rich_text: NotionRichText[]
          color: string
          is_toggleable: boolean
        }
        return {
          ...baseBlock,
          type: 'heading_1',
          heading_1: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
            is_toggleable: content.is_toggleable || false,
          },
        } as NotionBlock
      }

      case 'heading_2': {
        const content = b.heading_2 as {
          rich_text: NotionRichText[]
          color: string
          is_toggleable: boolean
        }
        return {
          ...baseBlock,
          type: 'heading_2',
          heading_2: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
            is_toggleable: content.is_toggleable || false,
          },
        } as NotionBlock
      }

      case 'heading_3': {
        const content = b.heading_3 as {
          rich_text: NotionRichText[]
          color: string
          is_toggleable: boolean
        }
        return {
          ...baseBlock,
          type: 'heading_3',
          heading_3: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
            is_toggleable: content.is_toggleable || false,
          },
        } as NotionBlock
      }

      case 'bulleted_list_item': {
        const content = b.bulleted_list_item as {
          rich_text: NotionRichText[]
          color: string
        }
        return {
          ...baseBlock,
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
          },
        } as NotionBlock
      }

      case 'numbered_list_item': {
        const content = b.numbered_list_item as {
          rich_text: NotionRichText[]
          color: string
        }
        return {
          ...baseBlock,
          type: 'numbered_list_item',
          numbered_list_item: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
          },
        } as NotionBlock
      }

      case 'code': {
        const content = b.code as {
          rich_text: NotionRichText[]
          caption: NotionRichText[]
          language: string
        }
        return {
          ...baseBlock,
          type: 'code',
          code: {
            rich_text: content.rich_text || [],
            caption: content.caption || [],
            language: (content.language || 'plain text') as NotionCodeLanguage,
          },
        } as NotionBlock
      }

      case 'quote': {
        const content = b.quote as {
          rich_text: NotionRichText[]
          color: string
        }
        return {
          ...baseBlock,
          type: 'quote',
          quote: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
          },
        } as NotionBlock
      }

      case 'divider': {
        return {
          ...baseBlock,
          type: 'divider',
          divider: {},
        } as NotionBlock
      }

      case 'image': {
        const content = b.image as {
          type: 'external' | 'file'
          external?: { url: string }
          file?: { url: string; expiry_time: string }
          caption: NotionRichText[]
        }
        if (content.type === 'external' && content.external) {
          return {
            ...baseBlock,
            type: 'image',
            image: {
              type: 'external',
              external: { url: content.external.url },
              caption: content.caption || [],
            },
          } as NotionBlock
        }
        if (content.type === 'file' && content.file) {
          return {
            ...baseBlock,
            type: 'image',
            image: {
              type: 'file',
              file: {
                url: content.file.url,
                expiry_time: content.file.expiry_time,
              },
              caption: content.caption || [],
            },
          } as NotionBlock
        }
        return null
      }

      case 'callout': {
        const content = b.callout as {
          rich_text: NotionRichText[]
          color: string
          icon: unknown
        }
        return {
          ...baseBlock,
          type: 'callout',
          callout: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
            icon: content.icon || null,
          },
        } as NotionBlock
      }

      case 'to_do': {
        const content = b.to_do as {
          rich_text: NotionRichText[]
          color: string
          checked: boolean
        }
        return {
          ...baseBlock,
          type: 'to_do',
          to_do: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
            checked: content.checked || false,
          },
        } as NotionBlock
      }

      case 'toggle': {
        const content = b.toggle as {
          rich_text: NotionRichText[]
          color: string
        }
        return {
          ...baseBlock,
          type: 'toggle',
          toggle: {
            rich_text: content.rich_text || [],
            color: content.color || 'default',
          },
        } as NotionBlock
      }

      case 'bookmark': {
        const content = b.bookmark as {
          url: string
          caption: NotionRichText[]
        }
        return {
          ...baseBlock,
          type: 'bookmark',
          bookmark: {
            url: content.url || '',
            caption: content.caption || [],
          },
        } as NotionBlock
      }

      case 'embed': {
        const content = b.embed as {
          url: string
          caption: NotionRichText[]
        }
        return {
          ...baseBlock,
          type: 'embed',
          embed: {
            url: content.url || '',
            caption: content.caption || [],
          },
        } as NotionBlock
      }

      case 'video': {
        const content = b.video as {
          type: 'external' | 'file'
          external?: { url: string }
          file?: { url: string; expiry_time: string }
          caption: NotionRichText[]
        }
        if (content.type === 'external' && content.external) {
          return {
            ...baseBlock,
            type: 'video',
            video: {
              type: 'external',
              external: { url: content.external.url },
              caption: content.caption || [],
            },
          } as NotionBlock
        }
        if (content.type === 'file' && content.file) {
          return {
            ...baseBlock,
            type: 'video',
            video: {
              type: 'file',
              file: {
                url: content.file.url,
                expiry_time: content.file.expiry_time,
              },
              caption: content.caption || [],
            },
          } as NotionBlock
        }
        return null
      }

      // 지원하지 않는 블록 타입
      default:
        return {
          ...baseBlock,
          type: 'unsupported',
          unsupported: {},
        } as NotionBlock
    }
  } catch {
    console.error('Failed to transform Notion block')
    return null
  }
}

/**
 * 페이지의 모든 블록 조회
 * @param pageId - Notion 페이지 ID
 * @returns NotionBlock 배열
 */
async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = []
  let cursor: string | undefined = undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })

    const transformedBlocks = response.results
      .map(transformBlock)
      .filter((block): block is NotionBlock => block !== null)

    blocks.push(...transformedBlocks)
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

/**
 * slug로 TIL 상세 정보 조회
 * @param slug - URL 슬러그
 * @returns TILDetail 또는 null (찾지 못한 경우)
 */
export async function getTILBySlug(slug: string): Promise<TILDetail | null> {
  // Slag(오타) 필드와 Status로 필터링
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Slag',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
    page_size: 1,
  })

  if (response.results.length === 0) {
    return null
  }

  const page = response.results[0]
  const til = transformNotionPageToTIL(page)

  if (!til) {
    return null
  }

  // 페이지 블록 조회
  const blocks = await getPageBlocks(page.id)

  return {
    ...til,
    blocks,
  }
}
