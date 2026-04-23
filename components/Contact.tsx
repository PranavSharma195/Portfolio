"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Mail, Instagram } from "lucide-react";
import { PortfolioData } from "@/lib/data";

interface Props { data: PortfolioData; }

export default function Contact({ data }: Props) {
  const { about } = data;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const instagramHandle = about.instagram.replace(/^@/, "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "Website visitor"}`);
    const body = encodeURIComponent([
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      "",
      message || "",
    ].join("\n"));

    window.location.href = `mailto:susmii014@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleDirectSend = async () => {
    setStatus(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Unable to send email.");
      }

      setStatus({ type: "success", text: "Email sent directly to susmii014@gmail.com." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unable to send email.";
      setStatus({ type: "error", text: msg });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-5 sm:px-10 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 z-0" style={{ background: "var(--contact-overlay)" }} />
      <div className="absolute inset-x-0 top-0 h-24" style={{ background: "var(--section-top-fade)" }} />

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-12">
          <div className={`eyebrow justify-center mb-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Get In Touch
          </div>
          <h2
            className={`font-display font-bold transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--ink)" }}
          >
            Reach and Contact me via <span className="shimmer-gold">Email and Instagram</span>
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "var(--ink2)" }}>
            For sponsorships, collaborations, media enquiries, or a direct message, I open your email app with everything prefilled.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5 mb-12 items-stretch">
          <form
            onSubmit={handleSubmit}
            className={`glass-card p-7 sm:p-8 transition-all duration-700 hover:-translate-y-1 relative overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "var(--contact-panel-bg)", borderColor: "var(--contact-panel-border)", minHeight: "100%" }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--contact-panel-soft)", color: "var(--gold)" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--ink2)" }}>Direct email form</p>
                  <p className="text-sm" style={{ color: "var(--ink)" }}>Submitting opens your email app with a prefilled draft to susmii014@gmail.com.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--ink2)" }}>Your name</span>
                  <input
                    className="input-field"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    type="text"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--ink2)" }}>Your email</span>
                  <input
                    className="input-field"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </label>
              </div>

              <label className="block space-y-2 mt-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--ink2)" }}>Message</span>
                <textarea
                  className="input-field min-h-[170px] resize-y"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write your message here"
                  required
                />
              </label>

              <div className="flex flex-wrap gap-3 mt-6">
                <button type="submit" className="btn-gold streak-container">
                  Send message via Email
                </button>
                <button type="button" className="btn-outline" disabled={isSending} onClick={handleDirectSend}>
                  Email directly
                </button>
              </div>

              {status && (
                <p
                  className="mt-4 text-sm font-semibold"
                  style={{ color: status.type === "success" ? "var(--green-acc)" : "#c85850" }}
                >
                  {status.text}
                </p>
              )}
            </div>
          </form>

          <div className={`glass-card p-7 sm:p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ background: "var(--contact-panel-bg)", borderColor: "var(--contact-panel-border)", minHeight: "100%" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--contact-panel-soft)", color: "var(--gold)" }}>
                <Instagram size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--ink2)" }}>Stay connected</p>
                <p className="text-sm" style={{ color: "var(--ink)" }}>I keep Instagram and email open for direct communication</p>
              </div>
            </div>

            <a
              href={`mailto:susmii014@gmail.com`}
              className="block rounded-2xl p-5 border mb-4 transition-all hover:-translate-y-1"
              style={{ background: "var(--contact-panel-strong)", borderColor: "var(--contact-panel-border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: "var(--ink2)" }}>Email</p>
              <p className="text-lg font-semibold" style={{ color: "var(--ink)" }}>susmii014@gmail.com</p>
              <p className="text-sm mt-2" style={{ color: "var(--ink2)" }}>Use this if you want to skip the form.</p>
            </a>

            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl p-5 border transition-all hover:-translate-y-1"
              style={{ background: "var(--contact-panel-strong)", borderColor: "var(--contact-panel-border)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: "var(--ink2)" }}>Instagram</p>
              <p className="text-lg font-semibold" style={{ color: "var(--ink)" }}>{about.instagram}</p>
              <p className="text-sm mt-2" style={{ color: "var(--ink2)" }}>Contact me via Instagram.</p>
            </a>
          </div>
        </div>

        <div className="text-center border-t pt-10" style={{ borderColor: "var(--border)" }}>
          <p className="font-bebas text-4xl tracking-widest mb-1" style={{ color: "var(--gold)" }}>Susmita Khadka</p>
          <p className="text-sm mb-1" style={{ color: "var(--ink2)" }}>Table Tennis Athlete · Nepal</p>
          <div className="gold-line max-w-xs mx-auto mt-4 mb-4" />
          <p className="text-xs" style={{ color: "var(--ink2)" }}>
            © {new Date().getFullYear()} Susmita Khadka. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
