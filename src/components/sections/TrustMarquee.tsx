import Reveal from "../../motion/Reveal"
import { diamondPaths } from "../brand/vyommaPaths"
import { facts } from "../../content/facts"

// Only verifiable Valura.Ai facts: no partner, exchange or regulator logos.
const FACTS = [
  { figure: facts.markets, label: "Global markets, one account" },
  { figure: facts.instruments, label: "Stocks, funds and bonds to own" },
  { figure: facts.usStocksAndEtfs, label: "US stocks and ETFs" },
  { figure: `From ${facts.fractionalFrom}`, label: "Fractional investing" },
  { figure: facts.lrsLimit, label: "Each financial year under LRS" },
  { figure: "IFSCA", label: "Regulated at GIFT City" },
  { figure: "₹", label: "Funded in rupees under LRS" },
]

function DiamondSeparator() {
  return (
    <span
      className="h-[100px] px-6 sm:px-8 shrink-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        className="size-[14px] block"
        fill="none"
        viewBox="0 0 18 18"
        focusable="false"
      >
        <g opacity="0.3">
          {diamondPaths.map((d, index) => (
            <path key={index} d={d} fill="#0B2240" />
          ))}
        </g>
      </svg>
    </span>
  )
}

interface FactItemProps {
  figure: string
  label: string
}

function FactItem({ figure, label }: FactItemProps) {
  return (
    <span className="flex flex-col items-center justify-between h-[100px] min-w-[130px] shrink-0 py-1 select-none">
      <span className="h-[60px] flex items-center justify-center font-sans font-extrabold text-[40px] sm:text-[48px] text-[#0b2240] tracking-[-1.5px] leading-none whitespace-nowrap">
        {figure}
      </span>
      <span className="font-sans font-bold text-[13px] text-[#0b2240] tracking-[-0.13px] whitespace-nowrap">
        {label}
      </span>
    </span>
  )
}

function FactList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex items-center shrink-0"
      aria-hidden={hidden || undefined}
    >
      {FACTS.map((fact) => (
        <li key={fact.label} className="flex items-center">
          <FactItem figure={fact.figure} label={fact.label} />
          <DiamondSeparator />
        </li>
      ))}
    </ul>
  )
}

export default function TrustMarquee() {
  return (
    <section
      aria-labelledby="facts-title"
      className="relative z-20 -mt-14 sm:-mt-20 md:-mt-28 lg:-mt-36 w-full bg-white pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        <Reveal
          as="h2"
          id="facts-title"
          y={12}
          className="font-sans font-semibold text-base sm:text-lg md:text-[20px] text-[#475569] tracking-[-0.2px]"
        >
          One account, the world's markets
        </Reveal>
      </div>

      <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-stretch bg-white">
        <div className="lg:w-[270px] xl:w-[290px] shrink-0 bg-white flex items-center justify-center lg:justify-start px-6 sm:px-10 py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#e4e0d4] z-20 select-none">
          <p className="font-sans font-bold text-lg sm:text-[20px] text-[#0d1117] leading-[1.3] text-center lg:text-left">
            IFSCA-regulated, <br className="hidden lg:block" />
            funded in rupees
          </p>
        </div>

        {/* The ticker moves for every visitor; hover, keyboard focus or the footer control pauses it */}
        <div
          role="group"
          aria-label="Key facts. Hover or focus to pause the moving list."
          tabIndex={0}
          className="marquee-group relative flex-1 min-w-0 rounded-lg focus-visible:[outline-offset:-3px]"
        >
          <div className="relative overflow-hidden py-3 sm:py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_35px,black_calc(100%-35px),transparent_100%)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="animate-marquee flex items-center">
              <FactList />
              <FactList hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
