// 폴래 cute — 데스크탑 버전
// 브라우저 윈도우 안에서 펼친 레이아웃.

const { CuteAvatar: CAd, EMOJI_AVATARS: EMd } = window;

// ─── Browser window chrome ────────────────────────────────────
function BrowserWindow({ children, url = 'pollae.kr', theme, width = 1280, height = 800 }) {
  const T = theme;
  return (
    <div style={{
      width, height, borderRadius: 14, overflow:'hidden',
      background: '#fff',
      boxShadow: '0 30px 80px rgba(31,23,20,0.18), 0 0 0 1px rgba(31,23,20,0.06)',
      display:'flex', flexDirection:'column',
    }}>
      {/* Title bar */}
      <div style={{
        height: 44, display:'flex', alignItems:'center', gap: 10,
        padding:'0 14px', background:'#F8F2EC', borderBottom:`1px solid ${T.border}`,
        flexShrink: 0,
      }}>
        <div style={{display:'flex', gap: 7}}>
          {['#FF6157','#FFBD2E','#28C940'].map(c => (
            <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}}/>
          ))}
        </div>
        <div style={{flex: 1, display:'flex', justifyContent:'center'}}>
          <div style={{
            background: '#fff', borderRadius: 99,
            padding:'5px 14px', fontSize: 11, color: T.inkMute,
            fontFamily:'ui-monospace,monospace', border:`1px solid ${T.border}`,
            display:'flex', alignItems:'center', gap: 6,
            minWidth: 340,
          }}>
            <span style={{fontSize: 10}}>🔒</span>
            {url}
          </div>
        </div>
        <div style={{width: 50}}/>
      </div>
      {/* Content */}
      <div style={{flex: 1, overflow:'hidden', background: T.bgGrad, color: T.ink}}>
        {children}
      </div>
    </div>
  );
}

// ─── Top nav for desktop pages ────────────────────────────────
function DesktopNav({ theme, user, transparent }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 40px', flexShrink: 0,
      background: transparent ? 'transparent' : 'rgba(255,255,255,0.6)',
      backdropFilter:'blur(8px)',
      borderBottom: transparent ? 'none' : `1px solid ${theme.border}`,
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap: 6,
        fontSize: 22, fontWeight: 900, letterSpacing:'-0.03em',
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.pop})`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        backgroundClip:'text',
      }}>
        <span style={{fontSize: 22, WebkitTextFillColor:'initial'}}>🗳️</span>
        폴래
      </div>
      <div style={{display:'flex', alignItems:'center', gap: 16}}>
        {user ? (
          <div style={{display:'flex', alignItems:'center', gap: 10}}>
            <button style={{
              padding:'8px 16px', background: 'transparent', border:'none',
              fontSize: 13, fontWeight: 700, color: theme.inkSoft, cursor:'pointer',
              fontFamily:'inherit',
            }}>내 투표</button>
            <CAd name={user} size={36} theme={theme} done host/>
          </div>
        ) : (
          <>
            <button style={{
              padding:'8px 16px', background: 'transparent', border:'none',
              fontSize: 13, fontWeight: 700, color: theme.inkSoft, cursor:'pointer',
              fontFamily:'inherit',
            }}>로그인</button>
            <button style={{
              padding:'10px 18px',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.pop})`,
              color:'#fff', border:'none', borderRadius: 99,
              fontSize: 13, fontWeight: 800, cursor:'pointer',
              fontFamily:'inherit',
              boxShadow: `0 4px 12px ${theme.primary}40`,
            }}>＋ 새 투표</button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP LANDING
