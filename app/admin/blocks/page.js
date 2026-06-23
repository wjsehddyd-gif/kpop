/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";

// 부위별 화장법 도감 — 앱 데이터(연예인 9블록 + 보정 HOW_TO + 단계 설명) 스냅샷.
// "재료 창고" 용도: 부위별 스타일 변형/보정법을 펼쳐 중복·빈자리를 점검.
const AREAS = [{"area": "베이스", "subs": [{"key": "skin", "label": "베이스", "tip": {"w": "피부톤을 고르게 정리해 메이크업이 잘 받는 바탕을 만들기 위해", "l": "이마·볼·코·턱 등 얼굴 전체", "m": "한 번에 두껍게 바르면 들뜨고 갈라져요 — 얇게 여러 번"}, "tools": ["쿠션·파운데이션", "컨실러", "파우더"], "variants": [{"v": "세미매트~글로우", "who": ["카리나"]}, {"v": "글로우 피부", "who": ["윈터"]}, {"v": "글로시 피부", "who": ["제니"]}, {"v": "화사한 피부", "who": ["장원영"]}, {"v": "깨끗한 피부", "who": ["안유진"]}, {"v": "맑은 피부", "who": ["아이유"]}], "generic": false}], "corr": null, "corrTitle": ""}, {"area": "눈썹", "subs": [{"key": "brow", "label": "눈썹", "tip": {"w": "눈썹은 얼굴의 인상과 분위기를 결정해서", "l": "눈썹 앞머리부터 꼬리까지", "m": "앞머리를 진하게 채우면 부자연스러워요 — 앞은 연하게, 꼬리만 또렷이"}, "tools": ["브로우 펜슬", "브로우 마스카라"], "variants": [{"v": "각진 일자 눈썹", "who": ["카리나"]}, {"v": "자연 일자 눈썹", "who": ["윈터"]}, {"v": "또렷한 눈썹", "who": ["제니"]}, {"v": "자연 둥근 눈썹", "who": ["장원영"]}, {"v": "자연 눈썹", "who": ["안유진"]}, {"v": "자연 결 눈썹", "who": ["아이유"]}], "generic": false}], "corr": null, "corrTitle": ""}, {"area": "눈 화장", "subs": [{"key": "shadow", "label": "아이섀도우", "tip": {"w": "눈매에 음영과 깊이를 더해 입체감을 주려고", "l": "눈두덩 전체와 눈꼬리", "m": "진한 색을 먼저 올리면 탁해져요 — 연한 색부터 조금씩"}, "tools": ["아이섀도우 팔레트"], "variants": [{"v": "브라운 음영 섀도우", "who": ["카리나"]}, {"v": "코랄브라운 섀도우", "who": ["윈터"]}, {"v": "브라운 스모키", "who": ["제니"]}, {"v": "핑크/코랄 섀도우", "who": ["장원영"]}, {"v": "코랄핑크 섀도우", "who": ["안유진"]}, {"v": "누드/코랄 섀도우", "who": ["아이유"]}], "generic": false}, {"key": "eyeliner", "label": "아이라인", "tip": {"w": "눈을 더 길고 또렷하게 보이게 하려고", "l": "속눈썹 사이와 눈꼬리 바깥쪽", "m": "너무 길게 빼면 처져 보여요 — 눈꼬리에서 2~3mm만"}, "tools": ["아이라이너"], "variants": [{"v": "또렷한 슬림 윙 라인", "who": ["카리나"]}, {"v": "또렷하되 부드러운 라인", "who": ["윈터"]}, {"v": "스모키 라인", "who": ["제니"]}, {"v": "또렷+러블리 라인", "who": ["장원영"]}, {"v": "또렷한 라인", "who": ["안유진"]}, {"v": "옅은 자연 라인", "who": ["아이유"]}], "generic": false}, {"key": "aegyo", "label": "애교살", "tip": {"w": "눈 밑을 도톰하게 보여 생기와 애교를 더하려고", "l": "웃을 때 도톰해지는 눈 밑 부분", "m": "너무 넓게 바르면 부어 보여요 — 얇은 띠로만"}, "tools": ["애교살 섀도우"], "variants": [{"v": "은은한 애교살", "who": ["카리나", "제니"]}, {"v": "애교살 살짝", "who": ["윈터"]}, {"v": "애교살 밝게", "who": ["장원영"]}, {"v": "애교살 강조", "who": ["안유진"]}, {"v": "애교살 자연", "who": ["아이유"]}], "generic": false}, {"key": "lash", "label": "속눈썹", "tip": {"w": "속눈썹을 올려 눈을 또렷하고 커 보이게 하려고", "l": "위 속눈썹 전체", "m": "마스카라가 뭉치면 지저분해요 — 빗으로 정리"}, "tools": ["뷰러", "마스카라"], "variants": [], "generic": true}], "corr": [{"n": "무쌍 보정", "s": ["아이라인을 점막부터 채워 또렷하게", "속쌍 라인을 그려 입체감 주기", "섀도우로 음영 깊이 만들기"]}, {"n": "속쌍 보정", "s": ["속쌍 라인을 따라 또렷하게 그리기", "섀도우로 라인 자연스럽게 연결"]}, {"n": "눈 확대", "s": ["아이라인을 눈꼬리 밖으로 살짝 연장", "애교살에 밝은 펄 올리기", "언더라인 뒤쪽 1/3 강조", "속눈썹 컬링 + 마스카라"]}, {"n": "처진눈 보정", "s": ["눈꼬리 라인을 살짝 올려 그리기", "언더 섀도우로 처짐 보완"]}, {"n": "올라간눈 보정", "s": ["눈꼬리 라인을 부드러운 일자로 그리기"]}], "corrTitle": "눈 보정 화장법"}, {"area": "쉐딩 · 윤곽", "subs": [{"key": "shading", "label": "쉐딩", "tip": {"w": "얼굴에 음영을 줘 갸름하고 입체감 있게 보이려고", "l": "턱선 사선과 광대 아래", "m": "경계가 선명하면 얼룩져 보여요 — 충분히 블렌딩"}, "tools": ["쉐딩 파우더"], "variants": [{"v": "광대 아래·턱선 윤곽", "who": ["카리나"]}, {"v": "약한 윤곽", "who": ["윈터", "장원영", "안유진"]}, {"v": "윤곽 강조", "who": ["제니"]}, {"v": "최소 윤곽", "who": ["아이유"]}], "generic": false}], "corr": [{"n": "V라인 (사각턱)", "s": ["턱끝~귀밑을 사선으로 쉐딩", "턱끝에 하이라이트", "경계를 충분히 블렌딩"]}, {"n": "각진 턱 완화", "s": ["각진 턱 모서리를 쉐딩으로 완화", "턱선을 따라 자연스럽게 블렌딩"]}, {"n": "중안부 보정", "s": ["코 밑·인중 음영을 최소화", "블러셔를 광대 위쪽에 배치"]}], "corrTitle": "턱·윤곽 보정 화장법"}, {"area": "블러셔", "subs": [{"key": "blush", "label": "블러셔", "tip": {"w": "혈색을 더해 화사하고 건강해 보이게 하려고", "l": "미소 지을 때 도톰해지는 볼", "m": "진하게 한 번에 올리면 부담스러워요 — 소량씩"}, "tools": ["블러셔"], "variants": [{"v": "은은한 로즈", "who": ["카리나"]}, {"v": "코랄 블러셔", "who": ["윈터", "안유진"]}, {"v": "로즈브라운", "who": ["제니"]}, {"v": "핑크 애플", "who": ["장원영"]}, {"v": "누드핑크", "who": ["아이유"]}], "generic": false}], "corr": null, "corrTitle": ""}, {"area": "립", "subs": [{"key": "lip", "label": "립", "tip": {"w": "전체 메이크업의 포인트와 분위기를 완성하려고", "l": "입술 전체, 중앙은 더 밝게", "m": "각질 위에 바르면 갈라져 보여요 — 정돈 먼저"}, "tools": ["립 제품"], "variants": [{"v": "로즈~누드 새틴", "who": ["카리나"]}, {"v": "MLBB 코랄", "who": ["윈터"]}, {"v": "글로시 누드~로즈", "who": ["제니"]}, {"v": "핑크 그라데이션", "who": ["장원영"]}, {"v": "화사한 코랄", "who": ["안유진"]}, {"v": "MLBB~코랄 틴트", "who": ["아이유"]}], "generic": false}], "corr": [{"n": "쿨톤 표현", "s": ["쿨 로즈·모브 립 바르기", "입술 중앙에 하이라이트", "입술 외곽 정리"]}, {"n": "웜톤 표현", "s": ["코랄·웜 누드 립 바르기", "입술 중앙에 하이라이트", "입술 외곽 정리"]}, {"n": "뉴트럴 표현", "s": ["뉴트럴 로즈 립 바르기", "자연스럽게 블렌딩"]}], "corrTitle": "피부톤 보정 화장법"}, {"area": "헤어", "subs": [{"key": "hair", "label": "헤어", "tip": {"w": "스타일의 분위기를 최종적으로 완성하려고", "l": "가르마·앞머리·얼굴 옆 라인", "m": "모근이 눌리면 밋밋해요 — 뿌리 볼륨부터"}, "tools": ["헤어 제품(고데기·왁스)"], "variants": [{"v": "슬릭/웨이브", "who": ["카리나"]}, {"v": "자연 결", "who": ["윈터"]}, {"v": "뱅/웨이브", "who": ["제니"]}, {"v": "롱 웨이브", "who": ["장원영"]}, {"v": "단정한 스타일", "who": ["안유진"]}, {"v": "단아한 스타일", "who": ["아이유"]}], "generic": false}], "corr": null, "corrTitle": ""}];

