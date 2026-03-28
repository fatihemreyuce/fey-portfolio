"use client";

import { useEffect, useState } from "react";
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
    const top =
      pairs <= 1 ? "42%" : `${10 + (i * 72) / (pairs - 1)}%`;
    const inset = 7 + (i % 5) * 8;
    const delay = `${(i * 1.05).toFixed(2)}s`;
    const duration = `${(4.4 + (i % 4) * 0.35).toFixed(2)}s`;
    out.push({ id: id++, top, left: `${inset}%`, delay, duration });
    out.push({ id: id++, top, left: `${100 - inset}%`, delay, duration });
  }
  if (out.length < n) {
    out.push({
      id: id++,
      top:  "38%",
      left: "50%",
      delay:    "0.4s",
      duration: "5.2s",
    });
  }
  return out.slice(0, n);
}

function randomMeteors(n: number): Meteor[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    top:      `${Math.random() * 100}%`,
    left:     `${Math.random() * 100}%`,
    delay:    `${(Math.random() * 6).toFixed(2)}s`,
    duration: `${(Math.random() * 6 + 3).toFixed(2)}s`,
  }));
}

interface MeteorsProps {
  number?: number;
  className?: string;
  /** Sol/sağ çiftler — aynı yükseklik ve gecikme; bölüm sınırlarında asimetrik görünümü önler */
  symmetric?: boolean;
}

export function Meteors({ number = 18, className, symmetric = false }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    setMeteors(symmetric ? symmetricMeteors(number) : randomMeteors(number));
  }, [number, symmetric]);

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className={cn(
            "pointer-events-none absolute h-px w-px rotate-[215deg] animate-meteor rounded-full",
            "bg-zinc-400 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
            "before:absolute before:top-1/2 before:h-px before:w-[80px]",
            "before:-translate-y-1/2 before:bg-gradient-to-r",
            "before:from-transparent before:to-white/60",
            className,
          )}
          style={{
            top:               m.top,
            left:              m.left,
            animationDelay:    m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </>
  );
}
