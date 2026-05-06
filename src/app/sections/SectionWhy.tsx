"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BODY_TEXT =
  "강냉이.com은 CAD/CAM 기반으로 작업하는 디지털 기공소입니다. 10년 동안 구강스캔을 활용한 모델리스 보철을 10,000건 이상 제작해왔고, 풀케이스부터 인레이, 심미 보철까지 좋은 적합도를 만드는 노하우를 갖추고 있습니다. 치과와의 소통을 가장 중요하게 생각하며, 더 좋은 결과를 위해 매 케이스 최선을 다합니다.";

export default function SectionWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = BODY_TEXT.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const validWords = wordRefs.current.filter(Boolean);

      gsap.fromTo(
        validWords,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1c1c19] flex flex-col items-center justify-center text-center gap-12 px-5 md:px-8 py-8 md:py-24 min-h-[800px]"
    >
      {/* Title */}
      <h2 className="font-display text-[32px] md:text-[56px] text-white tracking-[-0.03em] leading-[1.2] w-full">
        Why 강냉이.com
      </h2>

      {/* Scrubbed body text — words light up as you scroll */}
      <p className="font-sans font-medium text-[20px] md:text-[32px] leading-[1.6] tracking-[-0.03em] w-full">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
