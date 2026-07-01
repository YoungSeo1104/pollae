// 폴래 cute — 공유 + 결과 확정 + 호스트 대시보드

const { CuteAvatar: CA2, NavBar: NB2, PrimaryBtn: PB2 } = window;

// ═══════════════════════════════════════════════════════════════
// 5. INVITE / SHARE
// ═══════════════════════════════════════════════════════════════
function InviteScreen({ theme, nav = () => {} }) {
  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: theme.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NB2 theme={theme} title=""
        right={<button onClick={() => nav('dashboard')} className="pl-pressable" style={{
          fontSize: 18, color: theme.inkSoft, width: 36, height: 36,
        }}>×</button>}/>

      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto', padding: '4px 22px 100px',
        display:'flex', flexDirection:'column', gap: 18,
      }}>
        {/* Celebration */}
        <div style={{textAlign:'center', padding: '14px 0 4px', position:'relative'}}>
          <div style={{
            display:'inline-flex', position:'relative',
            fontSize: 60, lineHeight: 1,
          }}>
            <span style={{position:'absolute', top:-10, left:-30, fontSize: 24,
              transform:'rotate(-20deg)'}}>✨</span>
            🎉
            <span style={{position:'absolute', top:-5, right:-30, fontSize: 24,
              transform:'rotate(20deg)'}}>✨</span>
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: theme.ink,
            marginTop: 8, letterSpacing:'-0.02em'}}>
            투표가 만들어졌어요!
          </div>
          <div style={{fontSize: 13, color: theme.inkSoft, marginTop: 4}}>
            친구들에게 링크를 보내고 답을 기다려보세요
          </div>
        </div>

        {/* Preview card — looks like the KakaoTalk share card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.pop} 100%)`,
          borderRadius: 22, padding: 20, color: '#fff', position:'relative',
          overflow:'hidden', boxShadow:`0 12px 30px ${theme.primary}40`,
        }}>
          <div style={{position:'absolute', top:-20, right:-20, width:120, height:120,
            borderRadius:'50%', background:'rgba(255,255,255,0.15)'}}/>
          <div style={{position:'absolute', bottom: 14, right: 16, fontSize: 36, opacity: 0.7,
            transform:'rotate(15deg)'}}>📅</div>
          <div style={{position:'relative'}}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap: 4,
              background:'rgba(255,255,255,0.25)', backdropFilter:'blur(6px)',
              padding:'3px 9px', borderRadius:99, fontSize: 10, fontWeight: 700,
            }}>🗳️ 투표</div>
            <div style={{fontSize: 22, fontWeight: 900, marginTop: 10, letterSpacing:'-0.02em'}}>
              동아리 MT 잡기 🌱
            </div>
            <div style={{fontSize: 12, marginTop: 8, opacity: 0.95}}>
              호스트 · 민지님
            </div>
            <div style={{fontSize: 12, opacity: 0.9}}>
              📅 마감 10/9 (목) 23:59
            </div>
          </div>
        </div>

        {/* Link copy */}
        <div style={{
          background: theme.surface, borderRadius: 16, padding: '10px 10px 10px 14px',
          border: `1.5px solid ${theme.border}`,
          display:'flex', alignItems:'center', gap: 8,
        }}>
          <span style={{fontSize: 16}}>🔗</span>
          <div style={{flex:1, minWidth: 0, overflow:'hidden'}}>
            <div style={{fontSize: 10, color: theme.inkMute, fontWeight: 600}}>투표 링크</div>
            <div style={{fontSize: 12, fontWeight: 600, color: theme.ink,
              fontFamily:'ui-monospace,monospace', whiteSpace:'nowrap',
              overflow:'hidden', textOverflow:'ellipsis'}}>
              pollae.kr/v/k7n2qp
            </div>
          </div>
          <button className="pl-pressable" style={{
            padding:'8px 14px', borderRadius: 12,
            background: theme.primary, color:'#fff',
            fontSize: 12, fontWeight: 800,
          }}>복사</button>
        </div>

        {/* Share grid */}
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 10, paddingLeft: 4}}>
            바로 공유하기
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 8}}>
            {[
              {label:'카톡', emoji:'💬', bg:'#FEE500'},
              {label:'문자', emoji:'📩', bg:'#A8DDFF'},
              {label:'메일', emoji:'✉️', bg:'#FFD9A8'},
              {label:'더보기', emoji:'⋯', bg: theme.divider},
            ].map(s => (
              <button key={s.label} className="pl-pressable" style={{
                padding:'14px 8px', borderRadius: 16, background: theme.surface,
                border: `1.5px solid ${theme.border}`,
                display:'flex', flexDirection:'column', alignItems:'center', gap: 6,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: s.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize: 20,
                }}>{s.emoji}</div>
                <span style={{fontSize: 11, fontWeight: 700, color: theme.ink}}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'12px 22px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)`,
        display:'flex', flexDirection:'column', gap: 8}}>
        <PB2 theme={theme} onClick={() => nav('vote')}>투표 페이지 보기 →</PB2>
        <PB2 theme={theme} ghost style={{height: 44, fontSize: 13}} onClick={() => nav('dashboard')}>호스트 대시보드</PB2>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 6. RESULT — 마감 후 확정
// ═══════════════════════════════════════════════════════════════
function ResultScreen({ theme, nav = () => {} }) {
  const winners = [
    { name:'민지', host:true },
    { name:'준호' },
    { name:'서연' },
    { name:'지훈' },
    { name:'하은' },
  ];
  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: theme.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NB2 theme={theme} title="결과 확정" onBack={() => nav('dashboard')}
        right={<button className="pl-pressable" style={{
          fontSize: 14, color: theme.inkSoft, width: 36, height: 36,
        }}>⤴</button>}/>

      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto', padding: '4px 20px 100px',
        display:'flex', flexDirection:'column', gap: 18,
      }}>
        {/* Status chip */}
        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap: 4,
            background: theme.ink, color:'#fff',
            padding:'4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
          }}>
            <span style={{width:5, height:5, borderRadius:3, background:'#fff'}}/>
            마감됨
          </span>
          <span style={{fontSize: 11, color: theme.inkMute, fontWeight: 600}}>
            10/9 (목) 23:59 종료
          </span>
        </div>

        <div>
          <div style={{fontSize: 22, fontWeight: 900, color: theme.ink, letterSpacing:'-0.02em'}}>
            동아리 MT 잡기 🌱
          </div>
        </div>

        {/* Winner card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.pop} 100%)`,
          borderRadius: 26, padding: 22, color:'#fff',
          position:'relative',
          boxShadow:`0 12px 30px ${theme.primary}40`,
        }}>
          {/* sparkles in a clipped sublayer */}
          <div style={{position:'absolute', inset: 0, borderRadius: 26, overflow:'hidden', pointerEvents:'none'}}>
            {[
              {t: 12, l: 20, s: 18, r: -10},
              {t: 30, r: 30, s: 20, r2: 15},
              {b: 16, l: 30, s: 16, r: 20},
              {t: 80, r: 60, s: 12, r2: -10},
            ].map((p, i) => (
              <div key={i} style={{
                position:'absolute',
                top: p.t, bottom: p.b, left: p.l, right: p.r,
                fontSize: p.s, opacity: 0.85,
                transform: `rotate(${p.r2 || p.r || 0}deg)`,
              }}>✨</div>
            ))}
          </div>
          <div style={{position:'relative', zIndex: 1}}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap: 4,
              background:'rgba(255,255,255,0.25)', backdropFilter:'blur(6px)',
              padding:'3px 10px', borderRadius:99, fontSize: 10, fontWeight: 800,
            }}>👑 가장 많이 선택</div>
            <div style={{fontSize: 28, fontWeight: 900, marginTop: 10, letterSpacing:'-0.02em'}}>
              10월 18일 (토)
            </div>
            <div style={{fontSize: 18, fontWeight: 700, marginTop: 2, opacity: 0.95}}>
              14:00 ~ 18:00
            </div>
            <div style={{
              display:'flex', alignItems:'center', gap: 10, marginTop: 16,
              padding:'12px 14px', background:'rgba(255,255,255,0.2)',
              backdropFilter:'blur(6px)', borderRadius: 14,
            }}>
              <div style={{display:'flex'}}>
                {winners.map((v, i) => (
                  <div key={v.name} style={{marginLeft: i === 0 ? 0 : -10}}>
                    <CA2 name={v.name} size={28} theme={theme} done host={v.host} ring="rgba(255,255,255,0.5)"/>
                  </div>
                ))}
              </div>
              <div style={{flex:1, fontSize: 12, fontWeight: 700}}>
                <div>참석 5명 · 미정 1명</div>
                <div style={{opacity: 0.85, fontWeight: 600}}>전체 8명 중 5명</div>
              </div>
            </div>
          </div>
        </div>

        {/* Other candidates */}
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: theme.inkSoft, marginBottom: 8, paddingLeft: 4}}>
            다른 후보
          </div>
          <div style={{display:'flex', flexDirection:'column', gap: 8}}>
            {[
              { d:'10/11 (토) 14–18', y:4, m:1, n:0 },
              { d:'10/11 (토) 19–22', y:2, m:2, n:1 },
              { d:'10/18 (토) 19–22', y:3, m:1, n:1 },
              { d:'10/25 (토) 14–18', y:1, m:2, n:2 },
            ].map(r => {
              const total = r.y + r.m + r.n;
              return (
                <div key={r.d} style={{
                  background: theme.surface, borderRadius: 14,
                  border: `1.5px solid ${theme.border}`, padding: '12px 14px',
                }}>
                  <div style={{display:'flex', justifyContent:'space-between',
                    alignItems:'center', marginBottom: 8}}>
                    <span style={{fontSize: 13, fontWeight: 700, color: theme.ink}}>{r.d}</span>
                    <span style={{fontSize: 11, color: theme.inkMute, fontWeight: 600}}>{total}명 응답</span>
                  </div>
                  <div style={{display:'flex', height: 6, borderRadius: 3, overflow:'hidden',
                    background: theme.divider}}>
                    <div style={{flex: r.y, background: theme.yes}}/>
                    <div style={{flex: r.m, background: theme.maybe}}/>
                    <div style={{flex: r.n, background: theme.no}}/>
                  </div>
                  <div style={{display:'flex', gap: 12, fontSize: 10, marginTop: 5,
                    fontVariantNumeric:'tabular-nums', fontWeight: 600}}>
                    <span style={{color: theme.yes}}>👍 {r.y}</span>
                    <span style={{color: theme.maybe}}>🤔 {r.m}</span>
                    <span style={{color: theme.no}}>👎 {r.n}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'12px 20px 28px',
        background: `linear-gradient(180deg, transparent, ${theme.bg} 40%)`,
        display:'flex', flexDirection:'column', gap: 8}}>
        <PB2 theme={theme}>📢 전체에 알림 보내기</PB2>
        <PB2 theme={theme} ghost style={{height: 44, fontSize: 13}}>📅 캘린더에 추가</PB2>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 7. HOST DASHBOARD
// ═══════════════════════════════════════════════════════════════
function DashboardScreen({ theme, nav = () => {} }) {
  const [tab, setTab] = React.useState(0);
  const polls = [
    { t:'동아리 MT 잡기', emoji:'🌱', resp:[5,8], deadline:'D-3', hot: true, suspects: 1,
      preview:['민지','준호','서연','지훈','하은']},
    { t:'스터디 9월 모임', emoji:'📚', resp:[12,12], deadline:'D-1',
      preview:['도윤','예진','시우','지수','해린']},
    { t:'생일 파티', emoji:'🎂', resp:[8,8], deadline:'완료', done:true, final:'10/4 (토) 19:00',
      preview:['은서','채원','수민','윤아']},
  ];
  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: theme.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NB2 theme={theme} title="" onBack={false}
        right={<button className="pl-pressable" style={{
          width: 36, height: 36, borderRadius: 18, padding: 0,
        }}><CA2 name="민지" size={36} theme={theme} done/></button>}/>

      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto', padding: '4px 20px 100px',
        display:'flex', flexDirection:'column', gap: 16,
      }}>
        {/* Hero greeting */}
        <div style={{display:'flex', alignItems:'flex-start', gap: 12}}>
          <CA2 name="민지" size={56} theme={theme} done host/>
          <div style={{flex: 1, paddingTop: 4}}>
            <div style={{fontSize: 22, fontWeight: 900, color: theme.ink, letterSpacing:'-0.02em', lineHeight: 1.2}}>
              안녕,<br/>민지님 👋
            </div>
            <div style={{fontSize: 12, color: theme.inkSoft, marginTop: 6}}>
              진행 중인 투표 <b style={{color: theme.primary}}>2개</b> · 마감 임박 1개
            </div>
          </div>
        </div>

        {/* Quick CTA */}
        <PB2 theme={theme} style={{height: 52, fontSize: 14}} onClick={() => nav('create-1')}>
          <span style={{fontSize: 16}}>＋</span> 새 투표 만들기
        </PB2>

        {/* Tabs */}
        <div style={{display:'flex', gap: 6}}>
          {['진행중 2','마감됨 5','전체 7'].map((l, i) => (
            <button key={l} onClick={()=>setTab(i)} className="pl-pressable" style={{
              padding:'7px 14px', borderRadius: 99,
              background: tab === i ? theme.primary : theme.surface,
              color: tab === i ? '#fff' : theme.inkSoft,
              fontSize: 12, fontWeight: 700,
              border: `1px solid ${tab === i ? theme.primary : theme.border}`,
            }}>{l}</button>
          ))}
        </div>

        {/* Poll cards */}
        <div style={{display:'flex', flexDirection:'column', gap: 12}}>
          {polls.map((p, i) => {
            const pct = (p.resp[0] / p.resp[1]) * 100;
            return (
              <div key={i} onClick={() => nav(p.done ? 'result' : (p.suspects ? 'manage' : 'vote'))} className="pl-pressable" style={{
                background: theme.surface, borderRadius: 20, padding: 16,
                border: `1.5px solid ${p.suspects ? theme.maybe+'66' : p.hot ? theme.primary + '44' : theme.border}`,
                position:'relative', overflow:'hidden',
                boxShadow: p.hot ? `0 4px 16px ${theme.primary}15` : 'none',
              }}>
                {p.hot && !p.suspects && (
                  <div style={{position:'absolute', top: 0, right: 0,
                    background: theme.primary, color:'#fff',
                    fontSize: 9, fontWeight: 800, padding:'3px 9px',
                    borderRadius:'0 0 0 10px'}}>🔥 HOT</div>
                )}
                {p.suspects > 0 && (
                  <div style={{position:'absolute', top: 0, right: 0,
                    background: theme.maybe, color:'#fff',
                    fontSize: 9, fontWeight: 800, padding:'3px 9px',
                    borderRadius:'0 0 0 10px'}}>⚠️ 중복 의심 {p.suspects}건</div>
                )}
                <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 10}}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: p.done ? theme.divider : `linear-gradient(135deg, ${theme.primarySoft}, ${theme.popSoft})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize: 22, flexShrink: 0,
                  }}>{p.emoji}</div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 14, fontWeight: 800, color: theme.ink}}>{p.t}</div>
                    {p.done ? (
                      <div style={{fontSize: 11, color: theme.yes, fontWeight: 700, marginTop: 2}}>
                        ✓ {p.final} 확정
                      </div>
                    ) : (
                      <div style={{fontSize: 11, color: theme.inkMute, marginTop: 2}}>
                        <span style={{fontWeight: 700, color: theme.ink}}>{p.resp[0]}/{p.resp[1]}명</span> 응답 · 마감 {p.deadline}
                      </div>
                    )}
                  </div>
                </div>
                {/* Progress + avatars */}
                {!p.done && (
                  <div style={{
                    display:'flex', alignItems:'center', gap: 8,
                  }}>
                    <div style={{flex:1, height: 6, background: theme.divider, borderRadius: 3, overflow:'hidden'}}>
                      <div style={{
                        height:'100%', width: `${pct}%`,
                        background: `linear-gradient(90deg, ${theme.primary}, ${theme.pop})`,
                        borderRadius: 3,
                      }}/>
                    </div>
                    <div style={{display:'flex'}}>
                      {p.preview.slice(0,3).map((n, i) => (
                        <div key={n} style={{marginLeft: i === 0 ? 0 : -8}}>
                          <CA2 name={n} size={22} theme={theme} done ring="#fff"/>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {p.done && (
                  <div style={{display:'flex'}}>
                    {p.preview.slice(0,4).map((n, i) => (
                      <div key={n} style={{marginLeft: i === 0 ? 0 : -8}}>
                        <CA2 name={n} size={22} theme={theme} done ring="#fff"/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InviteScreen, ResultScreen, DashboardScreen });
