/* Central image map (ported verbatim from site-media.js). Set `src` for any key to replace its placeholder site-wide.
   Placeholders stay visible until a src is supplied. Each empty key carries a `brief` — the image to generate/shoot for that slot (orientation · subject · light · mood). Use WebP/AVIF, ~2400px wide for full-bleed. */
export type MediaItem = { src: string; alt: string; brief?: string; pos?: string };

const media = {
  "home.hero": { src: "/media/generated/home-hero.webp", alt: "Modern Queensland coastal residence at dusk, low sun, warm timber + off-white render, sub-tropical planting, ocean horizon behind", brief: "HERO · LANDSCAPE 16:9 · Modern Queensland coastal residence at dusk, low sun, warm timber + off-white render, sub-tropical planting, ocean horizon behind. Wide cinematic shot, no people, no text" },
  "home.portrait": { src: "", alt: "Graham Furtado, editorial half-length portrait on a development site or in front of concrete/timber architecture", brief: "PORTRAIT 3:4 · Graham Furtado, editorial half-length portrait on a development site or in front of concrete/timber architecture. Natural side light, neutral tones, relaxed, looking off camera" },
  "svc.1": { src: "/media/generated/svc-1.webp", alt: "Cleared development site with survey pegs and an excavator, Brisbane suburbs in soft haze behind", brief: "SQUARE-ISH 4:5 · Cleared development site with survey pegs and an excavator, Brisbane suburbs in soft haze behind. Early morning light" }, "svc.2": { src: "/media/generated/svc-2.webp", alt: "Calm apartment living room, oak floor, stone bench, sheer curtains, sea light", brief: "SQUARE-ISH 4:5 · Calm apartment living room, oak floor, stone bench, sheer curtains, sea light. Minimal styling" }, "svc.3": { src: "/media/generated/svc-3.webp", alt: "Straight-down drone view of a corner residential block with surrounding streets and trees, Brisbane inner suburb", brief: "SQUARE-ISH 4:5 · Straight-down drone view of a corner residential block with surrounding streets and trees, Brisbane inner suburb" }, "svc.4": { src: "/media/generated/svc-4.webp", alt: "Leafy Brisbane street: jacaranda, timber Queenslander houses, footpath, late afternoon shadows", brief: "SQUARE-ISH 4:5 · Leafy Brisbane street: jacaranda, timber Queenslander houses, footpath, late afternoon shadows" },
  "svc.5": { src: "/media/generated/svc-5.webp", alt: "Mid-rise building under construction: formwork, crane, workers in hi-vis, blue sky", brief: "SQUARE-ISH 4:5 · Mid-rise building under construction: formwork, crane, workers in hi-vis, blue sky" }, "svc.6": { src: "/media/generated/svc-6.webp", alt: "Architect’s desk: floor plans, timber and stone samples, brick, pencil", brief: "SQUARE-ISH 4:5 · Architect’s desk: floor plans, timber and stone samples, brick, pencil. Overhead shot, neutral palette" }, "svc.7": { src: "/media/generated/svc-7.webp", alt: "Brisbane skyline from the river at dusk, Story Bridge lights, calm water", brief: "SQUARE-ISH 4:5 · Brisbane skyline from the river at dusk, Story Bridge lights, calm water" }, "svc.8": { src: "/media/generated/svc-8.webp", alt: "Row of contemporary townhouses, brick + timber, landscaped verge, empty street, morning", brief: "SQUARE-ISH 4:5 · Row of contemporary townhouses, brick + timber, landscaped verge, empty street, morning" },
  "mira.hero": { src: "/media/mira/mira-08.webp", alt: "MIRA Living — open-plan living, dining and kitchen" },
  "mira.wide": { src: "/media/mira/mira-05.webp", alt: "MIRA Living — living room looking through to the kitchen" },
  "mira.story": { src: "/media/mira/mira-21.webp", alt: "MIRA Living — stone island bench and living area" },
  "mira.design": { src: "/media/mira/mira-01.webp", alt: "MIRA Living — timber kitchen with waterfall stone island" },
  "mira.f3": { src: "/media/mira/mira-03.webp", alt: "MIRA Living — living and dining opening to the terrace" },
  "mira.f4": { src: "/media/mira/mira-11.webp", alt: "MIRA Living — kitchen with stone island" },
  "mira.f5": { src: "/media/mira/mira-10.webp", alt: "MIRA Living — main bedroom" },
  "mira.f6": { src: "/media/mira/mira-12.webp", alt: "MIRA Living — bathroom vanity" },
  "mira.g1": { src: "/media/mira/mira-11.webp", alt: "MIRA Living — kitchen with stone benchtops" }, "mira.g2": { src: "/media/mira/mira-15.webp", alt: "MIRA Living — bedroom" }, "mira.g3": { src: "/media/mira/mira-12.webp", alt: "MIRA Living — bathroom vanity" },
  "mira.g4": { src: "/media/mira/mira-04.webp", alt: "MIRA Living — dining and kitchen" }, "mira.g5": { src: "/media/mira/mira-16.webp", alt: "MIRA Living — second bedroom" }, "mira.g6": { src: "/media/mira/mira-14.webp", alt: "MIRA Living — study nook" },
  "mira.g7":  { src: "/media/mira/mira-03.webp", alt: "MIRA Living — living and dining" },
  "mira.g8":  { src: "/media/mira/mira-09.webp", alt: "MIRA Living — ensuite" },
  "mira.g9":  { src: "/media/mira/mira-10.webp", alt: "MIRA Living — main bedroom" },
  "mira.g10": { src: "/media/mira/mira-02.webp", alt: "MIRA Living — galley kitchen" },
  "mira.g11": { src: "/media/mira/mira-17.webp", alt: "MIRA Living — bathroom" },
  "mira.g12": { src: "/media/mira/mira-13.webp", alt: "MIRA Living — island bench to living" },
  "mira.g13": { src: "/media/mira/mira-06.webp", alt: "MIRA Living — kitchen from dining" },
  "mira.g14": { src: "/media/mira/mira-19.webp", alt: "MIRA Living — laundry" },
  "we.hero": { src: "/media/west-end/we-01.webp", alt: "West End proposal — render from Beesley Street (MAS Architecture)" },
  "we.wide": { src: "/media/west-end/we-03.webp", alt: "West End proposal — Wolfe Street frontage render" },
  "we.story": { src: "/media/west-end/we-02.webp", alt: "West End proposal — second frontage with vertical garden" },
  "we.design": { src: "/media/west-end/we-05.webp", alt: "West End proposal — lobby render" },
  "we.g1": { src: "/media/west-end/we-10.webp", alt: "West End proposal — tower elevation" }, "we.g2": { src: "/media/west-end/we-04.webp", alt: "West End proposal — arrival court" }, "we.f3": { src: "/media/west-end/we-04.webp", alt: "West End proposal — arrival court render" },
  "we.f4": { src: "/media/west-end/we-09.webp", alt: "West End proposal — planted facade and lobby" },
  "we.f5": { src: "/media/west-end/we-08.webp", alt: "West End proposal — balcony detail" },
  "we.f6": { src: "/media/west-end/we-07.webp", alt: "West End proposal — entry at night" },
  "we.g4": { src: "/media/west-end/we-02.webp", alt: "West End proposal — second frontage" },
  "we.g5": { src: "/media/west-end/we-09.webp", alt: "West End proposal — vertical garden" },
  "we.g6": { src: "/media/west-end/we-07.webp", alt: "West End proposal — lobby at night" },
  "we.g3": { src: "/media/west-end/we-06.webp", alt: "West End proposal — brick screen terrace" },
  "we.details": { src: "/media/west-end/we-08.webp", alt: "West End proposal — balcony and facade detail", pos: "50%" },
  "mira.details": { src: "/media/mira/mira-21.webp", alt: "MIRA Living — stone island bench and living area", pos: "55%" },
  "about.hero": { src: "/media/generated/about-hero.webp", alt: "Environmental portrait: Graham Furtado standing on a site or balcony overlooking the coast, wide frame, small in composition, dusk light", brief: "HERO · LANDSCAPE 16:9 · Environmental portrait: Graham Furtado standing on a site or balcony overlooking the coast, wide frame, small in composition, dusk light" },
  "about.portrait": { src: "", alt: "Graham Furtado, tight editorial portrait against a plain concrete or rendered wall, soft daylight, neutral clothing", brief: "PORTRAIT 3:4 · Graham Furtado, tight editorial portrait against a plain concrete or rendered wall, soft daylight, neutral clothing" },
  "about.site": { src: "/media/generated/about-site.webp", alt: "Rendered concrete wall with a timber door and a strip of shadow, minimal architectural detail, warm stone tones", brief: "LANDSCAPE 4:3 · Rendered concrete wall with a timber door and a strip of shadow, minimal architectural detail, warm stone tones" },
  "about.qld": { src: "/media/generated/about-qld.webp", alt: "Wide view along a Queensland beach esplanade at dawn: pandanus trees, low apartments, soft pink sky, calm sea", brief: "FULL SCREEN 16:9 · Wide view along a Queensland beach esplanade at dawn: pandanus trees, low apartments, soft pink sky, calm sea" },
  "dev.hero": { src: "/media/generated/dev-hero.webp", alt: "Contemporary residential building exterior at dusk, glowing windows, timber screens, planted balconies, warm off-white palette", brief: "HERO · LANDSCAPE 16:9 · Contemporary residential building exterior at dusk, glowing windows, timber screens, planted balconies, warm off-white palette" },
  "exp.hero": { src: "/media/generated/exp-hero.webp", alt: "Mid-rise residential project under construction at sunrise, scaffold and crane silhouetted, Brisbane skyline distant", brief: "HERO · LANDSCAPE 16:9 · Mid-rise residential project under construction at sunrise, scaffold and crane silhouetted, Brisbane skyline distant" },
  "app.hero": { src: "/media/generated/app-hero.webp", alt: "Concrete structure of an apartment building under construction, clean geometry, long shadows, blue sky", brief: "HERO · LANDSCAPE 16:9 · Concrete structure of an apartment building under construction, clean geometry, long shadows, blue sky. No people" },
  "app.1": { src: "", alt: "Vacant coastal or inner-city site seen from the street: fence, old sign, mature tree, morning light", brief: "LANDSCAPE 4:3 · Vacant coastal or inner-city site seen from the street: fence, old sign, mature tree, morning light" }, "app.2": { src: "", alt: "Site survey: printed plans and tablet on a car bonnet, block visible behind, overcast light", brief: "LANDSCAPE 4:3 · Site survey: printed plans and tablet on a car bonnet, block visible behind, overcast light" }, "app.3": { src: "", alt: "Material mood board: sand-coloured brick, pale oak, travertine, linen", brief: "LANDSCAPE 4:3 · Material mood board: sand-coloured brick, pale oak, travertine, linen. Overhead, soft light" },
  "app.4": { src: "", alt: "Architectural drawings and a white study model on a desk, afternoon light through blinds", brief: "LANDSCAPE 4:3 · Architectural drawings and a white study model on a desk, afternoon light through blinds" }, "app.5": { src: "", alt: "Construction progress: concrete slab pour with workers, crane above, bright daylight", brief: "LANDSCAPE 4:3 · Construction progress: concrete slab pour with workers, crane above, bright daylight" }, "app.6": { src: "", alt: "Completed residence at twilight: interior lights on, landscaping settled, quiet street", brief: "LANDSCAPE 4:3 · Completed residence at twilight: interior lights on, landscaping settled, quiet street" },
  "contact.hero": { src: "/media/generated/contact-hero.webp", alt: "Modern residential facade at blue hour, warm interior light behind timber screens, deep charcoal sky, calm and restrained", brief: "HERO · LANDSCAPE 16:9 · Modern residential facade at blue hour, warm interior light behind timber screens, deep charcoal sky, calm and restrained" }
} as const;

export type MediaKey = keyof typeof media;
export const MEDIA: Record<MediaKey, MediaItem> = media;

/* Hero video loops (public/media/video). Built with ffmpeg from the supplied clips: trimmed,
   Gemini watermark removed (delogo, bottom-right), joined with a short dissolve and given a
   1 s tail→head crossfade so the loop point is seamless. Poster = the first frame. */
export type HeroVideoItem = { src: string; poster: string; alt: string };
export const HERO_VIDEO = {
  mira: {
    src: "/media/video/mira-hero.mp4",
    poster: "/media/video/mira-hero-poster.webp",
    alt: "MIRA Living — walkthrough of the kitchen, living, bedroom and bathroom interiors",
  },
  we: {
    src: "/media/video/west-end-hero.mp4",
    poster: "/media/video/west-end-hero-poster.webp",
    alt: "West End proposal — exterior, entry and terrace renders (MAS Architecture)",
  },
  dev: {
    src: "/media/video/dev-hero.mp4",
    poster: "/media/video/dev-hero-poster.jpg",
    alt: "MIRA Living — story walkthrough of the interiors",
  },
} as const satisfies Record<string, HeroVideoItem>;
export type HeroVideoKey = keyof typeof HERO_VIDEO;
