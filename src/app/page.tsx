"use client";

import { useState } from "react";

const A = {
  // Services
  crown:   "https://www.figma.com/api/mcp/asset/cd13e276-7d49-4970-9f27-b8b1217ab9aa",
  implant: "https://www.figma.com/api/mcp/asset/123735a1-99ee-4870-a609-c22780884c18",
  denture: "https://www.figma.com/api/mcp/asset/0bd629d8-1e27-4d60-8ee4-c01dd2c03328",
  ortho:   "https://www.figma.com/api/mcp/asset/b5bb01f5-9d56-44fa-a2fa-f3e639fe4c3d",
  esthetic:"https://www.figma.com/api/mcp/asset/10cbf855-9183-4b37-9934-abcd91aec6b3",
  digital: "https://www.figma.com/api/mcp/asset/d5686201-4839-4917-be32-e1613e68662a",
  // Workflow
  wf1: "https://www.figma.com/api/mcp/asset/b82ecb9a-4d7c-49c0-8d3f-3cfd217ebcb2",
  wf2: "https://www.figma.com/api/mcp/asset/8908a6b8-61df-47e0-a3a7-87c5acb44d2c",
  wf3: "https://www.figma.com/api/mcp/asset/b9701c30-3af3-4a35-87c1-dba997c3cb33",
  wf4: "https://www.figma.com/api/mcp/asset/0b4bdd5a-4653-4609-afac-3cccb12da882",
  // Cases
  c1b: "https://www.figma.com/api/mcp/asset/9434e045-ab8e-499c-857d-0141447fcc41",
  c1a: "https://www.figma.com/api/mcp/asset/32d7b1a1-ccba-4c09-800c-2bd7995525ca",
  c2b: "https://www.figma.com/api/mcp/asset/f4370fe9-a1bd-4e99-be01-f82e82d8d060",
  c2a: "https://www.figma.com/api/mcp/asset/b187b399-e44b-4039-ba81-3e2ba8419c48",
  c3b: "https://www.figma.com/api/mcp/asset/2adf96b2-0b24-4eda-893a-2ed1e766c11d",
  c3a: "https://www.figma.com/api/mcp/asset/d545b436-0d02-47b9-b430-668868fc4bc2",
  // Equipment
  dwx:   "https://www.figma.com/api/mcp/asset/8e10dfd4-c9ee-4da5-8d0e-5ae4476c337c",
  atlas: "https://www.figma.com/api/mcp/asset/dd839e98-835e-462e-a635-41ebc8069b90",
  p1:    "https://www.figma.com/api/mcp/asset/d222b1e6-e914-4463-a9e1-0b3adfaa75af",
  p2:    "https://www.figma.com/api/mcp/asset/c3185a88-75d8-4e17-b602-20e9c25b92be",
  ep:    "https://www.figma.com/api/mcp/asset/a1998750-e99f-4f4f-90e0-01b636730da9",
  tosho: "https://www.figma.com/api/mcp/asset/52c8fdf1-d378-4fc1-834a-58a69a818462",
  // Misc
  contactBg:  "https://www.figma.com/api/mcp/asset/55d98c75-38ce-49f5-b3e1-7db7b035e0bc",
  footerLogo: "https://www.figma.com/api/mcp/asset/ba35f30b-430b-4f54-8c5d-b8b2323a76ff",
  dentist:    "https://www.figma.com/api/mcp/asset/64249ba7-9b93-4ede-8934-2a85029402c6",
  arrow:      "https://www.figma.com/api/mcp/asset/f67f9de0-f7cf-45c3-8011-7fec6802f6c0",
  chevronL:   "https://www.figma.com/api/mcp/asset/962dd669-2806-4cd2-912b-fc2b8945ce70",
  chevronR:   "https://www.figma.com/api/mcp/asset/8084eac1-cbd3-40bf-ad97-687af1f3070c",
};

const SERVICES = [
  { title: "Crown",           desc: "자연치아에 가까운 컨택·마진·교합을\n목표로 제작합니다.",             img: A.crown   },
  { title: "Implant",         desc: "케이스에 맞는 교합/에머전스/스크류홀\n위치를 고려해 디자인합니다.",    img: A.implant },
  { title: "Denture",         desc: "전체/부분 덴쳐 케이스를 진행합니다.\n(단계별 피드백 기반)",           img: A.denture },
  { title: "Ortho",           desc: "교정 장치/모델 등 요청\n스펙에 맞춰 제작합니다.",                   img: A.ortho   },
  { title: "Esthetic",        desc: "색/텍스처/형태 재현을 우선으로\n심미 케이스를 제작합니다.",           img: A.esthetic},
  { title: "Digital Modeless",desc: "구강스캔 기반으로\n모델리스 제작 흐름을 지원합니다.",               img: A.digital },
];

