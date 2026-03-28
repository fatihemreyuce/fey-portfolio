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

/* ─── Static params ─────────────────────────────────── */

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

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat    = getCategoryById(id);
  if (!cat) notFound();

  const Icon    = cat.icon;
  const avgLevel = Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length);
  const avgLvl   = getLevel(avgLevel);
  const topSkill = [...cat.skills].sort((a, b) => b.level - a.level)[0];

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/5 pt-16 pb-20">
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/#skills" className="hover:text-zinc-300 transition-colors">Beceriler</Link>
              <span>/</span>
              <span className="text-zinc-300">{cat.title}</span>
            </div>

            {/* Back */}
            <Link
              href="/#skills"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 group transition-colors duration-200"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-200">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Becerilere Dön
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
                  {cat.title}
                </h1>

                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  {cat.longDesc}
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
                    <h2 className="text-lg font-bold text-white">Teknoloji Seviyeleri</h2>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Her becerinin kullanım deneyimi ve uzmanlık seviyesi.
                  </p>
                </div>

                {/* Client component for animated bars */}
                <SkillBarsClient skills={cat.skills} accent={cat.accent} />

                {/* Level legend */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: "Uzman",      color: "#34d399", min: 90 },
                    { label: "İleri",       color: "#60a5fa", min: 75 },
                    { label: "Orta",        color: "#fbbf24", min: 55 },
                    { label: "Başlangıç",   color: "#f87171", min: 0  },
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
                    <span className="text-sm font-semibold text-zinc-300">İstatistikler</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: "Teknoloji",      value: `${cat.skills.length} araç`     },
                      { label: "Ort. Seviye",     value: `${avgLevel}% — ${avgLvl.label}` },
                      { label: "En Güçlü",        value: topSkill.name                    },
                      { label: "Toplam Deneyim",  value: `${Math.max(...cat.skills.map(s => s.years))}+ yıl` },
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
                    <span className="text-sm font-semibold text-zinc-300">Teknolojiler</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
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
                    <span className="text-sm font-semibold text-zinc-300">Diğer Kategoriler</span>
                  </div>
                  <div className="p-3 space-y-1">
                    {skillCategories
                      .filter((c) => c.id !== cat.id)
                      .map((c) => {
                        const CatIcon = c.icon;
                        return (
                          <Link
                            key={c.id}
                            href={`/skills/${c.id}`}
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
                                {c.title}
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
                    href="/#skills"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 group"
                  >
                    <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors flex-1">
                      Tüm Beceriler
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </Link>
                  <Link
                    href="/#projects"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-200 group"
                    style={{
                      borderColor: `${cat.accent.from}35`,
                      background:  `${cat.accent.from}0d`,
                    }}
                  >
                    <Clock className="w-4 h-4 transition-colors" style={{ color: cat.accent.from }} />
                    <span className="text-sm font-medium flex-1 transition-colors" style={{ color: cat.accent.from }}>
                      Projeleri İncele
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
