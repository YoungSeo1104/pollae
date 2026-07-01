// 폴래 storybook — 공통 atoms 모음 (재사용)
// 이미 cute-create.jsx 에서 NavBar, PrimaryBtn, ProgressDots 등을 export 했으므로
// 여기는 storybook 용 wrapper와 추가 atoms.

const SB_T = window.CUTE_THEMES.jellyPeach;

// ─── Component card frame ─────────────────────────────────────
function SBCard({ title, subtitle, w, h, padded = true, dark = false, children }) {
  return (
    <div style={{
      width: w || 'auto', height: h || 'auto',
      background: '#fff', borderRadius: 14,
      border: '1px solid #EAE3DC',
      display:'flex', flexDirection:'column', overflow:'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    }}>
      <div style={{
        padding: '12px 16px 10px', borderBottom: '1px solid #F2EDE7',
        flexShrink: 0,
      }}>
        <div style={{fontSize: 12, fontWeight: 800, color: '#2A1A24', letterSpacing:'-0.01em'}}>
          {title}
        </div>
        {subtitle && (
          <div style={{fontSize: 10, color: '#8A7A6E', marginTop: 2, fontWeight: 500}}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{
        flex: 1, padding: padded ? 20 : 0,
        background: dark ? '#FBF6F2' : '#fff', overflow:'hidden',
      }}>{children}</div>
    </div>
  );
}

// Label above a row of variants (e.g., "Default", "Disabled")
function SBVariantRow({ label, children, gap = 12, align = 'center', column = false }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap: 8, marginBottom: 16}}>
      {label && (
        <div style={{
          fontSize: 10, fontWeight: 700, color: '#9A8590',
          textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>{label}</div>
      )}
      <div style={{
        display:'flex',
        flexDirection: column ? 'column' : 'row',
        flexWrap: column ? 'nowrap' : 'wrap',
        gap, alignItems: align,
      }}>{children}</div>
    </div>
  );
}

// Inline code tag (for prop names)
function SBCode({ children }) {
  return <span style={{
    fontFamily: 'ui-monospace,monospace', fontSize: 10,
    background: '#FFF0EB', color: '#C05A3A', padding: '1px 5px',
    borderRadius: 4, fontWeight: 600,
  }}>{children}</span>;
}

// Color swatch
function SBSwatch({ name, value, size = 'md' }) {
  const dim = size === 'lg' ? 72 : size === 'sm' ? 36 : 56;
  return (
    <div style={{textAlign: 'center', width: dim + 8}}>
      <div style={{
        width: dim, height: dim, borderRadius: 12, background: value,
        margin: '0 auto', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.06)',
      }}/>
      <div style={{fontSize: 10, fontWeight: 700, marginTop: 5, color: '#2A1A24'}}>{name}</div>
      <div style={{fontSize: 9, color: '#8A7A6E', fontFamily:'monospace'}}>{value}</div>
    </div>
  );
}

// Type sample
function SBType({ label, sample, size, weight = 700, letter = '-0.02em' }) {
  return (
    <div style={{
      display:'flex', alignItems:'baseline', gap: 14,
      padding: '10px 0', borderBottom: '1px dashed #F2EDE7',
    }}>
      <div style={{
        width: 90, flexShrink: 0,
        fontSize: 10, color: '#8A7A6E', fontWeight: 600,
      }}>
        <div style={{color:'#2A1A24', fontWeight: 700, fontSize: 11}}>{label}</div>
        <div>{size}px · {weight}</div>
      </div>
      <div style={{
        fontSize: size, fontWeight: weight, color: '#2A1A24',
        letterSpacing: letter, lineHeight: 1.2,
      }}>{sample}</div>
    </div>
  );
}

// Radius sample
function SBRadius({ value }) {
  return (
    <div style={{textAlign:'center'}}>
      <div style={{
        width: 60, height: 60, background: '#FFE0EC', borderRadius: value,
        border: '1px solid #FFC8DE',
      }}/>
      <div style={{fontSize: 10, marginTop: 6, fontWeight: 700, color:'#2A1A24'}}>{value}px</div>
    </div>
  );
}

// Spacing sample
function SBSpace({ value, label }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap: 12}}>
      <div style={{width: 40, fontSize: 10, fontWeight: 700, color:'#2A1A24'}}>{label}</div>
      <div style={{width: 30, fontSize: 10, color:'#8A7A6E', fontFamily:'monospace'}}>{value}</div>
      <div style={{height: 16, width: value, background: '#FF7AA8', borderRadius: 2}}/>
    </div>
  );
}

// Shadow sample
function SBShadow({ name, value }) {
  return (
    <div style={{textAlign:'center', width: 100}}>
      <div style={{
        width: 80, height: 50, background: '#fff', borderRadius: 10,
        boxShadow: value, margin:'10px auto',
      }}/>
      <div style={{fontSize: 10, fontWeight: 700, color:'#2A1A24'}}>{name}</div>
    </div>
  );
}

// Title section divider (between groups in canvas)
function SBHeading({ children }) {
  return (
    <h2 style={{
      fontSize: 22, fontWeight: 900, color:'#2A1A24',
      letterSpacing:'-0.02em', margin: 0,
    }}>{children}</h2>
  );
}

Object.assign(window, {
  SB_T, SBCard, SBVariantRow, SBCode, SBSwatch, SBType,
  SBRadius, SBSpace, SBShadow, SBHeading,
});
