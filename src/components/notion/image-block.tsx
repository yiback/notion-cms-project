/**
 * Notion 이미지 블록 렌더러
 */

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ImageBlock } from '@/types'
import { getPlainTextFromRichText } from '@/types'

interface ImageBlockRendererProps {
  block: ImageBlock
  className?: string
}

/**
 * 이미지 블록 렌더러
 */
export function ImageBlockRenderer({
  block,
  className,
}: ImageBlockRendererProps) {
  const imageData = block.image
  const url =
    imageData.type === 'external' ? imageData.external.url : imageData.file.url

  const caption =
    imageData.caption.length > 0
      ? getPlainTextFromRichText(imageData.caption)
      : null

  return (
    <figure className={cn('my-6', className)}>
      <div className="bg-muted relative overflow-hidden rounded-lg">
        <Image
          src={url}
          alt={caption || '이미지'}
          width={800}
          height={600}
          className="h-auto w-full object-contain"
          unoptimized={imageData.type === 'file'}
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-3 text-center text-sm italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
