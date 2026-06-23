/* eslint-disable */
import React from "react";
import Link from "next/link";
import { Sidebar } from "../_shared";

// 데이터 연결 시 HAS_DATA=true 로 바꾸고 값/배열만 채우면 레이아웃 그대로 작동.
const HAS_DATA = false;
const CARDS = [
  { k: "오늘 방문", v: "—" }, { k: "평균 체류시간", v: "—" },
  { k: "재방문율", v: "—" }, { k: "평균 페이지 수", v: "—" },
];
const DOW = ["월", "화", "수", "목", "금", "토", "일"];
const HOUR_BUCKETS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];
const STAY_BUCKETS = ["~1분", "1–3분", "3–5분", "5–10분", "10분+"];
const PAGES = ["진단", "추천 결과", "따라하기", "결과 비교", "이미지 생성"];

function EmptyPill() { return <div className="ka-empty-pill">데이터 없음 · 수집 전</div>; }

export default function Visits() {
  return (
    <div className="ka-root">
      <Sidebar active="visits" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">방문 · 체류 분석</h1>
        <p className="ka-sub">방문 추이·체류시간·재방문을 분석 (회원 행동 데이터 연결 후 자동 표시)</p>

        <div className="ka-cards">
          {CARDS.map((c, i) => (
            <div className="ka-card" key={i}>
              <div className="ka-card-k">{c.k}</div>
              <div className="ka-card-v">{c.v}</div>
              {!HAS_DATA && <div className="ka-card-empty">데이터 없음</div>}
            </div>
          ))}
        </div>

        <div className="ka-row2">
          <div className="ka-panel">
            <div className="ka-panel-h"><b>요일별 방문</b><span>주간 합계</span></div>
            <div className="ka-chart">
              <div className="ka-skel-bars">
                {DOW.map((d, i) => (
                  <div className="ka-skel-col" key={i}><div className="ka-skel-bar" /><span className="ka-skel-x">{d}</span></div>
                ))}
              </div>
              {!HAS_DATA && <div className="ka-overlay"><EmptyPill /></div>}
            </div>
          </div>

          <div className="ka-panel">
            <div className="ka-panel-h"><b>체류시간 분포</b><span>방문당 머문 시간</span></div>
            <div className="ka-chart">
              <div className="ka-skel-bars">
                {STAY_BUCKETS.map((d, i) => (
                  <div className="ka-skel-col" key={i}><div className="ka-skel-bar" /><span className="ka-skel-x">{d}</span></div>
                ))}
              </div>
              {!HAS_DATA && <div className="ka-overlay"><EmptyPill /></div>}
            </div>
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>방문 히트맵</b><span>요일 × 시간대</span></div>
          <div className="ka-chart ka-chart-heat">
            <div className="ka-heat">
              <div className="ka-heat-corner" />
              {HOUR_BUCKETS.map((h, i) => <div className="ka-heat-htop" key={"h" + i}>{h}</div>)}
              {DOW.map((d, ri) => (
                <React.Fragment key={ri}>
                  <div className="ka-heat-yl">{d}</div>
                  {HOUR_BUCKETS.map((h, ci) => <div className="ka-heat-cell" key={ci} />)}
                </React.Fragment>
              ))}
            </div>
            {!HAS_DATA && <div className="ka-overlay"><EmptyPill /></div>}
          </div>
        </div>

        <div className="ka-panel">
          <div className="ka-panel-h"><b>페이지별 평균 체류시간</b><span>화면별 머문 시간</span></div>
          <div className="ka-stay-list">
            {PAGES.map((p, i) => (
              <div className="ka-stay-row" key={i}>
                <span className="ka-stay-name">{p}</span>
                <span className="ka-stay-track"><span className="ka-stay-fill" /></span>
                <span className="ka-stay-val">{HAS_DATA ? "" : "—"}</span>
              </div>
            ))}
            {!HAS_DATA && <div className="ka-stay-empty">데이터 없음 · 수집 전</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
