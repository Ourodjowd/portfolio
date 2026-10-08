"use client";

import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full border-t border-b border-[var(--line)]"
      style={{ background: 'var(--paper-glass)', backdropFilter: 'blur(2px)' }}
    >
      <div className="max-w-[1320px] mx-auto px-[var(--gutter)] py-[clamp(96px,14vh,160px)]">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">

          {/* Left sticky heading */}
          <div className="md:sticky md:top-32 md:h-fit md:w-64 shrink-0">
            <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
              04 — Certifications
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-6">
              Always{" "}
              <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">
                learning.
              </span>
            </h2>
            <p className="text-[var(--mute)] text-sm leading-relaxed">
              {CERTIFICATIONS.length} certifications earned across networking,
              data analytics and software development.
            </p>
          </div>

          {/* Right list */}
          <ol className="flex-1 flex flex-col divide-y divide-[var(--line)]">
            {CERTIFICATIONS.map((cert, i) => (
              <li key={i} className="group relative overflow-hidden">
                {/* ink-flood ::before equivalent */}
                <div className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[var(--ease)] -z-0" />
                <div className="relative z-10 flex items-center justify-between gap-6 py-6">
                  <div className="flex items-start gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--faint)] group-hover:text-white/50 transition-colors duration-300 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-white transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-[var(--mute)] group-hover:text-white/60 transition-colors duration-300 mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <span className="text-[var(--mute)] group-hover:text-white translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    ↗
                  </span>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
}
