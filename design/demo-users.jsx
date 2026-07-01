// 폴래 — 데모용 사용자 아바타 데이터
// 실제 서비스에서는 회원가입 시 DB에 저장됨. 데모 시각 일관성용.
const DEMO_USERS = {
  '민지': { avatar: '🐰', color: '#FFC8DE' },
  '준호': { avatar: '🍑', color: '#FFB088' },
  '서연': { avatar: '🌸', color: '#FFAACC' },
  '지훈': { avatar: '🦊', color: '#FFD9A8' },
  '하은': { avatar: '🐱', color: '#C8A8E9' },
  '도윤': { avatar: '🐧', color: '#A8D8FF' },
  '예진': { avatar: '🦄', color: '#D9C5F0' },
  '시우': { avatar: '🐻', color: '#FFCDB8' },
  '지수': { avatar: '🍒', color: '#FFC8DE' },
  '해린': { avatar: '🌷', color: '#FFAACC' },
  '윤서': { avatar: '🍓', color: '#FFB088' },
  '채원': { avatar: '🌻', color: '#FFD9A8' },
  '수민': { avatar: '🐮', color: '#C8A8E9' },
  '은서': { avatar: '🦋', color: '#A8D8FF' },
  '채영': { avatar: '🐹', color: '#FFCDB8' },
  '민서': { avatar: '🌙', color: '#D9C5F0' },
};

// Helper — name → avatar lookup
function demoAvatarOf(name) {
  return DEMO_USERS[name] || null;
}

Object.assign(window, { DEMO_USERS, demoAvatarOf });
