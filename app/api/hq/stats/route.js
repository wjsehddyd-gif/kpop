/* eslint-disable */
// 본사(lifeplushq) 관제용 K-POP 통계 API 문(門).
// 본사는 이 엔드포인트만 호출 — K-POP DB를 직접 보지 않음 (쿠폰모아 cmProxy 패턴).
// GET https://kpop-style-sim.vercel.app/api/hq/stats
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";

const STYLE = {
  karina:   { name: "시크 시티",     color: "#3B5BFE" },
  winter:   { name: "퓨어 시크",     color: "#5C7CFA" },
  jennie:   { name: "걸 크러시",     color: "#26C6A6" },
  wonyoung: { name: "러블리 글로우", color: "#9C6BFF" },
  yujin:    { name: "프레시 클리어", color: "#F59E0B" },
  iu:       { name: "소프트 데일리", color: "#94A3B8" },
};
const DOW = ["월", "화", "수", "목", "금", "토", "일"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,x-hq-key",
  "Cache-Control": "no-store",
};

async function q(path) {
  const res = await fetch(SUPA_URL + "/rest/v1/" + path, {
    headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("supabase " + res.status);
  return res.json();
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET() {
  try {
    const [visitors, visits, selections, generations] = await Promise.all([
      q("kpop_visitors?select=device_id,first_seen,plan&limit=20000"),
      q("kpop_visits?select=device_id,entered_at&limit=20000"),
      q("kpop_selections?select=style_code&limit=20000"),
      q("kpop_generations?select=status,gen_ms,created_at&limit=20000"),
    ]);

    const now = new Date();
    const todayStr = now.toDateString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalVisitors = visitors.length;
    const newThisMonth = visitors.filter(v => new Date(v.first_seen) >= monthStart).length;
    const paidCount = visitors.filter(v => v.plan === "paid").length;

    const byDev = {};
    visits.forEach(v => { byDev[v.device_id] = (byDev[v.device_id] || 0) + 1; });
    const returning = Object.values(byDev).filter(n => n > 1).length;
    const returningRate = totalVisitors ? Math.round((returning / totalVisitors) * 100) : 0;
    const todayVisits = visits.filter(v => new Date(v.entered_at).toDateString() === todayStr).length;

    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      last7.push({ label: (d.getMonth() + 1) + "/" + d.getDate(), v: visits.filter(v => new Date(v.entered_at).toDateString() === d.toDateString()).length });
    }

    const totalGen = generations.length;
    const todayGen = generations.filter(g => new Date(g.created_at).toDateString() === todayStr).length;
    const okGen = generations.filter(g => g.status === "success");
    const failGen = generations.filter(g => g.status === "fail").length;
    const failRate = totalGen ? Math.round((failGen / totalGen) * 100) : 0;
    const avgGenMs = okGen.length ? Math.round(okGen.reduce((s, g) => s + (g.gen_ms || 0), 0) / okGen.length) : 0;

    const selBy = {};
    selections.forEach(s => { selBy[s.style_code] = (selBy[s.style_code] || 0) + 1; });
    const selTotal = selections.length;
    const styleDist = Object.keys(STYLE).map(code => {
      const c = selBy[code] || 0;
      return { code, name: STYLE[code].name, color: STYLE[code].color, count: c, pct: selTotal ? Math.round((c / selTotal) * 100) : 0 };
    }).sort((a, b) => b.count - a.count);

    const body = {
      ok: true,
      app: "kpop",
      label: "K-POP 스타일 시뮬레이터",
      updated_at: now.toISOString(),
      summary: {
        totalVisitors, newThisMonth, paidCount, freeCount: totalVisitors - paidCount,
        returningRate, todayVisits,
        totalGen, todayGen, failRate, avgGenMs,
        selTotal,
      },
      styleDist,
      last7,
    };
    return new Response(JSON.stringify(body), { status: 200, headers: { ...CORS, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e && e.message || e) }), { status: 500, headers: { ...CORS, "Content-Type": "application/json" } });
  }
}
