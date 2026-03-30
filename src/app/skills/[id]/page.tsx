import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Meteors } from "@/components/magicui/meteors";
import { skillCategories, getCategoryById, getLevel } from "@/data/skills";
import { SkillBarsClient } from "@/components/SkillBarsClient";
import { withLocale } from "@/i18n/withLocale";

/* ─── Static params ─────────────────────────────────── */

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return skillCategories.map((c) => ({ id: c.id }));
}

/* ─── Metadata ──────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat    = getCategoryById(id);
  if (!cat) return { title: "Kategori Bulunamadı" };
  return {
    title: `${cat.title} Becerileri — Fatih Emre Yüce`,
    description: cat.shortDesc,
  };
}

/* ─── Page ──────────────────────────────────────────── */

const CAT_EN: Record<string, { title: string; shortDesc: string; longDesc: string }> = {
  frontend: {
    title: "Frontend",
    shortDesc: "Modern, accessible, and high-performance user interfaces.",
    longDesc:
      "I build within the React ecosystem with a strong focus on user experience. Next.js for SSR/SSG, TypeScript for type safety, and Tailwind CSS for fast and consistent styling form my core toolkit.",
  },
  backend: {
    title: "Backend",
    shortDesc: "I am learning REST and data layers step by step with Kotlin and Spring Boot.",
    longDesc:
      "I am currently at an early stage on backend. I practice with Kotlin and Spring Boot through small projects and REST endpoints, while improving in PostgreSQL, Node.js, and core authentication flows.",
  },
  araclar: {
    title: "Tools & DevOps",
    shortDesc: "Tooling and infrastructure knowledge that speeds up development workflows.",
    longDesc:
      "I manage daily development workflows with Git, containerize with Docker, and test with Postman. I also have foundational knowledge of CI/CD and cloud platforms.",
  },
  diger: {
    title: "Other",
    shortDesc: "Beyond software: analytical thinking and problem solving.",
    longDesc:
      "I have worked on data processing and computer vision with Python. I apply Agile practices in project workflows and can comfortably read/write technical documentation in English.",
  },
};

