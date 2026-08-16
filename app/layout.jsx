import './globals.css';

export const metadata = {
  title: '英国十日 · 行程手账',
  description:
    '2026 年夏末英国十日行程：曼彻斯特 · 利物浦 · 牛津 · 伦敦，含每日安排、住宿与火车航班信息。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
