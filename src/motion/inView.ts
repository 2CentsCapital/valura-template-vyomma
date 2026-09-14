/**
 * One shared "first time in view" watcher for reveals, split headings and count-ups.
 * IntersectionObserver does the work. A rAF-throttled scroll check and a one-second timer are fallbacks, so
 * content in view is never left hidden if the observer does not fire.
 */

const pending = new Map<Element, () => void>()
let observer: IntersectionObserver | null = null
let timer = 0
let frameQueued = false

/** An element counts as in view once its top passes this share of the viewport height. */
const ENTER_AT = 0.9

function isInView(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return false
  const viewport = window.innerHeight
  // At the very bottom of the page nothing can scroll further up, so the whole viewport counts.
  const atBottom =
    window.scrollY + viewport >= document.documentElement.scrollHeight - 2
  return rect.bottom > 0 && rect.top < viewport * (atBottom ? 1 : ENTER_AT)
}

function release(element: Element) {
  pending.delete(element)
  observer?.unobserve(element)
  if (pending.size === 0) stopFallbacks()
}

function fire(element: Element) {
  const callback = pending.get(element)
  if (!callback) return
  release(element)
  callback()
}

function checkAll() {
  frameQueued = false
  for (const element of Array.from(pending.keys())) {
    if (isInView(element)) fire(element)
  }
}

function queueCheck() {
  if (frameQueued) return
  frameQueued = true
  requestAnimationFrame(checkAll)
}

function fireAll() {
  for (const element of Array.from(pending.keys())) fire(element)
}

function startFallbacks() {
  if (timer) return
  window.addEventListener("scroll", queueCheck, { passive: true })
  window.addEventListener("resize", queueCheck, { passive: true })
  window.addEventListener("beforeprint", fireAll)
  timer = window.setInterval(checkAll, 1000)
}

function stopFallbacks() {
  if (!timer) return
  window.removeEventListener("scroll", queueCheck)
  window.removeEventListener("resize", queueCheck)
  window.removeEventListener("beforeprint", fireAll)
  window.clearInterval(timer)
  timer = 0
}

function getObserver(): IntersectionObserver | null {
  if (observer || typeof IntersectionObserver === "undefined") return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) fire(entry.target)
      }
    },
    { rootMargin: `0px 0px -${Math.round((1 - ENTER_AT) * 100)}% 0px` },
  )
  return observer
}

/** Calls `callback` once, the first time `element` comes into view. Returns a function that cancels it. */
export function onceInView(element: Element, callback: () => void): () => void {
  pending.set(element, callback)
  const io = getObserver()
  if (io) io.observe(element)
  else queueCheck()
  startFallbacks()
  return () => {
    if (pending.has(element)) release(element)
  }
}
