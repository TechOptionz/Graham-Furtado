/* The eight areas of expertise, verbatim from Home (switcher) and Expertise (blocks). */
export type Service = {
  n: string;
  title: string;
  /** Home switcher / Expertise block copy (Expertise wording differs on 03 and 04, kept separately). */
  summary: string;
  expertiseSummary: string;
  practice: string;
  media: `svc.${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
};

export const services: readonly Service[] = [
  {
    n: "01",
    title: "Property Development",
    summary: "Residential development from early opportunity and site stage through design coordination, delivery and market completion.",
    expertiseSummary: "Residential development from early opportunity and site stage through design coordination, delivery and market completion.",
    practice: "Demonstrated through MIRA Living in Bargara and the West End proposal in Brisbane.",
    media: "svc.1",
  },
  {
    n: "02",
    title: "Residential Development Strategy",
    summary: "Project direction, target market, product positioning, development priorities and the residential offer.",
    expertiseSummary: "Project direction, target market, product positioning, development priorities and the residential offer.",
    practice: "MIRA Living is positioned as premium, owner-occupier oriented coastal living.",
    media: "svc.2",
  },
  {
    n: "03",
    title: "Site Identification & Acquisition",
    summary: "Recognising locations and sites with potential, and considering market gaps and development fit.",
    expertiseSummary: "Recognising locations and sites with potential, considering market gaps and development fit.",
    practice: "Furtado Property’s process begins with finding the right site before a project progresses.",
    media: "svc.3",
  },
  {
    n: "04",
    title: "Development Feasibility",
    summary: "Early-stage, high-level assessment of market fit, site potential, product direction and development opportunity.",
    expertiseSummary: "High-level, early-stage assessment of market fit, site potential, product direction and development opportunity.",
    practice: "Informed by around three decades in the Brisbane property market.",
    media: "svc.4",
  },
  {
    n: "05",
    title: "Development Management",
    summary: "Coordinating architects, designers, planners, engineers, builders, sales teams and other project specialists.",
    expertiseSummary: "Coordinating architects, designers, planners, engineers, builders, sales teams and other project specialists.",
    practice: "West End brings together architecture, town planning, landscape, traffic and civil consultants.",
    media: "svc.5",
  },
  {
    n: "06",
    title: "Design & Consultant Coordination",
    summary: "Bringing specialist teams together while holding the development vision and the end-user outcome.",
    expertiseSummary: "Bringing specialist teams together while holding the development vision and the end-user outcome.",
    practice: "Furtado Property partners with experienced architects and designers.",
    media: "svc.6",
  },
  {
    n: "07",
    title: "Property Market Advisory",
    summary: "Applying long-term real-estate experience to location, buyer, residential-market and product decisions.",
    expertiseSummary: "Applying long-term real-estate experience to location, buyer, residential-market and product decisions.",
    practice: "Around thirty years as a Brisbane real-estate agent.",
    media: "svc.7",
  },
  {
    n: "08",
    title: "Real Estate Advisory",
    summary: "Strategic residential property guidance informed by an extensive real-estate career.",
    expertiseSummary: "Strategic residential property guidance informed by an extensive real-estate career.",
    practice: "Grounded in long-standing experience across the Brisbane residential market.",
    media: "svc.8",
  },
];
