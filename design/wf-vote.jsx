// 폴래 wireframes — 투표 페이지 (핵심 화면) 변주들

// Sample data: 대학 동아리 MT 일정 조율
const POLL_DATA = {
  title: '동아리 MT 일정 조율',
  host: '김민지',
  deadline: 'D-3 · 10/9 23:59',
  totalVoters: 8,
  voted: 5,
  slots: [
    { date: '10/11 (토)', dateShort: '10/11', day: '토',
      times: [
        { t: '14:00–18:00', y: 4, m: 1, n: 0, me: null, best: false },
        { t: '19:00–22:00', y: 2, m: 2, n: 1, me: null, best: false },
      ]},
    { date: '10/18 (토)', dateShort: '10/18', day: '토',
      times: [
        { t: '14:00–18:00', y: 5, m: 0, n: 0, me: 'yes', best: true },
        { t: '19:00–22:00', y: 3, m: 1, n: 1, me: null, best: false },
      ]},
    { date: '10/25 (토)', dateShort: '10/25', day: '토',
      times: [
        { t: '14:00–18:00', y: 1, m: 2, n: 2, me: null, best: false },
      ]},
  ],
  voters: [
    { name: '민지(나)', done: true, host: true },
    { name: '준호', done: true },
    { name: '서연', done: true },
    { name: '지훈', done: true },
    { name: '하은', done: true },
    { name: '도윤', done: false },
    { name: '예진', done: false },
    { name: '시우', done: false },
  ],
};

