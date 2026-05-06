const STEPS = [
  {
    step: 1,
    title: "케이스 접수",
    description: "스캔(STL) / 처방 / 쉐이드 / 참고 사진을 전달합니다.",
    image: "/workflow/step1.jpg",
  },
  {
    step: 2,
    title: "검토 & 일정 안내",
    description: "난이도/재료/납기 확인 후 제작 일정 공유",
    image: "/workflow/step2.jpg",
  },
  {
    step: 3,
    title: "디자인 & 제작",
    description: "CAD 디자인 → 제작/가공 → 마감",
    image: "/workflow/step3.jpg",
  },
  {
    step: 4,
    title: "검수 & 출고",
    description: "최종 체크 후 배송/전달",
    image: "/workflow/step4.jpg",
  },
];

export default function SectionWorkflow() {
  return (
    <section className="bg-white py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            워크플로우
          </h2>
          <p className="font-sans font-normal text-base md:text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
            어떻게 의뢰하나요?
          </p>
        </div>

        {/* Flow pill */}
        <div className="bg-[#ecc744] flex items-center justify-center gap-6 md:gap-12 px-6 md:px-12 py-4 md:py-6 rounded-full w-full md:w-auto">
          <span className="font-sans font-medium text-[20px] md:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">의뢰</span>
          <span className="font-sans font-bold text-2xl text-[#1c1c19] leading-[1.2]">→</span>
          <span className="font-sans font-medium text-[20px] md:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">제작</span>
          <span className="font-sans font-bold text-2xl text-[#1c1c19] leading-[1.2]">→</span>
          <span className="font-sans font-medium text-[20px] md:text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">배송</span>
        </div>

        {/* Process cards */}
        <div className="flex flex-col md:flex-row md:items-start w-full">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className={`flex flex-col gap-6 flex-1 ${step.step === 1 ? "h-[376px]" : ""}`}
            >
              {/* Step badge */}
              <span
                className={`self-start inline-flex items-center justify-center px-4 py-2 rounded-lg font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4] whitespace-nowrap ${
                  step.step === 1
                    ? "bg-[#ecc744]"
                    : "bg-white border border-[rgba(28,28,25,0.12)]"
                }`}
              >
                Step {step.step}
              </span>

              {/* Content */}
              <div
                className={`border-l border-[rgba(28,28,25,0.12)] flex flex-col gap-4 py-4 ${
                  step.step === 1 ? "flex-1 min-h-0 overflow-hidden" : ""
                }`}
              >
                <div className="flex flex-col gap-4 px-4">
                  <h3 className="font-sans font-bold text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                    {step.title}
                  </h3>
                  <p className="font-sans font-medium text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                    {step.description}
                  </p>
                </div>

                {step.step === 1 ? (
                  <div className="flex-1 relative overflow-hidden min-h-0">
                    <img
                      src={step.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[199px] p-4">
                    <div className="relative rounded-2xl overflow-hidden w-full h-full">
                      <img
                        src={step.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="bg-[#f5f5f5] px-4 py-1.5 rounded-full w-full md:w-auto">
          <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.2] text-center whitespace-nowrap">
            *처음 거래라면 테스트 케이스/샘플링 가능
          </p>
        </div>

      </div>
    </section>
  );
}
