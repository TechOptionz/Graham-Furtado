/* Career history, qualifications and managed portfolio, from Graham's résumé.
   Rendered by the About page and fed to the chat assistant, so the two stay in sync. */

export type CareerRole = {
  years: string;
  role: string;
  company: string;
  text: string;
  /** Headline figure for the role, counted up on the About timeline. */
  figure?: { value: string; label: string };
  /** Shown in place of a figure. */
  link?: { label: string; href: string };
};

/** Oldest first: the About timeline draws downward from 1992 to today. */
export const career: readonly CareerRole[] = [
  {
    years: "1992 – 1999",
    role: "Sales & Property Management",
    company: "Ray White, New Farm",
    text: "Responsible for every facet of the day-to-day and ongoing management of a residential property portfolio.",
    figure: { value: "300", label: "Properties managed" },
  },
  {
    years: "1999 – 2005",
    role: "Director / Principal",
    company: "Theresa Fitzgerald Property Management, New Farm",
    text: "Co-owner and self-employed licensee of a specialist property-management company.",
    figure: { value: "350", label: "Properties, portfolio built" },
  },
  {
    years: "2005 – 2008",
    role: "Director / Principal",
    company: "Raine & Horne, Strathpine",
    text: "Self-employed licensee leading residential sales and property management.",
    figure: { value: "235", label: "Properties managed" },
  },
  {
    years: "2008 – Present",
    role: "Director / Principal",
    company: "Furtado Property",
    text: "Self-employed licensee of Taj Property Group Pty Ltd, trading as Furtado Property: a specialist on-site management organisation, and an adviser to other on-site managers across South-East Queensland.",
    figure: { value: "333", label: "Properties managed" },
  },
  {
    years: "2012 – 2022",
    role: "Director / Principal",
    company: "Oxford Crest",
    text: "Sole director and licensee. On-site management and caretaking of eight over-50s villages across South-East Queensland, including the safe and profitable operation of food services at each site.",
    figure: { value: "550", label: "Properties managed" },
  },
  {
    years: "2022 – 2023",
    role: "Director",
    company: "SSA Plan",
    text: "Sole director of Simple Solutions Plan Managers: NDIS plan and budget management, with participant and provider services.",
  },
  {
    years: "Today",
    role: "Developer",
    company: "Residential development",
    text: "MIRA Living on the Bargara Esplanade and a 113-apartment proposal in Brisbane’s West End, through Furtado Property.",
    link: { label: "Current developments", href: "#current" },
  },
];

export const qualifications = [
  { title: "Full Real Estate Licence", issuer: "Office of Fair Trading", year: "1999" },
  { title: "Bachelor of Economics", issuer: "University of New England", year: "1992" },
] as const;

/** Headline figures under the About biography. */
export const careerStats = [
  { value: "30+", label: "Years in Queensland real estate" },
  { value: "25+", label: "Years as a self-employed licensee" },
  { value: "550", label: "Properties in his largest managed portfolio" },
  { value: "8", label: "Over-50s villages managed across South-East Queensland" },
] as const;

/** The on-site management portfolio previously managed through Furtado Property. */
export const managedPortfolio = {
  total: "333",
  complexes: [
    { name: "Deagon Village", value: "84", unit: "Units", note: "Sold to Eureka Group Holdings, March 2022" },
    { name: "The Brook at Kalinger Park", value: "74", unit: "Units", note: "Sold to private operators, January 2016" },
    { name: "Freshwater Villas", value: "60", unit: "Units", note: "Sold to private operators, November 2021" },
    { name: "Madison Green", value: "45", unit: "Apartments", note: "Residential apartment complex" },
  ],
  other: "The wider portfolio of individual properties, from inner-city Brisbane to the northern suburbs, was sold to a private operator in February 2022.",
} as const;
