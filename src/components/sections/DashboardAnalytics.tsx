import React from "react";
import SplitText from "../ui/SplitText";

export default function DashboardAnalytics() {
  return (
    <section id="analytics" className="bg-white py-16 md:py-24 lg:py-[104px] w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-[80px] max-w-[800px]">
          <SplitText
            text="See your global allocation at a glance"
            tag="h2"
            className="font-['Clash_Grotesk',sans-serif] font-medium text-[30px] sm:text-[40px] md:text-[46px] lg:text-[52px] text-[#141518] leading-[1.1] mb-3 sm:mb-[20px]"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="center"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-['Inter',sans-serif] font-medium text-[15px] sm:text-[17px] md:text-[18px] text-[#797979] leading-[1.6] px-2 sm:px-0">
            Track performance across US equities, income notes, and pre-IPO holdings week by week, month by month — all reconciled against your domestic portfolio.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1340px]">
          
          {/* Card 1 */}
          <div className="bg-[#dce8ff] rounded-2xl sm:rounded-[24px] w-full flex flex-col p-5 sm:p-[24px] relative transition-transform hover:-translate-y-1.5 shadow-md">
            <div className="bg-white rounded-xl sm:rounded-[16px] w-full shadow-xs overflow-hidden">
              <img
                src="/1.png"
                alt="Advanced Portfolio Analytics"
                className="w-full h-auto block"
              />
            </div>
            <div className="pt-5 pb-2 px-1 text-center">
              <h3 className="font-['Clash_Grotesk',sans-serif] font-medium text-[19px] sm:text-[21px] text-[#141518] mb-2 text-center">
                Advanced Portfolio Analytics
              </h3>
              <p className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[#64748b] leading-[1.6] text-center">
                Monitor returns, risk metrics &amp; portfolio performance, real-time investment insights.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#dce8ff] rounded-2xl sm:rounded-[24px] w-full flex flex-col p-5 sm:p-[24px] relative transition-transform hover:-translate-y-1.5 shadow-md">
            <div className="bg-white rounded-xl sm:rounded-[16px] w-full shadow-xs overflow-hidden">
              <img
                src="/2.png"
                alt="Secure Digital KYC Management"
                className="w-full h-auto block"
              />
            </div>
            <div className="pt-5 pb-2 px-1 text-center">
              <h3 className="font-['Clash_Grotesk',sans-serif] font-medium text-[19px] sm:text-[21px] text-[#141518] mb-2 text-center">
                Secure Digital KYC Management
              </h3>
              <p className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[#64748b] leading-[1.6] text-center">
                Store, verify, access your KYC documents securely from one centralized dashboard.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#dce8ff] rounded-2xl sm:rounded-[24px] w-full flex flex-col p-5 sm:p-[24px] relative transition-transform hover:-translate-y-1.5 shadow-md md:col-span-2 lg:col-span-1 max-w-md md:max-w-none mx-auto md:mx-0">
            <div className="bg-white rounded-xl sm:rounded-[16px] w-full shadow-xs overflow-hidden">
              <img
                src="/3.png"
                alt="Manage All Linked Bank Accounts"
                className="w-full h-auto block"
              />
            </div>
            <div className="pt-5 pb-2 px-1 text-center">
              <h3 className="font-['Clash_Grotesk',sans-serif] font-medium text-[19px] sm:text-[21px] text-[#141518] mb-2 text-center">
                Manage All Linked Bank Accounts
              </h3>
              <p className="font-['Inter',sans-serif] text-[13px] sm:text-[14px] text-[#64748b] leading-[1.6] text-center">
                Connect, organize &amp; manage multiple bank accounts for seamless transactions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
