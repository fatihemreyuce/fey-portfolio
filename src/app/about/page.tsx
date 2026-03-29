"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Sparkles,
  MapPin,
  Calendar,
  Globe,
  Rocket,
  Heart,
  Zap,
  Target,
  Eye,
  Star,
  Coffee,
  BookOpen,
  Layers,
  Terminal,
  Server,
  Database,
  Palette,
  Cpu,
  GitBranch,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Download,
  Quote,
  Lightbulb,
  Shield,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TypewriterGradientText } from "@/components/magicui/typewriter-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Instagram, Github, Linkedin, Twitter } from "@/components/icons/social";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */

const HERO_PHRASES = [
  "Frontend Geliştirici",
  "UI/UX Meraklısı",
  "Problem Çözücü",
  "Performans Odaklı",
  "Hayalci Mühendis",
] as const;

const socialLinks = [
  { icon: Github,    href: "https://github.com/fatihemreyuce",   label: "GitHub",    color: "#e4e4e7" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/fatih-emre-y%C3%BCce-3b0538355/", label: "LinkedIn", color: "#60a5fa" },
  { icon: Twitter,   href: "https://twitter.com",                label: "Twitter",   color: "#38BDF8" },
  { icon: Instagram, href: "https://www.instagram.com/fatih.yc8/", label: "Instagram", color: "#f472b6" },
];

const techStack = [
  { name: "React",       icon: Code2,    color: "#61DAFB", group: "Frontend" },
  { name: "Next.js",     icon: Layers,   color: "#e4e4e7", group: "Frontend" },
  { name: "TypeScript",  icon: Terminal, color: "#60a5fa", group: "Frontend" },
  { name: "Tailwind",    icon: Palette,  color: "#38BDF8", group: "Frontend" },
  { name: "Node.js",     icon: Server,   color: "#86efac", group: "Backend" },
  { name: "PostgreSQL",  icon: Database, color: "#818cf8", group: "Backend" },
  { name: "Kotlin",      icon: Cpu,      color: "#fb923c", group: "Backend" },
  { name: "Spring Boot", icon: Zap,      color: "#86efac", group: "Backend" },
  { name: "Git",         icon: GitBranch,color: "#f97316", group: "Araçlar" },
  { name: "Figma",       icon: Palette,  color: "#a78bfa", group: "Araçlar" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Hız & Performans",
    desc: "Her millisaniye önemlidir. Kullanıcı deneyimini en üst düzeye çıkarmak için kodu optimize etmeyi bir tutku olarak benimsedim.",
    color: "#fbbf24",
    bg: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Heart,
    title: "Kullanıcı Odaklılık",
    desc: "Kod yazmak değil, insanlar için deneyim tasarlamak. Her bileşeni kullanıcının gözünden değerlendiririm.",
    color: "#f472b6",
    bg: "from-pink-500/20 to-rose-500/10",
  },
  {
    icon: Shield,
    title: "Temiz Kod",
    desc: "Okunabilir, sürdürülebilir ve test edilebilir kod yazmak, yarınki ekip arkadaşıma saygının en temel ifadesidir.",
    color: "#34d399",
    bg: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: TrendingUp,
    title: "Sürekli Öğrenme",
    desc: "Teknoloji hiç durmuyor; ben de. Her yeni çıkan şeyi merak ederek öğreniyor, pratiğe döküyorum.",
    color: "#60a5fa",
    bg: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Users,
    title: "İş Birliği",
    desc: "Tek başına hızlı, birlikte daha uzağa. Ekip dinamiklerine saygı göstererek ortak hedeflere odaklanırım.",
    color: "#a78bfa",
    bg: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: Lightbulb,
    title: "Yaratıcılık",
    desc: "Aynı probleme farklı açılardan bakabilmek, sıradan çözümler yerine zarif ve yenilikçi yaklaşımlar üretmemi sağlar.",
    color: "#fb923c",
    bg: "from-orange-500/20 to-amber-500/10",
  },
];

const TIMELINE = [
  {
    year: "2018",
    title: "İlk Kod Satırı",
    desc: 'Ortaokul yıllarında YouTube\'da rastgele bir "HTML Dersleri" videosuna denk geldim. İlk <div> tagini yazdığımda ekranın aydınlandığını hissettim.',
    icon: Code2,
    color: "#60a5fa",
    side: "left" as const,
  },
  {
    year: "2020",
    title: "Meslek Lisesi",
    desc: "Bilişim Teknolojileri bölümünde okumaya başladım. HTML, CSS ve JavaScript'in temellerini öğrendim; ilk web projemi tamamladım.",
    icon: BookOpen,
    color: "#34d399",
    side: "right" as const,
  },
  {
    year: "2022",
    title: "React ile Tanışma",
    desc: "Component tabanlı düşünce biçimim değişti. State yönetimi, hook'lar ve modern JS ekosistemine daldım. Geceleri uyuyamıyordum.",
    icon: Zap,
    color: "#fbbf24",
    side: "left" as const,
  },
  {
    year: "2023",
    title: "İlk Profesyonel Deneyim",
    desc: "Meslek lisesi stajında gerçek bir yazılım ekibinin parçası oldum. Kod review, Git workflow ve proje yönetimini canlıda öğrendim.",
    icon: Briefcase,
    color: "#f472b6",
    side: "right" as const,
  },
  {
    year: "2024",
    title: "Üniversite & Full-Stack",
    desc: "İstanbul Gedik Üniversitesi'nde Yazılım Mühendisliği'ne başladım. Backend tarafına geçerek Node.js, Kotlin ve veritabanlarıyla çalışmaya başladım.",
    icon: GraduationCap,
    color: "#a78bfa",
    side: "left" as const,
  },
  {
    year: "Bugün",
    title: "Yolculuk Sürüyor",
    desc: "Modern web teknolojileriyle büyük hayaller kuruyor, her gün biraz daha iyi olmayı hedefliyorum. Seninle de çalışmayı beklerim.",
    icon: Rocket,
    color: "#fb923c",
    side: "right" as const,
    current: true,
  },
];

const STATS = [
  { value: 15, suffix: "+", label: "Proje",       icon: Briefcase, color: "#60a5fa" },
  { value: 3,  suffix: "+", label: "Yıl Deneyim", icon: Award,     color: "#34d399" },
  { value: 10, suffix: "+", label: "Teknoloji",   icon: Star,      color: "#fbbf24" },
  { value: 500,suffix: "+", label: "Git Commit",  icon: GitBranch, color: "#a78bfa" },
];

const WHY_ME = [
  {
    icon: Eye,
    title: "Detay Gözü",
    desc: "1 piksel kadar önem veririm. Tasarım ile geliştirme arasındaki köprüyü mükemmel şekilde kuruyorum.",
    color: "#60a5fa",
  },
  {
    icon: Rocket,
    title: "Hızlı Teslimat",
    desc: "Prototipler hızlı, ürün kaliteli. Agile çalışma prensiplerine alışkınım.",
    color: "#34d399",
  },
  {
    icon: Coffee,
    title: "Sabırlı & Meraklı",
    desc: "Her bug bir öğrenme fırsatıdır. Saatlerce araştırmaktan zevk alan biri olarak sonucu bulurum.",
    color: "#fbbf24",
  },
  {
    icon: Globe,
    title: "Uzak Çalışmaya Hazır",
    desc: "Asenkron iletişimde ustayım. Async-first kültüre tam uyum sağlıyorum.",
    color: "#f472b6",
  },
];

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */

function useInView(threshold = 0.1) {
  const ref   = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function useTilt() {
  const ref    = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov,  setHov]  = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * -10,
      y: ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) *  10,
    });
  }, []);
  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHov(false); }, []);
  return { ref, tilt, hov, setHov, onMove, onLeave };
}

