import type { MotionCtx } from "./context";

/** [data-stack]: stacked full-screen project scenes; the covered card scales to .9 and shades. */
export function initStack({ gsap, $$, reduce }: MotionCtx) {
  if (reduce) return;
  $$("[data-stack]").forEach((stack) => {
    const cards = $$("[data-stack-card]", stack);
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const inner = card.querySelector<HTMLElement>("[data-stack-inner]");
      const shade = card.querySelector<HTMLElement>("[data-stack-shade]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } });
      if (inner) tl.to(inner, { scale: 0.9, ease: "none" }, 0);
      if (shade) tl.to(shade, { opacity: 0.6, ease: "none" }, 0);
    });
  });
}