export default function Blocks() {
  return (
    <div className="ka-root">
      <Sidebar active="blocks" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">부위별 화장법 도감</h1>
        <p className="ka-sub">부위별 스타일 변형 · 화장법 · 보정법 (중복·추가 점검용 · 스타일 도감의 재료)</p>

        {AREAS.map((A, ai) => (
          <div className="ka-panel" key={ai}>
            <div className="ka-panel-h"><b>{A.area}</b><span>{A.subs.reduce((n, s) => n + (s.variants ? s.variants.length : 0), 0)}종 변형</span></div>

            {A.subs.map((s, si) => (
              <div className="ka-blk" key={si}>
                <div className="ka-blk-head">
                  <span className="ka-blk-name">{s.label}</span>
                  {!s.generic && <span className="ka-blk-cnt">{s.variants.length}종</span>}
                  <span className="ka-blk-tools">{s.tools.map((t, ti) => <span className="ka-dex-tag" key={ti}>{t}</span>)}</span>
                </div>
                <div className="ka-blk-tip">
                  <span><b>왜</b> {s.tip.w}</span>
                  <span><b>어디에</b> {s.tip.l}</span>
                  <span className="ka-blk-warn"><b>주의</b> {s.tip.m}</span>
                </div>
                {s.generic ? (
                  <div className="ka-blk-generic">표준 동작 — 뷰러로 컬링 후 마스카라 (연예인별 변형 없음)</div>
                ) : (
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
                )}
              </div>
            ))}

            {A.corr && (
              <div className="ka-corr">
                <div className="ka-corr-title">{A.corrTitle}</div>
                <div className="ka-corr-grid">
                  {A.corr.map((c, ci) => (
                    <div className="ka-corr-card" key={ci}>
                      <div className="ka-corr-name">{c.n}</div>
                      <ol className="ka-corr-steps">{c.s.map((st, sti) => <li key={sti}>{st}</li>)}</ol>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="ka-note">※ 현재는 앱 데이터 스냅샷(목업)입니다. 추가·수정할 부분을 여기서 보고 앱 엔진에 반영하면 됩니다.</div>
      </main>
    </div>
  );
}
