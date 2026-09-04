import React from "react";
import SplitText from "../ui/SplitText";

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 size-5 sm:size-6">
    <circle cx="12" cy="12" r="12" fill="#427DF6" />
    <path d="M7.5 12.5L10.5 15.5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PortfolioWidget = () => (
  <div className="w-full max-w-[360px] sm:max-w-none sm:w-[340px] md:w-[360px] lg:w-[370px] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 z-10 static sm:absolute sm:bottom-[-28px] md:bottom-[-36px] lg:-bottom-14 sm:left-1/2 sm:-translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-left-14 mt-4 sm:mt-0 mx-auto sm:mx-0">
    <h3 className="font-['Clash_Grotesk',sans-serif] text-[20px] sm:text-[24px] text-[#141518] mb-4 sm:mb-6 font-medium">
      Your Portfolio
    </h3>
    
    <div className="flex items-center gap-5 sm:gap-8">
      {/* Pie Chart Representation */}
      <div className="relative size-[80px] sm:size-[100px] shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="20" />
          {/* Mutual Funds (64%) */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4B83F8" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.64)} />
          {/* Pre-IPO (13%) */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9333EA" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.13)} className="origin-center rotate-[230deg]" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-[#141518] text-xs sm:text-sm">
          64%
        </div>
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-4 w-full">
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#FF7E40]"></div>
            <span className="font-medium text-[#141518]">Mutual Funds</span>
          </div>
          <span className="font-bold text-[#4B83F8]">64%</span>
        </div>
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#797979]"></div>
            <span className="font-medium text-[#141518]">Pre-IPO</span>
          </div>
          <span className="font-bold text-[#FF7E40]">13%</span>
        </div>
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#22C55E]"></div>
            <span className="font-medium text-[#141518]">Stocks</span>
          </div>
          <span className="font-bold text-[#4B83F8]">51%</span>
        </div>
      </div>
    </div>
  </div>
);

export default function CustomerSupport() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-[104px] w-full overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start shrink-0">
            <SplitText
              text="Build your global allocation, your way."
              tag="h2"
              className="font-['Clash_Grotesk',sans-serif] font-medium text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.1] text-[#141518] mb-4 sm:mb-6 lg:mb-8"
              delay={35}
              duration={0.8}
              ease="power3.out"
              splitType="words, chars"
              textAlign="left"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />

            <p className="font-['Inter',sans-serif] text-[15px] sm:text-[17px] lg:text-[18px] text-[#797979] leading-[1.6] mb-6 sm:mb-10 lg:mb-[44px] max-w-[480px]">
              US equities for growth. USD income notes for yield. Pre-IPO for upside. Everything sits in your Vyomma dashboard — global and domestic, in one view.
            </p>
            
            <div className="flex flex-col gap-5 sm:gap-7 lg:gap-[38px] mb-8 sm:mb-10 lg:mb-[64px] w-full">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <CheckIcon />
                <span className="font-['Inter',sans-serif] font-bold text-[#797979] text-[15px] sm:text-[17px] lg:text-[18px]">
                  4,000+ US stocks &amp; ETFs, invest in fractions
                </span>
              </div>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <CheckIcon />
                <span className="font-['Inter',sans-serif] font-bold text-[#797979] text-[15px] sm:text-[17px] lg:text-[18px]">
                  5–9% USD income notes, curated pre-IPO deals
                </span>
              </div>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <CheckIcon />
                <span className="font-['Inter',sans-serif] font-bold text-[#797979] text-[15px] sm:text-[17px] lg:text-[18px]">
                  Tax &amp; LRS reporting automated, end-to-end
                </span>
              </div>
            </div>

            <button className="w-full sm:w-auto bg-gradient-to-b from-[#4da2ff] to-[#3e68f6] hover:opacity-90 transition-opacity text-white font-bold text-base sm:text-lg lg:text-[20px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[14px] sm:rounded-[16px] shadow-lg shadow-blue-500/20 active:scale-[0.98]">
              See All Features
            </button>
          </div>

          {/* Right Content - Images */}
          <div className="w-full lg:w-[55%] flex flex-col sm:relative items-center lg:items-end mt-4 sm:mt-8 lg:mt-0">
            <div className="relative w-full max-w-[661px] aspect-[4/3] sm:aspect-[16/11] lg:h-[540px] xl:h-[598px] rounded-2xl sm:rounded-[30px] bg-slate-100 overflow-hidden shadow-xl">
              {/* Main Image */}
              <img 
                src="/hero-dashboard.png" 
                alt="Dashboard overview" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            {/* Overlay / Stacked Portfolio Widget */}
            <PortfolioWidget />
          </div>
          
        </div>
      </div>
    </section>
  );
}