/* ══════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════ */

function SectionBadge({ icon: Icon, label, color = "blue" }: { icon: LucideIcon; label: string; color?: string }) {
  const map: Record<string, string> = {
    blue:   "border-blue-500/20 bg-blue-500/10 text-blue-400",
    emerald:"border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    amber:  "border-amber-500/20 bg-amber-500/10 text-amber-400",
    pink:   "border-pink-500/20 bg-pink-500/10 text-pink-400",
    orange: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  };
  return (
    <div className={cn("inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border", map[color] ?? map.blue)}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs font-semibold tracking-[0.18em] uppercase">{label}</span>
    </div>
  );
}

function SectionHeader({
  badge,
  badgeIcon,
  badgeColor,
  title,
  gradient,
  sub,
}: {
  badge: string;
  badgeIcon: LucideIcon;
  badgeColor?: string;
  title: React.ReactNode;
  gradient: string;
  sub?: string;
}) {
  return (
    <div className="text-center space-y-5 mb-14">
      <SectionBadge icon={badgeIcon} label={badge} color={badgeColor} />
      <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
        {title}
        <br />
        <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">{gradient}</AnimatedGradientText>
      </h2>
      {sub && <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════ */

function HeroProfileCard() {
  const { ref, tilt, hov, setHov, onMove, onLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative w-72 rounded-3xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer select-none"
      style={{
        transform:      `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.03 : 1})`,
        transition:     hov ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Avatar area */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950/70 to-emerald-950" />
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.35) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-emerald-500/20 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <Meteors number={8} className="opacity-30" />

        {/* Initials */}
        <div
          className="relative z-10 w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-black text-white"
          style={{
            transform:  "translateZ(32px)",
            background: "linear-gradient(135deg,#3b82f6 0%,#10b981 100%)",
            boxShadow:  "0 0 48px rgba(59,130,246,0.45),inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
        >
          FE
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-400 border-2 border-zinc-900">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(59,130,246,0.06) 2px,rgba(59,130,246,0.06) 4px)",
        }} />
      </div>

      {/* Body */}
      <div className="p-5 space-y-4" style={{ transform: "translateZ(18px)" }}>
        <div className="text-center">
          <p className="font-bold text-white text-lg">Fatih Emre Yüce</p>
          <p className="text-[11px] text-blue-400 font-semibold tracking-[0.22em] uppercase mt-1">Frontend Developer</p>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">Projelere Açık</span>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { icon: MapPin,   text: "İstanbul, Türkiye" },
            { icon: Calendar, text: "3+ Yıl Deneyim"    },
            { icon: Globe,    text: "Uzaktan & Tam Zamanlı" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-xs text-zinc-400">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specular shine */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.1) 0%,transparent 65%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s",
      }} />
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden border-b border-white/5">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "radial-gradient(circle,#60a5fa 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <Meteors number={16} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-12" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-200 text-zinc-400 hover:text-white text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Ana Sayfa
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: profile card */}
          <div className="flex justify-center lg:justify-start" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateX(-44px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            {/* Floating orbit icons */}
            <div className="relative">
              {/* Outer orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ width: 340, height: 480 }}>
                <div className="absolute w-[360px] h-[360px] rounded-full border border-blue-500/[0.08] animate-spin-slow" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/[0.06] animate-spin-reverse" />

                {/* Orbit dots */}
                {[0, 60, 120, 180, 240, 300].map((deg) => {
                  const r = 180;
                  const x = Math.cos((deg * Math.PI) / 180) * r;
                  const y = Math.sin((deg * Math.PI) / 180) * r;
                  return (
                    <div key={deg} className="absolute w-1 h-1 rounded-full bg-blue-400/20" style={{ left: `calc(50% + ${x}px - 2px)`, top: `calc(50% + ${y}px - 2px)` }} />
                  );
                })}

                {/* Tech icons floating at corners */}
                {[
                  { icon: Code2,    color: "#61DAFB", x: 155,  y: -80, delay: "0s"   },
                  { icon: Layers,   color: "#e4e4e7", x: 155,  y: 80,  delay: "1s"   },
                  { icon: Terminal, color: "#60a5fa", x: -185, y: -60, delay: "0.5s" },
                  { icon: Palette,  color: "#38BDF8", x: -185, y: 80,  delay: "1.5s" },
                ].map(({ icon: Icon, color, x, y, delay }) => (
                  <div
                    key={color + x}
                    className="absolute flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900/95 border border-white/10 shadow-lg animate-float pointer-events-none"
                    style={{
                      left: `calc(50% + ${x}px - 20px)`,
                      top:  `calc(50% + ${y}px - 20px)`,
                      animationDelay: delay,
                      boxShadow: `0 0 18px ${color}22`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                ))}
              </div>

              <HeroProfileCard />
            </div>
          </div>

          {/* Right: content */}
          <div className="space-y-8" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateX(44px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <SectionBadge icon={Sparkles} label="Hakkımda" color="blue" />

            <h1 className="text-5xl sm:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-zinc-500 text-3xl sm:text-4xl font-semibold block mb-1">Ben bir</span>
              <TypewriterGradientText
                phrases={HERO_PHRASES}
                active={mounted}
                className="text-5xl sm:text-6xl font-black"
                msPerChar={60}
                msDeletePerChar={32}
                pauseAfterTypeMs={2800}
              />
            </h1>

            <p className="text-zinc-400 leading-relaxed text-lg max-w-lg">
              Merhaba, ben <span className="text-white font-semibold">Fatih Emre Yüce</span>. Kod yazmayı bir sanat olarak gören,{" "}
              <span className="text-blue-400 font-medium">kullanıcı deneyimini</span> her şeyin merkezine koyan bir frontend geliştirici.
              Güzel şeyler inşa etmek için sabırsızlanıyorum.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Konum",       value: "İstanbul, TR", icon: MapPin,   color: "#34d399" },
                { label: "Deneyim",     value: "3+ Yıl",       icon: Calendar, color: "#60a5fa" },
                { label: "Durum",       value: "Müsait",       icon: Zap,      color: "#fbbf24" },
                { label: "Çalışma",     value: "Uzaktan",      icon: Globe,    color: "#a78bfa" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-zinc-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.07] transition-all duration-200"
                  style={{ ["--hc" as string]: color }}
                >
                  <Icon className="h-4 w-4 text-zinc-500 hover:text-white transition-colors" style={{ color }} />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-6 text-sm font-semibold text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] hover:scale-[1.02] transition-all duration-300 gap-2">
                <Link href="/#contact">
                  <ArrowRight className="w-4 h-4" />
                  İletişime Geç
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-blue-500/30 hover:text-white hover:bg-blue-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2">
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

/* ══════════════════════════════════════════════════════
   STORY SECTION
══════════════════════════════════════════════════════ */

function StorySection() {
  const { ref, vis } = useInView(0.1);
  const tilt1 = useTilt();
  const tilt2 = useTilt();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <div className="absolute bottom-1/3 -left-24 w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <Meteors number={10} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Hikayem"
            badgeIcon={BookOpen}
            badgeColor="violet"
            title="Nasıl Başladı,"
            gradient="Bu Yolculuk?"
            sub="Bir sayfada özetlenemez ama önemli anları burada paylaşıyorum."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Narrative */}
          <div className="space-y-6" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-32px)", transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" }}>

            {/* Quote card */}
            <div
              ref={tilt1.ref}
              onMouseMove={tilt1.onMove}
              onMouseEnter={() => tilt1.setHov(true)}
              onMouseLeave={tilt1.onLeave}
              className="relative rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-6 overflow-hidden"
              style={{
                transform: `perspective(800px) rotateX(${tilt1.tilt.x}deg) rotateY(${tilt1.tilt.y}deg)`,
                transition: tilt1.hov ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <Quote className="absolute top-4 right-5 w-16 h-16 text-violet-500/10" aria-hidden />
              <div style={{ transform: "translateZ(12px)" }}>
                <p className="text-zinc-300 text-lg leading-relaxed italic font-light">
                  "Kod yazmak benim için sadece bir meslek değil — düşüncelerimi somutlaştırmanın,
                  hayal ettiğim şeyleri var etmenin en güçlü yolu."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-black text-white">FE</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Fatih Emre Yüce</p>
                    <p className="text-xs text-zinc-500">Frontend Developer</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                background: `radial-gradient(ellipse at ${50 + tilt1.tilt.y * 3}% ${50 - tilt1.tilt.x * 3}%, rgba(139,92,246,0.12) 0%, transparent 65%)`,
                opacity: tilt1.hov ? 1 : 0,
                transition: "opacity 0.3s",
              }} />
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Merak ile Başladı",
                  text: "2018 yılında, ortaokul yıllarında bir YouTube videosunda HTML'e denk geldim. İlk <h1> etiketini tarayıcıda görünce içimde bir şeyler tutuştu. 'Bu nasıl çalışıyor?' sorusu beni o günden beri sürüklüyor.",
                },
                {
                  title: "Meslek Lisesi Dönemi",
                  text: "Bilişim Teknolojileri okuduğum meslek lisesinde teorinin ötesine geçtim. İlk profesyonel stajımda gerçek bir ekiple çalıştım — kod review'lardan, Git branch stratejilerinden tutun da müşteri sunum süreçlerine kadar her şeyi öğrendim.",
                },
                {
                  title: "Üniversite ve Derinleşme",
                  text: "İstanbul Gedik Üniversitesi'nde Yazılım Mühendisliği okurken artık sadece frontend değil, full-stack düşünmeye başladım. Backend, veritabanları ve sistem tasarımı — tüm bu parçaların bir bütün oluşturduğunu görüyorum.",
                },
              ].map(({ title, text }) => (
                <div key={title} className="flex gap-4 group">
                  <div className="shrink-0 mt-1.5 flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform duration-200" />
                    <div className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-blue-500/40 to-transparent" />
                  </div>
                  <div className="pb-4">
                    <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tilt card with mission preview */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(32px)", transition: "opacity 0.7s ease 0.28s, transform 0.7s ease 0.28s" }}>
            <div
              ref={tilt2.ref}
              onMouseMove={tilt2.onMove}
              onMouseEnter={() => tilt2.setHov(true)}
              onMouseLeave={tilt2.onLeave}
              className="relative rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-xl overflow-hidden"
              style={{
                transform: `perspective(900px) rotateX(${tilt2.tilt.x}deg) rotateY(${tilt2.tilt.y}deg) scale(${tilt2.hov ? 1.015 : 1})`,
                transition: tilt2.hov ? "transform 0.12s ease-out" : "transform 0.55s ease-out",
                transformStyle: "preserve-3d",
                boxShadow: tilt2.hov ? "0 24px 60px rgba(59,130,246,0.12),0 0 0 1px rgba(59,130,246,0.15)" : "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header gradient */}
              <div className="relative h-40 overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.2) 0%,rgba(16,185,129,0.1) 100%)" }}>
                <div className="absolute inset-0 opacity-[0.15]" style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
                  backgroundSize: "22px 22px",
                }} />
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/15 blur-3xl animate-glow-pulse" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(20px)" }}>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <p className="mt-3 text-white font-bold text-lg">Amacım</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5" style={{ transform: "translateZ(12px)" }}>
                <p className="text-zinc-300 leading-relaxed">
                  İnsanların hayatını <span className="text-blue-400 font-medium">kolaylaştıran</span>,{" "}
                  <span className="text-emerald-400 font-medium">hızlı</span> ve{" "}
                  <span className="text-violet-400 font-medium">güzel</span> dijital ürünler geliştirmek.
                  Her projeyi bir kullanıcının hayatına dokunan bir fırsat olarak görüyorum.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "15+", label: "Proje",       color: "#60a5fa" },
                    { value: "3+",  label: "Yıl",         color: "#34d399" },
                    { value: "10+", label: "Teknoloji",   color: "#fbbf24" },
                    { value: "∞",   label: "Merak",       color: "#a78bfa" },
                  ].map(({ value, label, color }) => (
                    <div key={label} className="text-center px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                      <p className="text-xl font-black" style={{ color }}>{value}</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specular */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                background: `radial-gradient(ellipse at ${50 + tilt2.tilt.y * 3}% ${50 - tilt2.tilt.x * 3}%, rgba(255,255,255,0.07) 0%,transparent 65%)`,
                opacity: tilt2.hov ? 1 : 0,
                transition: "opacity 0.3s",
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   VISION & MISSION
══════════════════════════════════════════════════════ */

function VisionMissionCard({
  type,
  icon: Icon,
  title,
  text,
  bullets,
  gradient,
  glowColor,
  delay,
  vis,
}: {
  type: "vision" | "mission";
  icon: LucideIcon;
  title: string;
  text: string;
  bullets: string[];
  gradient: string;
  glowColor: string;
  delay: number;
  vis: boolean;
}) {
  const { ref, tilt, hov, setHov, onMove, onLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-xl overflow-hidden h-full"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.02 : 1})`
          : "translateY(40px)",
        transition: vis
          ? hov ? "transform 0.12s ease-out" : "transform 0.55s ease-out"
          : `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        transformStyle: "preserve-3d",
        boxShadow: hov ? `0 24px 60px ${glowColor}20, 0 0 0 1px ${glowColor}20` : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${glowColor}08 0%, transparent 60%)` }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${glowColor}60, transparent)`,
      }} />

      {/* Header */}
      <div className="relative h-48 overflow-hidden flex items-center justify-center" style={{ background: gradient }}>
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-48 h-48 rounded-full blur-3xl animate-glow-pulse" style={{ background: `${glowColor}20` }} />
        </div>

        {/* 3D icon cube */}
        <div style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl" style={{
            background: `linear-gradient(135deg, ${glowColor}cc, ${glowColor}88)`,
            boxShadow: `0 0 48px ${glowColor}50, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          {/* Floating label */}
          <div className="mt-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">{type === "vision" ? "Vizyon" : "Misyon"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5" style={{ transform: "translateZ(14px)" }}>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm">{text}</p>
        <ul className="space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-zinc-300">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: glowColor }} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Specular */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.08) 0%,transparent 65%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s",
      }} />
    </div>
  );
}

