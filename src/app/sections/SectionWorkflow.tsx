"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const STEPS = [
  {
    step: 1,
    title: "케이스 접수",
    description: "스캔(STL) / 처방 / 쉐이드 / 참고 사진을 전달",
    tabletDescription: "스캔(STL) / 처방 / 쉐이드 / 참고\n사진을 전달합니다.",
    image: "/workflow/step1.jpg",
  },
  {
    step: 2,
    title: "검토 & 일정 안내",
    description: "난이도/재료/납기 확인 후 제작 일정 공유",
    tabletDescription: "난이도/재료/납기 확인 후\n제작 일정 공유",
    image: "/workflow/step2.jpg",
  },
  {
    step: 3,
    title: "디자인 & 제작",
    description: "CAD 디자인 → 제작/가공 → 마감",
    tabletDescription: "CAD 디자인 →\n제작/가공 → 마감",
    image: "/workflow/step3.jpg",
  },
  {
    step: 4,
    title: "검수 & 출고",
    description: "최종 체크 후 배송/전달",
    tabletDescription: "최종 체크 후\n배송/전달",
    image: "/workflow/step4.jpg",
  },
];

function FlowPill() {
  const a1 = useRef<HTMLSpanElement>(null);
  const a2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t1 = gsap.fromTo(a1.current, { x: -4 }, { x: 4, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    const t2 = gsap.fromTo(a2.current, { x: -4 }, { x: 4, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.4 });
    return () => { t1.kill(); t2.kill(); };
  }, []);

  return (
    <div className="bg-[#f0f0f0] flex items-center justify-center gap-6 tablet:gap-12 px-6 tablet:px-12 py-4 tablet:py-6 rounded-full w-full tablet:w-auto">
      <span className="font-sans font-medium text-[20px] tablet:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">의뢰</span>
      <span ref={a1} className="font-sans font-bold text-2xl text-[#1c1c19] leading-[1.2]">→</span>
      <span className="font-sans font-medium text-[20px] tablet:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">제작</span>
      <span ref={a2} className="font-sans font-bold text-2xl text-[#1c1c19] leading-[1.2]">→</span>
      <span className="font-sans font-medium text-[20px] tablet:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">배송</span>
    </div>
  );
}

const INTERVAL_MS = 2500;

