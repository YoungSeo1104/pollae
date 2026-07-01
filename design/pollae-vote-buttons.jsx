// 폴래 hi-fi — vote button components

const P = window.POLLAE;

// Vote button glyph rendering — switches between emoji/symbol/text per tweak.
const VOTE_LABELS = {
  yes: { ko: '갈래요',  short: '참석' },
  maybe: { ko: '아마도', short: '미정' },
  no: { ko: '못 가요',   short: '불참' },
};
const VOTE_EMOJI  = { yes: '👍', maybe: '🤔', no: '👎' };
const VOTE_SYMBOL = { yes: '○',  maybe: '△', no: '×' };

const voteColor = (k) => ({
  yes:   { fg: P.yes,   bg: P.yesSoft,   solid: P.yes,   text: '#fff' },
  maybe: { fg: P.maybe, bg: P.maybeSoft, solid: P.maybe, text: '#fff' },
  no:    { fg: P.no,    bg: P.noSoft,    solid: P.no,    text: '#fff' },
}[k]);

// Single round vote button — used in the compact slot row layout.
function VoteButton({ kind, active, count, onPick, style = '', interactive = true }) {
  const c = voteColor(kind);
  const isEmoji = style === 'emoji';
  const isSymbol = style === 'symbol';
  const isText = style === 'text';

  const glyph = isEmoji ? VOTE_EMOJI[kind]
              : isSymbol ? VOTE_SYMBOL[kind]
              : VOTE_LABELS[kind].short;

  const dim = isText ? { w: 58, h: 44 } : { w: 44, h: 44 };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
      <button
        className={"pl-pressable" + (active ? ' pl-bounce' : '')}
        onClick={interactive ? () => onPick && onPick(kind) : undefined}
        style={{
          width: dim.w, height: dim.h,
          borderRadius: 14,
          background: active ? c.solid : '#fff',
          color: active ? c.text : (isSymbol ? c.fg : P.inkSoft),
          border: `1.5px solid ${active ? c.solid : P.border}`,
          fontSize: isText ? 13 : (isSymbol ? 22 : 22),
          fontWeight: isText ? 700 : (isSymbol ? 700 : 400),
          lineHeight: 1,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: active ? `0 4px 12px ${c.solid}40` : 'none',
        }}
      >
        <span style={{display:'inline-block', transform: active && isEmoji ? 'scale(1.05)' : 'none'}}>{glyph}</span>
      </button>
      <div style={{
        fontSize: 11, fontWeight: 600,
        color: count > 0 ? c.fg : P.inkFaint,
        fontVariantNumeric: 'tabular-nums',
        minHeight: 14,
      }}>{count > 0 ? count : '·'}</div>
    </div>
  );
}

// Stacked bar (used in private mode + result preview)
function StackedBar({ y, m, n, height = 6 }) {
  const total = Math.max(1, y + m + n);
  return (
    <div style={{
      display:'flex', height, borderRadius: height/2, overflow:'hidden',
      background: P.divider,
    }}>
      <div style={{flex: y, background: P.yes, transition:'flex 0.3s'}}/>
      <div style={{flex: m, background: P.maybe, transition:'flex 0.3s'}}/>
      <div style={{flex: n, background: P.no, transition:'flex 0.3s'}}/>
    </div>
  );
}

// Avatar (initial bubble)
function Avatar({ name, host, done, size = 30 }) {
  // Korean: use last 1-2 chars of name; or take first 1 letter
  const init = name.replace(/\s|\(.*\)/g, '').slice(-1);
  const colors = ['#E8896A','#F0AC4B','#3BAA75','#7AA9D8','#B57FD8','#E26D5C','#5FB3A8'];
  // simple hash
  let h = 0; for (let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) & 0xfff;
  const bg = colors[h % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: done ? bg : P.divider,
      color: done ? '#fff' : P.inkFaint,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontWeight: 700, fontSize: size * 0.42, position:'relative',
      border: host ? `2px solid ${P.peach}` : 'none',
      boxSizing:'border-box', flexShrink: 0,
    }}>
      {init}
      {host && (
        <div style={{
          position:'absolute', top:-4, right:-4,
          width: 14, height: 14, borderRadius:'50%', background: P.peach,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize: 8, color:'#fff',
        }}>👑</div>
      )}
    </div>
  );
}

Object.assign(window, { VoteButton, StackedBar, Avatar, VOTE_LABELS, VOTE_EMOJI, VOTE_SYMBOL, voteColor });
