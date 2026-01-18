/**
 * 더미 데이터 생성 유틸리티
 * Phase 2 UI/UX 개발 시 실제 Notion API 없이 테스트용으로 사용
 */

import type {
  TIL,
  TILDetail,
  TILCardData,
  NotionBlock,
  ParagraphBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  CodeBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  QuoteBlock,
  DividerBlock,
  ImageBlock,
  NotionRichText,
} from '@/types'

/**
 * 더미 리치 텍스트 생성 헬퍼
 */
function createRichText(content: string): NotionRichText[] {
  return [
    {
      type: 'text',
      text: {
        content,
        link: null,
      },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default',
      },
      plain_text: content,
      href: null,
    },
  ]
}

/**
 * 기본 블록 속성 생성
 */
function createBaseBlock(type: string) {
  return {
    id: `mock-block-${Math.random().toString(36).substr(2, 9)}`,
    created_time: new Date().toISOString(),
    last_edited_time: new Date().toISOString(),
    has_children: false,
    archived: false,
    type,
  }
}

/**
 * 더미 TIL 목록 데이터
 */
export const MOCK_TIL_LIST: TIL[] = [
  {
    id: 'mock-til-001',
    title: 'AWS Lambda와 API Gateway로 서버리스 API 구축하기',
    date: '2024-01-15T09:00:00.000Z',
    category: 'AWS',
    tags: ['Lambda', 'API Gateway', 'Serverless'],
    reference: 'https://docs.aws.amazon.com/lambda/',
    slug: 'aws-lambda-api-gateway',
    status: 'Published',
  },
  {
    id: 'mock-til-002',
    title: 'PostgreSQL 인덱스 최적화 전략',
    date: '2024-01-14T10:30:00.000Z',
    category: 'DataBase',
    tags: ['PostgreSQL', 'Index', 'Performance'],
    reference: null,
    slug: 'postgresql-index-optimization',
    status: 'Published',
  },
  {
    id: 'mock-til-003',
    title: 'Docker Compose로 멀티 컨테이너 환경 구성하기',
    date: '2024-01-13T14:20:00.000Z',
    category: 'DevOps',
    tags: ['Docker', 'Docker Compose', 'Container'],
    reference: 'https://docs.docker.com/compose/',
    slug: 'docker-compose-multi-container',
    status: 'Published',
  },
  {
    id: 'mock-til-004',
    title: 'Transformer 모델 아키텍처 이해하기',
    date: '2024-01-12T16:45:00.000Z',
    category: 'AI',
    tags: ['Transformer', 'NLP', 'Deep Learning'],
    reference: 'https://arxiv.org/abs/1706.03762',
    slug: 'transformer-architecture',
    status: 'Published',
  },
  {
    id: 'mock-til-005',
    title: 'React 19 Server Components 실전 활용',
    date: '2024-01-11T11:15:00.000Z',
    category: 'Frontend',
    tags: ['React', 'Server Components', 'Next.js'],
    reference: 'https://react.dev/blog/2024/12/05/react-19',
    slug: 'react-19-server-components',
    status: 'Published',
  },
  {
    id: 'mock-til-006',
    title: 'Node.js 이벤트 루프와 비동기 처리',
    date: '2024-01-10T13:30:00.000Z',
    category: 'Backend',
    tags: ['Node.js', 'Event Loop', 'Async'],
    reference: null,
    slug: 'nodejs-event-loop',
    status: 'Published',
  },
  {
    id: 'mock-til-007',
    title: 'S3 버킷 정책과 액세스 제어 설정',
    date: '2024-01-09T09:20:00.000Z',
    category: 'AWS',
    tags: ['S3', 'IAM', 'Security'],
    reference: 'https://docs.aws.amazon.com/s3/',
    slug: 's3-bucket-policy',
    status: 'Published',
  },
  {
    id: 'mock-til-008',
    title: 'MongoDB 집계 파이프라인 마스터하기',
    date: '2024-01-08T15:50:00.000Z',
    category: 'DataBase',
    tags: ['MongoDB', 'Aggregation', 'NoSQL'],
    reference: null,
    slug: 'mongodb-aggregation-pipeline',
    status: 'Published',
  },
  {
    id: 'mock-til-009',
    title: 'Kubernetes Pod 오토스케일링 전략',
    date: '2024-01-07T10:10:00.000Z',
    category: 'DevOps',
    tags: ['Kubernetes', 'HPA', 'Autoscaling'],
    reference: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/',
    slug: 'kubernetes-pod-autoscaling',
    status: 'Published',
  },
  {
    id: 'mock-til-010',
    title: '딥러닝 모델 경량화 기법 정리',
    date: '2024-01-06T14:40:00.000Z',
    category: 'AI',
    tags: ['Model Compression', 'Pruning', 'Quantization'],
    reference: null,
    slug: 'deep-learning-model-compression',
    status: 'Published',
  },
  {
    id: 'mock-til-011',
    title: 'TailwindCSS v4 마이그레이션 가이드',
    date: '2024-01-05T16:25:00.000Z',
    category: 'Frontend',
    tags: ['TailwindCSS', 'CSS', 'Migration'],
    reference: 'https://tailwindcss.com/docs',
    slug: 'tailwindcss-v4-migration',
    status: 'Published',
  },
  {
    id: 'mock-til-012',
    title: 'GraphQL 스키마 설계 베스트 프랙티스',
    date: '2024-01-04T12:00:00.000Z',
    category: 'Backend',
    tags: ['GraphQL', 'Schema Design', 'API'],
    reference: 'https://graphql.org/learn/',
    slug: 'graphql-schema-design',
    status: 'Published',
  },
]

