/*
  One-shot converter: dist/*.dc.html page bodies -> app/**\/page.tsx (JSX, verbatim).
  Run from the site/ folder: `node scripts/convert.mjs`
  Contact's form was hand-edited afterwards (see components/ContactForm.tsx).
*/
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "../dist");
const APP = path.resolve(process.cwd(), "app");

const PAGES = [
  ["Home", "page.tsx", "home"],
  ["About", "about/page.tsx", "about"],
  ["Developments", "developments/page.tsx", "developments"],
  ["Expertise", "expertise/page.tsx", "expertise"],
  ["Approach", "approach/page.tsx", "approach"],
  ["Contact", "contact/page.tsx", "contact"],
  ["Mira-Living", "developments/mira-living/page.tsx", "miraLiving"],
  ["West-End", "developments/west-end/page.tsx", "westEnd"],
];

const ROUTES = {
  "Home.dc.html": "/",
  "About.dc.html": "/about",
  "Developments.dc.html": "/developments",
  "Expertise.dc.html": "/expertise",
  "Approach.dc.html": "/approach",
  "Contact.dc.html": "/contact",
  "Mira-Living.dc.html": "/developments/mira-living",
  "West-End.dc.html": "/developments/west-end",
};

// style-hover / style-focus strings -> CSS classes defined in app/globals.css
const HOVER = {
  "background-size:100% 1px;color:#6f7e6b": "hv-ul",
  "color:#1c231f": "hv-ink",
  "gap:1.6rem;color:#6f7e6b": "hv-arrow",
  "background-color:#f6f2ea;color:#1c231f;border-color:#f6f2ea": "hv-pill-light",
  "transform:translateY(-0.4rem)": "hv-lift",
  "gap:1.6rem;color:#1c231f": "hv-arrow-ink",
  "background-color:#1c231f;color:#f6f2ea": "hv-fill-ink",
  "gap:0.55rem": "hv-burger",
  "color:#6f7e6b;gap:1rem": "hv-top",
  "background-image:none": "hv-noimg",
  "background-color:#f6f2ea;color:#1c231f": "hv-fill-light",
};
const FOCUS = {
  "border-color:#6f7e6b": "fc-border",
  "transform:translateY(-0.4rem)": "fc-lift",
};

const ATTR_RENAME = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  tabindex: "tabIndex",
  class: "className",
  for: "htmlFor",
  autocomplete: "autoComplete",
};
const NUMERIC = new Set(["tabIndex", "rows"]);
const DROP = new Set(["data-cursor", "hint-size"]);
const VOID = new Set(["br", "img", "input", "hr"]);

function camel(p) {
  if (p.startsWith("--")) return JSON.stringify(p);
  if (p.startsWith("-webkit-")) {
    const rest = p.slice(8).replace(/-(\w)/g, (_, c) => c.toUpperCase());
    return "Webkit" + rest.charAt(0).toUpperCase() + rest.slice(1);
  }
  return p.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

export function styleObj(s) {
  const out = [];
  const idx = new Map();
  s.split(";").forEach((d) => {
    d = d.trim();
    if (!d) return;
    const i = d.indexOf(":");
    const p = d.slice(0, i).trim();
    let v = d.slice(i + 1).trim();
    v = v.replace(/'Inria Serif',serif/g, "var(--font-inria),serif");
    v = v.replace(/\bInter,Arial,sans-serif/g, "var(--font-inter),Arial,sans-serif");
    const k = camel(p);
    if (idx.has(k)) out[idx.get(k)][1] = v; // CSS cascade: last declaration wins
    else {
      idx.set(k, out.length);
      out.push([k, v]);
    }
  });
  return "{" + out.map(([k, v]) => `${k}:${JSON.stringify(v)}`).join(",") + "}";
}

export function parseAttrs(str) {
  const a = [];
  const re = /([^\s=]+)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(str))) a.push([m[1], m[2] === undefined ? null : m[2]]);
  return a;
}

function text(t) {
  if (!t) return "";
  return t.replace(/[{}>]/g, (c) => `{'${c}'}`);
}

