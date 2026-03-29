"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, Quote, MessageSquareQuote } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";

/* ─── data ──────────────────────────────────────────── */

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  rating: number;
  accent: { from: string; to: string };
  relation: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Fatih, projeye katıldığı ilk günden itibaren ekibe gerçek bir değer kattı. Kod kalitesi, iletişim biçimi ve çözüm odaklı yaklaşımıyla kısa sürede güvenilir bir isim haline geldi.",
    name: "Ahmet Yılmaz",
    title: "Lead Developer",
    company: "Tech Startup",
    initials: "AY",
    rating: 5,
    accent: { from: "#3b82f6", to: "#06b6d4" },
    relation: "Doğrudan Yönetici",
  },
  {
    id: "t2",
    quote:
      "E-ticaret projemizin frontend kısmını Fatih ile birlikte hayata geçirdik. Tasarım detaylarına verdiği önem, belirlenen süreye sadakati ve proaktif önerileri beklentilerimizin çok ötesindeydi.",
    name: "Selin Kaya",
    title: "Kurucu & CEO",
    company: "Dijital Ajans",
    initials: "SK",
    rating: 5,
    accent: { from: "#ec4899", to: "#f97316" },
    relation: "Müşteri",
  },
  {
    id: "t3",
    quote:
      "Öğrenme hızı ve merakı gerçekten etkileyici. Verilen geri bildirimleri anında uyguluyor, yeni teknolojileri kısa sürede özümsüyor. Birlikte çalışmak son derece keyifli.",
    name: "Mehmet Demir",
    title: "Senior Engineer",
    company: "Yazılım Şirketi",
    initials: "MD",
    rating: 5,
    accent: { from: "#8b5cf6", to: "#3b82f6" },
    relation: "Kıdemli Meslektaş",
  },
  {
    id: "t4",
    quote:
      "Portföy sitemizi sıfırdan yeniledi. Hem estetik hem teknik açıdan mükemmel bir sonuç ortaya çıktı. Özellikle performans optimizasyonu konusundaki hassasiyeti bizi çok mutlu etti.",
    name: "Zeynep Arslan",
    title: "Pazarlama Direktörü",
    company: "KOBİ",
    initials: "ZA",
    rating: 5,
    accent: { from: "#10b981", to: "#06b6d4" },
    relation: "Müşteri",
  },
  {
    id: "t5",
    quote:
      "Takım arkadaşı olarak Fatih'in en büyük özelliği sorunları çözerken her zaman en temiz çözümü araması. Kod review'larında öğrendiklerim gerçekten çok değerliydi.",
    name: "Can Öztürk",
    title: "Frontend Developer",
    company: "Ajans",
    initials: "CÖ",
    rating: 5,
    accent: { from: "#f59e0b", to: "#ef4444" },
    relation: "Takım Arkadaşı",
  },
  {
    id: "t6",
    quote:
      "Backend entegrasyonu ve API tasarımı konusunda beklediğimizden çok daha derin bir anlayışa sahip. Full-stack düşünebilen bir frontend geliştirici bulmak gerçekten zor.",
    name: "Burcu Şahin",
    title: "Product Manager",
    company: "SaaS Şirketi",
    initials: "BŞ",
    rating: 5,
    accent: { from: "#14b8a6", to: "#84cc16" },
    relation: "Proje Yöneticisi",
  },
];

/* ─── TestimonialCard ────────────────────────────────── */

function TestimonialCard({
  t,
  visible,
  delay,
}: {
  t: Testimonial;
  visible: boolean;
  delay: number;
}) {
  const cardRef           = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [hov,  setHov]    = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -5,
      y: ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  5,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      className="relative group flex flex-col rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-sm overflow-hidden h-full"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hov ? 1.02 : 1})`
          : "translateY(32px)",
        transition: visible
          ? hov ? "transform 0.12s ease-out, box-shadow 0.3s" : "transform 0.5s ease-out, opacity 0.55s ease, box-shadow 0.3s"
          : `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        transformStyle: "preserve-3d",
        boxShadow: hov
          ? `0 20px 50px ${t.accent.from}1a, 0 0 0 1px ${t.accent.from}22`
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Meteors on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Meteors number={4} />
      </div>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${t.accent.from}80, transparent)` }}
      />

      {/* Hover tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${t.accent.from}0a, transparent)` }}
      />

      <div className="relative z-10 flex flex-col gap-4 p-6 h-full" style={{ transform: "translateZ(10px)" }}>

        {/* Top row: stars + relation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/[0.07] bg-white/[0.04]"
            style={{ color: t.accent.from }}
          >
            {t.relation}
          </span>
        </div>

        {/* Quote mark */}
        <Quote
          className="w-8 h-8 opacity-20"
          style={{ color: t.accent.from }}
        />

        {/* Quote text */}
        <p className="text-sm text-zinc-400 leading-relaxed flex-1 italic">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 select-none"
            style={{
              background: `linear-gradient(135deg, ${t.accent.from}, ${t.accent.to})`,
              boxShadow:  `0 0 14px ${t.accent.from}40`,
            }}
          >
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{t.name}</p>
            <p className="text-[11px] text-zinc-500 truncate">
              {t.title} · {t.company}
            </p>
          </div>
        </div>
      </div>

      {/* Specular */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          opacity:    hov ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ─── TestimonialsSection ────────────────────────────── */

export function TestimonialsSection() {
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

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-600/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #f472b6 1px, transparent 1px)",
            backgroundSize:  "30px 30px",
          }}
        />
        <Meteors number={14} symmetric />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center space-y-5 mb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "none" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10">
            <MessageSquareQuote className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-semibold text-pink-400 tracking-[0.18em] uppercase">
              Referanslar
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">Birlikte Çalıştıklarım</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              Ne Diyor?
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Müşteriler, yöneticiler ve takım arkadaşlarının deneyimlerinden kesitler.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              visible={visible}
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="flex justify-center mt-12"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <p className="text-xs text-zinc-600 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-amber-400/40 text-amber-400/40" />
            Tüm yorumlar gerçek iş birlikteliklerinden alınmıştır
            <Star className="w-3.5 h-3.5 fill-amber-400/40 text-amber-400/40" />
          </p>
        </div>

      </div>
    </section>
  );
}
