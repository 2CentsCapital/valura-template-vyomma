import React from "react";
import SplitText from "../ui/SplitText";

export default function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-20 w-full overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        
        {/* Previous Button (Hidden on small mobile, placed below on mobile) */}
        <button className="hidden sm:flex bg-[#eef2ff] hover:bg-blue-100 transition-colors rounded-full size-10 sm:size-[48px] items-center justify-center shrink-0 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center max-w-[780px] mx-auto text-center px-2">
          <SplitText
            text="Trusted by investors like you"
            tag="h2"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[28px] sm:text-[34px] md:text-[40px] text-[#0f172a] leading-[1.25] tracking-[-0.8px] mb-3 sm:mb-[20px]"
            delay={40}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="center"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] sm:text-[19px] md:text-[21.6px] text-[#1e293b] leading-[1.6] mb-5 sm:mb-[32px]">
            Real feedback from investors who moved their global allocation onto Vyomma.
          </p>
          
          <p className="font-['Plus_Jakarta_Sans',sans-serif] italic text-[15px] sm:text-[18px] text-[#475569] leading-[1.7] mb-5 sm:mb-[28px] max-w-[680px]">
            "Paperless KYC, and I was holding US equities within the week — all reported for LRS automatically."
          </p>

          <div className="flex flex-col items-center">
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-base sm:text-[18px] text-[#0f172a] mb-0.5">
              Ananya Rao
            </p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-[14px] text-[#dc2626]">
              HNI Investor, Mumbai
            </p>
          </div>

          {/* Mobile-only navigation buttons */}
          <div className="flex sm:hidden items-center gap-4 mt-6">
            <button className="bg-[#eef2ff] hover:bg-blue-100 transition-colors rounded-full size-10 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button className="bg-[#eef2ff] hover:bg-blue-100 transition-colors rounded-full size-10 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button className="hidden sm:flex bg-[#eef2ff] hover:bg-blue-100 transition-colors rounded-full size-10 sm:size-[48px] items-center justify-center shrink-0 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

      </div>
    </section>
  );
}
