/* eslint-disable */
// 파트너 데이터 API 공통 (서버 전용). 키 검증은 kpop_check_key RPC로 — 키 테이블은 잠겨있음.
const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,x-api-key,authorization",
  "Cache-Control": "no-store",
};
export function json(status, obj) {
  return new Response(JSON.stringify(obj), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}
export function getKey(req) {
  const h = req.headers;
  const x = h.get("x-api-key");
  if (x) return x.trim();
  const a = h.get("authorization") || "";
  const m = a.replace(/^Bearer\s+/i, "").trim();
  return m || null;
}
export async function checkKey(key, scope, perm) {
  try {
    const res = await fetch(SUPA_URL + "/rest/v1/rpc/kpop_check_key", {
      method: "POST",
      headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON, "Content-Type": "application/json" },
      body: JSON.stringify({ p_key: key, p_scope: scope, p_perm: perm || "read" }),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, reason: "validate_failed" };
    return await res.json();
  } catch (e) { return { ok: false, reason: "validate_error" }; }
}
async function q(path) {
  const res = await fetch(SUPA_URL + "/rest/v1/" + path, { headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON }, cache: "no-store" });
  if (!res.ok) throw new Error("supabase " + res.status);
  return res.json();
}

export const SCOPE_MAP = {
  stats: "stats.dashboard",
  visitors: "visitor.read",
  visits: "visit.read",
  selections: "selection.read",
  generations: "generation.read",
};
const STYLE = { karina: "시크 시티", winter: "퓨어 시크", jennie: "걸 크러시", wonyoung: "러블리 글로우", yujin: "프레시 클리어", iu: "소프트 데일리" };

export async function fetchResource(resource) {
  const now = new Date(); const today = now.toDateString();
  if (resource === "visitors") {
    const v = await q("kpop_visitors?select=device_id,first_seen,last_seen,plan&limit=20000");
    return { total: v.length, items: v.slice(0, 500) };
  }
  if (resource === "visits") {
    const v = await q("kpop_visits?select=device_id,page,entered_at&limit=20000");
    const last7 = [];
    for (let i = 6; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i); last7.push({ label: (d.getMonth() + 1) + "/" + d.getDate(), v: v.filter(x => new Date(x.entered_at).toDateString() === d.toDateString()).length }); }
    return { total: v.length, today: v.filter(x => new Date(x.entered_at).toDateString() === today).length, last7 };
  }
  if (resource === "selections") {
    const s = await q("kpop_selections?select=style_code,selected_at&limit=20000");
    const by = {}; s.forEach(x => { by[x.style_code] = (by[x.style_code] || 0) + 1; });
    const dist = Object.keys(STYLE).map(c => ({ code: c, name: STYLE[c], count: by[c] || 0, pct: s.length ? Math.round((by[c] || 0) / s.length * 100) : 0 })).sort((a, b) => b.count - a.count);
    return { total: s.length, dist };
  }
  if (resource === "generations") {
    const g = await q("kpop_generations?select=style_code,status,gen_ms,created_at&limit=20000");
    const ok = g.filter(x => x.status === "success"); const fail = g.filter(x => x.status === "fail").length;
    return { total: g.length, today: g.filter(x => new Date(x.created_at).toDateString() === today).length, failRate: g.length ? Math.round(fail / g.length * 100) : 0, avgGenMs: ok.length ? Math.round(ok.reduce((a, x) => a + (x.gen_ms || 0), 0) / ok.length) : 0 };
  }
  // 기본: stats (종합 대시보드)
  const [visitors, visits, selections, generations] = await Promise.all([
    q("kpop_visitors?select=device_id,first_seen,plan&limit=20000"),
    q("kpop_visits?select=device_id,entered_at&limit=20000"),
    q("kpop_selections?select=style_code&limit=20000"),
    q("kpop_generations?select=status,gen_ms,created_at&limit=20000"),
  ]);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const byDev = {}; visits.forEach(v => { byDev[v.device_id] = (byDev[v.device_id] || 0) + 1; });
  const returning = Object.values(byDev).filter(n => n > 1).length;
  const ok = generations.filter(x => x.status === "success"); const fail = generations.filter(x => x.status === "fail").length;
  const selBy = {}; selections.forEach(x => { selBy[x.style_code] = (selBy[x.style_code] || 0) + 1; });
  const styleDist = Object.keys(STYLE).map(c => ({ code: c, name: STYLE[c], count: selBy[c] || 0, pct: selections.length ? Math.round((selBy[c] || 0) / selections.length * 100) : 0 })).sort((a, b) => b.count - a.count);
  return {
    totalVisitors: visitors.length,
    newThisMonth: visitors.filter(v => new Date(v.first_seen) >= monthStart).length,
    returningRate: visitors.length ? Math.round(returning / visitors.length * 100) : 0,
    todayVisits: visits.filter(v => new Date(v.entered_at).toDateString() === today).length,
    totalGen: generations.length,
    todayGen: generations.filter(g => new Date(g.created_at).toDateString() === today).length,
    failRate: generations.length ? Math.round(fail / generations.length * 100) : 0,
    avgGenMs: ok.length ? Math.round(ok.reduce((a, x) => a + (x.gen_ms || 0), 0) / ok.length) : 0,
    styleDist,
  };
}
