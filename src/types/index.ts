// types/index.ts — 앱 레벨 타입. 반드시 이 타입 사용, 임의 생성 금지.

export type TVoteKind = 'yes' | 'maybe' | 'no'
export type TEventStatus = 'voting' | 'closed' | 'confirmed'
export type TPollType = 'schedule' | 'place' | 'custom'

export type TEvent = {
  id: string
  host_id: string
  code: string                   // 공유 단축코드 (v/[code])
  title: string
  description: string | null
  created_at: string
}

// Poll — 투표 라운드 (이벤트당 1개 이상)
export type TPoll = {
  id: string
  event_id: string
  poll_type: TPollType
  title: string
  status: TEventStatus
  anonymous_vote: boolean
  vote_deadline: string | null
  confirmed_item_id: string | null
  confirmed_at: string | null
  order: number
  created_at: string
}

// PollItem — 투표 항목
export type TPollItem = {
  id: string
  poll_id: string
  label: string
  description: string | null
  slot_date: string | null
  slot_time: string | null
  slot_time_end: string | null
  order: number
  created_at: string
}

export type TParticipant = {
  id: string
  event_id: string
  user_id: string | null
  name: string
  guest_token: string | null
  has_voted: boolean
  invited_at: string
}

export type TVote = {
  id: string
  participant_id: string
  poll_item_id: string
  answer: TVoteKind
  voted_at: string
}

export type TPollItemWithVotes = TPollItem & {
  votes: TVote[]
  my_vote: TVoteKind | null
}

export type TPollWithItems = TPoll & {
  items: TPollItemWithVotes[]
}
