"use client";

import { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";

/* ─── data ──────────────────────────────────────────── */

type ItemType = "experience" | "education";

interface TimelineItem {
  id: string;
  type: ItemType;
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  current?: boolean;
  icon: LucideIcon;
  accent: { from: string; to: string };
}

const items: TimelineItem[] = [
  {
    id: "internship",
    type: "experience",
    title: "Yazılım Geliştirici Stajyeri",
    organization: "Şirket",
    period: "2023 — 2024",
    location: "Türkiye",
    description:
      "Meslek lisesi döneminde tamamladığım ilk stajım. Gerçek bir yazılım ortamında ekiple çalışarak HTML, CSS ve JavaScript temelleri üzerine projeler geliştirdim, versiyon kontrol süreçlerini öğrendim.",
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    current: false,
    icon: Briefcase,
    accent: { from: "#10b981", to: "#06b6d4" },
  },
  {
    id: "university",
    type: "education",
    title: "Yazılım Mühendisliği",
    organization: "İstanbul Gedik Üniversitesi",
    period: "2024 — 2028",
    location: "İstanbul",
    description:
      "Yazılım mühendisliği alanında lisans eğitimi. Veri yapıları, algoritmalar, nesne yönelimli programlama ve yazılım mimarisi konularında aktif öğrenim sürecindeyim.",
    tags: ["Algoritmalar", "Veri Yapıları", "Yazılım Müh.", "OOP"],
    current: true,
    icon: GraduationCap,
    accent: { from: "#f59e0b", to: "#ef4444" },
  },
  {
    id: "highschool",
    type: "education",
    title: "Bilişim Teknolojileri — Meslek Lisesi",
    organization: "Özel Adem Ceylan Final Teknik Koleji",
    period: "2020 — 2024",
    location: "Türkiye",
    description:
      "Bilişim teknolojileri alanında mesleki eğitim. Lise yıllarında programlamaya adım attım, web geliştirme öğrendim ve sektördeki ilk staj deneyimimi burada kazandım.",
    tags: ["HTML/CSS", "Python", "JavaScript", "Ağ Temelleri"],
    current: false,
    icon: BookOpen,
    accent: { from: "#14b8a6", to: "#84cc16" },
  },
];

const FILTERS = [
  { label: "Tümü",     value: "all"        },
  { label: "Deneyim",  value: "experience" },
  { label: "Eğitim",   value: "education"  },
] as const;

/* ─── TimelineCard ───────────────────────────────────── */

function TimelineCard({
  item,
  visible,
  side,
}: {
  item: TimelineItem;
  visible: boolean;
  side: "left" | "right";
}) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-sm overflow-hidden transition-all duration-300"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? "none"
          : side === "left"
            ? "translateX(-32px)"
            : "translateX(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
        boxShadow: hov
          ? `0 16px 48px ${item.accent.from}20, 0 0 0 1px ${item.accent.from}25`
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Hover bg tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.accent.from}0d, transparent)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accent.from}80, transparent)`,
          opacity: hov ? 1 : 0,
        }}
      />

      <div className="p-5 space-y-3.5">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${item.accent.from}35, ${item.accent.to}35)`,
              boxShadow:  `0 0 16px ${item.accent.from}30`,
            }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
              {item.current && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  Güncel
                </span>
              )}
            </div>
            <p className="text-xs font-semibold mt-0.5" style={{ color: item.accent.from }}>
              {item.organization}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />{item.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />{item.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.04]"
              style={{ color: item.accent.from }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ExperienceSection ──────────────────────────────── */

export function ExperienceSection() {
  const ref               = useRef<HTMLElement>(null);
  const [visible, setVis] = useState(false);
  const [filter, setFil]  = useState<"all" | "experience" | "education">("all");
  const [cardVis, setCV]  = useState<Record<string, boolean>>({});
  const cardRefs          = useRef<Map<string, HTMLDivElement>>(new Map());

  /* Section visibility */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Individual card visibility */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting)
            setCV((p) => ({ ...p, [id]: true }));
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [filter]);

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-24 overflow-hidden border-b border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize:  "30px 30px",
          }}
        />
        <Meteors number={14} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center space-y-5 mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "none" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-[0.18em] uppercase">
              Deneyim & Eğitim
            </span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">Yolculuğum ve</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              Büyüme Hikayem
            </AnimatedGradientText>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Yazılım kariyerimde attığım adımlar, çalıştığım yerler ve aldığım eğitimler.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex justify-center mb-12"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/[0.07] bg-white/[0.03]">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setFil(value); setCV({}); }}
                className={cn(
                  "relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  filter === value ? "text-white" : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {filter === value && (
                  <span className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/10" />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.3) 15%, rgba(99,102,241,0.3) 85%, transparent)" }}
          />

          <div className="space-y-8 md:space-y-12">
            {filtered.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(item.id, el);
                  }}
                  className="relative md:grid md:grid-cols-[1fr_32px_1fr] md:gap-6 items-start"
                >
                  {/* Left slot */}
                  <div className={cn("hidden md:block", !isLeft && "md:invisible")}>
                    {isLeft && (
                      <TimelineCard
                        item={item}
                        visible={!!cardVis[item.id]}
                        side="left"
                      />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center pt-4">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-zinc-900 transition-all duration-500 z-10"
                      style={{
                        background:  cardVis[item.id] ? item.accent.from : "rgba(255,255,255,0.15)",
                        boxShadow:   cardVis[item.id] ? `0 0 14px ${item.accent.from}80` : "none",
                      }}
                    />
                  </div>

                  {/* Right slot */}
                  <div className={cn("md:block", isLeft && "md:invisible hidden")}>
                    {(!isLeft || true) && (
                      <div className={cn(isLeft ? "hidden md:block" : "")}>
                        {!isLeft && (
                          <TimelineCard
                            item={item}
                            visible={!!cardVis[item.id]}
                            side="right"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Mobile: always show */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: item.accent.from, boxShadow: `0 0 8px ${item.accent.from}` }}
                      />
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <TimelineCard
                      item={item}
                      visible={!!cardVis[item.id]}
                      side="right"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
