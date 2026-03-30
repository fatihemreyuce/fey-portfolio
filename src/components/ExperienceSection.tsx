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
import { useI18n } from "@/components/I18nProvider";

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
    title: "Donanım Stajyeri",
    organization: "Özel Adem Ceylan Final Teknik Koleji (Staj)",
    period: "2023 — 2024",
    location: "İstanbul",
    description:
      "Lise döneminde yaptığım staj donanım odaklıydı. Bilgisayar donanımı kurulumu, arıza tespiti, bakım ve teknik destek süreçlerinde aktif rol aldım.",
    tags: ["Bilgisayar Donanımı", "Arıza Tespiti", "Bakım", "Teknik Destek"],
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
      "İstanbul Gedik Üniversitesinde Yazılım Mühendisliği lisans eğitimime devam ediyorum. Veri yapıları, algoritmalar, nesne yönelimli programlama ve yazılım mimarisi konularında aktif öğrenim sürecindeyim.",
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
    location: "Kocaeli",
    description:
      "2020-2024 arasında Özel Adem Ceylan Final Teknik Kolejinde yazılım odaklı bilişim eğitimi aldım. Programlama temelleri ve web geliştirme alanlarında kendimi geliştirdim.",
    tags: ["Yazılım Temelleri", "Web Geliştirme", "HTML/CSS", "JavaScript"],
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

const EN_BY_ID: Record<string, Pick<TimelineItem, "title" | "organization" | "location" | "description" | "tags">> = {
  internship: {
    title: "Hardware Intern",
    organization: "Adem Ceylan Final Technical College (Internship)",
    location: "Istanbul",
    description:
      "My internship during high school was hardware-focused. I worked on computer hardware setup, troubleshooting, maintenance, and technical support processes.",
    tags: ["Computer Hardware", "Troubleshooting", "Maintenance", "Technical Support"],
  },
  university: {
    title: "Software Engineering",
    organization: "Istanbul Gedik University",
    location: "Istanbul",
    description:
      "I am currently studying Software Engineering at Istanbul Gedik University. I am actively improving in data structures, algorithms, object-oriented programming, and software architecture.",
    tags: ["Algorithms", "Data Structures", "Software Eng.", "OOP"],
  },
  highschool: {
    title: "Information Technologies — Vocational High School",
    organization: "Adem Ceylan Final Technical College",
    location: "Kocaeli",
    description:
      "From 2020 to 2024, I received software-focused IT education at Adem Ceylan Final Technical College. I improved my skills in programming fundamentals and web development.",
    tags: ["Software Fundamentals", "Web Development", "HTML/CSS", "JavaScript"],
  },
};

/* ─── TimelineCard ───────────────────────────────────── */

function TimelineCard({
  item,
  visible,
  side,
  currentLabel,
}: {
  item: TimelineItem;
  visible: boolean;
  side: "left" | "right";
  currentLabel: string;
}) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-md backdrop-blur-sm transition-all duration-300 dark:border-white/[0.07] dark:bg-zinc-900/70 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? "none"
          : side === "left"
            ? "translateX(-32px)"
            : "translateX(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
        ...(hov
          ? {
              boxShadow: `0 16px 48px ${item.accent.from}20, 0 0 0 1px ${item.accent.from}25`,
            }
          : {}),
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${item.accent.from}35, ${item.accent.to}35)`,
              boxShadow:  `0 0 16px ${item.accent.from}30`,
            }}
          >
            <Icon className="h-5 w-5 text-white!" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-white">{item.title}</h3>
              {item.current && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  {currentLabel}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold mt-0.5" style={{ color: item.accent.from }}>
              {item.organization}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 shrink-0" />{item.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" />{item.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium dark:border-white/[0.07] dark:bg-white/4"
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
  const { locale } = useI18n();
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

  const localizedItems = locale === "en"
    ? items.map((i) => ({ ...i, ...EN_BY_ID[i.id] }))
    : items;
  const filtered = filter === "all" ? localizedItems : localizedItems.filter((i) => i.type === filter);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/4 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-3xl" />
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
              {locale === "en" ? "Experience & Education" : "Deneyim & Eğitim"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">{locale === "en" ? "My Journey and" : "Yolculuğum ve"}</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              {locale === "en" ? "Growth Story" : "Büyüme Hikayem"}
            </AnimatedGradientText>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {locale === "en"
              ? "The milestones, experiences, and education that shaped my software journey."
              : "Yazılım kariyerimde attığım adımlar, çalıştığım yerler ve aldığım eğitimler."}
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
          <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-slate-100 p-1 dark:border-white/[0.07] dark:bg-white/3">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setFil(value); setCV({}); }}
                className={cn(
                  "relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200",
                  filter === value
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300",
                )}
              >
                {filter === value && (
                  <span className="absolute inset-0 rounded-lg border border-zinc-300 bg-white dark:border-white/10 dark:bg-white/8" />
                )}
                <span className="relative">
                  {locale === "en"
                    ? value === "all"
                      ? "All"
                      : value === "experience"
                        ? "Experience"
                        : "Education"
                    : label}
                </span>
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
                        currentLabel={locale === "en" ? "Current" : "Güncel"}
                      />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center pt-4">
                    <div
                      className={cn(
                        "z-10 h-3.5 w-3.5 rounded-full border-2 border-zinc-300 transition-all duration-500 dark:border-zinc-900",
                        !cardVis[item.id] && "bg-zinc-300 dark:bg-white/15",
                      )}
                      style={
                        cardVis[item.id]
                          ? {
                              background: item.accent.from,
                              boxShadow: `0 0 14px ${item.accent.from}80`,
                            }
                          : undefined
                      }
                    />
                  </div>

                  {/* Right slot */}
                  <div className={cn("hidden md:block", isLeft && "md:invisible")}>
                    {!isLeft && (
                      <TimelineCard
                        item={item}
                        visible={!!cardVis[item.id]}
                        side="right"
                        currentLabel={locale === "en" ? "Current" : "Güncel"}
                      />
                    )}
                  </div>

                  {/* Mobile: always show */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: item.accent.from, boxShadow: `0 0 8px ${item.accent.from}` }}
                      />
                      <div className="h-px flex-1 bg-zinc-200 dark:bg-white/6" />
                    </div>
                    <TimelineCard
                      item={item}
                      visible={!!cardVis[item.id]}
                      side="right"
                      currentLabel={locale === "en" ? "Current" : "Güncel"}
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
