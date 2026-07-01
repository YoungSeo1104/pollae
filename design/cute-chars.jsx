// 폴래 cute — 캐릭터 아바타 라이브러리 (SVG 8종)
// 각 캐릭터는 둥근 얼굴 + 고유 특징(귀/장식) + 표정.
// props: { color, size, expression?, name? }
// 컬러는 테마에서 주입받음.

function CharBase({ size = 56, bodyColor, children, style = {} }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{display:'block', ...style}}>
      <defs>
        <radialGradient id={`glow-${bodyColor.replace('#','')}`} cx="0.4" cy="0.35">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      {children}
    </svg>
  );
}

// Face features
const Eyes = ({ kind = 'dot', x = 40, y = 44 }) => {
  const ex = 7;
  if (kind === 'dot') return (
    <g>
      <circle cx={x-ex} cy={y} r="2.6" fill="#1a1a1a"/>
      <circle cx={x+ex} cy={y} r="2.6" fill="#1a1a1a"/>
      <circle cx={x-ex+0.8} cy={y-0.8} r="0.9" fill="#fff"/>
      <circle cx={x+ex+0.8} cy={y-0.8} r="0.9" fill="#fff"/>
    </g>
  );
  if (kind === 'happy') return (
    <g stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round">
      <path d={`M${x-ex-3} ${y+1} Q${x-ex} ${y-3} ${x-ex+3} ${y+1}`}/>
      <path d={`M${x+ex-3} ${y+1} Q${x+ex} ${y-3} ${x+ex+3} ${y+1}`}/>
    </g>
  );
  if (kind === 'wink') return (
    <g>
      <circle cx={x-ex} cy={y} r="2.6" fill="#1a1a1a"/>
      <circle cx={x-ex+0.8} cy={y-0.8} r="0.9" fill="#fff"/>
      <path d={`M${x+ex-3} ${y+1} Q${x+ex} ${y-3} ${x+ex+3} ${y+1}`}
        stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    </g>
  );
  if (kind === 'sparkle') return (
    <g fill="#1a1a1a">
      <circle cx={x-ex} cy={y} r="3"/>
      <circle cx={x+ex} cy={y} r="3"/>
      <circle cx={x-ex+1} cy={y-1.2} r="1.3" fill="#fff"/>
      <circle cx={x+ex+1} cy={y-1.2} r="1.3" fill="#fff"/>
      <circle cx={x-ex-1.5} cy={y+1.2} r="0.7" fill="#fff"/>
      <circle cx={x+ex-1.5} cy={y+1.2} r="0.7" fill="#fff"/>
    </g>
  );
  if (kind === 'sleepy') return (
    <g stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d={`M${x-ex-3} ${y} Q${x-ex} ${y+1.5} ${x-ex+3} ${y}`}/>
      <path d={`M${x+ex-3} ${y} Q${x+ex} ${y+1.5} ${x+ex+3} ${y}`}/>
    </g>
  );
  return null;
};

const Mouth = ({ kind = 'smile', x = 40, y = 55 }) => {
  if (kind === 'smile') return <path d={`M${x-3} ${y} Q${x} ${y+3} ${x+3} ${y}`}
    stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>;
  if (kind === 'o') return <ellipse cx={x} cy={y} rx="2" ry="2.4" fill="#1a1a1a"/>;
  if (kind === 'side') return <path d={`M${x-1} ${y} Q${x+2} ${y+2.5} ${x+4} ${y-1}`}
    stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>;
  if (kind === 'cat') return (
    <g stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d={`M${x-3} ${y} Q${x-1.5} ${y+2} ${x} ${y}`}/>
      <path d={`M${x} ${y} Q${x+1.5} ${y+2} ${x+3} ${y}`}/>
    </g>
  );
  return null;
};

const Blush = ({ x = 40, color = '#FF85A1' }) => (
  <g opacity="0.55">
    <ellipse cx={x-13} cy={51} rx="4" ry="2.2" fill={color}/>
    <ellipse cx={x+13} cy={51} rx="4" ry="2.2" fill={color}/>
  </g>
);

