import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              TIL Garden
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Notion CMS 기반 TIL 마이크로 블로그
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              개발 진행 중...
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
