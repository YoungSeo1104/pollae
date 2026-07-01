// Shared wireframe building blocks for 폴래(Pollae) wireframes.
// Sketchy / low-fi: dashed borders, gray fills, handwriting for annotations.

const WF = {
  paper: '#ffffff',
  ink: '#1f1b16',
  mute: '#8a8478',
  dash: '#c8c2b6',
  fill: '#ececeb',
  fillSoft: '#f5f3ee',
  peach: '#E8896A',
  peachSoft: '#FFF0EB',
  peachInk: '#C05A3A',
  blue: '#6B8EBF', // △ pending
  red: '#C97164',  // × cant
  green: '#7BA37B', // ○ yes
  hand: '"Caveat", "Gloria Hallelujah", cursive',
  ui: '"Pretendard", -apple-system, "Apple SD Gothic Neo", system-ui, sans-serif',
};

// Inject base wireframe styles once.
if (typeof document !== 'undefined' && !document.getElementById('wf-styles')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Pretendard:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
  // Pretendard fallback via cdn (Google Fonts may not have it)
  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';
  document.head.appendChild(link2);

  const s = document.createElement('style');
  s.id = 'wf-styles';
  s.textContent = `
    .wf { font-family: ${WF.ui}; color: ${WF.ink}; }
    .wf-hand { font-family: ${WF.hand}; font-weight: 600; color: ${WF.ink}; }
    .wf-note { font-family: ${WF.hand}; color: ${WF.peachInk}; font-size: 15px; line-height: 1.15; }
    .wf-mute { color: ${WF.mute}; }
    .wf-card { background: ${WF.paper}; border: 1.5px dashed ${WF.dash}; border-radius: 14px; }
    .wf-card-solid { background: ${WF.paper}; border: 1.5px solid ${WF.ink}; border-radius: 14px; }
    .wf-fill { background: ${WF.fill}; }
    .wf-fill-soft { background: ${WF.fillSoft}; }
    .wf-divider { height: 0; border-top: 1px dashed ${WF.dash}; }
    .wf-btn { display:inline-flex; align-items:center; justify-content:center;
      border-radius: 999px; border: 1.5px dashed ${WF.ink}; padding: 9px 14px;
      font-weight: 600; font-size: 13px; background: transparent; gap:6px; }
    .wf-btn-fill { border: 1.5px solid ${WF.ink}; background: ${WF.peach}; color: white; }
    .wf-btn-fill-ink { border: 1.5px solid ${WF.ink}; background: ${WF.ink}; color: white; }
    .wf-btn-ghost { border: 1.5px dashed ${WF.dash}; color: ${WF.mute}; }
    .wf-chip { display:inline-flex; align-items:center; gap:4px; padding: 4px 8px;
      border-radius: 999px; font-size: 11px; font-weight: 600;
      border: 1px dashed ${WF.dash}; color: ${WF.mute}; background: ${WF.paper}; }
    .wf-chip-peach { background: ${WF.peachSoft}; color: ${WF.peachInk}; border-color: ${WF.peachSoft}; }
    .wf-chip-ink { background: ${WF.ink}; color: white; border-color: ${WF.ink}; }
    .wf-input { width: 100%; border: 1.5px dashed ${WF.dash}; border-radius: 10px;
      padding: 10px 12px; background: ${WF.paper}; font-size: 13px; color: ${WF.mute}; }
    .wf-input-filled { border-style: solid; border-color: ${WF.ink}; color: ${WF.ink}; }
    .wf-ph { background: ${WF.fill}; border: 1px dashed ${WF.dash}; border-radius: 8px;
      display:flex; align-items:center; justify-content:center; color: ${WF.mute};
      font-family: ${WF.hand}; font-size: 14px; }
    .wf-x-line { background-image: repeating-linear-gradient(135deg, ${WF.dash}, ${WF.dash} 1px, transparent 1px, transparent 7px); }
    /* Vote buttons: three states */
    .vb { width: 38px; height: 38px; border-radius: 12px; display:flex;
      align-items:center; justify-content:center; font-size: 18px; font-weight: 700;
      border: 1.5px dashed ${WF.dash}; background: ${WF.paper}; color: ${WF.mute};
      flex-direction: column; gap: 0; line-height: 1; }
    .vb.on-yes { background: ${WF.green}; color: white; border-style: solid; border-color: ${WF.green}; }
    .vb.on-maybe { background: ${WF.blue}; color: white; border-style: solid; border-color: ${WF.blue}; }
    .vb.on-no { background: ${WF.red}; color: white; border-style: solid; border-color: ${WF.red}; }
    .vb-count { font-size: 10px; font-weight: 600; color: ${WF.mute}; margin-top: 4px; font-family: ${WF.ui}; }
    /* Arrow annotation */
    .wf-arrow { font-family: ${WF.hand}; color: ${WF.peachInk}; }
    /* Status bar / nav */
    .wf-status { height: 28px; display:flex; align-items:center; justify-content:space-between; padding: 0 18px; font-size: 11px; font-weight: 600; color: ${WF.ink}; }
    .wf-nav { height: 44px; display:flex; align-items:center; justify-content:space-between; padding: 0 12px; border-bottom: 1px dashed ${WF.dash}; }
    .wf-home-bar { height: 5px; background: ${WF.ink}; border-radius: 3px; width: 120px; margin: 0 auto; }
  `;
  document.head.appendChild(s);
}

