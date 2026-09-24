import type { MotionCtx } from "./context";

/** [data-parallax="amt"] > [data-parallax-inner]: scrubbed yPercent -amt → amt (halved on mobile). */
export function initParallax({ gsap, $$, reduce, mobile }: MotionCtx) {
  if (reduce) return;
  $$("[data-parallax]").forEach((el) => {
    const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
    if (!inner) return;
    const amt = (parseFloat(el.getAttribute("data-parallax") || "") || 10) * (mobile ? 0.5 : 1);
    gsap.fromTo(
      inner,
      { yPercent: -amt },
      { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });
}
