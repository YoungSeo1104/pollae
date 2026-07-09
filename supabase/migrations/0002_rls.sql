-- Pollae Phase 1 — RLS 정책
-- 원칙:
--   * 조회(SELECT): 링크(코드)를 아는 사람은 열람 가능 → anon 포함 공개.
--     (anonymous_vote poll의 이름 숨김은 앱 집계 단계에서 처리)
--   * 쓰기: 이벤트 호스트(auth.uid)만 events/polls/poll_items 관리.
--   * 게스트 참여/투표: service_role 키를 쓰는 API Route에서 처리(RLS 우회).
--     따라서 votes/notifications 에는 클라이언트용 쓰기 정책을 두지 않는다.

alter table public.profiles           enable row level security;
alter table public.events             enable row level security;
alter table public.polls              enable row level security;
alter table public.poll_items         enable row level security;
alter table public.event_participants enable row level security;
alter table public.votes              enable row level security;
alter table public.notifications      enable row level security;

-- ---------- profiles ----------
create policy profiles_select_all on public.profiles
  for select using (true);
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---------- events ----------
create policy events_select_all on public.events
  for select using (true);
create policy events_insert_host on public.events
  for insert with check (auth.uid() = host_id);
create policy events_update_host on public.events
  for update using (auth.uid() = host_id) with check (auth.uid() = host_id);
create policy events_delete_host on public.events
  for delete using (auth.uid() = host_id);

-- 호스트 여부 헬퍼: 특정 event_id 의 호스트인지
create function public.is_event_host(target_event uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.events e
    where e.id = target_event and e.host_id = auth.uid()
  );
$$;

-- ---------- polls ----------
create policy polls_select_all on public.polls
  for select using (true);
create policy polls_write_host on public.polls
  for all
  using (public.is_event_host(event_id))
  with check (public.is_event_host(event_id));

-- ---------- poll_items ----------
create policy poll_items_select_all on public.poll_items
  for select using (true);
create policy poll_items_write_host on public.poll_items
  for all
  using (
    public.is_event_host(
      (select p.event_id from public.polls p where p.id = poll_id)
    )
  )
  with check (
    public.is_event_host(
      (select p.event_id from public.polls p where p.id = poll_id)
    )
  );

-- ---------- event_participants ----------
create policy participants_select_all on public.event_participants
  for select using (true);
-- 게스트 참여(insert)는 API Route(service_role)에서 처리. 호스트는 직접 삭제 가능.
create policy participants_delete_host on public.event_participants
  for delete using (public.is_event_host(event_id));

-- ---------- votes ----------
-- 조회만 공개. 쓰기는 service_role API Route 전용(정책 없음 = 클라이언트 거부).
create policy votes_select_all on public.votes
  for select using (true);

-- ---------- notifications ----------
-- 호스트만 자기 이벤트 알림 열람. 쓰기는 service_role 전용.
create policy notifications_select_host on public.notifications
  for select using (public.is_event_host(event_id));
