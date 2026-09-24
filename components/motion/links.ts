import { GF } from "@/lib/gf";
import type { MotionCtx } from "./context";

/**
 * Links: smooth anchors + veil route transitions.
 * Internal links (href starting with "/") slide the veil in, then navigate with the router
 * (the source navigated with location.href; here the new route mounts and its own setup lifts the veil).
 */
export function initLinks({ gsap, reduce, router, on }: MotionCtx) {
  const veil = document.querySelector<HTMLElement>("[data-veil]");

  on(document, "click", (ev) => {
    const e = ev as MouseEvent;
    const target = e.target as Element | null;
    const a = target && target.closest ? target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href") || "";
    if (href.charAt(0) === "#") {
      let t: HTMLElement | null = href.length > 1 ? document.getElementById(href.slice(1)) : null;
      if (href === "#top") t = document.body;
      if (t) {
        e.preventDefault();
        if (GF.closeMenu) GF.closeMenu();
        const y = t === document.body ? 0 : t.getBoundingClientRect().top + scrollY;
        if (GF.lenis) GF.lenis.scrollTo(y, { duration: 1.4 });
        else scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }
    if (href.charAt(0) === "/" && href.charAt(1) !== "/") {
      e.preventDefault();
      if (GF.leave) GF.leave(href);
    }
  });

  GF.leave = (href: string) => {
    const path = href.split("#")[0];
    const samePage = path === location.pathname;
    const go = () => {
      GF._navigated = true;
      if (GF.closeMenu) GF.closeMenu(true);
      if (samePage) {
        if (GF.rerun) GF.rerun();
      } else router.push(href);
    };
    if (!veil || reduce) {
      go();
      return;
    }
    const pre = veil.querySelector<HTMLElement>("[data-pre]");
    if (pre) pre.style.opacity = "0";
    gsap.set(veil, { display: "flex", yPercent: 100, backgroundColor: "#1c231f" });
    gsap.to(veil, { yPercent: 0, duration: 0.75, ease: "power4.inOut", onComplete: go });
  };

  on(window, "pageshow", (ev) => {
    const e = ev as PageTransitionEvent;
    if (e.persisted && veil) gsap.set(veil, { display: "none" });
  });

  // Warm the routes this page links to.
  const seen = new Set<string>();
  Array.prototype.slice.call(document.querySelectorAll('a[href^="/"]')).forEach((a: HTMLAnchorElement) => {
    const href = (a.getAttribute("href") || "").split("#")[0];
    if (href && !seen.has(href) && href !== location.pathname) {
      seen.add(href);
      router.prefetch(href);
    }
  });
}
