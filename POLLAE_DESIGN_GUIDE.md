# 폴래 (Pollae) 디자인 가이드

> Pollae Design System v1 · jellyPeach 테마 · 1020 타겟
> **이 파일은 디자인 작업의 단일 진실 공급원(Single Source of Truth)입니다.**

---

## 📋 목차 (AI 검색용 인덱스)

> 필요한 섹션만 골라 읽으세요. 전체를 읽지 않아도 됩니다.

| 작업 유형 | 읽어야 할 섹션 |
|---|---|
| 색상 참조 | §2 컬러 토큰 |
| 폰트/텍스트 | §3 타이포그래피 |
| 간격/모서리/그림자 | §4 레이아웃 토큰 |
| 버튼/입력/뱃지 | §5 Atoms |
| 투표 버튼/슬롯/바 | §6 Vote 컴포넌트 |
| 히어로/참여자 카드 | §7 Composite |
| 연계 투표 UI | §8 연계 투표 컴포넌트 |
| 소셜 로그인 UI | §9 소셜 로그인 |
| 아바타/이모지 | §10 아바타 풀 |
| 화면 목록 | §11 화면 목록 |
| 파일 위치 | §12 파일 구조 |
| 테마 변경 | §13 테마 전환 |
| 투표 상태 | §14 투표 페이지 상태 |
| 게스트 흐름 | §15 게스트 인증 플로우 |

### 빠른 참조

| 질문 | 답 |
|---|---|
| 메인 컬러? | `#FF7AA8` (Primary) |
| 참석/미정/불참 색상? | `#FF7AA8` / `#FFA962` / `#9580C0` |
| 투표 버튼 이모지? | 👍 🤔 👎 |
| 배경색? | `#FFF5F0` |
| 폰트? | Pretendard |
| CTA 버튼 높이? | 54px · borderRadius 18px |
| 아바타 총 종류? | 59종 |
| 타겟? | 1020 (10~20대) |
| 소셜 로그인? | 카카오 + 구글 (네이버·애플은 준비중 UI) |
| 연계 투표 타입? | schedule(필수) · place(선택) · custom(선택) |

---

## 1. 브랜드 정체성

| 항목 | 내용 |
|---|---|
| 서비스명 | 폴래 (Pollae) |
| 의미 | poll(투표) + -래(할래?) |
| 슬로건 | 우리, 언제 만날까요? |
| 타겟 | 10~20대 · 친구/동아리/소모임 |
| 톤 | 친근하되 존댓말 유지 · 이모지 자연스럽게 활용 |
| 버전 | Pollae Design System v1 |

---

## 2. 컬러 토큰

모든 컴포넌트는 `theme.*` 변수를 참조합니다.
원본: `design/cute-themes.jsx` → `CUTE_THEMES.jellyPeach`
코드: `src/lib/theme.ts` → `COLORS`

### 브랜드 컬러

| 이름 | 변수 | 헥스 | 용도 |
|---|---|---|---|
| Primary | `theme.primary` | `#FF7AA8` | 메인 CTA, 강조, 그라데이션 |
| Primary Deep | `theme.primaryDeep` | `#E0588B` | 호버, 눌림 상태 |
| Primary Soft | `theme.primarySoft` | `#FFE0EC` | 배경 틴트, 뱃지 배경 |
| Pop | `theme.pop` | `#C8A8E9` | 라벤더 · 그라데이션 보조 |
| Pop Soft | `theme.popSoft` | `#F0E5FF` | 배경 틴트 |
| Accent | `theme.accent` | `#FFB088` | 피치 보조 강조 |
| Accent Soft | `theme.accentSoft` | `#FFE8DC` | 배경 틴트 |

### 투표 상태 컬러

