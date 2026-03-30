"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Radio,
  Code2,
  Star,
  GitBranch,
  Rocket,
  Filter,
  ArrowLeft,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Github } from "@/components/icons/social";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TypewriterGradientText } from "@/components/magicui/typewriter-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { cn, hexNeedsForcedDarkText, readableOnLightSurface } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/components/I18nProvider";
import { withLocale } from "@/i18n/withLocale";

/* ─── constants ────────────────────────────────────── */

const CATEGORIES = ["Tümü", "Fullstack", "Frontend", "Backend"] as const;

const STATUS_MAP = {
  live: {
    label: "Yayında",
    icon: Radio,
    color:
      "text-emerald-900 border-emerald-400/70 bg-emerald-100/95 dark:text-emerald-400 dark:border-emerald-500/25 dark:bg-emerald-500/10",
  },
  completed: {
    label: "Tamamlandı",
    icon: CheckCircle2,
    color:
      "text-blue-900 border-blue-400/70 bg-blue-100/95 dark:text-blue-400 dark:border-blue-500/25 dark:bg-blue-500/10",
  },
  development: {
    label: "Yapım Aşamasında",
    icon: Clock,
    color:
      "text-amber-900 border-amber-400/70 bg-amber-100/95 dark:text-amber-400 dark:border-amber-500/25 dark:bg-amber-500/10",
  },
} as const;

const STATS = [
  { value: projects.length,                                         suffix: "",  label: "Toplam Proje",  icon: Layers,     color: "#60a5fa" },
  { value: projects.filter((p) => p.status === "live").length,      suffix: "",  label: "Yayında",       icon: Radio,      color: "#34d399" },
  { value: projects.filter((p) => p.status === "completed").length, suffix: "",  label: "Tamamlandı",    icon: CheckCircle2, color: "#a78bfa"},
  { value: projects.reduce((a, p) => a + p.techs.length, 0),        suffix: "+", label: "Kullanılan Tech", icon: Code2,    color: "#fbbf24" },
];

const HERO_PHRASES = [
  "Full-Stack Projeler",
  "Frontend Uygulamalar",
  "Backend Sistemler",
  "Ürün Fikirleri",
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

/* ─── ProjectCard (3-D tilt) ─────────────────────── */

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const { locale } = useI18n();
  const cardRef         = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov,  setHov]  = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDarkMode(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * -6,
      y: ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) *  6,
    });
  }, []);

  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHov(false); }, []);

  const status     = STATUS_MAP[project.status];
  const Icon       = project.icon;
  const StatusIcon = status.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-md backdrop-blur-sm dark:border-white/[0.07] dark:bg-zinc-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.02 : 1})`
          : "translateY(40px)",
        transition: visible
          ? hov ? "transform 0.12s ease-out" : "transform 0.5s ease-out"
          : `opacity 0.55s ease ${0.1 + index * 0.08}s, transform 0.55s ease ${0.1 + index * 0.08}s`,
        transformStyle: "preserve-3d",
        ...(hov
          ? {
              boxShadow: `0 20px 60px ${project.accent.from}22, 0 0 0 1px ${project.accent.from}30`,
            }
          : {}),
      }}
    >
      {/* Meteors on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={6} />
      </div>

      {/* Hover tint */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${project.accent.from}18, transparent 50%, ${project.accent.to}18)` }} />

      {/* Header strip */}
      <div className="relative h-28 overflow-hidden flex items-end p-5"
        style={{ background: `linear-gradient(135deg, ${project.accent.from}28 0%, ${project.accent.to}14 100%)` }}>
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 animate-glow-pulse" style={{ background: project.accent.to }} />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/15"
              style={{ background: `linear-gradient(135deg,${project.accent.from}50,${project.accent.to}50)`, boxShadow: `0 0 20px ${project.accent.from}40` }}>
              <Icon className="h-5 w-5 !text-white" />
            </div>
            <span className="rounded-lg border border-white/40 bg-white/25 px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:shadow-none" style={{ color: project.accent.from }}>
              {project.category}
            </span>
          </div>
          <div className={cn("flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border", status.color)}>
            <StatusIcon className="w-3 h-3" />{status.label}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5" style={{ transform: "translateZ(12px)" }}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-zinc-900 dark:text-white">{project.title}</h3>
          {project.year && (
            <span className="mt-0.5 shrink-0 text-[11px] text-zinc-500 dark:text-zinc-600">{project.year}</span>
          )}
        </div>
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.shortDesc}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.techs.slice(0, 4).map((tech) => {
            const techColor = isDarkMode ? tech.color : readableOnLightSurface(tech.color);
            return (
              <span
                key={tech.name}
                className={cn(
                  "project-tech-pill rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium dark:border-white/[0.07] dark:bg-white/[0.05]",
                  hexNeedsForcedDarkText(tech.color) && "project-tech-pill--force-dark",
                )}
                style={{ color: techColor }}
              >
                {tech.name}
              </span>
            );
          })}
          {project.techs.length > 4 && (
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-white/[0.07] dark:bg-white/[0.05] dark:text-zinc-500">+{project.techs.length - 4}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-0">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50/80 text-zinc-600 shadow-sm transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-100/80 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white">
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50/80 text-zinc-600 shadow-sm transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-100/80 hover:text-zinc-900 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <Link href={withLocale(`/projects/${project.id}`, locale)} onClick={(e) => e.stopPropagation()}
          className="group/btn flex items-center gap-1.5 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-100/80 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white">
          Detaylar
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Specular */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.06) 0%,transparent 60%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />
    </div>
  );
}

