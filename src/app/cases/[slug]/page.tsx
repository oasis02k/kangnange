export const revalidate = 0;

import { notFound } from "next/navigation";
import { client } from "../../../sanity/client";
import Navbar from "../../components/Navbar";
import Footer from "../../sections/Footer";
import ImageGallery from "./ImageGallery";

const CASE_QUERY = `*[_type == "case" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  details,
  "images": images[].asset->url
}`;

const SLUGS_QUERY = `*[_type == "case"]{ "slug": slug.current }`;

export async function generateStaticParams() {
  const items = await client.fetch(SLUGS_QUERY);
  return items.map((i: { slug: string }) => ({ slug: i.slug }));
}

type CaseDetail = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  details: string | null;
  images: string[];
};

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center gap-2 font-sans font-normal text-sm text-[rgba(28,28,25,0.48)] tracking-[-0.02em]">
      <a href="/" className="hover:text-[#1c1c19] transition-colors">Home</a>
      <span>/</span>
      <a href="/cases" className="hover:text-[#1c1c19] transition-colors">제작 케이스</a>
      <span>/</span>
      <span className="text-[#1c1c19] font-medium truncate">{title}</span>
    </nav>
  );
}


export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item: CaseDetail | null = await client.fetch(CASE_QUERY, { slug });
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-[#f5f5f5] min-h-screen">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 pt-[100px] md:pt-[136px] pb-16 md:pb-24">
          <div className="flex flex-col gap-8 md:gap-12">
            <Breadcrumb title={item.title} />

            <div className="w-full max-w-[800px] mx-auto flex flex-col gap-8 md:gap-12">
              <div className="flex flex-col gap-4">
                <span className="self-start bg-[#ecc744] text-[#1c1c19] font-sans font-medium text-[14px] tracking-[-0.03em] leading-[1.2] px-3 h-8 flex items-center rounded-lg">
                  {item.category}
                </span>
                <h1 className="font-display text-[28px] md:text-[48px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
                  {item.title}
                </h1>
                <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.6]">
                  {item.description}
                </p>
              </div>

              <ImageGallery images={item.images} />

              {item.details && (
                <p className="font-sans font-normal text-base md:text-[18px] text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.6] whitespace-pre-wrap">
                  {item.details}
                </p>
              )}

              <a
                href="/cases"
                className="self-start flex items-center gap-2 font-sans font-medium text-base text-[rgba(28,28,25,0.56)] tracking-[-0.02em] hover:text-[#1c1c19] transition-colors"
              >
                ← 목록으로
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
