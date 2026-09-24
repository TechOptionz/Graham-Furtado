import type { MotionCtx } from "./context";

/** data-r="rule" (draws a rule) and data-r="img" (clip-path reveal + inner settle). */
export function initImgReveal({ gsap, ST, $$, reduce, E, EX }: MotionCtx) {
  if (reduce) return;
  $$('[data-r="rule"]').forEach((el) => {
    gsap.set(el, { scaleX: 0, transformOrigin: "0 50%" });
    ST.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 1.3, ease: EX });
      },
    });
  });
  $$('[data-r="img"]').forEach((el) => {
    const inner = el.querySelector<HTMLElement>("[data-r-inner]");
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
    if (inner) gsap.set(inner, { scale: 1.16 });
    ST.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EX });
        if (inner) gsap.to(inner, { scale: 1, duration: 1.9, ease: E });
      },
    });
  });
}
