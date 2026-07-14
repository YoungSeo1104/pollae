'use client'

// Toggle — on/off 스위치
// 44x26, 0.2s transition
// 원본: design/cute-create.jsx 옵션 토글

import { COLORS } from '@/lib/theme'

type Props = {
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}

export function Toggle({ checked, onChange, disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        padding: 0,
        background: checked ? COLORS.primary : COLORS.border,
        position: 'relative',
        transition: 'background 0.2s',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 0.2s',
        }}
      />
    </button>
  )
}
