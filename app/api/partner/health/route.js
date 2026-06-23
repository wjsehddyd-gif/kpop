/* eslint-disable */
import { CORS, json, getKey, checkKey } from "../../../lib/partnerApi";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() { return new Response(null, { status: 204, headers: CORS }); }

export async function GET(req) {
  const key = getKey(req);
  if (!key) return json(401, { ok: false, reason: "no_key", message: "x-api-key 헤더에 API 키가 필요합니다" });
  const r = await checkKey(key, "*", "read");
  if (!r.ok) return json(401, { ok: false, reason: r.reason, message: "유효하지 않은 키입니다" });
  return json(200, { ok: true, partner: r.partner, scopes: r.scopes || [], message: "K-POP API 연결 정상" });
}
