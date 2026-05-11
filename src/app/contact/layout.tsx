import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "케이스 의뢰 · 제휴 문의 | 강냉이닷컴 디지털 치과기공소",
  description: "케이스 의뢰·비즈니스 제휴·샘플 요청 접수. STL 스캔 파일 기반 검토 후 난이도·재료·납기 안내. 처음 거래 시 샘플링 가능. 카카오 상담 가능.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