const WORKFLOW = [
  { step: "Step 1", active: true,  title: "케이스 접수",    desc: "스캔(STL) / 처방 / 쉐이드 / 참고\n사진을 전달합니다.", img: A.wf1 },
  { step: "Step 2", active: false, title: "검토 & 일정 안내", desc: "난이도/재료/납기 확인 후\n제작 일정 공유",          img: A.wf2 },
  { step: "Step 3", active: false, title: "디자인 & 제작",   desc: "CAD 디자인 →\n제작/가공 → 마감",                img: A.wf3 },
  { step: "Step 4", active: false, title: "검수 & 출고",     desc: "최종 체크 후\n배송/전달",                        img: A.wf4 },
];

const REVIEWS = [
  {
    title: '"좋은 치료는 좋은 기공물에서 완성된다고 생각합니다."',
    body: "좋은 치료는 좋은 기공물에서 완성된다고 생각합니다.\n늘 기공물의 완성도와 환자를 먼저 생각하는 마음으로 노력하시는 만큼 앞으로의 더 큰 발전과 번창을 진심으로 응원합니다.",
    clinic: "청담세브란스치과",
    name: "권혁준",
  },
  {
    title: '"아날로그와 디지털 모두 잘 소화해 내는 기공역량."',
    body: "강신일 소장님의 뛰어난 센스와 근면성실함 때문에 오랜 세월 믿고 거래해 왔습니다. 아날로그와 디지털 모두 잘 소화해 내는 기공역량을 갖추고 있을 뿐 아니라 항상 잘 소통하고 노력하는 모습이 맘에 듭니다. 앞으로도 계속 믿고 거래할 수 있는 기공소라 생각되어 다른 분께 추천드립니다.",
    clinic: "예원부부치과",
    name: "오충원 원장",
  },
  {
    title: '"임상에서의 요구를 잘 이해하고 소통이 원활해 더욱 믿고 맡길 수 있습니다."',
    body: "심미보철을 위해 찾게 된 기공소입니다. 처음 거래했을 때 느꼈던 성실함과 책임감을 지금까지도 변함없이 지켜오고 있습니다. 작은 디테일까지 놓치지 않고 정성껏 보철물을 제작해 주며, 임상에서의 요구를 잘 이해하고 소통이 원활해 더욱 믿고 맡길 수 있습니다.",
    clinic: "소나무치과",
    name: "김상준",
  },
];

const CASES = [
  {
    before: A.c1b, after: A.c1a,
    title: "임플란트 없이 결손치 수복 가능",
    desc: "치조골이 너무 얇아서 임플란트를 식립할수없는 케이스에 적용한 심미보철 중 emax 소재로 제작한 메릴렌드 브릿지입니다.",
  },
  {
    before: A.c2b, after: A.c2a,
    title: "벌어진 치아 복구 솔루션",
    desc: "자체개발한 테크닉인 ceteeth로 치아삭제없이 distema를 해소한 증례입니다.",
  },
  {
    before: A.c3b, after: A.c3a,
    title: "모델리스 풀케이스",
    desc: "고도손상치아 케이스를 구강스캔하여 모델리스로 각각의 치아로 제작하여 한번에 셋팅한 케이스입니다.",
  },
];

const EQUIPMENT = [
  {
    title: "DWX-51D 5-Axis\nDental Milling Machine",
    desc: "일본 ROLAND사의 동시 5축장비 보유",
    img: A.dwx,
  },
  {
    title: "ATLAS BX4",
    desc: "각 implant 회사의(외산 모두 가능) 전용 Custom 환봉을 4축 장비로 직접 제작함으로써 정확한 SMART FIT을 제공하고 있습니다.",
    img: A.atlas,
  },
  {
    title: "Programat EP 3010",
    desc: "Ivoclar ep 3010 포세린 퍼네스로 최상의 심미보철과 특히 emax press 작업을 하는 고급장비입니다.",
    img: A.ep,
  },
  {
    title: "일본 TOSHO사 파우더 사용",
    desc: "100% 국내 제작",
    img: A.tosho,
  },
];

