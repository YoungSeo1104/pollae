// 폴래 cute — 상태 화면들 (Empty / Loading / Error)

const { CuteAvatar: CA3, NavBar: NB3, PrimaryBtn: PB3 } = window;

// ═══════════════════════════════════════════════════════════════
// EMPTY — 대시보드 빈 상태 (투표 없음)
// ═══════════════════════════════════════════════════════════════
function EmptyDashboardScreen({ theme, nav = () => {} }) {
  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <NB3 theme={theme} title="" onBack={false}
      right={<button className="pl-pressable" style={{
        width: 36, height: 36, borderRadius: 18, padding: 0
      }}><CA3 name="민지" size={36} theme={theme} done /></button>} />
      <div className="pollae-scroll" style={{
        flex: 1, overflow: 'auto', padding: '4px 24px 100px',
        display: 'flex', flexDirection: 'column', gap: 16
      }}>
        {/* Hero greeting */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <CA3 name="민지" size={56} theme={theme} done host />
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: theme.ink,
              letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              안녕,<br />민지님 👋
            </div>
          </div>
        </div>

        {/* Empty illustration */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '40px 0',
          textAlign: 'center', gap: 16
        }}>
          {/* Stacked avatars decoration */}
          <div style={{ position: 'relative', width: 130, height: 130, marginBottom: 8 }}>
            <div style={{ position: 'absolute', top: 30, left: 0, transform: 'rotate(-10deg)' }}>
              <CA3 avatar="🐰" avatarColor={theme.charPalette[0]} size={56} theme={theme} done />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 38, transform: 'rotate(5deg)' }}>
              <CA3 avatar="🌸" avatarColor={theme.charPalette[5]} size={62} theme={theme} done />
            </div>
            <div style={{ position: 'absolute', top: 30, right: 0, transform: 'rotate(12deg)' }}>
              <CA3 avatar="🍑" avatarColor={theme.charPalette[1]} size={56} theme={theme} done />
            </div>
            <div style={{ position: 'absolute', top: -12, right: -2, fontSize: 22, transform: 'rotate(15deg)' }}>✨</div>
            <div style={{ position: 'absolute', bottom: -2, left: -2, fontSize: 22, transform: 'rotate(-15deg)' }}>💫</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: theme.ink, letterSpacing: '-0.02em' }}>
              아직 투표가 없어요
            </div>
            <div style={{ fontSize: 13, color: theme.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
              친구들과 일정을 정해야 하나요?<br />첫 투표를 만들어보세요!
            </div>
          </div>
        </div>

        {/* Examples */}
        <div style={{
          background: theme.surface, borderRadius: 18, padding: 16,
          border: `1.5px solid ${theme.border}`
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 10 }}>
            💡 이런 일정에 써보세요
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['🌱 MT 일정', '🍻 회식', '🎂 생일 파티', '📚 스터디', '✈️ 여행', '🍕 모임'].map((t) =>
            <span key={t} style={{
              fontSize: 11, fontWeight: 600, color: theme.primary,
              background: theme.primarySoft, padding: '5px 10px', borderRadius: 99
            }}>{t}</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 24px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)` }}>
        <PB3 theme={theme} onClick={() => nav('create-1')}>
          <span style={{ fontSize: 17 }}>＋</span> 첫 투표 만들기
        </PB3>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════
// LOADING
// ═══════════════════════════════════════════════════════════════
const __loadingCSS = `
@keyframes pollaeSpin { to { transform: rotate(360deg); } }
@keyframes pollaeBob1 { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-6px) rotate(-12deg); } }
@keyframes pollaeBob2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(4deg); } }
@keyframes pollaeBob3 { 0%,100% { transform: translateY(0) rotate(10deg); } 50% { transform: translateY(-6px) rotate(6deg); } }
@keyframes pollaePulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
.pl-bob1 { animation: pollaeBob1 1.4s ease-in-out infinite; }
.pl-bob2 { animation: pollaeBob2 1.4s ease-in-out infinite 0.15s; }
.pl-bob3 { animation: pollaeBob3 1.4s ease-in-out infinite 0.3s; }
.pl-dot1 { animation: pollaePulse 1.2s ease-in-out infinite; }
.pl-dot2 { animation: pollaePulse 1.2s ease-in-out infinite 0.2s; }
.pl-dot3 { animation: pollaePulse 1.2s ease-in-out infinite 0.4s; }
`;
if (typeof document !== 'undefined' && !document.getElementById('pollae-state-css')) {
  const s = document.createElement('style');s.id = 'pollae-state-css';
  s.textContent = __loadingCSS;document.head.appendChild(s);
}

function LoadingScreen({ theme, nav = () => {} }) {
  return (
    <div className="pollae" style={{
      background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', padding: 40, textAlign: 'center', justifyContent: "center", width: "322px", height: "791px"
    }}>
      {/* Bouncing avatars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 24, height: 80 }}>
        <div className="pl-bob1">
          <CA3 avatar="🐰" avatarColor={theme.charPalette[0]} size={56} theme={theme} done />
        </div>
        <div className="pl-bob2">
          <CA3 avatar="🌸" avatarColor={theme.charPalette[5]} size={56} theme={theme} done />
        </div>
        <div className="pl-bob3">
          <CA3 avatar="🍑" avatarColor={theme.charPalette[1]} size={56} theme={theme} done />
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 900, color: theme.ink, letterSpacing: '-0.02em' }}>
        잠시만요...
      </div>
      <div style={{
        fontSize: 13, color: theme.inkSoft, marginTop: 8,
        display: 'inline-flex', alignItems: 'center', gap: 4
      }}>
        투표 불러오는 중
        <span className="pl-dot1" style={{ color: theme.primary, fontWeight: 900 }}>·</span>
        <span className="pl-dot2" style={{ color: theme.primary, fontWeight: 900 }}>·</span>
        <span className="pl-dot3" style={{ color: theme.primary, fontWeight: 900 }}>·</span>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════
// ERROR — Not found / 만료
// ═══════════════════════════════════════════════════════════════
function ErrorScreen({ theme, nav = () => {}, kind = 'notfound' }) {
  // kind: 'notfound' | 'expired' | 'network'
  const config = {
    notfound: {
      emoji: '🔍',
      title: '투표를 찾을 수 없어요',
      desc: '링크가 잘못되었거나\n삭제된 투표일 수 있어요',
      cta: '홈으로 가기',
      to: 'landing'
    },
    expired: {
      emoji: '🌙',
      title: '이미 마감된 투표예요',
      desc: '결과를 확인해보세요',
      cta: '결과 보기',
      to: 'result'
    },
    network: {
      emoji: '📡',
      title: '연결이 불안정해요',
      desc: '인터넷 연결을 확인하고\n다시 시도해주세요',
      cta: '다시 시도',
      to: 'landing'
    }
  }[kind];

  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <NB3 theme={theme} title="" onBack={() => nav('landing')} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '40px 32px',
        textAlign: 'center', gap: 20
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: theme.surface,
            border: `2px dashed ${theme.borderStrong || theme.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 52
          }}>{config.emoji}</div>
          <div style={{ position: 'absolute', top: -8, right: -8, fontSize: 22,
            transform: 'rotate(15deg)' }}>💭</div>
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: theme.ink, letterSpacing: '-0.02em' }}>
            {config.title}
          </div>
          <div style={{
            fontSize: 13, color: theme.inkSoft, marginTop: 8, lineHeight: 1.5,
            whiteSpace: 'pre-line'
          }}>{config.desc}</div>
        </div>
        {/* Switch examples */}
        <div style={{
          display: 'flex', gap: 6, marginTop: 6
        }}>
          {[
          { k: 'notfound', l: '404' },
          { k: 'expired', l: '마감' },
          { k: 'network', l: '네트워크' }].
          map((o) =>
          <button key={o.k} onClick={() => nav('error-' + o.k)} style={{
            fontSize: 9, fontWeight: 600,
            padding: '4px 8px', borderRadius: 99,
            background: kind === o.k ? theme.primary : 'transparent',
            color: kind === o.k ? '#fff' : theme.inkMute,
            border: `1px solid ${kind === o.k ? theme.primary : theme.border}`,
            cursor: 'pointer', fontFamily: 'inherit'
          }}>{o.l}</button>
          )}
        </div>
      </div>

      <div style={{ padding: '12px 24px 28px',
        display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PB3 theme={theme} onClick={() => nav(config.to)}>{config.cta}</PB3>
      </div>
    </div>);

}

Object.assign(window, { EmptyDashboardScreen, LoadingScreen, ErrorScreen });