/**
 * 더미 Notion 블록 생성
 */
function createMockBlocks(): NotionBlock[] {
  const blocks: NotionBlock[] = []

  // Heading 1
  blocks.push({
    ...createBaseBlock('heading_1'),
    type: 'heading_1',
    heading_1: {
      rich_text: createRichText('핵심 개념'),
      color: 'default',
      is_toggleable: false,
    },
  } as Heading1Block)

  // Paragraph
  blocks.push({
    ...createBaseBlock('paragraph'),
    type: 'paragraph',
    paragraph: {
      rich_text: createRichText(
        '이 글에서는 해당 기술의 핵심 개념과 실제 적용 사례를 다룹니다.'
      ),
      color: 'default',
    },
  } as ParagraphBlock)

  // Heading 2
  blocks.push({
    ...createBaseBlock('heading_2'),
    type: 'heading_2',
    heading_2: {
      rich_text: createRichText('주요 특징'),
      color: 'default',
      is_toggleable: false,
    },
  } as Heading2Block)

  // Bulleted List Items
  blocks.push({
    ...createBaseBlock('bulleted_list_item'),
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: createRichText('높은 성능과 확장성'),
      color: 'default',
    },
  } as BulletedListItemBlock)

  blocks.push({
    ...createBaseBlock('bulleted_list_item'),
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: createRichText('간편한 설정과 관리'),
      color: 'default',
    },
  } as BulletedListItemBlock)

  blocks.push({
    ...createBaseBlock('bulleted_list_item'),
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: createRichText('커뮤니티 및 생태계 지원'),
      color: 'default',
    },
  } as BulletedListItemBlock)

  // Heading 3
  blocks.push({
    ...createBaseBlock('heading_3'),
    type: 'heading_3',
    heading_3: {
      rich_text: createRichText('코드 예제'),
      color: 'default',
      is_toggleable: false,
    },
  } as Heading3Block)

  // Code Block
  blocks.push({
    ...createBaseBlock('code'),
    type: 'code',
    code: {
      rich_text: createRichText(
        `// 예제 코드
const example = async () => {
  const result = await fetchData()
  console.log(result)
  return result
}

export default example`
      ),
      caption: [],
      language: 'typescript',
    },
  } as CodeBlock)

  // Quote
  blocks.push({
    ...createBaseBlock('quote'),
    type: 'quote',
    quote: {
      rich_text: createRichText(
        '실무에서 바로 적용할 수 있는 실용적인 접근이 중요합니다.'
      ),
      color: 'default',
    },
  } as QuoteBlock)

  // Divider
  blocks.push({
    ...createBaseBlock('divider'),
    type: 'divider',
    divider: {},
  } as DividerBlock)

  // Heading 2
  blocks.push({
    ...createBaseBlock('heading_2'),
    type: 'heading_2',
    heading_2: {
      rich_text: createRichText('실전 적용 방법'),
      color: 'default',
      is_toggleable: false,
    },
  } as Heading2Block)

  // Numbered List Items
  blocks.push({
    ...createBaseBlock('numbered_list_item'),
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: createRichText('프로젝트 초기 설정 및 환경 구성'),
      color: 'default',
    },
  } as NumberedListItemBlock)

  blocks.push({
    ...createBaseBlock('numbered_list_item'),
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: createRichText('기본 기능 구현 및 테스트'),
      color: 'default',
    },
  } as NumberedListItemBlock)

  blocks.push({
    ...createBaseBlock('numbered_list_item'),
    type: 'numbered_list_item',
    numbered_list_item: {
      rich_text: createRichText('최적화 및 배포'),
      color: 'default',
    },
  } as NumberedListItemBlock)

  // Paragraph
  blocks.push({
    ...createBaseBlock('paragraph'),
    type: 'paragraph',
    paragraph: {
      rich_text: createRichText(
        '위 단계를 따라 진행하면 프로덕션 환경에 안정적으로 적용할 수 있습니다.'
      ),
      color: 'default',
    },
  } as ParagraphBlock)

  // Image (선택적)
  blocks.push({
    ...createBaseBlock('image'),
    type: 'image',
    image: {
      type: 'external',
      external: {
        url: 'https://via.placeholder.com/800x400?text=Example+Diagram',
      },
      caption: createRichText('시스템 아키텍처 다이어그램'),
    },
  } as ImageBlock)

  return blocks
}

