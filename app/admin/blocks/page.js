/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";

// 부위별 화장법 도감 — 앱 엔진 전체 데이터 스냅샷 (단계 11 + 보정 11 + 변형/위치/등급/절차).
const AREAS = [{"area": "베이스 · 피부", "steps": [{"key": "base", "label": "베이스", "tierKo": "필수", "tierCls": "t-core", "tools": ["쿠션·파운데이션", "컨실러", "파우더"], "spots": [{"l": "피부 전체", "w": "이마·볼·코·턱", "c": ""}, {"l": "붉은기", "w": "코·볼 안쪽 정리", "c": "lilac"}], "tip": {"w": "피부톤을 고르게 정리해 메이크업이 잘 받는 바탕을 만들기 위해", "l": "이마·볼·코·턱 등 얼굴 전체", "m": "한 번에 두껍게 바르면 들뜨고 갈라져요 — 얇게 여러 번"}, "generic": null, "variants": [{"v": "세미매트~글로우", "who": ["시크 시티"]}, {"v": "글로우 피부", "who": ["퓨어 시크"]}, {"v": "글로시 피부", "who": ["걸 크러시"]}, {"v": "화사한 피부", "who": ["러블리 글로우"]}, {"v": "깨끗한 피부", "who": ["프레시 클리어"]}, {"v": "맑은 피부", "who": ["소프트 데일리"]}], "hasBlock": true}, {"key": "blush", "label": "블러셔", "tierKo": "주요", "tierCls": "t-major", "tools": ["블러셔"], "spots": [{"l": "볼", "w": "광대 위쪽", "c": "lilac"}], "tip": {"w": "혈색을 더해 화사하고 건강해 보이게 하려고", "l": "미소 지을 때 도톰해지는 볼", "m": "진하게 한 번에 올리면 부담스러워요 — 소량씩"}, "generic": null, "variants": [{"v": "은은한 로즈", "who": ["시크 시티"]}, {"v": "코랄 블러셔", "who": ["퓨어 시크", "프레시 클리어"]}, {"v": "로즈브라운", "who": ["걸 크러시"]}, {"v": "핑크 애플", "who": ["러블리 글로우"]}, {"v": "누드핑크", "who": ["소프트 데일리"]}], "hasBlock": true}]}, {"area": "눈썹", "steps": [{"key": "brow", "label": "눈썹", "tierKo": "필수", "tierCls": "t-core", "tools": ["브로우 펜슬", "브로우 마스카라"], "spots": [{"l": "눈썹 앞", "w": "코쪽 눈썹 머리", "c": ""}, {"l": "눈썹 꼬리", "w": "관자쪽 눈썹 끝", "c": "lilac"}], "tip": {"w": "눈썹은 얼굴의 인상과 분위기를 결정해서", "l": "눈썹 앞머리부터 꼬리까지", "m": "앞머리를 진하게 채우면 부자연스러워요 — 앞은 연하게, 꼬리만"}, "generic": null, "variants": [{"v": "각진 일자 눈썹", "who": ["시크 시티"]}, {"v": "자연 일자 눈썹", "who": ["퓨어 시크"]}, {"v": "또렷한 눈썹", "who": ["걸 크러시"]}, {"v": "자연 둥근 눈썹", "who": ["러블리 글로우"]}, {"v": "자연 눈썹", "who": ["프레시 클리어"]}, {"v": "자연 결 눈썹", "who": ["소프트 데일리"]}], "hasBlock": true}]}, {"area": "눈 화장", "steps": [{"key": "shadow", "label": "아이섀도우", "tierKo": "주요", "tierCls": "t-major", "tools": ["아이섀도우 팔레트"], "spots": [{"l": "눈두덩", "w": "베이스 섀도우", "c": "lilac"}, {"l": "눈꼬리", "w": "포인트 섀도우", "c": "pink"}], "tip": {"w": "눈매에 음영과 깊이를 더해 입체감을 주려고", "l": "눈두덩 전체와 눈꼬리", "m": "진한 색을 먼저 올리면 탁해져요 — 연한 색부터 조금씩"}, "generic": null, "variants": [{"v": "브라운 음영 섀도우", "who": ["시크 시티"]}, {"v": "코랄브라운 섀도우", "who": ["퓨어 시크"]}, {"v": "브라운 스모키", "who": ["걸 크러시"]}, {"v": "핑크/코랄 섀도우", "who": ["러블리 글로우"]}, {"v": "코랄핑크 섀도우", "who": ["프레시 클리어"]}, {"v": "누드/코랄 섀도우", "who": ["소프트 데일리"]}], "hasBlock": true}, {"key": "eyeliner", "label": "아이라인", "tierKo": "조건부", "tierCls": "t-cond", "tools": ["아이라이너"], "spots": [{"l": "아이라인", "w": "속눈썹 라인~눈꼬리", "c": "pink"}, {"l": "언더", "w": "눈꼬리 아래 1/3", "c": "pink"}], "tip": {"w": "눈을 더 길고 또렷하게 보이게 하려고", "l": "속눈썹 사이와 눈꼬리 바깥쪽", "m": "너무 길게 빼면 처져 보여요 — 눈꼬리에서 2~3mm만"}, "generic": null, "variants": [{"v": "또렷한 슬림 윙 라인", "who": ["시크 시티"]}, {"v": "또렷하되 부드러운 라인", "who": ["퓨어 시크"]}, {"v": "스모키 라인", "who": ["걸 크러시"]}, {"v": "또렷+러블리 라인", "who": ["러블리 글로우"]}, {"v": "또렷한 라인", "who": ["프레시 클리어"]}, {"v": "옅은 자연 라인", "who": ["소프트 데일리"]}], "hasBlock": true}, {"key": "aegyo", "label": "애교살", "tierKo": "조건부", "tierCls": "t-cond", "tools": ["애교살 섀도우"], "spots": [{"l": "애교살", "w": "눈 밑 도톰한 부분", "c": "lilac"}], "tip": {"w": "눈 밑을 도톰하게 보여 생기와 애교를 더하려고", "l": "웃을 때 도톰해지는 눈 밑", "m": "너무 넓게 바르면 부어 보여요 — 얇은 띠로만"}, "generic": null, "variants": [{"v": "은은한 애교살", "who": ["시크 시티", "걸 크러시"]}, {"v": "애교살 살짝", "who": ["퓨어 시크"]}, {"v": "애교살 밝게", "who": ["러블리 글로우"]}, {"v": "애교살 강조", "who": ["프레시 클리어"]}, {"v": "애교살 자연", "who": ["소프트 데일리"]}], "hasBlock": true}, {"key": "lash", "label": "속눈썹", "tierKo": "조건부", "tierCls": "t-cond", "tools": ["뷰러", "마스카라"], "spots": [{"l": "속눈썹", "w": "눈 위 전체", "c": "pink"}], "tip": {"w": "속눈썹을 올려 눈을 또렷하고 커 보이게 하려고", "l": "위 속눈썹 전체", "m": "마스카라가 뭉치면 지저분해요 — 빗으로 정리"}, "generic": ["뷰러로 속눈썹 뿌리부터 컬링", "마스카라 지그재그로 올리기", "뭉친 부분 빗으로 정리"], "variants": [], "hasBlock": false}]}, {"area": "윤곽 · 입체", "steps": [{"key": "contour", "label": "쉐딩", "tierKo": "조건부", "tierCls": "t-cond", "tools": ["쉐딩 파우더"], "spots": [{"l": "턱선 음영", "w": "턱끝~귀밑 사선", "c": "pink"}, {"l": "턱끝 하이라이트", "w": "턱 가운데 끝", "c": "lilac"}], "tip": {"w": "얼굴에 음영을 줘 갸름하고 입체감 있게 보이려고", "l": "턱선 사선과 광대 아래", "m": "경계가 선명하면 얼룩져 보여요 — 충분히 블렌딩"}, "generic": null, "variants": [{"v": "광대 아래·턱선 윤곽", "who": ["시크 시티"]}, {"v": "약한 윤곽", "who": ["퓨어 시크", "러블리 글로우", "프레시 클리어"]}, {"v": "윤곽 강조", "who": ["걸 크러시"]}, {"v": "최소 윤곽", "who": ["소프트 데일리"]}], "hasBlock": true}, {"key": "highlight", "label": "하이라이터", "tierKo": "추가", "tierCls": "t-extra", "tools": ["하이라이터"], "spots": [{"l": "하이라이트", "w": "콧대·광대·턱끝", "c": "lilac"}], "tip": {"w": "높은 부위에 광을 줘 입체감을 살리려고", "l": "콧대·광대 위·턱끝", "m": "너무 넓게 바르면 번들거려요 — 좁게 포인트만"}, "generic": ["콧대·광대 위에 하이라이트", "눈 밑 세모존 살짝", "경계 톡톡 블렌딩"], "variants": [], "hasBlock": false}]}, {"area": "립", "steps": [{"key": "lip", "label": "립", "tierKo": "필수", "tierCls": "t-core", "tools": ["립 제품"], "spots": [{"l": "립 중앙", "w": "입술 가운데 밝게", "c": "pink"}, {"l": "립 외곽", "w": "입술 경계 정리", "c": "lilac"}], "tip": {"w": "전체 메이크업의 포인트와 분위기를 완성하려고", "l": "입술 전체, 중앙은 더 밝게", "m": "각질 위에 바르면 갈라져 보여요 — 정돈 먼저"}, "generic": null, "variants": [{"v": "로즈~누드 새틴", "who": ["시크 시티"]}, {"v": "MLBB 코랄", "who": ["퓨어 시크"]}, {"v": "글로시 누드~로즈", "who": ["걸 크러시"]}, {"v": "핑크 그라데이션", "who": ["러블리 글로우"]}, {"v": "화사한 코랄", "who": ["프레시 클리어"]}, {"v": "MLBB~코랄 틴트", "who": ["소프트 데일리"]}], "hasBlock": true}]}, {"area": "헤어", "steps": [{"key": "hair", "label": "헤어", "tierKo": "필수", "tierCls": "t-core", "tools": ["헤어 제품(고데기·왁스)"], "spots": [{"l": "가르마", "w": "정수리 가르마 라인", "c": ""}, {"l": "얼굴 라인", "w": "양쪽 옆머리", "c": "lilac"}], "tip": {"w": "스타일의 분위기를 최종적으로 완성하려고", "l": "가르마·앞머리·얼굴 옆 라인", "m": "모근이 눌리면 밋밋해요 — 뿌리 볼륨부터"}, "generic": null, "variants": [{"v": "슬릭/웨이브", "who": ["시크 시티"]}, {"v": "자연 결", "who": ["퓨어 시크"]}, {"v": "뱅/웨이브", "who": ["걸 크러시"]}, {"v": "롱 웨이브", "who": ["러블리 글로우"]}, {"v": "단정한 스타일", "who": ["프레시 클리어"]}, {"v": "단아한 스타일", "who": ["소프트 데일리"]}], "hasBlock": true}]}];
const CORR_GROUPS = [{"group": "눈", "items": [{"label": "무쌍 보정", "blocks": [{"part": "아이라인", "fx": "무쌍용 그라데이션+속쌍 라인으로 또렷"}, {"part": "아이섀도우", "fx": "음영으로 깊이"}]}, {"label": "속쌍 보정", "blocks": [{"part": "아이라인", "fx": "속쌍 라인 또렷하게"}]}, {"label": "눈 확대", "blocks": [{"part": "아이라인", "fx": "키치+앞트임으로 확장"}, {"part": "애교살", "fx": "애교살 밝게+언더 펄"}, {"part": "아이섀도우", "fx": "중앙 밝게 돔 그라데이션"}]}, {"label": "처진 눈 보정", "blocks": [{"part": "아이라인", "fx": "눈꼬리 살짝 상승 라인"}]}, {"label": "올라간 눈 완화", "blocks": [{"part": "아이라인", "fx": "부드러운 일자 라인"}]}]}, {"group": "턱선", "items": [{"label": "V라인 턱선", "blocks": [{"part": "쉐딩", "fx": "턱끝~귀밑 사선 쉐딩+턱끝 하이라이트"}]}, {"label": "턱선 완화", "blocks": [{"part": "쉐딩", "fx": "턱 각 부드럽게 블렌딩"}]}]}, {"group": "쉐딩", "items": [{"label": "중안부 단축", "blocks": [{"part": "블러셔", "fx": "광대 위 높게 배치"}, {"part": "쉐딩", "fx": "노즈 섀도우로 길이 분배"}]}]}, {"group": "피부톤", "items": [{"label": "쿨톤 매칭", "blocks": [{"part": "베이스", "fx": "핑크빛 쿨 베이스"}, {"part": "블러셔", "fx": "쿨 로즈"}, {"part": "립", "fx": "쿨 로즈/모브"}]}, {"label": "웜톤 매칭", "blocks": [{"part": "베이스", "fx": "피치/옐로우 웜 베이스"}, {"part": "블러셔", "fx": "코랄"}, {"part": "립", "fx": "코랄/웜 누드"}]}, {"label": "뉴트럴 매칭", "blocks": [{"part": "베이스", "fx": "뉴트럴 베이스"}, {"part": "블러셔", "fx": "뉴트럴 로즈"}]}]}];
const DOTC = { pink: "#EC4899", lilac: "#A78BFA", "": "#64748B" };

