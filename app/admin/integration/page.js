/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "../_shared";

const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";

async function rpc(fn, args) {
  const res = await fetch(SUPA_URL + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON, "Content-Type": "application/json" },
    body: JSON.stringify(args || {}),
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || ("HTTP " + res.status));
  return txt ? JSON.parse(txt) : null;
}

// ── K-POP이 줄 수 있는 기능 (연동 기능 선택) ──
const FUNC_GROUPS = [
  { key: "방문자", items: [["visitor.read", "방문자 조회"], ["visitor.stats", "방문자 통계"], ["visitor.returning", "재방문 분석"]] },
  { key: "방문·체류", items: [["visit.read", "방문 기록 조회"], ["visit.duration", "체류 분석"], ["visit.bypage", "페이지별 체류"]] },
  { key: "스타일 선택", items: [["selection.read", "선택 기록 조회"], ["selection.stats", "선택 비중 통계"]] },
  { key: "이미지 생성", items: [["generation.read", "생성 기록 조회"], ["generation.stats", "생성 통계"], ["generation.image", "생성 이미지 조회"]] },
  { key: "도감", items: [["guide.style", "스타일 도감"], ["guide.block", "부위별 도감"], ["guide.correction", "보정 도감"]] },
  { key: "통계", items: [["stats.daily", "일별 방문 추이"], ["stats.heatmap", "시간대 히트맵"], ["stats.dashboard", "종합 대시보드"]] },
];
const ALL_SCOPES = FUNC_GROUPS.flatMap(g => g.items.map(i => i[0]));
const SCOPE_LABEL = Object.fromEntries(FUNC_GROUPS.flatMap(g => g.items));
const PARTNER_TYPES = ["본사 연동", "제휴사", "데이터 분석", "기타"];
const PERMS = [["read", "Read (조회)"], ["write", "Write (생성)"], ["update", "Update (수정)"], ["delete", "Delete (삭제)"]];
const RATES = [["unlimited", "무제한"], ["day_100", "일 100회"], ["day_500", "일 500회"], ["day_1000", "일 1,000회"], ["day_5000", "일 5,000회"], ["month_10000", "월 10,000회"], ["custom", "직접 입력"]];
const EXPIRES = [[30, "30일"], [90, "90일"], [180, "180일"], [365, "365일"], [0, "무제한"]];
const WH_EVENTS = [["visit", "방문 발생"], ["selection", "스타일 선택"], ["generation", "생성 완료"], ["generation_fail", "생성 실패"]];
const RATE_LABEL = Object.fromEntries(RATES);

