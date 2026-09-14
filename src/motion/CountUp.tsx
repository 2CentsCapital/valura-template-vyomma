import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { onceInView } from "./inView"
import useAnimationsPaused from "./animationsPaused"

const format = (value: number) => Math.round(value).toLocaleString("en-US")

type CountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  /** Milliseconds to wait once the figure is in view */
  delay?: number
  className?: string
}

/**
 * Counts up to `value` once, the first time it comes into view. The final figure reserves the width, so the
 * surrounding layout never shifts, and screen readers only ever get the final figure.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "",
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const doneRef = useRef(false)
  const paused = useAnimationsPaused()
  const finalText = `${prefix}${format(value)}${suffix}`

  useLayoutEffect(() => {
    const element = numberRef.current
    if (!element) return
    const show = (current: number) => {
      element.textContent = `${prefix}${format(current)}${suffix}`
    }

    if (paused || doneRef.current) {
      show(value)
      // A figure seen while animations are paused does not count again after they resume.
      return paused
        ? onceInView(element, () => {
            doneRef.current = true
          })
        : undefined
    }

    show(0)
    const state = { current: 0 }
    let tween: gsap.core.Tween | undefined
    const cancel = onceInView(element, () => {
      tween = gsap.to(state, {
        current: value,
        duration: 0.85,
        delay: delay / 1000,
        ease: "power4.out",
        onUpdate: () => show(state.current),
        onComplete: () => {
          doneRef.current = true
        },
      })
    })
    return () => {
      cancel()
      tween?.kill()
      show(value)
    }
  }, [paused, value, prefix, suffix, delay])

  return (
    <span className={`relative inline-grid tabular-nums ${className}`.trim()}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {finalText}
      </span>
      <span
        ref={numberRef}
        className="col-start-1 row-start-1 text-right"
        aria-hidden="true"
      />
      <span className="sr-only">{finalText}</span>
    </span>
  )
}
