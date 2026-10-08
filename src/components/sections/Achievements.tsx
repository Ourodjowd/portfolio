"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * target * 10) / 10);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target]);

  return <>{value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}</>;
}

export default function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [countActive, setCountActive] = useState<boolean[]>(
    new Array(ACHIEVEMENTS.length).fill(false)
  );

  // Horizontal scroll on pinned section
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;

      // How far through the section's extra height
      const totalScroll = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

      // Slide the track
      const maxTranslate = track.scrollWidth - track.offsetWidth;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;

      // Determine which card is nearest center
      const cardWidth = 380 + 16; // card width + gap
      const nearestIdx = Math.round((progress * maxTranslate) / cardWidth);
      setActiveCard(Math.min(nearestIdx, ACHIEVEMENTS.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Count-up when card comes into "active" view
  useEffect(() => {
    setCountActive((prev) => {
      const next = [...prev];
      next[activeCard] = true;
      return next;
    });
  }, [activeCard]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100svh + ${ACHIEVEMENTS.length * 300}px)` }}
      className="relative"
    >
      <section
        id="achievements"
        className="sticky top-0 h-[100svh] w-full overflow-hidden px-[var(--gutter)] flex flex-col"
        style={{ background: 'var(--paper-glass)', backdropFilter: 'blur(2px)' }}
      >
        {/* Header */}
        <div className="pt-[clamp(48px,8vh,96px)] mb-8 flex justify-between items-end">
          <div>
            <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
              06 — Achievements
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
              Numbers that{" "}
              <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">
                matter.
              </span>
            </h2>
          </div>
          {/* Progress bar */}
          <div className="hidden md:block w-40 h-[2px] bg-[var(--soft)] relative">
            <div
              className="absolute left-0 top-0 h-full bg-[var(--ink)] transition-all duration-300"
              style={{
                width: `${((activeCard + 1) / ACHIEVEMENTS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Card Track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-100 ease-out"
            style={{ willChange: "transform" }}
          >
            {ACHIEVEMENTS.map((item, i) => {
              const isCenter = i === activeCard;
              return (
                <div
                  key={i}
                  className={`shrink-0 rounded-[28px] border border-[var(--line)] bg-white flex flex-col p-8 transition-all duration-500 ${isCenter ? "-translate-y-3 shadow-2xl" : "shadow-sm"}`}
                  style={{
                    width: "clamp(340px, 40vw, 540px)",
                    height: "clamp(260px, 36vh, 310px)",
                  }}
                >
                  {/* Top row: logo + index */}
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--soft)] flex items-center justify-center text-xs font-bold font-[family-name:var(--font-mono)] text-[var(--mute)] border border-[var(--line)]">
                      {item.logo.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--faint)]">
                      {String(i + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom row: label + big number */}
                  <div className="flex items-end justify-between mt-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[var(--faint)] font-[family-name:var(--font-mono)] mb-1">
                        {item.label}
                      </p>
                      <h3 className="font-bold text-xl tracking-tight">{item.caption}</h3>
                      <p className="text-sm text-[var(--mute)] mt-1">{item.detail}</p>
                    </div>
                    <div className="text-[64px] font-bold font-[family-name:var(--font-mono)] leading-none text-[var(--soft)] tabular-nums">
                      <CountUp
                        target={parseFloat(item.number)}
                        active={countActive[i]}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* "and counting →" cap */}
            <div
              className="shrink-0 rounded-[28px] border border-dashed border-[var(--line)] flex items-center justify-center px-12"
              style={{ width: "clamp(240px, 28vw, 380px)", height: "clamp(260px, 36vh, 310px)" }}
            >
              <span className="text-xl font-[family-name:var(--font-instrument)] italic text-[var(--faint)]">
                and counting →
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
