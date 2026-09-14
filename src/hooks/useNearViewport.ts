import { useEffect, useState, type RefObject } from "react"

/** Becomes true once the element comes within `rootMargin` of the viewport, and stays true. */
export default function useNearViewport(
  ref: RefObject<Element | null>,
  rootMargin = "200px",
): boolean {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || near) return
    if (!("IntersectionObserver" in window)) {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, near])

  return near
}
