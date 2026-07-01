// 폴래 wireframes — flow screens (landing, create, invite, host dashboard)

// ============ LANDING / HOME ============
const ScreenLanding = () => (
  <WFScreen>
    <div className="wf-nav">
      <div className="wf-hand" style={{fontSize:20, color: WF.peachInk}}>폴래</div>
      <div style={{fontSize:11, color: WF.mute}}>···</div>
    </div>
    <div style={{flex:1, padding:'28px 22px 20px', display:'flex', flexDirection:'column', gap:16}}>
      <div className="wf-hand" style={{fontSize:34, lineHeight:1.05}}>우리<br/>언제 만날까요?</div>
      <div style={{fontSize:13, color: WF.mute, lineHeight:1.5}}>
        일정 후보를 올리면 친구들이<br/>○△× 로 답해줘요.
      </div>
      <div className="wf-ph" style={{height:140, marginTop:6}}>핵심 시각 / 일러스트</div>
      <div style={{flex:1}}/>
      <button className="wf-btn wf-btn-fill" style={{padding:'14px 16px', fontSize:14, width:'100%'}}>＋ 새 투표 만들기</button>
      <button className="wf-btn wf-btn-ghost" style={{padding:'12px 16px', fontSize:13, width:'100%'}}>내가 만든 투표</button>
      <div style={{fontSize:11, color: WF.mute, textAlign:'center', marginTop:4}}>로그인 없이 시작</div>
    </div>
  </WFScreen>
);

// ============ CREATE — STEP 1 : 이벤트 정보 ============
const ScreenCreate1 = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div style={{fontSize:13, fontWeight:600}}>새 투표 (1/3)</div>
      <div style={{width:16}}/>
    </div>
    <div style={{flex:1, padding:'18px 20px', display:'flex', flexDirection:'column', gap:18, overflow:'hidden'}}>
      <div>
        <div style={{height:6, background: WF.fill, borderRadius:3, position:'relative'}}>
          <div style={{position:'absolute', inset:0, width:'33%', background: WF.peach, borderRadius:3}}/>
        </div>
        <div style={{fontSize:11, color: WF.mute, marginTop:6}}>이벤트 정보 · 일정 후보 · 옵션</div>
      </div>
      <div>
        <div style={{fontSize:12, fontWeight:600, marginBottom:6}}>이벤트명 *</div>
        <div className="wf-input wf-input-filled" style={{color: WF.ink}}>동아리 MT 일정 조율</div>
      </div>
      <div>
        <div style={{fontSize:12, fontWeight:600, marginBottom:6}}>호스트 이름 *</div>
        <div className="wf-input wf-input-filled" style={{color: WF.ink}}>김민지</div>
      </div>
      <div>
        <div style={{fontSize:12, fontWeight:600, marginBottom:6}}>설명 <span style={{color: WF.mute, fontWeight:400}}>(선택)</span></div>
        <div className="wf-input" style={{height:70, color: WF.mute}}>가능한 날짜에 ○ △ × 표시해주세요!</div>
      </div>
      <div style={{flex:1}}/>
      <button className="wf-btn wf-btn-fill" style={{padding:'14px', width:'100%'}}>다음 →</button>
    </div>
  </WFScreen>
);

