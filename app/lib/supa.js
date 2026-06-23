/* eslint-disable */
// K-POP 앱 ↔ Supabase 연결.
// 아래 anon 키는 '공개용'(RLS로 INSERT만 허용)이라 클라이언트에 노출돼도 안전.
// ⚠️ service_role(비밀) 키는 절대 여기 넣지 말 것.
const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";

function deviceId() {
  if (typeof window === "undefined") return null;
  try {
    var d = localStorage.getItem("kpop_device_id");
    if (!d) { d = "dev_" + Math.random().toString(36).slice(2) + "_" + Date.now().toString(36); localStorage.setItem("kpop_device_id", d); }
    return d;
  } catch (e) { return null; }
}

function rest(path, body, prefer) {
  try {
    fetch(SUPA_URL + "/rest/v1/" + path, {
      method: "POST",
      headers: {
        "apikey": SUPA_ANON,
        "Authorization": "Bearer " + SUPA_ANON,
        "Content-Type": "application/json",
        "Prefer": prefer || "return=minimal",
      },
      body: JSON.stringify(body),
    }).catch(function () {});
  } catch (e) {}
}

export function trackVisit(page) {
  var d = deviceId(); if (!d) return;
  rest("kpop_visitors?on_conflict=device_id", { device_id: d, last_seen: new Date().toISOString() }, "resolution=merge-duplicates,return=minimal");
  rest("kpop_visits", { device_id: d, page: page || "app", entered_at: new Date().toISOString() });
}
export function trackSelection(styleCode) {
  var d = deviceId(); if (!d) return;
  rest("kpop_selections", { device_id: d, style_code: styleCode || "" });
}
export function trackGeneration(styleCode, status, ms) {
  var d = deviceId(); if (!d) return;
  rest("kpop_generations", { device_id: d, style_code: styleCode || "", status: status || "success", gen_ms: ms || null });
}

// 엔진(plain JS)에서도 호출할 수 있게 window에 노출
if (typeof window !== "undefined") {
  window.kpopTrackVisit = trackVisit;
  window.kpopTrackSelection = trackSelection;
  window.kpopTrackGeneration = trackGeneration;
}
