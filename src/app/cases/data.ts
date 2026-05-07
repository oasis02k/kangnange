export const TABS = ["전체보기", "Modelless", "Esthetis", "Ortho", "Denture", "Implant", "Crown"] as const;
export type Tab = typeof TABS[number];
export type Category = Exclude<Tab, "전체보기">;

export type Case = {
  slug: string;
  title: string;
  description: string;
  category: Category;
  images: [string, ...string[]];
};

export const CASES: Case[] = [
  {
    slug: "case-01",
    title: "원바디 커스텀 크라운",
    description: "occlusal room이 부족한 케이스일경우 하이진하게 티탄어벗트먼트를 크라운 형태로 커스텀제작합니다.",
    category: "Implant",
    images: ["/cases/page-01.jpg"],
  },
  {
    slug: "case-02",
    title: "메릴랜드 브릿지",
    description: "치조골이 너무 얇아서 임플란트를 식립할수없는 케이스에 적용한 심미보철 중 emax 소재로 제작한 메릴렌드 브릿지입니다.",
    category: "Esthetis",
    images: ["/cases/page-02.jpg"],
  },
  {
    slug: "case-03",
    title: "Ceteeth Veneer",
    description: "자체개발한 테크닉인 ceteeth 로 치아삭제없이 distema 를 해소한 증례입니다.",
    category: "Esthetis",
    images: ["/cases/page-03.jpg"],
  },
  {
    slug: "case-04",
    title: "변색치 심미 보철",
    description: "심미보철",
    category: "Esthetis",
    images: ["/cases/page-04.jpg"],
  },
  {
    slug: "case-05",
    title: "지르코니아 전치",
    description: "구강스캔 만으로 심미보철이 어렵다고요? 강냉이닷컴과 함께하시면 환자분 매니지먼트나 모든 WORK FLOW가 EASY 하게 될수있습니다.",
    category: "Modelless",
    images: ["/cases/page-05.jpg"],
  },
  {
    slug: "case-06",
    title: "Ceteeth",
    description: "Ceteeth 증례, 교정이 끝난 후 잉여 공간에 구강스캔 후 자사에 BX4 장비로 Ceteeth를 시적한 케이스",
    category: "Esthetis",
    images: ["/cases/page-06.jpg"],
  },
  {
    slug: "case-07",
    title: "32번 심미 모델리스",
    description: "구강스캔 기반 모델리스 심미보철입니다. 교모가 심한 치아도 훌륭한 하모니를 얻을수 있습니다.",
    category: "Modelless",
    images: ["/cases/page-07.jpg"],
  },
  {
    slug: "case-08",
    title: "고난이도 모델리스 보철 작업",
    description: "고도손상치아 케이스를 구강스캔하여 모델리스로 각각의 치아로제작하여 한번에 셋팅한 케이스입니다.",
    category: "Modelless",
    images: ["/cases/page-08.jpg"],
  },
  {
    slug: "case-09",
    title: "전치부 고 난이도 임플란트 수복",
    description: "고난이도 맞춤형 임플란트 구강스켄 모델리스 케이스입니다.",
    category: "Modelless",
    images: ["/cases/page-09.jpg"],
  },
];
