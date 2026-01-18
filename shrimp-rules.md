# TIL Garden Development Guidelines

AI Agent를 위한 프로젝트별 개발 규칙 문서입니다.

---

## 1. 프로젝트 개요

| 항목           | 내용                                                        |
| -------------- | ----------------------------------------------------------- |
| **프로젝트명** | TIL Garden                                                  |
| **목적**       | Notion CMS 기반 개발자 TIL(Today I Learned) 마이크로 블로그 |
| **Framework**  | Next.js 15.5.3 (App Router + Turbopack)                     |
| **Runtime**    | React 19.1.0 + TypeScript 5                                 |
| **Styling**    | TailwindCSS v4 + shadcn/ui (new-york style)                 |
| **Forms**      | React Hook Form + Zod + Server Actions                      |
| **Icons**      | Lucide React                                                |
| **CMS**        | Notion API (@notionhq/client)                               |

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지 (/)
│   ├── globals.css         # 전역 CSS (TailwindCSS v4)
│   ├── category/[name]/    # 카테고리 페이지
│   ├── til/[slug]/         # TIL 상세 페이지
│   └── about/              # About 페이지
├── components/
│   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트 (header, footer, container)
│   ├── navigation/         # 네비게이션 컴포넌트
│   ├── sections/           # 페이지 섹션 컴포넌트
│   └── providers/          # Context 프로바이더
├── lib/
│   ├── utils.ts            # 공통 유틸리티 (cn 함수 포함)
│   ├── env.ts              # 환경변수 검증
│   ├── notion.ts           # Notion API 클라이언트 (구현 예정)
│   └── types/              # TypeScript 타입 정의 (구현 예정)
docs/
├── PRD.md                  # 제품 요구사항 문서
├── ROADMAP.md              # 개발 로드맵
└── guides/                 # 개발 가이드 문서
```

### 컴포넌트 분류 규칙

| 폴더          | 용도                                        | 예시                             |
| ------------- | ------------------------------------------- | -------------------------------- |
| `ui/`         | shadcn/ui 기본 컴포넌트, 비즈니스 로직 없음 | button, card, input              |
| `layout/`     | 페이지 구조 컴포넌트                        | header, footer, container        |
| `navigation/` | 네비게이션 관련                             | main-nav, mobile-nav, pagination |
| `sections/`   | 페이지 섹션                                 | hero, features, til-card         |
| `providers/`  | Context 프로바이더                          | theme-provider                   |

### 파일 위치 결정 기준

- **특정 페이지 전용**: 해당 페이지 폴더 내 배치
- **여러 페이지 공유**: `components/` 적절한 카테고리에 배치
- **레이아웃 관련**: `components/layout/`
- **네비게이션 관련**: `components/navigation/`

---

## 3. 코드 표준

### 파일 네이밍 규칙

| 대상       | 규칙               | 올바른 예          | 잘못된 예                             |
| ---------- | ------------------ | ------------------ | ------------------------------------- |
| 파일명     | kebab-case         | `user-profile.tsx` | `userProfile.tsx`, `user_profile.tsx` |
| 폴더명     | 소문자, kebab-case | `api-routes/`      | `ApiRoutes/`, `api_routes/`           |
| 컴포넌트명 | PascalCase         | `UserProfile`      | `userProfile`, `user_profile`         |

### Import 규칙

**순서 (자동 정렬되나 수동 작성 시 준수):**

1. 외부 라이브러리 (react, next)
2. 내부 라이브러리 (@/ 경로)
3. 상대 경로 (최소화)

```typescript
// ✅ 올바른 예
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ 금지
import { Button } from '../../../components/ui/button'
```

### 경로 별칭 (필수 사용)

| 별칭           | 실제 경로           |
| -------------- | ------------------- |
| `@/components` | `src/components`    |
| `@/lib`        | `src/lib`           |
| `@/hooks`      | `src/hooks`         |
| `@/ui`         | `src/components/ui` |

### Export 규칙

- **Named export 권장**: `export function ComponentName() {}`
- **Default export**: 페이지 컴포넌트에만 사용
- **혼재 사용 금지**: 같은 파일에서 named + default 동시 export 지양

---

## 4. 기능 구현 표준

### Server Components 우선 원칙

```typescript
// ✅ 기본: Server Component
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ 클라이언트 필요 시에만 'use client' 사용
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(!state)}>Toggle</button>
}
```

### Next.js 15 async params 처리 (필수)

```typescript
// ✅ 올바른 방법 (Next.js 15.5.3)
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const query = await searchParams
  // ...
}

