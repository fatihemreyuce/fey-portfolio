"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Radio,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Instagram, Github, Linkedin, Twitter } from "@/components/icons/social";
import { cn } from "@/lib/utils";

const EMAIL = "fatihemreyuce@gmail.com";

const socialLinks = [
  { icon: Github, href: "https://github.com/fatihemreyuce", label: "GitHub", color: "#e4e4e7" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fatih-emre-y%C3%BCce-3b0538355/",
    label: "LinkedIn",
    color: "#60a5fa",
  },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#38BDF8" },
  { icon: Instagram, href: "https://www.instagram.com/fatih.yc8/", label: "Instagram", color: "#f472b6" },
];

const contactItems = [
  {
    icon: Mail,
    label: "E-posta",
    color: "#60a5fa",
    content: (copyEmail: () => void, copied: boolean) => (
      <div className="flex flex-wrap items-center gap-2">
        <a href={`mailto:${EMAIL}`} className="text-base font-medium text-zinc-100 hover:text-white sm:text-lg">
          {EMAIL}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-500 transition-colors hover:border-blue-500/35 hover:text-blue-300"
          aria-label="E-postayı kopyala"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    ),
  },
  {
    icon: MapPin,
    label: "Konum",
    color: "#34d399",
    content: () => <p className="text-base font-medium text-zinc-100 sm:text-lg">Türkiye</p>,
  },
  {
    icon: Clock,
    label: "Yanıt süresi",
    color: "#fbbf24",
    content: () => <p className="text-base font-medium text-zinc-100 sm:text-lg">24 saat içinde</p>,
  },
] as const;

function ContactSpread() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    void navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="w-full">
      {/* Kimlik — tam genişlik */}
      <div className="flex flex-col gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">Fatih Emre Yüce</h3>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/85 sm:text-sm">
            Frontend Developer
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] px-3 py-1.5">
          <Radio className="h-3.5 w-3.5 shrink-0 animate-pulse text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-300">Müsait</span>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-[15px]">
        E-posta veya sosyal hesaplardan doğrudan ulaşın — en geç{" "}
        <span className="text-zinc-400">24 saat</span> içinde dönüş yaparım.
      </p>

      {/* Üç sütun — kart yok, sadece dikey çizgi ile bölünmüş */}
      <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-3 sm:gap-0">
        {contactItems.map(({ icon: Icon, label, color, content }, i) => (
          <div
            key={label}
            className={[
              "py-8 sm:py-6 sm:px-6 lg:px-10",
              i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : "",
            ].join(" ")}
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10" style={{ background: `${color}12` }}>
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">{label}</p>
            {label === "E-posta" ? content(copyEmail, copied) : content()}
          </div>
        ))}
      </div>

      {/* Sosyal + CTA — yatay yayılım */}
      <div className="mt-4 flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Sosyal</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group/soc flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-transparent dark:shadow-none dark:hover:border-white/25 dark:hover:bg-white/[0.05] sm:h-12 sm:w-12"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover/soc:scale-110",
                    label === "GitHub"
                      ? "text-zinc-800 group-hover/soc:text-zinc-950 dark:text-zinc-400 dark:group-hover/soc:text-zinc-100"
                      : "opacity-90 group-hover/soc:opacity-100",
                  )}
                  style={label === "GitHub" ? undefined : { color }}
                />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="group/mail inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(59,130,246,0.2)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:brightness-110 lg:w-auto lg:min-w-[240px]"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span>Direkt e-posta gönder</span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/mail:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/4 h-[520px] w-[min(90vw,700px)] -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-[12%] h-[380px] w-[380px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-[280px] w-[280px] rounded-full bg-emerald-600/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #22d3ee 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Meteors number={18} symmetric />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-10 space-y-5 text-center sm:mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1.5">
            <Mail className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">İletişim</span>
          </div>

          <h2 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-[2.75rem]">
            <span className="text-white">Birlikte Bir Şeyler </span>
            <br className="sm:hidden" />
            <AnimatedGradientText className="text-4xl font-bold sm:text-[2.75rem]">İnşa Edelim</AnimatedGradientText>
          </h2>

          <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-zinc-500">
            Yeni bir proje, iş birliği ya da tanışmak için — hangi kanalı tercih ederseniz, oradan devam edelim.
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <ContactSpread />
        </div>
      </div>
    </section>
  );
}
