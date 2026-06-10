import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026世界杯观赛指南 | 打工人专属",
  description:
    "根据打工人作息，为你推荐每一天的最佳观赛方案。2026美加墨世界杯，104场比赛，场场精彩。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
