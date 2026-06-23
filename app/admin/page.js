/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "./_shared";
import { loadStats } from "./_data";

function donutSvg(paidPct) {
  const r = 58, C = 2 * Math.PI * r, paidLen = (paidPct / 100) * C;
  return '<svg viewBox="0 0 160 160" width="160" height="160">' +
    '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="#26C6A6" stroke-width="22"/>' +
    '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="#3B5BFE" stroke-width="22" stroke-dasharray="' + paidLen + ' ' + (C - paidLen) + '" stroke-dashoffset="' + (C * 0.25) + '" transform="rotate(-90 80 80)"/>' +
    '<text x="80" y="74" text-anchor="middle" font-size="13" fill="#8B919C" font-weight="600">유료 비중</text>' +
    '<text x="80" y="96" text-anchor="middle" font-size="22" fill="#1B1F2A" font-weight="800">' + paidPct + '%</text></svg>';
}
function lineSvg(arr) {
  const W = 560, H = 220, padL = 36, padR = 16, padT = 18, padB = 30;
  const max = Math.max(1, Math.max.apply(null, arr.map(p => p.v))), iw = W - padL - padR, ih = H - padT - padB;
  const pts = arr.map((p, i) => [padL + (iw * i) / (arr.length - 1), padT + ih - (ih * p.v) / max]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + (padT + ih) + " L" + pts[0][0].toFixed(1) + " " + (padT + ih) + " Z";
  let g = ""; for (let i = 0; i < 4; i++) { const y = padT + (ih * i) / 3; g += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#EEF1F5"/>'; }
  let dots = "", labels = "";
  pts.forEach((p, i) => { dots += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="#fff" stroke="#3B5BFE" stroke-width="2"/>'; labels += '<text x="' + p[0].toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#9AA0AB">' + arr[i].label + '</text>'; });
  return '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" height="220" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B5BFE" stop-opacity="0.18"/><stop offset="100%" stop-color="#3B5BFE" stop-opacity="0"/></linearGradient></defs>' + g + '<path d="' + area + '" fill="url(#lg)"/><path d="' + line + '" fill="none" stroke="#3B5BFE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' + dots + labels + '</svg>';
}
const fmt = n => (n == null ? "—" : Number(n).toLocaleString());

export default function Dash() {
  const [st, setSt] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => { loadStats().then(setSt).catch(() => setErr(true)); }, []);
  const loading = !st && !err;
  const empty = st && !st.hasAny;
  const paidPct = st && st.totalVisitors ? Math.round((st.paidCount / st.totalVisitors) * 100) : 0;

  const cards = st ? [
    { k: "총 방문자", v: fmt(st.totalVisitors), s: "명" },
    { k: "이번 달 신규", v: fmt(st.newThisMonth), s: "명", live: true },
    { k: "유료 방문자", v: fmt(st.paidCount), s: "명" },
    { k: "무료 방문자", v: fmt(st.freeCount), s: "명" },
    { k: "평균 체류시간", v: "—", s: "", note: "수집 전" },
    { k: "재방문율", v: st.returningRate, s: "%" },
    { k: "유료 전환율", v: paidPct, s: "%" },
    { k: "누적 생성", v: fmt(st.totalGen), s: "장" },
  ] : Array.from({ length: 8 }, (_, i) => ({ k: ["총 방문자", "이번 달 신규", "유료 방문자", "무료 방문자", "평균 체류시간", "재방문율", "유료 전환율", "누적 생성"][i], v: "—", s: "" }));

  return (
    <div className="ka-root">
      <Sidebar active="dash" />
      <main className="ka-main">
        <h1 className="ka-title">K-POP 방문자 관제</h1>
        <p className="ka-sub">방문·선택·생성을 한눈에 (비용·AI는 본사 관제실에서 관리){loading ? " · 불러오는 중…" : ""}{err ? " · 불러오기 실패" : ""}</p>

        <div className="ka-cards">
          {cards.map((c, i) => (
            <div className="ka-card" key={i}>
              <div className="ka-card-k">{c.k}</div>
              <div className="ka-card-vrow">
                <div className="ka-card-v">{c.v}<span className="ka-card-s">{c.s}</span></div>
                {c.live && st && st.hasAny && <span className="ka-delta-wrap"><span className="ka-delta-cap">실시간</span></span>}
              </div>
              {(c.note || (empty && !c.note)) && <div className="ka-card-empty">{c.note || "데이터 없음"}</div>}
            </div>
          ))}
        </div>

        <div className="ka-row2">
          <div className="ka-panel">
            <div className="ka-panel-h"><b>방문자 등급 비중</b><span>유료 {st ? fmt(st.paidCount) : "—"} · 무료 {st ? fmt(st.freeCount) : "—"}</span></div>
            <div className="ka-donut">
              <div dangerouslySetInnerHTML={{ __html: donutSvg(paidPct) }} />
              <div className="ka-legend">
                <div className="ka-leg"><span className="ka-dot" style={{ background: "#3B5BFE" }} />유료 방문자<b>{st ? fmt(st.paidCount) : "—"}명</b><i>{paidPct}%</i></div>
                <div className="ka-leg"><span className="ka-dot" style={{ background: "#26C6A6" }} />무료 방문자<b>{st ? fmt(st.freeCount) : "—"}명</b><i>{100 - paidPct}%</i></div>
              </div>
            </div>
          </div>
          <div className="ka-panel">
            <div className="ka-panel-h"><b>최근 7일 방문자 추이</b><span>일별 방문 수</span></div>
            <div className="ka-chart-wrap">
              <div dangerouslySetInnerHTML={{ __html: lineSvg(st ? st.last7 : [{label:"",v:0},{label:"",v:0}]) }} />
              {empty && <div className="ka-overlay"><div className="ka-empty-pill">데이터 없음 · 수집 전</div></div>}
            </div>
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>스타일 선택 비중</b><span>방문자가 고른 스타일 기준 · 총 {st ? fmt(st.selTotal) : "—"}건</span></div>
          <div className="ka-bars" style={{ position: "relative", minHeight: 60 }}>
            {(st ? st.styleDist : []).map((c, i) => (
              <div className="ka-bar-row" key={i}>
                <span className="ka-bar-name">{c.name}</span>
                <span className="ka-bar-track"><span className="ka-bar-fill" style={{ width: c.pct + "%", background: c.color }} /></span>
                <span className="ka-bar-pct">{c.pct}%</span>
              </div>
            ))}
            {(empty || (st && st.selTotal === 0)) && <div className="ka-stay-empty">데이터 없음 · 선택 기록 없음</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