export default function Integration() {
  const [partners, setPartners] = useState(null);
  const [sel, setSel] = useState(null);
  const [modal, setModal] = useState(false);
  const [issued, setIssued] = useState(null);
  const [err, setErr] = useState(null);

  const load = () => { setErr(null); rpc("kpop_list_keys").then(setPartners).catch(e => { setErr(String(e.message || e)); setPartners([]); }); };
  useEffect(() => { load(); }, []);

  const onIssued = (res) => { setModal(false); setIssued(res); load(); };
  const setStatus = (id, status) => rpc("kpop_set_key_status", { p_id: id, p_status: status }).then(() => { load(); setSel(s => s ? { ...s, status } : s); }).catch(e => alert("실패: " + e.message));
  const del = (id) => { if (!confirm("이 파트너를 삭제할까요? 발급된 키가 즉시 폐기됩니다.")) return; rpc("kpop_delete_key", { p_id: id }).then(() => { load(); setSel(null); }).catch(e => alert("실패: " + e.message)); };

  const selData = sel && partners ? partners.find(p => p.id === sel.id) || sel : sel;

  return (
    <div className="ka-root">
      <Sidebar active="integration" />
      <main className="ka-main">
        <div className="ka-pt-head">
          <div>
            <h1 className="ka-title">외부연동 · 파트너 API</h1>
            <p className="ka-sub">외부 회사·자회사에 기능 단위 권한으로 API 키를 발급하고 사용량·보안·만료를 관리합니다</p>
          </div>
          <button className="ka-pt-newbtn" onClick={() => setModal(true)}>+ 새 파트너</button>
        </div>

        {err && <div className="ka-pt-err">불러오기 오류: {err}</div>}

        <div className="ka-pt-grid">
          <div className="ka-pt-list">
            {partners === null ? (
              <div className="ka-pt-empty">불러오는 중…</div>
            ) : partners.length === 0 ? (
              <div className="ka-pt-empty">
                <div className="ka-pt-empty-ic">🔌</div>
                <b>아직 발급된 파트너가 없어요</b>
                <span>[+ 새 파트너]로 기능을 골라 키를 발급하세요</span>
              </div>
            ) : partners.map(p => (
              <div className={"ka-pt-card" + (sel && sel.id === p.id ? " on" : "")} key={p.id} onClick={() => setSel(p)}>
                <div className="ka-pt-card-top">
                  <b className="ka-pt-card-name">{p.name}</b>
                  <span className={"ka-pt-st ka-pt-st-" + p.status}>{p.status === "active" ? "● 활성" : p.status === "paused" ? "● 일시정지" : "● 폐기"}</span>
                </div>
                <div className="ka-pt-card-sub">{p.partner_type || "파트너"} · 연동 기능 {p.scopes.length}개 · 요청 {p.request_count}회</div>
              </div>
            ))}
          </div>

          <div className="ka-pt-detail">
            {!selData ? (
              <div className="ka-pt-detail-empty">왼쪽에서 파트너를 선택하세요</div>
            ) : (
              <PartnerDetail p={selData} onStatus={setStatus} onDelete={del} />
            )}
          </div>
        </div>
      </main>

      {modal && <NewPartnerModal onClose={() => setModal(false)} onIssued={onIssued} />}
      {issued && <IssuedKey data={issued} onClose={() => setIssued(null)} />}
    </div>
  );
}

function PartnerDetail({ p, onStatus, onDelete }) {
  const exp = p.expires_at ? new Date(p.expires_at).toLocaleDateString("ko-KR") : "무제한";
  return (
    <div className="ka-pt-d">
      <div className="ka-pt-d-top">
        <div><div className="ka-pt-d-name">{p.name}</div><div className="ka-pt-d-key">{p.key_masked}</div></div>
        <span className={"ka-pt-st ka-pt-st-" + p.status}>{p.status === "active" ? "● 활성" : p.status === "paused" ? "● 일시정지" : "● 폐기"}</span>
      </div>
      <div className="ka-pt-d-rows">
        <div className="ka-pt-d-row"><span>종류</span><b>{p.partner_type || "—"}</b></div>
        <div className="ka-pt-d-row"><span>권한</span><b>{p.perms.map(x => x.toUpperCase()).join(" · ")}</b></div>
        <div className="ka-pt-d-row"><span>요청 제한</span><b>{RATE_LABEL[p.rate_limit] || p.rate_limit}</b></div>
        <div className="ka-pt-d-row"><span>만료</span><b>{exp}</b></div>
        <div className="ka-pt-d-row"><span>요청 수</span><b>{p.request_count.toLocaleString()}회{p.last_used_at ? " · 최근 " + new Date(p.last_used_at).toLocaleString("ko-KR") : ""}</b></div>
        {p.ip_whitelist && p.ip_whitelist.length > 0 && <div className="ka-pt-d-row"><span>허용 IP</span><b>{p.ip_whitelist.join(", ")}</b></div>}
        {p.webhook_url && <div className="ka-pt-d-row"><span>Webhook</span><b className="ka-pt-d-url">{p.webhook_url}</b></div>}
      </div>
      <div className="ka-pt-d-sec">연동 기능 ({p.scopes.length})</div>
      <div className="ka-pt-d-chips">
        {p.scopes.length === 0 ? <span className="ka-pt-chip dim">없음</span> : p.scopes.map(s => <span className="ka-pt-chip" key={s}>{SCOPE_LABEL[s] || s}</span>)}
      </div>
      <div className="ka-pt-d-actions">
        {p.status === "active" ? (
          <button className="ka-pt-btn" onClick={() => onStatus(p.id, "paused")}>일시정지</button>
        ) : (
          <button className="ka-pt-btn primary" onClick={() => onStatus(p.id, "active")}>활성화</button>
        )}
        <button className="ka-pt-btn danger" onClick={() => onDelete(p.id)}>파트너 삭제</button>
      </div>
    </div>
  );
}

