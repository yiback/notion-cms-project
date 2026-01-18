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
import { Pagination } from '@/components/til/pagination'
import { Button } from '@/components/ui/button'
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
  PaginationSkeleton,
} from '@/components/til/til-card-skeleton'
import { getMockTILsByCategory } from '@/lib/mock-data'
import { isValidCategorySlug, getCategoryBySlug } from '@/types'
import type { TILCategorySlug } from '@/types'

interface CategoryPageProps {
  params: Promise<{
    name: string
  }>
  searchParams: Promise<{
    page?: string
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

  // 검색 파라미터에서 페이지 번호 추출
  const currentPage = Number(search.page) || 1
  const pageSize = 10

  // 더미 데이터 로딩 (추후 Notion API로 교체)
  const allTILs = getMockTILsByCategory(name as TILCategorySlug)
  const total = allTILs.length
  const totalPages = Math.ceil(total / pageSize)

  // 페이지네이션 적용
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedTILs = allTILs.slice(startIndex, endIndex)

  // TIL 카드 데이터로 변환
  const cardData = paginatedTILs.map(til => ({
    id: til.id,
    title: til.title,
    date: til.date,
    category: til.category,
    tags: til.tags,
    slug: til.slug,
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Container className="py-8">
          {/* 페이지 헤더 */}
          <div className="mb-8 space-y-4">
            {/* 뒤로가기 버튼 */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                전체 TIL로 돌아가기
              </Link>
            </Button>

            {/* 카테고리 정보 */}
            <div className="space-y-2">
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
            <TILCardList tils={cardData} />
          </Suspense>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Suspense fallback={<PaginationSkeleton />}>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </Suspense>
            </div>
          )}

          {/* 데이터 정보 (개발 모드용) */}
          <div className="text-muted-foreground mt-8 text-center text-sm">
            {category.label} 카테고리 {total}개의 TIL
            {totalPages > 1 && ` • 현재 ${currentPage} / ${totalPages} 페이지`}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
