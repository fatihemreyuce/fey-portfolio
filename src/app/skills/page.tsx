"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Cpu,
  ArrowUpRight,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Code2,
  Star,
  TrendingUp,
  BookOpen,
  Zap,
  Target,
  CheckCircle2,
  Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TypewriterGradientText } from "@/components/magicui/typewriter-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { skillCategories, getLevel, type SkillCategory } from "@/data/skills";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/components/I18nProvider";
import { withLocale } from "@/i18n/withLocale";

/* ─── constants ────────────────────────────────────── */

const HERO_PHRASES = [
  "Modern Web Teknolojileri",
  "Frontend Ekosistemi",
  "Backend & DevOps",
  "Sürekli Öğrenme",
] as const;

const LEVELS = [
  { label: "Uzman",       min: 90, color: "#34d399", icon: Award },
  { label: "İleri",       min: 75, color: "#60a5fa", icon: Star },
  { label: "Orta",        min: 55, color: "#fbbf24", icon: TrendingUp },
  { label: "Başlangıç",   min: 0,  color: "#f87171", icon: BookOpen },
] as const;

const ROADMAP = [
  { status: "done",     label: "React & Hooks",      color: "#34d399" },
  { status: "done",     label: "TypeScript",          color: "#34d399" },
  { status: "done",     label: "Next.js App Router",  color: "#34d399" },
  { status: "current",  label: "Spring Boot Backend", color: "#fbbf24" },
  { status: "current",  label: "PostgreSQL & ORM",    color: "#fbbf24" },
  { status: "next",     label: "Docker & CI/CD",      color: "#60a5fa" },
  { status: "next",     label: "Redis & Caching",     color: "#60a5fa" },
  { status: "future",   label: "Kubernetes",          color: "#a78bfa" },
  { status: "future",   label: "AWS / Cloud",         color: "#a78bfa" },
] as const;

/* ─── hooks ─────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ─── SkillBar (animated) ───────────────────────────── */

