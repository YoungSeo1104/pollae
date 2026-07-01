// 폴래 wireframes — 데스크탑 뷰

// 브라우저 윈도우 chrome
const WFBrowser = ({ children, url = 'pollae.kr/v/k7n2qp', width = 1100, height = 700 }) => (
  <div style={{
    width, height, background: WF.paper,
    border: '1.5px solid '+WF.ink, borderRadius: 12,
    display:'flex', flexDirection:'column', overflow:'hidden',
  }}>
    {/* Title bar */}
    <div style={{
      height: 36, display:'flex', alignItems:'center', gap:8,
      padding:'0 12px', borderBottom:'1px dashed '+WF.dash,
      background: WF.fillSoft,
    }}>
      <div style={{display:'flex', gap:5}}>
        <div style={{width:10, height:10, borderRadius:5, border:'1.5px solid '+WF.ink}}/>
        <div style={{width:10, height:10, borderRadius:5, border:'1.5px solid '+WF.ink}}/>
        <div style={{width:10, height:10, borderRadius:5, border:'1.5px solid '+WF.ink}}/>
      </div>
      <div style={{
        flex:1, height: 22, borderRadius: 11, background: WF.paper,
        border:'1px dashed '+WF.dash, fontSize: 11, color: WF.mute,
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily: 'monospace',
      }}>🔒 {url}</div>
      <div style={{width:50}}/>
    </div>
    <div style={{flex:1, overflow:'auto'}}>{children}</div>
  </div>
);

