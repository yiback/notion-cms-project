import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES } from '@/types'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-primary text-8xl font-bold tracking-tighter">
              404
            </h1>
            <h2 className="mt-4 text-2xl font-semibold">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다. 주소를
              다시 확인해 주세요.
            </p>

            {/* 홈으로 버튼 */}
            <Button className="mt-8" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>

            {/* 카테고리 바로가기 */}
            <div className="mt-12 w-full max-w-lg">
              <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2 text-sm">
                <Search className="h-4 w-4" />
                <span>카테고리에서 TIL을 찾아보세요</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map(category => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                    asChild
                  >
                    <Link href={`/category/${category.slug}`}>
                      {category.label}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
