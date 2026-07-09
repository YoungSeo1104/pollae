-- Pollae Phase 1 — DB 스키마
-- 데이터 모델: Event → Poll[] → PollItem[] → Vote[]
-- 적용: supabase db push  (또는 대시보드 SQL Editor 실행)

-- =========================================================
-- Enum 타입
-- =========================================================
create type poll_type   as enum ('schedule', 'place', 'custom');
create type poll_status as enum ('voting', 'closed', 'confirmed');
create type vote_answer as enum ('yes', 'maybe', 'no');
create type notify_channel as enum ('email', 'webpush');

-- =========================================================
-- profiles — 호스트 공개 정보 (auth.users 연동)
-- 게스트는 auth 계정 없음 → event_participants 로만 존재
-- =========================================================
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text not null default '',
  avatar     text,
  created_at timestamptz not null default now()
);

-- 신규 가입 시 profiles 자동 생성
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- events — 이벤트 (링크 하나의 단위)
-- =========================================================
create table public.events (
  id          uuid primary key default gen_random_uuid(),
  host_id     uuid not null references auth.users(id) on delete cascade,
  code        text not null unique,          -- 공유 단축코드 (v/[code])
  title       text not null,
  description text,
  created_at  timestamptz not null default now()
);
create index events_host_id_idx on public.events(host_id);

-- =========================================================
-- polls — 투표 라운드 (이벤트당 1개 이상, schedule 필수)
-- =========================================================
create table public.polls (
  id                uuid primary key default gen_random_uuid(),
  event_id          uuid not null references public.events(id) on delete cascade,
  poll_type         poll_type not null,
  title             text not null,
  status            poll_status not null default 'voting',
  anonymous_vote    boolean not null default false,
  vote_deadline     timestamptz,               -- null = 상시
  confirmed_item_id uuid,                       -- FK는 poll_items 생성 후 추가
  confirmed_at      timestamptz,
  "order"           int not null default 0,
  created_at        timestamptz not null default now()
);
create index polls_event_id_idx on public.polls(event_id);

-- =========================================================
-- poll_items — 투표 항목 (schedule=날짜/시간, place·custom=라벨)
-- =========================================================
create table public.poll_items (
  id            uuid primary key default gen_random_uuid(),
  poll_id       uuid not null references public.polls(id) on delete cascade,
  label         text not null,
  description   text,
  slot_date     date,   -- schedule 전용
  slot_time     time,   -- schedule 전용
  slot_time_end time,   -- schedule 전용
  "order"       int not null default 0,
  created_at    timestamptz not null default now()
);
create index poll_items_poll_id_idx on public.poll_items(poll_id);

-- polls.confirmed_item_id → poll_items 순환 FK (테이블 생성 후 추가)
alter table public.polls
  add constraint polls_confirmed_item_fk
  foreign key (confirmed_item_id) references public.poll_items(id) on delete set null;

-- poll 당 항목 최대 30개 제약 (트리거)
create function public.enforce_poll_item_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.poll_items where poll_id = new.poll_id) >= 30 then
    raise exception 'poll_items 최대 30개 초과 (poll_id=%)', new.poll_id
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

create trigger poll_item_limit_trigger
  before insert on public.poll_items
  for each row execute function public.enforce_poll_item_limit();

-- =========================================================
-- event_participants — 참여자 (호스트 + 게스트)
-- 게스트: user_id null, guest_token 으로 식별
-- =========================================================
create table public.event_participants (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references public.events(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null, -- 게스트는 null
  name        text not null,
  guest_token text,
  has_voted   boolean not null default false,
  invited_at  timestamptz not null default now()
);
create index participants_event_id_idx on public.event_participants(event_id);
-- 같은 이벤트에서 게스트 토큰 유일
create unique index participants_event_token_uidx
  on public.event_participants(event_id, guest_token)
  where guest_token is not null;

-- =========================================================
-- votes — 응답 (참여자 × 항목)
-- =========================================================
create table public.votes (
  id             uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  poll_item_id   uuid not null references public.poll_items(id) on delete cascade,
  answer         vote_answer not null,
  voted_at       timestamptz not null default now(),
  -- 참여자당 항목 1응답
  constraint votes_participant_item_uniq unique (participant_id, poll_item_id)
);
create index votes_poll_item_id_idx on public.votes(poll_item_id);

-- =========================================================
-- notifications — 알림 큐/로그
-- =========================================================
create table public.notifications (
  id           uuid primary key default gen_random_uuid(),
  event_id     uuid not null references public.events(id) on delete cascade,
  poll_id      uuid references public.polls(id) on delete cascade,
  user_id      uuid references auth.users(id) on delete cascade,
  type         text not null,               -- reminder | confirmed | tie | duplicate
  channel      notify_channel not null,
  is_sent      boolean not null default false,
  scheduled_at timestamptz,
  sent_at      timestamptz,
  created_at   timestamptz not null default now()
);
create index notifications_pending_idx
  on public.notifications(scheduled_at)
  where is_sent = false;