function ContactButton({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 bg-[#ecc744] text-[#1c1c19] font-medium text-base px-6 h-12 rounded-xl hover:bg-[#d4b23c] transition-colors ${className}`}
    >
      비즈니스 제휴 문의
      <img src={A.arrow} alt="" className="w-5 h-5" />
    </a>
  );
}

function CaseCard({ before, after, title, desc }: { before: string; after: string; title: string; desc: string }) {
  const [showAfter, setShowAfter] = useState(true);
  return (
    <div className="flex-1 flex flex-col overflow-hidden rounded-2xl min-w-0">
      <div className="relative">
        <img
          src={showAfter ? after : before}
          alt={showAfter ? "치료 후" : "치료 전"}
          className="w-full object-cover"
          style={{ aspectRatio: "770 / 410" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 bg-[#1c1c19] p-1.5 rounded-full">
          <button
            onClick={() => setShowAfter(false)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${!showAfter ? "bg-[#ecc744]" : ""}`}
          >
            <img src={A.chevronL} alt="이전" className="w-3 h-3" />
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${showAfter ? "bg-[#ecc744]" : ""}`}
          >
            <img src={A.chevronR} alt="다음" className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="bg-[#f5f5f5] flex flex-col gap-4 p-6 flex-1">
        <h3 className="font-bold text-2xl text-[#1c1c19] tracking-[-0.045em] leading-snug">{title}</h3>
        <p className="text-lg text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em]">{desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({ clinic: "", phone: "", name: "", email: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="flex flex-col w-full">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-[#1c1c19] border-b border-white/[0.32] h-20">
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-8">
          <a href="#" className="font-display text-2xl text-[#ecc744] tracking-[-0.045em] leading-none">
            강냉이.com
          </a>
          <nav className="flex items-center gap-14 font-medium text-base tracking-[-0.02em] text-white">
            <a href="#">Home</a>
            <a href="#cases">제작 케이스</a>
            <a href="#equipment">기공장비</a>
          </nav>
          <ContactButton href="#contact" />
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#1c1c19] flex flex-col justify-end h-[800px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full px-8 pb-24 flex flex-col gap-4">
          <h1 className="font-display text-[56px] text-[#f5f5f5] tracking-[-0.03em] leading-[1.2] whitespace-pre-line">
            {"스캔 데이터로 정확하게.\n납기와 품질을 지키는 기공소"}
          </h1>
          <p className="text-lg text-white tracking-[-0.03em] leading-relaxed">
            구강스캐너 데이터 기반으로 모델리스 제작을 지원합니다.
          </p>
          <ContactButton href="#contact" className="mt-2 self-start" />
        </div>
      </section>

      {/* ── Why ── */}
      <section className="bg-[#1c1c19] flex items-center justify-center min-h-[800px]">
        <div className="max-w-[1440px] mx-auto w-full px-8 py-24 text-center text-white flex flex-col gap-12 items-center">
          <h2 className="font-display text-[56px] tracking-[-0.03em] leading-[1.2]">Why 강냉이.com</h2>
          <p className="font-medium text-[32px] leading-relaxed tracking-[-0.03em] whitespace-pre-line max-w-4xl">
            {"강냉이.com은 CAD/CAM 기반으로 작업하는 디지털 기공소입니다.\n10년 동안 구강스캔을 활용한 모델리스 보철을 10,000건 이상 제작해왔고,\n풀케이스부터 인레이, 심미 보철까지 좋은 적합도를 만드는 노하우를 갖추고 있습니다.\n치과와의 소통을 가장 중요하게 생각하며, 더 좋은 결과를 위해 매 케이스 최선을 다합니다."}
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">서비스 소개</h2>
            <p className="text-lg text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em]">
              강냉이 기공소는 최상의 치과 보철물을 만들기 위해 끊임없이 노력합니다.<br />
              최첨단 기계설비와 청결한 제조환경으로 최상의 결과물을 만듭니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex items-center overflow-hidden rounded-2xl bg-white">
                <img src={s.img} alt={s.title} className="w-[157px] h-[157px] object-cover rounded-2xl shrink-0" />
                <div className="flex flex-col gap-2 px-6 py-4">
                  <h3 className="font-display text-2xl text-[#1c1c19] tracking-[-0.045em] leading-snug">{s.title}</h3>
                  <p className="text-lg text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em] whitespace-pre-line">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">워크플로우</h2>
            <p className="text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.045em] leading-relaxed">어떻게 의뢰하나요?</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-[#ecc744] flex items-center gap-12 px-12 py-6 rounded-full">
              {["의뢰", "제작", "배송"].map((t, i) => (
                <span key={t} className="flex items-center gap-12">
                  <span className="font-medium text-3xl text-[#1c1c19] tracking-[-0.03em]">{t}</span>
                  {i < 2 && <span className="font-bold text-2xl text-[#1c1c19]">→</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
              {WORKFLOW.map((w) => (
                <div key={w.step} className="flex flex-col gap-6">
                  <span
                    className={`self-start px-4 py-2 rounded-lg text-base font-medium tracking-[-0.03em] ${
                      w.active
                        ? "bg-[#ecc744] text-[#1c1c19]"
                        : "bg-white border border-[rgba(28,28,25,0.12)] text-[#1c1c19]"
                    }`}
                  >
                    {w.step}
                  </span>
                  <div className="border-l border-[rgba(28,28,25,0.12)] flex flex-col gap-4 pl-px py-4">
                    <div className="flex flex-col gap-4 px-4">
                      <h3 className="font-bold text-2xl text-[#1c1c19] tracking-[-0.045em] leading-snug">{w.title}</h3>
                      <p className="font-medium text-lg text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em] whitespace-pre-line">{w.desc}</p>
                    </div>
                    <div className="mx-4 rounded-2xl overflow-hidden h-[199px]">
                      <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <span className="bg-[#f5f5f5] text-[rgba(28,28,25,0.56)] text-base px-4 py-1.5 rounded-full tracking-[-0.03em]">
                *처음 거래라면 테스트 케이스/샘플링 가능
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">항상 최선을 다합니다</h2>
            <p className="text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.045em] leading-relaxed">함께한 치과의 이야기</p>
          </div>
          <div className="flex gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="flex-1 bg-white rounded-2xl p-6 flex flex-col gap-6">
                <h3 className="font-bold text-2xl text-[#1c1c19] tracking-[-0.045em] leading-snug">{r.title}</h3>
                <p className="flex-1 text-base text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em] whitespace-pre-line">{r.body}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#cdd8f5] flex items-end justify-center overflow-hidden shrink-0">
                      <img src={A.dentist} alt="" className="w-8 object-contain" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-base text-[#1c1c19] tracking-[-0.03em]">{r.clinic}</p>
                      <p className="text-base text-[#1c1c19] tracking-[-0.03em]">{r.name}</p>
                    </div>
                  </div>
                  <span className="text-[#ecc744] text-lg">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section id="cases" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">치료 사례</h2>
            <p className="text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.045em] leading-relaxed">다양한 임상 치료 사례를 확인해 보세요</p>
          </div>
          <div className="flex gap-6">
            {CASES.map((c) => <CaseCard key={c.title} {...c} />)}
          </div>
          <div className="flex justify-center">
            <ContactButton href="#contact" />
          </div>
        </div>
      </section>

      {/* ── Equipment ── */}
      <section id="equipment" className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-20 items-center">
          <div className="text-center flex flex-col gap-2">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">기공장비</h2>
            <p className="text-2xl text-[rgba(28,28,25,0.56)] tracking-[-0.045em] leading-relaxed">하이엔드 라인업 기공장비 구비</p>
          </div>

          {EQUIPMENT.map((eq, i) => (
            <div key={eq.title} className={`flex items-center justify-between w-full max-w-4xl gap-12 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
              <div className="flex flex-col gap-4 max-w-sm shrink-0">
                <h3 className="font-medium text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-snug whitespace-pre-line">{eq.title}</h3>
                <p className="text-base text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em]">{eq.desc}</p>
              </div>
              <img src={eq.img} alt={eq.title} className="h-[475px] object-contain" />
            </div>
          ))}

          {/* 3D Printers – dual image layout */}
          <div className="flex items-center justify-between w-full max-w-4xl gap-12 flex-row-reverse">
            <div className="flex flex-col gap-4 max-w-sm shrink-0">
              <h3 className="font-medium text-[32px] text-[#1c1c19] tracking-[-0.03em] leading-snug">3D PRINTERS</h3>
              <p className="text-base text-[rgba(28,28,25,0.56)] leading-relaxed tracking-[-0.03em] whitespace-pre-line">
                {"ZIG가 없어서 Setting시 어려움을 해결하기 위해\n3D프린터 2대를 도입하여 추가 요청시 3D ZIG를\n제공해 드립니다."}
              </p>
            </div>
            <div className="flex gap-8 items-end">
              <div className="flex flex-col gap-3 items-center">
                <img src={A.p1} alt="싸이버매드 온매드 4K" className="h-[372px] object-contain" />
                <p className="font-medium text-sm text-[#1c1c19] text-center tracking-[-0.03em]">싸이버매드 온매드 4K</p>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <img src={A.p2} alt="애니큐빅 모노4" className="h-[372px] object-contain" />
                <p className="font-medium text-sm text-[#1c1c19] text-center tracking-[-0.03em]">애니큐빅 모노4</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col gap-12 items-center">
          <div className="text-center flex flex-col gap-2">
            <h2 className="font-display text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">Contact</h2>
            <p className="text-2xl text-[#1c1c19] tracking-[-0.045em] leading-relaxed">의뢰/상담</p>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden flex">
            {/* Left – image + overlay */}
            <div className="relative w-[500px] shrink-0 flex flex-col justify-end min-h-[600px]">
              <img src={A.contactBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative bg-[rgba(28,28,25,0.72)] p-8 pb-12 flex flex-col gap-4">
                <h3 className="font-medium text-3xl text-white tracking-[-0.03em] leading-snug">안녕하세요 강냉이.com 입니다.</h3>
                <p className="text-lg text-[rgba(255,255,255,0.74)] leading-relaxed tracking-[-0.03em]">
                  궁금한 점이 있으면 언제든 메시지 주세요,<br />확인 후 빠르게 답변드릴게요.
                </p>
              </div>
            </div>
            {/* Right – form */}
            <div className="w-[500px] flex flex-col gap-6 px-6 py-8">
              {([
                { k: "clinic",  label: "치과명",  required: true,  type: "text",  placeholder: "치과명을 입력해 주세요" },
                { k: "phone",   label: "연락처",  required: true,  type: "tel",   placeholder: "010-4669-0302" },
                { k: "name",    label: "이름",    required: false, type: "text",  placeholder: "이름을 입력해 주세요" },
                { k: "email",   label: "이메일",  required: false, type: "email", placeholder: "이메일을 입력해 주세요" },
              ] as const).map(({ k, label, required, type, placeholder }) => (
                <div key={k} className="flex flex-col gap-2">
                  <label className="font-medium text-base text-black tracking-[-0.02em] flex gap-1">
                    {label} {required && <span className="text-[#f52b2b]">*</span>}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[k]}
                    onChange={set(k)}
                    className="border border-black/[0.12] rounded-lg px-4 h-12 text-base placeholder:text-black/30 focus:outline-none focus:border-[#1c1c19] tracking-[-0.03em]"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-black tracking-[-0.02em]">문의사항</label>
                <textarea
                  rows={4}
                  placeholder="문의사항을 남겨주세요"
                  value={form.message}
                  onChange={set("message")}
                  className="border border-black/[0.12] rounded-lg px-4 py-3 text-base placeholder:text-black/30 focus:outline-none focus:border-[#1c1c19] tracking-[-0.03em] resize-none"
                />
              </div>
              <button
                type="button"
                className="bg-[#ecc744] h-14 rounded-full text-[#1c1c19] font-medium text-xl tracking-[-0.038em] hover:bg-[#d4b23c] transition-colors"
              >
                보내기
              </button>
            </div>
          </div>
          <p className="text-base text-[rgba(28,28,25,0.56)] text-center tracking-[-0.03em]">
            케이스 정보(보철 종류/환자 상태 요약/희망 납기/쉐이드/참고사진)가 있으면 더 빠르게 답변드릴 수 있어요.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1c1c19] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-0 flex flex-col gap-12 relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl text-[#ecc744] tracking-[-0.03em] leading-none">강냉이.com</span>
              <span className="font-medium text-5xl text-[#ecc744] tracking-[-0.03em] leading-[1.2]">Dental Lab</span>
            </div>
            <div className="border-t border-[rgba(236,199,68,0.56)] pt-6 grid grid-cols-3 gap-32">
              <div className="flex flex-col gap-6">
                <p className="font-medium text-xl text-[#ecc744] tracking-[-0.038em]">Links</p>
                <div className="flex flex-col gap-4 text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em]">
                  {["Services", "Workflow", "Cases", "Contact"].map((l) => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#ecc744] transition-colors">{l}</a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <p className="font-medium text-xl text-[#ecc744] tracking-[-0.038em]">Social</p>
                <p className="text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em]">카카오</p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="font-medium text-xl text-[#ecc744] tracking-[-0.038em]">주소와 연락처</p>
                <div className="flex flex-col gap-2 text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em] leading-relaxed">
                  <p>서울특별시 은평구 진흥로 51, 302호</p>
                  <p>(역촌동, 은혜빌딩)</p>
                  <p>전화: 02)358 2804</p>
                  <p>모바일: +82 10 4749 2804</p>
                  <p>이메일: kangdoc80@naver.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={A.footerLogo} alt="강냉이.com" className="w-full object-contain mt-8" />
      </footer>

    </div>
  );
}