| 상태 | 변수 | 헥스 | 이모지 | 사용처 |
|---|---|---|---|---|
| Yes (참석) | `theme.yes` | `#FF7AA8` | 👍 | 참석 버튼 활성, 완료 뱃지 |
| Yes Soft | `theme.yesSoft` | `#FFE0EC` | | 참석 버튼 배경 |
| Maybe (미정) | `theme.maybe` | `#FFA962` | 🤔 | 미정 버튼 활성 |
| Maybe Soft | `theme.maybeSoft` | `#FFE5D0` | | 미정 버튼 배경 |
| No (불참) | `theme.no` | `#9580C0` | 👎 | 불참 버튼 활성 |
| No Soft | `theme.noSoft` | `#EBE5F5` | | 불참 버튼 배경 |

### 배경 & 서피스

| 이름 | 변수 | 헥스 | 용도 |
|---|---|---|---|
| Bg | `theme.bg` | `#FFF5F0` | 페이지 최외곽 배경 |
| Surface | `theme.surface` | `#FFFFFF` | 카드, 입력 필드 |
| Surface Alt | `theme.surfaceAlt` | `#FFF8F3` | 강조 카드 배경 |
| Border | `theme.border` | `#FFE5DC` | 카드·입력 테두리 |
| Divider | `theme.divider` | `#FFEEE5` | 구분선 |

### 텍스트 컬러

| 이름 | 변수 | 헥스 | 용도 |
|---|---|---|---|
| Ink | `theme.ink` | `#2A1A24` | 메인 텍스트 |
| Ink Soft | `theme.inkSoft` | `#5C4954` | 보조 텍스트 |
| Ink Mute | `theme.inkMute` | `#9A8590` | 힌트, 캡션 |
| Ink Faint | `theme.inkFaint` | `#C7B5BE` | 플레이스홀더, 비활성 |

### 그라데이션

```css
/* 페이지 배경 */
background:
  radial-gradient(ellipse at top, #FFE0E8 0%, transparent 50%),
  radial-gradient(ellipse at bottom right, #F0E0FF 0%, transparent 50%),
  #FFF5F0;

/* 히어로 카드 */
background: linear-gradient(135deg, #FF7AA8 0%, #C8A8E9 100%);

/* Crown 배지 */
background: linear-gradient(135deg, #C8A8E9, #FF7AA8);

/* CTA 버튼 */
background: linear-gradient(135deg, #FF7AA8 0%, #C8A8E9 100%);
```

---

## 3. 타이포그래피

```css
font-family: "Pretendard", "Pretendard Variable",
             -apple-system, "Apple SD Gothic Neo", system-ui, sans-serif;
```

| 역할 | 크기 | 굵기 | 자간 | 사용처 |
|---|---|---|---|---|
| Display | 28px | 900 | -0.04em | 랜딩 히어로, 로고 |
| Title 1 | 22px | 900 | -0.025em | 화면 제목 |
| Title 2 | 18px | 800 | -0.02em | 섹션 제목 |
| Body L | 15px | 700 | 기본 | CTA 버튼, 강조 본문 |
| Body | 13~14px | 600 | 기본 | 일반 본문 |
| Caption | 11~12px | 600 | 기본 | 보조 정보, 응답 수 |
| Micro | 10px | 700 | 0.04em | 뱃지, D-3 라벨 |

> 타이틀 계열은 모두 `letter-spacing: -0.02em` 적용

---

## 4. 레이아웃 토큰

### Border Radius

| 값 | 사용처 |
|---|---|
| 8px | 작은 뱃지, 태그 |
| 12px | 입력 필드 내부 요소 |
| 14px | 소형 카드 |
| 16px | 중형 카드 |
| 18px | CTA 버튼, 투표 버튼 |
| 20px | 대형 카드 |
| 22px | 히어로 카드, 참여자 카드 |
| 99px | 뱃지, 칩, 토글 (pill) |

### Spacing

| 토큰 | 값 | 용도 |
|---|---|---|
| xs | 4px | 아이콘-텍스트 간격 |
| sm | 8px | 요소 간 소간격 |
| md | 12px | 카드 내부 보조 |
| lg | 16px | 수평 패딩, 섹션 |
| xl | 20px | 카드 내부 패딩 |
| 2xl | 24px | 페이지 패딩 |
| 3xl | 32px | 섹션 간 큰 간격 |

