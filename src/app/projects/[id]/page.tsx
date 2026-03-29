import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Clock,
  Radio,
  Calendar,
  Tag,
  Layers,
  Star,
} from "lucide-react";
import { Github } from "@/components/icons/social";
import { Header } from "@/components/Header";
import { Meteors } from "@/components/magicui/meteors";
import { projects, getProjectById } from "@/data/projects";

/* ─── Static params ─────────────────────────────────── */

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

/* ─── Metadata ──────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: `${project.title} — Fatih Emre Yüce`,
    description: project.shortDesc,
  };
}

/* ─── Status helpers ─────────────────────────────────── */

const STATUS_MAP = {
  live: {
    label: "Yayında",
    Icon: Radio,
    color:
      "text-emerald-900 border-emerald-400/70 bg-emerald-100/95 dark:text-emerald-400 dark:border-emerald-500/25 dark:bg-emerald-500/10",
  },
  completed: {
    label: "Tamamlandı",
    Icon: CheckCircle2,
    color:
      "text-blue-900 border-blue-400/70 bg-blue-100/95 dark:text-blue-400 dark:border-blue-500/25 dark:bg-blue-500/10",
  },
  development: {
    label: "Geliştirme",
    Icon: Clock,
    color:
      "text-amber-900 border-amber-400/70 bg-amber-100/95 dark:text-amber-400 dark:border-amber-500/25 dark:bg-amber-500/10",
  },
} as const;

/* ─── Page ──────────────────────────────────────────── */

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }  = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const status   = STATUS_MAP[project.status];
  const StatusIcon = status.Icon;
  const ProjectIcon = project.icon;

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-white/5 pt-16 pb-20">

          {/* Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Gradient mesh */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${project.accent.from}40, transparent)`,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent.from}80, ${project.accent.to}80, transparent)`,
              }}
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize:  "28px 28px",
              }}
            />
            <Meteors number={18} symmetric />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link href="/#projects" className="hover:text-zinc-300 transition-colors">
                Projeler
              </Link>
              <span>/</span>
              <span className="text-zinc-300">{project.title}</span>
            </div>

            {/* Back button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 group transition-colors duration-200"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-200">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Projelere Dön
            </Link>

            {/* Hero content */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">

              {/* Project icon */}
              <div
                className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/15"
                style={{
                  background: `linear-gradient(135deg, ${project.accent.from}50, ${project.accent.to}50)`,
                  boxShadow:  `0 0 32px ${project.accent.from}40`,
                }}
              >
                <ProjectIcon className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-4">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.05]"
                    style={{ color: project.accent.from }}
                  >
                    {project.category}
                  </span>
                  {project.status !== "development" && (
                    <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-slate-50 px-2.5 py-1 text-xs text-zinc-500 dark:border-white/5 dark:bg-white/[0.03]">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {project.title}
                </h1>

                {/* Short desc */}
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  {project.shortDesc}
                </p>

                {/* CTA links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.05] text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/[0.09] hover:border-white/20 transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                      GitHub&apos;da İncele
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`,
                        boxShadow:  `0 0 20px ${project.accent.from}35`,
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Canlıya Git
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────── */}
        <section className="relative py-16 overflow-hidden">
          {/* Subtle bg */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04]"
              style={{ background: project.accent.from }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">

              {/* ── Left: main content ── */}
              <div className="lg:col-span-2 space-y-10">

                {/* About the project */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1 h-5 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${project.accent.from}, ${project.accent.to})` }}
                    />
                    <h2 className="text-lg font-bold text-white">Proje Hakkında</h2>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[15px]">
                    {project.longDesc}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1 h-5 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${project.accent.from}, ${project.accent.to})` }}
                    />
                    <h2 className="text-lg font-bold text-white">Özellikler</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200"
                      >
                        <div
                          className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: `${project.accent.from}25`, border: `1px solid ${project.accent.from}40` }}
                        >
                          <Star className="w-3 h-3" style={{ color: project.accent.from }} />
                        </div>
                        <span className="text-sm text-zinc-400 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Right: sidebar ── */}
              <div className="space-y-6">

                {/* Tech stack */}
                <div
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-300">Teknoloji Stack</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                      >
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: tech.color }}
                        />
                        <span className="text-xs font-medium text-zinc-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project meta */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                    <Tag className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-300">Proje Bilgileri</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: "Kategori",  value: project.category },
                      ...(project.status !== "development"
                        ? [{ label: "Durum", value: status.label }] as const
                        : []),
                      { label: "Yıl",       value: String(project.year) },
                      { label: "Teknoloji", value: `${project.techs.length} araç` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">{label}</span>
                        <span className="text-zinc-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 group"
                    >
                      <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors flex-1">
                        Kaynak Kodu
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-200 group"
                      style={{
                        borderColor: `${project.accent.from}40`,
                        background:  `${project.accent.from}10`,
                      }}
                    >
                      <ExternalLink className="w-4 h-4 transition-colors" style={{ color: project.accent.from }} />
                      <span
                        className="text-sm font-medium flex-1 transition-colors"
                        style={{ color: project.accent.from }}
                      >
                        Canlı Demo
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-50" style={{ color: project.accent.from }} />
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
