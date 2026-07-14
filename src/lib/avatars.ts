// lib/avatars.ts — 이모지 아바타 풀 + 랜덤 배정 헬퍼
// 원본: design/cute-chars.jsx (EMOJI_AVATARS, randomAvatar)
// 이름 해시 없음 — 같은 이름이어도 다른 사람일 수 있어 인스턴스마다 랜덤 배정.

import { CHAR_PALETTE } from './theme'

// 이모지 아바타 59종 (동물 20 · 음식 17 · 자연/심볼 22)
export const EMOJI_AVATARS = [
  // 동물
  '🐰', '🐻', '🐼', '🐨', '🐱', '🐶', '🐹', '🐧', '🦄', '🐸', '🦊', '🐮',
  '🐷', '🐯', '🐙', '🦋', '🐢', '🦔', '🐔', '🐤',
  // 음식·디저트
  '🍑', '🍓', '🍒', '🍎', '🍊', '🍋', '🍇', '🥑', '🍞', '🥐', '🍩', '🍰',
  '🧁', '🍪', '🍮', '🍡', '🍯',
  // 자연·심볼
  '🌸', '🌷', '🌻', '🌼', '🌹', '🍄', '🍀', '☀️', '🌙', '⭐', '✨', '🌈',
  '⚡', '🔥', '💫', '🎀', '🎈', '🎁', '🎂', '💖', '💝', '🌟',
] as const

export type AvatarPick = { emoji: string; color: string }

// 이모지 + 배경색 랜덤 배정
export function randomAvatar(): AvatarPick {
  const emoji = EMOJI_AVATARS[Math.floor(Math.random() * EMOJI_AVATARS.length)]
  const color = CHAR_PALETTE[Math.floor(Math.random() * CHAR_PALETTE.length)]
  return { emoji, color }
}
