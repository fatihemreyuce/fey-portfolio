"use client";

import { useRef, useState, useEffect } from "react";
import { getLevel, type Skill } from "@/data/skills";

interface Props {
  skills: Skill[];
  accent: { from: string; to: string };
}

export function SkillBarsClient({ skills, accent }: Props) {
  const ref               = useRef<HTMLDivElement>(null);
  const [started, setS]   = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setS(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {skills.map((skill, i) => {
        const lvl = getLevel(skill.level);
        return (
          <div
            key={skill.name}
            className="group p-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-200"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3 gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{skill.name}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5 line-clamp-2">
                  {skill.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Years */}
                <span className="text-[10px] text-zinc-600 border border-white/[0.06] px-2 py-0.5 rounded-md">
                  {skill.years}y
                </span>
                {/* Level badge */}
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    color:      lvl.color,
                    background: `${lvl.color}18`,
                    border:     `1px solid ${lvl.color}30`,
                  }}
                >
                  {lvl.label}
                </span>
              </div>
            </div>

            {/* Bar */}
            <div className="relative h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all"
                style={{
                  width:           started ? `${skill.level}%` : "0%",
                  transitionDuration: "1.2s",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.1, 0.64, 1)",
                  transitionDelay: `${i * 100}ms`,
                  background:      `linear-gradient(90deg, ${skill.color}90, ${skill.color})`,
                  boxShadow:       `0 0 10px ${skill.color}50`,
                }}
              />
              {/* Percentage label at end of bar */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-full transition-all"
                style={{
                  left:       started ? `calc(${skill.level}% - 4px)` : "0%",
                  transitionDuration: "1.2s",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span
                  className="text-[9px] font-bold pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
