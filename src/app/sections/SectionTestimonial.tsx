"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const SLIDE_GAP = 16;
const INTERVAL_MS = 2800;

const REVIEWS = [
  {
    title: '”좋은 치료는 좋은 기공물에서\n완성된다고 생각합니다.”',
    body: "좋은 치료는 좋은 기공물에서 완성된다고 생각합니다. 늘 기공물의 완성도와 환자를 먼저 생각하는 마음으로 노력하시는 만큼 앞으로의 더 큰 발전과 번창을 진심으로 응원합니다.",
    businessName: "청담세브란스치과",
    name: "권혁준",
  },
  {
    title: "'아날로그와 디지털 모두 잘 소화해 내는 기공역량.'",
    body: "강신일 소장님의 뛰어난 센스와 근면성실함 때문에 오랜 세월 믿고 거래해 왔습니다. 아날로그와 디지털 모두 잘 소화해 내는 기공역량을 갖추고 있을 뿐 아니라 항상 잘 소통하고 노력하는 모습이 맘에 듭니다. 앞으로도 계속 믿고 거래할 수 있는 기공소라 생각되어 다른 분께 추천드립니다.",
    businessName: "예원부부치과",
    name: "오충원 원장",
  },
  {
    title: "'임상에서의 요구를 잘 이해하고 소통이\n원활해 더욱 믿고 맡길 수 있습니다.'",
    body: "심미보철을 위해 찾게 된 기공소입니다. 처음 거래했을 때 느꼈던 성실함과 책임감을 지금까지도 변함없이 지켜오고 있습니다. 작은 디테일까지 놓치지 않고 정성껏 보철물을 제작해 주며, 임상에서의 요구를 잘 이해하고 소통이 원활해 더욱 믿고 맡길 수 있습니다.",
    businessName: "소나무치과",
    name: "김상준",
  },
];

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#ecc744" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col gap-4 md:gap-6 flex-1">
      <p className="font-sans font-bold text-base md:text-[20px] text-[#1c1c19] tracking-[-0.03em] leading-[1.3] whitespace-pre-wrap">
        {review.title}
      </p>
      <p className="font-sans font-normal text-sm md:text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4] flex-1">
        {review.body}
      </p>
      <div className="flex items-end justify-between w-full">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-[#cdd8f5] overflow-hidden relative shrink-0">
            <img
              src="/testimonials/dentist.svg"
              alt=""
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[31px]"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm md:text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4]">
            <span className="font-medium">{review.businessName}</span>
            <span className="font-normal">{review.name}</span>
          </div>
        </div>
        <div className="flex shrink-0 ml-2">
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default function SectionTestimonial() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const touchStartX  = useRef(0);
  const isPaused     = useRef(false);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideWidth = () =>
    containerRef.current ? containerRef.current.offsetWidth + SLIDE_GAP : 0;

  const snapTo = useCallback((index: number) => {
    gsap.to(trackRef.current, {
      x: -index * slideWidth(),
      duration: 0.45,
      ease: "power3.inOut",
    });
    setActive(index);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActive(prev => {
          const next = (prev + 1) % REVIEWS.length;
          gsap.to(trackRef.current, {
            x: -next * slideWidth(),
            duration: 0.5,
            ease: "power3.inOut",
          });
          return next;
        });
      }
    }, INTERVAL_MS);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

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
    if (dx < -50) snapTo(Math.min(active + 1, REVIEWS.length - 1));
    else if (dx > 50) snapTo(Math.max(active - 1, 0));
    else snapTo(active);
    startAutoPlay();
  };

  return (
    <section className="bg-[#f5f5f5] py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            항상 최선을 다합니다
          </h2>
          <p className="font-sans font-normal text-base md:text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            함께한 치과의 이야기
          </p>
        </div>

        {/* Desktop: row of cards */}
        <div className="hidden md:flex md:items-stretch gap-6 w-full">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
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
              {REVIEWS.map((review) => (
                <div key={review.name} className="min-w-full">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
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