export default async function SkillDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang } = await searchParams;
  const locale = lang === "en" ? "en" : "tr";
  const isEn = locale === "en";
  const cat    = getCategoryById(id);
  if (!cat) notFound();

  const Icon    = cat.icon;
  const avgLevel = Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length);
  const avgLvl   = getLevel(avgLevel);
  const topSkill = [...cat.skills].sort((a, b) => b.level - a.level)[0];
  const catText = isEn ? CAT_EN[cat.id] : undefined;
  const localizedSkills = isEn
    ? cat.skills.map((s) => ({
        ...s,
        name: s.name === "İngilizce" ? "English" : s.name === "Algoritma" ? "Algorithms" : s.name,
      }))
    : cat.skills;
  const levelLabel = (v: number) =>
    !isEn
      ? getLevel(v).label
      : v >= 90
        ? "Expert"
        : v >= 75
          ? "Advanced"
          : v >= 55
            ? "Intermediate"
            : "Beginner";

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-white/5 pt-16 pb-20">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${cat.accent.from}38, transparent)`,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${cat.accent.from}80, ${cat.accent.to}80, transparent)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize:  "28px 28px",
              }}
            />
            <Meteors number={18} symmetric />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href={withLocale("/", locale)} className="hover:text-zinc-300 transition-colors">{isEn ? "Home" : "Ana Sayfa"}</Link>
              <span>/</span>
              <Link href={withLocale("/#skills", locale)} className="hover:text-zinc-300 transition-colors">{isEn ? "Skills" : "Beceriler"}</Link>
              <span>/</span>
              <span className="text-zinc-300">{catText?.title ?? cat.title}</span>
            </div>

            {/* Back */}
            <Link
              href={withLocale("/#skills", locale)}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 group transition-colors duration-200"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-200">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              {isEn ? "Back to Skills" : "Becerilere Dön"}
            </Link>

            {/* Hero content */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {/* Icon */}
              <div
                className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/15"
                style={{
                  background: `linear-gradient(135deg, ${cat.accent.from}50, ${cat.accent.to}50)`,
                  boxShadow:  `0 0 32px ${cat.accent.from}40`,
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-4">
                {/* Title */}
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {catText?.title ?? cat.title}
                </h1>

                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  {catText?.longDesc ?? cat.longDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────── */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04]"
              style={{ background: cat.accent.from }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">

              {/* ── Left: skill bars ── */}
              <div className="lg:col-span-2 space-y-8">

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1 h-5 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${cat.accent.from}, ${cat.accent.to})` }}
                    />
                    <h2 className="text-lg font-bold text-white">{isEn ? "Technology Levels" : "Teknoloji Seviyeleri"}</h2>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {isEn ? "Usage experience and proficiency level for each skill." : "Her becerinin kullanım deneyimi ve uzmanlık seviyesi."}
                  </p>
                </div>

                {/* Client component for animated bars */}
                <SkillBarsClient skills={localizedSkills} accent={cat.accent} />

                {/* Level legend */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: isEn ? "Expert" : "Uzman",      color: "#34d399", min: 90 },
                    { label: isEn ? "Advanced" : "İleri",       color: "#60a5fa", min: 75 },
                    { label: isEn ? "Intermediate" : "Orta",        color: "#fbbf24", min: 55 },
                    { label: isEn ? "Beginner" : "Başlangıç",   color: "#f87171", min: 0  },
                  ].map(({ label, color, min }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                      <span className="text-[11px] text-zinc-500">
                        {label} {min > 0 ? `(${min}%+)` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: sidebar ── */}
              <div className="space-y-6">

                {/* Stats */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-300">{isEn ? "Statistics" : "İstatistikler"}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: isEn ? "Technologies" : "Teknoloji", value: isEn ? `${localizedSkills.length} tools` : `${localizedSkills.length} araç` },
                      { label: isEn ? "Avg. Level" : "Ort. Seviye", value: `${avgLevel}% — ${levelLabel(avgLevel)}` },
                      { label: isEn ? "Top Skill" : "En Güçlü", value: isEn && topSkill.name === "İngilizce" ? "English" : isEn && topSkill.name === "Algoritma" ? "Algorithms" : topSkill.name },
                      { label: isEn ? "Total Experience" : "Toplam Deneyim", value: isEn ? `${Math.max(...localizedSkills.map(s => s.years))}+ years` : `${Math.max(...localizedSkills.map(s => s.years))}+ yıl` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">{label}</span>
                        <span className="text-zinc-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill chips */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                    <Tag className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-300">{isEn ? "Technologies" : "Teknolojiler"}</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {localizedSkills.map((skill) => {
                      const lvl = getLevel(skill.level);
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: lvl.color }} />
                          <span className="text-xs font-medium text-zinc-300">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category info */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-300">{isEn ? "Other Categories" : "Diğer Kategoriler"}</span>
                  </div>
                  <div className="p-3 space-y-1">
                    {skillCategories
                      .filter((c) => c.id !== cat.id)
                      .map((c) => {
                        const CatIcon = c.icon;
                        return (
                          <Link
                            key={c.id}
                            href={withLocale(`/skills/${c.id}`, locale)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                              style={{ background: `${c.accent.from}20` }}
                            >
                              <CatIcon className="w-3.5 h-3.5" style={{ color: c.accent.from }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                                {isEn
                                  ? c.id === "araclar"
                                    ? "Tools & DevOps"
                                    : c.id === "diger"
                                      ? "Other"
                                      : c.title
                                  : c.title}
                              </p>
                            </div>
                            <Calendar className="w-3 h-3 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                          </Link>
                        );
                      })}
                  </div>
                </div>

                {/* Back */}
                <div className="space-y-2">
                  <Link
                    href={withLocale("/#skills", locale)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 group"
                  >
                    <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors flex-1">
                      {isEn ? "All Skills" : "Tüm Beceriler"}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </Link>
                  <Link
                    href={withLocale("/#projects", locale)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-200 group"
                    style={{
                      borderColor: `${cat.accent.from}35`,
                      background:  `${cat.accent.from}0d`,
                    }}
                  >
                    <Clock className="w-4 h-4 transition-colors" style={{ color: cat.accent.from }} />
                    <span className="text-sm font-medium flex-1 transition-colors" style={{ color: cat.accent.from }}>
                      {isEn ? "Browse Projects" : "Projeleri İncele"}
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
