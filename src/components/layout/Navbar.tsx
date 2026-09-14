import { useEffect, useRef, useState } from "react"
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

const primaryCta =
  "bg-gradient-to-b from-brand-blue to-brand-blue-deep text-white font-sans font-bold shadow-[0_4px_12px_rgba(62,104,246,0.25)] hover:brightness-110 active:scale-[0.98] transition-all"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[16px] bg-white/95 border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto h-[72px] sm:h-[80px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center shrink-0 rounded-lg"
          aria-label={`${brand.fullName}, back to top`}
        >
          <Lockup />
        </a>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 xl:gap-9"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 font-display font-semibold text-[15px] text-[#334155] hover:text-brand-blue transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {links.logIn && (
            <a
              href={links.logIn}
              className="px-3.5 py-2 font-display font-semibold text-[15px] text-[#334155] hover:text-slate-900 rounded-lg hover:bg-slate-100/70 transition-colors"
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
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="px-3 py-2.5 rounded-lg font-display font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
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
              className="w-full py-3 text-center font-display font-semibold text-[15px] text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Log in
            </a>
          )}
          <a
            href={links.openAccount}
            onClick={close}
            className={`${primaryCta} w-full py-3 text-center text-[16px] rounded-xl`}
          >
            Open account
          </a>
        </div>
      </div>
    </header>
  )
}
