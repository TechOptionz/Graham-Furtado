import type { MotionCtx } from "./context";

/**
 * Parses a figure like "25", "98%", "20+", "09.26" or "1,200" into its parts so it
 * can be counted up while keeping the prefix/suffix, decimals and zero padding.
 */
function parseFigure(raw: string) {
  const m = raw.trim().match(/^([^\d]*)(\d[\d,]*)(?:\.(\d+))?([^\d]*)$/);
  if (!m) return null;
  const [, prefix, intPart, decPart = "", suffix] = m;
  const digits = intPart.replace(/,/g, "");
  const to = parseFloat(decPart ? `${digits}.${decPart}` : digits);
  return {
    to,
    prefix,
    suffix,
    decimals: decPart.length,
    pad: digits.length,
    grouped: intPart.includes(","),
  };
}

function format(v: number, f: NonNullable<ReturnType<typeof parseFigure>>) {
  let s = v.toFixed(f.decimals);
  let [int, dec] = s.split(".");
  if (int.length < f.pad) int = int.padStart(f.pad, "0");
  if (f.grouped) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  s = dec ? `${int}.${dec}` : int;
  return f.prefix + s + f.suffix;
}

/**
 * [data-count]: counts the figure up from zero once in view.
 * `data-count="n"` gives the target explicitly; an empty `data-count` reads the
 * figure from the element's own text, preserving its formatting ("98%", "09.26", "20+").
 */
export function initCount({ gsap, ST, $$, reduce, EX }: MotionCtx) {
  if (reduce) return;
  $$("[data-count]").forEach((el) => {
    const attr = el.getAttribute("data-count") || "";
    const fig = parseFigure(attr || el.textContent || "");
    if (!fig) return;
    const final = attr ? String(Math.round(fig.to)) : el.textContent || "";

    // Reserve the final width so the layout doesn't shift while the digits change.
    el.style.display = "inline-block";
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.setAttribute("aria-label", final.trim());

    // Fall in step with a parent data-r="group" stagger, if any.
    const card = el.parentElement;
    const group = card && card.parentElement;
    const idx = group && group.getAttribute("data-r") === "group" ? Array.prototype.indexOf.call(group.children, card) : 0;
    const delay = parseFloat(el.getAttribute("data-count-delay") || "") || idx * 0.09;

    const o = { v: 0 };
    el.textContent = format(0, fig);
    ST.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(o, {
          v: fig.to,
          duration: 2.2,
          delay,
          ease: EX,
          onUpdate: () => { el.textContent = format(o.v, fig); },
          onComplete: () => { el.textContent = final; },
        });
      },
    });
  });
}
