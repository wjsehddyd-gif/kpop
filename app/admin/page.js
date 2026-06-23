/* eslint-disable */
// K-POP 회원 관제 대시보드 (본사 관제실 톤). 현재는 목업 데이터 — 추후 본사 DB 연결 시 이 데이터만 교체.
export const metadata = { title: "K-POP 회원 관제" };

// ===== 목업 데이터 (나중에 본사 API로 교체) =====
const SUMMARY = [
  { k: "총 회원", v: "1,248", s: "명", tone: "" },
  { k: "오늘 방문", v: "87", s: "명", tone: "" },
  { k: "오늘 신규가입", v: "14", s: "명", tone: "up" },
  { k: "유료 회원", v: "156", s: "명", tone: "up" },
  { k: "무료 회원", v: "1,092", s: "명", tone: "" },
  { k: "평균 체류시간", v: "4:32", s: "분", tone: "" },
  { k: "누적 방문", v: "12,940", s: "회", tone: "" },
  { k: "누적 생성", v: "3,612", s: "장", tone: "" },
];

const VISITS_7D = [
  { d: "월", v: 62 }, { d: "화", v: 71 }, { d: "수", v: 58 },
  { d: "목", v: 80 }, { d: "금", v: 96 }, { d: "토", v: 124 }, { d: "일", v: 87 },
];

const CELEBS = [
  { name: "카리나", pct: 32, color: "#3B5BFE" },
  { name: "윈터", pct: 24, color: "#5C7CFA" },
  { name: "제니", pct: 18, color: "#26C6A6" },
  { name: "장원영", pct: 14, color: "#9C6BFF" },
  { name: "안유진", pct: 8, color: "#F59E0B" },
  { name: "아이유", pct: 4, color: "#94A3B8" },
];

const MEMBERS = [
  { id: "minji_02", join: "2026-06-21", visits: 12, stay: "8:14", last: "방금 전", paid: true, celeb: "카리나", gen: 9 },
  { id: "yuna_kim", join: "2026-06-20", visits: 7, stay: "5:02", last: "12분 전", paid: false, celeb: "윈터", gen: 4 },
  { id: "soohyun99", join: "2026-06-19", visits: 21, stay: "11:30", last: "1시간 전", paid: true, celeb: "제니", gen: 15 },
  { id: "haru_x", join: "2026-06-18", visits: 3, stay: "2:48", last: "3시간 전", paid: false, celeb: "장원영", gen: 1 },
  { id: "jiwoo__", join: "2026-06-18", visits: 9, stay: "6:21", last: "어제", paid: false, celeb: "카리나", gen: 6 },
  { id: "nayeon_p", join: "2026-06-17", visits: 16, stay: "9:55", last: "어제", paid: true, celeb: "안유진", gen: 11 },
  { id: "seo_dable", join: "2026-06-16", visits: 5, stay: "3:40", last: "2일 전", paid: false, celeb: "윈터", gen: 3 },
  { id: "hyun_22", join: "2026-06-15", visits: 28, stay: "14:02", last: "2일 전", paid: true, celeb: "제니", gen: 19 },
  { id: "mina_lee", join: "2026-06-14", visits: 4, stay: "2:10", last: "3일 전", paid: false, celeb: "아이유", gen: 2 },
  { id: "rara_kk", join: "2026-06-13", visits: 11, stay: "7:33", last: "4일 전", paid: false, celeb: "카리나", gen: 7 },
  { id: "doyeon_x", join: "2026-06-12", visits: 6, stay: "4:18", last: "5일 전", paid: false, celeb: "장원영", gen: 4 },
  { id: "sumin_03", join: "2026-06-11", visits: 33, stay: "18:47", last: "6일 전", paid: true, celeb: "윈터", gen: 24 },
];

// ===== SVG 차트 =====
function donutSvg() {
  const paid = 12.5, r = 58, cx = 80, cy = 80, C = 2 * Math.PI * r;
  const paidLen = (paid / 100) * C;
  return (
    '<svg viewBox="0 0 160 160" width="160" height="160">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#26C6A6" stroke-width="22"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#3B5BFE" stroke-width="22" ' +
    'stroke-dasharray="' + paidLen + ' ' + (C - paidLen) + '" stroke-dashoffset="' + (C * 0.25) + '" stroke-linecap="butt" transform="rotate(-90 80 80)"/>' +
    '<text x="80" y="74" text-anchor="middle" font-size="13" fill="#8B919C" font-weight="600">유료 비중</text>' +
    '<text x="80" y="96" text-anchor="middle" font-size="22" fill="#1B1F2A" font-weight="800">12.5%</text>' +
    '</svg>'
  );
}

