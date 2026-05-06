"use client";

import { useState } from "react";

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.2084 10.65H3.95837C3.60837 10.65 3.33337 10.375 3.33337 10.025C3.33337 9.675 3.60837 9.4 3.95837 9.4H15.2084C15.5584 9.4 15.8334 9.675 15.8334 10.025C15.8334 10.375 15.5584 10.65 15.2084 10.65Z" fill="currentColor"/>
      <path d="M12.0834 15.025C12.0014 15.026 11.9201 15.0098 11.8448 14.9775C11.7694 14.9453 11.7017 14.8975 11.6459 14.8375C11.3959 14.5875 11.3959 14.2 11.6459 13.95L15.5834 10.0125L11.6459 6.075C11.3959 5.825 11.3959 5.4375 11.6459 5.1875C11.8959 4.9375 12.2834 4.9375 12.5334 5.1875L16.9084 9.5625C17.1584 9.8125 17.1584 10.2 16.9084 10.45L12.5334 14.825C12.4084 14.95 12.2459 15.0125 12.0959 15.0125L12.0834 15.025Z" fill="currentColor"/>
    </svg>
  );
}


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Mobile full-screen menu overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0C] flex flex-col px-5 pt-6 pb-10">
          <div className="flex items-center justify-between mb-12">
            <a href="#" className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none">
              강냉이.com
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl leading-none"
              aria-label="메뉴 닫기"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col gap-8 font-sans font-medium text-2xl text-white tracking-[-0.03em]">
            <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" onClick={() => setMenuOpen(false)}>제작 케이스</a>
            <a href="#" onClick={() => setMenuOpen(false)}>기공장비</a>
          </nav>
          <div className="mt-auto">
            <button className="w-full h-12 bg-[#ecc744] rounded-xl flex items-center justify-center gap-1 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em]">
              비즈니스 제휴 문의
              <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* ── Hero section ── */}
      <section className="relative bg-[#1c1c19] flex flex-col justify-end min-h-svh overflow-hidden">

        {/* Desktop video */}
        <video
          autoPlay muted loop playsInline
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Mobile video */}
        <video
          autoPlay muted loop playsInline
          className="md:hidden absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video-mobile.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#1c1c19]/60" />

        {/* Navbar — absolute so it overlays the hero */}
        <header className="absolute top-0 left-0 right-0 z-20 h-20 bg-[#0B0B0C] border-b border-white/[0.32] overflow-hidden">
          <div className="flex items-center justify-between h-full px-5 md:px-8">

            {/* Logo */}
            <a href="#" className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none shrink-0">
              강냉이.com
            </a>

            {/* Desktop: centred nav links */}
            <nav className="hidden md:flex items-center gap-14 font-sans font-medium text-base text-white tracking-[-0.02em]">
              <span>Home</span>
              <span>제작 케이스</span>
              <span className="w-[76px]">기공장비</span>
            </nav>

            {/* Desktop: CTA button */}
            <div className="hidden md:block w-[215px]">
              <button className="w-full h-12 bg-[#ecc744] rounded-xl flex items-center justify-center gap-1 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em]">
                비즈니스 제휴 문의
                <ArrowRight />
              </button>
            </div>

            {/* Mobile: hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-6 h-6 flex items-center justify-center"
              aria-label="메뉴 열기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 12H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 18H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

          </div>
        </header>

        {/* Hero content — pinned to bottom, above overlay */}
        <div className="relative z-10 flex flex-col gap-4 px-5 md:px-8 pb-8 md:pb-24">

          {/* Heading: 28px mobile → 56px desktop */}
          <h1 className="font-display text-[28px] md:text-[56px] text-[#f5f5f5] tracking-[-0.03em] leading-[1.2] whitespace-pre-wrap">
            {"스캔 데이터로 정확하게.\n납기와 품질을 지키는 기공소"}
          </h1>

          {/* Subtext: 16px mobile → 18px desktop; mobile breaks after 기반으로 */}
          <p className="font-sans font-normal text-base md:text-[18px] text-white tracking-[-0.03em] leading-[1.4]">
            <span className="md:hidden">{"구강스캐너 데이터 기반으로\n모델리스 제작을 지원합니다."}</span>
            <span className="hidden md:inline">구강스캐너 데이터 기반으로 모델리스 제작을 지원합니다.</span>
          </p>

          {/* CTA: full-width mobile → 215px desktop */}
          <button className="mt-2 w-full md:w-[215px] h-12 bg-[#ecc744] rounded-xl flex items-center justify-center gap-1 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em]">
            비즈니스 제휴 문의
            →
          </button>

        </div>
      </section>
    </>
  );
}
