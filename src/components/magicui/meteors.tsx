"use client";

import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
}

function symmetricMeteors(n: number): Meteor[] {
  const out: Meteor[] = [];
  let id = 0;
  const pairs = Math.floor(n / 2);
  for (let i = 0; i < pairs; i++) {
    const top = pairs <= 1 ? "42%" : `${10 + (i * 72) / Math.max(pairs - 1, 1)}%`;
    const inset = 7 + (i % 5) * 8;
    const delay = `${(i * 1.05).toFixed(2)}s`;
    const duration = `${(4.4 + (i % 4) * 0.35).toFixed(2)}s`;
    out.push({ id: id++, top, left: `${inset}%`, delay, duration });
    out.push({ id: id++, top, left: `${100 - inset}%`, delay, duration });
  }
  if (out.length < n) {
    out.push({
      id: id++,
      top: "38%",
      left: "50%",
      delay: "0.4s",
      duration: "5.2s",
    });
  }
  return out.slice(0, n);
}

/** Deterministic “random” — aynı seed her zaman aynı meteorlar (SSR = CSR, Strict Mode güvenli). */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashToSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededMeteors(n: number, seed: number): Meteor[] {
  const rnd = mulberry32(seed || 1);
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    top: `${rnd() * 100}%`,
    left: `${rnd() * 100}%`,
    delay: `${(rnd() * 6).toFixed(2)}s`,
    duration: `${(rnd() * 6 + 3).toFixed(2)}s`,
  }));
}

interface MeteorsProps {
  number?: number;
  className?: string;
  /** Sol/sağ çiftler — aynı yükseklik ve gecikme; bölüm sınırlarında asimetrik görünümü önler */
  symmetric?: boolean;
}

export function Meteors({ number = 18, className, symmetric = false }: MeteorsProps) {
  const reactId = useId();

  const meteors = useMemo(() => {
    if (symmetric) return symmetricMeteors(number);
    const seed = hashToSeed(`${reactId}-${number}`);
    return seededMeteors(number, seed);
  }, [reactId, number, symmetric]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 isolate overflow-hidden", className)}
      aria-hidden
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className={cn(
            "pointer-events-none absolute h-px w-px rotate-[215deg] animate-meteor rounded-full will-change-transform",
            "bg-zinc-400 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
            "before:absolute before:top-1/2 before:h-px before:w-[80px]",
            "before:-translate-y-1/2 before:bg-gradient-to-r",
            "before:from-transparent before:to-zinc-500/45 dark:before:to-white/60",
          )}
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
