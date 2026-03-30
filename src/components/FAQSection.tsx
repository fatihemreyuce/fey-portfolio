"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/I18nProvider";

/* ─── data ──────────────────────────────────────────── */

interface FAQItem {
  q: string;
  a: string;
  accent: string;
}

const faqs: FAQItem[] = [
  {
    q: "Freelance proje kabul ediyor musunuz?",
    a: "Evet, aktif olarak freelance projeler alıyorum. Web uygulaması geliştirme, mevcut projeye katkı ya da danışmanlık gibi farklı formatlarda çalışabilirim. İletişim formu üzerinden ulaşabilirsiniz.",
    accent: "#3b82f6",
  },
  {
    q: "Hangi teknolojilerle çalışmaktan en çok keyif alıyorsunuz?",
    a: "Frontend tarafında React + Next.js + TypeScript + Tailwind CSS kombinasyonu benim için ideal. Backend'de Kotlin + Spring Boot ile çalışmaktan da keyif alıyorum. Yeni teknolojileri denemekten çekinmem.",
    accent: "#8b5cf6",
  },
  {
    q: "Uzaktan çalışmaya uygun musunuz?",
    a: "Kesinlikle. Uzaktan çalışma konusunda deneyimliyim; asenkron iletişim, Jira/Linear ile görev takibi ve düzenli video toplantılarla verimli bir süreç yönetebiliyorum.",
    accent: "#10b981",
  },
  {
    q: "Bir projenin süresi genellikle ne kadar tutar?",
    a: "Proje kapsamına bağlı olarak değişir. Basit bir landing page 1–2 hafta, orta ölçekli bir web uygulaması 4–8 hafta, büyük bir full-stack proje ise 2–4 ay sürebilir. Kesin süre için proje detaylarını paylaşmanız yeterli.",
    accent: "#f59e0b",
  },
  {
    q: "Tasarım da yapıyor musunuz yoksa sadece geliştirme mi?",
    a: "Figma'da UI tasarımı yapabiliyorum ve sıfırdan arayüz kurabiliyorum. Ancak asıl güçlü olduğum alan geliştirme. Hazır bir tasarım dosyanız varsa daha hızlı ilerleyebiliriz; yoksa da tasarım + geliştirme sürecini birlikte yürütebiliriz.",
    accent: "#ec4899",
  },
  {
    q: "Tam zamanlı iş tekliflerine açık mısınız?",
    a: "Evet, uygun pozisyonlar için değerlendirmeye açığım. Hibrit veya uzaktan çalışma modelini destekleyen, modern teknolojiler kullanan takımlarla çalışmayı tercih ediyorum.",
    accent: "#14b8a6",
  },
  {
    q: "Açık kaynak projelere katkı sağlıyor musunuz?",
    a: "Evet, kullandığım araçların açık kaynak gelişimine katkı sağlamayı önemli buluyorum. GitHub profilimde katkıda bulunduğum projeleri ve kendi geliştirdiğim açık kaynak araçları inceleyebilirsiniz.",
    accent: "#6366f1",
  },
  {
    q: "İletişim için en hızlı yöntem hangisi?",
    a: "Bu sayfadaki iletişim formu veya doğrudan e-posta (fatihemreyuce@gmail.com) en hızlı yol. Genellikle 24 saat içinde yanıt veriyorum. LinkedIn üzerinden de ulaşabilirsiniz.",
    accent: "#f97316",
  },
];

const faqsEn: FAQItem[] = [
  {
    q: "Do you accept freelance projects?",
    a: "Yes, I actively take freelance projects including web app development, contribution to existing products, and technical consulting.",
    accent: "#3b82f6",
  },
  {
    q: "Which technologies do you enjoy the most?",
    a: "On frontend, I enjoy React + Next.js + TypeScript + Tailwind CSS. On backend, I also enjoy working with Kotlin + Spring Boot.",
    accent: "#8b5cf6",
  },
  {
    q: "Are you comfortable with remote work?",
    a: "Absolutely. I am experienced in async communication, issue tracking tools, and regular sync meetings for efficient delivery.",
    accent: "#10b981",
  },
  {
    q: "How long does a project usually take?",
    a: "It depends on scope: simple landing pages can take 1-2 weeks, mid-size apps 4-8 weeks, and larger full-stack projects 2-4 months.",
    accent: "#f59e0b",
  },
  {
    q: "Do you also do design, or only development?",
    a: "I can handle UI design in Figma, but my strongest area is development. If needed, I can support both design and implementation.",
    accent: "#ec4899",
  },
  {
    q: "Are you open to full-time opportunities?",
    a: "Yes. I am open to suitable roles, especially teams using modern technologies with hybrid or remote-friendly culture.",
    accent: "#14b8a6",
  },
  {
    q: "Do you contribute to open source?",
    a: "Yes. I care about contributing back to tools I use and sharing useful projects publicly on GitHub.",
    accent: "#6366f1",
  },
  {
    q: "What's the fastest way to reach you?",
    a: "The contact form on this page or direct email is the fastest way. I usually respond within 24 hours.",
    accent: "#f97316",
  },
];

