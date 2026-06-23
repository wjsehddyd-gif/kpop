/* eslint-disable */
// admin 공용 사이드바 + 스타일 (대시보드/회원목록/스타일도감 공유)
import Link from "next/link";

export function Sidebar({ active }) {
  const item = (href, key, ic, label) => (
    <Link href={href} className={"ka-nav" + (active === key ? " active" : "")}>
      <span className="ka-ic">{ic}</span>{label}
    </Link>
  );
  return (
    <aside className="ka-side">
      <div className="ka-brand"><span className="ka-logo">K</span><span>K-POP 스타일</span></div>
      <div className="ka-sec">회원 관리</div>
      {item("/admin", "dash", "📊", "회원 대시보드")}
      {item("/admin/members", "members", "👥", "회원 목록")}
      {item("/admin/visits", "visits", "🕒", "방문 · 체류 분석")}
      <div className="ka-sec">콘텐츠</div>
      {item("/admin/styles", "styles", "💄", "스타일 도감")}
      {item("/admin/blocks", "blocks", "🧩", "부위별 도감")}
      {item("/admin/correction", "correction", "🎯", "보정 도감")}
      {item("/admin/images", "images", "🖼️", "생성 이미지")}
      <div className="ka-sec">연동</div>
      {item("/admin/integration", "integration", "🔌", "외부연동")}
      <div className="ka-foot">K-POP 회원 관제<br />· 띵동/Life+ 자회사</div>
    </aside>
  );
}

