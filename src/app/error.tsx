'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertCircle } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 외부 서비스로 전송)
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <AlertCircle className="text-destructive h-16 w-16" />
            <h1 className="mt-6 text-2xl font-semibold">오류가 발생했습니다</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            {error.digest && (
              <p className="text-muted-foreground mt-2 text-sm">
                오류 코드: {error.digest}
              </p>
            )}
            <div className="mt-8 flex gap-4">
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                다시 시도
              </Button>
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
