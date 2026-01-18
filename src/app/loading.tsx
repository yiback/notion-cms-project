/**
 * 전역 로딩 UI
 * 메인 페이지 및 기타 페이지 로딩 시 표시
 */

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import {
  TILCardListSkeleton,
  CategoryFilterSkeleton,
} from '@/components/til/til-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          {/* 페이지 헤더 스켈레톤 */}
          <div className="mb-10 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-64" />
            </div>
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
