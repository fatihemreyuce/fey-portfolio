"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Code2,
  Music2,
  Gamepad2,
  Camera,
  BookOpen,
  Dumbbell,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/I18nProvider";

/* ─── data ──────────────────────────────────────────── */

type VisualKind = "terminal" | "equalizer" | "gaming" | "camera" | "books" | "fitness";

interface Hobby {
  id: VisualKind;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: { from: string; to: string };
  tags: string[];
  span: "lg" | "md" | "sm" | "full"; // bento sizing
}

const hobbies: Hobby[] = [
  {
    id: "terminal",
    title: "Kod Yazmak",
    description:
      "Mesai dışında da bir şeyler inşa etmeyi seviyorum. Açık kaynak projelere katkı sunmak, yeni framework'leri denemek ve kişisel araçlar geliştirmek benim için bir hobi.",
    icon: Code2,
    accent: { from: "#3b82f6", to: "#06b6d4" },
    tags: ["Açık Kaynak", "Side Projects", "Yeni Teknoloji"],
    span: "lg",
  },
  {
    id: "equalizer",
    title: "Müzik",
    description:
      "Çoğunlukla pop, metal ve klasik rock dinliyorum; yanında lo-fi ve ambient de sık açıyorum.",
    icon: Music2,
    accent: { from: "#ec4899", to: "#f97316" },
    tags: ["Pop", "Metal", "Klasik Rock", "Lo-fi", "Ambient"],
    span: "md",
  },
  {
    id: "gaming",
    title: "Oyun",
    description:
      "Strateji, RPG ve MOBA türlerini seviyorum; hikaye odaklı yapımlara da ilgi duyuyorum. Oyunlardaki sistem tasarımları bazen yazılım mimarisine ilham veriyor.",
    icon: Gamepad2,
    accent: { from: "#8b5cf6", to: "#3b82f6" },
    tags: ["Strateji", "RPG", "MOBA", "Hikayeli", "Indie"],
    span: "md",
  },
  {
    id: "camera",
    title: "Fotoğrafçılık",
    description:
      "Sokak fotoğrafçılığı ve manzara çekimi. Işığı ve kompozisyonu anlamak, UI tasarımına bakış açımı genişletiyor.",
    icon: Camera,
    accent: { from: "#f59e0b", to: "#ef4444" },
    tags: ["Sokak", "Manzara", "Kompozisyon"],
    span: "md",
  },
  {
    id: "books",
    title: "Kitap",
    description:
      "Teknik kitaplar, bilim-kurgu romanları ve psikoloji. Okumak düşünme biçimimi şekillendiriyor.",
    icon: BookOpen,
    accent: { from: "#10b981", to: "#06b6d4" },
    tags: ["Bilim-Kurgu", "Teknik", "Psikoloji"],
    span: "md",
  },
  {
    id: "fitness",
    title: "Spor",
    description:
      "Düzenli egzersiz hem fiziksel hem zihinsel sağlık için. Uzun süreli kod seanslarının vazgeçilmez dengesi.",
    icon: Dumbbell,
    accent: { from: "#14b8a6", to: "#84cc16" },
    tags: ["Koşu", "Ağırlık", "Yürüyüş"],
    span: "full",
  },
];

const EN_HOBBY_BY_ID: Record<VisualKind, Pick<Hobby, "title" | "description" | "tags">> = {
  terminal: {
    title: "Coding",
    description:
      "I enjoy building things outside work too. Contributing to open source, trying new frameworks, and creating personal tools is a hobby for me.",
    tags: ["Open Source", "Side Projects", "New Tech"],
  },
  equalizer: {
    title: "Music",
    description: "I mostly listen to pop, metal, and classic rock, and often switch to lo-fi and ambient for deep focus.",
    tags: ["Pop", "Metal", "Classic Rock", "Lo-fi", "Ambient"],
  },
  gaming: {
    title: "Gaming",
    description:
      "I enjoy strategy, RPG, and MOBA games, and I also love story-driven titles. Game systems often inspire my software thinking.",
    tags: ["Strategy", "RPG", "MOBA", "Story-rich", "Indie"],
  },
  camera: {
    title: "Photography",
    description: "Street and landscape photography. Understanding light and composition improves my UI perspective.",
    tags: ["Street", "Landscape", "Composition"],
  },
  books: {
    title: "Books",
    description: "Technical books, science fiction, and psychology. Reading shapes how I think.",
    tags: ["Sci-Fi", "Technical", "Psychology"],
  },
  fitness: {
    title: "Fitness",
    description: "Regular exercise keeps both body and mind sharp. It balances long coding sessions.",
    tags: ["Running", "Weights", "Walking"],
  },
};

