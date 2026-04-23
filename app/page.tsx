"use client";
import { useEffect, useState } from "react";
import { getPortfolioData } from "@/lib/store";
import { defaultData, PortfolioData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Training from "@/components/Training";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    setData(getPortfolioData());
    const handler = () => setData(getPortfolioData());
    window.addEventListener("portfolio-updated", handler);
    return () => window.removeEventListener("portfolio-updated", handler);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero data={data} />
      <About data={data} />
      <Achievements data={data} />
      <Training data={data} />
      <Education data={data} />
      <Contact data={data} />
    </main>
  );
}
