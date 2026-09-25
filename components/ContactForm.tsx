"use client";

import { useState, type FormEvent } from "react";

/** The Contact page form (placeholder: not connected to an inbox), as in Contact.dc.html. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
<form onSubmit={submit} data-r="fade" style={{display:"flex",flexDirection:"column",gap:"1rem",padding:"min(2rem,6vw)",borderRadius:"1rem",background:"#eee9df"}}>
    <input name="name" required aria-label="Name" placeholder="Name" style={{width:"100%",padding:"1em 1.33em",borderRadius:"999px",border:"0.13rem solid #6f7e6b40",background:"#f6f2ea",color:"#1c231f",font:"inherit",outline:"none",transition:"border-color .3s"}} className="fc-border" />
    <input name="email" type="email" required aria-label="E-mail" placeholder="E-mail" style={{width:"100%",padding:"1em 1.33em",borderRadius:"999px",border:"0.13rem solid #6f7e6b40",background:"#f6f2ea",color:"#1c231f",font:"inherit",outline:"none",transition:"border-color .3s"}} className="fc-border" />
    <input name="subject" aria-label="Subject" placeholder="Subject — development, site or property" style={{width:"100%",padding:"1em 1.33em",borderRadius:"999px",border:"0.13rem solid #6f7e6b40",background:"#f6f2ea",color:"#1c231f",font:"inherit",outline:"none",transition:"border-color .3s"}} className="fc-border" />
    <textarea name="message" rows={6} aria-label="Message" placeholder="Your enquiry" style={{width:"100%",padding:"1em 1.33em",borderRadius:"1rem",border:"0.13rem solid #6f7e6b40",background:"#f6f2ea",color:"#1c231f",font:"inherit",outline:"none",transition:"border-color .3s",resize:"vertical",minHeight:"9rem"}} className="fc-border"></textarea>
    {sent && (<p role="status" style={{margin:"0",padding:"1rem 1.33rem",borderRadius:"1rem",background:"#f6f2ea",color:"#1c231f",fontWeight:"600"}}>Thank you. This form is a placeholder and is not yet connected to an inbox.</p>)}
    <button type="submit" style={{alignSelf:"flex-start",marginTop:"0.66rem",border:"0",borderRadius:"999px",padding:"1.36em 3.18em",backgroundImage:"linear-gradient(15deg,#6f7e6b,#b9c0aa)",backgroundColor:"#1c231f",color:"#f6f2ea",font:"inherit",fontSize:"0.8rem",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",transition:"background-image .3s"}} className="hv-noimg gf-btn gf-btn-cta">Send enquiry</button>
  </form>
  );
}