// 8 character variants — name → render function
const CHARS = {
  // 1. 둥글이 — 베이직 둥근 얼굴, 큰 미소
  dungle: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <circle cx="40" cy="44" r="28" fill={color}/>
      <Blush color={blushColor}/>
      <Eyes kind="happy"/>
      <Mouth kind="smile"/>
    </CharBase>
  ),
  // 2. 토끼 — 긴 귀 + 평화 표정
  bunny: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <ellipse cx="30" cy="18" rx="5" ry="14" fill={color}/>
      <ellipse cx="50" cy="18" rx="5" ry="14" fill={color}/>
      <ellipse cx="30" cy="20" rx="2" ry="8" fill="#fff" opacity="0.45"/>
      <ellipse cx="50" cy="20" rx="2" ry="8" fill="#fff" opacity="0.45"/>
      <circle cx="40" cy="46" r="26" fill={color}/>
      <Blush color={blushColor}/>
      <Eyes kind="dot" y="44"/>
      <Mouth kind="smile" y="55"/>
    </CharBase>
  ),
  // 3. 곰 — 둥근 귀, 졸린 눈
  bear: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <circle cx="22" cy="22" r="9" fill={color}/>
      <circle cx="58" cy="22" r="9" fill={color}/>
      <circle cx="22" cy="22" r="4" fill="#fff" opacity="0.45"/>
      <circle cx="58" cy="22" r="4" fill="#fff" opacity="0.45"/>
      <circle cx="40" cy="46" r="27" fill={color}/>
      <ellipse cx="40" cy="55" rx="11" ry="9" fill="#fff" opacity="0.6"/>
      <Blush color={blushColor}/>
      <Eyes kind="sleepy" y="44"/>
      <Mouth kind="o" y="55"/>
    </CharBase>
  ),
  // 4. 별 — 별 모양 머리
  star: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <path d="M40 12 L46 35 L70 36 L51 50 L58 72 L40 58 L22 72 L29 50 L10 36 L34 35 Z" fill={color}/>
      <Blush color={blushColor} x="40"/>
      <Eyes kind="sparkle" y="44"/>
      <Mouth kind="smile" y="54"/>
    </CharBase>
  ),
  // 5. 고양이 — 삼각 귀, 윙크
  cat: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <path d="M20 28 L26 12 L34 26 Z" fill={color}/>
      <path d="M60 28 L54 12 L46 26 Z" fill={color}/>
      <path d="M22 25 L26 16 L31 24 Z" fill="#fff" opacity="0.45"/>
      <path d="M58 25 L54 16 L49 24 Z" fill="#fff" opacity="0.45"/>
      <circle cx="40" cy="46" r="26" fill={color}/>
      <Blush color={blushColor}/>
      <Eyes kind="wink" y="44"/>
      <Mouth kind="cat" y="55"/>
      <g stroke="#1a1a1a" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M18 49 L24 50"/><path d="M18 53 L24 53"/>
        <path d="M56 50 L62 49"/><path d="M56 53 L62 53"/>
      </g>
    </CharBase>
  ),
  // 6. 부엉이 — 안경, 큰 눈
  owl: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <path d="M14 28 Q14 16 22 16 L26 26 Z" fill={color}/>
      <path d="M66 28 Q66 16 58 16 L54 26 Z" fill={color}/>
      <circle cx="40" cy="46" r="27" fill={color}/>
      <Blush color={blushColor}/>
      <g>
        <circle cx="33" cy="44" r="7" fill="#fff" stroke="#1a1a1a" strokeWidth="1.8"/>
        <circle cx="47" cy="44" r="7" fill="#fff" stroke="#1a1a1a" strokeWidth="1.8"/>
        <line x1="40" y1="44" x2="40" y2="44" stroke="#1a1a1a" strokeWidth="1.8"/>
        <circle cx="33" cy="44" r="2.5" fill="#1a1a1a"/>
        <circle cx="47" cy="44" r="2.5" fill="#1a1a1a"/>
      </g>
      <path d="M37 53 L40 56 L43 53 Z" fill="#FFB088"/>
    </CharBase>
  ),
  // 7. 펭귄 — 검정/흰 얼굴
  penguin: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <ellipse cx="40" cy="46" rx="28" ry="28" fill={color}/>
      <ellipse cx="40" cy="52" rx="20" ry="20" fill="#fff"/>
      <Blush color={blushColor}/>
      <g>
        <circle cx="34" cy="42" r="2.6" fill="#1a1a1a"/>
        <circle cx="46" cy="42" r="2.6" fill="#1a1a1a"/>
        <circle cx="34.8" cy="41.2" r="0.9" fill="#fff"/>
        <circle cx="46.8" cy="41.2" r="0.9" fill="#fff"/>
      </g>
      <path d="M37 50 L40 55 L43 50 Z" fill="#FFB088"/>
    </CharBase>
  ),
  // 8. 햄스터 — 볼주머니, 점박이
  hamster: ({ size, color, blushColor }) => (
    <CharBase size={size} bodyColor={color}>
      <circle cx="22" cy="26" r="7" fill={color}/>
      <circle cx="58" cy="26" r="7" fill={color}/>
      <circle cx="22" cy="26" r="3" fill="#FFB088" opacity="0.6"/>
      <circle cx="58" cy="26" r="3" fill="#FFB088" opacity="0.6"/>
      <circle cx="40" cy="46" r="28" fill={color}/>
      <ellipse cx="28" cy="56" rx="9" ry="7" fill="#fff" opacity="0.4"/>
      <ellipse cx="52" cy="56" rx="9" ry="7" fill="#fff" opacity="0.4"/>
      <Blush color={blushColor}/>
      <Eyes kind="dot" y="42"/>
      <Mouth kind="side" y="54"/>
    </CharBase>
  ),
};

