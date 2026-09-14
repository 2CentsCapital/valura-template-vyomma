import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Navbar from "./components/layout/Navbar"
import Hero from "./components/sections/Hero"
import TrustMarquee from "./components/sections/TrustMarquee"
import WhyGlobal from "./components/sections/WhyGlobal"
import TrustRegulation from "./components/sections/TrustRegulation"
import WhatYouCanHold from "./components/sections/WhatYouCanHold"
import HowItWorks from "./components/sections/HowItWorks"
import OpenAccount from "./components/sections/OpenAccount"
import FAQ from "./components/sections/FAQ"
import Footer from "./components/sections/Footer"
import { prefersReducedMotion } from "./hooks/usePrefersReducedMotion"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const reduceMotion = prefersReducedMotion()
    let lenis: Lenis | null = null
    const tick = (time: number) => lenis?.raf(time * 1000)

    // Smooth scrolling is decoration: visitors who ask for reduced motion keep native scrolling.
    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // In-page links scroll to their section, keep the URL in sync and move focus there, so keyboard and
    // screen-reader users land where they asked. CSS scroll-margin keeps targets clear of the sticky header.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null
      const hash = anchor?.getAttribute("href") ?? ""
      const target =
        hash.length > 1
          ? document.getElementById(decodeURIComponent(hash.slice(1)))
          : null
      if (!target) return
      event.preventDefault()
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target)
        else
          target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          })
        if (!target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1")
        target.focus({ preventScroll: true })
        history.replaceState(null, "", hash)
      })
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(tick)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-brand-blue selection:text-white">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="flex-1 w-full">
        <Hero />
        <TrustMarquee />
        <WhyGlobal />
        <TrustRegulation />
        <WhatYouCanHold />
        <HowItWorks />
        <OpenAccount />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
