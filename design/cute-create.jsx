// 폴래 cute — 나머지 화면들 (랜딩 + 생성 + 공유 + 결과 + 대시보드)
// 모두 theme(jellyPeach) 주입.

const { CuteAvatar } = window;

// ─── Shared atoms ─────────────────────────────────────────────
const NavBar = ({ theme, title, onBack, right }) =>
<div style={{
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '6px 12px 6px 4px', height: 44, flexShrink: 0
}}>
    {onBack !== false ?
  <button onClick={typeof onBack === 'function' ? onBack : undefined} className="pl-pressable" style={{
    width: 36, height: 36, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: theme.inkSoft, fontSize: 18, background: 'rgba(255,255,255,0.65)'
  }}>‹</button> :
  <div style={{ width: 36 }} />}
    <div style={{ fontSize: 14, fontWeight: 800, color: theme.ink, letterSpacing: '-0.02em' }}>{title}</div>
    <div style={{ minWidth: 36, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
  </div>;


const PrimaryBtn = ({ theme, children, disabled, ghost, style = {}, onClick }) =>
<button onClick={onClick} disabled={disabled} className="pl-pressable" style={{
  height: 54, borderRadius: 18, width: '100%',
  background: ghost ? theme.surface :
  disabled ? theme.border :
  `linear-gradient(135deg, ${theme.primary}, ${theme.pop})`,
  color: ghost ? theme.primaryDeep : '#fff',
  border: ghost ? `1.5px solid ${theme.border}` : 'none',
  fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em',
  boxShadow: !ghost && !disabled ? `0 8px 20px ${theme.primary}55` : 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  whiteSpace: 'nowrap',
  cursor: disabled ? 'default' : 'pointer',
  ...style
}}>{children}</button>;


const ProgressDots = ({ theme, step, total = 3 }) =>
<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
    {Array.from({ length: total }).map((_, i) =>
  <div key={i} style={{
    height: 6, borderRadius: 3,
    width: i === step ? 22 : 6,
    background: i <= step ? theme.primary : theme.divider,
    transition: 'all 0.3s'
  }} />
  )}
    <span style={{ fontSize: 11, color: theme.inkMute, marginLeft: 4, fontWeight: 600 }}>
      {step + 1}/{total}
    </span>
  </div>;


const StickerDecor = ({ theme }) =>
<>
    <div style={{ position: 'absolute', top: 30, right: 24, fontSize: 24, opacity: 0.8,
    transform: 'rotate(15deg)', pointerEvents: 'none' }}>✨</div>
    <div style={{ position: 'absolute', top: 110, left: 26, fontSize: 18, opacity: 0.6,
    transform: 'rotate(-15deg)', pointerEvents: 'none' }}>💫</div>
    <div style={{ position: 'absolute', bottom: 200, right: 30, fontSize: 22, opacity: 0.5,
    transform: 'rotate(12deg)', pointerEvents: 'none' }}>🌷</div>
  </>;


// ═══════════════════════════════════════════════════════════════
// 1. LANDING / HOME
// ═══════════════════════════════════════════════════════════════
function LandingScreen({ theme, nav = () => {} }) {
  const sampleNames = ['민지', '준호', '서연', '지훈', '하은', '도윤', '예진', '시우', '지수', '해린'];
  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative',
      color: theme.ink, overflow: 'hidden'
    }}>
      <StickerDecor theme={theme} />
      <NavBar theme={theme} title="" onBack={false}
      right={<button onClick={() => nav('dashboard')} className="pl-pressable" style={{
        fontSize: 12, fontWeight: 700, color: theme.inkSoft,
        background: 'rgba(255,255,255,0.65)', padding: '6px 11px', borderRadius: 99
      }}>로그인</button>} />

      <div className="pollae-scroll" style={{
        flex: 1, overflow: 'auto', padding: '20px 24px 24px',
        display: 'flex', flexDirection: 'column', gap: 20
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.pop})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <span style={{ fontSize: 28, WebkitTextFillColor: 'initial' }}>🩷</span> Pollae
          </div>
          <div style={{
            fontSize: 24, fontWeight: 800, color: theme.ink,
            letterSpacing: '-0.02em', lineHeight: 1.25, marginTop: 8
          }}>
            우리,<br />언제 만날까요?
          </div>
          <div style={{ fontSize: 13, color: theme.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
            일정 후보를 올리면 친구들이<br />👍 🤔 👎 로 답해줘요.
          </div>
        </div>

        {/* Illustration card — mini vote preview */}
        <div style={{
          background: theme.surface, borderRadius: 22, padding: 18,
          border: `1.5px solid ${theme.border}`,
          boxShadow: `0 8px 24px ${theme.primary}15`,
          position: 'relative'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10
          }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: theme.ink }}>10월 18일 (토)</span>
            <span style={{
              fontSize: 9, fontWeight: 800, color: '#fff',
              background: `linear-gradient(135deg, ${theme.pop}, ${theme.primary})`,
              padding: '3px 7px', borderRadius: 99
            }}>👑 최다</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {['👍', '🤔', '👎'].map((e, i) => {
              const colors = [theme.yes, theme.maybe, theme.no];
              const counts = [5, 1, 0];
              return (
                <div key={i} style={{
                  flex: 1, height: 44, borderRadius: 14,
                  background: i === 0 ? colors[i] : '#fff',
                  border: `2px solid ${i === 0 ? colors[i] : theme.border}`,
                  color: i === 0 ? '#fff' : theme.ink,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16
                }}>
                  <span>{e}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? '#fff' : colors[i] }}>{counts[i]}</span>
                </div>);

            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: -10 }}>
            {sampleNames.slice(0, 5).map((n, i) =>
            <div key={n} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                <CuteAvatar name={n} size={26} theme={theme} done ring="#fff" />
              </div>
            )}
            <span style={{ fontSize: 11, color: theme.inkMute, fontWeight: 600, marginLeft: 6 }}>
              + 3명 참여 중
            </span>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryBtn theme={theme} onClick={() => nav('create-1')}>
            <span style={{ fontSize: 17 }}>＋</span> 새 투표 만들기
          </PrimaryBtn>
          <PrimaryBtn theme={theme} ghost onClick={() => nav('dashboard')}>참여한 투표 보기</PrimaryBtn>
          <div style={{ textAlign: 'center', fontSize: 11, color: theme.inkMute, marginTop: 4 }}>
            로그인 없이 바로 시작할 수 있어요
          </div>
        </div>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════
// 2. CREATE STEP 1 — 이벤트 정보
// ═══════════════════════════════════════════════════════════════
function CreateStep1Screen({ theme, nav = () => {} }) {
  const [name, setName] = React.useState('동아리 MT 잡기');
  const [host, setHost] = React.useState('민지');
  const [desc, setDesc] = React.useState('');
  const suggested = ['🌱', '🍕', '🏠', '🍻', '📚', '🎂', '🎉', '✈️'];
  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <NavBar theme={theme} title="새 투표 만들기" onBack={() => nav('landing')} />
      <div className="pollae-scroll" style={{
        flex: 1, overflow: 'auto', padding: '4px 20px 100px',
        display: 'flex', flexDirection: 'column', gap: 18
      }}>
        <ProgressDots theme={theme} step={0} />

        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: theme.ink }}>
            어떤 일정이에요?
          </div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 4 }}>
            친구들이 어떤 모임인지 알아보기 쉽게요
          </div>
        </div>

        {/* Event name */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 6, paddingLeft: 4 }}>
            이벤트 이름 <span style={{ color: theme.primary }}>*</span>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="예) 동아리 MT 일정 잡기"
          style={{
            width: '100%', height: 52, padding: '0 16px',
            fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
            background: theme.surface, border: `1.5px solid ${theme.primary}`,
            borderRadius: 16, color: theme.ink, outline: 'none', boxSizing: 'border-box'
          }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {suggested.map((e) =>
            <button key={e} className="pl-pressable" style={{
              width: 36, height: 36, borderRadius: 12, fontSize: 18,
              background: theme.surface, border: `1px solid ${theme.border}`
            }}>{e}</button>
            )}
          </div>
        </div>

        {/* Host */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 6, paddingLeft: 4 }}>
            호스트 이름 <span style={{ color: theme.primary }}>*</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 1 }}>
              <CuteAvatar name={host} size={32} theme={theme} done />
            </div>
            <input value={host} onChange={(e) => setHost(e.target.value)} placeholder="이름"
            style={{
              width: '100%', height: 52, padding: '0 16px 0 52px',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              background: theme.surface, border: `1.5px solid ${theme.border}`,
              borderRadius: 16, color: theme.ink, outline: 'none', boxSizing: 'border-box'
            }} />
          </div>
          <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 4, paddingLeft: 4 }}>
            이름에 따라 캐릭터가 자동으로 정해져요 🎲
          </div>
        </div>

        {/* Description */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 6, paddingLeft: 4 }}>
            설명 <span style={{ color: theme.inkMute, fontWeight: 500 }}>(선택)</span>
          </div>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
          placeholder="가능한 일정에 👍 표시해주세요!"
          style={{
            width: '100%', height: 90, padding: '14px 16px',
            fontSize: 14, fontFamily: 'inherit',
            background: theme.surface, border: `1.5px solid ${theme.border}`,
            borderRadius: 16, color: theme.ink, outline: 'none', boxSizing: 'border-box',
            resize: 'none'
          }} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)` }}>
        <PrimaryBtn theme={theme} onClick={() => nav('create-2')}>다음 →</PrimaryBtn>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════
// 3. CREATE STEP 2 — 일정 후보
// ═══════════════════════════════════════════════════════════════
function CreateStep2Screen({ theme, nav = () => {} }) {
  const selected = new Set([11, 18, 25]);
  const [picked, setPicked] = React.useState(selected);
  const toggleDay = (d) => {
    const n = new Set(picked);
    n.has(d) ? n.delete(d) : n.add(d);
    setPicked(n);
  };
  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <NavBar theme={theme} title="일정 후보" onBack={() => nav('create-1')} />
      <div className="pollae-scroll" style={{
        flex: 1, overflow: 'auto', padding: '4px 20px 100px',
        display: 'flex', flexDirection: 'column', gap: 16
      }}>
        <ProgressDots theme={theme} step={1} />

        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: theme.ink }}>
            언제 만나면 좋아요?
          </div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 4 }}>
            가능한 날짜를 선택하고 시간을 추가하세요
          </div>
        </div>

        {/* Mini calendar */}
        <div style={{
          background: theme.surface, borderRadius: 20, padding: 16,
          border: `1.5px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 12
          }}>
            <button className="pl-pressable" style={{ fontSize: 16, color: theme.inkSoft,
              width: 28, height: 28, borderRadius: 8 }}>‹</button>
            <div style={{ fontSize: 14, fontWeight: 800, color: theme.ink }}>2025년 10월</div>
            <button className="pl-pressable" style={{ fontSize: 16, color: theme.inkSoft,
              width: 28, height: 28, borderRadius: 8 }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3,
            marginBottom: 4, fontSize: 11, fontWeight: 700 }}>
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) =>
            <div key={d} style={{
              textAlign: 'center', padding: '4px 0',
              color: i === 0 ? theme.no : i === 6 ? '#4F86C8' : theme.inkMute
            }}>{d}</div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
            {/* Oct starts on Wed */}
            {Array.from({ length: 3 }).map((_, i) => <div key={'p' + i} />)}
            {Array.from({ length: 31 }).map((_, i) => {
              const d = i + 1;
              const isPicked = picked.has(d);
              const dow = (i + 3) % 7; // 0=Sun
              return (
                <button key={d} onClick={() => toggleDay(d)} className="pl-pressable" style={{
                  aspectRatio: '1', borderRadius: 10,
                  background: isPicked ?
                  `linear-gradient(135deg, ${theme.primary}, ${theme.pop})` :
                  'transparent',
                  color: isPicked ? '#fff' :
                  dow === 0 ? theme.no : dow === 6 ? '#4F86C8' : theme.ink,
                  fontSize: 13, fontWeight: isPicked ? 800 : 600,
                  border: 'none', boxShadow: isPicked ? `0 3px 8px ${theme.primary}40` : 'none'
                }}>{d}</button>);

            })}
          </div>
        </div>

        {/* Selected date slots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
          { date: '10/11 (토)', times: ['14:00 ~ 18:00', '19:00 ~ 22:00'] },
          { date: '10/18 (토)', times: ['14:00 ~ 18:00'] },
          { date: '10/25 (토)', times: ['14:00 ~ 18:00'] }].
          map((d) =>
          <div key={d.date} style={{
            background: theme.surface, borderRadius: 18, padding: 14,
            border: `1.5px solid ${theme.border}`
          }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: theme.ink }}>{d.date}</div>
                <button className="pl-pressable" style={{ fontSize: 11,
                color: theme.inkMute, padding: '4px 8px' }}>× 제거</button>
              </div>
              {d.times.map((t) =>
            <div key={t} style={{
              background: theme.primarySoft, borderRadius: 10,
              padding: '8px 12px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              fontSize: 13, fontWeight: 600, color: theme.primaryDeep,
              marginBottom: 6
            }}>
                  <span>🕐 {t}</span>
                  <span style={{ color: theme.primary, fontSize: 16 }}>×</span>
                </div>
            )}
              <button className="pl-pressable" style={{
              width: '100%', padding: '10px', borderRadius: 10,
              background: 'transparent', border: `1.5px dashed ${theme.border}`,
              color: theme.primary, fontSize: 12, fontWeight: 700
            }}>＋ 시간 추가</button>
            </div>
          )}
        </div>

        <div style={{ fontSize: 11, color: theme.inkMute, textAlign: 'center', fontWeight: 600 }}>
          후보 4 / 30
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)` }}>
        <PrimaryBtn theme={theme} onClick={() => nav('create-3')}>다음 →</PrimaryBtn>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════
// 4. CREATE STEP 3 — 옵션
// ═══════════════════════════════════════════════════════════════
function CreateStep3Screen({ theme, nav = () => {} }) {
  const [isPublic, setPublic] = React.useState(true);
  const [allowEdit, setAllowEdit] = React.useState(true);
  const [reminder, setReminder] = React.useState(true);
  return (
    <div className="pollae" style={{
      width: '100%', height: '100%', background: theme.bgGrad,
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <NavBar theme={theme} title="옵션" onBack={() => nav('create-2')} />
      <div className="pollae-scroll" style={{
        flex: 1, overflow: 'auto', padding: '4px 20px 100px',
        display: 'flex', flexDirection: 'column', gap: 18
      }}>
        <ProgressDots theme={theme} step={2} />

        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>
            마지막 단계!
          </div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 4 }}>
            세부 옵션을 정해주세요
          </div>
        </div>

        {/* Deadline */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 6, paddingLeft: 4 }}>
            투표 마감
          </div>
          <div style={{
            background: theme.surface, border: `1.5px solid ${theme.border}`,
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.ink }}>10월 9일 (목)</div>
              <div style={{ fontSize: 11, color: theme.inkMute, marginTop: 2 }}>23:59 마감</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, color: theme.primaryDeep,
              background: theme.primarySoft, padding: '4px 10px', borderRadius: 99
            }}>D-3</span>
          </div>
        </div>

        {/* Public/private segmented */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 6, paddingLeft: 4 }}>
            투표자 공개
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
            { v: true, l: '공개', sub: '이름 + 응답', emoji: '👀' },
            { v: false, l: '비공개', sub: '숫자만', emoji: '🔒' }].
            map((o) => {
              const on = isPublic === o.v;
              return (
                <button key={o.l} onClick={() => setPublic(o.v)} className="pl-pressable" style={{
                  flex: 1, padding: '14px 10px', borderRadius: 16,
                  background: on ? `linear-gradient(135deg, ${theme.primarySoft}, ${theme.popSoft})` : theme.surface,
                  border: `2px solid ${on ? theme.primary : theme.border}`,
                  color: theme.ink, textAlign: 'left'
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{o.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 800,
                    color: on ? theme.primaryDeep : theme.ink }}>{o.l}</div>
                  <div style={{ fontSize: 11, color: theme.inkMute, marginTop: 2 }}>{o.sub}</div>
                </button>);

            })}
          </div>
        </div>

        {/* Toggles */}
        <div style={{
          background: theme.surface, borderRadius: 18,
          border: `1.5px solid ${theme.border}`, overflow: 'hidden'
        }}>
          {[
          { label: '마감 알림 (이메일/푸시)', sub: '마감 30분 전 미투표자에게', state: reminder, set: setReminder },
          { label: '게스트 응답 수정 허용', sub: '마감 전까지 수정 가능', state: allowEdit, set: setAllowEdit }].
          map((t, i, arr) =>
          <div key={t.label} style={{
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: i < arr.length - 1 ? `1px dashed ${theme.divider}` : 'none'
          }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.ink }}>{t.label}</div>
                <div style={{ fontSize: 11, color: theme.inkMute, marginTop: 2 }}>{t.sub}</div>
              </div>
              <button onClick={() => t.set(!t.state)} style={{
              width: 44, height: 26, borderRadius: 13, padding: 0,
              background: t.state ? theme.primary : theme.border,
              position: 'relative', transition: 'background 0.2s',
              border: 'none', cursor: 'pointer', flexShrink: 0
            }}>
                <div style={{
                position: 'absolute', top: 3, left: t.state ? 21 : 3,
                width: 20, height: 20, borderRadius: 10,
                background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left 0.2s'
              }} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)` }}>
        <PrimaryBtn theme={theme} onClick={() => nav('invite')}>✨ 투표 만들기</PrimaryBtn>
      </div>
    </div>);

}

Object.assign(window, { LandingScreen, CreateStep1Screen, CreateStep2Screen, CreateStep3Screen,
  NavBar, PrimaryBtn, ProgressDots, StickerDecor });