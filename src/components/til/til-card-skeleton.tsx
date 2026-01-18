/**
 * TIL 카드 스켈레톤 컴포넌트
 * 로딩 중 표시되는 플레이스홀더
 */

import { cn } from '@/lib/utils'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface TILCardSkeletonProps {
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 단일 TIL 카드 스켈레톤
 */
export function TILCardSkeleton({ className }: TILCardSkeletonProps) {
  return (
    <Card className={cn('animate-pulse', className)}>
      <CardHeader className="space-y-3">
        {/* 카테고리 배지 스켈레톤 */}
        <div>
          <Skeleton className="h-5 w-20" />
        </div>

        {/* 제목 스켈레톤 (2줄) */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* 날짜 스켈레톤 */}
        <Skeleton className="h-4 w-24" />
      </CardHeader>

      {/* 태그 스켈레톤 */}
      <CardContent>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * TIL 카드 리스트 스켈레톤
 */
interface TILCardListSkeletonProps {
  /** 표시할 스켈레톤 카드 개수 */
  count?: number
  /** 추가 CSS 클래스 */
  className?: string
}

export function TILCardListSkeleton({
  count = 6,
  className,
}: TILCardListSkeletonProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        className
      )}
      aria-label="로딩 중"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <TILCardSkeleton key={i} />
      ))}
    </div>
  )
}

/**
 * TIL 상세 페이지 스켈레톤
 */
export function TILDetailSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse space-y-8', className)}
      aria-label="로딩 중"
      aria-busy="true"
    >
      {/* 헤더 영역 */}
      <div className="space-y-4">
        {/* 카테고리 + 날짜 */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* 제목 */}
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-4/5" />

        {/* 태그 */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>
      </div>

      {/* 구분선 */}
      <Skeleton className="h-px w-full" />

      {/* 본문 영역 */}
      <div className="space-y-6">
        {/* 단락 1 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 제목 */}
        <Skeleton className="h-8 w-1/3" />

        {/* 단락 2 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* 코드 블록 */}
        <Skeleton className="h-40 w-full rounded-lg" />

        {/* 단락 3 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  )
}

/**
 * 카테고리 필터 스켈레톤
 */
export function CategoryFilterSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-2', className)} aria-label="로딩 중">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className="h-9 w-20" />
      ))}
    </div>
  )
}

/**
 * 페이지네이션 스켈레톤
 */
export function PaginationSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="로딩 중"
    >
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
    </div>
  )
}
