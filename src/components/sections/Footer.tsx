import React from "react";
import footerWhite from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/footer white.png";
import footerBig from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/footer big.png";
import Velaris from "../ui/Velaris";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden pt-14 sm:pt-20 pb-8 sm:pb-12 text-white" style={{ background: "#050914" }}>

      {/* ── Velaris animated WebGL gradient background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Velaris
          height="100%"
          className="w-full h-full opacity-80"
          bg="#050914"
          colors={["#2563eb", "#7c3aed", "#0f172a", "#4f46e5"]}
          speed={3.5}
          grain={0.18}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 gap-x-6 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 md:mb-[100px]">

          {/* Column 1: Logo & Contact */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1">
            <div className="mb-4 sm:mb-[24px]">
              <img src={footerWhite} alt="Vyomma Logo" className="h-9 sm:h-[48px] w-auto object-contain" />
            </div>
            <p className="font-['Inter',sans-serif] font-medium text-[14px] sm:text-[15px] text-white/60 mb-4 sm:mb-[24px] leading-relaxed">
              {"You'll receive occasional emails from Vyomma. You always have the choice to unsubscribe within every email."}
            </p>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-['Inter',sans-serif] font-medium text-sm sm:text-[15px] px-5 sm:px-6 py-2.5 rounded-[8px] hover:bg-white/20 transition-colors cursor-pointer">
              Chat with us
            </button>
          </div>

          {/* Column 2: Platform */}
          <div className="flex flex-col items-start lg:ml-auto">
            <h4 className="font-['Inter',sans-serif] font-semibold text-[13px] sm:text-[14px] text-white/40 uppercase tracking-[1px] mb-3 sm:mb-[16px]">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-[12px] font-['Inter',sans-serif] text-sm sm:text-[15px] text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Markets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Income Notes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pre-IPO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col items-start lg:ml-auto">
            <h4 className="font-['Inter',sans-serif] font-semibold text-[13px] sm:text-[14px] text-white/40 uppercase tracking-[1px] mb-3 sm:mb-[16px]">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-[12px] font-['Inter',sans-serif] text-sm sm:text-[15px] text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="flex flex-col items-start lg:ml-auto">
            <h4 className="font-['Inter',sans-serif] font-semibold text-[13px] sm:text-[14px] text-white/40 uppercase tracking-[1px] mb-3 sm:mb-[16px]">
              Legal &amp; Compliance
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-[12px] font-['Inter',sans-serif] text-sm sm:text-[15px] text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GIFT IFSC Licence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="flex flex-col items-start lg:ml-auto">
            <h4 className="font-['Inter',sans-serif] font-semibold text-[13px] sm:text-[14px] text-white/40 uppercase tracking-[1px] mb-3 sm:mb-[16px]">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5 sm:gap-[12px] font-['Inter',sans-serif] text-sm sm:text-[15px] text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Help Centre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Onboarding Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fee Schedule</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer + Copyright */}
        <div className="border-t border-white/10 pt-6 sm:pt-[32px] flex flex-col gap-3">
          <p className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] text-white/35 text-center leading-relaxed max-w-[860px] mx-auto">
            Investments through this platform are subject to market risk. GIFT IFSC regulated. Read all product-related documents carefully before investing.
          </p>
          <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-white/45 text-center">
            © 2026 Vyomma Financial Advisors × Valura.AI Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>

      {/* Giant Watermark Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1746px] h-[80px] sm:h-[120px] md:h-[167px] pointer-events-none opacity-15 overflow-hidden">
        <img src={footerBig} alt="Vyomma Watermark" className="w-full h-full object-contain object-bottom" />
      </div>

    </footer>
  );
}