// ❌ 금지 (deprecated)
export default function Page({ params }: { params: { slug: string } }) {
  // 동기식 접근 금지
}
```

### 폼 처리 패턴

- **React Hook Form + Zod** 조합 사용
- **Server Actions** 활용 권장
- 상세 가이드: `@/docs/guides/forms-react-hook-form.md` 참조

---

## 5. 프레임워크/라이브러리 사용 표준

### Next.js 15.5.3

- **App Router 전용**: Pages Router 사용 금지
- **Turbopack 사용**: `npm run dev` 시 자동 적용
- **Streaming + Suspense** 적극 활용

### shadcn/ui

- **새 컴포넌트 추가**: `npx shadcn@latest add [component-name]`
- **스타일**: new-york style 적용됨
- **커스터마이징**: 기존 컴포넌트 확장, 처음부터 새로 만들기 지양

### TailwindCSS v4

- **cn() 함수 필수 사용**: 조건부 클래스 조합 시
- **시맨틱 색상 변수 사용**: `bg-background`, `text-foreground`
- **하드코딩 색상 금지**: `bg-white`, `text-black` 등

```typescript
// ✅ 올바른 예
import { cn } from '@/lib/utils'

<div className={cn(
  "flex items-center p-4",
  isActive && "bg-primary text-primary-foreground",
  className
)}>
```

### 아이콘

- **Lucide React 사용**: `import { IconName } from 'lucide-react'`

---

## 6. 워크플로우 표준

### 필수 검증 명령어

```bash
# 통합 검사 (typecheck + lint + format)
npm run check-all

