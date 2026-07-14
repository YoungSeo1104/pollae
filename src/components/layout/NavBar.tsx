'use client'

// NavBar — 상단 바 (height 44)
// 좌: 뒤로가기(‹) / 중앙: 타이틀 / 우: 슬롯
// onBack={false} → 뒤로가기 숨김 (자리 유지)
// 원본: design/cute-create.jsx NavBar

import type { ReactNode } from 'react'
import { COLORS, RADIUS } from '@/lib/theme'

type Props = {
  title?: ReactNode
  onBack?: (() => void) | false
  right?: ReactNode
}

export function NavBar({ title, onBack, right }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px 6px 4px',
        height: 44,
        flexShrink: 0,
      }}
    >
      {onBack !== false ? (
        <button
          type="button"
          onClick={onBack}
          className="pl-pressable"
          aria-label="뒤로"
          style={{
            width: 36,
            height: 36,
            borderRadius: RADIUS.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.inkSoft,
            fontSize: 18,
            background: 'rgba(255,255,255,0.65)',
            border: 'none',
          }}
        >
          ‹
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )}

      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: COLORS.ink,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </div>

      <div style={{ minWidth: 36, display: 'flex', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </div>
  )
}
