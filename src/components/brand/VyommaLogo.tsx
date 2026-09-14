import { ribbonPaths, wordmarkPaths } from "./vyommaPaths"

type Tone = "light" | "dark"

/** The Vyomma ribbon mark in its three brand colours. Decorative: pair it with a text name. */
export function VyommaRibbon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 52.2237 49"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ribbonPaths.violet} fill="#6F41EE" />
      <path d={ribbonPaths.blue} fill="#3E68F6" />
      <path d={ribbonPaths.sky} fill="#42B8F7" />
    </svg>
  )
}

/** The VYOMMA wordmark: deep navy on light backgrounds, white on dark ones. */
export function VyommaWordmark({
  tone = "light",
  className = "",
}: {
  tone?: Tone
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 164.408 19.6494"
      fill={tone === "dark" ? "#FFFFFF" : "#06064F"}
      aria-hidden="true"
      focusable="false"
    >
      {wordmarkPaths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  )
}
