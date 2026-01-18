/**
 * 카테고리 페이지 로딩 UI
 */

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
} from '@/components/til/til-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function CategoryLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          {/* 페이지 헤더 스켈레톤 */}
          <div className="mb-10 space-y-6">
            {/* 뒤로가기 버튼 */}
            <Skeleton className="h-9 w-40" />

            {/* 카테고리 정보 */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-6 w-56" />
            </div>

            {/* 카테고리 필터 */}
            <CategoryFilterSkeleton />
          </div>

          {/* TIL 카드 리스트 스켈레톤 */}
          <TILCardListSkeleton count={6} />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
