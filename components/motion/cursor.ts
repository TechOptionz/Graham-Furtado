import type { MotionCtx } from "./context";

/**
 * Custom cursor. Disabled in the source (`if (false) { … }`), so this is intentionally a no-op.
 * The original built a fixed 5.6rem ink disc following the pointer with gsap.quickTo and
 * showed the [data-cursor] label on hover; keep it off to match.
 */
export function initCursor(_ctx: MotionCtx) {
  /* intentionally empty */
}
