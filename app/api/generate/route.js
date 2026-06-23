export const runtime = "nodejs";
export const maxDuration = 60;

// 셀카 + 스타일 프롬프트를 받아 OpenAI 이미지 편집(gpt-image-1)으로 결과 이미지를 생성합니다.
// 키는 서버 환경변수(OPENAI_API_KEY)에서만 읽습니다. 브라우저로 키가 나가지 않습니다.
export async function POST(req) {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return Response.json(
        { error: "서버에 OPENAI_API_KEY가 설정되지 않았어요. (Vercel → Settings → Environment Variables 확인)" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const image = body && body.image;
    const prompt = body && body.prompt;
    if (!image || !prompt) {
      return Response.json({ error: "이미지 또는 프롬프트가 없어요." }, { status: 400 });
    }

    // data URL -> Blob (원본 MIME 유지)
    const m = /^data:(image\/[a-zA-Z0-9.+-]+);base64,/.exec(String(image));
    const mime = m ? m[1] : "image/png";
    const ext = mime.split("/")[1] || "png";
    const b64in = String(image).split(",").pop();
    const buf = Buffer.from(b64in, "base64");
    const blob = new Blob([buf], { type: mime });

    const form = new FormData();
    form.append("model", "gpt-image-1");
    form.append("image", blob, "selfie." + ext);
    form.append("prompt", prompt);
    form.append("size", "1024x1024");
    form.append("n", "1");

    const r = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: "Bearer " + key },
      body: form,
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) {
      const msg = (data && data.error && data.error.message) || ("OpenAI 호출 실패 (" + r.status + ")");
      return Response.json({ error: msg }, { status: r.status });
    }

    const b64out = data && data.data && data.data[0] && data.data[0].b64_json;
    if (!b64out) {
      return Response.json({ error: "이미지 데이터를 받지 못했어요." }, { status: 502 });
    }

    return Response.json({ image: "data:image/png;base64," + b64out });
  } catch (e) {
    return Response.json({ error: (e && e.message) || "서버 오류" }, { status: 500 });
  }
}
