import Link from 'next/link'
import { Home } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

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
            <Button className="mt-8" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
