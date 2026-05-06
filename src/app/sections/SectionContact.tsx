"use client";

import { useState, useRef } from "react";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1 font-sans font-medium text-base text-[#1c1c19] tracking-[-0.02em] leading-[1.2]">
        <span>{label}</span>
        {required && <span className="text-[#f52b2b]">*</span>}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-12 border border-black/[0.12] rounded-lg px-4 font-sans font-normal text-base text-[#1c1c19] tracking-[-0.03em] placeholder:text-black/[0.32] outline-none focus:border-[#1c1c19] transition-colors";

export default function SectionContact() {
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="bg-[#f5f5f5] py-8 md:py-24 px-5 md:px-8">
      <div className="flex flex-col gap-6 md:gap-12 items-center w-full max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 md:gap-4 text-center w-full">
          <h2 className="font-display text-[32px] md:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2]">
            Contact
          </h2>
          <p className="font-sans font-normal text-base md:text-2xl text-[#1c1c19] tracking-[-0.03em] leading-[1.4]">
            의뢰/상담
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden w-full md:max-w-[1000px] flex flex-col md:flex-row">

          {/* Left: image + greeting */}
          <div className="relative flex flex-col justify-end md:w-[500px] shrink-0 min-h-[240px] md:min-h-0">
            <img
              src="/contact/hero.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative bg-[rgba(28,28,25,0.72)] flex flex-col gap-4 px-6 pt-6 pb-8 md:pb-12">
              <p className="font-sans font-medium text-2xl md:text-[32px] text-white tracking-[-0.03em] leading-[1.2]">
                안녕하세요 강냉이.com 입니다.
              </p>
              <p className="font-sans font-normal text-base md:text-[18px] text-white/[0.74] tracking-[-0.03em] leading-[1.4]">
                궁금한 점이 있으면 언제든 메시지 주세요,{" "}
                <br className="hidden md:block" />
                확인 후 빠르게 답변드릴게요.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 px-6 py-8 md:p-8 flex-1"
          >
            <Field label="치과명" required>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                placeholder="치과명을 입력해 주세요"
                className={inputClass}
                required
              />
            </Field>

            <Field label="연락처" required>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-4669-0302"
                className={inputClass}
                required
              />
            </Field>

            <Field label="이름">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해 주세요"
                className={inputClass}
              />
            </Field>

            <Field label="이메일">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해 주세요"
                className={inputClass}
              />
            </Field>

            <Field label="문의사항">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의사항을 남겨주세요"
                rows={5}
                className="w-full border border-black/[0.12] rounded-lg px-4 py-2 font-sans font-normal text-base text-[#1c1c19] tracking-[-0.03em] placeholder:text-black/[0.32] outline-none focus:border-[#1c1c19] transition-colors resize-none"
              />
            </Field>

            <Field label="업로드 이미지">
              <div
                className="w-full h-[119px] border border-black/[0.12] rounded-lg px-4 py-2 flex items-center cursor-pointer hover:border-[#1c1c19] transition-colors"
                onClick={() => fileRef.current?.click()}
              >
                <span className="font-sans font-normal text-base text-black/[0.32] tracking-[-0.03em]">
                  {fileName || "이미지를 업로드해 주세요"}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </div>
            </Field>

            <button
              type="submit"
              className="w-full h-14 bg-[#ecc744] rounded-full font-sans font-medium text-[20px] text-[#1c1c19] tracking-[-0.03em] leading-none"
            >
              보내기
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="font-sans font-medium text-base text-[rgba(28,28,25,0.32)] tracking-[-0.03em] leading-[1.4] text-center">
          케이스 정보(보철 종류/환자 상태 요약/희망 납기/쉐이드/참고사진)가 있으면 더 빠르게 답변드릴 수 있어요.
        </p>

      </div>
    </section>
  );
}
