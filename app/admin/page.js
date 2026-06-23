/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "./_shared";

const SUMMARY = [
  { k: "총 회원수", v: "1,248", s: "명", delta: { dir: "up", val: "+12%" } },
  { k: "이번 달 가입", v: "214", s: "명", delta: { dir: "up", val: "+8%" }, live: true },
  { k: "유료 회원", v: "156", s: "명", extra: "평균 생성 14회" },
  { k: "무료 회원", v: "1,092", s: "명" },
  { k: "평균 체류시간", v: "4:32", s: "" },
  { k: "재방문율", v: "38", s: "%" },
  { k: "유료 전환율", v: "12.5", s: "%" },
  { k: "누적 생성", v: "3,612", s: "장" },
];

const VISITS_7D = [
  { d: "월", v: 62 }, { d: "화", v: 71 }, { d: "수", v: 58 },
  { d: "목", v: 80 }, { d: "금", v: 96 }, { d: "토", v: 124 }, { d: "일", v: 87 },
];
const CELEBS = [
  { name: "카리나", pct: 32, color: "#3B5BFE" }, { name: "윈터", pct: 24, color: "#5C7CFA" },
  { name: "제니", pct: 18, color: "#26C6A6" }, { name: "장원영", pct: 14, color: "#9C6BFF" },
  { name: "안유진", pct: 8, color: "#F59E0B" }, { name: "아이유", pct: 4, color: "#94A3B8" },
];

function donutSvg() {
  const r = 58, C = 2 * Math.PI * r, paidLen = (12.5 / 100) * C;
  return '<svg viewBox="0 0 160 160" width="160" height="160">' +
    '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="#26C6A6" stroke-width="22"/>' +
    '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="#3B5BFE" stroke-width="22" stroke-dasharray="' + paidLen + ' ' + (C - paidLen) + '" stroke-dashoffset="' + (C * 0.25) + '" transform="rotate(-90 80 80)"/>' +
    '<text x="80" y="74" text-anchor="middle" font-size="13" fill="#8B919C" font-weight="600">유료 비중</text>' +
    '<text x="80" y="96" text-anchor="middle" font-size="22" fill="#1B1F2A" font-weight="800">12.5%</text></svg>';
}
function lineSvg() {
  const W = 560, H = 220, padL = 36, padR = 16, padT = 18, padB = 30;
  const max = Math.max.apply(null, VISITS_7D.map(p => p.v)), iw = W - padL - padR, ih = H - padT - padB;
  const pts = VISITS_7D.map((p, i) => [padL + (iw * i) / (VISITS_7D.length - 1), padT + ih - (ih * p.v) / max]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + (padT + ih) + " L" + pts[0][0].toFixed(1) + " " + (padT + ih) + " Z";
  let g = ""; for (let i = 0; i < 4; i++) { const y = padT + (ih * i) / 3; g += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#EEF1F5"/>'; }
  let dots = "", labels = "";
  pts.forEach((p, i) => { dots += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="#fff" stroke="#3B5BFE" stroke-width="2"/>'; labels += '<text x="' + p[0].toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#9AA0AB">' + VISITS_7D[i].d + '</text>'; });
  return '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" height="220" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B5BFE" stop-opacity="0.18"/><stop offset="100%" stop-color="#3B5BFE" stop-opacity="0"/></linearGradient></defs>' + g + '<path d="' + area + '" fill="url(#lg)"/><path d="' + line + '" fill="none" stroke="#3B5BFE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' + dots + labels + '</svg>';
}

export default function Dash() {
  return (
    <div className="ka-root">
      <Sidebar active="dash" />
      <main className="ka-main">
        <h1 className="ka-title">K-POP 회원 관제</h1>
        <p className="ka-sub">회원 가입·방문·체류·등급을 한눈에 (비용·AI는 본사 관제실에서 관리)</p>

        <div className="ka-cards">
          {SUMMARY.map((c, i) => (
            <div className="ka-card" key={i}>
              <div className="ka-card-k">{c.k}</div>
              <div className="ka-card-v">{c.v}<span className="ka-card-s">{c.s}</span></div>
              {(c.delta || c.extra || c.live) && (
                <div className="ka-sub2">
                  {c.delta && <span className={"ka-delta " + c.delta.dir}>{c.delta.dir === "up" ? "▲" : "▼"} {c.delta.val}</span>}
                  {c.delta && <span className="ka-extra">지난달 대비</span>}
                  {c.extra && <span className="ka-extra"><b>{c.extra}</b></span>}
                  {c.live && <span className="ka-extra">· 실시간</span>}
                </div>
              )}
            </div>
          ))}
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
            {CELEBS.map((c, i) => (
              <div className="ka-bar-row" key={i}>
                <span className="ka-bar-name">{c.name}</span>
                <span className="ka-bar-track"><span className="ka-bar-fill" style={{ width: c.pct + "%", background: c.color }} /></span>
                <span className="ka-bar-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/admin/members" className="ka-cta">
          <div className="ka-cta-l"><b>회원 목록 전체 보기</b><p>아이디·가입일·방문·체류·등급·생성수 전체 회원 1,248명</p></div>
          <span className="ka-cta-go">회원 목록 →</span>
        </Link>
      </main>
    </div>
  );
}
