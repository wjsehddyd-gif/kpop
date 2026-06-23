/* eslint-disable */
import Link from "next/link";
import { Sidebar, MemberTable } from "../_shared";

export default function Members() {
  return (
    <div className="ka-root">
      <Sidebar active="members" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">회원 목록</h1>
        <p className="ka-sub">전체 회원 · 최근 가입순</p>
        <div className="ka-panel">
          <div className="ka-panel-h"><b>회원 목록</b><span>총 1,248명</span></div>
          <MemberTable />
          <div className="ka-note">※ 디자인 목업입니다. 본사 DB 연결 후 실제 회원 데이터가 표시됩니다.</div>
        </div>
      </main>
    </div>
  );
}
