import { useState, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TVoteKind, TParticipant } from '@/types'
import { useGuestToken } from './useGuestToken'

type TSelections = Record<string, TVoteKind> // slotId → kind

type TSubmitPayload = {
  eventId: string
  name: string
  guestToken: string
  selections: TSelections
}

async function submitVoteApi(payload: TSubmitPayload) {
  const res = await fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message ?? '투표 제출에 실패했어요')
  }
  return res.json() as Promise<TParticipant>
}

/**
 * useVote — 투표 페이지 핵심 로직
 *
 * 사용 예:
 * const { selections, submitted, pick, submit, canSubmit } = useVote(eventId)
 *
 * - selections: 현재 선택 상태 (slotId → 'yes' | 'maybe' | 'no')
 * - submitted: 제출 완료 여부 (true면 👑최다 배지 표시)
 * - isModifying: 제출 후 수정 중 (submitted=false, 선택 있음)
 * - canSubmit: 이름 입력 + 1개 이상 선택 시 true
 * - pick: 슬롯 응답 선택/해제
 * - submit: 최종 제출 (서버로 전송)
 * - reset: 전체 초기화
 */
export function useVote(eventId: string) {
  const [selections, setSelections] = useState<TSelections>({})
  const [submitted, setSubmitted] = useState(false)
  const [guestToken] = useGuestToken()
  const queryClient = useQueryClient()

  const hasSelections = Object.keys(selections).length > 0
  const isModifying = submitted === false && hasSelections
  const canSubmit = (name: string) =>
    name.trim().length > 0 && hasSelections && !submitMutation.isPending

  // 슬롯 선택/해제
  const pick = useCallback((slotId: string, kind: TVoteKind) => {
    setSelections(prev => {
      // 같은 버튼 다시 누르면 해제
      if (prev[slotId] === kind) {
        const next = { ...prev }
        delete next[slotId]
        return next
      }
      return { ...prev, [slotId]: kind }
    })
    // 제출 완료 상태에서 수정 시작 → submitted 해제
    if (submitted) setSubmitted(false)
  }, [submitted])

  const submitMutation = useMutation({
    mutationFn: (name: string) => {
      if (!guestToken) throw new Error('게스트 토큰이 없어요')
      return submitVoteApi({ eventId, name, guestToken, selections })
    },
    onSuccess: () => {
      setSubmitted(true)
      // 이벤트 데이터 갱신 (참여자 목록, 투표 현황)
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
    },
  })

  const submit = useCallback(async (name: string) => {
    if (!canSubmit(name)) return
    await submitMutation.mutateAsync(name)
  }, [canSubmit, submitMutation])

  const reset = useCallback(() => {
    setSelections({})
    setSubmitted(false)
  }, [])

  return {
    selections,
    submitted,
    isModifying,
    canSubmit,
    pick,
    submit,
    reset,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error?.message ?? null,
  }
}
