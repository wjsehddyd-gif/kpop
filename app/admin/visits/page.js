/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "../_shared";
import { loadStats } from "../_data";

const HOUR_BUCKETS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];
const STAY_BUCKETS = ["~1분", "1–3분", "3–5분", "5–10분", "10분+"];
const PAGES = ["진단", "추천 결과", "따라하기", "결과 비교", "이미지 생성"];

export default function Visits() {
  const [st, setSt] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => { loadStats().then(setSt).catch(() => setErr(true)); }, []);
  const loading = !st && !err;
  const noData = st && !st.hasAny;

  const dowMax = st ? Math.max(1, Math.max.apply(null, st.dow.map(d => d.v))) : 1;

  return (
    <div className="ka-root">
      <Sidebar active="visits" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">방문 · 체류 분석</h1>
        <p className="ka-sub">방문 추이·재방문 분석 (체류시간은 측정 연결 후 표시){loading ? " · 불러오는 중…" : ""}{err ? " · 불러오기 실패" : ""}</p>

        <div className="ka-cards">
          <div className="ka-card"><div className="ka-card-k">오늘 방문</div><div className="ka-card-v">{st ? st.todayVisits.toLocaleString() : "—"}</div>{noData && <div className="ka-card-empty">데이터 없음</div>}</div>
          <div className="ka-card"><div className="ka-card-k">평균 체류시간</div><div className="ka-card-v">—</div><div className="ka-card-empty">수집 전</div></div>
          <div className="ka-card"><div className="ka-card-k">재방문율</div><div className="ka-card-v">{st ? st.returningRate + "%" : "—"}</div>{noData && <div className="ka-card-empty">데이터 없음</div>}</div>
          <div className="ka-card"><div className="ka-card-k">평균 페이지 수</div><div className="ka-card-v">—</div><div className="ka-card-empty">수집 전</div></div>
        </div>

        <div className="ka-row2">
          <div className="ka-panel">
            <div className="ka-panel-h"><b>요일별 방문</b><span>주간 합계</span></div>
            <div className="ka-chart">
              <div className="ka-skel-bars">
                {(st ? st.dow : HOUR_BUCKETS.slice(0).map(() => ({ v: 0 }))).map((d, i) => (
                  <div className="ka-skel-col" key={i}>
                    <div className="ka-skel-bar" style={st ? { height: Math.max(4, (d.v / dowMax) * 100) + "%", background: "#C9D2FF" } : {}} />
                    <span className="ka-skel-x">{st ? d.label : ""}</span>
                  </div>
                ))}
              </div>
              {(loading || noData) && <div className="ka-overlay"><div className="ka-empty-pill">{loading ? "불러오는 중…" : "데이터 없음 · 수집 전"}</div></div>}
            </div>
          </div>

          <div className="ka-panel">
            <div className="ka-panel-h"><b>체류시간 분포</b><span>방문당 머문 시간</span></div>
            <div className="ka-chart">
              <div className="ka-skel-bars">
                {STAY_BUCKETS.map((d, i) => (<div className="ka-skel-col" key={i}><div className="ka-skel-bar" /><span className="ka-skel-x">{d}</span></div>))}
              </div>
              <div className="ka-overlay"><div className="ka-empty-pill">체류 측정 연결 후 표시</div></div>
            </div>
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>방문 히트맵</b><span>요일 × 시간대</span></div>
          <div className="ka-chart ka-chart-heat">
            <div className="ka-heat">
              <div className="ka-heat-corner" />
              {HOUR_BUCKETS.map((h, i) => <div className="ka-heat-htop" key={"h" + i}>{h}</div>)}
              {["월", "화", "수", "목", "금", "토", "일"].map((d, ri) => (
                <React.Fragment key={ri}>
                  <div className="ka-heat-yl">{d}</div>
                  {HOUR_BUCKETS.map((h, ci) => {
                    const val = st ? st.heat[ri][ci] : 0;
                    const inten = st && st.heatMax ? val / st.heatMax : 0;
                    return <div className="ka-heat-cell" key={ci} style={st && inten > 0 ? { background: "rgba(59,91,254," + (0.12 + inten * 0.78).toFixed(2) + ")" } : {}} title={st ? d + " " + h + "시 · " + val : ""} />;
                  })}
                </React.Fragment>
              ))}
            </div>
            {(loading || noData) && <div className="ka-overlay"><div className="ka-empty-pill">{loading ? "불러오는 중…" : "데이터 없음 · 수집 전"}</div></div>}
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>페이지별 평균 체류시간</b><span>화면별 머문 시간</span></div>
          <div className="ka-stay-list">
            {PAGES.map((p, i) => (
              <div className="ka-stay-row" key={i}><span className="ka-stay-name">{p}</span><span className="ka-stay-track"><span className="ka-stay-fill" /></span><span className="ka-stay-val">—</span></div>
            ))}
            <div className="ka-stay-empty">페이지별 체류 측정 연결 후 표시</div>
          </div>
        </div>
      </main>
    </div>
  );
}
