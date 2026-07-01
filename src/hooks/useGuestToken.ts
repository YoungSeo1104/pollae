import { useState, useCallback } from 'react'

const STORAGE_KEY = 'pollae_guest_token'

/**
 * useGuestToken — 브라우저 로컬스토리지 기반 게스트 토큰 관리
 *
 * 동작:
 * - 첫 접속 시 UUID 생성 → 로컬스토리지 저장
 * - 이후 접속 시 기존 토큰 재사용 (같은 기기에서 수정 가능)
 * - 다른 기기/브라우저 = 다른 토큰 = 중복 의심 → 호스트 알림 플로우
 *
 * 사용 예:
 * const [token, clearToken] = useGuestToken()
 */
export function useGuestToken(): [string | null, () => void] {
  const [token] = useState<string | null>(() => {
    // SSR 환경에서는 null 반환
    if (typeof window === 'undefined') return null

    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing) return existing

    // 최초 생성
    const newToken = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, newToken)
    return newToken
  })

  // 토큰 삭제 (로그아웃 or 중복 해결 후 재시작 시)
  const clearToken = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return [token, clearToken]
}

/**
 * getGuestToken — 훅 바깥(유틸, API 호출부)에서 토큰 조회
 * 컴포넌트 외부에서 일회성으로 읽을 때 사용
 */
export function getGuestToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
