import { lazy, Suspense, useEffect, useState } from "react"
import dashboard800 from "../../assets/app/dashboard-800.webp"
import dashboard1400 from "../../assets/app/dashboard-1400.webp"
import dashboard2200 from "../../assets/app/dashboard-2200.webp"
import SplitText from "../ui/SplitText"
import { canUseWebGL } from "../ui/webgl"
import Reveal from "../../motion/Reveal"
import CountUp from "../../motion/CountUp"
import useAnimationsPaused from "../../motion/animationsPaused"
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion"
import { brand, legal, links } from "../../config/site"
import { facts } from "../../content/facts"

// The wave shader is decoration: a separate chunk, mounted once the page is idle.
const GradientWaves = lazy(() => import("../ui/GradientWaves"))

/** "100,000+" becomes { value: 100000, suffix: "+" }, so the figures stay single-sourced in facts.ts. */
function toCount(fact: string) {
  return {
    value: Number(fact.replace(/\D/g, "")),
    suffix: fact.replace(/[\d,]/g, ""),
  }
}

const PROOF = [
  { ...toCount(facts.markets), label: "global markets" },
  { ...toCount(facts.instruments), label: "stocks, funds and bonds" },
  { ...toCount(facts.usStocksAndEtfs), label: "US stocks and ETFs" },
]

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion()
  const paused = useAnimationsPaused()
  const [wavesMounted, setWavesMounted] = useState(false)
  const [wavesReady, setWavesReady] = useState(false)

  useEffect(() => {
    // A visit that starts paused keeps the static backdrop; once mounted, pausing freezes the current frame.
    if (wavesMounted || paused || !canUseWebGL(2)) return
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setWavesMounted(true), {
        timeout: 1200,
      })
      return () => window.cancelIdleCallback(handle)
    }
    const handle = window.setTimeout(() => setWavesMounted(true), 300)
    return () => window.clearTimeout(handle)
  }, [paused, wavesMounted])

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative w-full pt-10 sm:pt-14 md:pt-20 pb-0 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className={`hero-backdrop absolute inset-0 transition-opacity duration-700 ${
            wavesMounted && wavesReady ? "opacity-0" : "opacity-100"
          }`}
        />
        {wavesMounted && (
          <Suspense fallback={null}>
            <GradientWaves
              horizonColor="#3b82f6"
              waveColor="#3b82f6"
              crestColor="#1414c6"
              speed={reduceMotion ? 0.28 : 0.4}
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
              mouseInteraction={!reduceMotion}
              parallaxStrength={0.5}
              grain={true}
              grainIntensity={0.03}
              paused={paused}
              onReady={() => setWavesReady(true)}
            />
          </Suspense>
        )}
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col items-center text-center max-w-[900px] mx-auto w-full">
          <Reveal
            as="p"
            y={12}
            duration={600}
            className="mb-4 sm:mb-5 inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-blue-200/70 rounded-full px-4 py-1.5 font-sans text-[12px] sm:text-[13px] font-bold tracking-[0.2px] text-blue-800"
          >
            {brand.fullName}
          </Reveal>

          <SplitText
            id="hero-title"
            text="Invest in global markets from India"
            tag="h1"
            splitType="lines"
            duration={0.75}
            stagger={0.12}
            className="font-display font-extrabold text-[32px] sm:text-[44px] md:text-[54px] lg:text-[62px] leading-[1.1] md:leading-[1.12] tracking-[-1.2px] sm:tracking-[-2px] text-[#0f172a] max-w-[860px] text-balance"
          />

          <SplitText
            text="From Apple and Nvidia to global funds, bonds and pre-IPO, all in one account. Regulated at GIFT City and funded in rupees under LRS."
            tag="p"
            splitType="words"
            delay={0.08}
            duration={0.55}
            stagger={0.3}
            className="mt-5 sm:mt-6 max-w-[700px] font-display font-normal text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed md:leading-[30px] text-[#475569] px-2 sm:px-0"
          />

          <Reveal
            delay={260}
            y={16}
            duration={650}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href={links.openAccount}
              className="btn-sheen w-full sm:w-auto text-center bg-gradient-to-b from-brand-blue to-brand-blue-deep text-white font-sans font-bold text-base sm:text-lg md:text-[18px] px-8 sm:px-10 py-3 sm:py-4 rounded-[14px] sm:rounded-[16px] shadow-[0_8px_20px_rgba(62,104,246,0.3)] transition-transform duration-300 ease-out-quint hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Open an account{" "}
              <span aria-hidden="true" className="nudge">
                →
              </span>
            </a>
            <a
              href="#how"
              className="w-full sm:w-auto text-center relative border border-[#c4c8ff] bg-gradient-to-b from-[#eef0ff] to-[#e4e7ff] text-[#6f41ee] font-sans font-bold text-base sm:text-lg md:text-[18px] px-8 sm:px-10 py-3 sm:py-4 rounded-[14px] sm:rounded-[16px] drop-shadow-[0px_11px_11px_rgba(53,62,185,0.09)] shadow-[inset_0px_-2px_1px_0px_rgba(151,158,255,0.35)] transition-transform duration-300 ease-out-quint hover:-translate-y-0.5 active:scale-[0.98]"
            >
              See how it works
            </a>
          </Reveal>

          <Reveal
            as="ul"
            delay={340}
            y={16}
            duration={650}
            className="mt-6 sm:mt-8 mb-6 sm:mb-8 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-[#fafafc] border border-[#e2e8f0] rounded-2xl sm:rounded-full px-5 sm:px-6 py-3 sm:py-2 shadow-xs max-w-full"
          >
            {PROOF.map((item, index) => (
              <li
                key={item.label}
                className={`flex items-center gap-1.5 ${
                  index === 0
                    ? "sm:pr-5 sm:border-r sm:border-slate-200"
                    : index === 1
                      ? "sm:px-5 sm:border-r sm:border-slate-200"
                      : "sm:pl-5"
                }`}
              >
                <CountUp
                  value={item.value}
                  suffix={item.suffix}
                  delay={420}
                  className="font-display font-extrabold text-[14px] text-[#1e293b]"
                />
                <span className="font-display text-[13px] text-[#475569]">
                  {item.label}
                </span>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal
          as="figure"
          delay={380}
          y={40}
          duration={850}
          className="w-full max-w-[1232px] mx-auto px-1 sm:px-0"
        >
          <div className="float-soft relative isolate">
            <div className="hero-glow" aria-hidden="true" />
            <figcaption className="mb-2.5 text-center font-sans text-[11px] sm:text-[12px] font-medium text-slate-600">
              {legal.illustrative}
            </figcaption>
            <div className="relative rounded-t-xl sm:rounded-t-[28px] md:rounded-t-[32px] overflow-hidden drop-shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
              <img
                src={dashboard1400}
                srcSet={`${dashboard800} 800w, ${dashboard1400} 1400w, ${dashboard2200} 2200w`}
                sizes="(min-width: 1280px) 1232px, 100vw"
                width={2200}
                height={1190}
                alt="Vyomma app dashboard with portfolio value, marketplace, watchlist and calendar panels"
                className="w-full h-auto object-cover object-top block"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