/**
 * 더미 TIL 상세 데이터 생성
 */
export function getMockTILDetail(slug: string): TILDetail | null {
  const til = MOCK_TIL_LIST.find(t => t.slug === slug)
  if (!til) return null

  return {
    ...til,
    blocks: createMockBlocks(),
  }
}

/**
 * 카테고리별 필터링된 더미 데이터
 */
export function getMockTILsByCategory(
  categorySlug: string
): TIL[] {
  // 슬러그를 카테고리 ID로 매핑
  const categoryMap: Record<string, string> = {
    aws: 'AWS',
    database: 'DataBase',
    devops: 'DevOps',
    ai: 'AI',
    frontend: 'Frontend',
    backend: 'Backend',
  }

  const categoryId = categoryMap[categorySlug]
  if (!categoryId) return []

  return MOCK_TIL_LIST.filter(til => til.category === categoryId)
}

/**
 * 페이지네이션된 더미 데이터
 */
export function getMockTILsPaginated(
  page: number = 1,
  pageSize: number = 10
): {
  tils: TIL[]
  hasMore: boolean
  total: number
} {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const tils = MOCK_TIL_LIST.slice(startIndex, endIndex)

  return {
    tils,
    hasMore: endIndex < MOCK_TIL_LIST.length,
    total: MOCK_TIL_LIST.length,
  }
}

/**
 * TIL을 TILCardData로 변환
 */
export function toMockCardData(til: TIL): TILCardData {
  return {
    id: til.id,
    title: til.title,
    date: til.date,
    category: til.category,
    tags: til.tags,
    slug: til.slug,
  }
}

/**
 * 전체 더미 데이터를 카드 데이터로 변환
 */
export function getMockCardList(): TILCardData[] {
  return MOCK_TIL_LIST.map(toMockCardData)
}