> 최소 터치 영역: **44px**

### Elevation (Shadow)

```css
/* Soft — 카드 기본 */
box-shadow: 0 1px 3px rgba(0,0,0,0.06);

/* Lifted — 호버, 강조 카드 */
box-shadow: 0 8px 24px rgba(255,122,168,0.15);

/* Float — CTA 버튼, 플로팅 요소 */
box-shadow: 0 12px 30px rgba(255,122,168,0.4);

/* 투표 버튼 활성 */
box-shadow: 0 6px 14px {color}50, 0 0 0 3px {colorSoft};
```

---

## 5. 컴포넌트 — Atoms

### 5-1. PrimaryBtn

높이 54px · borderRadius 18px · 그라데이션 배경 (primary → pop)

| Variant | 스타일 |
|---|---|
| 기본 | `linear-gradient(135deg, #FF7AA8, #C8A8E9)` · 흰 텍스트 |
| Ghost | 투명 배경 · primary 텍스트·테두리 |
| Disabled | border 색 배경 · faint 텍스트 · opacity 0.5 |

**Pill/Chip 버튼**
- 진행중: `bg: primary, color: #fff, borderRadius: 99px`
- 마감됨: `bg: surface, color: inkSoft, border: border`
- 복사: `bg: primary, color: #fff, borderRadius: 12px`

---

### 5-2. Input

높이 52px · padding `0 16px` · borderRadius 16px · fontSize 15px · fontWeight 700

| Variant | 스타일 |
|---|---|
| Default | `border: 1.5px solid theme.border` |
| Focused | `border: 1.5px solid theme.primary` |
| With avatar prefix | 좌측 padding 52px · 아바타 절대위치 left:10 top:10 |

---

### 5-3. Toggle

너비 44px · 높이 26px · borderRadius 13px

- ON: `background: theme.primary` · 핸들 left 21px
- OFF: `background: theme.border` · 핸들 left 3px
- 핸들: 20×20px · `background: #fff` · `transition: left 0.2s`

---

### 5-4. ProgressDots

```
step 0: ●──○──○   (1/3)
step 1: ●──●──○   (2/3)
step 2: ●──●──●   (3/3)
```

활성 dot: width 22px · `color: theme.primary`
비활성 dot: width 6px · `color: theme.border`

---

### 5-5. Chip / Badge

```
진행 중 · D-3   → primarySoft bg · primaryDeep color · 도트
마감됨          → ink bg · #fff color
✓ 완료 5        → yesSoft bg · yes color
⏳ 아직 3명     → bg bg · dashed border · inkSoft color
🔒 비공개       → surface bg · inkSoft color
👑 최다         → linear-gradient(135deg, pop, primary) · #fff · glow shadow
🔥 HOT          → primary bg · #fff · 9px 800
```

---

### 5-6. CuteAvatar

```
size:   28 | 36 | 44 | 56
states: done / host(👑) / not-voted(grayscale) / ring
stack:  marginLeft -10px으로 overlap
```

호스트: 우상단 👑 뱃지 (`size × 0.4` · primary bg)
미투표: `filter: grayscale(0.8) opacity(0.5)`

---

### 5-7. 애니메이션 클래스

```css
.pl-bounce    /* 스프링 바운스 — 투표 버튼 선택 시 */
.pl-pop       /* 팝업 등장 — Crown 배지 */
.pl-rise      /* 아래서 올라오는 등장 — 카드 순차 */
.pl-pressable /* :active scale(0.96) — 모든 클릭 요소 */
```

---

## 6. 컴포넌트 — Vote

### 6-1. VoteButton

항상 3개 세트. 이모지: **👍(참석) 🤔(미정) 👎(불참)**

크기: width 72px · height 56px · borderRadius 18px · 이모지 22px · 숫자 10px (버튼 아래)

| State | 스타일 |
|---|---|
| Inactive | `bg: #fff` · `border: theme.border` · 이모지 연하게 |
| Active | `bg: {color}` · `border: {color}` · glow shadow · 숫자 #fff |

