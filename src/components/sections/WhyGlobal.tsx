import globalMarkets640 from "../../assets/media/global-markets-640.webp"
import globalMarkets1220 from "../../assets/media/global-markets-1220.webp"
import SplitText from "../ui/SplitText"
import Reveal from "../../motion/Reveal"
import { legal } from "../../config/site"
import { facts } from "../../content/facts"

const POINTS = [
  "No foreign bank account needed",
  "Paperless KYC, AI-assisted research and one dashboard for everything you own",
  `Fractional investing from ${facts.fractionalFrom}, pre-IPO from ${facts.preIpoMinimum}`,
]

// Illustrative split for the mock portfolio card. Deliberately shown without figures.
const SEGMENTS = [
  { label: "India portfolio", color: "#06064F", share: 0.5 },
  { label: "Global stocks and ETFs", color: "#3E68F6", share: 0.3 },
  // U+2011 non-breaking hyphen keeps "pre-IPO" on one line in the narrow legend
  { label: "USD income and pre‑IPO", color: "#6F41EE", share: 0.2 },
]
const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARCS = SEGMENTS.map((segment, index) => ({
  ...segment,
  length: segment.share * CIRCUMFERENCE,
  offset: SEGMENTS.slice(0, index).reduce(
    (sum, previous) => sum + previous.share * CIRCUMFERENCE,
    0,
  ),
}))

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 size-5 sm:size-6 mt-0.5"
    >
      <circle cx="12" cy="12" r="12" fill="#3E68F6" />
      <path
        d="M7.5 12.5L10.5 15.5L17 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PortfolioCard() {
  return (
    <Reveal
      delay={200}
      y={32}
      className="w-full max-w-[360px] sm:max-w-none sm:w-[340px] md:w-[360px] lg:w-[370px] z-10 static sm:absolute sm:bottom-[-28px] md:bottom-[-36px] lg:-bottom-14 sm:left-1/2 sm:-translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-left-14 mt-4 sm:mt-0 mx-auto sm:mx-0"
    >
      {/* Floats gently on its own phase, apart from the hero preview */}
      <figure className="float-soft float-soft-late bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100">
        <p className="font-display text-[20px] sm:text-[24px] text-[#141518] mb-4 sm:mb-6 font-semibold">
          Your portfolio
        </p>
        <div className="flex items-center gap-5 sm:gap-8">
          <div
            className="relative size-[80px] sm:size-[100px] shrink-0"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 100"
              className="donut-turn w-full h-full -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="transparent"
                stroke="#F3F4F6"
                strokeWidth="20"
              />
              {ARCS.map((arc) => (
                <circle
                  key={arc.label}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="transparent"
                  stroke={arc.color}
                  strokeWidth="20"
                  strokeDasharray={`${arc.length} ${CIRCUMFERENCE - arc.length}`}
                  strokeDashoffset={-arc.offset}
                />
              ))}
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-center font-sans font-bold text-[#141518] text-[10px] sm:text-[11px] leading-tight">
              INR
              <br />+ USD
            </span>
          </div>
          <ul className="flex flex-col gap-2.5 sm:gap-3.5 w-full">
            {SEGMENTS.map((segment) => (
              <li
                key={segment.label}
                className="flex items-center gap-2 font-sans text-[13px] sm:text-[14px] font-medium text-[#141518]"
              >
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ background: segment.color }}
                  aria-hidden="true"
                />
                {segment.label}
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="mt-4 font-sans text-[11px] text-slate-600">
          {legal.illustrative}
        </figcaption>
      </figure>
    </Reveal>
  )
}

export default function WhyGlobal() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="bg-white py-16 md:py-24 lg:py-[104px] w-full overflow-hidden"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-[45%] flex flex-col items-start shrink-0">
            <Reveal
              as="p"
              y={12}
              className="mb-3 font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.2px] text-brand-blue-deep"
            >
              Why global, why now
            </Reveal>
            <SplitText
              id="why-title"
              text="A portfolio with two engines."
              tag="h2"
              splitType="chars"
              textAlign="left"
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.1] tracking-[-1px] text-[#141518] mb-4 sm:mb-6 lg:mb-8"
            />

            <Reveal
              as="p"
              delay={100}
              className="font-sans text-[15px] sm:text-[17px] lg:text-[18px] text-[#5f6368] leading-[1.6] mb-6 sm:mb-10 lg:mb-[44px] max-w-[480px]"
            >
              India built your wealth. The rest of the world can diversify it.
              This isn't a switch from rupees to dollars. It's a second engine,
              added to the portfolio you already hold in India.
            </Reveal>

            <ul className="flex flex-col gap-5 sm:gap-7 lg:gap-[30px] mb-8 sm:mb-10 lg:mb-[56px] w-full">
              {POINTS.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  delay={160 + index * 80}
                  y={16}
                  className="flex items-start gap-3.5 sm:gap-4"
                >
                  <CheckIcon />
                  <span className="font-sans font-bold text-[#4b5563] text-[15px] sm:text-[17px] lg:text-[18px]">
                    {point}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} y={16} className="w-full sm:w-auto">
              <a
                href="#invest"
                className="btn-sheen block sm:inline-block w-full sm:w-auto text-center bg-gradient-to-b from-brand-blue to-brand-blue-deep text-white font-sans font-bold text-base sm:text-lg lg:text-[20px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[14px] sm:rounded-[16px] shadow-lg shadow-blue-500/20 transition-transform duration-300 ease-out-quint hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See what you can hold{" "}
                <span aria-hidden="true" className="nudge">
                  →
                </span>
              </a>
            </Reveal>
          </div>

          <div className="w-full lg:w-[55%] flex flex-col sm:relative items-center lg:items-end mt-4 sm:mt-8 lg:mt-0">
            <Reveal
              y={32}
              scale={0.98}
              duration={800}
              className="relative w-full max-w-[661px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[540px] xl:h-[598px] rounded-2xl sm:rounded-[30px] bg-slate-100 overflow-hidden shadow-xl"
            >
              <img
                src={globalMarkets1220}
                srcSet={`${globalMarkets640} 640w, ${globalMarkets1220} 1220w`}
                sizes="(min-width: 1024px) 661px, 100vw"
                width={1220}
                height={1289}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </Reveal>
            <PortfolioCard />
          </div>
        </div>
      </div>
    </section>
  )
}