function lineSvg() {
  const W = 560, H = 220, padL = 36, padR = 16, padT = 18, padB = 30;
  const max = Math.max.apply(null, VISITS_7D.map(function (p) { return p.v; }));
  const min = 0;
  const iw = W - padL - padR, ih = H - padT - padB;
  const pts = VISITS_7D.map(function (p, i) {
    const x = padL + (iw * i) / (VISITS_7D.length - 1);
    const y = padT + ih - (ih * (p.v - min)) / (max - min);
    return [x, y];
  });
  const line = pts.map(function (p, i) { return (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
  const area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + (padT + ih) + " L" + pts[0][0].toFixed(1) + " " + (padT + ih) + " Z";
  let g = "";
  for (let i = 0; i < 4; i++) { const y = padT + (ih * i) / 3; g += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#EEF1F5" stroke-width="1"/>'; }
  let dots = "", labels = "";
  pts.forEach(function (p, i) {
    dots += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="#fff" stroke="#3B5BFE" stroke-width="2"/>';
    labels += '<text x="' + p[0].toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#9AA0AB">' + VISITS_7D[i].d + '</text>';
  });
  return (
    '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" height="220" preserveAspectRatio="xMidYMid meet">' +
    '<defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B5BFE" stop-opacity="0.18"/><stop offset="100%" stop-color="#3B5BFE" stop-opacity="0"/></linearGradient></defs>' +
    g + '<path d="' + area + '" fill="url(#lg)"/>' + '<path d="' + line + '" fill="none" stroke="#3B5BFE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    dots + labels + '</svg>'
  );
}

export default function KpopAdmin() {
  return (
    <div className="ka-root">
      <style>{CSS}</style>
      <aside className="ka-side">
        <div className="ka-brand"><span className="ka-logo">K</span><span>K-POP 스타일</span></div>
        <div className="ka-sec">회원 관리</div>
        <a className="ka-nav active"><span className="ka-ic">📊</span>회원 대시보드</a>
        <a className="ka-nav"><span className="ka-ic">👥</span>회원 목록</a>
        <a className="ka-nav"><span className="ka-ic">🕒</span>방문 · 체류 분석</a>
        <div className="ka-sec">콘텐츠</div>
        <a className="ka-nav"><span className="ka-ic">💄</span>스타일 통계</a>
        <a className="ka-nav"><span className="ka-ic">🖼️</span>생성 이미지</a>
        <div className="ka-foot">K-POP 회원 관제<br />· 띵동/Life+ 자회사</div>
      </aside>

      <main className="ka-main">
        <h1 className="ka-title">K-POP 회원 관제</h1>
        <p className="ka-sub">회원 가입·방문·체류·등급을 한눈에 (비용·AI는 본사 관제실에서 관리)</p>

        <div className="ka-cards">
          {SUMMARY.map(function (c, i) {
            return (
              <div className="ka-card" key={i}>
                <div className="ka-card-k">{c.k}</div>
                <div className={"ka-card-v" + (c.tone === "up" ? " up" : "")}>{c.v}<span className="ka-card-s">{c.s}</span></div>
              </div>
            );
          })}
        </div>

        <div className="ka-row2">
          <div className="ka-panel">
            <div className="ka-panel-h"><b>회원 등급 비중</b><span>유료 156 · 무료 1,092</span></div>
            <div className="ka-donut">
              <div dangerouslySetInnerHTML={{ __html: donutSvg() }} />
              <div className="ka-legend">
                <div className="ka-leg"><span className="ka-dot" style={{ background: "#3B5BFE" }} />유료 회원<b>156명</b><i>12.5%</i></div>
                <div className="ka-leg"><span className="ka-dot" style={{ background: "#26C6A6" }} />무료 회원<b>1,092명</b><i>87.5%</i></div>
              </div>
            </div>
          </div>
          <div className="ka-panel">
            <div className="ka-panel-h"><b>최근 7일 방문자 추이</b><span>일별 방문 수</span></div>
            <div dangerouslySetInnerHTML={{ __html: lineSvg() }} />
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>연예인 스타일 선택 비중</b><span>회원이 고른 스타일 기준</span></div>
          <div className="ka-bars">
            {CELEBS.map(function (c, i) {
              return (
                <div className="ka-bar-row" key={i}>
                  <span className="ka-bar-name">{c.name}</span>
                  <span className="ka-bar-track"><span className="ka-bar-fill" style={{ width: c.pct + "%", background: c.color }} /></span>
                  <span className="ka-bar-pct">{c.pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>회원 목록</b><span>총 1,248명 · 최근 가입순</span></div>
          <div className="ka-table-wrap">
            <table className="ka-table">
              <thead>
                <tr>
                  <th>아이디</th><th>가입일</th><th>방문</th><th>누적 체류</th><th>마지막 방문</th><th>등급</th><th>선호 스타일</th><th>생성</th>
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map(function (m, i) {
                  return (
                    <tr key={i}>
                      <td className="ka-id">{m.id}</td>
                      <td>{m.join}</td>
                      <td>{m.visits}회</td>
                      <td>{m.stay}</td>
                      <td className="ka-muted">{m.last}</td>
                      <td>{m.paid ? <span className="ka-tag paid">유료</span> : <span className="ka-tag free">무료</span>}</td>
                      <td>{m.celeb}</td>
                      <td>{m.gen}장</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="ka-note">※ 현재 화면은 디자인 목업입니다. 본사 DB 연결 후 실제 회원 데이터가 표시됩니다.</div>
        </div>
      </main>
    </div>
  );
}

const CSS = `
.ka-root{position:fixed;inset:0;display:flex;background:#F4F6F9;color:#1B1F2A;font-family:"Pretendard Variable",Pretendard,system-ui,-apple-system,sans-serif;overflow:auto;}
.ka-root *{box-sizing:border-box;}
.ka-side{width:236px;flex:none;background:#fff;border-right:1px solid #E9ECF1;padding:20px 14px;position:sticky;top:0;height:100vh;}
.ka-brand{display:flex;align-items:center;gap:9px;font-size:15px;font-weight:800;margin:4px 6px 22px;}
.ka-logo{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#ff4d8d,#b98cff);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;}
.ka-sec{font-size:11px;font-weight:800;color:#A2A8B2;letter-spacing:.04em;margin:18px 8px 8px;}
.ka-nav{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:13.5px;font-weight:600;color:#5B616C;cursor:pointer;margin-bottom:2px;text-decoration:none;}
.ka-nav:hover{background:#F1F3F7;}
.ka-nav.active{background:#1E2433;color:#fff;font-weight:700;}
.ka-ic{font-size:14px;}
.ka-foot{position:absolute;bottom:18px;left:20px;font-size:11px;color:#AEB4BE;line-height:1.5;}
.ka-main{flex:1;min-width:0;padding:28px 30px 60px;}
.ka-title{font-size:24px;font-weight:800;margin:0 0 4px;}
.ka-sub{font-size:13px;color:#8B919C;margin:0 0 22px;}
.ka-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;}
.ka-card{background:#fff;border:1px solid #E9ECF1;border-radius:14px;padding:15px 16px;box-shadow:0 1px 3px rgba(20,30,60,.03);}
.ka-card-k{font-size:12px;color:#8B919C;font-weight:600;margin-bottom:8px;}
.ka-card-v{font-size:23px;font-weight:800;color:#1B1F2A;display:flex;align-items:baseline;gap:3px;}
.ka-card-v.up{color:#16A34A;}
.ka-card-s{font-size:12px;font-weight:600;color:#A2A8B2;}
.ka-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.ka-panel{background:#fff;border:1px solid #E9ECF1;border-radius:16px;padding:18px 20px;box-shadow:0 1px 3px rgba(20,30,60,.03);margin-bottom:14px;}
.ka-panel-h{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px;}
.ka-panel-h b{font-size:15px;font-weight:800;}
.ka-panel-h span{font-size:12px;color:#9AA0AB;}
.ka-donut{display:flex;align-items:center;gap:24px;}
.ka-legend{display:flex;flex-direction:column;gap:12px;}
.ka-leg{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#5B616C;}
.ka-leg b{margin-left:6px;color:#1B1F2A;font-weight:700;}
.ka-leg i{margin-left:8px;font-style:normal;color:#9AA0AB;font-weight:700;}
.ka-dot{width:11px;height:11px;border-radius:99px;flex:none;}
.ka-bars{display:flex;flex-direction:column;gap:12px;}
.ka-bar-row{display:flex;align-items:center;gap:12px;}
.ka-bar-name{width:64px;flex:none;font-size:13px;font-weight:700;color:#3A4049;}
.ka-bar-track{flex:1;height:12px;background:#EEF1F5;border-radius:99px;overflow:hidden;}
.ka-bar-fill{display:block;height:100%;border-radius:99px;}
.ka-bar-pct{width:42px;flex:none;text-align:right;font-size:12.5px;font-weight:700;color:#5B616C;}
.ka-table-wrap{overflow-x:auto;}
.ka-table{width:100%;border-collapse:collapse;font-size:13px;}
.ka-table th{text-align:left;font-size:11.5px;font-weight:700;color:#9AA0AB;padding:10px 12px;border-bottom:1px solid #EEF1F5;white-space:nowrap;}
.ka-table td{padding:12px 12px;border-bottom:1px solid #F2F4F7;color:#3A4049;white-space:nowrap;}
.ka-table tr:hover td{background:#FAFBFD;}
.ka-id{font-weight:700;color:#1B1F2A;}
.ka-muted{color:#9AA0AB;}
.ka-tag{display:inline-block;font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;}
.ka-tag.paid{background:#E8EDFF;color:#3B5BFE;}
.ka-tag.free{background:#F0F2F5;color:#8B919C;}
.ka-note{font-size:12px;color:#AEB4BE;margin-top:14px;}
@media (max-width:1080px){.ka-cards{grid-template-columns:repeat(2,1fr);}.ka-row2{grid-template-columns:1fr;}}
@media (max-width:720px){.ka-side{display:none;}.ka-cards{grid-template-columns:repeat(2,1fr);}}
`;
