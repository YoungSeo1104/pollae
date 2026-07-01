// lib/theme.ts — jellyPeach 테마 토큰. 색상은 반드시 이 파일에서 import.
// 원본: design/cute-themes.jsx (jellyPeach). 값 변경 시 원본과 일치시킬 것.

export const COLORS = {
  primary:     '#FF7AA8',   // 메인 핑크
  primaryDeep: '#E0588B',   // 호버/눌림
  primarySoft: '#FFE0EC',   // 배경 틴트
  pop:         '#C8A8E9',   // 라벤더 포인트
  accent:      '#FFB088',   // 피치 보조
  yes:         '#FF7AA8',   // 참석 ○
  maybe:       '#FFA962',   // 미정 △
  no:          '#9580C0',   // 불참 ×
  yesSoft:     '#FFE0EC',
  maybeSoft:   '#FFE5D0',
  noSoft:      '#EBE5F5',
  bg:          '#FFF5F0',
  surface:     '#FFFFFF',
  border:      '#FFE5DC',
  divider:     '#FFEEE5',
  ink:         '#2A1A24',
  inkSoft:     '#5C4954',
  inkMute:     '#9A8590',
  inkFaint:    '#C7B5BE',
} as const

export const VOTE_CONFIG = {
  yes:   { emoji: '👍', label: '참석', color: COLORS.yes,   soft: COLORS.yesSoft },
  maybe: { emoji: '🤔', label: '미정', color: COLORS.maybe, soft: COLORS.maybeSoft },
  no:    { emoji: '👎', label: '불참', color: COLORS.no,    soft: COLORS.noSoft },
} as const

export const RADIUS = {
  sm: '8px', md: '12px', lg: '16px', xl: '18px', '2xl': '22px', pill: '99px',
} as const

// 히어로 그라데이션
export const GRAD_HERO = 'linear-gradient(135deg, #FF7AA8 0%, #C8A8E9 100%)'
export const GRAD_BG   = 'radial-gradient(ellipse at top, #FFE0E8 0%, transparent 50%), #FFF5F0'
