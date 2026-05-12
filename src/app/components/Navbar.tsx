"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

function NavLink({ children, href = "/", onClick }: { children: string; href?: string; onClick?: (e: React.MouseEvent) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const enter = () => gsap.to(ref.current!.children, { y: "-100%", duration: 0.45, ease: "power2.inOut", stagger: 0 });
  const leave = () => gsap.to(ref.current!.children, { y: "0%",    duration: 0.45, ease: "power2.inOut" });
  return (
    <a
      href={href}
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onClick}
      className="inline-flex flex-col overflow-hidden h-[1.15em] cursor-pointer select-none"
    >
      <span className="leading-none text-white flex-shrink-0">{children}</span>
      <span className="leading-none text-[#ecc744] flex-shrink-0">{children}</span>
    </a>
  );
}

export function SecondaryButton({
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
      className={`relative overflow-hidden bg-white rounded-xl flex items-center justify-center font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] cursor-pointer ${className}`}
    >
      <span ref={fillRef} className="absolute inset-0 bg-[#f0f0f0]" style={{ transform: "translateX(-101%)" }} />
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
          <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
        </span>
      </span>
    </button>
  );
}

export function CTAButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.timeline()
      .to(arrowRef.current,  { x: "130%", duration: 0.18, ease: "power2.in" })
      .set(arrowRef.current, { x: "-130%" })
      .to(arrowRef.current,  { x: "0%",   duration: 0.22, ease: "power2.out" });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={`bg-[#ecc744] hover:bg-[#E3BA27] transition-colors rounded-xl flex items-center justify-center gap-1.5 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] cursor-pointer ${className}`}
    >
      {children}
      <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
        <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const bar1    = useRef<HTMLSpanElement>(null);
  const bar2    = useRef<HTMLSpanElement>(null);
  const bar3    = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOpen  = useRef(false);

  const openMenu = () => {
    if (isOpen.current || window.innerWidth >= 768) return;
    isOpen.current = true;
    gsap.to(bar1.current, { y: 8,  rotate: 45,  duration: 0.35, ease: "power2.inOut" });
    gsap.to(bar2.current, { opacity: 0, scaleX: 0, duration: 0.2 });
    gsap.to(bar3.current, { y: -8, rotate: -45, duration: 0.35, ease: "power2.inOut" });
    const items = menuRef.current!.querySelectorAll(".menu-item");
    gsap.set(menuRef.current, { pointerEvents: "auto" });
    gsap.timeline()
      .fromTo(menuRef.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" })
      .fromTo(items, { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" }, "-=0.2");
  };

  const closeMenu = () => {
    if (!isOpen.current) return;
    isOpen.current = false;
    gsap.to(bar1.current, { y: 0, rotate: 0,  duration: 0.35, ease: "power2.inOut" });
    gsap.to(bar2.current, { opacity: 1, scaleX: 1, duration: 0.3, delay: 0.1 });
    gsap.to(bar3.current, { y: 0, rotate: 0,  duration: 0.35, ease: "power2.inOut" });
    const items = menuRef.current!.querySelectorAll(".menu-item");
    gsap.timeline({ onComplete: () => gsap.set(menuRef.current, { pointerEvents: "none" }) })
      .to(items, { x: -30, opacity: 0, stagger: { each: 0.04, from: "end" }, duration: 0.22, ease: "power2.in" })
      .to(menuRef.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.45, ease: "power3.inOut" }, "-=0.05");
  };

  return (
    <>
      {/* Mobile full-screen menu overlay */}
      <div
        ref={menuRef}
        style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
        className="fixed inset-0 z-[100] bg-[#0B0B0C] flex flex-col px-5 pt-6 pb-10"
      >
        <div className="menu-item flex items-center justify-between mb-12">
          <a href="/" className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none">
            강냉이.com
          </a>
          <button onClick={closeMenu} className="w-6 h-6 flex flex-col justify-between py-[3px] cursor-pointer" aria-label="메뉴 닫기">
            <span className="block w-full h-[1.5px] bg-white rounded-full rotate-45 translate-y-[8px]" />
            <span className="block w-full h-[1.5px] bg-white rounded-full opacity-0" />
            <span className="block w-full h-[1.5px] bg-white rounded-full -rotate-45 -translate-y-[8px]" />
          </button>
        </div>
        <nav className="flex flex-col gap-8 font-sans font-medium text-2xl text-white tracking-[-0.03em]">
          <a href="/"      onClick={closeMenu} className="menu-item hover:text-[#ecc744] transition-colors duration-200">Home</a>
          <a href="/cases" onClick={closeMenu} className="menu-item hover:text-[#ecc744] transition-colors duration-200">제작 케이스</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pathname === "/") {
                closeMenu();
                setTimeout(() => {
                  const el = document.getElementById("equipment");
                  if (el) {
                    const offset = window.innerWidth >= 810 ? 80 : 32;
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
                  }
                }, 500);
              } else {
                sessionStorage.setItem("scrollTo", "equipment");
                window.location.href = "/";
              }
            }}
            className="menu-item hover:text-[#ecc744] transition-colors duration-200"
          >기공장비</a>
        </nav>
        <div className="mt-auto menu-item">
          <a href="/contact?inquiry=비즈니스 제휴 문의" onClick={closeMenu} className="w-full">
            <SecondaryButton className="w-full h-12">비즈니스 제휴 문의</SecondaryButton>
          </a>
        </div>
      </div>

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-20 bg-[#0B0B0C] border-b border-white/[0.32]">
        <div className="flex items-center justify-between h-full px-5 tablet:px-8">
          <a href="/" className="font-display text-2xl text-[#ecc744] tracking-[-0.03em] leading-none shrink-0">
            강냉이.com
          </a>
          <nav className="hidden md:flex items-center gap-14 font-sans font-medium text-base tracking-[-0.02em]">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/cases">제작 케이스</NavLink>
            <NavLink
              href={pathname === "/" ? "#equipment" : "/#equipment"}
              onClick={(e) => {
                e.preventDefault();
                if (pathname === "/") {
                  const el = document.getElementById("equipment");
                  if (el) {
                    const offset = window.innerWidth >= 810 ? 80 : 32;
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
                  }
                } else {
                  sessionStorage.setItem("scrollTo", "equipment");
                  window.location.href = "/";
                }
              }}
            >기공장비</NavLink>
          </nav>
          <div className="hidden md:block w-[215px]">
            <a href="/contact?inquiry=비즈니스 제휴 문의">
              <SecondaryButton className="w-full h-12">비즈니스 제휴 문의</SecondaryButton>
            </a>
          </div>
          <button
            onClick={openMenu}
            className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px] relative z-[60] cursor-pointer touch-action-manipulation"
            style={{ touchAction: "manipulation" }}
            aria-label="메뉴 열기"
          >
            <span ref={bar1} className="block w-full h-[1.5px] bg-white rounded-full" />
            <span ref={bar2} className="block w-full h-[1.5px] bg-white rounded-full" />
            <span ref={bar3} className="block w-full h-[1.5px] bg-white rounded-full" />
          </button>
        </div>
      </header>
    </>
  );
}
