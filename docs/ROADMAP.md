# TIL Garden 개발 로드맵

Notion을 CMS로 활용하여 개발자가 학습 내용을 기록하고 공유하는 마이크로 블로그

## 개요

**TIL Garden**은 개발자를 위한 TIL(Today I Learned) 블로그 플랫폼으로 다음 기능을 제공합니다:

- **Notion CMS 연동**: Notion 데이터베이스를 콘텐츠 소스로 활용
- **카테고리 기반 탐색**: AWS, Database, DevOps, AI, Frontend, Backend 카테고리별 필터링
- **Notion 블록 렌더링**: 코드 블록, 이미지, 리스트 등 다양한 Notion 블록 지원
- **반응형 디자인**: 모바일/태블릿/데스크톱 모든 디바이스 지원

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함**

  <details>
  <summary>테스트 체크리스트 템플릿 (클릭하여 펼치기)</summary>

  ```markdown
  ## 테스트 체크리스트 (Playwright MCP)

  ### 사전 조건
  - [ ] 개발 서버 실행 (`npm run dev`)
  - [ ] 테스트 데이터 준비 완료

  ### 기능 테스트
  - [ ] [기능 1]: [예상 결과 설명]
  - [ ] [기능 2]: [예상 결과 설명]

  ### API 연동 테스트
  - [ ] API 호출 성공 시 올바른 데이터 표시
  - [ ] API 응답 지연 시 로딩 상태 표시
  - [ ] API 오류 시 에러 메시지 표시

  ### 에러 핸들링 테스트
  - [ ] 네트워크 오류 시 적절한 에러 메시지 표시
  - [ ] 잘못된 입력 시 유효성 검증 동작
  - [ ] 빈 데이터 시 빈 상태(empty state) 표시

  ### E2E 시나리오
  - [ ] 전체 사용자 플로우 테스트: [시나리오 설명]

  ### 테스트 결과
  - 테스트 일시:
  - 테스트 결과: Pass / Fail
  - 비고:
  ```

  </details>

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **🔴 [필수] 구현 완료 후 즉시 Playwright MCP 테스트 수행**
  - 개발 서버 실행 상태 확인 (`npm run dev`)
  - `browser_navigate`로 해당 페이지 접근
  - `browser_snapshot`으로 현재 상태 확인
  - 사용자 시나리오에 따른 액션 테스트 (`browser_click`, `browser_type`)
  - `browser_console_messages`로 에러 확인
  - 예상 결과와 실제 결과 비교 검증
- **🔴 테스트 통과 전까지 해당 작업은 미완료 상태로 유지**
- 테스트 결과를 작업 파일의 "테스트 체크리스트" 섹션에 기록
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: 프로젝트 초기화 및 정리** ✅ - 완료
  - ✅ 데모 파일 정리
  - ✅ 기본 레이아웃 설정
  - ✅ 네비게이션 업데이트
  - ✅ 문서 정리 (README.md, CLAUDE.md)

- **Task 002: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - ✅ Next.js App Router 기반 전체 라우트 구조 생성
  - ✅ 메인 페이지 (`/`), 카테고리 페이지 (`/category/[name]`), TIL 상세 페이지 (`/til/[slug]`), About 페이지 (`/about`) 페이지 생성
  - ✅ 404 에러 페이지 (`not-found.tsx`) 생성
  - ✅ 공통 레이아웃 컴포넌트 골격 확인 (Header, Footer)

- **Task 003: 타입 정의 및 인터페이스 설계** ✅ - 완료
  - ✅ TIL 데이터 TypeScript 인터페이스 정의 (`types/til.ts`)
  - ✅ Notion 블록 타입 정의 (`types/notion.ts`)
  - ✅ API 응답 타입 정의 (`types/api.ts`)
  - ✅ 카테고리 상수 및 타입 정의 (`types/category.ts`)
  - ✅ 타입 통합 내보내기 (`types/index.ts`)

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

- **Task 004: 공통 컴포넌트 라이브러리 구현** ✅ - 완료
  - ✅ shadcn/ui 기반 공통 컴포넌트 설치 (Button, Card, Badge, Skeleton 등)
  - ✅ TIL 카드 컴포넌트 구현 (제목, 날짜, 카테고리, 태그 표시)
  - ✅ 카테고리 필터 버튼 컴포넌트 구현
  - ✅ 페이지네이션 컴포넌트 구현
  - ✅ 로딩 스켈레톤 컴포넌트 구현
  - ✅ 더미 데이터 생성 유틸리티 작성 (`lib/mock-data.ts`)

- **Task 005: 메인 페이지 UI 구현** ✅ - 완료
  - ✅ 페이지 타이틀/헤더 영역
  - ✅ TIL 카드 그리드/리스트 레이아웃
  - ✅ 카테고리 필터 UI 배치
  - ✅ 페이지네이션 UI 배치
  - ✅ 더미 데이터로 전체 UI 검증

- **Task 006: 카테고리 페이지 UI 구현** ✅ - 완료
  - ✅ 카테고리 헤더 (현재 카테고리 표시)
  - ✅ TIL 카드 리스트 (메인과 동일 형식)
  - ✅ 페이지네이션 UI
  - ✅ 더미 데이터로 필터링 UI 검증

