"use client";

import { useState } from "react";


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
              →
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
                →
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
