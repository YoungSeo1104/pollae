// 폴래 hi-fi — 투표 페이지

const P = window.POLLAE;
const { VoteButton, StackedBar, Avatar, VOTE_LABELS, voteColor } = window;

// Sample data — 대학 동아리 MT 일정 조율
const INITIAL_POLL = {
  title: '동아리 MT 일정 조율',
  desc: '2학기 첫 모임! 가능한 일정에 답해주세요 🌱',
  host: '김민지',
  deadline: '10월 9일 (목) 23:59',
  deadlineLabel: 'D-3',
  totalVoters: 8,
  slots: [
    { id:'d1', date:'10월 11일', day:'토', dayKey:'sat', note:'추석 다음 주',
      times: [
        { id:'d1t1', t:'14:00 ~ 18:00', y:4, m:1, n:0 },
        { id:'d1t2', t:'19:00 ~ 22:00', y:2, m:2, n:1 },
      ]},
    { id:'d2', date:'10월 18일', day:'토', dayKey:'sat',
      times: [
        { id:'d2t1', t:'14:00 ~ 18:00', y:5, m:0, n:0 },
        { id:'d2t2', t:'19:00 ~ 22:00', y:3, m:1, n:1 },
      ]},
    { id:'d3', date:'10월 25일', day:'토', dayKey:'sat',
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

// Find best slot (most ○) — used for the crown badge
function findBest(slots) {
  let best = null;
  slots.forEach(d => d.times.forEach(t => {
    if (!best || t.y > best.y) best = { dayId: d.id, timeId: t.id, y: t.y };
  }));
  return best;
}

// ─── Hero card (title + host + deadline) ───────────────────────
function Hero({ poll }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${P.peachSoft} 0%, #FFE5DC 100%)`,
      borderRadius: P.r4,
      padding: '20px 18px 18px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{position:'absolute', top:-30, right:-30, width:120, height:120,
        borderRadius:'50%', background: 'rgba(255,255,255,0.4)'}}/>
      <div style={{position:'absolute', bottom:-20, right:30, width:60, height:60,
        borderRadius:'50%', background: 'rgba(232,137,106,0.15)'}}/>

      <div style={{position:'relative'}}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:5,
          background:'#fff', borderRadius:99, padding:'4px 10px 4px 7px',
          fontSize:11, fontWeight:600, color: P.peachInk,
          boxShadow: '0 1px 2px rgba(192,90,58,0.12)',
        }}>
          <span style={{width:6, height:6, borderRadius:3, background: P.peach,
            boxShadow:`0 0 0 3px ${P.peachSoft}`}}/>
          진행 중 · {poll.deadlineLabel}
        </div>
        <h1 style={{
          fontSize: 22, fontWeight: 800, lineHeight: 1.25,
          margin: '10px 0 6px', letterSpacing:'-0.02em',
        }}>{poll.title}</h1>
        <p style={{
          fontSize: 13, color: P.inkSoft, margin: 0, lineHeight: 1.5,
        }}>{poll.desc}</p>
        <div style={{
          display:'flex', alignItems:'center', gap:8, marginTop: 14,
          paddingTop: 12, borderTop:'1px dashed rgba(192,90,58,0.18)',
        }}>
          <Avatar name={poll.host} host done size={28}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:11, color: P.inkMute, lineHeight:1.2}}>호스트</div>
            <div style={{fontSize:13, fontWeight:700, color: P.ink}}>{poll.host}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:11, color: P.inkMute, lineHeight:1.2}}>마감</div>
            <div style={{fontSize:13, fontWeight:700, color: P.peachInk}}>{poll.deadline.replace('2025년 ','')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats row (응답 진행률) ────────────────────────────────────
function StatsRow({ voted, total, slots }) {
  const pct = (voted/total)*100;
  return (
    <div style={{
      background: P.surface, borderRadius: P.r3, padding: '14px 16px',
      border: `1px solid ${P.border}`,
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8}}>
        <div style={{fontSize:13, fontWeight:600, color: P.ink}}>
          <span style={{fontSize:18, fontWeight:800, color: P.peachInk, marginRight:3}}>{voted}</span>
          <span style={{color: P.inkMute}}>/ {total}명 응답</span>
        </div>
        <div style={{fontSize:11, color: P.inkMute}}>일정 후보 {slots} 개</div>
      </div>
      <div style={{height: 8, background: P.divider, borderRadius: 4, overflow:'hidden', position:'relative'}}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${P.peach}, ${P.peachInk})`,
          borderRadius: 4, transition: 'width 0.4s',
        }}/>
      </div>
    </div>
  );
}

// ─── Name input ─────────────────────────────────────────────────
function NameInput({ name, setName, locked }) {
  return (
    <label style={{display:'block'}}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom: 6, padding:'0 4px',
      }}>
        <span style={{fontSize:12, fontWeight:600, color: P.inkSoft}}>
          이름 <span style={{color: P.peach}}>*</span>
        </span>
        {locked && <span style={{fontSize:11, color: P.inkMute}}>✓ 저장됨</span>}
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="홍길동"
        style={{
          width:'100%', height: 48, padding:'0 16px',
          fontSize: 15, fontWeight: 600, fontFamily: P.font,
          background: locked ? P.surfaceAlt : P.surface,
          border: `1.5px solid ${P.border}`,
          borderRadius: P.r3, color: P.ink, outline:'none',
          transition: 'border-color .15s, background .15s',
        }}
        onFocus={(e) => e.target.style.borderColor = P.peach}
        onBlur={(e) => e.target.style.borderColor = P.border}
      />
    </label>
  );
}

// ─── Legend ─────────────────────────────────────────────────────
function Legend({ style }) {
  return (
    <div style={{
      display:'flex', justifyContent:'center', gap: 16,
      fontSize: 11, color: P.inkMute, padding:'2px 0',
    }}>
      {['yes','maybe','no'].map(k => {
        const c = voteColor(k);
        const glyph = style === 'emoji' ? window.VOTE_EMOJI[k]
                    : style === 'symbol' ? window.VOTE_SYMBOL[k]
                    : VOTE_LABELS[k].short;
        return (
          <div key={k} style={{display:'flex', alignItems:'center', gap:5}}>
            <span style={{
              width: 18, height: 18, borderRadius: 6,
              background: c.solid, color: '#fff',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              fontSize: style === 'symbol' ? 12 : 10, fontWeight: 700, lineHeight: 1,
            }}>{glyph}</span>
            <span style={{fontWeight:500, color: P.inkSoft}}>{VOTE_LABELS[k].short}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Slot row (단일 시간 슬롯) ──────────────────────────────────
function SlotRow({ time, isBest, isFirst, myVotes, onPick, mode, btnStyle, showWinner }) {
  const total = time.y + time.m + time.n;
  const mine = myVotes[time.id];
  const isPrivate = mode === 'private';

  return (
    <div style={{
      padding: '14px 16px',
      borderTop: isFirst ? 'none' : `1px solid ${P.divider}`,
      background: isBest && showWinner ? `linear-gradient(90deg, ${P.crownSoft} 0%, transparent 70%)` : 'transparent',
      position: 'relative',
    }}>
      {isBest && showWinner && (
        <div style={{
          position:'absolute', top:-1, left:0, right:0, height: 2,
          background: `linear-gradient(90deg, ${P.crown}, transparent)`,
        }}/>
      )}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: 8}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: P.ink,
            display:'flex', alignItems:'center', gap: 6,
          }}>
            {time.t}
            {isBest && showWinner && (
              <span className="pl-pop" style={{
                fontSize: 10, fontWeight: 700,
                background: P.crown, color: '#fff',
                padding: '2px 6px 2px 5px', borderRadius: 99,
                display:'inline-flex', alignItems:'center', gap:2,
              }}>👑 최다</span>
            )}
          </div>
          <div style={{display:'flex', gap: 8, marginTop: 4, fontSize: 11, color: P.inkMute}}>
            <span>응답 {total}명</span>
            {!isPrivate && total > 0 && (
              <>
                <span>·</span>
                <span style={{color: P.yes, fontWeight:600}}>참석 {time.y}</span>
              </>
            )}
          </div>
        </div>
        <div style={{display:'flex', gap: 6}}>
          <VoteButton kind="yes"   active={mine==='yes'}   count={time.y} onPick={(k)=>onPick(time.id, k)} style={btnStyle}/>
          <VoteButton kind="maybe" active={mine==='maybe'} count={time.m} onPick={(k)=>onPick(time.id, k)} style={btnStyle}/>
          <VoteButton kind="no"    active={mine==='no'}    count={time.n} onPick={(k)=>onPick(time.id, k)} style={btnStyle}/>
        </div>
      </div>
      {isPrivate && total > 0 && (
        <div style={{marginTop: 10}}>
          <StackedBar y={time.y} m={time.m} n={time.n}/>
          <div style={{display:'flex', gap: 12, fontSize: 10, color: P.inkMute, marginTop: 5,
            fontVariantNumeric:'tabular-nums'}}>
            <span><b style={{color: P.yes}}>{time.y}</b> 참석</span>
            <span><b style={{color: P.maybe}}>{time.m}</b> 미정</span>
            <span><b style={{color: P.no}}>{time.n}</b> 불참</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Date card (한 날짜의 시간 슬롯 묶음) ──────────────────────
function DateCard({ slot, best, myVotes, onPick, mode, btnStyle, showWinner, delay }) {
  return (
    <div className="pl-rise" style={{
      background: P.surface, borderRadius: P.r3,
      border: `1px solid ${P.border}`, overflow: 'hidden',
      animationDelay: `${delay}ms`,
    }}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '12px 16px', background: P.surfaceAlt,
        borderBottom: `1px solid ${P.divider}`,
      }}>
        <div style={{display:'flex', alignItems:'baseline', gap: 8}}>
          <span style={{fontSize: 15, fontWeight: 800, color: P.ink, letterSpacing:'-0.01em'}}>{slot.date}</span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: slot.dayKey === 'sun' ? P.no : slot.dayKey === 'sat' ? '#4F86C8' : P.inkSoft,
          }}>({slot.day})</span>
          {slot.note && (
            <span style={{fontSize: 10, color: P.inkMute, fontWeight: 500}}>· {slot.note}</span>
          )}
        </div>
      </div>
      {slot.times.map((t, i) => (
        <SlotRow
          key={t.id}
          time={t}
          isBest={best && best.timeId === t.id}
          isFirst={i === 0}
          myVotes={myVotes}
          onPick={onPick}
          mode={mode}
          btnStyle={btnStyle}
          showWinner={showWinner}
        />
      ))}
    </div>
  );
}

// ─── Participants ───────────────────────────────────────────────
function Participants({ voters, mode }) {
  const done = voters.filter(v => v.done);
  const pending = voters.filter(v => !v.done);
  return (
    <div style={{
      background: P.surface, borderRadius: P.r3, padding: 16,
      border: `1px solid ${P.border}`,
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom: 12,
      }}>
        <div style={{fontSize: 13, fontWeight: 700, color: P.ink}}>
          참여자 <span style={{color: P.inkMute, fontWeight: 500, marginLeft:4}}>{done.length}/{voters.length}</span>
        </div>
        {mode === 'private' && (
          <span style={{fontSize: 11, color: P.inkMute, display:'inline-flex', alignItems:'center', gap:3}}>
            🔒 응답 비공개
          </span>
        )}
      </div>
      <div style={{display:'flex', flexDirection:'column', gap: 10}}>
        <div>
          <div style={{fontSize: 11, color: P.yes, fontWeight: 600, marginBottom: 6}}>✓ 완료 {done.length}</div>
          <div style={{display:'flex', flexWrap:'wrap', gap: 6}}>
            {done.map(v => (
              <div key={v.name} style={{
                display:'flex', alignItems:'center', gap: 6,
                background: P.yesSoft, padding:'4px 10px 4px 4px', borderRadius: 99,
              }}>
                <Avatar name={v.name} host={v.host} done size={22}/>
                <span style={{fontSize: 12, fontWeight: 600, color: P.ink}}>
                  {v.name}{v.host && ' (나)'}
                </span>
              </div>
            ))}
          </div>
        </div>
        {pending.length > 0 && (
          <div>
            <div style={{fontSize: 11, color: P.inkMute, fontWeight: 600, marginBottom: 6}}>⏳ 미투표 {pending.length}</div>
            <div style={{display:'flex', flexWrap:'wrap', gap: 6}}>
              {pending.map(v => (
                <div key={v.name} style={{
                  display:'flex', alignItems:'center', gap: 6,
                  background: P.bg, padding:'4px 10px 4px 4px', borderRadius: 99,
                  border: `1px dashed ${P.borderStrong}`,
                }}>
                  <Avatar name={v.name} size={22}/>
                  <span style={{fontSize: 12, fontWeight: 500, color: P.inkMute}}>{v.name}</span>
                </div>
              ))}
            </div>
            <button className="pl-pressable" style={{
              marginTop: 10, padding:'8px 14px', borderRadius: 99,
              background: P.peachSoft, color: P.peachInk,
              fontSize: 12, fontWeight: 600,
              display:'inline-flex', alignItems:'center', gap: 4,
            }}>
              👋 미투표자에게 알림 보내기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sticky submit ──────────────────────────────────────────────
function SubmitBar({ count, hasVotes, submitted, onSubmit }) {
  return (
    <div style={{
      position:'absolute', left:0, right:0, bottom:0,
      padding: '14px 18px 30px',
      background: `linear-gradient(180deg, transparent 0%, ${P.bg} 30%, ${P.bg} 100%)`,
      pointerEvents:'none',
    }}>
      <button
        onClick={onSubmit}
        disabled={!hasVotes}
        className="pl-pressable"
        style={{
          pointerEvents:'auto',
          width:'100%', height: 54, borderRadius: 18,
          background: submitted ? P.yes : (hasVotes ? P.peach : P.borderStrong),
          color: '#fff', fontSize: 15, fontWeight: 700,
          boxShadow: hasVotes ? `0 8px 20px ${submitted ? '#3BAA7544' : '#E8896A50'}` : 'none',
          display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
          letterSpacing:'-0.01em', whiteSpace:'nowrap',
        }}
      >
        {submitted ? (
          <><span style={{fontSize: 18}}>✓</span> 응답 저장됨 · 수정 가능해요</>
        ) : hasVotes ? (
          <><span>응답 {count}개 보내기</span><span style={{fontSize:16}}>→</span></>
        ) : (
          '시간을 선택해주세요'
        )}
      </button>
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────
function PollaeVotePage({ tweaks }) {
  const poll = INITIAL_POLL;
  const [name, setName] = React.useState('민지');
  const [myVotes, setMyVotes] = React.useState({ 'd2t1':'yes' });
  const [submitted, setSubmitted] = React.useState(false);

  const handlePick = (timeId, kind) => {
    setMyVotes(v => ({...v, [timeId]: v[timeId] === kind ? null : kind}));
    setSubmitted(false);
  };

  const voteCount = Object.values(myVotes).filter(Boolean).length;
  const best = findBest(poll.slots);

  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: P.bg,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      {/* Nav */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '8px 12px 8px 4px',
        background: P.bg, position:'relative', zIndex: 5,
      }}>
        <button className="pl-pressable" style={{
          width: 40, height: 40, borderRadius: 12,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: P.ink, fontSize: 20,
        }}>‹</button>
        <div style={{
          fontWeight: 800, fontSize: 17, color: P.peachInk,
          letterSpacing:'-0.02em', fontFamily: P.font,
        }}>폴래</div>
        <button className="pl-pressable" style={{
          width: 40, height: 40, borderRadius: 12,
          display:'flex', alignItems:'center', justifyContent:'center',
          color: P.inkSoft, fontSize: 16,
        }}>⤴</button>
      </div>

      {/* Scrollable body */}
      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto',
        padding: '4px 18px 110px',
        display:'flex', flexDirection:'column', gap: 14,
      }}>
        <Hero poll={poll}/>
        <StatsRow voted={5 + (submitted ? 0 : 0)} total={poll.totalVoters} slots={poll.slots.reduce((a,s)=>a+s.times.length,0)}/>
        <NameInput name={name} setName={setName} locked={submitted}/>
        <Legend style={tweaks.btnStyle}/>

        {poll.slots.map((s, i) => (
          <DateCard
            key={s.id} slot={s} best={best} myVotes={myVotes}
            onPick={handlePick} mode={tweaks.mode}
            btnStyle={tweaks.btnStyle}
            showWinner={submitted}
            delay={i * 80}
          />
        ))}

        <Participants voters={poll.voters} mode={tweaks.mode}/>

        <div style={{textAlign:'center', fontSize: 11, color: P.inkFaint, padding:'8px 0 4px'}}>
          폴래 · 일정 조율 투표
        </div>
      </div>

      <SubmitBar
        count={voteCount}
        hasVotes={voteCount > 0 && name.trim().length > 0}
        submitted={submitted}
        onSubmit={() => setSubmitted(true)}
      />
    </div>
  );
}

window.PollaeVotePage = PollaeVotePage;