export default function SectionWorkflow() {
  const [active, setActive] = useState(0);
  const isPaused    = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* desktop image wrapper refs for GSAP padding/radius */
  const imgWrapperRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const imgInnerRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const skipFirstImgEffect = useRef(true);

  /* mobile slider refs */
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);

  const slideWidth = () => cardRef.current ? cardRef.current.offsetWidth + 16 : 0;

  /* ── auto-rotate ─────────────────────────────── */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) setActive(prev => (prev + 1) % STEPS.length);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  /* ── desktop: set initial padding/radius before first paint ── */
  useLayoutEffect(() => {
    STEPS.forEach((_, i) => {
      const wrapper = imgWrapperRefs.current[i];
      const inner   = imgInnerRefs.current[i];
      if (!wrapper || !inner) return;
      gsap.set(wrapper, { padding: i === 0 ? 0 : 16 });
      gsap.set(inner,   { borderRadius: i === 0 ? 0 : 16 });
    });
  }, []);

  /* ── desktop: GSAP image padding/radius on active change ── */
  useEffect(() => {
    if (skipFirstImgEffect.current) { skipFirstImgEffect.current = false; return; }
    STEPS.forEach((_, i) => {
      const wrapper = imgWrapperRefs.current[i];
      const inner   = imgInnerRefs.current[i];
      if (!wrapper || !inner) return;
      if (i === active) {
        gsap.to(wrapper, { padding: 0,  duration: 0.45, ease: "power3.out" });
        gsap.to(inner,   { borderRadius: 0,  duration: 0.45, ease: "power3.out" });
      } else {
        gsap.set(wrapper, { padding: 16 });
        gsap.set(inner,   { borderRadius: 16 });
      }
    });
  }, [active]);

  /* ── mobile: GSAP slide on active change ─────── */
  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      x: -active * slideWidth(),
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── touch handlers ──────────────────────────── */
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
    let next = active;
    if (dx < -50) next = Math.min(active + 1, STEPS.length - 1);
    else if (dx > 50) next = Math.max(active - 1, 0);

    isPaused.current = false;

    if (next !== active) {
      setActive(next);
    } else {
      gsap.to(trackRef.current, { x: -active * slideWidth(), duration: 0.3, ease: "power2.out" });
    }

    startAutoPlay();
  };

  return (
    <section id="workflow" className="bg-white py-8 tablet:py-24 px-5 tablet:px-8">
      <div className="flex flex-col gap-6 tablet:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 tablet:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] tablet:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            워크플로우
          </h2>
          <p className="font-sans font-normal text-base tablet:text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            어떻게 의뢰하나요?
          </p>
        </div>

        {/* Flow pill */}
        <FlowPill />

        {/* ── Desktop: 4 columns ── */}
        <div
          className="hidden lg:flex items-start w-full h-[376px]"
          onMouseLeave={() => { setActive(-1); isPaused.current = false; startAutoPlay(); }}
        >
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <div
                key={step.step}
                onMouseEnter={() => { isPaused.current = true; setActive(i); }}
                className="flex flex-col gap-6 flex-1 h-full cursor-pointer"
              >
                <span
                  className={`self-start inline-flex items-center justify-center px-4 py-2 rounded-lg font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4] whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "bg-[#ecc744]"
                      : "bg-white border border-[rgba(28,28,25,0.12)]"
                  }`}
                >
                  Step {step.step}
                </span>

                <div className="flex flex-col gap-4 py-4 flex-1 min-h-0 border-l border-[rgba(28,28,25,0.12)]">
                  <div className="flex flex-col gap-4 px-4">
                    <h3 className="font-sans font-bold text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                      {step.title}
                    </h3>
                    <p className="font-sans font-medium text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                      {step.description}
                    </p>
                  </div>
                  <div
                    ref={el => { imgWrapperRefs.current[i] = el; }}
                    className="h-[199px] shrink-0"
                  >
                    <div
                      ref={el => { imgInnerRefs.current[i] = el; }}
                      className="relative w-full h-full overflow-hidden"
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Tablet: 2×2 grid ── */}
        <div
          className="hidden tablet:grid lg:hidden grid-cols-2 w-full"
          onMouseLeave={() => { setActive(-1); isPaused.current = false; startAutoPlay(); }}
        >
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <div
                key={step.step}
                onMouseEnter={() => { isPaused.current = true; setActive(i); }}
                className={`flex flex-col gap-6 cursor-pointer ${isActive ? "h-[376px]" : "self-start"}`}
              >
                <span
                  className={`self-start inline-flex items-center justify-center px-4 py-2 rounded-lg font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4] whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "bg-[#ecc744]"
                      : "bg-white border border-[rgba(28,28,25,0.12)]"
                  }`}
                >
                  Step {step.step}
                </span>

                <div className={`flex flex-col gap-4 py-4 border-l border-[rgba(28,28,25,0.12)] ${isActive ? "flex-1 min-h-0" : ""}`}>
                  <div className="flex flex-col gap-4 px-4">
                    <h3 className="font-sans font-bold text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                      {step.title}
                    </h3>
                    <p className="font-sans font-medium text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4] whitespace-pre-line">
                      {step.tabletDescription}
                    </p>
                  </div>
                  {isActive ? (
                    <div className="flex-1 min-h-0 relative overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-[199px] p-4 flex flex-col">
                      <div className="relative flex-1 overflow-hidden rounded-2xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: swipeable slider ── */}
        <div className="tablet:hidden w-full flex flex-col gap-4">
          <div
            ref={containerRef}
            className="w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div ref={trackRef} className="flex gap-4">
              {STEPS.map((step, i) => (
                <div key={step.step} ref={i === 0 ? cardRef : undefined} className="grow-0 shrink-0 basis-full max-w-[380px] flex flex-col gap-4">
                  <span className="self-start inline-flex items-center justify-center px-4 py-2 rounded-lg font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4] whitespace-nowrap bg-[#ecc744]">
                    Step {step.step}
                  </span>

                  <div className="border-l border-[rgba(28,28,25,0.12)] flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-4 px-4">
                      <h3 className="font-sans font-bold text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                        {step.title}
                      </h3>
                      <p className="font-sans font-medium text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                        {step.description}
                      </p>
                    </div>
                    <div className="h-[199px] relative overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); startAutoPlay(); }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  active === i ? "w-5 bg-[#1c1c19]" : "w-1.5 bg-[rgba(28,28,25,0.2)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="bg-[#f5f5f5] px-4 py-1.5 rounded-full w-full tablet:w-auto">
          <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.2] text-center whitespace-nowrap">
            *처음 거래라면 테스트 케이스/샘플링 가능
          </p>
        </div>

      </div>
    </section>
  );
}
