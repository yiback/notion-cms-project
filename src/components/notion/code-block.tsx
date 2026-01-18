/**
 * Notion 코드 블록 렌더러
 * 구문 강조 없이 기본 코드 표시 (Phase 2용)
 */

'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { CodeBlock } from '@/types'
import { getPlainTextFromRichText } from '@/types'

interface CodeBlockRendererProps {
  block: CodeBlock
  className?: string
}

/**
 * 코드 블록 렌더러
 */
export function CodeBlockRenderer({
  block,
  className,
}: CodeBlockRendererProps) {
  const [copied, setCopied] = useState(false)

  const code = getPlainTextFromRichText(block.code.rich_text)
  const language = block.code.language
  const caption =
    block.code.caption.length > 0
      ? getPlainTextFromRichText(block.code.caption)
      : null

  // 클립보드에 복사
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('my-6', className)}>
      {/* 코드 블록 헤더 */}
      <div className="bg-muted flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-2">
        <span className="text-muted-foreground text-xs font-medium uppercase">
          {language === 'plain text' ? 'text' : language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 gap-1 px-2"
          aria-label={copied ? '복사됨' : '코드 복사'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span className="text-xs">복사됨</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-xs">복사</span>
            </>
          )}
        </Button>
      </div>

      {/* 코드 내용 */}
      <pre
        className={cn(
          'overflow-x-auto rounded-b-lg border bg-black p-4',
          'text-sm leading-relaxed text-white'
        )}
      >
        <code className="font-mono">{code}</code>
      </pre>

      {/* 캡션 */}
      {caption && (
        <p className="text-muted-foreground mt-2 text-center text-sm italic">
          {caption}
        </p>
      )}
    </div>
  )
}
