"use client";

import { useEffect } from "react";
import Navbar, { CTAButton } from "./components/Navbar";
import SectionWhy from "./sections/SectionWhy";
import SectionServices from "./sections/SectionServices";
import SectionWorkflow from "./sections/SectionWorkflow";
import SectionTestimonial from "./sections/SectionTestimonial";
import SectionCases from "./sections/SectionCases";
import SectionEquipment from "./sections/SectionEquipment";
import SectionContact from "./sections/SectionContact";
import Footer from "./sections/Footer";

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      const el = document.getElementById(target);
      if (el) {
        const offset = window.innerWidth >= 810 ? 80 : 32;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "instant" });
      }
    }
  }, []);

  return (
    <>
      <Navbar />

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

        {/* Hero content */}
        <div className="relative z-10 flex flex-col gap-4 px-5 md:px-8 pb-8 md:pb-24">
          <h1 className="font-display text-[28px] md:text-[56px] text-[#f5f5f5] tracking-[-0.03em] leading-[1.2] whitespace-pre-wrap">
            <span className="lg:hidden">{"스캔 데이터 기반, 적합도와\n품질로 신뢰받는 기공소"}</span>
            <span className="hidden lg:inline">{"스캔 데이터 기반,\n적합도와 품질로 신뢰받는 기공소"}</span>
          </h1>
          <p className="font-sans font-normal text-base md:text-[18px] text-white tracking-[-0.03em] leading-[1.4]">
            <span className="md:hidden whitespace-pre-line">{"구강스캐너 데이터 기반으로\n모델리스 제작을 지원합니다."}</span>
            <span className="hidden md:inline">구강스캐너 데이터 기반으로 모델리스 제작을 지원합니다.</span>
          </p>
          <a href="/contact?inquiry=케이스 의뢰하기" className="mt-2 w-full md:w-[215px]">
            <CTAButton className="w-full h-12">
              케이스 의뢰 하기
            </CTAButton>
          </a>
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
