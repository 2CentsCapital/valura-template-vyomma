import type { ReactNode } from "react"
import SplitText from "../ui/SplitText"
import { facts } from "../../content/facts"

type Shelf = {
  title: string
  description: string
  iconBg: string
  icon: ReactNode
}

function ShelfIcon({
  stroke,
  children,
}: {
  stroke: string
  children: ReactNode
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const SHELVES: Shelf[] = [
  {
    title: "Global stocks and ETFs",
    description: `Own Apple, Nvidia, Microsoft and thousands more, including ${facts.usStocksAndEtfs} US stocks and ETFs, in fractions from ${facts.fractionalFrom}.`,
    iconBg: "bg-[#dbeafe]",
    icon: (
      <ShelfIcon stroke="#2563eb">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </ShelfIcon>
    ),
  },
  {
    title: "Global mutual funds",
    description:
      "International funds for diversified global exposure, held in the same account as the rest of your portfolio.",
    iconBg: "bg-[#e9d5ff]",
    icon: (
      <ShelfIcon stroke="#9333ea">
        <path d="M12 3l9 5-9 5-9-5 9-5Z" />
        <path d="M3 13l9 5 9-5" />
      </ShelfIcon>
    ),
  },
  {
    title: "Global bonds",
    description:
      "Dollar income from global bonds. Coupons are indicative, disclosed per issue and not assured. Capital is at risk.",
    iconBg: "bg-[#bbf7d0]",
    icon: (
      <ShelfIcon stroke="#16a34a">
        <path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-6 10 6Z" />
      </ShelfIcon>
    ),
  },
  {
    title: "Structured income notes",
    description:
      "Notes from global banks that pay income in US dollars. Terms are disclosed per issue, returns are not assured, and each note carries the issuer's credit risk.",
    iconBg: "bg-[#60a5fa]",
    icon: (
      <ShelfIcon stroke="#ffffff">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </ShelfIcon>
    ),
  },
  {
    title: "Pre-IPO and unlisted",
    description: `Back private companies before they go public, with a minimum ticket of ${facts.preIpoMinimum}. Eligibility applies.`,
    iconBg: "bg-[#fed7aa]",
    icon: (
      <ShelfIcon stroke="#ea580c">
        <path d="M12 3l2.6 6.3L21 10l-5 4.3L17.5 21 12 17.4 6.5 21 8 14.3 3 10l6.4-.7L12 3Z" />
      </ShelfIcon>
    ),
  },
  {
    title: "Ready portfolios",
    description:
      "Global baskets you can buy in one tap, so you don't have to pick stocks one by one.",
    iconBg: "bg-[#1e293b]",
    icon: (
      <ShelfIcon stroke="#ffffff">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </ShelfIcon>
    ),
  },
]

export default function WhatYouCanHold() {
  return (
    <section
      id="invest"
      aria-labelledby="invest-title"
      className="bg-[#f5f6f7] py-14 sm:py-20 md:py-24 lg:py-[104px] w-full"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-[780px] text-center mb-8 sm:mb-12 lg:mb-[72px]">
          <p className="mb-3 font-sans text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.2px] text-brand-blue-deep">
            What you can hold
          </p>
          <SplitText
            id="invest-title"
            text={`One account. ${facts.markets} global markets.`}
            tag="h2"
            className="font-display font-extrabold text-[28px] sm:text-[34px] md:text-[44px] text-[#0f172a] leading-[1.25] tracking-[-0.88px] mb-2.5 sm:mb-[16px]"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="center"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-display text-[15px] sm:text-[16px] md:text-[18px] text-[#475569] leading-[1.6] px-1 sm:px-0">
            Six shelves under one IFSCA-regulated account. No second login, no
            overseas bank account.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-x-[40px] lg:gap-y-[56px] w-full max-w-[1200px]">
          {SHELVES.map((shelf) => (
            <li
              key={shelf.title}
              className="bg-white sm:bg-transparent rounded-2xl sm:rounded-none p-5 sm:p-2 border border-slate-200/70 sm:border-none shadow-xs sm:shadow-none flex flex-col items-center text-center"
            >
              <div
                className={`size-12 sm:size-14 md:size-[60px] rounded-xl sm:rounded-2xl md:rounded-[30px] flex items-center justify-center shadow-xs mb-3 sm:mb-[20px] lg:mb-[24px] shrink-0 ${shelf.iconBg}`}
              >
                {shelf.icon}
              </div>
              <h3 className="font-display font-bold text-[16px] sm:text-[17px] md:text-[20px] text-[#0f172a] leading-tight tracking-[-0.3px] mb-1.5 sm:mb-[12px]">
                {shelf.title}
              </h3>
              <p className="font-display text-[14px] sm:text-[14px] md:text-[15px] text-[#475569] leading-[1.6] max-w-[340px]">
                {shelf.description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 sm:mt-14 max-w-[860px] text-center font-sans text-[12.5px] sm:text-[13px] text-[#475569] leading-relaxed">
          Coupons on bonds and structured notes are indicative, set at issuance
          and not guaranteed. Capital is at risk, and structured products carry
          the credit risk of the issuing bank. Availability and minimums depend
          on eligibility and suitability.
        </p>
      </div>
    </section>
  )
}
