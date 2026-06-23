/* eslint-disable */
// 파트너 데이터 엔드포인트: GET /api/partner/data?resource=stats|visitors|visits|selections|generations
import { CORS, json, getKey, checkKey, fetchResource, SCOPE_MAP } from "../../../lib/partnerApi";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() { return new Response(null, { status: 204, headers: CORS }); }

export async function GET(req) {
  const url = new URL(req.url);
  const resource = url.searchParams.get("resource") || "stats";
  const scope = SCOPE_MAP[resource];
  if (!scope) return json(404, { ok: false, reason: "unknown_resource", available: Object.keys(SCOPE_MAP) });
  const key = getKey(req);
  if (!key) return json(401, { ok: false, reason: "no_key", message: "x-api-key 헤더에 API 키가 필요합니다" });
  const r = await checkKey(key, scope, "read");
  if (!r.ok) {
    const code = (r.reason === "scope_denied" || r.reason === "perm_denied") ? 403 : 401;
    return json(code, { ok: false, reason: r.reason });
  }
  try {
    const data = await fetchResource(resource);
    return json(200, { ok: true, partner: r.partner, resource, data });
  } catch (e) {
    return json(500, { ok: false, reason: String((e && e.message) || e) });
  }
}
