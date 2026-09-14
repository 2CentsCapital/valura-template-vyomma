import { useEffect, useRef, useState } from "react"
import footerWordmark from "../../assets/media/footer-wordmark.webp"
import Velaris from "../ui/Velaris"
import { canUseWebGL } from "../ui/webgl"
import Lockup from "../brand/Lockup"
import StoreButtons from "../common/StoreButtons"
import MotionToggle from "../common/MotionToggle"
import Reveal from "../../motion/Reveal"
import useAnimationsPaused from "../../motion/animationsPaused"
import useNearViewport from "../../hooks/useNearViewport"
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion"
import { LEAD_FORM_ID, brand, legal, links } from "../../config/site"

const SHADER_COLORS = ["#2563eb", "#7c3aed", "#0f172a", "#4f46e5"]

const EXPLORE = [
  { href: "#why", label: "Why global" },
  { href: "#trust", label: "Trust and regulation" },
  { href: "#invest", label: "What you can hold" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
]

const headingClass =
  "font-sans font-semibold text-[13px] sm:text-[14px] text-white/80 uppercase tracking-[1px] mb-3 sm:mb-[16px]"
const listClass =
  "flex flex-col gap-2.5 sm:gap-[12px] font-sans text-sm sm:text-[15px] text-white/85"
const linkClass =
  "link-underline hover:text-white transition-colors duration-300"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const nearViewport = useNearViewport(footerRef, "300px")
  const reduceMotion = usePrefersReducedMotion()
  const paused = useAnimationsPaused()
  const [shaderMounted, setShaderMounted] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    // The gradient starts once the footer is near and animations are playing; once mounted, pausing freezes it.
    if (!shaderMounted && nearViewport && !paused && canUseWebGL(1))
      setShaderMounted(true)
  }, [nearViewport, paused, shaderMounted])

  return (
    <footer
      ref={footerRef}
      className="on-dark relative w-full overflow-hidden pt-14 sm:pt-20 pb-28 sm:pb-36 md:pb-48 text-white bg-[#050914]"
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="footer-backdrop absolute inset-0" />
        {shaderMounted && (
          <Velaris
            height="100%"
            className="absolute inset-0 w-full h-full opacity-60"
            bg="#050914"
            colors={SHADER_COLORS}
            speed={reduceMotion ? 2.6 : 3.5}
            grain={0.18}
            paused={paused}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#050914] via-[#050914]/85 to-transparent" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 gap-x-6 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          <Reveal className="flex flex-col items-start col-span-2 lg:col-span-1">
            <a
              href="#top"
              aria-label={`${brand.fullName}, back to top`}
              className="mb-4 sm:mb-[24px] rounded-lg"
            >
              <Lockup tone="dark" />
            </a>
            <p className="font-sans font-medium text-[14px] sm:text-[15px] text-white/80 mb-5 sm:mb-[24px] leading-relaxed max-w-[380px]">
              Global investing for India, powered by Valura.Ai's GIFT City
              platform. Your money, the world's markets, one simple place.
            </p>
            <a
              href={`#${LEAD_FORM_ID}`}
              className="bg-white/10 backdrop-blur-sm border border-white/25 text-white font-sans font-medium text-sm sm:text-[15px] px-5 sm:px-6 py-2.5 rounded-[8px] hover:bg-white/20 transition-colors duration-300"
            >
              Talk to us{" "}
              <span aria-hidden="true" className="nudge">
                →
              </span>
            </a>
            <StoreButtons tone="dark" label="Get the app" className="mt-6" />
          </Reveal>

          <Reveal delay={90} className="lg:ml-auto">
            <nav aria-label="Explore" className="flex flex-col items-start">
              <h2 className={headingClass}>Explore</h2>
              <ul className={listClass}>
                {EXPLORE.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={180} className="lg:ml-auto">
            <nav aria-label="Get started" className="flex flex-col items-start">
              <h2 className={headingClass}>Get started</h2>
              <ul className={listClass}>
                <li>
                  <a href={links.openAccount} className={linkClass}>
                    Open an account
                  </a>
                </li>
                {links.logIn && (
                  <li>
                    <a href={links.logIn} className={linkClass}>
                      Log in
                    </a>
                  </li>
                )}
                <li>
                  <a href={`#${LEAD_FORM_ID}`} className={linkClass}>
                    Talk to a specialist
                  </a>
                </li>
                <li>
                  <a
                    href={links.valura}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Valura.Ai website
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </nav>
          </Reveal>
        </div>

        {/* Legal and risk text is never animated, so it is always readable at once */}
        <div className="border-t border-white/15 pt-6 sm:pt-[32px] flex flex-col gap-3.5 max-w-[960px] mx-auto text-center">
          <p className="font-sans text-[12px] sm:text-[13px] text-white/85 leading-relaxed">
            <span className="font-semibold text-white">Valura.Ai</span>:{" "}
            {legal.entity}, IFSCA-regulated broker-dealer at GIFT City.{" "}
            {legal.address}. Overseas investments are made under the RBI
            Liberalised Remittance Scheme (LRS), subject to limits and tax.
          </p>
          <p className="font-sans text-[13px] sm:text-[14px] font-semibold text-white leading-relaxed">
            {legal.riskLine}
          </p>
          <p className="font-sans text-[11.5px] sm:text-[12px] text-white/75 leading-relaxed">
            Global investing carries additional currency, country and regulatory
            risks. Structured products carry the credit risk of the issuing
            bank. Coupon and return figures are indicative and not guaranteed,
            and past performance is not indicative of future returns. App
            screens on this page are illustrative only and not investment
            advice. This page is for information only and is not an offer or
            solicitation to buy or sell any security. Eligibility for structured
            products and pre-IPO allocations is subject to investor
            classification and regulatory limits. Brokerage and statutory
            charges apply.
          </p>
          <p className="font-sans text-xs sm:text-sm text-white/75">
            © {year} {brand.fullName}. All rights reserved.
          </p>
          <div className="mt-1 flex justify-center">
            <MotionToggle />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1746px] h-[80px] sm:h-[120px] md:h-[167px] pointer-events-none opacity-15 overflow-hidden"
        aria-hidden="true"
      >
        <Reveal y={40} duration={850} className="w-full h-full">
          <img
            src={footerWordmark}
            alt=""
            width={1920}
            height={190}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-bottom"
          />
        </Reveal>
      </div>
    </footer>
  )
}
