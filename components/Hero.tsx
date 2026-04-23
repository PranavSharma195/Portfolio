"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Trophy, Globe, Zap, Award } from "lucide-react";
import { PortfolioData } from "@/lib/data";
import Image from "next/image";

interface Props { data: PortfolioData; }

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(to / 40);
        const t = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(t); } else setVal(start);
        }, 35);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Hero({ data }: Props) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setReady(entry.isIntersecting);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={data.hero.image}
          alt="Susmita Khadka"
          fill
          className="object-cover object-center"
          priority
          quality={92}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="absolute inset-0" style={{ background: "var(--hero-ambient-overlay)" }} />
        <div
          className="absolute inset-y-0 left-0 w-[62%]"
          style={{
            background: "var(--hero-left-overlay)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: "linear-gradient(90deg, transparent, var(--gold), var(--gold2), transparent)" }} />
      </div>

      <div className="absolute inset-x-0 top-0 h-24" style={{ background: "linear-gradient(180deg, rgba(154,115,67,0.10), transparent)" }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 w-full pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className={`eyebrow mb-5 transition-all duration-700 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                color: "var(--gold)",
                background: "var(--hero-eyebrow-bg)",
                border: "1px solid var(--hero-eyebrow-border)",
                borderRadius: "999px",
                display: "inline-flex",
                padding: "0.38rem 0.9rem",
              }}>
              <span className="w-6 h-0.5 inline-block" style={{ background: "var(--gold2)" }} />
              Table Tennis Athlete · Nepal
            </div>

            {/* Hero name */}
            <h1 className={`font-bebas leading-none mb-3 transition-all duration-700 delay-100 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize: "clamp(4.5rem, 14vw, 10rem)", color: "var(--ink)", textShadow: "0 8px 30px rgba(255,255,255,0.35)" }}>
              Susmita
            </h1>
            <h1 className={`font-bebas leading-none mb-6 shimmer-gold transition-all duration-700 delay-200 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize: "clamp(4.5rem, 14vw, 10rem)", textShadow: "0 8px 30px rgba(255,255,255,0.32)" }}>
              Khadka
            </h1>

            {/* Subtitle */}
            <p className={`text-base md:text-lg leading-relaxed mb-10 max-w-lg transition-all duration-700 delay-300 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ color: "var(--ink)" }}>
              {data.hero.description}
            </p>

            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-10 transition-all duration-700 delay-350 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "var(--hero-chip-bg)", borderColor: "var(--hero-chip-border)", color: "var(--ink)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--gold2)" }} />
              {data.hero.subtitle}
            </div>

            {/* CTA row */}
            <div className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 delay-400 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <a href="#achievements" className="btn-gold streak-container">
                <Trophy size={16} /> View Achievements
              </a>
              <a href="#contact" className="btn-outline" style={{ color: "var(--ink)" }}>
                Reach and Contact Me
              </a>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 transition-all duration-700 delay-500 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {[
                { icon: Trophy, label: "Gold Medals", val: 20, suffix: "+" },
                { icon: Globe, label: "Countries", val: 4, suffix: "" },
                { icon: Zap, label: "Years Active", val: 9, suffix: "+" },
                { icon: Award, label: "Titles Won", val: 30, suffix: "+" },
              ].map(({ icon: Icon, label, val, suffix }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color: "var(--gold)" }} />
                    <span className="font-bebas text-3xl tracking-wide" style={{ color: "var(--ink)" }}>
                      <Counter to={val} suffix={suffix} />
                    </span>
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--ink2)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="relative z-10 flex flex-col items-center gap-2 pb-8 self-center opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: "var(--ink)" }}>Scroll</span>
        <ChevronDown size={18} color="currentColor" className="animate-bounce" style={{ color: "var(--ink)" }} />
      </a>
    </section>
  );
}
