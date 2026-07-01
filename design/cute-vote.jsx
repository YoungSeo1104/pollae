// 폴래 cute — 투표 페이지 (테마 주입형)
// 테마 색상으로 전체가 바뀌고, 캐릭터 아바타 + 큐트 카피 + 큰 이모지 버튼.

const { CuteAvatar } = window;

const SAMPLE = {
  title: '동아리 MT 잡기 🌱',
  desc: '2학기 첫 모임이에요!\n언제 시간 되는지 알려주세요',
  host: '민지',
  deadlineLabel: 'D-3',
  deadline: '10/9 (목) 23:59',
  totalVoters: 8,
  slots: [
    { id:'d1', date:'10월 11일', day:'토',
      times: [
        { id:'d1t1', t:'14:00 ~ 18:00', y:4, m:1, n:0 },
        { id:'d1t2', t:'19:00 ~ 22:00', y:2, m:2, n:1 },
      ]},
    { id:'d2', date:'10월 18일', day:'토',
      times: [
        { id:'d2t1', t:'14:00 ~ 18:00', y:5, m:0, n:0 },
        { id:'d2t2', t:'19:00 ~ 22:00', y:3, m:1, n:1 },
      ]},
    { id:'d3', date:'10월 25일', day:'토',
      times: [
        { id:'d3t1', t:'14:00 ~ 18:00', y:1, m:2, n:2 },
      ]},
  ],
  voters: [
    { name:'민지', done:true, host:true },
    { name:'준호', done:true },
    { name:'서연', done:true },
    { name:'지훈', done:true },
    { name:'하은', done:true },
    { name:'도윤', done:false },
    { name:'예진', done:false },
    { name:'시우', done:false },
  ],
};

// Find best (most ○)
function bestSlot(slots) {
  let best = null;
  slots.forEach(d => d.times.forEach(t => {
    if (!best || t.y > best.y) best = { dayId: d.id, timeId: t.id, y: t.y };
  }));
  return best;
}

// ─── Cute emoji vote button ───────────────────────────────────
const CUTE_BTN = {
  yes:   { emoji: '👍', label: '갈래요',  key: 'yes' },
  maybe: { emoji: '🤔', label: '아마도', key: 'maybe' },
  no:    { emoji: '👎', label: '못가요',  key: 'no' },
};

function CuteVoteBtn({ kind, active, count, onPick, theme }) {
  const k = CUTE_BTN[kind];
  const colorMap = {
    yes: { fg: theme.yes, soft: theme.yesSoft },
    maybe: { fg: theme.maybe, soft: theme.maybeSoft },
    no: { fg: theme.no, soft: theme.noSoft },
  }[kind];
  return (
    <button
      className={'pl-pressable' + (active ? ' pl-bounce' : '')}
      onClick={() => onPick(kind)}
      style={{
        flex: 1, height: 56, borderRadius: 18,
        background: active ? colorMap.fg : '#fff',
        border: `2px solid ${active ? colorMap.fg : theme.border}`,
        color: active ? '#fff' : theme.ink,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap: 1, position:'relative',
        boxShadow: active
          ? `0 6px 14px ${colorMap.fg}50, 0 0 0 3px ${colorMap.soft}`
          : `0 1px 2px rgba(0,0,0,0.04)`,
        transition: 'all 0.18s cubic-bezier(.4,.2,.2,1)',
      }}
    >
      <span style={{
        fontSize: 22, lineHeight: 1,
        filter: active ? 'none' : 'grayscale(0.15)',
      }}>{k.emoji}</span>
      <span style={{
        fontSize: 10, fontWeight: 700,
        color: active ? 'rgba(255,255,255,0.95)' : colorMap.fg,
      }}>{count}</span>
    </button>
  );
}

