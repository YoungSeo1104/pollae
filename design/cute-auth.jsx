// 폴래 cute — 인증 / 관리 화면들
// LoginScreen, GuestConflictScreen, HostManageScreen, GuestDeletedScreen

const { CuteAvatar: CAa, NavBar: NBa, PrimaryBtn: PBa, StickerDecor: SDa } = window;

// ═══════════════════════════════════════════════════════════════
// LOGIN — 호스트 소셜 로그인
// ═══════════════════════════════════════════════════════════════
function LoginScreen({ theme, nav = () => {} }) {
  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: theme.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NBa theme={theme} title="" onBack={() => nav('landing')}/>

      <div style={{
        flex: 1, padding:'10px 28px 24px',
        display:'flex', flexDirection:'column', gap: 28,
      }}>
        {/* Hero */}
        <div style={{textAlign:'center', marginTop: 20, position:'relative'}}>
          {/* Decorative avatars */}
          <div style={{position:'relative', height: 120, marginBottom: 16}}>
            <div style={{position:'absolute', top: 20, left:'50%', marginLeft:-72,
              transform:'rotate(-12deg)'}}>
              <CAa avatar="🐰" avatarColor={theme.charPalette[0]} size={56} theme={theme} done/>
            </div>
            <div style={{position:'absolute', top: 0, left:'50%', marginLeft:-32,
              zIndex: 2}}>
              <CAa avatar="🌸" avatarColor={theme.charPalette[5]} size={68} theme={theme} done host/>
            </div>
            <div style={{position:'absolute', top: 20, left:'50%', marginLeft: 18,
              transform:'rotate(10deg)'}}>
              <CAa avatar="🍑" avatarColor={theme.charPalette[1]} size={56} theme={theme} done/>
            </div>
            <div style={{position:'absolute', top:-5, left:'50%', marginLeft:55,
              fontSize: 22, transform:'rotate(15deg)'}}>✨</div>
          </div>
          <div style={{fontSize: 24, fontWeight: 900, color: theme.ink, letterSpacing:'-0.025em'}}>
            폴래에 오신 걸<br/>환영해요 👋
          </div>
          <div style={{fontSize: 13, color: theme.inkSoft, marginTop: 8, lineHeight: 1.5}}>
            로그인하면 내가 만든 투표를<br/>한 곳에서 관리할 수 있어요
          </div>
        </div>

        <div style={{flex: 1}}/>

        {/* Social buttons */}
        <div style={{display:'flex', flexDirection:'column', gap: 10}}>
          <button className="pl-pressable" style={{
            height: 54, borderRadius: 16, border:'none', cursor:'pointer',
            background: '#FEE500', color:'#191919',
            fontSize: 15, fontWeight: 800, fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 10,
            letterSpacing:'-0.01em',
            boxShadow:'0 6px 16px rgba(254,229,0,0.4)',
          }}>
            <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M11 1.6c-5.52 0-10 3.53-10 7.88 0 2.85 1.92 5.34 4.78 6.74-.2.74-.74 2.76-.85 3.19-.13.53.2.52.4.38.16-.11 2.55-1.73 3.58-2.43.69.1 1.39.15 2.09.15 5.52 0 10-3.53 10-7.88s-4.48-7.88-10-7.88Z"
                fill="#000"/>
            </svg>
            카카오로 시작하기
          </button>
          <button className="pl-pressable" style={{
            height: 54, borderRadius: 16, border:`1.5px solid ${theme.border}`,
            background: '#fff', color: theme.ink, cursor:'pointer',
            fontSize: 15, fontWeight: 800, fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 10,
            letterSpacing:'-0.01em',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.6 10.23c0-.68-.06-1.34-.18-1.97H10v3.73h5.39c-.23 1.25-.94 2.31-2 3.02v2.5h3.23c1.89-1.74 2.98-4.31 2.98-7.28z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.96-.9 6.61-2.43l-3.23-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.08v2.59A9.99 9.99 0 0 0 10 20z" fill="#34A853"/>
              <path d="M4.42 11.9a6 6 0 0 1 0-3.8V5.51H1.08a10 10 0 0 0 0 8.98l3.34-2.59z" fill="#FBBC05"/>
              <path d="M10 3.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C14.96.99 12.7 0 10 0A9.99 9.99 0 0 0 1.08 5.51L4.42 8.1C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/>
            </svg>
            Google로 시작하기
          </button>
          <button onClick={() => nav('landing')} style={{
            padding:'10px', background:'transparent', border:'none',
            color: theme.inkMute, fontSize: 12, fontWeight: 600, cursor:'pointer',
            fontFamily:'inherit', marginTop: 4,
          }}>
            로그인 없이 둘러보기
          </button>
          <div style={{
            fontSize: 10, color: theme.inkFaint, textAlign:'center',
            lineHeight: 1.5, marginTop: 8,
          }}>
            계속하면 <span style={{textDecoration:'underline'}}>이용약관</span>과
            {' '}<span style={{textDecoration:'underline'}}>개인정보처리방침</span>에<br/>
            동의하는 것으로 간주됩니다
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GUEST CONFLICT — 게스트가 같은 이름으로 들어왔을 때
// ═══════════════════════════════════════════════════════════════
function GuestConflictScreen({ theme, nav = () => {} }) {
  const [choice, setChoice] = React.useState(null);
  // choice: null | 'mine' | 'other'
  const T = theme;

  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: T.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NBa theme={T} title="" onBack={() => nav('vote')}/>

      <div style={{
        flex: 1, padding:'10px 24px 24px',
        display:'flex', flexDirection:'column', gap: 18,
      }}>
        {/* Header */}
        <div style={{textAlign:'center', marginTop: 12}}>
          <div style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            width: 80, height: 80, borderRadius:'50%',
            background: T.maybeSoft, fontSize: 40,
            border:`2px solid ${T.maybe}30`,
          }}>🤔</div>
          <div style={{fontSize: 22, fontWeight: 900, color: T.ink, marginTop: 16,
            letterSpacing:'-0.025em'}}>
            어? 잠깐만요
          </div>
          <div style={{fontSize: 13, color: T.inkSoft, marginTop: 8, lineHeight: 1.5}}>
            <b style={{color: T.ink}}>"민지"</b>라는 이름으로<br/>
            이미 응답한 사람이 있어요
          </div>
        </div>

        {/* Existing voter card */}
        <div style={{
          background: T.surface, borderRadius: 16, padding:'14px 16px',
          border:`1.5px solid ${T.border}`,
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <CAa avatar="🐰" avatarColor={T.charPalette[0]} size={48} theme={T} done/>
          <div style={{flex: 1}}>
            <div style={{fontSize: 14, fontWeight: 800, color: T.ink}}>민지</div>
            <div style={{fontSize: 11, color: T.inkMute, marginTop: 2}}>
              3시간 전 응답 · 다른 기기에서
            </div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: T.yes,
            background: T.yesSoft, padding:'3px 8px', borderRadius: 99,
          }}>✓ 응답 완료</span>
        </div>

        {/* Choice */}
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 8, paddingLeft: 4}}>
            저 사람이 본인이신가요?
          </div>
          <div style={{display:'flex', flexDirection:'column', gap: 10}}>
            <button onClick={() => setChoice('mine')} className="pl-pressable" style={{
              padding:'16px', borderRadius: 16, textAlign:'left',
              background: choice === 'mine'
                ? `linear-gradient(135deg, ${T.primarySoft}, ${T.popSoft})`
                : T.surface,
              border:`2px solid ${choice === 'mine' ? T.primary : T.border}`,
              cursor:'pointer', fontFamily:'inherit',
            }}>
              <div style={{display:'flex', alignItems:'center', gap: 8}}>
                <span style={{fontSize: 22}}>📱</span>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 14, fontWeight: 800, color: T.ink}}>
                    네, 다른 기기에서 응답했어요
                  </div>
                  <div style={{fontSize: 11, color: T.inkMute, marginTop: 3}}>
                    호스트(민지)가 확인 후 처리해드려요
                  </div>
                </div>
              </div>
            </button>
            <button onClick={() => setChoice('other')} className="pl-pressable" style={{
              padding:'16px', borderRadius: 16, textAlign:'left',
              background: choice === 'other'
                ? `linear-gradient(135deg, ${T.primarySoft}, ${T.popSoft})`
                : T.surface,
              border:`2px solid ${choice === 'other' ? T.primary : T.border}`,
              cursor:'pointer', fontFamily:'inherit',
            }}>
              <div style={{display:'flex', alignItems:'center', gap: 8}}>
                <span style={{fontSize: 22}}>🙋</span>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 14, fontWeight: 800, color: T.ink}}>
                    아니에요, 다른 사람이에요
                  </div>
                  <div style={{fontSize: 11, color: T.inkMute, marginTop: 3}}>
                    구분되게 이름 옆에 (2) 가 붙어요
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Info if 'mine' */}
        {choice === 'mine' && (
          <div className="pl-rise" style={{
            background: T.primarySoft, borderRadius: 14, padding:'14px 16px',
            border:`1px solid ${T.primary}40`,
          }}>
            <div style={{display:'flex', gap: 10}}>
              <span style={{fontSize: 18}}>💌</span>
              <div style={{flex: 1, fontSize: 12, color: T.primaryDeep, lineHeight: 1.55}}>
                <b>호스트에게 알림을 보낼게요.</b><br/>
                기존 응답을 지울지, 둘 다 유지할지<br/>
                호스트가 판단해요.
              </div>
            </div>
          </div>
        )}
        {choice === 'other' && (
          <div className="pl-rise" style={{
            background: T.surfaceAlt, borderRadius: 14, padding:'14px 16px',
            border:`1px solid ${T.border}`,
          }}>
            <div style={{display:'flex', gap: 10}}>
              <span style={{fontSize: 18}}>👯</span>
              <div style={{flex: 1, fontSize: 12, color: T.inkSoft, lineHeight: 1.55}}>
                <b>"민지 (2)"</b> 로 응답이 추가돼요.<br/>
                혼동되지 않게 다른 이름을 써도 좋아요.
              </div>
            </div>
          </div>
        )}

        <div style={{flex: 1}}/>

        <PBa theme={T} disabled={!choice} onClick={() => nav('vote')}>
          {choice === 'mine' ? '호스트에게 알리고 응답하기' :
           choice === 'other' ? '다른 사람으로 계속하기' :
           '선택해주세요'}
        </PBa>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOST MANAGE — 호스트의 참여자 관리 페이지
