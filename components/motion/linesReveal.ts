import type { MotionCtx } from "./context";

/** data-r="lines": masked lines rise in. */
export function initLinesReveal({ gsap, ST, $$, reduce, E4 }: MotionCtx) {
  if (reduce) return;
  $$('[data-r="lines"]').forEach((el) => {
    const lines = $$("[data-line]", el);
    if (!lines.length) return;
    gsap.set(lines, { yPercent: 115 });
    ST.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(lines, { yPercent: 0, duration: 1.15, ease: E4, stagger: 0.09 });
      },
    });
  });
}
