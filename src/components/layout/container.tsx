import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({
  children,
  className,
  size = 'md',
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',    // 672px - 아티클용
    md: 'max-w-3xl',    // 768px - 기본 콘텐츠 (모던 집중 읽기)
    lg: 'max-w-4xl',    // 896px - 넓은 콘텐츠
    xl: 'max-w-5xl',    // 1024px - 최대 폭
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  )
}
