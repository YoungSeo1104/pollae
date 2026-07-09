-- Pollae — RLS 읽기 정책 강화
-- 문제: 0002의 SELECT 정책이 전부 using(true) → anon key(공개)로 전 테이블 덤프 가능
--       (크로스-이벤트 열람·참여자 실명 노출).
-- 방침: anon 직접 읽기 차단. 조회는 아래 두 경로로만.
--   1) 호스트(auth) → 자기 소유 행만 직접 조회.
--   2) 게스트/이벤트 공개 조회 → service_role 키를 쓰는 API Route(RLS 우회)에서
--      code·guest_token 을 앱 레벨에서 검증 후 스코프된 데이터만 반환.

-- 기존 전면공개 SELECT 정책 제거
drop policy if exists events_select_all       on public.events;
drop policy if exists polls_select_all        on public.polls;
drop policy if exists poll_items_select_all   on public.poll_items;
drop policy if exists participants_select_all on public.event_participants;
drop policy if exists votes_select_all        on public.votes;
drop policy if exists profiles_select_all     on public.profiles;

-- 호스트 스코프 SELECT (auth.uid 기준, anon 은 0행)
create policy events_select_host on public.events
  for select using (auth.uid() = host_id);

create policy polls_select_host on public.polls
  for select using (public.is_event_host(event_id));

create policy poll_items_select_host on public.poll_items
  for select using (
    public.is_event_host((select p.event_id from public.polls p where p.id = poll_id))
  );

create policy participants_select_host on public.event_participants
  for select using (public.is_event_host(event_id));

create policy votes_select_host on public.votes
  for select using (
    public.is_event_host((
      select p.event_id
      from public.poll_items pi
      join public.polls p on p.id = pi.poll_id
      where pi.id = poll_item_id
    ))
  );

-- profiles: 본인만 (호스트 표시명은 서버 API 에서 service_role 로 조회)
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
