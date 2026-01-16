# TIL Garden

Notion을 CMS로 활용한 개발자 학습 기록 마이크로 블로그입니다.

## 프로젝트 개요

**목적**: 학습 내용을 체계적으로 기록하고 공유
**사용자**: 학습 내용을 포트폴리오로 활용하려는 개발자

## 주요 페이지

- **메인 페이지** (`/`) - TIL 목록 + 카테고리 필터링
- **카테고리 페이지** (`/category/[name]`) - 카테고리별 TIL 필터링
- **TIL 상세 페이지** (`/til/[slug]`) - Notion 블록 렌더링
- **About 페이지** (`/about`) - 프로젝트 소개

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui
- **CMS**: Notion API (@notionhq/client)
- **Deployment**: Vercel

## 시작하기

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```bash
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

### 빌드

```bash
npm run build
npm run start
```

## Notion 데이터베이스 설정

자세한 설정 방법은 [PRD.md](./docs/PRD.md)의 "Notion 설정 가이드" 섹션을 참조하세요.

## 개발 상태

- [x] 기본 프로젝트 구조 설정
- [ ] Notion API 연동
- [ ] TIL 목록 및 상세 페이지 구현
- [ ] 카테고리 필터링 구현
- [ ] 페이지네이션 구현

## 개발 가이드

- [프로젝트 요구사항 (PRD)](./docs/PRD.md)
- [개발 로드맵](./docs/ROADMAP.md)
- [프로젝트 구조](./docs/guides/project-structure.md)
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [컴포넌트 패턴](./docs/guides/component-patterns.md)

## 라이선스

MIT License