/* ─── Visual components ─────────────────────────────── */

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
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-zinc-600 text-[10px]">index.tsx</span>
      </div>
      {/* Lines */}
      <div className="space-y-0.5">
        {lines.map((line, li) => (
          <div key={li} className="flex items-center">
            <span className="text-zinc-700 w-4 text-right mr-3 shrink-0 text-[10px]">{li + 1}</span>
            <span>
              {line.tokens.map((tok, ti) => (
                <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
              ))}
              {li === lines.length - 1 && (
                <span
                  className="inline-block w-[6px] h-[14px] bg-blue-400 ml-0.5 animate-cursor align-middle"
                />
              )}
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
        <div
          key={i}
          className="flex-1 rounded-t-full animate-eq origin-bottom"
          style={{
            height:              `${h}%`,
            background:          `linear-gradient(180deg, ${accent.from}, ${accent.to})`,
            animationDelay:      `${i * 0.11}s`,
            animationDuration:   `${0.7 + (i % 4) * 0.18}s`,
            opacity:             0.7 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function GamingVisual({ accent }: { accent: { from: string; to: string } }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 select-none">
      {/* Controller icon with glow */}
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center animate-float"
        style={{
          background: `linear-gradient(135deg, ${accent.from}40, ${accent.to}40)`,
          border:     `1px solid ${accent.from}50`,
          boxShadow:  `0 0 28px ${accent.from}40`,
        }}
      >
        <Gamepad2 className="w-7 h-7 text-white" />
        {/* Ping dot */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: accent.from }}
        >
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{ background: accent.from }}
          />
        </div>
      </div>

      {/* Health bar */}
      <div className="w-28 space-y-1">
        <div className="flex justify-between text-[9px] font-mono" style={{ color: accent.from }}>
          <span>LEVEL</span><span>42</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
          <div
            className="h-full rounded-full w-[68%]"
            style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`, boxShadow: `0 0 6px ${accent.from}70` }}
          />
        </div>
      </div>
    </div>
  );
}

function CameraVisual({ accent }: { accent: { from: string; to: string } }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      {/* Aperture rings */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            border:      `2px dashed ${accent.from}45`,
          }}
        />
        {/* Middle ring reverse */}
        <div
          className="absolute inset-4 rounded-full animate-spin-reverse"
          style={{
            border:      `1.5px dashed ${accent.to}40`,
          }}
        />
        {/* Orbit dot */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full animate-orbit-dot"
          style={{ background: accent.from, boxShadow: `0 0 8px ${accent.from}` }}
        />
        {/* Inner icon */}
        <div
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accent.from}30, ${accent.to}30)`,
            border:     `1px solid ${accent.from}50`,
          }}
        >
          <Camera className="w-5 h-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}

function BooksVisual({ accent }: { accent: { from: string; to: string } }) {
  const books = [
    { w: 36, h: 52, color: accent.from, delay: "0s",    rotate: "-8deg"  },
    { w: 40, h: 60, color: "#e4e4e7",   delay: "0.4s",  rotate: "0deg"   },
    { w: 34, h: 48, color: accent.to,   delay: "0.8s",  rotate: "6deg"   },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="relative flex items-end gap-1.5 h-20">
        {books.map((b, i) => (
          <div
            key={i}
            className="rounded-sm animate-float"
            style={{
              width:             b.w,
              height:            b.h,
              background:        `linear-gradient(180deg, ${b.color}70, ${b.color}40)`,
              border:            `1px solid ${b.color}50`,
              transform:         `rotate(${b.rotate})`,
              animationDelay:    b.delay,
              animationDuration: "3.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FitnessVisual({ accent }: { accent: { from: string; to: string } }) {
  /* Three activity rings */
  const rings = [
    { r: 44, stroke: accent.from,  dash: "75%",  delay: "0s"   },
    { r: 34, stroke: accent.to,    dash: "88%",  delay: "0.2s" },
    { r: 24, stroke: "#e4e4e7",    dash: "60%",  delay: "0.4s" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center gap-10 select-none">
      {/* Rings */}
      <div className="relative w-24 h-24">
        {rings.map(({ r, stroke, dash }, i) => {
          const cx     = 48;
          const cy     = 48;
          const circum = 2 * Math.PI * r;
          return (
            <svg
              key={i}
              className="absolute inset-0 -rotate-90"
              width="96" height="96"
              viewBox="0 0 96 96"
            >
              {/* Track */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="5" opacity="0.12" />
              {/* Progress */}
              <circle
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={stroke}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circum}
                strokeDashoffset={circum * (1 - parseFloat(dash) / 100)}
                style={{ filter: `drop-shadow(0 0 4px ${stroke}80)` }}
              />
            </svg>
          );
        })}
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart
            className="w-5 h-5 animate-heartbeat"
            style={{ color: accent.from, fill: `${accent.from}40` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2.5">
        {[
          { label: "Koşu",    val: "75%", color: accent.from },
          { label: "Ağırlık", val: "88%", color: accent.to   },
          { label: "Yürüyüş", val: "60%", color: "#e4e4e7"   },
        ].map(({ label, val, color }) => (
          <div key={label} className="space-y-0.5">
            <div className="flex justify-between text-[10px]" style={{ color }}>
              <span>{label}</span><span>{val}</span>
            </div>
            <div className="w-24 h-1 rounded-full bg-white/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: val,
                  background: color,
                  boxShadow: `0 0 6px ${color}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── HobbyCard ──────────────────────────────────────── */

function HobbyCard({ hobby }: { hobby: Hobby }) {
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

  const Icon = hobby.icon;

  const visual = {
    terminal:  <TerminalVisual />,
    equalizer: <EqualizerVisual accent={hobby.accent} />,
    gaming:    <GamingVisual accent={hobby.accent} />,
    camera:    <CameraVisual accent={hobby.accent} />,
    books:     <BooksVisual accent={hobby.accent} />,
    fitness:   <FitnessVisual accent={hobby.accent} />,
  }[hobby.id];

  /* visual height differs per card size */
  const visualH =
    hobby.span === "lg"   ? "h-52" :
    hobby.span === "full" ? "h-40" : "h-36";

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 shadow-md backdrop-blur-sm dark:border-white/[0.07] dark:bg-zinc-900/60 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      style={{
        transform:      `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition:     hovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
        ...(hovered
          ? {
              boxShadow: `0 20px 60px ${hobby.accent.from}22, 0 0 0 1px ${hobby.accent.from}28`,
            }
          : {}),
      }}
    >
      {/* Meteors on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={4} />
      </div>

      {/* Hover tint */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${hobby.accent.from}10, transparent 55%, ${hobby.accent.to}08)`,
        }}
      />

      {/* ── Visual header ── */}
      <div
        className={cn("relative overflow-hidden shrink-0", visualH)}
        style={{
          background: `linear-gradient(135deg, ${hobby.accent.from}22, ${hobby.accent.to}12)`,
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-20 animate-glow-pulse"
          style={{ background: hobby.accent.to }}
        />
        {/* Animated visual */}
        <div className="relative z-10 w-full h-full">
          {visual}
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="flex flex-1 flex-col gap-3 p-5"
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Icon + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${hobby.accent.from}35, ${hobby.accent.to}35)`,
              boxShadow:  `0 0 12px ${hobby.accent.from}30`,
            }}
          >
            <Icon className="h-4 w-4 !text-white" />
          </div>
          <h3
            className="text-sm font-bold text-zinc-900 dark:text-white"
            style={{ textShadow: `0 0 20px ${hobby.accent.from}40` }}
          >
            {hobby.title}
          </h3>
        </div>

        {/* Description */}
        <p className="flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {hobby.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {hobby.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium dark:border-white/[0.07] dark:bg-white/[0.04]"
              style={{ color: hobby.accent.from }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Specular */}
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

/* ─── HobbiesSection ─────────────────────────────────── */

export function HobbiesSection() {
  const { locale } = useI18n();
  const isEn = locale === "en";
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

  /* split into bento rows */
  const localized = isEn ? hobbies.map((h) => ({ ...h, ...EN_HOBBY_BY_ID[h.id] })) : hobbies;
  const [coding, music, gaming, camera, books, fitness] = localized;

  return (
    <section
      ref={ref}
      id="hobbies"
      className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] rounded-full bg-pink-600/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-600/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #ec4899 1px, transparent 1px)",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-semibold text-pink-400 tracking-[0.18em] uppercase">
              {isEn ? "Hobbies" : "Hobiler"}
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">{isEn ? "Beyond the Screen" : "Ekrandan Uzakta"}</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              {isEn ? "What I Do" : "Ne Yapıyorum?"}
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {isEn
              ? "Beyond software — music, games, photography, and movement."
              : "Yazılımın ötesinde — müzik, oyun, fotoğraf ve hareketle geçen zamanlar."}
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Row 1: Coding (2 cols) + Music */}
          <div
            className="md:col-span-2"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateY(36px)",
              transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
            }}
          >
            <HobbyCard hobby={coding} />
          </div>
          <div
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateY(36px)",
              transition: "opacity 0.55s ease 0.18s, transform 0.55s ease 0.18s",
            }}
          >
            <HobbyCard hobby={music} />
          </div>

          {/* Row 2: Gaming + Camera + Books */}
          {[gaming, camera, books].map((hobby, i) => (
            <div
              key={hobby.id}
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "none" : "translateY(36px)",
                transition: `opacity 0.55s ease ${0.24 + i * 0.08}s, transform 0.55s ease ${0.24 + i * 0.08}s`,
              }}
            >
              <HobbyCard hobby={hobby} />
            </div>
          ))}

          {/* Row 3: Fitness (full width) */}
          <div
            className="md:col-span-3"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateY(36px)",
              transition: "opacity 0.55s ease 0.48s, transform 0.55s ease 0.48s",
            }}
          >
            <HobbyCard hobby={fitness} />
          </div>

        </div>
      </div>
    </section>
  );
}
