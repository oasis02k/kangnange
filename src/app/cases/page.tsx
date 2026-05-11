import type { Metadata } from "next";
import { client } from "../../sanity/client";

export const revalidate = 0;
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "제작 케이스 | 모델리스·심미·임플란트·덴쳐 | 강냉이닷컴",
  description: "모델리스·심미·임플란트·덴쳐·교정 실제 케이스 모음. emax 메릴랜드 브릿지, Ceteeth 치아삭제 없는 diastema 교정, 고난이도 모델리스 풀케이스 등 임상 사례 수록.",
};

const CASES_QUERY = `*[_type == "case"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  title,
  category,
  description,
  "image": images[0].asset->url
}`;

export default async function CasesPage() {
  const cases = await client.fetch(CASES_QUERY);
  return <CasesClient cases={cases} />;
}
