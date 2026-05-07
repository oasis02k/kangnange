"use client";

import { useRef } from "react";
import gsap from "gsap";
import SectionWhy from "./sections/SectionWhy";
import SectionServices from "./sections/SectionServices";
import SectionWorkflow from "./sections/SectionWorkflow";
import SectionTestimonial from "./sections/SectionTestimonial";
import SectionCases from "./sections/SectionCases";
import SectionEquipment from "./sections/SectionEquipment";
import SectionContact from "./sections/SectionContact";
import Footer from "./sections/Footer";

/* ─── Rolling-text nav link ─────────────────────────────────────────────── */
function NavLink({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const enter = () => {
    gsap.to(ref.current!.children, {
      y: "-100%",
      duration: 0.45,
      ease: "power2.inOut",
      stagger: 0,
    });
  };
  const leave = () => {
    gsap.to(ref.current!.children, {
      y: "0%",
      duration: 0.45,
      ease: "power2.inOut",
    });
  };

  return (
    <span
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="inline-flex flex-col overflow-hidden h-[1.15em] cursor-pointer select-none"
    >
      <span className="leading-none text-white flex-shrink-0">{children}</span>
      <span className="leading-none text-[#ecc744] flex-shrink-0">{children}</span>
    </span>
  );
}

/* ─── Slide-fill + magnetic CTA button ─────────────────────────────────── */
function CTAButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const fillRef  = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.fromTo(fillRef.current, { xPercent: -101 }, { xPercent: 0, duration: 0.5, ease: "power3.out" });
    gsap.timeline()
      .to(arrowRef.current,  { x: "130%", duration: 0.18, ease: "power2.in" })
      .set(arrowRef.current, { x: "-130%" })
      .to(arrowRef.current,  { x: "0%",   duration: 0.22, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(fillRef.current, { xPercent: 101, duration: 0.45, ease: "power3.in" });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-[#ecc744] rounded-xl flex items-center justify-center font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] ${className}`}
    >
      <span ref={fillRef} className="absolute inset-0 bg-[#f0c830]" style={{ transform: "translateX(-101%)" }} />
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        {/* arrow gets its own clip zone so the in/out stays tidy */}
        <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
          <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
        </span>
      </span>
    </button>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  /* hamburger bars */
  const bar1 = useRef<HTMLSpanElement>(null);
  const bar2 = useRef<HTMLSpanElement>(null);
  const bar3 = useRef<HTMLSpanElement>(null);

  /* menu overlay */
  const menuRef = useRef<HTMLDivElement>(null);
  const isOpen = useRef(false);

  const openMenu = () => {
    if (isOpen.current) return;
    isOpen.current = true;

    /* bars → X */
    gsap.to(bar1.current, { y: 8, rotate: 45, duration: 0.35, ease: "power2.inOut" });
    gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
    gsap.to(bar3.current, { y: -8, rotate: -45, duration: 0.35, ease: "power2.inOut" });

    /* curtain drop + stagger items */
    const items = menuRef.current!.querySelectorAll(".menu-item");
    gsap.set(menuRef.current, { pointerEvents: "auto" });
    gsap
      .timeline()
      .fromTo(
        menuRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" }
      )
      .fromTo(
        items,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );
  };

  const closeMenu = () => {
    if (!isOpen.current) return;
    isOpen.current = false;

    /* X → bars */
    gsap.to(bar1.current, { y: 0, rotate: 0, duration: 0.35, ease: "power2.inOut" });
    gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.3, delay: 0.1 });
    gsap.to(bar3.current, { y: 0, rotate: 0, duration: 0.35, ease: "power2.inOut" });

    /* items out + curtain up */
    const items = menuRef.current!.querySelectorAll(".menu-item");
    gsap
      .timeline({
        onComplete: () => gsap.set(menuRef.current, { pointerEvents: "none" }),
      })
      .to(items, {
        x: -30,
        opacity: 0,
        stagger: { each: 0.04, from: "end" },
        duration: 0.22,
        ease: "power2.in",
      })
      .to(
        menuRef.current,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.45, ease: "power3.inOut" },
        "-=0.05"
      );
  };

  return (
    <>
      {/* ── Mobile full-screen menu overlay ── */}
      <div
        ref={menuRef}
        style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
        className="fixed inset-0 z-50 bg-[#0B0B0C] flex flex-col px-5 pt-6 pb-10"
      >
        <div className="menu-item flex items-center justify-between mb-12">
          <a
            href="#"
            className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none"
          >
            강냉이.com
          </a>
          <button
            onClick={closeMenu}
            className="w-6 h-6 flex flex-col justify-between py-[3px]"
            aria-label="메뉴 닫기"
          >
            {/* mirror the header bars so they look the same in X state */}
            <span className="block w-full h-[1.5px] bg-white rounded-full rotate-45 translate-y-[8px]" />
            <span className="block w-full h-[1.5px] bg-white rounded-full opacity-0" />
            <span className="block w-full h-[1.5px] bg-white rounded-full -rotate-45 -translate-y-[8px]" />
          </button>
        </div>

        <nav className="flex flex-col gap-8 font-sans font-medium text-2xl text-white tracking-[-0.03em]">
          <a href="#" onClick={closeMenu} className="menu-item hover:text-[#ecc744] transition-colors duration-200">
            Home
          </a>
          <a href="#" onClick={closeMenu} className="menu-item hover:text-[#ecc744] transition-colors duration-200">
            제작 케이스
          </a>
          <a href="#" onClick={closeMenu} className="menu-item hover:text-[#ecc744] transition-colors duration-200">
            기공장비
          </a>
        </nav>

        <div className="mt-auto menu-item">
          <CTAButton className="w-full h-12" onClick={closeMenu}>
            비즈니스 제휴 문의
          </CTAButton>
        </div>
      </div>

      {/* ── Hero section ── */}
      <section className="sticky top-0 z-0 bg-[#1c1c19] flex flex-col justify-end min-h-svh overflow-hidden">

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

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1c1c19]/60" />

        {/* Navbar */}
        <header className="absolute top-0 left-0 right-0 z-20 h-20 bg-[#0B0B0C] border-b border-white/[0.32] overflow-visible">
          <div className="flex items-center justify-between h-full px-5 md:px-8">

            <a
              href="#"
              className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none shrink-0"
            >
              강냉이.com
            </a>

            <nav className="hidden md:flex items-center gap-14 font-sans font-medium text-base tracking-[-0.02em]">
              <NavLink>Home</NavLink>
              <NavLink>제작 케이스</NavLink>
              <NavLink>기공장비</NavLink>
            </nav>

            <div className="hidden md:block w-[215px]">
              <CTAButton className="w-full h-12">비즈니스 제휴 문의</CTAButton>
            </div>

            {/* Hamburger */}
            <button
              onClick={openMenu}
              className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px] relative z-[60]"
              aria-label="메뉴 열기"
            >
              <span ref={bar1} className="block w-full h-[1.5px] bg-white rounded-full" />
              <span ref={bar2} className="block w-full h-[1.5px] bg-white rounded-full" />
              <span ref={bar3} className="block w-full h-[1.5px] bg-white rounded-full" />
            </button>

          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col gap-4 px-5 md:px-8 pb-8 md:pb-24">
          <h1 className="font-display text-[28px] md:text-[56px] text-[#f5f5f5] tracking-[-0.03em] leading-[1.2] whitespace-pre-wrap">
            {"스캔 데이터로 정확하게.\n납기와 품질을 지키는 기공소"}
          </h1>
          <p className="font-sans font-normal text-base md:text-[18px] text-white tracking-[-0.03em] leading-[1.4]">
            <span className="md:hidden">{"구강스캐너 데이터 기반으로\n모델리스 제작을 지원합니다."}</span>
            <span className="hidden md:inline">구강스캐너 데이터 기반으로 모델리스 제작을 지원합니다.</span>
          </p>
          <CTAButton className="mt-2 w-full md:w-[215px] h-12">
            케이스 의뢰 하기
          </CTAButton>
        </div>

      </section>

      <div className="relative z-10">
        <SectionWhy />
        <SectionServices />
        <SectionWorkflow />
        <SectionTestimonial />
        <SectionCases />
        <SectionEquipment />
        <SectionContact />
        <Footer />
      </div>
    </>
  );
}