/* ─── Featured Project (big tilt card) ──────────────── */

function FeaturedCard({ project, vis }: { project: Project; vis: boolean }) {
  const { locale } = useI18n();
  const ref         = useRef<HTMLDivElement>(null);
  const [tilt, setT] = useState({ x: 0, y: 0 });
  const [hov, setH]  = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDarkMode(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setT({
      x: ((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * -5,
      y: ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) *  5,
    });
  }, []);

  const Icon = project.icon;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setT({ x: 0, y: 0 }); setH(false); }}
      className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-lg backdrop-blur-xl dark:border-white/[0.07] dark:bg-zinc-900/70 dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.01 : 1})`
          : "translateY(40px)",
        transition: vis ? (hov ? "transform 0.12s ease-out" : "transform 0.55s ease-out") : "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        transformStyle: "preserve-3d",
        ...(hov
          ? {
              boxShadow: `0 32px 80px ${project.accent.from}25, 0 0 0 1px ${project.accent.from}20`,
            }
          : {}),
      }}
    >
      <Meteors number={10} />

      <div className="relative grid lg:grid-cols-5 gap-0" style={{ transformStyle: "preserve-3d" }}>
        {/* Visual panel */}
        <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.accent.from}30 0%, ${project.accent.to}15 100%)` }}>
          <div className="absolute inset-0 opacity-[0.14]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 animate-glow-pulse" style={{ background: project.accent.from }} />
          </div>
          {/* Orbiting tech names */}
          <div className="relative z-10 flex flex-col items-center gap-3" style={{ transform: "translateZ(24px)" }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/20"
              style={{ background: `linear-gradient(135deg,${project.accent.from}60,${project.accent.to}60)`, boxShadow: `0 0 48px ${project.accent.from}50` }}>
              <Icon className="h-10 w-10 !text-white" />
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[180px]">
              {project.techs.map((t) => {
                const techColor = isDarkMode ? t.color : readableOnLightSurface(t.color);
                return (
                  <span
                    key={t.name}
                    className={cn(
                      "project-tech-pill rounded-full border border-white/40 bg-white/25 px-2 py-0.5 text-[10px] font-medium shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:shadow-none",
                      hexNeedsForcedDarkText(t.color) && "project-tech-pill--force-dark",
                    )}
                    style={{ color: techColor }}
                  >
                    {t.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content panel */}
        <div className="lg:col-span-3 p-8 space-y-5" style={{ transform: "translateZ(16px)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-bold px-3 py-1 rounded-lg border" style={{ color: project.accent.from, borderColor: `${project.accent.from}40`, background: `${project.accent.from}10` }}>
              {project.category}
            </span>
            <div className={cn("flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border", STATUS_MAP[project.status].color)}>
              <Star className="w-3 h-3" /> Öne Çıkan Proje
            </div>
            {project.year && <span className="text-xs text-zinc-600">{project.year}</span>}
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">{project.title}</h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{project.longDesc}</p>

          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Özellikler</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: project.accent.from }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link href={withLocale(`/projects/${project.id}`, locale)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border-0 transition-all duration-300 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg,${project.accent.from},${project.accent.to})`, boxShadow: `0 0 24px ${project.accent.from}35` }}>
              Detayları Gör <ArrowUpRight className="w-4 h-4" />
            </Link>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.05) 0%,transparent 65%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />
    </div>
  );
}

/* ─── Stats row ─────────────────────────────────────── */

function StatCard({ value, suffix, label, icon: Icon, color, vis, delay }: typeof STATS[number] & { vis: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [vis, value]);

  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative cursor-default overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-white/[0.06] dark:bg-white/[0.02]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "perspective(400px) translateZ(16px) scale(1.05)" : "none") : "translateY(24px)",
        transition: vis ? "opacity 0.5s, transform 0.25s ease" : `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        boxShadow: hov ? `0 14px 40px ${color}20` : "none",
      }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: hov ? `radial-gradient(circle at 50% 0%, ${color}10 0%,transparent 70%)` : "transparent",
        transition: "background 0.3s",
      }} />
      <div className="relative z-10 space-y-3">
        <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <p className="text-3xl font-black tabular-nums" style={{ color }}>{count}{suffix}</p>
        <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────── */

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -right-24 w-[600px] h-[500px] rounded-full bg-violet-600/[0.05] blur-3xl" />
        <div className="absolute bottom-1/3 -left-24 w-[500px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "radial-gradient(circle,#818cf8 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <Meteors number={16} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <div className="mb-10" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-12px)", transition: "opacity 0.5s, transform 0.5s" }}>
          <Link href="/" className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.06] dark:hover:text-white">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />Ana Sayfa
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-8" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(-40px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-400 tracking-[0.18em] uppercase">Projeler</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-zinc-500 text-3xl sm:text-4xl font-semibold block mb-2">Geliştirdiğim</span>
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
              Her proje bir öğrenme, her satır kod bir gelişim. Frontend'den backend'e, küçük araçlardan
              büyük sistemlere — işte inşa ettiklerim.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 text-sm font-semibold text-white border-0 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_36px_rgba(139,92,246,0.45)] hover:scale-[1.02] transition-all duration-300 gap-2">
                <a href="https://github.com/fatihemreyuce" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />GitHub Profilim
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-violet-500/30 hover:text-white hover:bg-violet-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2">
                <Link href="/#contact">
                  <ArrowRight className="w-4 h-4" />İş Birliği Teklifi
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: floating project preview cards */}
          <div className="hidden lg:flex items-center justify-center" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(40px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div className="relative w-80 h-80">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-violet-600/10 blur-3xl" />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center border border-violet-500/30 bg-violet-500/10 shadow-[0_0_48px_rgba(139,92,246,0.25)]">
                  <Rocket className="w-12 h-12 text-violet-400" />
                </div>
              </div>
              {/* Orbiting project category icons */}
              {[
                { label: "Frontend", color: "#60a5fa", angle: 0   },
                { label: "Backend",  color: "#34d399", angle: 120 },
                { label: "Fullstack",color: "#a78bfa", angle: 240 },
              ].map(({ label, color, angle }) => {
                const r = 130;
                const x = Math.cos(((angle - 90) * Math.PI) / 180) * r;
                const y = Math.sin(((angle - 90) * Math.PI) / 180) * r;
                return (
                  <div
                    key={label}
                    className="absolute flex animate-float items-center gap-1.5 rounded-xl border border-zinc-200 bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/90"
                    style={{
                      left: `calc(50% + ${x}px - 48px)`,
                      top:  `calc(50% + ${y}px - 16px)`,
                      color,
                      animationDelay: `${angle / 120}s`,
                      boxShadow: `0 4px 20px ${color}20`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {label}
                  </div>
                );
              })}
              {/* Ring */}
              <div className="absolute inset-4 rounded-full border border-violet-500/10 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-blue-500/[0.07] animate-spin-reverse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─────────────────────────────────── */

function StatsSection() {
  const { ref, vis } = useInView(0.15);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-14 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/[0.04] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={s.label} {...s} vis={vis} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Section ──────────────────────────────── */

function FeaturedSection() {
  const { ref, vis } = useInView(0.08);
  const featured = projects.find((p) => p.status === "live") ?? projects[0]!;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-[0.18em] uppercase">Öne Çıkan</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">En Dikkat Çekici</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Projem</AnimatedGradientText>
          </h2>
        </div>
        <FeaturedCard project={featured} vis={vis} />
      </div>
    </section>
  );
}

/* ─── All Projects Section ──────────────────────────── */

function AllProjectsSection() {
  const { ref, vis } = useInView(0.05);
  const [filter, setFilter] = useState<string>("Tümü");
  const filtered = filter === "Tümü" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-1/3 w-[500px] h-[400px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <Meteors number={10} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-5 mb-12" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-[0.18em] uppercase">Tüm Projeler</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Üzerinde Çalıştığım</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Seçkin Projeler</AnimatedGradientText>
          </h2>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-10" style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}>
          <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-slate-100 p-1 dark:border-white/[0.07] dark:bg-white/[0.03]">
            <div className="pointer-events-none flex items-center gap-1.5 px-3 py-1.5 text-zinc-500 dark:text-zinc-600">
              <Filter className="h-3.5 w-3.5" />
            </div>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={cn("relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200", filter === cat ? "text-zinc-900 dark:text-white" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300")}>
                {filter === cat && <span className="absolute inset-0 rounded-lg border border-zinc-300 bg-white dark:border-white/10 dark:bg-white/[0.08]" />}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {filtered.map((project, i) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} index={i} visible={vis} />
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex justify-center mt-12" style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-500">
            <TrendingUp className="h-4 w-4 text-violet-500 dark:text-violet-400" />
            Daha fazlası{" "}
            <a href="https://github.com/fatihemreyuce" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-violet-600 underline decoration-violet-200 underline-offset-4 transition-all hover:text-violet-800 hover:decoration-violet-400 dark:text-zinc-300 dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white/60">
              GitHub&apos;da <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/[0.05] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 text-center space-y-8"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
          <Globe className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-semibold text-violet-400 tracking-[0.18em] uppercase">Birlikte Çalışalım</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
          <span className="text-zinc-900 dark:text-white">Senin Projen de</span>
          <br />
          <AnimatedGradientText className="text-4xl sm:text-5xl font-black">Burada Olabilir</AnimatedGradientText>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Yeni bir fikrin, çözmek istediğin bir problemi ya da geliştirmek istediğin bir ürün var mı?
          Konuşalım.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3 text-base font-semibold text-white! border-0 shadow-[0_0_28px_rgba(139,92,246,0.35)] hover:shadow-[0_0_48px_rgba(139,92,246,0.55)] hover:scale-[1.02] transition-all duration-300 gap-2 h-auto">
            <Link href="/#contact" className="text-white">
              <ArrowRight className="w-5 h-5" />İletişime Geç
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-violet-500/30 hover:text-white hover:bg-violet-500/10 px-8 py-3 text-base font-semibold transition-all duration-300 gap-2 h-auto">
            <Link href="/about">Hakkımda</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────── */

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <StatsSection />
        <FeaturedSection />
        <AllProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
