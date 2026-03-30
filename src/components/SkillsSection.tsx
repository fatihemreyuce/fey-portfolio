"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { skillCategories, getLevel, type SkillCategory } from "@/data/skills";
import { useI18n } from "@/components/I18nProvider";
import { withLocale } from "@/i18n/withLocale";
import { readableOnLightSurface } from "@/lib/utils";

/* ─── SkillBar ───────────────────────────────────────── */

function SkillBar({
  name,
  level,
  color,
  started,
  delay,
  locale,
}: {
  name: string;
  level: number;
  color: string;
  started: boolean;
  delay: number;
  locale: "tr" | "en";
}) {
  const lvl = getLevel(level);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDarkMode(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const barColor = isDarkMode ? color : readableOnLightSurface(color);
  const levelLabel =
    locale === "en"
      ? level >= 90
        ? "Expert"
        : level >= 75
          ? "Advanced"
          : level >= 55
            ? "Intermediate"
            : "Beginner"
      : lvl.label;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="min-w-0 flex-1 font-medium text-zinc-700 dark:text-zinc-300">
          {name}
        </span>
        <span
          className="shrink-0 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
          style={{
            color: barColor,
            background: `${barColor}1f`,
            border:     `1px solid ${barColor}45`,
          }}
        >
          {levelLabel}
        </span>
      </div>
      {/* Track */}
      <div className="relative h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/[0.06]">
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{
            width:           started ? `${level}%` : "0%",
            transitionDuration: "1.1s",
            transitionTimingFunction: "cubic-bezier(0.34, 1.2, 0.64, 1)",
            transitionDelay: `${delay}ms`,
            background:      `linear-gradient(90deg, ${barColor}cc, ${barColor})`,
            boxShadow:       `0 0 10px ${barColor}75`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── CategoryCard ───────────────────────────────────── */

function CategoryCard({
  category,
  started,
  index,
  footerLabel,
  locale,
}: {
  category: SkillCategory;
  started: boolean;
  index: number;
  footerLabel: string;
  locale: "tr" | "en";
}) {
  const cardRef             = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]     = useState({ x: 0, y: 0 });
  const [hovered, setHov]   = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -6,
      y: ((e.clientX - cx) / (rect.width  / 2)) *  6,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHov(false);
  }, []);

  const Icon = category.icon;
  const previewSkills = category.skills.slice(0, 4);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-md backdrop-blur-sm dark:border-white/[0.07] dark:bg-zinc-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      style={{
        transform:      `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition:     hovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
        ...(hovered
          ? {
              boxShadow: `0 20px 60px ${category.accent.from}22, 0 0 0 1px ${category.accent.from}28`,
            }
          : {}),
      }}
    >
      {/* Meteors on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={5} />
      </div>

      {/* Hover bg tint */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${category.accent.from}12, transparent 55%, ${category.accent.to}10)`,
        }}
      />

      {/* ── Header strip ── */}
      <div
        className="relative h-24 overflow-hidden flex items-center px-5"
        style={{
          background: `linear-gradient(135deg, ${category.accent.from}28, ${category.accent.to}14)`,
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl opacity-25 animate-glow-pulse"
          style={{ background: category.accent.to }}
        />

        <div className="relative z-10 flex items-center w-full">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/15 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${category.accent.from}55, ${category.accent.to}55)`,
              boxShadow:  `0 0 20px ${category.accent.from}40`,
            }}
          >
            <Icon className="h-5 w-5 !text-white" />
          </div>
        </div>
      </div>

      {/* ── Body — flex-1 + spacer: skill satırları altta hizalı, kartlar eş yükseklik */}
      <div
        className="flex min-h-0 flex-1 flex-col gap-4 p-5"
        style={{ transform: "translateZ(10px)" }}
      >
        <div className="shrink-0">
          <h3 className="mb-1 text-base font-bold text-zinc-900 dark:text-white">{category.title}</h3>
          <p className="line-clamp-3 min-h-[3.25rem] text-xs leading-relaxed text-zinc-600 dark:text-zinc-500">
            {category.shortDesc}
          </p>
        </div>

        <div className="min-h-0 flex-1" />

        <div className="shrink-0 space-y-3">
          {previewSkills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              started={started}
              delay={index * 80 + i * 120}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 pb-5 pt-0 shrink-0">
        <Link
          href={withLocale(`/skills/${category.id}`, locale)}
          className="group/btn flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 transition-all duration-200 hover:border-zinc-300 hover:bg-white dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/15 dark:hover:bg-white/[0.07]"
        >
          <span className="text-xs font-semibold text-zinc-600 transition-colors group-hover/btn:text-zinc-900 dark:text-zinc-400 dark:group-hover/btn:text-white">
            {footerLabel}
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-zinc-500 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-zinc-900 dark:text-zinc-600 dark:group-hover/btn:text-white"
          />
        </Link>
      </div>

      {/* Specular shine */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          opacity:    hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ─── SkillsSection ──────────────────────────────────── */

export function SkillsSection() {
  const { dict, locale } = useI18n();
  const ref               = useRef<HTMLElement>(null);
  const [visible, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* total skill count across all categories */
  const totalSkills = skillCategories.reduce((s, c) => s + c.skills.length, 0);
  const localizedCategories = locale === "en"
    ? skillCategories.map((c) => {
        if (c.id === "frontend") {
          return {
            ...c,
            shortDesc: "Modern, accessible, and high-performance user interfaces.",
          };
        }
        if (c.id === "backend") {
          return {
            ...c,
            title: "Backend",
            shortDesc: "Learning REST and data layers with Kotlin and Spring Boot step by step.",
          };
        }
        if (c.id === "araclar") {
          return {
            ...c,
            title: "Tools & DevOps",
            shortDesc: "Tooling and infrastructure knowledge that accelerates development workflows.",
          };
        }
        if (c.id === "diger") {
          return {
            ...c,
            title: "Other",
            shortDesc: "Beyond code: analytical thinking and problem solving.",
            skills: c.skills.map((s) => ({
              ...s,
              name: s.name === "İngilizce" ? "English" : s.name === "Algoritma" ? "Algorithms" : s.name,
            })),
          };
        }
        return c;
      })
    : skillCategories;

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
            backgroundSize:  "30px 30px",
          }}
        />
        <Meteors number={14} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div
          className="text-center space-y-5 mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "none" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-[0.18em] uppercase">
              {dict.skills.badge}
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">{dict.skills.titleTop}</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              {dict.skills.titleGradient}
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {totalSkills}+ {dict.skills.description}
          </p>
        </div>

        {/* ── Category cards grid ── */}
        <div className="grid items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {localizedCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="h-full min-h-0"
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "none" : "translateY(36px)",
                transition: `opacity 0.55s ease ${0.1 + i * 0.1}s, transform 0.55s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <CategoryCard category={cat} started={visible} index={i} footerLabel={dict.skills.cardFooter} locale={locale} />
            </div>
          ))}
        </div>

        {/* ── Bottom hint ── */}
        <div
          className="flex justify-center mt-12"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.55s",
          }}
        >
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Sparkles className="w-4 h-4 text-emerald-500/60" />
            <span>{dict.skills.discover}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
