/* eslint-disable */
"use client";
// K-POP 관제 데이터 읽기 (같은 프로젝트 = 같은 Supabase, anon 키로 직접 읽기).
// 읽기는 RLS SELECT 정책으로 허용됨. 기록(INSERT)은 앱이, 읽기(SELECT)는 관제가.
const SUPA_URL = "https://xcbqnxfscdiunqnljhmp.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYnFueGZzY2RpdW5xbmxqaG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODc5MzIsImV4cCI6MjA5NzU2MzkzMn0.NUoJLcJp10KoRpbUZiS4tK8qX8DViwi8rrWOSTHgOJc";

export const STYLE = {
  karina:   { name: "시크 시티",     color: "#3B5BFE" },
  winter:   { name: "퓨어 시크",     color: "#5C7CFA" },
  jennie:   { name: "걸 크러시",     color: "#26C6A6" },
  wonyoung: { name: "러블리 글로우", color: "#9C6BFF" },
  yujin:    { name: "프레시 클리어", color: "#F59E0B" },
  iu:       { name: "소프트 데일리", color: "#94A3B8" },
};
const DOW = ["월", "화", "수", "목", "금", "토", "일"]; // getDay: 0=일

async function q(path) {
  const res = await fetch(SUPA_URL + "/rest/v1/" + path, {
    headers: { apikey: SUPA_ANON, Authorization: "Bearer " + SUPA_ANON },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("read failed " + res.status);
  return res.json();
}

export async function loadStats() {
  const [visitors, visits, selections, generations] = await Promise.all([
    q("kpop_visitors?select=device_id,first_seen,last_seen,plan&limit=20000"),
    q("kpop_visits?select=device_id,page,entered_at,duration_sec&limit=20000"),
    q("kpop_selections?select=device_id,style_code,selected_at&limit=20000"),
    q("kpop_generations?select=device_id,style_code,status,gen_ms,created_at&limit=20000"),
  ]);

  const now = new Date();
  const todayStr = now.toDateString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // 방문자
  const totalVisitors = visitors.length;
  const newThisMonth = visitors.filter(v => new Date(v.first_seen) >= monthStart).length;
  const paidCount = visitors.filter(v => v.plan === "paid").length;
  const freeCount = totalVisitors - paidCount;

  // 재방문율 = 방문 2회 이상 기기 비율
  const visitsByDev = {};
  visits.forEach(v => { visitsByDev[v.device_id] = (visitsByDev[v.device_id] || 0) + 1; });
  const returning = Object.values(visitsByDev).filter(n => n > 1).length;
  const returningRate = totalVisitors ? Math.round((returning / totalVisitors) * 100) : 0;

  // 오늘 방문
  const todayVisits = visits.filter(v => new Date(v.entered_at).toDateString() === todayStr).length;

  // 최근 7일 방문
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const label = (d.getMonth() + 1) + "/" + d.getDate();
    const cnt = visits.filter(v => new Date(v.entered_at).toDateString() === d.toDateString()).length;
    last7.push({ label, v: cnt, dow: DOW[(d.getDay() + 6) % 7] });
  }

  // 요일별 방문 (월~일)
  const dowArr = [0, 0, 0, 0, 0, 0, 0];
  visits.forEach(v => { dowArr[(new Date(v.entered_at).getDay() + 6) % 7]++; });
  const dow = DOW.map((d, i) => ({ label: d, v: dowArr[i] }));

  // 히트맵 요일(7) × 시간대(6: 0-4,4-8,...)
  const heat = Array.from({ length: 7 }, () => [0, 0, 0, 0, 0, 0]);
  visits.forEach(v => {
    const dt = new Date(v.entered_at);
    heat[(dt.getDay() + 6) % 7][Math.floor(dt.getHours() / 4)]++;
  });
  let heatMax = 0; heat.forEach(r => r.forEach(c => { if (c > heatMax) heatMax = c; }));

  // 생성
  const totalGen = generations.length;
  const todayGen = generations.filter(g => new Date(g.created_at).toDateString() === todayStr).length;
  const okGen = generations.filter(g => g.status === "success");
  const failGen = generations.filter(g => g.status === "fail").length;
  const failRate = totalGen ? Math.round((failGen / totalGen) * 100) : 0;
  const avgGenMs = okGen.length ? Math.round(okGen.reduce((s, g) => s + (g.gen_ms || 0), 0) / okGen.length) : 0;

  // 스타일 선택 비중
  const selByCode = {};
  selections.forEach(s => { selByCode[s.style_code] = (selByCode[s.style_code] || 0) + 1; });
  const selTotal = selections.length;
  const styleDist = Object.keys(STYLE).map(code => {
    const c = selByCode[code] || 0;
    return { code, name: STYLE[code].name, color: STYLE[code].color, count: c, pct: selTotal ? Math.round((c / selTotal) * 100) : 0 };
  }).sort((a, b) => b.count - a.count);

  const hasAny = totalVisitors > 0 || visits.length > 0 || totalGen > 0;

  return {
    hasAny,
    totalVisitors, newThisMonth, paidCount, freeCount,
    returningRate, todayVisits,
    last7, dow, heat, heatMax,
    totalGen, todayGen, failRate, avgGenMs, genCount: totalGen,
    styleDist, selTotal,
  };
}
