/* eslint-disable */
// 본사(HQ) 연결 테스트 엔드포인트.
// 본사 호출: GET {base}/api/v1/health, 키는 헤더 'x-hq-api-key'.
// 연결(도달)되면 항상 200(정상). 키가 유효하면 authenticated:true로 알려줌.
// 실제 데이터 접근 권한은 /api/partner/data 에서 엄격히 검증.
const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,x-api-key,x-hq-api-key,authorization",
  "Cache-Control": "no-store",
};
function json(status, obj) { return new Response(JSON.stringify(obj), { status, headers: { ...CORS, "Content-Type": "application/json" } }); }

export async function OPTIONS() { return new Response(null, { status: 204, headers: CORS }); }

export async function GET(req) {
  const h = req.headers;
  const key = (h.get("x-hq-api-key") || h.get("x-api-key") || (h.get("authorization") || "").replace(/^Bearer\s+/i, "")).trim();
  let authenticated = false, partner = null, scopes = [];
  if (key) {
    try {
      const res = await fetch(SUPA_URL + "/rest/v1/rpc/kpop_check_key", {
        method: "POST",
        headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON, "Content-Type": "application/json" },
        body: JSON.stringify({ p_key: key, p_scope: "*", p_perm: "read" }),
        cache: "no-store",
      });
      if (res.ok) { const r = await res.json(); if (r && r.ok) { authenticated = true; partner = r.partner; scopes = r.scopes || []; } }
    } catch (e) {}
  }
  return json(200, {
    ok: true,
    service: "kpop",
    name: "K-POP 스타일 시뮬레이터",
    authenticated,
    partner,
    scopes,
    message: authenticated ? "연결 정상 · 인증됨" : "연결 정상",
    time: new Date().toISOString(),
  });
}
