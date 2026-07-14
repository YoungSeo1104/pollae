'use client'

// PageWrapper — jellyPeach 배경 그라데이션 화면 래퍼
// flex column, 전체 높이. NavBar + 스크롤 콘텐츠 조합에 사용.
// 원본: design/cute-create.jsx 각 Screen 루트 div (background: bgGrad)

import type { CSSProperties, ReactNode } from 'react'
import { COLORS, GRAD_BG } from '@/lib/theme'

type Props = {
  children: ReactNode
  style?: CSSProperties
}

export function PageWrapper({ children, style }: Props) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        background: GRAD_BG,
        color: COLORS.ink,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
