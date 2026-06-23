/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";

// 외부연동 준비 화면 — 연결 상태를 카드로. 실제 키/설정 연결은 추후.
const ITEMS = [
  { ic: "🛰️", name: "본사(Life+) 관제 연동", desc: "본사 관제실에 K-POP 관제 임베드", status: "on" },
  { ic: "🗄️", name: "Supabase · 데이터베이스", desc: "방문·선택·생성 기록 저장", status: "on" },
  { ic: "🍌", name: "나노 바나나 · AI 이미지", desc: "스타일 결과 이미지 생성", status: "on" },
  { ic: "▶️", name: "Google Play · 앱 마켓", desc: "안드로이드 앱 배포", status: "wait", note: "사업자 등록 후 진행" },
  { ic: "💳", name: "인앱 결제 · 구독", desc: "유료 전환·생성 한도 관리", status: "wait", note: "마켓 출시 후" },
  { ic: "🔔", name: "푸시 알림", desc: "재방문·신규 스타일 안내", status: "wait", note: "준비 중" },
];
const BADGE = { on: ["연결됨", "ka-ist-on"], wait: ["준비 중", "ka-ist-wait"], off: ["미연결", "ka-ist-off"] };

export default function Integration() {
  return (
    <div className="ka-root">
      <Sidebar active="integration" />
      <main className="ka-main">
        <h1 className="ka-title">외부연동</h1>
        <p className="ka-sub">외부 서비스 연결 상태 관리 · 연결되면 여기서 한눈에</p>

        <div className="ka-intg-list">
          {ITEMS.map((it, i) => (
            <div className="ka-intg" key={i}>
              <span className="ka-intg-ic">{it.ic}</span>
              <div className="ka-intg-body">
                <div className="ka-intg-name">{it.name}</div>
                <div className="ka-intg-desc">{it.desc}{it.note ? " · " + it.note : ""}</div>
              </div>
              <span className={"ka-intg-status " + BADGE[it.status][1]}>{BADGE[it.status][0]}</span>
            </div>
          ))}
        </div>

        <div className="ka-note">※ 외부연동 준비 화면이에요. 실제 연결 설정·키 관리는 추후 연결됩니다. (디자인 목업)</div>
      </main>
    </div>
  );
}
