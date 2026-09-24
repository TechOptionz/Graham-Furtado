import type { MotionCtx } from "./context";

/** data-r="fade" | "group" | "slide". */
export function initFade({ gsap, ST, $$, reduce, E }: MotionCtx) {
  if (reduce) return;
  $$('[data-r="fade"]').forEach((el) => {
    gsap.set(el, { opacity: 0, y: 28 });
    ST.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: E, delay: parseFloat(el.getAttribute("data-delay") || "0") });
      },
    });
  });
  $$('[data-r="group"]').forEach((el) => {
    const kids = Array.prototype.slice.call(el.children) as HTMLElement[];
    if (!kids.length) return;
    gsap.set(kids, { opacity: 0, y: 24 });
    ST.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(kids, { opacity: 1, y: 0, duration: 0.9, ease: E, stagger: 0.09 });
      },
    });
  });
  $$('[data-r="slide"]').forEach((el) => {
    gsap.set(el, { opacity: 0, xPercent: 8 });
    ST.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, xPercent: 0, duration: 1.1, ease: E });
      },
    });
  });
}
