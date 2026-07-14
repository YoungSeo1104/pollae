'use client'

// Avatar — 이모지 아바타 (원형 배경 + 이모지)
// size: 28 | 36 | 44 | 56
// states: done(활성) / not-voted(회색) / host(👑 뱃지) / ring(테두리)
// avatar/avatarColor 미지정 시 마운트 시점 랜덤 고정 (useState)
// 원본: design/cute-chars.jsx CuteAvatar (이모지 only)

import { useState } from 'react'
import { COLORS } from '@/lib/theme'
import { randomAvatar } from '@/lib/avatars'

// 권장 사이즈 (입력 prefix 등은 32 같은 임의값도 허용)
export type AvatarSize = 28 | 36 | 44 | 56

type Props = {
  avatar?: string       // 이모지 (지정 시 그것 사용)
  avatarColor?: string  // 배경색 (지정 시 그것 사용)
  size?: number         // 권장 AvatarSize (28|36|44|56)
  host?: boolean        // 👑 뱃지
  done?: boolean        // false = 미투표(회색 처리)
  ring?: string         // 테두리 색 (스택 겹침용, 보통 '#fff')
}

export function Avatar({
  avatar,
  avatarColor,
  size = 44,
  host = false,
  done = true,
  ring,
}: Props) {
  const [picked] = useState(() => randomAvatar())
  const emoji = avatar ?? picked.emoji
  const color = avatarColor ?? picked.color

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        flexShrink: 0,
        filter: done ? 'none' : 'grayscale(0.8) opacity(0.5)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: done ? color : '#EDE5DC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: ring ? `0 0 0 3px ${ring}` : 'inset 0 -2px 4px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontSize: size * 0.6,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
          }}
        >
          {emoji}
        </span>
      </div>

      {host && (
        <div
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            zIndex: 2,
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: '50%',
            background: COLORS.accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.24,
            lineHeight: 1,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            border: '2px solid #fff',
            boxSizing: 'border-box',
          }}
        >
          👑
        </div>
      )}
    </div>
  )
}
