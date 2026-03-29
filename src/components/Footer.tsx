"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Code2, ArrowUp, Heart, Sparkles, ExternalLink } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Instagram, Github, Linkedin, Twitter } from "@/components/icons/social";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────── */

const navColumns = [
  {
    title: "Gezinti",
    links: [
      { label: "Hakkımda",  href: "/#about"      },
      { label: "Deneyim",   href: "/#experience" },
      { label: "Projeler",  href: "/#projects"   },
      { label: "Beceriler", href: "/#skills"     },
    ],
  },
  {
    title: "Keşfet",
    links: [
      { label: "Hobiler",   href: "/#hobbies"  },
      { label: "SSS",       href: "/#faq"      },
      { label: "İletişim",  href: "/#contact"  },
    ],
  },
];

const socialLinks = [
  { icon: Github,    href: "https://github.com/fatihemreyuce", label: "GitHub",    color: "#e4e4e7" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/fatih-emre-y%C3%BCce-3b0538355/", label: "LinkedIn",  color: "#60a5fa" },
  { icon: Twitter,   href: "https://twitter.com",   label: "Twitter",   color: "#38BDF8" },
  { icon: Instagram, href: "https://www.instagram.com/fatih.yc8/", label: "Instagram", color: "#f472b6" },
];

const stats = [
  { value: "5+",   label: "Proje"      },
  { value: "2+",   label: "Yıl Deneyim" },
  { value: "10+",  label: "Teknoloji"  },
  { value: "∞",    label: "Tutkuyla"   },
];

/* ─── 3D Tilt Logo Card ──────────────────────────────── */

function LogoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov]   = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - (r.top  + r.height / 2)) / (r.height / 2)) * -10,
      y: ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) *  10,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      className="inline-block cursor-default"
      style={{
        transform:      `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:     hov ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex items-center gap-3" style={{ transformStyle: "preserve-3d" }}>
        {/* Icon cube */}
        <div
          className={cn(
            "relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300",
            hov
              ? "border-blue-400/60 bg-blue-500/20 shadow-[0_0_24px_rgba(59,130,246,0.4)]"
              : "border-blue-500/30 bg-blue-500/10",
          )}
          style={{ transform: "translateZ(16px)" }}
        >
          {/* Inner glow ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-xl transition-opacity duration-300",
              hov ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "radial-gradient(circle at 40% 35%, rgba(59,130,246,0.35) 0%, transparent 70%)",
            }}
          />
          <Code2 className="h-6 w-6 text-blue-400 relative z-10" />
          {/* Sparkle */}
          {hov && (
            <Sparkles
              className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-blue-300 animate-pulse"
            />
          )}
        </div>

        {/* Text */}
        <div style={{ transform: "translateZ(10px)" }}>
          <AnimatedGradientText className="text-lg font-bold tracking-tight block">
            Fatih Emre Yüce
          </AnimatedGradientText>
          <span className="text-[10px] text-zinc-500 tracking-[0.18em] uppercase">
            Frontend Developer
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── 3D Social Icon ─────────────────────────────────── */

function SocialIcon({
  icon: Icon,
  href,
  label,
  color,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      style={{
        transform:  hov
          ? `perspective(500px) rotateY(15deg) rotateX(-8deg) translateZ(8px) scale(1.1)`
          : `perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)`,
        transition:  "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        boxShadow:   hov ? `0 8px 24px ${color}35` : "none",
        borderColor: hov ? `${color}50` : undefined,
      }}
    >
      {/* Shine sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hov
            ? `radial-gradient(circle at 35% 30%, ${color}25 0%, transparent 65%)`
            : "transparent",
          transition: "background 0.25s ease",
        }}
      />
      <Icon
        className="h-4 w-4 relative z-10 transition-colors duration-200"
        style={{ color: hov ? color : "#71717a" }}
      />
    </a>
  );
}

/* ─── Stat Card (3D pop) ─────────────────────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="text-center px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default"
      style={{
        transform:  hov
          ? "perspective(400px) translateZ(14px) scale(1.04)"
          : "perspective(400px) translateZ(0px) scale(1)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow:  hov ? "0 12px 32px rgba(59,130,246,0.15)" : "none",
      }}
    >
      <AnimatedGradientText className="text-2xl font-bold block leading-none">
        {value}
      </AnimatedGradientText>
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
        {label}
      </span>
    </div>
  );
}

/* ─── Back-to-top 3D Button ──────────────────────────── */

function BackToTop() {
  const [hov, setHov]       = useState(false);
  const [pressed, setPress] = useState(false);
  const [visible, setVis]   = useState(false);

  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Yukarı çık"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-xl border overflow-hidden transition-all duration-300",
        hov
          ? "border-blue-400/50 bg-blue-500/15"
          : "border-white/[0.08] bg-white/[0.03]",
        !visible && "opacity-0 pointer-events-none",
      )}
      style={{
        transform:  pressed
          ? "perspective(400px) translateZ(-4px) scale(0.94)"
          : hov
          ? "perspective(400px) rotateX(-10deg) translateZ(10px) scale(1.08)"
          : "perspective(400px) rotateX(0deg) translateZ(0px) scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease",
        boxShadow:  hov ? "0 8px 24px rgba(59,130,246,0.3), 0 0 0 1px rgba(59,130,246,0.2)" : "none",
      }}
    >
      {/* Inner sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hov
            ? "radial-gradient(circle at 50% 20%, rgba(59,130,246,0.3) 0%, transparent 70%)"
            : "transparent",
          transition: "background 0.2s ease",
        }}
      />
      <ArrowUp
        className={cn(
          "h-4 w-4 relative z-10 transition-all duration-200",
          hov ? "text-blue-400 -translate-y-0.5" : "text-zinc-500",
        )}
      />
    </button>
  );
}

/* ─── Perspective Grid Floor ─────────────────────────── */

function PerspectiveGrid() {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden"
      style={{ perspective: "600px" }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          transform:       "rotateX(55deg)",
          transformOrigin: "bottom center",
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(59,130,246,0.07) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ─── Floating Orbs ──────────────────────────────────── */

function FloatingOrbs() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-64 h-64 rounded-full bg-blue-600/[0.04] blur-3xl animate-float"
        style={{ top: "20%", left: "10%", animationDelay: "0s" }}
      />
      <div
        className="absolute w-48 h-48 rounded-full bg-emerald-600/[0.04] blur-3xl animate-float"
        style={{ top: "10%", right: "15%", animationDelay: "2s" }}
      />
      <div
        className="absolute w-36 h-36 rounded-full bg-purple-600/[0.04] blur-2xl animate-float"
        style={{ bottom: "30%", left: "40%", animationDelay: "1s" }}
      />
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505]">

      {/* ── Background layers ── */}
      <FloatingOrbs />
      <PerspectiveGrid />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <Meteors number={12} symmetric />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
          }}
        />
        {/* Top fade-in line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">

        {/* ── Top section ── */}
        <div className="pt-14 pb-10 grid md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand column */}
          <div className="md:col-span-1 space-y-5">
            <LogoCard />

            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Güzel, hızlı ve kullanıcı dostu arayüzler inşa etmeyi seven bir
              frontend geliştirici.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                Yeni projelere açık
              </span>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-1 grid grid-cols-2 gap-6">
            {navColumns.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-[11px] font-semibold text-zinc-400 tracking-[0.18em] uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                      >
                        <span
                          className="h-px w-0 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 group-hover:w-3 rounded-full"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stats column */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-[11px] font-semibold text-zinc-400 tracking-[0.18em] uppercase">
              Sayılarla
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* CTA */}
            <a
              href="/#contact"
              className="group mt-2 flex items-center justify-between w-full px-4 py-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-200"
              style={{
                transform: "perspective(400px) translateZ(0)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.transform =
                  "perspective(400px) translateZ(6px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.transform =
                  "perspective(400px) translateZ(0)")
              }
            >
              <span className="text-sm font-semibold text-blue-400">
                Birlikte çalışalım
              </span>
              <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="relative h-px bg-white/[0.05]">
          <div className="absolute left-1/2 -translate-x-1/2 -top-px h-px w-32 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-zinc-600 flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>© {year}</span>
            <AnimatedGradientText className="text-xs font-semibold">
              Fatih Emre Yüce
            </AnimatedGradientText>
            <span>· Tüm hakları saklıdır.</span>
          </p>

          <div className="flex items-center gap-3">
            <p className="text-xs text-zinc-600 flex items-center gap-1">
              <span>Next.js ile</span>
              <Heart className="h-3 w-3 text-rose-500 animate-heartbeat inline-block" />
              <span>yapıldı</span>
            </p>
            <BackToTop />
          </div>

        </div>
      </div>
    </footer>
  );
}
