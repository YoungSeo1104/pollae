# Pollae (폴래) — Claude Code 가이드

> 일정 조율 투표 서비스 · 1020 타겟 · 모바일 퍼스트 · jellyPeach 테마
> **작업 전 반드시 이 파일을 읽고, 필요한 섹션만 골라 참조하세요.**

---

## 📋 목차 — 작업 유형별 빠른 참조

| 작업 유형 | 읽어야 할 섹션 |
|---|---|
| 새 컴포넌트 | §3 디렉토리 · §5 디자인토큰 · §6 컨벤션 |
| DB 쿼리 / API | §4 타입 · §7 Supabase · §9 비즈니스로직 |
| 훅 작성 / 수정 | §4 타입 · §8 훅API · §6 컨벤션 |
| 투표 UI | §5 디자인토큰 · §8 훅API · §9 비즈니스로직 |
| 알림 기능 | §10 알림 |
| 디자인 참조 | §5 디자인토큰 → `POLLAE_DESIGN_GUIDE.md` |
| 개발 순서 확인 | → `PLAN.md` |
| 맥락·결정사항 | → `CONTEXT.md` |
| 빌드 / 실행 | §11 커맨드 |
| 안 되는 것 | §12 금지사항 · §13 Git규칙 |
| 커밋/PR 전 | §13 Git규칙 · §14 커밋전체크 |

