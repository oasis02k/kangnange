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
  title: "디지털 치과기공소 · CAD/CAM 모델리스 보철 전문 | 강냉이닷컴",
  description: "구강스캔 기반 모델리스 보철 10년 경력, 10,000건 이상. 크라운·임플란트·덴쳐·심미보철·교정장치 제작. 처음 거래 시 테스트 케이스 가능. 서울 은평구.",
  alternates: {
    canonical: "https://www.kangnange.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "디지털 치과기공소 · CAD/CAM 모델리스 보철 전문 | 강냉이닷컴",
    description: "구강스캔 기반 모델리스 보철 10년 경력, 10,000건 이상. 크라운·임플란트·덴쳐·심미보철·교정장치 제작. 처음 거래 시 테스트 케이스 가능. 서울 은평구.",
    url: "https://kangnange.com",
    siteName: "강냉이닷컴",
    images: [{ url: "https://kangnange.com/og-image.jpg", width: 1200, height: 630, alt: "강냉이닷컴 디지털 치과기공소" }],
    locale: "ko_KR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "강냉이닷컴 디지털 치과기공소",
  "url": "https://kangnange.com",
  "image": "https://kangnange.com/og-image.jpg",
  "description": "구강스캔 기반 모델리스 보철 10년 경력, 10,000건 이상. 크라운·임플란트·덴쳐·심미보철·교정장치 제작. 처음 거래 시 테스트 케이스 가능.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "진흥로 51, 302호 (역촌동, 은혜빌딩)",
    "addressLocality": "은평구",
    "addressRegion": "서울특별시",
    "addressCountry": "KR",
  },
  "telephone": "+82-2-358-2804",
  "email": "kangdoc80@naver.com",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${a2z.variable} ${notoSansKR.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
