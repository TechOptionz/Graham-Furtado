import type Lenis from "lenis";

/** Shared runtime handle (the source's `window.GF`). */
export type GFRuntime = {
  lenis?: Lenis;
  /** Close the menu panel; `instant` skips the close transitions (used behind the veil on route change). */
  closeMenu?: (instant?: boolean) => void;
  /** Veil route transition: slide the veil in, then navigate. */
  leave?: (href: string) => void;
  /** Re-run the page motion setup for the current route (same-page navigation). */
  rerun?: () => void;
  /** Set once the entry veil has been handled for the current page. */
  _lifted?: boolean;
  /** True between a veil transition and the next page setup (scroll is reset to the top). */
  _navigated?: boolean;
};

export const GF: GFRuntime = {};