function SkillBar({ name, level, color, started, delay, years }: {
  name: string; level: number; color: string; started: boolean; delay: number; years: number;
}) {
  const lvl = getLevel(level);
  const [hov, setHov] = useState(false);
  return (
    <div className="space-y-1.5 group" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">{name}</span>
          {years > 0 && <span className="text-[10px] text-zinc-600">{years}y</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
            {lvl.label}
          </span>
          <span className="text-[10px] text-zinc-600 tabular-nums">{level}%</span>
        </div>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/[0.06]">
        <div className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{
            width: started ? `${level}%` : "0%",
            transitionDuration: "1.1s",
            transitionTimingFunction: "cubic-bezier(0.34,1.2,0.64,1)",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg,${color}aa,${color})`,
            boxShadow: hov ? `0 0 8px ${color}80` : `0 0 6px ${color}50`,
          }}
        />
        {/* Shimmer */}
        {started && hov && (
          <div className="absolute top-0 h-full w-8 animate-shimmer" style={{
            background: `linear-gradient(90deg,transparent,${color}40,transparent)`,
            backgroundSize: "200% auto",
            left: `${level - 8}%`,
          }} />
        )}
      </div>
    </div>
  );
}

/* ─── CategoryCard (3-D tilt, full skills) ──────────── */

function CategoryCard({ category, started, index, vis }: {
  category: SkillCategory; started: boolean; index: number; vis: boolean;
}) {
  const { locale } = useI18n();
  const cardRef           = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [hov, setHov]     = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * -5,
      y: ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) *  5,
    });
  }, []);

  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHov(false); }, []);
  const Icon = category.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-md backdrop-blur-sm dark:border-white/[0.07] dark:bg-zinc-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.01 : 1})`
          : "translateY(40px)",
        transition: vis ? (hov ? "transform 0.12s ease-out" : "transform 0.5s ease-out") : `opacity 0.55s ease ${0.1 + index * 0.12}s, transform 0.55s ease ${0.1 + index * 0.12}s`,
        transformStyle: "preserve-3d",
        ...(hov
          ? {
              boxShadow: `0 20px 60px ${category.accent.from}22, 0 0 0 1px ${category.accent.from}28`,
            }
          : {}),
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={5} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg,${category.accent.from}10,transparent 55%,${category.accent.to}08)` }} />

      {/* Header */}
      <div className="relative h-24 overflow-hidden flex items-center px-5"
        style={{ background: `linear-gradient(135deg,${category.accent.from}28,${category.accent.to}14)` }}>
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl opacity-25 animate-glow-pulse" style={{ background: category.accent.to }} />

        <div className="relative z-10 flex items-center justify-between w-full" style={{ transform: "translateZ(16px)" }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/15 shrink-0"
              style={{ background: `linear-gradient(135deg,${category.accent.from}55,${category.accent.to}55)`, boxShadow: `0 0 20px ${category.accent.from}40` }}>
              <Icon className="h-5 w-5 !text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{category.title}</h3>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-500">{category.skills.length} beceri</p>
            </div>
          </div>
          {/* Total level indicator */}
          <div className="text-right">
            <p className="text-lg font-black tabular-nums" style={{ color: category.accent.from }}>
              {Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length)}
            </p>
            <p className="text-[9px] text-zinc-600 uppercase tracking-wider">ort.</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 space-y-4" style={{ transform: "translateZ(10px)" }}>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-500">{category.shortDesc}</p>

        <div className="flex-1 space-y-3.5">
          {category.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              years={skill.years}
              started={started}
              delay={index * 60 + i * 110}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        <Link href={withLocale(`/skills/${category.id}`, locale)}
          className="group/btn flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 transition-all duration-200 hover:border-zinc-300 hover:bg-white dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/15 dark:hover:bg-white/[0.07]">
          <span className="text-xs font-semibold text-zinc-600 transition-colors group-hover/btn:text-zinc-900 dark:text-zinc-400 dark:group-hover/btn:text-white">Detaylı incele</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-zinc-900 dark:text-zinc-600 dark:group-hover/btn:text-white" />
        </Link>
      </div>

      {/* Specular */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.07) 0%,transparent 60%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />
    </div>
  );
}

/* ─── Level Legend Card ─────────────────────────────── */

function LevelLegend({ vis }: { vis: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
      {LEVELS.map(({ label, color, icon: Icon }, i) => {
        const skills = skillCategories.flatMap((c) => c.skills).filter((s) => {
          const l = getLevel(s.level);
          return l.label === label;
        });
        return (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.03]"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(16px)", transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color }}>{label}</p>
              <p className="text-[10px] text-zinc-600">{skills.length} teknoloji</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Roadmap Section ───────────────────────────────── */

function RoadmapSection() {
  const { ref, vis } = useInView(0.08);

  const STATUS_CONFIG = {
    done:    { label: "Tamamlandı", color: "#34d399", icon: CheckCircle2 },
    current: { label: "Devam Ediyor", color: "#fbbf24", icon: Zap },
    next:    { label: "Sırada",    color: "#60a5fa", icon: Target },
    future:  { label: "Planlanıyor", color: "#a78bfa", icon: Star },
  } as const;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 -left-20 w-[500px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <Meteors number={10} />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 tracking-[0.18em] uppercase">Öğrenme Haritası</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Nerede Olduğum,</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Nereye Gidiyorum?</AnimatedGradientText>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Öğrenme hiç bitmiyor. İşte şu an durduğum yerin ve geleceğe doğru planladığım yolun haritası.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROADMAP.map(({ status, label, color }, i) => {
            const cfg = STATUS_CONFIG[status];
            const CfgIcon = cfg.icon;
            return (
              <div
                key={label}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:border-zinc-300 dark:border-white/[0.07] dark:bg-zinc-900/50 dark:hover:border-white/15"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.08 + i * 0.06}s, transform 0.5s ease ${0.08 + i * 0.06}s`,
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/[0.07]" style={{ background: `${cfg.color}12` }}>
                  <CfgIcon className="h-5 w-5" style={{ color: cfg.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">{label}</p>
                  <p className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</p>
                </div>
                {status === "current" && (
                  <div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: cfg.color }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Hero ──────────────────────────────────────────── */

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const totalSkills = skillCategories.reduce((s, c) => s + c.skills.length, 0);
  const expertCount = skillCategories.flatMap((c) => c.skills).filter((s) => s.level >= 90).length;

  return (
    <section className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -left-20 w-[600px] h-[500px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-[500px] h-[400px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "radial-gradient(circle,#34d399 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <Meteors number={16} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <div className="mb-10" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-12px)", transition: "opacity 0.5s, transform 0.5s" }}>
          <Link href="/" className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/[0.06] dark:hover:text-white">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />Ana Sayfa
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-8" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(-40px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-[0.18em] uppercase">Beceriler</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-zinc-500 text-3xl sm:text-4xl font-semibold block mb-2">Alanım:</span>
              <TypewriterGradientText
                phrases={HERO_PHRASES}
                active={mounted}
                className="text-5xl sm:text-6xl font-black"
                msPerChar={58}
                msDeletePerChar={30}
                pauseAfterTypeMs={2600}
              />
            </h1>

            <p className="text-zinc-400 leading-relaxed text-lg max-w-lg">
              Her teknoloji bir araç, her beceri bir fırsat. İşte kullandığım araçlar, seviyelerim ve
              öğrenmeye devam ettiğim alanlar.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Toplam Beceri",  value: `${totalSkills}+`, color: "#34d399" },
                { label: "Uzman Seviye",   value: `${expertCount}`,  color: "#60a5fa" },
                { label: "Kategori",       value: `${skillCategories.length}`,     color: "#fbbf24" },
                { label: "Yıl Öğrenme",    value: "4+",              color: "#a78bfa" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}18` }}>
                    <p className="text-sm font-black" style={{ color }}>{value}</p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 text-sm font-semibold text-white border-0 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_36px_rgba(16,185,129,0.45)] hover:scale-[1.02] transition-all duration-300 gap-2">
                <Link href="/#contact">
                  <ArrowRight className="w-4 h-4" />Birlikte Çalışalım
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-500/30 hover:text-white hover:bg-emerald-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2">
                <Link href="/projects">
                  <Code2 className="w-4 h-4" />Projelerime Bak
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Skill wheel / orb visual */}
          <div className="hidden lg:flex items-center justify-center" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(40px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-emerald-600/10 blur-3xl" />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_48px_rgba(16,185,129,0.25)]">
                  <Cpu className="w-12 h-12 text-emerald-400" />
                </div>
              </div>

              {/* Category orbs */}
              {skillCategories.map((cat, i) => {
                const CatIcon = cat.icon;
                const angle = (i / skillCategories.length) * 360 - 90;
                const r = 130;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div
                    key={cat.id}
                    className="absolute flex h-12 w-12 animate-float items-center justify-center rounded-xl border border-zinc-200 bg-white/95 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/90"
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top:  `calc(50% + ${y}px - 24px)`,
                      animationDelay: `${i * 0.6}s`,
                      boxShadow: `0 0 20px ${cat.accent.from}30`,
                    }}
                  >
                    <CatIcon className="w-5 h-5" style={{ color: cat.accent.from }} />
                  </div>
                );
              })}

              {/* Rings */}
              <div className="absolute inset-4 rounded-full border border-emerald-500/10 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-teal-500/[0.07] animate-spin-reverse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills Grid Section ───────────────────────────── */

function SkillsGridSection() {
  const { ref, vis } = useInView(0.05);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-5 mb-10" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-[0.18em] uppercase">Tüm Beceriler</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Kullandığım</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Teknolojiler</AnimatedGradientText>
          </h2>
        </div>

        {/* Level legend */}
        <div className="mb-10">
          <LevelLegend vis={vis} />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {skillCategories.map((cat, i) => (
            <div key={cat.id} className="h-full">
              <CategoryCard category={cat} started={vis} index={i} vis={vis} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Skills Matter ─────────────────────────────── */

function WhySkillsSection() {
  const { ref, vis } = useInView(0.1);
  const points = [
    { icon: Zap,       color: "#fbbf24", title: "Araç Değil Çözüm",    desc: "Her teknolojiyi amaç için değil, çözüm için seçiyorum. Doğru araç, doğru iş." },
    { icon: TrendingUp,color: "#60a5fa", title: "Sürekli Derinleşme",   desc: "Yüzeyde kalmak yerine her konunun internals'ını anlamaya çalışıyorum." },
    { icon: BookOpen,  color: "#34d399", title: "Belgelere Saygı",      desc: "Resmi dokümantasyon her şeyden önce gelir. Tutorial değil, spec okuyorum." },
    { icon: Code2,     color: "#a78bfa", title: "Pratikle Öğrenme",     desc: "Teoriden değil, projeden öğreniyorum. Her yeni beceri bir proje ile başlıyor." },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-[0.18em] uppercase">Öğrenme Felsefem</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Nasıl Öğreniyorum,</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Neden Öğreniyorum?</AnimatedGradientText>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map(({ icon: Icon, color, title, desc }, i) => (
            <div key={title} className="group relative space-y-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/[0.07] dark:bg-zinc-900/60"
              style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${color}10 0%,transparent 70%)` }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg,transparent,${color}60,transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────── */

function CTASection() {
  const { ref, vis } = useInView(0.2);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 text-center space-y-8"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 tracking-[0.18em] uppercase">Teknoloji + Vizyon</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
          <span className="text-zinc-900 dark:text-white">Bu Becerilerle</span>
          <br />
          <AnimatedGradientText className="text-4xl sm:text-5xl font-black">Seninle Çalışayım</AnimatedGradientText>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Teknik altyapım, hızlı öğrenme kapasitem ve kullanıcı odaklı bakış açımla
          projenizi bir üst seviyeye taşıyabilirim.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 text-base font-semibold text-white! border-0 shadow-[0_0_28px_rgba(16,185,129,0.35)] hover:shadow-[0_0_48px_rgba(16,185,129,0.55)] hover:scale-[1.02] transition-all duration-300 gap-2 h-auto">
            <Link href="/#contact" className="text-white">
              <ArrowRight className="w-5 h-5" />İletişime Geç
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-500/30 hover:text-white hover:bg-emerald-500/10 px-8 py-3 text-base font-semibold transition-all duration-300 gap-2 h-auto">
            <Link href="/projects">Projelerimi Gör</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────── */

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <SkillsGridSection />
        <RoadmapSection />
        <WhySkillsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
