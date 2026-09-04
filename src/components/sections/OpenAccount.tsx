import React from "react";
import SplitText from "../ui/SplitText";

export default function OpenAccount() {
  return (
    <section id="contact" className="w-full overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 py-16 md:py-24 lg:py-[104px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-[50%] flex flex-col items-start text-white">
          <div className="flex items-center gap-2 mb-4 sm:mb-[20px]">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] sm:text-[12px] font-black tracking-[1.44px] text-indigo-200">
              ❖ OPEN AN ACCOUNT
            </span>
          </div>
          
          <SplitText
            text="Fully digital, regulated in India, your money custodied in India."
            tag="h2"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.2] tracking-[-0.96px] mb-4 sm:mb-[20px]"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="left"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[17px] md:text-[18px] text-indigo-100 mb-6 sm:mb-[36px]">
            Leave your details and a Vyomma specialist takes it from there. The entire process — KYC, account funding, and first trade — takes under 30 minutes.
          </p>
          
          <ul className="flex flex-col gap-3.5 sm:gap-[18px] w-full">
            {[
              "Paperless KYC in minutes",
              "Start from $3,000 — invest in fractions",
              "No foreign bank account needed",
              "Tax & LRS reporting handled for you"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 sm:gap-[14px]">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-[15px] sm:text-[17px] shrink-0 text-emerald-300">
                  ✓
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[15px] sm:text-[17px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - Form */}
        <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
          <div className="bg-white rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-[40px] w-full max-w-[536px] shadow-[0_25px_25px_rgba(0,0,0,0.35)]">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[20px] sm:text-[24px] text-slate-900 tracking-[-0.48px] mb-5 sm:mb-[28px]">
              Open your global account
            </h3>
            
            <form className="flex flex-col gap-4 sm:gap-[18px]" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 sm:gap-[6px]">
                <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-[13px] text-slate-600">
                  Full name
                </label>
                <input 
                  type="text" 
                  placeholder="As per Govt. ID"
                  className="bg-slate-50 border border-slate-200 rounded-[10px] h-[44px] sm:h-[47px] px-[16px] font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-[15px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow w-full"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-1.5 sm:gap-[6px]">
                <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-[13px] text-slate-600">
                  Mobile
                </label>
                <input 
                  type="tel" 
                  placeholder="+91"
                  className="bg-slate-50 border border-slate-200 rounded-[10px] h-[44px] sm:h-[47px] px-[16px] font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-[15px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 sm:gap-[6px]">
                <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-[13px] text-slate-600">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="you@email.com"
                  className="bg-slate-50 border border-slate-200 rounded-[10px] h-[44px] sm:h-[47px] px-[16px] font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-[15px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow w-full"
                />
              </div>

              {/* Dropdown */}
              <div className="flex flex-col gap-1.5 sm:gap-[6px]">
                <label className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs sm:text-[13px] text-slate-600">
                  I am a
                </label>
                <div className="relative w-full">
                  <select defaultValue="" className="bg-slate-50 border border-slate-200 rounded-[10px] h-[44px] sm:h-[47px] px-[16px] w-full font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-[15px] text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow cursor-pointer">
                    <option value="" disabled>Select investor type</option>
                    <option value="individual">Individual Investor</option>
                    <option value="hni">HNI</option>
                    <option value="family-office">Family Office</option>
                    <option value="nri">NRI</option>
                    <option value="institution">Institution</option>
                  </select>
                  <div className="absolute inset-y-0 right-[16px] flex items-center pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1L5 5L9 1" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button 
                type="submit"
                className="mt-2 bg-blue-900 hover:bg-blue-800 transition-colors text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[16px] py-3.5 sm:py-[14px] rounded-[10px] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                Contact us
                <span>→</span>
              </button>

              <p className="mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[10px] sm:text-[11px] text-slate-400 text-center leading-relaxed">
                By submitting this form you agree to our Terms of Service and Privacy Policy. Vyomma × Valura.AI is regulated through GIFT IFSC. Investments are subject to market risks. Please read all product documents carefully.
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
