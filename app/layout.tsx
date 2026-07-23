import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "查詢我的電子信箱｜會員服務", description: "使用 Google 帳號快速查詢並複製您的電子信箱。" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
