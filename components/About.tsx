"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Globe, Calendar, Users, Flag, Instagram } from "lucide-react";
import { PortfolioData } from "@/lib/data";
import Image from "next/image";

interface Props { data: PortfolioData; }

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function About({ data }: Props) {
  const { ref, visible } = useReveal();
  const { about } = data;

  const rows = [
    { icon: Calendar, label: "Date of Birth", value: about.dob },
    { icon: Flag, label: "Nationality", value: about.nationality },
    { icon: Users, label: "Languages", value: about.languages },
    { icon: Globe, label: "Countries Visited", value: about.countriesVisited },
    { icon: Instagram, label: "Instagram", value: about.instagram },
    { icon: Mail, label: "Email", value: about.email },
    { icon: Phone, label: "Phone", value: about.phone },
    { icon: MapPin, label: "Location", value: about.location },
  ];

  return (
    <section id="about" className="py-28 px-5 sm:px-10 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT – Two-page style image card */}
          <div className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
            <div className="relative rounded-[28px] overflow-hidden border p-3" style={{ borderColor: "rgba(154,115,67,0.25)", background: "var(--card)", boxShadow: "0 20px 46px var(--shadow)" }}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <Image src="/susmita.jpg" alt="Susmita Khadka portrait" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(to top, rgba(23,19,17,0.78), transparent)" }} />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <Image src="/susmita-action.jpg" alt="Susmita Khadka in action" fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(to top, rgba(23,19,17,0.78), transparent)" }} />
                </div>
              </div>

              <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between pointer-events-none">
                <div>
                  <p className="font-bebas text-2xl tracking-wider" style={{ color: "#fff" }}>Susmita Khadka</p>
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold2)" }}>Table Tennis Athlete · Nepal</p>
                </div>
                <div className="glass-card px-4 py-2.5 shadow-xl flex flex-col items-center gap-0.5"
                  style={{ background: "var(--gold)", borderColor: "transparent" }}>
                  <span className="font-bebas text-3xl text-white leading-none">20+</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Gold Medals</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – Text + info */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
            <div className="eyebrow mb-4">About Me</div>
            <h2 className="font-display font-bold mb-6 leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "var(--ink)" }}>
              Quiet confidence,<br /><span style={{ color: "var(--gold)" }}>steady progress</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink2)" }}>
              Born and raised in Kathmandu, I began training in table tennis as a child and have steadily developed into a composed competitor for Nepal on national and international stages.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink2)" }}>
              I continue balancing athletic development with academic work at Reed Model College, keeping my focus on discipline, growth, and consistency.
            </p>

            {/* Info grid */}
            <div className="grid gap-3">
              {rows.map(({ icon: Icon, label, value }, i) => (
                <div key={label}
                  className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{
                    transitionDelay: `${300 + i * 70}ms`,
                    background: "var(--bg2)", border: "1px solid var(--border)"
                  }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gold-glow)", color: "var(--gold)" }}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ink2)" }}>{label}</p>
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--ink)" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
