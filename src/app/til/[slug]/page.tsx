/**
 * TIL 상세 페이지 (/til/[slug])
 * 개별 TIL의 전체 내용 표시
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Home, Calendar, ExternalLink } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BackButton } from '@/components/ui/back-button'
import { NotionBlockRenderer } from '@/components/notion/notion-block-renderer'
import { TILDetailSkeleton } from '@/components/til/til-card-skeleton'
import { getTILBySlug, getTILList } from '@/lib/notion'
import { getCategoryById } from '@/types'

/**
 * ISR 재검증 시간 (초)
 */
export const revalidate = 60

/**
 * 정적 생성할 TIL 슬러그 목록
 * 빌드 시점에 모든 Published TIL의 슬러그를 조회
 */
export async function generateStaticParams() {
  try {
    const { items } = await getTILList({ pageSize: 100 })
    return items.map(til => ({
      slug: til.slug,
    }))
  } catch {
    // 빌드 시 API 에러 발생 시 빈 배열 반환
    return []
  }
}

interface TILDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * 날짜를 사용자 친화적 형식으로 포맷
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}년 ${month}월 ${day}일`
}

/**
 * 메타데이터 생성
 */
export async function generateMetadata({
  params,
}: TILDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  // Notion API로 TIL 조회
  const til = await getTILBySlug(slug)

  if (!til) {
    return {
      title: 'TIL을 찾을 수 없습니다 - TIL Garden',
    }
  }

  const categoryInfo = getCategoryById(til.category)

  return {
    title: `${til.title} - TIL Garden`,
    description: `${categoryInfo?.label || til.category} 카테고리의 TIL입니다.`,
  }
}

/**
 * TIL 상세 페이지 컴포넌트
 */
export default async function TILDetailPage({ params }: TILDetailPageProps) {
  const { slug } = await params

  // Notion API로 TIL 조회
  const til = await getTILBySlug(slug)

  // 존재하지 않는 TIL은 404 처리
  if (!til) {
    notFound()
  }

  const categoryInfo = getCategoryById(til.category)
  const formattedDate = formatDate(til.date)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Container className="py-12 md:py-16">
          {/* 네비게이션 */}
          <div className="mb-10 flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-1">
                <Home className="h-4 w-4" />
                홈으로
              </Link>
            </Button>
            <BackButton />
          </div>

          {/* TIL 본문 */}
          <article>
            {/* 헤더 */}
            <header className="mb-8 space-y-4">
              {/* 카테고리 */}
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="font-medium"
                  asChild
                >
                  <Link
                    href={`/category/${categoryInfo?.slug}`}
                    title={categoryInfo?.description}
                  >
                    {categoryInfo?.label || til.category}
                  </Link>
                </Badge>
                <span className="text-muted-foreground">•</span>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={til.date}>{formattedDate}</time>
                </div>
              </div>

              {/* 제목 */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {til.title}
              </h1>

              {/* 태그 */}
              {til.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {til.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <Separator className="my-8" />

            {/* 본문 */}
            <Suspense fallback={<TILDetailSkeleton />}>
              <NotionBlockRenderer blocks={til.blocks} />
            </Suspense>

            {/* 참고 링크 */}
            {til.reference && (
              <>
                <Separator className="my-8" />
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">참고 링크</h2>
                  <a
                    href={til.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                  >
                    {til.reference}
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </>
            )}

            {/* 하단 네비게이션 */}
            <div className="mt-14 flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/">전체 TIL 보기</Link>
              </Button>
              {categoryInfo && (
                <Button variant="outline" asChild>
                  <Link href={`/category/${categoryInfo.slug}`}>
                    {categoryInfo.label} TIL 보기
                  </Link>
                </Button>
              )}
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
