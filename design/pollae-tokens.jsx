// 폴래 hi-fi — design tokens

const POLLAE = {
  // Core palette (per spec)
  peach: '#E8896A',
  peachSoft: '#FFF0EB',
  peachInk: '#C05A3A',
  peachDeep: '#9A4429',

  // Neutrals (warm)
  bg: '#FAF7F3',          // page background
  surface: '#FFFFFF',
  surfaceAlt: '#FFF8F3',
  border: '#F0E5DC',
  borderStrong: '#E2D3C5',
  divider: '#F5EBE2',

  // Text
  ink: '#1F1714',
  inkSoft: '#4A3D34',
  inkMute: '#8A7A6E',
  inkFaint: '#B8A89A',

  // Vote state colors
  yes:   '#3BAA75',  // 참석 - green
  yesSoft: '#E8F6EF',
  maybe: '#F0AC4B',  // 미정 - amber/orange  
  maybeSoft: '#FFF3E0',
  no:    '#E26D5C',  // 불참 - coral
  noSoft: '#FBE7E2',

  // Crowned (best)
  crown: '#D89B2A',
  crownSoft: '#FFF7E0',

  // Fonts
  font: '"Pretendard", "Pretendard Variable", -apple-system, "Apple SD Gothic Neo", system-ui, sans-serif',

  // Radii
  r1: 8, r2: 12, r3: 16, r4: 20, r5: 28,

  // Shadow
  shadow1: '0 1px 2px rgba(31,23,20,0.04), 0 1px 3px rgba(31,23,20,0.06)',
  shadow2: '0 2px 6px rgba(31,23,20,0.06), 0 8px 24px rgba(232,137,106,0.10)',
  shadowFloat: '0 8px 28px rgba(31,23,20,0.12), 0 2px 6px rgba(31,23,20,0.06)',
};

// Inject base styles + fonts once
if (typeof document !== 'undefined' && !document.getElementById('pollae-styles')) {
  if (!document.querySelector('link[href*="pretendard"]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';
    document.head.appendChild(l);
  }
  const s = document.createElement('style');
  s.id = 'pollae-styles';
  s.textContent = `
    .pollae * { box-sizing: border-box; }
    .pollae { font-family: ${POLLAE.font}; color: ${POLLAE.ink}; -webkit-font-smoothing: antialiased; }
    .pollae button { font-family: inherit; cursor: pointer; border: none; background: none; padding: 0; color: inherit; }
    @keyframes pollaeBounce {
      0% { transform: scale(1); }
      40% { transform: scale(0.88); }
      70% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
    @keyframes pollaePop {
      0% { transform: scale(0.5); opacity: 0; }
      60% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pollaeRise {
      0% { transform: translateY(8px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .pl-bounce { animation: pollaeBounce 0.35s cubic-bezier(.4,1.8,.6,1); }
    .pl-pop { animation: pollaePop 0.32s cubic-bezier(.34,1.56,.64,1); }
    .pl-rise { animation: pollaeRise 0.4s cubic-bezier(.2,.7,.3,1) backwards; }
    .pl-pressable { transition: transform 0.12s cubic-bezier(.4,.2,.2,1), box-shadow .15s, background .15s, border-color .15s; }
    .pl-pressable:active { transform: scale(0.96); }
    /* Hide scrollbar in phone frame */
    .pollae-scroll::-webkit-scrollbar { display: none; }
    .pollae-scroll { scrollbar-width: none; -ms-overflow-style: none; }
    /* Children of flex-column scroll container must not collapse */
    .pollae-scroll > * { flex-shrink: 0; }
  `;
  document.head.appendChild(s);
}

window.POLLAE = POLLAE;
