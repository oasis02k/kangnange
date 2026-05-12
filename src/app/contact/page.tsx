"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";

const FORMSPARK_URL = "https://submit-form.com/kTMor2SGP";

const inputClass =
  "w-full h-12 border border-black/[0.12] rounded-lg px-4 font-sans font-normal text-base text-[#1c1c19] tracking-[-0.03em] placeholder:text-black/[0.32] outline-none focus:border-[#ecc744] transition-colors";

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

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
}

export default function ContactPage() {
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiry, setInquiry] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preset = params.get("inquiry");
    if (preset) setInquiry(preset);
  }, []);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isValid = clinicName.trim() !== "" && phone.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "submitting") return;
    setStatus("submitting");

    const payload: Record<string, string> = {
      "치과명": clinicName,
      "연락처": phone,
    };
    if (inquiry) payload["문의유형"] = inquiry;
    if (name)    payload["이름"] = name;
    if (email)   payload["이메일"] = email;
    if (message) payload["문의사항"] = message;

    try {
      const res = await fetch(FORMSPARK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setInquiry(""); setClinicName(""); setPhone(""); setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f5f5] min-h-screen">
        <div className="w-full max-w-[1440px] mx-auto px-5 tablet:px-8 pt-[120px] tablet:pt-[176px] pb-16 tablet:pb-24">

          <h1 className="font-display text-[32px] tablet:text-[56px] text-[#1c1c19] tracking-[-0.03em] leading-[1.2] text-center w-full mb-10 tablet:mb-12">
            의뢰 / 상담
          </h1>

          {/* Form card */}
          <div className="bg-white rounded-3xl overflow-hidden w-full tablet:max-w-[1000px] mx-auto flex flex-col tablet:flex-row">

              {/* Left: image + greeting */}
              <div className="relative flex flex-col justify-end tablet:flex-1 h-[140px] tablet:h-auto">
                <img
                  src="/contact/hero.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative flex flex-col gap-4 px-6 pt-6 pb-8 tablet:pb-12">
                  <p className="font-sans font-medium text-[18px] tablet:text-[32px] text-white tracking-[-0.03em] leading-[1.2]">
                    안녕하세요{" "}
                    <br className="hidden tablet:block" />
                    강냉이.com 입니다.
                  </p>
                  <p className="font-sans font-normal text-base tablet:text-[18px] text-white/75 tracking-[-0.03em] leading-[1.4]">
                    궁금한 점이 있으면 언제든 메시지 주세요,
                    <br />
                    확인 후 빠르게 답변드릴게요.
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-4 tablet:px-6 tablet:py-8 flex-1"
              >
                {/* honeypot */}
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <Field label="문의유형">
                  <div className="relative">
                    <select
                      value={inquiry}
                      onChange={(e) => setInquiry(e.target.value)}
                      className={`${inputClass} ${!inquiry ? "text-black/[0.32]" : "text-[#1c1c19]"} appearance-none pr-10`}
                    >
                      <option value="" disabled>문의유형을 선택해 주세요</option>
                      <option value="비즈니스 제휴 문의">비즈니스 제휴 문의</option>
                      <option value="케이스 의뢰하기">케이스 의뢰하기</option>
                      <option value="샘플신청">샘플신청</option>
                      <option value="수가문의">수가문의</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Field>

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
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="010-4669-0302"
                    maxLength={13}
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
                    className="w-full border border-black/[0.12] rounded-lg px-4 py-2 font-sans font-normal text-base text-[#1c1c19] tracking-[-0.03em] placeholder:text-black/[0.32] outline-none focus:border-[#ecc744] transition-colors resize-none"
                  />
                </Field>


                {status === "success" && (
                  <p className="text-center font-sans font-medium text-base text-green-600 tracking-[-0.02em]">
                    문의가 접수되었습니다. 빠르게 답변드릴게요!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center font-sans font-medium text-base text-[#f52b2b] tracking-[-0.02em]">
                    전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!isValid || status === "submitting"}
                  className={`w-full h-14 rounded-full font-sans font-medium text-[20px] text-[#1c1c19] tracking-[-0.03em] leading-none bg-[#ecc744] hover:bg-[#E3BA27] transition-colors ${isValid && status !== "submitting" ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                >
                  {status === "submitting" ? "전송 중..." : "보내기"}
                </button>
              </form>
          </div>

          <div className="flex flex-col gap-1 items-center text-center">
            <p className="font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4]">
              케이스 정보(보철 종류/환자 상태 요약/희망 납기/쉐이드/참고사진)가 있으면 더 빠르게 답변드릴 수 있어요.
            </p>
            <p className="font-sans font-medium text-base text-[#1c1c19] tracking-[-0.03em] leading-[1.4]">
              보내실 곳{" "}
              <a href="mailto:kangdoc80@naver.com" className="hover:opacity-70 transition-opacity">
                kangdoc80@naver.com
              </a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
