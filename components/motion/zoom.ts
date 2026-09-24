import type { MotionCtx } from "./context";

/** [data-zoom-trigger] > [data-zoom]: hover zoom (fine pointers only). */
export function initZoom({ gsap, $$, fine, E, on }: MotionCtx) {
  $$("[data-zoom-trigger]").forEach((t) => {
    const z = t.querySelector<HTMLElement>("[data-zoom]");
    if (!z || !fine) return;
    on(t, "mouseenter", () => { gsap.to(z, { scale: 1.05, duration: 1, ease: E }); });
    on(t, "mouseleave", () => { gsap.to(z, { scale: 1, duration: 1, ease: E }); });
  });
}
