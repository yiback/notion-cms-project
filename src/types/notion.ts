/**
 * Notion 블록 타입 정의
 * Notion API Block 객체 구조 기반
 * @see https://developers.notion.com/reference/block
 */

/**
 * Notion 리치 텍스트 어노테이션
 */
export interface NotionAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: NotionColor
}

/**
 * Notion 색상 타입
 */
export type NotionColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background'

/**
 * Notion 리치 텍스트 객체
 */
export interface NotionRichText {
  type: 'text' | 'mention' | 'equation'
  text?: {
    content: string
    link: { url: string } | null
  }
  annotations: NotionAnnotations
  plain_text: string
  href: string | null
}

/**
 * Notion 블록 타입
 */
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'code'
  | 'quote'
  | 'callout'
  | 'divider'
  | 'image'
  | 'video'
  | 'bookmark'
  | 'embed'
  | 'table'
  | 'table_row'
  | 'column_list'
  | 'column'
  | 'synced_block'
  | 'unsupported'

/**
 * 코드 블록 언어 타입
 */
export type NotionCodeLanguage =
  | 'abap'
  | 'arduino'
  | 'bash'
  | 'basic'
  | 'c'
  | 'clojure'
  | 'coffeescript'
  | 'cpp'
  | 'csharp'
  | 'css'
  | 'dart'
  | 'diff'
  | 'docker'
  | 'elixir'
  | 'elm'
  | 'erlang'
  | 'flow'
  | 'fortran'
  | 'fsharp'
  | 'gherkin'
  | 'glsl'
  | 'go'
  | 'graphql'
  | 'groovy'
  | 'haskell'
  | 'html'
  | 'java'
  | 'javascript'
  | 'json'
  | 'julia'
  | 'kotlin'
  | 'latex'
  | 'less'
  | 'lisp'
  | 'livescript'
  | 'lua'
  | 'makefile'
  | 'markdown'
  | 'markup'
  | 'matlab'
  | 'mermaid'
  | 'nix'
  | 'objective-c'
  | 'ocaml'
  | 'pascal'
  | 'perl'
  | 'php'
  | 'plain text'
  | 'powershell'
  | 'prolog'
  | 'protobuf'
  | 'python'
  | 'r'
  | 'reason'
  | 'ruby'
  | 'rust'
  | 'sass'
  | 'scala'
  | 'scheme'
  | 'scss'
  | 'shell'
  | 'sql'
  | 'swift'
  | 'typescript'
  | 'vb.net'
  | 'verilog'
  | 'vhdl'
  | 'visual basic'
  | 'webassembly'
  | 'xml'
  | 'yaml'
  | 'java/c/c++/c#'

/**
 * 기본 Notion 블록 구조
 */
export interface NotionBlockBase {
  id: string
  type: NotionBlockType
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
}

/**
 * 텍스트 기반 블록 공통 속성
 */
interface TextBlockContent {
  rich_text: NotionRichText[]
  color: NotionColor
}

/**
 * Paragraph 블록
 */
export interface ParagraphBlock extends NotionBlockBase {
  type: 'paragraph'
  paragraph: TextBlockContent
}

/**
 * Heading 1 블록
 */
export interface Heading1Block extends NotionBlockBase {
  type: 'heading_1'
  heading_1: TextBlockContent & {
    is_toggleable: boolean
  }
}

/**
 * Heading 2 블록
 */
export interface Heading2Block extends NotionBlockBase {
  type: 'heading_2'
  heading_2: TextBlockContent & {
    is_toggleable: boolean
  }
}

/**
 * Heading 3 블록
 */
export interface Heading3Block extends NotionBlockBase {
  type: 'heading_3'
  heading_3: TextBlockContent & {
    is_toggleable: boolean
  }
}

/**
 * Bulleted List Item 블록
 */
export interface BulletedListItemBlock extends NotionBlockBase {
  type: 'bulleted_list_item'
  bulleted_list_item: TextBlockContent
}

/**
 * Numbered List Item 블록
 */
export interface NumberedListItemBlock extends NotionBlockBase {
  type: 'numbered_list_item'
  numbered_list_item: TextBlockContent
}

/**
 * To-do 블록
 */
export interface ToDoBlock extends NotionBlockBase {
  type: 'to_do'
  to_do: TextBlockContent & {
    checked: boolean
  }
}

/**
 * Toggle 블록
 */
export interface ToggleBlock extends NotionBlockBase {
  type: 'toggle'
  toggle: TextBlockContent
}

/**
 * Code 블록
 */
export interface CodeBlock extends NotionBlockBase {
  type: 'code'
  code: {
    rich_text: NotionRichText[]
    caption: NotionRichText[]
    language: NotionCodeLanguage
  }
}

/**
 * Quote 블록
 */
export interface QuoteBlock extends NotionBlockBase {
  type: 'quote'
  quote: TextBlockContent
}

/**
 * Callout 블록
 */
export interface CalloutBlock extends NotionBlockBase {
  type: 'callout'
  callout: TextBlockContent & {
    icon:
      | { type: 'emoji'; emoji: string }
      | { type: 'external'; external: { url: string } }
      | { type: 'file'; file: { url: string } }
      | null
  }
}

/**
 * Divider 블록
 */
export interface DividerBlock extends NotionBlockBase {
  type: 'divider'
  divider: Record<string, never>
}

/**
 * Image 블록
 */
export interface ImageBlock extends NotionBlockBase {
  type: 'image'
  image:
    | {
        type: 'external'
        external: { url: string }
        caption: NotionRichText[]
      }
    | {
        type: 'file'
        file: { url: string; expiry_time: string }
        caption: NotionRichText[]
      }
}

/**
 * Video 블록
 */
export interface VideoBlock extends NotionBlockBase {
  type: 'video'
  video:
    | {
        type: 'external'
        external: { url: string }
        caption: NotionRichText[]
      }
    | {
        type: 'file'
        file: { url: string; expiry_time: string }
        caption: NotionRichText[]
      }
}

/**
 * Bookmark 블록
 */
export interface BookmarkBlock extends NotionBlockBase {
  type: 'bookmark'
  bookmark: {
    url: string
    caption: NotionRichText[]
  }
}

/**
 * Embed 블록
 */
export interface EmbedBlock extends NotionBlockBase {
  type: 'embed'
  embed: {
    url: string
    caption: NotionRichText[]
  }
}

/**
 * Unsupported 블록
 */
export interface UnsupportedBlock extends NotionBlockBase {
  type: 'unsupported'
  unsupported: Record<string, never>
}

/**
 * Notion 블록 유니온 타입
 */
export type NotionBlock =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ToDoBlock
  | ToggleBlock
  | CodeBlock
  | QuoteBlock
  | CalloutBlock
  | DividerBlock
  | ImageBlock
  | VideoBlock
  | BookmarkBlock
  | EmbedBlock
  | UnsupportedBlock

/**
 * 블록에서 플레인 텍스트 추출
 */
export function getPlainTextFromRichText(richText: NotionRichText[]): string {
  return richText.map(text => text.plain_text).join('')
}

/**
 * 블록 타입 체크 헬퍼
 */
export function isTextBlock(
  block: NotionBlock
): block is
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | QuoteBlock {
  return [
    'paragraph',
    'heading_1',
    'heading_2',
    'heading_3',
    'bulleted_list_item',
    'numbered_list_item',
    'quote',
  ].includes(block.type)
}
