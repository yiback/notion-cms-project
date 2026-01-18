/**
 * 카테고리 페이지 (/category/[name])
 * 특정 카테고리에 속한 TIL 목록 표시
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { CategoryFilter } from '@/components/til/category-filter'
import { TILCardList } from '@/components/til/til-card'
import { Button } from '@/components/ui/button'
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
} from '@/components/til/til-card-skeleton'
import { getTILList } from '@/lib/notion'
import { toTILCardData } from '@/types/til'
import { isValidCategorySlug, getCategoryBySlug, slugToCategoryId, CATEGORIES } from '@/types'
import type { TILCategorySlug } from '@/types'

/**
 * ISR 재검증 시간 (초)
 */
export const revalidate = 60

/**
 * 정적 생성할 카테고리 경로
 */
export async function generateStaticParams() {
  return CATEGORIES.map(category => ({
    name: category.slug,
  }))
}

interface CategoryPageProps {
  params: Promise<{
    name: string
  }>
  searchParams: Promise<{
    cursor?: string
  }>
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params

  if (!isValidCategorySlug(name)) {
    return {
      title: '카테고리를 찾을 수 없습니다 - TIL Garden',
    }
  }

  const category = getCategoryBySlug(name)
  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다 - TIL Garden',
    }
  }

  return {
    title: `${category.label} - TIL Garden`,
    description: `${category.description} 관련 TIL 목록입니다.`,
  }
}

/**
 * 카테고리 페이지 컴포넌트
 */
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { name } = await params
  const search = await searchParams

  // 유효하지 않은 카테고리는 404 처리
  if (!isValidCategorySlug(name)) {
    notFound()
  }

  const category = getCategoryBySlug(name)
  if (!category) {
    notFound()
  }

  // 검색 파라미터에서 커서 추출
  const cursor = search.cursor || undefined
  const pageSize = 10

  // Notion API로 카테고리별 TIL 목록 조회
  const categoryId = slugToCategoryId(name as TILCategorySlug)
  const { items, pagination } = await getTILList({
    category: categoryId,
    pageSize,
    cursor,
  })

  // TIL 카드 데이터로 변환
  const cardData = items.map(toTILCardData)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Container className="py-12 md:py-16">
          {/* 페이지 헤더 */}
          <div className="mb-10 space-y-6">
            {/* 뒤로가기 버튼 */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                전체 TIL로 돌아가기
              </Link>
            </Button>

            {/* 카테고리 정보 */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {category.label}
              </h1>
              <p className="text-muted-foreground text-lg">
                {category.description}
              </p>
            </div>

            {/* 카테고리 필터 */}
            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilter currentCategory={name as TILCategorySlug} />
            </Suspense>
          </div>

          {/* TIL 카드 리스트 */}
          <Suspense fallback={<TILCardListSkeleton count={pageSize} />}>
            {items.length > 0 ? (
              <TILCardList tils={cardData} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">이 카테고리에 게시된 TIL이 없습니다.</p>
              </div>
            )}
          </Suspense>

          {/* 더 보기 (커서 기반 페이지네이션) */}
          {pagination.hasMore && pagination.nextCursor && (
            <div className="mt-14 text-center">
              <a
                href={`/category/${name}?cursor=${pagination.nextCursor}`}
                className="text-primary hover:underline"
              >
                더 보기 →
              </a>
            </div>
          )}

          {/* 데이터 정보 */}
          <div className="text-muted-foreground mt-10 text-center text-sm">
            {category.label} 카테고리 {items.length}개의 TIL 표시
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