/* ─── FAQItem ─────────────────────────────────────────── */

function FAQAccordion({
  item,
  index,
  visible,
  delay,
}: {
  item: FAQItem;
  index: number;
  visible: boolean;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border transition-all duration-300",
        open
          ? "border-zinc-300 bg-white shadow-sm dark:border-white/15 dark:bg-white/[0.05] dark:shadow-none"
          : "border-zinc-200/90 bg-slate-50 hover:border-zinc-300 hover:bg-white dark:border-white/[0.07] dark:bg-zinc-900/60 dark:hover:border-white/10 dark:hover:bg-white/[0.04]",
      )}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, border-color 0.3s, background 0.3s`,
        boxShadow: open ? `0 0 0 1px ${item.accent}20, 0 8px 32px ${item.accent}10` : "none",
      }}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        {/* Number badge */}
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[11px] font-black transition-all duration-300",
            !open &&
              "border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/30",
          )}
          style={
            open
              ? {
                  color: item.accent,
                  borderColor: `${item.accent}40`,
                  background: `${item.accent}15`,
                }
              : undefined
          }
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "flex-1 text-sm font-semibold transition-colors duration-200",
            open
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-700 group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white",
          )}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-all duration-300",
            !open && "text-zinc-400 dark:text-white/30",
          )}
          style={{
            color: open ? item.accent : undefined,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Answer — smooth CSS grid-rows trick */}
      <div
        className="grid transition-all duration-350 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0">
            {/* Accent left border */}
            <div className="flex gap-4">
              <div
                className="w-px shrink-0 rounded-full self-stretch"
                style={{ background: `linear-gradient(180deg, ${item.accent}60, transparent)` }}
              />
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.a}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQSection ─────────────────────────────────────── */

export function FAQSection() {
  const { locale } = useI18n();
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

  const data = locale === "en" ? faqsEn : faqs;
  const half = Math.ceil(data.length / 2);
  const col1 = data.slice(0, half);
  const col2 = data.slice(half);

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-24 overflow-hidden border-b border-zinc-200 dark:border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize:  "30px 30px",
          }}
        />
        <Meteors number={12} symmetric />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-[0.18em] uppercase">
              {locale === "en" ? "FAQ" : "SSS"}
            </span>
          </div>

          <h2 className="text-4xl sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
            <span className="text-zinc-900 dark:text-white">{locale === "en" ? "Frequently Asked" : "Sıkça Sorulan"}</span>
            <br />
            <AnimatedGradientText className="text-4xl sm:text-[2.75rem] font-bold">
              {locale === "en" ? "Questions" : "Sorular"}
            </AnimatedGradientText>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {locale === "en"
              ? "If you cannot find your question here, feel free to use the contact form."
              : "Aklınızdaki soruyu burada bulamazsanız iletişim formu üzerinden sorabilirsiniz."}
          </p>
        </div>

        {/* Two-column accordion */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="space-y-3">
            {col1.map((item, i) => (
              <FAQAccordion
                key={item.q}
                item={item}
                index={i}
                visible={visible}
                delay={0.1 + i * 0.06}
              />
            ))}
          </div>
          {/* Column 2 */}
          <div className="space-y-3">
            {col2.map((item, i) => (
              <FAQAccordion
                key={item.q}
                item={item}
                index={half + i}
                visible={visible}
                delay={0.1 + (half + i) * 0.06}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 flex justify-center"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.7s",
          }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 dark:border-white/[0.07] dark:bg-white/[0.03]">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <p className="text-sm text-zinc-400">
              {locale === "en" ? "Still have a question?" : "Başka sorunuz var mı?"}{" "}
              <a
                href="#contact"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline underline-offset-4 decoration-indigo-400/30"
              >
                {locale === "en" ? "Contact me" : "İletişime geçin"}
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
