export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "gemini-2.5-flash-image";

export async function POST(req) {
  try {
    const key = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) {
      return Response.json({ error: "서버에 API 키가 설정되지 않았어요. (Vercel 환경 변수 확인)" }, { status: 500 });
    }
    const body = await req.json().catch(() => ({}));
    const image = body && body.image;
    const prompt = body && body.prompt;
    if (!image || !prompt) {
      return Response.json({ error: "이미지 또는 프롬프트가 없어요." }, { status: 400 });
    }
    const m = /^data:(image\/[a-zA-Z0-9.+-]+);base64,/.exec(String(image));
    const mime = m ? m[1] : "image/jpeg";
    const b64in = String(image).split(",").pop();
    const url = "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent?key=" + encodeURIComponent(key);
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }, { inline_data: { mime_type: mime, data: b64in } }] }],
      generationConfig: { responseModalities: ["IMAGE"] }
    };
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await r.json().catch(() => null);
    if (!r.ok) {
      const msg = (data && data.error && data.error.message) || ("Gemini 호출 실패 (" + r.status + ")");
      return Response.json({ error: msg }, { status: r.status });
    }
    let outB64 = null, outMime = "image/png";
    const cand = data && data.candidates && data.candidates[0];
    const parts = (cand && cand.content && cand.content.parts) || [];
    for (let i = 0; i < parts.length; i++) {
      const inl = parts[i].inline_data || parts[i].inlineData;
      if (inl && inl.data) { outB64 = inl.data; outMime = inl.mime_type || inl.mimeType || outMime; break; }
    }
    if (!outB64) {
      let textMsg = "";
      for (let i = 0; i < parts.length; i++) { if (parts[i].text) textMsg += parts[i].text; }
      const blocked = (cand && cand.finishReason) || (data && data.promptFeedback && data.promptFeedback.blockReason);
      return Response.json({ error: textMsg || ("이미지를 받지 못했어요." + (blocked ? " (" + blocked + ")" : "")) }, { status: 502 });
    }
    return Response.json({ image: "data:" + outMime + ";base64," + outB64 });
  } catch (e) {
    return Response.json({ error: (e && e.message) || "서버 오류" }, { status: 500 });
  }
}
