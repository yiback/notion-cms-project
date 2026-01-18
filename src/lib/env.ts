import { z } from 'zod'

/**
 * 환경 변수 스키마 정의
 * Zod를 사용하여 타입 안전성과 런타임 검증 보장
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

/**
 * Notion API 환경 변수 스키마 (서버 전용)
 * 빌드 시점에 필수값 검증
 */
const notionEnvSchema = z.object({
  /** Notion Integration API 키 */
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY is required'),
  /** Notion 데이터베이스 ID */
  NOTION_DATABASE_ID: z.string().min(1, 'NOTION_DATABASE_ID is required'),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

/**
 * Notion 환경 변수 (서버 전용)
 * 클라이언트에서 접근 불가
 */
export const notionEnv = notionEnvSchema.parse({
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
})

export type Env = z.infer<typeof envSchema>
export type NotionEnv = z.infer<typeof notionEnvSchema>
