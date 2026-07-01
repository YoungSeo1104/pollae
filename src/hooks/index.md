# Pollae — 훅 (Hooks) 가이드

> 모든 커스텀 훅의 API, 사용법, 주의사항 모음.
> 컴포넌트 작업 전 이 파일을 먼저 읽으세요.

---

## 📋 목차

| 훅 | 파일 | 용도 |
|---|---|---|
| [useVote](#usevote) | useVote.ts | 투표 선택/제출 핵심 상태 |
| [useGuestToken](#useguesttoken) | useGuestToken.ts | 브라우저 토큰 관리 |
| [useEventDeadline](#useeventdeadline) | useEventDeadline.ts | 마감 타이머 |
| [useEvent](#useevent) | useEvent.ts | 이벤트 데이터 조회 |
| [useHostGuard](#usehostguard) | useHostGuard.ts | 호스트 인증 체크 |

---

## useVote

투표 페이지의 핵심 상태 관리 훅.
선택(로컬) → 제출(서버) → 수정 가능 플로우를 담당.

```typescript
const {
  selections,   // Record<slotId, 'yes'|'maybe'|'no'> — 현재 선택
  submitted,    // boolean — 제출 완료 여부
  isModifying,  // boolean — 제출 후 수정 중 여부
  canSubmit,    // (name: string) => boolean — 제출 가능 여부
  pick,         // (slotId, kind) => void — 슬롯 선택/해제
  submit,       // (name: string) => Promise<void> — 서버 제출
  reset,        // () => void — 전체 초기화
  isSubmitting, // boolean — 제출 중 로딩
  submitError,  // string | null — 제출 에러 메시지
} = useVote(pollId)  // Poll 단위로 관리 (schedule/place/custom 각각)
```

**사용 예**
```typescript
const { selections, submitted, pick, submit, canSubmit } = useVote(event.id)

// 버튼 클릭
<VoteButton
  kind="yes"
  active={selections[slot.id] === 'yes'}
  onPick={(kind) => pick(slot.id, kind)}
/>

// 제출 버튼
<PrimaryBtn
  disabled={!canSubmit(name)}
  onClick={() => submit(name)}
>
  {submitted ? '✓ 응답 보냈어요!' : '투표 완료'}
</PrimaryBtn>
```

**상태 흐름**
```
초기: selections={}, submitted=false
선택: selections={slotId: 'yes', ...}
제출: submitted=true → "참석 가장 많아요" 배지 표시
수정: pick() 호출 → submitted=false 자동 해제
```

**주의**
- `submit()` 전에 `canSubmit(name)` 체크 필수
- 마감된 이벤트에서는 `pick()` 호출 차단 (부모에서 `disabled` 체크)

---

## useGuestToken

브라우저 로컬스토리지 기반 게스트 식별 토큰.

```typescript
const [token, clearToken] = useGuestToken()
// token: string | null
// clearToken: () => void
```

**동작**
- 최초 마운트 시 `localStorage.getItem('pollae_guest_token')` 조회
- 없으면 `crypto.randomUUID()` 생성 후 저장
- SSR 환경에서는 `null` 반환 (window 없음)

**사용 예**
```typescript
// 투표 제출 시
const [token] = useGuestToken()
await submit(name)  // useVote 내부에서 token 사용

// 중복 충돌 해결 후 재시작
const [, clearToken] = useGuestToken()
clearToken()  // 토큰 삭제 → 다음 투표 시 새 토큰 생성
```

**컴포넌트 외부에서 토큰 읽기**
```typescript
import { getGuestToken } from '@/hooks/useGuestToken'
const token = getGuestToken()  // 훅 없이 일회성 조회
```

---

## useEventDeadline

마감 시간 카운트다운 훅. 1분마다 갱신.

```typescript
const {
  remaining,   // "2일 14시간 남음" | "마감되었어요" | ""
  isExpired,   // boolean — true면 투표 입력 비활성화
  isUrgent,    // boolean — 1시간 미만, 빨간색 표시용
  minutesLeft, // number — 리마인더 기준용
} = useEventDeadline(event.vote_deadline)
```

**사용 예**
```typescript
const { remaining, isExpired, isUrgent } = useEventDeadline(event.vote_deadline)

// 헤더 타이머
<span style={{ color: isUrgent ? COLORS.no : COLORS.inkMute }}>
  ⏰ {remaining}
</span>

// 투표 버튼 비활성
<VoteButton disabled={isExpired} />
```

**포맷 규칙**
```
2일 이상:     "N일 N시간 남음"
1~48시간:     "N시간 N분 남음"
1시간 미만:   "N분 남음" (isUrgent=true)
만료:         "마감되었어요" (isExpired=true)
deadline=null: remaining="" (상시 열람 이벤트)
```

---

## useEvent

이벤트 전체 데이터(이벤트+슬롯+참여자) 조회 훅.

```typescript
const {
  event,        // TEvent | null
  slots,        // TSlotWithVotes[] — 내 응답(my_vote) 포함
  participants, // TParticipant[] — 완료/미투표 포함
  isLoading,    // boolean
  error,        // string | null
  refetch,      // () => void — 수동 갱신
} = useEvent(code)  // URL 파라미터 code
```

**사용 예**
```typescript
const { event, slots, participants, isLoading, error } = useEvent(params.code)

if (isLoading) return <LoadingScreen />
if (error) return <ErrorScreen kind={parseErrorKind(error)} />
if (!event) return <ErrorScreen kind="notfound" />

const doneCount = participants.filter(p => p.has_voted).length
const pendingCount = participants.length - doneCount
```

**캐싱**
- staleTime: 30초
- 투표 제출 후 자동 invalidate (useVote 내부에서 처리)
- Realtime 구독은 별도 `useEventRealtime(eventId, refetch)` 사용

---

## useHostGuard

호스트 전용 페이지 접근 제어 훅.

```typescript
// 기본 — 로그인 체크만
const { user, isLoading } = useHostGuard()
// 미로그인 시 /login으로 자동 리다이렉트

// 이벤트 소유자 체크 추가
const { user, isOwner, isLoading } = useHostEventGuard(event?.host_id)
// 다른 사람 이벤트 접근 시 /dashboard로 리다이렉트
```

**사용 예**
```typescript
// 대시보드 페이지
'use client'
export default function DashboardPage() {
  const { user, isLoading } = useHostGuard()
  if (isLoading) return <LoadingScreen />
  // user가 null이면 이미 리다이렉트됨
  return <Dashboard userId={user!.id} />
}

// 이벤트 관리 페이지
'use client'
export default function ManagePage({ params }) {
  const { event } = useEvent(params.id)
  const { isOwner, isLoading } = useHostEventGuard(event?.host_id)
  if (isLoading || !isOwner) return <LoadingScreen />
  return <ManagePage event={event} />
}
```

---

## 훅 조합 패턴 — 투표 페이지 전체

```typescript
'use client'

export default function VotePage({ event }: { event: TEvent }) {
  const [name, setName] = useState('')
  const { polls, participants } = useEvent(event.short_code)
  const schedulePoll = polls.find(p => p.poll_type === 'schedule')!
  const extraPolls   = polls.filter(p => p.poll_type !== 'schedule')

  const { remaining, isExpired } = useEventDeadline(schedulePoll.vote_deadline)
  const { selections, submitted, pick, submit, canSubmit } = useVote(schedulePoll.id)

  const doneCount = participants.filter(p => p.has_voted).length

  return (
    <>
      {/* 헤더 */}
      <Header title={event.title} remaining={remaining} isUrgent={isUrgent} />

      {/* 통계 */}
      <Stats done={doneCount} total={participants.length} itemCount={schedulePoll.items.length} />

      {/* 이름 입력 */}
      <Input value={name} onChange={setName} required label="이름" />

      {/* 일정 투표 (schedule — 필수) */}
      {Object.entries(groupByDate(schedulePoll.items)).map(([date, items]) => (
        <DateGroup key={date} date={date} items={items}
          selections={selections} onPick={pick}
          submitted={submitted} disabled={isExpired} />
      ))}

      {/* 연계 투표 (place / custom — 선택) */}
      {extraPolls.map(poll => (
        <ExtraPollCard key={poll.id} poll={poll} participantName={name} />
      ))}

      {/* 참여자 */}
      <ParticipantCard participants={participants} />

      {/* 제출 버튼 (schedule poll 기준) */}
      <PrimaryBtn
        disabled={!canSubmit(name) || isExpired}
        onClick={() => submit(name)}
      >
        {submitted ? '✓ 응답 보냈어요!' : '투표 완료'}
      </PrimaryBtn>
    </>
  )
}
```
