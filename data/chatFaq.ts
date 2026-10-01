import { site, stages } from "@/data/siteContent";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { qualifications } from "@/data/career";

/*
 * Fixed questions the assistant can answer without any API. Each entry has the question shown as a
 * suggestion chip, a set of patterns matched against the visitor's (normalised) message, and a canned
 * reply. Answers are built from the same data files the pages render, so they stay in sync.
 */

export type FaqEntry = {
  id: string;
  question: string;
  /** Show this question as a suggestion chip. */
  suggest?: boolean;
  /** Any of these matching the normalised message counts as a hit; the entry with most hits wins. */
  patterns: readonly RegExp[];
  answer: string;
};

const mira = projects.find((p) => p.id === "mira-living")!;
const westEnd = projects.find((p) => p.id === "west-end")!;
const fact = (p: typeof mira, label: string) => p.details.find(([l]) => l === label)?.[1] ?? "";

const expertiseList = services.map((s) => s.title).join(", ");
const stageNames = stages.map((s) => s.name).join(", ");

export const FAQ: readonly FaqEntry[] = [
  {
    id: "mira-status",
    question: "When will MIRA Living be finished?",
    patterns: [
      /\b(mira|bargara|esplanade)\b.*\b(complete|completion|finish|finished|done|ready|status|progress|construction|when|move in)\b/,
      /\b(complete|completion|finish|finished|done|ready|status|progress|construction|when|move in)\b.*\b(mira|bargara|esplanade)\b/,
    ],
    answer: `MIRA Living is ${fact(mira, "Status").toLowerCase()}, with completion stated by MIRA Living for ${fact(mira, "Completion").replace(", as stated by MIRA Living", "")}. You can follow the development at /developments/mira-living or on ${site.links.miraLiving}.`,
  },
  {
    id: "mira-buy",
    question: "How can I buy a residence at MIRA Living?",
    patterns: [/\b(price|prices|pricing|cost|costs|buy|buying|purchase|afford|availab\w*|for sale|floor ?plans?|apartments? left|remaining|deposit|inspect\w*)\b/],
    answer: `I don't hold pricing, availability or floor-plan details here. For MIRA Living sales, visit ${site.links.miraLiving}, and for any other residence or development enquiry please use the contact form at /contact.`,
  },
  {
    id: "mira",
    question: "What is MIRA Living?",
    suggest: true,
    patterns: [/\bmira\b/, /\bbargara\b/, /\boceanfront\b/, /\besplanade\b/, /\bbundaberg\b/],
    answer: `MIRA Living is a boutique oceanfront development of ${fact(mira, "Scale")} at ${fact(mira, "Location")}, developed by ${site.company} with Graham as developer. It is positioned as ${fact(mira, "Positioning").toLowerCase()} and is ${fact(mira, "Status").toLowerCase()}. See /developments/mira-living or ${site.links.miraLiving}.`,
  },
  {
    id: "west-end-team",
    question: "Who is the team behind the West End proposal?",
    patterns: [/\b(architect\w*|town planner|planner|urbicus|mas architecture|landscape|traffic|civil|flood|consultants?|team)\b/],
    answer: `The West End proposal is lodged by ${fact(westEnd, "Applicant")}, with ${fact(westEnd, "Architect")} as architect, ${fact(westEnd, "Town planner")} as town planner, ${fact(westEnd, "Landscape")} on landscape, ${fact(westEnd, "Traffic / waste")} on traffic and waste, and ${fact(westEnd, "Civil / flood")} on civil and flood. Details are at /developments/west-end.`,
  },
  {
    id: "west-end",
    question: "Tell me about the West End proposal",
    suggest: true,
    patterns: [/\bwest ?end\b/, /\bwolfe\b/, /\bgreet\b/, /\b113\b/, /\b13 ?storeys?\b/, /\bproposal\b/, /\b(da|development application)\b/],
    answer: `West End is a proposed residential development at ${fact(westEnd, "Site")}, Brisbane: ${fact(westEnd, "Proposed scale")} and ${fact(westEnd, "Apartments")} apartments (${fact(westEnd, "Mix")}). The application was ${fact(westEnd, "Status").toLowerCase()}. Read more at /developments/west-end.`,
  },
  {
    id: "developments",
    question: "What developments is Graham working on?",
    suggest: true,
    patterns: [/\b(developments?|projects?|portfolio|building|working on|current work)\b/],
    answer: `Graham currently has two developments through ${site.company}: MIRA Living, ${mira.facts[1].toLowerCase()} in Bargara that is ${mira.status.toLowerCase()}, and the West End proposal in Brisbane with ${westEnd.facts[0]} across ${westEnd.facts[1]}. Both are on /developments.`,
  },
  {
    id: "expertise",
    question: "What does Graham specialise in?",
    suggest: true,
    patterns: [/\b(speciali[sz]\w*|expertise|expert|services?|skills?|what does graham do|what do you do|offer|capabilit\w*|advisory|feasibility|strategy)\b/],
    answer: `Graham's areas of expertise are ${expertiseList}. Each is described, with an example from his projects, at /expertise.`,
  },
  {
    id: "approach",
    question: "How does Graham approach a development?",
    suggest: true,
    patterns: [/\b(approach|process|stages?|steps?|method\w*|how does (graham|he) work|how do you work|philosophy|way of working)\b/],
    answer: `Every project moves through six stages: ${stageNames}. It starts with finding the right site and a gap in the market, then defining the residential offer, working with experienced architects and designers, coordinating the consultant and construction team, and bringing the finished homes to market. The full approach is at /approach.`,
  },
  {
    id: "qualifications",
    question: "What are Graham's qualifications?",
    patterns: [/\b(qualif\w*|credentials?|licen[cs]ed?|degree|education|educated|university|stud(y|ied))\b/],
    answer: `Graham holds a ${qualifications[0].title} (${qualifications[0].issuer}, ${qualifications[0].year}) and a ${qualifications[1].title} from the ${qualifications[1].issuer} (${qualifications[1].year}). His full career history is at /about.`,
  },
  {
    id: "about",
    question: "Who is Graham Furtado?",
    suggest: true,
    patterns: [/\bwho is\b/, /\b(about|background|bio|biography|history|career|experience|years|agent|real[- ]?estate)\b/, /\bgraham\b/],
    answer: `Graham Furtado is a ${site.role.toLowerCase()} based in ${site.basedIn}, working through ${site.company}. His career began at Ray White New Farm in 1992 and he has been a self-employed licensee since 1999, with more than thirty years in Queensland real estate. He has since moved from managing and selling property to creating it, guiding projects from site opportunity through design, construction and market delivery. More at /about.`,
  },
  {
    id: "company",
    question: "What is Furtado Property?",
    patterns: [/\bfurtado property\b/, /\bcompany\b/, /\bbusiness\b/, /\bfirm\b/],
    answer: `${site.company} is a residential property developer based in South-East Queensland, with more than 20 years of property experience. Its projects look past the building as an asset to the home and the people who will live in it. Visit ${site.links.furtadoProperty}.`,
  },
  {
    id: "site",
    question: "I have a site or would like to partner",
    patterns: [
      /\b(my|our|a|the) (site|block|land|property|lot)\b/,
      /\b(land|block|site|lot|acreage)\b/,
      /\b(partner\w*|joint venture|jv|collaborat\w*)\b/,
      /\b(sell|develop|offer)\w* (my|our)\b/,
      /\binvest\w*\b/,
    ],
    answer: `Graham welcomes conversations about sites, development opportunities and partnerships in Queensland. Please share the details through the contact form at /contact and he will be in touch.`,
  },
  {
    id: "location",
    question: "Where is Graham based?",
    patterns: [/\b(where|based|located|location|office|region|area)\b/, /\bbrisbane\b/, /\bqueensland\b/, /\bqld\b/],
    answer: `Graham is based in ${site.basedIn}, and is active across Brisbane and South-East Queensland, with development experience extending to Bargara near Bundaberg.`,
  },
  {
    id: "contact",
    question: "How do I get in touch?",
    suggest: true,
    patterns: [/\b(contact|get in touch|in touch|reach|email|e-mail|phone|call|number|enquir\w*|inquir\w*|speak|talk|meet\w*|linkedin)\b/],
    answer: `You can reach Graham on ${site.contact.phone} or at ${site.contact.email}, or send an enquiry through the contact form at /contact. You can also follow ${site.company} on LinkedIn at ${site.links.linkedin}, and for MIRA Living sales enquiries visit ${site.links.miraLiving}.`,
  },
  {
    id: "greeting",
    question: "Hello",
    patterns: [/^(hi|hello|hey|hiya|good (morning|afternoon|evening)|g'day|gday)\b/],
    answer: "Hello. Ask me about Graham, Furtado Property, MIRA Living in Bargara or the West End proposal in Brisbane, or pick one of the questions below.",
  },
  {
    id: "thanks",
    question: "Thank you",
    patterns: [/\b(thanks?|thank you|cheers|ta)\b/],
    answer: "You're welcome. If there is anything else about Graham or his developments, just ask, or reach him through /contact.",
  },
];

export const SUGGESTED_QUESTIONS: readonly string[] = FAQ.filter((f) => f.suggest).map((f) => f.question);

export const NO_MATCH_ANSWER =
  "Sorry, I can only answer a fixed set of questions about Graham, Furtado Property, MIRA Living and the West End proposal. Try one of the questions below, or use the contact form at /contact for anything else.";

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Find the fixed answer for a message, or null when nothing matches. */
export function findAnswer(message: string): FaqEntry | null {
  const text = normalise(message);
  if (!text) return null;
  // An exact suggestion click always wins.
  const exact = FAQ.find((f) => normalise(f.question) === text);
  if (exact) return exact;
  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const entry of FAQ) {
    const score = entry.patterns.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best;
}
