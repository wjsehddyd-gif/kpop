/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";

const HAS_DATA = false;
const CARDS = [
  { k: "누적 생성", v: "—" }, { k: "오늘 생성", v: "—" },
  { k: "평균 생성 시간", v: "—" }, { k: "생성 실패율", v: "—" },
];
const FILTERS = ["전체", "카리나", "윈터", "제니", "장원영", "안유진", "아이유"];
const SKELETON = Array.from({ length: 12 });

export default function Images() {
  return (
    <div className="ka-root">
      <Sidebar active="images" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">생성 이미지</h1>
        <p className="ka-sub">회원이 만든 AI 스타일 결과 모니터링 (이미지 생성 기록 연결 후 자동 표시)</p>

        <div className="ka-cards">
          {CARDS.map((c, i) => (
            <div className="ka-card" key={i}>
              <div className="ka-card-k">{c.k}</div>
              <div className="ka-card-v">{c.v}</div>
              {!HAS_DATA && <div className="ka-card-empty">데이터 없음</div>}
            </div>
          ))}
        </div>

        <div className="ka-filters">
          {FILTERS.map((f, i) => <span className={"ka-filter" + (i === 0 ? " on" : "")} key={i}>{f}</span>)}
        </div>

        <div className="ka-imgwrap">
          <div className="ka-img-grid">
            {SKELETON.map((_, i) => (
              <div className="ka-img-card" key={i}>
                <div className="ka-img-thumb" />
                <div className="ka-img-meta">
                  <span className="ka-img-id">—</span>
                  <span className="ka-img-sub">— · —</span>
                </div>
              </div>
            ))}
          </div>
          {!HAS_DATA && <div className="ka-overlay"><div className="ka-empty-pill">데이터 없음 · 생성 기록 없음</div></div>}
        </div>
      </main>
    </div>
  );
}
