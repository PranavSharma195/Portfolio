"use client";
import { useEffect, useRef, useState } from "react";
import { Dumbbell, CheckCircle } from "lucide-react";
import { PortfolioData } from "@/lib/data";
import Image from "next/image";

interface Props { data: PortfolioData; }

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold, rootMargin: "0px 0px -10% 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

export default function Training({ data }: Props) {
  const { ref, vis } = useReveal();

  return (
    <section id="training" className="py-28 px-5 sm:px-10 overflow-hidden relative" style={{ background: "var(--bg)" }}>
      {/* Background photo with overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <Image src={data.media.contact} alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-14">
          <div className={`eyebrow justify-center mb-4 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Development
          </div>
          <h2 className={`font-display font-bold transition-all duration-600 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--ink)" }}>
            Training <span style={{ color: "var(--gold)" }}>Programs</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 hidden md:block" style={{ background: `linear-gradient(to bottom, var(--gold), transparent)` }} />

          <div className="flex flex-col gap-5">
            {data.training.map((t, i) => (
              <div key={t.id}
                className={`flex gap-6 items-start group transition-all duration-500 ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}>
                {/* Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform group-hover:scale-110"
                  style={{ background: "var(--gold)", color: "#fff", boxShadow: "0 4px 16px var(--gold-glow)" }}>
                  <Dumbbell size={16} />
                </div>
                {/* Card */}
                <div className="flex-1 glass-card p-5 group-hover:border-yellow-400 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--gold)" }}>{t.date}</p>
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--ink)" }}>{t.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
