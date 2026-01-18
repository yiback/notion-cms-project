/**
 * TIL 카드 컴포넌트
 * TIL 목록에서 개별 항목을 표시하는 카드
 */

import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TILCardData } from '@/types'
import { getCategoryById } from '@/types'

interface TILCardProps {
  /** TIL 카드 데이터 */
  til: TILCardData
  /** 추가 CSS 클래스 */
  className?: string
}

/**
 * 날짜를 사용자 친화적 형식으로 포맷
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

/**
 * TIL 카드 컴포넌트
 */
export function TILCard({ til, className }: TILCardProps) {
  const categoryInfo = getCategoryById(til.category)
  const formattedDate = formatDate(til.date)

  return (
    <Card
      className={cn(
        'group transition-all duration-300',
        'hover:shadow-primary/5 hover:-translate-y-1 hover:shadow-lg',
        'border-border hover:border-primary/50',
        className
      )}
    >
      <Link href={`/til/${til.slug}`} className="block">
        <CardHeader className="space-y-3">
          {/* 카테고리 배지 */}
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="font-medium"
              title={categoryInfo?.description}
            >
              {categoryInfo?.label || til.category}
            </Badge>
          </div>

          {/* 제목 */}
          <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
            {til.title}
          </CardTitle>

          {/* 작성일 */}
          <CardDescription className="flex items-center gap-1.5 text-sm">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={til.date}>{formattedDate}</time>
          </CardDescription>
        </CardHeader>

        {/* 태그 목록 */}
        {til.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag
                className="text-muted-foreground h-3.5 w-3.5"
                aria-hidden="true"
              />
              {til.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Link>
    </Card>
  )
}

/**
 * TIL 카드 리스트 컴포넌트
 */
interface TILCardListProps {
  /** TIL 카드 데이터 배열 */
  tils: TILCardData[]
  /** 추가 CSS 클래스 */
  className?: string
}

export function TILCardList({ tils, className }: TILCardListProps) {
  if (tils.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">TIL이 없습니다.</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Notion에서 TIL을 작성하고 Published 상태로 변경해주세요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('grid gap-6', 'grid-cols-1', 'md:grid-cols-2', className)}
    >
      {tils.map(til => (
        <TILCard key={til.id} til={til} />
      ))}
    </div>
  )
}
