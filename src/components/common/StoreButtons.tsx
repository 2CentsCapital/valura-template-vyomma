import { links } from "../../config/site"

type StoreButtonsProps = {
  tone?: "light" | "dark"
  label?: string
  className?: string
}

function AppleGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="size-[22px] shrink-0"
    >
      <path d="M17.05 12.04c-.03-3.06 2.5-4.53 2.61-4.6-1.42-2.07-3.63-2.35-4.42-2.39-1.88-.19-3.67 1.11-4.63 1.11-.97 0-2.43-1.08-4-1.05-2.05.03-3.95 1.2-5.01 3.04-2.14 3.71-.55 9.21 1.53 12.22 1.02 1.47 2.23 3.13 3.81 3.07 1.53-.06 2.11-.99 3.96-.99 1.84 0 2.36.99 3.97.96 1.64-.03 2.68-1.5 3.68-2.99 1.16-1.71 1.64-3.37 1.67-3.46-.04-.02-3.2-1.23-3.23-4.92zM14 3.85c.84-1.02 1.41-2.43 1.25-3.85-1.21.05-2.68.81-3.55 1.83-.77.9-1.45 2.36-1.27 3.74 1.35.11 2.73-.69 3.57-1.72z" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="size-[22px] shrink-0"
    >
      <path d="M3.2 1.7C2.7 2.2 2.4 3 2.4 4v16c0 1 .3 1.8.8 2.3l.1.1L12 13v-.2L3.3 1.6l-.1.1zm17.5 9.9-3.9-2.2-3.3 3.3 3.3 3.3 3.9-2.3c1.1-.6 1.1-1.7 0-2.1zM12.9 12.6 4 21.5c.4.4 1 .4 1.7 0L16.4 15l-3.5-2.4zM4 2.5l8.9 8.9 3.5-2.5L5.7 2.5c-.3-.2-.6-.3-.8-.3-.3 0-.6.1-.9.3z" />
    </svg>
  )
}

/** App Store and Google Play badges for the Valura.Ai app. */
export default function StoreButtons({
  tone = "light",
  label = "Get the Valura.Ai app",
  className = "",
}: StoreButtonsProps) {
  const dark = tone === "dark"
  const badge = `inline-flex items-center gap-2.5 rounded-xl border px-4 py-2 text-white transition-transform hover:-translate-y-0.5 ${
    dark
      ? "bg-black/60 border-white/30 hover:bg-black/80"
      : "bg-[#0E1116] border-[#0E1116] hover:bg-black"
  }`
  const stores = [
    {
      href: links.appStore,
      small: "Download on the",
      big: "App Store",
      glyph: <AppleGlyph />,
    },
    {
      href: links.googlePlay,
      small: "Get it on",
      big: "Google Play",
      glyph: <PlayGlyph />,
    },
  ]

  return (
    <div className={className}>
      {label && (
        <p
          className={`mb-2.5 font-sans text-[13px] font-semibold tracking-[0.02em] ${
            dark ? "text-white/85" : "text-slate-600"
          }`}
        >
          {label}
        </p>
      )}
      <ul className="flex flex-wrap gap-2.5">
        {stores.map((store) => (
          <li key={store.big}>
            <a
              className={badge}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.glyph}
              <span className="flex flex-col text-left leading-[1.12]">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.03em]">
                  {store.small}
                </span>
                <span className="font-display text-[15px] font-bold tracking-[-0.01em]">
                  {store.big}
                </span>
              </span>
              <span className="sr-only">
                (Valura.Ai app, opens in a new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
