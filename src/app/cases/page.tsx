import { client } from "../../sanity/client";

export const revalidate = 60;
import CasesClient from "./CasesClient";

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
