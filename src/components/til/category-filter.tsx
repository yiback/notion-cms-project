/**
 * 카테고리 필터 컴포넌트
 * 전체 TIL 또는 특정 카테고리만 표시하도록 필터링
 */

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/types'
import type { TILCategorySlug } from '@/types'

interface CategoryFilterProps {
  /** 현재 선택된 카테고리 슬러그 (없으면 전체) */
  currentCategory?: TILCategorySlug | null
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 카테고리 필터 버튼 그룹
 */
export function CategoryFilter({
  currentCategory = null,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
      role="group"
      aria-label="카테고리 필터"
    >
      {/* 전체 버튼 */}
      <Button
        asChild
        variant={!currentCategory ? 'default' : 'outline'}
        size="sm"
        className={cn('transition-all', !currentCategory && 'shadow-sm')}
      >
        <Link href="/" aria-current={!currentCategory ? 'page' : undefined}>
          전체
        </Link>
      </Button>

      {/* 카테고리별 버튼 */}
      {CATEGORIES.map(category => {
        const isActive = currentCategory === category.slug

        return (
          <Button
            key={category.id}
            asChild
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            className={cn('transition-all', isActive && 'shadow-sm')}
          >
            <Link
              href={`/category/${category.slug}`}
              aria-current={isActive ? 'page' : undefined}
              title={category.description}
            >
              {category.label}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

/**
 * 모바일용 컴팩트 카테고리 필터 (드롭다운)
 */
export function CategoryFilterCompact({
  currentCategory = null,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('md:hidden', className)}>
      <label htmlFor="category-select" className="sr-only">
        카테고리 선택
      </label>
      <select
        id="category-select"
        className={cn(
          'border-input bg-background ring-offset-background',
          'flex h-9 w-full rounded-md border px-3 py-1 text-sm',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        value={currentCategory || ''}
        onChange={e => {
          const value = e.target.value
          if (value) {
            window.location.href = `/category/${value}`
          } else {
            window.location.href = '/'
          }
        }}
        aria-label="카테고리 선택"
      >
        <option value="">전체</option>
        {CATEGORIES.map(category => (
          <option key={category.id} value={category.slug}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}
