import React, { useState } from "react";
import SplitText from "../ui/SplitText";

const faqs = [
  {
    question: "How do I start investing?",
    answer: "You can open an account in under 30 minutes with completely paperless KYC. Once verified, fund your account and start investing — no account maintenance fees."
  },
  {
    question: "Which investment products are available?",
    answer: "Global US equities and ETFs, USD income notes, curated pre-IPO deals, and your existing domestic mutual funds and stocks — all in one dashboard."
  },
  {
    question: "Can I invest in global markets from India?",
    answer: "Yes. Vyomma is regulated through GIFT IFSC, so you can invest in US markets directly from India with your money custodied here."
  },
  {
    question: "Do you provide research support?",
    answer: "Yes — the same research team and RM you already work with also covers your global allocation, with dedicated research reports and market updates."
  },
  {
    question: "Is my investment secure?",
    answer: "Your assets are held with licensed custodians and the platform is regulated through GIFT IFSC, NSE/BSE, and SEBI frameworks."
  },
  {
    question: "Can I change my product allocation later?",
    answer: "Yes, you can rebalance between equities, income notes, and pre-IPO allocations at any time from your dashboard."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-white py-16 md:py-24 lg:py-[104px] w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-[45%] flex flex-col items-start">
          <div className="bg-[#eef2ff] rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-5">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xs sm:text-[13px] text-indigo-600">
              FAQ
            </span>
          </div>
          
          <SplitText
            text="Frequently asked questions"
            tag="h2"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[28px] sm:text-[36px] md:text-[44px] text-slate-900 leading-[1.2] tracking-[-0.88px] mb-2 sm:mb-3 max-w-[490px]"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="left"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[14px] sm:text-[16px] text-[#64748b] leading-[1.6] mb-5 sm:mb-8 lg:mb-[32px] max-w-[420px]">
            Everything you need to know about investing with Vyomma.
          </p>
          
          <button className="bg-[#eef2ff] hover:bg-indigo-100 transition-colors rounded-full px-5 sm:px-7 py-2.5 sm:py-3 mb-8 sm:mb-12 lg:mb-16 cursor-pointer">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] text-indigo-600">
              View all FAQs
            </span>
          </button>

          {/* Decorative Illustration */}
          <div className="relative w-[180px] sm:w-[220px] h-[140px] sm:h-[170px] mt-2 sm:mt-[20px] mx-auto lg:mx-0">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Orange circle */}
              <circle cx="40" cy="40" r="16" fill="#fca5a5" />
              
              {/* Yellow Question Mark */}
              <g transform="translate(30, 100) rotate(-15)">
                <path d="M0 0 C0 -25, 35 -25, 35 0 C35 25, 17.5 25, 17.5 45" stroke="#fbbf24" strokeWidth="14" strokeLinecap="round" />
                <circle cx="17.5" cy="65" r="8" fill="#fbbf24" />
              </g>

              {/* Green Question Mark */}
              <g transform="translate(120, 100) rotate(15)">
                <path d="M0 0 C0 -25, 35 -25, 35 0 C35 25, 17.5 25, 17.5 45" stroke="#6ee7b7" strokeWidth="14" strokeLinecap="round" />
                <circle cx="17.5" cy="65" r="8" fill="#6ee7b7" />
              </g>

              {/* Purple Question Mark (Center) */}
              <g transform="translate(70, 80)">
                <path d="M0 0 C0 -35, 50 -35, 50 0 C50 35, 25 35, 25 55" stroke="#8b5cf6" strokeWidth="18" strokeLinecap="round" />
                <circle cx="25" cy="80" r="10" fill="#8b5cf6" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Content - Accordion */}
        <div className="w-full lg:w-[55%] flex flex-col gap-3.5 sm:gap-[18px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`flex flex-col px-4 sm:px-6 py-4 sm:py-[22px] rounded-xl sm:rounded-[16px] border transition-all duration-300 ${
                  isOpen 
                    ? "bg-white border-indigo-400 shadow-[0_4px_7px_rgba(0,0,0,0.04)]" 
                    : "bg-slate-50 border-slate-200 hover:border-indigo-300 cursor-pointer"
                }`}
                onClick={() => setOpenIndex(index)}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] sm:text-[17px] text-slate-900 tracking-[-0.34px]">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[220px] opacity-100 mt-3 sm:mt-[16px]" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-3 sm:pt-[16px] border-t border-slate-100">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm md:text-[15px] text-slate-600 leading-[1.6]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
