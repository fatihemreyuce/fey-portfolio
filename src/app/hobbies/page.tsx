"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Code2,
  Music2,
  Gamepad2,
  Camera,
  BookOpen,
  Dumbbell,
  Heart,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Coffee,
  Brain,
  Palette,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TypewriterGradientText } from "@/components/magicui/typewriter-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ─── data ─────────────────────────────────────────── */

const HERO_PHRASES = [
  "Kod Yazarım",
  "Müzik Dinlerim",
  "Oyun Oynarım",
  "Fotoğraf Çekerim",
  "Kitap Okurum",
  "Spor Yaparım",
] as const;

type VisualKind = "terminal" | "equalizer" | "gaming" | "camera" | "books" | "fitness";

interface Hobby {
  id: VisualKind;
  title: string;
  description: string;
  extendedDesc: string;
  icon: LucideIcon;
  accent: { from: string; to: string };
  tags: string[];
  workConnection: string;
  funFact: string;
}

const hobbies: Hobby[] = [
  {
    id: "terminal",
    title: "Kod Yazmak",
    description: "Mesai dışında da bir şeyler inşa etmeyi seviyorum. Açık kaynak projelere katkı sunmak, yeni framework'leri denemek ve kişisel araçlar geliştirmek benim için bir hobi.",
    extendedDesc: "Geceleri bazen sadece eğlenmek için kod yazarım — küçük CLI araçları, otomasyon scriptleri ya da sıfırdan bir UI kütüphanesi denemesi. Bu, teknik gelişimimin en hızlı motorudur.",
    icon: Code2,
    accent: { from: "#3b82f6", to: "#06b6d4" },
    tags: ["Açık Kaynak", "Side Projects", "Yeni Teknoloji", "CLI Araçları"],
    workConnection: "Her side project, iş projelerinde kullanamayacağım teknolojiyi deneme alanım olur.",
    funFact: "İlk side projectim bir okul programını scrape eden Python scriptiydi.",
  },
  {
    id: "equalizer",
    title: "Müzik",
    description: "Çoğunlukla pop, metal ve klasik rock dinliyorum; yanında lo-fi ve ambient de sık açıyorum.",
    extendedDesc: "Müzik benim için bir arka plan değil, konsantrasyonumu düzenleyen bir araç. Derin odak gerektiren işlerde lo-fi, yaratıcılık gerektirenlerde rock dinlerim.",
    icon: Music2,
    accent: { from: "#ec4899", to: "#f97316" },
    tags: ["Pop", "Metal", "Klasik Rock", "Lo-fi", "Ambient", "Indie"],
    workConnection: "Müzik ritmi gibi kod ritmi de var — düzenli, tutarlı ve akıcı.",
    funFact: "Kod yazarken müzik dinlemenin üretkenliği %40 artırdığını söylüyorlar. Katılıyorum.",
  },
  {
    id: "gaming",
    title: "Oyun",
    description: "Strateji, RPG ve MOBA türlerini seviyorum; hikaye odaklı yapımlara da ilgi duyuyorum.",
    extendedDesc: "Oyunlar beni iki açıdan büyüler: sistem tasarımı ve hikaye anlatımı. Bir oyunun nasıl balance edildiğini, ekonomisinin nasıl kurgulandığını düşünmek yazılım mimarisine ilham veriyor.",
    icon: Gamepad2,
    accent: { from: "#8b5cf6", to: "#3b82f6" },
    tags: ["Strateji", "RPG", "MOBA", "Hikayeli", "Indie", "Souls-like"],
    workConnection: "Oyun tasarımındaki sistem düşüncesi, backend mimarisini planlarken devreye giriyor.",
    funFact: "Dark Souls bitirdiğimden beri hiçbir bug beni yıldırmıyor.",
  },
  {
    id: "camera",
    title: "Fotoğrafçılık",
    description: "Sokak fotoğrafçılığı ve manzara çekimi. Işığı ve kompozisyonu anlamak, UI tasarımına bakış açımı genişletiyor.",
    extendedDesc: "Fotoğrafçılık beni 'çerçevelemeyi' öğretti. Bir sahneyi nasıl sunacağın, neyi vurgulayacağın — bunlar UI/UX tasarımıyla doğrudan örtüşüyor.",
    icon: Camera,
    accent: { from: "#f59e0b", to: "#ef4444" },
    tags: ["Sokak", "Manzara", "Kompozisyon", "Işık", "Golden Hour"],
    workConnection: "Vizüel hiyerarşi ve kompozisyon anlayışım UI tasarımlarıma direkt yansıyor.",
    funFact: "En iyi fotoğrafımı sabah 5:30'da, İstanbul Boğazı'nda çektim.",
  },
  {
    id: "books",
    title: "Kitap",
    description: "Teknik kitaplar, bilim-kurgu romanları ve psikoloji. Okumak düşünme biçimimi şekillendiriyor.",
    extendedDesc: "Her yıl en az 12 kitap okumayı hedefliyorum. Clean Code ve The Pragmatic Programmer gibi teknik klasiklerden, Foundation serisi gibi bilim-kurgulara kadar geniş bir yelpaze.",
    icon: BookOpen,
    accent: { from: "#10b981", to: "#06b6d4" },
    tags: ["Bilim-Kurgu", "Teknik", "Psikoloji", "Biyografi", "Felsefe"],
    workConnection: "Okumak analitik düşünceyi güçlendiriyor ve problem çözme perspektiflerini genişletiyor.",
    funFact: "Şu an okuduğum kitap: 'A Philosophy of Software Design' — John Ousterhout.",
  },
  {
    id: "fitness",
    title: "Spor",
    description: "Düzenli egzersiz hem fiziksel hem zihinsel sağlık için. Uzun süreli kod seanslarının vazgeçilmez dengesi.",
    extendedDesc: "Haftada 4 gün spor yapıyorum. Sabah antrenmanı zihnimi açıyor ve güne odaklanmış başlamayı sağlıyor. Uzun oturumlar sonrası hareket etmek beyin yorgunluğunu atıyor.",
    icon: Dumbbell,
    accent: { from: "#14b8a6", to: "#84cc16" },
    tags: ["Koşu", "Ağırlık", "Yürüyüş", "HIIT", "Mobilite"],
    workConnection: "Düzenli spor, uzun odak süreleri için gerekli zihinsel dayanıklılığı sağlıyor.",
    funFact: "Haftada ~20km koşarım. Her kilometre, bir bug fix gibi tatmin edici.",
  },
];

