import type { Metadata } from "next";
import { Noto_Sans_KR, Black_Han_Sans } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "강냉이.com | 디지털 치과 기공소",
  description: "스캔 데이터로 정확하게. 납기와 품질을 지키는 기공소",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${blackHanSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
