"use client";

import { useEffect, useState, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const initials = PROFILE.name.split(" ").map(n => n[0]).join("");

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-[var(--ink)] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="fixed top-0 left-0 w-full z-40 px-[var(--gutter)] pt-6 pb-4 flex justify-between items-center pointer-events-none">
        
        {/* Left: Initials & Name */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className={`w-10 h-10 rounded-full border border-[var(--ink)] flex items-center justify-center font-bold text-sm transition-all duration-500 hover:rotate-360 ${scrolled ? 'bg-[var(--ink)] text-white' : 'bg-transparent text-[var(--ink)]'}`}>
            {initials}
          </div>
          <span className={`font-semibold tracking-tight transition-opacity duration-500 ${scrolled ? 'opacity-0 select-none' : 'opacity-100'}`}>
            {PROFILE.name}
          </span>
        </div>

        {/* Desktop Nav Pill */}
        <div className={`hidden md:flex relative pointer-events-auto items-center p-1.5 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm border border-[var(--line)]' : 'bg-transparent'}`}>
          {NAV.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href.substring(1))}
                className={`relative z-10 px-5 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-[var(--mute)] hover:text-[var(--ink)]'}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 transition-all duration-300 layout-id-nav-indicator" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden pointer-events-auto px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${scrolled ? 'bg-[var(--ink)] text-white' : 'bg-[var(--ink)] text-white'}`}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[var(--paper)] z-50 flex flex-col justify-center items-center px-[var(--gutter)]">
          <button 
            className="absolute top-6 right-[var(--gutter)] px-5 py-2.5 rounded-full border border-[var(--line)] text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href.substring(1))}
                className="text-4xl font-bold font-[family-name:var(--font-inter)] tracking-tighter flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)]">0{i+1}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
