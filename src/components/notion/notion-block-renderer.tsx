/**
 * Notion 블록 렌더러 컴포넌트
 * Notion API로부터 받은 블록 데이터를 React 컴포넌트로 렌더링
 */

import { cn } from '@/lib/utils'
import type { NotionBlock, NotionRichText } from '@/types'
import { CodeBlockRenderer } from './code-block'
import { ImageBlockRenderer } from './image-block'

/**
 * 리치 텍스트 렌더링
 */
function RichTextRenderer({ richText }: { richText: NotionRichText[] }) {
  return (
    <>
      {richText.map((text, index) => {
        const { annotations, plain_text, href } = text

        let element = <span key={index}>{plain_text}</span>

        // 어노테이션 적용
        if (annotations.bold) {
          element = <strong key={index}>{element}</strong>
        }
        if (annotations.italic) {
          element = <em key={index}>{element}</em>
        }
        if (annotations.strikethrough) {
          element = <del key={index}>{element}</del>
        }
        if (annotations.underline) {
          element = <u key={index}>{element}</u>
        }
        if (annotations.code) {
          element = (
            <code
              key={index}
              className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
            >
              {plain_text}
            </code>
          )
        }

        // 링크 처리
        if (href) {
          element = (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {element}
            </a>
          )
        }

        return element
      })}
    </>
  )
}

/**
 * Paragraph 블록 렌더러
 */
function ParagraphRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'paragraph' }>
}) {
  const text = block.paragraph.rich_text

  if (text.length === 0) {
    return <p className="min-h-[1.5em]">&nbsp;</p>
  }

  return (
    <p className="leading-7">
      <RichTextRenderer richText={text} />
    </p>
  )
}

/**
 * Heading 1 블록 렌더러
 */
function Heading1Renderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'heading_1' }>
}) {
  const text = block.heading_1.rich_text

  return (
    <h1 className="mt-8 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
      <RichTextRenderer richText={text} />
    </h1>
  )
}

/**
 * Heading 2 블록 렌더러
 */
function Heading2Renderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'heading_2' }>
}) {
  const text = block.heading_2.rich_text

  return (
    <h2 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
      <RichTextRenderer richText={text} />
    </h2>
  )
}

/**
 * Heading 3 블록 렌더러
 */
function Heading3Renderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'heading_3' }>
}) {
  const text = block.heading_3.rich_text

  return (
    <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
      <RichTextRenderer richText={text} />
    </h3>
  )
}

/**
 * Bulleted List Item 블록 렌더러
 */
function BulletedListItemRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'bulleted_list_item' }>
}) {
  const text = block.bulleted_list_item.rich_text

  return (
    <li className="ml-6 list-disc">
      <RichTextRenderer richText={text} />
    </li>
  )
}

/**
 * Numbered List Item 블록 렌더러
 */
function NumberedListItemRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'numbered_list_item' }>
}) {
  const text = block.numbered_list_item.rich_text

  return (
    <li className="ml-6 list-decimal">
      <RichTextRenderer richText={text} />
    </li>
  )
}

/**
 * Quote 블록 렌더러
 */
function QuoteRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'quote' }>
}) {
  const text = block.quote.rich_text

  return (
    <blockquote className="border-l-primary bg-muted/50 mt-6 border-l-4 pl-6 italic">
      <RichTextRenderer richText={text} />
    </blockquote>
  )
}

/**
 * Divider 블록 렌더러
 */
function DividerRenderer() {
  return <hr className="my-8 border-t" />
}

/**
 * To-do 블록 렌더러
 */
function ToDoRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'to_do' }>
}) {
  const text = block.to_do.rich_text
  const checked = block.to_do.checked

  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        checked={checked}
        disabled
        className="mt-1"
        aria-label={checked ? '완료됨' : '미완료'}
      />
      <span className={cn(checked && 'text-muted-foreground line-through')}>
        <RichTextRenderer richText={text} />
      </span>
    </div>
  )
}

/**
 * Callout 블록 렌더러
 */
function CalloutRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'callout' }>
}) {
  const text = block.callout.rich_text
  const icon = block.callout.icon

  return (
    <div className="bg-muted border-border my-6 flex gap-3 rounded-lg border p-4">
      {icon && icon.type === 'emoji' && (
        <span className="text-2xl" aria-hidden="true">
          {icon.emoji}
        </span>
      )}
      <div className="flex-1">
        <RichTextRenderer richText={text} />
      </div>
    </div>
  )
}

/**
 * Unsupported 블록 렌더러
 */
function UnsupportedRenderer({
  block,
}: {
  block: Extract<NotionBlock, { type: 'unsupported' }>
}) {
  return (
    <div className="bg-muted text-muted-foreground my-4 rounded-lg p-4 text-sm">
      지원하지 않는 블록 타입입니다: {block.type}
    </div>
  )
}

/**
 * Notion 블록 렌더러 메인 컴포넌트
 */
export function NotionBlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        내용이 없습니다.
      </div>
    )
  }

  // 연속된 리스트 아이템을 그룹화
  const groupedBlocks: (NotionBlock | NotionBlock[])[] = []
  let currentBulletedList: NotionBlock[] = []
  let currentNumberedList: NotionBlock[] = []

  blocks.forEach(block => {
    if (block.type === 'bulleted_list_item') {
      currentBulletedList.push(block)
    } else {
      if (currentBulletedList.length > 0) {
        groupedBlocks.push(currentBulletedList)
        currentBulletedList = []
      }
      if (block.type === 'numbered_list_item') {
        currentNumberedList.push(block)
      } else {
        if (currentNumberedList.length > 0) {
          groupedBlocks.push(currentNumberedList)
          currentNumberedList = []
        }
        groupedBlocks.push(block)
      }
    }
  })

  // 마지막 리스트 추가
  if (currentBulletedList.length > 0) {
    groupedBlocks.push(currentBulletedList)
  }
  if (currentNumberedList.length > 0) {
    groupedBlocks.push(currentNumberedList)
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
      {groupedBlocks.map((blockOrBlocks, index) => {
        // 배열인 경우 (리스트)
        if (Array.isArray(blockOrBlocks)) {
          const firstBlock = blockOrBlocks[0]
          if (firstBlock.type === 'bulleted_list_item') {
            return (
              <ul key={`ul-${index}`} className="my-6 space-y-2">
                {blockOrBlocks.map(block => (
                  <BulletedListItemRenderer
                    key={block.id}
                    block={
                      block as Extract<
                        NotionBlock,
                        { type: 'bulleted_list_item' }
                      >
                    }
                  />
                ))}
              </ul>
            )
          }
          if (firstBlock.type === 'numbered_list_item') {
            return (
              <ol key={`ol-${index}`} className="my-6 space-y-2">
                {blockOrBlocks.map(block => (
                  <NumberedListItemRenderer
                    key={block.id}
                    block={
                      block as Extract<
                        NotionBlock,
                        { type: 'numbered_list_item' }
                      >
                    }
                  />
                ))}
              </ol>
            )
          }
        }

        // 개별 블록
        const block = blockOrBlocks as NotionBlock

        switch (block.type) {
          case 'paragraph':
            return <ParagraphRenderer key={block.id} block={block} />
          case 'heading_1':
            return <Heading1Renderer key={block.id} block={block} />
          case 'heading_2':
            return <Heading2Renderer key={block.id} block={block} />
          case 'heading_3':
            return <Heading3Renderer key={block.id} block={block} />
          case 'quote':
            return <QuoteRenderer key={block.id} block={block} />
          case 'divider':
            return <DividerRenderer key={block.id} />
          case 'to_do':
            return <ToDoRenderer key={block.id} block={block} />
          case 'callout':
            return <CalloutRenderer key={block.id} block={block} />
          case 'code':
            return <CodeBlockRenderer key={block.id} block={block} />
          case 'image':
            return <ImageBlockRenderer key={block.id} block={block} />
          case 'unsupported':
            return <UnsupportedRenderer key={block.id} block={block} />
          default:
            // 지원하지 않는 블록 타입
            return null
        }
      })}
    </div>
  )
}
