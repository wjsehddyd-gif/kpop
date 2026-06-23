/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";

const DEX = [
  { name: "시크 시티", mood: "시크 · 도시적", g: ["#3B5BFE", "#9C6BFF"], base: "매트 글로우 베이스", eye: "브라운 스모키 + 언더 펄", lip: "MLBB 로즈 브라운", hair: "롱 웨이브", tags: ["쿨톤", "고양이상", "스모키"], set: "CHIC_VLINE_01" },
  { name: "퓨어 시크", mood: "청순 · 시크", g: ["#5C7CFA", "#3B5BFE"], base: "촉촉 글로우 베이스", eye: "코랄 브라운 + 또렷 라인", lip: "코랄 누드", hair: "레이어드 단발", tags: ["뉴트럴", "또렷눈매", "청순"], set: "PURE_OVAL_01" },
  { name: "걸 크러시", mood: "걸크러시 · 무드", g: ["#26C6A6", "#3B5BFE"], base: "세미매트 베이스", eye: "버건디 그라데이션", lip: "버건디 레드", hair: "풀뱅 웨이브", tags: ["쿨톤", "강렬", "무드"], set: "CRUSH_HEART_01" },
  { name: "러블리 글로우", mood: "러블리 · 화사", g: ["#9C6BFF", "#FF8DC7"], base: "광채 글로우 베이스", eye: "핑크 펄 + 애교살", lip: "핑크 글로스", hair: "긴 생머리", tags: ["봄웜", "러블리", "글로우"], set: "GLOW_OVAL_01" },
  { name: "프레시 클리어", mood: "청량 · 상큼", g: ["#F59E0B", "#FF8DC7"], base: "내추럴 베이스", eye: "피치 코랄 + 자연 라인", lip: "코랄 틴트", hair: "긴 웨이브", tags: ["웜톤", "청량", "내추럴"], set: "FRESH_HEART_01" },
  { name: "소프트 데일리", mood: "내추럴 · 단아", g: ["#94A3B8", "#9C6BFF"], base: "은은한 광 베이스", eye: "로즈 브라운 + 옅은 라인", lip: "로즈 누드", hair: "단정 웨이브", tags: ["뉴트럴", "단아", "데일리"], set: "SOFT_OVAL_01" },
];

export default function Styles() {
  return (
    <div className="ka-root">
      <Sidebar active="styles" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">스타일 도감</h1>
        <p className="ka-sub">앱에서 제공하는 연예인 스타일 구성 (메이크업 블록 · 색감 · 태그)</p>
        <div className="ka-grid">
          {DEX.map((d, i) => (
            <div className="ka-dex" key={i}>
              <div className="ka-dex-top" style={{ background: "linear-gradient(135deg," + d.g[0] + "," + d.g[1] + ")" }}>
                <b>{d.name}</b>
                <span className="ka-dex-mood">{d.mood}</span>
              </div>
              <div className="ka-dex-body">
                <div className="ka-dex-row"><span className="ka-dex-k">베이스</span><span className="ka-dex-v">{d.base}</span></div>
                <div className="ka-dex-row"><span className="ka-dex-k">눈</span><span className="ka-dex-v">{d.eye}</span></div>
                <div className="ka-dex-row"><span className="ka-dex-k">립</span><span className="ka-dex-v">{d.lip}</span></div>
                <div className="ka-dex-row"><span className="ka-dex-k">헤어</span><span className="ka-dex-v">{d.hair}</span></div>
                <div className="ka-dex-tags">{d.tags.map((t, j) => <span className="ka-dex-tag" key={j}>{t}</span>)}</div>
                <div className="ka-dex-set">세트 코드 · {d.set}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ka-note">※ 디자인 목업입니다. 실제 스타일 데이터(앱 엔진)와 연결하면 자동으로 채워집니다.</div>
      </main>
    </div>
  );
}
