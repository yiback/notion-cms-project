/**
 * 메인 페이지 (/)
 * 전체 TIL 목록 표시 및 카테고리 필터링
 */

import { Suspense } from 'react'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryFilter } from '@/components/til/category-filter'
import { TILCardList } from '@/components/til/til-card'
import { Pagination } from '@/components/til/pagination'
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
  PaginationSkeleton,
} from '@/components/til/til-card-skeleton'
import { getMockTILsPaginated } from '@/lib/mock-data'

interface HomePageProps {
  searchParams: Promise<{
    page?: string
  }>
}

/**
 * 메인 페이지 컴포넌트
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  // 검색 파라미터에서 페이지 번호 추출
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  // 더미 데이터 로딩 (추후 Notion API로 교체)
  const pageSize = 10
  const { tils, total } = getMockTILsPaginated(currentPage, pageSize)
  const totalPages = Math.ceil(total / pageSize)

  // TIL 카드 데이터로 변환
  const cardData = tils.map(til => ({
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
        <Container className="py-12 md:py-16">
          {/* 페이지 헤더 */}
          <div className="mb-10 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                TIL Garden
              </h1>
              <p className="text-muted-foreground text-lg">
                개발하며 배운 것들을 기록합니다
              </p>
            </div>

            {/* 카테고리 필터 */}
            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilter currentCategory={null} />
            </Suspense>
          </div>

          {/* TIL 카드 리스트 */}
          <Suspense fallback={<TILCardListSkeleton count={pageSize} />}>
            <TILCardList tils={cardData} />
          </Suspense>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-14">
              <Suspense fallback={<PaginationSkeleton />}>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </Suspense>
            </div>
          )}

          {/* 데이터 정보 (개발 모드용) */}
          <div className="text-muted-foreground mt-10 text-center text-sm">
            전체 {total}개의 TIL • 현재 {currentPage} / {totalPages} 페이지
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
