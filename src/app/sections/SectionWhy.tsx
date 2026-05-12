"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DESKTOP_LINES = [
  "강냉이.com은 CAD/CAM 기반으로 작업하는 디지털 기공소입니다.",
  "10년 동안 구강스캔을 활용한 모델리스 보철을 10,000건 이상 제작해왔고,",
  "풀케이스부터 인레이, 심미 보철까지 좋은 적합도를 만드는 노하우를 갖추고 있습니다.",
  "치과와의 소통을 가장 중요하게 생각하며, 더 좋은 결과를 위해 매 케이스 최선을 다합니다.",
];

const TABLET_LINES = [
  "강냉이.com은 CAD/CAM 기반으로",
  "작업하는 디지털 기공소입니다.",
  "10년 동안 구강스캔을 활용한 모델리스 보철을",
  "10,000건 이상 제작해왔고,",
  "풀케이스부터 인레이, 심미 보철까지",
  "좋은 적합도를 만드는 노하우를 갖추고 있습니다.",
  "치과와의 소통을 가장 중요하게 생각하며,",
  "더 좋은 결과를 위해 매 케이스 최선을 다합니다.",
];

const MOBILE_LINES = [
  "강냉이.com은 CAD/CAM 기반으로",
  "작업하는 디지털 기공소입니다.",
  "10년 동안 구강스캔을 활용한 모델리스",
  "보철을 10,000건 이상 제작해왔고,",
  "풀케이스부터 인레이, 심미 보철까지",
  "좋은 적합도를 만드는",
  "노하우를 갖추고 있습니다.",
  "치과와의 소통을 가장 중요하게 생각하며,",
  "더 좋은 결과를 위해",
  "매 케이스 최선을 다합니다.",
];

function buildWordSpans(lines: string[], attr: string) {
  return lines.map((line, li) => (
    <span key={li}>
      {line.split(" ").map((word, wi, arr) => (
        <span
          key={wi}
          {...{ [attr]: "true" }}
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {word}{wi < arr.length - 1 ? " " : ""}
        </span>
      ))}
      {li < lines.length - 1 && <br />}
    </span>
  ));
}

export default function SectionWhy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const onRefreshInit = () => {
      if (!sectionRef.current) return;
      gsap.set(sectionRef.current, { clearProps: "width" });
      const parent = sectionRef.current.parentElement;
      if (parent?.classList.contains("pin-spacer")) {
        gsap.set(parent, { clearProps: "width" });
      }
    };
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };
    window.addEventListener("resize", handleResize);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 810px) and (max-width: 1023px)", () => {
      const words = sectionRef.current!.querySelectorAll("[data-tablet-word]");
      gsap.fromTo(
        words,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2500",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    mm.add("(min-width: 1024px)", () => {
      const words = sectionRef.current!.querySelectorAll("[data-desktop-word]");
      gsap.fromTo(
        words,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2500",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    mm.add("(max-width: 809px)", () => {
      const words = sectionRef.current!.querySelectorAll("[data-mobile-word]");
      gsap.fromTo(
        words,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2500",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1c1c19] flex flex-col items-center justify-center min-h-screen px-5 tablet:px-8"
    >
      <div className="flex flex-col gap-12 text-center w-full max-w-[1440px] mx-auto">
        <h2 className="font-display text-[32px] tablet:text-[56px] text-[#ecc744] tracking-[-0.03em] leading-[1.2] w-full">
          Why 강냉이.com
        </h2>

        {/* Desktop */}
        <p className="hidden lg:block font-sans font-medium text-[32px] leading-[1.6] tracking-[-0.03em] w-full">
          {buildWordSpans(DESKTOP_LINES, "data-desktop-word")}
        </p>

        {/* Tablet */}
        <p className="hidden tablet:block lg:hidden font-sans font-medium text-[32px] leading-[1.6] tracking-[-0.03em] w-full">
          {buildWordSpans(TABLET_LINES, "data-tablet-word")}
        </p>

        {/* Mobile */}
        <p className="tablet:hidden font-sans font-medium text-[20px] leading-[1.6] tracking-[-0.03em] w-full">
          {buildWordSpans(MOBILE_LINES, "data-mobile-word")}
        </p>
      </div>
    </section>
  );
}