// ============ DESKTOP — 투표 페이지 (3분할 레이아웃) ============
const DesktopVote = () => (
  <WFBrowser>
    <div style={{padding:'24px 40px', display:'flex', flexDirection:'column', gap:16, height:'100%'}}>
      {/* Top header */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="wf-hand" style={{fontSize:22, color: WF.peachInk}}>폴래</div>
        <div style={{display:'flex', gap:10, fontSize:12, color: WF.mute}}>
          <span>공유 ↗</span>
          <span>로그인</span>
        </div>
      </div>

      {/* Event header */}
      <div className="wf-card" style={{padding:16}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:20, fontWeight:700}}>{POLL_DATA.title}</div>
            <div style={{fontSize:12, color: WF.mute, marginTop:4}}>
              호스트 · {POLL_DATA.host} · 가능한 일정에 답해주세요!
            </div>
          </div>
          <div style={{display:'flex', gap:6}}>
            <span className="wf-chip wf-chip-peach">⏰ {POLL_DATA.deadline}</span>
            <span className="wf-chip">🌐 공개</span>
          </div>
        </div>
        <div style={{display:'flex', gap:24, marginTop:14, fontSize:11, color: WF.mute}}>
          <span><b style={{color: WF.peachInk, fontSize:14}}>5</b> 투표완료</span>
          <span><b style={{fontSize:14}}>3</b> 미투표</span>
          <span><b style={{fontSize:14}}>5</b> 일정 후보</span>
        </div>
      </div>

      {/* Two column layout */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 280px', gap:20, flex:1, minHeight:0}}>
        {/* Left: 투표 표 */}
        <div className="wf-card" style={{padding:18, overflow:'auto', display:'flex', flexDirection:'column', gap:14}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontSize:13, fontWeight:700}}>일정 선택</div>
            <div style={{display:'flex', gap:14, fontSize:11, color: WF.mute}}>
              <span><span style={{color: WF.green, fontWeight:700}}>○</span> 참석</span>
              <span><span style={{color: WF.blue, fontWeight:700}}>△</span> 미정</span>
              <span><span style={{color: WF.red, fontWeight:700}}>×</span> 불참</span>
            </div>
          </div>
          <div>
            <div style={{fontSize:11, fontWeight:600, marginBottom:5}}>이름 *</div>
            <div className="wf-input wf-input-filled" style={{maxWidth:280}}>민지(나)</div>
          </div>

          {/* Table-like rows */}
          {POLL_DATA.slots.map(s => (
            <div key={s.date}>
              <div style={{fontSize:13, fontWeight:700, padding:'8px 0 6px', borderBottom:'1px dashed '+WF.dash}}>
                {s.date}
              </div>
              {s.times.map(t => (
                <div key={t.t} style={{
                  display:'flex', alignItems:'center', padding:'12px 4px',
                  borderBottom: '1px dashed '+WF.dash,
                  background: t.best ? WF.peachSoft : 'transparent',
                }}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:600}}>{t.t}</div>
                    <div style={{fontSize:10, color: WF.mute, marginTop:2}}>응답 {t.y+t.m+t.n}명</div>
                  </div>
                  {t.best && (
                    <div className="wf-chip wf-chip-peach" style={{fontSize:10, marginRight:14}}>
                      👑 참석 가장 많아요
                    </div>
                  )}
                  <div style={{display:'flex', gap:8}}>
                    <VoteBtn kind="yes" state={t.me==='yes'?'on':'off'} count={t.y}/>
                    <VoteBtn kind="maybe" state={t.me==='maybe'?'on':'off'} count={t.m}/>
                    <VoteBtn kind="no" state={t.me==='no'?'on':'off'} count={t.n}/>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button className="wf-btn wf-btn-fill" style={{padding:'13px', width:'100%', marginTop:6}}>
            투표 완료 ✓
          </button>
        </div>

        {/* Right: 참여자 + 활동 */}
        <div style={{display:'flex', flexDirection:'column', gap:14, overflow:'auto'}}>
          <div className="wf-card" style={{padding:14}}>
            <div style={{fontSize:12, fontWeight:700, marginBottom:10}}>참여자 5/8</div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              {POLL_DATA.voters.map(v => (
                <div key={v.name} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  fontSize:12, padding:'4px 0',
                }}>
                  <span style={{color: v.done ? WF.ink : WF.mute}}>
                    {v.host && '👑 '}{v.name}
                  </span>
                  <span className={v.done?'wf-chip wf-chip-peach':'wf-chip'}
                    style={{fontSize:9, padding:'2px 6px'}}>
                    {v.done ? '✓ 완료' : '미투표'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="wf-card" style={{padding:14}}>
            <div style={{fontSize:12, fontWeight:700, marginBottom:8}}>활동</div>
            <div style={{fontSize:11, color: WF.mute, display:'flex', flexDirection:'column', gap:6}}>
              <div>방금 · 하은님 투표 완료</div>
              <div>5분 전 · 지훈님 투표 완료</div>
              <div>1시간 전 · 서연님 투표 완료</div>
              <div className="wf-divider" style={{margin:'4px 0'}}/>
              <div style={{color: WF.peachInk, fontWeight:600}}>💬 마감 N분 전 미투표자에게 자동 리마인더</div>
            </div>
          </div>

          <div className="wf-card wf-fill-soft" style={{padding:12}}>
            <div style={{fontSize:11, fontWeight:600, marginBottom:5}}>📲 공유하기</div>
            <div className="wf-input" style={{fontSize:10, fontFamily:'monospace', padding:'7px 9px'}}>
              pollae.kr/v/k7n2qp
            </div>
          </div>
        </div>
      </div>
    </div>
  </WFBrowser>
);

// ============ DESKTOP — 호스트 대시보드 ============
const DesktopDashboard = () => (
  <WFBrowser url="pollae.kr/home">
    <div style={{display:'grid', gridTemplateColumns:'200px 1fr', height:'100%'}}>
      {/* Sidebar */}
      <div style={{padding:'20px 16px', borderRight:'1px dashed '+WF.dash, background: WF.fillSoft,
        display:'flex', flexDirection:'column', gap:8}}>
        <div className="wf-hand" style={{fontSize:22, color: WF.peachInk, marginBottom:6}}>폴래</div>
        <button className="wf-btn wf-btn-fill" style={{padding:'10px', fontSize:12}}>＋ 새 투표</button>
        <div className="wf-divider" style={{margin:'10px 0'}}/>
        {[
          {l:'진행중', n:2, on:true},
          {l:'마감됨', n:5},
          {l:'내가 참여한', n:12},
          {l:'설정', n:null},
        ].map(item => (
          <div key={item.l} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'8px 10px', borderRadius:8, fontSize:12,
            background: item.on ? WF.paper : 'transparent',
            border: item.on ? '1.5px dashed '+WF.peach : 'none',
            fontWeight: item.on ? 600 : 400,
            color: item.on ? WF.peachInk : WF.ink,
          }}>
            <span>{item.l}</span>
            {item.n != null && <span style={{fontSize:10, color: WF.mute}}>{item.n}</span>}
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{padding:'24px 32px', display:'flex', flexDirection:'column', gap:16, overflow:'auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
          <div>
            <div className="wf-hand" style={{fontSize:26}}>안녕하세요, 민지님</div>
            <div style={{fontSize:12, color: WF.mute, marginTop:2}}>진행 중인 투표 2개 · 마감 임박 1개</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <div className="wf-input" style={{width:200, fontSize:11}}>🔍 검색</div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10}}>
          {[
            {l:'진행중', v:'2'},
            {l:'미투표 응답 대기', v:'5'},
            {l:'완료된 투표', v:'5'},
            {l:'이번 달 만남', v:'3'},
          ].map(c => (
            <div key={c.l} className="wf-card" style={{padding:12}}>
              <div style={{fontSize:11, color: WF.mute}}>{c.l}</div>
              <div style={{fontSize:22, fontWeight:700, color: WF.peachInk, marginTop:2}}>{c.v}</div>
            </div>
          ))}
        </div>

        {/* Poll table */}
        <div className="wf-card" style={{padding:0, overflow:'hidden'}}>
          <div style={{padding:'12px 16px', borderBottom:'1px dashed '+WF.dash,
            display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 80px', fontSize:11, fontWeight:600, color: WF.mute}}>
            <div>이벤트</div><div>응답 현황</div><div>마감</div><div>상태</div><div></div>
          </div>
          {[
            {t:'동아리 MT 일정 조율', resp:'5/8', deadline:'D-3', status:'진행중', hot:true},
            {t:'스터디 9월 모임', resp:'12/12', deadline:'D-1', status:'진행중'},
            {t:'생일 파티 일정', resp:'8/8', deadline:'완료', status:'10/4 확정', done:true},
            {t:'팀 회식 잡기', resp:'4/6', deadline:'D+2', status:'마감됨', done:true},
          ].map((row,i) => (
            <div key={i} style={{
              padding:'14px 16px', borderBottom: i<3 ? '1px dashed '+WF.dash : 'none',
              display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 80px', alignItems:'center', fontSize:12,
            }}>
              <div style={{fontWeight:600}}>{row.t}</div>
              <div>
                <div style={{fontSize:11, color: WF.mute}}>{row.resp}</div>
                <div style={{height:3, background: WF.fill, borderRadius:2, marginTop:3}}>
                  <div style={{width: row.hot?'62%':row.done?'100%':'90%', height:'100%', background: WF.peach, borderRadius:2}}/>
                </div>
              </div>
              <div style={{color: row.hot?WF.peachInk:WF.mute, fontWeight: row.hot?600:400, fontSize:11}}>{row.deadline}</div>
              <div>
                <span className={row.done?'wf-chip':'wf-chip wf-chip-peach'} style={{fontSize:10}}>{row.status}</span>
              </div>
              <div style={{textAlign:'right', color: WF.mute, fontSize:14}}>⋯</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </WFBrowser>
);

Object.assign(window, { WFBrowser, DesktopVote, DesktopDashboard });