const CONNECTIONS = [
  { hobby: "Oyun",         skill: "Sistem Tasarımı",    icon: Brain,   color: "#a78bfa" },
  { hobby: "Fotoğraf",     skill: "UI/UX Hissi",        icon: Palette, color: "#fbbf24" },
  { hobby: "Kitap",        skill: "Problem Analizi",    icon: Star,    color: "#34d399" },
  { hobby: "Müzik",        skill: "Ritim & Akış",       icon: Zap,     color: "#f472b6" },
  { hobby: "Spor",         skill: "Disiplin & Odak",    icon: Coffee,  color: "#60a5fa" },
  { hobby: "Kod (Hobi)",   skill: "Yeni Teknoloji",     icon: Code2,   color: "#38BDF8" },
];

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

/* ─── Visuals ─────────────────────────────────────────  */

function TerminalVisual() {
  const lines = [
    { tokens: [{ c: "#60a5fa", t: "import " }, { c: "#e4e4e7", t: "{ useState } " }, { c: "#60a5fa", t: "from " }, { c: "#86efac", t: "'react'" }] },
    { tokens: [] },
    { tokens: [{ c: "#c084fc", t: "const " }, { c: "#fbbf24", t: "useIdea " }, { c: "#e4e4e7", t: "= () => {" }] },
    { tokens: [{ c: "#e4e4e7", t: "  " }, { c: "#c084fc", t: "const " }, { c: "#e4e4e7", t: "[spark, build] = useState(💡)" }] },
    { tokens: [{ c: "#e4e4e7", t: "  " }, { c: "#60a5fa", t: "return " }, { c: "#86efac", t: "<Portfolio />" }] },
    { tokens: [{ c: "#e4e4e7", t: "}" }] },
  ];
  return (
    <div className="w-full h-full p-4 font-mono text-[11px] leading-5 select-none">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-zinc-600 text-[10px]">index.tsx</span>
      </div>
      <div className="space-y-0.5">
        {lines.map((line, li) => (
          <div key={li} className="flex items-center">
            <span className="text-zinc-700 w-4 text-right mr-3 shrink-0 text-[10px]">{li + 1}</span>
            <span>
              {line.tokens.map((tok, ti) => <span key={ti} style={{ color: tok.c }}>{tok.t}</span>)}
              {li === lines.length - 1 && <span className="inline-block w-[6px] h-[14px] bg-blue-400 ml-0.5 animate-cursor align-middle" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EqualizerVisual({ accent }: { accent: { from: string; to: string } }) {
  const heights = [55, 80, 40, 95, 65, 75, 45, 88, 60, 72, 50, 85];
  return (
    <div className="w-full h-full flex items-end justify-center gap-1.5 px-6 pb-4 pt-6">
      {heights.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-full animate-eq origin-bottom"
          style={{ height: `${h}%`, background: `linear-gradient(180deg,${accent.from},${accent.to})`, animationDelay: `${i * 0.11}s`, animationDuration: `${0.7 + (i % 4) * 0.18}s`, opacity: 0.7 + (i % 3) * 0.1 }} />
      ))}
    </div>
  );
}

function GamingVisual({ accent }: { accent: { from: string; to: string } }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 select-none">
      <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center animate-float"
        style={{ background: `linear-gradient(135deg,${accent.from}40,${accent.to}40)`, border: `1px solid ${accent.from}50`, boxShadow: `0 0 28px ${accent.from}40` }}>
        <Gamepad2 className="w-7 h-7 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: accent.from }}>
          <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: accent.from }} />
        </div>
      </div>
      <div className="w-28 space-y-1">
        <div className="flex justify-between text-[9px] font-mono" style={{ color: accent.from }}>
          <span>LEVEL</span><span>42</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
          <div className="h-full rounded-full w-[68%]" style={{ background: `linear-gradient(90deg,${accent.from},${accent.to})`, boxShadow: `0 0 6px ${accent.from}70` }} />
        </div>
      </div>
    </div>
  );
}

function CameraVisual({ accent }: { accent: { from: string; to: string } }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ border: `2px dashed ${accent.from}45` }} />
        <div className="absolute inset-4 rounded-full animate-spin-reverse" style={{ border: `1.5px dashed ${accent.to}40` }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full animate-orbit-dot" style={{ background: accent.from, boxShadow: `0 0 8px ${accent.from}` }} />
        <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg,${accent.from}30,${accent.to}30)`, border: `1px solid ${accent.from}50` }}>
          <Camera className="w-5 h-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}

function BooksVisual({ accent }: { accent: { from: string; to: string } }) {
  const books = [
    { w: 36, h: 52, color: accent.from, delay: "0s",   rotate: "-8deg" },
    { w: 40, h: 60, color: "#e4e4e7",   delay: "0.4s", rotate: "0deg"  },
    { w: 34, h: 48, color: accent.to,   delay: "0.8s", rotate: "6deg"  },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="relative flex items-end gap-1.5 h-20">
        {books.map((b, i) => (
          <div key={i} className="rounded-sm animate-float"
            style={{ width: b.w, height: b.h, background: `linear-gradient(180deg,${b.color}70,${b.color}40)`, border: `1px solid ${b.color}50`, transform: `rotate(${b.rotate})`, animationDelay: b.delay, animationDuration: "3.5s" }} />
        ))}
      </div>
    </div>
  );
}

function FitnessVisual({ accent }: { accent: { from: string; to: string } }) {
  const rings = [
    { r: 44, stroke: accent.from, dash: "75%" },
    { r: 34, stroke: accent.to,   dash: "88%" },
    { r: 24, stroke: "#e4e4e7",   dash: "60%" },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center gap-8 select-none">
      <div className="relative w-24 h-24">
        {rings.map(({ r, stroke, dash }, i) => {
          const cx = 48, cy = 48, circum = 2 * Math.PI * r;
          return (
            <svg key={i} className="absolute inset-0 -rotate-90" width="96" height="96" viewBox="0 0 96 96">
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="5" opacity="0.12" />
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={circum} strokeDashoffset={circum * (1 - parseFloat(dash) / 100)}
                style={{ filter: `drop-shadow(0 0 4px ${stroke}80)` }} />
            </svg>
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="w-5 h-5 animate-heartbeat" style={{ color: accent.from, fill: `${accent.from}40` }} />
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: "Koşu",    val: "75%", color: accent.from },
          { label: "Ağırlık", val: "88%", color: accent.to },
          { label: "Yürüyüş", val: "60%", color: "#e4e4e7" },
        ].map(({ label, val, color }) => (
          <div key={label} className="space-y-0.5">
            <div className="flex justify-between text-[10px]" style={{ color }}>
              <span>{label}</span><span>{val}</span>
            </div>
            <div className="w-20 h-1 rounded-full bg-white/[0.07] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: val, background: color, boxShadow: `0 0 6px ${color}60` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hobby Card (3D tilt + extended) ───────────────── */

function HobbyCard({ hobby, vis, delay, expanded = false }: { hobby: Hobby; vis: boolean; delay: number; expanded?: boolean }) {
  const cardRef         = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov,  setHov]  = useState(false);
  const [open, setOpen] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ x: ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -6, y: ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6 });
  }, []);
  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHov(false); }, []);
  const Icon = hobby.icon;

  const visual = {
    terminal:  <TerminalVisual />,
    equalizer: <EqualizerVisual accent={hobby.accent} />,
    gaming:    <GamingVisual accent={hobby.accent} />,
    camera:    <CameraVisual accent={hobby.accent} />,
    books:     <BooksVisual accent={hobby.accent} />,
    fitness:   <FitnessVisual accent={hobby.accent} />,
  }[hobby.id];

  const visualH = expanded ? "h-52" : "h-36";

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
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.015 : 1})`
          : "translateY(40px)",
        transition: vis ? (hov ? "transform 0.12s ease-out" : "transform 0.5s ease-out") : `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        transformStyle: "preserve-3d",
        ...(hov
          ? {
              boxShadow: `0 20px 60px ${hobby.accent.from}22, 0 0 0 1px ${hobby.accent.from}28`,
            }
          : {}),
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={4} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg,${hobby.accent.from}10,transparent 55%,${hobby.accent.to}08)` }} />

      {/* Visual header */}
      <div className={cn("relative overflow-hidden shrink-0", visualH)} style={{ background: `linear-gradient(135deg,${hobby.accent.from}22,${hobby.accent.to}12)` }}>
        <div className="absolute inset-0 opacity-[0.1]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-20 animate-glow-pulse" style={{ background: hobby.accent.to }} />
        <div className="relative z-10 w-full h-full">{visual}</div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5" style={{ transform: "translateZ(10px)" }}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
              style={{ background: `linear-gradient(135deg,${hobby.accent.from}35,${hobby.accent.to}35)`, boxShadow: `0 0 12px ${hobby.accent.from}30` }}>
              <Icon className="h-4 w-4 !text-white" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white" style={{ textShadow: `0 0 20px ${hobby.accent.from}40` }}>
              {hobby.title}
            </h3>
          </div>
        </div>

        <p className="flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{hobby.description}</p>

        {/* Extended content */}
        {open && (
          <div className="space-y-3 border-t border-zinc-200 pt-3 dark:border-white/[0.06]">
            <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{hobby.extendedDesc}</p>
            <div className="space-y-1 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">İşe bağlantısı</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">{hobby.workConnection}</p>
            </div>
            <div className="space-y-1 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Eğlenceli gerçek</p>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">{hobby.funFact}</p>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium dark:border-white/[0.07] dark:bg-white/[0.04]" style={{ color: hobby.accent.from }}>{tag}</span>
          ))}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200"
          style={{ color: open ? hobby.accent.from : "#71717a" }}
        >
          <span>{open ? "Daha az gör" : "Daha fazla gör"}</span>
          <ArrowRight className={cn("w-3 h-3 transition-transform duration-200", open ? "rotate-90" : "rotate-0")} />
        </button>
      </div>

      {/* Specular */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.06) 0%,transparent 60%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />
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
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] rounded-full bg-pink-600/[0.05] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-600/[0.04] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle,#ec4899 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <Meteors number={16} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <div className="mb-10" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-12px)", transition: "opacity 0.5s, transform 0.5s" }}>
          <Link href="/" className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-pink-300 hover:bg-pink-50 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-pink-500/30 dark:hover:bg-pink-500/[0.06] dark:hover:text-white">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />Ana Sayfa
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-8" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(-40px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-xs font-semibold text-pink-400 tracking-[0.18em] uppercase">Hobiler</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-zinc-500 text-3xl sm:text-4xl font-semibold block mb-2">Boş Zamanımda</span>
              <TypewriterGradientText
                phrases={HERO_PHRASES}
                active={mounted}
                className="text-5xl sm:text-6xl font-black"
                msPerChar={55}
                msDeletePerChar={28}
                pauseAfterTypeMs={2400}
              />
            </h1>

            <p className="text-zinc-400 leading-relaxed text-lg max-w-lg">
              Kod sadece bir iş değil — bir yaşam biçimi. Ama hayat sadece koddan ibaret değil.
              İşte ekranın ötesindeki ben.
            </p>

            {/* Hobby quick pills */}
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.id} className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium dark:border-white/[0.07] dark:bg-white/[0.03]" style={{ color: h.accent.from }}>
                    <Icon className="w-3.5 h-3.5" />{h.title}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 to-orange-600 px-6 text-sm font-semibold text-white border-0 shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_36px_rgba(236,72,153,0.45)] hover:scale-[1.02] transition-all duration-300 gap-2">
                <Link href="/#contact">
                  <ArrowRight className="w-4 h-4" />İletişime Geç
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-pink-500/30 hover:text-white hover:bg-pink-500/10 px-6 text-sm font-semibold transition-all duration-300 gap-2">
                <Link href="/about">Hakkımda</Link>
              </Button>
            </div>
          </div>

          {/* Right: floating hobby icons */}
          <div className="hidden lg:flex items-center justify-center" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(40px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-pink-600/10 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center border border-pink-500/30 bg-pink-500/10 shadow-[0_0_48px_rgba(236,72,153,0.25)]">
                  <Heart className="w-12 h-12 text-pink-400 animate-heartbeat" />
                </div>
              </div>
              {hobbies.map((h, i) => {
                const Icon = h.icon;
                const angle = (i / hobbies.length) * 360 - 90;
                const r = 130;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div key={h.id} className="absolute flex h-12 w-12 animate-float items-center justify-center rounded-xl border border-zinc-200 bg-white/95 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/90"
                    style={{ left: `calc(50% + ${x}px - 24px)`, top: `calc(50% + ${y}px - 24px)`, animationDelay: `${i * 0.5}s`, boxShadow: `0 0 20px ${h.accent.from}30` }}>
                    <Icon className="w-5 h-5" style={{ color: h.accent.from }} />
                  </div>
                );
              })}
              <div className="absolute inset-4 rounded-full border border-pink-500/10 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-orange-500/[0.07] animate-spin-reverse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bento Grid ────────────────────────────────────── */

