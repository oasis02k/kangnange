const SERVICES = [
  {
    title: "Crown",
    description: "자연치아에 가까운 컨택·마진·교합을 목표로 제작합니다.",
    image: "/services/crown.jpg",
  },
  {
    title: "Implant",
    description: "케이스에 맞는 교합/에머전스/스크류홀 위치를 고려해 디자인합니다.",
    image: "/services/implant.jpg",
  },
  {
    title: "Denture",
    description: "전체/부분 덴쳐 케이스를 진행합니다. (단계별 피드백 기반)",
    image: "/services/denture.jpg",
  },
  {
    title: "Ortho",
    description: "교정 장치/모델 등 요청 스펙에 맞춰 제작합니다.",
    image: "/services/ortho.jpg",
  },
  {
    title: "Esthetic",
    description: "색/텍스처/형태 재현을 우선으로 심미 케이스를 제작합니다.",
    image: "/services/esthetic.jpg",
  },
  {
    title: "Digital Modeless",
    description: "구강스캔 기반으로 모델리스 제작 흐름을 지원합니다.",
    image: "/services/digital-modeless.jpg",
  },
];

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
            <div key={service.title} className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Image */}
              <div className="relative h-24 md:h-[157px] md:flex-1 rounded-[10px] md:rounded-2xl overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col gap-2 md:flex-1 md:px-6">
                <p className="font-display text-base md:text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                  {service.title}
                </p>
                <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