function emitAttrs(tag, attrs) {
  const parts = [];
  const classes = [];
  for (let [k, v] of attrs) {
    if (DROP.has(k)) continue;
    if (k === "style") {
      parts.push(`style={${styleObj(v)}}`);
      continue;
    }
    if (k === "style-hover") {
      if (!(v in HOVER)) throw new Error("Unknown style-hover: " + v);
      classes.push(HOVER[v]);
      continue;
    }
    if (k === "style-focus") {
      if (!(v in FOCUS)) throw new Error("Unknown style-focus: " + v);
      classes.push(FOCUS[v]);
      continue;
    }
    if (k === "href" && v) {
      const m = /^([\w-]+\.dc\.html)(#.*)?$/.exec(v);
      if (m) v = ROUTES[m[1]] + (m[2] || "");
    }
    if (k === "src" && tag === "Image" && v && !v.startsWith("/") && !/^https?:/.test(v)) v = "/" + v;
    if (v !== null) {
      const h = /^\{\{\s*(\w+)\s*\}\}$/.exec(v);
      if (h) {
        parts.push(`${k}={${h[1]}}`);
        continue;
      }
    }
    if (k in ATTR_RENAME) k = ATTR_RENAME[k];
    if (v === null || (v === "" && !/^(data-|aria-)/.test(k) && k !== "alt")) {
      parts.push(k);
      continue;
    }
    if (NUMERIC.has(k)) {
      parts.push(`${k}={${Number(v)}}`);
      continue;
    }
    parts.push(`${k}="${v}"`);
  }
  if (classes.length) parts.push(`className="${classes.join(" ")}"`);
  return parts.length ? " " + parts.join(" ") : "";
}

export function convertBody(html, state) {
  let out = "";
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt < 0) {
      out += text(html.slice(i));
      break;
    }
    out += text(html.slice(i, lt));
    const gt = html.indexOf(">", lt);
    if (gt < 0) throw new Error("Unclosed tag");
    const raw = html.slice(lt + 1, gt);
    i = gt + 1;
    if (raw.endsWith("/") && /^[A-Z]/.test(raw)) {
      out += `<${raw}>`; // injected component, e.g. <SiteFooter showContact={false} />
      continue;
    }
    if (raw.startsWith("/")) {
      const t = raw.slice(1).trim();
      if (VOID.has(t)) continue;
      out += `</${t}>`;
      continue;
    }
    const m = /^([\w-]+)\s*([\s\S]*?)\s*\/?$/.exec(raw);
    if (!m) throw new Error("Bad tag: " + raw);
    let tag = m[1];
    const attrs = parseAttrs(m[2]);
    if (tag === "img") {
      tag = "Image";
      state.usesImage = true;
      out += `<Image${emitAttrs(tag, attrs)} fill sizes="(max-width: 767px) 100vw, 30vw" />`;
      continue;
    }
    if (tag === "MediaSlot") state.usesMedia = true;
    if (VOID.has(tag)) {
      out += `<${tag}${emitAttrs(tag, attrs)} />`;
      continue;
    }
    out += `<${tag}${emitAttrs(tag, attrs)}>`;
  }
  return out;
}

function prepare(html) {
  // Body = from <div id="top" to </x-dc>
  const start = html.indexOf('<div id="top"');
  const end = html.indexOf("</x-dc>");
  let body = html.slice(start, end).trimEnd();
  // Chrome lives in app/layout.tsx
  body = body.replace(/^\s*<dc-import name="SiteChrome"[^>]*><\/dc-import>\s*\n/m, "");
  // Footer partial -> component
  body = body.replace(/<dc-import name="SiteFooter"([^>]*)><\/dc-import>/, (_, a) =>
    /show-contact="\{\{\s*false\s*\}\}"/.test(a) ? "<SiteFooter showContact={false} />" : "<SiteFooter />"
  );
  // Media slots: <div data-media="key" ...><span data-ph-label ...>brief</span></div> -> <MediaSlot>
  body = body.replace(
    /<div ([^>]*data-media="([^"]+)"[^>]*)>(<span data-ph-label[^>]*>[^<]*<\/span>)?<\/div>/g,
    (_, attrStr, key, span) => {
      const a = Object.fromEntries(parseAttrs(attrStr));
      let s = `<MediaSlot k="${key}"`;
      if ("data-eager" in a) s += ' eager=""';
      s += ` style="${a.style}">`;
      return s + (span || "") + "</MediaSlot>";
    }
  );
  return body;
}

export function main() {
for (const [name, outRel, metaKey] of PAGES) {
  const src = fs.readFileSync(path.join(DIST, `${name}.dc.html`), "utf8");
  const body = prepare(src);
  const state = { usesImage: false, usesMedia: false };
  const jsx = convertBody(body, state);
  let extra = "";
  let jsxOut = jsx;
  if (name === "Contact") {
    const f0 = jsxOut.indexOf("<form"), f1 = jsxOut.indexOf("</form>") + "</form>".length;
    jsxOut = jsxOut.slice(0, f0) + "<ContactForm />" + jsxOut.slice(f1);
    extra = 'import ContactForm from "@/components/ContactForm";';
  }
  const imports = [];
  if (state.usesImage) imports.push('import Image from "next/image";');
  if (state.usesMedia) imports.push('import { MediaSlot } from "@/components/media/MediaSlot";');
  if (extra) imports.push(extra.trim());
  imports.push('import SiteFooter from "@/components/SiteFooter";');
  imports.push('import { pageMeta } from "@/data/siteContent";');
  const file = `${imports.join("\n")}

export const metadata = pageMeta.${metaKey};

export default function Page() {
  return (
${jsxOut}
  );
}
`;
  const outPath = path.join(APP, outRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, file);
  console.log("wrote", outRel, file.length, "bytes");
}
}

import { fileURLToPath } from "node:url";
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
