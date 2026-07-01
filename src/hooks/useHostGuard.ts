import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase'

/**
 * useHostGuard — 호스트 전용 페이지 인증 체크
 *
 * 사용 예:
 * const { user, isLoading } = useHostGuard()
 *
 * - 미로그인 상태면 /login으로 리다이렉트
 * - 로그인 상태면 user 반환
 */
export function useHostGuard() {
  const router = useRouter()
  const supabase = createClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) return null
      return user
    },
    staleTime: 5 * 60_000, // 5분
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}

/**
 * useHostEventGuard — 이벤트 호스트 여부 추가 체크
 * 다른 사람의 이벤트 관리 페이지 접근 방지
 */
export function useHostEventGuard(eventHostId: string | undefined) {
  const { user, isLoading } = useHostGuard()
  const router = useRouter()

  const isOwner = user && eventHostId ? user.id === eventHostId : null

  useEffect(() => {
    if (!isLoading && isOwner === false) {
      router.replace('/dashboard')
    }
  }, [isOwner, isLoading, router])

  return { user, isOwner, isLoading }
}