// ═══════════════════════════════════════════════════════════════
function DesktopLanding({ theme }) {
  const T = theme;
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', overflow:'auto'}}>
      <DesktopNav theme={T} transparent/>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap: 60,
        padding:'30px 80px 60px', alignItems:'center', flex: 1,
      }}>
        {/* Left: Hero */}
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap: 6,
            background:'#fff', padding:'6px 14px', borderRadius: 99,
            fontSize: 12, fontWeight: 700, color: T.primaryDeep,
            border:`1px solid ${T.primarySoft}`,
            boxShadow: `0 2px 8px ${T.primary}10`,
          }}>
            <span>✨</span> 일정 조율, 1분이면 끝
          </div>
          <h1 style={{
            fontSize: 56, fontWeight: 900, letterSpacing:'-0.04em',
            lineHeight: 1.05, margin: '20px 0 16px', color: T.ink,
          }}>
            우리,<br/>
            <span style={{
              background: `linear-gradient(135deg, ${T.primary}, ${T.pop})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text',
            }}>언제</span> 만날까요?
          </h1>
          <p style={{
            fontSize: 17, color: T.inkSoft, lineHeight: 1.5, margin:'0 0 28px',
            maxWidth: 440,
          }}>
            일정 후보를 올리면 친구들이 <b style={{color: T.ink}}>👍 🤔 👎</b> 로 답해요.<br/>
            카톡 단톡에서 무한 핑퐁하지 말고, 폴래로!
          </p>
          <div style={{display:'flex', gap: 12, alignItems:'center'}}>
            <button style={{
              padding:'16px 28px',
              background: `linear-gradient(135deg, ${T.primary}, ${T.pop})`,
              color:'#fff', border:'none', borderRadius: 16,
              fontSize: 15, fontWeight: 800, cursor:'pointer',
              fontFamily:'inherit', letterSpacing:'-0.01em',
              boxShadow: `0 8px 20px ${T.primary}55`,
              display:'inline-flex', alignItems:'center', gap: 8,
            }}>
              <span style={{fontSize: 18}}>＋</span> 새 투표 만들기
            </button>
            <button style={{
              padding:'16px 24px', background:'#fff',
              border:`1.5px solid ${T.border}`, borderRadius: 16,
              fontSize: 14, fontWeight: 700, color: T.inkSoft, cursor:'pointer',
              fontFamily:'inherit',
            }}>참여한 투표 보기</button>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap: 16, marginTop: 28,
            fontSize: 12, color: T.inkMute,
          }}>
            <div style={{display:'flex'}}>
              {['🐰','🍑','🌸','🦄','🐱'].map((e, i) => (
                <div key={i} style={{marginLeft: i === 0 ? 0 : -8}}>
                  <CAd avatar={e} avatarColor={T.charPalette[i]} size={28} theme={T} done ring="#fff"/>
                </div>
              ))}
            </div>
            <span><b style={{color: T.ink}}>2,400+</b> 모임이 이미 폴래로 만들어졌어요</span>
          </div>
        </div>

        {/* Right: Hero illustration card stack */}
        <div style={{position:'relative', display:'flex', justifyContent:'center'}}>
          {/* Background card */}
          <div style={{
            position:'absolute', width: 320, height: 360,
            background: T.surface, borderRadius: 28, top: 40, left: 20,
            border:`1.5px solid ${T.border}`,
            transform:'rotate(-6deg)', opacity: 0.7,
          }}/>
          <div style={{
            position:'absolute', width: 320, height: 360,
            background: T.surface, borderRadius: 28, top: 30, right: 20,
            border:`1.5px solid ${T.border}`,
            transform:'rotate(4deg)', opacity: 0.85,
          }}/>
          {/* Front card: vote preview */}
          <div style={{
            position:'relative', width: 360,
            background: T.surface, borderRadius: 24, padding: 22,
            border:`1.5px solid ${T.border}`,
            boxShadow: `0 20px 50px ${T.primary}25`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 14}}>
              <CAd name="민지" size={36} theme={T} done host/>
              <div>
                <div style={{fontSize: 11, color: T.inkMute, fontWeight: 600}}>민지님이 만든 투표</div>
                <div style={{fontSize: 15, fontWeight: 800, color: T.ink}}>동아리 MT 잡기 🌱</div>
              </div>
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${T.primarySoft}, ${T.accentSoft})`,
              borderRadius: 14, padding: 14, marginBottom: 12,
            }}>
              <div style={{fontSize: 13, fontWeight: 800, color: T.ink, marginBottom: 4}}>
                10월 18일 (토)
              </div>
              <div style={{fontSize: 12, color: T.primaryDeep, fontWeight: 700}}>14:00 ~ 18:00</div>
            </div>
            <div style={{display:'flex', gap: 8}}>
              {[
                {e:'👍', n:5, on:true, c:T.yes, s:T.yesSoft},
                {e:'🤔', n:1, c:T.maybe},
                {e:'👎', n:0, c:T.no},
              ].map((b,i)=>(
                <div key={i} style={{
                  flex:1, height: 52, borderRadius: 14,
                  background: b.on ? b.c : '#fff',
                  border:`2px solid ${b.on ? b.c : T.border}`,
                  color: b.on ? '#fff' : T.ink,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  boxShadow: b.on ? `0 4px 10px ${b.c}40, 0 0 0 3px ${b.s}` : 'none',
                }}>
                  <span style={{fontSize: 20}}>{b.e}</span>
                  <span style={{fontSize: 10, fontWeight: 700, color: b.on?'#fff':b.c}}>{b.n}</span>
                </div>
              ))}
            </div>
            <div style={{
              display:'flex', alignItems:'center', gap: 6, marginTop: 14,
              padding:'10px 12px', background: T.surfaceAlt, borderRadius: 12,
            }}>
              <div style={{display:'flex'}}>
                {['🍑','🌸','🦊','🐱','🐧'].map((e, i) => (
                  <div key={i} style={{marginLeft: i === 0 ? 0 : -8}}>
                    <CAd avatar={e} avatarColor={T.charPalette[(i+1)%8]} size={24} theme={T} done ring="#fff"/>
                  </div>
                ))}
              </div>
              <span style={{fontSize: 11, color: T.inkMute, fontWeight: 600}}>+ 3명 참여 중</span>
            </div>
            {/* Decorations */}
            <div style={{position:'absolute', top:-14, right:-14, fontSize: 36,
              transform:'rotate(15deg)'}}>✨</div>
            <div style={{position:'absolute', bottom: 20, right: -18, fontSize: 28,
              transform:'rotate(-15deg)'}}>🎈</div>
          </div>
        </div>
      </div>

      {/* Feature row */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 24,
        padding:'40px 80px 60px',
      }}>
        {[
          {e:'⚡', t:'1분이면 만들어요', d:'후보 일정만 올리면 끝. 친구들은 링크 받고 응답만!'},
          {e:'🎯', t:'결과 자동 확정', d:'마감되면 가장 많이 선택된 일정이 자동 결정돼요'},
          {e:'🔔', t:'안 까먹게 리마인더', d:'마감 30분 전, 미투표자에게 자동 알림'},
        ].map((f, i) => (
          <div key={i} style={{
            background:'#fff', borderRadius: 20, padding: 24,
            border:`1.5px solid ${T.border}`,
          }}>
            <div style={{fontSize: 36, marginBottom: 12}}>{f.e}</div>
            <div style={{fontSize: 17, fontWeight: 800, color: T.ink, letterSpacing:'-0.02em'}}>{f.t}</div>
            <div style={{fontSize: 13, color: T.inkSoft, marginTop: 6, lineHeight: 1.5}}>{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP VOTE PAGE — 2 column
// ═══════════════════════════════════════════════════════════════
function DesktopVote({ theme }) {
  const T = theme;
  const [myVotes, setMyVotes] = React.useState({'d2t1':'yes'});
  const [submitted, setSubmitted] = React.useState(false);
  const slots = [
    { id:'d1', date:'10월 11일 (토)', times:[
      { id:'d1t1', t:'14:00 ~ 18:00', y:4, m:1, n:0 },
      { id:'d1t2', t:'19:00 ~ 22:00', y:2, m:2, n:1 },
    ]},
    { id:'d2', date:'10월 18일 (토)', times:[
      { id:'d2t1', t:'14:00 ~ 18:00', y:5, m:0, n:0, best:true },
      { id:'d2t2', t:'19:00 ~ 22:00', y:3, m:1, n:1 },
    ]},
    { id:'d3', date:'10월 25일 (토)', times:[
      { id:'d3t1', t:'14:00 ~ 18:00', y:1, m:2, n:2 },
    ]},
  ];
  const voters = [
    {n:'민지',e:'🐰',done:true,host:true},{n:'준호',e:'🍑',done:true},
    {n:'서연',e:'🌸',done:true},{n:'지훈',e:'🦊',done:true},{n:'하은',e:'🐱',done:true},
    {n:'도윤',e:'🐧',done:false},{n:'예진',e:'🦄',done:false},{n:'시우',e:'🐻',done:false},
  ];
  const handlePick = (id, k) => setMyVotes(v => ({...v, [id]: v[id]===k?null:k}));
  const VBtn = ({kind, count, on, onPick}) => {
    const c = { yes:{c:T.yes,s:T.yesSoft}, maybe:{c:T.maybe,s:T.maybeSoft}, no:{c:T.no,s:T.noSoft}}[kind];
    const e = { yes:'👍', maybe:'🤔', no:'👎' }[kind];
    return (
      <button onClick={onPick} style={{
        width: 64, height: 60, borderRadius: 16,
        background: on ? c.c : '#fff', border: `2px solid ${on ? c.c : T.border}`,
        color: on ? '#fff' : T.ink, cursor:'pointer', fontFamily:'inherit',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: 2,
        boxShadow: on ? `0 6px 14px ${c.c}50, 0 0 0 3px ${c.s}` : '0 1px 2px rgba(0,0,0,0.04)',
        transition:'all .15s',
      }}>
        <span style={{fontSize: 22, lineHeight: 1}}>{e}</span>
        <span style={{fontSize: 10, fontWeight: 700, color: on?'#fff':c.c}}>{count}</span>
      </button>
    );
  };
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
      <DesktopNav theme={T} user="민지"/>
      <div style={{
        flex: 1, overflow:'auto',
        padding:'24px 60px 40px',
        display:'grid', gridTemplateColumns:'1fr 340px', gap: 28,
        maxWidth: 1180, margin:'0 auto', width:'100%', boxSizing:'border-box',
      }}>
        {/* Left column */}
        <div style={{display:'flex', flexDirection:'column', gap: 18}}>
          {/* Hero card */}
          <div style={{
            background:`linear-gradient(135deg, ${T.primary} 0%, ${T.pop} 100%)`,
            borderRadius: 22, padding:'22px 26px', color:'#fff',
            position:'relative', overflow:'hidden',
            boxShadow:`0 12px 30px ${T.primary}30`,
          }}>
            <div style={{position:'absolute', top: 14, right: 22, fontSize: 28,
              transform:'rotate(15deg)', opacity: 0.85}}>✨</div>
            <div style={{
              display:'inline-flex', alignItems:'center', gap: 4,
              background:'rgba(255,255,255,0.25)', backdropFilter:'blur(6px)',
              padding:'4px 10px', borderRadius: 99,
              fontSize: 11, fontWeight: 700,
            }}>
              <span style={{width:6,height:6,borderRadius:3,background:'#fff'}}/>
              진행 중 · D-3
            </div>
            <div style={{fontSize: 28, fontWeight: 900, marginTop: 10, letterSpacing:'-0.025em'}}>
              동아리 MT 잡기 🌱
            </div>
            <div style={{fontSize: 13, marginTop: 6, opacity: 0.95}}>
              2학기 첫 모임! 가능한 일정에 답해주세요
            </div>
            <div style={{display:'flex', gap: 24, marginTop: 16, fontSize: 12}}>
              <div><span style={{opacity:0.7}}>호스트 ·</span> <b>민지</b></div>
              <div><span style={{opacity:0.7}}>마감 ·</span> <b>10/9 23:59</b></div>
            </div>
          </div>

          {/* Stats + name input row */}
          <div style={{
            background:'#fff', borderRadius: 18, padding:'18px 24px',
            border:`1.5px solid ${T.border}`,
            display:'grid', gridTemplateColumns:'1fr 300px', gap: 24, alignItems:'center',
          }}>
            <div>
              <div style={{fontSize: 13, fontWeight: 700, color: T.ink}}>
                <span style={{fontSize: 22, fontWeight: 900, color: T.primary}}>5</span>
                <span style={{color: T.inkMute, fontWeight: 600}}> / 8명 응답 · 후보 5개</span>
              </div>
              <div style={{height: 8, background: T.divider, borderRadius: 4, marginTop: 8, overflow:'hidden'}}>
                <div style={{
                  height:'100%', width:'62.5%',
                  background: `linear-gradient(90deg, ${T.primary}, ${T.pop})`,
                  borderRadius: 4,
                }}/>
              </div>
            </div>
            <div>
              <div style={{fontSize: 11, fontWeight: 700, color: T.inkSoft, marginBottom: 4}}>
                이름 *
              </div>
              <input defaultValue="민지" style={{
                width:'100%', height: 40, padding:'0 14px',
                background: T.surface, border:`1.5px solid ${T.border}`,
                borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily:'inherit',
                color: T.ink, outline:'none', boxSizing:'border-box',
              }}/>
            </div>
          </div>

          {/* Date cards (wider rows) */}
          {slots.map(s => (
            <div key={s.id} style={{
              background:'#fff', borderRadius: 18,
              border:`1.5px solid ${T.border}`, overflow:'hidden',
            }}>
              <div style={{
                padding:'12px 24px',
                background:`linear-gradient(135deg, ${T.primarySoft}, ${T.accentSoft})`,
                fontSize: 15, fontWeight: 800, color: T.ink, letterSpacing:'-0.01em',
              }}>{s.date}</div>
              {s.times.map((t, i) => (
                <div key={t.id} style={{
                  display:'grid', gridTemplateColumns:'1fr auto auto', alignItems:'center', gap: 24,
                  padding:'16px 24px',
                  borderTop: i === 0 ? 'none' : `1px solid ${T.divider}`,
                  background: t.best && submitted ? `linear-gradient(90deg, ${T.popSoft}30, transparent)` : 'transparent',
                }}>
                  <div>
                    <div style={{fontSize: 16, fontWeight: 800, color: T.ink,
                      display:'flex', alignItems:'center', gap: 8}}>
                      {t.t}
                      {t.best && submitted && (
                        <span style={{
                          fontSize: 10, fontWeight: 800, color:'#fff',
                          background:`linear-gradient(135deg, ${T.pop}, ${T.primary})`,
                          padding:'3px 8px', borderRadius: 99,
                        }}>👑 최다</span>
                      )}
                    </div>
                    <div style={{fontSize: 11, color: T.inkMute, marginTop: 3}}>
                      {t.y+t.m+t.n}명 응답
                    </div>
                  </div>
                  <div style={{display:'flex', gap: 8}}>
                    <VBtn kind="yes" count={t.y} on={myVotes[t.id]==='yes'} onPick={()=>handlePick(t.id,'yes')}/>
                    <VBtn kind="maybe" count={t.m} on={myVotes[t.id]==='maybe'} onPick={()=>handlePick(t.id,'maybe')}/>
                    <VBtn kind="no" count={t.n} on={myVotes[t.id]==='no'} onPick={()=>handlePick(t.id,'no')}/>
                  </div>
                  {/* Avatars who voted */}
                  <div style={{display:'flex', minWidth: 96, justifyContent:'flex-end'}}>
                    {voters.filter(v=>v.done).slice(0, t.y).map((v, i) => (
                      <div key={v.n} style={{marginLeft: i === 0 ? 0 : -8}}>
                        <CAd avatar={v.e} avatarColor={T.charPalette[i%8]} size={28} theme={T} done ring="#fff"/>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button onClick={()=>setSubmitted(true)} style={{
            height: 56, borderRadius: 16, border:'none', cursor:'pointer',
            fontFamily:'inherit', fontSize: 15, fontWeight: 800, color:'#fff',
            background: submitted ? T.yes : `linear-gradient(135deg, ${T.primary}, ${T.pop})`,
            boxShadow: `0 8px 20px ${submitted?T.yes:T.primary}50`,
            display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
            letterSpacing:'-0.01em',
          }}>
            {submitted ? '✓ 응답 저장됨 · 수정 가능' :
              `응답 ${Object.values(myVotes).filter(Boolean).length}개 보내기 →`}
          </button>
        </div>

        {/* Right column: participants + share */}
        <div style={{display:'flex', flexDirection:'column', gap: 14}}>
          <div style={{
            background:'#fff', borderRadius: 18, padding: 20,
            border:`1.5px solid ${T.border}`,
          }}>
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'baseline',
              marginBottom: 14,
            }}>
              <div style={{fontSize: 14, fontWeight: 800, color: T.ink}}>
                참여자 <span style={{color: T.inkMute, fontWeight: 600, fontSize: 12, marginLeft: 4}}>5/8</span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, color: T.primary,
                background: T.primarySoft, padding:'3px 8px', borderRadius: 99,
              }}>62% 완료</span>
            </div>
            {/* Done */}
            <div style={{marginBottom: 14}}>
              <div style={{fontSize: 10, fontWeight: 700, color: T.yes,
                background: T.yesSoft, padding:'2px 7px', borderRadius: 99,
                display:'inline-block', marginBottom: 10}}>✓ 완료 5</div>
              <div style={{display:'flex', flexDirection:'column', gap: 8}}>
                {voters.filter(v=>v.done).map((v, i) => (
                  <div key={v.n} style={{display:'flex', alignItems:'center', gap: 10}}>
                    <CAd avatar={v.e} avatarColor={T.charPalette[i%8]} size={32} theme={T} done host={v.host}/>
                    <span style={{fontSize: 13, fontWeight: 600, color: T.ink}}>
                      {v.n}{v.host && ' (나)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderTop:`1px dashed ${T.divider}`, paddingTop: 14}}>
              <div style={{fontSize: 10, fontWeight: 700, color: T.inkSoft,
                background: T.bg, padding:'2px 7px', borderRadius: 99,
                border:`1px dashed ${T.border}`,
                display:'inline-block', marginBottom: 10}}>⏳ 아직 3명</div>
              <div style={{display:'flex', flexDirection:'column', gap: 8}}>
                {voters.filter(v=>!v.done).map((v, i) => (
                  <div key={v.n} style={{display:'flex', alignItems:'center', gap: 10}}>
                    <CAd avatar={v.e} avatarColor={T.charPalette[(i+5)%8]} size={32} theme={T} done={false}/>
                    <span style={{fontSize: 13, fontWeight: 500, color: T.inkMute}}>{v.n}</span>
                  </div>
                ))}
              </div>
              <button style={{
                width:'100%', marginTop: 12, padding:'10px',
                background: T.primarySoft, color: T.primaryDeep, border:'none',
                borderRadius: 12, fontSize: 12, fontWeight: 700, cursor:'pointer',
                fontFamily:'inherit',
              }}>👋 콕 찌르기 보내기</button>
            </div>
          </div>

          <div style={{
            background:'#fff', borderRadius: 18, padding: 16,
            border:`1.5px solid ${T.border}`,
          }}>
            <div style={{fontSize: 11, fontWeight: 700, color: T.inkSoft, marginBottom: 6}}>
              🔗 공유 링크
            </div>
            <div style={{
              display:'flex', gap: 8,
              background: T.surfaceAlt, borderRadius: 10, padding:'8px 10px',
            }}>
              <span style={{
                flex: 1, fontSize: 11, fontFamily:'ui-monospace,monospace',
                color: T.inkSoft, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                display:'flex', alignItems:'center',
              }}>pollae.kr/v/k7n2qp</span>
              <button style={{
                padding:'6px 10px', background: T.primary, color:'#fff', border:'none',
                borderRadius: 8, fontSize: 11, fontWeight: 800, cursor:'pointer',
                fontFamily:'inherit',
              }}>복사</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESKTOP DASHBOARD — sidebar + main
// ═══════════════════════════════════════════════════════════════
function DesktopDashboard({ theme }) {
  const T = theme;
  const polls = [
    { t:'동아리 MT 잡기', emoji:'🌱', resp:[5,8], deadline:'D-3', hot:true,
      preview:[{e:'🐰'},{e:'🍑'},{e:'🌸'},{e:'🦊'},{e:'🐱'}]},
    { t:'스터디 9월 모임', emoji:'📚', resp:[12,12], deadline:'D-1',
      preview:[{e:'🐧'},{e:'🦄'},{e:'🐻'},{e:'🍒'}]},
    { t:'생일 파티', emoji:'🎂', resp:[8,8], deadline:'완료', done:true, final:'10/4 (토) 19:00',
      preview:[{e:'🌷'},{e:'🍓'},{e:'🌻'}]},
    { t:'팀 회식 잡기', emoji:'🍻', resp:[4,6], deadline:'D-5',
      preview:[{e:'🐮'},{e:'🦋'}]},
  ];
  return (
    <div style={{height:'100%', display:'grid', gridTemplateColumns:'240px 1fr', overflow:'hidden'}}>
      {/* Sidebar */}
      <div style={{
        padding:'20px 16px', borderRight:`1px solid ${T.border}`,
        background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)',
        display:'flex', flexDirection:'column', gap: 4,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap: 6,
          fontSize: 22, fontWeight: 900, letterSpacing:'-0.03em',
          background: `linear-gradient(135deg, ${T.primary}, ${T.pop})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text', marginBottom: 14,
        }}>
          <span style={{fontSize: 22, WebkitTextFillColor:'initial'}}>🗳️</span>
          폴래
        </div>
        <button style={{
          padding:'12px',
          background:`linear-gradient(135deg, ${T.primary}, ${T.pop})`,
          color:'#fff', border:'none', borderRadius: 14,
          fontSize: 13, fontWeight: 800, cursor:'pointer', fontFamily:'inherit',
          boxShadow:`0 6px 14px ${T.primary}40`, marginBottom: 14,
          display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
        }}>
          <span style={{fontSize: 15}}>＋</span> 새 투표 만들기
        </button>
        {[
          {l:'진행중', n:2, on:true, e:'🔥'},
          {l:'참여한 투표', n:12, e:'🤝'},
          {l:'마감됨', n:5, e:'✓'},
          {l:'설정', e:'⚙️'},
        ].map((item, i) => (
          <button key={i} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'10px 12px', borderRadius: 10, border:'none',
            background: item.on ? T.primarySoft : 'transparent',
            color: item.on ? T.primaryDeep : T.inkSoft,
            fontSize: 13, fontWeight: item.on ? 700 : 600,
            cursor:'pointer', fontFamily:'inherit', textAlign:'left',
          }}>
            <span style={{display:'flex', alignItems:'center', gap: 8}}>
              <span style={{fontSize: 14}}>{item.e}</span>{item.l}
            </span>
            {item.n != null && (
              <span style={{fontSize: 11, fontWeight: 700,
                color: item.on ? T.primary : T.inkMute}}>{item.n}</span>
            )}
          </button>
        ))}
        <div style={{flex: 1}}/>
        {/* User card at bottom */}
        <div style={{
          display:'flex', alignItems:'center', gap: 10, padding:'10px 12px',
          background:'#fff', borderRadius: 12, border:`1px solid ${T.border}`,
        }}>
          <CAd name="민지" size={36} theme={T} done host/>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontSize: 12, fontWeight: 700, color: T.ink}}>민지</div>
            <div style={{fontSize: 10, color: T.inkMute}}>minji@example.com</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{padding:'28px 40px 40px', overflow:'auto', display:'flex',
        flexDirection:'column', gap: 20}}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        }}>
          <div>
            <div style={{fontSize: 30, fontWeight: 900, color: T.ink, letterSpacing:'-0.025em'}}>
              안녕, 민지님 👋
            </div>
            <div style={{fontSize: 13, color: T.inkSoft, marginTop: 4}}>
              진행 중인 투표 <b style={{color: T.primary}}>2개</b> · 마감 임박 1개
            </div>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap: 8,
            background:'#fff', padding:'10px 14px', borderRadius: 12,
            border:`1px solid ${T.border}`, width: 280,
          }}>
            <span style={{fontSize: 14}}>🔍</span>
            <input placeholder="투표 검색" style={{
              flex: 1, border:'none', outline:'none', fontSize: 13, fontFamily:'inherit',
              background:'transparent',
            }}/>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14}}>
          {[
            {l:'진행중', v:'2', e:'⚡', c: T.primary},
            {l:'미투표 응답 대기', v:'5', e:'⏳', c: T.maybe},
            {l:'완료된 투표', v:'5', e:'✓', c: T.yes},
            {l:'이번 달 만남', v:'3', e:'🗓️', c: T.pop},
          ].map((s, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius: 16, padding: 16,
              border:`1.5px solid ${T.border}`,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: s.c + '20', color: s.c,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize: 18,
                }}>{s.e}</div>
              </div>
              <div style={{fontSize: 28, fontWeight: 900, color: T.ink, marginTop: 10}}>{s.v}</div>
              <div style={{fontSize: 11, color: T.inkMute, fontWeight: 600}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Polls list */}
        <div>
          <div style={{fontSize: 13, fontWeight: 800, color: T.ink, marginBottom: 12,
            padding:'0 4px'}}>진행 중인 투표</div>
          <div style={{display:'flex', flexDirection:'column', gap: 10}}>
            {polls.map((p, i) => {
              const pct = (p.resp[0]/p.resp[1])*100;
              return (
                <div key={i} style={{
                  background:'#fff', borderRadius: 16, padding: 18,
                  border:`1.5px solid ${p.hot ? T.primary+'44' : T.border}`,
                  display:'grid', gridTemplateColumns:'auto 1fr auto auto', alignItems:'center',
                  gap: 18, cursor:'pointer', position:'relative', overflow:'hidden',
                  boxShadow: p.hot ? `0 4px 16px ${T.primary}15` : 'none',
                }}>
                  {p.hot && (
                    <div style={{position:'absolute', top: 0, right: 0,
                      background: T.primary, color:'#fff',
                      fontSize: 9, fontWeight: 800, padding:'3px 9px',
                      borderRadius:'0 0 0 10px'}}>🔥 HOT</div>
                  )}
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: p.done ? T.divider : `linear-gradient(135deg, ${T.primarySoft}, ${T.popSoft})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize: 24,
                  }}>{p.emoji}</div>
                  <div>
                    <div style={{fontSize: 15, fontWeight: 800, color: T.ink}}>{p.t}</div>
                    {p.done ? (
                      <div style={{fontSize: 11, color: T.yes, fontWeight: 700, marginTop: 3}}>
                        ✓ {p.final} 확정
                      </div>
                    ) : (
                      <div style={{display:'flex', alignItems:'center', gap: 10, marginTop: 6, maxWidth: 380}}>
                        <div style={{flex: 1, height: 6, background: T.divider, borderRadius: 3, overflow:'hidden'}}>
                          <div style={{height:'100%', width:`${pct}%`,
                            background:`linear-gradient(90deg, ${T.primary}, ${T.pop})`,
                            borderRadius: 3}}/>
                        </div>
                        <span style={{fontSize: 11, color: T.inkMute, fontWeight: 600,
                          fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap'}}>
                          {p.resp[0]}/{p.resp[1]}명
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{display:'flex'}}>
                    {p.preview.map((v, i) => (
                      <div key={i} style={{marginLeft: i === 0 ? 0 : -8}}>
                        <CAd avatar={v.e} avatarColor={T.charPalette[i%8]} size={28} theme={T} done ring="#fff"/>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize: 12, color: p.done ? T.inkMute : T.primaryDeep,
                    fontWeight: 700, minWidth: 50, textAlign:'right'}}>{p.deadline}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BrowserWindow, DesktopNav, DesktopLanding, DesktopVote, DesktopDashboard });
