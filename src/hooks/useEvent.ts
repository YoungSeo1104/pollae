import { useQuery } from '@tanstack/react-query'
import type { TEvent, TPollItemWithVotes, TParticipant } from '@/types'

type TEventData = {
  event: TEvent
  slots: TPollItemWithVotes[]
  participants: TParticipant[]
}

async function fetchEvent(code: string): Promise<TEventData> {
  const res = await fetch(`/api/events/${code}`)
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message ?? '이벤트를 불러오지 못했어요')
  }
  return res.json()
}

/**
 * useEvent — 이벤트 전체 데이터 조회
 *
 * 사용 예:
 * const { event, slots, participants, isLoading, error } = useEvent(code)
 *
 * - code: URL 파라미터 (v/[code])
 * - slots: 날짜별 슬롯 + 투표 현황 + 내 응답 포함
 * - participants: 투표완료/미투표 구분
 * - Realtime 구독은 별도 useEventRealtime 훅에서 처리
 */
export function useEvent(code: string) {
  const query = useQuery({
    queryKey: ['event', code],
    queryFn: () => fetchEvent(code),
    staleTime: 30_000,      // 30초간 fresh
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      // 404, 만료는 재시도 안 함
      if (error.message.includes('찾을 수 없') ||
          error.message.includes('마감')) return false
      return failureCount < 2
    },
  })

  return {
    event: query.data?.event ?? null,
    slots: query.data?.slots ?? [],
    participants: query.data?.participants ?? [],
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  }
}

/**
 * useEventRealtime — Supabase Realtime 구독
 * 투표 현황 실시간 반영
 *
 * 사용 예:
 * useEventRealtime(eventId, refetch)
 */
export function useEventRealtime(
  eventId: string | undefined,
  refetch: () => void
) {
  // Supabase Realtime 구독
  // votes 테이블 변경 감지 → refetch 트리거
  // 실제 구현은 Supabase 클라이언트 초기화 후 작성
}