```css
/* Active shadow */
box-shadow: 0 6px 14px {color}50, 0 0 0 3px {colorSoft};
```

---

### 6-2. SlotRow (schedule 타입)

```
[시간 텍스트        ]  [👍] [🤔] [👎]
[N명 응답           ]  [ 4] [ 1] [ 0]
```

- 왼쪽: 시간 + 응답자 수
- 오른쪽: 버튼 3개 + 각 버튼 바로 아래 숫자
- "참석 가장 많아요" 배지: **투표 제출 후에만** 표시

---

### 6-3. DateGroup (schedule 타입)

같은 날짜의 SlotRow들을 하나의 카드로 묶음.

```
┌─ 5월 27일 (수) ─────────────────┐
│ 오후 7 ~ 8시   5명 응답  👍 🤔 👎│
│                          4  1  0 │
│ 오후 8 ~ 9시   5명 응답  👍 🤔 👎│
│                          3  2  0 │
└──────────────────────────────────┘
```

---

### 6-4. StackedBar (결과·비공개 모드)

```
10/18 14~18  👑  5명  [━━━━━━━━━━━━━━━━━━━━━━━]
10/25 14~18      5명  [━━━━━━━━━━━━━━━━━━━━━  ]
```

높이 8px · borderRadius 4px · yes(pink) + maybe(amber) + no(purple) 비율

---

## 7. 컴포넌트 — Composite

### 7-1. Hero Card (투표 페이지 상단)

```
┌────────────────────────────────────┐  ← gradient bg
│ 🗳️ 투표                       ✨  │
│                                    │
│  동아리 MT 잡기 🌱                 │
│  호스트 · 민지 · 📅 마감 10/9 23:59 │
└────────────────────────────────────┘
```

```css
background: linear-gradient(135deg, #FF7AA8 0%, #C8A8E9 100%);
borderRadius: 22px;
padding: 18px;
boxShadow: 0 12px 30px rgba(255,122,168,0.4);
```

상단 뱃지: `rgba(255,255,255,0.25)` + `backdrop-filter: blur(6px)`
스티커(✨ 등): 절대 위치 · 회전 배치 · opacity 0.9

---

### 7-2. Participants Card

```
참여자 5/7                    71% 완료

✓ 완료 5
🐰민지(나)  🍑준호  🌸서연  🦊지훈  🐱하은

─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

⏳ 아직 2명
🐧도윤   🦄예진

[👋 콕 찌르기 보내기]
```

---

## 8. 컴포넌트 — 연계 투표 (신규)

일정 투표 확정 후 또는 생성 시 선택적으로 추가하는 투표.

### 8-1. PollTypeSelector (투표 추가 버튼)

이벤트 생성 Step 3 하단 또는 대시보드 이벤트 상세에 위치.

```
┌──────────────────────────────────┐
│  + 투표 추가하기                  │
│  📍 장소 투표   👗 드레스코드     │
│  ✏️ 직접 입력                    │
└──────────────────────────────────┘
```

스타일: primarySoft bg · primary color · borderRadius 16px · dashed border

---

### 8-2. ExtraPollCard (place / custom 타입)

DateGroup 대신 텍스트 항목 리스트로 표시.
○△× 방식 동일하게 👍🤔👎 버튼 사용.

```
┌─ 📍 장소 투표 ─────────────────────┐
│                                     │
│  강남 스시집     3명 응답  👍 🤔 👎  │
│                            2  1  0  │
│  홍대 이자카야   3명 응답  👍 🤔 👎  │
│                            1  1  1  │
│  합정 포차       3명 응답  👍 🤔 👎  │
│                            0  1  2  │
└─────────────────────────────────────┘
```

헤더: poll_type에 따라 아이콘 자동 매핑
- `place` → 📍
- `custom` → ✏️ (또는 호스트가 설정한 이모지)

---

### 8-3. 연계 투표 상태 배지

```
📍 장소 투표   [투표중]    → primarySoft bg
📍 장소 투표   [확정됨 ✓]  → yesSoft bg · "강남 스시집"
✏️ 드레스코드  [투표중]    → primarySoft bg
```

