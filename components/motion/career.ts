import type { MotionCtx } from "./context";

/**
 * [data-career] (About timeline): the rail fills as the list scrolls through the
 * viewport, and each row lights up once the fill reaches its dot.
 * The markup is authored fully lit; this dims it and lets the scroll bring it back.
 */
export function initCareer({ ST, $$, reduce, cleanups }: MotionCtx) {
  if (reduce) return;
  $$("[data-career]").forEach((list) => {
    const fill = list.querySelector<HTMLElement>("[data-career-fill]");
    const rows = $$("[data-career-row]", list);
    let lit = -1;
    /** Lights the first `n` rows; the last of them is the head of the rail. */
    function paint(n: number, head = true) {
      if (n === lit) return;
      lit = n;
      rows.forEach((r, j) => {
        const isOn = j < n;
        const isHead = head && j === n - 1;
        const dot = r.querySelector<HTMLElement>("[data-career-dot]");
        const Y = r.querySelector<HTMLElement>("[data-career-years]");
        const T = r.querySelector<HTMLElement>("[data-career-title]");
        if (dot) {
          dot.style.background = isOn ? "#1c231f" : "#eee9df";
          dot.style.borderColor = isOn ? "#1c231f" : "#6f7e6b66";
          dot.style.transform = isHead ? "scale(1.35)" : "";
        }
        if (Y) {
          Y.style.background = isOn ? "#1c231f" : "transparent";
          Y.style.color = isOn ? "#f6f2ea" : "#6f7e6b";
          Y.style.borderColor = isOn ? "#1c231f" : "#6f7e6b66";
        }
        if (T) {
          T.style.color = isOn ? "#1c231f" : "#6f7e6b";
          T.style.transform = isHead ? "translateX(0.6rem)" : "";
        }
        $$("[data-career-body]", r).forEach((b) => {
          b.style.opacity = isOn ? "1" : "0.45";
        });
      });
    }
    function update(progress: number) {
      if (fill) fill.style.transform = "scaleY(" + progress + ")";
      const y = progress * list.offsetHeight;
      let n = 0;
      rows.forEach((r) => {
        const dot = r.querySelector<HTMLElement>("[data-career-dot]");
        const at = r.offsetTop + (dot ? dot.offsetTop + dot.offsetHeight / 2 : 0);
        if (y >= at) n++;
      });
      paint(n);
    }
    cleanups.push(() => {
      if (fill) fill.style.transform = "";
      lit = -1;
      paint(rows.length, false);
    });

    update(0);
    ST.create({
      trigger: list,
      start: "top 62%",
      end: "bottom 62%",
      onUpdate: (s) => update(s.progress),
      // A reload part-way down the page lands with the rail already filled.
      onRefresh: (s) => update(s.progress),
    });
  });
}
