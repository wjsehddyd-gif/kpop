/* eslint-disable */
import Link from "next/link";
import { Sidebar } from "../_shared";
import { JAW } from "./_jaw";

// 추후 부위 추가 시 여기에 import 후 PARTS 배열에 넣기만 하면 도감에 자동 반영.
const PARTS = [JAW];

function KindBadge({ m }) {
  if (m.na) return <span className="ka-cm-kind k-na"><i>✕</i> {m.kind === "tool" ? "도구" : m.kind === "hair" ? "헤어" : "색조"}</span>;
  const map = { tool: ["k-tool", "도구"], hair: ["k-hair", "헤어"], tone: ["k-tone", "색조"] };
  const [cls, label] = map[m.kind] || ["k-tone", "색조"];
  return <span className={"ka-cm-kind " + cls}>{label}</span>;
}

export default function Correction() {
  return (
    <div className="ka-root">
      <Sidebar active="correction" />
      <main className="ka-main">
        <Link href="/admin" className="ka-back">← 대시보드로</Link>
        <h1 className="ka-title">얼굴 유형별 보정 도감</h1>
        <p className="ka-sub">얼굴 유형마다 화장으로 보완하는 방법 (도구·헤어·색조) · 진짜 효과 우선 · AI 보정 아님</p>

        {PARTS.map((P, pi) => (
          <div className="ka-panel" key={pi}>
            <div className="ka-panel-h"><b>{P.label}</b><span>유형 {P.types.length}종</span></div>
            {P.toolNote && <div className="ka-cor-note"><i>ⓘ</i> {P.toolNote}</div>}
            {P.safetyNote && <div className="ka-cor-safety"><i>⚠</i> {P.safetyNote}</div>}

            {P.types.map((t, ti) => (
              <div className="ka-cor" key={ti}>
                <div className="ka-cor-h">
                  <span className="ka-cor-name">{t.name}</span>
                  <span className="ka-cor-goal">→ {t.goal}</span>
                </div>
                <p className="ka-cor-when">{t.when}</p>

                {t.methods.map((m, mi) => (
                  <div className={"ka-cm" + (m.na ? " na" : "")} key={mi}>
                    <div className="ka-cm-h">
                      <KindBadge m={m} />
                      {!m.na && (m.real
                        ? <span className="ka-cm-real">● 진짜 효과</span>
                        : <span className="ka-cm-illu">○ 착시 · 보조</span>)}
                      {m.na && <span className="ka-cm-na-tag">해당 없음</span>}
                    </div>
                    <div className="ka-cm-body">
                      {m.how}
                      {!m.na && m.tool && m.tool !== "—" && <span className="ka-cm-tool">{m.tool}</span>}
                    </div>
                    {m.caution && <div className="ka-cm-warn"><i>⚠</i> {m.caution}</div>}
                  </div>
                ))}

                <div className="ka-cor-color"><span className="ka-cor-chip" style={{ background: t.color.hex }} /> 대표색 · {t.color.label}</div>
              </div>
            ))}
          </div>
        ))}
        <div className="ka-note">※ 현재 ‘턱’ 유형만 들어가 있어요. 구조 확정되면 눈·얼굴형·코·입술도 같은 틀로 채웁니다. (디자인 목업)</div>
      </main>
    </div>
  );
}
