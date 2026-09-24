import type { MotionCtx } from "./context";

/** [data-marquee="seconds"]: runs only on screen, speeds up with scroll velocity. */
export function initMarquee({ gsap, ST, $$, reduce }: MotionCtx) {
  $$("[data-marquee]").forEach((el) => {
    const tracks = $$("[data-marquee-track]", el);
    if (!tracks.length) return;
    const tw = gsap.to(tracks, {
      xPercent: -100,
      repeat: -1,
      duration: parseFloat(el.getAttribute("data-marquee") || "") || 24,
      ease: "none",
      paused: true,
    });
    if (reduce) return;
    ST.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => {
        if (s.isActive) tw.play();
        else tw.pause();
      },
      onUpdate: (s) => {
        const v = Math.min(Math.abs(s.getVelocity()) / 600, 4);
        gsap.to(tw, {
          timeScale: 1 + v,
          duration: 0.3,
          overwrite: true,
          onComplete: () => {
            gsap.to(tw, { timeScale: 1, duration: 1.2 });
          },
        });
      },
    });
  });
}