// Simple wireframe phone frame: a hand-drawn rectangle, not pixel-real iOS.
const WFPhone = ({ children, width = 320, height = 640, label }) => (
  <div style={{
    width: width + 18, height: height + 18, padding: 9,
    borderRadius: 38, border: '1.5px solid ' + WF.ink,
    background: WF.paper, position: 'relative', display:'flex', flexDirection:'column',
  }}>
    <div style={{
      flex: 1, borderRadius: 30, overflow: 'hidden', background: WF.paper,
      border: '1px solid ' + WF.dash, position: 'relative',
    }}>
      {children}
    </div>
    {label && (
      <div className="wf-hand" style={{
        position:'absolute', bottom: -28, left: 0, right: 0,
        textAlign:'center', fontSize: 18, color: WF.peachInk,
      }}>{label}</div>
    )}
  </div>
);

// A "phone screen" container with the proper inner padding & status bar.
const WFScreen = ({ children, bg = WF.paper, statusBar = true, homeBar = true }) => (
  <div style={{ width: '100%', height: '100%', background: bg, display:'flex', flexDirection:'column', position:'relative' }}>
    {statusBar && (
      <div className="wf-status">
        <span>9:41</span>
        <span>•••</span>
      </div>
    )}
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>{children}</div>
    {homeBar && <div style={{ padding: '6px 0 10px' }}><div className="wf-home-bar" /></div>}
  </div>
);

// Sketchy arrow component (drawn as SVG path, slightly wobbly look).
const WFArrow = ({ from, to, label, color = WF.peachInk }) => {
  // from/to are {x,y} percentages relative to parent
  const dx = to.x - from.x, dy = to.y - from.y;
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }}>
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={color}/>
        </marker>
      </defs>
      <path d={`M ${from.x} ${from.y} Q ${(from.x+to.x)/2 + dy*0.15} ${(from.y+to.y)/2 - dx*0.15} ${to.x} ${to.y}`}
        stroke={color} strokeWidth="2" fill="none" strokeDasharray="6 4" markerEnd="url(#ar)" />
      {label && <text x={(from.x+to.x)/2} y={(from.y+to.y)/2 - 6} textAnchor="middle"
        fontFamily={WF.hand} fontSize="16" fill={color}>{label}</text>}
    </svg>
  );
};

// Vote button (yes/maybe/no), with optional count below.
const VoteBtn = ({ kind, state, count, style }) => {
  const cls = state === 'on' ? `vb on-${kind}` : 'vb';
  const glyphs = { yes: '○', maybe: '△', no: '×' };
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', ...style}}>
      <div className={cls}>{glyphs[kind]}</div>
      {count !== undefined && <div className="vb-count">{count}</div>}
    </div>
  );
};

// Emoji vote button variant (👍🤔👎)
const VoteBtnEmoji = ({ kind, state, count }) => {
  const cls = state === 'on' ? `vb on-${kind}` : 'vb';
  const glyphs = { yes: '👍', maybe: '🤔', no: '👎' };
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className={cls} style={{fontSize:18}}>{glyphs[kind]}</div>
      {count !== undefined && <div className="vb-count">{count}</div>}
    </div>
  );
};

Object.assign(window, { WF, WFPhone, WFScreen, WFArrow, VoteBtn, VoteBtnEmoji });