export const CSS = `
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
.ka-card-s{font-size:12px;font-weight:600;color:#A2A8B2;}
.ka-sub2{display:flex;align-items:center;gap:6px;margin-top:9px;font-size:11.5px;font-weight:600;}
.ka-card-vrow{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;}
.ka-delta-wrap{display:flex;flex-direction:column;align-items:flex-end;gap:3px;padding-bottom:3px;}
.ka-delta-cap{font-size:10.5px;color:#A2A8B2;font-weight:600;white-space:nowrap;}
.ka-delta{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:99px;font-weight:700;}
.ka-delta.up{background:#E6F7ED;color:#16A34A;}
.ka-delta.down{background:#FDECEC;color:#EF4444;}
.ka-sub2 .ka-extra{color:#8B919C;}
.ka-sub2 .ka-extra b{color:#3B5BFE;font-weight:800;}
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
.ka-cta{display:flex;align-items:center;justify-content:space-between;gap:16px;background:#fff;border:1px solid #E9ECF1;border-radius:16px;padding:20px 22px;box-shadow:0 1px 3px rgba(20,30,60,.03);text-decoration:none;}
.ka-cta:hover{border-color:#C9D2FF;background:#FBFCFF;}
.ka-cta-l b{font-size:15px;font-weight:800;color:#1B1F2A;}
.ka-cta-l p{font-size:12.5px;color:#8B919C;margin:4px 0 0;}
.ka-cta-go{font-size:14px;font-weight:800;color:#3B5BFE;white-space:nowrap;}
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
.ka-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#5B616C;text-decoration:none;margin-bottom:14px;}
.ka-back:hover{color:#3B5BFE;}
.ka-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.ka-dex{background:#fff;border:1px solid #E9ECF1;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(20,30,60,.03);}
.ka-dex-top{height:84px;display:flex;align-items:flex-end;padding:12px 16px;position:relative;}
.ka-dex-top b{color:#fff;font-size:17px;font-weight:800;text-shadow:0 1px 4px rgba(0,0,0,.25);}
.ka-dex-mood{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.22);color:#fff;font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;backdrop-filter:blur(4px);}
.ka-dex-body{padding:14px 16px 16px;}
.ka-dex-row{display:flex;gap:8px;font-size:12.5px;line-height:1.5;padding:5px 0;border-bottom:1px solid #F4F6F9;}
.ka-dex-row:last-child{border-bottom:0;}
.ka-dex-k{flex:none;width:40px;color:#9AA0AB;font-weight:700;}
.ka-dex-v{color:#3A4049;}
.ka-dex-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;}
.ka-dex-tag{font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;background:#F2F4F7;color:#5B616C;}
.ka-dex-set{font-size:11px;color:#AEB4BE;margin-top:12px;font-weight:600;}
.ka-blk{padding:14px 0;border-top:1px solid #F2F4F7;}
.ka-blk:first-of-type{border-top:0;}
.ka-blk-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:8px;}
.ka-blk-name{font-size:14px;font-weight:800;color:#1B1F2A;}
.ka-blk-cnt{font-size:11px;font-weight:700;color:#3B5BFE;background:#E8EDFF;padding:2px 8px;border-radius:99px;}
.ka-blk-tools{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto;}
.ka-blk-tip{display:flex;flex-direction:column;gap:3px;font-size:12px;color:#6B717C;line-height:1.5;margin-bottom:10px;}
.ka-blk-tip b{color:#9AA0AB;font-weight:700;margin-right:5px;font-size:11px;}
.ka-blk-warn{color:#C2410C;}
.ka-blk-warn b{color:#EA9A66;}
.ka-blk-generic{font-size:12.5px;color:#9AA0AB;padding:8px 12px;background:#FAFBFD;border-radius:10px;}
.ka-vlist{display:flex;flex-direction:column;gap:6px;}
.ka-vrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 12px;background:#FAFBFD;border:1px solid #F0F2F5;border-radius:10px;}
.ka-vrow.dup{background:#FFF7ED;border-color:#FCE3C7;}
.ka-vtext{font-size:13px;font-weight:600;color:#3A4049;}
.ka-vwho{display:flex;align-items:center;gap:5px;flex-wrap:wrap;justify-content:flex-end;}
.ka-who-chip{font-size:11px;font-weight:700;color:#5B616C;background:#EEF1F5;padding:2px 8px;border-radius:99px;}
.ka-dup-flag{font-size:10.5px;font-weight:800;color:#C2410C;background:#FDE9D2;padding:2px 8px;border-radius:99px;}
.ka-corr{margin-top:14px;padding-top:14px;border-top:1px dashed #E4E8EE;}
.ka-corr-title{font-size:13px;font-weight:800;color:#3B5BFE;margin-bottom:10px;}
.ka-corr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;}
.ka-corr-card{background:#F7F9FC;border:1px solid #EAEEF3;border-radius:12px;padding:12px 14px;}
.ka-corr-name{font-size:12.5px;font-weight:800;color:#1B1F2A;margin-bottom:8px;}
.ka-corr-steps{margin:0;padding-left:16px;font-size:12px;color:#5B616C;line-height:1.7;}
.ka-secbar{display:flex;align-items:baseline;justify-content:space-between;margin:24px 2px 12px;padding-bottom:8px;border-bottom:2px solid #E9ECF1;}
.ka-secbar b{font-size:16px;font-weight:800;color:#1B1F2A;}
.ka-secbar span{font-size:12px;color:#9AA0AB;}
.ka-tier{font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:99px;}
.ka-tier.t-core{background:#E8EDFF;color:#3B5BFE;}
.ka-tier.t-major{background:#DCF5F1;color:#0E9F8E;}
.ka-tier.t-cond{background:#FEF0DC;color:#D97706;}
.ka-tier.t-extra{background:#EEF1F5;color:#64748B;}
.ka-spots{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;background:#FAFBFD;border:1px solid #F0F2F5;border-radius:10px;padding:10px 12px;margin-bottom:10px;}
.ka-spots-t{font-size:11px;font-weight:800;color:#9AA0AB;}
.ka-spot{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#5B616C;}
.ka-spot b{color:#3A4049;font-weight:700;}
.ka-spot-dot{width:9px;height:9px;border-radius:99px;flex:none;}
.ka-generic{background:#FAFBFD;border:1px solid #F0F2F5;border-radius:10px;padding:11px 14px;}
.ka-generic-t{font-size:11px;font-weight:800;color:#9AA0AB;}
.ka-generic-steps{margin:8px 0 0;padding-left:18px;font-size:12.5px;color:#3A4049;line-height:1.8;}
.ka-generic-note{font-size:11px;color:#AEB4BE;margin-top:8px;}
.ka-corr-cnt{font-size:10.5px;font-weight:700;color:#9AA0AB;background:#EEF1F5;padding:2px 7px;border-radius:99px;margin-left:8px;}
.ka-affect{display:flex;flex-direction:column;gap:6px;}
.ka-affect-row{display:flex;gap:10px;align-items:baseline;}
.ka-affect-part{flex:none;width:62px;font-size:11.5px;font-weight:800;color:#3B5BFE;}
.ka-affect-fx{font-size:12px;color:#5B616C;line-height:1.5;}
.ka-cor-note{display:flex;gap:7px;font-size:12px;color:#3B5BFE;background:#EEF3FF;border:1px solid #DCE6FF;border-radius:10px;padding:9px 12px;margin-bottom:14px;line-height:1.5;}
.ka-cor-note i{font-style:normal;}
.ka-cor-safety{display:flex;gap:7px;font-size:12px;color:#C2410C;background:#FFF4ED;border:1px solid #FCD9BF;border-radius:10px;padding:9px 12px;margin-bottom:14px;line-height:1.5;}
.ka-cor-safety i{font-style:normal;}
.ka-cor{border-top:1px solid #F2F4F7;padding:16px 0 4px;}
.ka-cor:first-of-type{border-top:0;}
.ka-cor-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:5px;}
.ka-cor-name{font-size:16px;font-weight:800;color:#1B1F2A;}
.ka-cor-goal{font-size:13px;color:#3B5BFE;font-weight:600;}
.ka-cor-when{font-size:12.5px;color:#8B919C;margin:0 0 12px;line-height:1.6;}
.ka-cm{border-top:1px dashed #ECEEF2;padding:11px 0 3px;}
.ka-cm.na{opacity:.62;}
.ka-cm-h{display:flex;align-items:center;gap:8px;margin-bottom:7px;}
.ka-cm-kind{font-size:12px;font-weight:700;padding:2px 9px;border-radius:8px;display:inline-flex;align-items:center;gap:4px;}
.ka-cm-kind i{font-style:normal;}
.ka-cm-kind.k-tool{background:#E3F7EF;color:#0E9F8E;}
.ka-cm-kind.k-hair{background:#E3F7EF;color:#0E9F8E;}
.ka-cm-kind.k-tone{background:#F0F2F5;color:#6B717C;}
.ka-cm-kind.k-na{background:#F0F2F5;color:#AEB4BE;}
.ka-cm-real{font-size:11.5px;color:#16A34A;font-weight:700;}
.ka-cm-illu{font-size:11.5px;color:#9AA0AB;font-weight:600;}
.ka-cm-na-tag{font-size:11px;color:#AEB4BE;font-weight:600;}
.ka-cm-body{font-size:13.5px;line-height:1.65;color:#3A4049;}
.ka-cm-tool{font-size:11px;color:#9AA0AB;border:1px solid #E9ECF1;border-radius:8px;padding:1px 7px;margin-left:6px;white-space:nowrap;}
.ka-cm-warn{font-size:12px;color:#C2410C;margin-top:5px;}
.ka-cm-warn i{font-style:normal;}
.ka-cor-color{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#8B919C;margin-top:11px;padding-top:4px;}
.ka-cor-chip{width:15px;height:15px;border-radius:5px;flex:none;border:1px solid #E0E0E0;}
.ka-intg-list{display:flex;flex-direction:column;gap:10px;}
.ka-intg{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #EAEDF2;border-radius:14px;padding:16px 18px;}
.ka-intg-ic{width:42px;height:42px;flex:none;display:flex;align-items:center;justify-content:center;font-size:20px;background:#F4F6F9;border-radius:11px;}
.ka-intg-body{flex:1;min-width:0;}
.ka-intg-name{font-size:14.5px;font-weight:800;color:#1B1F2A;}
.ka-intg-desc{font-size:12.5px;color:#8B919C;margin-top:3px;}
.ka-intg-status{font-size:12px;font-weight:700;padding:5px 12px;border-radius:99px;white-space:nowrap;flex:none;}
.ka-ist-on{background:#E3F7EF;color:#0E9F8E;}
.ka-ist-wait{background:#FFF4ED;color:#C2410C;}
.ka-ist-off{background:#F0F2F5;color:#9AA0AB;}
/* 빈 상태 / 스켈레톤 차트 (데이터 연결 시 같은 자리에 채워짐) */
.ka-card-empty{font-size:11px;color:#B6BCC6;font-weight:600;margin-top:8px;}
.ka-chart{position:relative;height:200px;}
.ka-chart-wrap{position:relative;}
.ka-chart-heat{height:auto;}
.ka-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
.ka-empty-pill{font-size:12px;font-weight:700;color:#9AA0AB;background:#F4F6F9;border:1px solid #E9ECF1;border-radius:99px;padding:6px 14px;}
.ka-skel-bars{display:flex;align-items:flex-end;justify-content:space-around;height:100%;padding:0 4px 26px;gap:10px;}
.ka-skel-col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;position:relative;}
.ka-skel-bar{width:100%;max-width:46px;height:30%;background:repeating-linear-gradient(135deg,#F1F3F7,#F1F3F7 6px,#EAEDF2 6px,#EAEDF2 12px);border-radius:8px 8px 0 0;}
.ka-skel-x{position:absolute;bottom:-22px;font-size:11px;color:#9AA0AB;white-space:nowrap;}
.ka-heat{display:grid;grid-template-columns:34px repeat(6,1fr);gap:6px;}
.ka-heat-corner{}
.ka-heat-htop{font-size:11px;color:#9AA0AB;text-align:center;padding-bottom:2px;}
.ka-heat-yl{font-size:11px;color:#9AA0AB;display:flex;align-items:center;}
.ka-heat-cell{height:26px;border-radius:6px;background:#F1F3F7;}
.ka-stay-list{display:flex;flex-direction:column;gap:11px;position:relative;min-height:60px;}
.ka-stay-row{display:flex;align-items:center;gap:12px;}
.ka-stay-name{width:84px;flex:none;font-size:13px;font-weight:600;color:#3A4049;}
.ka-stay-track{flex:1;height:12px;background:#EEF1F5;border-radius:99px;overflow:hidden;}
.ka-stay-fill{display:block;height:100%;width:0;background:#C9D2FF;border-radius:99px;}
.ka-stay-val{width:44px;flex:none;text-align:right;font-size:12.5px;font-weight:700;color:#9AA0AB;}
.ka-stay-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#9AA0AB;background:rgba(255,255,255,.4);}
/* 필터 칩 */
.ka-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
.ka-filter{font-size:12.5px;font-weight:600;color:#5B616C;background:#fff;border:1px solid #E9ECF1;border-radius:99px;padding:6px 13px;}
.ka-filter.on{background:#1E2433;color:#fff;border-color:#1E2433;}
/* 이미지 그리드 */
.ka-imgwrap{position:relative;}
.ka-img-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.ka-img-card{background:#fff;border:1px solid #E9ECF1;border-radius:14px;overflow:hidden;}
.ka-img-thumb{aspect-ratio:3/4;background:repeating-linear-gradient(135deg,#F4F6F9,#F4F6F9 10px,#EEF1F5 10px,#EEF1F5 20px);}
.ka-img-meta{padding:9px 11px;}
.ka-img-id{display:block;font-size:12px;font-weight:700;color:#B6BCC6;}
.ka-img-sub{display:block;font-size:11px;color:#C2C7D0;margin-top:2px;}
@media (max-width:1080px){.ka-img-grid{grid-template-columns:repeat(3,1fr);}}
@media (max-width:720px){.ka-img-grid{grid-template-columns:repeat(2,1fr);}.ka-heat{grid-template-columns:28px repeat(6,1fr);}}
@media (max-width:1080px){.ka-cards{grid-template-columns:repeat(2,1fr);}.ka-row2{grid-template-columns:1fr;}.ka-grid{grid-template-columns:repeat(2,1fr);}}
@media (max-width:720px){.ka-side{display:none;}.ka-cards{grid-template-columns:repeat(2,1fr);}.ka-grid{grid-template-columns:1fr;}}
`;