// ============ CREATE — STEP 2 : 일정 후보 ============
const ScreenCreate2 = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div style={{fontSize:13, fontWeight:600}}>일정 후보 (2/3)</div>
      <div style={{width:16}}/>
    </div>
    <div style={{flex:1, padding:'14px 18px', display:'flex', flexDirection:'column', gap:12, overflow:'hidden'}}>
      <div style={{height:6, background: WF.fill, borderRadius:3, position:'relative'}}>
        <div style={{position:'absolute', inset:0, width:'66%', background: WF.peach, borderRadius:3}}/>
      </div>
      {/* 미니 캘린더 */}
      <div className="wf-card" style={{padding:10}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <span style={{fontSize:11}}>‹</span>
          <span style={{fontSize:12, fontWeight:600}}>2025 · 10월</span>
          <span style={{fontSize:11}}>›</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, fontSize:10}}>
          {['일','월','화','수','목','금','토'].map(d=>(
            <div key={d} style={{textAlign:'center', color: WF.mute, padding:'3px 0'}}>{d}</div>
          ))}
          {Array.from({length:31}).map((_,i)=>{
            const selected = [10,11,17,18].includes(i+1);
            return (
              <div key={i} style={{
                textAlign:'center', padding:'5px 0', borderRadius:6,
                background: selected ? WF.peach : 'transparent',
                color: selected ? 'white' : WF.ink,
                fontWeight: selected ? 700 : 400, fontSize: 11,
              }}>{i+1}</div>
            );
          })}
        </div>
      </div>
      <div className="wf-note">날짜 탭 → 아래 시간 슬롯 추가</div>
      {/* 선택된 날짜 슬롯 */}
      <div style={{display:'flex', flexDirection:'column', gap:8, overflow:'auto'}}>
        {[
          {date:'10/11 (토)', times:['14:00–18:00','19:00–22:00']},
          {date:'10/18 (토)', times:['14:00–18:00']},
        ].map(d=>(
          <div key={d.date} className="wf-card" style={{padding:10}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
              <span style={{fontSize:12, fontWeight:600}}>{d.date}</span>
              <span style={{fontSize:10, color: WF.mute}}>× 삭제</span>
            </div>
            {d.times.map(t=>(
              <div key={t} className="wf-fill-soft" style={{
                padding:'7px 10px', borderRadius:8, fontSize:11, marginTop:4,
                display:'flex', justifyContent:'space-between',
              }}>
                <span>{t}</span><span style={{color: WF.mute}}>×</span>
              </div>
            ))}
            <div style={{fontSize:11, color: WF.peachInk, marginTop:6, fontWeight:600}}>+ 시간 추가</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11, color: WF.mute}}>슬롯 3 / 30</div>
      <button className="wf-btn wf-btn-fill" style={{padding:'14px', width:'100%'}}>다음 →</button>
    </div>
  </WFScreen>
);

// ============ CREATE — STEP 3 : 옵션 ============
const ScreenCreate3 = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div style={{fontSize:13, fontWeight:600}}>옵션 (3/3)</div>
      <div style={{width:16}}/>
    </div>
    <div style={{flex:1, padding:'14px 20px', display:'flex', flexDirection:'column', gap:14, overflow:'hidden'}}>
      <div style={{height:6, background: WF.fill, borderRadius:3}}>
        <div style={{height:'100%', width:'100%', background: WF.peach, borderRadius:3}}/>
      </div>
      <div>
        <div style={{fontSize:12, fontWeight:600, marginBottom:6}}>투표 마감</div>
        <div className="wf-input wf-input-filled">10월 9일 (목) 23:59</div>
      </div>
      <div>
        <div style={{fontSize:12, fontWeight:600, marginBottom:8}}>투표자 공개</div>
        <div style={{display:'flex', gap:8}}>
          {[
            {l:'공개', sub:'이름 + ○△×', on:true},
            {l:'비공개', sub:'숫자만', on:false},
          ].map(o=>(
            <div key={o.l} className={o.on?'wf-card-solid':'wf-card'} style={{
              flex:1, padding:10, textAlign:'center',
              background: o.on ? WF.peachSoft : WF.paper,
            }}>
              <div style={{fontSize:13, fontWeight:600, color: o.on ? WF.peachInk : WF.ink}}>{o.l}</div>
              <div style={{fontSize:10, color: WF.mute, marginTop:2}}>{o.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="wf-card" style={{padding:12, display:'flex', flexDirection:'column', gap:10}}>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
          <span>마감 알림</span>
          <span className="wf-fill" style={{width:32, height:18, borderRadius:9, position:'relative'}}>
            <span style={{position:'absolute', right:1, top:1, width:16, height:16, background: WF.peach, borderRadius:'50%'}}/>
          </span>
        </div>
        <div className="wf-divider"/>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
          <span>게스트 수정 허용</span>
          <span className="wf-fill" style={{width:32, height:18, borderRadius:9, position:'relative'}}>
            <span style={{position:'absolute', right:1, top:1, width:16, height:16, background: WF.peach, borderRadius:'50%'}}/>
          </span>
        </div>
      </div>
      <div style={{flex:1}}/>
      <button className="wf-btn wf-btn-fill" style={{padding:'14px', width:'100%'}}>투표 만들기 ✓</button>
    </div>
  </WFScreen>
);

// ============ INVITE / SHARE ============
const ScreenInvite = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>×</div>
      <div style={{fontSize:13, fontWeight:600}}>투표 완성!</div>
      <div style={{width:16}}/>
    </div>
    <div style={{flex:1, padding:'22px 20px', display:'flex', flexDirection:'column', gap:14, overflow:'hidden'}}>
      <div style={{textAlign:'center', marginTop:4}}>
        <div className="wf-hand" style={{fontSize:30, color: WF.peachInk}}>완성!</div>
        <div style={{fontSize:12, color: WF.mute, marginTop:4}}>친구들에게 링크를 공유하세요</div>
      </div>
      {/* 미리보기 카드 */}
      <div className="wf-card-solid" style={{padding:14, background: WF.peachSoft, borderColor: WF.peach}}>
        <div style={{fontSize:11, color: WF.peachInk, fontWeight:600}}>📅 투표</div>
        <div style={{fontSize:15, fontWeight:700, marginTop:4}}>동아리 MT 일정</div>
        <div style={{fontSize:11, color: WF.mute, marginTop:2}}>호스트 · 김민지</div>
        <div style={{fontSize:11, color: WF.mute, marginTop:8}}>~ 10/9 23:59</div>
      </div>
      {/* 링크 */}
      <div className="wf-card" style={{padding:10, display:'flex', alignItems:'center', gap:8}}>
        <div style={{flex:1, fontSize:11, color: WF.mute, fontFamily:'monospace', overflow:'hidden', whiteSpace:'nowrap'}}>
          pollae.kr/v/k7n2qp
        </div>
        <button className="wf-btn" style={{padding:'6px 10px', fontSize:11}}>복사</button>
      </div>
      {/* 공유 버튼 그리드 */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10}}>
        {['카톡','문자','메일','더보기'].map(s=>(
          <div key={s} style={{textAlign:'center'}}>
            <div className="wf-ph" style={{width:50, height:50, borderRadius:14, margin:'0 auto', fontSize:11}}>•</div>
            <div style={{fontSize:11, marginTop:4}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{flex:1}}/>
      <button className="wf-btn wf-btn-fill-ink" style={{padding:'13px', width:'100%'}}>투표 페이지 보기</button>
      <button className="wf-btn wf-btn-ghost" style={{padding:'11px', width:'100%'}}>호스트 대시보드로</button>
    </div>
  </WFScreen>
);

// ============ RESULT / 확정 화면 ============
const ScreenResult = () => (
  <WFScreen>
    <div className="wf-nav">
      <div style={{fontSize:16}}>←</div>
      <div style={{fontSize:13, fontWeight:600}}>결과 확정</div>
      <div style={{fontSize:11, color: WF.mute}}>공유</div>
    </div>
    <div style={{flex:1, padding:'16px 18px', display:'flex', flexDirection:'column', gap:12, overflow:'hidden'}}>
      <div className="wf-chip wf-chip-ink" style={{alignSelf:'flex-start'}}>● 마감됨</div>
      <div style={{fontSize:17, fontWeight:700}}>동아리 MT 일정</div>
      <div className="wf-card-solid" style={{padding:14, borderColor: WF.peach, background: WF.peachSoft}}>
        <div className="wf-hand" style={{fontSize:18, color: WF.peachInk}}>최종 일정</div>
        <div style={{fontSize:20, fontWeight:700, marginTop:6}}>10월 18일 (토)</div>
        <div style={{fontSize:14, fontWeight:600, color: WF.peachInk}}>14:00 – 18:00</div>
        <div style={{display:'flex', gap:14, marginTop:10, fontSize:11, color: WF.mute}}>
          <span>○ 9명</span><span>△ 1명</span><span>× 0명</span>
        </div>
      </div>
      <div className="wf-note">"가장 많이 선택" 자동 확정 / 동점 시 호스트 직접 선택</div>
      <div style={{fontSize:12, fontWeight:600, marginTop:4}}>다른 후보</div>
      {[
        {d:'10/11 (토) 14–18', y:6, m:2, n:2},
        {d:'10/11 (토) 19–22', y:4, m:3, n:3},
        {d:'10/18 (토) 19–22', y:5, m:2, n:3},
      ].map(r=>(
        <div key={r.d} className="wf-card" style={{padding:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span style={{fontSize:12}}>{r.d}</span>
          <span style={{fontSize:11, color: WF.mute}}>○{r.y} △{r.m} ×{r.n}</span>
        </div>
      ))}
      <div style={{flex:1}}/>
      <button className="wf-btn wf-btn-fill" style={{padding:'13px', width:'100%'}}>전체에 알림 보내기</button>
      <button className="wf-btn wf-btn-ghost" style={{padding:'11px', width:'100%'}}>캘린더에 추가</button>
    </div>
  </WFScreen>
);

// ============ HOST DASHBOARD ============
const ScreenDashboard = () => (
  <WFScreen>
    <div className="wf-nav">
      <div className="wf-hand" style={{fontSize:18, color: WF.peachInk}}>폴래</div>
      <div style={{fontSize:11, color: WF.mute}}>👤</div>
    </div>
    <div style={{flex:1, padding:'18px 18px', display:'flex', flexDirection:'column', gap:14, overflow:'hidden'}}>
      <div>
        <div className="wf-hand" style={{fontSize:24}}>안녕하세요, 민지님</div>
        <div style={{fontSize:11, color: WF.mute, marginTop:2}}>진행 중인 투표 2개</div>
      </div>
      <button className="wf-btn wf-btn-fill" style={{padding:'12px', width:'100%'}}>＋ 새 투표 만들기</button>
      <div style={{display:'flex', gap:8, fontSize:11}}>
        <span className="wf-chip wf-chip-peach">진행중 2</span>
        <span className="wf-chip">마감됨 5</span>
        <span className="wf-chip">전체 7</span>
      </div>
      {/* Poll cards */}
      {[
        {t:'동아리 MT 일정', sub:'5/8명 투표', tag:'D-3', hot:true},
        {t:'스터디 모임 9월', sub:'12/12명 투표 완료', tag:'D-1', hot:false},
        {t:'생일 파티 일정', sub:'마감됨 · 10/4 확정', tag:'완료', hot:false, done:true},
      ].map((p,i)=>(
        <div key={i} className="wf-card" style={{padding:12, position:'relative'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{fontSize:13, fontWeight:600}}>{p.t}</div>
            <div className={p.done?'wf-chip':'wf-chip wf-chip-peach'} style={{fontSize:10}}>{p.tag}</div>
          </div>
          <div style={{fontSize:11, color: WF.mute, marginTop:4}}>{p.sub}</div>
          {!p.done && (
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <div style={{flex:1, height:4, background: WF.fill, borderRadius:2}}>
                <div style={{width: p.hot?'62%':'100%', height:'100%', background: WF.peach, borderRadius:2}}/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </WFScreen>
);

Object.assign(window, { ScreenLanding, ScreenCreate1, ScreenCreate2, ScreenCreate3, ScreenInvite, ScreenResult, ScreenDashboard });
