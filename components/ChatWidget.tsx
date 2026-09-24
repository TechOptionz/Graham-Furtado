"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/siteContent";
import { ASSISTANT_NAME, WELCOME_MESSAGE } from "@/data/chatKnowledge";
import { findAnswer, NO_MATCH_ANSWER, SUGGESTED_QUESTIONS } from "@/data/chatFaq";

/**
 * Floating chat assistant (bottom-right). Answers a fixed set of questions locally (data/chatFaq.ts).
 * Anything unmatched is sent to /api/chat (Claude) when that is configured; otherwise a fixed fallback is shown.
 * Styled with the site palette: cream #f6f2ea, surface #eee9df, ink #1c231f, sage #6f7e6b / #b9c0aa.
 */

/** Small pause before a fixed answer appears, so it reads as a reply rather than a flash. */
const FIXED_REPLY_DELAY_MS = 450;

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "gf-chat";
const ez = "cubic-bezier(.25,1,.5,1)";

const INTERNAL_PATHS = ["/developments/mira-living", "/developments/west-end", "/developments", "/expertise", "/approach", "/contact", "/about"];

/** Turn known site paths and http(s) URLs inside a reply into links; everything else stays text. */
function linkify(text: string): ReactNode[] {
  const re = /(https?:\/\/[^\s)]+|\/developments\/mira-living|\/developments\/west-end|\/developments|\/expertise|\/approach|\/contact|\/about)(?=[\s.,;:!?)]|$)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const href = m[1];
    const external = href.startsWith("http");
    if (external || INTERNAL_PATHS.includes(href)) {
      out.push(
        <a key={m.index} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
          style={{ color: "#6f7e6b", textDecoration: "underline", textUnderlineOffset: "0.15em" }} className="hv-ink">
          {href}
        </a>,
      );
    } else {
      out.push(href);
    }
    last = m.index + href.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const bubbleBase: CSSProperties = {
  maxWidth: "88%",
  padding: "0.8em 1.05em",
  fontSize: "0.85rem",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
};
const assistantBubble: CSSProperties = { ...bubbleBase, alignSelf: "flex-start", background: "#eee9df", color: "#1c231f", borderRadius: "1.1rem 1.1rem 1.1rem 0.3rem" };
const userBubble: CSSProperties = { ...bubbleBase, alignSelf: "flex-end", background: "#1c231f", color: "#f6f2ea", borderRadius: "1.1rem 1.1rem 0.3rem 1.1rem" };
const roundButton: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", width: "2.2rem", height: "2.2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,.7)", background: "rgba(255,255,255,.35)", color: "#1c231f", cursor: "pointer", transition: "background-color .3s, color .3s" };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore the conversation for this tab (per-viewer convenience only).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Msg[];
        if (Array.isArray(saved)) setMessages(saved.filter((m) => m && typeof m.content === "string" && m.content));
      }
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated || busy) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, busy, hydrated]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      const history = messages;
      const userMsg: Msg = { role: "user", content };
      setMessages([...history, userMsg, { role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);
      const ac = new AbortController();
      abortRef.current = ac;

      const appendToLast = (chunk: string) =>
        setMessages((prev) => {
          const next = prev.slice();
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });

      try {
        // Fixed questions are answered locally, with no network call.
        const fixed = findAnswer(content);
        if (fixed) {
          await new Promise<void>((resolve, reject) => {
            const t = setTimeout(resolve, FIXED_REPLY_DELAY_MS);
            ac.signal.addEventListener("abort", () => {
              clearTimeout(t);
              reject(new DOMException("Aborted", "AbortError"));
            });
          });
          appendToLast(fixed.answer);
          return;
        }

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...history, userMsg] }),
          signal: ac.signal,
        });
        if (!res.ok || !res.body) {
          // No API (503) or an error: fall back to the fixed-question prompt.
          appendToLast(NO_MATCH_ANSWER);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          appendToLast(decoder.decode(value, { stream: true }));
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          appendToLast("Sorry, the connection dropped. Please try again, or use the contact form at /contact.");
        }
      } finally {
        if (abortRef.current === ac) abortRef.current = null;
        setBusy(false);
      }
    },
    [busy, messages],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send(input);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
  };

  // Offer the fixed questions that have not been asked yet, after every reply.
  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content.trim().toLowerCase()));
  const suggestions = SUGGESTED_QUESTIONS.filter((q) => !asked.has(q.toLowerCase()));
  const showSuggestions = !busy && suggestions.length > 0;
  const lastMsg = messages[messages.length - 1];
  const thinking = busy && lastMsg?.role === "assistant" && lastMsg.content === "";
  const canSend = !busy && input.trim().length > 0;

  return (
    <div data-chat="" style={{ position: "relative", zIndex: "55", height: "0" }}>
      {/* Launcher */}
      <button type="button" onClick={() => setOpen(true)} aria-label="Open the assistant" aria-expanded={open ? "true" : "false"} aria-controls="gf-chat-panel"
        style={{ position: "fixed", right: "clamp(1rem,3vw,2.5rem)", bottom: "clamp(1rem,3vw,2.5rem)", zIndex: "55", display: "inline-flex", alignItems: "center", gap: "0.7em", border: "0", borderRadius: "999px", padding: "0.95em 1.7em", backgroundImage: "linear-gradient(15deg,#6f7e6b,#b9c0aa)", backgroundColor: "#1c231f", color: "#f6f2ea", font: "inherit", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 1rem 2.5rem -1rem rgba(28,35,31,.45)", opacity: open ? 0 : 1, transform: open ? "translateY(0.5rem)" : "translateY(0)", pointerEvents: open ? "none" : "auto", transition: `opacity .4s ${ez}, transform .4s ${ez}, background-image .3s` }}
        className="hv-noimg">
        <span aria-hidden="true" style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#f6f2ea", boxShadow: "0 0 0 0.2rem rgba(246,242,234,.25)" }}></span>
        Ask a question
      </button>

      {/* Panel */}
      <section id="gf-chat-panel" role="dialog" aria-label={`${ASSISTANT_NAME} — ${site.name}`} aria-hidden={open ? "false" : "true"}
        style={{ position: "fixed", right: "clamp(1rem,3vw,2.5rem)", bottom: "clamp(1rem,3vw,2.5rem)", zIndex: "55", width: "min(26rem, calc(100vw - 2rem))", height: "min(36rem, calc(100dvh - 2rem))", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,rgba(246,242,234,.96),rgba(246,242,234,.9))", WebkitBackdropFilter: "blur(14px) saturate(1.4)", backdropFilter: "blur(14px) saturate(1.4)", border: "1px solid rgba(255,255,255,.6)", borderRadius: "1.33rem", boxShadow: "inset 0 1px 0 rgba(255,255,255,.7), 0 1.5rem 4rem -1.5rem rgba(28,35,31,.35)", overflow: "hidden", opacity: open ? 1 : 0, transform: open ? "translateY(0) scale(1)" : "translateY(1rem) scale(.98)", visibility: open ? "visible" : "hidden", pointerEvents: open ? "auto" : "none", transition: open ? `opacity .5s ${ez}, transform .5s ${ez}, visibility 0s` : `opacity .35s ${ez}, transform .35s ${ez}, visibility 0s linear .35s` }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1.1rem 1.1rem 0.9rem 1.33rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", lineHeight: "1" }}>
            <span style={{ fontFamily: "var(--font-inria),serif", fontStyle: "italic", fontWeight: "400", fontSize: "1.5rem", textTransform: "uppercase", color: "#1c231f" }}>{ASSISTANT_NAME}</span>
            <span style={{ fontSize: "0.6rem", fontWeight: "600", letterSpacing: "0.24em", textTransform: "uppercase", color: "#6f7e6b", whiteSpace: "nowrap" }}>{site.name}<span className="gf-chat-role"> · {site.role}</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {messages.length > 0 && (
              <button type="button" onClick={reset} aria-label="Start a new conversation" title="New conversation" style={roundButton} className="hv-fill-ink">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "42%", height: "42%" }}><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6" /></svg>
              </button>
            )}
            <button type="button" onClick={() => setOpen(false)} aria-label="Close the assistant" style={roundButton} className="hv-fill-ink">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ width: "40%", height: "40%" }}><path d="M1 1l10 10M11 1L1 11"></path></svg>
            </button>
          </div>
        </div>
        <div style={{ margin: "0 1.1rem 0 1.33rem", height: "0.13rem", background: "#6f7e6b40" }}></div>

        {/* Messages */}
        <div ref={listRef} data-lenis-prevent="" style={{ flex: "1", minHeight: "0", overflowY: "auto", overscrollBehavior: "contain", display: "flex", flexDirection: "column", gap: "0.6rem", padding: "1rem 1.1rem 1rem 1.33rem" }}>
          <div style={assistantBubble}>{WELCOME_MESSAGE}</div>
          {messages.map((m, i) => (
            <div key={i} style={m.role === "user" ? userBubble : assistantBubble}>
              {m.role === "assistant" && thinking && i === messages.length - 1 ? (
                <span aria-label="Thinking" style={{ display: "inline-flex", gap: "0.3rem", alignItems: "center", height: "1.2em" }}>
                  <span className="gf-chat-dot" style={{ animationDelay: "0s" }}></span>
                  <span className="gf-chat-dot" style={{ animationDelay: ".2s" }}></span>
                  <span className="gf-chat-dot" style={{ animationDelay: ".4s" }}></span>
                </span>
              ) : m.role === "assistant" ? (
                linkify(m.content)
              ) : (
                m.content
              )}
            </div>
          ))}
          {showSuggestions && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingTop: "0.2rem" }}>
              {suggestions.map((q) => (
                <button key={q} type="button" onClick={() => void send(q)}
                  style={{ border: "0.13rem solid #6f7e6b40", borderRadius: "999px", padding: "0.55em 1em", background: "transparent", color: "#5f665f", font: "inherit", fontSize: "0.72rem", fontWeight: "600", cursor: "pointer", textAlign: "left", transition: "background-color .3s, color .3s, border-color .3s" }} className="hv-fill-ink">
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.6rem 1.1rem 0.5rem 1.33rem" }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} aria-label="Your question" placeholder="Ask about Graham or a development"
            style={{ flex: "1", minWidth: "0", padding: "0.85em 1.2em", borderRadius: "999px", border: "0.13rem solid #6f7e6b40", background: "#f6f2ea", color: "#1c231f", font: "inherit", fontSize: "0.85rem", outline: "none", transition: "border-color .3s" }} className="fc-border" />
          <button type="submit" disabled={!canSend} aria-label="Send"
            style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "2.6rem", height: "2.6rem", border: "0", borderRadius: "999px", backgroundImage: "linear-gradient(15deg,#6f7e6b,#b9c0aa)", backgroundColor: "#1c231f", color: "#f6f2ea", cursor: canSend ? "pointer" : "default", opacity: canSend ? 1 : 0.5, transition: "opacity .3s, background-image .3s" }} className="hv-noimg">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40%", height: "40%" }}><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
          </button>
        </form>
        <p style={{ margin: "0", padding: "0 1.33rem 0.9rem", fontSize: "0.6rem", lineHeight: "1.4", color: "#5f665f" }}>
          Answers are generated automatically and may contain errors. For enquiries, <a href="/contact" style={{ color: "#6f7e6b", textDecoration: "underline", textUnderlineOffset: "0.15em" }} className="hv-ink">contact Graham</a>.
        </p>
      </section>
    </div>
  );
}
