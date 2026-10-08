"use client";

import { useEffect } from "react";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  // Global reveal-on-scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".rv, .rv-mask").forEach((el) => {
        observer.observe(el);
      });
    };

    // Observe on mount and after a brief delay (for async renders)
    observe();
    const t = setTimeout(observe, 600);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="w-full min-h-screen relative">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
