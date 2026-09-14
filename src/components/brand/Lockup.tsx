import valuraGreen from "../../assets/brand/valura-green.png"
import valuraWhite from "../../assets/brand/valura-white.png"
import { VyommaRibbon, VyommaWordmark } from "./VyommaLogo"
import { brand } from "../../config/site"

type LockupProps = {
  tone?: "light" | "dark"
  className?: string
}

/**
 * "Vyomma powered by Valura.Ai" lockup: the Vyomma mark and wordmark, a small "Powered by" label, and the
 * Valura mark exactly as supplied (green on light, white on dark, never recoloured) with the Valura.Ai name.
 */
export default function Lockup({
  tone = "light",
  className = "",
}: LockupProps) {
  const dark = tone === "dark"
  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
    >
      <span className="sr-only">{brand.fullName}</span>
      <VyommaRibbon className="h-8 sm:h-9 w-auto shrink-0" />
      <span className="flex flex-col items-end" aria-hidden="true">
        <VyommaWordmark tone={tone} className="h-[14px] sm:h-[16px] w-auto" />
        <span className="mt-[5px] inline-flex items-center gap-[5px] whitespace-nowrap leading-none">
          <span
            className={`font-sans text-[9px] sm:text-[10px] font-medium ${
              dark ? "text-white/80" : "text-slate-600"
            }`}
          >
            Powered by
          </span>
          <img
            src={dark ? valuraWhite : valuraGreen}
            alt=""
            width={344}
            height={479}
            decoding="async"
            className="h-[11px] sm:h-[12px] w-auto"
          />
          <span
            className={`font-display text-[11px] sm:text-[12px] font-bold tracking-[-0.01em] ${
              dark ? "text-white" : "text-valura-green"
            }`}
          >
            Valura.Ai
          </span>
        </span>
      </span>
    </span>
  )
}