- **Task 007: TIL 상세 페이지 UI 구현** ✅ - 완료
  - ✅ 메타 정보 헤더 (제목, 작성일, 카테고리, 태그)
  - ✅ Notion 블록 렌더러 컴포넌트 구현 (더미 데이터용)
    - ✅ 제목 블록 (heading_1, heading_2, heading_3)
    - ✅ 텍스트 블록 (paragraph)
    - ✅ 코드 블록 (code) - 구문 강조 포함
    - ✅ 리스트 블록 (bulleted_list_item, numbered_list_item)
    - ✅ 인용 블록 (quote)
    - ✅ 이미지 블록 (image)
    - ✅ 구분선 (divider)
  - ✅ 참고 링크 섹션
  - ✅ 네비게이션 (뒤로가기, 홈, 카테고리 이동)

- **Task 008: About 페이지 UI 구현** ✅ - 완료
  - ✅ 프로젝트 소개 섹션
  - ✅ 기술 스택 소개 섹션
  - ✅ Notion CMS 활용 방법 설명

- **Task 009: 반응형 디자인 및 접근성 검증** ✅ - 완료
  - ✅ 모바일 (< 640px) 레이아웃 최적화
  - ✅ 태블릿 (640px ~ 1024px) 레이아웃 최적화
  - ✅ 데스크톱 (> 1024px) 레이아웃 최적화
  - ✅ 키보드 네비게이션 및 접근성 검증

### Phase 3: 핵심 기능 구현 ✅

- **Task 010: Notion API 클라이언트 설정** ✅ - 완료
  - ✅ `@notionhq/client` 패키지 설치 (v2.2.15)
  - ✅ Notion Client 초기화 (`lib/notion.ts`)
  - ✅ 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
  - ✅ API 에러 핸들링 유틸리티 (`handleNotionError`)

- **Task 011: TIL 목록 조회 API 구현** ✅ - 완료
  - ✅ Published 상태 TIL 목록 조회 함수 (`getTILList`)
  - ✅ 최신순 정렬 쿼리 구현 (등록일 기준 내림차순)
  - ✅ 카테고리별 필터링 쿼리 구현
  - ✅ 페이지네이션 쿼리 구현 (cursor 기반)
  - ✅ Notion 응답 → TypeScript 타입 변환 함수 (`transformNotionPageToTIL`)

- **Task 012: TIL 상세 조회 API 구현** ✅ - 완료
  - ✅ Slug 기반 개별 TIL 조회 함수 (`getTILBySlug`)
  - ✅ Notion Block API를 통한 본문 블록 조회 (`getPageBlocks`)
  - ✅ 블록 데이터 정규화 함수 (`transformBlock`) - 16개 블록 타입 지원

- **Task 013: 더미 데이터를 실제 API로 교체** ✅ - 완료
  - ✅ 메인 페이지 Notion API 연동 (`app/page.tsx`)
  - ✅ 카테고리 페이지 Notion API 연동 (`app/category/[name]/page.tsx`)
  - ✅ TIL 상세 페이지 Notion API 연동 (`app/til/[slug]/page.tsx`)
  - ✅ 로딩 상태 및 에러 상태 처리

- **Task 014: 캐싱 및 ISR 설정** ✅ - 완료
  - ✅ Next.js ISR(Incremental Static Regeneration) 설정
  - ✅ revalidate 시간 설정 (60초)
  - ✅ 정적 생성 경로 설정 (`generateStaticParams`)

- **Task 014-1: 핵심 기능 통합 테스트** ✅ - 완료
  - ✅ Playwright MCP를 사용한 전체 사용자 플로우 테스트
    - ✅ 메인 페이지 Notion 데이터 로딩 확인
    - ✅ 카테고리 필터링 동작 검증 (Database 카테고리)
    - ✅ TIL 상세 페이지 렌더링 검증 (/til/bb)
  - ✅ 에러 핸들링 및 엣지 케이스 테스트
    - ✅ 존재하지 않는 페이지 접근 시 404 처리
  - ✅ 콘솔 에러 없음 확인

### Phase 4: 고급 기능 및 최적화

- **Task 015: SEO 및 메타데이터 최적화**
  - 각 페이지별 메타태그 설정 (`generateMetadata`)
  - Open Graph 이미지 설정
  - 사이트맵 생성 (`sitemap.ts`)
  - robots.txt 설정

- **Task 016: 에러 처리 및 사용자 경험 개선**
  - 글로벌 에러 바운더리 (`error.tsx`)
  - Notion API 연결 실패 시 폴백 UI
  - 404 페이지 개선
  - 로딩 UI 개선 (`loading.tsx`)

- **Task 017: 성능 최적화**
  - 이미지 최적화 (next/image)
  - 폰트 최적화 (next/font)
  - 번들 사이즈 분석 및 최적화
  - Lighthouse 성능 점수 90점 이상 달성

- **Task 018: 배포 및 프로덕션 준비**
  - Vercel 프로젝트 설정
  - 환경 변수 설정 (Vercel Dashboard)
  - 프로덕션 빌드 테스트
  - 프로덕션 배포 및 검증
  - 모니터링 설정 (Vercel Analytics)

## MVP 성공 지표

### 기술적 목표

- Notion API 응답 시간 3초 이내
- Lighthouse 성능 점수 90점 이상
- 모든 화면 크기에서 정상 렌더링

### 사용자 경험 목표

- 메인 페이지 로딩 시간 2초 이내
- 카테고리 필터링 즉시 반영
- Notion 블록 렌더링 오류 0건

## 기술 스택 요약

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15.5.3 (App Router) |
| Runtime | React 19.1.0 + TypeScript 5 |
| Styling | TailwindCSS v4 + shadcn/ui (new-york) |
| CMS | Notion API (@notionhq/client) |
| Icons | Lucide React |
| Deployment | Vercel |

## 참고 자료

- [PRD 문서](./PRD.md)
- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
