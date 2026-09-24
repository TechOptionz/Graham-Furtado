import type { MotionCtx } from "./context";

/** [data-path] (About timeline rows): hover/focus/scroll activates one row. */
export function initPathRows({ ST, $$, fine, on }: MotionCtx) {
  $$("[data-path]").forEach((list) => {
    const rows = $$("[data-path-row]", list);
    function paint(i: number) {
      rows.forEach((r, j) => {
        const isOn = j === i;
        const T = r.querySelector<HTMLElement>("[data-path-title]");
        const D = r.querySelector<HTMLElement>("[data-path-desc]");
        const N = r.querySelector<HTMLElement>("[data-path-num]");
        const B = r.querySelector<HTMLElement>("[data-path-bar]");
        const I = r.querySelector<HTMLElement>("[data-path-img]");
        if (T) {
          T.style.color = isOn ? "#1c231f" : "#6f7e6b";
          T.style.transform = isOn ? "translateX(0.6rem)" : "";
        }
        if (D) D.style.opacity = isOn ? "1" : "0.55";
        if (N) {
          N.style.background = isOn ? "#1c231f" : "";
          N.style.color = isOn ? "#f6f2ea" : "";
          N.style.borderColor = isOn ? "#1c231f" : "";
        }
        if (B) B.style.transform = isOn ? "scaleX(1)" : "scaleX(0)";
        if (I) {
          I.style.opacity = isOn ? "1" : "0.35";
          I.style.transform = isOn ? "scale(1)" : "scale(0.94)";
          I.style.filter = isOn ? "none" : "saturate(0.6)";
        }
      });
    }
    paint(0);
    rows.forEach((r, i) => {
      on(r, "mouseenter", () => paint(i));
      on(r, "focus", () => paint(i));
      on(r, "click", () => paint(i));
      if (!fine)
        ST.create({ trigger: r, start: "top 60%", end: "bottom 40%", onEnter: () => paint(i), onEnterBack: () => paint(i) });
    });
  });
}
