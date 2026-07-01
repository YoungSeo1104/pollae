vh# Pollae — 개발 계획서

> AI와 함께 순차적으로 진행하는 개발 로드맵.
> 각 Phase를 완료할 때마다 체크박스를 체크하세요.
> 새 대화 시작 시 이 파일로 현재 위치를 파악하세요.

---

## 📋 목차

| § | 내용 |
|---|---|
| 1 | [전체 Phase 요약](#1-전체-phase-요약) |
| 2 | [Phase 0 — 프로젝트 세팅](#2-phase-0--프로젝트-세팅) |
| 3 | [Phase 1 — DB 스키마 & 타입](#3-phase-1--db-스키마--타입) |
| 4 | [Phase 2 — 디자인 시스템 포팅](#4-phase-2--디자인-시스템-포팅) |
| 5 | [Phase 3 — 투표 페이지 (핵심)](#5-phase-3--투표-페이지-핵심) |
| 6 | [Phase 4 — 이벤트 생성 플로우](#6-phase-4--이벤트-생성-플로우) |
| 7 | [Phase 5 — 호스트 기능](#7-phase-5--호스트-기능) |
| 8 | [Phase 6 — 알림 시스템](#8-phase-6--알림-시스템) |
| 9 | [Phase 7 — 마감/확정 로직](#9-phase-7--마감확정-로직) |
| 10 | [Phase 8 — 마무리 & 배포](#10-phase-8--마무리--배포) |
| 11 | [AI 작업 지시 템플릿](#11-ai-작업-지시-템플릿) |

---

## 1. 전체 Phase 요약

```
Phase 0  프로젝트 세팅          🟡 거의 완료 (Supabase 실계정만 남음)
Phase 1  DB 스키마 & 타입        ⬜ 미시작
Phase 2  디자인 시스템 포팅       ⬜ 미시작
Phase 3  투표 페이지 (핵심)       ⬜ 미시작
Phase 4  이벤트 생성 플로우       ⬜ 미시작
Phase 5  호스트 기능             ⬜ 미시작
Phase 6  알림 시스템             ⬜ 미시작
Phase 7  마감/확정 로직           ⬜ 미시작
Phase 8  마무리 & 배포           ⬜ 미시작
```

> 완료 시 ⬜ → ✅ 로 변경

---

## 2. Phase 0 — 프로젝트 세팅

**목표**: 개발 환경 구성 완료, 빈 Next.js 앱이 로컬에서 실행됨

```
✅ Next.js 16 프로젝트 생성 (App Router, TypeScript, Tailwind 4)
⬜ Supabase 프로젝트 생성 + 환경변수 설정 (.env.example 키만 커밋 완료)
✅ Pretendard 폰트 설정 (layout.tsx <link>)
✅ src/lib/supabase.ts 작성 (클라이언트용, @supabase/ssr createBrowserClient)
✅ src/lib/supabase-server.ts 작성 (서버용, async cookies())
✅ src/lib/theme.ts 작성 (COLORS, VOTE_CONFIG)
✅ src/types/index.ts 작성 (TEvent, TPoll, TPollItem 등)
✅ app/providers.tsx (TanStack Query Provider)
✅ 깨진 훅 import 수정 (TSlotWithVotes→TPollItemWithVotes, @/lib/supabase)
✅ design/ 폴더에 클로드 디자인 파일 이동
✅ CLAUDE.md, CONTEXT.md, PLAN.md, SKILLS.md 프로젝트 루트에 배치
✅ pnpm dev / build 정상 실행 확인 (type-check·lint error 0)
```

**완료 기준**: `localhost:3000` 에서 기본 페이지 로딩
> 남은 항목: 실제 Supabase 프로젝트 생성 + `.env.local` 값 채우기(사용자 작업).

---

## 3. Phase 1 — DB 스키마 & 타입

**목표**: Supabase DB 구조 완성, TypeScript 타입 자동 생성

```
⬜ users 테이블 (Supabase Auth 연동)

⬜ events 테이블
    id, host_id, title, description, created_at

⬜ polls 테이블  ← 핵심 (구 time_slots 대체)
    id, event_id
    poll_type: 'schedule' | 'place' | 'custom'
    title                   -- "일정", "장소", 커스텀 제목
    status: 'voting' | 'closed' | 'confirmed'
    anonymous_vote: boolean
    vote_deadline: timestamptz (nullable)
    confirmed_item_id: uuid (nullable)
    confirmed_at: timestamptz (nullable)
    order: int              -- 표시 순서
    created_at

⬜ poll_items 테이블  ← 핵심 (구 time_slots 통합)
    id, poll_id
    label: text             -- 항목명 (모든 타입 공통)
    description: text (nullable)
    slot_date: date (nullable)       -- schedule 전용
    slot_time: time (nullable)       -- schedule 전용
    slot_time_end: time (nullable)   -- schedule 전용
    order: int
    created_at

⬜ event_participants 테이블
    id, event_id
    user_id: uuid (nullable)  -- 게스트는 null
    name, guest_token
    has_voted: boolean
    invited_at

⬜ votes 테이블
    id, participant_id
    poll_item_id: uuid        -- 구 slot_id → poll_item_id
    answer: 'yes' | 'maybe' | 'no'
    voted_at

⬜ notifications 테이블
    id, event_id, poll_id (nullable), user_id
    type, channel, is_sent, scheduled_at

⬜ RLS 정책 설정
    events/polls: 호스트만 수정/삭제, 링크 있으면 조회
    votes: 참여자 본인만 수정, 공개 poll은 전체 조회

⬜ CHECK 제약: poll_items 최대 30개 per poll
⬜ UNIQUE 제약: votes (participant_id, poll_item_id)
⬜ supabase gen types → src/types/database.ts
⬜ src/types/index.ts 와 database.ts 연결 확인
```

**완료 기준**: Supabase 대시보드에서 테이블 확인, 타입 파일 생성

---

## 4. Phase 2 — 디자인 시스템 포팅

**목표**: 클로드 디자인 JSX → Next.js 컴포넌트 변환

> 참조: `design/cute-create.jsx`, `design/cute-chars.jsx`

```
⬜ src/components/ui/PrimaryBtn.tsx
    primary / ghost / disabled 3가지 variant
    높이 54px, borderRadius 18px, 그라데이션 배경
⬜ src/components/ui/Input.tsx
    default / focused / with-avatar-prefix
    높이 52px, borderRadius 16px
⬜ src/components/ui/Toggle.tsx
    on/off 상태, 0.2s transition
⬜ src/components/ui/Chip.tsx
    status / crown / hot 3가지
⬜ src/components/ui/Avatar.tsx
    size: 28|36|44|56
    states: done / host(👑) / not-voted / ring
    stack overlap 지원
⬜ src/components/layout/NavBar.tsx
    height 44px, 뒤로가기 / 타이틀 / 우측 슬롯
⬜ src/components/layout/PageWrapper.tsx
    jellyPeach 배경 그라데이션 래퍼
⬜ 이모지 아바타 59종 상수 파일
    src/lib/avatars.ts (EMOJI_AVATARS 배열)
⬜ 스토리북 실행으로 디자인 확인
    design/Pollae_Storybook_Standalone.html 열어서 비교
```

**완료 기준**: 모든 기본 컴포넌트가 디자인 시스템과 시각적으로 일치

---

## 5. Phase 3 — 투표 페이지 (핵심)

**목표**: `/v/[code]` 게스트 투표 페이지 완성

> 참조: `design/cute-vote.jsx`, `design/Pollae_Vote.html`
> 훅: `hooks/useVote.ts` (pollId 기준), `hooks/useEvent.ts`, `hooks/useEventDeadline.ts`, `hooks/useGuestToken.ts`

```
⬜ src/hooks/useGuestToken.ts (완료 → 배치)
⬜ src/hooks/useEventDeadline.ts (완료 → 배치)
⬜ src/hooks/useEvent.ts (완료 → 배치)
⬜ src/hooks/useVote.ts (완료 → 배치)
⬜ src/app/api/events/[code]/route.ts
    이벤트 + 슬롯 + 참여자 + 투표 현황 조회
⬜ src/app/api/vote/route.ts
    게스트 투표 제출 / 수정 API
    중복 감지 → 409 응답으로 GuestConflict 처리
⬜ src/components/vote/VoteButton.tsx
    👍 🤔 👎 · active/inactive 상태
    버튼 아래 숫자 표시
⬜ src/components/vote/SlotRow.tsx
    시간 + 응답자수(좌) / 버튼+숫자(우)
⬜ src/components/vote/DateGroup.tsx
    날짜별 카드 묶음 (슬롯 여러 개 포함)
⬜ src/components/vote/ParticipantCard.tsx
    완료/미투표 그룹 · 아바타 그리드 · 더보기
⬜ src/app/v/[code]/page.tsx
    전체 투표 페이지 조합
    이름 입력 → 일정 선택 → 투표 완료 버튼
⬜ 이름 입력 필드 (* 필수 표시)
⬜ 마감 타이머 헤더 표시
⬜ 투표 현황 (슬롯별 ○N △N ×N 숫자)
⬜ 투표 완료 후 "참석 가장 많아요" 배지 표시
⬜ 마감된 이벤트 → 투표 버튼 비활성
⬜ GuestConflict 화면 (중복 감지 시)
⬜ 모바일 반응형 확인 (44px 터치 영역)
```

**완료 기준**: 링크 열면 투표 가능, 제출 후 현황 업데이트

---

## 6. Phase 4 — 이벤트 생성 플로우

**목표**: 호스트 로그인 + 3단계 이벤트 생성

> 참조: `design/cute-create.jsx` (CreateStep1~3, LandingScreen, InviteScreen)
> 훅: `hooks/useHostGuard.ts`

```
⬜ src/hooks/useHostGuard.ts (완료 → 배치)
⬜ Supabase Auth 소셜 로그인 설정
    1단계: 카카오 + 구글 (지금)
    2단계: 네이버 (배포 후 URL 생기면)
    3단계: 애플 (iOS 앱 출시 시, $99/년)
⬜ 카카오 개발자 콘솔 앱 등록
    https://developers.kakao.com
    Redirect URI: {SUPABASE_URL}/auth/v1/callback
⬜ 구글 Cloud Console OAuth 클라이언트 생성
    https://console.cloud.google.com
    Redirect URI: {SUPABASE_URL}/auth/v1/callback
⬜ Supabase 대시보드 → Auth → Providers 활성화
    카카오: REST API 키 + Secret 입력
    구글: Client ID + Secret 입력
⬜ src/app/(auth)/login/page.tsx
    카카오 로그인 버튼 (노란색 #FEE500)
    구글 로그인 버튼 (흰색)
    -- 네이버/애플은 UI만 준비, 비활성 상태로
⬜ src/app/page.tsx — 랜딩 페이지
    히어로 섹션, "투표 만들기" CTA
⬜ src/app/(host)/create/page.tsx
    Step 1: 이벤트 정보 (제목, 설명)
    Step 2: 일정 후보 추가 (날짜+시간, 최대 30개) ← schedule Poll
    Step 3: 옵션 (마감시간, 공개/비공개)
    Step 3 하단: [+ 장소 투표 추가] [+ 기타 투표 추가] 버튼 (선택)
⬜ src/components/host/SlotPicker.tsx
    날짜+시간 입력 UI
    슬롯 30개 제한 체크 + 경고
⬜ src/app/api/events/route.ts (POST)
    이벤트 + 슬롯 생성
    단축 코드 생성 (URL용)
⬜ src/app/(host)/create/invite/page.tsx
    링크 복사 / 카카오 공유 버튼
⬜ src/app/api/polls/route.ts (POST)
    연계 투표 생성 (place / custom)
    poll_type, title, items[] 받아서 저장
⬜ 연계 투표 추가 UI (확정 후 or 생성 시)
    PollTypeSelector → 항목 입력 → 저장
⬜ ProgressDots 컴포넌트 3단계 표시
```

**완료 기준**: 이벤트 생성 → 공유 링크 발급 → 링크로 투표 접근 가능

---

## 7. Phase 5 — 호스트 기능

**목표**: 호스트 대시보드 + 참여자 관리

> 참조: `design/cute-result.jsx` (DashboardScreen), `design/cute-auth.jsx` (HostManageScreen)

```
⬜ src/app/(host)/dashboard/page.tsx
    내 이벤트 목록 (진행중 / 마감됨)
    빈 상태 화면
⬜ src/components/host/EventCard.tsx
    이벤트 카드 (제목, 응답현황, 마감, 상태)
⬜ src/app/(host)/manage/[id]/page.tsx
    참여자 목록 (완료/미투표 구분)
    게스트 투표 삭제 버튼
    중복 의심 알림 표시
⬜ src/app/api/events/[id]/close/route.ts
    호스트 수동 종료 API
⬜ 수동 종료 버튼 UI (마감 전 표시)
⬜ 호스트도 투표 가능 (게스트와 동일한 투표 UI)
```

**완료 기준**: 대시보드에서 이벤트 관리, 참여자 삭제 가능

---

## 8. Phase 6 — 알림 시스템

**목표**: 이메일 리마인더 + 확정 알림

```
⬜ Resend API 키 설정
⬜ src/lib/notify.ts 작성
    sendReminderEmail(to, eventTitle, link)
    sendConfirmedEmail(to, eventTitle, confirmedDate)
    sendHostAlert(hostEmail, alertType, eventId)
⬜ src/app/api/notify/route.ts
    알림 발송 트리거 (Supabase Edge Function 호출)
⬜ Supabase Edge Function
    크론으로 마감 30분 전 체크 → 미투표자 리마인더
⬜ 확정 시 전체 참여자 이메일 발송
⬜ 동점 시 호스트 이메일 알림
⬜ 게스트 중복 의심 시 호스트 이메일 알림
⬜ 웹 푸시 (PWA Service Worker) — 이메일 구독자 대상
```

**완료 기준**: 마감 30분 전 미투표자에게 이메일 발송 확인

---

## 9. Phase 7 — 마감/확정 로직

**목표**: 자동 확정, 동점 처리, 결과 화면

> 참조: `design/cute-result.jsx` (ResultScreen)

```
⬜ 마감 시간 도달 시 자동 처리 (Edge Function 크론)
    yes 최다 슬롯 찾기
    단독 1위 → status='confirmed', confirmed_slot_id 저장
    동점   → status='closed', 호스트 알림
⬜ 호스트 동점 처리 UI
    동점 슬롯 목록 표시 → 호스트 직접 선택
⬜ src/app/api/events/[id]/confirm/route.ts
    날짜 확정 API (호스트 전용)
⬜ 확정 후 전체 알림 발송
⬜ src/app/v/[code]/result/page.tsx
    확정 날짜 표시 화면
    StackedBar (비공개 모드)
    캘린더 저장 버튼 (구글 캘린더 딥링크)
⬜ 만료 이벤트 에러 화면
```

**완료 기준**: 마감 → 자동 확정 → 결과 화면 표시 → 이메일 발송

---

## 10. Phase 8 — 마무리 & 배포

**목표**: 배포 완료, 포트폴리오 공개

```
⬜ 에러/빈상태/로딩 화면 전체 확인
    참조: design/cute-states.jsx
⬜ 모바일 반응형 전체 QA (iPhone SE ~ iPhone 15 Pro)
⬜ TypeScript type-check 에러 0개
⬜ Lighthouse 모바일 점수 90+ (Performance, Accessibility)
⬜ OG 메타태그 (카카오톡 링크 미리보기)
⬜ favicon + 앱 아이콘
⬜ Vercel 배포 + 도메인 연결
⬜ Supabase 프로덕션 설정 (RLS 재확인)
⬜ README.md 작성 (스택, 기능, 스크린샷)
⬜ 포트폴리오용 데모 계정 + 샘플 데이터
```

**완료 기준**: `pollae.kr` (또는 Vercel URL) 에서 전체 플로우 동작

---

## 11. AI 작업 지시 템플릿

새 대화 시작 시 아래 형식으로 컨텍스트를 전달하세요.

```
[현재 Phase]
Phase N 진행 중 — [Phase명]

[완료된 것]
- 항목 1
- 항목 2

[지금 할 것]
PLAN.md Phase N의 [항목] 작업

[참고 파일]
- CLAUDE.md §N
- design/cute-xxx.jsx
- hooks/useXxx.ts
```

**예시**
```
Phase 3 진행 중 — 투표 페이지

완료: useVote, useEvent, useGuestToken, useEventDeadline 훅 배치

지금: VoteButton.tsx 컴포넌트 만들기.
CLAUDE.md §5 디자인 토큰, §6 컨벤션 따르고,
design/cute-vote.jsx 참조해서 👍🤔👎 버튼 구현.
active/inactive 상태, 버튼 아래 숫자 표시 포함.
```
