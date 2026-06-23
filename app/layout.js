import "./globals.css";

export const metadata = {
  title: "K-POP 스타일 시뮬레이터",
  description: "내 얼굴에 맞는 K-POP 스타일을 찾고 따라하기까지",
};

export const viewport = {
  themeColor: "#0C0A11",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
