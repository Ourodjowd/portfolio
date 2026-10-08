"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE, EDUCATION, PROJECTS } from "@/lib/data";

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Simple pendulum sway for the ID card
    let angle = 0;
    let animationFrameId: number;

    const sway = () => {
      if (!isFlipped && cardRef.current) {
        angle += 0.02;
        const swayAngle = Math.sin(angle) * 3; // +/- 3 degrees
        cardRef.current.style.transform = `rotate(${swayAngle}deg)`;
      }
      animationFrameId = requestAnimationFrame(sway);
    };

    sway();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFlipped]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isFlipped) return;
    const { clientX, clientY } = e;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate distance from center to add some 3D tilt
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((clientY - centerY) / (rect.height / 2)) * -10;
    const rotateY = ((clientX - centerX) / (rect.width / 2)) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && cardRef.current) {
      cardRef.current.style.transform = `rotateY(180deg)`;
    } else if (isFlipped && cardRef.current) {
      cardRef.current.style.transform = `rotateY(0deg) rotate(0deg)`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section id="about" className="relative w-full py-[var(--gutter)] px-[var(--gutter)] pt-32 min-h-screen bg-[var(--paper)]">
      
      <div className="max-w-[1320px] mx-auto">
        {/* Section Heading */}
        <div className="mb-16">
          <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
            01 — About me
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
            More than just <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">code.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px_1fr] gap-12 md:gap-8 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 rv">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Hi, I'm {PROFILE.name.split(" ")[0]}.</h3>
              <p className="text-[var(--mute)] leading-relaxed text-lg">
                {PROFILE.resumeSummary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href={PROFILE.resumePath} download className="px-5 py-2.5 bg-[var(--ink)] text-white rounded-full text-sm font-medium hover:bg-[var(--ink-2)] transition-colors">
                Résumé ↓
              </a>
              {PROFILE.github !== "#" && (
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-[var(--line)] rounded-full text-sm font-medium hover:bg-black/5 transition-colors">
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin !== "#" && (
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-[var(--line)] rounded-full text-sm font-medium hover:bg-black/5 transition-colors">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: ID Card */}
          <div className="flex flex-col items-center relative h-[500px]">
            {/* Lanyard Strap */}
            <div className="absolute top-[-50px] w-8 h-24 bg-black/80 flex flex-col items-center justify-center overflow-hidden rounded-t-sm z-0">
               <span className="text-[8px] text-white/50 tracking-widest uppercase rotate-90 whitespace-nowrap">Developer ID</span>
            </div>
            {/* Clip */}
            <div className="absolute top-[30px] w-4 h-6 bg-gray-400 rounded-sm z-10 shadow-inner" style={{ background: "linear-gradient(to right, #999, #ccc, #999)" }}></div>
            
            {/* The Card */}
            <div 
              className="relative w-[300px] h-[404px] mt-12 cursor-pointer perspective-1000 z-20"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetRotation}
              onClick={toggleFlip}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Flip ID Card"
            >
              <div 
                ref={cardRef}
                className="w-full h-full relative transition-transform duration-500 transform-style-3d shadow-xl rounded-[24px] bg-white border border-[var(--line)]"
                style={!isFlipped ? { transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` } : {}}
              >
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden flex flex-col">
                  <div className="h-12 bg-black flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest text-sm">DEVELOPER ID</span>
                  </div>
                  <div className="flex-1 p-6 flex flex-col items-center">
                    {/* Portrait */}
                    <div className="w-[128px] h-[156px] rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--soft)] mb-4 relative group">
                       <img src="/image.png" alt="Portrait" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                    
                    <div className="w-full text-center mb-6">
                      <h4 className="font-bold text-xl leading-none mb-1">{PROFILE.name}</h4>
                      <p className="text-xs text-[var(--mute)] uppercase tracking-wider">{PROFILE.role.replace(".", "")}</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-y-2 text-xs">
                      <div className="text-[var(--faint)]">ID No.</div>
                      <div className="text-right font-medium font-[family-name:var(--font-mono)]">001</div>
                      
                      <div className="text-[var(--faint)]">Dept.</div>
                      <div className="text-right font-medium">Engineering</div>
                      
                      <div className="text-[var(--faint)]">Valid till</div>
                      <div className="text-right font-medium">2026</div>
                    </div>
                  </div>
                  <div className="h-12 border-t border-[var(--line)] flex items-center justify-between px-6 bg-[var(--soft)]/30">
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-[var(--mute)] flex items-center">
                      ||| | || |||| | | |||
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 opacity-60"></div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-white p-6 rotate-y-180 flex flex-col">
                  <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">What I am</h4>
                  <div className="text-sm text-[var(--mute)] flex-1 flex flex-col gap-3">
                    <p>{EDUCATION[0].title}</p>
                    <p>{EDUCATION[0].place} • {EDUCATION[0].detail.split(".")[1]}</p>
                    <p>Key Projects: {PROJECTS.map(p => p.title).join(", ")}</p>
                  </div>
                  <div className="mt-auto border-t border-[var(--line)] pt-4">
                    <div className="font-[family-name:var(--font-instrument)] italic text-2xl opacity-50 mb-2">
                      {PROFILE.name.split(" ")[0]}
                    </div>
                    <p className="text-[10px] text-[var(--faint)] uppercase tracking-widest">
                      If found, say hello · {PROFILE.email}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 rv" style={{ '--i': 1 } as any}>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick facts</h3>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span className="text-[var(--faint)]">Location</span>
                  <span className="font-medium">{PROFILE.location.split(",")[0]}, {PROFILE.location.split(",")[2]}</span>
                </li>
                <li className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span className="text-[var(--faint)]">Education</span>
                  <span className="font-medium text-right max-w-[150px] truncate" title={EDUCATION[0].title}>{EDUCATION[0].title}</span>
                </li>
                <li className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span className="text-[var(--faint)]">Current</span>
                  <span className="font-medium text-right max-w-[150px] truncate" title={PROFILE.role}>{PROFILE.role.replace(".", "")}</span>
                </li>
                <li className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span className="text-[var(--faint)]">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="font-medium hover:text-[var(--mute)] transition-colors">{PROFILE.email}</a>
                </li>
              </ul>
            </div>

            <blockquote className="text-xl font-[family-name:var(--font-instrument)] italic text-[var(--mute)] border-l-2 border-[var(--ink)] pl-4">
              "Driven by a visionary approach and inquisitive nature to understand the ‘why’ behind every idea."
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
