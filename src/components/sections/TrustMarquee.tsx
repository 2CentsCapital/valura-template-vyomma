import { useState } from "react"
import { Pause, Play } from "lucide-react"
import { diamondPaths } from "../brand/vyommaPaths"
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion"
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
  const reduceMotion = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)

  return (
    <section
      aria-labelledby="facts-title"
      className="relative z-20 -mt-14 sm:-mt-20 md:-mt-28 lg:-mt-36 w-full bg-white pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        <h2
          id="facts-title"
          className="font-sans font-semibold text-base sm:text-lg md:text-[20px] text-[#475569] tracking-[-0.2px]"
        >
          One account, the world's markets
        </h2>
      </div>

      <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-stretch bg-white">
        <div className="lg:w-[270px] xl:w-[290px] shrink-0 bg-white flex items-center justify-center lg:justify-start px-6 sm:px-10 py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#e4e0d4] z-20 select-none">
          <p className="font-sans font-bold text-lg sm:text-[20px] text-[#0d1117] leading-[1.3] text-center lg:text-left">
            IFSCA-regulated, <br className="hidden lg:block" />
            funded in rupees
          </p>
        </div>

        {reduceMotion ? (
          <ul className="flex-1 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-4 sm:py-6">
            {FACTS.map((fact) => (
              <li key={fact.label}>
                <FactItem figure={fact.figure} label={fact.label} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative flex-1 overflow-hidden py-3 sm:py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_35px,black_calc(100%-35px),transparent_100%)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
            <div
              className="animate-marquee flex items-center"
              data-paused={paused}
            >
              <FactList />
              <FactList hidden />
            </div>
          </div>
        )}
      </div>

      {!reduceMotion && (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 font-sans text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {paused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
            {paused ? "Play" : "Pause"}
            <span className="sr-only"> the moving list of facts</span>
          </button>
        </div>
      )}
    </section>
  )
}