const CHAR_KEYS = Object.keys(CHARS);

// Emoji avatar pool — 이름 해시 제거. 이름이 같아도 다른 사람일 수 있어
// 매 인스턴스마다 랜덤 배정 (useState로 안정화).
const EMOJI_AVATARS = [
  // 동물
  '🐰','🐻','🐼','🐨','🐱','🐶','🐹','🐧','🦄','🐸','🦊','🐮',
  '🐷','🐯','🐙','🦋','🐢','🦔','🐔','🐤',
  // 음식·디저트
  '🍑','🍓','🍒','🍎','🍊','🍋','🍇','🥑','🍞','🥐','🍩','🍰',
  '🧁','🍪','🍮','🍡','🍯',
  // 자연·심볼
  '🌸','🌷','🌻','🌼','🌹','🍄','🍀','☀️','🌙','⭐','✨','🌈',
  '⚡','🔥','💫','🎀','🎈','🎁','🎂','💖','💝','🌟',
];

// Random pick helper
function randomAvatar(palette) {
  const emoji = EMOJI_AVATARS[Math.floor(Math.random() * EMOJI_AVATARS.length)];
  const color = palette[Math.floor(Math.random() * palette.length)];
  return { emoji, color };
}

// Main avatar component — 이모지 only + 랜덤 배정
// props:
//   avatar    — 이모지 (지정 시 그것 사용)
//   avatarColor — 배경색 (지정 시 그것 사용)
//   name      — 이름 (DEMO_USERS에 있으면 자동 해결)
//   둘 다 없으면 컴포넌트 마운트 시 랜덤 (useState로 고정)
function CuteAvatar({ avatar, avatarColor, name, size = 44, theme, host, done = true, ring }) {
  const demo = name && window.demoAvatarOf ? window.demoAvatarOf(name) : null;
  const [picked] = React.useState(() => randomAvatar(theme.charPalette));
  const useEmoji = avatar || (demo && demo.avatar) || picked.emoji;
  const useColor = avatarColor || (demo && demo.color) || picked.color;
  return (
    <div style={{
      width: size, height: size, position: 'relative',
      flexShrink: 0,
      filter: done ? 'none' : 'grayscale(0.8) opacity(0.5)',
    }}>
      {/* Inner circle clips emoji */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        background: done ? useColor : '#EDE5DC',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: ring ? `0 0 0 3px ${ring}` : `inset 0 -2px 4px rgba(0,0,0,0.06)`,
        overflow: 'hidden',
      }}>
        <span style={{
          fontSize: size * 0.6, lineHeight: 1,
          display:'flex', alignItems:'center', justifyContent:'center',
          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
        }}>{useEmoji}</span>
      </div>
      {host && (
        <div style={{
          position:'absolute', top: -3, right: -3, zIndex: 2,
          width: size * 0.4, height: size * 0.4, borderRadius: '50%',
          background: theme.accent, color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize: size * 0.24, lineHeight: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          border: '2px solid #fff', boxSizing:'border-box',
        }}>👑</div>
      )}
    </div>
  );
}

Object.assign(window, { CHARS, CHAR_KEYS, EMOJI_AVATARS, CuteAvatar, randomAvatar });
