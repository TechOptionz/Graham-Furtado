import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { useRouter } from "next/navigation";

export type AppRouter = ReturnType<typeof useRouter>;

/** Shared state for one page's motion setup (site.js `setup()` locals). */
export type MotionCtx = {
  gsap: typeof gsap;
  ST: typeof ScrollTrigger;
  router: AppRouter;
  reduce: boolean;
  fine: boolean;
  mobile: boolean;
  E: "power3.out";
  E4: "power4.out";
  EX: "expo.out";
  $$: (s: string, r?: ParentNode) => HTMLElement[];
  /** addEventListener with automatic removal when the page's motion is torn down. */
  on: (el: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions | boolean) => void;
  cleanups: Array<() => void>;
};

export function createCtx(router: AppRouter, cleanups: Array<() => void>): MotionCtx {
  return {
    gsap,
    ST: ScrollTrigger,
    router,
    reduce: matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine: matchMedia("(hover: hover) and (pointer: fine)").matches,
    mobile: innerWidth < 768,
    E: "power3.out",
    E4: "power4.out",
    EX: "expo.out",
    $$: (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s)),
    on: (el, type, fn, opts) => {
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    },
    cleanups,
  };
}
