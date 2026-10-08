"use client";

import { useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

const letters = "Let's build / something together.".split("");

export default function Contact() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      <section
        id="contact"
        className="relative w-full px-[var(--gutter)] py-[clamp(96px,14vh,160px)] overflow-hidden"
        style={{ background: 'var(--paper-glass)', backdropFilter: 'blur(2px)' }}
      >
        <div className="max-w-[1320px] mx-auto">
          <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-10">
            07 — Contact
          </div>

          {/* Interactive heading */}
          <h2
            className="text-[clamp(40px,7vw,100px)] font-bold tracking-tighter leading-[1.1] mb-16 select-none"
            aria-label="Let's build / something together."
          >
            {"Let's build / something together.".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char === "/" ? (
                  <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">{char}</span>
                ) : char}
              </span>
            ))}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              {/* Email */}
              <div>
                <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--faint)] uppercase tracking-widest mb-3">
                  Email
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    ref={emailRef}
                    href={`mailto:${PROFILE.email}`}
                    className="text-2xl md:text-3xl font-bold underline underline-offset-8 hover:text-[var(--mute)] transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    onClick={handleCopy}
                    aria-live="polite"
                    className="px-4 py-2 rounded-full border border-[var(--line)] text-sm font-medium hover:bg-black/5 transition-all duration-200"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--faint)] uppercase tracking-widest mb-3">
                  Phone
                </p>
                <a
                  href={PROFILE.phoneHref}
                  className="text-xl font-semibold hover:text-[var(--mute)] transition-colors"
                >
                  {PROFILE.phone}
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-[var(--line)] text-sm font-medium hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all duration-200"
                >
                  GitHub ↗
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-[var(--line)] text-sm font-medium hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all duration-200"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Spinning badge */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full animate-spin"
                  style={{ animationDuration: "12s" }}
                >
                  <defs>
                    <path
                      id="textCircle"
                      d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text
                    className="text-[13px] fill-[var(--mute)] font-[family-name:var(--font-mono)] uppercase tracking-[0.18em]"
                    fontSize="13"
                  >
                    <textPath href="#textCircle">
                      {PROFILE.name} · {PROFILE.name} · {PROFILE.name} ·{" "}
                    </textPath>
                  </text>
                </svg>
                <div className="w-16 h-16 rounded-full bg-[var(--ink)] flex items-center justify-center text-white font-bold text-xl">
                  ↗
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--line)] px-[var(--gutter)] py-8" style={{ background: 'var(--paper-glass)', backdropFilter: 'blur(2px)' }}>
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--mute)]">
          <span>
            © {new Date().getFullYear()} 
          </span>
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--faint)]">
            Built with <span className="text-[var(--mute)] font-bold">❤</span> by Me
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[var(--ink)] transition-colors"
          >
            ↑Back 
          </button>
        </div>
      </footer>
    </>
  );
}