| § | 섹션 | 핵심 키워드 |
|---|---|---|
| 1 | [프로젝트 개요](#1-프로젝트-개요) | 서비스 설명, 핵심 UX, 제약 |
| 2 | [기술 스택](#2-기술-스택) | Next.js 16, React 19, Supabase, React Query, Zustand, Vercel |
| 3 | [디렉토리 구조](#3-디렉토리-구조) | 폴더, 파일 위치, app, components, hooks, lib |
| 4 | [타입 정의](#4-타입-정의) | TEvent, TSlot, TParticipant, TVote, TVoteKind |
| 5 | [디자인 토큰](#5-디자인-토큰) | 색상, 이모지, 컬러변수, jellyPeach, VOTE_CONFIG |
| 6 | [코딩 컨벤션](#6-코딩-컨벤션) | 네이밍, PascalCase, 서버·클라이언트 컴포넌트 |
| 7 | [Supabase 규칙](#7-supabase-규칙) | 쿼리, createClient, RLS, 클라이언트 분리 |
| 8 | [핵심 훅 API](#8-핵심-훅-api) | useVote, useGuestToken, useEventDeadline, useEvent |
| 9 | [비즈니스 로직](#9-비즈니스-로직) | 30개 제한, 중복 감지, 자동 확정, 공개/비공개 |
| 10 | [알림 규칙](#10-알림-규칙) | Resend, 웹푸시, 발송 시점 |
| 11 | [커맨드](#11-커맨드) | dev, build, type-check, supabase gen |
| 12 | [금지 사항](#12-금지-사항) | any, useEffect 페칭, 하드코딩, console.log |
| 13 | [Git 규칙](#13-git-규칙) | 커밋, PR, AI 금지, Co-Authored-By |
| 14 | [커밋 전 필수 체크](#14-커밋-전-필수-체크) | TypeScript, ESLint, 보안, npm audit |

---

## 1. 프로젝트 개요

링크 하나로 날짜 투표를 만들고 공유하는 서비스.
호스트(로그인) → 이벤트 생성 → 링크 공유 → 게스트(이름만 입력) 투표.
핵심 UX: 카카오톡 링크 열자마자 회원가입 없이 바로 투표 가능.

**제약**
- 투표 슬롯 최대 30개 (날짜 × 시간 합산)
- 게스트는 로그인 없음 → 브라우저 토큰으로 식별
- 투표 완료 버튼 = 제출 개념 (임시저장 아님)
- 마감 전까지 수정 가능 (같은 기기)

---

## 2. 기술 스택

| 영역 | 기술 | 버전 | 비고 |
|---|---|---|---|
| 프레임워크 | Next.js | 16 | App Router 전용, pages/ 금지 · `cookies()` async |
| 런타임 | React | 19 | Server Components |
| 언어 | TypeScript | 5 | strict 모드 |
| 스타일 | Tailwind CSS | 4 | CSS-first(@theme), 인라인 style 최소화 |
| 서버 상태 | TanStack Query | 5 | useEffect 페칭 금지 |
| 클라이언트 상태 | Zustand | 5 | |
| 패키지 매니저 | pnpm | — | `pnpm-lock.yaml` |
| 백엔드/DB | Supabase | latest | DB + Auth + Realtime + Storage |
| 이메일 알림 | Resend | latest | |
| 배포 | Vercel | — | git push → 자동 배포 |
| 폰트 | Pretendard | — | 한글 최적화 |

---

## 3. 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 글로벌 스타일)
│   ├── page.tsx                # 랜딩
│   ├── (auth)/login/page.tsx   # 호스트 로그인
│   ├── (host)/
│   │   ├── dashboard/page.tsx  # 호스트 대시보드
│   │   ├── create/page.tsx     # 이벤트 생성 (3단계)
│   │   └── manage/[id]/page.tsx
│   ├── v/[code]/page.tsx       # 투표 페이지 (게스트 접근)
│   └── api/
│       ├── vote/route.ts       # 투표 제출
│       ├── events/route.ts     # 이벤트 CRUD
│       └── notify/route.ts     # 알림 트리거
│
├── components/
│   ├── ui/                     # Atoms
│   │   ├── PrimaryBtn.tsx
│   │   ├── Input.tsx
│   │   ├── Toggle.tsx
│   │   ├── Chip.tsx
│   │   └── Avatar.tsx
│   ├── vote/                   # 투표 컴포넌트
│   │   ├── VoteButton.tsx      # 👍🤔👎
│   │   ├── SlotRow.tsx         # 시간 슬롯 행
│   │   ├── DateGroup.tsx       # 날짜별 묶음
│   │   ├── ParticipantCard.tsx
│   │   └── ResultBar.tsx       # 스택드 바
│   ├── layout/
│   │   ├── NavBar.tsx
│   │   └── PageWrapper.tsx
│   └── host/
│       ├── EventCard.tsx
│       └── ManageRow.tsx
│
├── hooks/                      # → hooks/index.md 참조
│   ├── useVote.ts
│   ├── useGuestToken.ts
│   ├── useEventDeadline.ts
│   ├── useEvent.ts
│   └── useHostGuard.ts
│
├── lib/
│   ├── supabase.ts             # 클라이언트용
│   ├── supabase-server.ts      # 서버 컴포넌트용
│   ├── theme.ts                # COLORS, VOTE_CONFIG 상수
│   ├── vote.ts                 # 투표 DB 쿼리
│   ├── events.ts               # 이벤트 DB 쿼리
│   ├── notify.ts               # 알림 발송
│   └── utils.ts                # formatDate, formatRemaining
│
├── types/
│   ├── database.ts             # Supabase 자동 생성
│   └── index.ts                # 앱 레벨 타입
│
└── styles/globals.css

design/                         # ← 클로드 디자인 산출물
├── Pollae_Prototype.html       # 인터랙티브 프로토타입
├── Pollae_Full_Screens.html    # 전체 화면 하이파이
├── Pollae_Vote.html            # 투표 페이지 단독
├── Pollae_Storybook.html       # 디자인 시스템 (JSX 필요)
├── Pollae_Storybook_Standalone.html  # 단독 실행 버전
├── cute-vote.jsx               # 투표 페이지 컴포넌트
├── cute-create.jsx             # 생성/랜딩 + NavBar, PrimaryBtn
├── cute-result.jsx             # 결과/대시보드
├── cute-auth.jsx               # 로그인/게스트충돌/호스트관리
├── cute-states.jsx             # 빈상태/로딩/에러
├── cute-themes.jsx             # jellyPeach 테마 토큰
├── cute-chars.jsx              # CuteAvatar, 이모지 59종
└── demo-users.jsx              # 데모 유저 데이터
```

> **디자인 → 코드 변환 시**: `design/` 폴더의 JSX 파일을 참조해서
> `src/components/` 로 포팅. `cute-themes.jsx`의 토큰 값이 `lib/theme.ts`와 일치해야 함.

---

## 4. 타입 정의

```typescript
// types/index.ts — 반드시 이 타입 사용, 임의 생성 금지

type TVoteKind   = 'yes' | 'maybe' | 'no'
type TEventStatus = 'voting' | 'closed' | 'confirmed'
type TPollType   = 'schedule' | 'place' | 'custom'

type TEvent = {
  id: string
  host_id: string
  title: string
  description: string | null
  created_at: string
}

// Poll — 투표 라운드 (이벤트당 1개 이상)
// schedule: 필수 (첫 번째), place/custom: 선택
type TPoll = {
  id: string
  event_id: string
  poll_type: TPollType           // 'schedule' | 'place' | 'custom'
  title: string                  // "일정", "장소", 또는 커스텀 제목
  status: TEventStatus           // 'voting' | 'closed' | 'confirmed'
  anonymous_vote: boolean        // true = 비공개 (숫자만)
  vote_deadline: string | null   // ISO 8601, null = 상시
  confirmed_item_id: string | null
  confirmed_at: string | null
  order: number                  // 표시 순서
  created_at: string
}

// PollItem — 투표 항목
// schedule: 날짜+시간 구조 / place·custom: 텍스트 라벨
type TPollItem = {
  id: string
  poll_id: string
  label: string                  // 항목 이름 (모든 타입 공통)
  description: string | null     // 부가 설명 (선택)
  slot_date: string | null       // schedule 전용 YYYY-MM-DD
  slot_time: string | null       // schedule 전용 HH:MM
  slot_time_end: string | null   // schedule 전용 HH:MM
  order: number
  created_at: string
}

type TParticipant = {
  id: string
  event_id: string
  user_id: string | null         // 게스트는 null
  name: string
  guest_token: string | null
  has_voted: boolean             // 이벤트 내 모든 필수 Poll 응답 여부
  invited_at: string
}

type TVote = {
  id: string
  participant_id: string
  poll_item_id: string           // 구 slot_id → poll_item_id
  answer: TVoteKind
  voted_at: string
}

type TPollItemWithVotes = TPollItem & {
  votes: TVote[]
  my_vote: TVoteKind | null
}

type TPollWithItems = TPoll & {
  items: TPollItemWithVotes[]
}
```

---

## 5. 디자인 토큰

> 상세 디자인 참조: `POLLAE_DESIGN_GUIDE.md`
> 디자인 원본: `design/cute-themes.jsx` (jellyPeach 객체)

```typescript
// lib/theme.ts — 색상은 반드시 이 파일에서 import

export const COLORS = {
  primary:     '#FF7AA8',   // 메인 핑크
  primaryDeep: '#E0588B',   // 호버/눌림
  primarySoft: '#FFE0EC',   // 배경 틴트
  pop:         '#C8A8E9',   // 라벤더 포인트
  accent:      '#FFB088',   // 피치 보조
  yes:         '#FF7AA8',   // 참석 ○
  maybe:       '#FFA962',   // 미정 △
  no:          '#9580C0',   // 불참 ×
  yesSoft:     '#FFE0EC',
  maybeSoft:   '#FFE5D0',
  noSoft:      '#EBE5F5',
  bg:          '#FFF5F0',
  surface:     '#FFFFFF',
  border:      '#FFE5DC',
  divider:     '#FFEEE5',
  ink:         '#2A1A24',
  inkSoft:     '#5C4954',
  inkMute:     '#9A8590',
  inkFaint:    '#C7B5BE',
} as const

export const VOTE_CONFIG = {
  yes:   { emoji: '👍', label: '참석', color: COLORS.yes,   soft: COLORS.yesSoft },
  maybe: { emoji: '🤔', label: '미정', color: COLORS.maybe, soft: COLORS.maybeSoft },
  no:    { emoji: '👎', label: '불참', color: COLORS.no,    soft: COLORS.noSoft },
} as const

export const RADIUS = {
  sm: '8px', md: '12px', lg: '16px', xl: '18px', '2xl': '22px', pill: '99px',
} as const

// 히어로 그라데이션
export const GRAD_HERO = 'linear-gradient(135deg, #FF7AA8 0%, #C8A8E9 100%)'
export const GRAD_BG   = 'radial-gradient(ellipse at top, #FFE0E8 0%, transparent 50%), #FFF5F0'
```

---

## 6. 코딩 컨벤션

```
컴포넌트:  PascalCase  → VoteButton.tsx
훅:        use 접두사  → useVote.ts
유틸:      camelCase   → formatDate.ts
타입:      T 접두사    → TEvent, TVoteKind
상수:      UPPER_SNAKE → VOTE_CONFIG, MAX_SLOTS
```

```typescript
// 서버 컴포넌트 기본 — 클라이언트 필요시만 'use client'
'use client'

import type { TEvent } from '@/types'

type Props = { event: TEvent; onSubmit: () => void }

export function VoteButton({ event, onSubmit }: Props) { /* ... */ }
```

**서버 액션 vs API Route**
- 서버 액션: 폼 제출, 단순 CRUD
- API Route: 웹훅, 외부 서비스, Realtime 트리거

---

## 7. Supabase 규칙

```typescript
// ✅ 항상 lib/ 통해서
import { createServerClient } from '@/lib/supabase-server'
const supabase = createServerClient()
const { data, error } = await supabase
  .from('time_slots')
  .select('*, votes(*)')
  .eq('event_id', eventId)
if (error) throw new Error(error.message)

// ❌ 직접 생성 절대 금지
import { createClient } from '@supabase/supabase-js'  // 금지
```

| 상황 | 사용 파일 |
|---|---|
| 서버 컴포넌트, API Route, 서버 액션 | `lib/supabase-server.ts` |
| `use client` 컴포넌트, 훅 | `lib/supabase.ts` |

---

## 8. 핵심 훅 API

> 상세: `hooks/index.md`

```typescript
// useVote — 투표 선택/제출 핵심
const { selections, submitted, pick, submit, canSubmit, isSubmitting } = useVote(eventId)

// useGuestToken — 브라우저 토큰
const [token, clearToken] = useGuestToken()

// useEventDeadline — 마감 타이머
const { remaining, isExpired, isUrgent } = useEventDeadline(deadline)

// useEvent — 이벤트 데이터
const { event, slots, participants, isLoading, error } = useEvent(code)

// useHostGuard — 호스트 인증
const { user, isLoading } = useHostGuard()
```

---

## 9. 비즈니스 로직

```typescript
const MAX_SLOTS = 30  // 슬롯 최대 30개 (날짜×시간 합산)

// 게스트 중복 감지
const isDuplicate = existing && existing.guest_token !== guestToken

// 투표 자동 확정 (마감/수동종료 후)
// yes 가장 많은 슬롯 확정 → 동점이면 status='closed' 유지 + 호스트 알림

// 공개/비공개
// anonymous_vote=false: 이름 + ○△× 표시 (참여자 전원)
// anonymous_vote=true:  숫자 집계만 (호스트는 항상 전체 열람)
```

---

## 10. 알림 규칙

```
채널: 이메일(Resend) + 웹푸시(PWA)  →  카카오 알림톡은 유료화 이후
발송 시점:
  - 마감 N분 전    → 미투표자 리마인더
  - 날짜 확정 시   → 전체 참여자
  - 동점 발생 시   → 호스트만
  - 게스트 중복 시 → 호스트만
게스트는 이메일 없음 → 링크 재접속으로만 확인 가능
```

---

## 11. 커맨드

```bash
pnpm dev
pnpm build
pnpm type-check
pnpm lint
npx supabase gen types typescript --local > src/types/database.ts
```

---

## 12. 금지 사항

```
❌ any 타입
❌ useEffect에서 서버 데이터 페칭 (React Query 사용)
❌ supabase 직접 생성 (lib/ 통해서)
❌ service_role key 클라이언트 노출
❌ pages/ 디렉토리 사용
❌ console.log 커밋
❌ 색상 인라인 하드코딩 (COLORS 상수 사용)
❌ 슬롯 30개 제한 없이 추가
❌ 투표 결과 클라이언트 단독 계산 (서버 집계 기준)
```

---

*관련 문서: `CONTEXT.md` · `PLAN.md` · `SKILLS.md` · `hooks/index.md` · `POLLAE_DESIGN_GUIDE.md`*

---

## 13. Git 규칙

### 커밋 & PR — AI 금지 항목

```
❌ AI가 직접 커밋 실행 금지 (git commit)
❌ AI가 직접 PR 생성 금지 (gh pr create)
❌ 커밋 메시지에 Co-Authored-By 라인 포함 금지
❌ --author 플래그로 AI 표기 금지

✅ AI는 커밋 메시지 문구만 제안
✅ 실제 커밋·PR은 사람이 직접 실행
```

**Co-Authored-By 제거 확인**
```bash
# 커밋 전 메시지 확인
git commit -m "feat: 투표 페이지 구현"
# Co-Authored-By: 라인이 절대 들어가면 안 됨

# 이미 들어간 경우 수정
git commit --amend
```

---

## 14. 커밋 전 필수 체크

AI가 코드 작성 완료 후 **반드시 아래 순서대로 실행하고 결과를 확인**하세요.
에러가 하나라도 있으면 커밋하지 말고 수정 후 재확인.

### 체크 순서

```bash
# 1. TypeScript 에러 체크
pnpm type-check
# 에러 0개여야 커밋 가능

# 2. ESLint 에러 체크
pnpm lint
# error 0개여야 커밋 가능 (warning은 허용)

# 3. 보안 취약점 체크
pnpm audit --audit-level=high
# high 이상 0개여야 커밋 가능

# 4. 빌드 확인 (선택 — PR 전 필수)
pnpm build
# 빌드 에러 0개
```

### package.json 스크립트 설정

```json
{
  "scripts": {
    "dev":        "next dev",
    "build":      "next build",
    "start":      "next start",
    "type-check": "tsc --noEmit",
    "lint":       "eslint",
    "lint:fix":   "eslint --fix",
    "check-all":  "pnpm type-check && pnpm lint && pnpm audit --audit-level=high"
  }
}
```

> `pnpm check-all` 한 번으로 3가지 동시 체크 가능
> Next 16 flat config는 `next lint`가 아닌 `eslint` 직접 실행.

### 보안 규칙

```
❌ .env* 파일 커밋 금지 (.gitignore 확인)
❌ API 키, Secret 하드코딩 금지
❌ service_role key 클라이언트 코드 노출 금지
❌ npm audit high/critical 있는 상태로 커밋 금지
✅ 민감 정보는 항상 환경변수로
✅ 환경변수 목록은 .env.example에 키 이름만 기록
```

### PR 전 최종 체크리스트

```
□ pnpm check-all 통과 (TS + Lint + 보안)
□ pnpm build 성공
□ .env* 파일 미포함 확인 (git status)
□ console.log 미포함 확인
□ Co-Authored-By 라인 없음 확인
□ 커밋 메시지 직접 작성
```
