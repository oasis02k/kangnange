export default function Footer() {
  return (
    <footer className="bg-[#1c1c19] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 pt-8 md:pt-24">

        {/* Logo */}
        <div className="flex items-center gap-2 text-[#ecc744] tracking-[-0.03em] mb-6 md:mb-8">
          <span className="font-display text-2xl md:text-[48px] leading-none">
            강냉이.com
          </span>
          <span className="font-sans font-medium text-2xl md:text-[48px] leading-[1.2]">
            Dental Lab
          </span>
        </div>

        {/* Divider + columns */}
        <div className="border-t border-[rgba(236,199,68,0.56)] pt-6 flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">

          {/* Links */}
          <div className="flex flex-col gap-4">
            <p className="font-sans font-medium text-[20px] text-[#ecc744] tracking-[-0.03em] leading-none">
              Links
            </p>
            <div className="flex flex-col gap-4 font-sans font-normal text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em] leading-[1.4]">
              <span>Services</span>
              <span>Workflow</span>
              <span>Cases</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <p className="font-sans font-medium text-[20px] text-[#ecc744] tracking-[-0.03em] leading-none">
              Social
            </p>
            <span className="font-sans font-normal text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em] leading-[1.4]">
              카카오
            </span>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-6">
            <p className="font-sans font-medium text-[20px] text-[#ecc744] tracking-[-0.03em] leading-none">
              주소와 연락처
            </p>
            <div className="flex flex-col gap-2 font-sans font-normal text-base text-[rgba(236,199,68,0.72)] tracking-[-0.03em] leading-[1.4]">
              <p>
                서울특별시 은평구 진흥로 51, 302호{" "}
                <br className="md:hidden" />
                (역촌동, 은혜빌딩)
              </p>
              <p>전화: 02)358 2804</p>
              <p>모바일: +82 10 4749 2804</p>
              <p>이메일: kangdoc80@naver.com</p>
            </div>
          </div>

        </div>

        {/* Wordmark */}
        <img
          src="/footer/wordmark.svg"
          alt="강냉이.com"
          className="w-full mt-8 md:mt-12 translate-y-[18%]"
        />

      </div>
    </footer>
  );
}
