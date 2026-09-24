import type { MotionCtx } from "./context";

/** [data-footer-mark]: letters rise in, then drift with scroll; hover lifts letters. */
export function initFooterMark({ gsap, ST, $$, reduce, fine, EX, on }: MotionCtx) {
  $$("[data-footer-mark]").forEach((el) => {
    const L = $$("[data-mark-l]", el);
    if (reduce || !L.length) return;
    gsap.set(L, { yPercent: 110, rotate: 3 });
    ST.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(L, { yPercent: 0, rotate: 0, duration: 1.3, ease: EX, stagger: { each: 0.045, from: "start" } });
      },
    });
    const inner = el.firstElementChild;
    if (inner)
      gsap.fromTo(
        inner,
        { xPercent: -3 },
        { xPercent: 3, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } }
      );
    if (fine)
      L.forEach((l) => {
        on(l, "mouseenter", () => {
          gsap.fromTo(l, { yPercent: 0 }, { yPercent: -12, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 1, overwrite: true });
        });
      });
  });
}
