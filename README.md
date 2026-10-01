# Graham Furtado — Next.js port

A 1:1 port of the static site in `../dist` (the `.dc.html` pages, `site.js`, `site-media.js`)
to Next.js (App Router, TypeScript, inline style objects, GSAP + ScrollTrigger + Lenis).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Layout

| Path | What |
| --- | --- |
| `app/layout.tsx` | fonts, `<SmoothScroll>`, `<SiteChrome>`, `<PageMotion>` |
| `app/globals.css` | the page helmet CSS (font-size breakpoints, body reset, keyframes), the SiteChrome helmet CSS, and the hover/focus classes that replace `style-hover` / `style-focus` |
| `app/**/page.tsx` | the eight pages. Markup and inline styles are converted verbatim from the source (see `scripts/convert.mjs`) |
| `components/SiteChrome.tsx` | fixed header (transparent → glass via `data-solid`), menu panel, entry veil; state logic mirrors the source `renderVals()` |
| `components/SiteFooter.tsx` | enquiries block + footer (`showContact` prop) |
| `components/SmoothScroll.tsx` | Lenis on gsap's ticker, `lenis.on('scroll', ScrollTrigger.update)` |
| `components/PageMotion.tsx` → `components/motion/useMotion.ts` | runs the attribute-driven motion for the current route inside a `gsap.context`, reverts it on route change |
| `components/motion/*.ts` | one module per `site.js` block: `constants`, `footerMark`, `career` (About timeline), `linesReveal`, `fade` (fade/group/slide), `imgReveal` (img/rule), `parallax`, `count`, `stack`, `heroMask`, `marquee`, `steps`, `switcher`, `zoom`, `heroHeader`, `links` (anchors + veil route transitions), `cursor` (disabled, as in the source), `heroIntro` (veil lift, Home entry sequence) |
| `components/media/HeroVideo.tsx` | the MIRA Living / West End hero video loop (`data/media.ts` → `HERO_VIDEO`): poster under a muted, looping, `playsInline` `<video>` that fades in on `playing`; stays on the poster under `prefers-reduced-motion`, pauses when the hero is off-screen |
| `components/media/MediaSlot.tsx` | renders a `data/media.ts` key → `next/image` (cover, `50% 62%`) or the striped placeholder + brief |
| `components/ContactForm.tsx` | the contact form (placeholder, not connected to an inbox) |
| `data/media.ts` | `GF_MEDIA`, verbatim. Set `src` on a key to replace its placeholder site-wide |
| `data/siteContent.ts`, `data/projects.ts`, `data/services.ts`, `data/career.ts` | page meta, nav, stages, projects and services copy; career history, qualifications and managed portfolio (About page + chat assistant) |
| `fonts/`, `public/media/` | the source fonts and photography; `public/media/video/` holds the two hero loops (1280×720 H.264, no audio) and their poster frames |
| `scripts/convert.mjs`, `scripts/fragments.mjs` | the one-shot HTML → JSX converters used to generate the pages, chrome, footer and form |

## Notes on the port

- Fonts are loaded with `next/font/local` and exposed as `--font-inter` / `--font-inria`;
  every `'Inria Serif',serif` in the source became `var(--font-inria),serif`.
- `style-hover="…"` / `style-focus="…"` became CSS classes (`.hv-*`, `.fc-*`) with `!important`
  so they win over the element's inline base style, as the runtime-applied values did.
- Links are plain `<a href="/route">`. The document click handler (from `site.js`) runs the veil
  transition and then `router.push`; the new route's setup lifts the veil and plays the hero intro.
  Same-page links replay the sequence; back/forward also start with the veil covering.
- `data-cursor` attributes were dropped (the custom cursor is disabled in the source).
- Placeholder slots stay placeholders until `data/media.ts` gets a `src` for the key.


## Chat assistant

A floating "Ask a question" widget (`components/ChatWidget.tsx`) is mounted in `app/layout.tsx` on every page.
It posts the conversation to `app/api/chat/route.ts`, which streams a plain-text reply from Claude
(`claude-opus-5`, via `@anthropic-ai/sdk`). The assistant's knowledge is assembled in `data/chatKnowledge.ts`
from the same data files the pages use (`siteContent`, `projects`, `services`), so it stays in sync with the copy.

Setup: copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. Without the key the route returns 503 and
the widget shows a "not available" message. The API key is only read server-side.
