# 🗳️ Pollae (폴래)

> 우리, 언제 만날까요? — 링크 하나로 일정 조율 끝

[데모 사이트](https://pollae.vercel.app) · [디자인 시스템](링크)

![대표 스크린샷](./docs/hero.png)

---

## 소개

폴래는 친구·동아리 모임 일정 조율 투표 서비스예요.
호스트가 날짜 후보를 만들어 링크를 공유하면,
참여자가 회원가입 없이 ○△× 응답하고 자동으로 확정됩니다.

**참고 서비스**: Chouseisan(일본), Doodle(미국), When2Meet
**차별점**: 카카오톡 친화 공유, 1020 감성 UI, 자동 리마인더

---

## 주요 기능

- 🗳️ 일정 투표 — 날짜+시간 후보로 ○△× 투표
- 📍 연계 투표 — 일정 확정 후 장소·드레스코드 등 추가 투표
- 👥 게스트 참여 — 회원가입 없이 이름만 입력
- 🔔 자동 알림 — 마감 전 미투표자 리마인더 (이메일/웹푸시)
- 🏆 자동 확정 — 마감 시 최다 선택 날짜 자동 결정
- ⚖️ 동점 처리 — 호스트가 직접 선택
- 🔒 공개/비공개 — 투표자 노출 여부 설정

---

## 기술 스택

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query + Zustand

**Backend**
- Supabase (PostgreSQL, Auth, Realtime)
- Supabase Edge Functions

**Infra**
- Vercel
- Resend (이메일)

---

## 화면

| 랜딩 | 투표 페이지 | 결과 |
|------|------------|------|
| ![](./docs/landing.png) | ![](./docs/vote.png) | ![](./docs/result.png) |

---

## 핵심 설계 포인트

이력서/면접에서 어필할 부분들

**1. 게스트 인증 (No-Login UX)**
브라우저 토큰 기반 익명 식별. 같은 기기 재접속 시 수정 가능,
다른 기기 동일 이름 접속 시 충돌 감지 → 호스트 알림 플로우.

**2. 실시간 동기화**
Supabase Realtime으로 votes 테이블 변경 감지,
TanStack Query 캐시 자동 무효화.

**3. 자동 확정 로직**
Edge Function 크론으로 마감 감지 → 최다 슬롯 확정,
동점 시 호스트 알림 + 수동 선택 플로우.

**4. 디자인 시스템**
jellyPeach 테마, Pretendard 폰트, 59개 이모지 아바타,
Storybook 형태로 모든 컴포넌트 문서화.

---

## 개발 과정

- 기획·디자인·개발 1인 진행
- 디자인 시스템 우선 설계 → 컴포넌트 포팅
- AI Pair Programming (Claude Code) 활용 — `CLAUDE.md` 참조

---

## 로컬 실행

```bash
git clone ...
cd pollae
npm install
cp .env.example .env.local  # Supabase 키 입력
npm run dev
```

---

## 라이선스

MIT
