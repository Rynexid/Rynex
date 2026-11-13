"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Sparkline() {
  return (
    <svg width="150" height="34" viewBox="0 0 150 34" fill="none" className="mt-2.5">
      <polyline points="0,26 20,22 40,24 60,14 80,17 100,8 120,11 150,4" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="0,26 20,22 40,24 60,14 80,17 100,8 120,11 150,4 150,34 0,34" fill="url(#sg)" opacity="0.18" stroke="none" />
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /></linearGradient></defs>
    </svg>
  );
}

export function HeroCardStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const stage = stageRef.current;
    const stack = stackRef.current;
    if (!stage || !stack) return;
    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    stack.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
      const d = parseFloat(el.dataset.depth ?? "0.5");
      const tx = parseFloat(el.dataset.tx ?? "0");
      const ty = parseFloat(el.dataset.ty ?? "0");
      const rot = parseFloat(el.dataset.rot ?? "0");
      el.style.transform =
        `translate3d(calc(${tx}px + ${(px * 22 * d).toFixed(2)}px), calc(${ty}px + ${(py * 16 * d).toFixed(2)}px), 0) rotate(${(rot + px * 3 * d).toFixed(2)}deg)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    stackRef.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((el) => {
      el.style.transform = `translate3d(${el.dataset.tx}px, ${el.dataset.ty}px, 0) rotate(${el.dataset.rot}deg)`;
    });
  }, []);

  useEffect(() => { onLeave(); }, [onLeave]);

  return (
    <motion.div
      ref={stageRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      className="relative hidden w-full lg:block"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/*
        Container sizing note:
        - height bumped 440 -> 480 to give the fanned cards more breathing room
        - overflow-visible + pt/pl kept so cards with negative offsets
          (rating, terminal) aren't clipped
      */}
      <div ref={stackRef} className="relative mx-auto overflow-visible pt-4 pl-12" style={{ width: "min(560px, 100%)", height: 480 }}>

        {/*
          Floating tag bubbles — each one is now its OWN independent
          data-card element (not grouped in one box anymore), scattered
          into the open pockets of space around the other 4 cards rather
          than clustered together in one corner. Each has a slightly
          different depth so they don't all move in perfect unison —
          that's what keeps this feeling organic instead of mechanical.

          Placement logic (so future edits don't reintroduce collisions):
            - main card occupies      x: 52–392,  y: 44–274
            - rating card occupies    x: -40–132, y: 6–126
            - metric card occupies    x: 255–451, y: 175–315
            - terminal card occupies  x: -20–240, y: 300–440
          Every tag below sits in the leftover space between those boxes.
        */}
        {/*
          Floating tag bubbles — arranged in a deliberate ring/hexagon
          around the outside of the card cluster (top, upper-right, right,
          lower-right, bottom, left) instead of being scattered at
          random-looking positions. This is what makes it read as an
          intentional orbit rather than clutter.
        */}
        {[
          { label: "Fintech",     tx: 300, ty: 8,   rot: -2, depth: 0.3  }, // top, hugging main card's top edge
          { label: "SaaS",        tx: 448, ty: 68,  rot: 4,  depth: 0.32 }, // upper-right, hugging main/metric
          { label: "Cloud Infra", tx: 462, ty: 258, rot: 3,  depth: 0.36 }, // right, hugging metric card's edge
          { label: "Healthcare",  tx: 405, ty: 396, rot: -3, depth: 0.34 }, // lower-right, just past terminal
          { label: "API Systems", tx: 225, ty: 428, rot: 2,  depth: 0.3  }, // bottom, just under terminal
          { label: "Real-time",   tx: -55, ty: 188, rot: -2, depth: 0.32 }, // left, gap between rating and terminal
          { label: "Company Profile", tx: 220, ty: 340, rot: -1, depth: 0.28, large: true },
        ].map((t) => (
          <span
            key={t.label}
            data-card data-depth={t.depth} data-tx={t.tx} data-ty={t.ty} data-rot={t.rot}
            className={`absolute z-[1] rounded-full border border-white/[0.10] bg-white/[0.07] font-mono text-white/70 backdrop-blur-md will-change-[transform] ${t.large ? "px-4 py-2 text-[14px]" : "px-2.5 py-1 text-[10px]"}`}
            style={{ transform: `translate3d(${t.tx}px, ${t.ty}px, 0) rotate(${t.rot}deg)`, transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
          >
            {t.label}
          </span>
        ))}

        {/*
          Card 2b — Build Status (new)
          Small filler card sitting just above the Uptime metric card,
          in what used to be an empty gap. Ties into the same
          deploy/CI-CD theme as the terminal card below.
        */}
        <div
          data-card data-depth="0.5" data-tx="268" data-ty="102" data-rot="4"
          className="absolute z-[2] w-[164px] rounded-[16px] border border-white/[0.08] bg-white/[0.07] px-3.5 py-3 shadow-[0_14px_30px_rgba(0,0,0,.3)] backdrop-blur-md will-change-[transform]"
          style={{ transform: "translate3d(268px, 102px, 0) rotate(4deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399]" />
            </span>
            <span className="font-mono text-[10px] font-semibold text-white/70">Build #482</span>
          </div>
          <div className="mt-1.5 font-mono text-[10.5px] text-[#34d399]">✓ Passed &middot; 2m ago</div>
        </div>

        {/*
          Card 2 — Uptime Metric
          Moved down/right slightly (ty 150 -> 175, tx 235 -> 255) so it
          clears the now-smaller tag cloud above it with a real gap
          instead of touching/overlapping it.
        */}
        <div
          data-card data-depth="0.45" data-tx="255" data-ty="175" data-rot="6"
          className="absolute z-[2] w-[196px] rounded-[18px] border border-white/[0.08] bg-white/[0.06] p-4 shadow-[0_18px_40px_rgba(0,0,0,.3)] backdrop-blur-md will-change-[transform]"
          style={{ transform: "translate3d(255px, 175px, 0) rotate(6deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        >
          <div className="flex items-baseline gap-0.5 text-[26px] font-extrabold tracking-tight text-white">
            99.98<span className="text-[13px] font-bold text-[#7dd3fc]">%</span>
          </div>
          <div className="mt-0.5 text-[11px] text-[#8194b3]">Uptime &middot; last 90 days</div>
          <Sparkline />
        </div>

        {/* Decorative glow bubble — sits between terminal and metric cards */}
        <div
          data-card data-depth="0.25" data-tx="195" data-ty="310" data-rot="0"
          className="absolute z-[1] h-[72px] w-[72px] rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/10 shadow-[0_0_40px_rgba(59,130,246,.15)] backdrop-blur-xl will-change-[transform]"
          style={{ transform: "translate3d(195px, 310px, 0) rotate(0deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        />
        <div
          data-card data-depth="0.22" data-tx="100" data-ty="148" data-rot="0"
          className="absolute z-[1] h-[48px] w-[48px] rounded-full bg-gradient-to-br from-[#60a5fa]/15 to-[#a78bfa]/10 shadow-[0_0_30px_rgba(96,165,250,.12)] backdrop-blur-lg will-change-[transform]"
          style={{ transform: "translate3d(100px, 148px, 0) rotate(0deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        />

        {/* Card 3 — Terminal */}
        <div
          data-card data-depth="0.6" data-tx="-20" data-ty="258" data-rot="-4"
          className="absolute z-[3] w-[260px] overflow-hidden rounded-[14px] border border-white/[0.1] bg-[#1a1a2e] shadow-[0_22px_50px_rgba(0,0,0,.4)] backdrop-blur-md will-change-[transform]"
          style={{ transform: "translate3d(-20px, 258px, 0) rotate(-4deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#16162a] px-3.5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,.4)]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,.4)]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,.4)]" />
            <span className="ml-1 font-mono text-[9.5px] text-[#7f93b8]">terminal &mdash; zsh</span>
          </div>
          <div className="p-4 font-mono text-xs leading-[1.9]">
            <div className="text-[#e2e8f0]"><span className="text-[#7dd3fc]">$ </span>rynex deploy --prod</div>
            <div className="text-[#34d399]">✓ services compiled</div>
            <div className="text-[#34d399]">✓ production ready</div>
            <div className="text-[#7dd3fc]">→ systems online</div>
          </div>
        </div>

        {/* Card 4 — Rating */}
        <div
          data-card data-depth="0.8" data-tx="-40" data-ty="6" data-rot="-7"
          className="absolute z-[4] w-[172px] rounded-[18px] border border-white/[0.08] bg-white/[0.09] p-4 shadow-[0_20px_44px_rgba(0,0,0,.25)] backdrop-blur-lg will-change-[transform]"
          style={{ transform: "translate3d(-40px, 6px, 0) rotate(-7deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[26px] font-extrabold leading-none text-white">4.8</span>
            <span className="text-[14px] leading-none tracking-[1px] text-[#fbbf24]">★★★★★</span>
          </div>
          <div className="mt-2 text-[11px] font-medium text-white/50">Average Project Rating</div>
        </div>

        {/*
          Card 5 — Main Headline
          Shifted slightly right (tx 36 -> 52) and down (ty 34 -> 44) —
          this, combined with the rating card moving further left/up,
          is what creates the clean peek instead of a near-total cover.
        */}
        <div
          data-card data-depth="1" data-tx="52" data-ty="44" data-rot="-1.5"
          className="absolute z-[5] w-[372px] rounded-[20px] border border-white/[0.08] bg-white/[0.08] p-8 shadow-[0_30px_60px_rgba(0,0,0,.3)] backdrop-blur-xl will-change-[transform]"
          style={{ transform: "translate3d(52px, 44px, 0) rotate(-1.5deg)", transition: "transform .5s cubic-bezier(.16,.8,.3,1)" }}
        >
          <div className="mb-4 flex gap-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-[#3b82f6]" />
            <span className="h-[7px] w-[7px] rounded-full bg-white opacity-25" />
            <span className="h-[7px] w-[7px] rounded-full bg-white opacity-10" />
          </div>
          <div className="mb-4 text-[13px] font-bold tracking-[0.16em] text-white/40 uppercase">Web Experience</div>
          <h2 className="mb-6 text-[36px] leading-[1.2] font-extrabold tracking-tight text-white">
            A digital product<br />people want to use.
          </h2>
          <button className="inline-flex items-center gap-2 rounded-[10px] bg-white/10 px-5 py-3 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
            Explore platform <span className="font-bold">→</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}