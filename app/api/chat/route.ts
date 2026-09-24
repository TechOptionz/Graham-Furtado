import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/data/chatKnowledge";

export const runtime = "nodejs";

const MODEL = "claude-opus-5";
const MAX_MESSAGES = 30; // turns kept in the conversation sent to the model
const MAX_CHARS = 2000; // per user message

const client = new Anthropic();

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: Anthropic.Beta.BetaMessageParam[] = [];
  for (const m of raw as IncomingMessage[]) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null;
    const content = m.content.trim();
    if (!content) continue;
    if (m.role === "user" && content.length > MAX_CHARS) return null;
    out.push({ role: m.role, content });
  }
  if (out.length === 0 || out[out.length - 1].role !== "user") return null;
  return out.slice(-MAX_MESSAGES);
}

const FALLBACK_TEXT =
  "Sorry, I can't help with that one. I can answer questions about Graham, Furtado Property and the developments, or you can use the contact form at /contact.";
const ERROR_TEXT =
  "Sorry, something went wrong on my side. Please try again in a moment, or use the contact form at /contact.";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Chat is not configured: ANTHROPIC_API_KEY is missing." }, { status: 503 });
  }

  let messages: Anthropic.Beta.BetaMessageParam[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return Response.json({ error: "Invalid request." }, { status: 400 });

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 1024, // replies are deliberately short (see SYSTEM_PROMPT)
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    output_config: { effort: "low" },
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wroteText = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            wroteText = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !wroteText) controller.enqueue(encoder.encode(FALLBACK_TEXT));
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) console.error("[chat] rate limited");
        else if (err instanceof Anthropic.AuthenticationError) console.error("[chat] invalid API key");
        else if (err instanceof Anthropic.APIError) console.error(`[chat] API error ${err.status}: ${err.message}`);
        else console.error("[chat]", err);
        controller.enqueue(encoder.encode((wroteText ? "\n\n" : "") + ERROR_TEXT));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
