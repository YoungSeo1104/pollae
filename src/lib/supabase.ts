// lib/supabase.ts — 브라우저(클라이언트 컴포넌트·훅)용 Supabase 클라이언트.
// 'use client' 컴포넌트와 훅에서만 사용. 서버는 lib/supabase-server.ts 사용.

import { createBrowserClient } from '@supabase/ssr'

/**
 * createClient — 브라우저용 Supabase 클라이언트 생성.
 *
 * 사용 예:
 * const supabase = createClient()
 * const { data } = await supabase.auth.getUser()
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
