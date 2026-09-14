import { useCallback, useLayoutEffect, useRef, type CSSProperties } from "react"
import { gsap } from "gsap"
import { SplitText as GSAPSplitText } from "gsap/SplitText"
import useAnimationsPaused from "../../motion/animationsPaused"
import { onceInView } from "../../motion/inView"

gsap.registerPlugin(GSAPSplitText)

export interface SplitTextProps {
  text: string
  id?: string
  className?: string
  /** "lines" slide up from a mask; "words" and "chars" fade and rise */
  splitType?: "lines" | "words" | "chars"
  /** Seconds to wait once the text is in view */
  delay?: number
  /** Seconds each line, word or letter takes */
  duration?: number
  /** Total stagger across the whole text, in seconds */
  stagger?: number
  textAlign?: CSSProperties["textAlign"]
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

/** The split waits for web fonts, but never longer than this, so hero copy is not held back. */
const FONT_WAIT_MS = 350

function whenFontsReady(): Promise<void> {
  const fonts = document.fonts
  if (!fonts || fonts.status === "loaded") return Promise.resolve()
  return Promise.race([
    fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => window.setTimeout(resolve, FONT_WAIT_MS)),
  ])
}

/**
 * Text that reveals line by line, word by word or letter by letter the first time it comes into view.
 * Screen readers get a plain copy; the animated copy is aria-hidden. It runs for every visitor and stays
 * still once they pause animations.
 */
export default function SplitText({
  text,
  id,
  className = "",
  splitType = "chars",
  delay = 0,
  duration = 0.6,
  stagger = 0.25,
  textAlign = "center",
  tag = "p",
}: SplitTextProps) {
  const outerRef = useRef<HTMLElement | null>(null)
  const visualRef = useRef<HTMLSpanElement>(null)
  const doneRef = useRef(false)
  const paused = useAnimationsPaused()

  const setOuter = useCallback((node: HTMLElement | null) => {
    outerRef.current = node
  }, [])

  useLayoutEffect(() => {
    const outer = outerRef.current
    const visual = visualRef.current
    if (!outer || !visual) return

    if (paused || doneRef.current) {
      outer.dataset.split = "ready"
      // Text seen while animations are paused stays still after they resume.
      return paused
        ? onceInView(outer, () => {
            doneRef.current = true
          })
        : undefined
    }

    outer.dataset.split = "pending"
    let cancelled = false
    let entered = false
    let tween: gsap.core.Tween | undefined
    const ctx = gsap.context(() => {})
    const markReady = () => {
      outer.dataset.split = "ready"
    }
    // Never leave text hidden if splitting is slow or fails.
    const safety = window.setTimeout(markReady, 1200)
    const stopWatching = onceInView(outer, () => {
      entered = true
      tween?.play()
    })

    whenFontsReady().then(() => {
      if (cancelled) return
      ctx.add(() => {
        GSAPSplitText.create(visual, {
          type: splitType === "chars" ? "words, chars" : splitType,
          ...(splitType === "lines"
            ? { mask: "lines" as const, autoSplit: true }
            : {}),
          tag: "span",
          aria: "none",
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
          reduceWhiteSpace: false,
          onSplit(self: GSAPSplitText) {
            const targets =
              splitType === "lines"
                ? self.lines
                : splitType === "words"
                  ? self.words
                  : self.chars
            const each =
              targets.length > 1
                ? Math.min(0.06, stagger / (targets.length - 1))
                : 0
            tween = gsap.fromTo(
              targets,
              splitType === "lines"
                ? { yPercent: 110 }
                : { opacity: 0, y: splitType === "words" ? 14 : 24 },
              {
                ...(splitType === "lines"
                  ? { yPercent: 0 }
                  : { opacity: 1, y: 0 }),
                duration,
                delay,
                stagger: each,
                ease: "power4.out",
                force3D: true,
                paused: !entered,
                onComplete: () => {
                  doneRef.current = true
                },
              },
            )
            markReady()
            // Returning the tween lets a re-split (font swap, resize) continue from the same point.
            return tween
          },
        })
      })
    })

    return () => {
      cancelled = true
      window.clearTimeout(safety)
      stopWatching()
      tween?.kill()
      ctx.revert()
    }
  }, [paused, text, splitType, delay, duration, stagger])

  const Tag = tag

  return (
    <Tag
      ref={setOuter}
      id={id}
      data-split={paused ? "ready" : "pending"}
      className={`split-parent ${className}`.trim()}
      style={{ textAlign, display: "inline-block", overflowWrap: "break-word" }}
    >
      <span ref={visualRef} className="split-visual block" aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
