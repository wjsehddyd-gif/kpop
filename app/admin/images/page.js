/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "../_shared";
import { loadStats, STYLE } from "../_data";

const FILTERS = ["전체", "시크 시티", "퓨어 시크", "걸 크러시", "러블리 글로우", "프레시 클리어", "소프트 데일리"];
const SKELETON = Array.from({ length: 12 });
const fmt = n => (n == null ? "—" : Number(n).toLocaleString());

export default function Images() {
  const [st, setSt] = useState(null);
  const [err, setErr] = useState(false);
  const [filter, setFilter] = useState("전체");
  useEffect(() => { loadStats().then(setSt).catch(() => setErr(true)); }, []);
  const loading = !st && !err;

  const cards = [
    { k: "누적 생성", v: st ? fmt(st.totalGen) : "—" },
    { k: "오늘 생성", v: st ? fmt(st.todayGen) : "—" },
    { k: "평균 생성 시간", v: st && st.avgGenMs ? (st.avgGenMs / 1000).toFixed(1) + "초" : "—" },
    { k: "생성 실패율", v: st ? st.failRate + "%" : "—" },
  ];
  const noGen = st && st.totalGen === 0;

  return (
    <div className="ka-root">
      <Sidebar active="images" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">생성 이미지</h1>
        <p className="ka-sub">AI 스타일 생성 기록 모니터링{loading ? " · 불러오는 중…" : ""}{err ? " · 불러오기 실패" : ""}</p>

        <div className="ka-cards">
          {cards.map((c, i) => (
            <div className="ka-card" key={i}>
              <div className="ka-card-k">{c.k}</div>
              <div className="ka-card-v">{c.v}</div>
              {noGen && <div className="ka-card-empty">데이터 없음</div>}
            </div>
          ))}
        </div>

        <div className="ka-filters">
          {FILTERS.map((f, i) => (
            <span className={"ka-filter" + (filter === f ? " on" : "")} key={i} onClick={() => setFilter(f)} style={{ cursor: "pointer" }}>{f}</span>
          ))}
        </div>

        <div className="ka-imgwrap">
          <div className="ka-img-grid">
            {SKELETON.map((_, i) => (
              <div className="ka-img-card" key={i}>
                <div className="ka-img-thumb" />
                <div className="ka-img-meta"><span className="ka-img-id">—</span><span className="ka-img-sub">— · —</span></div>
              </div>
            ))}
          </div>
          <div className="ka-overlay"><div className="ka-empty-pill">썸네일은 이미지 저장 연결 후 표시 · 현재 생성 건수만 집계</div></div>
        </div>
      </main>
    </div>
  );
}
