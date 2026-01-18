/**
 * 페이지네이션 컴포넌트
 * TIL 목록의 페이지 탐색 UI
 */

'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number
  /** 전체 페이지 수 */
  totalPages: number
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * URL에 페이지 번호를 추가한 경로 생성
 */
function createPageUrl(
  pathname: string,
  searchParams: URLSearchParams,
  page: number
): string {
  const params = new URLSearchParams(searchParams)
  if (page === 1) {
    params.delete('page')
  } else {
    params.set('page', page.toString())
  }
  const queryString = params.toString()
  return queryString ? `${pathname}?${queryString}` : pathname
}

/**
 * 페이지 번호 배열 생성 (생략 부호 포함)
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // 현재 페이지가 앞쪽에 있을 때
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }

  // 현재 페이지가 뒤쪽에 있을 때
  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  // 현재 페이지가 중간에 있을 때
  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}

/**
 * TIL 목록 페이지네이션 컴포넌트
 */
export function Pagination({
  currentPage,
  totalPages,
  className,
}: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 페이지가 1개뿐이면 렌더링하지 않음
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      role="navigation"
      aria-label="페이지네이션"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {/* 이전 페이지 버튼 */}
      <Button
        asChild={hasPrevious}
        variant="outline"
        size="icon"
        className="h-9 w-9"
        disabled={!hasPrevious}
        aria-label="이전 페이지"
      >
        {hasPrevious ? (
          <Link href={createPageUrl(pathname, searchParams, currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* 페이지 번호 버튼들 */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            )
          }

          const isCurrentPage = pageNum === currentPage

          return (
            <Button
              key={pageNum}
              asChild={!isCurrentPage}
              variant={isCurrentPage ? 'default' : 'outline'}
              size="icon"
              className={cn('h-9 w-9', isCurrentPage && 'pointer-events-none')}
              aria-label={`페이지 ${pageNum}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {isCurrentPage ? (
                <span>{pageNum}</span>
              ) : (
                <Link href={createPageUrl(pathname, searchParams, pageNum)}>
                  {pageNum}
                </Link>
              )}
            </Button>
          )
        })}
      </div>

      {/* 다음 페이지 버튼 */}
      <Button
        asChild={hasNext}
        variant="outline"
        size="icon"
        className="h-9 w-9"
        disabled={!hasNext}
        aria-label="다음 페이지"
      >
        {hasNext ? (
          <Link href={createPageUrl(pathname, searchParams, currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  )
}

/**
 * 간단한 이전/다음 페이지네이션 (모바일용)
 */
export function PaginationSimple({
  currentPage,
  totalPages,
  className,
}: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) {
    return null
  }

  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      role="navigation"
      aria-label="페이지네이션"
      className={cn('flex items-center justify-between gap-2', className)}
    >
      {/* 이전 페이지 */}
      <Button
        asChild={hasPrevious}
        variant="outline"
        disabled={!hasPrevious}
        className="flex-1"
      >
        {hasPrevious ? (
          <Link
            href={createPageUrl(pathname, searchParams, currentPage - 1)}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            이전
          </Link>
        ) : (
          <span className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            이전
          </span>
        )}
      </Button>

      {/* 페이지 정보 */}
      <span className="text-muted-foreground text-sm">
        {currentPage} / {totalPages}
      </span>

      {/* 다음 페이지 */}
      <Button
        asChild={hasNext}
        variant="outline"
        disabled={!hasNext}
        className="flex-1"
      >
        {hasNext ? (
          <Link
            href={createPageUrl(pathname, searchParams, currentPage + 1)}
            className="flex items-center gap-1"
          >
            다음
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex items-center gap-1">
            다음
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  )
}
