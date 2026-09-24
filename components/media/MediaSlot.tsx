import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { MEDIA, type MediaKey } from "@/data/media";

type Props = {
  k: MediaKey;
  /** Hero image: eager/priority load (the source's data-eager). */
  eager?: boolean;
  style?: CSSProperties;
  sizes?: string;
  /** The striped placeholder's brief label; shown only while the key has no src. */
  children?: ReactNode;
};

/**
 * Renders GF_MEDIA[key]. With a src: the image, object-fit cover, positioned at
 * `50% <pos|62%>` exactly as site.js did. Without: the placeholder gradient (in `style`)
 * plus its brief label (children).
 */
export function MediaSlot({ k, eager, style, sizes = "100vw", children }: Props) {
  const m = MEDIA[k];
  const has = Boolean(m && m.src);
  return (
    <div data-media={k} data-eager={eager ? "" : undefined} style={style}>
      {has ? null : children}
      {has && (
        <Image
          className="gf-img"
          src={m.src}
          alt={m.alt || ""}
          fill
          sizes={sizes}
          priority={Boolean(eager)}
          style={{ objectFit: "cover", objectPosition: `50% ${m.pos || "62%"}` }}
        />
      )}
    </div>
  );
}
