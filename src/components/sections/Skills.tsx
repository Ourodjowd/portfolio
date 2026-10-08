"use client";

import { useState } from "react";
import { SKILL_GROUPS } from "@/lib/data";

export default function Skills() {
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [inspectedSkill, setInspectedSkill] = useState<any | null>(null);

  const allSkills = SKILL_GROUPS.flatMap(group => 
    group.skills.map((s, index) => ({ ...s, family: group.family, index: index + 1 }))
  );

  return (
    <section id="skills" className="relative w-full py-[var(--gutter)] px-[var(--gutter)] min-h-screen bg-[var(--paper)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-16">
          <div className="text-sm font-[family-name:var(--font-mono)] text-[var(--mute)] mb-4">
            02 — The Periodic Table of my Stack
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
            Tools of the <span className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]">trade.</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 relative">
          {/* Periodic Table Grid */}
          <div className="flex-1">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button 
                onClick={() => setActiveFamily(null)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${!activeFamily ? 'bg-[var(--ink)] text-white' : 'border border-[var(--line)] text-[var(--mute)] hover:bg-black/5'}`}
              >
                All
              </button>
              {SKILL_GROUPS.map(group => (
                <button
                  key={group.family}
                  onClick={() => setActiveFamily(group.family)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeFamily === group.family ? 'bg-[var(--ink)] text-white' : 'border border-[var(--line)] text-[var(--mute)] hover:bg-black/5'}`}
                >
                  {group.family}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 rv">
              {allSkills.map((skill, i) => {
                const isDimmed = activeFamily && skill.family !== activeFamily;
                const row = Math.floor(i / 8);
                const col = i % 8;
                return (
                  <button
                    key={skill.name}
                    onMouseEnter={() => setInspectedSkill(skill)}
                    onFocus={() => setInspectedSkill(skill)}
                    className={`aspect-square p-2 border border-[var(--line)] bg-white rounded-lg flex flex-col justify-between items-start text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--ink)] ${isDimmed ? 'opacity-30 scale-95' : 'opacity-100'}`}
                    style={{ animationDelay: `${(row + col) * 40}ms` }}
                  >
                    <div className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--faint)]">{skill.index}</div>
                    <div>
                      <div className="text-xl font-bold leading-none mb-1">{skill.symbol}</div>
                      <div className="text-[10px] text-[var(--mute)] truncate w-full">{skill.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="w-full md:w-[320px] shrink-0 sticky top-[120px] h-fit p-8 rounded-[24px] bg-white border border-[var(--line)] shadow-sm rv">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--mute)] mb-8">Inspector</h3>
            {inspectedSkill ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-32 h-32 mb-6 bg-[var(--soft)] rounded-2xl flex items-center justify-center text-4xl font-bold border border-[var(--line)]">
                  {inspectedSkill.symbol}
                </div>
                <h4 className="text-3xl font-bold tracking-tight mb-2">{inspectedSkill.name}</h4>
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--soft)] text-xs font-medium mb-6">
                  {inspectedSkill.family}
                </div>
                
                <p className="text-sm text-[var(--mute)]">
                  Hover over the elements in the table to inspect their properties.
                </p>
              </div>
            ) : (
              <div className="text-sm text-[var(--faint)] h-full flex flex-col items-center justify-center text-center pt-12 pb-12">
                <div className="w-12 h-12 mb-4 rounded-full border border-dashed border-[var(--faint)]"></div>
                Select an element to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
