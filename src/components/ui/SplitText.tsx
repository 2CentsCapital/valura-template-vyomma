import { useEffect, useRef, useState, type CSSProperties } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText as GSAPSplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion"

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

export interface SplitTextProps {
  text: string
  id?: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: string
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: CSSProperties["textAlign"]
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  onLetterAnimationComplete?: () => void
}

/**
 * Heading or paragraph whose words or letters animate in when scrolled into view.
 * Screen readers read a visually hidden copy of the text, the animated letters are aria-hidden,
 * and with reduced motion the text renders static.
 */
const SplitText = ({
  text,
  id,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onLetterAnimationComplete)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete
  }, [onLetterAnimationComplete])

  useEffect(() => {
    if (!document.fonts || document.fonts.status === "loaded") {
      setFontsLoaded(true)
      return
    }
    let active = true
    document.fonts.ready.then(() => {
      if (active) setFontsLoaded(true)
    })
    return () => {
      active = false
    }
  }, [])

  useGSAP(
    () => {
      const element = ref.current
      if (
        !element ||
        !text ||
        !fontsLoaded ||
        reduceMotion ||
        completedRef.current
      )
        return

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch?.[2] || "px"
      const offset =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`
      const start = `top ${startPct}%${offset}`

      const split = GSAPSplitText.create(element, {
        type: splitType,
        tag: "span",
        aria: "none",
        smartWrap: true,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          const targets =
            splitType.includes("chars") && self.chars.length
              ? self.chars
              : splitType.includes("words") && self.words.length
                ? self.words
                : self.lines
          return gsap.fromTo(targets, { ...from }, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
              fastScrollEnd: true,
            },
            onComplete: () => {
              completedRef.current = true
              onCompleteRef.current?.()
            },
            willChange: "transform, opacity",
            force3D: true,
          })
        },
      })

      return () => {
        split.revert()
      }
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        reduceMotion,
      ],
      scope: ref,
    },
  )

  const Tag = tag
  const classes = `split-parent ${className}`.trim()
  const style: CSSProperties = {
    textAlign,
    display: "inline-block",
    whiteSpace: "normal",
    overflowWrap: "break-word",
  }

  if (reduceMotion) {
    return (
      <Tag id={id} className={classes} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag id={id} className={classes} style={{ ...style, overflow: "hidden" }}>
      <span ref={ref} aria-hidden="true" style={{ display: "block" }}>
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}

export default SplitText
