/**
 * TIL 상세 페이지 로딩 UI
 */

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { TILDetailSkeleton } from '@/components/til/til-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function TILDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          {/* 네비게이션 스켈레톤 */}
          <div className="mb-10 flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>

          {/* TIL 상세 스켈레톤 */}
          <TILDetailSkeleton />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
