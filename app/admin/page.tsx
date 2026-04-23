"use client";
import { useState, useEffect } from "react";
import { adminLogin, adminLogout, isAdminLoggedIn, getPortfolioData, savePortfolioData } from "@/lib/store";
import { defaultData, PortfolioData, Achievement, Training } from "@/lib/data";
import { Shield, LogOut, Plus, Trash2, Save, Eye, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

type Tab = "hero" | "about" | "media" | "achievements" | "training" | "education";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (adminLogin(email, pass)) { onLogin(); }
      else { setErr("Invalid credentials. Try again."); setLoading(false); }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at top left, rgba(142,106,62,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(104,126,149,0.1), transparent 28%)" }} />
      <div className="card relative p-8 w-full max-w-md overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full" style={{ background: "var(--accent-light)" }} />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full" style={{ background: "rgba(104,126,149,0.08)" }} />
        <div className="relative text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
            <Shield size={28} />
          </div>
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--text-primary)" }}>Admin Login</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Portfolio editor and message inbox</p>
        </div>
        <form onSubmit={handle} className="relative flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
            <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" required />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-secondary)" }}>Password</label>
            <input className="input-field" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
          </div>
          {err && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{err}</p>}
          <button type="submit" className="btn-primary w-full py-3 mt-2" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
        <div className="relative mt-6 text-center">
          <Link href="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "var(--text-secondary)" }}>
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [tab, setTab] = useState<Tab>("hero");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAuthed(isAdminLoggedIn());
    setData(getPortfolioData());
  }, []);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    updater: (src: string) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") updater(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = () => { setAuthed(true); setData(getPortfolioData()); };
  const handleLogout = () => { adminLogout(); setAuthed(false); };

  const save = () => {
    savePortfolioData(data);
    window.dispatchEvent(new Event("portfolio-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!authed) return <LoginForm onLogin={handleLogin} />;

  const tabs: { key: Tab; label: string }[] = [
    { key: "hero", label: "Hero" },
    { key: "about", label: "About" },
    { key: "media", label: "Media" },
    { key: "achievements", label: "Achievements" },
    { key: "training", label: "Training" },
    { key: "education", label: "Education" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b backdrop-blur-xl"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)", color: "#fff" }}>
            <Shield size={15} />
          </div>
          <div>
            <h1 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Admin Panel</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>susmitakhadka@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            onClick={() => {
              adminLogout();
              setAuthed(false);
            }}
            className="btn-ghost flex items-center gap-1.5 text-xs py-2"
          >
            <Eye size={14} /> View Site
          </Link>
          <button onClick={save} className="btn-primary flex items-center gap-1.5 text-xs py-2">
            <Save size={14} /> {saved ? "Saved!" : "Save"}
          </button>
          <button onClick={handleLogout} className="btn-ghost flex items-center gap-1.5 text-xs py-2 text-red-500 border-red-200 hover:bg-red-50">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tab nav */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t.key ? "var(--accent)" : "var(--bg-card)",
                color: tab === t.key ? "#fff" : "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* HERO TAB */}
        {tab === "hero" && (
          <div className="card p-6 flex flex-col gap-5">
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>Hero Section</h2>
            {(["name", "tagline", "subtitle", "description"] as const).map(field => (
              <div key={field}>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 capitalize" style={{ color: "var(--text-secondary)" }}>{field}</label>
                {field === "description" ? (
                  <textarea
                    className="input-field resize-none"
                    rows={4}
                    value={data.hero[field]}
                    onChange={e => setData({ ...data, hero: { ...data.hero, [field]: e.target.value } })}
                  />
                ) : (
                  <input
                    className="input-field"
                    value={data.hero[field]}
                    onChange={e => setData({ ...data, hero: { ...data.hero, [field]: e.target.value } })}
                  />
                )}
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-secondary)" }}>Hero image</label>
              <input
                className="input-field mb-3"
                value={data.hero.image}
                onChange={e => setData({ ...data, hero: { ...data.hero, image: e.target.value }, media: { ...data.media, hero: e.target.value } })}
                placeholder="/hero.jpg"
              />
              <div className="mb-3">
                <label className="btn-ghost cursor-pointer text-xs py-2 px-4 inline-flex">
                  Upload from device
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, (src) => setData({ ...data, hero: { ...data.hero, image: src }, media: { ...data.media, hero: src } }))}
                  />
                </label>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                <Image src={data.hero.image} alt="Hero preview" fill className="object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div className="card p-6 flex flex-col gap-5">
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>About Section</h2>
            {(Object.keys(data.about) as (keyof typeof data.about)[]).map(field => (
              <div key={field}>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  className="input-field"
                  value={data.about[field]}
                  onChange={e => setData({ ...data, about: { ...data.about, [field]: e.target.value } })}
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-secondary)" }}>Instagram handle</label>
              <input
                className="input-field"
                value={data.about.instagram}
                onChange={e => setData({ ...data, about: { ...data.about, instagram: e.target.value } })}
                placeholder="@susmii014"
              />
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {tab === "media" && (
          <div className="grid gap-6">
            {([
              { key: "hero", label: "Hero background" },
              { key: "about", label: "About portrait" },
              { key: "contact", label: "Contact background" },
            ] as const).map((item) => (
              <div key={item.key} className="card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} style={{ color: "var(--accent)" }} />
                  <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>{item.label}</h2>
                </div>
                <input
                  className="input-field"
                  value={data.media[item.key]}
                  onChange={e => {
                    const nextValue = e.target.value;
                    setData({
                      ...data,
                      media: { ...data.media, [item.key]: nextValue },
                      hero: item.key === "hero" ? { ...data.hero, image: nextValue } : data.hero,
                    });
                  }}
                  placeholder="/image.jpg"
                />
                <div>
                  <label className="btn-ghost cursor-pointer text-xs py-2 px-4 inline-flex">
                    Upload from device
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (src) => {
                        setData({
                          ...data,
                          media: { ...data.media, [item.key]: src },
                          hero: item.key === "hero" ? { ...data.hero, image: src } : data.hero,
                        });
                      })}
                    />
                  </label>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                  <Image src={data.media[item.key]} alt={item.label} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {tab === "achievements" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>Achievements ({data.achievements.length})</h2>
              <button
                className="btn-primary flex items-center gap-2 text-xs py-2"
                onClick={() => {
                  const newA: Achievement = {
                    id: `a${Date.now()}`, date: "", type: "national", event: "", result: ""
                  };
                  setData({ ...data, achievements: [newA, ...data.achievements] });
                }}
              >
                <Plus size={14} /> Add Achievement
              </button>
            </div>
            {data.achievements.map((a, i) => (
              <div key={a.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>#{i + 1}</span>
                  <button
                    onClick={() => setData({ ...data, achievements: data.achievements.filter(x => x.id !== a.id) })}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Date</label>
                    <input className="input-field" value={a.date} onChange={e => {
                      const upd = [...data.achievements]; upd[i] = { ...a, date: e.target.value };
                      setData({ ...data, achievements: upd });
                    }} placeholder="e.g. 14-17 May 2023" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Type</label>
                    <select className="input-field" value={a.type} onChange={e => {
                      const upd = [...data.achievements]; upd[i] = { ...a, type: e.target.value as "international" | "national" };
                      setData({ ...data, achievements: upd });
                    }}>
                      <option value="national">National</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Event</label>
                  <input className="input-field" value={a.event} onChange={e => {
                    const upd = [...data.achievements]; upd[i] = { ...a, event: e.target.value };
                    setData({ ...data, achievements: upd });
                  }} placeholder="Tournament / Championship name" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Result</label>
                  <input className="input-field" value={a.result} onChange={e => {
                    const upd = [...data.achievements]; upd[i] = { ...a, result: e.target.value };
                    setData({ ...data, achievements: upd });
                  }} placeholder="e.g. Women's Singles – Gold 🥇" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRAINING TAB */}
        {tab === "training" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>Training Programs</h2>
              <button
                className="btn-primary flex items-center gap-2 text-xs py-2"
                onClick={() => {
                  const newT: Training = { id: `t${Date.now()}`, date: "", program: "" };
                  setData({ ...data, training: [newT, ...data.training] });
                }}
              >
                <Plus size={14} /> Add Training
              </button>
            </div>
            {data.training.map((t, i) => (
              <div key={t.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>Training #{i + 1}</span>
                  <button
                    onClick={() => setData({ ...data, training: data.training.filter(x => x.id !== t.id) })}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Date</label>
                  <input className="input-field" value={t.date} onChange={e => {
                    const upd = [...data.training]; upd[i] = { ...t, date: e.target.value };
                    setData({ ...data, training: upd });
                  }} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Program</label>
                  <textarea className="input-field resize-none" rows={2} value={t.program} onChange={e => {
                    const upd = [...data.training]; upd[i] = { ...t, program: e.target.value };
                    setData({ ...data, training: upd });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION TAB */}
        {tab === "education" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>Education</h2>
              <button
                className="btn-primary flex items-center gap-2 text-xs py-2"
                onClick={() => {
                  const newE = { id: `e${Date.now()}`, level: "", institution: "", gpa: "" };
                  setData({ ...data, education: [...data.education, newE] });
                }}
              >
                <Plus size={14} /> Add Education
              </button>
            </div>
            {data.education.map((e, i) => (
              <div key={e.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>Degree #{i + 1}</span>
                  <button
                    onClick={() => setData({ ...data, education: data.education.filter(x => x.id !== e.id) })}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Level</label>
                    <input className="input-field" value={e.level} onChange={ev => {
                      const upd = [...data.education]; upd[i] = { ...e, level: ev.target.value };
                      setData({ ...data, education: upd });
                    }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>GPA (optional)</label>
                    <input className="input-field" value={e.gpa || ""} onChange={ev => {
                      const upd = [...data.education]; upd[i] = { ...e, gpa: ev.target.value };
                      setData({ ...data, education: upd });
                    }} placeholder="e.g. 3.75" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--text-secondary)" }}>Institution</label>
                  <input className="input-field" value={e.institution} onChange={ev => {
                    const upd = [...data.education]; upd[i] = { ...e, institution: ev.target.value };
                    setData({ ...data, education: upd });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save bottom */}
        <div className="mt-8 flex justify-end">
          <button onClick={save} className="btn-primary flex items-center gap-2 px-8 py-3">
            <Save size={16} /> {saved ? "✓ Saved Successfully!" : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
