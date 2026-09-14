import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SplitText from "../ui/SplitText"
import { APP_URL, LEAD_FORM_ID, brand, legal } from "../../config/site"
import { facts } from "../../content/facts"

const FAQS = [
  {
    question: "What can I invest in?",
    answer: `Global stocks and ETFs across ${facts.markets} global markets, including ${facts.usStocksAndEtfs} US stocks and ETFs, plus international mutual funds, global bonds, structured income notes and pre-IPO opportunities, all from one account.`,
  },
  {
    question: "How much do I need to start?",
    answer: `Less than you'd think. US stocks and ETFs are fractional from ${facts.fractionalFrom}. Pre-IPO allocations have a minimum ticket of ${facts.preIpoMinimum}, minimums for bonds and structured notes are disclosed per issue, and eligibility applies to structured products and pre-IPO.`,
  },
  {
    question: "Is it legal for an Indian resident to invest abroad this way?",
    answer: `Yes. Rupees move under the RBI's Liberalised Remittance Scheme (LRS) to an IFSCA-regulated broker-dealer at GIFT IFSC, a regulated route for resident Indians to access permitted global products. Under LRS, resident Indians can invest up to ${facts.lrsLimit} abroad each financial year.`,
  },
  {
    question: "How are tax and TCS handled?",
    answer:
      "Your LRS usage, Schedule FA and capital-gains statements are generated for you, ready to hand to your CA. Tax collected at source (TCS) can apply to LRS remittances above the threshold set under the Income Tax Act: your bank collects it when you remit, and you can claim it against your income-tax liability when you file your return. Rates and thresholds change, so check the current rules with your bank or tax adviser.",
  },
  {
    question: "Where are my investments held?",
    answer: `Investments are made through ${legal.entity}, an IFSCA-regulated broker-dealer at GIFT City. Your funds move through India's GIFT City financial hub and are held with regulated custodians, and you don't need a foreign bank account.`,
  },
  {
    question: "How do I open an account?",
    answer: `Finish a paperless KYC with your PAN and Aadhaar, add funds in rupees under LRS, and start investing. To begin, ${
      APP_URL ? "open your account online, " : ""
    }leave your details in the form on this page or download the Valura.Ai app.`,
  },
  {
    question: "Can I bring my money back to India?",
    answer:
      "Yes. USD balances are repatriable on request. FX, settlement and reporting are handled by the IFSC broker-dealer, and you get a single statement showing realised gains in both currencies.",
  },
  {
    question: "What does it cost?",
    answer:
      "Fees and charges are disclosed at onboarding, before you invest. Product-level fees on structured notes and funds are set out in their term sheets.",
  },
  {
    question: "Who is Valura.Ai?",
    answer: `Valura.Ai is the global-investment platform behind this account. Its regulated entity is ${legal.entity}, an IFSCA-regulated broker-dealer at GIFT City. ${brand.partner} brings it to you.`,
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-white py-16 md:py-24 lg:py-[104px] w-full"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="w-full lg:w-[45%] flex flex-col items-start">
          <p className="bg-[#eef2ff] rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-5 font-display font-extrabold text-xs sm:text-[13px] text-indigo-700">
            Good to know
          </p>

          <SplitText
            id="faq-title"
            text="Questions, answered simply."
            tag="h2"
            className="font-display font-extrabold text-[28px] sm:text-[36px] md:text-[44px] text-slate-900 leading-[1.2] tracking-[-0.88px] mb-2 sm:mb-3 max-w-[490px]"
            delay={35}
            duration={0.8}
            ease="power3.out"
            splitType="words, chars"
            textAlign="left"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="font-display text-[14px] sm:text-[16px] text-[#475569] leading-[1.6] mb-5 sm:mb-8 lg:mb-[32px] max-w-[420px]">
            Everything you need to know about investing globally with{" "}
            {brand.fullName}.
          </p>

          <a
            href={`#${LEAD_FORM_ID}`}
            className="bg-[#eef2ff] hover:bg-indigo-100 transition-colors rounded-full px-5 sm:px-7 py-2.5 sm:py-3 mb-8 sm:mb-12 lg:mb-16 font-display font-bold text-sm sm:text-[15px] text-indigo-700"
          >
            Still have a question? Talk to us
          </a>

          <div
            className="relative w-[180px] sm:w-[220px] h-[140px] sm:h-[170px] mt-2 sm:mt-[20px] mx-auto lg:mx-0"
            aria-hidden="true"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <circle cx="40" cy="40" r="16" fill="#fca5a5" />
              <g transform="translate(30, 100) rotate(-15)">
                <path
                  d="M0 0 C0 -25, 35 -25, 35 0 C35 25, 17.5 25, 17.5 45"
                  stroke="#fbbf24"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <circle cx="17.5" cy="65" r="8" fill="#fbbf24" />
              </g>
              <g transform="translate(120, 100) rotate(15)">
                <path
                  d="M0 0 C0 -25, 35 -25, 35 0 C35 25, 17.5 25, 17.5 45"
                  stroke="#6ee7b7"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <circle cx="17.5" cy="65" r="8" fill="#6ee7b7" />
              </g>
              <g transform="translate(70, 80)">
                <path
                  d="M0 0 C0 -35, 50 -35, 50 0 C50 35, 25 35, 25 55"
                  stroke="#8b5cf6"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <circle cx="25" cy="80" r="10" fill="#8b5cf6" />
              </g>
            </svg>
          </div>
        </div>

        <div className="w-full lg:w-[55%] flex flex-col gap-3.5 sm:gap-[18px]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            const buttonId = `faq-question-${index}`
            const panelId = `faq-answer-${index}`
            return (
              <div
                key={faq.question}
                className={`rounded-xl sm:rounded-[16px] border transition-colors duration-300 ${
                  isOpen
                    ? "bg-white border-indigo-400 shadow-[0_4px_7px_rgba(0,0,0,0.04)]"
                    : "bg-slate-50 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl sm:rounded-[16px] px-4 sm:px-6 py-4 sm:py-[22px] text-left font-display font-bold text-[15px] sm:text-[17px] text-slate-900 tracking-[-0.34px]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] visible"
                      : "grid-rows-[0fr] invisible"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-4 sm:mx-6 mb-4 sm:mb-[22px] pt-3 sm:pt-[16px] border-t border-slate-100">
                      <p className="font-display text-[14px] md:text-[15px] text-slate-600 leading-[1.6]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
