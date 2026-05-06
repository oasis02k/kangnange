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

export default function SectionEquipment() {
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

        {/* Equipment list */}
        <div className="flex flex-col gap-12 md:gap-16 w-full max-w-[1000px]">
          {EQUIPMENT.map((item) => (
            <div
              key={item.title}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12"
            >
              {/* Text */}
              <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left md:flex-1">
                <h3 className="font-sans font-medium text-[18px] md:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                  {item.title}
                </h3>
                <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                  {item.description}
                </p>
              </div>

              {/* Image(s) */}
              <div className="flex items-end justify-center gap-4 shrink-0">
                {item.images.map((img) => (
                  <div key={img.src} className="flex flex-col items-center gap-2">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-40 md:h-52 w-auto object-contain"
                    />
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
    </section>
  );
}
