"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const firstName = PROFILE.name.split(" ")[0].toUpperCase();

  useEffect(() => {
    // Attempt autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound blocked, we fallback to muted autoplay in the JSX
      });
    }

    const unlockSound = () => {
      if (videoRef.current && isMuted) {
        setIsMuted(false);
        setIsPlaying(true);
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("keydown", unlockSound);
    window.addEventListener("touchend", unlockSound);

    // Pause video when hero is mostly out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio < 0.35) {
          videoRef.current?.pause();
        } else {
          videoRef.current?.play().catch(() => {
            // Ignore autoplay blocking errors
          });
        }
      },
      { threshold: 0.35 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
      observer.disconnect();
    };
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section ref={heroRef} id="hero" className="relative w-full h-[min(96svh,1040px)] flex items-center justify-center overflow-hidden pt-20">
      {/* Giant Ghost Word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <span 
          className="text-[25vw] font-bold tracking-tighter opacity-10 text-transparent"
          style={{ WebkitTextStroke: "1px var(--ink)" }}
        >
          {firstName}
        </span>
      </div>

      {/* Video */}
      <div className="relative z-10 w-full max-w-3xl aspect-[768/960] md:h-[min(80svh,800px)] md:w-auto overflow-hidden bg-white/5" style={{ mixBlendMode: 'multiply' }}>
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
          preload="auto"
        >
          {/* Fallbacks, webm first for better compression if available */}
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-[10%] left-[var(--gutter)] right-[var(--gutter)] flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            {PROFILE.role.split(" ").map((word, i, arr) => 
              i === arr.length - 1 ? (
                <span key={i} className="font-[family-name:var(--font-instrument)] italic text-[var(--mute)]"> {word}</span>
              ) : (
                <span key={i}> {word}</span>
              )
            )}
          </h1>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="px-6 py-3 bg-[var(--ink)] text-white rounded-full font-medium hover:bg-[var(--ink-2)] transition-colors">
              Explore work
            </a>
            <a href="#contact" className="px-6 py-3 border border-[var(--line)] rounded-full font-medium hover:bg-black/5 transition-colors">
              Let's talk
            </a>
            <a href={PROFILE.resumePath} download className="px-6 py-3 border border-[var(--line)] rounded-full font-medium hover:bg-black/5 transition-colors group">
              Résumé <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
            </a>
          </div>
        </div>

        {/* Audio Control */}
        <button 
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="relative pointer-events-auto mt-6 md:mt-0 w-12 h-12 rounded-full bg-[var(--ink)] flex items-center justify-center text-white transition-transform hover:scale-105"
        >
          {isMuted && (
             <span className="absolute inset-0 rounded-full border border-[var(--ink)] animate-ping opacity-20" />
          )}
          {isMuted ? (
             <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
               <path d="M0 0L14 8L0 16V0Z" />
             </svg>
          ) : (
             <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
               <rect x="0" y="0" width="4" height="16" />
               <rect x="10" y="0" width="4" height="16" />
             </svg>
          )}
        </button>
      </div>
    </section>
  );
}