// =========================================================
// VARIANT A — 카드 묶음 (기획서 명시 구조, 기본 ○△× 심볼)
// =========================================================
const VoteVariantA = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div className="wf-hand" style={{fontSize:16, color: WF.peachInk}}>폴래</div>
      <div style={{fontSize:11, color: WF.mute}}>⋯</div>
    </div>
    <div style={{flex:1, padding:'14px 16px 100px', overflow:'auto', display:'flex', flexDirection:'column', gap:12}}>
      {/* Header */}
      <div>
        <div style={{fontSize:16, fontWeight:700}}>{POLL_DATA.title}</div>
        <div style={{display:'flex', gap:8, marginTop:4, fontSize:11, color: WF.mute}}>
          <span>호스트 · {POLL_DATA.host}</span>
          <span className="wf-chip wf-chip-peach" style={{fontSize:10, padding:'2px 6px'}}>⏰ {POLL_DATA.deadline}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="wf-card" style={{padding:10, display:'flex', justifyContent:'space-around', textAlign:'center'}}>
        {[['투표완료','5'],['미투표','3'],['후보','5']].map(([l,v])=>(
          <div key={l}>
            <div style={{fontSize:18, fontWeight:700, color: WF.peachInk}}>{v}</div>
            <div style={{fontSize:10, color: WF.mute}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Name input */}
      <div>
        <div style={{fontSize:11, fontWeight:600, marginBottom:5}}>이름 *</div>
        <div className="wf-input wf-input-filled">민지(나)</div>
      </div>

      {/* Legend */}
      <div style={{display:'flex', gap:14, fontSize:11, color: WF.mute}}>
        <span><span style={{color: WF.green, fontWeight:700}}>○</span> 참석</span>
        <span><span style={{color: WF.blue, fontWeight:700}}>△</span> 미정</span>
        <span><span style={{color: WF.red, fontWeight:700}}>×</span> 불참</span>
      </div>

      {/* Date cards */}
      {POLL_DATA.slots.map(slot => (
        <div key={slot.date} className="wf-card" style={{padding:12}}>
          <div style={{fontSize:13, fontWeight:700, marginBottom:8}}>{slot.date}</div>
          {slot.times.map(t => (
            <div key={t.t} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'8px 0',
              borderTop: t !== slot.times[0] ? '1px dashed '+WF.dash : 'none',
              position:'relative',
            }}>
              <div>
                <div style={{fontSize:12, fontWeight: t.best?700:500}}>{t.t}</div>
                <div style={{fontSize:10, color: WF.mute, marginTop:2}}>응답 {t.y+t.m+t.n}명</div>
                {t.best && (
                  <div className="wf-chip wf-chip-peach" style={{fontSize:9, padding:'1px 6px', marginTop:4}}>
                    👑 참석 가장 많아요
                  </div>
                )}
              </div>
              <div style={{display:'flex', gap:6}}>
                <VoteBtn kind="yes" state={t.me==='yes'?'on':'off'} count={t.y}/>
                <VoteBtn kind="maybe" state={t.me==='maybe'?'on':'off'} count={t.m}/>
                <VoteBtn kind="no" state={t.me==='no'?'on':'off'} count={t.n}/>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Participants */}
      <div style={{marginTop:4}}>
        <div style={{fontSize:12, fontWeight:600, marginBottom:8}}>참여자</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
          {POLL_DATA.voters.map(v => (
            <span key={v.name} className={v.done?'wf-chip wf-chip-peach':'wf-chip'}
              style={{fontSize:10, padding:'3px 8px'}}>
              {v.done && '✓ '}{v.name}
            </span>
          ))}
        </div>
      </div>
    </div>
    {/* Sticky submit */}
    <div style={{
      position:'absolute', left:0, right:0, bottom:0,
      padding:'10px 16px 14px', background: WF.paper,
      borderTop:'1px dashed '+WF.dash,
    }}>
      <button className="wf-btn wf-btn-fill" style={{padding:'12px', width:'100%'}}>투표 완료 ✓</button>
    </div>
  </WFScreen>
);

// =========================================================
// VARIANT B — 가로 스크롤 그리드 (When2meet 풍, 한눈에 비교)
// =========================================================
const VoteVariantB = () => {
  const flat = POLL_DATA.slots.flatMap(s => s.times.map(t => ({...t, date: s.date, dateShort: s.dateShort, day: s.day})));
  return (
    <WFScreen>
      <div className="wf-nav">
        <div style={{fontSize:16}}>←</div>
        <div className="wf-hand" style={{fontSize:16, color: WF.peachInk}}>폴래</div>
        <div style={{fontSize:11, color: WF.mute}}>⋯</div>
      </div>
      <div style={{flex:1, padding:'14px 16px 100px', overflow:'auto', display:'flex', flexDirection:'column', gap:12}}>
        <div>
          <div style={{fontSize:16, fontWeight:700}}>{POLL_DATA.title}</div>
          <div style={{fontSize:11, color: WF.mute, marginTop:4}}>호스트 · {POLL_DATA.host} · ⏰ {POLL_DATA.deadline}</div>
        </div>
        <div style={{fontSize:11, color: WF.mute}}>이름</div>
        <div className="wf-input wf-input-filled">민지(나)</div>

        {/* Grid: 일정 후보 × 응답 */}
        <div style={{fontSize:11, color: WF.mute, marginTop:4}}>일정 후보 · 가로 스크롤 →</div>
        <div style={{
          display:'grid',
          gridTemplateColumns:`80px repeat(${flat.length}, 64px)`,
          gap:6, overflow:'auto', paddingBottom:8,
        }}>
          {/* Header row */}
          <div/>
          {flat.map(t => (
            <div key={t.dateShort+t.t} style={{textAlign:'center'}}>
              <div style={{fontSize:11, fontWeight:600}}>{t.dateShort}</div>
              <div style={{fontSize:9, color: WF.mute}}>{t.day}</div>
              <div style={{fontSize:9, color: WF.mute, marginTop:2}}>{t.t.split('–')[0]}</div>
              {t.best && <div style={{fontSize:11, marginTop:2}}>👑</div>}
            </div>
          ))}
          {/* Row: 내 응답 */}
          <div style={{fontSize:11, fontWeight:600, display:'flex', alignItems:'center'}}>내 응답</div>
          {flat.map(t => (
            <div key={'me'+t.dateShort+t.t} style={{
              display:'flex', flexDirection:'column', gap:3, alignItems:'center',
              padding:'6px 4px', borderRadius:8,
              background: t.best ? WF.peachSoft : WF.fillSoft,
            }}>
              <VoteBtn kind="yes" state={t.me==='yes'?'on':'off'} style={{transform:'scale(0.7)'}}/>
              <VoteBtn kind="maybe" state="off" style={{transform:'scale(0.7)'}}/>
              <VoteBtn kind="no" state="off" style={{transform:'scale(0.7)'}}/>
            </div>
          ))}
          {/* Row: 집계 */}
          <div style={{fontSize:11, fontWeight:600, display:'flex', alignItems:'center'}}>현황</div>
          {flat.map(t => (
            <div key={'agg'+t.dateShort+t.t} style={{
              fontSize:10, textAlign:'center', padding:'6px 0',
              borderRadius:8, background: WF.fillSoft,
              display:'flex', flexDirection:'column', gap:2,
            }}>
              <span style={{color: WF.green, fontWeight:700}}>○ {t.y}</span>
              <span style={{color: WF.blue}}>△ {t.m}</span>
              <span style={{color: WF.red}}>× {t.n}</span>
            </div>
          ))}
        </div>

        <div className="wf-note" style={{marginTop:4}}>👑 = 참석 가장 많음 (마감 후 표시)</div>

        <div style={{fontSize:12, fontWeight:600, marginTop:6}}>참여자 5/8</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:5}}>
          {POLL_DATA.voters.map(v => (
            <span key={v.name} className={v.done?'wf-chip wf-chip-peach':'wf-chip'}
              style={{fontSize:10, padding:'3px 8px'}}>{v.done && '✓ '}{v.name}</span>
          ))}
        </div>
      </div>
      <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'10px 16px 14px',
        background: WF.paper, borderTop:'1px dashed '+WF.dash}}>
        <button className="wf-btn wf-btn-fill" style={{padding:'12px', width:'100%'}}>투표 완료 ✓</button>
      </div>
    </WFScreen>
  );
};

// =========================================================
// VARIANT C — 이모지 버튼 (👍🤔👎), 토스/카톡 친근 스타일
// =========================================================
const VoteVariantC = () => (
  <WFScreen bg={WF.peachSoft}>
    <div className="wf-nav" style={{background: WF.peachSoft, borderColor: 'transparent'}}>
      <div style={{fontSize:16}}>←</div>
      <div className="wf-hand" style={{fontSize:16, color: WF.peachInk}}>폴래</div>
      <div style={{fontSize:11, color: WF.mute}}>⋯</div>
    </div>
    <div style={{flex:1, padding:'14px 16px 100px', overflow:'auto', display:'flex', flexDirection:'column', gap:12}}>
      {/* Hero header */}
      <div className="wf-hand" style={{fontSize:22, color: WF.ink, lineHeight:1.2}}>
        언제 만나면<br/>좋을까요?
      </div>
      <div style={{fontSize:13, fontWeight:600}}>{POLL_DATA.title}</div>
      <div style={{display:'flex', gap:8, fontSize:11, color: WF.mute}}>
        <span>호스트 · {POLL_DATA.host}</span>
        <span>· ⏰ D-3</span>
      </div>

      <div className="wf-card-solid" style={{padding:10, background: WF.paper}}>
        <div style={{fontSize:11, color: WF.mute, marginBottom:4}}>당신은</div>
        <div className="wf-input wf-input-filled" style={{borderStyle:'dashed'}}>민지</div>
      </div>

      {/* 슬롯들 — 더 큰 터치 영역, 가능한 시간만 골라요 톤 */}
      {POLL_DATA.slots.flatMap(s => s.times.map(t => (
        <div key={s.date+t.t} className="wf-card-solid" style={{
          padding:14, background: t.best ? WF.peachSoft : WF.paper,
          borderColor: t.best ? WF.peach : WF.ink,
        }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div>
              <div style={{fontSize:13, fontWeight:700}}>{s.date}</div>
              <div style={{fontSize:14, color: WF.peachInk, fontWeight:600, marginTop:2}}>{t.t}</div>
            </div>
            {t.best && <div style={{fontSize:18}}>👑</div>}
          </div>
          <div style={{display:'flex', gap:8, marginTop:10}}>
            {[
              {k:'yes', emoji:'👍', label:'갈래요', count:t.y, color:WF.green},
              {k:'maybe', emoji:'🤔', label:'아마도', count:t.m, color:WF.blue},
              {k:'no', emoji:'👎', label:'못 가요', count:t.n, color:WF.red},
            ].map(b=>{
              const on = t.me === b.k;
              return (
                <div key={b.k} style={{
                  flex:1, padding:'10px 4px', borderRadius:12, textAlign:'center',
                  border:`1.5px ${on?'solid':'dashed'} ${on?b.color:WF.dash}`,
                  background: on ? b.color : WF.paper, color: on ? 'white' : WF.ink,
                }}>
                  <div style={{fontSize:20}}>{b.emoji}</div>
                  <div style={{fontSize:10, marginTop:3, fontWeight:600}}>{b.label}</div>
                  <div style={{fontSize:10, marginTop:2, opacity: on ? 0.85 : 0.5}}>{b.count}명</div>
                </div>
              );
            })}
          </div>
        </div>
      )))}

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6}}>
        <div style={{fontSize:11, color: WF.mute}}>5/8명이 답했어요</div>
        <div style={{fontSize:11, color: WF.peachInk, fontWeight:600}}>참여자 보기 →</div>
      </div>
    </div>
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'10px 16px 14px',
      background: WF.peachSoft}}>
      <button className="wf-btn wf-btn-fill" style={{padding:'14px', width:'100%', fontSize:14}}>
        ✨ 응답 보내기
      </button>
    </div>
  </WFScreen>
);

