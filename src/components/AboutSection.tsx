"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Code2,
  Layers,
  Zap,
  MapPin,
  Calendar,
  Globe,
  Server,
  Cpu,
  Database,
  Palette,
  Terminal,
  Sparkles,
  ArrowRight,
  Download,
  Briefcase,
  GitBranch,
  Star,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypewriterGradientText } from "@/components/magicui/typewriter-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";

/* ─── data ──────────────────────────────────────────── */

interface Tech {
  name: string;
  icon: LucideIcon;
  hexColor: string;
  category: "frontend" | "backend";
}

const techStack: Tech[] = [
  { name: "React",       icon: Code2,    hexColor: "#61DAFB", category: "frontend" },
  { name: "Next.js",     icon: Layers,   hexColor: "#e4e4e7", category: "frontend" },
  { name: "TypeScript",  icon: Terminal, hexColor: "#60a5fa", category: "frontend" },
  { name: "Tailwind",    icon: Palette,  hexColor: "#38BDF8", category: "frontend" },
  { name: "Node.js",     icon: Server,   hexColor: "#86efac", category: "backend"  },
  { name: "PostgreSQL",  icon: Database, hexColor: "#818cf8", category: "backend"  },
  { name: "Kotlin",      icon: Cpu,      hexColor: "#fb923c", category: "backend"  },
  { name: "Spring Boot", icon: Zap,      hexColor: "#86efac", category: "backend"  },
];

const stats = [
  { label: "Proje",       value: 15,  suffix: "+", icon: Briefcase, gradient: "from-blue-500 to-cyan-400"     },
  { label: "Teknoloji",   value: 20,  suffix: "+", icon: Star,      gradient: "from-violet-500 to-purple-400" },
  { label: "Yıl Deneyim", value: 3,   suffix: "+", icon: Rocket,    gradient: "from-emerald-500 to-green-400" },
  { label: "Commit",      value: 500, suffix: "+", icon: GitBranch, gradient: "from-orange-500 to-amber-400"  },
];

/** Orta satır: daktilo + döngü — “Kod Yazan, …, Geliştirici” */
const ABOUT_HEADLINE_PHRASES = [
  "Ürün Düşünen",
  "Detay Seven",
  "Performans Takıntılı",
  "Deneyim Tasarlayan",
  "Oyun Seven",
  "Ölçeklenebilir Düşünen",
] as const;

const orbitItems: { icon: LucideIcon; angle: number; color: string }[] = [
  { icon: Code2,    angle: 0,   color: "#61DAFB" },
  { icon: Layers,   angle: 90,  color: "#e4e4e7" },
  { icon: Terminal, angle: 180, color: "#60a5fa" },
  { icon: Palette,  angle: 270, color: "#38BDF8" },
];

/** Precomputed positions — avoids SSR/client `calc()` / float string differences on ring dots. */
const RING_DOT_POSITIONS: Record<0 | 72 | 144 | 216 | 288, { top: string; left: string }> = {
  0:   { top: "calc(50% + -2.00px)",   left: "calc(50% + 163.00px)" },
  72:  { top: "calc(50% + 154.92px)", left: "calc(50% + 48.99px)" },
  144: { top: "calc(50% + 94.98px)",  left: "calc(50% + -135.49px)" },
  216: { top: "calc(50% + -98.98px)", left: "calc(50% + -135.49px)" },
  288: { top: "calc(50% + -158.92px)", left: "calc(50% + 48.99px)" },
};

const ORBIT_ICON_POSITIONS: { top: string; left: string }[] = [
  { top: "calc(50% + -20.00px)",  left: "calc(50% + 136.00px)" },
  { top: "calc(50% + 136.00px)", left: "calc(50% + -20.00px)" },
  { top: "calc(50% + -20.00px)",  left: "calc(50% + -176.00px)" },
  { top: "calc(50% + -176.00px)", left: "calc(50% + -20.00px)" },
];

/* ─── ProfileCard3D ─────────────────────────────────── */