function HobbiesGridSection() {
  const { ref, vis } = useInView(0.05);
  const [coding, music, gaming, camera, books, fitness] = hobbies;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-pink-600/[0.04] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-semibold text-pink-400 tracking-[0.18em] uppercase">Tüm Hobiler</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Ekrandan Uzakta</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">Ne Yapıyorum?</AnimatedGradientText>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Her kartı tıklayarak detaylara ulaşabilirsin — işle bağlantıları ve eğlenceli gerçekler dahil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1: Coding (2 cols) + Music */}
          <div className="md:col-span-2">
            <HobbyCard hobby={coding} vis={vis} delay={100} expanded />
          </div>
          <div>
            <HobbyCard hobby={music} vis={vis} delay={180} />
          </div>

          {/* Row 2: Gaming + Camera + Books */}
          {[gaming, camera, books].map((hobby, i) => (
            <div key={hobby.id}>
              <HobbyCard hobby={hobby} vis={vis} delay={240 + i * 80} />
            </div>
          ))}

          {/* Row 3: Fitness (full width) */}
          <div className="md:col-span-3">
            <HobbyCard hobby={fitness} vis={vis} delay={480} expanded />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hobbies → Work Connections ───────────────────── */

function ConnectionsSection() {
  const { ref, vis } = useInView(0.1);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-amber-600/[0.03] blur-3xl" />
        <Meteors number={10} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-14" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-[0.18em] uppercase">Hayat ↔ İş Bağlantısı</span>
          </div>
          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">Hobiler Nasıl</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">İşimi Şekillendiriyor?</AnimatedGradientText>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Her hobi, yazılım dünyasına bir şekilde katkı sağlıyor. İşte o bağlantılar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONNECTIONS.map(({ hobby, skill, icon: Icon, color }, i) => (
            <div key={hobby} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/[0.07] dark:bg-zinc-900/50"
              style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 50%, ${color}10 0%,transparent 70%)` }} />
              <div className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: color }} />

              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-zinc-500">{hobby}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-700" />
                  <span className="text-xs font-semibold" style={{ color }}>{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Fun Stats ─────────────────────────────────────── */

function FunStatsSection() {
  const { ref, vis } = useInView(0.15);
  const stats = [
    { emoji: "🎵", value: "∞",    label: "Playlist Saati",   color: "#ec4899" },
    { emoji: "📚", value: "12+",  label: "Kitap / Yıl",      color: "#34d399" },
    { emoji: "🎮", value: "100+", label: "Oyun Saati / Ay",  color: "#8b5cf6" },
    { emoji: "🏃", value: "20km", label: "Haftalık Koşu",    color: "#14b8a6" },
    { emoji: "📷", value: "500+", label: "Fotoğraf / Ay",    color: "#f59e0b" },
    { emoji: "💻", value: "∞",    label: "Side Project",     color: "#60a5fa" },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-20 overflow-hidden border-b border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-pink-600/[0.03] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-zinc-600 uppercase tracking-[0.2em] mb-8"
          style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease" }}>
          Rakamlarla Hobiler
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {stats.map(({ emoji, value, label, color }, i) => (
            <div key={label} className="group cursor-default rounded-2xl border border-zinc-200 bg-white p-4 text-center transition-all duration-200 hover:border-zinc-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/15"
              style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, border-color 0.2s` }}>
              <p className="text-2xl mb-1">{emoji}</p>
              <p className="text-lg font-black tabular-nums" style={{ color }}>{value}</p>
              <p className="text-[10px] text-zinc-600 mt-0.5">{label}</p>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-pink-600/[0.05] blur-3xl" />
        <Meteors number={12} symmetric />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 text-center space-y-8"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10">
          <Globe className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-xs font-semibold text-pink-400 tracking-[0.18em] uppercase">Birlikte</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
          <span className="text-zinc-900 dark:text-white">Sadece Kod Değil,</span>
          <br />
          <AnimatedGradientText className="text-4xl sm:text-5xl font-black">İnsan Olarak Ben</AnimatedGradientText>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Beni tanıdın. Şimdi birlikte çalışalım — meraklı, tutku dolu ve her zaman öğrenmeye açık biriyle.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 to-orange-600 px-8 py-3 text-base font-semibold text-white border-0 shadow-[0_0_28px_rgba(236,72,153,0.35)] hover:shadow-[0_0_48px_rgba(236,72,153,0.55)] hover:scale-[1.02] transition-all duration-300 gap-2 h-auto">
            <Link href="/#contact">
              <ArrowRight className="w-5 h-5" />İletişime Geç
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl border-white/10 bg-white/[0.03] text-zinc-300 hover:border-pink-500/30 hover:text-white hover:bg-pink-500/10 px-8 py-3 text-base font-semibold transition-all duration-300 gap-2 h-auto">
            <Link href="/about">Hakkımda Daha Fazla</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────── */

export default function HobbiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <HobbiesGridSection />
        <ConnectionsSection />
        <FunStatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
