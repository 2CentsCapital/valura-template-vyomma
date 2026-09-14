import screenKyc from "../../assets/app/screen-kyc.webp"
import screenFund from "../../assets/app/screen-fund.webp"
import screenTrack from "../../assets/app/screen-track.webp"
import SplitText from "../ui/SplitText"
import Reveal from "../../motion/Reveal"
import { legal } from "../../config/site"
import { facts } from "../../content/facts"

const STEPS = [
  {
    image: screenKyc,
    alt: "App screen listing uploaded PAN card and Aadhaar card documents",
    title: "Open your account",
    description:
      "Finish a paperless KYC with your PAN and Aadhaar. No branch visit, no overseas forms.",
  },
  {
    image: screenFund,
    alt: "App screen showing a linked Indian bank account",
    title: "Add funds",
    description: `Transfer rupees from your Indian bank account through the regulated GIFT City route under the RBI's LRS, up to ${facts.lrsLimit} each financial year.`,
  },
  {
    image: screenTrack,
    alt: "App screen with portfolio analysis metrics such as returns, volatility and drawdown",
    title: "Start investing",
    description:
      "Buy global stocks, funds, bonds, income notes and pre-IPO, then track it all in one place, in INR and USD.",
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="bg-white py-16 md:py-24 lg:py-[104px] w-full overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-12 sm:mb-16 lg:mb-[80px] max-w-[800px]">
          <Reveal
            as="p"
            y={12}
            className="mb-3 font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.2px] text-brand-blue-deep"
          >
            How it works
          </Reveal>
          <SplitText
            id="how-title"
            text="Go global in three steps."
            tag="h2"
            splitType="chars"
            textAlign="center"
            className="font-display font-semibold text-[30px] sm:text-[40px] md:text-[46px] lg:text-[52px] text-[#141518] leading-[1.1] tracking-[-1px] mb-3 sm:mb-[20px]"
          />
          <Reveal
            as="p"
            delay={100}
            className="font-sans font-medium text-[15px] sm:text-[17px] md:text-[18px] text-[#5f6368] leading-[1.6] px-2 sm:px-0"
          >
            KYC once. Fund in rupees. Invest in dollars. FX and global
            onboarding are handled for you behind the scenes.
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1340px]">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 110}
              y={32}
              duration={750}
              className={`flex ${
                index === 2
                  ? "md:col-span-2 lg:col-span-1 w-full max-w-md md:max-w-none mx-auto md:mx-0"
                  : ""
              }`}
            >
              {/* Lifts on hover while the app screen eases in closer */}
              <div className="lift-card bg-[#dce8ff] rounded-2xl sm:rounded-[24px] w-full flex flex-col p-5 sm:p-[24px] shadow-md">
                <figure className="bg-white rounded-xl sm:rounded-[16px] w-full shadow-xs overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.alt}
                      width={820}
                      height={547}
                      loading="lazy"
                      decoding="async"
                      className="lift-zoom w-full h-auto block"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-center font-sans text-[11px] text-slate-600 border-t border-slate-100">
                    {legal.illustrative}
                  </figcaption>
                </figure>
                <div className="pt-5 pb-2 px-1 text-center">
                  <p className="mb-1.5 font-sans text-[12px] font-bold uppercase tracking-[1.2px] text-brand-blue-deep">
                    Step {index + 1}
                  </p>
                  <h3 className="font-display font-semibold text-[19px] sm:text-[21px] text-[#141518] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] text-[#475569] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