function VisionMissionSection() {
  const { ref, vis } = useInView(0.1);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-600/[0.03] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Vizyon & Misyon"
            badgeIcon={Eye}
            badgeColor="emerald"
            title="Nereye Bakıyorum,"
            gradient="Neden Buradayım?"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <VisionMissionCard
            type="vision"
            icon={Eye}
            title="Geleceği Hayal Ediyorum"
            text="Teknolojiyi sadece bir araç olarak değil, insanlar arasındaki mesafeleri kapatan, hayatları kolaylaştıran bir dil olarak görüyorum."
            bullets={[
              "Erişilebilir ve kapsayıcı dijital deneyimler",
              "Tasarım ve mühendisliğin mükemmel buluşması",
              "Ölçeklenebilir ve sürdürülebilir sistemler",
              "Kullanıcının hayatına gerçek değer katmak",
            ]}
            gradient="linear-gradient(135deg,rgba(59,130,246,0.25) 0%,rgba(99,102,241,0.15) 100%)"
            glowColor="#60a5fa"
            delay={100}
            vis={vis}
          />
          <VisionMissionCard
            type="mission"
            icon={Target}
            title="Her Gün Daha İyi"
            text="Yazılım kariyerimde sadece kod değil, problem çözme kültürü inşa etmeyi hedefliyorum. Her proje bir öğrenme, her bug bir büyüme fırsatı."
            bullets={[
              "Temiz, okunabilir ve test edilebilir kod",
              "Hız ile estetik arasındaki dengeyi korumak",
              "Ekibe değer katan, proaktif bir geliştirici olmak",
              "Open source topluluğuna katkı sağlamak",
            ]}
            gradient="linear-gradient(135deg,rgba(16,185,129,0.25) 0%,rgba(6,182,212,0.15) 100%)"
            glowColor="#34d399"
            delay={220}
            vis={vis}
          />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   VALUES
══════════════════════════════════════════════════════ */

function ValueCard({ icon: Icon, title, desc, color, bg, vis, delay }: typeof VALUES[number] & { vis: boolean; delay: number }) {
  const { ref, tilt, hov, setHov, onMove, onLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative rounded-2xl border border-white/[0.07] bg-zinc-900/60 backdrop-blur-sm overflow-hidden h-full cursor-default"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.03 : 1})`
          : "translateY(36px)",
        transition: vis
          ? hov ? "transform 0.12s ease-out" : "transform 0.45s ease-out"
          : `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        transformStyle: "preserve-3d",
        boxShadow: hov ? `0 16px 48px ${color}25` : "none",
      }}
    >
      {/* Hover bg */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity duration-300", bg)} />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

      <div className="relative z-10 p-6 space-y-4 h-full" style={{ transform: "translateZ(10px)" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
          background: `${color}18`,
          boxShadow: hov ? `0 0 24px ${color}30` : "none",
          transition: "box-shadow 0.3s ease",
        }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <h3 className="font-bold text-white text-base">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>

      {/* Specular */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 4}% ${50 - tilt.x * 4}%, rgba(255,255,255,0.07) 0%,transparent 60%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.3s",
      }} />
    </div>
  );
}

function ValuesSection() {
  const { ref, vis } = useInView(0.08);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-amber-600/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-pink-600/[0.03] blur-3xl" />
        <Meteors number={10} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Değerlerim"
            badgeIcon={Heart}
            badgeColor="pink"
            title="Neye İnanıyorum,"
            gradient="Ne İle Çalışıyorum?"
            sub="Kodu sadece yazı olarak değil, bir felsefe olarak benimsiyorum."
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} {...v} vis={vis} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   TECH STACK
══════════════════════════════════════════════════════ */

function TechBadge({ name, icon: Icon, color, group, vis, delay }: typeof techStack[number] & { vis: boolean; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.08] cursor-default overflow-hidden"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-3px) scale(1.03)" : "none") : "translateY(20px)",
        transition: vis ? "opacity 0.5s ease, transform 0.22s ease, box-shadow 0.22s ease" : `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        boxShadow: hov ? `0 10px 32px ${color}22` : "none",
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full" style={{ background: color, opacity: hov ? 0.9 : 0.4, transition: "opacity 0.2s" }} />
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-200">{name}</p>
        <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{group}</p>
      </div>
      {hov && <Sparkles className="absolute top-2 right-2 w-3 h-3 animate-pulse" style={{ color }} />}
    </div>
  );
}

function TechSection() {
  const { ref, vis } = useInView(0.08);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 -left-20 w-[500px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Teknoloji Stack"
            badgeIcon={Code2}
            badgeColor="blue"
            title="Çalıştığım"
            gradient="Teknolojiler"
            sub="Her aracı bir neden için seçiyorum — hız, okunabilirlik ve ölçeklenebilirlik."
          />
        </div>

        {/* Grouped grid */}
        {["Frontend", "Backend", "Araçlar"].map((group) => {
          const items = techStack.filter((t) => t.group === group);
          return (
            <div key={group} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{
                  color: group === "Frontend" ? "#60a5fa" : group === "Backend" ? "#34d399" : "#a78bfa",
                }}>
                  {group}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((t, i) => (
                  <TechBadge key={t.name} {...t} vis={vis} delay={i * 60} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════ */

function TimelineSection() {
  const { ref, vis } = useInView(0.05);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/[0.03] blur-3xl" />
        <Meteors number={10} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Zaman Çizelgesi"
            badgeIcon={Calendar}
            badgeColor="violet"
            title="Yolculuğumun"
            gradient="Önemli Anları"
            sub="Her adım bir hikaye, her deneyim bir ders."
          />
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg,transparent,rgba(99,102,241,0.3) 10%,rgba(99,102,241,0.3) 90%,transparent)" }} />

          <div className="space-y-10 md:space-y-14">
            {TIMELINE.map((item, i) => {
              const isLeft = item.side === "left";
              const Icon   = item.icon;
              const delay  = i * 120;
              return (
                <div
                  key={item.year}
                  className="relative md:grid md:grid-cols-[1fr_48px_1fr] md:gap-4 items-start"
                  style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? "none" : (isLeft ? "translateX(-24px)" : "translateX(24px)"),
                    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
                  }}
                >
                  {/* Left column */}
                  <div className={cn("hidden md:block", !isLeft && "md:invisible")}>
                    {isLeft && <TimelineCard item={item} Icon={Icon} color={item.color} current={item.current} />}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-col items-center pt-5">
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900"
                      style={{ boxShadow: vis ? `0 0 24px ${item.color}50` : "none", transition: "box-shadow 0.5s ease" }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="text-[10px] font-bold mt-2 tracking-wider" style={{ color: item.color }}>{item.year}</div>
                  </div>

                  {/* Right column */}
                  <div className={cn("hidden md:block", isLeft && "md:invisible")}>
                    {!isLeft && <TimelineCard item={item} Icon={Icon} color={item.color} current={item.current} />}
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-900 shrink-0" style={{ boxShadow: `0 0 12px ${item.color}40` }}>
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color }}>{item.year}</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <TimelineCard item={item} Icon={Icon} color={item.color} current={item.current} />
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

function TimelineCard({ item, Icon, color, current }: {
  item: typeof TIMELINE[number];
  Icon: LucideIcon;
  color: string;
  current?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group relative rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-sm overflow-hidden transition-all duration-300 p-5 space-y-3"
      style={{
        boxShadow: hov ? `0 16px 48px ${color}20, 0 0 0 1px ${color}20` : "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }} />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${color}60,transparent)` }} />

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{item.title}</h3>
        {current && (
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">Güncel</span>
        )}
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════════ */

function AnimatedStat({ value, suffix, label, icon: Icon, color, started }: typeof STATS[number] & { started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const duration = 2000;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p     = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value]);

  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden cursor-default"
      style={{
        transform: hov ? "perspective(400px) translateZ(18px) scale(1.05)" : "perspective(400px) translateZ(0) scale(1)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        boxShadow: hov ? `0 16px 48px ${color}20` : "none",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" style={{
        background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)`,
      }} />
      <div className="relative z-10 space-y-3">
        <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <p className="text-3xl font-black tabular-nums" style={{ color }}>
          {count}<span className="text-xl">{suffix}</span>
        </p>
        <p className="text-xs text-zinc-500 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

function StatsSection() {
  const { ref, vis } = useInView(0.15);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-20 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/[0.04] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          {STATS.map((s) => <AnimatedStat key={s.label} {...s} started={vis} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   WHY ME
══════════════════════════════════════════════════════ */

function WhyMeSection() {
  const { ref, vis } = useInView(0.1);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 left-1/3 w-[500px] h-[400px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
        <Meteors number={10} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <SectionHeader
            badge="Neden Ben?"
            badgeIcon={Star}
            badgeColor="amber"
            title="Beni Farklı Kılan"
            gradient="Özelliklerim"
            sub="Her geliştiricinin kendine özgü bir bakış açısı var. İşte benimki."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ME.map(({ icon: Icon, title, desc, color }, i) => {
            const delay = i * 100;
            return (
              <div
                key={title}
                className="group relative rounded-2xl border border-white/[0.07] bg-zinc-900/60 p-6 space-y-4 overflow-hidden"
                style={{
                  opacity: vis ? 1 : 0,
                  transform: vis ? "none" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)` }} />
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg,transparent,${color}60,transparent)` }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${color}15`, boxShadow: `0 0 0 0 ${color}40` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════════════════ */

function CTASection() {
  const { ref, vis } = useInView(0.2);
  const tilt = useTilt();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/[0.06] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-emerald-600/[0.05] blur-2xl" />
        <Meteors number={14} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseEnter={() => tilt.setHov(true)}
          onMouseLeave={tilt.onLeave}
          className="relative rounded-3xl border border-white/[0.08] bg-zinc-900/80 backdrop-blur-xl overflow-hidden text-center p-12 sm:p-16"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis
              ? `perspective(1000px) rotateX(${tilt.tilt.x * 0.5}deg) rotateY(${tilt.tilt.y * 0.5}deg)`
              : "translateY(40px)",
            transition: vis
              ? tilt.hov ? "transform 0.15s ease-out, opacity 0s" : "transform 0.55s ease-out, opacity 0s"
              : "opacity 0.7s ease, transform 0.7s ease",
            transformStyle: "preserve-3d",
            boxShadow: tilt.hov
              ? "0 32px 80px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.15)"
              : "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* BG pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle,#60a5fa 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
          {/* Corner orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/[0.05] blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/[0.05] blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

          <div className="relative z-10 space-y-8" style={{ transform: "translateZ(20px)" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 tracking-[0.18em] uppercase">Hazır mısın?</span>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                <span className="text-white">Birlikte</span>
                <br />
                <AnimatedGradientText className="text-4xl sm:text-5xl font-black">
                  Harika Şeyler Yapalım
                </AnimatedGradientText>
              </h2>
              <p className="mt-5 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                Yeni bir proje, iş birliği ya da sadece merhaba demek için — kapım her zaman açık.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-3 text-base font-semibold text-white border-0 shadow-[0_0_28px_rgba(59,130,246,0.35)] hover:shadow-[0_0_48px_rgba(59,130,246,0.55)] hover:scale-[1.02] transition-all duration-300 gap-2 h-auto">
                <Link href="/#contact">
                  <ArrowRight className="w-5 h-5" />
                  İletişime Geç
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-blue-500/30 hover:text-white hover:bg-blue-500/10 px-8 py-3 text-base font-semibold transition-all duration-300 gap-2 h-auto">
                <Link href="/#projects">
                  Projeleri Gör
                </Link>
              </Button>
            </div>
          </div>

          {/* Specular */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
            background: `radial-gradient(ellipse at ${50 + tilt.tilt.y * 2}% ${50 - tilt.tilt.x * 2}%, rgba(255,255,255,0.06) 0%,transparent 65%)`,
            opacity: tilt.hov ? 1 : 0,
            transition: "opacity 0.3s",
          }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <StatsSection />
        <StorySection />
        <VisionMissionSection />
        <ValuesSection />
        <TechSection />
        <TimelineSection />
        <WhyMeSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
