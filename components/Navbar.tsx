"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#training", label: "Training" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--nav-bg)" : "color-mix(in srgb, var(--nav-bg) 72%, transparent)",
        borderBottom: "1px solid var(--nav-border)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 8px 28px rgba(37, 27, 18, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bebas text-2xl tracking-widest flex items-center gap-2" style={{ color: "var(--nav-text)" }}>
          <span className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--gold)" }}>SK</span>
          <span style={{ color: "var(--nav-text)" }}>Susmita</span>
          <span style={{ color: "var(--gold)" }}>Khadka</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold tracking-widest uppercase transition-all relative group px-1 py-2 rounded-full"
              style={{ color: "var(--nav-text)" }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: "var(--gold)" }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin" className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-full transition-all btn-surface"
            style={{ background: "var(--nav-admin-bg)", borderColor: "var(--nav-border)", color: "var(--nav-text)" }}>
            <Shield size={12} /> Admin
          </Link>
          <ThemeToggle />
          <button className="md:hidden p-2 rounded-lg transition-colors" style={{ color: "var(--nav-text)" }} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-5 pb-5 pt-2 flex flex-col gap-4 border-t" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,255,255,0.82))", borderColor: "rgba(154, 115, 67, 0.16)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase py-2" style={{ color: "var(--nav-text)" }}>
              {l.label}
            </a>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-full btn-surface">
            <Shield size={14} /> Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
