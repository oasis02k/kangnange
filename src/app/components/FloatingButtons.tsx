"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const ReceiptIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 2V14L5.5 12.75L8 14L10.5 12.75L12.5 14V2H3.5Z" />
    <line x1="6" y1="6" x2="10" y2="6" />
    <line x1="6" y1="8.5" x2="10" y2="8.5" />
  </svg>
);

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 5.5L8 2.5L14 5.5V11L8 14L2 11V5.5Z" />
    <path d="M2 5.5L8 8.5L14 5.5" />
    <line x1="8" y1="8.5" x2="8" y2="14" />
  </svg>
);

function FloatBtn({ children, href, variant = "primary", icon }: {
  children: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}) {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const isPrimary = variant === "primary";

  const enter = () => {
    gsap.timeline()
      .to(arrowRef.current,  { x: "130%", duration: 0.18, ease: "power2.in" })
      .set(arrowRef.current, { x: "-130%" })
      .to(arrowRef.current,  { x: "0%",   duration: 0.22, ease: "power2.out" });
  };

  if (isPrimary) {
    return (
      <a
        href={href}
        onMouseEnter={enter}
        className="flex items-center gap-2 h-14 px-7 rounded-full font-sans font-semibold text-base tracking-[-0.02em] bg-[#ecc744] hover:bg-[#E3BA27] transition-colors text-[#1c1c19] shadow-lg"
      >
        {icon}
        {children}
        <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
          <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      onMouseEnter={enter}
      className="flex items-center gap-2 h-14 px-7 rounded-full font-sans font-semibold text-base tracking-[-0.02em] bg-white text-[#1c1c19] shadow-lg"
    >
      {icon}
      {children}
      <span className="relative overflow-hidden inline-flex" style={{ width: "0.9em", height: "1.1em" }}>
        <span ref={arrowRef} className="absolute inset-0 flex items-center justify-center">→</span>
      </span>
    </a>
  );
}

export default function FloatingButtons() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isStudio = pathname.startsWith("/studio");

  useEffect(() => {
    if (isStudio) return;

    const isDesktop = () => window.innerWidth >= 768;

    if (isDesktop()) {
      setVisible(true);
      return;
    }

    const workflow = document.getElementById("workflow");
    if (!workflow) return;

    const check = () => {
      const rect = workflow.getBoundingClientRect();
      setVisible(rect.top + rect.height / 2 <= window.innerHeight);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });

    const onResize = () => { if (isDesktop()) setVisible(true); };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", onResize);
    };
  }, [isStudio]);

  if (isStudio) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <FloatBtn href="/contact?inquiry=수가문의" variant="secondary" icon={<ReceiptIcon />}>수가문의</FloatBtn>
      <FloatBtn href="/contact?inquiry=샘플신청" icon={<BoxIcon />}>샘플신청</FloatBtn>
    </div>
  );
}
