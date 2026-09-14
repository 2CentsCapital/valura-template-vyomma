import { ShieldCheck } from "lucide-react"
import SplitText from "../ui/SplitText"
import Reveal from "../../motion/Reveal"
import { legal } from "../../config/site"
import { facts } from "../../content/facts"

const ROWS = [
  { label: "Broker-dealer", value: legal.entity },
  { label: "Regulator", value: "IFSCA, GIFT City" },
  {
    label: "Registered address",
    value: "GIFT SEZ, GIFT City, Gandhinagar, Gujarat 382355",
  },
  { label: "Funding", value: "In rupees, under the RBI's LRS" },
  {
    label: "LRS allowance",
    value: `Up to ${facts.lrsLimit} each financial year`,
  },
  { label: "Reporting", value: "Consolidated, in INR and USD" },
  { label: "Fees", value: "Disclosed at onboarding" },
]

export default function TrustRegulation() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="bg-white py-14 sm:py-20 w-full overflow-hidden"
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="flex flex-col items-center max-w-[780px] mx-auto text-center px-2">
          <Reveal
            as="p"
            y={12}
            className="mb-4 inline-flex rounded-full bg-[#eef2ff] px-3.5 sm:px-4 py-1 sm:py-1.5 font-display text-xs sm:text-[13px] font-extrabold text-indigo-700"
          >
            Trust, in specifics
          </Reveal>
          <SplitText
            id="trust-title"
            text="Regulated at GIFT City. One consolidated view."
            tag="h2"
            splitType="chars"
            textAlign="center"
            className="font-display font-extrabold text-[28px] sm:text-[34px] md:text-[40px] text-[#0f172a] leading-[1.25] tracking-[-0.8px] mb-3 sm:mb-[20px]"
          />
          <Reveal
            as="p"
            delay={100}
            className="font-display font-medium text-[16px] sm:text-[19px] md:text-[21px] text-[#1e293b] leading-[1.6] mb-4 sm:mb-6"
          >
            {legal.entity} is an IFSCA-regulated broker-dealer at GIFT City: a
            regulated route for resident Indians to invest in permitted global
            products.
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            className="font-display text-[15px] sm:text-[17px] text-[#475569] leading-[1.7] mb-8 sm:mb-10 max-w-[680px]"
          >
            Rupees move under LRS to an IFSC entity, and reporting comes back
            consolidated, in INR and USD, ready for your tax workflow.
          </Reveal>
        </div>

        <Reveal
          y={28}
          duration={750}
          className="w-full max-w-[720px] rounded-2xl sm:rounded-[24px] border border-slate-200 bg-[#fafafc] p-5 sm:p-8 shadow-[0_4px_7px_rgba(0,0,0,0.04)]"
        >
          <h3 className="flex items-center gap-2 font-display font-bold text-[16px] sm:text-[18px] text-[#0f172a] mb-2 sm:mb-3">
            <ShieldCheck
              className="size-5 text-brand-blue-deep"
              aria-hidden="true"
            />
            Regulation and registrations
          </h3>
          <dl className="divide-y divide-slate-200">
            {ROWS.map((row, index) => (
              <Reveal
                key={row.label}
                delay={120 + index * 50}
                y={10}
                duration={550}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-6 py-3"
              >
                <dt className="font-sans text-[13px] sm:text-[14px] font-semibold text-slate-600">
                  {row.label}
                </dt>
                <dd className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#0f172a] sm:text-right">
                  {row.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
