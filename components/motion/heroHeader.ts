import type { MotionCtx } from "./context";

/** [data-hero-header]: fixed header turns solid (glass) once past 60% of the viewport. */
export function initHeroHeader({ ST, on }: MotionCtx) {
  const hdr = document.querySelector<HTMLElement>("[data-hero-header]");
  let solid = false;
  // The header persists across routes: start every page transparent, as a fresh load would.
  if (hdr) hdr.setAttribute("data-solid", "0");
  function onScroll() {
    ST.update();
    const want = scrollY > innerHeight * 0.6;
    if (hdr && want !== solid) {
      solid = want;
      hdr.setAttribute("data-solid", solid ? "1" : "0");
    }
  }
  on(window, "scroll", onScroll, { passive: true });
  onScroll();
}
