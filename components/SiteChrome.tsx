"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { GF } from "@/lib/gf";
import { activeFor } from "@/data/siteContent";

/**
 * Fixed header (transparent over the hero → liquid glass once scrolled, via data-solid),
 * slide-in menu panel and the entry veil / preloader. Ported from SiteChrome.dc.html;
 * the state logic mirrors its renderVals().
 */
export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Closing behind the route veil: skip the close transitions so nothing lingers on the next page.
  const [instant, setInstant] = useState(false);
  const openRef = useRef(false);

  const set = useCallback((next: boolean, inst = false) => {
    if (next === openRef.current) return;
    openRef.current = next;
    setInstant(inst);
    setOpen(next);
    const l = GF.lenis;
    if (l) {
      if (next) l.stop();
      else l.start();
    }
    document.body.style.overflow = next ? "hidden" : "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) set(false);
    };
    window.addEventListener("keydown", onKey);
    GF.closeMenu = (inst?: boolean) => set(false, Boolean(inst));
    const safety = setTimeout(() => {
      if (!GF._lifted) {
        const v = document.querySelector<HTMLElement>("[data-veil]");
        if (v) v.style.display = "none";
      }
    }, 6000);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(safety);
      delete GF.closeMenu;
    };
  }, [set]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  // renderVals()
  const o = open;
  const a = activeFor(pathname);
  const ez = "cubic-bezier(.25,1,.5,1)";
  const tl = (i: number) =>
    instant
      ? "none"
      : o
        ? `transform .7s ${ez} ${0.3 + i * 0.08}s, opacity .7s ${ez} ${0.3 + i * 0.08}s, color .3s`
        : "transform 0s linear .5s, opacity 0s linear .5s, color .3s";
  const toggle = () => set(!openRef.current);
  const close = () => set(false);
  const expanded = o ? "true" : "false";
  const pe: CSSProperties["pointerEvents"] = o ? "auto" : "none";
  const scrimO = o ? 1 : 0;
  const clip = o ? "inset(0 0 0 0)" : "inset(0 0 0 100%)";
  const ly = o ? "translateY(0)" : "translateY(100%)";
  const lo = o ? 1 : 0;
  const ruleS = o ? "scaleX(1)" : "scaleX(0)";
  const tRule = instant ? "none" : o ? `transform .8s ${ez} .1s` : "transform 0s linear .5s";
  const tLogo = instant ? "none" : o ? `opacity .6s ${ez} .2s` : "opacity 0s linear .5s";
  const tFoot = instant ? "none" : o ? `opacity .8s ${ez} .9s` : "opacity 0s linear .5s";
  const t0 = tl(0), t1 = tl(1), t2 = tl(2), t3 = tl(3), t4 = tl(4), t5 = tl(5);
  const isHome = a === "home", isAbout = a === "about", isDev = a === "developments";
  const isExp = a === "expertise", isApp = a === "approach", isCon = a === "contact";

  return (
<div data-chrome="" style={{position:"relative",zIndex:"60",height:"0"}}>
  <header data-hero-header="" data-solid="0" style={{position:"fixed",top:"0",left:"0",right:"0",zIndex:"60",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",padding:"1.66rem clamp(1rem,5vw,12rem)",color:"#f6f2ea",transition:"background-color .5s,padding .5s,color .5s,box-shadow .5s"}}>
    <a href="/" aria-label="Graham Furtado — Home" className="gf-hdr-logo" style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",lineHeight:"1",color:"#f6f2ea"}}>
      <span style={{fontSize:"min(1.3rem,5vw)",fontWeight:"400",letterSpacing:"0.16em",textTransform:"uppercase",whiteSpace:"nowrap",paddingLeft:"0.16em"}}>Graham Furtado</span>
      <span style={{fontSize:"min(0.72rem,2.8vw)",fontWeight:"600",letterSpacing:"0.32em",textTransform:"uppercase",lineHeight:"1",opacity:"0.85",whiteSpace:"nowrap",textAlign:"center",paddingLeft:"0.32em"}}>Property Developer</span>
    </a>
    <div className="gf-hdr-actions" style={{display:"flex",alignItems:"center",gap:"min(2.33rem,5vw)"}}>
      <a href="/contact" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",border:"0.13rem solid #f6f2ea",borderRadius:"999px",padding:"0.75em 2.2em",fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",lineHeight:"1.4",color:"#f6f2ea",transition:"background-color .3s cubic-bezier(.25,.46,.45,.94),color .3s cubic-bezier(.25,.46,.45,.94)"}} className="hv-fill-light gf-btn gf-btn-hdr"><span className="gf-btn-hdr-label">Contact</span><svg className="gf-btn-hdr-icon" aria-hidden="true" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="1.5" width="17" height="13" rx="2.5"></rect><path d="M2.5 3.5l7.5 5.5 7.5-5.5"></path></svg></a>
      <button type="button" onClick={toggle} aria-label="Open menu" aria-expanded={expanded} style={{display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",gap:"0.4rem",width:"2.66rem",height:"2.66rem",background:"none",border:"0",padding:"0.5rem 0.2rem",cursor:"pointer",transition:"gap .3s cubic-bezier(.25,1,.5,1)"}} className="hv-burger gf-btn gf-btn-icon">
        <span style={{display:"block",width:"100%",height:"0.13rem",background:"#f6f2ea",borderRadius:"2px"}}></span>
        <span style={{display:"block",width:"70%",height:"0.13rem",background:"#f6f2ea",borderRadius:"2px"}}></span>
        <span style={{display:"block",width:"100%",height:"0.13rem",background:"#f6f2ea",borderRadius:"2px"}}></span>
      </button>
    </div>
  </header>

  <div style={{position:"fixed",inset:"0",zIndex:"5",pointerEvents:pe,height:"100dvh"}}>
    <div onClick={close} style={{position:"absolute",inset:"0",cursor:"pointer",backgroundImage:"linear-gradient(15deg,#1c231f33,#6f7e6b22)",WebkitBackdropFilter:"blur(3px)",backdropFilter:"blur(3px)",opacity:scrimO,transition:"opacity .6s cubic-bezier(.25,1,.5,1)"}}></div>
    <nav aria-label="Main navigation" data-menu-panel="" style={{position:"absolute",top:"0",right:"0",bottom:"0",width:"min(100%,max(36rem,42vw))",display:"flex",flexDirection:"column",background:"linear-gradient(180deg,rgba(246,242,234,.94),rgba(246,242,234,.88))",WebkitBackdropFilter:"blur(14px) saturate(1.4)",backdropFilter:"blur(14px) saturate(1.4)",borderLeft:"1px solid rgba(255,255,255,.6)",boxShadow:"inset 1px 0 0 rgba(255,255,255,.7),-1.5rem 0 4rem -1.5rem rgba(28,35,31,.3)",clipPath:clip,transition:"clip-path .7s cubic-bezier(.25,1,.5,1)",overflowY:"auto",overscrollBehavior:"contain"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.66rem clamp(1rem,5vw,4rem) 1.66rem clamp(1rem,5vw,3rem)"}}>
        <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",lineHeight:"1",color:"#6f7e6b",opacity:lo,transition:tLogo}}>
          <span style={{fontSize:"min(1.3rem,5vw)",fontWeight:"400",letterSpacing:"0.16em",textTransform:"uppercase",whiteSpace:"nowrap",paddingLeft:"0.16em"}}>Graham Furtado</span>
          <span style={{fontSize:"min(0.72rem,2.8vw)",fontWeight:"600",letterSpacing:"0.32em",textTransform:"uppercase",lineHeight:"1",color:"#b9c0aa",whiteSpace:"nowrap",textAlign:"center",paddingLeft:"0.32em"}}>Property Developer</span>
        </div>
        <button type="button" onClick={close} aria-label="Close menu" style={{display:"flex",alignItems:"center",justifyContent:"center",width:"2.66rem",height:"2.66rem",borderRadius:"999px",border:"1px solid rgba(255,255,255,.7)",background:"rgba(255,255,255,.35)",color:"#1c231f",cursor:"pointer",transition:"background-color .3s"}} className="hv-fill-ink gf-btn gf-btn-icon">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{width:"40%",height:"40%"}}><path d="M1 1l10 10M11 1L1 11"></path></svg>
        </button>
      </div>
      <div style={{margin:"0 clamp(1rem,5vw,4rem) 0 clamp(1rem,5vw,3rem)",height:"0.13rem",background:"#6f7e6b40",transformOrigin:"0 50%",transform:ruleS,transition:tRule}}></div>
      <div style={{flex:"1",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"3rem",padding:"2.73rem clamp(1rem,5vw,4rem) 1.66rem clamp(1rem,5vw,3rem)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"0.3rem"}}>
          <div style={{overflow:"hidden"}}><a href="/" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t0}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>01</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>Home</span>{isHome && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
          <div style={{overflow:"hidden"}}><a href="/about" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t1}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>02</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>About</span>{isAbout && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
          <div style={{overflow:"hidden"}}><a href="/developments" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t2}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>03</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>Developments</span>{isDev && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
          <div style={{overflow:"hidden"}}><a href="/expertise" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t3}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>04</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>Expertise</span>{isExp && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
          <div style={{overflow:"hidden"}}><a href="/approach" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t4}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>05</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>Approach</span>{isApp && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
          <div style={{overflow:"hidden"}}><a href="/contact" style={{display:"flex",alignItems:"baseline",gap:"1.2rem",color:"#1c231f",transform:ly,opacity:lo,transition:t5}} className="hv-sage"><span style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.06em",color:"#5f665f",minWidth:"1.4rem"}}>06</span><span style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"400",fontSize:"min(3.3rem,11vw)",lineHeight:"1.12",textTransform:"uppercase"}}>Contact</span>{isCon && (<span style={{width:"0.5rem",height:"0.5rem",borderRadius:"50%",background:"#6f7e6b",alignSelf:"center"}}></span>)}</a></div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"1.5rem",opacity:lo,transition:tFoot}}>
          <div style={{display:"flex",flexDirection:"column",gap:"0.4rem"}}>
            <span style={{fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.04em"}}>Based in</span>
            <span style={{color:"#1c231f",fontWeight:"600"}}>Brisbane, Queensland</span>
          </div>
          <div style={{display:"flex",gap:"1.33rem",fontWeight:"600",color:"#1c231f"}}>
            <a href="https://www.furtadoproperty.com.au/" target="_blank" rel="noopener" style={{background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Furtado Property</a>
            <a href="https://au.linkedin.com/company/furtado-property" target="_blank" rel="noopener" style={{background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">LinkedIn</a>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div data-veil="" aria-hidden="true" style={{position:"fixed",inset:"0",zIndex:"10",display:"flex",alignItems:"center",justifyContent:"center",background:"#1c231f",height:"100dvh",overflow:"hidden"}}>
    <div data-pre-glow="" style={{position:"absolute",right:"-20vw",bottom:"-30vh",width:"70vw",height:"70vw",borderRadius:"50%",background:"radial-gradient(closest-side,#6f7e6b55,#6f7e6b00)",opacity:"0"}}></div>
    <div data-pre="" style={{position:"relative",opacity:"0",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"1.4rem",padding:"0 clamp(1rem,5vw,12rem)"}}>
      <span data-pre-sub="" style={{fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.26em",textTransform:"uppercase",color:"#b9c0aa",paddingLeft:"0.1em"}}>Property Developer · Queensland</span>
      <div data-pre-mark="" aria-hidden="true" style={{color:"#f6f2ea",fontWeight:"300",textTransform:"uppercase",fontSize:"min(9.4rem,18vw,22vh)",lineHeight:"0.9",letterSpacing:"-0.035em",willChange:"transform"}}>
        <span style={{display:"block",overflow:"hidden"}}><span data-pre-line="" style={{display:"block"}}>Graham</span></span>
        <span style={{display:"block",overflow:"hidden",paddingBottom:"0.08em"}}><span data-pre-line="" style={{display:"block",fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"300",fontSize:"1.06em",letterSpacing:"-0.01em",paddingRight:"0.06em"}}>Furtado</span></span>
      </div>
      <div data-pre-rule="" style={{width:"100%",height:"1px",background:"#f6f2ea33",transform:"scaleX(0)",transformOrigin:"0 50%"}}></div>
      <div data-pre-sub="" style={{display:"flex",justifyContent:"space-between",width:"100%",fontSize:"0.72rem",fontWeight:"700",letterSpacing:"0.2em",textTransform:"uppercase",color:"#b9c0aa"}}><span>MIRA Living · Bargara</span><span>West End · Brisbane</span></div>
    </div>
  </div>
</div>
  );
}
