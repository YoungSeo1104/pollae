'use client'

// Input — 텍스트 입력
// default / focused(핑크 테두리) / avatar-prefix(좌측 아바타)
// 원본: design/cute-create.jsx 입력 필드

import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { COLORS, RADIUS } from '@/lib/theme'

// InputHTMLAttributes에 native prefix?: string 존재 → Omit으로 제거 후 ReactNode 재정의
type Props = {
  prefix?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'>

export function Input({ prefix, style, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false)

  const input = (
    <input
      {...rest}
      onFocus={(e) => {
        setFocused(true)
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        onBlur?.(e)
      }}
      style={{
        width: '100%',
        height: 52,
        padding: prefix ? '0 16px 0 52px' : '0 16px',
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'inherit',
        background: COLORS.surface,
        border: `1.5px solid ${focused ? COLORS.primary : COLORS.border}`,
        borderRadius: RADIUS.lg,
        color: COLORS.ink,
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
        ...style,
      }}
    />
  )

  if (!prefix) return input

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}>{prefix}</div>
      {input}
    </div>
  )
}
