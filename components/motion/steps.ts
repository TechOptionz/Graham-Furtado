import { GF } from "@/lib/gf";
import type { MotionCtx } from "./context";

/** [data-steps]: pinned stages; scroll progress switches panels, rolls the number, fills the bar. */
export function initSteps({ gsap, ST, $$, E, E4, EX, on }: MotionCtx) {
  $$("[data-steps]").forEach((sec) => {
    const panels = $$("[data-step-panel]", sec);
    const n = panels.length;
    let cur = 0;
    const roll = sec.querySelector<HTMLElement>("[data-steps-roll]");
    const bar = sec.querySelector<HTMLElement>("[data-steps-bar]");
    const dots = $$("[data-step-dot]", sec);
    panels.forEach((p, i) => {
      if (i) gsap.set(p, { autoAlpha: 0 });
    });
    function paint(i: number) {
      dots.forEach((d, j) => {
        d.style.opacity = j === i ? "1" : "0.35";
        d.style.color = j === i ? "#1c231f" : "";
      });
    }
    paint(0);
    function show(i: number) {
      if (i === cur) return;
      const dir = i > cur ? 1 : -1;
      gsap.to(panels[cur], { autoAlpha: 0, y: -40 * dir, duration: 0.5, ease: "power2.in", overwrite: true });
      gsap.fromTo(panels[i], { autoAlpha: 0, y: 50 * dir }, { autoAlpha: 1, y: 0, duration: 0.9, ease: E, delay: 0.25, overwrite: true });
      const img = panels[i].querySelector<HTMLElement>("[data-step-img]");
      if (img)
        gsap.fromTo(
          img,
          { scale: 1.1, clipPath: "inset(0% 0% 100% 0%)" },
          { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EX, delay: 0.25 }
        );
      if (roll) gsap.to(roll, { yPercent: (-100 / n) * i, duration: 0.9, ease: E4 });
      paint(i);
      cur = i;
    }
    ST.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => {
        if (bar) bar.style.transform = "scaleY(" + s.progress + ")";
        show(Math.min(n - 1, Math.floor(s.progress * n)));
      },
    });
    dots.forEach((d, i) => {
      on(d, "click", () => {
        const y = sec.getBoundingClientRect().top + scrollY + (sec.offsetHeight - innerHeight) * ((i + 0.5) / n);
        if (GF.lenis) GF.lenis.scrollTo(y, { duration: 1.2 });
        else scrollTo({ top: y, behavior: "smooth" });
      });
    });
  });
}
