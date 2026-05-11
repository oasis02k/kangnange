"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import { TABS, type Tab } from "./data";

export type SanityCase = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
};

function CaseCard({ item }: { item: SanityCase }) {
  return (
    <a href={`/cases/${item.slug}`} className="flex flex-col relative bg-white rounded-2xl overflow-hidden group">
      <div className="relative w-full aspect-[658/351] overflow-hidden bg-[#e8e8e6]">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute top-2 left-2 bg-[#ecc744] text-[#1c1c19] font-sans font-medium text-[14px] tracking-[-0.03em] leading-[1.2] px-3 h-8 flex items-center rounded-lg">
          {item.category}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4 md:pt-4 md:pb-6 md:px-6">
        <h3 className="font-sans font-bold text-[18px] md:text-[20px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
          {item.title}
        </h3>
        <p className="font-sans font-normal text-base text-[rgba(28,28,25,0.56)] tracking-[-0.03em] leading-[1.4] line-clamp-2">
          {item.description}
        </p>
      </div>
    </a>
  );
}

export default function CasesClient({ cases }: { cases: SanityCase[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("전체보기");

  const filtered = activeTab === "전체보기"
    ? cases
    : cases.filter((c) => c.category === activeTab);

  return (
    <>
      <Navbar />
      <main className="bg-[#f5f5f5] min-h-screen">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 pt-[120px] md:pt-[176px] pb-16 md:pb-24">

          <h1 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2] text-center w-full mb-10 md:mb-12">
            제작 케이스
          </h1>

          <div className="flex flex-col gap-6 md:gap-8">
            {/* Mobile: dropdown */}
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="md:hidden w-full h-12 border border-[rgba(28,28,25,0.12)] rounded-lg px-4 bg-white font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] outline-none focus:border-[#ecc744] transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231c1c19' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
            >
              {TABS.map((tab) => (
                <option key={tab} value={tab}>{tab}</option>
              ))}
            </select>

            {/* Desktop: tabs */}
            <div className="hidden md:flex items-center gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 h-9 px-4 rounded-lg font-sans font-medium text-base tracking-[-0.02em] leading-[1.2] transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#ecc744] text-[#1c1c19]"
                      : "bg-white text-[rgba(28,28,25,0.56)] border border-[rgba(28,28,25,0.1)] hover:border-[rgba(28,28,25,0.3)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {filtered.map((item) => (
                <CaseCard key={item._id} item={item} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center font-sans text-base text-[rgba(28,28,25,0.4)] py-16">
                해당 카테고리의 케이스가 없습니다.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
