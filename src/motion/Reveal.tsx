import {
  createElement,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react"
import { onceInView } from "./inView"

type RevealTag = "div" | "p" | "li" | "ul" | "figure" | "h2" | "span"

type RevealProps = {
  as?: RevealTag
  /** Milliseconds to wait once the element is in view */
  delay?: number
  /** Distance in px the element rises from */
  y?: number
  /** Starting scale (1 for none) */
  scale?: number
  /** Transition length in ms, kept under 900 */
  duration?: number
  id?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Fades and lifts its content in the first time it comes into view. It animates transform and opacity only,
 * so the layout never moves. With animations paused the content is simply shown (see index.css).
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  scale = 1,
  duration = 700,
  id,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    // Set before first paint, so content in view animates in rather than flashing.
    element.setAttribute("data-reveal", "hidden")
    const cancel = onceInView(element, () =>
      element.setAttribute("data-reveal", "shown"),
    )
    return () => {
      cancel()
      element.removeAttribute("data-reveal")
    }
  }, [])

  const revealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale,
    "--reveal-duration": `${duration}ms`,
    ...style,
  } as CSSProperties

  return createElement(as, { ref, id, className, style: revealStyle }, children)
}