# 빌드 검증
npm run build
```

### 개발 명령어

| 명령어              | 용도                       |
| ------------------- | -------------------------- |
| `npm run dev`       | 개발 서버 실행 (Turbopack) |
| `npm run build`     | 프로덕션 빌드              |
| `npm run lint`      | ESLint 검사                |
| `npm run lint:fix`  | ESLint 자동 수정           |
| `npm run format`    | Prettier 포맷팅            |
| `npm run typecheck` | TypeScript 타입 검사       |

### 작업 완료 체크리스트

1. `npm run check-all` 통과 확인
2. `npm run build` 성공 확인
3. 관련 파일 동시 수정 여부 확인

---

## 7. 핵심 파일 상호작용 표준

### 동시 수정이 필요한 파일 조합

| 작업                 | 확인/수정 필요 파일                             |
| -------------------- | ----------------------------------------------- |
| 전역 레이아웃 변경   | `src/app/layout.tsx`, `src/app/globals.css`     |
| 새 페이지 추가       | `src/app/[route]/page.tsx`, 네비게이션 컴포넌트 |
| 타입 정의 추가       | `src/lib/types/`, 관련 컴포넌트                 |
| shadcn 컴포넌트 추가 | `src/components/ui/`, `components.json` (자동)  |
| 환경변수 추가        | `.env.local`, `src/lib/env.ts`                  |

### 참조 문서

| 작업 유형      | 참조 문서                                |
| -------------- | ---------------------------------------- |
| 페이지 구조    | `@/docs/guides/project-structure.md`     |
| 컴포넌트 패턴  | `@/docs/guides/component-patterns.md`    |
| 스타일링       | `@/docs/guides/styling-guide.md`         |
| Next.js 규칙   | `@/docs/guides/nextjs-15.md`             |
| 폼 처리        | `@/docs/guides/forms-react-hook-form.md` |
| 기능 요구사항  | `@/docs/PRD.md`                          |
| 개발 진행 상황 | `@/docs/ROADMAP.md`                      |

---

## 8. AI 의사결정 표준

### 컴포넌트 배치 결정 트리

```
새 컴포넌트 생성 시:
├── shadcn/ui에 해당 컴포넌트 존재?
│   ├── Yes → `npx shadcn@latest add [name]` 사용
│   └── No → 계속
├── 순수 UI (비즈니스 로직 없음)?
│   ├── Yes → `components/ui/` 배치
│   └── No → 계속
├── 레이아웃 관련 (header, footer, container)?
│   ├── Yes → `components/layout/` 배치
│   └── No → 계속
├── 네비게이션 관련 (메뉴, 페이지네이션)?
│   ├── Yes → `components/navigation/` 배치
│   └── No → 계속
├── 페이지 섹션 (hero, features)?
│   ├── Yes → `components/sections/` 배치
│   └── No → 계속
├── 특정 페이지 전용?
│   ├── Yes → 해당 페이지 폴더 내 배치
│   └── No → `components/` 루트에 배치
```

### 'use client' 사용 판단

```
클라이언트 컴포넌트 필요 여부:
├── useState, useEffect 등 Hook 사용?
│   ├── Yes → 'use client' 필요
│   └── No → 계속
├── onClick, onChange 등 이벤트 핸들러 사용?
│   ├── Yes → 'use client' 필요
│   └── No → 계속
├── 브라우저 API 사용 (localStorage, window)?
│   ├── Yes → 'use client' 필요
│   └── No → Server Component 유지
```

### 우선순위 결정 기준

1. **기존 패턴 우선**: 프로젝트 내 유사 코드 패턴 따르기
2. **shadcn/ui 우선**: 새 UI 컴포넌트는 shadcn 확인 후 추가
3. **Server Component 우선**: 'use client' 최소화
4. **가이드 문서 참조**: 모호한 경우 `docs/guides/` 참조

---

## 9. 금지 행위

### 아키텍처 금지사항

| 금지 항목                              | 이유                      |
| -------------------------------------- | ------------------------- |
| Pages Router 사용                      | App Router 전용 프로젝트  |
| `getServerSideProps`, `getStaticProps` | App Router에서 deprecated |
| `pages/` 폴더 생성                     | App Router 전용           |

### 코드 작성 금지사항

| 금지 항목                    | 대안                          |
| ---------------------------- | ----------------------------- |
| 상대 경로 import (`../../`)  | 경로 별칭 사용 (`@/`)         |
| 인라인 스타일 (`style={{}}`) | TailwindCSS 클래스 사용       |
| 하드코딩 색상 (`bg-white`)   | 시맨틱 변수 (`bg-background`) |
| 불필요한 'use client'        | Server Component 유지         |
| snake_case 파일명            | kebab-case 사용               |
| 동기식 params 접근           | `await params` 사용           |

### 스타일링 금지사항

```typescript
// ❌ 금지
<div style={{ padding: '16px' }}>
<div className="bg-white text-black">
<div className={`base ${condition ? 'active' : ''}`}>

// ✅ 올바른 방법
<div className="p-4">
<div className="bg-background text-foreground">
<div className={cn("base", condition && "active")}>
```

### 파일 크기 제한

- 단일 파일: **300줄 이하** 권장
- 300줄 초과 시 분할 고려

---

## 10. 예시 코드

### Server Component + Data Fetching

```typescript
// src/app/til/[slug]/page.tsx
export default async function TilDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const til = await getTilBySlug(slug)

  if (!til) {
    notFound()
  }

  return (
    <article>
      <h1>{til.title}</h1>
      <NotionBlockRenderer blocks={til.blocks} />
    </article>
  )
}
```

### Client Component with Form

```typescript
// src/components/search-form.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <Button type="submit">검색</Button>
    </form>
  )
}
```

### Layout Component

```typescript
// src/components/layout/container.tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
```

---

## 11. 빠른 참조

### 자주 사용하는 명령어

```bash
npm run dev           # 개발 서버
npm run check-all     # 전체 검사
npm run build         # 빌드
npx shadcn@latest add button  # 컴포넌트 추가
```

### 자주 사용하는 Import

```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
```

### TailwindCSS 시맨틱 색상

| 변수                      | 용도                |
| ------------------------- | ------------------- |
| `bg-background`           | 기본 배경           |
| `text-foreground`         | 기본 텍스트         |
| `bg-primary`              | 주요 색상 배경      |
| `text-primary-foreground` | 주요 색상 위 텍스트 |
| `text-muted-foreground`   | 보조 텍스트         |
| `border-border`           | 테두리 색상         |

---

_이 문서는 AI Agent가 TIL Garden 프로젝트를 개발할 때 따라야 할 규칙을 정의합니다._
