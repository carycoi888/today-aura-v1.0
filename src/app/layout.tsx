import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "今日气场 Today Aura",
  description: "每日审美决策助手，帮你快速决定今天怎么出现。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
