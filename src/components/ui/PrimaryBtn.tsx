'use client'

// PrimaryBtn — 메인 CTA 버튼
// variant: primary(그라데이션) / ghost(테두리) / disabled
// 원본: design/cute-create.jsx PrimaryBtn

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { COLORS, RADIUS, GRAD_HERO } from '@/lib/theme'

type Props = {
  children: ReactNode
  ghost?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryBtn({ children, ghost, disabled, style, ...rest }: Props) {
  const background = ghost
    ? COLORS.surface
    : disabled
      ? COLORS.border
      : GRAD_HERO

  return (
    <button
      {...rest}
      disabled={disabled}
      className="pl-pressable"
      style={{
        height: 54,
        width: '100%',
        borderRadius: RADIUS.xl,
        background,
        color: ghost ? COLORS.primaryDeep : '#fff',
        border: ghost ? `1.5px solid ${COLORS.border}` : 'none',
        fontSize: 15,
        fontWeight: 800,
        letterSpacing: '-0.01em',
        boxShadow: !ghost && !disabled ? `0 8px 20px ${COLORS.primary}55` : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