// 회원 목록 목업 (대시보드/회원목록 공용)
export const MEMBERS = [
  { id: "minji_02", join: "2026-06-21", visits: 12, stay: "8:14", last: "방금 전", paid: true, celeb: "시크 시티", gen: 9 },
  { id: "yuna_kim", join: "2026-06-20", visits: 7, stay: "5:02", last: "12분 전", paid: false, celeb: "퓨어 시크", gen: 4 },
  { id: "soohyun99", join: "2026-06-19", visits: 21, stay: "11:30", last: "1시간 전", paid: true, celeb: "걸 크러시", gen: 15 },
  { id: "haru_x", join: "2026-06-18", visits: 3, stay: "2:48", last: "3시간 전", paid: false, celeb: "러블리 글로우", gen: 1 },
  { id: "jiwoo__", join: "2026-06-18", visits: 9, stay: "6:21", last: "어제", paid: false, celeb: "시크 시티", gen: 6 },
  { id: "nayeon_p", join: "2026-06-17", visits: 16, stay: "9:55", last: "어제", paid: true, celeb: "프레시 클리어", gen: 11 },
  { id: "seo_dable", join: "2026-06-16", visits: 5, stay: "3:40", last: "2일 전", paid: false, celeb: "퓨어 시크", gen: 3 },
  { id: "hyun_22", join: "2026-06-15", visits: 28, stay: "14:02", last: "2일 전", paid: true, celeb: "걸 크러시", gen: 19 },
  { id: "mina_lee", join: "2026-06-14", visits: 4, stay: "2:10", last: "3일 전", paid: false, celeb: "소프트 데일리", gen: 2 },
  { id: "rara_kk", join: "2026-06-13", visits: 11, stay: "7:33", last: "4일 전", paid: false, celeb: "시크 시티", gen: 7 },
  { id: "doyeon_x", join: "2026-06-12", visits: 6, stay: "4:18", last: "5일 전", paid: false, celeb: "러블리 글로우", gen: 4 },
  { id: "sumin_03", join: "2026-06-11", visits: 33, stay: "18:47", last: "6일 전", paid: true, celeb: "퓨어 시크", gen: 24 },
];

export function MemberTable() {
  return (
    <div className="ka-table-wrap">
      <table className="ka-table">
        <thead>
          <tr><th>아이디</th><th>가입일</th><th>방문</th><th>누적 체류</th><th>마지막 방문</th><th>등급</th><th>선호 스타일</th><th>생성</th></tr>
        </thead>
        <tbody>
          {MEMBERS.map((m, i) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