---

## 9. 소셜 로그인 (신규)

### 9-1. 버튼 스펙

| 플랫폼 | 배경색 | 텍스트색 | 상태 |
|---|---|---|---|
| 카카오 | `#FEE500` | `#191919` | ✅ 활성 |
| 구글 | `#FFFFFF` | `#191919` · border `#E0E0E0` | ✅ 활성 |
| 네이버 | `#03C75A` | `#FFFFFF` | ⬜ 준비 중 (opacity 0.4) |
| 애플 | `#000000` | `#FFFFFF` | ⬜ 준비 중 (opacity 0.4) |

### 9-2. 로그인 페이지 레이아웃

```
┌────────────────────────────────┐
│     🐰  🍑  🌸  🦄            │
│                                │
│        Pollae                  │
│   우리, 언제 만날까요?          │
│                                │
│  ┌──────────────────────────┐  │
│  │ 💬  카카오로 시작하기     │  │  #FEE500
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  G  Google로 시작하기    │  │  #FFFFFF
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  N  네이버로 시작하기     │  │  #03C75A · 준비 중
│  │      (준비 중)           │  │  opacity 0.4
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │     Apple로 시작하기    │  │  #000000 · 준비 중
│  │      (준비 중)           │  │  opacity 0.4
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

버튼: 높이 56px · borderRadius 16px · fontWeight 700 · 전체 너비

---

## 10. 아바타 풀

총 **59종** · 가입/첫 응답 시 랜덤 배정 · 이름과 무관

### 카테고리별

```
동물 (20종):  🐰 🐻 🐼 🐨 🐱 🐶 🐹 🐧 🦄 🐸 🦊 🐮 🐷 🐯 🐙 🦋 🐢 🦔 🐔 🐤
음식 (17종):  🍑 🍓 🍒 🍎 🍊 🍋 🍇 🥑 🍞 🥐 🍩 🍰 🧁 🍪 🍮 🍡 🍯
자연 (22종):  🌸 🌷 🌻 🌼 🌹 🍄 🍀 ☀️ 🌙 ⭐ ✨ 🌈 ⚡ 🔥 💫 🎀 🎈 🎁 🎂 💖 💝 🌟
```

### 배경 팔레트 (charPalette)

```
#FFC8DE · #FFB088 · #FFD9A8 · #C8A8E9
#A8D8FF · #FFAACC · #FFCDB8 · #D9C5F0
```

### 고정 데모 사용자

| 이름 | 아바타 | 배경 |
|---|---|---|
| 민지 | 🐰 | #FFC8DE |
| 준호 | 🍑 | #FFB088 |
| 서연 | 🌸 | #FFAACC |
| 지훈 | 🦊 | #FFD9A8 |
| 하은 | 🐱 | #C8A8E9 |
| 도윤 | 🐧 | #A8D8FF |
| 예진 | 🦄 | #D9C5F0 |
| 시우 | 🐻 | #FFCDB8 |

---

## 11. 화면 목록

| 라우트 | 컴포넌트 | 파일 | 설명 |
|---|---|---|---|
| `landing` | `LandingScreen` | cute-create.jsx | 랜딩/홈 |
| `login` | `LoginScreen` | cute-auth.jsx | 소셜 로그인 (카카오·구글 활성) |
| `create-1` | `CreateStep1Screen` | cute-create.jsx | 이벤트 정보 |
| `create-2` | `CreateStep2Screen` | cute-create.jsx | 일정 후보 (schedule poll) |
| `create-3` | `CreateStep3Screen` | cute-create.jsx | 옵션 + 연계 투표 추가 버튼 |
| `invite` | `InviteScreen` | cute-result.jsx | 초대장/공유 |
| `vote` | `CuteVotePage` | cute-vote.jsx | 투표 페이지 (핵심) |
| `conflict` | `GuestConflictScreen` | cute-auth.jsx | 게스트 이름 중복 |
| `result` | `ResultScreen` | cute-result.jsx | 결과 확정 |
| `dashboard` | `DashboardScreen` | cute-result.jsx | 호스트 대시보드 |
| `manage` | `HostManageScreen` | cute-auth.jsx | 참여자 관리/삭제 |
| `empty` | `EmptyDashboardScreen` | cute-states.jsx | 빈 대시보드 |
| `loading` | `LoadingScreen` | cute-states.jsx | 로딩 |
| `error-*` | `ErrorScreen` | cute-states.jsx | 404 · 만료 · 네트워크 |

### 신규 화면 (연계 투표)

| 화면 | 설명 |
|---|---|
| PollTypeSelector | 연계 투표 추가 선택 UI (create-3 하단 또는 대시보드) |
| ExtraPollCard | place / custom 투표 카드 |
| ExtraPollCreate | 연계 투표 항목 입력 화면 |

---

## 12. 파일 구조

```
design/                              ← 클로드 디자인 산출물 (원본)
├── Pollae_Prototype.html            # 전체 플로우 인터랙티브
├── Pollae_Full_Screens.html         # 모든 화면 하이파이 캔버스
├── Pollae_Vote.html                 # 투표 페이지 단독 + Tweaks
├── Pollae_Storybook_Standalone.html # 디자인 시스템 단독 실행
├── cute-vote.jsx     → CuteVotePage
├── cute-create.jsx   → NavBar, PrimaryBtn, ProgressDots
│                       LandingScreen, CreateStep1~3, InviteScreen
├── cute-result.jsx   → ResultScreen, DashboardScreen
├── cute-auth.jsx     → LoginScreen, GuestConflictScreen, HostManageScreen
├── cute-states.jsx   → EmptyDashboardScreen, LoadingScreen, ErrorScreen
├── cute-themes.jsx   → CUTE_THEMES.jellyPeach (토큰 원본)
├── cute-chars.jsx    → CuteAvatar, EMOJI_AVATARS (59종)
└── demo-users.jsx    → DEMO_USERS 고정 아바타

