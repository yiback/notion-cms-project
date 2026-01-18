/**
 * 뒤로가기 버튼 컴포넌트
 * 브라우저 히스토리 뒤로가기 기능
 */

'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
  children?: React.ReactNode
}

export function BackButton({ className, children }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.history.back()}
      className={cn('gap-1', className)}
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
      {children || '뒤로가기'}
    </Button>
  )
}
