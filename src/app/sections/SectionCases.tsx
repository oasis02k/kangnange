"use client";

import { useState } from "react";

const CASES = [
  {
    title: "임플란트 없이 결손치 수복 가능",
    description: "치조골이 너무 얇아서 임플란트를 식립할수없는 케이스에 적용한 심미보철 중 emax 소재로 제작한 메릴렌드 브릿지입니다.",
    before: "/cases/case1-before.jpg",
    after: "/cases/case1-after.jpg",
  },
  {
    title: "벌어진 치아 복구 솔루션",
    description: "자체개발한 테크닉인 ceteeth 로 치아삭제없이 distema 를 해소한 증례입니다.",
    before: "/cases/case2-before.jpg",
    after: "/cases/case2-after.jpg",
  },
  {
    title: "모델리스 풀케이스",
    description: "고도손상치아 케이스를 구강스캔하여 모델리스로 각각의 치아로제작하여 한번에 셋팅한 케이스입니다.",
    before: "/cases/case3-before.jpg",
    after: "/cases/case3-after.jpg",
  },
];

function ChevronLeft() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L1 6L6 11" stroke="#1c1c19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L6 6L1 11" stroke="#1c1c19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaseCard({ title, description, before, after }: { title: string; description: string; before: string; after: string }) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl flex-1">
      {/* Image with before/after toggle */}
      <div className="relative h-40 md:h-auto md:aspect-[770/410] overflow-hidden shrink-0">
        <img src={before} alt="Before" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showAfter ? "opacity-0" : "opacity-100"}`} />
        <img src={after} alt="After" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showAfter ? "opacity-100" : "opacity-0"}`} />

        {/* Toggle pill */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#1c1c19] flex items-center gap-2 p-1.5 rounded-full pointer-events-auto">
            <button
              onClick={() => setShowAfter(false)}
              className="bg-[#ecc744] w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              aria-label="Before"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className="bg-[#ecc744] w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              aria-label="After"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="bg-[#f5f5f5] flex flex-col gap-4 p-4 md:p-6 flex-1">
        <h3 className="font-sans font-bold text-base md:text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
          {title}
        </h3>
        <p className="font-sans font-normal text-base md:text-[18px] text-[#1c1c19] tracking-[-0.03em] leading-[1.4]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SectionCases() {
  return (
    <section className="bg-white py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            치료 사례
          </h2>
          <p className="font-sans font-normal text-base md:text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            다양한 임상 치료 사례를 확인해 보세요
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          {CASES.map((c) => (
            <CaseCard key={c.title} {...c} />
          ))}
        </div>

        {/* CTA */}
        <button className="bg-[#ecc744] h-12 px-6 rounded-xl flex items-center justify-center gap-1 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] w-full md:w-auto">
          비즈니스 제휴 문의 →
        </button>

      </div>
    </section>
  );
}
