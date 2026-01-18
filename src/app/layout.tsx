import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * 사이트 기본 URL (프로덕션 배포 후 실제 URL로 변경)
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TIL Garden - Today I Learned',
    template: '%s | TIL Garden',
  },
  description:
    'Notion을 CMS로 활용한 개발자 학습 기록 마이크로 블로그. 매일 배운 것을 기록하고 공유합니다.',
  keywords: [
    'TIL',
    'Today I Learned',
    '개발',
    '프로그래밍',
    'Notion CMS',
    'AWS',
    'Database',
    'DevOps',
    'AI',
    'Frontend',
    'Backend',
  ],
  authors: [{ name: 'TIL Garden' }],
  creator: 'TIL Garden',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'TIL Garden',
    title: 'TIL Garden - Today I Learned',
    description:
      'Notion을 CMS로 활용한 개발자 학습 기록 마이크로 블로그. 매일 배운 것을 기록하고 공유합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIL Garden - Today I Learned',
    description:
      'Notion을 CMS로 활용한 개발자 학습 기록 마이크로 블로그. 매일 배운 것을 기록하고 공유합니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
