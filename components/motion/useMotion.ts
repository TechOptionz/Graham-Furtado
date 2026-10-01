"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GF } from "@/lib/gf";
import { createCtx, type MotionCtx } from "./context";
import { initConstants } from "./constants";
import { initFooterMark } from "./footerMark";
import { initCareer } from "./career";
import { initLinesReveal } from "./linesReveal";
import { initFade } from "./fade";
import { initImgReveal } from "./imgReveal";
import { initParallax } from "./parallax";
import { initCount } from "./count";
import { initStack } from "./stack";
import { initHeroMask } from "./heroMask";
import { initMarquee } from "./marquee";
import { initSteps } from "./steps";
import { initSwitch } from "./switcher";
import { initZoom } from "./zoom";
import { initHeroHeader } from "./heroHeader";
import { initLinks } from "./links";
import { initCursor } from "./cursor";
import { initHeroIntro } from "./heroIntro";

let firstRun = true;

/** site.js `setup()`, in the source order. */
function setup(c: MotionCtx, first: boolean) {
  if (!first) {
    // Every client navigation (link, back/forward) begins like a fresh document:
    // the veil covers the page and the intro lifts it.
    const veil = document.querySelector<HTMLElement>("[data-veil]");
    const pre = veil && veil.querySelector<HTMLElement>("[data-pre]");
    if (pre) pre.style.opacity = "0";
    if (veil) c.gsap.set(veil, { display: "flex", yPercent: 0, backgroundColor: "#1c231f" });
  }
  if (GF._navigated) {
    // A fresh document starts at the top; do the same after a veil transition.
    GF._navigated = false;
    if (GF.lenis) GF.lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }
  initConstants(c);
  initFooterMark(c);
  initCareer(c);
  initLinesReveal(c);
  initFade(c);
  initImgReveal(c);
  initParallax(c);
  initCount(c);
  initStack(c);
  initHeroMask(c);
  initMarquee(c);
  initSteps(c);
  initSwitch(c);
  initZoom(c);
  initHeroHeader(c);
  initLinks(c);
  initCursor(c);
  initHeroIntro(c);
  // Positions for a freshly mounted route (the source refreshed on `load`).
  const id = requestAnimationFrame(() => c.ST.refresh());
  c.cleanups.push(() => cancelAnimationFrame(id));
}

/**
 * Runs the attribute-driven motion for the current route, and tears it all down
 * (ScrollTriggers, tweens, listeners) when the route changes.
 */
export function useMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const [tick, setTick] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    GF.rerun = () => setTick((t) => t + 1);
    let dead = false;
    let ctx: gsap.Context | undefined;
    const cleanups: Array<() => void> = [];
    const wait = (test: () => unknown, cb: () => void, max: number) => {
      const t0 = Date.now();
      (function loop() {
        if (dead) return;
        if (test() || Date.now() - t0 > max) cb();
        else setTimeout(loop, 40);
      })();
    };
    wait(
      () => document.querySelector("[data-veil]") && document.querySelector("[data-footer]"),
      () => {
        if (dead) return;
        const first = firstRun;
        firstRun = false;
        ctx = gsap.context(() => setup(createCtx(router, cleanups), first));
      },
      2500
    );
    return () => {
      dead = true;
      cleanups.forEach((f) => f());
      if (ctx) ctx.revert();
    };
  }, [pathname, tick, router]);
}
