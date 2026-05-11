import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import FloatingButtons from "./components/FloatingButtons";

const a2z = localFont({
  src: "./fonts/a2z-7bold.woff2",
  variable: "--font-a2z",
  weight: "700",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "강냉이.com | 디지털 치과 기공소",
  description: "스캔 데이터로 정확하게. 납기와 품질을 지키는 기공소",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${a2z.variable} ${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
