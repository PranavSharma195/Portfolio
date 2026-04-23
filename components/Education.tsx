"use client";
import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { PortfolioData } from "@/lib/data";

interface Props { data: PortfolioData; }

export default function Education({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" className="py-28 px-5 sm:px-10 overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-14">
          <div className={`eyebrow justify-center mb-4 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>Academic</div>
          <h2 className={`font-display font-bold transition-all duration-600 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--ink)" }}>
            Education
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {data.education.map((e, i) => (
            <div key={e.id}
              className={`glass-card p-6 flex items-start gap-5 group transition-all duration-500 ${vis ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ background: "var(--gold-glow)", color: "var(--gold)", border: "1.5px solid var(--gold)" }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold)" }}>{e.level}</p>
                <p className="font-semibold text-sm mb-3" style={{ color: "var(--ink)" }}>{e.institution}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${!e.gpa ? "animate-pulse" : ""}`}
                  style={{ background: "var(--gold-glow)", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                  {e.gpa ? `GPA ${e.gpa}` : "📚 Currently Enrolled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