// =========================================================
// VARIANT D — 비공개 모드 (숫자 집계만, 미니멀)
// =========================================================
const VoteVariantD = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div className="wf-hand" style={{fontSize:16, color: WF.peachInk}}>폴래</div>
      <div style={{fontSize:11, color: WF.mute}}>⋯</div>
    </div>
    <div style={{flex:1, padding:'14px 16px 100px', overflow:'auto', display:'flex', flexDirection:'column', gap:12}}>
      <div>
        <div style={{fontSize:16, fontWeight:700}}>{POLL_DATA.title}</div>
        <div style={{display:'flex', gap:6, marginTop:4, alignItems:'center', fontSize:11, color: WF.mute}}>
          <span>호스트 · {POLL_DATA.host}</span>
          <span>·</span>
          <span className="wf-chip" style={{fontSize:10, padding:'2px 6px'}}>🔒 비공개</span>
          <span>⏰ D-3</span>
        </div>
      </div>

      <div className="wf-note">비공개 투표: 누가 무엇을 선택했는지는 호스트도 볼 수 없어요</div>

      <div>
        <div style={{fontSize:11, fontWeight:600, marginBottom:5}}>이름</div>
        <div className="wf-input wf-input-filled">민지</div>
      </div>

      {/* Compact rows with bar visualization */}
      {POLL_DATA.slots.flatMap(s => s.times.map(t => {
        const total = t.y + t.m + t.n;
        const pctY = total ? (t.y/total)*100 : 0;
        const pctM = total ? (t.m/total)*100 : 0;
        return (
          <div key={s.date+t.t} className="wf-card" style={{padding:11}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontSize:12, fontWeight:600}}>{s.dateShort} ({s.day}) · {t.t}</div>
                <div style={{fontSize:10, color: WF.mute, marginTop:2}}>응답 {total}명</div>
              </div>
              <div style={{display:'flex', gap:5}}>
                <VoteBtn kind="yes" state={t.me==='yes'?'on':'off'}/>
                <VoteBtn kind="maybe" state="off"/>
                <VoteBtn kind="no" state="off"/>
              </div>
            </div>
            {/* Stacked bar */}
            <div style={{display:'flex', height:6, borderRadius:3, overflow:'hidden', marginTop:8, background: WF.fill}}>
              <div style={{width:`${pctY}%`, background: WF.green}}/>
              <div style={{width:`${pctM}%`, background: WF.blue}}/>
            </div>
            <div style={{display:'flex', gap:10, fontSize:10, color: WF.mute, marginTop:5}}>
              <span><span style={{color: WF.green, fontWeight:700}}>○ {t.y}</span></span>
              <span><span style={{color: WF.blue, fontWeight:700}}>△ {t.m}</span></span>
              <span><span style={{color: WF.red, fontWeight:700}}>× {t.n}</span></span>
            </div>
          </div>
        );
      }))}

      <div style={{fontSize:12, color: WF.mute, marginTop:4}}>
        ● 5명이 투표했어요 · 미투표 3명
      </div>
    </div>
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'10px 16px 14px',
      background: WF.paper, borderTop:'1px dashed '+WF.dash}}>
      <button className="wf-btn wf-btn-fill" style={{padding:'12px', width:'100%'}}>투표 완료 ✓</button>
    </div>
  </WFScreen>
);

Object.assign(window, { VoteVariantA, VoteVariantB, VoteVariantC, VoteVariantD, POLL_DATA });
