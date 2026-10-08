"use client";

import { useEffect, useRef } from "react";

// ─── Card data for the fan ──────────────────────────────────────────────────
const ORBIT_CARDS = [
  {
    id: "oc1",
    label: "Full Stack",
    sub: "Development",
    tag: "WEB",
    color: "#f40b0bff",
  },
  {
    id: "oc2",
    label: "Machine",
    sub: "Learning",
    tag: "AI",
    color: "#000000ff",
  },
  {
    id: "oc3",
    label: "Data",
    sub: "Analytics",
    tag: "INSIGHT",
    color: "#e2ea11ff",
  },
  {
    id: "oc4",
    label: "Motion",
    sub: "Design",
    tag: "UX",
    color: "#0ae90eff",
  },
  {
    id: "oc5",
    label: "Finance",
    sub: "Trader",
    tag: "INFRA",
    color: "#0e0ee9ff",
  },
  {
    id: "oc6",
    label: "Business Analytics",
    sub: "MBA",
    tag: "OSS",
    color: "#162447",
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────
const CARD_W = 200;
const CARD_H = 280;
const RADIUS = 520;    // orbit radius

export default function OrbitBackground() {
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = document.getElementById(
      "orbit-bg-canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // ─── Curved arc decoration at bottom ───
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = "#0d0d0d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(W / 2, H + RADIUS * 0.25, RADIUS, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      // Inner arc
      ctx.beginPath();
      ctx.arc(W / 2, H + RADIUS * 0.25, RADIUS - 40, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
      ctx.restore();

      const n = ORBIT_CARDS.length;
      const cx = W / 2;
      const cy = H + RADIUS * 0.25;

      offsetRef.current += 0.08; // degrees per frame — slow orbit

      ORBIT_CARDS.forEach((card, i) => {
        // Distribute cards evenly around the full 360° circle
        const baseAngle = (360 / n) * i;
        const angleDeg = baseAngle + offsetRef.current;
        const angleRad = (angleDeg * Math.PI) / 180;

        const x = cx + RADIUS * Math.cos(angleRad) - CARD_W / 2;
        const y = cy + RADIUS * Math.sin(angleRad) - CARD_H / 2;

        // Only draw cards that are in the visible arc (top half of orbit)
        const normalizedAngle = ((angleDeg % 360) + 360) % 360;
        // Cards between 180° and 360° are in the top arc (visible)
        const isVisible = normalizedAngle > 180 && normalizedAngle < 360;
        if (!isVisible) return;

        // Fade cards in/out at edges of visible arc
        const midAngle = 270; // top center
        const distFromCenter = Math.abs(normalizedAngle - midAngle);
        const edgeFade = Math.max(0, 1 - distFromCenter / 80);

        const rotRad = angleRad + Math.PI / 2;

        ctx.save();
        ctx.translate(x + CARD_W / 2, y + CARD_H / 2);
        ctx.rotate(rotRad);

        const baseOpacity = 0.5 + 0.5 * edgeFade;
        const breathe = Math.sin(Date.now() / 4000 + i * 1.2) * 0.05;
        const opacity = baseOpacity + breathe;

        // Shadow
        ctx.shadowColor = `rgba(0,0,0,${0.12 * edgeFade})`;
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 16;

        // Card body
        ctx.globalAlpha = opacity;
        roundRect(ctx, -CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H, 22);
        ctx.fillStyle = card.color;
        ctx.fill();

        // Glass sheen gradient on top half
        const grad = ctx.createLinearGradient(
          -CARD_W / 2, -CARD_H / 2,
          -CARD_W / 2, 0
        );
        grad.addColorStop(0, "rgba(255,255,255,0.14)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        roundRect(ctx, -CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H / 2, 22, 0, 0, 0);
        ctx.fill();

        // Clear shadow for text rendering
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // Tag pill
        ctx.globalAlpha = opacity * 2;
        ctx.fillStyle = "rgba(255,255,255,0.13)";
        roundRect(ctx, -CARD_W / 2 + 16, -CARD_H / 2 + 16, 54, 22, 11);
        ctx.fill();

        ctx.globalAlpha = opacity * 3.5;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText(card.tag, -CARD_W / 2 + 24, -CARD_H / 2 + 30);

        // Bold labels at bottom
        ctx.globalAlpha = opacity * 3.5;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px 'Inter Tight', Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(card.label, -CARD_W / 2 + 16, CARD_H / 2 - 54);
        ctx.fillText(card.sub, -CARD_W / 2 + 16, CARD_H / 2 - 24);

        // Separator line
        ctx.globalAlpha = opacity * 2;
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-CARD_W / 2 + 16, CARD_H / 2 - 14);
        ctx.lineTo(CARD_W / 2 - 16, CARD_H / 2 - 14);
        ctx.stroke();

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      id="orbit-bg-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}


// ─── Helper: rounded rect path ───────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  tlr: number,
  trr = tlr,
  brr = tlr,
  blr = tlr
) {
  ctx.beginPath();
  ctx.moveTo(x + tlr, y);
  ctx.lineTo(x + w - trr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + trr);
  ctx.lineTo(x + w, y + h - brr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - brr, y + h);
  ctx.lineTo(x + blr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - blr);
  ctx.lineTo(x, y + tlr);
  ctx.quadraticCurveTo(x, y, x + tlr, y);
  ctx.closePath();
}
