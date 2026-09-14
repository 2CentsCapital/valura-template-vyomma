import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { Menu, X } from "lucide-react"
import Lockup from "../brand/Lockup"
import { brand, links } from "../../config/site"

const NAV_LINKS = [
  { href: "#why", label: "Why global" },
  { href: "#trust", label: "Trust" },
  { href: "#invest", label: "Invest in" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
] as const

const SECTION_IDS = NAV_LINKS.map((item) => item.href.slice(1))

const primaryCta =
  "btn-sheen bg-gradient-to-b from-brand-blue to-brand-blue-deep text-white font-sans font-bold shadow-[0_4px_12px_rgba(62,104,246,0.25)] transition-transform duration-300 ease-out-quint hover:-translate-y-0.5 active:scale-[0.98]"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const indicatorShownRef = useRef(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !menuRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      )
        setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open])

  // A soft shadow fades in under the header once the page has scrolled.
  useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      setScrolled(window.scrollY > 8)
    }
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The section crossing the middle of the viewport is the active one.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(
          [...SECTION_IDS].reverse().find((id) => visible.has(id)) ?? null,
        )
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  // The underline slides to the active link (transform only) and fades out between sections.
  const placeIndicator = useCallback(() => {
    const indicator = indicatorRef.current
    const nav = navRef.current
    if (!indicator || !nav) return
    const link = active
      ? nav.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
      : null
    if (!link || link.offsetWidth === 0) {
      indicator.style.opacity = "0"
      indicatorShownRef.current = false
      return
    }
    indicator.dataset.instant = indicatorShownRef.current ? "false" : "true"
    indicator.style.transform = `translate3d(${link.offsetLeft}px, 0, 0) scaleX(${link.offsetWidth})`
    indicator.style.opacity = "1"
    indicatorShownRef.current = true
  }, [active])

  useLayoutEffect(() => {
    let cancelled = false
    placeIndicator()
    document.fonts?.ready.then(() => {
      if (!cancelled) placeIndicator()
    })
    window.addEventListener("resize", placeIndicator)
    return () => {
      cancelled = true
      window.removeEventListener("resize", placeIndicator)
    }
  }, [placeIndicator])

  const close = () => setOpen(false)

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-50 w-full backdrop-blur-[16px] bg-white/95 border-b border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto h-[72px] sm:h-[80px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center shrink-0 rounded-lg"
          aria-label={`${brand.fullName}, back to top`}
        >
          <Lockup />
        </a>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden lg:flex items-center gap-7 xl:gap-9"
        >
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`py-2 font-display font-semibold text-[15px] transition-colors duration-300 hover:text-brand-blue ${
                  isActive ? "text-brand-blue-deep" : "text-[#334155]"
                }`}
              >
                {item.label}
              </a>
            )
          })}
          <span
            ref={indicatorRef}
            className="nav-indicator"
            aria-hidden="true"
          />
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {links.logIn && (
            <a
              href={links.logIn}
              className="px-3.5 py-2 font-display font-semibold text-[15px] text-[#334155] hover:text-slate-900 rounded-lg hover:bg-slate-100/70 transition-colors duration-300"
            >
              Log in
            </a>
          )}
          <a
            href={links.openAccount}
            className={`${primaryCta} text-[15px] px-[20px] py-[9px] rounded-[10px]`}
          >
            Open account
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a
            href={links.openAccount}
            className={`${primaryCta} hidden sm:inline-flex text-sm px-3.5 py-2 rounded-lg`}
          >
            Open account
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-300"
          >
            {open ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="menu-in lg:hidden absolute inset-x-0 top-full border-t border-slate-200/80 bg-white px-6 py-6 shadow-xl"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              style={{ "--i": index } as CSSProperties}
              className="menu-item px-3 py-2.5 rounded-lg font-display font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
          {links.logIn && (
            <a
              href={links.logIn}
              onClick={close}
              style={{ "--i": NAV_LINKS.length } as CSSProperties}
              className="menu-item w-full py-3 text-center font-display font-semibold text-[15px] text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
            >
              Log in
            </a>
          )}
          <a
            href={links.openAccount}
            onClick={close}
            style={{ "--i": NAV_LINKS.length + 1 } as CSSProperties}
            className={`menu-item ${primaryCta} w-full py-3 text-center text-[16px] rounded-xl`}
          >
            Open account
          </a>
        </div>
      </div>
    </header>
  )
}
