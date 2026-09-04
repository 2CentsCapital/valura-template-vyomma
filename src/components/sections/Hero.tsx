import imgImageUser1 from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/1f130492b0348f9080d69743569a6e4acbdf7593.png";
import imgImageUser2 from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/3be6243e6970e9074dae2c60172f45710d95f15d.png";
import imgImageUser3 from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/9c3bc2f28a07c069c62f8ed0773f00288161d7cb.png";
import imgDashboardMockup from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/5cdc1c7e0eb892a1f421503c88660fe940b899ab.png";
import svgPaths from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/svg-199um8fzce";
import GradientWaves from "../ui/GradientWaves";
import SplitText from "../ui/SplitText";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full pt-10 sm:pt-14 md:pt-20 pb-0 overflow-hidden bg-white">
      {/* Background Gradient Waves */}
      <div className="absolute inset-0 z-0">
        <GradientWaves
          horizonColor="#3b82f6"
          waveColor="#3b82f6"
          crestColor="#1414c6"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.0}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1.0}
          opacity={1.0}
          mouseInteraction={true}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.03}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Main Content Block */}
        <div className="flex flex-col items-center text-center max-w-[900px] mx-auto w-full">

          {/* Eyebrow */}
          <div className="mb-4 sm:mb-5 inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-blue-200/70 rounded-full px-4 py-1.5">
            <span className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] font-bold tracking-[1.2px] text-blue-700 uppercase">
              Vyomma × Valura.AI
            </span>
          </div>

          {/* Main Headline */}
          <SplitText
            text="The Global Investment Desk for Indian Investors"
            tag="h1"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[30px] sm:text-[44px] md:text-[54px] lg:text-[62px] leading-[1.1] md:leading-[1.12] tracking-[-1.2px] sm:tracking-[-2px] text-[#0f172a] max-w-[860px]"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign="center"
          />

          {/* Subtitle / Description */}
          <SplitText
            text="Access 4,000+ US equities, 5–9% USD income notes, and curated pre-IPO deals — from India, regulated through GIFT IFSC, managed by the same research team and RM you already trust."
            tag="p"
            className="mt-5 sm:mt-6 max-w-[700px] font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[14px] sm:text-[17px] md:text-[19px] leading-relaxed md:leading-[30px] text-[#475569] px-2 sm:px-0"
            delay={12}
            duration={0.7}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 15 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign="center"
          />

          {/* Call To Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button className="w-full sm:w-auto bg-gradient-to-b from-[#4da2ff] to-[#3e68f6] text-white font-['Inter',sans-serif] font-bold text-base sm:text-lg md:text-[18px] px-8 sm:px-10 py-3 sm:py-4 rounded-[14px] sm:rounded-[16px] shadow-[0_8px_20px_rgba(62,104,246,0.3)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer">
              Open an Account
            </button>

            {/* Secondary CTA */}
            <button className="w-full sm:w-auto relative border border-[#c4c8ff] bg-gradient-to-b from-[#eef0ff] to-[#e4e7ff] text-[#6f41ee] font-['Inter',sans-serif] font-bold text-base sm:text-lg md:text-[18px] px-8 sm:px-10 py-3 sm:py-4 rounded-[14px] sm:rounded-[16px] drop-shadow-[0px_11px_11px_rgba(53,62,185,0.09)] shadow-[inset_0px_-2px_1px_0px_rgba(151,158,255,0.35)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer">
              Explore Markets
            </button>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-6 sm:mt-8 mb-10 sm:mb-14 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-[#fafafc] border border-[#e2e8f0] rounded-2xl sm:rounded-full px-5 sm:px-6 py-3 sm:py-2 shadow-xs hover:border-slate-300 transition-colors max-w-full overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-1.5 sm:pr-5 sm:border-r sm:border-slate-200">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[13px] sm:text-[14px] text-[#1e293b]">418+</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] sm:text-[13px] text-[#64748b]">Authorised Persons</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 sm:px-5 sm:border-r sm:border-slate-200">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[13px] sm:text-[14px] text-[#1e293b]">30 yrs</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] sm:text-[13px] text-[#64748b]">of research-led wealth advice</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 sm:pl-5">
              <span className="text-amber-400 text-[13px]">★★★★★</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] sm:text-[13px] text-[#64748b]">Morningstar 5★ track record</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="w-full max-w-[1232px] mx-auto px-1 sm:px-0">
          <div className="relative rounded-t-xl sm:rounded-t-[28px] md:rounded-t-[32px] overflow-hidden drop-shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
            <img
              src={imgDashboardMockup}
              alt="VYOMMA Automated Task Scheduling and Wealth Workflow Dashboard"
              className="w-full h-auto object-cover object-top block"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
