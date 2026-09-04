import React from "react";

const features = [
  {
    title: "Global market access",
    description: "Trade 4,000+ US stocks and ETFs in fractions, alongside curated USD income notes and pre-IPO deals.",
    bgColor: "bg-[#dbeafe]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  {
    title: "SEBI-backed research",
    description: "The same research desk and RM relationships you already trust, now covering global allocations too.",
    bgColor: "bg-[#e9d5ff]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  {
    title: "Robust security & regulation",
    description: "Your money stays custodied in India; the platform is regulated through GIFT IFSC.",
    bgColor: "bg-[#bbf7d0]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    title: "Real-time portfolio tracking",
    description: "One dashboard for domestic and global holdings, updated live with reconciled performance data.",
    bgColor: "bg-[#60a5fa]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  },
  {
    title: "Tax & LRS reporting, automated",
    description: "Every global trade is reconciled and reported for you — no manual paperwork, ever.",
    bgColor: "bg-[#fed7aa]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
  {
    title: "Fractional investing from $3,000",
    description: "Start small, scale as you go — with no minimum lock-in and full liquidity on listed securities.",
    bgColor: "bg-[#1e293b]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  }
];

import SplitText from "../ui/SplitText";

export default function FeatureCollection() {
  return (
    <section className="bg-[#f5f6f7] py-14 sm:py-20 md:py-24 lg:py-[104px] w-full">
      <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="max-w-[780px] text-center mb-8 sm:mb-12 lg:mb-[72px]">
          <SplitText
            text="Everything you need for global investing, in one dashboard"
            tag="h2"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[24px] sm:text-[34px] md:text-[44px] text-[#0f172a] leading-[1.25] tracking-[-0.88px] mb-2.5 sm:mb-[16px]"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="center"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] sm:text-[16px] md:text-[18px] text-[#64748b] leading-[1.6] px-1 sm:px-0">
            From market access to compliance reporting, Vyomma is built to make investing abroad feel as simple as investing at home.
          </p>
        </div>

        {/* Grid: 2 columns on Mobile & Tablet, 3 columns on Desktop with Boxed Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-x-[40px] lg:gap-y-[56px] w-full max-w-[1200px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white sm:bg-transparent rounded-2xl sm:rounded-none p-4 sm:p-2 border border-slate-200/70 sm:border-none shadow-xs sm:shadow-none flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-md sm:hover:translate-y-0 sm:hover:shadow-none"
            >
              {/* Icon Box */}
              <div className={`size-12 sm:size-14 md:size-[60px] rounded-xl sm:rounded-2xl md:rounded-[30px] flex items-center justify-center shadow-xs mb-3 sm:mb-[20px] lg:mb-[24px] shrink-0 ${feature.bgColor}`}>
                <div className="scale-85 sm:scale-100 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] sm:text-[17px] md:text-[20px] text-[#0f172a] leading-tight tracking-[-0.3px] mb-1.5 sm:mb-[12px]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] sm:text-[13.5px] md:text-[15px] text-[#64748b] leading-normal sm:leading-[1.6] max-w-[320px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
