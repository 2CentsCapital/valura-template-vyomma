import { Pause, Play } from "lucide-react"
import useAnimationsPaused, {
  setAnimationsPaused,
} from "../../motion/animationsPaused"

/**
 * The page's single animation control (WCAG 2.2.2). It stops the facts ticker, the floating app preview,
 * the wave backgrounds and every entrance animation, and remembers the choice in localStorage.
 */
export default function MotionToggle({
  className = "",
}: {
  className?: string
}) {
  const paused = useAnimationsPaused()

  return (
    <button
      id="motion-toggle"
      type="button"
      data-motion-toggle
      onClick={() => setAnimationsPaused(!paused)}
      className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-sans text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white/20 ${className}`.trim()}
    >
      {paused ? (
        <Play size={14} aria-hidden="true" />
      ) : (
        <Pause size={14} aria-hidden="true" />
      )}
      {paused ? "Play animations" : "Pause animations"}
    </button>
  )
}
