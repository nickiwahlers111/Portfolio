import { useState, type FormEvent } from "react";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const endpoint = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env.VITE_CONTACT_FORM_ENDPOINT?.trim() || "https://formsubmit.co/ajax/nicki.wahlers@gmail.com";
  const fieldClass = "w-full rounded-sm border border-border bg-background px-4 py-3 font-['Geist'] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") || "")) return;
    data.set("_subject", `Portfolio inquiry: ${String(data.get("subject") || "").trim()}`);
    data.set("_replyto", String(data.get("email") || "").trim());
    data.set("_template", "table");
    data.set("_url", window.location.href);
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Message delivery failed");
      const result = await response.json();
      if (result.success !== true && result.success !== "true") throw new Error("Message delivery failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-16">
      <div className="border-b border-border pb-12 mb-14">
        <p className="font-['Geist'] text-[0.65rem] tracking-[0.25em] uppercase text-primary mb-4">Contact</p>
        <h1 className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.1]" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>Let&apos;s connect.</h1>
        <p className="font-['Geist'] font-light text-base text-foreground mt-5 max-w-xl leading-[1.8]">Have an opportunity, a project in mind, or a question about my work? I&apos;d love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24">
        <section aria-labelledby="contact-details">
          <h2 id="contact-details" className="font-['Instrument_Serif'] font-normal text-2xl mb-8">Get in touch</h2>
          <dl className="space-y-8 font-['Geist'] text-sm">
            <div>
              <dt className="flex items-center gap-2 text-muted-foreground mb-2"><Mail size={16} aria-hidden="true" /> Email</dt>
              <dd><a className="inline-flex items-center gap-2 break-all underline underline-offset-4 decoration-border hover:text-primary focus-visible:outline-primary" href="mailto:nicki.wahlers@gmail.com">nicki.wahlers@gmail.com <ArrowUpRight size={14} aria-hidden="true" /></a></dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-muted-foreground mb-2"><Linkedin size={16} aria-hidden="true" /> LinkedIn</dt>
              <dd><a className="inline-flex items-center gap-2 underline underline-offset-4 decoration-border hover:text-primary focus-visible:outline-primary" href="https://www.linkedin.com/in/nicki-wahlers/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a></dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-muted-foreground mb-2"><MapPin size={16} aria-hidden="true" /> Based in</dt>
              <dd>Los Angeles, CA</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="contact-form-title" className="border-t border-border pt-8 lg:border-t-0 lg:pt-0">
          <h2 id="contact-form-title" className="font-['Instrument_Serif'] font-normal text-2xl mb-8">Send a message</h2>
          <form onSubmit={submit} className="space-y-6 font-['Geist']">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm mb-2">Name <span aria-hidden="true">*</span></label>
                <input className={fieldClass} id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm mb-2">Email <span aria-hidden="true">*</span></label>
                <input className={fieldClass} id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm mb-2">Subject <span aria-hidden="true">*</span></label>
              <input className={fieldClass} id="contact-subject" name="subject" required maxLength={200} placeholder="What would you like to discuss?" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm mb-2">Message <span aria-hidden="true">*</span></label>
              <textarea className={`${fieldClass} resize-y min-h-40`} id="contact-message" name="message" rows={6} required maxLength={10000} placeholder="Tell me a little about your opportunity or project." />
            </div>
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">* Required fields</p>
            <div aria-live="polite" aria-atomic="true">
              {status === "sent" && <p className="text-sm text-primary">Thank you! Your message has been submitted.</p>}
              {status === "error" && <p role="alert" className="text-sm text-destructive">Your message couldn&apos;t be sent. Please try again or email me directly. Your message is still here.</p>}
            </div>
            <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary text-primary-foreground px-7 py-3 text-sm rounded-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
