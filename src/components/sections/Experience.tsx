"use client";

import { useEffect, useRef } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";

type TimelineEntry = {
  type: string;
  year: string;
  title: string;
  place: string;
  detail: string;
};

// Merge education + experience sorted by start year desc
const timelineRaw: TimelineEntry[] = [
  ...EDUCATION,
  ...EXPERIENCE,
];

export default function Experience() {
  const spineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !spineRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (-rect.top) / (rect.height - window.innerHeight))
      );
      spineRef.current.style.transform = `scaleY(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full px-[var(--gutter)] py-[clamp(96px,14vh,160px)]"
      style={{ background: 'var(--paper-glass)', backdropFilter: 'blur(2px)' }}
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-16 rv">
          <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
            05 — Experience
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
            The{" "}
            <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">
              path.
            </span>
          </h2>
        </div>

        <div className="relative flex gap-8 md:gap-16">
          {/* Spine */}
          <div className="relative flex flex-col items-center shrink-0">
            {/* Track */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-[var(--line)] left-1/2 -translate-x-1/2" />
            {/* Growing spine */}
            <div
              ref={spineRef}
              className="absolute top-0 w-[2px] bg-[var(--ink)] left-1/2 -translate-x-1/2 origin-top"
              style={{ height: "100%", transform: "scaleY(0)" }}
            />
          </div>

          {/* Entries */}
          <div className="flex-1 flex flex-col gap-16 pb-16">
            {timelineRaw.map((entry, i) => (
              <div key={i} className="rv flex gap-6 items-start" style={{ "--i": i } as React.CSSProperties}>
                {/* Dot */}
                <div className="w-8 h-8 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] flex items-center justify-center shrink-0 -ml-[52px] md:-ml-[68px] relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[var(--ink)]" />
                </div>
                <div className="flex-1 bg-white rounded-[20px] border border-[var(--line)] p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[var(--soft)] text-xs font-medium font-[family-name:var(--font-mono)] mb-2 uppercase">
                        {entry.type}
                      </span>
                      <h3 className="font-bold text-xl tracking-tight">{entry.title}</h3>
                    </div>
                    <span className="text-sm text-[var(--mute)] font-[family-name:var(--font-mono)] shrink-0">
                      {entry.year}
                    </span>
                  </div>
                  <p className="text-[var(--mute)] font-semibold text-sm mb-2">{entry.place}</p>
                  <p className="text-[var(--mute)] text-sm leading-relaxed">{entry.detail}</p>
                </div>
              </div>
            ))}

            {/* Dashed "Next" card */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-[var(--faint)] bg-[var(--paper)] shrink-0 -ml-[52px] md:-ml-[68px] relative z-10" />
              <div className="flex-1 rounded-[20px] border-2 border-dashed border-[var(--line)] p-6">
                <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--faint)] mb-2 uppercase tracking-widest">Next chapter</p>
                <h3 className="font-bold text-xl tracking-tight text-[var(--mute)]">Your team?</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
