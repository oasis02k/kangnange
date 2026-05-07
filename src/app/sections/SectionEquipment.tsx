"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const INTERVAL_MS = 3000;

const EQUIPMENT = [
  {
    title: "DWX-51D",
    description: "5축 밀링머신으로 지르코니아, 왁스, PMMA 등 다양한 재료를 고정밀 가공합니다.",
    images: [{ src: "/equipment/dwx51d.png", alt: "DWX-51D", label: "" }],
  },
  {
    title: "ATLAS BX4",
    description: "4축 밀링머신으로 지르코니아, 왁스, PMMA 등 다양한 재료를 고정밀 가공합니다.",
    images: [{ src: "/equipment/atlas-bx4.png", alt: "ATLAS BX4", label: "" }],
  },
  {
    title: "3D PRINTERS",
    description: "고해상도 레진 3D 프린터로 모델, 서지컬 가이드, 임시 보철물을 정밀 출력합니다.",
    images: [
      { src: "/equipment/3d-printer1.png", alt: "3D Printer 1", label: "SprintRay Pro 95" },
      { src: "/equipment/3d-printer2.png", alt: "3D Printer 2", label: "SprintRay Pro 55" },
    ],
  },
  {
    title: "Programat EP 3010",
    description: "세라믹 소성로로 e.max 등 압축 세라믹 보철물을 정밀 소성합니다.",
    images: [{ src: "/equipment/programat.png", alt: "Programat EP 3010", label: "" }],
  },
  {
    title: "일본 TOSHO사 파우더 사용",
    description: "일본 TOSHO사의 고품질 파우더를 사용해 안정적인 색상과 강도를 구현합니다.",
    images: [{ src: "/equipment/tosho.png", alt: "TOSHO 파우더", label: "" }],
  },
];

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function SectionEquipment() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const intervalRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused          = useRef(false);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef     = useRef<HTMLDivElement>(null);
  const touchStartX        = useRef(0);

  const slideTo = useCallback((index: number) => {
    if (containerRef.current)
      gsap.to(trackRef.current, { x: -index * containerRef.current.offsetWidth, duration: 0.55, ease: "power3.inOut" });
    if (mobileContainerRef.current)
      gsap.to(mobileTrackRef.current, { x: -index * mobileContainerRef.current.offsetWidth, duration: 0.55, ease: "power3.inOut" });
    setActive(index);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActive(prev => {
          const next = (prev + 1) % EQUIPMENT.length;
          if (containerRef.current)
            gsap.to(trackRef.current, { x: -next * containerRef.current.offsetWidth, duration: 0.55, ease: "power3.inOut" });
          if (mobileContainerRef.current)
            gsap.to(mobileTrackRef.current, { x: -next * mobileContainerRef.current.offsetWidth, duration: 0.55, ease: "power3.inOut" });
          return next;
        });
      }
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  return (
    <section className="bg-[#f5f5f5] py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            기공장비
          </h2>
          <p className="font-sans font-normal text-base md:text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            하이엔드 라인업 기공장비 구비
          </p>
        </div>

        {/* ── Desktop slider ── */}
        <div className="hidden md:flex flex-col gap-8 w-full max-w-[1000px]">

          {/* Track */}
          <div ref={containerRef} className="w-full overflow-hidden">
            <div ref={trackRef} className="flex">
              {EQUIPMENT.map((item) => (
                <div
                  key={item.title}
                  className="min-w-full flex flex-row items-center justify-between gap-12 h-[475px]"
                >
                  {/* Text */}
                  <div className="flex flex-col gap-3 flex-1">
                    <h3 className="font-sans font-medium text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                      {item.description}
                    </p>
                  </div>

                  {/* Image(s) */}
                  <div className="flex items-end justify-center gap-4 shrink-0 h-full">
                    {item.images.map((img) => (
                      <div key={img.src} className="flex flex-col items-center gap-2 h-full">
                        <img src={img.src} alt={img.alt} className="h-full w-auto object-contain" />
                        {img.label && (
                          <span className="font-sans font-normal text-sm text-[rgba(28,28,25,0.56)] tracking-[-0.03em]">
                            {img.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between w-full">
            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { slideTo(Math.max(active - 1, 0)); startAutoPlay(); }}
                disabled={active === 0}
                className="w-10 h-10 rounded-full border border-[rgba(28,28,25,0.12)] flex items-center justify-center text-[#1c1c19] disabled:opacity-30 transition-opacity hover:bg-[rgba(28,28,25,0.06)]"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => { slideTo(Math.min(active + 1, EQUIPMENT.length - 1)); startAutoPlay(); }}
                disabled={active === EQUIPMENT.length - 1}
                className="w-10 h-10 rounded-full border border-[rgba(28,28,25,0.12)] flex items-center justify-center text-[#1c1c19] disabled:opacity-30 transition-opacity hover:bg-[rgba(28,28,25,0.06)]"
              >
                <ArrowRight />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {EQUIPMENT.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { slideTo(i); startAutoPlay(); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-5 bg-[#1c1c19]" : "w-1.5 bg-[rgba(28,28,25,0.2)]"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="font-sans font-normal text-sm text-[rgba(28,28,25,0.4)] tracking-[-0.03em] tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(EQUIPMENT.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Mobile: swipeable slider ── */}
        <div className="md:hidden w-full flex flex-col gap-4">
          <div
            className="w-full overflow-hidden"
            onTouchStart={e => { isPaused.current = true; touchStartX.current = e.touches[0].clientX; gsap.killTweensOf(mobileTrackRef.current); }}
            onTouchMove={e => { if (!mobileContainerRef.current) return; gsap.set(mobileTrackRef.current, { x: -active * mobileContainerRef.current.offsetWidth + (e.touches[0].clientX - touchStartX.current) }); }}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              const next = dx < -50 ? Math.min(active + 1, EQUIPMENT.length - 1) : dx > 50 ? Math.max(active - 1, 0) : active;
              isPaused.current = false;
              if (mobileContainerRef.current) gsap.to(mobileTrackRef.current, { x: -next * mobileContainerRef.current.offsetWidth, duration: 0.45, ease: "power3.inOut" });
              setActive(next);
              startAutoPlay();
            }}
            ref={mobileContainerRef}
          >
            <div ref={mobileTrackRef} className="flex">
              {EQUIPMENT.map((item) => (
                <div key={item.title} className="min-w-full flex flex-col gap-6">
                  <div className="flex flex-col gap-2 text-center">
                    <h3 className="font-sans font-medium text-[18px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-center gap-4">
                    {item.images.map((img) => (
                      <div key={img.src} className="flex flex-col items-center gap-2">
                        <img src={img.src} alt={img.alt} className="h-40 w-auto object-contain" />
                        {img.label && (
                          <span className="font-sans font-normal text-sm text-[rgba(28,28,25,0.56)] tracking-[-0.03em]">
                            {img.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2">
            {EQUIPMENT.map((_, i) => (
              <button
                key={i}
                onClick={() => { slideTo(i); startAutoPlay(); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-5 bg-[#1c1c19]" : "w-1.5 bg-[rgba(28,28,25,0.2)]"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
