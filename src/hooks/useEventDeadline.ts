import { useState, useEffect } from 'react'

type TDeadlineState = {
  remaining: string   // "2일 14시간 남음" | "마감되었어요"
  isExpired: boolean
  isUrgent: boolean   // 1시간 미만 → 빨간색 표시용
  minutesLeft: number // 리마인더 알림 기준용
}

function formatRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 1000 / 60)
  const days    = Math.floor(totalMinutes / 60 / 24)
  const hours   = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  if (days > 0 && hours > 0) return `${days}일 ${hours}시간 남음`
  if (days > 0)              return `${days}일 남음`
  if (hours > 0)             return `${hours}시간 ${minutes}분 남음`
  if (minutes > 0)           return `${minutes}분 남음`
  return '곧 마감돼요'
}

/**
 * useEventDeadline — 마감 타이머
 *
 * 사용 예:
 * const { remaining, isExpired, isUrgent } = useEventDeadline(event.vote_deadline)
 *
 * - remaining: "2일 14시간 남음" 형식 문자열 → 헤더에 표시
 * - isExpired: true면 투표 입력 비활성화
 * - isUrgent: true면 텍스트를 빨간색으로 표시
 */
export function useEventDeadline(deadline: string | null): TDeadlineState {
  // 값은 렌더 시 calcState로 파생 → deadline 변경 즉시 반영.
  // interval은 tick만 증가시켜 1분마다 재렌더(현재 시각 기준 재계산)를 유발.
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!deadline) return
    const id = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => clearInterval(id)
  }, [deadline])

  return calcState(deadline)
}

function calcState(deadline: string | null): TDeadlineState {
  if (!deadline) {
    return { remaining: '', isExpired: false, isUrgent: false, minutesLeft: Infinity }
  }

  const diff = new Date(deadline).getTime() - Date.now()

  if (diff <= 0) {
    return { remaining: '마감되었어요', isExpired: true, isUrgent: false, minutesLeft: 0 }
  }

  const minutesLeft = Math.floor(diff / 1000 / 60)

  return {
    remaining: formatRemaining(diff),
    isExpired: false,
    isUrgent: minutesLeft < 60,
    minutesLeft,
  }
}
