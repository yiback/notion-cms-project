import { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CATEGORIES } from '@/types'

export const metadata: Metadata = {
  title: 'About - TIL Garden',
  description:
    'TIL Garden 프로젝트 소개 및 Notion CMS 활용 방법에 대해 알아보세요.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="py-12">
            {/* 페이지 헤더 */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About TIL Garden
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                개발자를 위한 TIL(Today I Learned) 마이크로 블로그
              </p>
            </div>

            {/* 프로젝트 소개 */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold">프로젝트 소개</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  TIL Garden은 개발자가 매일 배운 것을 기록하고 공유하는
                  마이크로 블로그입니다. Notion을 CMS로 활용하여 간편하게
                  콘텐츠를 관리하고, Next.js를 통해 빠르고 SEO 친화적인
                  웹사이트로 제공합니다.
                </p>
              </div>
            </section>

            {/* Notion CMS 활용 */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold">
                왜 Notion CMS인가?
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ul>
                  <li>
                    <strong>익숙한 에디터</strong>: Notion의 강력한 에디터로
                    편리하게 콘텐츠 작성
                  </li>
                  <li>
                    <strong>실시간 동기화</strong>: Notion에서 수정하면
                    웹사이트에 자동 반영
                  </li>
                  <li>
                    <strong>무료</strong>: 별도의 CMS 비용 없이 Notion 무료
                    플랜으로 운영 가능
                  </li>
                  <li>
                    <strong>구조화된 데이터</strong>: 데이터베이스 기능으로
                    체계적인 콘텐츠 관리
                  </li>
                </ul>
              </div>
            </section>

            {/* 기술 스택 */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-semibold">기술 스택</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TechCard
                  title="Next.js 15"
                  description="App Router와 React Server Components 활용"
                />
                <TechCard
                  title="React 19"
                  description="최신 React 기능과 동시성 지원"
                />
                <TechCard
                  title="TypeScript"
                  description="타입 안전성을 갖춘 개발 경험"
                />
                <TechCard
                  title="TailwindCSS v4"
                  description="유틸리티 기반 스타일링"
                />
                <TechCard
                  title="shadcn/ui"
                  description="고품질 React 컴포넌트 라이브러리"
                />
                <TechCard
                  title="Notion API"
                  description="Headless CMS로 Notion 활용"
                />
              </div>
            </section>

            {/* 카테고리 안내 */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold">카테고리</h2>
              <p className="text-muted-foreground mb-6">
                TIL Garden에서는 다음 카테고리로 학습 내용을 분류합니다:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map(category => (
                  <Card
                    key={category.id}
                    className="transition-colors hover:border-primary/50"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {category.label}
                      </CardTitle>
                      <CardDescription>
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* 홈으로 버튼 */}
            <div className="mt-12 flex justify-center">
              <Button asChild>
                <Link href="/">TIL 목록 보기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

function TechCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    </div>
  )
}
