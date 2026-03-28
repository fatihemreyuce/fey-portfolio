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
} from "lucide-react";
import { Github } from "@/components/icons/social";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

/* ─── constants ─────────────────────────────────────── */

const CATEGORIES = ["Tümü", "Fullstack", "Frontend", "Backend"] as const;

const STATUS_MAP = {
  live:        { label: "Yayında",     icon: Radio,         color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10" },
  completed:   { label: "Tamamlandı",  icon: CheckCircle2,  color: "text-blue-400 border-blue-500/25 bg-blue-500/10"          },
  development: { label: "Geliştirme",  icon: Clock,         color: "text-amber-400 border-amber-500/25 bg-amber-500/10"       },
} as const;

/* ─── ProjectCard ────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef            = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]    = useState({ x: 0, y: 0 });
  const [hovered, setHov]  = useState(false);

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

  const status  = STATUS_MAP[project.status];
  const Icon    = project.icon;
  const StatusIcon = status.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-zinc-900/60 backdrop-blur-sm overflow-hidden cursor-pointer"
      style={{
        transform:      `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition:     hovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
        animationDelay: `${index * 0.1}s`,
        boxShadow: hovered
          ? `0 20px 60px ${project.accent.from}22, 0 0 0 1px ${project.accent.from}30`
          : "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Meteors inside card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={6} />
      </div>

      {/* Animated border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.accent.from}18, transparent 50%, ${project.accent.to}18)`,
        }}
      />

      {/* ── Header strip ── */}
      <div
        className="relative h-28 overflow-hidden flex items-end p-5"
        style={{
          background: `linear-gradient(135deg, ${project.accent.from}28 0%, ${project.accent.to}14 100%)`,
        }}
      >
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glow orb */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 animate-glow-pulse"
          style={{ background: project.accent.to }}
        />

        {/* Category badge + status */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/15"
              style={{
                background: `linear-gradient(135deg, ${project.accent.from}50, ${project.accent.to}50)`,
                boxShadow:  `0 0 20px ${project.accent.from}40`,
              }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Category */}
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm"
              style={{ color: project.accent.from }}
            >
              {project.category}
            </span>
          </div>

          {/* Durum rozeti — "Geliştirme" gösterilmez (öğrenme aşaması) */}
          {project.status !== "development" && (
            <div className={cn("flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border", status.color)}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="flex flex-1 flex-col gap-4 p-5 min-h-0"
        style={{ transform: "translateZ(12px)" }}
      >
        {/* Title + year */}
        <div className="flex items-start justify-between gap-2 shrink-0">
          <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
          <span className="text-[11px] text-zinc-600 shrink-0 mt-0.5">{project.year}</span>
        </div>

        {/* Description — fixed block height so rows align across cards */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 min-h-[4.5rem] shrink-0">
          {project.shortDesc}
        </p>

        {/* Tech pills */}
        <div className="mt-auto flex flex-wrap gap-1.5 shrink-0">
          {project.techs.slice(0, 4).map((tech) => (
            <span
              key={tech.name}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07]"
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>
          ))}
          {project.techs.length > 4 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] text-zinc-500">
              +{project.techs.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-5 pt-0">
        {/* External links */}
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Detail link */}
        <Link
          href={`/projects/${project.id}`}
          className="group/btn flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          Detaylar
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Specular shine */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          opacity:    hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ─── ProjectsSection ────────────────────────────────── */

export function ProjectsSection() {
  const ref               = useRef<HTMLElement>(null);
  const [visible, setVis] = useState(false);
  const [filter, setFilter] = useState<string>("Tümü");

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

  const filtered = filter === "Tümü"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 overflow-hidden border-b border-white/5"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-violet-600/[0.05] blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-[0.18em] uppercase">
              Projeler
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">Üzerinde Çalıştığım</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              Seçkin Projeler
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Frontend'den backend'e, full-stack uygulamalardan API servislerine uzanan geniş
            bir yelpazede geliştirdiğim projeler.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div
          className="flex justify-center mb-10"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/[0.07] bg-white/[0.03]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "relative px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  filter === cat
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {filter === cat && (
                  <span className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/10" />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="h-full min-h-0"
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "none" : "translateY(36px)",
                transition: `opacity 0.55s ease ${0.15 + i * 0.08}s, transform 0.55s ease ${0.15 + i * 0.08}s`,
              }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="flex justify-center mt-12"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>
              Daha fazla proje{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-all duration-200 inline-flex items-center gap-1"
              >
                GitHub&apos;da
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
