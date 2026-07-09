# Supabase 설정 & 마이그레이션

## 마이그레이션 파일
- `migrations/0001_schema.sql` — 테이블·enum·제약·트리거 (Event→Poll→PollItem→Vote)
- `migrations/0002_rls.sql` — RLS 정책

## 최초 설정 순서

### 1. Supabase 프로젝트 생성
[supabase.com](https://supabase.com) 에서 프로젝트 생성 후, `.env.local` 채우기:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 2. 마이그레이션 적용 (택1)
**A. Supabase CLI (권장)**
```bash
npx supabase link --project-ref <프로젝트-ref>
npx supabase db push
```
**B. 대시보드** — SQL Editor 에서 `0001` → `0002` 순서로 붙여넣기 실행.

### 3. 타입 생성
```bash
# 원격 프로젝트에서
npx supabase gen types typescript --project-id <ref> > src/types/database.ts
# 또는 로컬 스택에서
npx supabase gen types typescript --local > src/types/database.ts
```

### 4. 타입 연결 확인
`src/types/index.ts`의 앱 타입(`TEvent` 등)이 `database.ts` 생성 타입과 일치하는지 확인.
불일치 시 마이그레이션 컬럼과 앱 타입을 맞춘다.

## 설계 메모
- **순환 FK**: `polls.confirmed_item_id → poll_items.id` 는 `poll_items` 생성 후 `ALTER` 로 추가.
- **30개 제한**: `poll_items` INSERT 트리거(`enforce_poll_item_limit`)로 poll당 30개 초과 차단.
- **게스트 식별**: `event_participants(event_id, guest_token)` 부분 유니크 인덱스.
- **RLS 읽기(0003)**: anon 직접 읽기 차단. 호스트(auth)는 자기 소유 행만 조회. 게스트/이벤트 공개 조회는 `service_role` API Route 에서 `code`·`guest_token` 검증 후 스코프 반환.
- **쓰기 경로**: `votes`·`event_participants` INSERT/UPDATE 는 `service_role` 키를 쓰는 API Route 에서 처리(RLS 우회). 클라이언트 직접 쓰기는 정책상 차단.
- **service_role 키**: 서버 전용. `.env.example`의 `SUPABASE_SERVICE_ROLE_KEY`(NEXT_PUBLIC_ 금지). Phase 3에서 `lib/supabase-admin.ts` 추가 예정.
- **`events.code`**: 공유 단축코드(`v/[code]`). `TEvent`에 반영됨.