function ProfileCard3D() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [tilt,   setTilt]    = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -10,
      y: ((e.clientX - cx) / (rect.width  / 2)) *  10,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 340, height: 480 }}>

      {/* Rotating rings — kartın arkasında */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[330px] h-[330px] rounded-full border border-blue-500/[0.08] animate-spin-slow" />
        <div className="absolute w-[278px] h-[278px] rounded-full border border-emerald-500/[0.06] animate-spin-reverse" />
        {([0, 72, 144, 216, 288] as const).map((deg) => {
          const pos = RING_DOT_POSITIONS[deg];
          return (
            <div
              key={deg}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30"
              style={{ top: pos.top, left: pos.left }}
            />
          );
        })}
      </div>

      {/* Orbiting icons */}
      {orbitItems.map(({ icon: Icon, color }, i) => {
        const pos = ORBIT_ICON_POSITIONS[i]!;
        return (
          <div
            key={i}
            className="absolute z-[8] flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-zinc-950/90 shadow-lg backdrop-blur-sm animate-float pointer-events-none"
            style={{
              top:            pos.top,
              left:           pos.left,
              animationDelay: `${i * 0.9}s`,
              boxShadow:      `0 0 18px ${color}22`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
        );
      })}

      {/* Ambient glow — halkalar ile kart arası */}
      <div
        className={cn(
          "absolute z-[5] h-80 w-64 rounded-3xl blur-3xl pointer-events-none transition-all duration-700",
          "bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10",
          hovered && "from-blue-600/22 to-emerald-600/22",
        )}
      />

      {/* The 3D card — yörünge ikonlarının üstünde; yarı saydam satırlara görünmez */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative z-30 w-64 cursor-pointer overflow-hidden rounded-3xl border border-white/[0.09] bg-zinc-950/95 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        style={{
          transform:      `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition:     hovered ? "transform 0.1s ease-out" : "transform 0.55s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Header: avatar area ── */}
        <div className="relative flex h-52 items-center justify-center overflow-hidden">
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950/80 to-emerald-950" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.28) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Ambient orbs */}
          <div className="absolute left-0 top-0 h-24 w-24 animate-glow-pulse rounded-full bg-blue-500/18 blur-2xl" />
          <div
            className="absolute bottom-0 right-0 h-28 w-28 animate-glow-pulse rounded-full bg-emerald-500/18 blur-2xl"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Hafif üstten ışık — meteor yerine sakin derinlik */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 85% 70% at 50% -20%, rgba(96,165,250,0.22), transparent 55%)",
            }}
          />

          {/* Initials avatar */}
          <div
            className="relative z-10 flex h-24 w-24 select-none items-center justify-center rounded-2xl text-3xl font-black text-white"
            style={{
              transform:  "translateZ(32px)",
              background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
              boxShadow:  "0 0 48px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
              letterSpacing: "-0.02em",
            }}
          >
            FE
            {/* Status dot */}
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-400 border-2 border-zinc-900 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
          </div>

          {/* Scanlines */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.32]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.06) 2px, rgba(59,130,246,0.06) 4px)",
            }}
          />
        </div>

        {/* ── Body ── */}
        <div className="relative z-10 space-y-4 p-5" style={{ transform: "translateZ(20px)" }}>
          {/* Name & role */}
          <div className="text-center">
            <p className="text-base font-bold text-white">Fatih Emre Yüce</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400/95">
              Frontend Developer
            </p>
          </div>

          {/* Available badge */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">Projelere Açık</span>
            </div>
          </div>

          {/* Info rows — opak zemin, alttaki dekorasyon görünmez */}
          <div className="space-y-2">
            {[
              { icon: MapPin,   text: "Türkiye" },
              { icon: Calendar, text: "3+ Yıl Deneyim" },
              { icon: Globe,    text: "Uzaktan & Tam Zamanlı" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-zinc-900/85 px-3.5 py-2.5 transition-colors hover:border-white/12 hover:bg-zinc-900/95"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                  <Icon className="h-3.5 w-3.5 text-zinc-400" />
                </span>
                <span className="text-xs font-medium text-zinc-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specular shine */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.1) 0%, transparent 65%)`,
            opacity:    hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
    </div>
  );
}

/* ─── StatCard ──────────────────────────────────────── */

function StatCard({
  label,
  value,
  suffix,
  started,
  icon: Icon,
  gradient,
}: {
  label: string;
  value: number;
  suffix: string;
  started: boolean;
  icon: LucideIcon;
  gradient: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const duration = 1800;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p     = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value]);

  return (
    <div className="group relative text-center p-4 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06] transition-all duration-300 cursor-default">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-white/[0.04] to-transparent" />
      <div className="relative z-10 space-y-2">
        <div className={cn("mx-auto w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br opacity-90", gradient)}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <p className={cn("text-2xl font-black bg-gradient-to-r bg-clip-text text-transparent tabular-nums", gradient)}>
          {count}
          <span className="text-base font-bold">{suffix}</span>
        </p>
        <p className="text-[10px] text-zinc-500 leading-none">{label}</p>
      </div>
    </div>
  );
}

/* ─── SkillBadge ─────────────────────────────────────── */

function SkillBadge({ name, icon: Icon, hexColor }: Tech) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200 cursor-default overflow-hidden"
      style={{
        transform:  hov ? "translateY(-2px)" : "translateY(0px)",
        transition: "transform 0.2s ease, background 0.2s, border-color 0.2s",
        boxShadow:  hov ? `0 8px 24px ${hexColor}18` : "none",
      }}
    >
      {/* Subtle left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full opacity-60 transition-opacity duration-200"
        style={{
          background: hexColor,
          opacity:    hov ? 0.9 : 0.4,
        }}
      />
      <Icon className="w-4 h-4 relative z-10 shrink-0" style={{ color: hexColor }} />
      <span className="text-sm font-medium text-zinc-300 relative z-10">{name}</span>
    </div>
  );
}

/* ─── AboutSection ──────────────────────────────────── */

export function AboutSection() {
  const ref              = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const frontendTechs = techStack.filter((t) => t.category === "frontend");
  const backendTechs  = techStack.filter((t) => t.category === "backend");

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center py-24 overflow-hidden border-b border-white/5"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 -left-20 w-[520px] h-[520px] rounded-full bg-blue-600/[0.05] blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize:  "30px 30px",
          }}
        />
        {/* Section-wide meteors — simetrik çiftler; yatay şerit kaldırıldı (meteorlarla çarpışan asimetrik görünüm) */}
        <Meteors number={14} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: 3D Profile Card — lg’de sola hizalı; header logosu ile aynı iç kenar */}
          <div
            className="flex justify-center lg:justify-start min-w-0 overflow-visible"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateX(-44px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <ProfileCard3D />
          </div>

          {/* ── Right: Content ── */}
          <div
            className="space-y-8"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateX(44px)",
              transition: "opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 tracking-[0.18em] uppercase">
                Hakkımda
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight"
              aria-label="Kod Yazan; vurgu metni dönüşümlü: ürün, detay, performans ve deneyim odaklı ifadeler. Geliştirici."
            >
              <span className="text-white">Kod Yazan,</span>
              <br />
              <TypewriterGradientText
                phrases={ABOUT_HEADLINE_PHRASES}
                active={visible}
                className="text-4xl sm:text-[2.75rem] font-bold"
                msPerChar={68}
                msDeletePerChar={36}
                pauseAfterTypeMs={2600}
              />
              <br />
              <span className="text-white">Geliştirici</span>
            </h2>

            {/* Bio */}
            <p className="text-zinc-400 leading-relaxed max-w-lg">
              Merhaba! Ben{" "}
              <span className="text-white font-semibold">Fatih Emre Yüce</span> — kullanıcı
              deneyimini ön planda tutan, modern web teknolojileriyle hızlı ve ölçeklenebilir
              uygulamalar geliştiren bir{" "}
              <span className="text-blue-400 font-medium">Frontend Developer</span>'ım. Temiz
              kod yazmaya, performanslı arayüzler tasarlamaya ve iş değeri yaratmaya önem
              veriyorum.
            </p>

            {/* Skills — grouped */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                Teknoloji Stack
              </p>
              <div className="grid grid-cols-2 gap-5">
                {/* Frontend */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest mb-1">
                    Frontend
                  </p>
                  {frontendTechs.map((tech) => (
                    <SkillBadge key={tech.name} {...tech} />
                  ))}
                </div>
                {/* Backend */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1">
                    Backend
                  </p>
                  {backendTechs.map((tech) => (
                    <SkillBadge key={tech.name} {...tech} />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} started={visible} />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                asChild
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-6 text-sm font-semibold text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] hover:scale-[1.02] transition-all duration-300 gap-2"
              >
                <a href="#contact">
                  <ArrowRight className="w-4 h-4" />
                  İletişime Geç
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-blue-500/30 hover:text-white hover:bg-blue-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2"
              >
                <Link href="/about">
                  <Sparkles className="w-4 h-4" />
                  Hakkımda Daha Fazla
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-blue-500/30 hover:text-white hover:bg-blue-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2"
              >
                <a href="/cv.pdf" download>
                  <Download className="w-4 h-4" />
                  CV İndir
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