src/
└── lib/theme.ts                     ← cute-themes.jsx 값과 일치해야 함
```

---

## 13. 테마 전환

현재 기본값: `jellyPeach`. HTML 한 줄만 수정하면 전체 전환.

```js
const T = CUTE_THEMES.jellyPeach   // 현재 (확정)
const T = CUTE_THEMES.mintCampus   // 민트 (참고용)
const T = CUTE_THEMES.y2kPop       // Y2K (참고용)
```

> 호스트가 이벤트 생성 시 색상 테마를 선택할 수 있는 기능은 추후 추가 예정.

---

## 14. 투표 페이지 상태

**투표 완료 버튼 = 제출 개념** (임시저장 아님)

| 상태 | 조건 | CTA 버튼 |
|---|---|---|
| 초기 | 이름 미입력 or 선택 없음 | Disabled |
| 선택 중 | 이름 입력 + 1개 이상 선택 | "투표 완료 →" 활성 |
| 제출 완료 | submitted = true | "✓ 응답 보냈어요!" · 👑최다 배지 표시 |
| 수정 중 | 제출 후 재선택 | submitted = false → 재제출 |
| 마감 | isExpired = true | 버튼 Disabled · 입력 잠금 |

> 제출 전 이탈 시 "투표가 저장되지 않았어요" 경고

---

## 15. 게스트 인증 플로우

```
링크 접속
  └→ 브라우저 토큰 있음?
       ├→ Yes → 기존 응답 불러오기 (수정 모드, 마감 전까지)
       └→ No  → 이름 입력 → 투표 시도
                  └→ 같은 이름 존재?
                       ├→ Yes → GuestConflictScreen
                       │    ├→ "내 거예요" → 호스트 알림
                       │    └→ "다른 사람" → 이름(2) 처리
                       └→ No  → 정상 제출 + 토큰 저장
```

호스트 삭제 후 재접속 → 미투표 상태 표시 (게스트 알림 없음)

---

*출처: Pollae Design System v1 · 폴래___디자인_시스템__Print_.pdf · cute-themes.jsx*
