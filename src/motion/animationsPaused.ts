import { useSyncExternalStore } from "react"

/** Storage key for the visitor's "Pause animations" choice. index.html reads it before first paint. */
export const MOTION_STORAGE_KEY = "vyomma:animations-paused"

const listeners = new Set<() => void>()

function readStoredChoice(): boolean {
  try {
    return window.localStorage.getItem(MOTION_STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

let paused = typeof window === "undefined" ? false : readStoredChoice()

function applyToDocument() {
  document.documentElement.dataset.motion = paused ? "paused" : "running"
}

function notify() {
  applyToDocument()
  listeners.forEach((listener) => listener())
}

if (typeof window !== "undefined") {
  applyToDocument()
  // Keep other open tabs in step with the choice.
  window.addEventListener("storage", (event) => {
    if (event.key !== MOTION_STORAGE_KEY) return
    const next = event.newValue === "1"
    if (next === paused) return
    paused = next
    notify()
  })
}

export function areAnimationsPaused(): boolean {
  return paused
}

/** Pauses or resumes every autoplaying animation on the page and remembers the choice. */
export function setAnimationsPaused(next: boolean) {
  if (next === paused) return
  paused = next
  try {
    if (next) window.localStorage.setItem(MOTION_STORAGE_KEY, "1")
    else window.localStorage.removeItem(MOTION_STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode, blocked site data): the choice then lasts for this visit.
  }
  notify()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** True while the visitor has paused animations with the footer control. */
export default function useAnimationsPaused(): boolean {
  return useSyncExternalStore(subscribe, areAnimationsPaused, () => false)
}
