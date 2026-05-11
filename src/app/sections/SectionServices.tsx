"use client";

import React, { useRef } from "react";
import gsap from "gsap";

const SERVICES = [
  {
    title: "Crown",
    description: "자연치아에 가까운 컨택·마진·교합을 목표로 제작합니다.",
    desktopDescription: "자연치아에 가까운 컨택·마진·교합을\n목표로 제작합니다.",
    image: "/services/crown.jpg",
  },
  {
    title: "Implant",
    description: "케이스에 맞는 교합/에머전스/스크류홀 위치를 고려해 디자인합니다.",
    desktopDescription: "케이스에 맞는 교합/에머전스/스크류홀\n위치를 고려해 디자인합니다.",
    image: "/services/implant.jpg",
  },
  {
    title: "Denture",
    description: "전체/부분 덴쳐 케이스를 진행합니다. (단계별 피드백 기반)",
    desktopDescription: "전체/부분 덴쳐 케이스를 진행합니다.\n(단계별 피드백 기반)",
    image: "/services/denture.jpg",
  },
  {
    title: "Ortho",
    description: "교정 장치/모델 등 요청 스펙에 맞춰 제작합니다.",
    desktopDescription: "교정 장치/모델 등\n요청 스펙에 맞춰 제작합니다.",
    image: "/services/ortho.jpg",
  },
  {
    title: "Esthetic",
    description: "색/텍스처/형태 재현을 우선으로 심미 케이스를 제작합니다.",
    desktopDescription: "색/텍스처/형태 재현을 우선으로\n심미 케이스를 제작합니다.",
    image: "/services/esthetic.jpg",
  },
  {
    title: "Digital Modeless",
    description: "구강스캔 기반으로 모델리스 제작 흐름을 지원합니다.",
    desktopDescription: "구강스캔 기반으로 모델리스\n제작 흐름을 지원합니다.",
    image: "/services/digital-modeless.jpg",
  },
];

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const imgRef     = useRef<HTMLImageElement>(null);
  const tintRef    = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLParagraphElement>(null);

  const enter = () => {
    gsap.to(imgRef.current,  { scale: 1.07, duration: 0.6, ease: "power3.out" });
    gsap.to(tintRef.current, { opacity: 1,  duration: 0.35 });
    gsap.to(lineRef.current, { scaleX: 1,   duration: 0.45, ease: "power3.out" });
    gsap.to(titleRef.current, { y: -4, duration: 0.3, ease: "power2.out" });
  };

  const leave = () => {
    gsap.to(imgRef.current,  { scale: 1,    duration: 0.55, ease: "power3.out" });
    gsap.to(tintRef.current, { opacity: 0,  duration: 0.3  });
    gsap.to(lineRef.current, { scaleX: 0,   duration: 0.3,  ease: "power2.in" });
    gsap.to(titleRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="flex flex-col gap-4 md:flex-row md:items-center cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-24 md:h-[157px] md:flex-1 rounded-[10px] md:rounded-2xl overflow-hidden shrink-0">
        <img
          ref={imgRef}
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Golden tint overlay */}
        <div
          ref={tintRef}
          className="absolute inset-0 bg-[#ecc744]/20 pointer-events-none"
          style={{ opacity: 0 }}
        />
        {/* Gold sweep line */}
        <span
          ref={lineRef}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ecc744] origin-left pointer-events-none"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 md:flex-1 md:px-6">
        <p
          ref={titleRef}
          className="font-display text-base md:text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]"
        >
          {service.title}
        </p>
        <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
          <span className="md:hidden">{service.description}</span>
          <span className="hidden md:inline whitespace-pre-line">{service.desktopDescription}</span>
        </p>
      </div>
    </div>
  );
}

function CTAButton({ children }: { children: React.ReactNode }) {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#ecc744] h-12 px-6 rounded-xl flex items-center justify-center font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] w-full md:w-auto"
    >
      <span ref={fillRef} className="absolute inset-0 bg-[#f0c830]" style={{ transform: "translateX(-101%)" }} />
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
          <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
        </span>
      </span>
    </button>
  );
}

export default function SectionServices() {
  return (
    <section className="bg-[#f5f5f5] py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            서비스 소개
          </h2>
          <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            강냉이 기공소는 최상의 치과 보철물을 만들기 위해 끊임없이 노력합니다.<br />
            최첨단 기계설비와 청결한 제조환경으로 최상의 결과물을 만듭니다.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 w-full">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <CTAButton>케이스 의뢰 하기</CTAButton>

      </div>
    </section>
  );
}
