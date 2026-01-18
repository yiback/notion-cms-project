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
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
} from '@/components/til/til-card-skeleton'
import { getTILList } from '@/lib/notion'
import { toTILCardData } from '@/types/til'

/**
 * ISR 재검증 시간 (초)
 * 60초마다 Notion API에서 최신 데이터 가져옴
 */
export const revalidate = 60

interface HomePageProps {
  searchParams: Promise<{
    cursor?: string
  }>
}

/**
 * 메인 페이지 컴포넌트
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  // 검색 파라미터에서 커서 추출
  const params = await searchParams
  const cursor = params.cursor || undefined

  // Notion API로 TIL 목록 조회
  const pageSize = 10
  const { items, pagination } = await getTILList({
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
            {items.length > 0 ? (
              <TILCardList tils={cardData} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  아직 게시된 TIL이 없습니다.
                </p>
              </div>
            )}
          </Suspense>

          {/* 더 보기 (커서 기반 페이지네이션) */}
          {pagination.hasMore && pagination.nextCursor && (
            <div className="mt-14 text-center">
              <a
                href={`/?cursor=${pagination.nextCursor}`}
                className="text-primary hover:underline"
              >
                더 보기 →
              </a>
            </div>
          )}

          {/* 데이터 정보 */}
          <div className="text-muted-foreground mt-10 text-center text-sm">
            {items.length}개의 TIL 표시
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
