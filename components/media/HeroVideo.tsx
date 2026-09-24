"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { HERO_VIDEO, type HeroVideoKey } from "@/data/media";

type Props = {
  k: HeroVideoKey;
  style?: CSSProperties;
};

/**
 * Full-bleed hero video. Renders the poster (next/image, priority) underneath and fades the
 * looping video in once it is actually playing, so there is never a blank or a hard swap.
 * Muted + playsInline so it autoplays on mobile. Honours prefers-reduced-motion (stays on the
 * poster) and pauses while the hero section is scrolled out of view.
 *
 * The tag is server-rendered with muted + autoplay, so the browser usually starts playback
 * before React hydrates and the first `playing` event fires before onPlaying is attached.
 * The effect therefore also reads the live state (and the play() promise) so the fade-in
 * never waits for the next loop iteration.
 */
export function HeroVideo({ k, style }: Props) {
  const v = HERO_VIDEO[k];
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.pause();
      return;
    }
    const markPlaying = () => setPlaying(true);
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.then === "function") p.then(markPlaying).catch(() => {});
    };
    // Already running from the server-rendered autoplay? Reveal it now.
    if (!el.paused && !el.ended && el.readyState >= 3) markPlaying();
    el.addEventListener("playing", markPlaying);
    tryPlay();

    // The video sits in a position:fixed layer, so observe the hero section instead of the video.
    const hero = el.closest("[data-hero]");
    if (!hero || typeof IntersectionObserver === "undefined") {
      return () => el.removeEventListener("playing", markPlaying);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
          else el.pause();
        });
      },
      { threshold: 0.01 },
    );
    io.observe(hero);
    return () => {
      io.disconnect();
      el.removeEventListener("playing", markPlaying);
    };
  }, []);

  return (
    <div data-hero-video={k} style={style}>
      <Image
        className="gf-img"
        src={v.poster}
        alt={v.alt}
        fill
        sizes="100vw"
        priority
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster={v.poster}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 50%",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.9s ease",
          pointerEvents: "none",
        }}
      >
        <source src={v.src} type="video/mp4" />
      </video>
    </div>
  );
}
