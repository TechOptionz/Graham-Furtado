import { GF } from "@/lib/gf";
import type { MotionCtx } from "./context";

/**
 * Intro: veil / preloader lift, then hero choreography.
 * Home ([data-hero-name] present): the name rises in on the veil, then travels into the hero
 * headline while the veil dissolves and the hero image settles (1.14 → 1). Other pages: the
 * veil slides up and the hero intro runs.
 */
export function initHeroIntro({ gsap, ST, $$, reduce, E, E4, EX, on }: MotionCtx) {
  const veil = document.querySelector<HTMLElement>("[data-veil]");
  const heroImg = $$("[data-intro-img]");
  const heroLines = $$("[data-intro-line]");
  const heroFade = $$("[data-intro-fade]");
  const hh = document.querySelector<HTMLElement>("[data-hero-header]");
  if (!reduce) {
    if (heroLines.length) gsap.set(heroLines, { yPercent: 115 });
    if (heroFade.length) gsap.set(heroFade, { opacity: 0, y: 16 });
    if (heroImg.length) gsap.set(heroImg, { scale: 1.14 });
    if (hh) gsap.set(hh, { yPercent: -50, opacity: 0 });
  }
  function intro() {
    if (reduce) return;
    const tl = gsap.timeline();
    tl.to(heroImg, { scale: 1, duration: 2.4, ease: EX }, 0)
      .to(heroLines, { yPercent: 0, duration: 1.3, ease: E4, stagger: 0.1 }, 0.15)
      .to(heroFade, { opacity: 1, y: 0, duration: 1, ease: E, stagger: 0.08 }, 0.6);
    if (hh) tl.to(hh, { yPercent: 0, opacity: 1, duration: 0.8, ease: E }, 0.5);
  }
  GF._lifted = true;
  const heroName = document.querySelector<HTMLElement>("[data-hero-name]");
  const pre = veil && veil.querySelector<HTMLElement>("[data-pre]");
  const preMark = veil && veil.querySelector<HTMLElement>("[data-pre-mark]");
  const sub = veil ? $$("[data-pre-sub]", veil) : [];
  const rule = veil && veil.querySelector<HTMLElement>("[data-pre-rule]");
  const glow = veil && veil.querySelector<HTMLElement>("[data-pre-glow]");
  const pl = veil ? $$("[data-pre-line]", veil) : [];

  if (veil && heroName && preMark && !reduce) {
    // Home entry: name rises in on the veil, then travels into the hero headline
    if (GF.lenis) GF.lenis.stop();
    // The veil persists across routes: restore the fresh-load state before replaying.
    gsap.set(veil, { display: "flex", yPercent: 0, backgroundColor: "#1c231f" });
    gsap.set(preMark, { x: 0, y: 0, opacity: 1 });
    if (glow) gsap.set(glow, { opacity: 0 });
    if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "0 50%" });
    gsap.set(pre, { opacity: 1 });
    gsap.set(pl, { yPercent: 115 });
    gsap.set(sub, { opacity: 0, y: 10 });
    const tl = gsap.timeline();
    if (glow) tl.to(glow, { opacity: 1, duration: 2.2, ease: E }, 0);
    tl.to(pl, { yPercent: 0, duration: 1.25, ease: E4, stagger: 0.12 }, 0.3);
    if (rule) tl.to(rule, { scaleX: 1, duration: 1.2, ease: EX }, 0.9);
    tl.to(sub, { opacity: 1, y: 0, duration: 0.8, ease: E, stagger: 0.15 }, 1.0);
    tl.add(() => {
      const from = preMark.getBoundingClientRect();
      const to = heroName.getBoundingClientRect();
      const mv = gsap.timeline({
        onComplete: () => {
          gsap.set(veil, { display: "none" });
          if (GF.lenis) GF.lenis.start();
        },
      });
      mv.to(sub, { opacity: 0, y: -8, duration: 0.4, ease: "power2.in", stagger: 0.05 }, 0);
      if (rule) mv.to(rule, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.5, ease: "power3.in" }, 0);
      if (glow) mv.to(glow, { opacity: 0, duration: 0.8 }, 0.2);
      mv.to(preMark, { x: to.left - from.left, y: to.top - from.top, duration: 1.4, ease: "expo.inOut" }, 0.1)
        .to(veil, { backgroundColor: "rgba(28,35,31,0)", duration: 1.2, ease: "power2.inOut" }, 0.45)
        .to(heroImg, { scale: 1, duration: 2.4, ease: EX }, 0.4)
        .add(() => {
          gsap.set(heroLines, { yPercent: 0 });
          gsap.set(preMark, { opacity: 0 });
        }, 1.5)
        .to(heroFade, { opacity: 1, y: 0, duration: 1, ease: E, stagger: 0.08 }, 1.4);
      if (hh) mv.to(hh, { yPercent: 0, opacity: 1, duration: 0.8, ease: E }, 1.4);
    }, "+=0.55");
  } else {
    const tl = gsap.timeline({
      onComplete: () => {
        if (veil) gsap.set(veil, { display: "none" });
      },
    });
    if (veil) tl.to(veil, { yPercent: -100, duration: reduce ? 0.01 : 0.9, ease: "power4.inOut" }, 0.1);
    tl.add(intro, reduce ? 0 : "-=0.5");
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  on(window, "load", () => ST.refresh());
}
