"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="relative w-full py-[var(--gutter)] px-[var(--gutter)] min-h-screen bg-[var(--paper)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-16">
          <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
            03 — Selected work
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
            Things I've <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">built.</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row w-full h-[min(78svh,600px)] gap-2 rv">
          {PROJECTS.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`relative flex flex-col md:flex-row rounded-[24px] overflow-hidden transition-all duration-700 ease-[var(--ease)] ${isActive ? 'flex-[8] bg-white border border-[var(--line)] shadow-lg cursor-default' : 'flex-[1] bg-[var(--soft)] border border-[var(--line)] hover:bg-black/5 cursor-pointer md:items-center md:justify-center group'}`}
                aria-expanded={isActive}
              >
                {!isActive ? (
                  /* Spine / Folded state */
                  <div className="flex md:flex-col items-center justify-between w-full h-full p-4 md:py-8">
                    <span className="font-[family-name:var(--font-mono)] text-[var(--mute)] text-sm">{project.index}</span>
                    <div className="hidden md:block transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                      <h3 className="text-lg font-semibold tracking-tight whitespace-nowrap">{project.title}</h3>
                    </div>
                    <span className="md:hidden text-lg font-semibold tracking-tight">{project.title}</span>
                    <div className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  /* Expanded state */
                  <div className="flex flex-col md:flex-row w-full h-full text-left">
                    <div className="flex-1 p-8 md:p-12 flex flex-col items-start overflow-y-auto">
                      <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--mute)] mb-4">
                        {project.index} / {project.kicker}
                      </div>
                      <h3 className="text-4xl font-bold tracking-tight mb-6">{project.title}</h3>
                      <p className="text-[var(--mute)] leading-relaxed mb-8">{project.description}</p>
                      
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-[var(--ink-2)] mb-10 w-full">
                        {project.features.map(feat => (
                          <li key={feat} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[var(--ink)] rounded-full shrink-0"></span>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col gap-6 w-full">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(t => (
                            <span key={t} className="px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--paper)] text-xs font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                        {project.github !== "#" && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--mute)] transition-colors w-fit">
                            View on GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Illustrative UI Panel */}
                    <div className="hidden md:flex flex-1 bg-[var(--soft)] p-8 items-center justify-center relative overflow-hidden">
                      <div className="absolute top-4 right-6 text-[10px] uppercase tracking-widest text-[var(--mute)] font-[family-name:var(--font-mono)]">
                        Illustrative UI
                      </div>
                      
                      {/* Wireframe Graphic */}
                      <div className="w-full max-w-[340px] aspect-square bg-white rounded-xl border border-[var(--line)] shadow-sm p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-700">
                         <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                           <div className="w-24 h-4 bg-[var(--soft)] rounded"></div>
                           <div className="w-8 h-4 bg-[var(--soft)] rounded"></div>
                         </div>
                         <div className="flex-1 flex gap-4">
                           <div className="w-1/3 flex flex-col gap-2">
                             {[1,2,3,4].map(i => <div key={i} className="w-full h-8 bg-[var(--paper)] rounded"></div>)}
                           </div>
                           <div className="w-2/3 bg-[var(--paper)] rounded-md border border-[var(--line)]"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
