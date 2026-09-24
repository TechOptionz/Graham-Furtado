/* One-shot: SiteChrome / SiteFooter / Contact form markup -> JSX via the page converter. */
import fs from "node:fs";
import path from "node:path";
import { convertBody } from "./convert.mjs";

const DIST = path.resolve(process.cwd(), "../dist");
function body(name) {
  const html = fs.readFileSync(path.join(DIST, name), "utf8");
  const s = html.indexOf("</helmet>") >= 0 ? html.indexOf("</helmet>") + "</helmet>".length : html.indexOf("<x-dc>") + 6;
  const e = html.indexOf("</x-dc>");
  return html.slice(s, e).trim();
}
function post(jsx) {
  return jsx
    .replace(/"\{\{ (\w+) \}\}"/g, "$1") // style values -> renderVals
    .replace(/<sc-if value=\{(\w+)\} hint-placeholder-val=\{\w+\}>([\s\S]*?)<\/sc-if>/g, (_, v, inner) => `{${v} && (${inner})}`);
}
const st = { usesImage: false, usesMedia: false };
fs.mkdirSync("scratch", { recursive: true });
fs.writeFileSync("scratch/chrome.jsx", post(convertBody(body("SiteChrome.dc.html"), st)));
fs.writeFileSync("scratch/footer.jsx", post(convertBody(body("SiteFooter.dc.html"), st)));
// contact form block from the generated page
const page = fs.readFileSync("app/contact/page.tsx", "utf8");
const f0 = page.indexOf("<form"), f1 = page.indexOf("</form>") + "</form>".length;
fs.writeFileSync("scratch/form.jsx", post(page.slice(f0, f1)));
console.log("ok", st);
