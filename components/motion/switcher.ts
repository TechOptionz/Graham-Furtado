import type { MotionCtx } from "./context";

/** [data-switch]: expertise list ↔ image panels. */
export function initSwitch({ gsap, $$, fine, E, on }: MotionCtx) {
  $$("[data-switch]").forEach((root) => {
    const items = $$("[data-switch-item]", root);
    const panels = $$("[data-switch-panel]", root);
    let cur = -1;
    function act(i: number) {
      if (i === cur) return;
      items.forEach((it, j) => {
        const isOn = j === i;
        const d = it.querySelector<HTMLElement>("[data-switch-desc]");
        const t = it.querySelector<HTMLElement>("[data-switch-title]");
        const nb = it.querySelector<HTMLElement>("[data-switch-num]");
        const ar = it.querySelector<HTMLElement>("[data-switch-arrow]");
        if (d) {
          d.style.gridTemplateRows = isOn ? "1fr" : "0fr";
          d.style.opacity = isOn ? "1" : "0";
        }
        if (t) t.style.color = isOn ? "#1c231f" : "";
        if (nb) nb.style.background = isOn ? "#1c231f" : "";
        if (ar) ar.style.transform = isOn ? "translateX(0.4rem)" : "";
        it.setAttribute("aria-expanded", isOn ? "true" : "false");
      });
      panels.forEach((p, j) => {
        if (j === i) {
          gsap.to(p, { autoAlpha: 1, duration: 0.7, ease: E });
          const z = p.firstElementChild;
          if (z) gsap.fromTo(z, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: E });
        } else gsap.to(p, { autoAlpha: 0, duration: 0.7, ease: E });
      });
      cur = i;
    }
    panels.forEach((p, j) => {
      if (j) gsap.set(p, { autoAlpha: 0 });
    });
    items.forEach((it, i) => {
      if (fine) on(it, "mouseenter", () => act(i));
      on(it, "click", () => act(i));
      on(it, "focus", () => act(i));
    });
    act(0);
  });
}
