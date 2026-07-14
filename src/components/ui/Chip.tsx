'use client'

// Chip — 작은 상태 배지
// variant: status(기본 소프트) / crown(👑 최다, 그라데이션) / hot(🔥 인기)
// 원본: design/cute-create.jsx 배지 (👑 최다, D-3 등)

import type { ReactNode } from 'react'
import { COLORS, GRAD_HERO } from '@/lib/theme'

type ChipVariant = 'status' | 'crown' | 'hot'

type Props = {
  children: ReactNode
  variant?: ChipVariant
}

const VARIANT_STYLE: Record<ChipVariant, { background: string; color: string }> = {
  status: { background: COLORS.primarySoft, color: COLORS.primaryDeep },
  crown: { background: GRAD_HERO, color: '#fff' },
  hot: { background: COLORS.accentSoft, color: COLORS.accent },
}

export function Chip({ children, variant = 'status' }: Props) {
  const v = VARIANT_STYLE[variant]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        fontSize: 11,
        fontWeight: 800,
        padding: '4px 10px',
        borderRadius: 99,
        background: v.background,
        color: v.color,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
