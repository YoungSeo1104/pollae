'use client'

// app/providers.tsx — 전역 클라이언트 프로바이더.
// TanStack Query 캐시를 앱 전체에 제공한다.

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
  // 요청/렌더마다 새 클라이언트가 만들어지지 않도록 useState로 1회 생성.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