export default function Blocks() {
  return (
    <div className="ka-root">
      <Sidebar active="blocks" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">부위별 화장법 도감</h1>
        <p className="ka-sub">앱 엔진 전체 데이터 — 단계·등급·적용 위치·스타일 변형·보정법 (중복·누락 점검용)</p>

        <div className="ka-secbar"><b>화장 단계</b><span>11단계 · 필수/주요/조건부/추가</span></div>
        {AREAS.map((A, ai) => (
          <div className="ka-panel" key={ai}>
            <div className="ka-panel-h"><b>{A.area}</b><span>{A.steps.length}단계</span></div>
            {A.steps.map((s, si) => (
              <div className="ka-blk" key={si}>
                <div className="ka-blk-head">
                  <span className="ka-blk-name">{s.label}</span>
                  <span className={"ka-tier " + s.tierCls}>{s.tierKo}</span>
                  {s.hasBlock && <span className="ka-blk-cnt">{s.variants.length}종</span>}
                  <span className="ka-blk-tools">{s.tools.map((t, ti) => <span className="ka-dex-tag" key={ti}>{t}</span>)}</span>
                </div>
                <div className="ka-blk-tip">
                  <span><b>왜</b> {s.tip.w}</span>
                  <span><b>어디에</b> {s.tip.l}</span>
                  <span className="ka-blk-warn"><b>주의</b> {s.tip.m}</span>
                </div>
                <div className="ka-spots">
                  <span className="ka-spots-t">적용 위치</span>
                  {s.spots.map((sp, spi) => (
                    <span className="ka-spot" key={spi}>
                      <span className="ka-spot-dot" style={{ background: DOTC[sp.c] }} />
                      <b>{sp.l}</b> {sp.w}
                    </span>
                  ))}
                </div>
                {s.hasBlock ? (
                  <div className="ka-vlist">
                    {s.variants.map((v, vi) => (
                      <div className={"ka-vrow" + (v.who.length > 1 ? " dup" : "")} key={vi}>
                        <span className="ka-vtext">{v.v}</span>
                        <span className="ka-vwho">
                          {v.who.map((w, wi) => <span className="ka-who-chip" key={wi}>{w}</span>)}
                          {v.who.length > 1 && <span className="ka-dup-flag">중복 {v.who.length}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ka-generic">
                    <span className="ka-generic-t">표준 절차</span>
                    <ol className="ka-generic-steps">{s.generic.map((g, gi) => <li key={gi}>{g}</li>)}</ol>
                    <div className="ka-generic-note">연예인별 변형 없음 (공통 단계)</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="ka-secbar"><b>보정 화장법</b><span>11개 · 진단 결과에 따라 적용 / 각 보정이 건드리는 부위</span></div>
        {CORR_GROUPS.map((G, gi) => (
          <div className="ka-panel" key={gi}>
            <div className="ka-panel-h"><b>{G.group} 보정</b><span>{G.items.length}개</span></div>
            <div className="ka-corr-grid">
              {G.items.map((c, ci) => (
                <div className="ka-corr-card" key={ci}>
                  <div className="ka-corr-name">{c.label}<span className="ka-corr-cnt">부위 {c.blocks.length}곳</span></div>
                  <div className="ka-affect">
                    {c.blocks.map((b, bi) => (
                      <div className="ka-affect-row" key={bi}>
                        <span className="ka-affect-part">{b.part}</span>
                        <span className="ka-affect-fx">{b.fx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="ka-note">※ 앱 엔진 데이터 스냅샷입니다. 여기서 중복·빈자리를 보고 앱 엔진에 반영하면 됩니다.</div>
      </main>
    </div>
  );
}