function IssuedKey({ data, onClose }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { try { navigator.clipboard.writeText(data.api_key).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); } catch (e) { setCopied(false); } };
  return (
    <div className="ka-md-overlay" onClick={onClose}>
      <div className="ka-md ka-md-key" onClick={e => e.stopPropagation()}>
        <div className="ka-md-h"><b>API 키 발급 완료</b><span>{data.name}</span></div>
        <div className="ka-md-body">
          <div className="ka-key-warn">⚠️ 이 키는 <b>지금 한 번만</b> 보여요. 안전한 곳에 복사해두세요. (다시 볼 수 없어요)</div>
          <div className="ka-key-box">
            <code className="ka-key-val">{data.api_key}</code>
            <button className="ka-key-copy" onClick={copy}>{copied ? "복사됨 ✓" : "복사"}</button>
          </div>
          <div className="ka-key-hint">이 키를 파트너(또는 본사 외부연동 폼)에 넣으면 권한 범위 안의 K-POP 데이터를 받아갈 수 있어요.</div>
        </div>
        <div className="ka-md-foot"><button className="ka-md-ok" onClick={onClose}>확인</button></div>
      </div>
    </div>
  );
}

function NewPartnerModal({ onClose, onIssued }) {
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [scopes, setScopes] = useState({});
  const [perms, setPerms] = useState({ read: true });
  const [rate, setRate] = useState("unlimited");
  const [customRate, setCustomRate] = useState("");
  const [expires, setExpires] = useState(0);
  const [ips, setIps] = useState("");
  const [webhook, setWebhook] = useState("");
  const [events, setEvents] = useState({});
  const [status, setStatus] = useState("active");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const scopeCount = Object.values(scopes).filter(Boolean).length;
  const toggleScope = (id) => setScopes(s => ({ ...s, [id]: !s[id] }));
  const toggleGroup = (items) => { const ids = items.map(i => i[0]); const allOn = ids.every(id => scopes[id]); setScopes(s => { const n = { ...s }; ids.forEach(id => n[id] = !allOn); return n; }); };
  const togglePerm = (id) => setPerms(p => ({ ...p, [id]: !p[id] }));
  const toggleEvent = (id) => setEvents(e => ({ ...e, [id]: !e[id] }));

  const submit = async () => {
    setErr(null);
    if (!name.trim()) { setErr("회사명을 입력하세요."); return; }
    const selScopes = ALL_SCOPES.filter(s => scopes[s]);
    if (selScopes.length === 0) { setErr("연동 기능을 1개 이상 선택하세요."); return; }
    const selPerms = PERMS.map(p => p[0]).filter(p => perms[p]);
    if (selPerms.length === 0) { setErr("권한을 1개 이상 선택하세요."); return; }
    setBusy(true);
    try {
      const res = await rpc("kpop_issue_key", {
        p_name: name.trim(),
        p_type: type,
        p_scopes: selScopes,
        p_perms: selPerms,
        p_rate: rate === "custom" ? (customRate.trim() || "custom") : rate,
        p_expires_days: expires === 0 ? null : expires,
        p_ips: ips.split(/[\n,]/).map(s => s.trim()).filter(Boolean),
        p_webhook: webhook.trim() || null,
        p_events: WH_EVENTS.map(e => e[0]).filter(e => events[e]),
        p_status: status,
      });
      onIssued(res);
    } catch (e) { setErr("발급 실패: " + (e.message || e)); setBusy(false); }
  };

  return (
    <div className="ka-md-overlay" onClick={onClose}>
      <div className="ka-md" onClick={e => e.stopPropagation()}>
        <div className="ka-md-h"><b>새 파트너 등록</b><span>기능·권한·사용량·보안·만료를 한 번에 설정하고 키를 발급합니다</span></div>
        <div className="ka-md-body">
          <label className="ka-md-label">회사명</label>
          <input className="ka-md-input" placeholder="예: 본사 관제실, OO제휴사" value={name} onChange={e => setName(e.target.value)} />

          <label className="ka-md-label">종류 <span className="ka-md-opt">(선택)</span></label>
          <div className="ka-md-types">
            {PARTNER_TYPES.map(t => <button key={t} className={"ka-md-type" + (type === t ? " on" : "")} onClick={() => setType(type === t ? null : t)}>{t}</button>)}
          </div>

          <div className="ka-md-label-row"><label className="ka-md-label">연동 기능 선택</label><span className="ka-md-count">{scopeCount}개 선택됨</span></div>
          <div className="ka-md-groups">
            {FUNC_GROUPS.map(g => {
              const allOn = g.items.every(i => scopes[i[0]]);
              return (
                <div className="ka-md-group" key={g.key}>
                  <div className="ka-md-group-h"><b>{g.key}</b><button className="ka-md-all" onClick={() => toggleGroup(g.items)}>{allOn ? "해제" : "전체"}</button></div>
                  {g.items.map(([id, label]) => (
                    <label className="ka-md-check" key={id}>
                      <input type="checkbox" checked={!!scopes[id]} onChange={() => toggleScope(id)} /><span>{label}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </div>

          <label className="ka-md-label">권한</label>
          <div className="ka-md-perms">
            {PERMS.map(([id, label]) => (
              <label className="ka-md-check inline" key={id}><input type="checkbox" checked={!!perms[id]} onChange={() => togglePerm(id)} /><span>{label}</span></label>
            ))}
          </div>

          <div className="ka-md-adv">고급 설정</div>

          <label className="ka-md-label sm"><span className="ka-md-num">1</span> API 요청 제한</label>
          <div className="ka-md-radios">
            {RATES.map(([id, label]) => <button key={id} className={"ka-md-radio" + (rate === id ? " on" : "")} onClick={() => setRate(id)}>{label}</button>)}
          </div>
          {rate === "custom" && <input className="ka-md-input" placeholder="예: 일 2,000회" value={customRate} onChange={e => setCustomRate(e.target.value)} />}

          <label className="ka-md-label sm"><span className="ka-md-num">2</span> API 키 만료일 <span className="ka-md-opt">발급 시점 기준 자동 계산</span></label>
          <div className="ka-md-radios">
            {EXPIRES.map(([id, label]) => <button key={id} className={"ka-md-radio" + (expires === id ? " on" : "")} onClick={() => setExpires(id)}>{label}</button>)}
          </div>

          <label className="ka-md-label sm"><span className="ka-md-num">3</span> IP 화이트리스트 <span className="ka-md-opt">비어 있으면 전체 허용</span></label>
          <textarea className="ka-md-textarea" placeholder="123.123.123.123, 111.111.111.111" value={ips} onChange={e => setIps(e.target.value)} />

          <label className="ka-md-label sm"><span className="ka-md-num">4</span> Webhook <span className="ka-md-opt">선택 이벤트 발생 시 POST 전송</span></label>
          <input className="ka-md-input" placeholder="https://partner-domain.com/webhook" value={webhook} onChange={e => setWebhook(e.target.value)} />
          <div className="ka-md-events">
            {WH_EVENTS.map(([id, label]) => <label className="ka-md-check inline" key={id}><input type="checkbox" checked={!!events[id]} onChange={() => toggleEvent(id)} /><span>{label}</span></label>)}
          </div>

          <label className="ka-md-label">API 상태</label>
          <div className="ka-md-statusrow">
            <button className={"ka-md-srbtn" + (status === "active" ? " on" : "")} onClick={() => setStatus("active")}>활성</button>
            <button className={"ka-md-srbtn" + (status === "paused" ? " on" : "")} onClick={() => setStatus("paused")}>일시정지</button>
          </div>

          {err && <div className="ka-md-err">{err}</div>}
        </div>
        <div className="ka-md-foot">
          <button className="ka-md-cancel" onClick={onClose} disabled={busy}>취소</button>
          <button className="ka-md-issue" onClick={submit} disabled={busy}>{busy ? "발급 중…" : "API 키 발급"}</button>
        </div>
      </div>
    </div>
  );
}
