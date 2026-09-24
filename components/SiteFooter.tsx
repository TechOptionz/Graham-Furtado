/** Enquiries block + footer, ported from SiteFooter.dc.html. Prop: showContact (default true). */
export default function SiteFooter({ showContact = true }: { showContact?: boolean }) {
  return (
<div data-footer="" style={{position:"relative",zIndex:"2",background:"#f6f2ea"}}>
  {showContact && (
    <section aria-labelledby="cta-h" style={{position:"relative",background:"#eee9df",padding:"min(4.5rem,14vw) clamp(1rem,5vw,12rem) min(4.8rem,15vw)",borderRadius:"0 0 min(4.33rem,12vw) min(4.33rem,12vw)"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"min(2.6rem,8vw)"}}>
        <span data-r="fade" style={{fontSize:"0.8rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.04em"}}>Enquiries</span>
        <h2 id="cta-h" data-r="lines" style={{margin:"0",fontWeight:"300",textTransform:"uppercase",fontSize:"min(7.06rem,12.5vw)",lineHeight:"1.02",letterSpacing:"-0.02em",color:"#1c231f"}}>
          <span style={{display:"block",overflow:"hidden",paddingBottom:"0.04em"}}><span data-line="" style={{display:"block"}}>Let’s discuss</span></span>
          <span style={{display:"block",overflow:"hidden",paddingBottom:"0.08em"}}><span data-line="" style={{display:"block"}}>the next <em style={{fontFamily:"var(--font-inria),serif",fontStyle:"italic",fontWeight:"300",fontSize:"1.06em",backgroundImage:"linear-gradient(15deg,#6f7e6b,#b9c0aa)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",paddingRight:"0.08em"}}>opportunity.</em></span></span>
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,24rem),1fr))",gap:"3rem 3.33rem",alignItems:"end",borderTop:"0.13rem solid #6f7e6b40",paddingTop:"2rem"}}>
          <div data-r="fade" style={{display:"flex",flexDirection:"column",gap:"1.66rem",maxWidth:"30rem"}}>
            <p style={{margin:"0",fontSize:"1.13rem",lineHeight:"1.45",color:"#5f665f",textWrap:"pretty"}}>For development, site and residential property enquiries, get in touch with Graham directly.</p>
            <a href="/contact" style={{alignSelf:"flex-start",display:"inline-flex",alignItems:"center",gap:"0.9rem",fontSize:"0.8rem",fontWeight:"700",textTransform:"uppercase",color:"#1c231f",paddingBottom:"0.5rem",background:"linear-gradient(#1c231f,#1c231f) 0 100%/100% 0.13rem no-repeat",transition:"gap .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-arrow">Start a conversation <svg viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{width:"1rem",height:"0.66rem"}}><path d="M1 5h14M10.5 1L15 5l-4.5 4"></path></svg></a>
          </div>
          <div data-r="group" style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"grid",gridTemplateColumns:"7rem 1fr",gap:"1rem",padding:"0.9rem 0",borderBottom:"0.13rem solid #6f7e6b40"}}><span style={{fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",paddingTop:"0.2rem"}}>E-mail</span><span style={{fontWeight:"600",color:"#5f665f"}}>[ Email address — to be confirmed ]</span></div>
            <div style={{display:"grid",gridTemplateColumns:"7rem 1fr",gap:"1rem",padding:"0.9rem 0",borderBottom:"0.13rem solid #6f7e6b40"}}><span style={{fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",paddingTop:"0.2rem"}}>Phone</span><span style={{fontWeight:"600",color:"#5f665f"}}>[ Phone number — to be confirmed ]</span></div>
            <div style={{display:"grid",gridTemplateColumns:"7rem 1fr",gap:"1rem",padding:"0.9rem 0",borderBottom:"0.13rem solid #6f7e6b40"}}><span style={{fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",paddingTop:"0.2rem"}}>Based in</span><span style={{fontWeight:"600",color:"#1c231f"}}>Brisbane, Queensland</span></div>
          </div>
        </div>
      </div>
    </section>
  )}

  <footer style={{padding:"min(4rem,12vw) clamp(1rem,5vw,12rem) 1.66rem",display:"flex",flexDirection:"column",gap:"min(4.5rem,12vw)",borderTop:"0.13rem solid #6f7e6b40"}}>
    <div data-r="group" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,16rem),1fr))",gap:"3rem 3.33rem",alignItems:"start"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"1.4rem",gridColumn:"span 1",maxWidth:"24rem"}}>
        <p style={{margin:"0",fontSize:"1.15rem",lineHeight:"1.45",color:"#1c231f",fontWeight:"500",textWrap:"pretty"}}>Property developer and real estate professional. Residential development, advisory and delivery across Queensland.</p>
        <span style={{fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.08em",color:"#6f7e6b"}}>Property Development · Real Estate · Development Advisory</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,9rem),1fr))",gap:"2.5rem 2rem",gridColumn:"span 2"}}>
        <nav aria-label="Footer" style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
          <span style={{fontSize:"0.7rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.08em",marginBottom:"0.6rem"}}>Navigation</span>
          <a href="/about" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">About</a>
          <a href="/developments" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Developments</a>
          <a href="/expertise" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Expertise</a>
          <a href="/approach" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Approach</a>
          <a href="/contact" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Contact</a>
        </nav>
        <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
          <span style={{fontSize:"0.7rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.08em",marginBottom:"0.6rem"}}>Developments</span>
          <a href="/developments/mira-living" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">MIRA Living<br /><span style={{fontSize:"0.8rem",color:"#5f665f",fontWeight:"400"}}>Bargara, QLD</span></a>
          <a href="/developments/west-end" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">West End<br /><span style={{fontSize:"0.8rem",color:"#5f665f",fontWeight:"400"}}>Brisbane, QLD</span></a>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
          <span style={{fontSize:"0.7rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.08em",marginBottom:"0.6rem"}}>Elsewhere</span>
          <a href="https://www.furtadoproperty.com.au/" target="_blank" rel="noopener" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Furtado Property ↗</a>
          <a href="https://miraliving.com.au/" target="_blank" rel="noopener" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">MIRA Living ↗</a>
          <a href="https://au.linkedin.com/company/furtado-property" target="_blank" rel="noopener" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">LinkedIn ↗</a>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.55rem"}}>
          <span style={{fontSize:"0.7rem",fontWeight:"700",textTransform:"uppercase",color:"#6f7e6b",letterSpacing:"0.08em",marginBottom:"0.6rem"}}>Contact</span>
          <span style={{fontSize:"0.95rem",color:"#1c231f",fontWeight:"500"}}>Brisbane, Queensland</span>
          <a href="/contact" style={{alignSelf:"flex-start",color:"#1c231f",fontWeight:"500",fontSize:"0.95rem",lineHeight:"1.3",background:"linear-gradient(currentColor,currentColor) 0 100%/0% 1px no-repeat",transition:"background-size .6s cubic-bezier(.25,1,.5,1),color .3s"}} className="hv-ul">Enquiries →</a>
        </div>
      </div>
    </div>

    <div data-footer-mark="" aria-label="Graham Furtado" style={{overflow:"hidden",lineHeight:"0.92",color:"#6f7e6b",textAlign:"center",paddingTop:"min(2rem,6vw)",borderTop:"0.13rem solid #6f7e6b40"}}>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",columnGap:"0.22em",fontWeight:"300",textTransform:"uppercase",fontSize:"clamp(3rem,calc((100vw - 2 * clamp(1rem,5vw,12rem)) / 9.2),13rem)",letterSpacing:"-0.035em"}}>
        <span data-mark-word="" style={{display:"inline-flex",overflow:"hidden",paddingBottom:"0.08em"}}><span data-mark-l="" style={{display:"inline-block"}}>G</span><span data-mark-l="" style={{display:"inline-block"}}>R</span><span data-mark-l="" style={{display:"inline-block"}}>A</span><span data-mark-l="" style={{display:"inline-block"}}>H</span><span data-mark-l="" style={{display:"inline-block"}}>A</span><span data-mark-l="" style={{display:"inline-block"}}>M</span></span>
        <span data-mark-word="" style={{display:"inline-flex",overflow:"hidden",paddingBottom:"0.08em"}}><span data-mark-l="" style={{display:"inline-block"}}>F</span><span data-mark-l="" style={{display:"inline-block"}}>U</span><span data-mark-l="" style={{display:"inline-block"}}>R</span><span data-mark-l="" style={{display:"inline-block"}}>T</span><span data-mark-l="" style={{display:"inline-block"}}>A</span><span data-mark-l="" style={{display:"inline-block"}}>D</span><span data-mark-l="" style={{display:"inline-block"}}>O</span></span>
      </div>
    </div>

    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"1rem",paddingTop:"1.4rem",borderTop:"0.13rem solid #6f7e6b40",fontSize:"0.78rem",color:"#5f665f"}}>
      <span>© 2026 Graham Furtado. All rights reserved.</span>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"0.66rem 1.6rem"}}>
        <span>Queensland, Australia</span>
        <a href="#top" style={{display:"inline-flex",alignItems:"center",gap:"0.6rem",fontSize:"0.72rem",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.06em",color:"#1c231f",transition:"color .3s,gap .6s cubic-bezier(.25,1,.5,1)"}} className="hv-top">Back to top <svg viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{width:"0.55rem",height:"0.9rem",transform:"rotate(180deg)"}}><path d="M5 1v14M1 10.5L5 15l4-4.5"></path></svg></a>
      </div>
    </div>
  </footer>
</div>
  );
}
