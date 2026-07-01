// lib/supabase-server.ts — 서버(서버 컴포넌트·API Route·서버 액션)용 Supabase 클라이언트.
// Next 16: cookies()가 async → createServerClient도 async 함수.

import { createServerClient as createSSRClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * createServerClient — 서버용 Supabase 클라이언트 생성.
 * 요청 쿠키를 읽어 세션을 이어받는다.
 *
 * 사용 예:
 * const supabase = await createServerClient()
 * const { data } = await supabase.from('events').select('*')
 */
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // 서버 컴포넌트에서 호출 시 set 불가 — 미들웨어에서 세션 갱신 처리.
          }
        },
      },
    },
  )
}