// ─── Date card (cute) ─────────────────────────────────────────
function CuteDateCard({ slot, best, myVotes, onPick, theme, showWinner, delay }) {
  return (
    <div className="pl-rise" style={{
      background: theme.surface, borderRadius: 22,
      border: `1.5px solid ${theme.border}`,
      overflow: 'hidden',
      animationDelay: `${delay}ms`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    }}>
      {/* Date header */}
      <div style={{
        padding: '12px 16px 10px',
        background: `linear-gradient(135deg, ${theme.primarySoft} 0%, ${theme.accentSoft} 100%)`,
        display:'flex', alignItems:'center', gap: 8,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: '#fff', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', lineHeight: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{fontSize: 8, fontWeight: 700, color: theme.primary, marginBottom:1}}>10월</div>
          <div style={{fontSize: 14, fontWeight: 800, color: theme.ink}}>{slot.date.match(/\d+(?=일)/)}</div>
        </div>
        <div>
          <div style={{fontSize: 14, fontWeight: 800, color: theme.ink, letterSpacing:'-0.02em'}}>
            {slot.date}
            <span style={{
              color: slot.day === '토' ? '#4F86C8' : slot.day === '일' ? theme.no : theme.inkSoft,
              marginLeft: 4, fontSize: 12,
            }}>({slot.day})</span>
          </div>
          <div style={{fontSize: 11, color: theme.inkMute, marginTop: 1}}>
            가능한 시간 골라주세요
          </div>
        </div>
      </div>
      {/* Slots */}
      <div style={{padding: '8px 14px 14px'}}>
        {slot.times.map((t, i) => {
          const isBest = best && best.timeId === t.id;
          const mine = myVotes[t.id];
          const total = t.y + t.m + t.n;
          return (
            <div key={t.id} style={{
              padding: '12px 0',
              borderTop: i === 0 ? 'none' : `1px dashed ${theme.divider}`,
              position: 'relative',
            }}>
              <div style={{
                display:'flex', alignItems:'baseline', justifyContent:'space-between',
                marginBottom: 10,
              }}>
                <div style={{display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap'}}>
                  <span style={{fontSize: 15, fontWeight: 800, color: theme.ink,
                    letterSpacing:'-0.01em'}}>{t.t}</span>
                  {isBest && showWinner && (
                    <span className="pl-pop" style={{
                      fontSize: 10, fontWeight: 800, color: '#fff',
                      background: `linear-gradient(135deg, ${theme.pop}, ${theme.primary})`,
                      padding: '3px 7px 3px 6px', borderRadius: 99,
                      display:'inline-flex', alignItems:'center', gap: 2,
                      boxShadow: `0 2px 6px ${theme.primary}40`,
                    }}>👑 최다</span>
                  )}
                </div>
                <span style={{fontSize: 11, color: theme.inkMute, fontVariantNumeric:'tabular-nums'}}>
                  {total}명 응답
                </span>
              </div>
              <div style={{display:'flex', gap: 8}}>
                <CuteVoteBtn kind="yes"   active={mine==='yes'}   count={t.y} onPick={(k)=>onPick(t.id,k)} theme={theme}/>
                <CuteVoteBtn kind="maybe" active={mine==='maybe'} count={t.m} onPick={(k)=>onPick(t.id,k)} theme={theme}/>
                <CuteVoteBtn kind="no"    active={mine==='no'}    count={t.n} onPick={(k)=>onPick(t.id,k)} theme={theme}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Participants with character avatars ──────────────────────
function CuteParticipants({ voters, theme }) {
  const done = voters.filter(v => v.done);
  const pending = voters.filter(v => !v.done);
  return (
    <div style={{
      background: theme.surface, borderRadius: 22,
      border: `1.5px solid ${theme.border}`, padding: 18,
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom: 12,
      }}>
        <div style={{fontSize: 14, fontWeight: 800, color: theme.ink}}>
          참여자 <span style={{color: theme.inkMute, fontWeight: 600, fontSize: 12, marginLeft:4}}>
            {done.length}/{voters.length}
          </span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, color: theme.primary,
          background: theme.primarySoft, padding:'3px 8px', borderRadius: 99,
        }}>
          {Math.round((done.length/voters.length)*100)}% 완료
        </span>
      </div>

      {/* Done avatars */}
      <div style={{marginBottom: 14}}>
        <div style={{display:'flex', alignItems:'center', gap: 5, marginBottom: 8}}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: theme.yes,
            background: theme.yesSoft, padding: '2px 7px', borderRadius: 99,
          }}>✓ 완료 {done.length}</span>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap: 12, rowGap: 12}}>
          {done.map(v => (
            <div key={v.name} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap: 4,
              minWidth: 52,
            }}>
              <CuteAvatar name={v.name} size={48} theme={theme} host={v.host} done/>
              <span style={{
                fontSize: 11, fontWeight: 600, color: theme.ink,
                textAlign:'center', lineHeight: 1.2, maxWidth: 56,
                whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
              }}>{v.name}{v.host && ' (나)'}</span>
            </div>
          ))}
        </div>
      </div>

      {pending.length > 0 && (
        <div style={{
          borderTop: `1px dashed ${theme.divider}`, paddingTop: 14,
        }}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 8}}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: theme.inkSoft,
              background: theme.bg, padding: '2px 7px', borderRadius: 99,
              border: `1px dashed ${theme.border}`,
            }}>⏳ 아직 {pending.length}명</span>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap: 12, rowGap: 12, marginBottom: 12}}>
            {pending.map(v => (
              <div key={v.name} style={{
                display:'flex', flexDirection:'column', alignItems:'center', gap: 4,
                minWidth: 52,
              }}>
                <CuteAvatar name={v.name} size={48} theme={theme} done={false}/>
                <span style={{
                  fontSize: 11, fontWeight: 500, color: theme.inkMute,
                  textAlign:'center', lineHeight: 1.2, maxWidth: 56,
                  whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                }}>{v.name}</span>
              </div>
            ))}
          </div>
          <button className="pl-pressable" style={{
            width:'100%', padding:'11px', borderRadius: 14,
            background: theme.primarySoft, color: theme.primaryDeep,
            fontSize: 13, fontWeight: 700,
            border: `1.5px solid ${theme.primarySoft}`,
            display:'flex', alignItems:'center', justifyContent:'center', gap: 5,
          }}>
            <span>👋</span> 콕 찌르기 보내기
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main cute vote page ──────────────────────────────────────
function CuteVotePage({ theme, nav = () => {} }) {
  const [name, setName] = React.useState('민지');
  const [myVotes, setMyVotes] = React.useState({ 'd2t1':'yes' });
  const [submitted, setSubmitted] = React.useState(false);
  const poll = SAMPLE;
  const best = bestSlot(poll.slots);
  const voteCount = Object.values(myVotes).filter(Boolean).length;

  const handlePick = (timeId, kind) => {
    setMyVotes(v => ({...v, [timeId]: v[timeId] === kind ? null : kind}));
    setSubmitted(false);
  };

  return (
    <div className="pollae" style={{
      width:'100%', height:'100%',
      background: theme.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
      color: theme.ink,
    }}>
      {/* Nav */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '8px 14px 6px', position:'relative', zIndex: 5,
      }}>
        <button onClick={() => nav('dashboard')} className="pl-pressable" style={{
          width: 36, height: 36, borderRadius: 12,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: theme.inkSoft, fontSize: 18, background: 'rgba(255,255,255,0.6)',
        }}>‹</button>
        <div style={{
          display:'flex', alignItems:'center', gap: 4,
          fontWeight: 900, fontSize: 16, color: theme.primary,
          letterSpacing:'-0.03em',
        }}>
          <span style={{fontSize: 14}}>🗳️</span> 폴래
        </div>
        <button className="pl-pressable" style={{
          width: 36, height: 36, borderRadius: 12,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: theme.inkSoft, fontSize: 14, background: 'rgba(255,255,255,0.6)',
        }}>⤴</button>
      </div>

      {/* Body */}
      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto',
        padding: '6px 16px 110px',
        display:'flex', flexDirection:'column', gap: 14,
      }}>
        {/* Hero — Big friendly card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.pop} 100%)`,
          borderRadius: 24, padding: '18px 18px 16px',
          position:'relative', color: '#fff',
        }}>
          {/* sticker decorations — clipped inside a sublayer so the card's host crown isn't clipped */}
          <div style={{position:'absolute', inset: 0, borderRadius: 24, overflow:'hidden', pointerEvents:'none'}}>
            <div style={{position:'absolute', top: 12, right: 14, fontSize: 26, opacity: 0.9,
              transform: 'rotate(15deg)'}}>✨</div>
            <div style={{position:'absolute', bottom: -10, right: 30, fontSize: 38, opacity: 0.3}}>🎈</div>
            <div style={{position:'absolute', top: 50, right: 60, width: 6, height: 6, borderRadius: 3,
              background: '#fff', opacity: 0.6}}/>
            <div style={{position:'absolute', top: 70, right: 100, width: 4, height: 4, borderRadius: 2,
              background: '#fff', opacity: 0.5}}/>
          </div>

          <div style={{position:'relative', zIndex: 1}}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap: 4,
              background:'rgba(255,255,255,0.25)', backdropFilter:'blur(4px)',
              padding:'3px 9px', borderRadius:99,
              fontSize: 10, fontWeight: 700, color:'#fff',
            }}>
              <span style={{width:5, height:5, borderRadius:3, background:'#fff'}}/>
              진행 중 · {poll.deadlineLabel}
            </div>
          <div style={{
            fontSize: 22, fontWeight: 900, marginTop: 8, letterSpacing:'-0.025em',
            lineHeight: 1.2,
          }}>{poll.title}</div>
          <div style={{
            fontSize: 12, marginTop: 6, opacity: 0.95, lineHeight: 1.5, whiteSpace:'pre-line',
            maxWidth: '85%',
          }}>{poll.desc}</div>

          <div style={{
            display:'flex', alignItems:'center', gap: 10, marginTop: 14,
            background: 'rgba(255,255,255,0.2)', padding: '8px 10px', borderRadius: 14,
            backdropFilter:'blur(4px)',
          }}>
            <CuteAvatar name={poll.host} size={36} theme={theme} host done/>
            <div style={{flex:1, minWidth: 0}}>
              <div style={{fontSize: 10, opacity: 0.85}}>호스트</div>
              <div style={{fontSize: 12, fontWeight: 700}}>{poll.host}님이 만들었어요</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize: 10, opacity: 0.85}}>마감</div>
              <div style={{fontSize: 12, fontWeight: 700}}>{poll.deadline}</div>
            </div>
          </div>
        </div>

        {/* Stats with progress */}
        <div style={{
          background: theme.surface, borderRadius: 18, padding: '14px 16px',
          border: `1.5px solid ${theme.border}`,
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <div style={{flex:1}}>
            <div style={{fontSize: 13, fontWeight: 800, color: theme.ink}}>
              <span style={{color: theme.primary, fontSize: 18, fontWeight: 900}}>5</span>
              <span style={{color: theme.inkMute, fontWeight: 600}}> / {poll.totalVoters}명 응답</span>
            </div>
            <div style={{height: 8, background: theme.bg, borderRadius: 4, overflow:'hidden', marginTop: 6}}>
              <div style={{
                height:'100%', width:'62.5%',
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.pop})`,
                borderRadius: 4,
              }}/>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize: 10, color: theme.inkMute, fontWeight: 600}}>후보</div>
            <div style={{fontSize: 16, fontWeight: 800, color: theme.ink}}>5개</div>
          </div>
        </div>

        {/* Name */}
        <div>
          <div style={{display:'flex', alignItems:'center', gap: 6, marginBottom: 6, padding:'0 6px'}}>
            <CuteAvatar name={name} size={20} theme={theme} done/>
            <span style={{fontSize: 12, fontWeight: 700, color: theme.inkSoft}}>
              누구신가요? <span style={{color: theme.primary}}>*</span>
            </span>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            style={{
              width:'100%', height: 50, padding:'0 16px',
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              background: theme.surface,
              border: `1.5px solid ${theme.border}`,
              borderRadius: 16, color: theme.ink, outline:'none',
              boxSizing:'border-box',
            }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />
        </div>

        {/* Date cards */}
        {poll.slots.map((s, i) => (
          <CuteDateCard
            key={s.id} slot={s} best={best} myVotes={myVotes}
            onPick={handlePick} theme={theme}
            showWinner={submitted}
            delay={i * 60}
          />
        ))}

        {/* Participants */}
        <CuteParticipants voters={poll.voters} theme={theme}/>

        <div style={{textAlign:'center', fontSize: 11, color: theme.inkFaint, padding:'4px 0 4px',
          fontWeight: 600}}>
          🗳️ 폴래로 만들었어요
        </div>
      </div>

      {/* Sticky submit */}
      <div style={{
        position:'absolute', left:0, right:0, bottom:0,
        padding: '12px 16px 28px',
        background: `linear-gradient(180deg, transparent 0%, ${theme.bg} 30%)`,
        pointerEvents:'none',
      }}>
        <button
          onClick={() => setSubmitted(true)}
          disabled={voteCount === 0 || !name.trim()}
          className="pl-pressable"
          style={{
            pointerEvents:'auto',
            width:'100%', height: 56, borderRadius: 18,
            background: submitted
              ? theme.yes
              : (voteCount > 0
                ? `linear-gradient(135deg, ${theme.primary}, ${theme.pop})`
                : theme.border),
            color: '#fff', fontSize: 15, fontWeight: 800,
            boxShadow: voteCount > 0
              ? `0 8px 20px ${submitted ? '#3BC78050' : theme.primary+'55'}`
              : 'none',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
            letterSpacing:'-0.01em', whiteSpace:'nowrap',
            border: 'none',
          }}
        >
          {submitted ? '✓ 응답 보냈어요!' :
            voteCount > 0 ? `${voteCount}개 응답 보내기 →` : '시간을 골라주세요'}
        </button>
      </div>
    </div>
  );
}

window.CuteVotePage = CuteVotePage;
