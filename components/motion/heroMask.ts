import type { MotionCtx } from "./context";

/** [data-hero-mask]: hero media fades from the bottom as [data-hero-content] scrolls over it. */
export function initHeroMask({ ST, $$ }: MotionCtx) {
  $$("[data-hero-mask]").forEach((mask) => {
    const hero = mask.closest("[data-hero]");
    const content = hero && hero.querySelector<HTMLElement>("[data-hero-content]");
    if (!content) return;
    ST.create({
      trigger: content,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (s) => {
        const p = s.progress;
        mask.style.setProperty("--bot", String(1 - Math.min(p * 2, 1)));
        mask.style.setProperty("--top", String(1 - p));
      },
    });
  });
}
