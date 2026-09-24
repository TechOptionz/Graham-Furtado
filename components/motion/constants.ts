import type { MotionCtx } from "./context";

/** [data-constants]: hover/focus reveals the image and fills the rule. */
export function initConstants({ $$, on }: MotionCtx) {
  $$("[data-constants] > div").forEach((it) => {
    const bar = it.querySelector<HTMLElement>("[data-const-bar]");
    const box = it.querySelector<HTMLElement>("[data-const-img]");
    const img = box && box.querySelector<HTMLElement>("img");
    function set(o: boolean) {
      if (bar) bar.style.transform = o ? "scaleX(1)" : "scaleX(0)";
      if (box) {
        box.style.height = o ? "11rem" : "0";
        box.style.opacity = o ? "1" : "0";
      }
      if (img) img.style.transform = o ? "scale(1)" : "scale(1.08)";
    }
    on(it, "mouseenter", () => set(true));
    on(it, "mouseleave", () => set(false));
    on(it, "focus", () => set(true));
    on(it, "blur", () => set(false));
    on(it, "click", () => set(!!box && box.style.height !== "11rem"));
  });
}
