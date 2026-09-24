"use client";

import { useMotion } from "./motion/useMotion";

/** Mounts once in the layout; re-runs the page motion on every route change. */
export default function PageMotion() {
  useMotion();
  return null;
}
