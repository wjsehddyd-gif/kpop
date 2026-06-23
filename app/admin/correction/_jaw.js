/* eslint-disable */
// 턱 보정 사전 — 얼굴 유형별 "화장 보정법"(AI 보정 아님).
// 방법은 종류별(도구/헤어/색조)로, 진짜효과 우선. 특정 제품명 없이 일반명만.
export const JAW = {
  axis: "jaw",
  label: "턱 보정",
  // 도구 사용 공통 고지
  toolNote: "도구(테이프 등)는 제품마다 사용법이 달라요 — 구매한 제품 안내를 함께 확인하세요.",
  types: [
    {
      id: "square",
      name: "각진 턱",
      when: "턱 양 끝 모서리가 각져 얼굴이 넓고 인상이 강해 보이는 경우",
      goal: "V라인으로 갸름하게",
      methods: [
        {
          kind: "tool", real: true, tool: "페이스 리프팅 테이프",
          how: "귀 옆·턱선 피부를 위로 당겨 테이프로 고정하면 턱선이 실제로 올라가 V라인이 됩니다. 테이프 끝은 머리카락 속이나 귀 뒤에 숨겨요.",
          caution: "피부가 약하면 자극될 수 있어요 — 장시간 부착은 피하세요.",
        },
        {
          kind: "hair", real: true, tool: "고데기·헤어",
          how: "옆머리(얼굴 옆 라인)를 턱선 앞쪽으로 자연스럽게 내려 각진 부분을 가립니다.",
          caution: "",
        },
        {
          kind: "tone", real: false, tool: "쉐딩·하이라이터",
          how: "귀밑에서 턱끝 방향으로 사선 쉐딩을 넣고, 턱끝 중앙에 하이라이트를 올려 갸름해 보이게 합니다.",
          caution: "쉐딩이 진하면 얼룩져 보여요 — 소량씩 쌓으세요. (조명·각도에 따라 효과가 달라집니다)",
        },
      ],
      color: { label: "브라운 (피부보다 1~2톤 어둡게)", hex: "#8a5a3b" },
    },
    {
      id: "round",
      name: "둥근 턱",
      when: "턱선이 둥글어 동안이지만 통통하고 밋밋해 보이는 경우",
      goal: "턱선을 만들어 갸름하게",
      methods: [
        {
          kind: "tool", real: true, tool: "페이스 리프팅 테이프",
          how: "귀 옆 피부를 살짝 당겨 고정해 둥근 턱선에 또렷한 라인을 만듭니다.",
          caution: "장시간 부착은 피하세요.",
        },
        {
          kind: "hair", real: true, tool: "고데기·헤어",
          how: "얼굴 옆 머리를 턱선을 따라 안쪽으로 살짝 감아 윤곽을 좁아 보이게 합니다.",
          caution: "",
        },
        {
          kind: "tone", real: false, tool: "쉐딩·하이라이터",
          how: "턱뼈 라인을 따라 옅게 쉐딩해 선을 만들고, 광대 아래에 살짝 음영, 턱끝에 하이라이트로 포인트를 줍니다.",
          caution: "너무 어두우면 지저분해요 — 얼굴 윤곽 바깥쪽만.",
        },
      ],
      color: { label: "브라운", hex: "#8a5a3b" },
    },
    {
      id: "sharp",
      name: "너무 뾰족한 V자 턱",
      when: "턱이 지나치게 뾰족해 날카롭고 인상이 강해 보이는 경우",
      goal: "날카로움을 부드럽게",
      methods: [
        {
          kind: "hair", real: true, tool: "고데기·헤어",
          how: "턱선 옆으로 부드러운 컬의 머리를 내려 뾰족한 끝으로 가는 시선을 분산시킵니다.",
          caution: "",
        },
        {
          kind: "tone", real: false, tool: "하이라이터·블러셔",
          how: "턱 끝에는 쉐딩을 넣지 않고, 하이라이트를 동그랗게 펴 발라 둥글어 보이게 합니다. 볼 블러셔를 살짝 높고 둥글게 올려 부드러운 인상을 줍니다.",
          caution: "턱 끝 쉐딩은 절대 금지 — 오히려 더 뾰족해 보여요.",
        },
        {
          kind: "tool", real: false, tool: "—",
          how: "리프팅 테이프는 피부를 '당기는' 용도라, 뾰족함을 완화하는 데는 맞지 않습니다. (해당 없음)",
          caution: "",
          na: true,
        },
      ],
      color: { label: "펄 베이지 (하이라이트)", hex: "#efe3d3" },
    },
    {
      id: "long",
      name: "긴 턱",
      when: "턱이 길어 얼굴이 전체적으로 길고 성숙해 보이는 경우",
      goal: "짧아 보이게",
      methods: [
        {
          kind: "hair", real: true, tool: "고데기·헤어",
          how: "턱 아래로 떨어지는 머리 길이를 줄이고, 옆 볼륨을 살려 시선을 가로로 분산시킵니다.",
          caution: "",
        },
        {
          kind: "tone", real: false, tool: "쉐딩·블러셔",
          how: "턱 맨 아래를 가로로 쉐딩해 길이를 줄이고, 블러셔를 가로로 넓게 발라 시선을 옆으로 분산합니다.",
          caution: "턱끝 하이라이트를 세로로 늘이면 더 길어 보여요 — 가로 방향으로만.",
        },
        {
          kind: "tool", real: false, tool: "—",
          how: "테이프는 길이를 줄이는 용도가 아니라 해당 없음.",
          caution: "",
          na: true,
        },
      ],
      color: { label: "브라운", hex: "#8a5a3b" },
    },
    {
      id: "short",
      name: "짧은 턱 · 무턱 경향",
      when: "턱이 짧거나 안으로 들어가 옆모습이 밋밋한 경우",
      goal: "길어 보이고 또렷하게",
      methods: [
        {
          kind: "tone", real: false, tool: "쉐딩·하이라이터",
          how: "턱끝 하이라이트를 아래쪽으로 살짝 연장해 길이감을 주고, 아랫입술 밑에 옅은 쉐딩으로 입체감, 턱선을 따라 음영을 넣어 또렷하게 만듭니다.",
          caution: "쉐딩이 진하면 인위적이에요 — 은은하게.",
        },
        {
          kind: "hair", real: true, tool: "고데기·헤어",
          how: "턱선이 드러나도록 옆머리를 살짝 넘겨 얼굴 아래쪽을 시원하게 보이게 합니다.",
          caution: "",
        },
        {
          kind: "tool", real: false, tool: "—",
          how: "테이프는 짧은 턱을 늘이는 효과가 없어 해당 없음.",
          caution: "",
          na: true,
        },
      ],
      color: { label: "펄 베이지 (하이라이트)", hex: "#efe3d3" },
    },
  ],
};
