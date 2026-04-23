"use client";
import { useEffect, useRef, useState } from "react";
import { Trophy, ChevronDown, ChevronUp, Medal } from "lucide-react";
import { Achievement, PortfolioData } from "@/lib/data";

interface Props { data: PortfolioData; }

function AchCard({ a, idx }: { a: Achievement; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isGold = a.result.includes("Gold");
  const isSilver = a.result.includes("Silver");
  const isBronze = a.result.includes("Bronze");
  const accent = isGold ? "#d4a843" : isSilver ? "#9ba8b5" : isBronze ? "#cd7f47" : "var(--border)";

  return (
    <div ref={ref}
      className={`glass-card p-5 cursor-default transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${(idx % 6) * 60}ms`, borderLeft: `3px solid ${accent}` }}>
      <div className="flex items-start gap-3">
        {/* Medal icon */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${accent}18`, color: accent }}>
          <Trophy size={18} />
        </div>
        <div className="flex-1 min-w-0">
          {/* Tag + Date row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: a.type === "international" ? "rgba(30,107,200,0.12)" : "rgba(58,156,46,0.12)",
                color: a.type === "international" ? "var(--blue-acc)" : "var(--green-acc)"
              }}>
              {a.type === "international" ? "🌏 Intl" : "🇳🇵 National"}
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--ink2)" }}>{a.date}</span>
          </div>
          <p className="text-sm font-semibold leading-snug mb-2.5" style={{ color: "var(--ink)" }}>{a.event}</p>
          <p className="text-sm font-bold" style={{ color: accent }}>{a.result}</p>
        </div>
      </div>
    </div>
  );
}

export default function Achievements({ data }: Props) {
  const [filter, setFilter] = useState<"all" | "international" | "national">("all");
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = data.achievements.filter(a => filter === "all" || a.type === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 9);
  const golds = data.achievements.filter(a => a.result.includes("Gold")).length;

  return (
    <section id="achievements" className="py-28 px-5 sm:px-10 overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className={`eyebrow mb-4 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Career Highlights
            </div>
            <h2 className={`font-display font-bold leading-tight transition-all duration-600 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--ink)" }}>
              Competitive <span style={{ color: "var(--gold)" }}>Record</span>
            </h2>
          </div>

          {/* Stats row */}
          <div className={`flex gap-6 transition-all duration-600 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { v: `${golds}+`, l: "🥇 Golds" },
              { v: data.achievements.filter(a => a.type === "international").length, l: "🌏 International" },
              { v: data.achievements.filter(a => a.type === "national").length, l: "🇳🇵 National" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="font-bebas text-4xl" style={{ color: "var(--gold)" }}>{v}</div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: "var(--ink2)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(["all", "international", "national"] as const).map(f => (
            <button key={f} onClick={() => { setFilter(f); setShowAll(false); }}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              style={{
                background: filter === f ? "var(--gold)" : "var(--card)",
                color: filter === f ? "#fff" : "var(--ink2)",
                border: `1.5px solid ${filter === f ? "var(--gold)" : "var(--border)"}`,
              }}>
              {f === "international" ? "🌏 International" : f === "national" ? "🇳🇵 National" : "All"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((a, i) => <AchCard key={a.id} a={a} idx={i} />)}
        </div>

        {/* Show more */}
        {filtered.length > 9 && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll(!showAll)} className="btn-outline flex items-center gap-2 mx-auto"
              style={{ color: "var(--gold)", borderColor: "var(--gold)" }}>
              {showAll ? <><ChevronUp size={15} /> Show Less</> : <><ChevronDown size={15} /> Show All {filtered.length} Achievements</>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