// ═══════════════════════════════════════════════════════════════
function HostManageScreen({ theme, nav = () => {} }) {
  const T = theme;
  const [removed, setRemoved] = React.useState(new Set());
  const [confirmId, setConfirmId] = React.useState(null);

  const voters = [
    {id:'v1', name:'민지', avatar:'🐰', color: T.charPalette[0], device:'iPhone · 192.168.x.x',
      time:'3시간 전', host:true, votes:['10/11 14:00 👍','10/18 14:00 👍']},
    {id:'v2', name:'준호', avatar:'🍑', color: T.charPalette[1], device:'Chrome (Mac)',
      time:'2시간 전', votes:['10/18 14:00 👍']},
    {id:'v3', name:'서연', avatar:'🌸', color: T.charPalette[5], device:'Safari (iPhone)',
      time:'1시간 전', votes:['10/11 14:00 👍','10/18 14:00 👍']},
    {id:'v4', name:'민지', avatar:'🌷', color: T.charPalette[2], device:'Chrome (Android)',
      time:'10분 전', votes:['10/25 14:00 👍'], suspect:true},
    {id:'v5', name:'지훈', avatar:'🦊', color: T.charPalette[3], device:'Edge (Windows)',
      time:'5분 전', votes:['10/11 19:00 👍','10/18 19:00 🤔']},
  ];

  const visible = voters.filter(v => !removed.has(v.id));
  const suspects = visible.filter(v => v.suspect).length;

  return (
    <div className="pollae" style={{
      width:'100%', height:'100%', background: T.bgGrad,
      display:'flex', flexDirection:'column', position:'relative',
    }}>
      <NBa theme={T} title="참여자 관리" onBack={() => nav('dashboard')}
        right={<button className="pl-pressable" style={{
          fontSize: 14, color: T.inkSoft, width: 36, height: 36,
        }}>⋯</button>}/>

      <div className="pollae-scroll" style={{
        flex: 1, overflow:'auto', padding:'4px 20px 100px',
        display:'flex', flexDirection:'column', gap: 14,
      }}>
        {/* Poll context */}
        <div style={{
          background: T.surface, borderRadius: 16, padding:'14px 16px',
          border:`1.5px solid ${T.border}`,
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: `linear-gradient(135deg, ${T.primarySoft}, ${T.popSoft})`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize: 22,
          }}>🌱</div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 14, fontWeight: 800, color: T.ink}}>동아리 MT 잡기</div>
            <div style={{fontSize: 11, color: T.inkMute, marginTop: 2}}>응답 {visible.length}명 · 마감 D-3</div>
          </div>
        </div>

        {/* Suspect warning */}
        {suspects > 0 && (
          <div style={{
            background: T.maybeSoft, borderRadius: 16, padding:'12px 14px',
            border:`1.5px solid ${T.maybe}40`,
            display:'flex', alignItems:'flex-start', gap: 10,
          }}>
            <span style={{fontSize: 20}}>⚠️</span>
            <div style={{flex: 1}}>
              <div style={{fontSize: 13, fontWeight: 800, color: T.maybe}}>
                중복 의심 응답 {suspects}건
              </div>
              <div style={{fontSize: 11, color: T.inkSoft, marginTop: 3, lineHeight: 1.5}}>
                같은 이름으로 다른 기기에서 응답했어요.<br/>
                확인 후 삭제 또는 유지해주세요.
              </div>
            </div>
          </div>
        )}

        {/* Voters list */}
        <div style={{fontSize: 12, fontWeight: 700, color: T.inkSoft, padding:'4px 0 0 4px'}}>
          응답한 참여자
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: 10}}>
          {visible.map(v => (
            <div key={v.id} style={{
              background: T.surface, borderRadius: 16, padding:'14px 16px',
              border:`1.5px solid ${v.suspect ? T.maybe+'66' : T.border}`,
              position:'relative',
            }}>
              <div style={{display:'flex', alignItems:'flex-start', gap: 12}}>
                <CAa avatar={v.avatar} avatarColor={v.color} size={44} theme={T} done host={v.host}/>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap'}}>
                    <span style={{fontSize: 14, fontWeight: 800, color: T.ink}}>
                      {v.name}{v.host && ' (나)'}
                    </span>
                    {v.suspect && (
                      <span style={{
                        fontSize: 9, fontWeight: 800, color: T.maybe,
                        background: T.maybeSoft, padding:'2px 6px', borderRadius: 99,
                        border:`1px solid ${T.maybe}40`,
                      }}>⚠️ 중복 의심</span>
                    )}
                  </div>
                  <div style={{fontSize: 11, color: T.inkMute, marginTop: 3, fontFamily:'ui-monospace,monospace'}}>
                    {v.device}
                  </div>
                  <div style={{fontSize: 11, color: T.inkMute}}>
                    {v.time}
                  </div>
                  {/* Votes */}
                  <div style={{display:'flex', flexWrap:'wrap', gap: 4, marginTop: 8}}>
                    {v.votes.map((s, i) => (
                      <span key={i} style={{
                        fontSize: 10, fontWeight: 600, color: T.inkSoft,
                        background: T.surfaceAlt, padding:'3px 8px', borderRadius: 99,
                        border:`1px solid ${T.divider}`,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
                {!v.host && (
                  <button onClick={() => setConfirmId(v.id)} className="pl-pressable" style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'transparent', color: T.inkMute,
                    border:`1px solid ${T.border}`, cursor:'pointer',
                    fontSize: 14,
                  }}>⋯</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{fontSize: 11, color: T.inkFaint, textAlign:'center', padding: 12, lineHeight: 1.5}}>
          💡 게스트는 알림 수단이 없어서<br/>삭제해도 별도 알림이 가지 않아요
        </div>
      </div>

      {/* Confirm modal */}
      {confirmId && (
        <div style={{
          position:'absolute', inset: 0, zIndex: 100,
          background: 'rgba(31,23,20,0.45)',
          display:'flex', alignItems:'flex-end', justifyContent:'center',
        }} onClick={() => setConfirmId(null)}>
          <div className="pl-rise" onClick={e => e.stopPropagation()} style={{
            background: T.surface, width:'100%',
            borderRadius:'24px 24px 0 0', padding:'22px 24px 28px',
            boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
          }}>
            <div style={{
              width: 44, height: 4, borderRadius: 2, background: T.border,
              margin:'0 auto 16px',
            }}/>
            <div style={{fontSize: 18, fontWeight: 900, color: T.ink, letterSpacing:'-0.02em'}}>
              응답을 삭제할까요?
            </div>
            <div style={{fontSize: 13, color: T.inkSoft, marginTop: 6, lineHeight: 1.5}}>
              삭제하면 게스트가 같은 링크로 접속해도<br/>
              <b style={{color: T.ink}}>미투표 상태</b>로 표시돼요.<br/>
              <span style={{color: T.inkMute, fontSize: 11}}>(되돌릴 수 없어요)</span>
            </div>
            <div style={{display:'flex', gap: 8, marginTop: 20}}>
              <button onClick={() => setConfirmId(null)} style={{
                flex: 1, height: 48, borderRadius: 14,
                background: T.surfaceAlt, color: T.inkSoft,
                border:`1.5px solid ${T.border}`, cursor:'pointer',
                fontSize: 14, fontWeight: 700, fontFamily:'inherit',
              }}>취소</button>
              <button onClick={() => {
                setRemoved(r => new Set([...r, confirmId]));
                setConfirmId(null);
              }} style={{
                flex: 1, height: 48, borderRadius: 14,
                background: T.no, color:'#fff', border:'none', cursor:'pointer',
                fontSize: 14, fontWeight: 800, fontFamily:'inherit',
                boxShadow:`0 4px 12px ${T.no}40`,
              }}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LoginScreen, GuestConflictScreen, HostManageScreen });
