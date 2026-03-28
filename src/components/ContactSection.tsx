"use client";

import { useRef, useState, useEffect, useCallback, useActionState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Loader2,
  Radio,
  ArrowRight,
} from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendContactEmail, type ContactResult } from "@/app/actions/contact";
import { Instagram, Github, Linkedin, Twitter } from "@/components/icons/social";

/* ─── Contact info card (3-D tilt) ──────────────────── */

const socialLinks = [
  { icon: Github,    href: "https://github.com",    label: "GitHub",    color: "#e4e4e7" },
  { icon: Linkedin,  href: "https://linkedin.com",  label: "LinkedIn",  color: "#60a5fa" },
  { icon: Twitter,   href: "https://twitter.com",   label: "Twitter",   color: "#38BDF8" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#f472b6" },
];

function InfoCard() {
  const cardRef            = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]    = useState({ x: 0, y: 0 });
  const [hovered, setHov]  = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -8,
      y: ((e.clientX - cx) / (rect.width  / 2)) *  8,
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHov(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      className="relative h-full rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-xl overflow-hidden"
      style={{
        transform:      `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.015 : 1})`,
        transition:     hovered ? "transform 0.12s ease-out" : "transform 0.55s ease-out",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? "0 24px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.2)"
          : "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Meteors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500">
        <Meteors number={6} />
      </div>

      {/* Gradient header */}
      <div className="relative h-36 overflow-hidden flex items-end p-5"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(16,185,129,0.12) 100%)" }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/15 blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-4 left-8 w-24 h-24 bg-emerald-500/15 blur-2xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 flex items-end justify-between w-full" style={{ transform: "translateZ(20px)" }}>
          <div>
            <p className="text-white font-bold text-lg leading-none">Fatih Emre Yüce</p>
            <p className="text-blue-400 text-xs font-semibold tracking-[0.15em] uppercase mt-1">Frontend Developer</p>
          </div>
          {/* Available badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-semibold">Müsait</span>
          </div>
        </div>
      </div>

      {/* Info rows */}
      <div className="p-5 space-y-5" style={{ transform: "translateZ(12px)" }}>
        {[
          { icon: Mail,    label: "E-posta",    value: "fatihemreyuce@gmail.com", href: "mailto:fatihemreyuce@gmail.com", color: "#60a5fa" },
          { icon: MapPin,  label: "Konum",      value: "Türkiye",                 href: null,                             color: "#34d399" },
          { icon: Clock,   label: "Yanıt Süresi", value: "24 saat içinde",        href: null,                             color: "#fbbf24" },
        ].map(({ icon: Icon, label, value, href, color }) => (
          <div key={label} className="flex items-center gap-3.5 group/row">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-all duration-200 group-hover/row:border-white/20"
              style={{ background: `${color}18` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-0.5">{label}</p>
              {href ? (
                <a
                  href={href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors truncate block"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm text-zinc-300">{value}</p>
              )}
            </div>
          </div>
        ))}

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Social links */}
        <div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3">Sosyal</p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200"
                style={{ ["--hc" as string]: color }}
              >
                <Icon className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" style={{ color }} />
              </a>
            ))}
          </div>
        </div>

        {/* CTA shortcut */}
        <a
          href="mailto:fatihemreyuce@gmail.com"
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-blue-500/20 bg-blue-500/8 hover:bg-blue-500/12 hover:border-blue-500/35 transition-all duration-200 group/mail"
        >
          <span className="text-sm font-semibold text-blue-400">Direkt e-posta gönder</span>
          <ArrowRight className="w-4 h-4 text-blue-400 group-hover/mail:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* Specular */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
          opacity:    hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ─── Field ──────────────────────────────────────────── */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  multiline = false,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const sharedCls =
    "w-full bg-white/[0.04] border rounded-xl px-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 " +
    (focused
      ? "border-blue-500/50 bg-blue-500/[0.05] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
      : "border-white/[0.08] hover:border-white/15");

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-zinc-400 tracking-wide">
        {label}
        {required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(sharedCls, "py-3 resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(sharedCls, "py-2.5 h-11")}
        />
      )}
    </div>
  );
}

/* ─── ContactForm ────────────────────────────────────── */

const initialState: ContactResult = { success: false };

function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="relative h-full rounded-2xl border border-white/[0.07] bg-zinc-900/70 backdrop-blur-xl overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 space-y-6">

        {/* Form header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-white">Mesaj Gönder</h3>
          </div>
          <p className="text-xs text-zinc-500">
            Aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz.
          </p>
        </div>

        {/* Success state */}
        {state.success && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-400">Mesajınız iletildi!</p>
              <p className="text-xs text-emerald-400/70 mt-0.5">
                En kısa sürede geri dönüş yapacağım.
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!state.success && state.error && (
          <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/25 bg-red-500/10 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{state.error}</p>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} action={action} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name"  label="Ad Soyad" placeholder="Fatih Emre Yüce"   required />
            <Field name="email" label="E-posta"  placeholder="ornek@email.com"   type="email" required />
          </div>
          <Field name="subject" label="Konu"    placeholder="İş Birliği Teklifi" required />
          <Field name="message" label="Mesaj"   placeholder="Merhaba! Bir projem var ve sizinle çalışmak istiyorum..." multiline required />

          <Button
            type="submit"
            disabled={pending}
            className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 h-11 text-sm font-semibold text-white border-0 shadow-[0_0_24px_rgba(59,130,246,0.25)] hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] hover:scale-[1.01] disabled:opacity-70 disabled:scale-100 transition-all duration-300 gap-2"
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gönderiliyor…
              </>
            ) : state.success ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Gönderildi
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Mesaj Gönder
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ─── ContactSection ─────────────────────────────────── */

export function ContactSection() {
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
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/[0.05] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
          }}
        />
        {/* Üst çizgi yok: SSS bölümünün border-b ile tek, tutarlı ayırıcı */}
        <Meteors number={16} symmetric />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 tracking-[0.18em] uppercase">
              İletişim
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">Birlikte Bir Şeyler</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              İnşa Edelim
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Yeni bir proje, iş birliği teklifi ya da sadece merhaba demek için — her zaman
            mesaj atabilirsiniz.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">

          {/* Info card — 2 cols */}
          <div
            className="lg:col-span-2"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateX(-36px)",
              transition: "opacity 0.65s ease 0.12s, transform 0.65s ease 0.12s",
            }}
          >
            <InfoCard />
          </div>

          {/* Contact form — 3 cols */}
          <div
            className="lg:col-span-3"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "none" : "translateX(36px)",
              transition: "opacity 0.65s ease 0.22s, transform 0.65s ease 0.22s",
            }}
          >
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
