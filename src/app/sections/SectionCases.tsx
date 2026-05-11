"use client";

import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import gsap from "gsap";

const INTERVAL_MS = 3000;

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

function CaseCard({
  title,
  description,
  before,
  after,
}: {
  title: string;
  description: string;
  before: string;
  after: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const afterImgRef  = useRef<HTMLImageElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);

  useLayoutEffect(() => {
    gsap.set(afterImgRef.current,  { clipPath: "inset(0 50% 0 0)" });
    gsap.set(dividerRef.current,   { xPercent: -50, left: "50%" });
  }, []);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.max(1, Math.min(99, ((clientX - left) / width) * 100));
    gsap.set(afterImgRef.current, { clipPath: `inset(0 ${100 - pct}% 0 0)` });
    gsap.set(dividerRef.current,  { left: `${pct}%` });
  };

  /* ── mouse ─────────────────────────────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    updatePos(e.clientX);

    const onMove = (e: MouseEvent) => { if (isDragging.current) updatePos(e.clientX); };
    const onUp   = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",   onUp);
  };

  /* ── touch (stopPropagation keeps card-swipe from firing on image) ── */
  const onTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    isDragging.current = true;
    updatePos(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (isDragging.current) updatePos(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl flex-1">
      {/* Comparison image area */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative h-40 md:h-auto md:aspect-[770/410] overflow-hidden shrink-0 select-none cursor-ew-resize"
      >
        {/* Before (base) */}
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

        {/* After (clipped) */}
        <img
          ref={afterImgRef}
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />

        {/* Before / After labels */}
        <span className="absolute bottom-3 left-3 font-sans font-medium text-xs text-white bg-black/40 px-2 py-1 rounded-full pointer-events-none">
          Before
        </span>
        <span className="absolute bottom-3 right-3 font-sans font-medium text-xs text-white bg-black/40 px-2 py-1 rounded-full pointer-events-none">
          After
        </span>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="absolute inset-y-0 pointer-events-none"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {/* Vertical line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/80" />

          {/* Handle — original pill UI */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1c1c19] flex items-center gap-2 p-1.5 rounded-full shadow-md">
            <span className="bg-[#ecc744] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6L6 11" stroke="#1c1c19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="bg-[#ecc744] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="#1c1c19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="bg-[#f5f5f5] flex flex-col gap-4 p-4 md:p-6 flex-1">
        <h3 className="font-sans font-bold text-base md:text-[20px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
          {title}
        </h3>
        <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
          {description}
        </p>
      </div>
    </div>
  );
}

function CasesLink() {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.timeline()
      .to(arrowRef.current,  { x: "130%", duration: 0.18, ease: "power2.in" })
      .set(arrowRef.current, { x: "-130%" })
      .to(arrowRef.current,  { x: "0%",   duration: 0.22, ease: "power2.out" });
  };

  return (
    <a
      href="/cases"
      onMouseEnter={handleMouseEnter}
      className="bg-[#ecc744] hover:bg-[#E3BA27] transition-colors h-12 px-6 rounded-xl flex items-center justify-center gap-1.5 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] w-full md:w-auto cursor-pointer"
    >
      제작 케이스 보러가기
      <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
        <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
      </span>
    </a>
  );
}

const SLIDE_GAP = 16;

export default function SectionCases() {
  const [active, setActive]  = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);
  const isPaused     = useRef(false);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideWidth = () =>
    containerRef.current ? containerRef.current.offsetWidth + SLIDE_GAP : 0;

  const snapTo = (index: number) => {
    gsap.to(trackRef.current, { x: -index * slideWidth(), duration: 0.45, ease: "power3.inOut" });
    setActive(index);
  };

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current)
        setActive(prev => (prev + 1) % CASES.length);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  useEffect(() => {
    gsap.to(trackRef.current, { x: -active * slideWidth(), duration: 0.45, ease: "power3.inOut" });
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isPaused.current = true;
    gsap.killTweensOf(trackRef.current);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    gsap.set(trackRef.current, { x: -active * slideWidth() + dx });
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    isPaused.current = false;
    if (dx < -50) snapTo(Math.min(active + 1, CASES.length - 1));
    else if (dx > 50) snapTo(Math.max(active - 1, 0));
    else snapTo(active);
    startAutoPlay();
  };

  return (
    <section id="cases" className="bg-white py-8 md:py-24 px-5 md:px-8">
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

        {/* Desktop: row */}
        <div className="hidden md:flex gap-6 w-full">
          {CASES.map((c) => <CaseCard key={c.title} {...c} />)}
        </div>

        {/* Mobile: swipeable slider */}
        <div className="md:hidden w-full flex flex-col gap-4">
          <div
            ref={containerRef}
            className="w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div ref={trackRef} className="flex items-stretch gap-4">
              {CASES.map((c) => (
                <div key={c.title} className="min-w-full">
                  <CaseCard {...c} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2">
            {CASES.map((_, i) => (
              <button
                key={i}
                onClick={() => { snapTo(i); startAutoPlay(); }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  active === i ? "w-5 bg-[#1c1c19]" : "w-1.5 bg-[rgba(28,28,25,0.2)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <CasesLink />

      </div>
    </section>
  );
}
