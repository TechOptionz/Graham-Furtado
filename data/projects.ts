/* The two developments, verbatim from the source pages. */
export type Project = {
  id: "mira-living" | "west-end";
  n: "01" | "02";
  name: string;
  href: string;
  location: string;
  status: string;
  statusShort: string;
  facts: readonly string[];
  cta: string;
  detailsCta: string;
  heroMedia: "mira.hero" | "we.hero";
  wideMedia: "mira.wide" | "we.wide";
  details: ReadonlyArray<readonly [label: string, value: string]>;
};

export const projects: readonly Project[] = [
  {
    id: "mira-living",
    n: "01",
    name: "MIRA Living",
    href: "/developments/mira-living",
    location: "Bargara, Queensland",
    status: "Nearing completion",
    statusShort: "Nearing completion",
    facts: ["25 residences", "Boutique oceanfront apartments", "Completion September 2026"],
    cta: "View development",
    detailsCta: "Development details",
    heroMedia: "mira.hero",
    wideMedia: "mira.wide",
    details: [
      ["Location", "25–27 Esplanade, Bargara, Queensland"],
      ["Type", "Boutique oceanfront residential apartments"],
      ["Scale", "25 residences"],
      ["Developer", "Furtado Property"],
      ["Graham’s role", "Developer, Furtado Property"],
      ["Status", "Under construction; 98% complete (September 2026)"],
      ["Completion", "September 2026, as stated by MIRA Living"],
      ["Positioning", "Premium, owner-occupier oriented coastal living"],
    ],
  },
  {
    id: "west-end",
    n: "02",
    name: "West End",
    href: "/developments/west-end",
    location: "Brisbane, Queensland",
    status: "Proposed · DA lodged",
    statusShort: "Proposed · DA lodged",
    facts: ["113 apartments proposed", "13 storeys", "Lodged September 2026"],
    cta: "View proposal",
    detailsCta: "Proposal details",
    heroMedia: "we.hero",
    wideMedia: "we.wide",
    details: [
      ["Site", "5 Wolfe Street and 6–8 Greet Street, West End"],
      ["Proposed scale", "13 storeys"],
      ["Apartments", "113 total"],
      ["Mix", "92 two-bedroom + 21 three-bedroom"],
      ["Applicant", "Furtado Property (FP Margate Pty Ltd)"],
      ["Architect", "MAS Architecture"],
      ["Town planner", "Urbicus"],
      ["Landscape", "AS Design"],
      ["Traffic / waste", "BMC Traffic"],
      ["Civil / flood", "CDS"],
      ["Status", "Lodged with Brisbane City Council; received 9 September 2026"],
    ],
  },
];
