import type { Metadata } from "next";

/* Site-wide strings and per-page <title> / description, verbatim from the source pages. */

export const site = {
  name: "Graham Furtado",
  role: "Property Developer",
  basedIn: "Brisbane, Queensland",
  region: "Queensland, Australia",
  company: "Furtado Property",
  copyright: "© 2026 Graham Furtado. All rights reserved.",
  links: {
    furtadoProperty: "https://www.furtadoproperty.com.au/",
    miraLiving: "https://miraliving.com.au/",
    linkedin: "https://au.linkedin.com/company/furtado-property",
  },
} as const;

export type NavId = "home" | "about" | "developments" | "expertise" | "approach" | "contact";

export const nav: ReadonlyArray<{ id: NavId; n: string; label: string; href: string }> = [
  { id: "home", n: "01", label: "Home", href: "/" },
  { id: "about", n: "02", label: "About", href: "/about" },
  { id: "developments", n: "03", label: "Developments", href: "/developments" },
  { id: "expertise", n: "04", label: "Expertise", href: "/expertise" },
  { id: "approach", n: "05", label: "Approach", href: "/approach" },
  { id: "contact", n: "06", label: "Contact", href: "/contact" },
];

/** Route → active nav id (the `active` prop of the source SiteChrome). */
export function activeFor(pathname: string): NavId {
  if (pathname === "/") return "home";
  const seg = pathname.split("/")[1];
  return nav.some((n) => n.id === seg && n.id !== "home") ? (seg as NavId) : "home";
}

export const pageMeta = {
  home: {
    title: "Graham Furtado — Property Developer, Queensland",
    description:
      "Graham Furtado is a Queensland property developer and experienced real-estate professional, behind MIRA Living in Bargara and Furtado Property's West End proposal.",
  },
  about: {
    title: "About — Graham Furtado",
    description:
      "Graham Furtado: Queensland property developer and experienced Brisbane real-estate professional, developer at Furtado Property.",
  },
  developments: {
    title: "Developments — Graham Furtado",
    description: "MIRA Living, Bargara and the West End proposal, Brisbane: residential developments by Furtado Property.",
  },
  expertise: {
    title: "Expertise — Graham Furtado",
    description:
      "Property development, development strategy, site identification, feasibility, development management and property advisory in Queensland.",
  },
  approach: {
    title: "Development Approach — Graham Furtado",
    description:
      "Identify, assess, envision, design, develop, deliver: the residential development approach behind Furtado Property projects.",
  },
  contact: {
    title: "Contact — Graham Furtado",
    description: "Contact Graham Furtado for development, site and residential property enquiries in Queensland.",
  },
  miraLiving: {
    title: "MIRA Living — Graham Furtado",
    description: "MIRA Living: 25 boutique oceanfront residences at 25–27 Esplanade, Bargara, developed by Furtado Property.",
  },
  westEnd: {
    title: "West End — Graham Furtado",
    description:
      "West End proposal: 13 storeys and 113 apartments at Wolfe and Greet Streets, Brisbane, lodged by Furtado Property in September 2026.",
  },
} satisfies Record<string, Metadata>;

/** The six development stages (Approach page + Home approach pills). */
export const stages = [
  { n: "01", name: "Identify", text: "Every project starts with finding the right site: a location with potential, and a gap in the market it can fill." },
  { n: "02", name: "Assess", text: "A high-level read of site potential, market fit and product direction before a project progresses." },
  { n: "03", name: "Envision", text: "Defining the residential offer: who it is for, how it is positioned and how people will live in it." },
  { n: "04", name: "Design", text: "Working with experienced architects and designers on buildings intended to remain relevant over time." },
  { n: "05", name: "Develop", text: "Coordinating planners, engineers, builders and specialists while holding the original development vision." },
  { n: "06", name: "Deliver", text: "Bringing the finished homes to market, through to handing over the keys." },
] as const;
