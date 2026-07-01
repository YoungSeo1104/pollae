# Pollae — Skills (작업 레시피)

> 자주 반복되는 작업 패턴을 정리한 레시피.
> Claude Code는 작업 전 해당 섹션을 읽고 패턴을 따르세요.

---

## 📋 목차

| § | 스킬 | 키워드 |
|---|---|---|
| 1 | [Supabase 쿼리 작성](#1-supabase-쿼리-작성) | DB, 조회, 삽입, 수정, 에러 처리 |
| 2 | [API Route 작성](#2-api-route-작성) | Next.js, route.ts, POST, GET, 에러 응답 |
| 3 | [서버 컴포넌트 작성](#3-서버-컴포넌트-작성) | async, Supabase, 데이터 페칭 |
| 4 | [클라이언트 컴포넌트 작성](#4-클라이언트-컴포넌트-작성) | use client, 훅, 인터랙션 |
| 5 | [디자인 JSX → Next.js 포팅](#5-디자인-jsx--nextjs-포팅) | cute-*.jsx, 컴포넌트 변환 |
| 6 | [투표 컴포넌트 패턴](#6-투표-컴포넌트-패턴) | VoteButton, SlotRow, VOTE_CONFIG |
| 7 | [훅 작성 패턴](#7-훅-작성-패턴) | React Query, useMutation, useState |
| 8 | [에러/로딩/빈상태 처리](#8-에러로딩빈상태-처리) | error, loading, empty, Suspense |
| 9 | [알림 발송](#9-알림-발송) | Resend, 이메일, 템플릿 |
| 10 | [게스트 토큰 처리](#10-게스트-토큰-처리) | 중복 감지, 수정 허용 |

---

## 1. Supabase 쿼리 작성

```typescript
// ✅ 기본 패턴 — 항상 이 구조
import { createServerClient } from '@/lib/supabase-server'

const supabase = createServerClient()

// 단일 조회
const { data, error } = await supabase
  .from('events')
  .select('*, time_slots(*)')
  .eq('id', eventId)
  .single()

if (error) throw new Error(error.message)
return data

// 목록 조회 (정렬, 필터)
const { data, error } = await supabase
  .from('time_slots')
  .select('*, votes(answer, participant_id)')
  .eq('event_id', eventId)
  .order('slot_date', { ascending: true })
  .order('slot_time', { ascending: true })

// 삽입
const { data, error } = await supabase
  .from('votes')
  .insert({ participant_id, slot_id, answer })
  .select()
  .single()

// upsert (있으면 수정, 없으면 삽입)
const { data, error } = await supabase
  .from('votes')
  .upsert(
    { participant_id, slot_id, answer },
    { onConflict: 'participant_id,poll_item_id' }
  )
  .select()
  .single()

// 업데이트
const { error } = await supabase
  .from('events')
  .update({ status: 'confirmed', confirmed_slot_id: slotId })
  .eq('id', eventId)

// 삭제
const { error } = await supabase
  .from('votes')
  .delete()
  .eq('participant_id', participantId)
  // poll_item_id 기준으로 삭제해도 됨
```

**주의사항**
- 클라이언트 컴포넌트 → `lib/supabase.ts`
- 서버 컴포넌트/API/서버액션 → `lib/supabase-server.ts`
- service_role key 절대 클라이언트 노출 금지

---

## 2. API Route 작성

```typescript
// src/app/api/vote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventId, name, guestToken, selections } = body

    // 1. 입력값 검증
    if (!name?.trim()) {
      return NextResponse.json(
        { message: '이름을 입력해주세요' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // 2. 비즈니스 로직 처리
    // ...

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('vote API error:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했어요' },
      { status: 500 }
    )
  }
}

// 에러 응답 코드 규칙
// 400: 입력값 오류
// 401: 인증 필요
// 403: 권한 없음 (다른 사람 이벤트)
// 404: 이벤트 없음
// 409: 중복 (게스트 토큰 충돌)
// 410: 마감됨
// 500: 서버 에러
```

---

## 3. 서버 컴포넌트 작성

```typescript
// 기본 — async 함수로 DB 직접 조회
import { createServerClient } from '@/lib/supabase-server'

export default async function EventPage({
  params,
}: {
  params: { code: string }
}) {
  const supabase = createServerClient()

  const { data: event, error } = await supabase
    .from('events')
    .select('*, time_slots(*)')
    .eq('short_code', params.code)
    .single()

  if (error || !event) notFound()

  return <VotePage event={event} />
}

// Suspense와 함께 사용 시
import { Suspense } from 'react'

export default function Page({ params }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <EventContent code={params.code} />
    </Suspense>
  )
}
```

---

## 4. 클라이언트 컴포넌트 작성

```typescript
'use client'

import { useState } from 'react'
import { COLORS, VOTE_CONFIG } from '@/lib/theme'
import type { TVoteKind } from '@/types'

type Props = {
  kind: TVoteKind
  active: boolean
  count: number
  onPick: (kind: TVoteKind) => void
}

export function VoteButton({ kind, active, count, onPick }: Props) {
  const cfg = VOTE_CONFIG[kind]

  return (
    <button
      onClick={() => onPick(kind)}
      style={{
        background: active ? cfg.color : '#fff',
        border: `2px solid ${active ? cfg.color : COLORS.border}`,
        boxShadow: active
          ? `0 6px 14px ${cfg.color}50, 0 0 0 3px ${cfg.soft}`
          : '0 1px 2px rgba(0,0,0,0.04)',
      }}
      className="flex flex-col items-center justify-center
                 w-[72px] h-14 rounded-[18px] transition-all
                 active:scale-95"
    >
      <span className="text-[22px] leading-none">{cfg.emoji}</span>
      <span
        style={{ color: active ? '#fff' : cfg.color }}
        className="text-[10px] font-bold mt-0.5"
      >
        {count}
      </span>
    </button>
  )
}
```

---

## 5. 디자인 JSX → Next.js 포팅

클로드 디자인 `design/cute-*.jsx` 파일을 Next.js 컴포넌트로 변환하는 방법.

**변환 체크리스트**
```
□ 'use client' 필요 여부 판단 (인터랙션 있으면 추가)
□ theme.* → COLORS.* / VOTE_CONFIG.* 로 교체
□ window.* 참조 제거 (SSR 호환)
□ JSX의 onClick → Next.js 이벤트 핸들러로
□ nav('route') → useRouter().push('/route') 로
□ 인라인 color 하드코딩 → COLORS.* 상수로
□ TypeScript Props 타입 정의 추가
□ 이모지 아바타 → src/lib/avatars.ts에서 import
```

**예시: NavBar 포팅**
```typescript
// design/cute-create.jsx (원본)
function NavBar({ theme, title, onBack, right }) {
  return (
    <div style={{ height: 44, background: theme.surface, ... }}>
      ...
    </div>
  )
}

// src/components/layout/NavBar.tsx (포팅)
'use client'
import { useRouter } from 'next/navigation'
import { COLORS } from '@/lib/theme'

type Props = {
  title?: string
  onBack?: () => void | false
  right?: React.ReactNode
}

export function NavBar({ title, onBack, right }: Props) {
  const router = useRouter()
  const handleBack = onBack ?? (() => router.back())

  return (
    <div
      style={{ background: COLORS.surface }}
      className="h-11 flex items-center justify-between px-4
                 sticky top-0 z-10"
    >
      ...
    </div>
  )
}
```

---

## 6. 투표 컴포넌트 패턴

```typescript
// VoteButton — 항상 VOTE_CONFIG 사용
import { VOTE_CONFIG } from '@/lib/theme'
import type { TVoteKind } from '@/types'

// SlotRow — 시간행 구조
// [시간 + 응답자수(좌)] [버튼+숫자(우)]
type SlotRowProps = {
  slot: TSlotWithVotes
  myVote: TVoteKind | null
  onPick: (slotId: string, kind: TVoteKind) => void
  disabled?: boolean  // 마감 시
}

// DateGroup — 날짜별 묶음 (schedule 타입 전용)
// 같은 slot_date 끼리 그룹핑
function groupByDate(items: TPollItemWithVotes[]) {
  return items.reduce((acc, item) => {
    const date = item.slot_date ?? 'unknown'
    return { ...acc, [date]: [...(acc[date] ?? []), item] }
  }, {} as Record<string, TPollItemWithVotes[]>)
}

// 날짜 포맷
// "2025-05-27" → "5월 27일 (화)"
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
const label = format(parseISO(item.slot_date!), 'M월 d일 (E)', { locale: ko })

// 시간 포맷
// "19:00" ~ "20:00" → "오후 7 ~ 8시"

// ExtraPollCard — place / custom 타입 (텍스트 항목 카드)
// poll.items를 단순 리스트로 표시 (DateGroup 없이)
// 같은 ○△× 버튼 사용, 슬롯 최대 30개 동일 적용

// poll_type별 렌더링 분기
function renderPoll(poll: TPollWithItems, ...) {
  if (poll.poll_type === 'schedule') return <SchedulePoll poll={poll} .../>
  return <ExtraPollCard poll={poll} .../>  // place, custom 통합
}
```

---

## 7. 훅 작성 패턴

```typescript
// React Query 조회 훅
export function useXxx(id: string) {
  const query = useQuery({
    queryKey: ['xxx', id],
    queryFn: () => fetchXxx(id),
    staleTime: 30_000,
    enabled: !!id,
  })

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  }
}

// React Query 뮤테이션 훅
export function useXxxMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TPayload) => postXxx(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['xxx'] })
    },
    onError: (error) => {
      console.error('xxx mutation error:', error)
    },
  })
}

// 로컬 상태 훅
export function useLocalXxx() {
  const [state, setState] = useState<TState>(initialState)
  const action = useCallback((payload) => {
    setState(prev => ({ ...prev, ...payload }))
  }, [])
  return { state, action }
}
```

---

## 8. 에러/로딩/빈상태 처리

```typescript
// 로딩
if (isLoading) return <LoadingScreen />

// 에러 종류별 분기
if (error) {
  if (error.includes('찾을 수 없')) return <ErrorScreen kind="notfound" />
  if (error.includes('마감'))        return <ErrorScreen kind="expired" />
  return <ErrorScreen kind="network" />
}

// 빈 상태
if (!events.length) return <EmptyDashboardScreen />

// ErrorScreen props
type ErrorKind = 'notfound' | 'expired' | 'network'
// design/cute-states.jsx 참조해서 포팅

// Suspense 래퍼 패턴
<Suspense fallback={<LoadingScreen />}>
  <AsyncComponent />
</Suspense>
```

---

## 9. 알림 발송

```typescript
// src/lib/notify.ts

import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

// 리마인더 이메일
export async function sendReminderEmail({
  to,
  name,
  eventTitle,
  link,
  deadline,
}: {
  to: string
  name: string
  eventTitle: string
  link: string
  deadline: string
}) {
  await resend.emails.send({
    from: 'Pollae <noreply@pollae.kr>',
    to,
    subject: `${eventTitle} 투표 마감이 다가왔어요 ⏰`,
    html: `
      <p>${name}님, 아직 응답하지 않으셨어요!</p>
      <p><a href="${link}">지금 투표하기</a></p>
      <p>마감: ${deadline}</p>
    `,
  })
}

// 확정 이메일
export async function sendConfirmedEmail({
  to,
  eventTitle,
  confirmedDate,
  link,
}: {
  to: string
  eventTitle: string
  confirmedDate: string
  link: string
}) {
  await resend.emails.send({
    from: 'Pollae <noreply@pollae.kr>',
    to,
    subject: `${eventTitle} 날짜가 확정됐어요! 🎉`,
    html: `
      <p>날짜가 정해졌어요!</p>
      <p><strong>${confirmedDate}</strong></p>
      <p><a href="${link}">확인하기</a></p>
    `,
  })
}
```

---

## 10. 게스트 토큰 처리

```typescript
// API Route에서 게스트 토큰 검증 패턴
const { name, guestToken, eventId, selections } = await req.json()

// 1. 기존 참여자 조회 (같은 이름)
const { data: existing } = await supabase
  .from('event_participants')
  .select('id, guest_token, has_voted')
  .eq('event_id', eventId)
  .eq('name', name)
  .maybeSingle()

// 2. 중복 감지
if (existing && existing.guest_token !== guestToken) {
  // 409: 다른 기기에서 같은 이름으로 투표한 기록 있음
  return NextResponse.json(
    { message: '이미 다른 기기에서 투표한 이름이에요', conflict: true },
    { status: 409 }
  )
}

// 3. 같은 토큰이면 수정 허용
if (existing && existing.guest_token === guestToken) {
  // 기존 votes 삭제 후 재삽입 (upsert)
}

// 4. 신규 참여자
if (!existing) {
  // participants 삽입 후 votes 삽입
}
```

---

## 11. 소셜 로그인 구현

```typescript
// src/lib/supabase.ts — 클라이언트용 signInWith 헬퍼
import { createClient } from '@/lib/supabase'

type TSocialProvider = 'kakao' | 'google' | 'naver' | 'apple'

export async function signInWithSocial(provider: TSocialProvider) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      // 카카오: 추가 스코프 없어도 기본 이메일 제공
      // 구글: 기본 profile + email
    },
  })
  if (error) throw new Error(error.message)
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
}
```

```typescript
// src/app/auth/callback/route.ts — OAuth 콜백 처리
import { createServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
```

```typescript
// src/app/(auth)/login/page.tsx — 로그인 UI
'use client'
import { signInWithSocial } from '@/lib/auth'
import { COLORS } from '@/lib/theme'

const PROVIDERS = [
  {
    id: 'kakao' as const,
    label: '카카오로 시작하기',
    bg: '#FEE500',
    color: '#191919',
    icon: '💬',
    enabled: true,
  },
  {
    id: 'google' as const,
    label: 'Google로 시작하기',
    bg: '#FFFFFF',
    color: '#191919',
    border: '#E0E0E0',
    icon: 'G',
    enabled: true,
  },
  {
    id: 'naver' as const,
    label: '네이버로 시작하기',
    bg: '#03C75A',
    color: '#FFFFFF',
    icon: 'N',
    enabled: false,  // 배포 후 활성화
  },
  {
    id: 'apple' as const,
    label: 'Apple로 시작하기',
    bg: '#000000',
    color: '#FFFFFF',
    icon: '',
    enabled: false,  // 앱 출시 시 활성화
  },
]

export default function LoginPage() {
  const handleLogin = async (provider: 'kakao' | 'google') => {
    await signInWithSocial(provider)
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      {PROVIDERS.map(p => (
        <button
          key={p.id}
          onClick={() => p.enabled && handleLogin(p.id as any)}
          disabled={!p.enabled}
          style={{
            background: p.bg,
            color: p.color,
            border: p.border ? `1px solid ${p.border}` : 'none',
            opacity: p.enabled ? 1 : 0.4,
          }}
          className="w-full h-14 rounded-2xl font-bold text-[15px]
                     flex items-center justify-center gap-3
                     transition-opacity active:scale-95"
        >
          <span>{p.icon}</span>
          {p.enabled ? p.label : p.label + ' (준비 중)'}
        </button>
      ))}
    </div>
  )
}
```

**Supabase 설정 체크리스트**
```
카카오:
  □ developers.kakao.com → 내 애플리케이션 → 카카오 로그인 활성화
  □ Redirect URI 등록: {SUPABASE_URL}/auth/v1/callback
  □ Supabase Dashboard → Auth → Kakao → REST API 키 + Secret 입력

구글:
  □ console.cloud.google.com → OAuth 2.0 클라이언트 ID 생성
  □ 승인된 리디렉션 URI: {SUPABASE_URL}/auth/v1/callback
  □ Supabase Dashboard → Auth → Google → Client ID + Secret 입력

공통:
  □ .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 설정
  □ Supabase → Auth → URL Configuration → Site URL: localhost:3000 (개발)
```
